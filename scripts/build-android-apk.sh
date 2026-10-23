#!/usr/bin/env bash
# ==============================================================================
# FRIDAY A.I. - ANDROID NATIVE APK PACKAGE BUILDER (.apk)
# Generates a standalone, installable Android APK in dist/FRIDAY-AI.apk
# Compatible with Android 8.0 through Android 15 (arm64-v8a, armeabi-v7a, x86_64)
# ==============================================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
OUTPUT_APK="$DIST_DIR/FRIDAY-AI.apk"
BASE_APK_CACHE="/tmp/smartwebview.apk"

mkdir -p "$DIST_DIR"

echo "⚡ Assembling native Android APK for FRIDAY A.I..."

# 1. Download base WebView engine if not cached
if [ ! -f "$BASE_APK_CACHE" ]; then
    echo "📥 Fetching base Android WebView engine..."
    curl -L -s -o "$BASE_APK_CACHE" "https://github.com/mgks/Android-SmartWebView/releases/download/v7.5/SmartWebView-v7.5.apk"
fi

# 2. Execute Python APK assembler & cryptographic signer
python3 - << 'EOF'
import os, sys, zipfile, hashlib, base64, subprocess, tempfile, shutil

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..') if '__file__' in locals() else '.')
dist_dir = os.path.join(root_dir, 'dist')
os.makedirs(dist_dir, exist_ok=True)
output_apk = os.path.join(dist_dir, 'FRIDAY-AI.apk')
base_apk = '/tmp/smartwebview.apk'

