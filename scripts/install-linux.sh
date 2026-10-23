#!/usr/bin/env bash
# ==============================================================================
# FRIDAY A.I. - LINUX CROSS-DISTRIBUTION APPLICATION INSTALLER
# Compatible with Ubuntu, Debian, Fedora, Arch, openSUSE, RHEL, Mint, Pop!_OS
# ==============================================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APPS_DIR="$HOME/.local/share/applications"
ICONS_DIR="$HOME/.local/share/icons/hicolor/512x512/apps"
SCALABLE_DIR="$HOME/.local/share/icons/hicolor/scalable/apps"
BIN_DIR="$HOME/.local/bin"
SYSTEMD_DIR="$HOME/.config/systemd/user"

echo "⚡ Installing FRIDAY A.I. Desktop Application for Linux..."

# 1. Create target directories
mkdir -p "$APPS_DIR" "$ICONS_DIR" "$SCALABLE_DIR" "$BIN_DIR" "$SYSTEMD_DIR"

# 2. Install application icons
if [ -f "$ROOT_DIR/icons/icon-512.png" ]; then
    cp "$ROOT_DIR/icons/icon-512.png" "$ICONS_DIR/friday-ai.png"
fi
if [ -f "$ROOT_DIR/icons/icon.svg" ]; then
    cp "$ROOT_DIR/icons/icon.svg" "$SCALABLE_DIR/friday-ai.svg"
fi

# 3. Create Desktop Entry with absolute path
cat << EOF > "$APPS_DIR/friday-ai.desktop"
[Desktop Entry]
Version=1.0
Type=Application
Name=FRIDAY AI
GenericName=Tactical Defense AI Assistant
Comment=Gojo Enterprise Tactical Defense HUD & Dual-Brain Autonomous AI Assistant
Exec=bash -c "cd '$ROOT_DIR' && ./start.sh"
Path=$ROOT_DIR
Icon=friday-ai
Terminal=false
Categories=Utility;Development;Security;Network;
Keywords=AI;Assistant;Tactical;HUD;Gojo;
StartupNotify=true
Actions=OpenHUD;OpenDocs;

[Desktop Action OpenHUD]
Name=Open Tactical HUD
Exec=xdg-open http://localhost:8000

[Desktop Action OpenDocs]
Name=Open API Documentation
Exec=xdg-open http://localhost:8000/docs
EOF

chmod +x "$APPS_DIR/friday-ai.desktop"

# 4. Create Command-line binary symlink
cat << EOF > "$BIN_DIR/friday-ai"
#!/usr/bin/env bash
cd "$ROOT_DIR"
exec ./start.sh "\$@"
EOF
chmod +x "$BIN_DIR/friday-ai"

# 5. Create Systemd User Service Unit File
cat << EOF > "$SYSTEMD_DIR/friday-ai.service"
[Unit]
Description=FRIDAY AI Unified Full-Stack Daemon
After=network.target

[Service]
Type=simple
WorkingDirectory=$ROOT_DIR
ExecStart=$ROOT_DIR/start.sh
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
EOF

# 6. Update desktop MIME/database cache if available
if command -v update-desktop-database > /dev/null 2>&1; then
    update-desktop-database "$APPS_DIR" > /dev/null 2>&1 || true
fi
if command -v gtk-update-icon-cache > /dev/null 2>&1; then
    gtk-update-icon-cache -f -t "$HOME/.local/share/icons/hicolor" > /dev/null 2>&1 || true
fi

echo "✓ FRIDAY A.I. Linux Application installed successfully!"
echo "  📌 Application Entry: $APPS_DIR/friday-ai.desktop"
echo "  📌 CLI Binary:       $BIN_DIR/friday-ai"
echo "  📌 Systemd Service:  $SYSTEMD_DIR/friday-ai.service"
echo ""
echo "🚀 To launch FRIDAY AI:"
echo "  • Open your Application Menu / App Grid and click 'FRIDAY AI'"
echo "  • Or run: friday-ai"
echo "  • Or enable background autostart: systemctl --user enable --now friday-ai"
