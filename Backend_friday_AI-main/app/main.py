"""FRIDAY AI Backend entrypoint."""
from __future__ import annotations

import app.core.compat  # Python 3.9 compatibility shim

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, Response
from starlette.staticfiles import StaticFiles

from app.api.errors import register_exception_handlers
from app.api.router import api_router
from app.automation.scheduler import scheduler
from app.core.config import settings
from app.core.logging import logger
from app.core.security_headers import SecurityHeadersMiddleware
from app.db.init_db import init_database, seed_default_tools
from app.db.session import async_session_factory, engine
from app.providers.registry import provider_registry


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager for startup and graceful shutdown."""
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION} [{settings.APP_ENV}]...")

    # 1. Initialize SQLite tables and FTS5 full-text index
    await init_database()

    # 2. Seed default tool definitions
    async with async_session_factory() as session:
        await seed_default_tools(session)

    # 3. Check Ollama local AI provider availability
    ollama = provider_registry.get("ollama")
    if await ollama.check_health():
        models = await ollama.list_models()
        logger.info(f"Ollama connected. Available local models: {models}")
    else:
        logger.warning(
            f"Ollama is not responding at {settings.OLLAMA_BASE_URL}. "
            "Local AI chat will be unavailable until Ollama is started."
        )

    # 4. Start background scheduler
    if settings.SCHEDULER_ENABLED:
        await scheduler.start()

    logger.info("FRIDAY AI Backend startup complete.")
    yield

    # Shutdown
    logger.info("Initiating graceful shutdown...")
    if settings.SCHEDULER_ENABLED:
        await scheduler.stop()
    await engine.dispose()
    logger.info("FRIDAY AI Backend shutdown complete.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Production-minded, local-first backend for personal AI work assistant FRIDAY AI.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# Defensive middleware: Security headers
app.add_middleware(SecurityHeadersMiddleware)

# CORS: Restricted to local loopback origins by default with all frontend ports enabled
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:4173",
        "http://localhost:5173",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:4173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8000",
        "http://tauri.localhost",
    ],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Exception handlers
register_exception_handlers(app)

# Include versioned API routers
app.include_router(api_router)

# Paths for linked frontend
FRONTEND_DIR = Path(__file__).resolve().parent.parent.parent
BRIDGE_JS_PATH = Path(__file__).resolve().parent / "static" / "backend-bridge.js"


@app.get("/backend-bridge.js", tags=["Frontend Link"])
async def serve_bridge_js():
    """Serve the dynamic frontend-to-backend integration bridge."""
    if BRIDGE_JS_PATH.exists():
        return FileResponse(BRIDGE_JS_PATH, media_type="application/javascript")
    return Response(content="", media_type="application/javascript")


@app.get("/", tags=["Frontend Link"], response_class=HTMLResponse)
@app.get("/index.html", tags=["Frontend Link"], response_class=HTMLResponse)
async def serve_frontend_index():
    """Serve the unmodified FRIDAY HUD index.html with live backend bridge injection."""
    index_file = FRONTEND_DIR / "index.html"
    if not index_file.exists():
        return HTMLResponse("<h1>FRIDAY Frontend index.html not found</h1>", status_code=404)
    html_content = index_file.read_text(encoding="utf-8")
    if "</body>" in html_content and "backend-bridge.js" not in html_content:
        html_content = html_content.replace(
            "</body>",
            '  <!-- Live Backend Neural Linkage Bridge -->\n  <script src="/backend-bridge.js"></script>\n</body>',
        )
    return HTMLResponse(content=html_content, status_code=200)


class SafeFrontendStaticFiles(StaticFiles):
    """Serve frontend static assets securely, blocking internal backend directories."""

    async def get_response(self, path: str, scope):
        clean_path = path.lstrip("/\\")
        first_segment = clean_path.split("/")[0] if "/" in clean_path else clean_path
        if first_segment.startswith(".") or first_segment in {
            "Backend_friday_AI-main",
            "node_modules",
            "__pycache__",
            ".venv",
            ".git",
        }:
            return Response(status_code=404)
        return await super().get_response(path, scope)


# Mount static assets for frontend (style.css, core.js, agents.js, voice.js, audio.js, etc.)
if FRONTEND_DIR.exists():
    app.mount("/", SafeFrontendStaticFiles(directory=str(FRONTEND_DIR), html=False), name="frontend_static")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
    )
