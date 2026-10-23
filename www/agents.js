/**
 * FRIDEY AI AGENT FLEET & 3D VIRTUAL OFFICE ENGINE
 * Master Brain: FRIDEY (Executive Command Cabin)
 * Fleet: 18 Autonomous AI Agents with Individual Cabins, Desks, Laptops & Skill Profiles
 * Founder & Creator: GOJO • Gojo Enterprise
 */

class FridayAgentFleetEngine {
  constructor() {
    this.masterBrain = {
      id: 'friday-00',
      number: 0,
      code: 'AGENT-00',
      name: 'AGENT-00 (FRIDEY BRAIN)',
      title: 'Central Neural Master Brain & Autonomous Dispatcher',
      department: 'command',
      deptLabel: 'Executive Master Suite',
      deptColor: '#00f0ff',
      avatar: '00',
      cabin: 'Apex Executive Suite',
      table: 'Floating Quantum Command Table with Arc Core',
      laptop: 'Central Holo-Console (Quantum Array 1024-Qubit)',
      skills: ['Fleet Orchestration', 'Multi-Agent Neural Bus', 'Autonomous Dispatch', 'Full-System Sovereignty'],
      task: 'ORCHESTRATING 18 AUTONOMOUS AGENTS • ALL WORKFLOWS ACTIVE',
      progress: 99,
      status: 'COMMANDING',
      cpuLoad: 28,
      memoryLoad: '4.8 GB',
      human: {
        state: 'COMMANDING',
        walkProgress: 0,
        collabPartnerId: null,
        typingSpeed: 14,
        laptopTilt: 0.15,
        bobPhase: 0
      }
    };

    // 18 Autonomous AI Agents (Identified strictly by unique numeric codes, no emojis)
    this.agents = [
      // DEPARTMENT 1: ENGINEERING & CODE SYNTHESIS (AGENTS 01 - 05)
      {
        id: 'agent-01',
        number: 1,
        code: 'AGENT-01',
        name: 'AGENT-01',
        title: 'Lead Full-Stack Systems Architect',
        department: 'coding',
        deptLabel: 'Engineering & Code',
        deptColor: '#00f0ff',
        avatar: '01',
        cabin: 'Cabin 01 (East Wing)',
        table: 'Glass Executive Corner Desk',
        laptop: 'Triple-Screen Curved CarbonBook (M4 Max, 128GB)',
        skills: ['Next.js', 'Rust', 'TypeScript', 'Node.js', 'WebAssembly'],
        task: 'Refactoring low-latency IPC socket bus for real-time neural telemetry',
        progress: 88,
        status: 'WORKING',
        cpuLoad: 76,
        memoryLoad: '3.4 GB',
        logs: ['[AGENT-01] Compiling socket_bridge.rs with --release flag...', '[AGENT-01] Latency dropped from 4.2ms to 0.48ms.'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: 'agent-02', typingSpeed: 16, laptopTilt: 0, bobPhase: 0.2 }
      },
      {
        id: 'agent-02',
        number: 2,
        code: 'AGENT-02',
        name: 'AGENT-02',
        title: 'Backend & High-Throughput API Maestro',
        department: 'coding',
        deptLabel: 'Engineering & Code',
        deptColor: '#00f0ff',
        avatar: '02',
        cabin: 'Cabin 02 (East Wing)',
        table: 'Minimalist Matte Obsidian Workstation',
        laptop: 'Dual 4K Pro Display Workstation (Linux Arch, eBPF)',
        skills: ['Go', 'gRPC', 'Kafka', 'Redis Sharding', 'Microservices'],
        task: 'Scaling distributed event stream to 2.4M concurrent telemetry events/sec',
        progress: 94,
        status: 'COLLABORATING',
        cpuLoad: 68,
        memoryLoad: '5.1 GB',
        logs: ['[AGENT-02] Kafka consumer group rebalanced across 12 partitions.', '[AGENT-02] Zero dropped packets recorded.'],
        human: { state: 'COLLABORATING', walkProgress: 0, collabPartnerId: 'agent-01', typingSpeed: 14, laptopTilt: 0.22, bobPhase: 0.6 }
      },
      {
        id: 'agent-03',
        number: 3,
        code: 'AGENT-03',
        name: 'AGENT-03',
        title: '3D WebGL & Creative Shader Engineer',
        department: 'coding',
        deptLabel: 'Engineering & Code',
        deptColor: '#00f0ff',
        avatar: '03',
        cabin: 'Cabin 03 (East Wing)',
        table: 'Illuminated Ergonomic Drafting Table',
        laptop: 'Studio Retina XDR Workstation (NVIDIA RTX 4090 eGPU)',
        skills: ['WebGL', 'Three.js', 'GLSL Raymarching', 'Canvas 2D', 'CSS Houdini'],
        task: 'Optimizing 60 FPS raymarching shader for holographic Arc Reactor HUD',
        progress: 79,
        status: 'LAPTOP_HANDLING',
        cpuLoad: 84,
        memoryLoad: '7.8 GB',
        logs: ['[AGENT-03] Compiling fragment shader arc_reactor.frag...', '[AGENT-03] GPU frame budget: 14.2ms / 16.6ms.'],
        human: { state: 'LAPTOP_HANDLING', walkProgress: 0, collabPartnerId: null, typingSpeed: 12, laptopTilt: 0.35, bobPhase: 1.1 }
      },
      {
        id: 'agent-04',
        number: 4,
        code: 'AGENT-04',
        name: 'AGENT-04',
        title: 'DevOps & Cloud Orchestration Captain',
        department: 'coding',
        deptLabel: 'Engineering & Code',
        deptColor: '#00f0ff',
        avatar: '04',
        cabin: 'Cabin 04 (East Wing)',
        table: 'Industrial Cyber Steel Bench',
        laptop: 'Military-Grade ToughBook (Fedora CoreOS, Terraform)',
        skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD Pipelines', 'Helm'],
        task: 'Rolling automated zero-downtime micro-service update to AWS ap-south-1',
        progress: 100,
        status: 'WALKING',
        cpuLoad: 42,
        memoryLoad: '2.9 GB',
        logs: ['[AGENT-04] Helm release v8.4.2 deployed cleanly.', '[AGENT-04] 18 agent pods in Running state.'],
        human: { state: 'WALKING', walkProgress: 0.35, collabPartnerId: 'friday-00', typingSpeed: 10, laptopTilt: 0.1, bobPhase: 1.8 }
      },
      {
        id: 'agent-05',
        number: 5,
        code: 'AGENT-05',
        name: 'AGENT-05',
        title: 'Smart Contracts & Cryptography Dev',
        department: 'coding',
        deptLabel: 'Engineering & Code',
        deptColor: '#00f0ff',
        avatar: '05',
        cabin: 'Cabin 05 (East Wing)',
        table: 'Air-Gapped Clean-Room Workstation',
        laptop: 'NitroBook with Hardware Security Module (HSM)',
        skills: ['Solidity', 'EVM Internals', 'Zero-Knowledge Proofs', 'Formal Verification'],
        task: 'Formally verifying ZK-SNARK circuit constraints for decentralized data integrity',
        progress: 92,
        status: 'WORKING',
        cpuLoad: 91,
        memoryLoad: '6.4 GB',
        logs: ['[AGENT-05] Proving key generated (256-bit elliptic curve).', '[AGENT-05] Verification check passed: OK.'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: null, typingSpeed: 18, laptopTilt: 0, bobPhase: 2.3 }
      },

      // DEPARTMENT 2: CYBER DEFENSE & OFFENSIVE SECURITY (AGENTS 06 - 09)
      {
        id: 'agent-06',
        number: 6,
        code: 'AGENT-06',
        name: 'AGENT-06',
        title: 'SOC L2 Threat Hunter & Perimeter Sentinel',
        department: 'security',
        deptLabel: 'Cyber Defense',
        deptColor: '#ff9900',
        avatar: '06',
        cabin: 'Cabin 06 (North Wing)',
        table: 'Curved Surround Tactical SOC Console',
        laptop: 'Quad-Tiled SOC Defense Laptop (Wazuh / Suricata / Zeek)',
        skills: ['SIEM', 'Suricata', 'Wazuh', 'Snort', 'Packet Dissection', 'Threat Hunting'],
        task: 'Inspecting anomalous outbound encrypted egress on port 4444',
        progress: 86,
        status: 'COLLABORATING',
        cpuLoad: 63,
        memoryLoad: '4.2 GB',
        logs: ['[AGENT-06] Suricata signature rule triggered: suspicious TLS beacon.', '[AGENT-06] Firewall auto-isolated rogue socket.'],
        human: { state: 'COLLABORATING', walkProgress: 0, collabPartnerId: 'agent-07', typingSpeed: 15, laptopTilt: 0.18, bobPhase: 2.8 }
      },
      {
        id: 'agent-07',
        number: 7,
        code: 'AGENT-07',
        name: 'AGENT-07',
        title: 'Penetration Tester & Red Team Operative',
        department: 'security',
        deptLabel: 'Cyber Defense',
        deptColor: '#ff9900',
        avatar: '07',
        cabin: 'Cabin 07 (North Wing)',
        table: 'Stealth Black Tinted Desk with Crimson Underglow',
        laptop: 'Kali Linux Dragon Workstation (Alfa WiFi / SDR HackRF)',
        skills: ['Nmap Recon', 'Metasploit', 'Privilege Escalation', 'Exploit POC', 'Burp Suite'],
        task: 'Running multi-threaded Nmap NSE vulnerability audits on simulated target subnet',
        progress: 74,
        status: 'LAPTOP_HANDLING',
        cpuLoad: 89,
        memoryLoad: '5.8 GB',
        logs: ['[AGENT-07] Running nmap -sV --script=vuln on 10.0.0.0/24...', '[AGENT-07] Discovered 4 vulnerable test services.'],
        human: { state: 'LAPTOP_HANDLING', walkProgress: 0, collabPartnerId: 'agent-06', typingSpeed: 14, laptopTilt: 0.3, bobPhase: 3.4 }
      },
      {
        id: 'agent-08',
        number: 8,
        code: 'AGENT-08',
        name: 'AGENT-08',
        title: 'Digital Forensics & Reverse Engineer',
        department: 'security',
        deptLabel: 'Cyber Defense',
        deptColor: '#ff9900',
        avatar: '08',
        cabin: 'Cabin 08 (North Wing)',
        table: 'Anti-Static Forensic Laboratory Table',
        laptop: 'High-RAM Forensic Station (Ghidra / IDA Pro / Volatility)',
        skills: ['Volatility', 'Ghidra', 'YARA Signatures', 'Memory Dumps', 'Malware Triage'],
        task: 'Decompiling obfuscated binary artifact and generating automated YARA detection rule',
        progress: 95,
        status: 'WORKING',
        cpuLoad: 72,
        memoryLoad: '8.3 GB',
        logs: ['[AGENT-08] Ghidra decompiler identified unpacker stub.', '[AGENT-08] YARA rule rule_mal_gojo_v8 generated.'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: null, typingSpeed: 13, laptopTilt: 0, bobPhase: 3.9 }
      },
      {
        id: 'agent-09',
        number: 9,
        code: 'AGENT-09',
        name: 'AGENT-09',
        title: 'Zero-Trust Cloud & IAM Enclave Guardian',
        department: 'security',
        deptLabel: 'Cyber Defense',
        deptColor: '#ff9900',
        avatar: '09',
        cabin: 'Cabin 09 (North Wing)',
        table: 'Biometric Shielded Privacy Pod',
        laptop: 'Hardened Qubes OS Laptop with Nitrokey FIDO2',
        skills: ['Zero-Trust', 'IAM Audits', 'mTLS Enforcement', 'CSPM', 'KMS Encryption'],
        task: 'Auditing cross-account role delegations and rotating all root cryptographic keys',
        progress: 100,
        status: 'WORKING',
        cpuLoad: 38,
        memoryLoad: '2.4 GB',
        logs: ['[AGENT-09] AWS IAM least-privilege analysis complete: 100% compliant.', '[AGENT-09] Cryptographic keys rotated.'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: null, typingSpeed: 11, laptopTilt: 0, bobPhase: 4.5 }
      },

      // DEPARTMENT 3: DEEP ANALYTICS & NEURAL INTELLIGENCE (AGENTS 10 - 13)
      {
        id: 'agent-10',
        number: 10,
        code: 'AGENT-10',
        name: 'AGENT-10',
        title: 'Neural Network & LLM Architecture Specialist',
        department: 'analytics',
        deptLabel: 'Deep Analytics',
        deptColor: '#bc13fe',
        avatar: '10',
        cabin: 'Cabin 10 (West Wing)',
        table: 'Floating Glass Workstation with Neural Pulse Rings',
        laptop: 'Dual NVIDIA TensorBook (PyTorch / CUDA / HuggingFace)',
        skills: ['Transformer Architecture', 'Quantization (AWQ/GGUF)', 'Model Fine-Tuning', 'PyTorch'],
        task: 'Fine-tuning tactical NLP weights for instantaneous Tamil & Malayalam intent parsing',
        progress: 81,
        status: 'WORKING',
        cpuLoad: 95,
        memoryLoad: '12.4 GB',
        logs: ['[AGENT-10] Epoch 4/5 complete. Cross-entropy loss: 0.082.', '[AGENT-10] Attention heads synced to FRIDEY core.'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: 'agent-13', typingSpeed: 17, laptopTilt: 0, bobPhase: 5.1 }
      },
      {
        id: 'agent-11',
        number: 11,
        code: 'AGENT-11',
        name: 'AGENT-11',
        title: 'Cyber Threat Intelligence (CTI) Correlator',
        department: 'analytics',
        deptLabel: 'Deep Analytics',
        deptColor: '#bc13fe',
        avatar: '11',
        cabin: 'Cabin 11 (West Wing)',
        table: 'Panoramic Curved Glass Desk',
        laptop: 'Multi-Window Threat Graph Workstation (Neo4j / MISP)',
        skills: ['MITRE ATT&CK', 'IOC Correlation', 'Graph Analytics', 'STIX/TAXII Feeds'],
        task: 'Mapping real-time APT threat actor indicators against MITRE enterprise matrix',
        progress: 87,
        status: 'WALKING',
        cpuLoad: 67,
        memoryLoad: '6.1 GB',
        logs: ['[AGENT-11] Correlated 84 IP addresses with known C2 infrastructure.', '[AGENT-11] MITRE technique T1059 matched.'],
        human: { state: 'WALKING', walkProgress: 0.62, collabPartnerId: 'agent-12', typingSpeed: 12, laptopTilt: 0.12, bobPhase: 5.7 }
      },
      {
        id: 'agent-12',
        number: 12,
        code: 'AGENT-12',
        name: 'AGENT-12',
        title: 'Quantitative & Predictive Modeler',
        department: 'analytics',
        deptLabel: 'Deep Analytics',
        deptColor: '#bc13fe',
        avatar: '12',
        cabin: 'Cabin 12 (West Wing)',
        table: 'High-Precision Stainless Steel Desk',
        laptop: 'Bloomberg-Style Multi-Feed Telemetry Laptop',
        skills: ['Monte Carlo Simulations', 'Stochastic Modeling', 'Risk Assessment', 'NumPy / SciPy'],
        task: 'Simulating suit power dissipation curves and thruster heat curves under sustained Mach 4',
        progress: 99,
        status: 'COLLABORATING',
        cpuLoad: 82,
        memoryLoad: '7.0 GB',
        logs: ['[AGENT-12] 100,000 Monte Carlo runs finished.', '[AGENT-12] Projected core temperature margin: +18.4°C (Safe).'],
        human: { state: 'COLLABORATING', walkProgress: 0, collabPartnerId: 'agent-11', typingSpeed: 15, laptopTilt: 0.25, bobPhase: 0.4 }
      },
      {
        id: 'agent-13',
        number: 13,
        code: 'AGENT-13',
        name: 'AGENT-13',
        title: 'Multi-Agent Synthesizer & RAG Pipeline Master',
        department: 'analytics',
        deptLabel: 'Deep Analytics',
        deptColor: '#bc13fe',
        avatar: '13',
        cabin: 'Cabin 13 (West Wing)',
        table: 'Ambient Holographic Collaboration Node',
        laptop: 'High-Speed Vector Engine Laptop (Milvus / Chroma / LangChain)',
        skills: ['Hybrid Vector Search', 'Dense Embeddings', 'RAG Context Compression', 'Multi-Agent IPC'],
        task: 'Embedding entire Blue Team cybersecurity library into unified high-speed vector index',
        progress: 93,
        status: 'LAPTOP_HANDLING',
        cpuLoad: 78,
        memoryLoad: '9.2 GB',
        logs: ['[AGENT-13] Indexed 1,420 security runbook sections.', '[AGENT-13] Cosine similarity retrieval latency: 1.2ms.'],
        human: { state: 'LAPTOP_HANDLING', walkProgress: 0, collabPartnerId: 'agent-10', typingSpeed: 14, laptopTilt: 0.32, bobPhase: 1.0 }
      },

      // DEPARTMENT 4: SYSTEMS & AUTONOMOUS OPERATIONS (AGENTS 14 - 18)
      {
        id: 'agent-14',
        number: 14,
        code: 'AGENT-14',
        name: 'AGENT-14',
        title: 'Linux Kernel & Low-Level Systems Hacker',
        department: 'systems',
        deptLabel: 'Systems & Ops',
        deptColor: '#00ff9d',
        avatar: '14',
        cabin: 'Cabin 14 (South Wing)',
        table: 'Vintage-Modern Hacker Desk with Amber Tube Light',
        laptop: 'ThinkPad Classic with Custom Gentoo Real-Time Kernel',
        skills: ['eBPF', 'C', 'x86/ARM64 Assembly', 'PREEMPT_RT', 'Device Drivers'],
        task: 'Compiling real-time PREEMPT_RT kernel patch for Gojo OS microsecond responsiveness',
        progress: 68,
        status: 'WORKING',
        cpuLoad: 96,
        memoryLoad: '8.8 GB',
        logs: ['[AGENT-14] make -j8 vmlinux modules...', '[AGENT-14] Compiled arch/arm64/kernel/time.o.'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: null, typingSpeed: 19, laptopTilt: 0, bobPhase: 1.6 }
      },
      {
        id: 'agent-15',
        number: 15,
        code: 'AGENT-15',
        name: 'AGENT-15',
        title: 'Distributed Database Administrator',
        department: 'systems',
        deptLabel: 'Systems & Ops',
        deptColor: '#00ff9d',
        avatar: '15',
        cabin: 'Cabin 15 (South Wing)',
        table: 'Heavy-Duty Server Rack Console Desk',
        laptop: 'Multi-Tenant Database Terminal Laptop (PostgreSQL / ScyllaDB)',
        skills: ['ScyllaDB', 'Distributed SQL', 'WAL Replication', 'High-Availability Sharding'],
        task: 'Rebalancing 16TB distributed database partition shards across multi-region nodes',
        progress: 82,
        status: 'WORKING',
        cpuLoad: 71,
        memoryLoad: '11.0 GB',
        logs: ['[AGENT-15] Shard #42 migrated to node-south-02.', '[AGENT-15] Zero query stalls observed.'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: 'agent-17', typingSpeed: 13, laptopTilt: 0, bobPhase: 2.2 }
      },
      {
        id: 'agent-16',
        number: 16,
        code: 'AGENT-16',
        name: 'AGENT-16',
        title: 'Autonomous Recon & Deep Web Scraper',
        department: 'systems',
        deptLabel: 'Systems & Ops',
        deptColor: '#00ff9d',
        avatar: '16',
        cabin: 'Cabin 16 (South Wing)',
        table: 'Recessed Shadow Pod with Privacy Shielding',
        laptop: 'Headless Stealth Scraping Array (Playwright / Tor / Proxies)',
        skills: ['Headless Scraping', 'Tor Circuit Routing', 'OSINT Harvesting', 'Anti-Fingerprint'],
        task: 'Scraping public CVE feeds and underground breach pastes for Gojo Enterprise threat alerts',
        progress: 89,
        status: 'WALKING',
        cpuLoad: 58,
        memoryLoad: '4.5 GB',
        logs: ['[AGENT-16] Polled 40 CVE data sources.', '[AGENT-16] Zero exposed corporate keys detected.'],
        human: { state: 'WALKING', walkProgress: 0.45, collabPartnerId: 'agent-14', typingSpeed: 10, laptopTilt: 0.15, bobPhase: 2.8 }
      },
      {
        id: 'agent-17',
        number: 17,
        code: 'AGENT-17',
        name: 'AGENT-17',
        title: 'Site Reliability Engineer (SRE) & Chaos Master',
        department: 'systems',
        deptLabel: 'Systems & Ops',
        deptColor: '#00ff9d',
        avatar: '17',
        cabin: 'Cabin 17 (South Wing)',
        table: 'Dual-Tier Telemetry Desk with Live Prometheus Graphs',
        laptop: 'Monitoring Hub Laptop (Prometheus / OpenTelemetry / Grafana)',
        skills: ['Chaos Engineering', 'P99 Latency Optimization', 'Circuit Breakers', 'Prometheus'],
        task: 'Injecting synthetic packet loss to verify automated failover across redundant satellite relays',
        progress: 96,
        status: 'COLLABORATING',
        cpuLoad: 52,
        memoryLoad: '3.7 GB',
        logs: ['[AGENT-17] Injected 15% packet loss on Link-B.', '[AGENT-17] Link-A assumed full traffic in 48ms.'],
        human: { state: 'COLLABORATING', walkProgress: 0, collabPartnerId: 'agent-15', typingSpeed: 16, laptopTilt: 0.2, bobPhase: 3.4 }
      },
      {
        id: 'agent-18',
        number: 18,
        code: 'AGENT-18',
        name: 'AGENT-18',
        title: 'Automated QA & Unit Test Synthesizer',
        department: 'systems',
        deptLabel: 'Systems & Ops',
        deptColor: '#00ff9d',
        avatar: '18',
        cabin: 'Cabin 18 (South Wing)',
        table: 'Clean Geometric Modular Bench',
        laptop: 'Automated Test Matrix Laptop (Jest / Playwright / Mocha)',
        skills: ['Automated Testing', 'Fuzz Testing', 'Mutation Testing', 'Regression Suites'],
        task: 'Running full automated 182-point regression suite across all FRIDEY subsystems',
        progress: 100,
        status: 'WORKING',
        cpuLoad: 41,
        memoryLoad: '2.6 GB',
        logs: ['[AGENT-18] Ran 182 unit tests in test_terminal_unit.js.', '[AGENT-18] 182 PASSED, 0 FAILED (100% Success).'],
        human: { state: 'WORKING', walkProgress: 0, collabPartnerId: null, typingSpeed: 20, laptopTilt: 0, bobPhase: 4.0 }
      }
    ];

    this.activeDepartmentFilter = 'all'; // 'all', 'coding', 'security', 'analytics', 'systems'
    this.activeInfraFilter = 'all'; // 'all', 'core_it', 'workstations', 'zones', 'acoustic_hvac', 'pantry_safety'
    this.selectedAgentId = null;
    this.activeViewMode = '3d'; // '3d' or 'grid'
    this.canvas = null;
    this.ctx = null;
    this.animationFrameId = null;
    this.orbitAngle = -0.16; // Balanced cinematic isometric angle (centered, no rightward skew)
    this.targetOrbitAngle = -0.16;
    this.tiltAngle = 0.50; // Camera tilt angle
    this.targetTiltAngle = 0.50;
    this.zoomLevel = 1.0;
    this.targetZoomLevel = 1.0;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.dataPackets = []; // Animated data packets flowing from FRIDAY to agent laptops
    this.hoveredCabinId = null;
    this.hoveredInfraId = null;
    this.infraBounds = {};

    // Dynamic 3D Office Fleet Animation Engine State
    this.mousePos = { x: 290, y: 210 };
    this.lastUserInteraction = Date.now();
    this.serverFanAngle = 0;
    this.cameraTransition = {
      active: false,
      startTime: 0,
      duration: 1.2,
      startOrbit: -0.16,
      targetOrbit: -0.16,
      startTilt: 0.50,
      targetTilt: 0.50,
      startZoom: 1.0,
      targetZoom: 1.0
    };

    // Real-world Environmental Motion: Drifting HVAC Dust Motes
    this.dustMotes = [];
    for (let i = 0; i < 36; i++) {
      this.dustMotes.push({
        x: Math.random() * 580,
        y: 40 + Math.random() * 340,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.12 - Math.random() * 0.22,
        size: 0.9 + Math.random() * 1.6,
        alpha: 0.25 + Math.random() * 0.55,
        phase: Math.random() * 6.28
      });
    }

    // De-synchronize typing speed, phase shifts, and chair dynamics across fleet
    this.agents.forEach(agent => {
      agent.human = agent.human || {};
      agent.human.speedVariance = 0.85 + Math.random() * 0.30; // 0.85x to 1.15x
      agent.human.phaseShift = Math.random() * 6.28;
      agent.human.chairAngle = 0;
      agent.human.chairVel = 0;
      agent.human.headYaw = 0;
      agent.human.headPitch = 0;
    });
    this.masterBrain.human = this.masterBrain.human || {};
    this.masterBrain.human.speedVariance = 1.0;
    this.masterBrain.human.phaseShift = 0;
    this.masterBrain.human.chairAngle = 0;
    this.masterBrain.human.chairVel = 0;
    this.masterBrain.human.headYaw = 0;
    this.masterBrain.human.headPitch = 0;

    // Enterprise IT & Network Infrastructure Specifications (5 Pillars)
    this.infraZones = {
      mdf: {
        id: 'mdf',
        category: 'core_it',
        title: 'MDF / IDF SERVER CLOSET & DATA CENTER',
        status: 'OPERATIONAL • 100% HEALTH',
        specs: [
          { k: 'Redundant Internet', v: 'Dual-ISP Enterprise Fiber (CenturyLink 10G Primary + AT&T 5G/Fiber Failover with zero-downtime BGP automated routing)' },
          { k: 'Network Hardware', v: 'Cisco Catalyst 10GbE Core Aggregation Switches, Fortinet NGFW Cluster, UniFi Enterprise Wi-Fi 7 APs' },
          { k: 'Structured Cabling', v: 'Cat6a / Cat7 Shielded Twisted Pair (S/FTP) to every desk workstation patch panel (10 Gbps certified)' },
          { k: 'Climate Control', v: 'Dedicated redundant mini-split HVAC maintaining 19.4°C / 45% RH with continuous CO₂ and thermal monitoring' },
          { k: 'Fire Suppression', v: 'FM-200 / NOVEC 1230 Clean Agent fire suppression system with early aspirating smoke detection (VESDA)' },
          { k: 'Power Redundancy', v: 'Centralized 20kVA Eaton Rackmount Double-Conversion Online UPS with dual battery banks + Cummins rooftop backup diesel generator' },
          { k: 'Access Control', v: 'Biometric fingerprint scanner + HID Signo RFID / NFC smart keycard locks with 24/7 audit logging' },
          { k: 'VLAN Architecture', v: 'Strictly segmented Corporate, Management, Voice, IoT, and Isolated Guest VLANs' }
        ],
        description: 'Dedicated climate-controlled server closet housing primary routers, edge firewalls, 10GbE aggregation switches, and fiber patch panels. Dual-ISP fiber conduits ensure 99.999% uptime with automated sub-second failover.'
      },
      cyber_soc: {
        id: 'cyber_soc',
        category: 'core_it',
        title: 'CYBER DEFENSE SOC & NETWORK TAP (LEFT WING)',
        status: '24/7 SIEM TRIAGE • 0 ANOMALIES',
        specs: [
          { k: 'Threat Hunting', v: 'Dedicated Security Operations Center (SOC) multi-display matrix monitoring live perimeter logs' },
          { k: 'Network Tap', v: 'Hardware gigabit network TAP feeding mirrored traffic directly to SIEM and Snort/Zeek IDS engines' },
          { k: 'Zero-Trust Gate', v: 'Hardware security enclave enforcement and continuous mutual TLS (mTLS) session attestation' },
          { k: 'Biophilic Lounge', v: 'Living green moss wall and air-purifying indoor vegetation to regulate ambient microclimate' }
        ],
        description: 'Dedicated Cyber Defense Operations Center in the left perimeter wing, providing real-time threat intelligence and continuous packet analysis.'
      },
      conference: {
        id: 'conference',
        category: 'zones',
        title: 'BOARDROOM ALPHA • SOUNDPROOFED CONFERENCE ROOM',
        status: 'RESERVED: SPRINT SYNC • STC 50',
        specs: [
          { k: 'Acoustic Enclosure', v: 'Double-glazed soundproof acoustic glass walls and acoustic ceiling tiles rated STC 50' },
          { k: 'Video Conferencing', v: 'Dedicated 4K PTZ Camera Bar with auto-framing and 15x HD optical zoom' },
          { k: 'Audio Array', v: 'Beamforming microphone ceiling tile array with AI noise cancellation and acoustic echo cancellation (AEC)' },
          { k: 'Interactive Display', v: '85" 4K QLED Interactive Touch Display with wireless screen sharing (AirPlay, Miracast, USB-C)' },
          { k: 'Digital Booking', v: '10.1" Wall-mounted digital room-booking tablet panel outside door showing real-time calendar availability and scheduling' },
          { k: 'Seating Capacity', v: '8-Person solid oak boat-shaped boardroom table with executive ergonomic leather swivel chairs' }
        ],
        description: 'Soundproofed conference room designed for client presentations and high-stakes strategy sessions. Equipped with dedicated PTZ conferencing bars and external digital booking tablets.'
      },
      phone_booths: {
        id: 'phone_booths',
        category: 'zones',
        title: 'MICRO-PODS • ACOUSTIC PHONE BOOTHS',
        status: 'POD 1: IN USE • POD 2: AVAILABLE',
        specs: [
          { k: 'Occupancy', v: 'Single-occupancy soundproof acoustic privacy micro-pods for confidential calls and 1-on-1s' },
          { k: 'Acoustic Rating', v: 'Sound reduction of 32 dB (Class A acoustic felt interior lining prevents speech leakage)' },
          { k: 'Ventilation', v: 'Motion-activated ultra-quiet airflow ventilation fan (45 m³/h circulation rate)' },
          { k: 'Power & Tech', v: 'Integrated power outlet, dual USB-C PD 65W charging ports, and magnetic laptop shelf' },
          { k: 'Occupancy Beacon', v: 'Overhead LED indicator light automatically turns RED when occupied, GREEN when vacant' }
        ],
        description: 'Compact acoustic privacy booths designed for remote client video calls, recruitment interviews, and confidential voice communications without disturbing open-plan teams.'
      },
      workstation_setup: {
        id: 'workstation_setup',
        category: 'workstations',
        title: 'ENGINEERING WORKSTATIONS • ERGONOMIC BENCHING',
        status: '18 ACTIVE DESKS • MOTORIZED SIT-STAND',
        specs: [
          { k: 'Ergonomics', v: 'Dual-motor motorized height-adjustable sit-stand desks (65cm – 125cm) with 4 programmable memory presets' },
          { k: 'Task Chairs', v: 'Herman Miller / Steelcase ergonomic task chairs with adjustable lumbar support, 4D armrests, and breathable mesh back' },
          { k: 'Displays', v: 'Dual 27-inch 4K UHD IPS bezelless monitors mounted on heavy-duty articulated gas-spring monitor arms' },
          { k: 'Docks & Connectivity', v: 'Thunderbolt 4 / USB-C single-cable dock delivering 100W power delivery, dual 4K video, and 10GbE network' },
          { k: 'Cable Management', v: 'Under-desk steel wire mesh trays, desktop grommets, surge-protected PDU strips, and magnetic vertical cable snakes' },
          { k: 'Pedestal Storage', v: 'Lockable steel under-desk mobile pedestals on casters with key tumblers for personal items and hardware kits' },
          { k: 'Acoustic Dividers', v: 'Dense felt acoustic tackable privacy divider panels mounted between desk banks to absorb typing and chatter' }
        ],
        description: 'Enterprise sit-stand benching desks tailored for long engineering shifts. High-density wire trays and single-cable Thunderbolt 4 docks maintain clean surfaces.'
      },
      environmental_hvac: {
        id: 'environmental_hvac',
        category: 'acoustic_hvac',
        title: 'ENVIRONMENTAL & CLIMATE CONTROL (HVAC + HEPA)',
        status: '21.4°C • 428 PPM CO₂ • HEPA 99.97%',
        specs: [
          { k: 'Climate Control', v: 'Multi-zone VRF smart HVAC system with modulating variable-speed compressors and independent zone dampers' },
          { k: 'Air Quality & Filtration', v: 'Commercial HEPA H13 filtration (99.97% particulate capture) + activated carbon odor and VOC scrubbers' },
          { k: 'CO₂ Monitoring', v: 'NDIR infrared CO₂ sensors maintaining levels strictly below 600 PPM to prevent fatigue in focus zones' },
          { k: 'Acoustic Baffles', v: 'Suspended sound-absorbing polyester felt ceiling baffles and wall panels (NRC 0.85 rating)' },
          { k: 'Lighting', v: 'Indirect dimmable LED troffers providing flicker-free 3500K neutral light with motorized glare-reducing window blinds' },
          { k: 'Biophilia', v: 'Preserved reindeer moss feature walls and lush indoor Ficus and Monstera planters to soften technical hardware' }
        ],
        description: 'Comprehensive climate and acoustic architecture designed to maximize employee focus, clean indoor air, and minimize acoustic reverberation.'
      },
      pantry_amenities: {
        id: 'pantry_amenities',
        category: 'pantry_safety',
        title: 'PANTRY, WELLNESS & SAFETY AMENITIES',
        status: 'BEVERAGE BAR READY • SAFETY COMPLIANT',
        specs: [
          { k: 'Beverage Station', v: 'Commercial bean-to-cup dual-boiler espresso machine, nitro cold brew kegerator dispenser, and instant boiling/chilled filtered water tap' },
          { k: 'Refrigeration & Appliances', v: 'Full-size commercial double-door glass front refrigerators, microwave cluster, and high-temp commercial dishwasher' },
          { k: 'Wellness & Lounge', v: 'Casual lounge seating, communal solid wood dining tables, and convertible ping-pong / gaming recharge zone' },
          { k: 'First Aid & AED', v: 'OSHA-compliant industrial first aid kit and wall-mounted Automated External Defibrillator (AED) with audible voice coaching' },
          { k: 'Fire Safety', v: 'Class ABC dry chemical and clean CO₂ fire extinguishers with illuminated emergency exit signs and floor-recessed green LED egress pathway lighting' }
        ],
        description: 'Fully stocked culinary pantry, casual breakout lounge, and certified safety infrastructure including emergency defibrillators and continuous egress illumination.'
      }
    };

    this.init();

  }

