# Nmap Port Scanning Techniques & Port Specifications

Port scanning is the core mechanism of Nmap. It probes target transport-layer ports to classify their state as **open**, **closed**, **filtered**, **unfiltered**, **open|filtered**, or **closed|filtered**.

---

## 1. Port States Explained

* **open**: An application is actively accepting TCP connections or UDP packets.
* **closed**: The port responds with an RST (TCP) or ICMP Port Unreachable (UDP); no service is listening.
* **filtered**: A firewall, packet filter, or router rule prevents probes from reaching the port or suppresses responses. Nmap cannot verify if the port is open or closed.
* **unfiltered**: The port is accessible (responded to ACK probe), but open vs closed cannot be determined.
* **open|filtered**: Nmap cannot determine whether a port is open or filtered (common in UDP, IP protocol, and FIN/Null/Xmas scans).

---

## 2. Scan Techniques

### TCP SYN Stealth Scan (`-sS`) — Default for Superuser (root)
Sends SYN; if SYN/ACK is returned, port is **open**. Nmap immediately sends RST to tear down the connection before full 3-way handshake completion:
```bash
sudo nmap -sS -p 1-1000 192.168.1.1
```
* **Pros**: Extremely fast, rarely logged by basic application-layer daemons.
* **Requirement**: Requires raw packet privileges (`sudo` / root).

### TCP Connect Scan (`-sT`) — Default for Non-Root Users
Completes the full 3-way handshake via the operating system's `connect()` syscall:
```bash
nmap -sT 192.168.1.1
```
* **Pros**: Works without root privileges across any OS and network stack.
* **Cons**: Slower, creates logged connections in service logs.

### UDP Scan (`-sU`)
Sends UDP packets (often protocol-specific payloads like DNS, SNMP) to target ports:
```bash
sudo nmap -sU -p 53,67,68,123,161,500 192.168.1.1
```
* If ICMP Port Unreachable (Type 3, Code 3) is returned -> **closed**.
* If UDP response packet is received -> **open**.
* If no response is received -> **open|filtered** (UDP packets may be dropped or filtered).
* **Tip**: Combine with `-sS` to scan both TCP & UDP: `sudo nmap -sS -sU -p T:22,80,U:53 192.168.1.1`.

### TCP Null (`-sN`), FIN (`-sF`), and Xmas (`-sX`) Scans
Exploits RFC 793 loophole: packets not containing SYN, RST, or ACK flags sent to a closed port must trigger an RST, whereas open ports should drop the packet silently.
* `-sN`: Does not set any bits (flags = 0).
* `-sF`: Sets only the FIN bit.
* `-sX`: Sets FIN, PSH, and URG flags (lit up like a Christmas tree).
```bash
sudo nmap -sX -p 80,443 192.168.1.1
```
* Useful for bypassing non-stateful firewalls and packet filters.

### TCP ACK Scan (`-sA`)
Sends ACK packets. Used to map firewall rulesets and identify stateful inspection vs stateless packet filtering:
```bash
sudo nmap -sA -p 80,443 192.168.1.1
```
* RST response -> **unfiltered** (firewall allows packet through).
* No response or ICMP error -> **filtered**.

---

## 3. Port Selection Flags

| Flag | Example | Description |
| :--- | :--- | :--- |
| `-p <range>` | `nmap -p 22,80,443,8080 target` | Scans specific list of ports |
| `-p 1-65535` or `-p-` | `nmap -p- target` | Scans all 65,535 TCP ports |
| `-F` | `nmap -F target` | Fast mode: scans top 100 most common ports |
| `--top-ports <n>` | `nmap --top-ports 1000 target` | Scans the top `n` ports based on Nmap prevalence data |
| `-p U:53,111,T:21-25` | `nmap -sU -sS -p U:53,T:80 target` | Specifies UDP and TCP port sets simultaneously |
| `-r` | `nmap -r target` | Scans ports sequentially instead of randomized order |
