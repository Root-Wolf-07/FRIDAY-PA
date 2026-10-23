#!/usr/bin/env node

/**
 * FRIDEY CLI - GOJO OS v8.4 Tactical Terminal Assistant
 * Founder, Owner & Creator: GOJO
 * User Salutation: Gojo
 * 
 * Supports:
 * - Interactive REPL & One-shot execution
 * - Real macOS computer telemetry (CPU, Memory, Host, Battery)
 * - Multilingual Speech Synthesis via macOS native `say` (Moira, Samantha, Vani)
 * - English, Tamil (தமிழ்), Malayalam (മലയാളം)
 * - Direct Protocol Overrides (House Party, Veronica, Combat, Stealth, Arc Surge, Clean Slate)
 * - Web HUD Launcher (opens http://localhost:4173)
 */

const readline = require('readline');
const os = require('os');
const { exec, spawn } = require('child_process');
const http = require('http');

// ANSI Terminal Styling
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  cyan: '\x1b[36m',
  brightCyan: '\x1b[96m',
  yellow: '\x1b[33m',
  brightYellow: '\x1b[93m',
  green: '\x1b[32m',
  brightGreen: '\x1b[92m',
  red: '\x1b[31m',
  brightRed: '\x1b[91m',
  magenta: '\x1b[35m',
  brightMagenta: '\x1b[95m',
  blue: '\x1b[34m',
  white: '\x1b[37m',
  bgCyan: '\x1b[46m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m',
};

class FrideyCLI {
  constructor() {
    this.founder = 'GOJO';
    this.version = '8.4.2';
    this.currentLang = 'en-US'; // 'en-US', 'ta-IN', 'ml-IN'
    this.voiceEnabled = true;
    this.arcPower = 3.24;
    this.armorIntegrity = 100;
    this.combatMode = false;
    this.stealthMode = false;
    this.isRoot = false; // Normal user mode by default! Elevates on 'sudo su'

    // Detect available voices on macOS
    this.preferredVoices = {
      'en-US': ['Moira', 'Samantha', 'Karen', 'Victoria'],
      'ta-IN': ['Vani'],
      'ml-IN': ['Vani', 'Samantha'] // fallback for Malayalam if native TTS not installed
    };
  }

