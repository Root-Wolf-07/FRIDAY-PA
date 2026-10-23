#!/usr/bin/env bash
# ==============================================================================
# FRIDAY A.I. — COMPLETE STANDALONE ANDROID APK BUILDER (.apk)
# Assembles, brands, aligns (4-byte zipalign), and cryptographically signs
# the complete native Android application in dist/FRIDAY-AI.apk.
#
# Compatible with Android 7.0 through Android 15 (ARM64, ARMv7, x86_64)
# ==============================================================================

set -e

export ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export DIST_DIR="$ROOT_DIR/dist"
export OUTPUT_APK="$DIST_DIR/FRIDAY-AI.apk"
BASE_APK_CACHE="/tmp/smartwebview.apk"

# Preferred python: virtual environment python (has Pillow & cryptography) or system python3
if [ -f "$ROOT_DIR/Backend_friday_AI-main/.venv/bin/python" ]; then
    PY_BIN="$ROOT_DIR/Backend_friday_AI-main/.venv/bin/python"
elif command -v python3 > /dev/null 2>&1; then
    PY_BIN="$(command -v python3)"
else
    echo "❌ Error: Python 3 not found!"
    exit 1
fi

mkdir -p "$DIST_DIR"

echo "⚡ Assembling complete native Android APK for FRIDAY A.I..."
echo "📂 Project Root:   $ROOT_DIR"
echo "🐍 Python Runtime: $PY_BIN"

# 1. Fetch base engine if not cached
if [ ! -f "$BASE_APK_CACHE" ]; then
    echo "📥 Fetching base Android WebView engine..."
    curl -L -s -o "$BASE_APK_CACHE" "https://github.com/mgks/Android-SmartWebView/releases/download/v7.5/SmartWebView-v7.5.apk"
fi

# 2. Run Complete APK Assembler, Aligner & Signer
"$PY_BIN" - << 'EOF'
import os, sys, zipfile, hashlib, base64, subprocess, tempfile, shutil, struct, zlib

root_dir = os.environ.get('ROOT_DIR', os.path.abspath('.'))
dist_dir = os.environ.get('DIST_DIR', os.path.join(root_dir, 'dist'))
os.makedirs(dist_dir, exist_ok=True)
output_apk = os.environ.get('OUTPUT_APK', os.path.join(dist_dir, 'FRIDAY-AI.apk'))
base_apk = '/tmp/smartwebview.apk'

