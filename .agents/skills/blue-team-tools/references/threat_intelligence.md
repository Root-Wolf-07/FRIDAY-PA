# Cyber Threat Intelligence (CTI) & Adversary Emulation

> Threat intel platforms (MISP, Maltego, ThreatConnect), MITRE ATT&CK adversary emulation, and OSINT sharing.

---

## Category: Threat Intelligence

### [Maltego](https://www.maltego.com/solutions/cyber-threat-intelligence/)

Maltego is a commercial threat intelligence and forensics tool developed by Paterva. It is used by security professionals to gather and analyze information about domains, IP addresses, networks, and individuals in order to identify relationships and connections that might not be immediately apparent.

Maltego uses a visual interface to represent data as entities, which can be linked together to form a network of relationships. It includes a range of transforms, which are scripts that can be used to gather data from various sources, such as social media, DNS records, and WHOIS data.

Maltego is often used in conjunction with other security tools, such as SIEMs and vulnerability scanners, as part of a comprehensive threat intelligence and incident response strategy.

You can schedule a demo [here](https://www.maltego.com/get-a-demo/).

[Maltego handbook Handbook for Cyber Threat Intelligence](https://static.maltego.com/cdn/Handbooks/Maltego-Handbook-for-Cyber-Threat-Intelligence.pdf)

![image](https://user-images.githubusercontent.com/100603074/210655712-e1409206-de1d-4601-88a5-f5a6ac3928c7.png)

*Image used from https://www.maltego.com/reduce-your-cyber-security-risk-with-maltego/*

---

### [MISP](https://www.misp-project.org/)

MISP (short for Malware Information Sharing Platform) is an open-source platform for sharing, storing, and correlating Indicators of Compromise (IOCs) of targeted attacks, threats, and malicious activity.

MISP includes a range of features, such as real-time sharing of IOCs, support for multiple formats, and the ability to import and export data to and from other tools. 

It also provides a RESTful API and various data models to facilitate the integration of MISP with other security systems. In addition to its use as a threat intelligence platform, MISP is also used for incident response, forensic analysis, and malware research.

**Install:** 

```bash
# Kali
wget -O /tmp/misp-kali.sh https://raw.githubusercontent.com/MISP/MISP/2.4/INSTALL/INSTALL.sh && bash /tmp/misp-kali.sh

# Ubuntu 20.04.2.0-server
wget -O /tmp/INSTALL.sh https://raw.githubusercontent.com/MISP/MISP/2.4/INSTALL/INSTALL.sh
bash /tmp/INSTALL.sh
```

Full installation instructions can be found [here](https://misp.github.io/MISP/).

**Usage:** 

MISP documentation can be found [here](https://www.misp-project.org/documentation/).

[MISP user guide](https://github.com/MISP/misp-book)

[MISP Training Cheat sheet](https://www.misp-project.org/misp-training/cheatsheet.pdf)

![image](https://user-images.githubusercontent.com/100603074/210655743-b7fd5ab0-a106-4277-815d-c674525a9a91.png)

*Image used from http://www.concordia-h2020.eu/blog-post/integration-of-misp-into-flowmon-ads/*

---

### [ThreatConnect](https://threatconnect.com/threat-intelligence-platform/)

ThreatConnect is a threat intelligence platform that helps organizations aggregate, analyze, and act on threat data. It is designed to provide a single, unified view of an organization's threat landscape and enable users to collaborate and share information about threats.

The platform includes a range of features for collecting, analyzing, and disseminating threat intelligence, such as a customizable dashboard, integration with third-party data sources, and the ability to create custom reports and alerts.

It is intended to help organizations improve their security posture by providing them with the information they need to identify, prioritize, and respond to potential threats.

You can request a demo from [here](https://threatconnect.com/request-a-demo/).

[ThreatConnect for Threat Intel Analysts - PDF](https://threatconnect.com/wp-content/uploads/2022/12/Intel-Analysts-Datasheet.pdf)

![image](https://user-images.githubusercontent.com/100603074/210655770-4413ead0-6216-47fe-a933-cbe0be9f86a1.png)

*Image used from https://threatconnect.com/threat-intelligence-platform/*

---

### [Adversary Emulation Library](https://github.com/center-for-threat-informed-defense/adversary_emulation_library)

This is a library of adversary emulation plans to enable you to evaluate your defensive capabilities against real-world threats.

Emulation plans are an essential component for organizations looking to prioritize defenses against behavior from specific threats.

The TTPs outlined in this resource can be used to design specific threat emulation activities to test your organisations defenses against specific threat actors.

Visit the resource [here](https://github.com/center-for-threat-informed-defense/adversary_emulation_library).

**Example (sandworm)**

- [Sandworm Emulated Software Source Code](https://github.com/center-for-threat-informed-defense/adversary_emulation_library/tree/master/sandworm/Resources)
- [Sandworm Detection Scenario Walkthrough](https://github.com/center-for-threat-informed-defense/adversary_emulation_library/tree/master/sandworm/Emulation_Plan/Scenario_1)
- [Sandworm Intelligence Summary](https://github.com/center-for-threat-informed-defense/adversary_emulation_library/blob/master/sandworm/Intelligence_Summary/Intelligence_Summary.md)

![image](https://user-images.githubusercontent.com/100603074/223865356-c4d491c3-edba-40d6-80b2-5c41029bddfd.png)

*Image used from https://github.com/center-for-threat-informed-defense/adversary_emulation_library*

Incident Response Planning
====================

*Tools for creating and maintaining an incident response plan, including templates and best practices for responding to different types of incidents.*

---

## Category: Communication and Collaboration

### [Twitter](https://twitter.com/)

Twitter is a great platform for sharing information about cyber security. 

It's a platform that is widely used by security professionals, researchers, and experts, giving you access to an endless amount of new information.

Some great accounts to follow:

- [@vxunderground](https://twitter.com/vxunderground)
- [@Alh4zr3d](https://twitter.com/Alh4zr3d)
- [@3xp0rtblog](https://twitter.com/3xp0rtblog)
- [@C5pider](https://twitter.com/C5pider)
- [@_JohnHammond](https://twitter.com/_JohnHammond)
- [@mrd0x](https://twitter.com/mrd0x)
- [@TheHackersNews](https://twitter.com/TheHackersNews)
- [@pancak3lullz](https://twitter.com/pancak3lullz)
- [@GossiTheDog](https://twitter.com/GossiTheDog)
- [@briankrebs](https://twitter.com/briankrebs)
- [@SwiftOnSecurity](https://twitter.com/SwiftOnSecurity)
- [@schneierblog](https://twitter.com/schneierblog)
- [@mikko](https://twitter.com/mikko)
- [@campuscodi](https://twitter.com/campuscodi)

---

### [Facebook TheatExchange](https://developers.facebook.com/docs/threat-exchange/getting-started)

Facebook ThreatExchange is a platform for security professionals to share and analyze information about cyber threats. 

It was designed to help organizations better defend against threats by allowing them to share threat intelligence with each other in a private and secure way. 

It is intended to be used by "blue teams", who are responsible for the security of an organization and work to prevent, detect, and respond to cyber threats.

**Usage:**

To request access to ThreatExchange, you have to submit an application via [https://developers.facebook.com/products/threat-exchange/](https://developers.facebook.com/products/threat-exchange/).

**Useful links:** 

[Welcome to ThreatExchange!](https://developers.facebook.com/docs/threat-exchange/getting-started)

[ThreatExchange UI Overview](https://developers.facebook.com/docs/threat-exchange/ui)

[ThreatExchange API Reference](https://developers.facebook.com/docs/threat-exchange/reference/apis)

[GitHub - ThreatExchange](https://github.com/facebook/ThreatExchange/tree/main/python-threatexchange)

---

