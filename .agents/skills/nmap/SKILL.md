---
name: nmap
description: >-
  Comprehensive Network Mapper (Nmap) skill, command execution cheatsheet, and network reconnaissance runbook.
  Use when conducting port scanning, network host discovery (-sn, -Pn), service & version detection (-sV),
  OS fingerprinting (-O), aggressive multi-engine auditing (-A), Nmap Scripting Engine (NSE) vulnerability checks
  (-sC, --script), timing optimization (-T0 to -T5), firewall/IDS evasion (-f, -D), and output parsing (-oN, -oX).
---

# Nmap (Network Mapper) Skill & Operational Runbook

Nmap is the industry standard for network discovery, attack surface mapping, vulnerability assessment, and defense auditing.

---

## ⚡ Quick Scan Decision Matrix

| Goal | Command | Description | Privileges |
| :--- | :--- | :--- | :--- |
| **Fast Subnet Ping Sweep** | `nmap -sn 192.168.1.0/24` | Finds all live hosts without port scanning | User / Root |
| **Standard Fast Port Audit** | `nmap -F 192.168.1.1` | Checks top 100 most common ports | User |
| **Stealth SYN Port Scan** | `sudo nmap -sS -p 1-1000 target` | Fast SYN scan, drops before 3-way handshake | Root (sudo) |
| **Full 65,535 Port Scan** | `nmap -p- -T4 target` | Audits every TCP port with aggressive timing | User / Root |
| **Service & Version Audit** | `nmap -sV -p 80,443,22 target` | Interrogates banners to identify daemon versions | User |
| **OS Fingerprinting** | `sudo nmap -O target` | Probes TCP/IP stack to identify OS kernel | Root (sudo) |
| **Aggressive All-in-One** | `sudo nmap -A target` | OS + Service versions + Default NSE + Traceroute | Root (sudo) |
| **Vulnerability Assessment** | `nmap --script vuln target` | Audits target against known CVEs & exploits | User / Root |
| **Firewall / IDS Evasion** | `sudo nmap -f -D RND:5 -sS target` | Fragments packets and injects 5 random decoy IPs | Root (sudo) |
| **Save All Formats** | `nmap -sV -oA scan_output target` | Saves `.nmap`, `.xml`, and `.gnmap` files | User |

---

## 🛠️ Built-in Helper Scripts

Located in `scripts/`:

### 1. `nmap_runner.py`
Executes real socket-based connection audits on target IPs or domains and outputs in authentic Nmap syntax:
```bash
python3 scripts/nmap_runner.py 127.0.0.1 -p 22,80,443,4173 -sV -A
python3 scripts/nmap_runner.py 192.168.1.1 --json
```

### 2. `nmap_parser.py`
Parses raw Nmap scan output or XML into structured JSON for automated triage:
```bash
nmap -sV -p- target | python3 scripts/nmap_parser.py
```

---

## 📚 Categorized Reference Guides

Deep-dive documentation and specialized flags are located in `references/`:

| Module | Reference Document | Focus |
| :--- | :--- | :--- |
| **Host Discovery** | [references/01_host_discovery.md](file:///Users/student_02/.gemini/config/skills/nmap/references/01_host_discovery.md) | CIDR notations, Ping sweeps (`-sn`), Ping skips (`-Pn`), ARP/TCP/UDP pings |
| **Port Scanning** | [references/02_port_scanning.md](file:///Users/student_02/.gemini/config/skills/nmap/references/02_port_scanning.md) | SYN scan (`-sS`), Connect (`-sT`), UDP (`-sU`), Null/FIN/Xmas, ACK (`-sA`), Port specs |
| **Version & OS** | [references/03_service_os_detection.md](file:///Users/student_02/.gemini/config/skills/nmap/references/03_service_os_detection.md) | Version detection (`-sV`), intensity levels, OS fingerprinting (`-O`), Aggressive (`-A`) |
| **NSE Scripts** | [references/04_nse_scripting.md](file:///Users/student_02/.gemini/config/skills/nmap/references/04_nse_scripting.md) | Lua scripting engine categories (`vuln`, `safe`, `discovery`), top 15 scripts |
| **Evasion & Timing** | [references/05_evasion_timing.md](file:///Users/student_02/.gemini/config/skills/nmap/references/05_evasion_timing.md) | Timing templates (`-T0` to `-T5`), Packet fragmentation (`-f`), Decoys (`-D`), MAC spoofing |
| **Output Formats** | [references/06_output_formats.md](file:///Users/student_02/.gemini/config/skills/nmap/references/06_output_formats.md) | Normal (`-oN`), XML (`-oX`), Grepable (`-oG`), All (`-oA`), and Python XML parsers |

---

## 🎯 Pro Tips for Security Analysts

1. **Always use `-n` when speed is essential**: Reverse DNS resolution can slow down large subnet scans by 70%.
2. **Never scan UDP without specifying ports**: Scanning all 65,535 UDP ports takes hours due to ICMP rate-limiting. Use `-sU -p 53,67,123,161`.
3. **Use `--min-rate 1000` on reliable local networks**: Slashes scan time from minutes to seconds without dropping packets.
4. **Inspect SSL certificates directly**: `nmap --script ssl-cert,ssl-enum-ciphers -p 443 <target>` reveals common names, alternative names (SAN), and expired TLS keys.
