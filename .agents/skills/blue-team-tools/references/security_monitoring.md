# Security Monitoring, SIEM & Endpoint Telemetry

> Endpoint sensors (Sysmon), SIEM (ELK), DMARC analysis, decoy tokens, and live telemetry.

---

## Category: Security Monitoring

### [Sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)

Sysmon is a Windows system monitor that tracks system activity and logs it to the Windows event log.

It provides detailed information about system activity, including process creation and termination, network connections, and changes to file creation time.

Sysmon can be configured to monitor specific events or processes and can be used to alert administrators of suspicious activity on a system.

**Install:** 

Download the sysmon binary from [here](https://download.sysinternals.com/files/Sysmon.zip).

**Usage:** 

```bash
# Install with default settings (process images hashed with SHA1 and no network monitoring)
sysmon -accepteula -i

# Install Sysmon with a configuration file (as described below)
sysmon -accepteula -i c:\windows\config.xml

# Uninstall
sysmon -u

# Dump the current configuration
sysmon -c
```

Full event filtering information can be found [here](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#event-filtering-entries).

The Microsoft documentation page can be found [here](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon).

![image](https://user-images.githubusercontent.com/100603074/210621009-b3c31c2b-f789-450a-acbf-7578fa943abd.png)

*Image used from https://nsaneforums.com/topic/281207-sysmon-5-brings-registry-modification-logging/*

---

### [Kibana](https://www.elastic.co/kibana/)

Kibana is an open-source data visualization and exploration tool that is often used for log analysis in combination with Elasticsearch.

Kibana provides a user-friendly interface for searching, visualizing, and analyzing log data, which can be helpful for identifying patterns and trends that may indicate a security threat.

Kibana can be used to analyze a wide range of data sources, including system logs, network logs, and application logs. It can also be used to create custom dashboards and alerts to help security teams stay informed about potential threats and respond quickly to incidents.

**Install:** 

You can download Kibana from [here](https://www.elastic.co/downloads/kibana).

Installation instructions can be found [here](https://www.elastic.co/guide/en/kibana/current/install.html).

**Usage: (Visualize and explore log data)** 

Kibana provides a range of visualization tools that can help you identify patterns and trends in your log data. You can use these tools to create custom dashboards that display relevant metrics and alerts.

**Usage: (Threat Alerting)**

Kibana can be configured to send alerts when it detects certain patterns or anomalies in your log data. You can set up alerts to notify you of potential security threats, such as failed login attempts or network connections to known malicious IP addresses.

Nice [blog](https://phoenixnap.com/kb/kibana-tutorial) about querying and visualizing data in Kibana.

![image](https://user-images.githubusercontent.com/100603074/210621061-badf3acf-2680-42c5-bbd9-43bca7a85cf2.png)

*Image used from https://www.pinterest.co.uk/pin/analysing-honeypot-data-using-kibana-and-elasticsearch--684758318328369269/*

---

### [Logstash](https://www.elastic.co/logstash/)

Logstash is a open-source data collection engine with real-time pipelining capabilities. It is a server-side data processing pipeline that ingests data from a multitude of sources simultaneously, transforms it, and then sends it to a "stash" like Elasticsearch.

Logstash has a rich set of plugins, which allows it to connect to a variety of sources and process the data in multiple ways. It can parse and transform logs, translate data into a structured format, or send it to another tool for further processing.

With its ability to process large volumes of data quickly, Logstash is an integral part of the ELK stack (Elasticsearch, Logstash, and Kibana) and is often used to centralize, transform, and monitor log data.

**Install:** 

Download logstash from [here](https://www.elastic.co/downloads/logstash).

**Usage:** 

Full logstash documentation [here](https://www.elastic.co/guide/en/logstash/current/introduction.html).

Configuration examples [here](https://www.elastic.co/guide/en/logstash/current/config-examples.html).

![image](https://user-images.githubusercontent.com/100603074/210621111-e7630493-bc1c-41fa-af98-0261fbf6e293.png)

*Image used from https://www.elastic.co/guide/en/logstash/current/logstash-modules.html*

---

### [parsedmarc](https://github.com/domainaware/parsedmarc)

A Python module and CLI utility for parsing DMARC reports. 

When used with Elasticsearch and Kibana (or Splunk), it works as a self-hosted open source alternative to commercial DMARC report processing services such as Agari Brand Protection, Dmarcian, OnDMARC, ProofPoint Email Fraud Defense, and Valimail.

Features:

- Parses draft and 1.0 standard aggregate/rua reports
- Parses forensic/failure/ruf reports
- Can parse reports from an inbox over IMAP, Microsoft Graph, or Gmail API
- Transparently handles gzip or zip compressed reports
- Consistent data structures
- Simple JSON and/or CSV output
- Optionally email the results
- Optionally send the results to Elasticsearch and/or Splunk, for use with premade dashboards
- Optionally send reports to Apache Kafka

![image](https://user-images.githubusercontent.com/100603074/217382301-064ac450-3690-469d-9c86-c2e3c6cdeca9.png)

*Image used from https://github.com/domainaware/parsedmarc*

---

### [Phishing Catcher](https://github.com/x0rz/phishing_catcher)

As a business, phishing can cause reputational and financial damage to you and your customers. Being able to proactively identify phishing infrastructure targeting your business helps to reduce the risk of these damages.

Phish catcher allows you to catch possible phishing domains in near real time by looking for suspicious TLS certificate issuances reported to the Certificate Transparency Log (CTL) via the CertStream API. 

"Suspicious" issuances are those whose domain name scores beyond a certain threshold based on a configuration file.

![image](https://user-images.githubusercontent.com/100603074/217382453-400a044b-720d-47ce-adff-0a23e5511ae1.png)

*Image used from https://github.com/x0rz/phishing_catcher*

---

### [maltrail](https://github.com/stamparm/maltrail)

Maltrail is a malicious traffic detection system, utilizing publicly available lists containing malicious and/or generally suspicious trails, along with static trails compiled from various AV reports and custom user defined lists. A trail can be anything from domain name, URL, IP address or HTTP User-Agent header value.

A demo page for this tool can be found [here](https://maltraildemo.github.io/).

**Install:** 

```bash
sudo apt-get install git python3 python3-dev python3-pip python-is-python3 libpcap-dev build-essential procps schedtool
sudo pip3 install pcapy-ng
git clone --depth 1 https://github.com/stamparm/maltrail.git
cd maltrail
```

**Usage:** 

```bash
sudo python3 sensor.py
```

![image](https://user-images.githubusercontent.com/100603074/217382540-fa1283d7-9825-4529-a92f-11f447e4657b.png)

*Image used from https://github.com/stamparm/maltrail*

---

### [AutorunsToWinEventLog](https://github.com/palantir/windows-event-forwarding/tree/master/AutorunsToWinEventLog)

Autoruns is a tool developed by Sysinternals that allows you to view all of the locations in Windows where applications can insert themselves to launch at boot or when certain applications are opened. Malware often takes advantages of these locations to ensure that it runs whenever your computer boots up.

Autoruns conveniently includes a non-interactive command line utility. This code generates a CSV of Autoruns entries, converts them to JSON, and finally inserts them into a custom Windows Event Log. By doing this, we can take advantage of our existing WEF infrastructure to get these entries into our SIEM and start looking for signs of malicious persistence on endpoints and servers.

**Install:** 

Download [AutorunsToWinEventLog](https://github.com/palantir/windows-event-forwarding/tree/master/AutorunsToWinEventLog).

**Usage:** 

From an Admin Powershell console run `.\Install.ps1` 

This script does the following:

- Creates the directory structure at c:\Program Files\AutorunsToWinEventLog
- Copies over AutorunsToWinEventLog.ps1 to that directory
- Downloads Autorunsc64.exe from https://live.sysinternals.com
- Sets up a scheduled task to run the script daily @ 11am

![image](https://user-images.githubusercontent.com/100603074/218199447-40e7add1-68ee-44e2-a297-3bf03c977a9c.png)

*Image used from https://www.detectionlab.network/usage/autorunstowineventlog/*

---

### [procfilter](https://github.com/godaddy/procfilter)

ProcFilter is a process filtering system for Windows with built-in [YARA](https://github.com/virustotal/yara) integration. YARA rules can be instrumented with custom meta tags that tailor its response to rule matches. It runs as a Windows service and is integrated with [Microsoft's ETW API](https://msdn.microsoft.com/en-us/library/windows/desktop/bb968803%28v=vs.85%29.aspx), making results viewable in the Windows Event Log. Installation, activation, and removal can be done dynamically and does not require a reboot.

ProcFilter's intended use is for malware analysts to be able to create YARA signatures that protect their Windows environments against a specific threat. It does not include a large signature set. Think lightweight, precise, and targeted rather than broad or all-encompassing. ProcFilter is also intended for use in controlled analysis environments where custom plugins can perform artifact-specific actions.

**Install:** 

[ProcFilter x86/x64 Release/Debug Installers](https://github.com/godaddy/procfilter/releases)

*Note: Unpatched Windows 7 systems require hotfix 3033929 to load the driver component. More information can be found here.*

Nice configuration template file [here](https://github.com/godaddy/procfilter/blob/master/files/procfilter.ini).

**Usage:** 

```
procfilter -start
```

Usage screenshots can be found [here](https://github.com/godaddy/procfilter#screenshots).

![image](https://user-images.githubusercontent.com/100603074/218200282-f2465b93-169a-43d6-8e12-dea61ed9272c.png)

*Image used from https://github.com/godaddy/procfilter*

---

### [velociraptor](https://github.com/Velocidex/velociraptor)

Velociraptor is a unique, advanced open-source endpoint monitoring, digital forensic and cyber response platform.

It was developed by Digital Forensic and Incident Response (DFIR) professionals who needed a powerful and efficient way to hunt for specific artifacts and monitor activities across fleets of endpoints. Velociraptor provides you with the ability to more effectively respond to a wide range of digital forensic and cyber incident response investigations and data breaches:

Features:

- Reconstruct attacker activities through digital forensic analysis
- Hunt for evidence of sophisticated adversaries
- Investigate malware outbreaks and other suspicious network activities
- Monitory continuously for suspicious user activities, such as files copied to USB devices
- Discover whether disclosure of confidential information occurred outside the network
- Gather endpoint data over time for use in threat hunting and future investigations


**Install:** 

Download the binary from the [release page](https://github.com/Velocidex/velociraptor/releases).

**Usage:** 

```
velociraptor gui
```

Full usage information can be found [here](https://docs.velociraptor.app/).

![image](https://user-images.githubusercontent.com/100603074/218200327-3f5ab599-11f1-46dc-8f28-b27c1258224a.png)

*Image used from https://docs.velociraptor.app*

---

### [SysmonSearch](https://github.com/JPCERTCC/SysmonSearch)

SysmonSearch makes event log analysis more effective and less time consuming, by aggregating event logs generated by Microsoft's Sysmon.

  SysmonSearch uses Elasticserach and Kibana (and Kibana plugin).
  * **Elasticserach**  
    Elasticsearch collects/stores Sysmon's event log.
  * **Kibana**  
    Kibana provides user interface for your Sysmon's event log analysis. The following functions are implemented as Kibana plugin.
    * Visualizes Function  
      This function visualizes Sysmon's event logs to illustrate correlation of processes and networks.
    * Statistical Function  
      This function collects the statistics of each device or Sysmon's event ID.
    * Monitor Function  
      This function monitor incoming logs based on the preconfigured rules, and trigers alert.
  * **StixIoC server**  
    You can add search/monitor condition by uploading STIX/IOC file. From StixIoC server Web UI, you can upload STIXv1, STIXv2 and OpenIOC format files.

**Install: (Linux)** 

```bash
git clone https://github.com/JPCERTCC/SysmonSearch.git
```

[Modify Elasticsearch configuration](https://github.com/JPCERTCC/SysmonSearch/wiki/Install#elasticsearch-server-setup)

[Modify Kibana configuration](https://github.com/JPCERTCC/SysmonSearch/wiki/Install#kibana-server-setup)

Full installation instructions can be found [here](https://github.com/JPCERTCC/SysmonSearch/wiki/Install).

**Usage:** 

*Once Elasticsearch and Kibana configurations have been modified, restart the services and navigate to your Kibana interface. The SysmonSearch ribbon should be visible.*

[Visualize the Sysmon log to investigate suspicious behavior](https://blogs.jpcert.or.jp/ja/2018/09/SysmonSearch.html)

![image](https://user-images.githubusercontent.com/100603074/218200383-84e4c9f4-3e34-4973-b37c-a9160a74b5e0.png)

*Image used from https://blogs.jpcert.or.jp/ja/2018/09/SysmonSearch.html*

---

### [Canary Tokens](https://canarytokens.org/nest/)

Canarytokens are like motion sensors for your networks, computers and clouds. You can put them in folders, on network devices and on your phones.

Place them where nobody should be poking around and get a clear alarm if they are accessed. They are designed to look juicy to attackers to increase the likelihood that they are opened (and they are completely free).

**Install:** 

Visit the [token page](https://canarytokens.org/nest/) and choose from a list of tokens.

**Usage:** 

Add an email address to receive token alerts and then wait!

Full usage information and examples can be found [here](https://docs.canarytokens.org/guide/examples.html).

![image](https://github.com/user-attachments/assets/932339e7-7a57-4b7d-b545-c01fde3e87d9)

*Image used from https://canarytokens.org/nest/*

Threat Tools and Techniques
====================

*Tools for identifying and implementing detections against TTPs used by threat actors.*

---

