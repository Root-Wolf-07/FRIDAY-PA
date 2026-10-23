#!/usr/bin/env python3
"""
File Hash & Threat Intel Lookup Helper
Blue Team Tool Suite (based on A-poc/BlueTeam-Tools)
Computes cryptographic hashes (MD5, SHA1, SHA256), Shannon entropy,
and formats Threat Intelligence search links.
"""

import sys
import os
import math
import hashlib
import argparse

def calculate_entropy(data):
    """Calculates Shannon entropy of byte data (0 to 8). Values > 7.0 indicate packing/encryption."""
    if not data:
        return 0.0
    entropy = 0
    total = len(data)
    counts = {}
    for b in data:
        counts[b] = counts.get(b, 0) + 1
    for count in counts.values():
        p_x = float(count) / total
        if p_x > 0:
            entropy += - p_x * math.log2(p_x)
    return entropy

def inspect_file(filepath):
    if not os.path.exists(filepath):
        print(f"[-] File not found: {filepath}")
        return None

    size = os.path.getsize(filepath)
    md5 = hashlib.md5()
    sha1 = hashlib.sha1()
    sha256 = hashlib.sha256()

    with open(filepath, 'rb') as f:
        content = f.read()
        md5.update(content)
        sha1.update(content)
        sha256.update(content)

    entropy = calculate_entropy(content)
    md5_hex = md5.hexdigest()
    sha1_hex = sha1.hexdigest()
    sha256_hex = sha256.hexdigest()

    return {
        'filepath': os.path.abspath(filepath),
        'size': size,
        'entropy': entropy,
        'md5': md5_hex,
        'sha1': sha1_hex,
        'sha256': sha256_hex
    }

def main():
    parser = argparse.ArgumentParser(description="Analyze file hashes, Shannon entropy, and generate threat intel links.")
    parser.add_argument("file", help="Path to suspect binary or file")
    args = parser.parse_args()

    info = inspect_file(args.file)
    if not info:
        sys.exit(1)

    entropy_val = info['entropy']
    entropy_status = "NORMAL (Plaintext/Unpacked)"
    if entropy_val > 7.2:
        entropy_status = "HIGH ENTROPY (Likely Packed, Encrypted, or Ransomware Payload!)"
    elif entropy_val > 6.5:
        entropy_status = "MODERATE ENTROPY (Possibly compressed or compiled code)"

    print("=" * 70)
    print("           BLUE TEAM FILE ARTIFACT INSPECTION REPORT             ")
    print("=" * 70)
    print(f"File Path      : {info['filepath']}")
    print(f"File Size      : {info['size']} bytes ({info['size'] / 1024:.2f} KB)")
    print(f"Shannon Entropy: {entropy_val:.4f} / 8.0000 -> {entropy_status}")
    print("-" * 70)
    print(f"MD5            : {info['md5']}")
    print(f"SHA-1          : {info['sha1']}")
    print(f"SHA-256        : {info['sha256']}")
    print("-" * 70)
    print("THREAT INTELLIGENCE DIRECT QUERY URLS:")
    print(f" * VirusTotal     : https://www.virustotal.com/gui/file/{info['sha256']}")
    print(f" * MalwareBazaar  : https://bazaar.abuse.ch/sample/{info['sha256']}")
    print(f" * AlienVault OTX : https://otx.alienvault.com/indicator/file/{info['sha256']}")
    print(f" * HybridAnalysis : https://www.hybrid-analysis.com/search?query={info['sha256']}")
    print("=" * 70)

if __name__ == '__main__':
    main()
