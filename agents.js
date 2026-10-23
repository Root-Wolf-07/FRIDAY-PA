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
    this.selectedAgentId = null;
    this.activeViewMode = '3d'; // '3d' or 'grid'
    this.canvas = null;
    this.ctx = null;
    this.animationFrameId = null;
    this.orbitAngle = -0.45; // Camera isometric rotation angle
    this.targetOrbitAngle = -0.45;
    this.tiltAngle = 0.52; // Camera tilt angle
    this.targetTiltAngle = 0.52;
    this.zoomLevel = 1.0;
    this.targetZoomLevel = 1.0;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.dataPackets = []; // Animated data packets flowing from FRIDAY to agent laptops
    this.hoveredCabinId = null;

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
      window.addEventListener('resize', () => this.resizeCanvas());
      this.bindCanvasInteractivity();
      this.startRenderLoop();
    }

    this.renderCabinGridList();
    this.updateFleetStats();
    this.bindFilterButtons();
    this.bindActionButtons();
    this.initReferencesStudio();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    const rect = (parent && typeof parent.getBoundingClientRect === 'function')
      ? parent.getBoundingClientRect()
      : (typeof this.canvas.getBoundingClientRect === 'function' ? this.canvas.getBoundingClientRect() : { width: 580, height: 420 });
    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    this.canvas.width = Math.max(320, rect.width || 580) * dpr;
    this.canvas.height = Math.max(280, rect.height || 360) * dpr;
    if (this.ctx) {
      this.ctx.resetTransform?.();
      this.ctx.scale(dpr, dpr);
    }
  }

  bindCanvasInteractivity() {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        this.targetOrbitAngle += dx * 0.008;
        this.targetTiltAngle = Math.max(0.2, Math.min(1.1, this.targetTiltAngle + dy * 0.005));
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0015;
      this.targetZoomLevel = Math.max(0.65, Math.min(1.6, this.targetZoomLevel + zoomDelta));
    }, { passive: false });

    // Click to select cabin and open details modal
    this.canvas.addEventListener('click', (e) => {
      if (this.hoveredCabinId) {
        this.openAssignModal(this.hoveredCabinId);
        if (window.FridayAudio) window.FridayAudio.playClick();
      }
    });
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
        this.targetOrbitAngle = -0.45;
        this.targetTiltAngle = 0.52;
        this.targetZoomLevel = 1.0;
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    }
  }

  bindActionButtons() {
    // Virtual Office Folding & Ribbon Listeners
    const btnFoldOffice = document.getElementById('btnFoldOffice');
    const btnToggleOffice = document.getElementById('btnToggleOffice');
    const officeFoldedRibbon = document.getElementById('officeFoldedRibbon');

    if (btnFoldOffice) {
      btnFoldOffice.addEventListener('click', () => this.toggleOffice(false));
    }
    if (btnToggleOffice) {
      btnToggleOffice.addEventListener('click', () => this.toggleOffice());
    }
    if (officeFoldedRibbon) {
      officeFoldedRibbon.addEventListener('click', () => this.toggleOffice(true));
    }

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

  // Toggle Virtual Office Column (Expand / Fold)
  toggleOffice(forceOpen = null) {
    const colOffice = document.getElementById('colAgentOffice');
    const ribbon = document.getElementById('officeFoldedRibbon');
    const toggleBtn = document.getElementById('btnToggleOffice');

    if (forceOpen !== null) {
      this.officeOpen = forceOpen;
    } else {
      this.officeOpen = !this.officeOpen;
    }

    if (colOffice) {
      colOffice.classList.toggle('is-folded', !this.officeOpen);
    }
    if (ribbon) {
      ribbon.classList.toggle('visible', !this.officeOpen);
    }
    if (toggleBtn) {
      toggleBtn.classList.toggle('active', this.officeOpen);
    }
    if (this.officeOpen) {
      setTimeout(() => this.resizeCanvas(), 300);
    }
    if (window.FridayAudio) window.FridayAudio.playClick();
    if (window.FridayCore) {
      window.FridayCore.showToast(this.officeOpen ? '3D Agent Virtual Office: EXPANDED' : '3D Agent Virtual Office: FOLDED');
    }
  }

  // Calculate 3D isometric positions for all cabins
  getCabin3DPositions(width, height) {
    const cx = width / 2;
    const cy = height / 2 + 10;
    const scale = Math.min(width, height) * 0.28 * this.zoomLevel;

    const positions = [];

    // 1. Apex Executive Suite (FRIDAY)
    positions.push({
      agent: this.masterBrain,
      isMaster: true,
      x3d: 0,
      y3d: -1.8,
      z3d: 0.25,
      w3d: 1.1,
      h3d: 0.75
    });

    // 2. Arrange 18 Cabins in a 4-Wing Circular Matrix around FRIDAY's Executive Suite
    // 4 rows x 4-5 cabins per wing
    const gridRows = [
      // Wing 1 (Coding): 5 cabins
      { row: -0.8, cols: [-1.8, -0.9, 0, 0.9, 1.8], indices: [0, 1, 2, 3, 4] },
      // Wing 2 (Security): 4 cabins
      { row: 0.1, cols: [-1.5, -0.5, 0.5, 1.5], indices: [5, 6, 7, 8] },
      // Wing 3 (Analytics): 4 cabins
      { row: 0.95, cols: [-1.5, -0.5, 0.5, 1.5], indices: [9, 10, 11, 12] },
      // Wing 4 (Systems): 5 cabins
      { row: 1.8, cols: [-1.8, -0.9, 0, 0.9, 1.8], indices: [13, 14, 15, 16, 17] }
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
      // Smooth camera interpolation
      this.orbitAngle += (this.targetOrbitAngle - this.orbitAngle) * 0.08;
      this.tiltAngle += (this.targetTiltAngle - this.tiltAngle) * 0.08;
      this.zoomLevel += (this.targetZoomLevel - this.zoomLevel) * 0.08;

      this.render3DOffice();
      this.animationFrameId = raf(render);
    };
    render();
  }

  render3DOffice() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Cybernetic Cyber-Floor Grid
    this.drawOfficeFloor(w, h);

    // 2. Calculate 3D projected cabins
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

    this.ctx.save();

    // 1. Panoramic Perimeter Window Wall & Sky Illumination (from Agent work office reference)
    const winTop = 14;
    const winBottom = h * 0.45;
    const winGrad = this.ctx.createLinearGradient(0, winTop, 0, winBottom);
    winGrad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
    winGrad.addColorStop(0.5, 'rgba(120, 200, 255, 0.04)');
    winGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = winGrad;
    this.ctx.fillRect(0, winTop, w, winBottom - winTop);

    // Architectural Window Mullions (vertical office window panes)
    this.ctx.strokeStyle = 'rgba(160, 210, 255, 0.12)';
    this.ctx.lineWidth = 1.2;
    const colCount = 8;
    for (let c = 0; c <= colCount; c++) {
      const wx = (w / colCount) * c;
      this.ctx.beginPath();
      this.ctx.moveTo(wx, winTop);
      this.ctx.lineTo(wx, winBottom);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(wx - 8, winTop + (winBottom - winTop) * 0.38);
      this.ctx.lineTo(wx + 8, winTop + (winBottom - winTop) * 0.38);
      this.ctx.stroke();
    }

    // 2. Isometric Floor Boundary & Hexagonal Cyber-Floor
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    this.ctx.lineWidth = 1;

    // Floor boundary hexagon
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + this.orbitAngle * 0.2;
      const rx = cx + Math.cos(angle) * (w * 0.46 * this.zoomLevel);
      const ry = cy + Math.sin(angle) * (h * 0.42 * this.zoomLevel * 0.7);
      if (i === 0) this.ctx.moveTo(rx, ry);
      else this.ctx.lineTo(rx, ry);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    // Floor radial glow
    const grad = this.ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.45);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.06)');
    grad.addColorStop(0.5, 'rgba(188, 19, 254, 0.02)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = grad;
    this.ctx.fill();

    // 3. Potted Leafy Office Plants (from Agent work office & collaboration references)
    const plantPositions = [
      { x: cx - w * 0.38, y: cy - h * 0.18 },
      { x: cx + w * 0.38, y: cy - h * 0.18 },
      { x: cx - w * 0.39, y: cy + h * 0.24 },
      { x: cx + w * 0.39, y: cy + h * 0.24 }
    ];

    plantPositions.forEach(p => {
      // Ceramic planter pot
      this.ctx.fillStyle = '#182436';
      this.ctx.beginPath();
      this.drawRoundedRect(p.x - 5, p.y, 10, 8, 2);
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      this.ctx.stroke();

      // Lush green foliage
      this.ctx.fillStyle = '#00ff88';
      this.ctx.beginPath();
      this.ctx.arc(p.x - 3, p.y - 4, 3.5, 0, Math.PI * 2);
      this.ctx.arc(p.x + 3, p.y - 4, 3.5, 0, Math.PI * 2);
      this.ctx.arc(p.x, p.y - 7, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  drawCircuitTrack(x1, y1, x2, y2, color) {
    this.ctx.save();
    this.ctx.strokeStyle = color ? color + '22' : 'rgba(0, 240, 255, 0.14)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 6]);

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    // Draw stepped cyber-bus routing
    const midY = (y1 + y2) / 2;
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

  // Procedural 3D Human Body Model & Kinematic Animations
  drawHumanoidAgent(ctx, x, y, scale, agent, isMaster, isSelected, time, partnerPos) {
    ctx.save();

    const state = agent.human ? agent.human.state : 'WORKING';
    const deptColor = agent.deptColor || '#00f0ff';
    const numStr = agent.number < 10 ? '0' + agent.number : String(agent.number);

    // 1. Walking Kinematics Calculation
    let renderX = x;
    let renderY = y;
    let bobY = 0;
    let legStride = 0;
    let armSwing = 0;

    if (state === 'WALKING') {
      const walkFreq = 7;
      const walkT = time * walkFreq + (agent.human.bobPhase || 0);
      legStride = Math.sin(walkT) * 0.5; // Leg angle in radians
      armSwing = -legStride; // Counter-phase arm swing
      bobY = -Math.abs(Math.sin(walkT)) * 2.2; // Natural humanoid vertical bob

      // If walking to partner, interpolate position
      if (partnerPos) {
        const walkCycle = (Math.sin(time * 0.6 + (agent.human.bobPhase || 0)) + 1) / 2;
        renderX = x + (partnerPos.x - x) * 0.45 * walkCycle;
        renderY = y + (partnerPos.y - y) * 0.45 * walkCycle;
      } else {
        renderX = x + Math.sin(time * 1.2 + (agent.human.bobPhase || 0)) * 8;
        renderY = y + Math.cos(time * 1.2 + (agent.human.bobPhase || 0)) * 4;
      }

      // Footstep Ripple Waves on Glass Floor
      const ripplePhase = (time * 3 + (agent.human.bobPhase || 0)) % 1.0;
      ctx.beginPath();
      this.drawEllipse(renderX, renderY + 14, 3 + ripplePhase * 10, (3 + ripplePhase * 10) * 0.45);
      ctx.strokeStyle = deptColor + Math.floor((1 - ripplePhase) * 140).toString(16).padStart(2, '0');
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (state === 'WORKING') {
      bobY = Math.sin(time * 2.5 + (agent.human.bobPhase || 0)) * 0.4;
    } else if (state === 'COLLABORATING') {
      bobY = Math.sin(time * 1.8 + (agent.human.bobPhase || 0)) * 0.5;
    } else if (state === 'LAPTOP_HANDLING') {
      bobY = Math.sin(time * 2.0 + (agent.human.bobPhase || 0)) * 0.6;
    }

    // 2. Base Ground / Shadow Ellipse
    ctx.beginPath();
    this.drawEllipse(renderX, renderY + 13, 8, 3.5);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fill();

    // 3. Legs & Cyber-Boots
    const hipY = renderY + 4 + bobY;
    const footY = renderY + 13;

    if (state === 'WALKING') {
      // Left Leg & Boot (animated stride)
      const leftFootX = renderX - 3 - Math.sin(legStride) * 6;
      const leftFootY = footY - Math.max(0, Math.cos(legStride)) * 2;
      ctx.beginPath();
      ctx.moveTo(renderX - 3, hipY);
      ctx.lineTo(leftFootX, leftFootY);
      ctx.strokeStyle = '#162232';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Left Boot & Sole Glow
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(leftFootX - 2, leftFootY - 1, 4, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(leftFootX - 2, leftFootY + 1, 4, 1);

      // Right Leg & Boot (counter stride)
      const rightFootX = renderX + 3 + Math.sin(legStride) * 6;
      const rightFootY = footY - Math.max(0, -Math.cos(legStride)) * 2;
      ctx.beginPath();
      ctx.moveTo(renderX + 3, hipY);
      ctx.lineTo(rightFootX, rightFootY);
      ctx.strokeStyle = '#162232';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Right Boot & Sole Glow
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(rightFootX - 2, rightFootY - 1, 4, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(rightFootX - 2, rightFootY + 1, 4, 1);
    } else {
      // Seated / Standing in Cabin
      // Left Leg
      ctx.beginPath();
      ctx.moveTo(renderX - 3, hipY);
      ctx.lineTo(renderX - 3, footY);
      ctx.strokeStyle = '#162232';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(renderX - 5, footY - 1, 4, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(renderX - 5, footY + 1, 4, 1);

      // Right Leg
      ctx.beginPath();
      ctx.moveTo(renderX + 3, hipY);
      ctx.lineTo(renderX + 3, footY);
      ctx.strokeStyle = '#162232';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = '#0a1019';
      ctx.fillRect(renderX + 1, footY - 1, 4, 3);
      ctx.fillStyle = deptColor;
      ctx.fillRect(renderX + 1, footY + 1, 4, 1);
    }

    // 4. Torso & Tactical Cyber-Jacket
    const torsoY = renderY - 6 + bobY;
    ctx.beginPath();
    this.drawRoundedRect(renderX - 6, torsoY, 12, 10, 2);
    ctx.fillStyle = isMaster ? 'rgba(0, 40, 70, 0.95)' : 'rgba(14, 25, 40, 0.95)';
    ctx.fill();
    ctx.strokeStyle = deptColor + 'aa';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Luminescent Power Spine / Core Badge
    ctx.beginPath();
    ctx.moveTo(renderX, torsoY + 1);
    ctx.lineTo(renderX, torsoY + 9);
    ctx.strokeStyle = deptColor;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Chest Agent Number Badge (#01, #02, etc.)
    ctx.font = 'bold 5.5px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(numStr, renderX, torsoY + 7);

    // 5. Arms & Hands Kinematics
    const shoulderL = { x: renderX - 6, y: torsoY + 2 };
    const shoulderR = { x: renderX + 6, y: torsoY + 2 };

    if (state === 'WORKING') {
      // Rapid Typing Animation over Laptop Keyboard
      const speed = (agent.human && agent.human.typingSpeed) || 16;
      const typeJitterL = Math.sin(time * speed) * 1.8;
      const typeJitterR = Math.cos(time * speed * 1.2) * 1.8;

      // Left Arm typing
      const handLX = renderX - 3;
      const handLY = renderY - 1 + typeJitterL + bobY;
      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(shoulderL.x - 2, shoulderL.y + 3);
      ctx.lineTo(handLX, handLY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handLX - 1, handLY - 1, 2, 2);

      // Right Arm typing
      const handRX = renderX + 3;
      const handRY = renderY - 1 + typeJitterR + bobY;
      ctx.beginPath();
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(shoulderR.x + 2, shoulderR.y + 3);
      ctx.lineTo(handRX, handRY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handRX - 1, handRY - 1, 2, 2);

      // Keyboard Tapping Micro-Spark
      if (Math.sin(time * speed) > 0.6) {
        ctx.fillStyle = deptColor;
        ctx.fillRect(handLX - 0.5, handLY + 1, 1.5, 1.5);
      }
      if (Math.cos(time * speed * 1.2) > 0.6) {
        ctx.fillStyle = deptColor;
        ctx.fillRect(handRX - 0.5, handRY + 1, 1.5, 1.5);
      }
    } else if (state === 'LAPTOP_HANDLING') {
      // Laptop Handling: Left hand tilting screen, Right hand pointing/gesturing
      const handLX = renderX - 5;
      const handLY = renderY - 8 + Math.sin(time * 2.5) * 1.5 + bobY;

      // Left Arm gripping screen bezel
      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(shoulderL.x - 3, shoulderL.y - 3);
      ctx.lineTo(handLX, handLY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handLX - 1, handLY - 1, 2.5, 2.5);

      // Right Arm gesturing up towards telemetry HUD
      const handRX = renderX + 6 + Math.sin(time * 3) * 1.5;
      const handRY = renderY - 12 + bobY;
      ctx.beginPath();
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(shoulderR.x + 3, shoulderR.y - 4);
      ctx.lineTo(handRX, handRY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handRX - 1, handRY - 1, 2, 2);

      // Floating Diagnostic Hologram HUD above Laptop
      ctx.save();
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 0.8;
      this.drawRoundedRect(renderX - 11, renderY - 25 + bobY, 22, 10, 2);
      ctx.fill();
      ctx.stroke();
      // Mini Waveform graph
      ctx.beginPath();
      for (let wx = 0; wx < 18; wx += 2) {
        const wy = Math.sin(time * 8 + wx * 0.8) * 2.5;
        if (wx === 0) ctx.moveTo(renderX - 9 + wx, renderY - 20 + bobY + wy);
        else ctx.lineTo(renderX - 9 + wx, renderY - 20 + bobY + wy);
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
      ctx.lineTo(shoulderL.x + swingL * 0.4, shoulderL.y + 6);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(shoulderL.x + swingL * 0.4 - 1, shoulderL.y + 6, 2, 2);

      ctx.beginPath();
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(shoulderR.x + swingR * 0.4, shoulderR.y + 6);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(shoulderR.x + swingR * 0.4 - 1, shoulderR.y + 6, 2, 2);
    } else if (state === 'COLLABORATING') {
      // Collaboration: Pointing toward partner agent with laser holo-slate
      const pDir = partnerPos ? Math.sign(partnerPos.x - renderX) : 1;
      const handLX = renderX + pDir * 9;
      const handLY = renderY - 6 + bobY;

      ctx.beginPath();
      ctx.moveTo(pDir > 0 ? shoulderR.x : shoulderL.x, torsoY + 2);
      ctx.lineTo(handLX, handLY);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ffe0bd';
      ctx.fillRect(handLX - 1, handLY - 1, 2.5, 2.5);

      // Holo-Slate tablet held in hand
      ctx.fillStyle = deptColor + 'cc';
      ctx.fillRect(handLX, handLY - 3, 4, 6);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(handLX, handLY - 3, 4, 6);
    } else {
      // Resting arms / Commanding
      ctx.beginPath();
      ctx.moveTo(shoulderL.x, shoulderL.y);
      ctx.lineTo(shoulderL.x - 1, shoulderL.y + 6);
      ctx.moveTo(shoulderR.x, shoulderR.y);
      ctx.lineTo(shoulderR.x + 1, shoulderR.y + 6);
      ctx.strokeStyle = '#22344c';
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    // 6. Head & Cyber Visor
    const headY = renderY - 11 + bobY;
    // Head shape
    ctx.beginPath();
    ctx.arc(renderX, headY, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#182638';
    ctx.fill();
    ctx.strokeStyle = '#2e4258';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Cyber Visor Band
    const visorY = headY - 0.5;
    ctx.beginPath();
    this.drawRoundedRect(renderX - 4, visorY, 8, 2.8, 1);
    ctx.fillStyle = deptColor;
    ctx.fill();

    // Sweeping Visor Scanning Laser
    const scanOffset = Math.sin(time * 6 + (agent.human.bobPhase || 0)) * 2.8;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(renderX + scanOffset - 0.7, visorY, 1.4, 2.8);

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

  // Draw FRIDAY's Executive Command Suite Cabin
  drawFridayMasterCabin(pos) {
    const { screenX: x, screenY: y, screenW: w, screenH: h } = pos;
    const isSelected = this.selectedAgentId === 'friday-00';
    const time = Date.now() / 1000;

    this.ctx.save();

    // 1. Executive Suite Glass Pod Floor
    this.ctx.beginPath();
    this.drawRoundedRect(x - w / 2, y - h / 2, w, h, 8);
    this.ctx.fillStyle = isSelected ? 'rgba(0, 240, 255, 0.22)' : 'rgba(4, 18, 36, 0.85)';
    this.ctx.fill();
    this.ctx.lineWidth = isSelected ? 2 : 1.5;
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = isSelected ? 18 : 10;
    this.ctx.stroke();

    // 2. Central Floating Quantum Command Table
    this.ctx.beginPath();
    this.drawRoundedRect(x - w * 0.32, y - h * 0.24, w * 0.64, h * 0.48, 4);
    this.ctx.fillStyle = 'rgba(0, 30, 50, 0.95)';
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // 3. Central Pulsing Arc Reactor Core on Table
    const pulse = 1 + Math.sin(time * 5) * 0.15;
    this.ctx.beginPath();
    this.ctx.arc(x, y - 2, 8 * pulse, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 14;
    this.ctx.fill();

    // 4. Laptop / Master Holo-Console Screen
    this.ctx.beginPath();
    this.ctx.rect(x - 9, y - 16, 18, 10);
    this.ctx.fillStyle = 'rgba(0, 255, 200, 0.9)';
    this.ctx.shadowColor = '#00ffc8';
    this.ctx.shadowBlur = 10;
    this.ctx.fill();

    // 5. FRIDEY Master Brain Humanoid Body (AGENT-00)
    this.drawHumanoidAgent(this.ctx, x, y - 6, 1.15, this.masterBrain, true, isSelected, time, null);

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

  // Draw Individual Agent Cabin with Table, Laptop, Human Body, and Live Activity
  drawAgentCabin(pos, matchesFilter, allCabins = []) {
    const { screenX: x, screenY: y, screenW: w, screenH: h, agent } = pos;
    const isSelected = this.selectedAgentId === agent.id;
    const alpha = matchesFilter ? 1.0 : 0.22;
    const time = Date.now() / 1000;

    this.ctx.save();
    this.ctx.globalAlpha = alpha;

    // 1. Cabin Glass Walls & Border
    this.ctx.beginPath();
    this.drawRoundedRect(x - w / 2, y - h / 2, w, h, 6);
    this.ctx.fillStyle = isSelected ? `${agent.deptColor}2a` : 'rgba(5, 12, 22, 0.88)';
    this.ctx.fill();
    this.ctx.lineWidth = isSelected ? 2 : 1;
    this.ctx.strokeStyle = isSelected ? agent.deptColor : `${agent.deptColor}66`;
    if (isSelected) {
      this.ctx.shadowColor = agent.deptColor;
      this.ctx.shadowBlur = 14;
    }
    this.ctx.stroke();

    // 2. Workstation Table / Desk
    const deskW = w * 0.72;
    const deskH = h * 0.38;
    this.ctx.beginPath();
    this.drawRoundedRect(x - deskW / 2, y - deskH / 2 + 2, deskW, deskH, 3);
    this.ctx.fillStyle = 'rgba(12, 22, 38, 0.92)';
    this.ctx.fill();
    this.ctx.strokeStyle = `${agent.deptColor}44`;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // 3. Ergonomic Chair Back
    this.ctx.beginPath();
    this.ctx.arc(x, y + h * 0.32, 4, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(30, 45, 65, 0.9)';
    this.ctx.fill();

    // 4. Glowing Laptop with Dynamic Screen Tilt & Live Code Matrix
    const laptopW = 14;
    const isHandling = agent.human && agent.human.state === 'LAPTOP_HANDLING';
    const dynamicTilt = isHandling ? Math.sin(time * 2.5) * 2 : 0;
    const laptopH = 8 + dynamicTilt;

    // Laptop base on desk
    this.ctx.fillStyle = '#223044';
    this.ctx.fillRect(x - laptopW / 2, y - 1, laptopW, 3);
    // Keyboard glow
    this.ctx.fillStyle = agent.deptColor + '88';
    this.ctx.fillRect(x - laptopW / 2 + 2, y, laptopW - 4, 1);

    // Glowing Laptop Screen (Angled upright, with dynamic tilt when handling)
    this.ctx.beginPath();
    this.ctx.rect(x - laptopW / 2 + 1, y - 8 - dynamicTilt, laptopW - 2, laptopH);
    this.ctx.fillStyle = agent.deptColor;
    this.ctx.shadowColor = agent.deptColor;
    this.ctx.shadowBlur = 8;
    this.ctx.fill();

    // Animated scrolling code lines on laptop screen
    this.ctx.fillStyle = '#050c16';
    const scrollPhase = (time * 6) % 3;
    this.ctx.fillRect(x - 4, y - 7 - dynamicTilt + (scrollPhase > 1 ? 1 : 0), 8, 1);
    this.ctx.fillRect(x - 5, y - 5 - dynamicTilt, 10, 1);
    this.ctx.fillRect(x - 3, y - 3 - dynamicTilt, 6, 1);

    // 5. Procedural 3D Human Body with Walking, Working, Laptop Handling & Collaboration
    let partnerPos = null;
    if (agent.human && agent.human.collabPartnerId && Array.isArray(allCabins)) {
      const partner = allCabins.find(c => c.agent.id === agent.human.collabPartnerId);
      if (partner) {
        partnerPos = { x: partner.screenX, y: partner.screenY };
      }
    }
    this.drawHumanoidAgent(this.ctx, x, y - 2, 1.0, agent, false, isSelected, time, partnerPos);

    // 6. Cabin ID Pill at base (Strictly Unique Number, No Emoji)
    this.ctx.font = '7px monospace';
    this.ctx.fillStyle = agent.deptColor;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`CABIN-${agent.number < 10 ? '0' + agent.number : agent.number} | ${agent.status}`, x, y + h / 2 + 9);

    // 7. Mini Progress Bar
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

    // Modal Character Reference Preview Banner
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
        modalBannerImg.src = 'chareter%20refference/AGENT%20cherater%20references.webp';
        const stateStr = agent.human ? agent.human.state : 'WORKING';
        modalBannerStatePill.innerHTML = `● SOLO FOCUS WORKSTATION [${stateStr}]`;
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