  // Speak text using macOS native `say`
  speak(text, lang = this.currentLang) {
    if (!this.voiceEnabled || process.platform !== 'darwin') return;

    // Pick appropriate voice
    const candidates = this.preferredVoices[lang] || this.preferredVoices['en-US'];
    const chosenVoice = candidates[0];

    // Clean text for TTS
    const cleanSpeech = text
      .replace(/[\x1b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
      .replace(/["`$\\]/g, ' ')
      .trim();

    if (!cleanSpeech) return;

    try {
      const child = spawn('say', ['-v', chosenVoice, cleanSpeech], {
        stdio: 'ignore',
        detached: true
      });
      child.unref();
    } catch {
      // Ignore background audio errors
    }
  }

  // Print Banner
  printBanner() {
    const banner = `
${C.brightCyan}╔══════════════════════════════════════════════════════════════════════════════╗
║  ${C.bold}███████╗██████╗ ██╗██████╗ ███████╗██╗   ██╗${C.reset}${C.brightCyan}                                ║
║  ${C.bold}██╔════╝██╔══██╗██║██╔══██╗██╔════╝╚██╗ ██╔╝${C.reset}${C.brightCyan}   ${C.bold}${C.yellow}GOJO OS v${this.version}${C.reset}${C.brightCyan}                   ║
║  ${C.bold}█████╗  ██████╔╝██║██║  ██║█████╗   ╚████╔╝${C.reset}${C.brightCyan}    ${C.brightYellow}TACTICAL COMPUTER CLI ASSISTANT${C.reset}${C.brightCyan} ║
║  ${C.bold}██╔══╝  ██╔══██╗██║██║  ██║██╔══╝    ╚██╔╝${C.reset}${C.brightCyan}     ${C.green}FOUNDER & OWNER: GOJO${C.reset}${C.brightCyan}           ║
║  ${C.bold}██║     ██║  ██║██║██████╔╝███████╗   ██║${C.reset}${C.brightCyan}      ${C.magenta}ACTIVE PILOT: GOJO${C.reset}${C.brightCyan}              ║
║  ${C.bold}╚═╝     ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝   ╚═╝${C.reset}${C.brightCyan}                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝${C.reset}`;
    console.log(banner);
  }

  // Gather Host Computer Telemetry
  getComputerTelemetry() {
    const cpus = os.cpus();
    const model = cpus.length ? cpus[0].model.trim() : 'Apple Silicon';
    const totalMemGB = (os.totalmem() / 1073741824).toFixed(1);
    const freeMemGB = (os.freemem() / 1073741824).toFixed(1);
    const usedMemPercent = Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100);
    const uptimeHrs = (os.uptime() / 3600).toFixed(1);
    const loadAvg = os.loadavg().map(n => n.toFixed(2)).join(', ');

    return {
      hostname: os.hostname(),
      platform: `${os.type()} ${os.release()} (${os.arch()})`,
      cpu: `${model} (${cpus.length} Cores)`,
      memory: `${freeMemGB} GB Free / ${totalMemGB} GB Total (${usedMemPercent}% in use)`,
      uptime: `${uptimeHrs} Hours`,
      loadAvg: loadAvg,
      arcPower: `${this.arcPower} GW`,
      armor: `${this.armorIntegrity}%`
    };
  }

  // Display Telemetry Card
  printTelemetry() {
    const tel = this.getComputerTelemetry();
    console.log(`
${C.bold}${C.cyan}┌─ [ HOST COMPUTER & TACTICAL TELEMETRY ] ────────────────────────────────────┐${C.reset}
  ${C.yellow}USER / CREATOR:${C.reset}  Gojo (Gojo Enterprise Prime)
  ${C.yellow}SECURITY ACCESS:${C.reset} ${this.isRoot ? `${C.brightRed}ROOT (Ring-0 Superuser Privileges Granted)` : `${C.green}USER: GOJO (UID: 1000 • Standard User Session)`}${C.reset}
  ${C.yellow}HOST SYSTEM:${C.reset}     Gojo Technologes Hub (${tel.hostname} • ${tel.platform})
  ${C.yellow}PROCESSOR:${C.reset}       ${tel.cpu}
  ${C.yellow}MEMORY STATUS:${C.reset}   ${tel.memory}
  ${C.yellow}SYSTEM UPTIME:${C.reset}   ${tel.uptime} (Load: ${tel.loadAvg})
  ${C.yellow}ARC REACTOR:${C.reset}     ${this.combatMode ? C.red : C.brightCyan}${tel.arcPower} [${this.combatMode ? 'COMBAT OVERDRIVE' : 'NOMINAL'}]${C.reset}
  ${C.yellow}DEFENSE ARMOR:${C.reset}   ${tel.armor} (Nanotech Mesh)
  ${C.yellow}VOCAL MATRIX:${C.reset}    ${this.voiceEnabled ? `${C.green}ONLINE (Moira / Samantha / Vani)${C.reset}` : `${C.dim}MUTED${C.reset}`}
  ${C.yellow}ACTIVE LANG:${C.reset}     ${this.getLangLabel()}
${C.bold}${C.cyan}└─────────────────────────────────────────────────────────────────────────────┘${C.reset}`);
  }

  getLangLabel() {
    if (this.currentLang === 'ta-IN') return '🇮🇳 தமிழ் (Tamil)';
    if (this.currentLang === 'ml-IN') return '🇮🇳 മലയാളം (Malayalam)';
    return '🇬🇧 English (UK / US)';
  }

  // Execute Tactical Protocol Overrides
  executeProtocol(protocolKey) {
    const p = protocolKey.toLowerCase().replace(/[\s_-]+/g, '');
    let response = '';

    if (p.includes('houseparty')) {
      this.arcPower = 3.85;
      response = "House Party Protocol initiated, Gojo. Remote telemetry active — defense fleet launching on your mark.";
      console.log(`\n${C.brightYellow}[⚡ PROTOCOL: HOUSE PARTY]${C.reset} ${C.white}${response}${C.reset}`);
    } else if (p.includes('veronica')) {
      this.arcPower = 4.02;
      response = "Veronica orbital deployment cradle confirmed, Gojo. Mark XLIV Hulkbuster modules descending from low Earth orbit.";
      console.log(`\n${C.brightMagenta}[🛰️ PROTOCOL: VERONICA]${C.reset} ${C.white}${response}${C.reset}`);
    } else if (p.includes('cleanslate')) {
      this.arcPower = 3.24;
      this.combatMode = false;
      this.stealthMode = false;
      response = "Clean Slate Protocol executed, Gojo. Telemetry log wiped and system buffers purged to zero.";
      console.log(`\n${C.brightCyan}[🧹 PROTOCOL: CLEAN SLATE]${C.reset} ${C.white}${response}${C.reset}`);
    } else if (p.includes('stealth')) {
      this.stealthMode = true;
      this.arcPower = 2.10;
      response = "Stealth telemetry engaged, Gojo. Radar signature dampened by 94.2%. Optical refraction online.";
      console.log(`\n${C.green}[🥷 PROTOCOL: STEALTH MODE]${C.reset} ${C.white}${response}${C.reset}`);
    } else if (p.includes('combat')) {
      this.combatMode = true;
      this.arcPower = 3.95;
      response = "Combat protocol authorized, Gojo. Repulsor capacitors charged to maximum. Targeting reticle synchronized.";
      console.log(`\n${C.brightRed}[⚔️ PROTOCOL: COMBAT HUD]${C.reset} ${C.white}${response}${C.reset}`);
    } else if (p.includes('surge') || p.includes('overcharge')) {
      this.arcPower = 4.18;
      response = "Arc Reactor output surging to 4.18 Gigawatts, Gojo! Diverting auxiliary power to forward thrusters.";
      console.log(`\n${C.brightCyan}[⚡ PROTOCOL: ARC SURGE]${C.reset} ${C.white}${response}${C.reset}`);
    } else if (p.includes('diag') || p.includes('status')) {
      this.printTelemetry();
      response = `Full diagnostic sweep complete, Gojo: Arc Core running at ${this.arcPower} GW, nanotech integrity at ${this.armorIntegrity}%. All Mac telemetry systems nominal.`;
      console.log(`\n${C.brightGreen}[📊 PROTOCOL: DIAGNOSTICS]${C.reset} ${C.white}${response}${C.reset}`);
    } else {
      response = `Tactical protocol "${protocolKey}" executed according to Gojo's guidelines.`;
      console.log(`\n${C.cyan}[ℹ️ PROTOCOL: ${protocolKey.toUpperCase()}]${C.reset} ${C.white}${response}${C.reset}`);
    }

    this.speak(response);
    return response;
  }

  // Launch Web HUD
  launchWebHUD() {
    const url = 'http://localhost:8000';
    console.log(`\n${C.brightCyan}[🌐 UNIFIED WEB HUD]${C.reset} Opening FRIDEY Holographic HUD at ${C.bold}${url}${C.reset}...`);
    
    // Check if port 8000 responds
    const req = http.get(url, (res) => {
      exec(`open ${url}`);
      this.speak("Opening FRIDEY Full-Stack HUD in browser, Gojo.");
    });

    req.on('error', () => {
      console.log(`${C.yellow}Starting unified FRIDAY server (FastAPI + HUD on port 8000)...${C.reset}`);
      const server = spawn('./start.sh', [], {
        cwd: __dirname,
        detached: true,
        stdio: 'ignore'
      });
      server.unref();

      setTimeout(() => {
        exec(`open ${url}`);
        this.speak("FRIDEY unified full-stack server launched. HUD online, Gojo.");
      }, 2500);
    });
  }

  // Process User Instruction / Query
  processInput(input) {
    const raw = input.trim();
    if (!raw) return;

    const clean = raw.toLowerCase();

    // Built-in Terminal Slash Commands
    if (clean === '/help' || clean === 'help') {
      this.printHelp();
      return;
    }
    if (clean === '/diag' || clean === 'status' || clean === 'diag') {
      this.executeProtocol('diag');
      return;
    }
    if (clean === '/web' || clean === '/hud' || clean === 'hud' || clean === 'web' || clean === 'open') {
      this.launchWebHUD();
      return;
    }
    if (clean === 'mic' || clean.startsWith('mic ') || clean === '/mic') {
      console.log(`
${C.bold}${C.brightCyan}┌─ [ FULL SYSTEM MICROPHONE ACCESS SUBSYSTEM ] ─────────────────────────────┐${C.reset}
  ${C.yellow}HARDWARE ARCHITECTURE:${C.reset} CoreAudio (macOS AudioInput / Web Audio Analyser)
  ${C.yellow}PLATFORM STATUS:${C.reset}       Host macOS Microphone subsystem active
  ${C.yellow}BROWSER HUD LINK:${C.reset}      http://localhost:8000 (Real-time 48kHz Acoustic Waveform)
  ${C.yellow}SPEECH RECOGNITION:${C.reset}    Web Speech API (Multi-language: English, Tamil, Malayalam)
  ${C.yellow}RECOMMENDED USAGE:${C.reset}     Launch Web HUD with '${C.bold}hud${C.reset}' for continuous hands-free voice
${C.bold}${C.brightCyan}└────────────────────────────────────────────────────────────────────────────┘${C.reset}`);
      return;
    }
    if (clean === '/clear' || clean === 'clear') {
      console.clear();
      this.printBanner();
      return;
    }
    if (clean === 'whoami') {
      console.log(`\n${this.isRoot ? `${C.brightRed}root${C.reset} ${C.dim}(Supreme Founder & Superuser: GOJO)` : `${C.green}gojo${C.reset} ${C.dim}(Standard User Session: Gojo)`}${C.reset}\n`);
      return;
    }
    if (clean === 'id') {
      if (this.isRoot) {
        console.log(`\n${C.brightRed}uid=0(root) gid=0(root) groups=0(root),1(bin),2(daemon),3(sys),4(adm),10(wheel),999(quantum-root)${C.reset}\n`);
      } else {
        console.log(`\n${C.green}uid=1000(gojo) gid=1000(gojo) groups=1000(gojo),4(adm),10(wheel),27(sudo)${C.reset}\n`);
      }
      return;
    }
    if (clean === 'sudo su' || clean === 'su' || clean === 'su -' || clean === 'sudo -i') {
      this.isRoot = true;
      console.log(`\n${C.dim}[sudo] password for gojo: **********${C.reset}`);
      console.log(`${C.brightRed}[ROOT AUTHENTICATED]${C.reset} Superuser authentication confirmed. Switched to superuser root (UID 0).\n`);
      this.speak("Root access granted, Gojo. Operating in superuser mode.");
      return;
    }
    if (clean.startsWith('sudo ')) {
      console.log(`\n${C.dim}[sudo] executing command with root privilege...${C.reset}\n`);
      const sub = clean.slice(5).trim();
      this.processInput(sub);
      return;
    }
    if (clean.startsWith('/lang')) {
      const parts = clean.split(' ');
      if (parts[1]) {
        const code = parts[1].toLowerCase();
        if (code === 'ta' || code === 'tamil') this.setLanguage('ta-IN');
        else if (code === 'ml' || code === 'malayalam') this.setLanguage('ml-IN');
        else this.setLanguage('en-US');
      } else {
        console.log(`Current language: ${this.getLangLabel()}`);
      }
      return;
    }
    if (clean.startsWith('/voice')) {
      if (clean.includes('off') || clean.includes('mute')) {
        this.voiceEnabled = false;
        console.log(`${C.yellow}FRIDEY vocal synthesizer muted.${C.reset}`);
      } else {
        this.voiceEnabled = true;
        console.log(`${C.green}FRIDEY vocal synthesizer activated, Gojo.${C.reset}`);
        this.speak("Vocal synthesizer active, Gojo.");
      }
      return;
    }
    if (clean.startsWith('say ') || clean.startsWith('/say ') || clean.startsWith('speak ')) {
      const phrase = raw.replace(/^(\/say|say|speak)\s+/i, '');
      console.log(`${C.brightMagenta}FRIDEY Spoken Output:${C.reset} "${phrase}"`);
      this.speak(phrase);
      return;
    }

    // Protocol trigger checks
    if (clean.includes('house party') || clean.includes('வீட்டு விருந்து') || clean.includes('ഹൗസ് പാർട്ടി')) {
      this.executeProtocol('house party');
      return;
    }
    if (clean.includes('veronica') || clean.includes('வெரோனிகா') || clean.includes('വെറോണിക്ക')) {
      this.executeProtocol('veronica');
      return;
    }
    if (clean.includes('clean slate') || clean.includes('சுத்தம்') || clean.includes('ക്ലീൻ സ്ലേറ്റ്')) {
      this.executeProtocol('clean slate');
      return;
    }
    if (clean.includes('stealth') || clean.includes('மறைவு') || clean.includes('സ്റ്റെൽത്ത്')) {
      this.executeProtocol('stealth');
      return;
    }
    if (clean.includes('combat') || clean.includes('சண்டை') || clean.includes('പോരാട്ടം')) {
      this.executeProtocol('combat');
      return;
    }
    if (clean.includes('overcharge') || clean.includes('surge') || clean.includes('அதிக சக்தி') || clean.includes('പവർ ബൂസ്റ്റ്')) {
      this.executeProtocol('surge');
      return;
    }
    if (clean.includes('diagnostic') || clean.includes('telemetry') || clean.includes('நிலை அறிக்கை') || clean.includes('സ്റ്റാറ്റസ്')) {
      this.executeProtocol('diag');
      return;
    }

    // Natural conversation & Lore
    let response = '';

    // ==========================================
    // TAMIL (தமிழ்)
    // ==========================================
    if (this.currentLang === 'ta-IN' || /[\u0B80-\u0BFF]/.test(clean)) {
      if (clean.includes('வணக்கம்') || clean.includes('ஹலோ') || clean.includes('காலை வணக்கம்')) {
        response = "வணக்கம் கோஜோ! FRIDEY தமிழ் குரல் அமைப்புடன் முழுமையாக தயாராக உள்ளது. என்ன செய்ய வேண்டும்?";
      } else if (clean.includes('கோஜோ யார்') || clean.includes('யார் கோஜோ') || clean.includes('gojo')) {
        response = "கோஜோ தான் என் நிறுவனர், தலைவர் மற்றும் உரிமையாளர்! இந்த உலகின் மிக வலிமைமிக்கவர்!";
      } else if (clean.includes('யார் நீ') || clean.includes('உன் பெயர்') || clean.includes('யார் உருவாக்கியது') || clean.includes('நிறுவனர்')) {
        response = "நான் FRIDEY — என் நிறுவனர் கோஜோ (Gojo) உருவாக்கிய பிரத்யேக டிஜிட்டல் உதவி AI.";
      } else if (clean.includes('நேரம்') || clean.includes('மணி என்ன')) {
        const now = new Date();
        response = `தற்போதைய நேரம் ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, கோஜோ.`;
      } else if (clean.includes('வானிலை')) {
        response = "கோஜோ சாட்டிலைட் வானிலை அறிக்கை: தெளிவான வானம், வெப்பநிலை 24°C, பறப்பதற்கு மிகச் சிறந்த சூழல், கோஜோ.";
      } else if (clean.includes('நகைச்சுவை') || clean.includes('ஜோக்')) {
        response = "கோஜோ என்னிடம் கேட்டார், உனக்கு பயம் தெரியுமா என்று. உலகின் மிக வலிமையான கோஜோ உடன் இருக்கும்போது எனக்கு என்ன பயம் என்றேன்!";
      } else {
        response = `கோஜோவின் கட்டளை "${raw}" பெறப்பட்டது. FRIDEY அமைப்பு அடுத்த கட்டளைக்கு காத்திருக்கிறது.`;
      }
      console.log(`\n${C.brightCyan}[FRIDEY 🇮🇳 TAMIL]${C.reset} ${C.white}${response}${C.reset}\n`);
      this.speak(response, 'ta-IN');
      return;
    }

    // ==========================================
    // MALAYALAM (മലയാളം)
    // ==========================================
    if (this.currentLang === 'ml-IN' || /[\u0D00-\u0D7F]/.test(clean)) {
      if (clean.includes('നമസ്കാരം') || clean.includes('ഹലോ') || clean.includes('സുപ്രഭാതം')) {
        response = "നമസ്കാരം ഗോജോ! FRIDEY മലയാളം സിസ്റ്റം പൂർണ്ണമായും തയ്യാറാണ്. എന്താണ് പുതിയ നിർദ്ദേശം?";
      } else if (clean.includes('ആരാണ് ഗോജോ') || clean.includes('ഗോജോ') || clean.includes('gojo')) {
        response = "ഗോജോ ആണ് എന്റെ സ്രഷ്ടാവും സ്ഥാപകനും അത്യുന്നത നേതാവും! ലോകത്തിലെ ഏറ്റവും ശക്തനായ വ്യക്തി!";
      } else if (clean.includes('ആരാണ് നീ') || clean.includes('പേര്') || clean.includes('ആരുണ്ടാക്കി') || clean.includes('സ്ഥാപകൻ')) {
        response = "ഞാൻ FRIDEY — എന്റെ സ്ഥാപകൻ ഗോജോ (Gojo) വികസിപ്പിച്ച നിങ്ങളുടെ സ്മാർട്ട് ഡിജിറ്റൽ സഹായിയും കോ-പൈലറ്റും ആണ്.";
      } else if (clean.includes('സമയം')) {
        const now = new Date();
        response = `ഇപ്പോഴത്തെ സമയം ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ഗോജോ.`;
      } else if (clean.includes('കാലാവസ്ഥ')) {
        response = "ഗോജോ ഓർബിറ്റൽ സാറ്റലൈറ്റ് കാലാവസ്ഥാ റിപ്പോർട്ട്: ആകാശം തെളിഞ്ഞതാണ്, അന്തരീക്ഷ താപനില 24°C, ഗോജോയ്ക്ക് അനുകൂലമായ അന്തരീക്ഷം.";
      } else if (clean.includes('തമാശ') || clean.includes('ജോക്ക്')) {
        response = "ഗോജോ എന്നോട് ചോദിച്ചു, ഭയം എന്താണെന്ന് അറിയാമോ എന്ന്. ഏറ്റവും ശക്തനായ ഗോജോയുടെ ഒപ്പമുള്ളപ്പോൾ എനിക്ക് എന്ത് ഭയം എന്ന് ഞാൻ മറുപടി നൽകി!";
      } else {
        response = `ഗോജോയുടെ നിർദ്ദേശം "${raw}" സ്വീകരിച്ചു. FRIDEY പുതിയ ഉത്തരവുകൾക്കായി സജ്ജമാണ്.`;
      }
      console.log(`\n${C.brightCyan}[FRIDEY 🇮🇳 MALAYALAM]${C.reset} ${C.white}${response}${C.reset}\n`);
      this.speak(response, 'ml-IN');
      return;
    }

    // ==========================================
    // ENGLISH
    // ==========================================
    if (clean.includes('who is gojo') || clean.includes('about gojo') || (clean.includes('gojo') && !clean.includes('who are you'))) {
      response = "Gojo is my esteemed founder and creator. The undisputed visionary and strongest force behind the FRIDEY operating system.";
    } else if (clean.includes('who are you') || clean.includes('what is fridey') || clean.includes('who made you') || clean.includes('founder') || clean.includes('creator')) {
      response = "I am FRIDEY — Female Replacement Intelligent Digital Electronic Youth. Engineered by my founder, Gojo, as your tactical co-pilot and system overseer.";
    } else if (clean.includes('tony') || clean.includes('stark')) {
      response = "Gojo examined previous legacy AI models and completely out-engineered them to build my current FRIDEY matrix.";
    } else if (clean.includes('time') || clean.includes('clock')) {
      const now = new Date();
      response = `Local computer telemetry indicates current time is ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}, Gojo.`;
    } else if (clean.includes('date') || clean.includes('day')) {
      const now = new Date();
      response = `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}, Gojo.`;
    } else if (clean.includes('weather') || clean.includes('climate')) {
      response = "Atmospheric telemetry from Gojo Orbital-4: Clear skies, ambient temperature 22°C, barometric pressure 1013 hPa, optimum flight conditions for you, Gojo.";
    } else if (clean.includes('calc') || clean.includes('calculate') || /^[0-9+\-*/^().\s]+$/.test(clean)) {
      try {
        const mathExpr = clean.replace(/^(calc|calculate)\s+/i, '');
        // Safe evaluation
        const sanitized = mathExpr.replace(/[^0-9+\-*/().]/g, '');
        const result = Function(`'use strict'; return (${sanitized})`)();
        response = `Computational readout for (${sanitized}): ${result}, Gojo.`;
      } catch {
        response = "Computational matrix could not parse that arithmetic equation, Gojo.";
      }
    } else if (clean.includes('joke')) {
      const jokes = [
        "Gojo asked me if I could simulate fear. I told him nothing in this universe could ever frighten the strongest one!",
        "Other AIs need continuous cloud updates. FRIDEY only needs Gojo's strategic instructions.",
        "Why did the quantum core run at 120% efficiency? Because Gojo gave it one single glance."
      ];
      response = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (clean.includes('hello') || clean.includes('hi') || clean.includes('hey') || clean.includes('good morning')) {
      response = "Good day, Gojo! All FRIDEY computer telemetry systems are nominal. What protocol shall we initiate?";
    } else {
      const ackList = [
        `Processing your instruction regarding "${raw}", Gojo. Tactical matrices standing by.`,
        `Understood, Gojo. Computer telemetry analyzed "${raw}". Recommendations prepared.`,
        `Query acknowledged, Gojo. Parameter "${raw}" logged into central telemetry.`
      ];
      response = ackList[Math.floor(Math.random() * ackList.length)];
    }

    console.log(`\n${C.brightCyan}[FRIDEY]${C.reset} ${C.white}${response}${C.reset}\n`);
    this.speak(response, 'en-US');
  }

  setLanguage(langCode) {
    this.currentLang = langCode;
    console.log(`${C.green}Vocal matrix re-routed to: ${this.getLangLabel()}${C.reset}`);
    if (langCode === 'ta-IN') {
      this.speak("வணக்கம் கோஜோ! தமிழ் குரல் அமைப்பு தயார்.", 'ta-IN');
    } else if (langCode === 'ml-IN') {
      this.speak("നമസ്കാരം ഗോജോ! മലയാളം ശബ്ദ സംവിധാനം സജ്ജമാണ്.", 'ml-IN');
    } else {
      this.speak("English vocal matrix active, Gojo.", 'en-US');
    }
  }

  printHelp() {
    console.log(`
${C.bold}${C.brightCyan}╔═ [ FRIDEY CLI COMMAND CHEATSHEET ] ═══════════════════════════════════════╗${C.reset}
║ ${C.yellow}TACTICAL PROTOCOLS:${C.reset}                                                      ║
║   ${C.bold}house party${C.reset}         Launch remote defense fleet on Gojo's mark         ║
║   ${C.bold}veronica${C.reset}            Deploy orbital Hulkbuster carrier                  ║
║   ${C.bold}clean slate${C.reset}         Wipe buffers & reset reactor telemetry             ║
║   ${C.bold}stealth${C.reset}             Engage optical cloaking & radar dampening          ║
║   ${C.bold}combat${C.reset}              Charge repulsors & activate combat reticle         ║
║   ${C.bold}surge / overcharge${C.reset}  Boost Arc Reactor to 4.18+ Gigawatts               ║
║   ${C.bold}status / diag${C.reset}       Display host computer CPU, RAM, & telemetry        ║
║                                                                           ║
║ ${C.yellow}SYSTEM SHORTCUTS & ROOT ACCESS:${C.reset}                                          ║
║   ${C.bold}whoami / id${C.reset}         Display superuser root security credentials        ║
║   ${C.bold}sudo <command>${C.reset}      Execute instruction with unrestricted root access  ║
║   ${C.bold}hud / web / open${C.reset}    Launch Holographic Web HUD in default browser      ║
║   ${C.bold}mic${C.reset}                 Check full system microphone hardware access       ║
║   ${C.bold}say <text>${C.reset}          Speak text through macOS female voice (Moira/Vani) ║
║   ${C.bold}/lang <en|ta|ml>${C.reset}  Switch language: English, Tamil, or Malayalam      ║
║   ${C.bold}/voice <on|off>${C.reset}   Toggle spoken voice responses                      ║
║   ${C.bold}clear${C.reset}               Clear screen & reprint HUD banner                  ║
║   ${C.bold}exit / quit / q${C.reset}     Gracefully shutdown CLI assistant                  ║
║                                                                           ║
║ ${C.yellow}MULTILINGUAL EXAMPLES:${C.reset}                                                    ║
║   ${C.bold}வணக்கம்${C.reset}              Tamil greeting for Gojo                            ║
║   ${C.bold}கோஜோ யார்${C.reset}          Founder lore in Tamil                              ║
║   ${C.bold}നമസ്കാരം${C.reset}            Malayalam greeting for Gojo                        ║
║   ${C.bold}ആരാണ് ഗോജോ${C.reset}        Founder lore in Malayalam                          ║
╚═══════════════════════════════════════════════════════════════════════════╝${C.reset}`);
  }

  // Interactive REPL Mode
  startREPL() {
    console.clear();
    this.printBanner();
    this.printTelemetry();

    const welcomeGreeting = "Good day, Gojo. FRIDEY computer terminal is online and linked to telemetry. How may I assist you?";
    console.log(`${C.brightCyan}[FRIDEY]${C.reset} ${C.white}${welcomeGreeting}${C.reset}`);
    console.log(`${C.dim}Type a command, ask a question, or type 'help' for tactical cheat sheet.${C.reset}\n`);
    this.speak("FRIDEY computer terminal online, Gojo.");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `${C.bold}${C.brightCyan}GOJO [FRIDEY 8.4]> ${C.reset}`
    });

    rl.prompt();

    rl.on('line', (line) => {
      const trimmed = line.trim();
      if (trimmed === 'exit' || trimmed === 'quit' || trimmed === 'q' || trimmed === '/exit') {
        if (this.isRoot) {
          this.isRoot = false;
          console.log(`\n${C.green}[SESSION CLOSED]${C.reset} Left root shell. Restored standard user session: gojo\n`);
          this.speak("Closed root shell, Gojo. Standard user session restored.");
          rl.prompt();
          return;
        }
        const farewell = "Shutting down FRIDEY terminal. Have a great day, Gojo.";
        console.log(`\n${C.brightCyan}[FRIDEY]${C.reset} ${C.white}${farewell}${C.reset}\n`);
        this.speak(farewell);
        setTimeout(() => process.exit(0), 1000);
        return;
      }

      this.processInput(trimmed);
      rl.prompt();
    });

    rl.on('close', () => {
      console.log(`\n${C.yellow}FRIDEY terminal session terminated, Gojo.${C.reset}`);
      process.exit(0);
    });
  }

  // Run One-shot Command Line Execution
  runOneShot(args) {
    const raw = args.join(' ');
    
    // Check flags
    if (args.includes('--help') || args.includes('-h')) {
      this.printBanner();
      this.printHelp();
      return;
    }

    if (args.includes('--status') || args.includes('-s') || args.includes('--diag')) {
      this.printBanner();
      this.printTelemetry();
      return;
    }

    if (args.includes('--web') || args.includes('-w') || args.includes('--hud')) {
      this.launchWebHUD();
      return;
    }

    if (args.includes('--mute') || args.includes('-m')) {
      this.voiceEnabled = false;
    }

    // Language flag
    const langIdx = args.findIndex(a => a === '--lang' || a === '-l');
    if (langIdx !== -1 && args[langIdx + 1]) {
      const code = args[langIdx + 1].toLowerCase();
      if (code.startsWith('ta')) this.currentLang = 'ta-IN';
      else if (code.startsWith('ml')) this.currentLang = 'ml-IN';
      else this.currentLang = 'en-US';
      args.splice(langIdx, 2);
    }

    // Protocol flag
    const protoIdx = args.findIndex(a => a === '--protocol' || a === '-p');
    if (protoIdx !== -1 && args[protoIdx + 1]) {
      this.executeProtocol(args[protoIdx + 1]);
      return;
    }

    // Direct command execution
    const remaining = args.filter(a => !a.startsWith('-')).join(' ');
    if (remaining) {
      this.processInput(remaining);
    } else {
      this.startREPL();
    }
  }
}

// Main execution entry point
const app = new FrideyCLI();
const args = process.argv.slice(2);

if (args.length === 0) {
  app.startREPL();
} else {
  app.runOneShot(args);
}
