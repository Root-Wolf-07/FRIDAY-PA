# Nmap Host Discovery (Ping Scanning & Target Specification)

Host discovery enables a security analyst or network engineer to determine which IP addresses in a target range are currently online without initiating a full port scan on every host.

---

## 1. Target Specification Formats

Nmap accepts flexible target notations:

| Format | Example | Description |
| :--- | :--- | :--- |
| **Single Host** | `nmap 192.168.1.1` or `nmap scanme.nmap.org` | Scans a single IP or resolved FQDN |
| **CIDR Subnet** | `nmap 192.168.1.0/24` | Scans all 256 addresses in a /24 subnet |
| **Octet Range** | `nmap 192.168.1.1-50` | Scans IPs from .1 through .50 |
| **Multiple Ranges** | `nmap 10.0.0,1,2.1-100` | Scans across multiple subnets |
| **Target List File** | `nmap -iL targets.txt` | Reads newline or space-delimited targets from file |
| **Exclude Targets** | `nmap 192.168.1.0/24 --exclude 192.168.1.1,192.168.1.254` | Excludes critical gateways or printers |
| **Exclude File** | `nmap 192.168.1.0/24 --excludefile exclude.txt` | Excludes ranges listed in a file |
| **Random Targets** | `nmap -iR 100 -p 80` | Scans 100 randomly generated public hosts |

---

## 2. Host Discovery Techniques

By default, Nmap performs host discovery prior to port scanning. If a host is determined to be offline, it skips port scanning to save time.

### Ping Sweep (`-sn` / `-sP`)
Disables port scanning; only determines which hosts are online:
```bash
nmap -sn 192.168.1.0/24
```
* On a local Ethernet (LAN) segment, Nmap sends ARP requests (`-PR`), which are unblockable by local host firewalls.
* Against remote targets across a router, Nmap sends:
  - ICMP Echo Request (`-PE`)
  - TCP SYN packet to port 443 (`-PS443`)
  - TCP ACK packet to port 80 (`-PA80`)
  - ICMP Timestamp Request (`-PP`)

### Skip Host Discovery (`-Pn`)
Treats all target hosts as online. Use when firewalls block ICMP or ping probes:
```bash
nmap -Pn 192.168.1.100
```

### TCP SYN Ping (`-PS[portlist]`)
Sends an empty TCP packet with the SYN flag set. Open ports reply with SYN/ACK; closed ports reply with RST. Both responses prove the host is active:
```bash
# Ping using ports 80, 443, and 8080
nmap -sn -PS80,443,8080 192.168.1.0/24
```

### TCP ACK Ping (`-PA[portlist]`)
Sends an ACK packet. Since no TCP connection exists, hosts respond with an RST packet:
```bash
nmap -sn -PA80,443 192.168.1.0/24
```

### UDP Ping (`-PU[portlist]`)
Sends an empty UDP packet to high ports (default 40125). Closed UDP ports respond with an ICMP Port Unreachable message, confirming host presence:
```bash
nmap -sn -PU53,161 192.168.1.0/24
```

### ICMP Types (`-PE`, `-PP`, `-PM`)
* `-PE`: Standard ICMP Echo Request (Ping)
* `-PP`: ICMP Timestamp Request (bypasses simple echo filters)
* `-PM`: ICMP Address Mask Request

---

## 3. DNS Resolution Controls

* `-n`: Never perform reverse DNS resolution (drastically speeds up scans).
* `-R`: Always resolve reverse DNS for all target IPs.
* `--dns-servers <srv1,srv2>`: Query specified DNS servers instead of system defaults.
