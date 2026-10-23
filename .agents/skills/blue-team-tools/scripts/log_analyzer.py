#!/usr/bin/env python3
"""
Blue Team Log Analyzer & Suspicious Pattern Detector
Blue Team Tool Suite (based on A-poc/BlueTeam-Tools)
Scans system logs, web server logs, or command history for security incidents:
- SSH brute force attacks
- Web attack patterns (SQLi, XSS, Path Traversal, Web Shells)
- LOLBAS / GTFOBins execution attempts
- Cryptojacking pool connections
"""

import sys
import re
import argparse
from collections import defaultdict, Counter

# Suspicious signatures
WEB_PATTERNS = [
    ('SQL Injection', re.compile(r'(\bUNION\b.+?\bSELECT\b|\bOR\s+[\'\"0-9]+=[0-9\'\"]+|\bWAITFOR\s+DELAY\b|sleep\(\d+\)|--|\/\*|\*\/)', re.IGNORECASE)),
    ('Directory Traversal / LFI', re.compile(r'(\.\./|\.\.\\|/etc/passwd|/etc/shadow|/proc/self/environ|win.ini|boot.ini)', re.IGNORECASE)),
    ('Command Injection / RCE', re.compile(r'(;\s*(?:id|whoami|cat\s+/etc|nc\s+-e|bash\s+-i|curl\s+|wget\s+)|\|\||&&)', re.IGNORECASE)),
    ('Web Shell Access', re.compile(r'(\.(php|jsp|asp|aspx|cgi|sh)\?(cmd|exec|eval|command|payload)=|c99\.php|r57\.php|b374k)', re.IGNORECASE)),
    ('Cross-Site Scripting (XSS)', re.compile(r'(<script\b[^>]*>|javascript:|alert\(|onerror=|onload=)', re.IGNORECASE)),
]

LOLBAS_PATTERNS = [
    ('Certutil Remote Download', re.compile(r'certutil(?:\.exe)?\s+.*-(?:urlcache|f)\s+.*http', re.IGNORECASE)),
    ('Bitsadmin Transfer', re.compile(r'bitsadmin(?:\.exe)?\s+.*\/transfer', re.IGNORECASE)),
    ('Mshta Remote Execution', re.compile(r'mshta(?:\.exe)?\s+.*(?:http|javascript|vbscript)', re.IGNORECASE)),
    ('PowerShell Encoded Command', re.compile(r'powershell(?:\.exe)?\s+.*(?:-enc|-encodedcommand)\s+[A-Za-z0-9+/=]{10,}', re.IGNORECASE)),
    ('Wget / Curl to Shell Pipe', re.compile(r'(curl|wget)\s+.*\|\s*(sh|bash|python|perl)', re.IGNORECASE)),
]

CRYPTOJACKING_PATTERNS = [
    ('Mining Pool Connection', re.compile(r'(xmr\.|monero|stratum\+tcp|pool\.supportxmr\.com|nanopool\.org|minexmr\.com|hashvault\.pro|f2pool)', re.IGNORECASE))
]

def analyze_file(filepath):
    results = {
        'total_lines': 0,
        'ssh_failed_logins': defaultdict(int),
        'ssh_accepted_logins': defaultdict(int),
        'web_attacks': defaultdict(list),
        'lolbas_detections': [],
        'cryptojacking_matches': []
    }

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            for line_no, line in enumerate(f, 1):
                results['total_lines'] += 1
                stripped = line.strip()

                # SSH Brute Force checks
                if "Failed password for" in line:
                    ip_match = re.search(r'from\s+([0-9.]+)', line)
                    if ip_match:
                        results['ssh_failed_logins'][ip_match.group(1)] += 1
                elif "Accepted password for" in line or "Accepted publickey for" in line:
                    ip_match = re.search(r'from\s+([0-9.]+)', line)
                    if ip_match:
                        results['ssh_accepted_logins'][ip_match.group(1)] += 1

                # Web attacks
                for vuln_name, regex in WEB_PATTERNS:
                    if regex.search(line):
                        results['web_attacks'][vuln_name].append((line_no, stripped[:140]))

                # LOLBAS checks
                for tech_name, regex in LOLBAS_PATTERNS:
                    if regex.search(line):
                        results['lolbas_detections'].append((line_no, tech_name, stripped[:140]))

                # Cryptojacking checks
                for tech_name, regex in CRYPTOJACKING_PATTERNS:
                    if regex.search(line):
                        results['cryptojacking_matches'].append((line_no, tech_name, stripped[:140]))

    except Exception as e:
        print(f"[-] Error reading {filepath}: {e}")
        return None

    return results

def print_report(filepath, res):
    print("=" * 70)
    print(f"          BLUE TEAM LOG AUDIT REPORT: {filepath}")
    print("=" * 70)
    print(f"Total lines parsed: {res['total_lines']}")
    
    # SSH brute force
    if res['ssh_failed_logins']:
        print("\n[!] SSH FAILED LOGIN ATTEMPTS (Potential Brute Force):")
        top_ips = sorted(res['ssh_failed_logins'].items(), key=lambda x: x[1], reverse=True)[:10]
        for ip, count in top_ips:
            status = "CRITICAL (>10 failures)" if count > 10 else "WARNING"
            print(f"    - IP {ip:16}: {count:4} failures [{status}]")
    else:
        print("\n[+] SSH Logins: No brute-force signatures detected.")

    # Web attacks
    if res['web_attacks']:
        print("\n[!] SUSPICIOUS WEB / INJECTION SIGNATURES:")
        for vuln_name, occurrences in res['web_attacks'].items():
            print(f"    * {vuln_name}: {len(occurrences)} matches")
            for line_no, sample in occurrences[:3]:
                print(f"      [Line {line_no}]: {sample}")
            if len(occurrences) > 3:
                print(f"      ... and {len(occurrences) - 3} more occurrences")
    else:
        print("\n[+] Web Application Logs: No obvious injection signatures found.")

    # LOLBAS
    if res['lolbas_detections']:
        print("\n[!] LIVING OFF THE LAND (LOLBAS/GTFOBins) EXECUTIONS:")
        for line_no, tech, sample in res['lolbas_detections'][:10]:
            print(f"    * Line {line_no} [{tech}]: {sample}")
    else:
        print("\n[+] Living-Off-The-Land: No LOLBAS suspicious downloads observed.")

    # Cryptojacking
    if res['cryptojacking_matches']:
        print("\n[!] CRYPTOJACKING POOL CONNECTIONS:")
        for line_no, tech, sample in res['cryptojacking_matches'][:5]:
            print(f"    * Line {line_no} [{tech}]: {sample}")
    else:
        print("\n[+] Cryptojacking: No mining pool strings detected.")

    print("\n" + "=" * 70)

def main():
    parser = argparse.ArgumentParser(description="Blue Team log triage and anomaly detection tool.")
    parser.add_argument("logfile", help="Path to log file (syslog, auth.log, access.log, etc.)")
    args = parser.parse_args()

    results = analyze_file(args.logfile)
    if results:
        print_report(args.logfile, results)

if __name__ == '__main__':
    main()
