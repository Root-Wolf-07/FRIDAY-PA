#!/usr/bin/env bash
# ==============================================================================
# FRIDAY A.I. — ANDROID STUDIO & DEVICE RUNNER
# Installs and launches the FRIDAY AI HUD on connected Android emulators or devices.
# ==============================================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APK_FILE="$ROOT_DIR/dist/FRIDAY-AI.apk"
ANDROID_DIR="$ROOT_DIR/android"

# Export Android SDK & Java environment if available
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin:$PATH"

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}📱 FRIDAY A.I. — ANDROID RUNNER${NC}"
echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check adb existence
if ! command -v adb > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: 'adb' not found in PATH or at $ANDROID_HOME/platform-tools/adb${NC}"
    echo -e "${YELLOW}Please install Android Studio and ensure the Android SDK Command-line Tools are installed.${NC}"
    exit 1
fi

echo -e "🔍 Checking connected devices & emulators..."
DEVICE_COUNT=$(adb devices | grep -v "List of devices" | grep -v "^$" | wc -l | tr -d ' ')

if [ "$DEVICE_COUNT" -eq "0" ]; then
    echo -e "${YELLOW}⚠️  No active Android emulator or physical device detected.${NC}"
    echo ""
    echo -e "To run in Android Studio:"
    echo -e "  1. Open Android Studio: ${CYAN}open -a 'Android Studio' '$ANDROID_DIR'${NC}"
    echo -e "  2. Go to ${BOLD}Tools > Device Manager${NC} and click ▶ ${BOLD}Play${NC} to start your emulator."
    echo -e "  3. Re-run this script:  ${GREEN}./scripts/run-android.sh${NC}"
    echo -e "     OR simply drag & drop ${CYAN}$APK_FILE${NC} onto your running emulator!"
    echo ""
    read -p "Would you like to open Android Studio now? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open -a "Android Studio" "$ANDROID_DIR"
        echo -e "${GREEN}✓ Opened Android Studio with $ANDROID_DIR${NC}"
    fi
    exit 0
fi

echo -e "${GREEN}✓ Found $DEVICE_COUNT active Android target(s):${NC}"
adb devices

if [ ! -f "$APK_FILE" ]; then
    echo -e "${YELLOW}⚙️  Building APK first...${NC}"
    "$ROOT_DIR/scripts/build-android-apk.sh"
fi

echo -e "${CYAN}📦 Installing FRIDAY-AI.apk to target...${NC}"
adb install -r "$APK_FILE"

echo -e "${GREEN}🚀 Launching FRIDAY AI HUD on device...${NC}"
adb shell am start -n mgks.os.swv/.MainActivity

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}✅ FRIDAY AI HUD is now running on your Android target!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
