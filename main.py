import hashlib
import json
import os
import re
import secrets
import sqlite3
import sys
import time
from contextlib import closing
from typing import Literal

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, Field, ValidationError

DB_PATH = os.environ.get("DB_PATH", "thesirun.db")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://thesirun.embarko.app")
MIN_GROUP = 30
MIN_CAMPUS = 10
MAX_BODY = 2048
RATE_LIMIT = 5
COUNTRIES = ("ID", "IN", "CN", "US", "JP", "OT")
TEAMS = tuple(c for c in COUNTRIES if c != "OT")
Country = Literal["ID", "IN", "CN", "US", "JP", "OT"]
COUNTRY_SQL = ",".join(f"'{c}'" for c in COUNTRIES)

SCHEMA = f"""
CREATE TABLE IF NOT EXISTS runs (
  id            INTEGER PRIMARY KEY,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  country       TEXT    NOT NULL CHECK (country IN ({COUNTRY_SQL})),
  campus        TEXT,
  degree        TEXT    NOT NULL CHECK (degree IN ('S1','DIP','S2','ALUM')),
  chapters      REAL    NOT NULL CHECK (chapters BETWEEN 0 AND 5),
  days          INTEGER NOT NULL CHECK (days BETWEEN 1 AND 3650),
  pages         INTEGER NOT NULL CHECK (pages BETWEEN 0 AND 300),
  revisions     INTEGER NOT NULL CHECK (revisions BETWEEN 0 AND 50),
  title_changes INTEGER NOT NULL CHECK (title_changes BETWEEN 0 AND 10),
  approvals     INTEGER NOT NULL CHECK (approvals BETWEEN 0 AND 30),
  reply_days    INTEGER NOT NULL CHECK (reply_days BETWEEN 0 AND 30),
  coffee        INTEGER NOT NULL CHECK (coffee BETWEEN 0 AND 50),
  sleep         INTEGER NOT NULL CHECK (sleep BETWEEN 0 AND 4),
  persona       TEXT    NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_runs_country ON runs(country);
CREATE INDEX IF NOT EXISTS idx_runs_campus  ON runs(campus);
CREATE TABLE IF NOT EXISTS reviews (
  id          INTEGER PRIMARY KEY,
  run_id      INTEGER NOT NULL UNIQUE REFERENCES runs(id),
  token_hash  TEXT    NOT NULL UNIQUE,
  created_at  TEXT,
  name        TEXT    CHECK (length(name) <= 40),
  body        TEXT    CHECK (length(body) BETWEEN 10 AND 140),
  hidden      INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS daily_report (day TEXT PRIMARY KEY, json TEXT NOT NULL);
"""

PACE_SQL = "days * 1.0 / MAX(chapters, 0.5)"
METRICS = {"revisions": "revisions", "pages": "pages", "coffee": "coffee", "sleep": "sleep", "pace": PACE_SQL}

BLOCKLIST = {"anjing", "bangsat", "kontol", "memek", "ngentot", "fuck", "shit", "bitch", "chutiya", "madarchod", "bhenchod"}
CAMPUS_RE = re.compile(r"^[A-Za-z0-9 .\-&]{3,60}$")
MASK_RE = re.compile(r"^[^\W\d_]\*{3}( [^\W\d_]\*{3}){0,2}$")
LINK_RE = re.compile(r"https?:|www\.|\.(com|net|org|id|io|co|xyz|ly|me)\b|@\w", re.I)
MAX_REVIEWS = 12


def Int(lo, hi):
    return Field(ge=lo, le=hi, strict=True)


class Run(BaseModel):
    model_config = ConfigDict(extra="forbid")
    country: Country
    campus: str | None = Field(default=None, max_length=100)
    degree: Literal["S1", "DIP", "S2", "ALUM"]
    chapters: float = Field(ge=0, le=5, multiple_of=0.5)
    days: int = Int(1, 3650)
    pages: int = Int(0, 300)
    revisions: int = Int(0, 50)
    title_changes: int = Int(0, 10)
    approvals: int = Int(0, 30)
    reply_days: int = Int(0, 30)
    coffee: int = Int(0, 50)
    sleep: int = Int(0, 4)
    website: str = ""


class Token(BaseModel):
    model_config = ConfigDict(extra="forbid")
    token: str = Field(min_length=20, max_length=40)


