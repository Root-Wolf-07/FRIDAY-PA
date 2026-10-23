#!/usr/bin/env python3
"""
IOC Extractor & Defanger
Blue Team Tool Suite (based on A-poc/BlueTeam-Tools)
Extracts and normalizes Indicators of Compromise (IOCs) from text, logs, emails, or files.
"""

import sys
import re
import argparse
import json

IPV4_REGEX = re.compile(r'\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b')
IPV6_REGEX = re.compile(r'\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b')
EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b')
URL_REGEX = re.compile(r'\b(?:https?|ftp|hxxps?):\/\/[^\s/$.?#].[^\s]*', re.IGNORECASE)
DOMAIN_REGEX = re.compile(r'\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}\b')
MD5_REGEX = re.compile(r'\b[a-fA-F0-9]{32}\b')
SHA1_REGEX = re.compile(r'\b[a-fA-F0-9]{40}\b')
SHA256_REGEX = re.compile(r'\b[a-fA-F0-9]{64}\b')

COMMON_EXTENSIONS = {'.exe', '.dll', '.ps1', '.vbs', '.bat', '.sh', '.py', '.txt', '.pdf', '.docx', '.xlsx', '.zip', '.tar', '.gz'}

def defang_ip(ip):
    return ip.replace('.', '[.]')

def refang_ip(ip):
    return ip.replace('[.]', '.')

def defang_url(url):
    url = re.sub(r'^https?://', lambda m: m.group(0).replace('http', 'hxxp'), url, flags=re.IGNORECASE)
    return url.replace('.', '[.]')

def defang_domain(domain):
    return domain.replace('.', '[.]')

def extract_iocs(text, defang=False):
    # Normalize input for regex matching if it was previously defanged
    normalized = text.replace('[.]', '.').replace('(.)', '.').replace('hxxp', 'http')

    raw_ips = set(IPV4_REGEX.findall(normalized))
    # Filter out common local non-routable noise if needed (optional)
    ips = [ip for ip in raw_ips if not ip.startswith('0.')]

    raw_urls = set(URL_REGEX.findall(normalized))
    raw_emails = set(EMAIL_REGEX.findall(normalized))
    
    # Extract domains (exclude domains already part of URLs or Emails)
    raw_domains = set(DOMAIN_REGEX.findall(normalized))
    domains = set()
    for d in raw_domains:
        if d.lower().endswith(tuple(COMMON_EXTENSIONS)):
            continue
        # Avoid duplicate IPs matched as domains
        if IPV4_REGEX.match(d):
            continue
        domains.add(d)

    sha256 = set(SHA256_REGEX.findall(text))
    sha1 = set(SHA1_REGEX.findall(text)) - sha256
    md5 = set(MD5_REGEX.findall(text)) - sha256 - sha1

    result = {
        'ipv4': sorted(list(ips)),
        'urls': sorted(list(raw_urls)),
        'domains': sorted(list(domains)),
        'emails': sorted(list(raw_emails)),
        'md5': sorted(list(md5)),
        'sha1': sorted(list(sha1)),
        'sha256': sorted(list(sha256))
    }

    if defang:
        result['ipv4'] = [defang_ip(i) for i in result['ipv4']]
        result['urls'] = [defang_url(u) for u in result['urls']]
        result['domains'] = [defang_domain(d) for d in result['domains']]

    return result

def main():
    parser = argparse.ArgumentParser(description="Extract Indicators of Compromise (IOCs) from text or files.")
    parser.add_argument("input", nargs="?", help="Input file or string (reads from stdin if empty)")
    parser.add_argument("--defang", "-d", action="store_true", help="Defang IPs, domains, and URLs (e.g. hxxp, [.])")
    parser.add_argument("--json", "-j", action="store_true", help="Output results in JSON format")
    args = parser.parse_args()

    content = ""
    if args.input:
        import os
        if os.path.isfile(args.input):
            with open(args.input, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        else:
            content = args.input
    else:
        if not sys.stdin.isatty():
            content = sys.stdin.read()
        else:
            parser.print_help()
            sys.exit(1)

    iocs = extract_iocs(content, defang=args.defang)

    if args.json:
        print(json.dumps(iocs, indent=2))
    else:
        print("=" * 60)
        print("             BLUE TEAM IOC EXTRACTION REPORT               ")
        print("=" * 60)
        for cat, items in iocs.items():
            print(f"\n[+] {cat.upper()} ({len(items)} found):")
            if not items:
                print("    (none)")
            for item in items:
                print(f"    - {item}")
        print("\n" + "=" * 60)

if __name__ == '__main__':
    main()
