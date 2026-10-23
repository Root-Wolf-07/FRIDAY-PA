#!/usr/bin/env python3
"""
YARA Rule Builder & Template Generator
Blue Team Tool Suite (based on A-poc/BlueTeam-Tools)
Generates clean, structured YARA rules with metadata, string patterns, and conditions.
"""

import sys
import os
import argparse
from datetime import datetime

def generate_yara_rule(name, author="BlueTeam", description="", strings=None, condition=None):
    clean_name = ''.join(c if c.isalnum() or c == '_' else '_' for c in name)
    date_str = datetime.now().strftime("%Y-%m-%d")
    
    if strings is None:
        strings = []

    yara = f"""rule {clean_name}
{{
    meta:
        description = "{description or 'Detection rule for suspicious artifact'}"
        author = "{author}"
        reference = "Internal Blue Team Hunting"
        date = "{date_str}"
        version = "1.0"

    strings:
"""
    if strings:
        for idx, s in enumerate(strings):
            var_name = f"$str{idx+1}"
            if s.startswith('{') and s.endswith('}'):
                # Hex string
                yara += f"        {var_name} = {s}\n"
            else:
                # Text string
                yara += f"        {var_name} = \"{s}\" ascii wide nocase\n"
    else:
        yara += "        $sample_str = \"suspicious_payload\" ascii wide\n"
        yara += "        $magic_header = { 4D 5A } // MZ header for PE binaries\n"

    yara += "\n    condition:\n"
    if condition:
        yara += f"        {condition}\n"
    else:
        if len(strings) > 1:
            yara += "        any of ($str*)\n"
        elif len(strings) == 1:
            yara += "        $str1\n"
        else:
            yara += "        $magic_header at 0 and $sample_str\n"

    yara += "}\n"
    return yara

def main():
    parser = argparse.ArgumentParser(description="Generate a starter YARA rule template.")
    parser.add_argument("name", help="Rule identifier name (e.g. Detect_Malicious_Dropper)")
    parser.add_argument("--author", "-a", default="BlueTeam / FRIDAY", help="Rule author name")
    parser.add_argument("--desc", "-d", default="Suspicious artifact detection", help="Rule description")
    parser.add_argument("--string", "-s", action="append", help="Strings or { HEX } to look for (can be specified multiple times)")
    parser.add_argument("--condition", "-c", help="Custom condition statement (default: any of ($str*))")
    args = parser.parse_args()

    rule = generate_yara_rule(args.name, author=args.author, description=args.desc, strings=args.string, condition=args.condition)
    print(rule)

if __name__ == '__main__':
    main()
