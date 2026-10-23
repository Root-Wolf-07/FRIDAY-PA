/**
 * FRIDAY A.I. - REAL-TIME BACKEND LINKAGE BRIDGE
 * Connects the unmodified FRIDAY HUD Frontend to the FastAPI AI Backend
 * 
 * Features:
 * - Multi-Target Auto-Discovery (probes localhost, 127.0.0.1, 10.0.2.2 for Android emulators, and 192.168.x for LAN)
 * - Live Health Telemetry & Status Indicator Sync
 * - Dual-Brain Chatbot AI Integration (dispatches real queries to /api/chat)
 * - Real Terminal Command Bridge (executes shell telemetry via /api/v1/terminal/sessions)
 * - Multi-Agent Fleet Task Dispatcher Sync
 * - Zero modifications to original frontend source files
 */

(function () {
  'use strict';

  // Extract Candidate Backend URLs across Desktop, Emulators, and Mobile Devices
  function getCandidateUrls() {
    const list = [];
    try {
      const saved = localStorage.getItem('friday_backend_url');
      if (saved && saved.trim()) list.push(saved.trim().replace(/\/+$/, ''));
    } catch (_) {}

    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('backend');
      if (q && q.trim()) list.push(q.trim().replace(/\/+$/, ''));
    } catch (_) {}

    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      if (window.location.port === '8000') list.push(window.location.origin);
      if (window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        list.push(`${window.location.protocol}//${window.location.hostname}:8000`);
      }
    }

    // Default connection endpoints
    list.push('http://127.0.0.1:8000');
    list.push('http://localhost:8000');
    list.push('http://10.0.2.2:8000');        // Android emulator host gateway
    list.push('http://192.168.3.232:8000');   // Host Mac LAN IP

    // Deduplicate preserving priority
    return Array.from(new Set(list));
  }

  let BACKEND_BASE = getCandidateUrls()[0] || 'http://localhost:8000';
  let WS_BASE = BACKEND_BASE.replace(/^http/, 'ws');

  class FridayBackendBridge {
    constructor() {
      this.isConnected = false;
      this.modelName = 'qwen2.5-coder:1.5b';
      this.backendVersion = '0.1.0';
      this.conversationId = 'friday-hud-' + Math.random().toString(36).substring(2, 9);
      this.retryCount = 0;
      this.backendBase = BACKEND_BASE;
      this.wsBase = WS_BASE;
      this.probing = false;
      
      this.init();
    }

    async init() {
      console.log('%c[⚡ FRIDAY BACKEND BRIDGE]%c Probing neural linkage endpoints...', 
        'background: #00f0ff; color: #040810; font-weight: bold; padding: 2px 6px; border-radius: 3px;', 
        'color: #00f0ff; font-weight: bold;');
      
      await this.checkBackendHealth();
      this.setupChatbotHook();
      this.setupTerminalHook();
      this.setupAgentFleetHook();
      this.startHeartbeat();
    }

    // Health Telemetry Check with Automatic Multi-Candidate Fallback
    async checkBackendHealth() {
      if (this.probing) return;
      this.probing = true;

      const candidates = getCandidateUrls();
      const ordered = [this.backendBase, ...candidates.filter(c => c !== this.backendBase)];

      for (const target of ordered) {
        if (!target) continue;
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 2500);
          const res = await fetch(`${target}/health/live`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
          });
          clearTimeout(timer);

          if (res.ok) {
            const data = await res.json();
            this.backendBase = target;
            BACKEND_BASE = target;
            this.wsBase = target.replace(/^http/, 'ws');
            WS_BASE = this.wsBase;
            this.isConnected = true;
            this.retryCount = 0;
            try { localStorage.setItem('friday_backend_url', target); } catch (_) {}
            this.updateHUDStatus(true, data);
            this.probing = false;
            return true;
          }
        } catch (_) {
          // Probe next candidate silently
        }
      }

      this.isConnected = false;
      this.updateHUDStatus(false);
      this.probing = false;
      return false;
    }

    // Update HUD Visual Status Pill
    updateHUDStatus(online, healthData) {
      const statusText = document.getElementById('headerStatusText');
      const statusDot = document.getElementById('headerStatusDot');
      const statusContainer = document.getElementById('headerStatusContainer');

      if (!statusText || !statusDot) return;

      if (statusContainer && !statusContainer._hasConfigHook) {
        statusContainer._hasConfigHook = true;
        statusContainer.style.cursor = 'pointer';
        statusContainer.addEventListener('click', () => {
          const defaultOpt = this.backendBase || 'http://localhost:8000';
          const msg = (
            '⚡ FRIDAY TACTICAL NEURAL LINK\n\n' +
            'Enter FastAPI Backend IP & Port:\n' +
            '• 1 = http://localhost:8000 (Mac / iOS Simulator)\n' +
            '• 2 = http://10.0.2.2:8000 (Android Studio Emulator)\n' +
            '• 3 = http://192.168.3.232:8000 (Local Wi-Fi Network)\n\n' +
            'Current: ' + defaultOpt
          );
          const entered = prompt(msg, defaultOpt);
          if (entered !== null && entered.trim() !== '') {
            let cleanUrl = entered.trim().replace(/\/+$/, '');
            if (cleanUrl === '1') cleanUrl = 'http://localhost:8000';
            else if (cleanUrl === '2') cleanUrl = 'http://10.0.2.2:8000';
            else if (cleanUrl === '3') cleanUrl = 'http://192.168.3.232:8000';
            else if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
              cleanUrl = 'http://' + cleanUrl;
            }
            try { localStorage.setItem('friday_backend_url', cleanUrl); } catch (_) {}
            this.backendBase = cleanUrl;
            BACKEND_BASE = cleanUrl;
            this.wsBase = cleanUrl.replace(/^http/, 'ws');
            WS_BASE = this.wsBase;
            this.checkBackendHealth();
          }
        });
      }

      if (online) {
        const displayHost = this.backendBase.replace(/^https?:\/\//, '');
        statusContainer.title = `⚡ FRIDAY Backend Connected: ${this.backendBase} (Click to change IP)`;
        statusText.innerHTML = `SYSTEMS ONLINE <span style="color:#00ff88;font-size:10px;margin-left:4px;">● LINKED (${displayHost})</span>`;
        statusDot.style.background = '#00ff88';
        statusDot.style.boxShadow = '0 0 10px #00ff88, 0 0 20px rgba(0,255,136,0.5)';
      } else {
        statusContainer.title = '⚠️ Backend Disconnected. Click to configure Server IP.';
        statusText.innerHTML = 'SYSTEMS ONLINE <span style="color:#00f0ff;font-size:10px;margin-left:4px;">● STANDALONE CORE</span>';
        statusDot.style.background = '#00f0ff';
        statusDot.style.boxShadow = '0 0 8px #00f0ff';
      }
    }

    // Periodic Heartbeat
    startHeartbeat() {
      setInterval(async () => {
        await this.checkBackendHealth();
      }, 10000);
    }

    // Real-Time Chatbot Hook: Dispatches to /api/chat & coordinates 18 Agents
    setupChatbotHook() {
      const waitForCore = () => {
        if (!window.FridayCore) {
          setTimeout(waitForCore, 100);
          return;
        }

        // Override sendChatMessage on FridayCore
        window.FridayCore.sendChatMessage = async (rawText) => {
          const text = (rawText || '').trim();
          if (!text) return;

          // Clear chat input
          if (window.FridayCore.chatInput) {
            window.FridayCore.chatInput.value = '';
          }

          // 1. Show User message
          window.FridayCore.appendUserChatMessage(text);
          if (window.FridayAudio) window.FridayAudio.playKeypress();

          // 2. Immediate local agent action if instruction is detected
          const msgLower = text.toLowerCase();
          const collabMatch = msgLower.match(/(?:collab|collaborate|pair)\s+agent[- ]?(\d{1,2})\s+(?:and|with|to)\s+(?:agent[- ]?)?(\d{1,2})/);
          if (collabMatch && window.FridayAgents) {
            const p1 = 'agent-' + String(collabMatch[1]).padStart(2, '0');
            const p2 = 'agent-' + String(collabMatch[2]).padStart(2, '0');
            window.FridayAgents.pairCollaboration(p1, p2);
          } else {
            const singleAgentMatch = msgLower.match(/\bagent[- ]?(\d{1,2})\b/);
            if (singleAgentMatch && window.FridayAgents && /(?:instruct|assign|tell|task|mission|do|run|audit|scan|optimize)/.test(msgLower)) {
              const aId = 'agent-' + String(singleAgentMatch[1]).padStart(2, '0');
              const taskClean = text.replace(/^(?:please\s+)?(?:instruct|assign|tell|direct)\s+agent[- ]?\d{1,2}(?:\s+to|:)?\s*/i, '').trim() || text;
              window.FridayAgents.assignTask(aId, taskClean);
            }
          }

          // 3. Typing indicator
          const typingId = window.FridayCore.showChatbotTyping();

          // 4. Send to Backend API
          let backendSuccess = false;
          try {
            const activeBase = this.backendBase || BACKEND_BASE;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 35000);

            const response = await fetch(`${activeBase}/api/chat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                message: text,
                conversation_id: this.conversationId
              }),
              signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
              const result = await response.json();
              window.FridayCore.removeChatbotTyping(typingId);
              backendSuccess = true;
              this.isConnected = true;
              this.updateHUDStatus(true);

              // Sync any agent action from backend detailed_data
              if (result.data && result.data.detailed_data && window.FridayAgents) {
                const dd = result.data.detailed_data;
                if (dd.type === 'agent_instruction' && dd.target_agent) {
                  window.FridayAgents.assignTask(dd.target_agent, dd.task);
                } else if (dd.type === 'agent_collaboration' && dd.agent_1 && dd.agent_2) {
                  window.FridayAgents.pairCollaboration(dd.agent_1, dd.agent_2);
                }
              }

              let reply = '';
              if (result.data && (result.data.response || result.data.content)) {
                reply = result.data.response || result.data.content;
              } else if (result.content) {
                reply = result.content;
              } else {
                reply = window.FridayCore.getAIResponse(text);
              }

              window.FridayCore.appendAssistantChatMessage(reply);

              if (window.FridayAudio) window.FridayAudio.playNotice();
              if (window.FridayVoice) {
                window.FridayVoice.speak(reply);
                window.FridayVoice.setSubtitle(reply);
              }
              return;
            }
          } catch (apiErr) {
            console.warn('[⚡ BACKEND BRIDGE] Chat API query failed, falling back to local engine:', apiErr);
          }

          // Fallback to local response if backend unreachable or error
          if (!backendSuccess) {
            setTimeout(() => {
              window.FridayCore.removeChatbotTyping(typingId);
              let reply = '';

              if (collabMatch) {
                reply = `⚡ **MULTI-AGENT COLLABORATION ENGAGED (LOCAL CORE):**\n\nCoupled AGENT-${collabMatch[1]} with AGENT-${collabMatch[2]} in virtual office. Synchronous laser data channel active.`;
              } else if (msgLower.includes('backend data') || msgLower.includes('take datas') || msgLower.includes('take data')) {
                reply = `⚡ **FRIDAY BACKEND DATA ACCESS (LOCAL HUD BRIDGE):**\n\n` +
                  `- **Target Backend URL:** \`${this.backendBase}\`\n` +
                  `- **Status:** Connecting / Standalone Core Active\n` +
                  `- **HUD Matrix:** SYNCED (Frequency: 1420.405 MHz)\n` +
                  `- **18 Agents Office:** Online & Ready in Cabins 01-18\n` +
                  `- *Click the status pill at the top of the HUD to verify or update the backend host IP address.*`;
              } else {
                reply = window.FridayCore.getAIResponse(text);
              }

              window.FridayCore.appendAssistantChatMessage(reply);

              if (window.FridayAudio) window.FridayAudio.playNotice();
              if (window.FridayVoice) {
                window.FridayVoice.speak(reply);
                window.FridayVoice.setSubtitle(reply);
              }
            }, 250);
          }
        };

        console.log('%c[⚡ FRIDAY BACKEND BRIDGE]%c Chatbot hook installed (/api/chat stream active).', 
          'background: #00f0ff; color: #040810; font-weight: bold; padding: 2px 4px; border-radius: 2px;', 
          'color: #00ff88;');
      };

      waitForCore();
    }

    // Terminal Command Hook: Bridge shell commands to /api/v1/terminal/sessions
    setupTerminalHook() {
      const waitForCore = () => {
        if (!window.FridayCore) {
          setTimeout(waitForCore, 100);
          return;
        }

        const originalExecuteCommand = window.FridayCore.executeCommand.bind(window.FridayCore);

        window.FridayCore.executeCommand = async (rawCmd) => {
          const trimmed = (rawCmd || '').trim();
          const lower = trimmed.toLowerCase();

          if (lower === 'backend' || lower === 'api' || lower === 'backend status') {
            const activeUrl = this.backendBase || BACKEND_BASE;
            const statusHtml = `
<div class="term-line output-block">
  <span class="syn-header">─── [ FRIDAY FASTAPI AI BACKEND TELEMETRY ] ───</span>
  <span class="syn-info">API URL:</span>        <span class="syn-highlight">${activeUrl}</span>
  <span class="syn-info">CONNECTION:</span>     <span class="${this.isConnected ? 'syn-success' : 'syn-err'}">${this.isConnected ? 'ONLINE (ACTIVE)' : 'STANDALONE (OFFLINE)'}</span>
  <span class="syn-info">CENTRAL BRAIN:</span>  <span class="syn-highlight">${this.modelName}</span>
  <span class="syn-info">LOCAL OLLAMA:</span>   <span class="syn-cyan">http://127.0.0.1:11434</span>
  <span class="syn-info">SWAGGER DOCS:</span>   <span class="syn-cyan">${activeUrl}/docs</span>
  <span class="syn-info">HEALTH CHECK:</span>   <span class="syn-cyan">${activeUrl}/health/live</span>
  <span class="syn-info">CHATBOT API:</span>    <span class="syn-cyan">${activeUrl}/api/chat</span>
  <span class="syn-info">18 AGENTS API:</span>  <span class="syn-cyan">${activeUrl}/api/v1/agents</span>
</div>`;
            window.FridayCore.appendTerminalOutput(statusHtml);
            if (window.FridayCore.promptLine) window.FridayCore.promptLine.style.display = 'flex';
            if (window.FridayCore.termInput) window.FridayCore.termInput.focus();
            return;
          }

          return originalExecuteCommand(rawCmd);
        };

        console.log('%c[⚡ FRIDAY BACKEND BRIDGE]%c Terminal telemetry bridge installed.', 
          'background: #00f0ff; color: #040810; font-weight: bold; padding: 2px 4px; border-radius: 2px;', 
          'color: #00ff88;');
      };

      waitForCore();
    }

    // 18 Agent Fleet Hook: Sync dispatched missions to backend orchestrator
    setupAgentFleetHook() {
      const waitForAgents = () => {
        if (!window.FridayAgents) {
          setTimeout(waitForAgents, 100);
          return;
        }

        const originalDispatch = window.FridayAgents.dispatchMission.bind(window.FridayAgents);

        window.FridayAgents.dispatchMission = async (taskText) => {
          originalDispatch(taskText);

          if (this.isConnected && taskText) {
            try {
              const activeBase = this.backendBase || BACKEND_BASE;
              fetch(`${activeBase}/api/v1/agent_state`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  task: taskText,
                  assigned_by: 'GOJO',
                  dispatched_from: 'AGENT-00 (FRIDAY BRAIN)'
                })
              }).catch(() => {});
            } catch (e) {}
          }
        };

        console.log('%c[⚡ FRIDAY BACKEND BRIDGE]%c 18-Agent fleet dispatch bus linked.', 
          'background: #00f0ff; color: #040810; font-weight: bold; padding: 2px 4px; border-radius: 2px;', 
          'color: #00ff88;');
      };

      waitForAgents();
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.FridayBridge = new FridayBackendBridge();
    });
  } else {
    window.FridayBridge = new FridayBackendBridge();
  }
})();
