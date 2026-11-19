# ThesiRun

> Share your thesis like a run.

ThesiRun turns your thesis journey into a running activity card with distance, pace, elevation, and a route. You can compare yourself with other runners and represent your country in **Indonesia 🇮🇩 vs India 🇮🇳 Thesis Run**.

Built for the Embarko Student Challenge · `#DeployWithEmbarko` · live at **[thesirun.embarko.app](https://thesirun.embarko.app)**

## Features
- Run card generator you can share as an image
- Global leaderboard by country, degree, and campus, with real data only
- Daily "yesterday's winners" report via cron
- Reviews, bilingual UI (ID/EN), installable PWA
- Privacy-first: names, songs, and notes never leave the browser, and no IPs are stored

## Stack
| | |
|---|---|
| Backend | FastAPI + stdlib `sqlite3`, single file `main.py` |
| Frontend | Vanilla HTML/JS in `static/` |
| CSS | Tailwind v4 standalone CLI (`tailwind.css` → `static/app.css`) |
| Hosting | Embarko server app (1 process, 256 MB, persistent SQLite, cron) |

## Run locally
```sh
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt
ALLOWED_ORIGIN=http://127.0.0.1:8000 .venv/Scripts/python -m uvicorn main:app --reload
```
CSS (download `tailwindcss.exe` v4 into this folder first):
```sh
./tailwindcss.exe -i tailwind.css -o static/app.css --watch
```

## Config
| Env var | Default | Purpose |
|---|---|---|
| `DB_PATH` | `thesirun.db` | SQLite file |
| `ALLOWED_ORIGIN` | `https://thesirun.embarko.app` | Allowed request origin |
| `ACCEPT_RUNS` | `1` | Set `0` to pause new submissions |

## CLI
```sh
python main.py --selftest        # run backend tests
python main.py --daily-report    # compute yesterday's winners (cron, 00:00 UTC)
python main.py --reviews         # list reviews
python main.py --hide-review ID  # hide a review
```

## API
| Method | Path | |
|---|---|---|
| `POST` | `/api/run` | Submit a run |
| `POST` | `/api/run/delete` | Delete your own run (token) |
| `POST` | `/api/review` | Submit a review |
| `GET` | `/api/stats` | Leaderboard and stats |
