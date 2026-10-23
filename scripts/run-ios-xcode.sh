#!/usr/bin/env bash
# ==============================================================================
# FRIDAY A.I. — XCODE & iOS APP LAUNCHER
# Syncs assets and opens the native iOS project in Xcode.
# ==============================================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IOS_PROJECT="$ROOT_DIR/ios/App/App.xcodeproj"

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}🍎 FRIDAY A.I. — XCODE iOS RUNNER${NC}"
echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "🔄 Syncing latest web HUD assets to iOS container..."
mkdir -p "$ROOT_DIR/www"
cp -f "$ROOT_DIR"/index.html "$ROOT_DIR"/style.css "$ROOT_DIR"/core.js "$ROOT_DIR"/agents.js \
      "$ROOT_DIR"/canvas.js "$ROOT_DIR"/audio.js "$ROOT_DIR"/voice.js "$ROOT_DIR"/backend-bridge.js \
      "$ROOT_DIR"/manifest.json "$ROOT_DIR"/sw.js "$ROOT_DIR/www/" 2>/dev/null || true
cp -rf "$ROOT_DIR/icons" "$ROOT_DIR/assets" "$ROOT_DIR/chareter refference" "$ROOT_DIR/www/" 2>/dev/null || true

cd "$ROOT_DIR"
npx cap copy ios

echo -e "${GREEN}✓ Web assets synchronized!${NC}"
echo -e "${CYAN}🚀 Launching Xcode with: $IOS_PROJECT${NC}"
open -a Xcode "$IOS_PROJECT"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}📱 TO RUN IN XCODE:${NC}"
echo -e "  1. In Xcode's top toolbar, choose your destination:"
echo -e "     - Any iPhone / iPad Simulator (e.g. iPhone 16 Pro)"
echo -e "     - Or your connected physical iPhone / iPad (under Devices)"
echo -e "  2. Click the ▶ ${BOLD}Play / Run button${NC} (or press ${BOLD}Cmd + R${NC})."
echo -e "  3. The tactical HUD will build and launch on your iOS device!"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
