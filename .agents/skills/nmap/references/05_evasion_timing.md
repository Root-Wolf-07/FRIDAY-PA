# Nmap Timing Optimization & Firewall/IDS Evasion

Tuning timing parameters avoids network congestion and IDS rate-limiting. Evasion flags help security teams test firewall filtering rules and perimeter monitoring resilience.

---

## 1. Timing Templates (`-T0` through `-T5`)

Nmap provides six pre-configured timing templates:

| Template | Name | Use Case | Packet Delay |
| :--- | :--- | :--- | :--- |
| **`-T0`** | **Paranoid** | Extreme IDS evasion, serial port probes | 5 minutes between probes |
| **`-T1`** | **Sneaky** | Evades basic IDS thresholds | 15 seconds between probes |
| **`-T2`** | **Polite** | Slows scan to conserve bandwidth & target CPU | 0.4 seconds between probes |
| **`-T3`** | **Normal** | Default dynamic timing based on network response | Dynamic |
| **`-T4`** | **Aggressive** | Recommended for fast, modern broadband networks | Max RTT timeout 1250ms |
| **`-T5`** | **Insane** | Sacrifices accuracy for maximum speed | Max RTT timeout 300ms |

### Manual Timing Controls
* `--min-rate <number>`: Enforces minimum packets sent per second (e.g. `--min-rate 1000`).
* `--max-rate <number>`: Caps packet output to avoid tripping network thresholds.
* `--host-timeout <time>`: Aborts slow hosts after given duration (e.g. `--host-timeout 15m`).

---

## 2. Firewall / IDS Evasion Techniques

### Fragment Packets (`-f` / `-ff`)
Splits probe packets into small 8-byte fragments (`-f`) or 16-byte fragments (`-ff`) to bypass primitive packet inspection filters that fail to reassemble fragments:
```bash
sudo nmap -f -sS -p 80,443 192.168.1.1
```

### Decoy Scanning (`-D <decoy1,decoy2,ME,...>`)
Sends probes interspersed with spoofed IP addresses so target IDS/firewall logs show multiple simultaneous scans, obscuring the true origin:
```bash
sudo nmap -D RND:5,ME -p 80 192.168.1.1
```
* `RND:5`: Generates 5 random decoy IP addresses.
* `ME`: Inserts real scanning IP into the decoy sequence.

### Spoof Source Port (`-g` / `--source-port`)
Configures probes to originate from well-known privileged ports (e.g. 53 for DNS, 88 for Kerberos, 20 for FTP data), bypassing firewalls configured to trust inbound traffic from specific ports:
```bash
sudo nmap --source-port 53 -sS 192.168.1.1
```

### Append Random Data (`--data-length <len>`)
Appends random payload bytes to probe packets so they do not match default zero-length signature signatures:
```bash
sudo nmap --data-length 24 192.168.1.1
```

### Spoof MAC Address (`--spoof-mac`)
Spoofs the hardware Ethernet MAC address during local subnet scans:
```bash
sudo nmap --spoof-mac Apple 192.168.1.0/24
```
