#!/usr/bin/env python3
"""
Nmap Scan Output Parser
Parses Nmap output (normal text or XML) into structured JSON summaries.
"""

import sys
import re
import json
import argparse

def parse_nmap_text(text):
    results = {
        'hosts': []
    }
    
    current_host = None
    for line in text.split('\n'):
        line_clean = line.strip()
        host_match = re.search(r'Nmap scan report for (.*?)(?:\s+\((.*?)\))?$', line_clean)
        if host_match:
            name = host_match.group(1)
            ip = host_match.group(2) or name
            current_host = {
                'target': name,
                'ip': ip,
                'status': 'up',
                'ports': []
            }
            results['hosts'].append(current_host)
            continue
            
        port_match = re.match(r'^(\d+)\/(tcp|udp)\s+(\w+)\s+([\w\-]+)(?:\s+(.*))?$', line_clean)
        if port_match and current_host:
            current_host['ports'].append({
                'port': int(port_match.group(1)),
                'protocol': port_match.group(2),
                'state': port_match.group(3),
                'service': port_match.group(4),
                'version': (port_match.group(5) or '').strip()
            })

    return results

def main():
    parser = argparse.ArgumentParser(description="Parse Nmap output into structured JSON.")
    parser.add_argument("file", nargs="?", help="Nmap output file (reads stdin if not provided)")
    args = parser.parse_args()

    content = ""
    if args.file:
        with open(args.file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    else:
        if not sys.stdin.isatty():
            content = sys.stdin.read()
        else:
            parser.print_help()
            sys.exit(1)

    parsed = parse_nmap_text(content)
    print(json.dumps(parsed, indent=2))

if __name__ == '__main__':
    main()
