#!/usr/bin/env bash
# ==============================================================================
# FRIDAY A.I. - UNIFIED SINGLE FULL-STACK LAUNCHER
# Orchestrates FastAPI AI Central Brain & Tactical HUD Frontend on a Single Port
# Port: 8000 | Architecture: Dual-Brain + 18 Specialist Agents Fleet
# ==============================================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/Backend_friday_AI-main"
VENV_PYTHON="$BACKEND_DIR/.venv/bin/python"

# Terminal Color Codes
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${CYAN}${BOLD}"
cat << "EOF"
  ______ _____  _____ _____  ________     __     ___    _____ 
 |  ____|  __ \|_   _|  __ \|  ____\ \   / /    /   \  |_   _|
 | |__  | |__) | | | | |  | | |__   \ \_/ /    / /_\ \   | |  
 |  __| |  _  /  | | | |  | |  __|   \   /    /  ___  \  | |  
 | |    | | \ \ _| |_| |__| | |____   | |    /  /   \  \_| |_ 
 |_|    |_|  \_\_____|_____/|______|  |_|   /__/     \_\_____|
                                                               
      GOJO ENTERPRISE • TACTICAL DEFENSE HUD & DUAL-BRAIN AI
EOF
echo -e "${NC}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}⚡ FRIDAY UNIFIED FULL-STACK WORKFLOW INITIALIZING${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "📂 Project Root Directory:   ${CYAN}$ROOT_DIR${NC}"
echo -e "📂 Backend Engine Directory: ${CYAN}$BACKEND_DIR${NC}"

# Check if server is already active on port 8000
if curl -s --connect-timeout 1 http://127.0.0.1:8000/health/live > /dev/null 2>&1; then
    echo -e "${GREEN}✓ FRIDAY Unified Full-Stack is ALREADY RUNNING on http://localhost:8000${NC}"
    echo -e "  🌐 HUD Frontend:     ${CYAN}http://localhost:8000${NC}"
    echo -e "  📱 Android APK:      ${CYAN}http://localhost:8000/dist/FRIDAY-AI.apk${NC}"
    echo -e "  📚 API Docs:          ${CYAN}http://localhost:8000/docs${NC}"
    echo -e "  ❤️  Health Telemetry: ${CYAN}http://localhost:8000/health/live${NC}"
    exit 0
fi

# 1. Verify / Create Python Virtual Environment
if [ ! -f "$VENV_PYTHON" ]; then
    echo -e "${YELLOW}⚙️  Setting up dedicated virtual environment in $BACKEND_DIR/.venv...${NC}"
    python3 -m venv "$BACKEND_DIR/.venv"
    echo -e "${GREEN}✓ Virtual environment created.${NC}"
    echo -e "${YELLOW}📦 Installing backend dependencies (FastAPI, Uvicorn, SQLAlchemy, etc.)...${NC}"
    "$BACKEND_DIR/.venv/bin/pip" install -q --upgrade pip
    "$BACKEND_DIR/.venv/bin/pip" install -q \
        fastapi "uvicorn[standard]" pydantic pydantic-settings httpx \
        "sqlalchemy[asyncio]" aiosqlite croniter python-multipart greenlet \
        eval_type_backport beautifulsoup4 sympy numpy alembic pyyaml websockets
    echo -e "${GREEN}✓ Dependencies installed successfully.${NC}"
fi

# 2. Check Local Ollama Engine
echo -ne "🧠 Checking Local Ollama AI Provider (http://127.0.0.1:11434)... "
if curl -s --connect-timeout 1 http://127.0.0.1:11434/api/tags > /dev/null 2>&1; then
    echo -e "${GREEN}[ONLINE - CONNECTED]${NC}"
else
    echo -e "${YELLOW}[STANDALONE / MOCK FALLBACK MODE ACTIVE]${NC}"
fi

# 3. Synchronize Root Static Assets
if [ -f "$BACKEND_DIR/app/static/backend-bridge.js" ]; then
    cp "$BACKEND_DIR/app/static/backend-bridge.js" "$ROOT_DIR/backend-bridge.js"
fi

echo -e "\n${GREEN}${BOLD}======================================================================${NC}"
echo -e "${GREEN}${BOLD}  🚀 FRIDAY UNIFIED WORKFLOW READY — SINGLE PORT: 8000${NC}"
echo -e "${GREEN}${BOLD}======================================================================${NC}"
echo -e "  🌐 ${BOLD}UNIFIED HUD FRONTEND:${NC}       ${CYAN}http://localhost:8000${NC}"
echo -e "  📚 ${BOLD}INTERACTIVE API DOCS:${NC}       ${CYAN}http://localhost:8000/docs${NC}"
echo -e "  ❤️  ${BOLD}LIVE HEALTH & TELEMETRY:${NC}    ${CYAN}http://localhost:8000/health/live${NC}"
echo -e "  🤖 ${BOLD}CHATBOT & ORCHESTRATION:${NC}    ${CYAN}http://localhost:8000/api/chat${NC}"
echo -e "  👥 ${BOLD}18 AGENTS VIRTUAL FLEET:${NC}    ${CYAN}http://localhost:8000/api/v1/agents${NC}"
echo -e "  🏢 ${BOLD}3D CYBER OFFICE SUITE:${NC}      ${CYAN}http://localhost:8000#panelAgentOffice${NC}"
echo -e "${GREEN}${BOLD}======================================================================${NC}"
echo -e "${YELLOW}Press CTRL+C anytime to gracefully stop the unified server.${NC}\n"

# 4. Launch Unified FastAPI Server with hot-reload
cd "$BACKEND_DIR"
exec "$VENV_PYTHON" -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
