# FRIDEY
### GOJO OS Tactical HUD & AI Voice Assistant (OS v8.4)

[![GOJO OS](https://img.shields.io/badge/FOUNDER-GOJO-00f0ff?style=for-the-badge)](https://github.com)
[![GOJO Protocol](https://img.shields.io/badge/GOJO-PROTOCOL%20v8.4-ff9900?style=for-the-badge)](https://github.com)
[![Web Speech API](https://img.shields.io/badge/VOICE-SPEECH%20ENGINE-00ff88?style=for-the-badge)](https://github.com)

**FRIDEY** is a futuristic, web-based Head-Up Display (HUD) and interactive AI tactical co-pilot, engineered and founded by **GOJO**. Built with multilingual speech synthesis, real-time speech recognition (English, Tamil, and Malayalam), and procedural audio telemetry.

---

## 🌟 Key Features

1. **Holographic Arc Reactor & Digital Neural Matrix (`canvas.js`)**
   - **Consolidated Single-Layer Background**: Full-screen hardware-accelerated canvas simulating a living digital neural communication network.
   - **Synaptic Pathways & Electrical Impulses**: Real-time data packets traversing floating neural nodes with chain-reaction synaptic firings and floating telemetry tags (`[TX: 104 MB/s]`, `[NEURAL_LINK: SYNCED]`).
   - **Arc Reactor HUD**: Concentric gyroscopic reticles, dynamic audio spectrum equalizer, and interactive 3D parallax.
   - **Vocal & Theme Synchronization**: Impulse speed and firing frequency automatically surge during voice recognition and speech, adapting to the active color theme.

2. **Multilingual Speech & Voice Engine (`voice.js`)**
   - **Supported Languages**:
     - 🇬🇧 **English** (`en-US` / `en-IE` / `en-GB`): Authentic female cadence (`Moira`, `Google UK English Female`, `Samantha`).
     - 🇮🇳 **தமிழ் (Tamil)** (`ta-IN`): Native Tamil female speech synthesis (`Vani` on macOS, `Google தமிழ்`, `Pallavi`) and Tamil voice recognition.
     - 🇮🇳 **മലയാളം (Malayalam)** (`ml-IN`): Native Malayalam speech synthesis (`Google മലയാളം`, `Sobhana`, `Ammu`) and Malayalam voice recognition.
   - **Speech Synthesis (Text-to-Speech)**: Strict female-first voice prioritization across all supported languages.
   - **Speech-to-Text (Voice Recognition)**: Dynamically adjusts recognition dictionary to English, Tamil, or Malayalam when switching languages.
   - Real-time typewriter subtitles and state indicators (`LISTENING`, `கேட்கிறது...`, `ശ്രദ്ധിക്കുന്നു...`).

3. **Procedural Sci-Fi Sound Synthesizer (`audio.js`)**
   - Built entirely with the browser **Web Audio API** oscillators, biquad filters, and gain nodes.
   - Zero external audio file dependencies — operates 100% offline without missing assets.
   - Procedural sounds include:
     - Gojo OS Boot Sequence harmonic chord
     - Voice listening activation chirp (ascending pitch)
     - Voice deactivated chirp (descending pitch)
     - Tactical alert alarm
     - Arc reactor power surge hum

4. **Gojo Protocol Engine & Natural Terminal (`core.js`)**
   - **Founder**: Engineered and commanded by **Gojo**.
   - **House Party Protocol**: Remotely mobilizes defense fleet on Gojo's mark.
   - **Veronica Orbital Carrier**: Summons orbital satellite deployment and Hulkbuster modules.
   - **Combat HUD Mode**: Switches color spectrum to War Machine Amber, primes repulsors, and alerts tactical sensors.
   - **Stealth Mode**: Optical refraction and radar dampening to 94.2%.
   - **Clean Slate Protocol**: Resets telemetry logs and purges buffers.
   - **System Diagnostics**: Arc core wattage (GW), nanotech armor integrity, flight thruster output, and core temperatures.
   - **Notes & Reminders Cache**: Stores local tasks and notes in `localStorage`.
   - **Lore & Origin**: Full responses acknowledging Founder Gojo.

5. **Theme Customization Matrix**
   - **Stark Cyan** (Default electric blue & cyan)
   - **War Machine Ember** (High-alert tactical orange & crimson)
   - **Stealth Emerald** (Night-ops covert emerald green)
   - **Quantum Violet** (Interdimensional purple & magenta)

---

## 🚀 Unified Full-Stack Quick Start (`http://localhost:8000`)

FRIDAY operates on a **Unified Single-Port Workflow**: the FastAPI AI Central Brain directly serves the Tactical HUD Frontend, 18 Agents Virtual Office, Chatbot, WebSocket telemetry, and OpenAPI Swagger documentation on port `8000`.

### Method 1: Single-Command Full-Stack Launch (Recommended)
Run the root launcher script to automatically configure virtual environments, dependencies, and start both frontend and backend:
```bash
./start.sh
# or using npm
npm start
```
Then navigate to **`http://localhost:8000`** in your browser.

> [!TIP]
> For comprehensive setup details, environment variables, and agent instruction syntax, see the **[UNIFIED_SETUP_GUIDE.md](file:///Users/student_02/.gemini/antigravity-ide/scratch/FRIDAY/UNIFIED_SETUP_GUIDE.md)**.

### Method 2: Launch via Interactive Terminal CLI
```bash
node cli.js --hud
# or
fridey --hud
```

### Method 3: Standalone Frontend Only (Optional)
If running without the AI backend services:
```bash
npm run frontend:standalone
# or: python3 -m http.server 4173
```

---

## 🖥️ Frontend Files & Architecture Guide

The frontend is built using **Pure Vanilla HTML5, CSS3, and modern ES6+ JavaScript** with zero external frontend framework dependencies, delivering maximum performance, silky 60fps animations, and military-grade telemetry.

### 1. `index.html` — Main HUD Interface
- **Vector Holographic Header**: Features the custom vector SVG Arc Reactor emblem (zero raster image dependencies), 12-hour synchronized workstation clock (`#hudTimeClock`), and system status pill.
- **Tactical Swipe Mic Switch (`#swipeMicControl`)**: Physical swipe/click toggle switch with animated knob (`#swipeMicKnob`), dynamic indicator text (`◄ SWIPE MIC OFF` / `MIC OFF • SWIPE ON ►`), and live 3-bar mini VU acoustic meter.
- **Modular Workspace Layout**:
  - **Left Section (`#colAgentOffice`)**: 3D AI Agent Virtual Office (18 Autonomous Specialist Cabins + Penthouse Suite) & Character Reference Studio.
  - **Right Section (`#colChatbot`)**: Foldable, collapsible AI neural assistant ("Ask Anything").
- **Central Core Canvas (`#hudCoreCanvas`)**: Dedicated viewport for the retina Arc Reactor and dynamic audio frequency visualizer.
- **Matrix Config Settings Drawer (`#settingsDrawer`)**: Sliding tactical configuration drawer with language selectors, female voice profile switches, and microphone device routing.

### 2. `agents.js` & `core.js` — 18 AI Agent Fleet & Virtual Office Engine
- **3D AI Agent Virtual Office & Cyber Floor**:
  - 18 autonomous specialist agents across 5 strategic departments: Engineering & Code, Cybersecurity & Defense, Data Science & Analytics, Design & Neural UX, and Strategy & Command.
  - Interactive 3D isometric view with animated particle bursts, laptop workstation lighting, and real-time CPU/RAM telemetry.
  - Multi-agent collaboration with animated quantum laser synergy between paired agent cabins.
- **Character & Office Reference Studio (`REFS`)**:
  - Interactive studio mode rendering character and workstation artwork (`AGENT cherater references.webp`, `Agent work office refference.webp`, `Agents colobes reference.webp`).
  - Departmental hot-spots and real-time cabin hardware specs inspect modal.
- **Foldable AI Chatbot ("Ask Anything")**:
  - Independent collapsible column with smooth 350ms transitions.
  - Real-time neural bridge to FastAPI backend (`/api/chat`).
  - Direct natural language agent instruction dispatch (`"instruct agent 1 to..."`, `"collab agent 1 and 2"`).
  - Live backend data and telemetry inspection (`"take datas on backend"`).
- **12-Hour Telemetry Clock**: Synchronizes workstation clock, message bubble timestamps, and AI time responses in 12-hour format with AM/PM indicators.

### 3. `voice.js` — Speech Engine & Microphone Hardware Controller
- **Temporary Microphone Hardware Blocking**:
  - When mic is switched **OFF** (`setMicMuted(true)` or `mic off`):
    - Completely stops all audio tracks via `track.stop()`, halting hardware recording at the OS kernel level and clearing the macOS recording dot / browser red indicator.
    - Sets `micStream = null`, disconnects Web Audio nodes, and cancels the VU meter animation frame loop.
    - Aborts speech recognition and updates permission badge to `TEMPORARILY BLOCKED`.
  - When mic is switched **ON** (`setMicMuted(false)` or `mic on`):
    - Re-requests hardware access via `navigator.mediaDevices.getUserMedia()`.
    - Reconnects Web Audio 48kHz FFT analyser, resumes VU meter sampling, and re-arms speech recognition.
    - Updates badge to `ONLINE / GRANTED`.
- **Female Voice Engine Prioritization**:
  - Default female voice set to **Samantha** (crystal-clear, smooth natural American English female voice on macOS) with optimized pitch (`1.04`) and rate (`1.00`).
  - Dynamic voice profile switching (`cycleFemaleVoice()`) accessible via Matrix settings drawer or vocal commands (`change voice`, `switch voice`).
- **Multilingual Vocal Intelligence**: Full bi-directional voice recognition and synthesis for English, தமிழ் (Tamil), and മലയാളം (Malayalam).

### 4. `style.css` — Cyberpunk HUD Design System
- Pure Vanilla CSS design tokens with custom HSL glowing color matrices (Stark Cyan, War Machine Amber, Stealth Emerald, Quantum Violet).
- Glassmorphic panels, animated scanlines, and tactical glowing borders.
- Responsive flexbox column folding animations and tactile swipe knob slider physics.

### 5. `canvas.js` — Holographic Visualizer
- Hardware-accelerated 2D Canvas rendering the holographic Arc Reactor, dynamic concentric reticles, and live audio frequency spectrum waveform.
- Synaptic neural matrix simulating background packet transmissions with particle burst reactions.

### 6. `audio.js` — Procedural Web Audio Synthesizer
- 100% offline, zero-asset sound generator utilizing Web Audio oscillators, biquad filters, and gain ramps.
- Procedural audio feedback for boot chords, mic activation/deactivation chirps, and tactical alert sirens.

---

## 💻 Computer CLI Terminal Installation Methods

FRIDEY includes a standalone computer terminal CLI (`cli.js`) that operates directly from your Mac terminal with macOS native speech synthesis, system hardware telemetry (Apple Silicon CPU, RAM, Battery, Host), and protocol overrides.

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  ███████╗██████╗ ██╗██████╗ ███████╗██╗   ██╗                                ║
║  ██╔════╝██╔══██╗██║██╔══██╗██╔════╝╚██╗ ██╔╝   GOJO OS v8.4.2                   ║
║  █████╗  ██████╔╝██║██║  ██║█████╗   ╚████╔╝    TACTICAL COMPUTER CLI ASSISTANT ║
║  ██╔══╝  ██╔══██╗██║██║  ██║██╔══╝    ╚██╔╝     FOUNDER & OWNER: GOJO           ║
║  ██║     ██║  ██║██║██████╔╝███████╗   ██║      ACTIVE PILOT: GOJO              ║
║  ╚═╝     ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝   ╚═╝                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Method 1: Local Development Link (Recommended)
Link the repository locally so the `fridey` binary is available across all terminal windows:
```bash
# 1. Navigate to the FRIDAY project folder
cd /Users/student_02/.gemini/antigravity-ide/scratch/FRIDAY

# 2. Link binary globally via NPM
npm link
```
Now, simply type `fridey` from **any directory** in your terminal!

---

### Method 2: Global NPM Installation
Install the package directly into your system's global node_modules:
```bash
# Inside the FRIDAY directory:
npm install -g .

# Or using the package script shortcut:
npm run install:cli
```

---

### Method 3: Direct Executable Symlink (Instant System-Wide Access)
If you prefer not to use NPM symlinking, create a direct symlink in `/usr/local/bin`:
```bash
# 1. Make cli.js executable
chmod +x /Users/student_02/.gemini/antigravity-ide/scratch/FRIDAY/cli.js

# 2. Symlink to /usr/local/bin
sudo ln -sf /Users/student_02/.gemini/antigravity-ide/scratch/FRIDAY/cli.js /usr/local/bin/fridey
```

---

### Method 4: Run Locally Without Installation
You can also run the CLI tool directly from within the project directory without modifying system paths:
```bash
# Direct node execution
node cli.js

# Or via npm scripts
npm run cli         # Interactive REPL
npm run cli:status  # Hardware telemetry snapshot
npm run cli:hud     # Launch Web HUD from CLI
```

---

### 🔍 Verifying CLI Installation
Confirm that the `fridey` command is correctly recognized by your shell:
```bash
# Check version and status
fridey --status

# Display CLI help matrix
fridey --help
```

---

## 🎮 CLI Terminal Usage & Command Matrix

### 1. Global Command Options
```bash
# Launch interactive tactical CLI REPL
fridey

# Get immediate status & Mac hardware diagnostics
fridey --status
# or
fridey -s

# Launch Web HUD in default browser
fridey --web
# or
fridey -w

# Trigger tactical protocol directly
fridey -p veronica
fridey -p "house party"
fridey -p combat
fridey -p stealth

# Ask natural language questions (English, Tamil, Malayalam)
fridey "Who is Gojo?"
fridey "What is the weather?"
fridey "வணக்கம் கோஜோ"
fridey "ആരാണ് ഗോജോ"
```

### 2. Built-in CLI REPL Slash Commands
Inside the interactive `GOJO [FRIDEY 8.4]>` terminal:
- `help`: View tactical command cheatsheet
- `status` or `diag`: Run full diagnostic sweep of host Mac CPU, memory, and Arc Reactor
- `hud` or `web` or `open`: Launch the browser HUD at `http://localhost:4173`
- `mic`: Check full system microphone hardware access status
- `say <text>`: Speak arbitrary text aloud via macOS female vocal engine (Moira / Samantha / Vani)
- `/lang <en|ta|ml>`: Switch active language matrix
- `/voice <on|off>`: Toggle spoken voice responses
- `clear`: Clear screen and re-render HUD banner
- `exit` or `quit`: Gracefully shutdown assistant

---

## 🎙️ Voice & Terminal Protocol Commands Cheatsheet

| Command | Action / Protocol |
| :--- | :--- |
| **"House Party Protocol"** | Activates remote fleet launch on Gojo's mark |
| **"Deploy Veronica"** | Requests orbital satellite carrier (Hulkbuster) |
| **"Clean Slate Protocol"** | Clears transcript and resets reactor gauges |
| **"Combat Mode"** | Engages red tactical warning HUD and charges repulsors |
| **"Stealth Mode"** | Lowers radar profile and activates optical cloaking |
| **"Arc Reactor Overcharge"** | Surges core power to 4.18+ Gigawatts |
| **"Run system diagnostics"** | Reports full telemetry of armor, thrusters, and core |
| **"Who made you?"** | Explains FRIDEY's origin under Founder Gojo |
| **"Who is Gojo?"** | Details Gojo's role as supreme creator and founder |
| **"What time is it?"** | Reports workstation clock in 12-hour format with AM/PM |
| **"Change voice"** | Dynamically cycles female vocal profile (Samantha, Karen, etc.) |
| **"நிலை அறிக்கை" (Tamil)** | Full diagnostics report in Tamil |
| **"சிஸ்டம் ஸ்டாറ്റസ്" (Malayalam)** | Full diagnostics report in Malayalam |

---

## 🏢 3D AI Agents Virtual Office & FRIDEY Central Master Brain

FRIDEY acts as the **central neural Master Brain**, overseeing and delegating missions to **18 Autonomous Specialist AI Agents** stationed in an animated **3D Cyber-Office** on the left side of the HUD.

### 👑 FRIDEY Apex Executive Command Suite
- **Cabin**: Apex Executive Glass Suite (Elevated Pod with glowing gold and cyan boundary).
- **Workstation Desk**: Floating Quantum Command Table with live Arc Reactor Core pulse.
- **Holo-Console**: Central Quantum Array Holo-Console (1024-Qubit Quantum Array).
- **Role**: Coordinates the multi-agent neural bus, routes streaming IPC packets, and dispatches skill-tailored missions across all 4 departments.

---

### The 18 Autonomous AI Agents & Procedural 3D Virtual Office

Each agent is identified strictly by their **unique numeric designation** (`AGENT-01` through `AGENT-18`, with `AGENT-00` for FRIDEY Executive Master Brain), stationed in an **individual glass cabin/pod**, outfitted with a **custom workstation table/desk** and a **dedicated glowing laptop**, and animated with a **procedural 3D human body model**:

| Cabin # | Unique Code | Role & Division | Desk / Workstation | Dedicated Laptop & Gear | Core Skills |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **AGENT-01** | Lead Systems Architect (Coding) | Glass Executive Corner Desk | Triple-Screen CarbonBook (M4 Max, 128GB) | Next.js, Rust, TypeScript, WASM |
| **02** | **AGENT-02** | Backend API Maestro (Coding) | Curved Acoustic Pod Desk | Dual-Screen Workstation (Go, eBPF) | Go, gRPC, Redis, Kafka, Distributed SQL |
| **03** | **AGENT-03** | UI/UX & Shader Engineer (Coding) | White Glass Ergonomic Standing Desk | Studio Retina XDR (RTX 4090 eGPU) | Three.js, WebGL, GLSL, Canvas 2D |
| **04** | **AGENT-04** | Cloud & DevOps Pioneer (Coding) | Industrial Cyber Steel Bench | Military-Grade ToughBook (Fedora CoreOS) | Kubernetes, Docker, Terraform, Helm |
| **05** | **AGENT-05** | Web3 & Smart Contracts (Coding) | Air-Gapped Clean-Room Workstation | NitroBook with Hardware Security Module (HSM) | Solidity, EVM, ZK-Proofs, Formal Audit |
| **06** | **AGENT-06** | SIEM & SOC Hunter (Security) | Curved Surround SOC Console | Quad-Tiled SOC Defense Laptop | SIEM, Wazuh, Suricata, Threat Hunting |
| **07** | **AGENT-07** | Offensive Penetration (Security)| Stealth Black Desk (Crimson Glow) | Kali Linux Dragon Station (HackRF SDR) | Nmap Recon, Metasploit, PrivEsc, Burp |
| **08** | **AGENT-08** | Reverse Engineering (Security) | Anti-Static Forensic Lab Table | High-RAM Forensic Rig (Ghidra, IDA Pro) | Ghidra, Volatility, YARA, Memory Dumps |
| **09** | **AGENT-09** | Cloud Defense & IAM (Security) | Biometric Shielded Privacy Pod | Hardened Qubes OS Laptop + Nitrokey FIDO2 | Zero-Trust, IAM Audits, mTLS, KMS |
| **10** | **AGENT-10** | Deep Learning Architect (Analytics)| Floating Desk with Neural Pulse Rings | Dual NVIDIA TensorBook (PyTorch, CUDA) | Transformers, GGUF/AWQ, Fine-Tuning |
| **11** | **AGENT-11** | Threat Graph Analyst (Analytics) | Panoramic Curved Glass Desk | Multi-Window Threat Graph Rig (Neo4j) | MITRE ATT&CK, STIX/TAXII, MISP |
| **12** | **AGENT-12** | Algorithmic Risk (Analytics) | High-Precision Stainless Steel Desk | Bloomberg-Style Telemetry Multi-Feed Rig | Monte Carlo, Stochastic Models, SciPy |
| **13** | **AGENT-13** | RAG & Knowledge Synth (Analytics) | Ambient Holographic Node | High-Speed Vector Engine Rig (Milvus) | Hybrid Vector Search, Dense Embeddings |
| **14** | **AGENT-14** | Low-Level OS Hacker (Systems) | Vintage Modern Hacker Desk | ThinkPad Classic (Custom Gentoo Real-Time) | eBPF, C, Assembly, Device Drivers |
| **15** | **AGENT-15** | Distributed DB Architect (Systems)| Heavy-Duty Server Rack Console | Multi-Tenant Database Rig (ScyllaDB) | ScyllaDB, Distributed SQL, Sharding |
| **16** | **AGENT-16** | OSINT & Stealth Scraping (Systems)| Recessed Shadow Privacy Pod | Headless Stealth Scraping Rig (Playwright) | Tor Routing, OSINT Harvesting, Anti-Fingerprint |
| **17** | **AGENT-17** | SRE & Resilience Engineer (Systems)| Dual-Tier Desk with Live Prometheus | Monitoring Hub Rig (Prometheus, Grafana) | Chaos Engineering, P99 Latency, SRE |
| **18** | **AGENT-18** | Automated QA Strategist (Systems) | Clean Geometric Modular Bench | Automated Test Matrix Rig (Jest, Mocha) | Fuzz Testing, Mutation Testing, QA Suites |

---

### Procedural 3D Human Body & Kinematic Animation System

1. **Procedural Humanoid Anatomy**:
   - High-tech tactical cyber-vest with illuminated agent numeric badge (`#01` - `#18` and `#00`).
   - Cyber-helmet with scanning illuminated visor beam traversing horizontally.
   - Articulated kinematic arms, hands, legs, cyber-boots, and ground contact shadow.
2. **Walking Animation**:
   - Alternating leg strides with natural knee flexure.
   - Counter-phase locomotive arm swings.
   - Dynamic vertical torso/head bobbing.
   - Expanding holographic footstep ripple rings on the glass office floor.
3. **Working & Typing Animation**:
   - Seated workstation posture facing desk.
   - High-speed kinematic typing finger taps over the laptop keyboard with micro-spark contact glow.
   - Synchronized streaming code matrix scanlines scrolling vertically on the tilted display.
4. **Laptop Handling Animation**:
   - Dynamic chassis tilt: laptop screen angle physically tilts smoothly between 10° and 35°.
   - Left hand grips and adjusts the screen bezel; right hand gestures toward the display.
   - Floating holographic diagnostic telemetry HUD with live oscillating waveform graphs.
5. **Dynamic Collaboration Engine**:
   - Synergistic pairing of agents (e.g. AGENT-01 & AGENT-02, AGENT-06 & AGENT-07, AGENT-10 & AGENT-13, AGENT-15 & AGENT-17).
   - Partner agent stands or walks to partner cabin; both face each other.
   - Multi-layer illuminated gradient laser beam connecting laptops with bidirectional streaming byte packets.
   - Midpoint floating collaboration status badge: `COLLAB: AGENT-XX <-> AGENT-YY [DATA BUS SYNC]`.

---

### Linux Terminal `agents` Command Suite

Interact directly with the agent fleet from the resized, compact Linux Terminal:

```bash
# List all 18 specialist agents by unique number, cabins, desks, laptops, and active tasks
agents list

# View real-time fleet load, active mission count, and human body animation telemetry
agents status

# Pair two agents in real-time dynamic collaboration with neural laser bus
agents collab 1 2

# Trigger procedural human body animations manually
agents walk 4          # Walking stride along hallway circuit
agents work 1          # Seated rapid typing & code compilation
agents laptop 3        # Laptop handling, screen tilt & diagnostic HUD

# Dispatch a specific task to any agent by unique number or ID
agents assign 1 "Refactor IPC socket protocol in Rust with zero-copy buffers"
agents assign 2 "Optimize Kafka streaming partition consumers"
agents assign 6 "Audit Wazuh SIEM alerts for living-off-the-land binaries"

# Filter agents by department
agents dept coding
agents dept security
agents dept analytics
agents dept systems

# Open the 3D cabin inspection & gear dispatch modal for an agent
agents inspect 1

# Coordinated dispatch of skill-matched missions to all 18 agents simultaneously
agents dispatch
```

---

## 📁 Project Structure

```
FRIDAY/
├── assets/
│   └── hud_bg.jpg          # GOJO OS cinematic HUD wallpaper
├── agents.js               # 18 AI Agent fleet engine, 3D isometric office & data bus
├── audio.js                # Procedural Web Audio API sound synthesizer
├── canvas.js               # Retina 2D Canvas Arc Reactor & spectrum visualizer
├── cli.js                  # Standalone computer CLI terminal engine with macOS speech
├── core.js                 # Linux terminal workstation, security suites, chatbot & clock
├── index.html              # Main HUD layout: 3D Office (left), Compact Terminal & Chatbot
├── package.json            # Scripts, bin entry point ('fridey') & package metadata
├── README.md               # Comprehensive documentation, frontend guide & CLI install
├── style.css               # Glassmorphic, neon cyber-HUD responsive design & 3D styling
└── voice.js                # Microphone hardware control, blocking & speech synthesis
```

---

## ⚙️ Workspace Configuration
To make this project your active workspace in Antigravity IDE:
1. Open the File / Workspace menu.
2. Select **Open Folder...**
3. Choose `/Users/student_02/.gemini/antigravity-ide/scratch/FRIDAY`.


