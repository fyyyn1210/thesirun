"""ThesiRun backend: FastAPI + sqlite3 (stdlib). Spec: ThesiRun.md §11.

Run:        uvicorn main:app
Cron:       python main.py --daily-report   (00:00 UTC)
Self-check: python main.py --selftest
"""
import json
import os
import re
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
MIN_GROUP = 30          # percentiles hidden below this many runners
MIN_CAMPUS = 10         # campus shown on leaderboard from this many runners
MAX_BODY = 2048
RATE_LIMIT = 5          # POST per IP per hour

SCHEMA = """
CREATE TABLE IF NOT EXISTS runs (
  id            INTEGER PRIMARY KEY,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  country       TEXT    NOT NULL CHECK (country IN ('ID','IN','OT')),
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
CREATE TABLE IF NOT EXISTS daily_report (day TEXT PRIMARY KEY, json TEXT NOT NULL);
"""

# Metric -> SQL expression. Pace = days per chapter (§7).
PACE_SQL = "days * 1.0 / MAX(chapters, 0.5)"
METRICS = {"revisions": "revisions", "pages": "pages", "coffee": "coffee", "sleep": "sleep", "pace": PACE_SQL}

BLOCKLIST = {"anjing", "bangsat", "kontol", "memek", "ngentot", "fuck", "shit", "bitch", "chutiya", "madarchod", "bhenchod"}
CAMPUS_RE = re.compile(r"^[A-Za-z0-9 .\-&]{3,60}$")


def Int(lo, hi):
    return Field(ge=lo, le=hi, strict=True)


class Run(BaseModel):
    model_config = ConfigDict(extra="forbid")  # unknown fields -> 422
    country: Literal["ID", "IN", "OT"]
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
    sleep: int = Int(0, 4)  # 0:<22.00 1:00.00 2:02.00 3:04.00 4:no sleep
    website: str = ""       # honeypot


def normalize_campus(raw):
    """Trim, collapse spaces, capitalize words (keep acronyms). Invalid -> None (run still counts)."""
    if not raw:
        return None
    s = " ".join(raw.split())
    if not CAMPUS_RE.match(s) or any(w in s.lower() for w in BLOCKLIST):
        return None
    return " ".join(w[0].upper() + w[1:] for w in s.split(" "))


def persona(r: Run):
    """§7, first match wins. Computed server-side so clients can't send arbitrary text."""
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


def percentiles(db, values, country=None):
    """% of runners in group with a strictly smaller value. None when group n < MIN_GROUP."""
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
    """Per-country aggregates. `where` is a static SQL fragment; user data only via args."""
    rows = db.execute(
        f"""SELECT country, COUNT(*) n, SUM(pages) pages, AVG(revisions) avg_revisions,
                   AVG(sleep) avg_sleep, AVG({PACE_SQL}) avg_pace, AVG(reply_days) avg_reply
            FROM runs {where} GROUP BY country""",
        args,
    ).fetchall()
    return {r["country"]: {k: (round(r[k], 2) if isinstance(r[k], float) else r[k]) for k in r.keys() if k != "country"} for r in rows}


# --- app ---------------------------------------------------------------------

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
with closing(connect()) as _db:
    _db.executescript(SCHEMA)

# ponytail: in-memory, single process only. Cleared wholesale at 10k IPs to cap memory.
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
    # Behind Embarko's proxy the real client is the last X-Forwarded-For hop (the one the proxy appended).
    # ponytail: assumes exactly one trusted proxy; adjust if Embarko adds more hops.
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