class Review(Token):
    name: str | None = Field(default=None, max_length=40)
    body: str = Field(max_length=400)


def token_hash(token):
    return hashlib.sha256(token.encode()).hexdigest()


def clean_review(r: Review):
    body = " ".join(r.body.split())
    if not 10 <= len(body) <= 140 or LINK_RE.search(body) or any(w in body.lower() for w in BLOCKLIST):
        return None
    if r.name is not None and not MASK_RE.match(r.name):
        return None
    return r.name, body


def normalize_campus(raw):
    if not raw:
        return None
    s = " ".join(raw.split())
    if not CAMPUS_RE.match(s) or any(w in s.lower() for w in BLOCKLIST):
        return None
    return " ".join(w[0].upper() + w[1:] for w in s.split(" "))


def persona(r: Run):
    pace = r.days / max(r.chapters, 0.5)
    if r.chapters == 5 or r.degree == "ALUM":
        return "finisher"
    if r.revisions >= 15:
        return "hill_climber"
    if r.title_changes >= 3:
        return "lost_runner"
    if r.reply_days >= 7:
        return "water_station"
    if r.coffee >= 21:
        return "caffeine_pacer"
    if r.sleep >= 2:
        return "night_runner"
    if pace <= 14:
        return "sprinter"
    return "steady_jogger"


def connect():
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    return db


def migrate(db):
    row = db.execute("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'runs'").fetchone()
    if row and f"({COUNTRY_SQL})" not in row[0]:
        db.executescript(
            "BEGIN; DROP INDEX IF EXISTS idx_runs_country; DROP INDEX IF EXISTS idx_runs_campus; "
            "ALTER TABLE runs RENAME TO runs_old;" + SCHEMA +
            "INSERT INTO runs SELECT * FROM runs_old; DROP TABLE runs_old; COMMIT;"
        )
    db.executescript(SCHEMA)


def percentiles(db, values, country=None):
    where, args = ("WHERE country = ?", [country]) if country else ("", [])
    n = db.execute(f"SELECT COUNT(*) FROM runs {where}", args).fetchone()[0]
    if n < MIN_GROUP:
        return n, {k: None for k in METRICS}
    out = {}
    for k, expr in METRICS.items():
        cond = f"{expr} < ?" + (" AND country = ?" if country else "")
        below = db.execute(f"SELECT COUNT(*) FROM runs WHERE {cond}", [values[k], *args]).fetchone()[0]
        out[k] = round(below * 100 / n)
    return n, out


def country_aggs(db, where="", args=()):
    rows = db.execute(
        f"""SELECT country, COUNT(*) n, SUM(pages) pages, AVG(revisions) avg_revisions,
                   AVG(sleep) avg_sleep, AVG({PACE_SQL}) avg_pace, AVG(reply_days) avg_reply
            FROM runs {where} GROUP BY country""",
        args,
    ).fetchall()
    return {r["country"]: {k: (round(r[k], 2) if isinstance(r[k], float) else r[k]) for k in r.keys() if k != "country"} for r in rows}


app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
with closing(connect()) as _db:
    migrate(_db)

_hits: dict[str, list[float]] = {}
_stats_cache = [0.0, None]

CSP = ("default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; "
       "object-src 'none'; base-uri 'none'; frame-ancestors 'none'")


@app.middleware("http")
async def security_headers(request: Request, call_next):
    resp = await call_next(request)
    resp.headers["Content-Security-Policy"] = CSP
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Referrer-Policy"] = "no-referrer"
    return resp


def client_ip(request: Request):
    xff = request.headers.get("x-forwarded-for")
    return xff.split(",")[-1].strip() if xff else (request.client.host if request.client else "?")


def rate_limited(ip):
    now = time.time()
    if len(_hits) > 10_000:
        _hits.clear()
    hits = [t for t in _hits.get(ip, []) if now - t < 3600]
    if len(hits) >= RATE_LIMIT:
        _hits[ip] = hits
        return True
    _hits[ip] = hits + [now]
    return False


def err(status, msg):
    return JSONResponse({"error": msg}, status_code=status)


async def guarded_body(request: Request):
    if request.headers.get("origin") not in (ALLOWED_ORIGIN, f"{request.url.scheme}://{request.url.netloc}"):
        return err(403, "bad origin")
    if int(request.headers.get("content-length") or 0) > MAX_BODY:
        return err(413, "too large")
    body = await request.body()
    if len(body) > MAX_BODY:
        return err(413, "too large")
    if rate_limited(client_ip(request)):
        return err(429, "slow down")
    return body


