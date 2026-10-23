---
name: blue-team-tools
description: >-
  Comprehensive cyber defense runbook, threat hunting, and security operations skill based on
  A-poc/BlueTeam-Tools. Use when analyzing security incidents, investigating indicators of compromise
  (IOCs), network mapping (Nmap, Nuclei, Masscan), vulnerability auditing (Lynis, OpenVAS),
  SIEM & endpoint monitoring (Sysmon, ELK, Velociraptor), malware analysis (YARA, Ghidra, CyberChef),
  LOLBAS/GTFOBins detection, digital forensics (Autopsy, SIFT), and incident response playbooks (NIST SP 800-61).
---

# Blue Team Tools & Cyber Defense Skill

A battle-tested operational guide and toolset for Blue Teams, SOC Analysts, Incident Responders, and Threat Hunters, ported from the [A-poc/BlueTeam-Tools](https://github.com/A-poc/BlueTeam-Tools) repository.

---

## ⚡ Quick Triage & Incident Workflow

When an alert fires or an incident is suspected, execute the standardized 4-phase incident response cycle (NIST SP 800-61 Rev. 2):

```
       +---------------------------------------------+
       |           1. PREPARATION                     |
       |  Hardening, GPO rules, Sysmon, CanaryTokens |
       +---------------------------------------------+
                              |
                              v
       +---------------------------------------------+
       |         2. DETECTION & ANALYSIS             |
       |  Log triage, IOC extraction, Hash check,    |
       |  Network discovery, SIEM alert correlation  |
       +---------------------------------------------+
                              |
                              v
       +---------------------------------------------+
       |   3. CONTAINMENT, ERADICATION & RECOVERY    |
       |  Host isolation, process kill, YARA sweep,  |
       |  Account revocation, Backup restoration     |
       +---------------------------------------------+
                              |
                              v
       +---------------------------------------------+
       |          4. POST-INCIDENT ACTIVITY          |
       |  Lessons learned, Root cause analysis,      |
       |  Sigma/YARA rule update, Retrospective      |
       +---------------------------------------------+
```

---

## 🛠️ Built-in Helper Scripts

Executable helper scripts located in `scripts/`:

### 1. Extract & Defang IOCs (`scripts/ioc_extractor.py`)
Extracts IPv4, IPv6, URLs, Domains, MD5/SHA1/SHA256 hashes, and emails from any text or log file.
```bash
# Analyze a suspicious file or text
python3 scripts/ioc_extractor.py /path/to/suspect.log --defang

# Pipe raw incident notes or clipboard
cat incident.txt | python3 scripts/ioc_extractor.py --json
```

### 2. Log Triage & Brute-Force Scanner (`scripts/log_analyzer.py`)
Scans auth logs, web server logs, and syslogs for SSH brute force, web injections, LOLBAS executions, and cryptojacking pool traffic.
```bash
python3 scripts/log_analyzer.py /var/log/auth.log
python3 scripts/log_analyzer.py /var/log/nginx/access.log
```

### 3. File Hash & Entropy Inspector (`scripts/hash_checker.py`)
Computes cryptographic hashes, evaluates Shannon entropy (values > 7.2 indicate encrypted/packed ransomware payloads), and generates VirusTotal/OTX links.
```bash
python3 scripts/hash_checker.py /path/to/suspicious_sample.exe
```

### 4. YARA Rule Builder (`scripts/yara_builder.py`)
Generates structured, production-ready YARA rules.
```bash
python3 scripts/yara_builder.py Detect_CobaltStrike_Beacon -s "ReflectiveLoader" -s "beacon.dll" -s "{ 4D 5A 90 00 }"
```

---

## 📚 Categorized Reference Guides

Detailed command references, architecture diagrams, configurations, and official tool documentation are organized in `references/`:

| Domain | Reference Guide | Included Tools & Methodologies |
| :--- | :--- | :--- |
| **Threat Hunting** | [references/threat_hunting.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/threat_hunting.md) | `threathunt.app`, `hunt.io`, `Validin`, Pivot queries, Infrastructure tracking |
| **Network Discovery** | [references/network_discovery.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/network_discovery.md) | `Nmap` (cheat sheet), `Nuclei` (vulnerability templates), `Masscan`, `Angry IP Scanner`, `ZMap`, `Shodan` |
| **Vulnerability Mgmt** | [references/vulnerability_management.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/vulnerability_management.md) | `OpenVAS`, `Nessus Essentials`, `Nexpose`, `HackerOne`, `Lynis` (Linux security audits) |
| **Security Monitoring** | [references/security_monitoring.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/security_monitoring.md) | `Sysmon` (XML config & install), `Kibana`, `Logstash`, `parsedmarc`, `Phishing Catcher`, `maltrail`, `AutorunsToWinEventLog`, `procfilter`, `Velociraptor`, `SysmonSearch`, `Canary Tokens` |
| **Threat Techniques & Tips** | [references/threat_techniques.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/threat_techniques.md) | `LOLBAS`, `GTFOBins`, `filesec.io`, `KQL Search`, `Unprotect Project`, `chainsaw` (Sigma on EVTX), `freq`, `yarGen`, `EmailAnalyzer`, `VCG`, `CyberChef`, `PersistenceSniper`, Process Hacker tip, Double-click GPO hardening, PDF metadata recovery, Cryptojacking proxy filters |
| **Threat Intelligence** | [references/threat_intelligence.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/threat_intelligence.md) | `Maltego`, `MISP`, `ThreatConnect`, `Adversary Emulation Library`, Twitter CTI, Facebook ThreatExchange |
| **Incident Response** | [references/incident_response.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/incident_response.md) | `NIST SP 800-61` lifecycle, Enterprise Incident Response Plan, Ransomware Response Playbook, Microsoft IR Reference Guide, Awesome IR |
| **Malware Analysis** | [references/malware_analysis.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/malware_analysis.md) | `VirusTotal`, `IDA`, `Ghidra`, `decode-vbe`, `pafish`, `lookyloo`, `YARA`, `Cuckoo Sandbox`, `Radare2`, `dnSpy`, `malware-traffic-analysis.net` |
| **Digital Forensics** | [references/digital_forensics_recovery.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/digital_forensics_recovery.md) | `SANS SIFT`, `The Sleuth Kit`, `Autopsy`, `Recuva`, `Extundelete`, `TestDisk` / `PhotoRec` |
| **Security Training** | [references/security_training.md](file:///Users/student_02/.gemini/config/skills/blue-team-tools/references/security_training.md) | `TryHackMe`, `HackTheBox`, `CyberDefenders`, `PhishMe`, `kc7cyber` |

---

## 🎯 High-Value Blue Team Field Tips

### 1. Prevent Script Execution via Double Click (Windows)
Threat actors frequently disguise `.vbs`, `.js`, or `.wsf` malware as invoices or Word documents. Neutralize execution via GPO by associating script extensions with `notepad.exe` instead of `wscript.exe` / `cscript.exe`.

### 2. Payload Extraction via Process Hacker + dnSpy
When a process executes an obfuscated .NET binary, let it unpack in memory, inspect the loaded .NET assemblies inside Process Hacker, dump the assembly, and decompile directly using dnSpy.

### 3. Cryptojacking Detection in Proxy Logs
Cryptominers leverage DLL sideloading and cap CPU usage to bypass performance alerts. However, they must contact mining pools. Audit DNS and proxy logs for regex patterns:
`*xmr.* OR *pool.com OR *pool.org OR pool.* OR stratum+tcp://*`

### 4. CyberChef Deobfuscation
When decoding base64-encoded UTF-16 strings commonly found in malicious PowerShell commands, apply the `Remove null bytes` recipe in CyberChef to eliminate `\x00` and keep strings readable.

### 5. PDF Scrubbed Metadata Recovery
Improperly redacted PDF metadata often retains incremental updates. Expose the historical scrubbed metadata with:
```bash
exiftool -PDF-update:all= suspicious_document.pdf
```