# ponytail: async handlers run sqlite on the event loop. Fine for contest traffic (tiny queries);
# move to sync def / threadpool if latency shows up.
@app.post("/api/run")
async def post_run(request: Request):
    if request.headers.get("origin") != ALLOWED_ORIGIN:
        return err(403, "bad origin")
    if int(request.headers.get("content-length") or 0) > MAX_BODY:
        return err(413, "too large")
    body = await request.body()
    if len(body) > MAX_BODY:
        return err(413, "too large")
    if rate_limited(client_ip(request)):
        return err(429, "slow down")
    try:
        r = Run.model_validate_json(body)
    except ValidationError:
        return err(422, "invalid")
    if r.website:  # bot: pretend success
        return {"n": 0, "country_n": 0, "percentiles": {k: None for k in METRICS}, "country_percentiles": {k: None for k in METRICS}, "persona": persona(r)}
    if os.environ.get("ACCEPT_RUNS", "1") == "0":
        return err(503, "submissions paused")

    with closing(connect()) as db:
        with db:
            db.execute(
                """INSERT INTO runs (country, campus, degree, chapters, days, pages, revisions,
                   title_changes, approvals, reply_days, coffee, sleep, persona)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (r.country, normalize_campus(r.campus), r.degree, r.chapters, r.days, r.pages, r.revisions,
                 r.title_changes, r.approvals, r.reply_days, r.coffee, r.sleep, persona(r)),
            )
        values = {"revisions": r.revisions, "pages": r.pages, "coffee": r.coffee, "sleep": r.sleep,
                  "pace": r.days / max(r.chapters, 0.5)}
        n, pct = percentiles(db, values)
        country_n, country_pct = percentiles(db, values, r.country)
    return {"n": n, "country_n": country_n, "percentiles": pct, "country_percentiles": country_pct, "persona": persona(r)}


@app.get("/api/stats")
async def get_stats():
    if time.time() - _stats_cache[0] < 30 and _stats_cache[1]:
        return _stats_cache[1]
    with closing(connect()) as db:
        campuses = db.execute(
            """SELECT campus name, country, COUNT(*) n, ROUND(AVG(revisions), 2) avg_revisions
               FROM runs WHERE campus IS NOT NULL
               GROUP BY campus COLLATE NOCASE, country HAVING n >= ? ORDER BY n DESC LIMIT 50""",
            (MIN_CAMPUS,),
        ).fetchall()
        daily = db.execute("SELECT json FROM daily_report ORDER BY day DESC LIMIT 1").fetchone()
        data = {
            "countries": country_aggs(db),
            "campuses": [dict(c) for c in campuses],
            "daily": json.loads(daily["json"]) if daily else None,
        }
    _stats_cache[:] = [time.time(), data]
    return data


app.mount("/", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static"), html=True), name="static")


# --- cron + selftest -----------------------------------------------------------

def daily_report(db):
    """Yesterday's (UTC) ID vs IN winners per category. A category needs runs from both countries."""
    day = db.execute("SELECT date('now', '-1 day')").fetchone()[0]
    aggs = country_aggs(db, "WHERE date(created_at) = ?", (day,))
    a, b = aggs.get("ID"), aggs.get("IN")
    winners = {}
    for cat, key in [("pages", "pages"), ("revisions", "avg_revisions"), ("night", "avg_sleep"),
                     ("waiting", "avg_reply"), ("runners", "n")]:
        winners[cat] = None if not (a and b) or a[key] == b[key] else ("ID" if a[key] > b[key] else "IN")
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
    for bad in [{"pages": 301}, {"country": "US"}, {"chapters": 2.3}, {"days": "200"}, {"extra": 1}, {"sleep": 1.5}]:
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
        db.executescript(SCHEMA)
        ins = "INSERT INTO runs (country,degree,chapters,days,pages,revisions,title_changes,approvals,reply_days,coffee,sleep,persona) VALUES (?,?,?,?,?,?,0,0,0,0,0,'x')"
        for i in range(29):
            db.execute(ins, ("ID", "S1", 1, 10, i, i))
        n, pct = percentiles(db, {"revisions": 5, "pages": 0, "coffee": 0, "sleep": 0, "pace": 1})
        assert n == 29 and pct["revisions"] is None
        db.execute(ins, ("IN", "S1", 1, 10, 0, 0))
        n, pct = percentiles(db, {"revisions": 5, "pages": 0, "coffee": 0, "sleep": 0, "pace": 1})
        assert n == 30 and pct["revisions"] == round(6 * 100 / 30)  # 0..4 from ID + 0 from IN
        assert percentiles(db, {k: 0 for k in METRICS}, "IN")[1]["revisions"] is None  # IN has 1 runner
        try:
            db.execute(ins, ("ID", "S1", 1, 10, 999, 0))
            raise AssertionError("CHECK constraint missed pages=999")
        except sqlite3.IntegrityError:
            pass
        db.execute("UPDATE runs SET created_at = datetime('now', '-1 day')")
        rep = daily_report(db)
        assert rep["winners"]["runners"] == "ID" and rep["winners"]["pages"] == "ID"
    print("selftest ok")


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        selftest()
    elif "--daily-report" in sys.argv:
        with closing(connect()) as db:
            print(json.dumps(daily_report(db)))
    else:
        print(__doc__)
