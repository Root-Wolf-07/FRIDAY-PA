#!/usr/bin/env bash
# ==============================================================================
# FRIDAY A.I. - MACOS NATIVE APPLICATION BUNDLE BUILDER (.app)
# Generates a standalone macOS Application in dist/FRIDAY AI.app
# Compatible with macOS Monterey, Ventura, Sonoma, Sequoia (Intel & Apple Silicon)
# ==============================================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
APP_DIR="$DIST_DIR/FRIDAY AI.app"
CONTENTS_DIR="$APP_DIR/Contents"
MACOS_DIR="$CONTENTS_DIR/MacOS"
RESOURCES_DIR="$CONTENTS_DIR/Resources"

echo "⚡ Building native macOS Application Bundle for FRIDAY A.I..."
mkdir -p "$MACOS_DIR" "$RESOURCES_DIR"

# 1. Generate Info.plist
cat << 'EOF' > "$CONTENTS_DIR/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>friday_launcher</string>
    <key>CFBundleIdentifier</key>
    <string>com.gojo.friday.ai</string>
    <key>CFBundleName</key>
    <string>FRIDAY AI</string>
    <key>CFBundleDisplayName</key>
    <string>FRIDAY AI</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>12.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>NSMicrophoneUsageDescription</key>
    <string>FRIDAY requires microphone access for voice command recognition and audio telemetry analysis.</string>
    <key>LSUIElement</key>
    <false/>
</dict>
</plist>
EOF

# 2. Copy App Icon to Resources
if [ -f "$ROOT_DIR/icons/icon-512.png" ]; then
    cp "$ROOT_DIR/icons/icon-512.png" "$RESOURCES_DIR/AppIcon.png"
fi

# 3. Create Executable Launcher
cat << EOF > "$MACOS_DIR/friday_launcher"
#!/usr/bin/env bash
PROJECT_DIR="$ROOT_DIR"
URL="http://localhost:8000"

# Check if backend server is already running
if ! curl -s --connect-timeout 1 "\$URL/health/live" > /dev/null 2>&1; then
    # Launch unified server in background
    cd "\$PROJECT_DIR"
    nohup ./start.sh > "\$PROJECT_DIR/storage/app_launcher.log" 2>&1 &
    
    # Wait for server to be responsive
    for i in {1..20}; do
        if curl -s --connect-timeout 1 "\$URL/health/live" > /dev/null 2>&1; then
            break
        fi
        sleep 0.5
    done
fi

# Open in default browser or standalone web window
open "\$URL"
EOF

chmod +x "$MACOS_DIR/friday_launcher"

echo "✓ macOS Native Application Bundle created at:"
echo "  👉 $APP_DIR"
echo ""
echo "To install to your Applications folder, run:"
echo "  cp -R \"$APP_DIR\" /Applications/"
echo "Then launch FRIDAY AI directly from Spotlight or Launchpad!"
