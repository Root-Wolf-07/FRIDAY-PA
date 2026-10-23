# Nmap Output Formats & Parsing

Nmap provides five distinct output formats suitable for human reading, script piping, and automated SIEM ingestion.

---

## 1. Output Flags

| Flag | Format | File Ext | Description |
| :--- | :--- | :--- | :--- |
| **`-oN <file>`** | Normal | `.nmap` | Standard human-readable console output saved to file |
| **`-oX <file>`** | XML | `.xml` | Comprehensive structured XML format for parsers & SIEM |
| **`-oG <file>`** | Grepable | `.gnmap` | Line-oriented single-line format ideal for `grep`, `awk`, `cut` |
| **`-oS <file>`** | Script Kiddie | `.sk` | 1337-speak formatted output |
| **`-oA <basename>`** | All Major Formats | `.nmap`, `.xml`, `.gnmap` | Saves simultaneously in Normal, XML, and Grepable |

```bash
# Save all formats with basename 'audit_2026'
sudo nmap -sV -A -oA audit_2026 192.168.1.1
```

---

## 2. Parsing Grepable Output (`-oG`)

Grepable format puts each host on a single line:
```
Host: 192.168.1.10 ()  Ports: 22/open/tcp//ssh//OpenSSH 9.6p1/, 80/open/tcp//http//nginx 1.24/
```

### Useful One-Liners
```bash
# Extract all IP addresses with port 80 open
grep -i "80/open" scan.gnmap | cut -d' ' -f2

# Extract open ports per host
awk '/Ports:/{print $2, $0}' scan.gnmap | sed 's/.*Ports: //'
```

---

## 3. Python XML Parsing Example

```python
import xml.etree.ElementTree as ET

tree = ET.parse("scan.xml")
root = tree.getroot()

for host in root.findall("host"):
    ip = host.find("address").attrib["addr"]
    ports = host.find("ports")
    if ports is not None:
        for port in ports.findall("port"):
            port_id = port.attrib["portid"]
            state = port.find("state").attrib["state"]
            service = port.find("service").attrib.get("name", "unknown")
            if state == "open":
                print(f"{ip}:{port_id} -> {service}")
```
