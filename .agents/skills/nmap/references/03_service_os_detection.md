# Nmap Service & OS Fingerprinting

Detecting the exact application name, service version, and underlying operating system kernel is essential for vulnerability assessment and patch management.

---

## 1. Service & Version Detection (`-sV`)

Once open TCP/UDP ports are discovered, `-sV` queries the ports using protocol probes from `nmap-service-probes` to elicit banners and responses:
```bash
nmap -sV 192.168.1.10
```

### Version Intensity Levels
Controls which probes are sent to balance speed vs completeness (scale 0-9, default is 7):
* `--version-intensity 0` (Light): Sends only the most common probes.
* `--version-intensity 9` (All): Tries every probe in the database against every port.
* `--version-light`: Alias for intensity 2.
* `--version-all`: Alias for intensity 9.

### Version Trace
Debugs banner exchange and matching signatures:
```bash
nmap -sV --version-trace 192.168.1.10
```

---

## 2. Remote OS Fingerprinting (`-O`)

Nmap sends up to 16 TCP, UDP, and ICMP probes to open and closed ports, analyzing subtleties in the target's TCP/IP stack implementation:
- Initial Sequence Number (ISN) predictability
- TCP options ordering (MSS, Window Scale, SACK-Permitted, Timestamp)
- IP ID generation algorithm
- Window sizes and TCP flags in RST responses
- ICMP error message generation

```bash
sudo nmap -O 192.168.1.10
```

### OS Guessing & Limits
* `--osscan-limit`: Only attempts OS detection if at least one open and one closed TCP port are found.
* `--osscan-guess` or `--fuzzy`: Aggressively guesses the closest OS match when an exact fingerprint is absent.
* `--max-os-tries <n>`: Limits retry attempts (default 5).

---

## 3. Aggressive Scan Engine (`-A`)

`-A` is a powerful meta-flag combining four key auditing features in a single command:
```bash
sudo nmap -A 192.168.1.10
```
It enables:
1. `-O`: Remote OS detection
2. `-sV`: Service version detection
3. `-sC`: Default Nmap Scripting Engine (NSE) script scan
4. `--traceroute`: IP hop tracing with geocoding