with tempfile.TemporaryDirectory() as tmpdir:
    unpacked_dir = os.path.join(tmpdir, 'unpacked')
    with zipfile.ZipFile(base_apk, 'r') as z:
        z.extractall(unpacked_dir)

    # Clean old signature files
    metainf = os.path.join(unpacked_dir, 'META-INF')
    for f in list(os.listdir(metainf)):
        if f.endswith('.SF') or f.endswith('.RSA') or f.endswith('.DSA') or f == 'MANIFEST.MF':
            os.remove(os.path.join(metainf, f))

    # Configure SmartWebView properties
    props_path = os.path.join(unpacked_dir, 'assets', 'swv.properties')
    with open(props_path, 'w') as f:
        f.write('''# FRIDAY AI Android Configuration
build.application.id=com.gojo.friday.ai
build.version.code=8
build.version.name=8.4.2
debug.mode=false
app.url=file:///android_asset/web/index.html
offline.url=file:///android_asset/web/index.html
feature.uploads=true
feature.camera.uploads=true
feature.copy.paste=true
feature.pull.refresh=false
feature.progress.bar=true
feature.zoom=false
feature.open.external.urls=false
security.verify.ssl=false
permissions.on.launch=NOTIFICATIONS,LOCATION,STORAGE
ui.orientation=0
ui.layout=0
ui.splash.extend=false
''')

    # Bundle Web HUD assets
    web_dir = os.path.join(unpacked_dir, 'assets', 'web')
    os.makedirs(web_dir, exist_ok=True)

    files_to_copy = [
        'index.html', 'style.css', 'core.js', 'agents.js', 
        'canvas.js', 'audio.js', 'voice.js', 'backend-bridge.js',
        'manifest.json', 'sw.js'
    ]
    for fn in files_to_copy:
        src = os.path.join(root_dir, fn)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(web_dir, fn))

    # Copy icons & references
    src_icons = os.path.join(root_dir, 'icons')
    if os.path.exists(src_icons):
        shutil.copytree(src_icons, os.path.join(web_dir, 'icons'), dirs_exist_ok=True)

    src_refs = os.path.join(root_dir, 'chareter refference')
    if os.path.exists(src_refs):
        shutil.copytree(src_refs, os.path.join(web_dir, 'chareter refference'), dirs_exist_ok=True)

    # Splash branding
    icon_512 = os.path.join(root_dir, 'icons', 'icon-512.png')
    if os.path.exists(icon_512):
        shutil.copy2(icon_512, os.path.join(web_dir, 'swv_splash.png'))
        shutil.copy2(icon_512, os.path.join(web_dir, 'swv_splash_white.png'))
        raw_splash = os.path.join(unpacked_dir, 'res', 'raw', 'front_splash.png')
        if os.path.exists(os.path.dirname(raw_splash)):
            shutil.copy2(icon_512, raw_splash)
        raw_night = os.path.join(unpacked_dir, 'res', 'raw-night-v8', 'front_splash.png')
        if os.path.exists(os.path.dirname(raw_night)):
            shutil.copy2(icon_512, raw_night)

    # Build MANIFEST.MF
    manifest_entries = []
    sf_entries = []

    all_rel_files = []
    for r, dirs, files in os.walk(unpacked_dir):
        for f in sorted(files):
            full_p = os.path.join(r, f)
            rel_p = os.path.relpath(full_p, unpacked_dir).replace(os.path.sep, '/')
            if rel_p.startswith('META-INF/'):
                continue
            all_rel_files.append(rel_p)

    all_rel_files.sort()

    manifest_lines = [
        'Manifest-Version: 1.0',
        'Built-By: FRIDAY-AI-Builder',
        'Created-By: 1.0 (Gojo Enterprise)',
        ''
    ]

    for rel_p in all_rel_files:
        full_p = os.path.join(unpacked_dir, rel_p)
        with open(full_p, 'rb') as fp:
            data = fp.read()
        sha1 = base64.b64encode(hashlib.sha1(data).digest()).decode('ascii')
        sha256 = base64.b64encode(hashlib.sha256(data).digest()).decode('ascii')
        entry = f'Name: {rel_p}\r\nSHA1-Digest: {sha1}\r\nSHA-256-Digest: {sha256}\r\n\r\n'
        manifest_entries.append(entry)

        entry_bytes = entry.encode('utf-8')
        sf_sha1 = base64.b64encode(hashlib.sha1(entry_bytes).digest()).decode('ascii')
        sf_sha256 = base64.b64encode(hashlib.sha256(entry_bytes).digest()).decode('ascii')
        sf_entries.append(f'Name: {rel_p}\r\nSHA1-Digest: {sf_sha1}\r\nSHA-256-Digest: {sf_sha256}\r\n\r\n')

    manifest_text = '\r\n'.join(manifest_lines) + '\r\n' + ''.join(manifest_entries)
    with open(os.path.join(metainf, 'MANIFEST.MF'), 'wb') as fp:
        fp.write(manifest_text.encode('utf-8'))

    # Build CERT.SF
    man_bytes = manifest_text.encode('utf-8')
    man_sha1 = base64.b64encode(hashlib.sha1(man_bytes).digest()).decode('ascii')
    man_sha256 = base64.b64encode(hashlib.sha256(man_bytes).digest()).decode('ascii')

    sf_text = (
        'Signature-Version: 1.0\r\n'
        'Created-By: 1.0 (Gojo Enterprise)\r\n'
        f'SHA1-Digest-Manifest: {man_sha1}\r\n'
        f'SHA-256-Digest-Manifest: {man_sha256}\r\n\r\n'
    ) + ''.join(sf_entries)
    sf_path = os.path.join(metainf, 'CERT.SF')
    with open(sf_path, 'wb') as fp:
        fp.write(sf_text.encode('utf-8'))

    # Sign with OpenSSL
    key_path = os.path.join(tmpdir, 'key.pem')
    cert_path = os.path.join(tmpdir, 'cert.pem')
    subprocess.run([
        'openssl', 'req', '-x509', '-newkey', 'rsa:2048',
        '-keyout', key_path, '-out', cert_path,
        '-days', '10000', '-nodes',
        '-subj', '/CN=FRIDAY AI/O=Gojo Enterprise/C=US'
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    rsa_path = os.path.join(metainf, 'CERT.RSA')
    subprocess.run([
        'openssl', 'smime', '-sign',
        '-in', sf_path,
        '-inkey', key_path,
        '-signer', cert_path,
        '-out', rsa_path,
        '-outform', 'DER',
        '-nodetach', '-binary'
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Package APK
    with zipfile.ZipFile(output_apk, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        for rel_p in ['META-INF/MANIFEST.MF', 'META-INF/CERT.SF', 'META-INF/CERT.RSA']:
            zout.write(os.path.join(unpacked_dir, rel_p), rel_p)

        for r, dirs, files in os.walk(unpacked_dir):
            for f in sorted(files):
                full_p = os.path.join(r, f)
                rel_p = os.path.relpath(full_p, unpacked_dir).replace(os.path.sep, '/')
                if rel_p.startswith('META-INF/'):
                    continue
                if rel_p.endswith('.arsc') or rel_p.endswith('.so') or rel_p.endswith('.png'):
                    zout.write(full_p, rel_p, compress_type=zipfile.ZIP_STORED)
                else:
                    zout.write(full_p, rel_p, compress_type=zipfile.ZIP_DEFLATED)
EOF

chmod +x "$OUTPUT_APK"

echo ""
echo "======================================================================"
echo "  🚀 FRIDAY NATIVE ANDROID APK GENERATED SUCCESSFULLY!"
echo "======================================================================"
echo "  📦 APK File Path: $OUTPUT_APK"
echo "  📏 File Size:     $(du -h "$OUTPUT_APK" | cut -f1)"
echo "======================================================================"
echo ""
echo "📲 HOW TO INSTALL ON YOUR ANDROID PHONE OR TABLET:"
echo "  1. Transfer 'dist/FRIDAY-AI.apk' to your Android device via:"
echo "     • USB cable (Downloads folder)"
echo "     • WhatsApp / Telegram / Google Drive / Email"
echo "     • Or direct download: python3 -m http.server (open phone browser)"
echo "  2. On your Android phone, tap 'FRIDAY-AI.apk'."
echo "  3. Allow 'Install from Unknown Sources' if prompted."
echo "  4. Tap 'Install' and launch FRIDAY AI!"
echo ""