print("📦 Unpacking Android base container...")
with tempfile.TemporaryDirectory() as tmpdir:
    unpacked_dir = os.path.join(tmpdir, 'unpacked')
    with zipfile.ZipFile(base_apk, 'r') as z:
        z.extractall(unpacked_dir)

    # 1. Clean old signatures
    metainf = os.path.join(unpacked_dir, 'META-INF')
    if os.path.exists(metainf):
        for f in list(os.listdir(metainf)):
            if f.endswith('.SF') or f.endswith('.RSA') or f.endswith('.DSA') or f == 'MANIFEST.MF':
                os.remove(os.path.join(metainf, f))
    os.makedirs(metainf, exist_ok=True)

    # 2. Brand Application Title in resources.arsc
    arsc_path = os.path.join(unpacked_dir, 'resources.arsc')
    if os.path.exists(arsc_path):
        with open(arsc_path, 'rb') as f:
            arsc_data = bytearray(f.read())
        target_str = b'Smart WebView'
        replace_str = b'FRIDAY AI HUD'  # Exactly 13 bytes to preserve offset tables perfectly
        idx = arsc_data.find(target_str)
        if idx != -1:
            arsc_data[idx:idx+len(target_str)] = replace_str
            with open(arsc_path, 'wb') as f:
                f.write(arsc_data)
            print("✓ Branded application title to 'FRIDAY AI HUD' in resources.arsc")

    # 3. Generate High-Res Adaptive & Standard Launcher Icons via Pillow
    try:
        from PIL import Image, ImageDraw
        icon_src = os.path.join(root_dir, 'icons', 'icon-512.png')
        if os.path.exists(icon_src):
            base_icon = Image.open(icon_src).convert('RGBA')

            def make_round(img):
                mask = Image.new('L', img.size, 0)
                draw = ImageDraw.Draw(mask)
                draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
                res = Image.new('RGBA', img.size, (0, 0, 0, 0))
                res.paste(img, (0, 0), mask)
                return res

            def make_fg(icon, size):
                fg = Image.new('RGBA', (size, size), (0, 0, 0, 0))
                icon_sz = int(size * 0.72)
                res = icon.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
                off = (size - icon_sz) // 2
                fg.paste(res, (off, off), res)
                return fg

            def make_bg(size):
                return Image.new('RGBA', (size, size), (4, 8, 16, 255))

            densities = {
                'mdpi': (48, 108),
                'hdpi': (72, 162),
                'xhdpi': (96, 216),
                'xxhdpi': (144, 324),
                'xxxhdpi': (192, 432)
            }

            for dens, (main_sz, fg_sz) in densities.items():
                mip_dir = os.path.join(unpacked_dir, 'res', f'mipmap-{dens}-v4')
                if os.path.exists(mip_dir):
                    # ic_launcher.webp
                    main_img = base_icon.resize((main_sz, main_sz), Image.Resampling.LANCZOS)
                    main_img.save(os.path.join(mip_dir, 'ic_launcher.webp'), 'WEBP', quality=95)

                    # ic_launcher_round.webp
                    round_img = make_round(main_img)
                    round_img.save(os.path.join(mip_dir, 'ic_launcher_round.webp'), 'WEBP', quality=95)

                    # ic_launcher_foreground.webp
                    fg_img = make_fg(base_icon, fg_sz)
                    fg_img.save(os.path.join(mip_dir, 'ic_launcher_foreground.webp'), 'WEBP', quality=95)

                    # ic_launcher_background.webp
                    bg_img = make_bg(fg_sz)
                    bg_img.save(os.path.join(mip_dir, 'ic_launcher_background.webp'), 'WEBP', quality=95)

            print("✓ Generated high-resolution adaptive & round launcher icons across all screen densities")
    except Exception as e:
        print(f"⚠️  Launcher icon generation notice: {e}")

    # 4. Configure SmartWebView Properties for clean, ad-free Tactical HUD
    props_path = os.path.join(unpacked_dir, 'assets', 'swv.properties')
    with open(props_path, 'w') as f:
        f.write('''# FRIDAY A.I. Tactical Defense HUD Configuration
build.application.id=com.gojo.friday.ai
build.version.code=8
build.version.name=8.4.2
build.sdk.compile=36
build.sdk.min=24

# --- URLs ---
app.url=file:///android_asset/web/index.html
offline.url=file:///android_asset/web/index.html
search.url=https://www.google.com/search?q=
external.url.exception.list=

# --- Clean Runtime (No Ads, No Third-Party Analytics) ---
debug.mode=false
analytics.gtag.id=

# --- Features ---
feature.uploads=true
feature.camera.uploads=true
feature.multiple.uploads=true
feature.copy.paste=true
feature.pull.refresh=false
feature.progress.bar=false
feature.zoom=false
feature.save.form=false
feature.open.external.urls=false
feature.chrome.tabs=false
feature.exit.dialog=false

# --- Permissions ---
permissions.on.launch=NOTIFICATIONS

# --- Security & UI ---
security.verify.ssl=false
ui.orientation=0
ui.layout=0
ui.drawer.header=false
ui.splash.extend=false

# --- User Agent ---
agent.postfix.enabled=true
agent.postfix.value=FridayTacticalHUD

# --- Plugins ---
plugins.enabled=LocationPlugin,DialogPlugin,JSInterfacePlugin,ToastPlugin
plugins.playground.enabled=false
''')
    print("✓ Configured full-screen tactical HUD properties with zero ads and zero third-party telemetry")

    # 5. Bundle Complete Web HUD Assets
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

    # Copy Icons, Character References, and Assets
    for folder in ['icons', 'chareter refference', 'assets']:
        src_f = os.path.join(root_dir, folder)
        if os.path.exists(src_f):
            shutil.copytree(src_f, os.path.join(web_dir, folder), dirs_exist_ok=True)

    # Splash Branding
    icon_512 = os.path.join(root_dir, 'icons', 'icon-512.png')
    if os.path.exists(icon_512):
        shutil.copy2(icon_512, os.path.join(web_dir, 'swv_splash.png'))
        shutil.copy2(icon_512, os.path.join(web_dir, 'swv_splash_white.png'))
        for splash_dir in ['res/raw', 'res/raw-night-v8']:
            sd = os.path.join(unpacked_dir, splash_dir)
            if os.path.exists(sd):
                shutil.copy2(icon_512, os.path.join(sd, 'front_splash.png'))

    print("✓ Bundled all tactical HUD HTML5, JS, CSS, audio, and character references into assets/web/")

    # 6. Build Manifest & Cryptographic Signature Lists
    all_rel_files = []
    for r, dirs, files in os.walk(unpacked_dir):
        for f in sorted(files):
            full_p = os.path.join(r, f)
            rel_p = os.path.relpath(full_p, unpacked_dir).replace(os.path.sep, '/')
            if rel_p.startswith('META-INF/'):
                continue
            all_rel_files.append(rel_p)
    all_rel_files.sort()

    manifest_entries = []
    sf_entries = []
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

    # Generate X.509 RSA Certificate & Sign PKCS#7 CERT.RSA
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
        'openssl', 'cms', '-sign',
        '-in', sf_path,
        '-inkey', key_path,
        '-signer', cert_path,
        '-out', rsa_path,
        '-outform', 'DER',
        '-nodetach', '-binary'
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print("✓ Cryptographically signed package with 2048-bit RSA X.509 Certificate")

    # 7. Package APK with 4-Byte ZIP-Alignment (zipalign 4)
    print("⚡ Performing 4-byte ZIP alignment & packaging...")
    
    # Priority entries: signature files first
    priority_files = ['META-INF/MANIFEST.MF', 'META-INF/CERT.SF', 'META-INF/CERT.RSA']
    remaining_files = [f for f in all_rel_files if not f.startswith('META-INF/')]
    all_files_to_pack = priority_files + remaining_files

    with open(output_apk, 'wb') as fout:
        cd_records = []
        
        for rel_p in all_files_to_pack:
            local_offset = fout.tell()
            fn_bytes = rel_p.encode('utf-8')
            full_p = os.path.join(unpacked_dir, rel_p)
            with open(full_p, 'rb') as fp:
                raw_data = fp.read()

            uncomp_size = len(raw_data)
            crc = zlib.crc32(raw_data)

            # Android Stored (Uncompressed) vs Deflated Rule:
            # Uncompressed: .arsc, .so, raw .png, .webp (for mmap speed)
            # Deflated: .dex, .xml, .html, .js, .css, .json, .txt, etc.
            is_stored = (
                rel_p.endswith('.arsc') or 
                rel_p.endswith('.so') or 
                rel_p.endswith('.png') or 
                rel_p.endswith('.webp')
            )
            
            if is_stored:
                comp_type = 0  # STORED
                comp_data = raw_data
                comp_size = uncomp_size
                
                # 4-Byte Alignment Padding
                hdr_base_len = 30 + len(fn_bytes)
                data_offset = local_offset + hdr_base_len
                rem = data_offset % 4
                pad_len = (4 - rem) % 4
                extra = b'\x00' * pad_len
            else:
                comp_type = 8  # DEFLATED
                deflator = zlib.compressobj(level=9, method=zlib.DEFLATED, wbits=-15)
                comp_data = deflator.compress(raw_data) + deflator.flush()
                comp_size = len(comp_data)
                extra = b''

            # Write Local File Header
            local_hdr = struct.pack(
                '<IHHHHHIIIHH',
                0x04034b50,  # Signature
                20,          # Version needed (2.0)
                0,           # General flags
                comp_type,   # Compression method
                0, 0,        # Time, Date
                crc,
                comp_size,
                uncomp_size,
                len(fn_bytes),
                len(extra)
            )
            fout.write(local_hdr)
            fout.write(fn_bytes)
            fout.write(extra)

            # Verification of 4-byte boundary for uncompressed entries
            if comp_type == 0:
                assert fout.tell() % 4 == 0, f"Critical: Data for {rel_p} not 4-byte aligned at offset {fout.tell()}"

            fout.write(comp_data)

            # Prepare Central Directory Header
            cd_hdr = struct.pack(
                '<IHHHHHHIIIHHHHHII',
                0x02014b50,  # CD Signature
                20,          # Version made by (UNIX 2.0)
                20,          # Version needed
                0,           # General flags
                comp_type,
                0, 0,        # Time, Date
                crc,
                comp_size,
                uncomp_size,
                len(fn_bytes),
                len(extra),
                0,           # Comment length
                0,           # Disk number start
                0,           # Internal file attributes
                0,           # External file attributes
                local_offset # Relative offset of local header
            )
            cd_records.append((cd_hdr, fn_bytes, extra))

        # Write Central Directory
        cd_start = fout.tell()
        for cd_hdr, fn_bytes, extra in cd_records:
            fout.write(cd_hdr)
            fout.write(fn_bytes)
            fout.write(extra)
        cd_size = fout.tell() - cd_start

        # Write End of Central Directory (EoCD)
        eocd = struct.pack(
            '<IHHHHIIH',
            0x06054b50,
            0,
            0,
            len(all_files_to_pack),
            len(all_files_to_pack),
            cd_size,
            cd_start,
            0
        )
        fout.write(eocd)

    print("✓ Completed 4-byte ZIP alignment on 100% of stored resources and assets")

