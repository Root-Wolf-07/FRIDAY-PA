#!/usr/bin/env bash
# ==============================================================================
# FRIDAY AI - UNIFIED FULL-STACK LAUNCHER (FASTAPI BACKEND + HUD FRONTEND)
# Linked without modifying any frontend source files
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "⚡ Starting FRIDAY AI Full-Stack Unified Server..."
echo "📂 Frontend Directory: $FRONTEND_DIR"
echo "📂 Backend Directory:  $SCRIPT_DIR"

# Locate virtual environment
VENV_PYTHON="$SCRIPT_DIR/.venv/bin/python"
if [ ! -f "$VENV_PYTHON" ]; then
    echo "Creating virtual environment in $SCRIPT_DIR/.venv..."
    python3 -m venv "$SCRIPT_DIR/.venv"
    "$SCRIPT_DIR/.venv/bin/pip" install -q fastapi "uvicorn[standard]" pydantic pydantic-settings httpx "sqlalchemy[asyncio]" aiosqlite croniter python-multipart greenlet eval_type_backport beautifulsoup4 sympy numpy alembic pyyaml websockets
fi

cd "$SCRIPT_DIR"

echo "======================================================================"
echo "  🚀 FRIDAY AI FULL-STACK HYBRID SERVER ONLINE"
echo "======================================================================"
echo "  🌐 LINKED HUD FRONTEND: http://localhost:8000"
echo "  📚 INTERACTIVE API DOCS: http://localhost:8000/docs"
echo "  ❤️  HEALTH TELEMETRY:    http://localhost:8000/health/live"
echo "  🤖 CHATBOT API:          http://localhost:8000/api/chat"
echo "  👥 18 AGENTS FLEET:      http://localhost:8000/api/v1/agents"
echo "  🧠 LOCAL OLLAMA BRAIN:   qwen2.5-coder:1.5b (http://127.0.0.1:11434)"
echo "======================================================================"

exec "$VENV_PYTHON" -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
