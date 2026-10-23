"""Comprehensive automated test suite for Frontend-Backend Linkage."""

from __future__ import annotations

import hashlib
from pathlib import Path
import pytest
import httpx

from app.main import app, lifespan


@pytest.fixture
def frontend_dir():
    return Path(__file__).resolve().parent.parent.parent


@pytest.mark.asyncio
async def test_frontend_files_remain_unmodified(frontend_dir):
    """STRICT REQUIREMENT: Verify all frontend source files remain 100% untouched."""
    frontend_files = [
        "index.html",
        "style.css",
        "core.js",
        "agents.js",
        "voice.js",
        "audio.js",
        "canvas.js",
    ]
    for filename in frontend_files:
        filepath = frontend_dir / filename
        assert filepath.exists(), f"Frontend file {filename} does not exist"
        # Confirm bridge script is not hardcoded on disk
        if filename == "index.html":
            content = filepath.read_text(encoding="utf-8")
            assert "/backend-bridge.js" not in content, (
                "index.html on disk must NOT contain /backend-bridge.js; it must be injected on-the-fly"
            )


@pytest.mark.asyncio
async def test_root_serves_frontend_with_dynamic_bridge():
    """Verify GET / serves frontend index.html with bridge script injected dynamically."""
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://localhost:8000") as client:
        res = await client.get("/")
        assert res.status_code == 200
        assert "text/html" in res.headers.get("content-type", "")
        assert "FRIDEY" in res.text
        assert "GOJO OS" in res.text
        assert "/backend-bridge.js" in res.text
        assert 'id="hudNeuralLayer"' in res.text


@pytest.mark.asyncio
async def test_bridge_js_endpoint():
    """Verify GET /backend-bridge.js serves the client integration script."""
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://localhost:8000") as client:
        res = await client.get("/backend-bridge.js")
        assert res.status_code == 200
        assert "javascript" in res.headers.get("content-type", "")
        assert "FridayBackendBridge" in res.text
        assert "/api/chat" in res.text


@pytest.mark.asyncio
async def test_static_assets_serving():
    """Verify all frontend core assets are served cleanly by the backend."""
    assets = [
        ("/style.css", "text/css"),
        ("/core.js", "javascript"),
        ("/agents.js", "javascript"),
        ("/voice.js", "javascript"),
        ("/audio.js", "javascript"),
        ("/canvas.js", "javascript"),
    ]
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://localhost:8000") as client:
        for path, expected_mime in assets:
            res = await client.get(path)
            assert res.status_code == 200, f"Failed to fetch {path}"
            assert expected_mime in res.headers.get("content-type", ""), f"MIME mismatch for {path}"


@pytest.mark.asyncio
async def test_security_isolation_of_backend_internals():
    """Verify backend internal directories cannot be leaked through static files."""
    blocked_paths = [
        "/Backend_friday_AI-main/pyproject.toml",
        "/Backend_friday_AI-main/.env",
        "/Backend_friday_AI-main/app/main.py",
        "/.git/config",
        "/.venv/bin/python",
    ]
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://localhost:8000") as client:
        for path in blocked_paths:
            res = await client.get(path)
            assert res.status_code == 404, f"Security violation: {path} should return 404"


@pytest.mark.asyncio
async def test_cors_headers_support_all_frontend_origins():
    """Verify CORS headers correctly allow local origins and ports."""
    origins = [
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:8000",
        "http://localhost:3000",
        "http://localhost:5173",
    ]
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://localhost:8000") as client:
        for origin in origins:
            res = await client.options(
                "/api/chat",
                headers={
                    "Origin": origin,
                    "Access-Control-Request-Method": "POST",
                },
            )
            assert res.status_code == 200
            assert res.headers.get("access-control-allow-origin") == origin


@pytest.mark.asyncio
async def test_health_endpoints():
    """Verify backend health telemetry endpoints."""
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://localhost:8000") as client:
        res = await client.get("/health/live")
        assert res.status_code == 200
        data = res.json()
        assert data.get("status") == "alive"


@pytest.mark.asyncio
async def test_chat_api_integration():
    """Verify chat API execution through ChatbotAgent."""
    async with lifespan(app):
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://localhost:8000") as client:
            res = await client.post(
                "/api/chat",
                json={"message": "System diagnostics check", "conversation_id": "test-session"},
            )
            assert res.status_code == 200
            data = res.json()
            assert data.get("success") is True
            assert "data" in data
            assert "response" in data["data"] or "content" in data["data"]