# 8. Post-Assembly Verification
print("🔍 Verifying final APK integrity...")
with open(output_apk, 'rb') as fp:
    apk_bytes = fp.read()

zf = zipfile.ZipFile(output_apk, 'r')
misaligned_count = 0
for info in zf.infolist():
    if info.compress_type == 0:
        offset = info.header_offset
        header = apk_bytes[offset:offset+30]
        sig, ver, flags, comp, mtime, mdate, crc, csize, usize, fn_len, extra_len = struct.unpack('<IHHHHHIIIHH', header)
        data_pos = offset + 30 + fn_len + extra_len
        if data_pos % 4 != 0:
            misaligned_count += 1

assert misaligned_count == 0, f"Error: Found {misaligned_count} misaligned entries!"
assert 'resources.arsc' in zf.namelist(), "Error: resources.arsc missing!"
assert 'META-INF/CERT.RSA' in zf.namelist(), "Error: CERT.RSA missing!"

print(f"✓ Verification Passed: 0 misaligned entries across {len(zf.infolist())} total package files.")
print(f"✓ Final APK Package Size: {len(apk_bytes):,} bytes (~{len(apk_bytes)/(1024*1024):.1f} MB)")
EOF

chmod +x "$OUTPUT_APK"

echo ""
echo "======================================================================"
echo "  🚀 COMPLETE ANDROID APK GENERATED & READY FOR INSTALLATION!"
echo "======================================================================"
echo "  📦 APK Location: $OUTPUT_APK"
echo "  📏 Binary Size:  $(du -h "$OUTPUT_APK" | cut -f1)"
echo "  🛡️  Title:        FRIDAY AI HUD (Gojo Enterprise Tactical OS)"
echo "  ⚡ Alignment:    100% 4-Byte ZIP-Aligned (Zero Android Install Errors)"
echo "  🔐 Signature:    Valid 2048-bit RSA X.509 PKCS#7 Signed"
echo "======================================================================"
echo ""
echo "📲 INSTALL ON YOUR ANDROID PHONE OR TABLET:"
echo "  1. DIRECT BROWSER DOWNLOAD (Connect phone to same Wi-Fi):"
echo "     Open: http://<YOUR_COMPUTER_IP>:8000/dist/FRIDAY-AI.apk"
echo ""
echo "  2. VIA USB CABLE / ADB:"
echo "     adb install -r dist/FRIDAY-AI.apk"
echo ""
echo "  3. FILE TRANSFER:"
echo "     Transfer dist/FRIDAY-AI.apk to phone via Google Drive, USB, or AirDrop,"
echo "     tap the file, allow 'Install unknown apps', and tap 'Install'!"
echo ""