@app.post("/api/run")
async def post_run(request: Request):
    body = await guarded_body(request)
    if isinstance(body, JSONResponse):
        return body
    try:
        r = Run.model_validate_json(body)
    except ValidationError:
        return err(422, "invalid")
    if r.website:
        return {"n": 0, "country_n": 0, "percentiles": {k: None for k in METRICS}, "country_percentiles": {k: None for k in METRICS}, "persona": persona(r)}
    if os.environ.get("ACCEPT_RUNS", "1") == "0":
        return err(503, "submissions paused")

    token = secrets.token_urlsafe(24)
    with closing(connect()) as db:
        with db:
            cur = db.execute(
                """INSERT INTO runs (country, campus, degree, chapters, days, pages, revisions,
                   title_changes, approvals, reply_days, coffee, sleep, persona)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (r.country, normalize_campus(r.campus), r.degree, r.chapters, r.days, r.pages, r.revisions,
                 r.title_changes, r.approvals, r.reply_days, r.coffee, r.sleep, persona(r)),
            )
            db.execute("INSERT INTO reviews (run_id, token_hash) VALUES (?, ?)", (cur.lastrowid, token_hash(token)))
        _stats_cache[0] = 0.0
        values = {"revisions": r.revisions, "pages": r.pages, "coffee": r.coffee, "sleep": r.sleep,
                  "pace": r.days / max(r.chapters, 0.5)}
        n, pct = percentiles(db, values)
        country_n, country_pct = percentiles(db, values, r.country)
    return {"n": n, "country_n": country_n, "percentiles": pct, "country_percentiles": country_pct, "persona": persona(r),
            "review_token": token}


@app.post("/api/review")
async def post_review(request: Request):
    body = await guarded_body(request)
    if isinstance(body, JSONResponse):
        return body
    try:
        r = Review.model_validate_json(body)
    except ValidationError:
        return err(422, "invalid")
    clean = clean_review(r)
    if not clean:
        return err(422, "invalid")
    with closing(connect()) as db, db:
        cur = db.execute(REVIEW_SQL, (*clean, token_hash(r.token)))
    if cur.rowcount != 1:
        return err(409, "already used")
    _stats_cache[0] = 0.0
    return {"ok": True}


@app.post("/api/run/delete")
async def post_run_delete(request: Request):
    body = await guarded_body(request)
    if isinstance(body, JSONResponse):
        return body
    try:
        tok = Token.model_validate_json(body)
    except ValidationError:
        return err(422, "invalid")
    with closing(connect()) as db, db:
        ok = delete_run(db, tok.token)
    if not ok:
        return err(404, "not found")
    _stats_cache[0] = 0.0
    return {"ok": True}


def delete_run(db, token):
    row = db.execute("SELECT run_id FROM reviews WHERE token_hash = ?", (token_hash(token),)).fetchone()
    if not row:
        return False
    db.execute("DELETE FROM reviews WHERE run_id = ?", (row[0],))
    db.execute("DELETE FROM runs WHERE id = ?", (row[0],))
    return True


REVIEW_SQL = "UPDATE reviews SET name = ?, body = ?, created_at = datetime('now') WHERE token_hash = ? AND body IS NULL"


def recent_reviews(db):
    rows = db.execute(
        """SELECT v.name, v.body, strftime('%Y-%m-%dT%H:%M:%SZ', v.created_at) created_at, r.country, r.degree, r.persona
           FROM reviews v JOIN runs r ON r.id = v.run_id
           WHERE v.body IS NOT NULL AND v.hidden = 0 ORDER BY v.created_at DESC, v.id DESC LIMIT ?""",
        (MAX_REVIEWS,),
    ).fetchall()
    return [dict(x) for x in rows]


@app.get("/api/stats")
async def get_stats():
    if time.time() - _stats_cache[0] < 30 and _stats_cache[1]:
        return _stats_cache[1]
    with closing(connect()) as db:
        campuses = db.execute(
            f"""SELECT campus name, country, COUNT(*) n, SUM(pages) pages, ROUND(AVG(revisions), 2) avg_revisions,
                      ROUND(AVG(sleep), 2) avg_sleep, ROUND(AVG({PACE_SQL}), 2) avg_pace, ROUND(AVG(reply_days), 2) avg_reply
               FROM runs WHERE campus IS NOT NULL
               GROUP BY campus COLLATE NOCASE, country HAVING n >= ? ORDER BY n DESC LIMIT 50""",
            (MIN_CAMPUS,),
        ).fetchall()
        daily = db.execute("SELECT json FROM daily_report ORDER BY day DESC LIMIT 1").fetchone()
        data = {
            "countries": country_aggs(db),
            "campuses": [dict(c) for c in campuses],
            "daily": json.loads(daily["json"]) if daily else None,
            "reviews": recent_reviews(db),
        }
    _stats_cache[:] = [time.time(), data]
    return data


app.mount("/", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static"), html=True), name="static")


def daily_report(db):
    day = db.execute("SELECT date('now', '-1 day')").fetchone()[0]
    aggs = country_aggs(db, "WHERE date(created_at) = ?", (day,))
    teams = {k: v for k, v in aggs.items() if k in TEAMS}
    winners = {}
    for cat, key in [("pages", "pages"), ("revisions", "avg_revisions"), ("night", "avg_sleep"),
                     ("waiting", "avg_reply"), ("runners", "n")]:
        ranked = sorted(((v[key], k) for k, v in teams.items()), reverse=True)
        winners[cat] = ranked[0][1] if len(ranked) >= 2 and ranked[0][0] != ranked[1][0] else None
    report = {"day": day, "winners": winners, "countries": aggs}
    with db:
        db.execute("INSERT OR REPLACE INTO daily_report (day, json) VALUES (?, ?)", (day, json.dumps(report)))
    return report


def selftest():
    global DB_PATH
    import tempfile
    DB_PATH = os.path.join(tempfile.mkdtemp(), "t.db")
    good = dict(country="ID", degree="S1", chapters=2.5, days=200, pages=80, revisions=10, title_changes=1,
                approvals=3, reply_days=5, coffee=14, sleep=2)

    Run.model_validate(good)
    for c in COUNTRIES:
        Run.model_validate({**good, "country": c})
    for bad in [{"pages": 301}, {"country": "XX"}, {"country": "id"}, {"chapters": 2.3}, {"days": "200"}, {"extra": 1}, {"sleep": 1.5}]:
        try:
            Run.model_validate({**good, **bad})
            raise AssertionError(f"accepted {bad}")
        except ValidationError:
            pass

    assert normalize_campus("  universitas   indonesia ") == "Universitas Indonesia"
    assert normalize_campus("IIT bombay") == "IIT Bombay"
    assert normalize_campus("ab") is None
    assert normalize_campus("<script>") is None
    assert normalize_campus("Kampus Anjing") is None

    assert persona(Run(**{**good, "degree": "ALUM"})) == "finisher"
    assert persona(Run(**{**good, "revisions": 15})) == "hill_climber"
    assert persona(Run(**good)) == "night_runner"
    assert persona(Run(**{**good, "sleep": 0, "days": 30})) == "sprinter"

    with closing(connect()) as db:
        db.executescript(SCHEMA.replace(f"({COUNTRY_SQL})", "('ID','IN','OT')"))
        db.execute("INSERT INTO runs (country,degree,chapters,days,pages,revisions,title_changes,approvals,reply_days,coffee,sleep,persona) VALUES ('ID','S1',1,10,5,0,0,0,0,0,0,'x')")
        db.commit()
        migrate(db)
        assert db.execute("SELECT COUNT(*) FROM runs").fetchone()[0] == 1
        assert db.execute("SELECT COUNT(*) FROM sqlite_master WHERE type = 'index' AND tbl_name = 'runs'").fetchone()[0] == 2
        db.execute("INSERT INTO runs (country,degree,chapters,days,pages,revisions,title_changes,approvals,reply_days,coffee,sleep,persona) VALUES ('JP','S1',1,10,5,0,0,0,0,0,0,'x')")
        db.execute("DELETE FROM runs")
        ins ="INSERT INTO runs (country,degree,chapters,days,pages,revisions,title_changes,approvals,reply_days,coffee,sleep,persona) VALUES (?,?,?,?,?,?,0,0,0,0,0,'x')"
        for i in range(29):
            db.execute(ins, ("ID", "S1", 1, 10, i, i))
        n, pct = percentiles(db, {"revisions": 5, "pages": 0, "coffee": 0, "sleep": 0, "pace": 1})
        assert n == 29 and pct["revisions"] is None
        db.execute(ins, ("IN", "S1", 1, 10, 0, 0))
        n, pct = percentiles(db, {"revisions": 5, "pages": 0, "coffee": 0, "sleep": 0, "pace": 1})
        assert n == 30 and pct["revisions"] == round(6 * 100 / 30)
        assert percentiles(db, {k: 0 for k in METRICS}, "IN")[1]["revisions"] is None
        try:
            db.execute(ins, ("ID", "S1", 1, 10, 999, 0))
            raise AssertionError("CHECK constraint missed pages=999")
        except sqlite3.IntegrityError:
            pass
        db.execute("UPDATE runs SET created_at = datetime('now', '-1 day')")
        rep = daily_report(db)
        assert rep["winners"]["runners"] == "ID" and rep["winners"]["pages"] == "ID"
        db.execute(ins, ("JP", "S1", 1, 10, 300, 50))
        db.execute(ins, ("JP", "S1", 1, 10, 300, 50))
        db.execute("UPDATE runs SET created_at = datetime('now', '-1 day')")
        rep = daily_report(db)
        assert rep["winners"]["pages"] == "JP" and rep["winners"]["runners"] == "ID" and rep["winners"]["revisions"] == "JP"
    assert MASK_RE.match("R***") and MASK_RE.match("R*** P***") and MASK_RE.match("É***")
    for bad in ["Rio", "R***o", "R** P***", "1***", "R*** P*** S*** T***", "<***"]:
        assert not MASK_RE.match(bad), bad
    rv = lambda **k: clean_review(Review(**{"token": "x" * 32, "name": None, "body": "Seru banget, jadi semangat lagi", **k}))
    assert rv() == (None, "Seru banget, jadi semangat lagi")
    assert rv(body="  spasi   banyak   sekali  ") == (None, "spasi banyak sekali")
    for bad in [dict(body="pendek"), dict(body="x" * 141), dict(body="cek https://spam.example ya"), dict(body="mampir ke toko.com dong"),
                dict(body="follow @akunspam sekarang"), dict(body="dospem gw anjing banget"), dict(name="Rio Putra")]:
        assert rv(**bad) is None, bad
    with closing(connect()) as db:
        db.execute("DELETE FROM runs")
        rid = db.execute(ins, ("ID", "S1", 1, 10, 0, 0)).lastrowid
        db.execute("INSERT INTO reviews (run_id, token_hash) VALUES (?, ?)", (rid, token_hash("tok")))
        assert db.execute(REVIEW_SQL, ("R***", "Mantap sekali aplikasinya", token_hash("tok"))).rowcount == 1
        assert db.execute(REVIEW_SQL, ("R***", "Review kedua harus ditolak", token_hash("tok"))).rowcount == 0
        assert db.execute(REVIEW_SQL, (None, "Token palsu harus ditolak", token_hash("nope"))).rowcount == 0
        got = recent_reviews(db)
        assert len(got) == 1 and got[0]["name"] == "R***" and got[0]["country"] == "ID" and got[0]["created_at"].endswith("Z")
        db.execute("UPDATE reviews SET hidden = 1")
        assert recent_reviews(db) == []
        assert not delete_run(db, "nope")
        assert delete_run(db, "tok")
        assert db.execute("SELECT COUNT(*) FROM runs").fetchone()[0] == 0 and db.execute("SELECT COUNT(*) FROM reviews").fetchone()[0] == 0
        assert not delete_run(db, "tok")
    print("selftest ok")


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        selftest()
    elif "--reviews" in sys.argv:
        with closing(connect()) as db:
            for x in db.execute("SELECT id, hidden, created_at, name, body FROM reviews WHERE body IS NOT NULL ORDER BY id DESC LIMIT 50"):
                print(*x, sep=" | ")
    elif "--hide-review" in sys.argv:
        with closing(connect()) as db, db:
            print(db.execute("UPDATE reviews SET hidden = 1 WHERE id = ?", (int(sys.argv[-1]),)).rowcount)
    elif "--daily-report" in sys.argv:
        with closing(connect()) as db:
            print(json.dumps(daily_report(db)))
    else:
        print("usage: python main.py --selftest | --daily-report | --reviews | --hide-review ID")