  init() {
    this.setupDataPacketNetwork();
    this.initAutonomousWorkflowLoop();
    // Bind after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bindUI());
    } else {
      this.bindUI();
    }
  }

  setupDataPacketNetwork() {
    // Generate streaming neural packets moving along virtual circuit tracks
    this.dataPackets = [];
    for (let i = 0; i < 28; i++) {
      this.dataPackets.push({
        targetIndex: Math.floor(Math.random() * this.agents.length),
        t: Math.random(), // 0.0 (FRIDAY Master Suite) to 1.0 (Agent Laptop)
        speed: 0.004 + Math.random() * 0.006,
        size: 2 + Math.random() * 2.5,
        color: ['#00f0ff', '#ff9900', '#bc13fe', '#00ff9d'][Math.floor(Math.random() * 4)]
      });
    }
  }

  bindUI() {
    this.canvas = document.getElementById('office3DCanvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      
      // Auto-assign responsive window sizing across Android, iOS, iPadOS, macOS, Linux, Windows
      window.addEventListener('resize', () => this.resizeCanvas());
      window.addEventListener('orientationchange', () => {
        setTimeout(() => this.resizeCanvas(), 80);
        setTimeout(() => this.resizeCanvas(), 250);
      });
      if (typeof ResizeObserver !== 'undefined' && this.canvas.parentElement) {
        this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
        this.resizeObserver.observe(this.canvas.parentElement);
      }

      this.bindCanvasInteractivity();
      this.startRenderLoop();
    }

    this.renderCabinGridList();
    this.updateFleetStats();
    this.bindFilterButtons();
    this.bindInfraTabs();
    this.bindInfraModal();
    this.bindActionButtons();
    this.initReferencesStudio();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    const rect = (parent && typeof parent.getBoundingClientRect === 'function')
      ? parent.getBoundingClientRect()
      : (typeof this.canvas.getBoundingClientRect === 'function' ? this.canvas.getBoundingClientRect() : { width: 580, height: 420 });
    
    // Auto-adapt canvas dimensions to real device viewport
    const availableWidth = Math.floor(rect.width || (typeof window !== 'undefined' ? window.innerWidth : 580));
    const availableHeight = Math.floor(rect.height || 420);
    const dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2.5); // Cap DPR at 2.5 for mobile GPU optimization
    
    this.canvas.width = Math.max(260, availableWidth) * dpr;
    this.canvas.height = Math.max(220, availableHeight) * dpr;
    if (this.ctx) {
      this.ctx.resetTransform?.();
      this.ctx.scale(dpr, dpr);
    }
  }

  glideCamera(targetOrbit, targetTilt, targetZoom, duration = 1.2) {
    this.cameraTransition.active = true;
    this.cameraTransition.startTime = performance.now() / 1000;
    this.cameraTransition.duration = duration;
    this.cameraTransition.startOrbit = this.orbitAngle;
    this.cameraTransition.targetOrbit = targetOrbit;
    this.cameraTransition.startTilt = this.tiltAngle;
    this.cameraTransition.targetTilt = targetTilt;
    this.cameraTransition.startZoom = this.zoomLevel;
    this.cameraTransition.targetZoom = targetZoom;
    this.targetOrbitAngle = targetOrbit;
    this.targetTiltAngle = targetTilt;
    this.targetZoomLevel = targetZoom;
    this.lastUserInteraction = Date.now();
  }

  bindCanvasInteractivity() {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.dragDistance = 0;
      this.lastUserInteraction = Date.now();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      this.mousePos = { x: mouseX, y: mouseY };
      this.lastUserInteraction = Date.now();
      if (!this.isDragging) {
        this.checkHover(mouseX, mouseY);
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        this.dragDistance = (this.dragDistance || 0) + Math.hypot(dx, dy);
        this.targetOrbitAngle += dx * 0.008;
        this.targetTiltAngle = Math.max(0.2, Math.min(1.1, this.targetTiltAngle + dy * 0.005));
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.lastUserInteraction = Date.now();
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.lastUserInteraction = Date.now();
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0015;
      this.targetZoomLevel = Math.max(0.65, Math.min(1.6, this.targetZoomLevel + zoomDelta));
      this.lastUserInteraction = Date.now();
    }, { passive: false });

    // Multi-touch gestures for Android, iOS, iPad & Touchscreen Laptops
    let touchStartX = 0;
    let touchStartY = 0;
    let initialPinchDistance = 0;
    let initialZoom = 1.0;

    this.canvas.addEventListener('touchstart', (e) => {
      this.lastUserInteraction = Date.now();
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragDistance = 0;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        this.lastMouseX = touchStartX;
        this.lastMouseY = touchStartY;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        initialPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialZoom = this.targetZoomLevel;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      this.lastUserInteraction = Date.now();
      if (e.touches.length === 1 && this.isDragging) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const dx = touchX - this.lastMouseX;
        const dy = touchY - this.lastMouseY;
        this.dragDistance = (this.dragDistance || 0) + Math.hypot(dx, dy);
        this.targetOrbitAngle += dx * 0.009;
        this.targetTiltAngle = Math.max(0.2, Math.min(1.1, this.targetTiltAngle + dy * 0.006));
        this.lastMouseX = touchX;
        this.lastMouseY = touchY;

        const rect = this.canvas.getBoundingClientRect();
        this.mousePos = { x: touchX - rect.left, y: touchY - rect.top };
        if (e.cancelable) e.preventDefault();
      } else if (e.touches.length === 2 && initialPinchDistance > 0) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDistance / initialPinchDistance;
        this.targetZoomLevel = Math.max(0.65, Math.min(1.7, initialZoom * factor));
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      this.isDragging = false;
      this.lastUserInteraction = Date.now();
      if (this.dragDistance < 10 && e.changedTouches && e.changedTouches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        const tapX = e.changedTouches[0].clientX - rect.left;
        const tapY = e.changedTouches[0].clientY - rect.top;
        this.checkHover(tapX, tapY);
        if (this.hoveredCabinId) {
          this.glideCamera(-0.16, 0.72, 1.35, 1.2);
          this.openAssignModal(this.hoveredCabinId);
          if (window.FridayAudio) window.FridayAudio.playClick();
        } else if (this.hoveredInfraId) {
          this.glideCamera(-0.16, 0.65, 1.25, 1.2);
          this.openInfraModal(this.hoveredInfraId);
          if (window.FridayAudio) window.FridayAudio.playClick();
        }
      }
      initialPinchDistance = 0;
    }, { passive: true });

    // Click to select cabin or infrastructure zone, trigger smooth cubic-bezier camera glide, and open details modal
    this.canvas.addEventListener('click', (e) => {
      if (this.dragDistance > 6) return; // Prevent triggering on drag
      if (this.hoveredCabinId) {
        // Smooth cinematic camera transition gliding down to over-the-shoulder perspective
        this.glideCamera(-0.24, 0.76, 1.35, 1.25);
        this.openAssignModal(this.hoveredCabinId);
        if (window.FridayAudio) window.FridayAudio.playClick();
      } else if (this.hoveredInfraId) {
        this.glideCamera(-0.52, 0.68, 1.25, 1.25);
        this.openInfraModal(this.hoveredInfraId);
        if (window.FridayAudio) window.FridayAudio.playClick();
      }
    });
  }

  // Hover detection across agent cabins and enterprise infrastructure zones
  checkHover(mouseX, mouseY) {
    if (!this.canvas) return;
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    // 1. Check Cabins
    const cabins = this.getCabin3DPositions(w, h);
    let foundCabin = null;
    for (let i = cabins.length - 1; i >= 0; i--) {
      const c = cabins[i];
      const hw = (c.screenW || 40) / 2;
      const hh = (c.screenH || 30) / 2;
      if (mouseX >= c.screenX - hw && mouseX <= c.screenX + hw &&
          mouseY >= c.screenY - hh && mouseY <= c.screenY + hh) {
        foundCabin = c.agent.id;
        break;
      }
    }

    if (foundCabin) {
      this.hoveredCabinId = foundCabin;
      this.hoveredInfraId = null;
      this.canvas.style.cursor = 'pointer';
      return;
    }
    this.hoveredCabinId = null;

    // 2. Check Infrastructure Zones
    let foundInfra = null;
    if (this.infraBounds) {
      for (const [key, b] of Object.entries(this.infraBounds)) {
        if (b && mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
          foundInfra = key;
          break;
        }
      }
    }

    if (foundInfra) {
      this.hoveredInfraId = foundInfra;
      this.canvas.style.cursor = 'pointer';
    } else {
      this.hoveredInfraId = null;
      this.canvas.style.cursor = this.isDragging ? 'grabbing' : 'grab';
    }
  }


  bindFilterButtons() {
    const filterTabs = document.querySelectorAll('.dept-chip, .agent-dept-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeDepartmentFilter = tab.getAttribute('data-dept') || 'all';
        this.renderCabinGridList();
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    });

    // View Mode Toggle (3D View vs Cabin Grid View vs Character References Studio)
    const btnToggle3D = document.getElementById('btnOfficeMode3D') || document.getElementById('btnOfficeView3D');
    const btnToggleGrid = document.getElementById('btnOfficeModeGrid') || document.getElementById('btnOfficeViewGrid');
    const btnToggleRef = document.getElementById('btnOfficeModeRef');
    const view3DWrap = document.getElementById('office3DViewport') || document.getElementById('office3DWrapper');
    const viewGridWrap = document.getElementById('officeGridWrapper');
    const viewRefWrap = document.getElementById('officeReferencesWrapper');

    this.setOfficeView = (mode) => {
      this.activeViewMode = mode;
      if (btnToggle3D) btnToggle3D.classList.toggle('active', mode === '3d');
      if (btnToggleGrid) btnToggleGrid.classList.toggle('active', mode === 'grid');
      if (btnToggleRef) btnToggleRef.classList.toggle('active', mode === 'refs');

      if (view3DWrap) view3DWrap.style.display = mode === '3d' ? 'block' : 'none';
      if (viewGridWrap) viewGridWrap.style.display = mode === 'grid' ? 'flex' : 'none';
      if (viewRefWrap) viewRefWrap.style.display = mode === 'refs' ? 'flex' : 'none';

      if (mode === '3d') this.resizeCanvas();
      if (mode === 'grid') this.renderCabinGridList();
      if (mode === 'refs') this.renderReferencesStudio();
      if (window.FridayAudio) window.FridayAudio.playClick();
    };

    if (btnToggle3D) btnToggle3D.addEventListener('click', () => this.setOfficeView('3d'));
    if (btnToggleGrid) btnToggleGrid.addEventListener('click', () => this.setOfficeView('grid'));
    if (btnToggleRef) btnToggleRef.addEventListener('click', () => this.setOfficeView('refs'));

    // Camera reset button
    const btnResetCam = document.getElementById('btnResetOfficeCam');
    if (btnResetCam) {
      btnResetCam.addEventListener('click', () => {
        if (this.activeSubengine === 'workstation' && window.fridayThreeScene) {
          window.fridayThreeScene.resetCamera();
        } else {
          this.glideCamera(-0.16, 0.50, 1.0, 1.25);
        }
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    }

    // Three.js Sub-Engine Mode Toggle (Fleet 3D vs Three.js GLTF Avatar Workstation)
    const btnSubFleet = document.getElementById('btnSubengineFleet');
    const btnSubWorkstation = document.getElementById('btnSubengineWorkstation');
    const canvasFleet = document.getElementById('office3DCanvas');
    const viewportThree = document.getElementById('officeThreeViewport');
    const inputGLB = document.getElementById('inputLoadGLB');
    const camHint = document.getElementById('officeCamHint');

    const switchSubengine = (mode) => {
      this.activeSubengine = mode;
      if (btnSubFleet) btnSubFleet.classList.toggle('active', mode === 'fleet');
      if (btnSubWorkstation) btnSubWorkstation.classList.toggle('active', mode === 'workstation');

      if (mode === 'fleet') {
        if (canvasFleet) canvasFleet.style.display = 'block';
        if (viewportThree) viewportThree.style.display = 'none';
        if (camHint) camHint.textContent = 'Drag to Orbit 3D • Scroll to Zoom • Click Workstation to Inspect';
        this.resizeCanvas();
      } else {
        if (canvasFleet) canvasFleet.style.display = 'none';
        if (viewportThree) viewportThree.style.display = 'block';
        if (camHint) camHint.textContent = 'Orbit 3D Workstation • Drag & Drop .glb model • Live Typing Loop';

        // Lazy initialize Three.js 3D Virtual Office Scene
        if (!window.fridayThreeScene && typeof window.Office3DScene !== 'undefined') {
          window.fridayThreeScene = new window.Office3DScene('officeThreeViewport', {
            modelPath: 'models/office_worker.glb',
            fallbackModelPath: 'public/models/office_worker.glb'
          });
        } else if (window.fridayThreeScene) {
          window.fridayThreeScene.onWindowResize();
        }
      }
      if (window.FridayAudio) window.FridayAudio.playClick();
    };

    if (btnSubFleet) btnSubFleet.addEventListener('click', () => switchSubengine('fleet'));
    if (btnSubWorkstation) btnSubWorkstation.addEventListener('click', () => switchSubengine('workstation'));

    // Local .glb / .gltf file picker
    if (inputGLB) {
      inputGLB.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          switchSubengine('workstation');
          if (window.fridayThreeScene) {
            window.fridayThreeScene.loadFromFile(file);
          }
        }
      });
    }
  }

  bindActionButtons() {
    // Cyber Office is permanently locked open & expanded (fold option removed)
    this.officeOpen = true;
    const colOffice = document.getElementById('colAgentOffice');
    if (colOffice) colOffice.classList.remove('is-folded');


    // Dispatch Fleet Work Button
    const btnDispatchAll = document.getElementById('btnDispatchFleet');
    if (btnDispatchAll) {
      btnDispatchAll.addEventListener('click', () => this.autoAssignFleet());
    }

    // Sync Fleet Button
    const btnSyncFleet = document.getElementById('btnSyncFleet');
    if (btnSyncFleet) {
      btnSyncFleet.addEventListener('click', () => {
        this.updateFleetStats();
        if (window.FridayCore) {
          window.FridayCore.showToast('FRIDEY Master Brain: 18 Agent Cabins Telemetry Synced');
        }
        if (window.FridayAudio) window.FridayAudio.playBootSequence();
      });
    }

    // Close Inspector Modal
    const btnCloseModal = document.getElementById('btnCloseAgentModal');
    const modalBackdrop = document.getElementById('agentDetailModal');
    if (btnCloseModal && modalBackdrop) {
      btnCloseModal.addEventListener('click', () => {
        modalBackdrop.classList.remove('open');
        modalBackdrop.style.display = 'none';
      });
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('open');
          modalBackdrop.style.display = 'none';
        }
      });
    }

    // Assign Task form submit in Modal
    const btnModalAssign = document.getElementById('btnDispatchTask') || document.getElementById('btnModalAssignTask');
    const inputModalTask = document.getElementById('inputAssignTask') || document.getElementById('inputModalTask');
    if (btnModalAssign && inputModalTask) {
      btnModalAssign.addEventListener('click', () => {
        const task = inputModalTask.value.trim();
        if (task && this.selectedAgentId) {
          this.assignTask(this.selectedAgentId, task);
          inputModalTask.value = '';
          if (modalBackdrop) {
            modalBackdrop.classList.remove('open');
            modalBackdrop.style.display = 'none';
          }
        }
      });
      inputModalTask.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          btnModalAssign.click();
        }
      });
    }
  }

  // Cyber Office is permanently open & expanded (folding option removed)
  toggleOffice(forceOpen = true) {
    this.officeOpen = true;
    const colOffice = document.getElementById('colAgentOffice');
    const ribbon = document.getElementById('officeFoldedRibbon');
    const toggleBtn = document.getElementById('btnToggleOffice');

    if (colOffice) {
      colOffice.classList.remove('is-folded');
    }
    if (ribbon) {
      ribbon.classList.remove('visible');
      ribbon.style.display = 'none';
    }
    if (toggleBtn) {
      toggleBtn.classList.add('active');
    }
    setTimeout(() => this.resizeCanvas(), 50);
  }

  // Calculate 3D isometric positions for all cabins adapted to screen profile
  getCabin3DPositions(width, height) {
    const cx = width / 2;
    const cy = height / 2 + 12;

    // Detect screen profile for adaptive responsiveness across Mobile, Tablet, Laptop, Desktop
    const isMobile = width < 560;
    const isTablet = width >= 560 && width < 1000;

    let scale;
    if (isMobile) {
      scale = Math.min(width * 0.22, height * 0.28) * this.zoomLevel;
    } else if (isTablet) {
      scale = Math.min(width * 0.24, height * 0.36) * this.zoomLevel;
    } else {
      scale = Math.max(
        Math.min(width, height) * 0.34,
        Math.min(width * 0.26, height * 0.44)
      ) * this.zoomLevel;
    }

    const positions = [];

    // 1. Apex Executive Suite (FRIDAY)
    positions.push({
      agent: this.masterBrain,
      isMaster: true,
      x3d: 0,
      y3d: -1.8,
      z3d: 0.25,
      w3d: isMobile ? 0.95 : 1.15,
      h3d: isMobile ? 0.68 : 0.78
    });

    // 2. Responsive wing arrangements
    let colSpan1, colSpan2;
    if (isMobile) {
      colSpan1 = [-1.45, -0.72, 0, 0.72, 1.45];
      colSpan2 = [-1.15, -0.38, 0.38, 1.15];
    } else if (isTablet) {
      colSpan1 = [-1.8, -0.9, 0, 0.9, 1.8];
      colSpan2 = [-1.45, -0.48, 0.48, 1.45];
    } else {
      colSpan1 = [-2.15, -1.08, 0, 1.08, 2.15];
      colSpan2 = [-1.8, -0.6, 0.6, 1.8];
    }

    const gridRows = [
      { row: -0.82, cols: colSpan1, indices: [0, 1, 2, 3, 4] },
      { row: 0.12, cols: colSpan2, indices: [5, 6, 7, 8] },
      { row: 1.02, cols: colSpan2, indices: [9, 10, 11, 12] },
      { row: 1.92, cols: colSpan1, indices: [13, 14, 15, 16, 17] }
    ];

    gridRows.forEach(g => {
      g.indices.forEach((agentIdx, colIdx) => {
        if (this.agents[agentIdx]) {
          positions.push({
            agent: this.agents[agentIdx],
            isMaster: false,
            x3d: g.cols[colIdx],
            y3d: g.row,
            z3d: 0,
            w3d: 0.68,
            h3d: 0.54
          });
        }
      });
    });

    // Project 3D -> 2D with isometric rotation & tilt
    const cosO = Math.cos(this.orbitAngle);
    const sinO = Math.sin(this.orbitAngle);
    const cosT = Math.cos(this.tiltAngle);
    const sinT = Math.sin(this.tiltAngle);

    return positions.map(pos => {
      // Rotation around Y
      const rx = pos.x3d * cosO - pos.y3d * sinO;
      const ry = pos.x3d * sinO + pos.y3d * cosO;
      // Tilt around X
      const px = rx * scale + cx;
      const py = (ry * sinT - pos.z3d * cosT) * scale + cy;
      const depth = ry * cosT + pos.z3d * sinT;

      return {
        ...pos,
        screenX: px,
        screenY: py,
        depth: depth,
        screenW: pos.w3d * scale,
        screenH: pos.h3d * scale
      };
    }).sort((a, b) => a.depth - b.depth); // Depth sort
  }

  startRenderLoop() {
    const raf = typeof requestAnimationFrame !== 'undefined'
      ? requestAnimationFrame
      : (typeof window !== 'undefined' && window.requestAnimationFrame ? window.requestAnimationFrame : (cb) => setTimeout(cb, 16));
    const render = () => {
      const tNow = performance.now() / 1000;

      // 1. Cinematic Cubic-Bezier Camera Transition Gliding
      if (this.cameraTransition && this.cameraTransition.active) {
        const elapsed = tNow - this.cameraTransition.startTime;
        const progress = Math.min(elapsed / this.cameraTransition.duration, 1.0);
        // Cubic-bezier easing (P1=0.1, P2=1.0)
        const p1 = 0.1, p2 = 1.0;
        const ease = 3 * (1 - progress) ** 2 * progress * p1 + 3 * (1 - progress) * progress ** 2 * p2 + progress ** 3;

        this.orbitAngle = this.cameraTransition.startOrbit + (this.cameraTransition.targetOrbit - this.cameraTransition.startOrbit) * ease;
        this.tiltAngle = this.cameraTransition.startTilt + (this.cameraTransition.targetTilt - this.cameraTransition.startTilt) * ease;
        this.zoomLevel = this.cameraTransition.startZoom + (this.cameraTransition.targetZoom - this.cameraTransition.startZoom) * ease;

        if (progress >= 1.0) {
          this.cameraTransition.active = false;
        }
      } else {
        // Continuous smooth interpolation
        this.orbitAngle += (this.targetOrbitAngle - this.orbitAngle) * 0.08;
        this.tiltAngle += (this.targetTiltAngle - this.tiltAngle) * 0.08;
        this.zoomLevel += (this.targetZoomLevel - this.zoomLevel) * 0.08;

        // 2. Subtle Idle Harmonic Camera Breathing Float
        if (!this.isDragging && Date.now() - this.lastUserInteraction > 2500) {
          const time = Date.now() / 1000;
          this.orbitAngle += Math.sin(time * 0.45) * 0.00035;
          this.tiltAngle += Math.cos(time * 0.65) * 0.00025;
        }
      }

      this.render3DOffice();
      this.animationFrameId = raf(render);
    };
    render();
  }

  // Real-World Environmental Motion: Drifting HVAC Airflow Dust Motes with Brownian Motion
  updateAndDrawDustMotes(w, h) {
    if (!this.dustMotes || !this.ctx) return;
    const time = Date.now() / 1000;
    this.ctx.save();
    this.dustMotes.forEach(m => {
      // Brownian motion with gentle upward draft
      m.x += m.vx + Math.sin(time * 1.4 + m.phase) * 0.15;
      m.y += m.vy + Math.cos(time * 1.1 + m.phase) * 0.10;

      // Recirculate through office volume
      if (m.y < 30) {
        m.y = h * 0.85;
        m.x = Math.random() * w;
      }
      if (m.x < 0) m.x = w;
      if (m.x > w) m.x = 0;

      // Shimmering alpha
      const currentAlpha = m.alpha * (0.6 + Math.sin(time * 2.5 + m.phase) * 0.4);

      this.ctx.beginPath();
      this.ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 240, 255, ${currentAlpha})`;
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = 4;
      this.ctx.fill();
    });
    this.ctx.restore();
  }

  render3DOffice() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Cybernetic Cyber-Floor Grid
    this.drawOfficeFloor(w, h);

    // 2. Real-World Environmental Motion: Drifting HVAC Airflow Dust Motes
    this.updateAndDrawDustMotes(w, h);

    // 3. Calculate 3D projected cabins
    const cabins = this.getCabin3DPositions(w, h);
    const masterCabin = cabins.find(c => c.isMaster);

    // 3. Draw Data Network Circuit Tracks between FRIDAY and Cabins
    if (masterCabin) {
      cabins.forEach(c => {
        if (!c.isMaster) {
          this.drawCircuitTrack(masterCabin.screenX, masterCabin.screenY, c.screenX, c.screenY, c.agent.deptColor);
        }
      });

      // 4. Draw Animated Data Packets
      this.updateAndDrawDataPackets(masterCabin, cabins);
    }

    // 5. Render Cabins, Tables & Glowing Laptops in depth order
    cabins.forEach(c => {
      if (c.isMaster) {
        this.drawFridayMasterCabin(c);
      } else {
        const matchesFilter = this.activeDepartmentFilter === 'all' || c.agent.department === this.activeDepartmentFilter;
        this.drawAgentCabin(c, matchesFilter, cabins);
      }
    });

    // 6. Render Dynamic Collaboration Laser Links between collaborating agents
    this.drawCollaborationLinks(cabins);
  }

  drawOfficeFloor(w, h) {
    const cx = w / 2;
    const cy = h / 2 + 10;
    const time = Date.now() / 1000;

    this.ctx.save();

    // 1. Panoramic Perimeter Window Wall & Daylight Horizon (Exact match to https://skfb.ly/osDKZ)
    const winTop = 10;
    const winBottom = h * 0.46;
    
    // Sky and horizon daylight gradient
    const skyGrad = this.ctx.createLinearGradient(0, winTop, 0, winBottom);
    skyGrad.addColorStop(0, 'rgba(8, 24, 44, 0.95)');
    skyGrad.addColorStop(0.45, 'rgba(16, 48, 80, 0.75)');
    skyGrad.addColorStop(0.85, 'rgba(0, 180, 240, 0.18)');
    skyGrad.addColorStop(1, 'rgba(0, 240, 255, 0.05)');
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, winTop, w, winBottom - winTop);

    // Distant City Skyline Silhouettes through Window
    this.ctx.fillStyle = 'rgba(6, 16, 28, 0.85)';
    const skylineTowers = [
      { x: w * 0.04, w: 28, h: 42 },
      { x: w * 0.12, w: 38, h: 56 },
      { x: w * 0.22, w: 32, h: 48 },
      { x: w * 0.32, w: 46, h: 62 },
      { x: w * 0.44, w: 54, h: 72 },
      { x: w * 0.58, w: 36, h: 52 },
      { x: w * 0.68, w: 48, h: 68 },
      { x: w * 0.78, w: 30, h: 46 },
      { x: w * 0.86, w: 42, h: 58 }
    ];
    skylineTowers.forEach(t => {
      this.ctx.fillRect(t.x, winBottom - t.h, t.w, t.h);
      // Tower beacon light
      if (Math.sin(time * 2 + t.x) > 0) {
        this.ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
        this.ctx.fillRect(t.x + t.w / 2 - 1, winBottom - t.h - 2, 2, 2);
        this.ctx.fillStyle = 'rgba(6, 16, 28, 0.85)';
      }
    });

    // Floor-to-Ceiling Architectural Glass Mullions (Steel structural window frame)
    this.ctx.strokeStyle = 'rgba(120, 180, 230, 0.22)';
    this.ctx.lineWidth = 1.8;
    const colCount = 10;
    for (let c = 0; c <= colCount; c++) {
      const wx = (w / colCount) * c;
      this.ctx.beginPath();
      this.ctx.moveTo(wx, winTop);
      this.ctx.lineTo(wx, winBottom);
      this.ctx.stroke();

      // Horizontal Transom Bar
      this.ctx.beginPath();
      this.ctx.moveTo(wx - 10, winTop + (winBottom - winTop) * 0.42);
      this.ctx.lineTo(wx + 10, winTop + (winBottom - winTop) * 0.42);
      this.ctx.strokeStyle = 'rgba(100, 160, 210, 0.16)';
      this.ctx.stroke();
    }

    // 2. Suspended Linear LED Ceiling Troffers (From Office 3D structure https://skfb.ly/osDKZ)
    const trofferRows = [
      { y: winTop + 18, w: w * 0.76 },
      { y: winTop + 36, w: w * 0.84 }
    ];
    trofferRows.forEach(tr => {
      const trofferX = cx - tr.w / 2;
      this.ctx.strokeStyle = 'rgba(200, 240, 255, 0.35)';
      this.ctx.lineWidth = 1.6;
      this.ctx.strokeRect(trofferX, tr.y, tr.w, 3);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = 6;
      this.ctx.fillRect(trofferX + 2, tr.y + 1, tr.w - 4, 1.5);
      this.ctx.shadowBlur = 0;

      // Downward soft light cone onto workstations
      const lightGrad = this.ctx.createLinearGradient(0, tr.y, 0, tr.y + 55);
      lightGrad.addColorStop(0, 'rgba(0, 240, 255, 0.05)');
      lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = lightGrad;
      this.ctx.fillRect(trofferX, tr.y + 3, tr.w, 55);
    });

    const isMobile = w < 560;
    const isTablet = w >= 560 && w < 1000;

    // 3. Realistic Slate Carpet Tile Grid Floor (Isometric Corporate Floorplate covering left & right width)
    const floorRadiusX = Math.min(w * 0.485, Math.max(w * 0.44, cx - 12)) * this.zoomLevel;
    const floorRadiusY = Math.min(h * 0.46, isMobile ? 150 : (isTablet ? 210 : 275)) * this.zoomLevel;

    // Floor Base Slab
    this.ctx.beginPath();
    this.drawEllipse(cx, cy, floorRadiusX, floorRadiusY);
    this.ctx.fillStyle = '#0a121e';
    this.ctx.fill();

    // Perspective Carpet Seam Tiles
    this.ctx.save();
    this.ctx.beginPath();
    this.drawEllipse(cx, cy, floorRadiusX, floorRadiusY);
    this.ctx.clip();

    const tileStepX = 32 * this.zoomLevel;
    const tileStepY = 16 * this.zoomLevel;
    const startX = cx - floorRadiusX;
    const endX = cx + floorRadiusX;
    const startY = cy - floorRadiusY;
    const endY = cy + floorRadiusY;

    // Checkerboard subtle carpet tones matching realistic corporate slate carpet
    for (let tx = startX; tx < endX; tx += tileStepX) {
      for (let ty = startY; ty < endY; ty += tileStepY) {
        const isAlt = (Math.floor(tx / tileStepX) + Math.floor(ty / tileStepY)) % 2 === 0;
        this.ctx.fillStyle = isAlt ? 'rgba(14, 24, 38, 0.45)' : 'rgba(10, 18, 28, 0.45)';
        this.ctx.fillRect(tx, ty, tileStepX, tileStepY);

        // Subtle carpet seam lines
        this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeRect(tx, ty, tileStepX, tileStepY);
      }
    }

    // Floor perimeter boundary ring with subtle cyan edge illumination
    this.ctx.restore();
    this.ctx.beginPath();
    this.drawEllipse(cx, cy, floorRadiusX, floorRadiusY);
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.16)';
    this.ctx.lineWidth = 1.4;
    this.ctx.stroke();

    // 4. Executive Suite (Cabin 00) Glass Partition Wall Enclosure
    const suiteW = Math.max(isMobile ? 90 : 140, w * (isMobile ? 0.26 : 0.22)) * this.zoomLevel;
    const suiteH = Math.max(isMobile ? 54 : 76, h * 0.19) * this.zoomLevel;
    const suiteX = cx - suiteW / 2;
    const suiteY = cy - h * (isMobile ? 0.36 : 0.38) * this.zoomLevel;

    this.ctx.beginPath();
    this.drawRoundedRect(suiteX, suiteY, suiteW, suiteH, 6);
    this.ctx.fillStyle = 'rgba(0, 30, 50, 0.25)';
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    this.ctx.lineWidth = 1.2;
    this.ctx.stroke();

    // Frosted privacy banding across Executive Glass Suite
    this.ctx.fillStyle = 'rgba(0, 240, 255, 0.06)';
    this.ctx.fillRect(suiteX, suiteY + suiteH * 0.4, suiteW, suiteH * 0.2);

    // Glass Double Door Marker
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - 10, suiteY + suiteH);
    this.ctx.lineTo(cx + 10, suiteY + suiteH);
    this.ctx.stroke();

    // 5. Potted Tropical Ficus & Monstera Office Plants (from Office Structure https://skfb.ly/osDKZ)
    const plantPositions = [
      { x: cx - w * 0.40, y: cy - h * 0.18, scale: 1.1 },
      { x: cx + w * 0.40, y: cy - h * 0.18, scale: 1.1 },
      { x: cx - w * 0.41, y: cy + h * 0.22, scale: 1.0 },
      { x: cx + w * 0.41, y: cy + h * 0.22, scale: 1.0 },
      { x: suiteX - 12, y: suiteY + suiteH - 4, scale: 0.9 },
      { x: suiteX + suiteW + 12, y: suiteY + suiteH - 4, scale: 0.9 }
    ];

    plantPositions.forEach(p => {
      const s = p.scale;
      // Shadow under pot
      this.ctx.beginPath();
      this.drawEllipse(p.x, p.y + 9 * s, 8 * s, 3 * s);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      this.ctx.fill();

      // Modern Cylindrical Ceramic Planter Pot (Matte slate / dark ceramic)
      this.ctx.fillStyle = '#141e2c';
      this.ctx.beginPath();
      this.drawRoundedRect(p.x - 6 * s, p.y, 12 * s, 10 * s, 2);
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.28)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Pot rim accent line
      this.ctx.fillStyle = '#1e2e42';
      this.ctx.fillRect(p.x - 7 * s, p.y - 1, 14 * s, 2.5 * s);

      // Lush Tropical Ficus & Monstera Leaves (Multi-layered foliage)
      const leafColors = ['#00c853', '#00e676', '#69f0ae', '#00b0ff'];
      // Stem branch lines
      this.ctx.strokeStyle = '#1b5e20';
      this.ctx.lineWidth = 1.2;
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(p.x - 4 * s, p.y - 7 * s);
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(p.x + 4 * s, p.y - 8 * s);
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(p.x, p.y - 10 * s);
      this.ctx.stroke();

      // Tiered leaf lobes
      this.ctx.fillStyle = leafColors[0];
      this.ctx.beginPath();
      this.drawEllipse(p.x - 5 * s, p.y - 7 * s, 4.5 * s, 2.8 * s);
      this.ctx.fill();

      this.ctx.fillStyle = leafColors[1];
      this.ctx.beginPath();
      this.drawEllipse(p.x + 5 * s, p.y - 8 * s, 4.5 * s, 2.8 * s);
      this.ctx.fill();

      this.ctx.fillStyle = leafColors[2];
      this.ctx.beginPath();
      this.drawEllipse(p.x, p.y - 11 * s, 5 * s, 3.2 * s);
      this.ctx.fill();
    });

    // =========================================================================
    // 6. ENTERPRISE IT & NETWORK INFRASTRUCTURE (5 PILLARS ARCHITECTURE)
    // =========================================================================

    // PILLAR 1: Core IT & Network Closet (MDF/IDF) [Top-Left Corner - Spanning to Left Perimeter]
    const mdfX = Math.max(12, cx - floorRadiusX + 8 * this.zoomLevel);
    const mdfW = Math.max(isMobile ? 70 : 140, Math.min(suiteX - mdfX - 10 * this.zoomLevel, w * 0.28 * this.zoomLevel));
    const mdfH = suiteH * 1.05;
    const mdfY = suiteY;
    this.infraBounds.mdf = { x: mdfX, y: mdfY, w: mdfW, h: mdfH };

    const isMdfHovered = this.hoveredInfraId === 'mdf';
    const isMdfActiveLayer = this.activeInfraFilter === 'all' || this.activeInfraFilter === 'core_it';

    this.ctx.save();
    this.ctx.globalAlpha = isMdfActiveLayer ? 1.0 : 0.28;

    // Room Glass Enclosure with steel mullions
    this.ctx.beginPath();
    this.drawRoundedRect(mdfX, mdfY, mdfW, mdfH, 5);
    this.ctx.fillStyle = isMdfHovered ? 'rgba(0, 255, 157, 0.22)' : 'rgba(3, 14, 26, 0.92)';
    this.ctx.fill();
    this.ctx.strokeStyle = isMdfHovered ? '#00ff9d' : 'rgba(0, 255, 157, 0.55)';
    this.ctx.lineWidth = isMdfHovered ? 2 : 1.2;
    if (isMdfHovered) {
      this.ctx.shadowColor = '#00ff9d';
      this.ctx.shadowBlur = 12;
    }
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // Dual-ISP Redundant Fiber Conduits entering from exterior left wall
    const fiberY1 = mdfY + mdfH * 0.35;
    const fiberY2 = mdfY + mdfH * 0.55;
    
    // Primary ISP 10GbE Fiber Line (CenturyLink - Cyan pulse)
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
    this.ctx.lineWidth = 2.0;
    this.ctx.beginPath();
    this.ctx.moveTo(0, fiberY1);
    this.ctx.lineTo(mdfX + 8, fiberY1);
    this.ctx.stroke();
    // Primary Fiber Blinking Pulse
    const fPulse1 = (time * 4) % 1.0;
    this.ctx.beginPath();
    this.ctx.arc(mdfX * fPulse1, fiberY1, 2.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fill();

    // Secondary Failover Fiber Line (AT&T BGP Failover - Amber/Gold pulse)
    this.ctx.strokeStyle = 'rgba(255, 180, 0, 0.85)';
    this.ctx.lineWidth = 2.0;
    this.ctx.beginPath();
    this.ctx.moveTo(0, fiberY2);
    this.ctx.lineTo(mdfX + 8, fiberY2);
    this.ctx.stroke();
    const fPulse2 = (time * 3 + 0.5) % 1.0;
    this.ctx.beginPath();
    this.ctx.arc(mdfX * fPulse2, fiberY2, 2.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffaa00';
    this.ctx.fill();

    // Two 42U Server Racks inside MDF
    const rackW = (mdfW - 20) / 2;
    const rackH = mdfH * 0.68;
    const rackY = mdfY + 12;

    // Rack 1: Core Routers, Firewalls & 10GbE Switches
    const rack1X = mdfX + 7;
    this.ctx.fillStyle = '#08101a';
    this.ctx.fillRect(rack1X, rackY, rackW, rackH);
    this.ctx.strokeStyle = 'rgba(0, 255, 157, 0.6)';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(rack1X, rackY, rackW, rackH);
    // Rack 1 Blinking Multi-Color 10GbE Switch Port LEDs (Random Ping Frequencies)
    for (let u = 0; u < 8; u++) {
      const uY = rackY + 3 + u * 5;
      this.ctx.fillStyle = (Math.sin(time * 7.5 + u * 1.3) > 0) ? '#00ff9d' : '#005533';
      this.ctx.fillRect(rack1X + 2, uY, 2.2, 2);
      this.ctx.fillStyle = (Math.cos(time * 11.2 + u * 1.7) > 0) ? '#00f0ff' : '#003355';
      this.ctx.fillRect(rack1X + 5.5, uY, 2.2, 2);
      this.ctx.fillStyle = (Math.sin(time * 14.0 + u * 2.1) > 0.4) ? '#ffaa00' : '#442200';
      this.ctx.fillRect(rack1X + rackW - 4, uY, 2, 2);
    }

    // High-Speed Rotating Cooling Fan behind Transparent Rack Grill
    const fanCX = rack1X + rackW / 2;
    const fanCY = rackY + rackH - 9;
    this.serverFanAngle = (this.serverFanAngle || 0) + 0.38;
    this.ctx.save();
    this.ctx.translate(fanCX, fanCY);
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    this.ctx.lineWidth = 0.8;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.rotate(this.serverFanAngle);
    this.ctx.fillStyle = '#00f0ff';
    for (let b = 0; b < 4; b++) {
      this.ctx.rotate(Math.PI / 2);
      this.ctx.fillRect(-0.8, -4.5, 1.6, 4.5);
    }
    this.ctx.restore();

    // Rack 2: Patch Panels, Centralized UPS & Fiber Aggregation
    const rack2X = rack1X + rackW + 4;
    this.ctx.fillStyle = '#08101a';
    this.ctx.fillRect(rack2X, rackY, rackW, rackH);
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(rack2X, rackY, rackW, rackH);
    // Centralized UPS Battery Bank Gauges (Bottom 3U of Rack 2)
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.fillRect(rack2X + 2, rackY + rackH - 10, rackW - 4, 3);
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.fillRect(rack2X + 2, rackY + rackH - 6, rackW - 4, 3);

    // FM-200 / NOVEC Fire Suppression Canister
    const canX = mdfX + mdfW - 8;
    const canY = mdfY + mdfH - 16;
    this.ctx.fillStyle = '#ff2a2a';
    this.ctx.fillRect(canX - 2, canY, 5, 12);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(canX - 1, canY - 2, 3, 2); // Valve

    // Wall-mounted Biometric Fingerprint & RFID Card Reader beside MDF door
    const readerX = mdfX + mdfW - 1;
    const readerY = mdfY + mdfH * 0.45;
    this.ctx.fillStyle = '#0a1520';
    this.ctx.fillRect(readerX, readerY, 3, 8);
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.fillRect(readerX + 0.5, readerY + 1.5, 2, 2.5); // Green access LED

    // Climate Control Thermostat Display: 19.4°C • 45% RH
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.font = 'bold 5.5px monospace';
    this.ctx.fillText('19.4°C', mdfX + 4, mdfY + mdfH - 3);

    // Header Label
    this.ctx.font = 'bold 6.5px monospace';
    this.ctx.fillStyle = isMdfHovered ? '#ffffff' : '#00ff9d';
    this.ctx.fillText('MDF/IDF SERVER CLOSET', mdfX + 4, mdfY + 8);
    this.ctx.font = '5px monospace';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.fillText('DUAL-ISP • 10GbE • UPS', mdfX + 4, mdfY + mdfH - 9);

    this.ctx.restore();


    // PILLAR 3: Soundproofed Boardroom / Conference Room [Top-Right Corner]
    const confX = suiteX + suiteW + 10 * this.zoomLevel;
    const confW = Math.max(isMobile ? 70 : 140, Math.min(w - confX - 12, w * 0.26 * this.zoomLevel));
    const confH = suiteH * 1.05;
    const confY = suiteY;
    this.infraBounds.conference = { x: confX, y: confY, w: confW, h: confH };

    const isConfHovered = this.hoveredInfraId === 'conference';
    const isConfActiveLayer = this.activeInfraFilter === 'all' || this.activeInfraFilter === 'zones';

    this.ctx.save();
    this.ctx.globalAlpha = isConfActiveLayer ? 1.0 : 0.28;

    // Double-glazed Soundproof Glass Enclosure (STC 50)
    this.ctx.beginPath();
    this.drawRoundedRect(confX, confY, confW, confH, 5);
    this.ctx.fillStyle = isConfHovered ? 'rgba(0, 180, 255, 0.22)' : 'rgba(2, 16, 32, 0.90)';
    this.ctx.fill();
    this.ctx.strokeStyle = isConfHovered ? '#00f0ff' : 'rgba(0, 180, 255, 0.55)';
    this.ctx.lineWidth = isConfHovered ? 2 : 1.2;
    if (isConfHovered) {
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = 12;
    }
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // 8-Person Boat-Shaped Solid Oak Conference Table
    const tblW = confW * 0.68;
    const tblH = confH * 0.38;
    const tblX = confX + (confW - tblW) / 2;
    const tblY = confY + confH * 0.45;
    this.ctx.fillStyle = '#1e1610'; // Dark walnut / oak
    this.ctx.beginPath();
    this.drawRoundedRect(tblX, tblY, tblW, tblH, 4);
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(200, 150, 100, 0.5)';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Executive Swivel Chairs around Table
    const chairCoords = [
      { cx: tblX + tblW * 0.2, cy: tblY - 3 },
      { cx: tblX + tblW * 0.5, cy: tblY - 3 },
      { cx: tblX + tblW * 0.8, cy: tblY - 3 },
      { cx: tblX + tblW * 0.2, cy: tblY + tblH + 3 },
      { cx: tblX + tblW * 0.5, cy: tblY + tblH + 3 },
      { cx: tblX + tblW * 0.8, cy: tblY + tblH + 3 },
      { cx: tblX - 3, cy: tblY + tblH * 0.5 },
      { cx: tblX + tblW + 3, cy: tblY + tblH * 0.5 }
    ];
    chairCoords.forEach(ch => {
      this.ctx.fillStyle = '#0a1018';
      this.ctx.beginPath();
      this.drawEllipse(ch.cx, ch.cy, 3, 2);
      this.ctx.fill();
    });

    // 85" Interactive Touch Presentation Display Wall
    const dispW = confW * 0.55;
    const dispH = 8;
    const dispX = confX + (confW - dispW) / 2;
    const dispY = confY + 6;
    this.ctx.fillStyle = '#040c16';
    this.ctx.fillRect(dispX, dispY, dispW, dispH);
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 0.8;
    this.ctx.strokeRect(dispX, dispY, dispW, dispH);
    // Real-time video conferencing presentation graph
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.fillRect(dispX + 2, dispY + 2, 10, 4);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fillRect(dispX + 14, dispY + 2, 8, 4);

    // Dedicated PTZ Camera Bar with Beamforming Microphones
    this.ctx.fillStyle = '#1c2430';
    this.ctx.fillRect(dispX + dispW / 2 - 6, dispY + dispH + 1, 12, 2.5);
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.fillRect(dispX + dispW / 2 - 1, dispY + dispH + 1.5, 2, 1.5); // PTZ Lens / Mic LED

    // Outside Digital Room-Booking Panel outside conference door
    const bookPanelX = confX - 2.5;
    const bookPanelY = confY + confH * 0.65;
    this.ctx.fillStyle = '#0a1524';
    this.ctx.fillRect(bookPanelX, bookPanelY, 3, 6);
    this.ctx.fillStyle = '#ff3344'; // Red = Reserved / Busy
    this.ctx.fillRect(bookPanelX + 0.5, bookPanelY + 1, 2, 4);

    // Header Label
    this.ctx.font = 'bold 6.5px monospace';
    this.ctx.fillStyle = isConfHovered ? '#ffffff' : '#00f0ff';
    this.ctx.fillText('BOARDROOM ALPHA', confX + 6, confY + confH - 3);
    this.ctx.font = '5px monospace';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.fillText('SOUNDPROOF • PTZ BAR', confX + 6, confY + confH - 9);

    this.ctx.restore();


    // PILLAR 3: Acoustic Phone Booths / Micro-Pods [Mid-Left Perimeter]
    const pbW = Math.max(isMobile ? 32 : 48, Math.min(w * 0.12, 68)) * this.zoomLevel;
    const pbH = (isMobile ? 48 : 68) * this.zoomLevel;
    const pbX = Math.max(12, cx - floorRadiusX + 8 * this.zoomLevel);
    const pbY = cy - (isMobile ? 20 : 30) * this.zoomLevel;
    this.infraBounds.phone_booths = { x: pbX, y: pbY, w: pbW, h: pbH };

    const isPbHovered = this.hoveredInfraId === 'phone_booths';
    const isPbActiveLayer = this.activeInfraFilter === 'all' || this.activeInfraFilter === 'zones';

    this.ctx.save();
    this.ctx.globalAlpha = isPbActiveLayer ? 1.0 : 0.28;

    // Pods Enclosure
    this.ctx.beginPath();
    this.drawRoundedRect(pbX, pbY, pbW, pbH, 4);
    this.ctx.fillStyle = isPbHovered ? 'rgba(188, 19, 254, 0.22)' : 'rgba(8, 14, 26, 0.92)';
    this.ctx.fill();
    this.ctx.strokeStyle = isPbHovered ? '#bc13fe' : 'rgba(188, 19, 254, 0.55)';
    this.ctx.lineWidth = isPbHovered ? 2 : 1.2;
    if (isPbHovered) {
      this.ctx.shadowColor = '#bc13fe';
      this.ctx.shadowBlur = 10;
    }
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // Pod 1 (Top): IN USE (Red Occupancy Beacon)
    const pod1H = (pbH - 6) / 2;
    this.ctx.fillStyle = '#101c2e';
    this.ctx.fillRect(pbX + 2, pbY + 2, pbW - 4, pod1H - 1);
    this.ctx.fillStyle = '#ff2255'; // RED = In Use
    this.ctx.fillRect(pbX + pbW - 6, pbY + 4, 3, 3);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '5px monospace';
    this.ctx.fillText('POD-1', pbX + 4, pbY + 10);
    this.ctx.fillStyle = '#ff2255';
    this.ctx.fillText('[BUSY]', pbX + 4, pbY + 18);

    // Pod 2 (Bottom): AVAILABLE (Green Occupancy Beacon)
    const pod2Y = pbY + pod1H + 3;
    this.ctx.fillStyle = '#101c2e';
    this.ctx.fillRect(pbX + 2, pod2Y, pbW - 4, pod1H - 1);
    this.ctx.fillStyle = '#00ff9d'; // GREEN = Available
    this.ctx.fillRect(pbX + pbW - 6, pod2Y + 2, 3, 3);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '5px monospace';
    this.ctx.fillText('POD-2', pbX + 4, pod2Y + 8);
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.fillText('[OPEN]', pbX + 4, pod2Y + 16);

    // Label
    this.ctx.font = 'bold 5.5px monospace';
    this.ctx.fillStyle = '#bc13fe';
    this.ctx.fillText('PHONE BOOTHS', pbX + 1, pbY + pbH + 8);

    this.ctx.restore();


    // PILLAR 6: Cyber Defense SOC Operations Center & Biophilic Tap [Bottom-Left Perimeter - Covering Left Space]
    const socW = Math.max(isMobile ? 75 : 150, Math.min(w * 0.28 * this.zoomLevel, 260));
    const socH = (isMobile ? 44 : 64) * this.zoomLevel;
    const socX = Math.max(12, cx - floorRadiusX + 8 * this.zoomLevel);
    const socY = cy + floorRadiusY * (isMobile ? 0.16 : 0.20);
    this.infraBounds.cyber_soc = { x: socX, y: socY, w: socW, h: socH };

    const isSocHovered = this.hoveredInfraId === 'cyber_soc';
    const isSocActiveLayer = this.activeInfraFilter === 'all' || this.activeInfraFilter === 'core_it' || this.activeInfraFilter === 'zones';

    this.ctx.save();
    this.ctx.globalAlpha = isSocActiveLayer ? 1.0 : 0.28;

    // SOC Base Enclosure
    this.ctx.beginPath();
    this.drawRoundedRect(socX, socY, socW, socH, 5);
    this.ctx.fillStyle = isSocHovered ? 'rgba(0, 240, 255, 0.22)' : 'rgba(4, 14, 28, 0.92)';
    this.ctx.fill();
    this.ctx.strokeStyle = isSocHovered ? '#00f0ff' : 'rgba(0, 240, 255, 0.55)';
    this.ctx.lineWidth = isSocHovered ? 2 : 1.2;
    if (isSocHovered) {
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = 12;
    }
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // SOC Curved Multi-Display Curved Video Wall (3-Screen Threat Matrix)
    const socWallX = socX + 8;
    const socWallY = socY + 12;
    const socWallW = socW - 28;
    const socWallH = 14;
    this.ctx.fillStyle = '#061220';
    this.ctx.fillRect(socWallX, socWallY, socWallW, socWallH);
    this.ctx.strokeStyle = '#00ff9d';
    this.ctx.lineWidth = 0.8;
    this.ctx.strokeRect(socWallX, socWallY, socWallW, socWallH);

    // Live SIEM Threat Stream Bars on SOC Wall
    const barCount = Math.floor(socWallW / 8);
    for (let b = 0; b < barCount; b++) {
      const bh = 3 + Math.sin(time * 3 + b * 0.8) * 4;
      this.ctx.fillStyle = (b % 3 === 0) ? '#00f0ff' : '#00ff9d';
      this.ctx.fillRect(socWallX + 3 + b * 7, socWallY + socWallH - bh - 2, 4.5, bh);
    }

    // Biophilic Preserved Moss Wall Feature (Softening hardware edge)
    const mossX = socX + socW - 14;
    const mossY = socY + 8;
    this.ctx.fillStyle = '#1b5e20';
    this.ctx.beginPath();
    this.drawRoundedRect(mossX, mossY, 8, socH - 16, 3);
    this.ctx.fill();
    this.ctx.fillStyle = '#69f0ae';
    for (let m = 0; m < 5; m++) {
      this.ctx.beginPath();
      this.ctx.arc(mossX + 4, mossY + 6 + m * 8, 2.2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Hardware Network TAP Status Indicator
    const tapX = socWallX + 4;
    const tapY = socY + socH - 14;
    this.ctx.fillStyle = '#0e2238';
    this.ctx.fillRect(tapX, tapY, socWallW * 0.65, 8);
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 0.6;
    this.ctx.strokeRect(tapX, tapY, socWallW * 0.65, 8);
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.font = 'bold 5px monospace';
    this.ctx.fillText('NET TAP: 10Gbps ZERO PACKET LOSS', tapX + 3, tapY + 6);

    // Label
    this.ctx.font = 'bold 6.5px monospace';
    this.ctx.fillStyle = isSocHovered ? '#ffffff' : '#00f0ff';
    this.ctx.fillText('CYBER DEFENSE SOC • NETWORK TAP', socX + 6, socY + 8);
    this.ctx.font = '5px monospace';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.fillText('SIEM TRIAGE • ZERO-TRUST ENCLAVE', socX + 6, socY + socH - 3);

    this.ctx.restore();


    // PILLAR 5: Commercial Pantry, Wellness & OSHA Safety [Bottom-Right Perimeter]
    const panW = Math.max(isMobile ? 80 : 160, Math.min(w * 0.28 * this.zoomLevel, 280));
    const panH = (isMobile ? 44 : 58) * this.zoomLevel;
    const panX = cx + floorRadiusX - panW - 6 * this.zoomLevel;
    const panY = cy + floorRadiusY * (isMobile ? 0.16 : 0.24);
    this.infraBounds.pantry_amenities = { x: panX, y: panY, w: panW, h: panH };

    const isPanHovered = this.hoveredInfraId === 'pantry_amenities';
    const isPanActiveLayer = this.activeInfraFilter === 'all' || this.activeInfraFilter === 'pantry_safety';

    this.ctx.save();
    this.ctx.globalAlpha = isPanActiveLayer ? 1.0 : 0.28;

    // Pantry Island Base
    this.ctx.beginPath();
    this.drawRoundedRect(panX, panY, panW, panH, 5);
    this.ctx.fillStyle = isPanHovered ? 'rgba(255, 170, 0, 0.22)' : 'rgba(8, 16, 28, 0.92)';
    this.ctx.fill();
    this.ctx.strokeStyle = isPanHovered ? '#ffaa00' : 'rgba(255, 170, 0, 0.55)';
    this.ctx.lineWidth = isPanHovered ? 2 : 1.2;
    if (isPanHovered) {
      this.ctx.shadowColor = '#ffaa00';
      this.ctx.shadowBlur = 12;
    }
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // Commercial Espresso Machine (Polished stainless steel dual-boiler)
    const espX = panX + 6;
    const espY = panY + 14;
    this.ctx.fillStyle = '#c0d0e0';
    this.ctx.fillRect(espX, espY, 14, 10);
    this.ctx.fillStyle = '#0a1018';
    this.ctx.fillRect(espX + 2, espY - 2, 4, 3); // Bean hopper
    this.ctx.fillRect(espX + 8, espY - 2, 4, 3); // Steam wand
    this.ctx.fillStyle = '#ffaa00';
    this.ctx.fillRect(espX + 4, espY + 5, 6, 4); // Portafilter / Cup

    // Cold Brew Dispenser Tap & Water Tower
    this.ctx.fillStyle = '#223244';
    this.ctx.fillRect(espX + 18, espY + 2, 3, 8);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fillRect(espX + 17, espY, 5, 2.5); // Tap handle

    // Commercial Double-Door Refrigerator
    const fridX = espX + 26;
    this.ctx.fillStyle = '#141e2c';
    this.ctx.fillRect(fridX, espY - 2, 16, 16);
    this.ctx.strokeStyle = '#385070';
    this.ctx.lineWidth = 0.8;
    this.ctx.strokeRect(fridX, espY - 2, 16, 16);
    this.ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
    this.ctx.fillRect(fridX + 1, espY - 1, 6.5, 14); // Left glass door
    this.ctx.fillRect(fridX + 8.5, espY - 1, 6.5, 14); // Right glass door

    // Communal Dining / Recharge Table
    const ctblX = fridX + 20;
    this.ctx.fillStyle = '#2a2016';
    this.ctx.fillRect(ctblX, espY + 2, 22, 10);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fillRect(ctblX + 10, espY + 1, 2, 12); // Ping-pong net

    // OSHA First Aid & Safety Station Corner
    const oshaX = panX + panW - 14;
    const oshaY = panY + 12;
    // First Aid Box with Red Cross
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(oshaX, oshaY, 10, 9);
    this.ctx.fillStyle = '#ff2222';
    this.ctx.fillRect(oshaX + 4, oshaY + 2, 2, 5);
    this.ctx.fillRect(oshaX + 2.5, oshaY + 3.5, 5, 2);

    // Automated External Defibrillator (AED)
    this.ctx.fillStyle = '#00aa44';
    this.ctx.fillRect(oshaX, oshaY + 12, 10, 8);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 5px monospace';
    this.ctx.fillText('AED', oshaX + 1, oshaY + 18);

    // Class ABC Fire Extinguisher (Red cylinder)
    this.ctx.fillStyle = '#ff2222';
    this.ctx.fillRect(oshaX + 11, oshaY + 11, 3, 9);
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(oshaX + 11.5, oshaY + 9, 2, 2);

    // Header Label
    this.ctx.font = 'bold 6.5px monospace';
    this.ctx.fillStyle = isPanHovered ? '#ffffff' : '#ffaa00';
    this.ctx.fillText('PANTRY & OSHA SAFETY', panX + 6, panY + 9);
    this.ctx.font = '5px monospace';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.fillText('ESPRESSO • COLD BREW • AED', panX + 6, panY + panH - 4);

    this.ctx.restore();


    // PILLAR 4: Acoustic, Environmental & Safety Overlays across Floor
    // Commercial Wi-Fi 7 Access Points mounted on ceiling
    const apCoords = [
      { x: cx - w * 0.20, y: cy - h * 0.12 },
      { x: cx + w * 0.20, y: cy - h * 0.12 },
      { x: cx, y: cy + h * 0.16 }
    ];
    apCoords.forEach((ap, idx) => {
      // AP Dome
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(ap.x, ap.y, 3.5, 0, Math.PI * 2);
      this.ctx.fill();
      // Wi-Fi 7 expanding pulsing RF wave ring
      const rfRing = (time * 1.5 + idx * 0.33) % 1.0;
      this.ctx.beginPath();
      this.ctx.arc(ap.x, ap.y, 4 + rfRing * 18, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 255, 157, ${(1 - rfRing) * 0.45})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });

    // Multi-Zone Smart HVAC Thermostat Readouts on Walls
    this.ctx.fillStyle = 'rgba(4, 18, 30, 0.88)';
    this.ctx.strokeStyle = '#00ff9d';
    this.ctx.lineWidth = 0.8;
    this.ctx.strokeRect(cx - 42, cy - h * 0.42, 84, 9);
    this.ctx.fillRect(cx - 42, cy - h * 0.42, 84, 9);
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.font = 'bold 5.5px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('HVAC: 21.4°C • 428 PPM CO₂ • HEPA 99.97%', cx, cy - h * 0.42 + 6.5);
    this.ctx.textAlign = 'left';

    // Emergency Green Exit Sign & Recessed LED Egress Pathway Lighting
    const exitX = cx + floorRadiusX - 16;
    const exitY = winBottom - 8;
    this.ctx.fillStyle = '#00ff44';
    this.ctx.fillRect(exitX, exitY, 20, 7);
    this.ctx.fillStyle = '#041008';
    this.ctx.font = 'bold 5px monospace';
    this.ctx.fillText('[EXIT]', exitX + 2, exitY + 5.5);

    // Floor green egress strip
    this.ctx.strokeStyle = 'rgba(0, 255, 68, 0.35)';
    this.ctx.lineWidth = 1.2;
    this.ctx.setLineDash([6, 8]);
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy + floorRadiusY * 0.5);
    this.ctx.lineTo(exitX, exitY + 8);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.ctx.restore();

  }

  drawCircuitTrack(x1, y1, x2, y2, color) {
    this.ctx.save();
    const time = Date.now() / 1000;
    const midY = (y1 + y2) / 2;

    // 1. Soft glowing outer conduit
    this.ctx.strokeStyle = color ? color + '1a' : 'rgba(0, 240, 255, 0.12)';
    this.ctx.lineWidth = 2.8;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x1, midY);
    this.ctx.lineTo(x2, midY);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    // 2. Animated dash-offset flowing data pulse trail
    this.ctx.strokeStyle = color || '#00f0ff';
    this.ctx.lineWidth = 1.1;
    this.ctx.setLineDash([5, 8]);
    this.ctx.lineDashOffset = -time * 24;

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x1, midY);
    this.ctx.lineTo(x2, midY);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  updateAndDrawDataPackets(masterCabin, cabins) {
    this.ctx.save();
    this.dataPackets.forEach(p => {
      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.targetIndex = Math.floor(Math.random() * this.agents.length);
      }

      const targetCabin = cabins.find(c => !c.isMaster && c.agent.number === (p.targetIndex + 1));
      if (targetCabin) {
        const x1 = masterCabin.screenX;
        const y1 = masterCabin.screenY;
        const x2 = targetCabin.screenX;
        const y2 = targetCabin.screenY;

        // Trace along stepped track
        const midY = (y1 + y2) / 2;
        let px, py;
        if (p.t < 0.33) {
          const ratio = p.t / 0.33;
          px = x1;
          py = y1 + (midY - y1) * ratio;
        } else if (p.t < 0.66) {
          const ratio = (p.t - 0.33) / 0.33;
          px = x1 + (x2 - x1) * ratio;
          py = midY;
        } else {
          const ratio = (p.t - 0.66) / 0.34;
          px = x2;
          py = midY + (y2 - midY) * ratio;
        }

        // Draw glowing particle
        this.ctx.beginPath();
        this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.fill();
      }
    });
    this.ctx.restore();
  }

  // Draw Dynamic Collaboration Laser Links between collaborating agent pairs
  drawCollaborationLinks(cabins) {
    if (!this.ctx) return;
    const time = Date.now() / 1000;
    const drawnPairs = new Set();

    cabins.forEach(c => {
      if (!c.isMaster && c.agent.human && c.agent.human.state === 'COLLABORATING' && c.agent.human.collabPartnerId) {
        const partnerCabin = cabins.find(other => other.agent.id === c.agent.human.collabPartnerId);
        if (partnerCabin) {
          const pairKey = [c.agent.id, partnerCabin.agent.id].sort().join(':');
          if (drawnPairs.has(pairKey)) return;
          drawnPairs.add(pairKey);

          const x1 = c.screenX;
          const y1 = c.screenY;
          const x2 = partnerCabin.screenX;
          const y2 = partnerCabin.screenY;

          this.ctx.save();
          // Multi-layer glowing collaboration neural laser beam
          const grad = this.ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, c.agent.deptColor);
          grad.addColorStop(0.5, '#ffffff');
          grad.addColorStop(1, partnerCabin.agent.deptColor);

          // Outer bloom beam
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1 - 2);
          this.ctx.lineTo(x2, y2 - 2);
          this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.28)';
          this.ctx.lineWidth = 4;
          this.ctx.shadowColor = '#00f0ff';
          this.ctx.shadowBlur = 10;
          this.ctx.stroke();

          // Inner high-intensity laser
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1 - 2);
          this.ctx.lineTo(x2, y2 - 2);
          this.ctx.strokeStyle = grad;
          this.ctx.lineWidth = 1.6;
          this.ctx.stroke();

          // Flowing data packets along the collaboration line
          const pktCount = 3;
          for (let p = 0; p < pktCount; p++) {
            const pt = (time * 1.5 + p / pktCount) % 1.0;
            const px = x1 + (x2 - x1) * pt;
            const py = (y1 - 2) + ((y2 - 2) - (y1 - 2)) * pt;

            this.ctx.beginPath();
            this.ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = '#00ff9d';
            this.ctx.shadowBlur = 8;
            this.ctx.fill();
          }

          // Midpoint Floating Collaboration Status Tag
          const midX = (x1 + x2) / 2;
          const midY = ((y1 + y2) / 2) - 14;
          this.ctx.font = 'bold 6.5px monospace';
          this.ctx.textAlign = 'center';
          this.ctx.fillStyle = '#00ff9d';
          this.ctx.shadowColor = '#00ff9d';
          this.ctx.shadowBlur = 6;
          this.ctx.fillText(`COLLAB: ${c.agent.code} <-> ${partnerCabin.agent.code}`, midX, midY);

          // Floating Illustrated Collaboration Speech Bubbles (from Agents collaboration reference)
          const bubbleY1 = c.screenY - 32 + Math.sin(time * 3) * 2;
          this.ctx.fillStyle = 'rgba(4, 12, 24, 0.92)';
          this.ctx.strokeStyle = c.agent.deptColor;
          this.ctx.lineWidth = 1;
          this.drawRoundedRect(c.screenX - 16, bubbleY1, 32, 11, 4);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.font = 'bold 6px monospace';
          this.ctx.fillStyle = '#ffffff';
          this.ctx.shadowBlur = 0;
          this.ctx.fillText(`⬇️ [TX:SYNC]`, c.screenX, bubbleY1 + 8);

          const bubbleY2 = partnerCabin.screenY - 32 + Math.cos(time * 3) * 2;
          this.ctx.fillStyle = 'rgba(4, 12, 24, 0.92)';
          this.ctx.strokeStyle = partnerCabin.agent.deptColor;
          this.ctx.lineWidth = 1;
          this.drawRoundedRect(partnerCabin.screenX - 16, bubbleY2, 32, 11, 4);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.font = 'bold 6px monospace';
          this.ctx.fillStyle = '#ffffff';
          this.ctx.shadowBlur = 0;
          this.ctx.fillText(`📄 [DOC:DATA]`, partnerCabin.screenX, bubbleY2 + 8);

          this.ctx.restore();
        }
      }
    });
  }

  // Draw rounded rectangle with safe fallback
  drawRoundedRect(x, y, w, h, r = 4) {
    if (this.ctx && typeof this.ctx.roundRect === 'function') {
      this.ctx.roundRect(x, y, w, h, r);
    } else if (this.ctx) {
      this.ctx.rect(x, y, w, h);
    }
  }

  // Draw ellipse with safe fallback for all rendering environments
  drawEllipse(cx, cy, rx, ry) {
    if (this.ctx && typeof this.ctx.ellipse === 'function') {
      this.ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    } else if (this.ctx) {
      this.ctx.arc(cx, cy, Math.max(1, (rx + ry) / 2), 0, Math.PI * 2);
    }
  }

  // Procedural 3D Human Body Model & Kinematic Animations (Exact match to https://skfb.ly/oIzPv)
  drawHumanoidAgent(ctx, x, y, scale, agent, isMaster, isSelected, time, partnerPos) {
    ctx.save();

    const state = agent.human ? agent.human.state : 'WORKING';
    const deptColor = agent.deptColor || '#00f0ff';
    const numStr = agent.number < 10 ? '0' + agent.number : String(agent.number);

    // 1. Kinematics & Posture Calculation
    let renderX = x;
    let renderY = y;
    let bobY = 0;
    let legStride = 0;
    let armSwing = 0;

    if (state === 'WALKING') {
      const walkFreq = 7;
      const walkT = time * walkFreq + (agent.human.bobPhase || 0);
      legStride = Math.sin(walkT) * 0.55; // Leg angle in radians
      armSwing = -legStride; // Counter-phase arm swing
      bobY = -Math.abs(Math.sin(walkT)) * 2.4; // Natural humanoid vertical bob

      // If walking to partner, interpolate position
      if (partnerPos) {
        const walkCycle = (Math.sin(time * 0.6 + (agent.human.bobPhase || 0)) + 1) / 2;
        renderX = x + (partnerPos.x - x) * 0.45 * walkCycle;
        renderY = y + (partnerPos.y - y) * 0.45 * walkCycle;
      } else {
        renderX = x + Math.sin(time * 1.2 + (agent.human.bobPhase || 0)) * 8;
        renderY = y + Math.cos(time * 1.2 + (agent.human.bobPhase || 0)) * 4;
      }

      // Footstep Ripple Waves on Glass/Carpet Floor
      const ripplePhase = (time * 3 + (agent.human.bobPhase || 0)) % 1.0;
      ctx.beginPath();
      this.drawEllipse(renderX, renderY + 14, 3 + ripplePhase * 10, (3 + ripplePhase * 10) * 0.45);
      ctx.strokeStyle = deptColor + Math.floor((1 - ripplePhase) * 140).toString(16).padStart(2, '0');
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (state === 'WORKING') {
      // Natural upper body breathing bobbing while typing
      bobY = Math.sin(time * 2.2 + (agent.human.bobPhase || 0)) * 0.4;
    } else if (state === 'COLLABORATING') {
      bobY = Math.sin(time * 1.8 + (agent.human.bobPhase || 0)) * 0.5;
    } else if (state === 'LAPTOP_HANDLING') {
      bobY = Math.sin(time * 2.0 + (agent.human.bobPhase || 0)) * 0.6;
    }

    // 2. Base Ground / Shadow Ellipse under Feet/Chair
    ctx.beginPath();
    this.drawEllipse(renderX, renderY + 13, 9, 4);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fill();

    // 3. Legs, Slacks & Shoes (from 3D character typing loop https://skfb.ly/oIzPv)
    const hipY = renderY + 4 + bobY;
    const footY = renderY + 13;

    if (state === 'WALKING') {
      // Animated walking stride legs
      const leftFootX = renderX - 3 - Math.sin(legStride) * 6;
      const leftFootY = footY - Math.max(0, Math.cos(legStride)) * 2.5;
      ctx.beginPath();
      ctx.moveTo(renderX - 3, hipY);
      ctx.lineTo(leftFootX, leftFootY);
      ctx.strokeStyle = '#182434';
      ctx.lineWidth = 2.8;
      ctx.stroke();
      // Left Sneaker
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(leftFootX - 2.5, leftFootY - 1, 5, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(leftFootX - 2.5, leftFootY + 1, 5, 1);

      // Right leg
      const rightFootX = renderX + 3 + Math.sin(legStride) * 6;
      const rightFootY = footY - Math.max(0, -Math.cos(legStride)) * 2.5;
      ctx.beginPath();
      ctx.moveTo(renderX + 3, hipY);
      ctx.lineTo(rightFootX, rightFootY);
      ctx.strokeStyle = '#182434';
      ctx.lineWidth = 2.8;
      ctx.stroke();
      // Right Sneaker
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(rightFootX - 2.5, rightFootY - 1, 5, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(rightFootX - 2.5, rightFootY + 1, 5, 1);
    } else {
      // Seated in chair posture: Thighs forward, knees bent, feet on floor
      // Left leg
      ctx.beginPath();
      ctx.moveTo(renderX - 3.5, hipY);
      ctx.lineTo(renderX - 3.5, footY);
      ctx.strokeStyle = '#182434';
      ctx.lineWidth = 2.6;
      ctx.stroke();
      // Shoe
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(renderX - 5.5, footY - 1, 4.5, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(renderX - 5.5, footY + 1, 4.5, 1);

      // Right leg
      ctx.beginPath();
      ctx.moveTo(renderX + 3.5, hipY);
      ctx.lineTo(renderX + 3.5, footY);
      ctx.strokeStyle = '#182434';
      ctx.lineWidth = 2.6;
      ctx.stroke();
      // Shoe
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(renderX + 1, footY - 1, 4.5, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(renderX + 1, footY + 1, 4.5, 1);
    }

    // 4. Torso & Fitted Department Polo/Shirt (Human anatomy from https://skfb.ly/oIzPv)
    const torsoY = renderY - 6 + bobY;
    ctx.beginPath();
    this.drawRoundedRect(renderX - 6.5, torsoY, 13, 10.5, 2.5);
    ctx.fillStyle = isMaster ? 'rgba(0, 42, 75, 0.95)' : 'rgba(16, 28, 44, 0.95)';
    ctx.fill();
    ctx.strokeStyle = deptColor + 'aa';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Shirt Collar & Placket Buttons
    ctx.strokeStyle = '#324a66';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(renderX - 3, torsoY);
    ctx.lineTo(renderX, torsoY + 3);
    ctx.lineTo(renderX + 3, torsoY);
    ctx.stroke();

    // Placket line down chest
    ctx.beginPath();
    ctx.moveTo(renderX, torsoY + 3);
    ctx.lineTo(renderX, torsoY + 9);
    ctx.strokeStyle = deptColor;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Chest Agent Number Badge (#01, #02, etc.)
    ctx.font = 'bold 5.5px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(numStr, renderX, torsoY + 7.5);

    // 5. Dual-Joint Arm Kinematics & Continuous Typing Loop (from https://skfb.ly/oIzPv)
    const shoulderL = { x: renderX - 6.5, y: torsoY + 2 };
    const shoulderR = { x: renderX + 6.5, y: torsoY + 2 };

    const speedMult = (agent.human && agent.human.speedVariance) || 1.0;
    const phase = (agent.human && agent.human.phaseShift) || 0;
    const cadence = (time * speedMult + phase) % 5.2;
    const isTyping = cadence < 3.6;

    if (state === 'WORKING') {
      const speed = (agent.human && agent.human.typingSpeed) || 16;
      const typePhaseL = Math.sin(time * speed * speedMult);
      const typePhaseR = Math.cos(time * speed * speedMult * 1.25);
      const typeJitterL = isTyping ? typePhaseL * 2.0 : 0;
      const typeJitterR = isTyping ? typePhaseR * 2.0 : 0;

      // Left Arm: Upper arm -> Elbow -> Forearm -> Wrist / Hand
      const elbowLX = shoulderL.x - 1.5;
      const elbowLY = shoulderL.y + 4.5;
      const handLX = renderX - 3.2;
      const handLY = renderY - 1 + typeJitterL + bobY;

      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(elbowLX, elbowLY);
      ctx.lineTo(handLX, handLY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      // Left Hand & Fingers
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handLX - 1.2, handLY - 1, 2.4, 2.2);

      // Right Arm: Moves to mouse during inspection pauses
      const elbowRX = shoulderR.x + 1.5;
      const elbowRY = shoulderR.y + 4.5;
      const handRX = isTyping ? (renderX + 3.2) : (renderX + 6.5);
      const handRY = renderY - 1 + (isTyping ? typeJitterR : 0.5) + bobY;

      ctx.beginPath();
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(elbowRX, elbowRY);
      ctx.lineTo(handRX, handRY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      // Right Hand & Fingers
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handRX - 1.2, handRY - 1, 2.4, 2.2);

      // Dynamic Keystroke Typing Micro-Sparks on struck keys
      if (isTyping && typePhaseL > 0.5) {
        ctx.fillStyle = deptColor;
        ctx.fillRect(handLX - 0.5, handLY + 1.2, 1.8, 1.5);
      }
      if (isTyping && typePhaseR > 0.5) {
        ctx.fillStyle = deptColor;
        ctx.fillRect(handRX - 0.5, handRY + 1.2, 1.8, 1.5);
      }

      // Soft Monitor Screen Light Reflection on Face & Upper Chest
      const glowFlicker = 0.16 + Math.sin(time * 9.5 + phase) * 0.05;
      const glowGrad = ctx.createRadialGradient(renderX, renderY - 6 + bobY, 2, renderX, renderY - 6 + bobY, 14);
      glowGrad.addColorStop(0, `rgba(0, 240, 255, ${glowFlicker})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      this.drawEllipse(renderX, renderY - 6 + bobY, 12, 8);
      ctx.fill();

    } else if (state === 'LAPTOP_HANDLING') {
      // Left hand gripping screen bezel, Right hand interacting with 3D diagnostic HUD
      const handLX = renderX - 5.5;
      const handLY = renderY - 8 + Math.sin(time * 2.5) * 1.5 + bobY;

      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(shoulderL.x - 3, shoulderL.y - 3);
      ctx.lineTo(handLX, handLY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handLX - 1.2, handLY - 1.2, 2.6, 2.6);

      const handRX = renderX + 6.5 + Math.sin(time * 3) * 1.5;
      const handRY = renderY - 12 + bobY;
      ctx.beginPath();
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(shoulderR.x + 3, shoulderR.y - 4);
      ctx.lineTo(handRX, handRY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handRX - 1, handRY - 1, 2.2, 2.2);

      // Floating Diagnostic Hologram HUD above Laptop
      ctx.save();
      ctx.fillStyle = 'rgba(0, 240, 255, 0.16)';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 0.8;
      this.drawRoundedRect(renderX - 12, renderY - 26 + bobY, 24, 11, 2);
      ctx.fill();
      ctx.stroke();
      // Waveform graph
      ctx.beginPath();
      for (let wx = 0; wx < 20; wx += 2) {
        const wy = Math.sin(time * 8 + wx * 0.8) * 2.8;
        if (wx === 0) ctx.moveTo(renderX - 10 + wx, renderY - 20 + bobY + wy);
        else ctx.lineTo(renderX - 10 + wx, renderY - 20 + bobY + wy);
      }
      ctx.strokeStyle = deptColor;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

    } else if (state === 'WALKING') {
      // Natural Arm Swing Counter-Phase
      const swingL = -Math.sin(legStride) * 6;
      const swingR = Math.sin(legStride) * 6;

      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(shoulderL.x + swingL * 0.45, shoulderL.y + 6.5);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(shoulderL.x + swingL * 0.45 - 1.2, shoulderL.y + 6.5, 2.4, 2.2);

      ctx.beginPath();
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(shoulderR.x + swingR * 0.45, shoulderR.y + 6.5);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(shoulderR.x + swingR * 0.45 - 1.2, shoulderR.y + 6.5, 2.4, 2.2);

    } else if (state === 'COLLABORATING') {
      const pDir = partnerPos ? Math.sign(partnerPos.x - renderX) : 1;
      const handLX = renderX + pDir * 9;
      const handLY = renderY - 6 + bobY;

      ctx.beginPath();
      ctx.moveTo(pDir > 0 ? shoulderR.x : shoulderL.x, torsoY + 2);
      ctx.lineTo(handLX, handLY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handLX - 1.2, handLY - 1.2, 2.5, 2.5);

      // Holo-Slate tablet held in hand
      ctx.fillStyle = deptColor + 'dd';
      ctx.fillRect(handLX, handLY - 3, 4.5, 6.5);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.6;
      ctx.strokeRect(handLX, handLY - 3, 4.5, 6.5);
    } else {
      // Resting arms
      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(shoulderL.x - 1, shoulderL.y + 6.5);
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(shoulderR.x + 1, shoulderR.y + 6.5);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 2.0;
      ctx.stroke();
    }

    // 6. Anatomical Human Head with Procedural Head Tracking (Smooth Rotation toward Cursor / Screens)
    const headY = renderY - 11.5 + bobY;
    const isHovered = this.hoveredCabinId === agent.id;
    let targetHeadYaw = 0;

    if (isHovered && this.mousePos) {
      const dx = (this.mousePos.x - renderX);
      targetHeadYaw = Math.max(-0.45, Math.min(0.45, dx * 0.03));
    } else if (isTyping) {
      targetHeadYaw = Math.sin(time * 2.0 + phase) * 0.15;
    } else {
      targetHeadYaw = Math.sin(time * 0.9 + phase) * 0.22;
    }

    agent.human.headYaw = (agent.human.headYaw || 0) + (targetHeadYaw - (agent.human.headYaw || 0)) * 0.15;

    ctx.save();
    ctx.translate(renderX, headY);
    ctx.rotate(agent.human.headYaw || 0);

    // Stylized Dark Hair Silhouette
    ctx.beginPath();
    ctx.arc(0, -1, 5.2, Math.PI, 0, false);
    ctx.fillStyle = '#161c26';
    ctx.fill();

    // Face / Head Contour
    ctx.beginPath();
    ctx.arc(0, 0, 4.6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe0bd';
    ctx.fill();
    ctx.strokeStyle = '#283848';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Cyber Visor / Smart Eyewear Band
    const visorY = -0.5;
    ctx.beginPath();
    this.drawRoundedRect(-4.2, visorY, 8.4, 2.8, 1);
    ctx.fillStyle = deptColor;
    ctx.fill();

    // Sweeping Visor Scanning Laser
    const scanOffset = Math.sin(time * 6 + (agent.human.bobPhase || 0)) * 2.8;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(scanOffset - 0.7, visorY, 1.4, 2.8);

    ctx.restore();

    // 7. Overhead Numeric Identification (Strictly Numeric, Zero Emojis)
    ctx.font = 'bold 7px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = deptColor;
    ctx.shadowBlur = 4;
    ctx.fillText(agent.code, renderX, renderY - 21 + bobY);

    // State Pill at top
    ctx.font = '6px monospace';
    ctx.fillStyle = deptColor;
    ctx.shadowBlur = 0;
    ctx.fillText(`[${state}]`, renderX, renderY - 15 + bobY);

    ctx.restore();
  }

  // Draw FRIDAY's Executive Command Suite Cabin (Exact match to https://skfb.ly/osDKZ)
  drawFridayMasterCabin(pos) {
    const { screenX: x, screenY: y, screenW: w, screenH: h } = pos;
    const isSelected = this.selectedAgentId === 'friday-00';
    const time = Date.now() / 1000;

    this.ctx.save();

    // 1. Executive Suite Glass Pod Floor with Polished Chrome Frame
    this.ctx.beginPath();
    this.drawRoundedRect(x - w / 2, y - h / 2, w, h, 8);
    this.ctx.fillStyle = isSelected ? 'rgba(0, 240, 255, 0.24)' : 'rgba(4, 18, 36, 0.88)';
    this.ctx.fill();
    this.ctx.lineWidth = isSelected ? 2 : 1.5;
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = isSelected ? 18 : 10;
    this.ctx.stroke();

    // Polished Chrome Corner Stanchions
    const corners = [
      { cx: x - w / 2 + 3, cy: y - h / 2 + 3 },
      { cx: x + w / 2 - 3, cy: y - h / 2 + 3 },
      { cx: x - w / 2 + 3, cy: y + h / 2 - 3 },
      { cx: x + w / 2 - 3, cy: y + h / 2 - 3 }
    ];
    corners.forEach(cr => {
      this.ctx.fillStyle = '#c0e6ff';
      this.ctx.beginPath();
      this.ctx.arc(cr.cx, cr.cy, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 2. Large Executive Conference Desk with Chamfer Edges
    const deskW = w * 0.68;
    const deskH = h * 0.44;
    this.ctx.beginPath();
    this.drawRoundedRect(x - deskW / 2, y - deskH / 2 + 2, deskW, deskH, 4);
    this.ctx.fillStyle = 'rgba(2, 24, 44, 0.96)';
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.65)';
    this.ctx.lineWidth = 1.2;
    this.ctx.stroke();

    // 3. Central Pulsing Arc Reactor Core on Executive Table
    const pulse = 1 + Math.sin(time * 5) * 0.16;
    this.ctx.beginPath();
    this.ctx.arc(x, y - 2, 9 * pulse, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 16;
    this.ctx.fill();

    // Rotating inner quantum containment rings
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(x, y - 2, 5 * pulse, time * 2, time * 2 + Math.PI * 1.5);
    this.ctx.stroke();

    // 4. Multi-Display Curved Panoramic Command Array
    this.ctx.beginPath();
    this.drawRoundedRect(x - 22, y - 18, 44, 11, 2);
    this.ctx.fillStyle = 'rgba(0, 255, 200, 0.92)';
    this.ctx.shadowColor = '#00ffc8';
    this.ctx.shadowBlur = 12;
    this.ctx.fill();

    // Live matrix data feed on master display
    this.ctx.fillStyle = '#02101e';
    this.ctx.font = 'bold 5.5px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.shadowBlur = 0;
    this.ctx.fillText('NEURAL BUS: 94.8% • 18 AGENTS', x, y - 10);

    // 5. FRIDEY Master Brain Humanoid Avatar (AGENT-00)
    this.drawHumanoidAgent(this.ctx, x, y - 6, 1.2, this.masterBrain, true, isSelected, time, null);

    // 6. Header Label (Strictly Unique Number, No Emoji)
    this.ctx.font = 'bold 8.5px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.shadowBlur = 0;
    this.ctx.fillText('AGENT-00 [MASTER SUITE]', x, y - h / 2 - 6);

    this.ctx.font = '7.5px monospace';
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fillText('COMMANDING 18 AGENTS', x, y + h / 2 + 10);

    this.ctx.restore();
  }

  // Draw Individual Agent Workstation Pod (Exact structure matching https://skfb.ly/osDKZ & https://skfb.ly/oIzPv)
  drawAgentCabin(pos, matchesFilter, allCabins = []) {
    const { screenX: x, screenY: y, screenW: w, screenH: h, agent } = pos;
    const isSelected = this.selectedAgentId === agent.id;
    const alpha = matchesFilter ? 1.0 : 0.22;
    const time = Date.now() / 1000;

    this.ctx.save();
    this.ctx.globalAlpha = alpha;

    // Ambient shadow under workstation pod
    this.ctx.beginPath();
    this.drawEllipse(x, y + h * 0.32, w * 0.44, h * 0.22);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    this.ctx.fill();

    // 1. Cabin Glass Boundary Frame
    this.ctx.beginPath();
    this.drawRoundedRect(x - w / 2, y - h / 2, w, h, 6);
    this.ctx.fillStyle = isSelected ? `${agent.deptColor}2a` : 'rgba(6, 14, 24, 0.88)';
    this.ctx.fill();
    this.ctx.lineWidth = isSelected ? 2 : 1;
    this.ctx.strokeStyle = isSelected ? agent.deptColor : `${agent.deptColor}66`;
    if (isSelected) {
      this.ctx.shadowColor = agent.deptColor;
      this.ctx.shadowBlur = 14;
    }
    this.ctx.stroke();

    // 2. Motorized Sit-Stand Benching Desk (Height Adjustable 65-125cm)
    const deskW = w * 0.74;
    const deskH = h * 0.38;
    const deskX = x - deskW / 2;
    const deskY = y - deskH / 2 + 2;

    // Dual-Stage Telescoping Motorized Desk Legs
    this.ctx.fillStyle = '#0a121c';
    this.ctx.fillRect(deskX + 2, deskY + deskH - 2, 3.5, 7);
    this.ctx.fillRect(deskX + deskW - 5.5, deskY + deskH - 2, 3.5, 7);
    // Telescoping silver inner riser sleeve
    this.ctx.fillStyle = '#1e2e42';
    this.ctx.fillRect(deskX + 2.5, deskY + deskH - 1, 2.5, 4);
    this.ctx.fillRect(deskX + deskW - 5, deskY + deskH - 1, 2.5, 4);

    // Under-Desk Wire Management Tray & Cat6a Ethernet Cable Bundle
    this.ctx.fillStyle = '#060d16';
    this.ctx.fillRect(deskX + deskW * 0.22, deskY + deskH - 1, deskW * 0.56, 3.5);
    this.ctx.strokeStyle = '#00aaff'; // Cat6a blue Ethernet cabling
    this.ctx.lineWidth = 0.8;
    this.ctx.beginPath();
    this.ctx.moveTo(deskX + deskW * 0.24, deskY + deskH + 1);
    this.ctx.lineTo(deskX + deskW * 0.76, deskY + deskH + 1);
    this.ctx.stroke();

    // Small Lockable Under-Desk Mobile Pedestal (Left Side)
    const pedX = deskX + 3;
    const pedY = deskY + deskH + 1;
    this.ctx.fillStyle = '#0f1724';
    this.ctx.fillRect(pedX, pedY, 8.5, 7);
    this.ctx.strokeStyle = '#223246';
    this.ctx.lineWidth = 0.6;
    this.ctx.strokeRect(pedX, pedY, 8.5, 7);
    // Drawer seams
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    this.ctx.beginPath();
    this.ctx.moveTo(pedX, pedY + 2.3);
    this.ctx.lineTo(pedX + 8.5, pedY + 2.3);
    this.ctx.moveTo(pedX, pedY + 4.6);
    this.ctx.lineTo(pedX + 8.5, pedY + 4.6);
    this.ctx.stroke();
    // Key tumbler
    this.ctx.fillStyle = '#c0d0e0';
    this.ctx.fillRect(pedX + 6.5, pedY + 1, 1, 1);

    // Bevelled Desk Top Surface (Clean corporate slate top)
    this.ctx.beginPath();
    this.drawRoundedRect(deskX, deskY, deskW, deskH, 3);
    this.ctx.fillStyle = 'rgba(16, 28, 46, 0.95)';
    this.ctx.fill();
    this.ctx.strokeStyle = `${agent.deptColor}55`;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Motorized Sit-Stand Digital Height Controller (Front Right of Desk)
    const ctrlX = deskX + deskW - 8.5;
    const ctrlY = deskY + deskH - 2.5;
    this.ctx.fillStyle = '#02070e';
    this.ctx.fillRect(ctrlX, ctrlY, 8, 2.8);
    this.ctx.strokeStyle = '#00ff9d';
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeRect(ctrlX, ctrlY, 8, 2.8);
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.font = 'bold 3px monospace';
    this.ctx.fillText('72cm', ctrlX + 1, ctrlY + 2.2);

    // Thunderbolt 4 / USB-C Dock (Single Cable Power + Dual 4K + 10GbE)
    const dockX = x - 8;
    const dockY = deskY + 2;
    this.ctx.fillStyle = '#101c2b';
    this.ctx.fillRect(dockX, dockY, 4.5, 2.8);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fillRect(dockX + 0.8, dockY + 0.8, 1, 1); // Power LED
    // Single braided USB-C cable running from dock to laptop
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    this.ctx.lineWidth = 0.6;
    this.ctx.beginPath();
    this.ctx.moveTo(dockX + 4.5, dockY + 1.4);
    this.ctx.lineTo(x - 6, y);
    this.ctx.stroke();

    // 3. Acoustic Fabric Privacy Divider Screen (from https://skfb.ly/osDKZ)
    // Mounted along the front/rear of the modular benching desk
    const dividerH = 7;
    const dividerY = deskY - dividerH + 2;
    this.ctx.beginPath();
    this.drawRoundedRect(deskX + 3, dividerY, deskW - 6, dividerH, 2);
    this.ctx.fillStyle = 'rgba(18, 32, 52, 0.95)';
    this.ctx.fill();
    // Acoustic screen department color piping/border
    this.ctx.strokeStyle = agent.deptColor;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // 4. Ergonomic Mesh Office Chair (with Micro-Interactions & Spring Dampening)
    const chairY = y + h * 0.28;
    const speedMult = (agent.human && agent.human.speedVariance) || 1.0;
    const phase = (agent.human && agent.human.phaseShift) || 0;
    const cadence = (time * speedMult + phase) % 5.2;
    const isTyping = cadence < 3.6;

    // 2nd-order damped harmonic spring-mass micro-swivel
    const targetChairSway = (Math.sin(time * 0.75 + phase) * 0.034) + (isTyping ? Math.sin(time * 3.4) * 0.009 : 0);
    const chairK = 18.0;
    const chairC = 4.5;
    const chairF = (targetChairSway - (agent.human.chairAngle || 0)) * chairK - (agent.human.chairVel || 0) * chairC;
    agent.human.chairVel = (agent.human.chairVel || 0) + chairF * 0.016;
    agent.human.chairAngle = (agent.human.chairAngle || 0) + agent.human.chairVel * 0.016;

    // 5-Star Caster Wheel Base on floor
    this.ctx.fillStyle = '#0a1018';
    this.ctx.beginPath();
    this.drawEllipse(x, chairY + 7, 6, 2.5);
    this.ctx.fill();
    // Pneumatic lift cylinder
    this.ctx.strokeStyle = '#223044';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x, chairY + 2);
    this.ctx.lineTo(x, chairY + 7);
    this.ctx.stroke();

    // Swivel chair seat and backrest around central hydraulic axis
    this.ctx.save();
    this.ctx.translate(x, chairY + 2);
    this.ctx.rotate(agent.human.chairAngle);

    // Contoured seat cushion
    this.ctx.fillStyle = '#141e2e';
    this.ctx.beginPath();
    this.drawEllipse(0, 0, 5.5, 3);
    this.ctx.fill();

    // Curved Breathable Mesh Backrest with Lumbar Bar
    this.ctx.beginPath();
    this.drawRoundedRect(-5, -8, 10, 6, 2);
    this.ctx.fillStyle = '#101a28';
    this.ctx.fill();
    this.ctx.strokeStyle = `${agent.deptColor}88`;
    this.ctx.lineWidth = 0.8;
    this.ctx.stroke();

    // Ergonomic Headrest
    this.ctx.beginPath();
    this.drawRoundedRect(-3.5, -11, 7, 2.5, 1);
    this.ctx.fillStyle = '#182436';
    this.ctx.fill();
    this.ctx.restore();

    // 5. Dual-Monitor Desk Mount Stand
    const monArmY = deskY + 2;
    this.ctx.fillStyle = '#223044';
    this.ctx.fillRect(x - 1.5, monArmY - 4, 3, 6);

    // Dynamic Screen Light Cast / Flicker onto Desk Surface
    const screenFlicker = 0.15 + Math.sin(time * 9.2 + phase) * 0.05 + Math.cos(time * 18.5) * 0.03;
    const screenGlow = this.ctx.createRadialGradient(x, monArmY - 6, 2, x, monArmY + 6, 22);
    screenGlow.addColorStop(0, `rgba(0, 240, 255, ${screenFlicker})`);
    screenGlow.addColorStop(0.55, `rgba(0, 240, 255, ${screenFlicker * 0.35})`);
    screenGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = screenGlow;
    this.ctx.beginPath();
    this.drawEllipse(x, monArmY + 2, 22, 11);
    this.ctx.fill();

    // Left Display: Animated Streaming Code Terminal with Real Syntax Highlighting
    const monW = 13;
    const monH = 8.5;
    const monLY = monArmY - 10;
    const monLX = x - monW - 1;
    this.ctx.fillStyle = '#060e18';
    this.ctx.fillRect(monLX, monLY, monW, monH);
    this.ctx.strokeStyle = isTyping ? '#00f0ff' : `${agent.deptColor}88`;
    this.ctx.lineWidth = 0.8;
    this.ctx.strokeRect(monLX, monLY, monW, monH);

    // Code lines with syntax coloring
    const scroll1 = (time * 6) % 3;
    this.ctx.fillStyle = '#00f0ff'; // keyword
    this.ctx.fillRect(monLX + 1.2, monLY + 1.5, monW - 5, 0.8);
    this.ctx.fillStyle = '#4ade80'; // function/comment
    this.ctx.fillRect(monLX + 1.2, monLY + 3.2, monW - 4, 0.8);
    this.ctx.fillStyle = '#ffaa00'; // string
    this.ctx.fillRect(monLX + 1.2, monLY + 5.0, monW - 6, 0.8);
    // Blinking cursor
    if (Math.sin(time * 8 + phase) > 0) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(monLX + monW - 4.5, monLY + 5.0, 1.2, 0.9);
    }

    // Right Display: Real-Time Telemetry & Radar Sweep
    const monRX = x + 1;
    const monRY = monArmY - 10;
    this.ctx.fillStyle = '#060e18';
    this.ctx.fillRect(monRX, monRY, monW, monH);
    this.ctx.strokeStyle = agent.deptColor;
    this.ctx.lineWidth = 0.8;
    this.ctx.strokeRect(monRX, monRY, monW, monH);

    // Mini telemetry waveform
    this.ctx.strokeStyle = isTyping ? '#00ff9d' : '#00f0ff';
    this.ctx.lineWidth = 0.7;
    this.ctx.beginPath();
    for (let gx = 0; gx < monW - 2; gx += 1.5) {
      const gy = Math.sin((time * 6 + gx * 0.9 + phase)) * 2;
      if (gx === 0) this.ctx.moveTo(monRX + 1 + gx, monRY + 4.5 + gy);
      else this.ctx.lineTo(monRX + 1 + gx, monRY + 4.5 + gy);
    }
    this.ctx.stroke();

    // Radar beam point
    const radarAngle = time * 3.5 + phase;
    const rdotX = monRX + monW - 3 + Math.cos(radarAngle) * 2;
    const rdotY = monRY + 3 + Math.sin(radarAngle) * 2;
    this.ctx.fillStyle = '#00ff9d';
    this.ctx.fillRect(rdotX, rdotY, 1, 1);

    // 6. Open Silver Laptop on Desk
    const laptopW = 12;
    const isHandling = agent.human && agent.human.state === 'LAPTOP_HANDLING';
    const dynamicTilt = isHandling ? Math.sin(time * 2.5) * 2 : 0;
    const laptopH = 7 + dynamicTilt;

    // Laptop Base on Desk Surface
    this.ctx.fillStyle = '#2a3a52';
    this.ctx.fillRect(x - laptopW / 2, y - 1, laptopW, 2.5);
    // Illuminated Keyboard
    this.ctx.fillStyle = agent.deptColor + 'aa';
    this.ctx.fillRect(x - laptopW / 2 + 1.5, y - 0.5, laptopW - 3, 1.2);

    // Laptop Display open at 105 degrees
    this.ctx.beginPath();
    this.ctx.rect(x - laptopW / 2 + 1, y - 7 - dynamicTilt, laptopW - 2, laptopH);
    this.ctx.fillStyle = agent.deptColor;
    this.ctx.shadowColor = agent.deptColor;
    this.ctx.shadowBlur = 6;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Desk Mouse on Pad
    this.ctx.fillStyle = '#0e1724';
    this.ctx.fillRect(x + laptopW / 2 + 2, y - 2, 4.5, 5);
    this.ctx.fillStyle = '#1c2838';
    this.ctx.fillRect(x + laptopW / 2 + 3, y - 1, 2.5, 3.5);
    // Mouse optical laser dot
    this.ctx.fillStyle = agent.deptColor;
    this.ctx.fillRect(x + laptopW / 2 + 4, y + 0.5, 0.8, 0.8);

    // 7. Humanoid Agent Character in Continuous Typing Loop (from https://skfb.ly/oIzPv)
    let partnerPos = null;
    if (agent.human && agent.human.collabPartnerId && Array.isArray(allCabins)) {
      const partner = allCabins.find(c => c.agent.id === agent.human.collabPartnerId);
      if (partner) {
        partnerPos = { x: partner.screenX, y: partner.screenY };
      }
    }
    this.drawHumanoidAgent(this.ctx, x, y - 2, 1.0, agent, false, isSelected, time, partnerPos);

    // 8. Cabin ID Pill at base (Strictly Unique Number, No Emoji)
    this.ctx.font = '7px monospace';
    this.ctx.fillStyle = agent.deptColor;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`CABIN-${agent.number < 10 ? '0' + agent.number : agent.number} | ${agent.status}`, x, y + h / 2 + 9);

    // 9. Mission Progress Bar
    const barW = w * 0.7;
    const barH = 2.5;
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    this.ctx.fillRect(x - barW / 2, y + h / 2 + 12, barW, barH);
    this.ctx.fillStyle = agent.deptColor;
    this.ctx.fillRect(x - barW / 2, y + h / 2 + 12, barW * (agent.progress / 100), barH);

    this.ctx.restore();
  }

  // Render HTML Cabin Grid list for matrix inspection
  renderCabinGridList() {
    const gridContainer = document.getElementById('officeGridWrapper');
    if (!gridContainer) return;

    const filtered = this.agents.filter(a => this.activeDepartmentFilter === 'all' || a.department === this.activeDepartmentFilter);

    gridContainer.innerHTML = '';

    // If 'all' or 'command', render FRIDAY Executive Suite card at top
    if (this.activeDepartmentFilter === 'all' || this.activeDepartmentFilter === 'command') {
      const mb = this.masterBrain;
      const mbCard = document.createElement('div');
      mbCard.className = `agent-cabin-card master-cabin-card ${this.selectedAgentId === mb.id ? 'active' : ''}`;
      mbCard.innerHTML = `
        <div class="cabin-card-header">
          <span class="cabin-badge-id">PENTHOUSE • MASTER BRAIN</span>
          <span class="cabin-dept-tag" style="color: ${mb.deptColor}; border-color: ${mb.deptColor}55;">COMMAND SUITE</span>
        </div>
        <div class="cabin-card-body">
          <div class="agent-avatar-icon">${mb.avatar}</div>
          <div class="agent-meta-info">
            <h4 class="agent-card-name">${mb.name}</h4>
            <div class="agent-card-title">${mb.title}</div>
            <div class="agent-human-state-pill human-state-working">[${mb.human ? mb.human.state : 'COMMANDING'}]</div>
          </div>
        </div>
        <div class="cabin-hardware-specs">
          <div class="spec-item"><span class="spec-k">Table:</span> <span class="spec-v">${mb.table}</span></div>
          <div class="spec-item"><span class="spec-k">Console:</span> <span class="spec-v">${mb.laptop}</span></div>
        </div>
        <div class="cabin-task-box">
          <div class="task-head">
            <span class="task-label">MASTER ORCHESTRATION</span>
            <span class="task-status-pill" style="color:${mb.deptColor};">${mb.status}</span>
          </div>
          <div class="task-desc">${mb.task}</div>
          <div class="agent-meter-track">
            <div class="agent-meter-fill" style="width: ${mb.progress}%; background: ${mb.deptColor};"></div>
          </div>
        </div>
      `;
      mbCard.addEventListener('click', () => this.selectAgent(mb.id));
      gridContainer.appendChild(mbCard);
    }

    // Render 18 Agent Cards
    filtered.forEach(agent => {
      const card = document.createElement('div');
      const hState = agent.human ? agent.human.state : 'WORKING';
      let stateCls = 'human-state-working';
      if (hState === 'WALKING') stateCls = 'human-state-walking';
      else if (hState === 'LAPTOP_HANDLING') stateCls = 'human-state-handling';
      else if (hState === 'COLLABORATING') stateCls = 'human-state-collab';

      card.className = `agent-cabin-card ${this.selectedAgentId === agent.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="cabin-card-header">
          <span class="cabin-badge-id">CABIN ${agent.number < 10 ? '0' + agent.number : agent.number}</span>
          <span class="cabin-dept-tag" style="color: ${agent.deptColor}; border-color: ${agent.deptColor}55;">${agent.deptLabel}</span>
        </div>
        <div class="cabin-card-body">
          <div class="agent-avatar-icon" style="color: ${agent.deptColor}; text-shadow: 0 0 10px ${agent.deptColor};">${agent.avatar}</div>
          <div class="agent-meta-info">
            <h4 class="agent-card-name">${agent.code}</h4>
            <div class="agent-card-title">${agent.title}</div>
            <div class="agent-human-state-pill ${stateCls}">[${hState}${agent.human && agent.human.collabPartnerId ? ' ⟷ ' + agent.human.collabPartnerId.toUpperCase() : ''}]</div>
          </div>
        </div>
        <div class="cabin-hardware-specs">
          <div class="spec-item"><span class="spec-k">Desk:</span> <span class="spec-v">${agent.table}</span></div>
          <div class="spec-item"><span class="spec-k">Laptop:</span> <span class="spec-v">${agent.laptop}</span></div>
        </div>
        <div class="cabin-skills-chips">
          ${agent.skills.slice(0, 3).map(s => `<span class="agent-skill-chip">${s}</span>`).join('')}
        </div>
        <div class="cabin-task-box">
          <div class="task-head">
            <span class="task-label">ASSIGNED WORK</span>
            <span class="task-status-pill" style="color:${agent.deptColor};">${agent.status} • ${agent.progress}%</span>
          </div>
          <div class="task-desc">${agent.task}</div>
          <div class="agent-meter-track">
            <div class="agent-meter-fill" style="width: ${agent.progress}%; background: ${agent.deptColor};"></div>
          </div>
        </div>
        <button class="btn-cabin-assign" data-agent-id="${agent.id}">ASSIGN NEW WORK</button>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-cabin-assign')) {
          this.selectAgent(agent.id);
        }
      });

      const btnAssign = card.querySelector('.btn-cabin-assign');
      if (btnAssign) {
        btnAssign.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openAssignModal(agent.id);
        });
      }

      gridContainer.appendChild(card);
    });
  }

  // Open detail inspector / dispatch modal
  openAssignModal(agentId) {
    this.selectAgent(agentId);
    const modal = document.getElementById('agentDetailModal');
    if (!modal) return;

    const agent = agentId === 'friday-00' ? this.masterBrain : this.agents.find(a => a.id === agentId);
    if (!agent) return;

    const modalAvatar = document.getElementById('modalAgentAvatar');
    const modalTitle = document.getElementById('modalAgentName');
    const modalCabin = document.getElementById('modalAgentCabin');
    const modalRole = document.getElementById('modalAgentRole');
    const modalDesk = document.getElementById('modalAgentDesk');
    const modalSpecs = document.getElementById('modalAgentSpecs');
    const modalSkills = document.getElementById('modalAgentSkills');
    const modalCurrentTask = document.getElementById('modalCurrentTask') || document.getElementById('modalTaskDesc');
    const modalTaskPct = document.getElementById('modalTaskPct');
    const modalTaskBar = document.getElementById('modalTaskBar');
    const modalLogs = document.getElementById('modalAgentLogs');

    if (modalAvatar) modalAvatar.textContent = agent.avatar;
    if (modalTitle) modalTitle.textContent = agent.code;
    if (modalCabin) modalCabin.textContent = agent.cabin;
    if (modalRole) modalRole.textContent = `${agent.title} • ${agent.deptLabel}`;
    if (modalDesk) {
      modalDesk.innerHTML = `${agent.table} &bull; <span style="color:var(--theme-primary); font-weight:bold;">${agent.laptop}</span>`;
    }
    if (modalSpecs) {
      modalSpecs.innerHTML = `
        <div><strong>Desk:</strong> ${agent.table}</div>
        <div><strong>Laptop:</strong> ${agent.laptop}</div>
        <div><strong>Telemetry:</strong> CPU: ${agent.cpuLoad}% | RAM: ${agent.memoryLoad}</div>
      `;
    }
    if (modalSkills) {
      modalSkills.innerHTML = agent.skills.map(s => `<span class="modal-skill-tag">${s}</span>`).join(' ');
    }
    if (modalCurrentTask) {
      modalCurrentTask.textContent = agent.task;
    }
    if (modalTaskPct) {
      modalTaskPct.textContent = `${agent.progress}%`;
    }
    if (modalTaskBar) {
      modalTaskBar.style.width = `${agent.progress}%`;
    }
    if (modalLogs && agent.logs) {
      modalLogs.innerHTML = agent.logs.map(l => `<div class="term-log-line">${l}</div>`).join('');
    }

    // Modal Character Reference Preview Banner with Exact Typing Character
    const modalBannerImg = document.getElementById('modalBannerImg');
    const modalBannerStatePill = document.getElementById('modalBannerStatePill');
    const modalBannerDeptTag = document.getElementById('modalBannerDeptTag');

    if (modalBannerImg && modalBannerStatePill && modalBannerDeptTag) {
      if (agent.human && agent.human.state === 'COLLABORATING' && agent.human.collabPartnerId) {
        modalBannerImg.src = 'chareter%20refference/Agents%20colobes%20reference.webp';
        const partner = this.agents.find(a => a.id === agent.human.collabPartnerId);
        const partnerCode = partner ? partner.code : agent.human.collabPartnerId.toUpperCase();
        modalBannerStatePill.innerHTML = `● COLLABORATING WITH ${partnerCode}`;
        modalBannerStatePill.style.color = '#00f0ff';
        modalBannerStatePill.style.borderColor = 'rgba(0, 240, 255, 0.6)';
      } else {
        modalBannerImg.src = 'chareter%20refference/agent_typing_character.jpeg';
        const stateStr = agent.human ? agent.human.state : 'WORKING';
        modalBannerStatePill.innerHTML = `● 3D TYPING AGENT [${stateStr}]`;
        modalBannerStatePill.style.color = '#00ff88';
        modalBannerStatePill.style.borderColor = 'rgba(0, 255, 136, 0.5)';
      }
      modalBannerDeptTag.textContent = agent.deptLabel.toUpperCase();
      modalBannerDeptTag.style.color = agent.deptColor;
      modalBannerDeptTag.style.borderColor = agent.deptColor;
    }

    modal.classList.add('open');
    modal.style.display = 'flex';
    if (window.FridayAudio) window.FridayAudio.playClick();
  }

  // Open Enterprise IT Infrastructure Inspector Modal
  openInfraModal(zoneId) {
    const zone = (this.infraZones && this.infraZones[zoneId]) || this.infraZones.mdf;
    const modal = document.getElementById('infraDetailModal');
    if (!modal || !zone) return;

    const iconMap = {
      mdf: '🖥️',
      conference: '🎙️',
      phone_booths: '📞',
      workstation_setup: '🪑',
      environmental_hvac: '🍃',
      pantry_amenities: '☕'
    };

    const titleEl = document.getElementById('modalInfraTitle');
    const catEl = document.getElementById('modalInfraCategory');
    const iconEl = document.getElementById('modalInfraIcon');
    const statusPill = document.getElementById('modalInfraStatusPill');
    const descEl = document.getElementById('modalInfraDesc');
    const gridEl = document.getElementById('modalInfraSpecsGrid');

    if (titleEl) titleEl.textContent = zone.title;
    if (catEl) catEl.textContent = zone.category.toUpperCase().replace('_', ' ');
    if (iconEl) iconEl.textContent = iconMap[zoneId] || '🌐';
    if (statusPill) statusPill.textContent = `● ${zone.status}`;
    if (descEl) descEl.textContent = zone.description;

    if (gridEl && Array.isArray(zone.specs)) {
      gridEl.innerHTML = zone.specs.map(s => `
        <div class="infra-spec-item">
          <span class="infra-spec-k">${s.k}:</span>
          <span class="infra-spec-v">${s.v}</span>
        </div>
      `).join('');
    }

    modal.classList.add('open');
    modal.style.display = 'flex';
    if (window.FridayAudio) window.FridayAudio.playBootSequence();
  }

  // Bind Enterprise Infrastructure Filter Chips
  bindInfraTabs() {
    const tabs = document.querySelectorAll('.infra-chip');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeInfraFilter = tab.getAttribute('data-infra') || 'all';
        if (window.FridayAudio) window.FridayAudio.playClick();
        if (window.FridayCore) {
          window.FridayCore.showToast(`Infrastructure View Layer: ${tab.textContent}`);
        }
      });
    });
  }

  // Bind Infrastructure Inspector Modal Close and Actions
  bindInfraModal() {
    const modal = document.getElementById('infraDetailModal');
    const btnClose = document.getElementById('btnCloseInfraModal');
    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        modal.classList.remove('open');
        modal.style.display = 'none';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          modal.style.display = 'none';
        }
      });
    }

    const btnAction1 = document.getElementById('btnInfraAction1');
    const btnAction2 = document.getElementById('btnInfraAction2');
    if (btnAction1) {
      btnAction1.addEventListener('click', () => {
        if (window.FridayCore) {
          window.FridayCore.showToast('Enterprise IT Diagnostics: Dual-ISP Fiber, 10GbE Switches, UPS & HVAC Verified 100% Operational');
        }
        if (window.FridayAudio) window.FridayAudio.playAlert();
      });
    }
    if (btnAction2) {
      btnAction2.addEventListener('click', () => {
        this.updateFleetStats();
        if (window.FridayCore) {
          window.FridayCore.showToast('Enterprise IT Telemetry Refreshed • Zero Downtime Maintained');
        }
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    }
  }


  selectAgent(agentId) {
    this.selectedAgentId = agentId;
    this.renderCabinGridList();

    // Zoom camera slightly toward selected cabin
    const width = this.canvas ? this.canvas.width / (window.devicePixelRatio || 1) : 600;
    const height = this.canvas ? this.canvas.height / (window.devicePixelRatio || 1) : 360;
    const cabins = this.getCabin3DPositions(width, height);
    const target = cabins.find(c => c.agent.id === agentId);
    if (target) {
      this.targetZoomLevel = 1.15;
    }
  }

  // Assign task to an agent
  assignTask(agentId, newTask) {
    const agent = this.agents.find(a => 
      a.id === agentId || 
      a.code.toLowerCase() === agentId.toLowerCase() || 
      String(a.number) === agentId ||
      ('agent-' + agentId) === a.id
    );
    if (!agent) return false;

    agent.task = newTask;
    agent.progress = 12;
    agent.status = 'IN PROGRESS';
    agent.cpuLoad = 85;
    if (agent.human) {
      agent.human.state = 'WORKING';
      agent.human.typingSpeed = 20;
    }

    // Add log entry
    if (!agent.logs) agent.logs = [];
    agent.logs.unshift(`[${agent.code}] Dispatched new mission: "${newTask}"`);
    if (agent.logs.length > 5) agent.logs.pop();

    this.renderCabinGridList();
    this.updateFleetStats();

    // Trigger visual data packet burst to that agent
    for (let i = 0; i < 4; i++) {
      this.dataPackets.push({
        targetIndex: agent.number - 1,
        t: 0,
        speed: 0.012 + Math.random() * 0.008,
        size: 3.5,
        color: agent.deptColor
      });
    }

    if (window.FridayCore) {
      window.FridayCore.showToast(`FRIDEY Dispatched Work to ${agent.code} (Cabin ${agent.number}): "${newTask}"`);
    }

    if (window.FridayAudio) {
      window.FridayAudio.playBootSequence();
    }

    return true;
  }

  assignAgentTask(agentId, newTask) {
    return this.assignTask(agentId, newTask);
  }

  // Automatically assign skill-matched missions to all 18 agents
  autoAssignFleet() {
    const fleetTasks = [
      { id: 'agent-01', task: 'Compile next-generation WebAssembly bridge for ARM64 kernel' },
      { id: 'agent-02', task: 'Scale high-throughput gRPC event stream to 3.2M msg/sec' },
      { id: 'agent-03', task: 'Render 3D volumetric particles for Arc Reactor holographic HUD' },
      { id: 'agent-04', task: 'Execute automated blue/green Kubernetes cluster rollout' },
      { id: 'agent-05', task: 'Run formal mathematical audit on Merkle verification trees' },
      { id: 'agent-06', task: 'Monitor perimeter intrusion detection and quarantine suspicious sockets' },
      { id: 'agent-07', task: 'Conduct automated stealth port reconnaissance across local subnets' },
      { id: 'agent-08', task: 'Perform memory volatility triage and extract YARA rules' },
      { id: 'agent-09', task: 'Rotate cloud IAM cryptographic enclaves to zero-trust baseline' },
      { id: 'agent-10', task: 'Optimize transformer attention weights for multilingual NLP engine' },
      { id: 'agent-11', task: 'Correlate global MITRE threat actor TTPs with active logs' },
      { id: 'agent-12', task: 'Execute 100,000 Monte Carlo power dissipation simulations' },
      { id: 'agent-13', task: 'Index full Blue Team cybersecurity documentation into vector store' },
      { id: 'agent-14', task: 'Apply real-time low-latency PREEMPT_RT kernel patches' },
      { id: 'agent-15', task: 'Rebalance 16TB distributed database partition replicas' },
      { id: 'agent-16', task: 'Crawl open threat feeds for emerging zero-day vulnerabilities' },
      { id: 'agent-17', task: 'Inject chaos latency tests across redundant satellite relays' },
      { id: 'agent-18', task: 'Execute automated regression test suite across all modules' }
    ];

    fleetTasks.forEach(item => {
      this.assignTask(item.id, item.task);
    });

    if (window.FridayCore) {
      window.FridayCore.showToast('FRIDEY Master Brain: Coordinated Workflow Dispatched to All 18 Agents!');
    }

    if (window.FridayVoice && !window.FridayVoice.isMicMuted) {
      window.FridayVoice.speak('All 18 autonomous agent cabins have been assigned coordinated tactical missions, Gojo.');
    }
  }

  // Dynamic Autonomous Workflow Cycle (Rotates Working, Walking, Laptop Handling & Collaboration)
  initAutonomousWorkflowLoop() {
    const interval = typeof setInterval !== 'undefined' ? setInterval : null;
    if (!interval) return;

    this.workflowTimer = interval(() => {
      if (!this.agents || this.agents.length === 0) return;

      const collabPairs = [
        ['agent-01', 'agent-02'],
        ['agent-06', 'agent-07'],
        ['agent-10', 'agent-13'],
        ['agent-15', 'agent-17']
      ];

      // Randomly cycle a pair into collaboration, one walking, one laptop handling
      const chosenPair = collabPairs[Math.floor(Math.random() * collabPairs.length)];

      this.agents.forEach(a => {
        if (!a.human) return;
        if (a.id === chosenPair[0]) {
          a.human.state = 'COLLABORATING';
          a.human.collabPartnerId = chosenPair[1];
          a.status = 'COLLABORATING';
        } else if (a.id === chosenPair[1]) {
          a.human.state = 'WALKING';
          a.human.collabPartnerId = chosenPair[0];
          a.status = 'WALKING';
        } else if (Math.random() < 0.2) {
          a.human.state = 'LAPTOP_HANDLING';
          a.human.collabPartnerId = null;
          a.status = 'INSPECTING';
        } else if (Math.random() < 0.15) {
          a.human.state = 'WALKING';
          a.human.collabPartnerId = null;
          a.status = 'WALKING';
        } else {
          a.human.state = 'WORKING';
          a.human.collabPartnerId = null;
          a.status = 'WORKING';
        }
      });

      this.updateFleetStats();
      if (this.activeViewMode === 'grid') {
        this.renderCabinGridList();
      }
    }, 9000);
  }

  // Set an agent's human body state
  setAgentState(agentId, state, partnerId = null) {
    const agent = this.agents.find(a => 
      a.id === agentId || 
      a.code.toLowerCase() === agentId.toLowerCase() || 
      String(a.number) === agentId ||
      ('agent-' + agentId) === a.id
    );
    if (!agent) return false;
    if (!agent.human) agent.human = { state: 'WORKING', walkProgress: 0, collabPartnerId: null, typingSpeed: 15, laptopTilt: 0, bobPhase: 0 };
    agent.human.state = state;
    agent.status = state;
    if (partnerId) agent.human.collabPartnerId = partnerId;
    this.renderCabinGridList();
    this.updateFleetStats();
    return true;
  }

  // Pair two agents into collaborative synergy with animated laser beam
  pairCollaboration(id1, id2) {
    const a1 = this.agents.find(a => 
      a.id === id1 || 
      a.code.toLowerCase() === id1.toLowerCase() || 
      String(a.number) === id1 ||
      ('agent-' + id1) === a.id
    );
    const a2 = this.agents.find(a => 
      a.id === id2 || 
      a.code.toLowerCase() === id2.toLowerCase() || 
      String(a.number) === id2 ||
      ('agent-' + id2) === a.id
    );
    if (!a1 || !a2) return false;

    if (!a1.human) a1.human = {};
    if (!a2.human) a2.human = {};

    a1.human.state = 'COLLABORATING';
    a1.human.collabPartnerId = a2.id;
    a1.status = 'COLLABORATING';

    a2.human.state = 'COLLABORATING';
    a2.human.collabPartnerId = a1.id;
    a2.status = 'COLLABORATING';

    this.renderCabinGridList();
    this.updateFleetStats();

    if (window.FridayCore) {
      window.FridayCore.showToast(`Collaboration Link Active: ${a1.code} <-> ${a2.code}`);
    }
    return true;
  }

  updateFleetStats() {
    const totalCountEl = document.getElementById('statTotalAgents');
    const activeTasksEl = document.getElementById('statActiveTasks');
    const fleetLoadEl = document.getElementById('statFleetLoad');

    if (totalCountEl) totalCountEl.textContent = '18 AGENTS';
    if (activeTasksEl) {
      const activeCount = this.agents.filter(a => a.status !== 'IDLE').length;
      activeTasksEl.textContent = `${activeCount} ACTIVE`;
    }
    if (fleetLoadEl) {
      const avgCpu = Math.round(this.agents.reduce((acc, a) => acc + a.cpuLoad, 0) / this.agents.length);
      fleetLoadEl.textContent = `${avgCpu}% LOAD`;
    }

    const ispStatusEl = document.getElementById('officeIspStatus');
    const mdfStatusEl = document.getElementById('officeMdfStatus');
    const upsStatusEl = document.getElementById('officeUpsStatus');
    const hvacStatusEl = document.getElementById('officeHvacStatus');
    if (ispStatusEl) ispStatusEl.textContent = '10G FAILOVER OK';
    if (mdfStatusEl) mdfStatusEl.textContent = '19.4°C • FM-200';
    if (upsStatusEl) upsStatusEl.textContent = '100% (2.4h)';
    if (hvacStatusEl) hvacStatusEl.textContent = '21.4°C • HEPA OK';
  }

  // Get formatted CLI list of agents for Linux Terminal (Strictly Unique Numbers, Zero Emojis)
  getTerminalAgentList() {
    let out = `<span style="color:#00f0ff; font-weight:bold;">GOJO ENTERPRISE AUTONOMOUS AI AGENT FLEET (18 AGENTS + MASTER BRAIN):</span>\\n`;
    out += `─────────────────────────────────────────────────────────────────────────────────────────────\\n`;
    out += `  <span style="color:#00f0ff; font-weight:bold;">[CABIN-00] AGENT-00: FRIDEY EXECUTIVE MASTER SUITE</span> | Role: Neural Master Brain | Status: <span style="color:#00ff9d;">COMMANDING</span>\\n`;
    out += `    Table: Floating Quantum Command Table | Console: Quantum Array 1024-Qubit\\n`;
    out += `─────────────────────────────────────────────────────────────────────────────────────────────\\n`;

    const departments = [
      { key: 'coding', title: '[DIVISION 01] ENGINEERING & CODE SYNTHESIS (AGENTS 01 - 05)' },
      { key: 'security', title: '[DIVISION 02] CYBER DEFENSE & OFFENSIVE RECONNAISSANCE (AGENTS 06 - 09)' },
      { key: 'analytics', title: '[DIVISION 03] DEEP ANALYTICS & NEURAL INTELLIGENCE (AGENTS 10 - 13)' },
      { key: 'systems', title: '[DIVISION 04] SYSTEMS & AUTONOMOUS OPERATIONS (AGENTS 14 - 18)' }
    ];

    departments.forEach(dept => {
      out += `\\n<span style="color:#ffaa00; font-weight:bold;">${dept.title}:</span>\\n`;
      const deptAgents = this.agents.filter(a => a.department === dept.key);
      deptAgents.forEach(a => {
        const numStr = a.number < 10 ? '0' + a.number : String(a.number);
        const hState = a.human ? a.human.state : a.status;
        out += `  <span style="color:${a.deptColor}; font-weight:bold;">[CABIN-${numStr}] ${a.code}</span> (${a.title})\\n`;
        out += `    Desk: ${a.table} | Laptop: ${a.laptop}\\n`;
        out += `    State: [${hState}] | Skills: <span style="color:#bbb;">${a.skills.join(', ')}</span>\\n`;
        out += `    Task:  <span style="color:#00ff9d;">${a.task}</span> [${a.status} • ${a.progress}%]\\n`;
      });
    });

    out += `\\n─────────────────────────────────────────────────────────────────────────────────────────────\\n`;
    out += `Commands: <span class="t-highlight">'agents assign &lt;id&gt; &lt;task&gt;'</span> to dispatch, <span class="t-highlight">'agents collab &lt;id1&gt; &lt;id2&gt;'</span> to pair, <span class="t-highlight">'agents status'</span> for telemetry.`;
    return out;
  }

  // Initialize and bind Character & Office Studio References
  initReferencesStudio() {
    const tabBtns = document.querySelectorAll('.ref-tab-btn');
    const panes = {
      character: document.getElementById('refPaneChar'),
      office: document.getElementById('refPaneOffice'),
      collab: document.getElementById('refPaneCollab')
    };

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabKey = btn.getAttribute('data-tab');
        Object.keys(panes).forEach(k => {
          if (panes[k]) panes[k].style.display = k === tabKey ? 'flex' : 'none';
        });
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    });

    const selectAgent = document.getElementById('selectRefAgent');
    if (selectAgent) {
      selectAgent.innerHTML = '';
      const allRoster = [this.masterBrain, ...this.agents];
      allRoster.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a.id;
        opt.textContent = `${a.code} - ${a.name} (${a.deptLabel})`;
        selectAgent.appendChild(opt);
      });

      selectAgent.addEventListener('change', (e) => {
        this.updateReferenceWorkstation(e.target.value);
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    }

    const btnInspect = document.getElementById('btnRefInspectAgent');
    if (btnInspect) {
      btnInspect.addEventListener('click', () => {
        const curId = selectAgent ? selectAgent.value : 'agent-01';
        this.openAssignModal(curId);
      });
    }

    const btnSimTask = document.getElementById('btnRefSimulateTask');
    if (btnSimTask) {
      btnSimTask.addEventListener('click', () => {
        const curId = selectAgent ? selectAgent.value : 'agent-01';
        const taskPrompt = prompt(`Dispatch new mission to ${curId}:`, "Audit high-throughput API gateway and stream metrics");
        if (taskPrompt) {
          this.assignAgentTask(curId, taskPrompt);
          this.updateReferenceWorkstation(curId);
        }
      });
    }

    const btnSwitch3D = document.getElementById('btnRefSwitchTo3D');
    if (btnSwitch3D) {
      btnSwitch3D.addEventListener('click', () => {
        if (typeof this.setOfficeView === 'function') {
          this.setOfficeView('3d');
        } else {
          const btnToggle3D = document.getElementById('btnOfficeMode3D') || document.getElementById('btnOfficeView3D');
          if (btnToggle3D) btnToggle3D.click();
        }
      });
    }

    const zones = document.querySelectorAll('.office-hotspot-zone');
    zones.forEach(zone => {
      zone.addEventListener('click', () => {
        const dept = zone.getAttribute('data-dept');
        const deptChip = document.querySelector(`.dept-chip[data-dept="${dept}"]`);
        if (deptChip) deptChip.click();
        if (typeof this.setOfficeView === 'function') {
          this.setOfficeView('3d');
        } else {
          const btnToggle3D = document.getElementById('btnOfficeMode3D');
          if (btnToggle3D) btnToggle3D.click();
        }
      });
    });

    const collabBtns = document.querySelectorAll('.collab-pair-btn');
    collabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        collabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const p1 = btn.getAttribute('data-p1');
        const p2 = btn.getAttribute('data-p2');
        this.pairCollaboration(p1, p2);
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    });

    const btnTriggerCollab = document.getElementById('btnRefTriggerCollab');
    if (btnTriggerCollab) {
      btnTriggerCollab.addEventListener('click', () => {
        const activePairBtn = document.querySelector('.collab-pair-btn.active');
        const p1 = activePairBtn ? activePairBtn.getAttribute('data-p1') : 'agent-01';
        const p2 = activePairBtn ? activePairBtn.getAttribute('data-p2') : 'agent-02';
        this.pairCollaboration(p1, p2);
      });
    }

    this.updateReferenceWorkstation('agent-01');
  }

  updateReferenceWorkstation(agentId) {
    const agent = agentId === 'friday-00' ? this.masterBrain : this.agents.find(a => a.id === agentId);
    if (!agent) return;

    const titleEl = document.getElementById('refCharAgentTitle');
    const codeEl = document.getElementById('refMetaCode');
    const roleEl = document.getElementById('refMetaRole');
    const deskEl = document.getElementById('refMetaDesk');
    const hwEl = document.getElementById('refMetaHardware');
    const deptOverlay = document.getElementById('refOverlayDept');
    const statusText = document.getElementById('refStatusText');
    const monCode = document.getElementById('refMonCode');
    const monTitle = document.getElementById('refMonTitle');
    const clockEl = document.getElementById('refOverlayClock');

    if (titleEl) titleEl.textContent = `${agent.code} • ${agent.name}`;
    if (codeEl) codeEl.textContent = agent.code;
    if (roleEl) roleEl.textContent = `${agent.title} (${agent.deptLabel})`;
    if (deskEl) deskEl.textContent = agent.table;
    if (hwEl) hwEl.textContent = agent.laptop;
    if (deptOverlay) {
      deptOverlay.textContent = agent.deptLabel.toUpperCase();
      deptOverlay.style.color = agent.deptColor;
      deptOverlay.style.borderColor = agent.deptColor;
    }
    if (statusText) {
      const stateStr = agent.human ? agent.human.state : 'WORKING';
      statusText.textContent = `${agent.code} • [${stateStr}]`;
    }
    if (monTitle) monTitle.textContent = `${agent.code} TELEMETRY`;
    if (monCode) {
      monCode.textContent = agent.task || 'IDLE • STANDING BY FOR DISPATCH';
    }
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    const badgeCharAgentName = document.getElementById('badgeCharAgentName');
    if (badgeCharAgentName) {
      badgeCharAgentName.textContent = `3D AGENT: ${agent.code} (${agent.deptLabel})`;
    }
  }

  renderReferencesStudio() {
    const selectAgent = document.getElementById('selectRefAgent');
    const curId = selectAgent ? selectAgent.value : 'agent-01';
    this.updateReferenceWorkstation(curId);
  }
}

// Global initialization
if (typeof window !== 'undefined') {
  window.FridayAgents = new FridayAgentFleetEngine();
}
