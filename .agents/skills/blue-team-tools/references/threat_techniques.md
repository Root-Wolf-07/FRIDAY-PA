# Threat Techniques, LOLBAS, Detection Engineering & Defense Tips

> Living-off-the-land techniques (LOLBAS, GTFOBins), Sigma/Chainsaw, YARA generation, and practical blue team defensive tips.

---

## Category: Blue Team Tips

### Payload extraction with Process Hacker

![image](https://user-images.githubusercontent.com/100603074/217382117-acb26f85-d352-43b3-8818-6c5a0d90f350.png)

**Description:** 
*'Malware Analysis Tip  - Use Process Hacker to watch for suspicious .NET assemblies in newly spawned processes. Combined with DnSpy - it's possible to locate and extract malicious payloads without needing to manually de-obfuscate.'*

**Credit:** [@embee_research](https://twitter.com/embee_research)

**Link:** [Twitter](https://twitter.com/embee_research/status/1614871485931458560)

---

### Prevent Script Execution via Double Click

![image](https://user-images.githubusercontent.com/100603074/218200763-53f9fc80-59e1-468a-93e2-69b84d1c7196.png)

**Description:** 
*On Windows, it's common to see threat actors achieve initial execution via malicious script files masquerading as Microsoft Office files. A nice way to prevent this attack chain is to alter the default application associated with these files (HTA, JS, VBA, VBS) to `notepad.exe`. Now when a user is successfully tricked into clicking a HTA file on disk it will open the script in notepad and execution will not occur*.

**Credit:** [bluesoul](https://bluesoul.me/)

**Link:** [Blog](https://bluesoul.me/2016/05/12/use-gpo-to-change-the-default-behavior-of-potentially-malicious-file-extensions/)

---

### Detect Cryptojacking Malware with Proxy Logs

**Description:** *Cryptojacking malware is becoming more suffisticated, with mining malware leveraging DLL sideloading to hide on machine and reducing CPU load to stay below detection thresholds. One thing they all have in common is they have to make connections to mining pools, this is where we can find them. Monitor your proxy and DNS logs for connections containing common mining pool strings (e.g `*xmr.*` OR `*pool.com` OR `*pool.org` OR `pool.*`).*

**Credit:** [Dave Mckay](https://www.howtogeek.com/author/davidmckay/)

**Link:** [Blog](https://www.howtogeek.com/devops/how-to-detect-and-defeat-cryptominers-in-your-network/)

---

### Remove null bytes in CyberChef malware analysis

![image](https://user-images.githubusercontent.com/100603074/223865015-00128d71-0093-4422-b271-e26dac723013.png)

**Description:** *'After decoding base64 for Unicode string during malware analysis, you may encounter null bytes. Keep your code readable by using the "Remove null bytes" operation in CyberChef'.*

**Credit:** [Ayush Anand](https://twitter.com/Securityinbits)

**Link:** [Twitter](https://twitter.com/securityinbits/status/1628364983661694976)

---

### Recover scrubbed metadata from a PDF

![image](https://github.com/user-attachments/assets/b015158a-01c6-42fe-993c-1bf667ad5469)

**Description:** *Did you know you can recover scrubbed metadata from a PDF that wasn't scrubbed properly? The changes are incremental, and the history is stored in the PDF. This command removes the "updates" to the PDF metadata:*

`exiftool -PDF-update:all= file.pdf`

**Credit:** [Jon Gorenflo](https://twitter.com/flakpaket)

**Link:** [Twitter](https://twitter.com/securityinbits/status/1628364983661694976)

Threat Hunting
====================

*Tools that support and enhance threat hunting operations.*

---

## Category: Threat Tools and Techniques

### [lolbas-project.github.io](https://lolbas-project.github.io/)

Living off the land binaries (LOLBins) are legitimate Windows executables that can be used by threat actors to carry out malicious activities without raising suspicion. 

Using LOLBins allows attackers to blend in with normal system activity and evade detection, making them a popular choice for malicious actors.

The LOLBAS project is a MITRE mapped list of LOLBINS with commands, usage and detection information for defenders.

Visit [https://lolbas-project.github.io/](https://lolbas-project.github.io/).

**Usage:** 

Use the information for detection opportunities to harden your infrastructure against LOLBIN usage. 

Here are some project links to get started:

- [Bitsadmin.exe](https://lolbas-project.github.io/lolbas/Binaries/Bitsadmin/)
- [Certutil.exe](https://lolbas-project.github.io/lolbas/Binaries/Certutil/)
- [Cscript.exe](https://lolbas-project.github.io/lolbas/Binaries/Cscript/)

![image](https://user-images.githubusercontent.com/100603074/210625466-9ab87233-e822-4961-a68a-f863f56ef830.png)

*Image used from https://lolbas-project.github.io/*

---

### [gtfobins.github.io](https://gtfobins.github.io/)

GTFOBins (short for "Get The F* Out Binaries") is a collection of Unix binaries that can be used to escalate privileges, bypass restrictions, or execute arbitrary commands on a system.

They can be used by threat actors to gain unauthorized access to systems and carry out malicious activities.

The GTFOBins project is a list of Unix binaries with command and usage information for attackers. This information can be used to implement unix detections.

Visit [https://gtfobins.github.io/](https://gtfobins.github.io/).

**Usage:** 

Here are some project links to get started:

- [base64](https://gtfobins.github.io/gtfobins/base64/)
- [curl](https://gtfobins.github.io/gtfobins/curl/)
- [nano](https://gtfobins.github.io/gtfobins/nano/)

![image](https://user-images.githubusercontent.com/100603074/210625527-6a037b81-e3fe-4282-a193-1cc4b9c06f75.png)

*Image used from https://gtfobins.github.io/*

---

### [filesec.io](https://filesec.io/)

Filesec is a list of file extensions that can be used by attackers for phishing, execution, macros etc.

This is a nice resource to understand the malicious use cases of common file extentions and ways that you can defend against them.

Each file extension page contains a description, related operating system and recommendations.

Visit [https://filesec.io/](https://filesec.io/).

**Usage:** 

Here are some project links to get started:

- [.Docm](https://filesec.io/docm)
- [.Iso](https://filesec.io/iso)
- [.Ppam](https://filesec.io/ppam)

![image](https://user-images.githubusercontent.com/100603074/210625626-58223992-2821-42c6-878a-e6aea4b9a508.png)

*Image used from https://filesec.io/*

---

### [KQL Search](https://www.kqlsearch.com/)

KQL stands for "Kusto Query Language", and it is a query language used to search and filter data in Azure Monitor logs. It is similar to SQL, but is more optimized for log analytics and time-series data.

KQL query language is particularly useful for blue teamers because it allows you to quickly and easily search through large volumes of log data to identify security events and anomalies that may indicate a threat.

KQL Search is a web app created by [@ugurkocde](https://twitter.com/ugurkocde) that aggregates KQL queries that are shared on GitHub.

You can visit the site at [https://www.kqlsearch.com/](https://www.kqlsearch.com/).

More information about Kusto Query Language (KQL) can be found [here](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/).

![image](https://user-images.githubusercontent.com/100603074/210736862-1e0cf987-7c85-40c1-b51c-1f3a1f946f7d.png)

*Image used from https://www.kqlsearch.com/*

---

### [Unprotect Project](https://unprotect.it/about/)

Malware authors spend a great deal of time and effort to develop complex code to perform malicious actions against a target system. It is crucial for malware to remain undetected and avoid sandbox analysis, antiviruses or malware analysts. 

With this kind of technics, malware are able to pass under the radar and stay undetected on a system. The goal of this free database is to centralize the information about malware evasion techniques.

The project aims to provide Malware Analysts and Defenders with actionable insights and detection capabilities to shorten their response times.

The project can be found at [https://unprotect.it/](https://unprotect.it/).

The project has an API - Docs [here](https://unprotect.it/api/).

![image](https://user-images.githubusercontent.com/100603074/210743650-6adaddce-ecb3-41bb-854b-292482b73d55.png)

*Image used from https://unprotect.it/map/*

---

### [chainsaw](https://github.com/WithSecureLabs/chainsaw)

Chainsaw provides a powerful ‘first-response’ capability to quickly identify threats within Windows forensic artefacts such as Event Logs and MFTs. Chainsaw offers a generic and fast method of searching through event logs for keywords, and by identifying threats using built-in support for Sigma detection rules, and via custom Chainsaw detection rules.

Features:

- Hunt for threats using Sigma detection rules and custom Chainsaw detection rules
- Search and extract forensic artefacts by string matching, and regex patterns
- Lightning fast, written in rust, wrapping the EVTX parser library by @OBenamram
- Clean and lightweight execution and output formats without unnecessary bloat
- Document tagging (detection logic matching) provided by the TAU Engine Library
- Output results in a variety of formats, such as ASCII table format, CSV format, and JSON format
- Can be run on MacOS, Linux and Windows

**Install:** 

```bash
git clone https://github.com/countercept/chainsaw.git
cargo build --release
git clone https://github.com/SigmaHQ/sigma
git clone https://github.com/sbousseaden/EVTX-ATTACK-SAMPLES.git
```

**Usage:** 

```bash
./chainsaw hunt EVTX-ATTACK-SAMPLES/ -s sigma/ --mapping mappings/sigma-event-logs-all.yml
```

![image](https://user-images.githubusercontent.com/100603074/217382675-1834c13d-1789-4ea7-a46e-25808477bcf0.png)

*Image used from https://twitter.com/FranticTyping/status/1433386064429916162/*

---

### [freq](https://github.com/MarkBaggett/freq)

Adversaries attempt to bypass signature based/pattern matching/blacklist techniques by introducing random: filenames, service names, workstation names, domains, hostnames, SSL cert subjects and issuer subjects, etc.

Freq is a python API designed by Mark Baggett to handle mass entropy testing. It was designed to be used in conjunction with a SIEM solutions but can work with anything that can submit a web request.

The tool uses frequency tables that map how likely one character will follow another

**Install:** 

```bash
git clone https://github.com/MarkBaggett/freq
cd freq
```

**Usage:** 

```bash
# Running freq_server.py on port 10004 and using a frequency table of /opt/freq/dns.freq
/usr/bin/python /opt/freq/freq_server.py 10004 /opt/freq/dns.freq
```

---

### [yarGen](https://github.com/Neo23x0/yarGen)

yarGen is a generator for YARA rules

The main principle is the creation of yara rules from strings found in malware files while removing all strings that also appear in goodware files. Therefore yarGen includes a big goodware strings and opcode database as ZIP archives that have to be extracted before the first use.

The rule generation process also tries to identify similarities between the files that get analyzed and then combines the strings to so called super rules. The super rule generation does not remove the simple rule for the files that have been combined in a single super rule. This means that there is some redundancy when super rules are created. You can suppress a simple rule for a file that was already covered by super rule by using --nosimple.

**Install:** 

Download the latest [release](https://github.com/Neo23x0/yarGen/releases).

```bash
pip install -r requirements.txt
python yarGen.py --update
```

**Usage:** 

```bash
# Create a new strings and opcodes database from an Office 2013 program directory
yarGen.py -c --opcodes -i office -g /opt/packs/office2013

# Update the once created databases with the "-u" parameter
yarGen.py -u --opcodes -i office -g /opt/packs/office365
```

Usage examples can be found [here](https://github.com/Neo23x0/yarGen#examples).

![image](https://user-images.githubusercontent.com/100603074/218200487-8476950d-c63e-4d5a-a03c-f2969b6001cc.png)

*Image used from https://github.com/Neo23x0/yarGen*

---

### [EmailAnalyzer](https://github.com/keraattin/EmailAnalyzer)

With EmailAnalyzer you can able to analyze your suspicious emails. You can extract headers, links and hashes from the .eml file

**Install:** 

```bash
git clone https://github.com/keraattin/EmailAnalyzer
cd EmailAnalyzer
```

**Usage:** 

```bash
# View headers in eml file
python3 email-analyzer.py -f <eml file> --headers

# Get hashes 
python3 email-analyzer.py -f <eml file> --digests

# Get links
python3 email-analyzer.py -f <eml file> --links

# Get attachments
python3 email-analyzer.py -f <eml file> --attachments
```

![image](https://user-images.githubusercontent.com/100603074/218200574-d9917b8c-433b-4bab-8db0-b6628b0d9424.png)

*Text used from https://github.com/keraattin/EmailAnalyzer*

---

### [VCG](https://github.com/nccgroup/VCG)

VCG is an automated code security review tool that handles C/C++, Java, C#, VB and PL/SQL. It has a few features that should hopefully make it useful to anyone conducting code security reviews, particularly where time is at a premium:

- In addition to performing some more complex checks it also has a config file for each language that basically allows you to add any bad functions (or other text) that you want to search for
- It attempts to find a range of around 20 phrases within comments that can indicate broken code (“ToDo”, “FixMe”, “Kludge”, etc.)
- It provides a nice pie chart (for the entire codebase and for individual files) showing relative proportions of code, whitespace, comments, ‘ToDo’ style comments and bad code

**Install:** 

You can install the pre-compiled binary here.

Open the project .sln, choose "Release", and build.

**Usage:** 

```
STARTUP OPTIONS:
	(Set desired starting point for GUI. If using console mode these options will set target(s) to be scanned.)
	-t, --target <Filename|DirectoryName>:	Set target file or directory. Use this option either to load target immediately into GUI or to provide the target for console mode.
	-l, --language <CPP|PLSQL|JAVA|CS|VB|PHP|COBOL>:	Set target language (Default is C/C++).
	-e, --extensions <ext1|ext2|ext3>:	Set file extensions to be analysed (See ReadMe or Options screen for language-specific defaults).
	-i, --import <Filename>:	Import XML/CSV results to GUI.

OUTPUT OPTIONS:
	(Automagically export results to a file in the specified format. Use XML or CSV output if you wish to reload results into the GUI later on.)
	-x, --export <Filename>:	Automatically export results to XML file.
	-f, --csv-export <Filename>:	Automatically export results to CSV file.
	-r, --results <Filename>:	Automatically export results to flat text file.

CONSOLE OPTIONS:
	-c, --console:		Run application in console only (hide GUI).
	-v, --verbose:		Set console output to verbose mode.
	-h, --help:		Show help.
```

---

### [CyberChef](https://gchq.github.io/CyberChef/)

CyberChef is a free, web-based tool that allows users to manipulate and transform data using a wide range of techniques.

With CyberChef, you can perform a wide range of operations on data, such as converting between different data formats (e.g., hexadecimal, base64, ASCII), encoding and decoding data, searching and replacing text etc.

The tool also includes a recipe system, which allows you to save and share data manipulation workflows with others.

The tool can be used from [here](https://gchq.github.io/CyberChef/).

![image](https://user-images.githubusercontent.com/100603074/223865168-433fcd56-12e9-44a2-83aa-1531d711383d.png)

*Image used from https://gchq.github.io/CyberChef/*

---

### [PersistenceSniper](https://github.com/last-byte/PersistenceSniper)

PersistenceSniper is a Powershell module that can be used by Blue Teams, Incident Responders and System Administrators to hunt persistences implanted in Windows machines.

PersistenceSniper is able to detect a wide range of persistence techniques, the full list of which can be found [here](https://github.com/last-byte/PersistenceSniper/wiki/3-%E2%80%90-Detections).

**Install: (PowerShell Gallery)**

```bash
Install-Module PersistenceSniper
Import-Module PersistenceSniper
```

**Install: (GitHub)**

Download the .zip from [GitHub](https://github.com/last-byte/PersistenceSniper/releases) and move it to the machine that you want to run the tool from.

```bash
Expand-Archive -Path .\PersistenceSniper-main.zip -Destination .\
Import-Module .\PersistenceSniper-main\PersistenceSniper\PersistenceSniper.psd1
```

Full installation information can be found [here](https://github.com/last-byte/PersistenceSniper/wiki/1-%E2%80%90-Deployment).

**Usage:**

```bash
# Run all persistence hunting techniques (Verbose Mode)
Find-AllPersistence -Verbose

# Run single persistence hunting technique
Find-AllPersistence -PersistenceMethod RunAndRunOnce
```

Full usage information can be found [here](https://github.com/last-byte/PersistenceSniper/wiki/2-%E2%80%90-Usage).

![image](https://github.com/user-attachments/assets/15f722c7-f4ca-4ef8-a5a5-fb132eb2b58a)

*Image used from https://hackers-arise.com/powershell-for-dfir-part-2-finding-persistence/*

Threat Intelligence
====================

*Tools for gathering and analyzing intelligence about current and emerging threats, and for generating alerts about potential threats.*

---

