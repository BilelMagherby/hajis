from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from .config import get_settings
from .database import Base, engine
from .media import MEDIA_ROUTE
from .routers import posts, uploads

settings = get_settings()


@asynccontextmanager
async def lifespan(_app: FastAPI):
    # No migrations yet: the schema is created on first start. Add Alembic before changing columns.
    Base.metadata.create_all(engine)
    settings.blog_upload_dir.mkdir(parents=True, exist_ok=True)
    yield


app = FastAPI(
    title='Hajiss Blog API',
    description='مستجدات هاجس — posts shown on /news and managed from the admin dashboard.',
    version='1.0.0',
    lifespan=lifespan,
    docs_url='/api/blog/docs',
    openapi_url='/api/blog/openapi.json',
    redoc_url=None,
)

if settings.cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
        allow_headers=['Authorization', 'Content-Type'],
    )


@app.middleware('http')
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault('X-Content-Type-Options', 'nosniff')
    if request.url.path.startswith(MEDIA_ROUTE):
        response.headers.setdefault('Cache-Control', 'public, max-age=31536000, immutable')
    return response


@app.exception_handler(RequestValidationError)
async def validation_error(_request: Request, exc: RequestValidationError):
    # The dashboard shows `detail` as-is, so flatten pydantic's error list into one readable line.
    first = exc.errors()[0] if exc.errors() else {}
    field = '.'.join(str(part) for part in first.get('loc', ())[1:])
    message = first.get('msg', 'بيانات غير صالحة.').removeprefix('Value error, ')
    return JSONResponse(status_code=422, content={'detail': f'{field}: {message}' if field else message})


@app.get('/api/blog/health', tags=['health'])
def health() -> dict[str, str]:
    return {'status': 'ok'}


app.include_router(posts.router)
app.include_router(uploads.router)
app.mount(MEDIA_ROUTE, StaticFiles(directory=settings.blog_upload_dir, check_dir=False), name='media')
