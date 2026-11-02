# Hajiss Blog API (FastAPI)

Backend for **مستجدات هاجس**: posts created in the admin dashboard (`/admin` → مستجدات هاجس والمدونة)
are stored here and served to the public page at `/news`.

## Run locally

```bash
cd backend
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt   # macOS/Linux: .venv/bin/pip
```

Then, from the project root, in two terminals:

```bash
npm run dev:api   # FastAPI on http://127.0.0.1:8000 (Windows venv path)
npm run dev       # Vite proxies /api/blog/* to the API
```

The API reads `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` from the project root
`.env` / `.env.local`, the same values used by `api/admin/login.ts`. Signing in to the dashboard
therefore also authorizes blog writes; there is no second login.

Interactive docs: http://127.0.0.1:8000/api/blog/docs

## Endpoints

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/blog/posts?category=&q=&featured=&limit=&offset=` | public | List posts, newest first |
| GET | `/api/blog/posts/{id}` | public | One post |
| POST | `/api/blog/posts` | admin | Create |
| PUT | `/api/blog/posts/{id}` | admin | Replace |
| DELETE | `/api/blog/posts/{id}` | admin | Delete (also removes its uploaded file) |
| POST | `/api/blog/uploads` | admin | Upload JPG/PNG/WEBP/GIF/MP4/WEBM (multipart field `file`) |
| GET | `/api/blog/media/{file}` | public | Uploaded files |
| GET | `/api/blog/health` | public | Health check |

Responses use the `NewsItem` shape from `src/data/news.ts`, so the frontend renders them as-is.

## Tests

```bash
cd backend
.venv/Scripts/python -m pytest
```

## Production

Vercel's serverless functions cannot host this service with persistent SQLite or uploads, so
deploy it to a host with a disk (Render, Railway, Fly.io, a VPS), e.g.
`uvicorn app.main:app --host 0.0.0.0 --port 8000`, with:

- the same `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` as the Vercel project;
- a persistent volume for `backend/data` (or `BLOG_DATABASE_URL` pointing to Postgres, plus a
  persistent `BLOG_UPLOAD_DIR`).

Then route `/api/blog/*` to it by adding this rewrite **before** the SPA rewrite in `vercel.json`:

```json
{ "source": "/api/blog/:path*", "destination": "https://YOUR-API-HOST/api/blog/:path*" }
```

Alternatively set `VITE_BLOG_API_URL=https://YOUR-API-HOST` and `BLOG_CORS_ORIGINS=https://your-site`.

The schema is created on startup. Add Alembic migrations before changing columns on a live database.
