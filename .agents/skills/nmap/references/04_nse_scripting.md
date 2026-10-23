# Nmap Scripting Engine (NSE) Reference

The Nmap Scripting Engine (NSE) transforms Nmap into a vulnerability assessment scanner, network mapper, and protocol interrogation system using Lua scripts.

---

## 1. Running NSE Scripts

### Default Safe Scripts (`-sC`)
Runs the curated set of default, non-intrusive scripts:
```bash
nmap -sC 192.168.1.1
```

### Specific Script or Category (`--script`)
```bash
# Run a specific script
nmap --script ssl-cert -p 443 192.168.1.1

# Run multiple scripts
nmap --script "http-title,ssl-cert,banner" -p 80,443 192.168.1.1

# Run an entire category
nmap --script vuln 192.168.1.1
```

### Script Arguments (`--script-args`)
Passes configuration parameters into scripts:
```bash
nmap --script http-form-brute --script-args "userdb=users.txt,passdb=pass.txt" 192.168.1.1
```

---

## 2. NSE Categories

| Category | Description | Safety Level |
| :--- | :--- | :--- |
| **default** | Safe, reliable, and provides essential service metadata | Safe (included in `-sC` and `-A`) |
| **vuln** | Audits for known CVE vulnerabilities and misconfigurations | Moderately Intrusive |
| **safe** | Probes not designed to crash services or consume high bandwidth | Safe |
| **discovery** | Actively maps directory structures, shares, SNMP info | Informational |
| **auth** | Tests for default, blank, or bypassable authentication | Safe |
| **brute** | Conducts password dictionary brute-force attacks | High Noise / Intrusive |
| **exploit** | Actively attempts exploitation of detected vulnerabilities | Caution / High Risk |
| **broadcast** | Discovers local hosts via mDNS, NetBIOS, DHCP broadcasts | LAN Discovery |

---

## 3. Top 15 Defensive & Audit NSE Scripts

| Script Name | Target | Purpose |
| :--- | :--- | :--- |
| `ssl-cert` | 443/TCP | Inspects TLS certificate issuer, validity dates, subject SANs |
| `ssl-enum-ciphers` | 443/TCP | Identifies weak SSL/TLS ciphers, SSLv3, TLS 1.0, CBC mode |
| `http-title` | 80,443/TCP | Extracts the HTML `<title>` tag from web services |
| `http-headers` | 80,443/TCP | Audits security response headers (HSTS, CSP, X-Frame-Options) |
| `http-enum` | 80,443/TCP | Enumerates common web paths (admin panels, phpmyadmin, wp-login) |
| `smb-vuln-ms17-010` | 445/TCP | Checks for EternalBlue (WannaCry) SMB vulnerability |
| `smb-os-discovery` | 445/TCP | Extracts OS build, computer name, and domain over SMB |
| `smb-security-mode` | 445/TCP | Validates SMB signing status (critical for relay defense) |
| `ssh-auth-methods` | 22/TCP | Lists supported SSH authentication mechanisms |
| `ssh-hostkey` | 22/TCP | Grabs SSH host key fingerprints (RSA, ECDSA, ED25519) |
| `ftp-anon` | 21/TCP | Checks for Anonymous FTP login access |
| `dns-brute` | 53/UDP | Brute-forces DNS subdomains using internal wordlists |
| `vulners` | Any | Cross-references detected service CPEs against CVE databases |
| `banner` | Any | Grabs raw application banners upon connection |
| `traceroute-geolocation` | Target | Maps each hop in traceroute to physical coordinates |
