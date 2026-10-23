/**
 * FRIDEY Voice Engine (Multilingual: English, Tamil, Malayalam)
 * Speech-to-Text (Recognition) & Text-to-Speech (Synthesis)
 * Owned & Founded by GOJO.
 */

class FridayVoiceEngine {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
    this.isSpeaking = false;
    this.availableVoices = [];
    this.femaleVoices = [];
    this.selectedVoice = null;
    this.femaleOnlyFilter = true;

    // Active Language: 'en-US' | 'ta-IN' | 'ml-IN'
    this.currentLanguage = localStorage.getItem('friday_language') || 'en-US';

    // Clear legacy voice preference if set to Moira
    try {
      const savedVoice = localStorage.getItem('friday_preferred_voice_' + this.currentLanguage);
      if (savedVoice && savedVoice.toLowerCase().includes('moira')) {
        localStorage.removeItem('friday_preferred_voice_' + this.currentLanguage);
      }
    } catch (e) {}

    // Default vocal parameters (Refined, silky natural female AI cadence)
    this.pitch = 1.04;
    this.rate = 1.00;
    this.volume = 1.0;

    // Full System Microphone Hardware & Audio Analyser
    this.micStream = null;
    this.audioCtx = null;
    this.analyser = null;
    this.micSource = null;
    this.freqData = null;
    this.activeRmsLevel = 0;
    this.isMicHardwareActive = false;
    this.isMicMuted = false;
    this.isMicBlockedTemporarily = false;
    this.micPermissionState = 'prompt';
    this.selectedDeviceId = localStorage.getItem('friday_mic_device') || '';
    this.availableAudioInputs = [];
    this.continuousListening = localStorage.getItem('friday_continuous_listening') === 'true';
    this.isListeningDesired = false;
    this.rafVuId = null;

    this.onResultCallback = null;
    this.onStateChangeCallback = null;

    this.initSynthesis();
    this.initRecognition();
    this.checkMicPermission();
  }

  /**
   * Comprehensive female voice detector across macOS, Windows, Chrome, Edge, iOS & Android
   * Supports English, Tamil, and Malayalam voice profiles
   */
  isFemaleVoice(voice) {
    if (!voice) return false;
    const name = (voice.name || '').toLowerCase();
    const lang = (voice.lang || '').toLowerCase();

    // Strict male voice blacklist (reject immediately across all supported languages)
    const maleNames = [
      'alex', 'daniel', 'fred', 'david', 'george', 'oliver', 'rishi', 'mark',
      'tom', 'james', 'guy', 'alva', 'diego', 'jorge', 'juan', 'thomas',
      'bruce', 'ralph', 'junior', 'albert', 'deranged', 'cellos', 'bad news',
      'bahh', 'bells', 'boing', 'bubbles', 'good news', 'hysterical', 'pipe organ',
      'trinoids', 'whisper', 'zarvox', 'lee', 'eddy', 'reed', 'rocko', 'grandpa',
      'alec', 'michaels', 'stefan', 'yuri', 'nicolas', 'magnus', 'henrik', 'male',
      // Tamil male voices
      'guhan', 'valluvar',
      // Malayalam male voices
      'midhun', 'santhosh'
    ];

    for (const m of maleNames) {
      const regex = new RegExp(`\\b${m}\\b`, 'i');
      if (regex.test(name)) {
        return false;
      }
    }

    // Explicit gender attribute or keyword in name
    if (name.includes('female') || name.includes('woman') || name.includes('girl')) {
      return true;
    }

    // Known female voice names across English, Tamil, and Malayalam
    const knownFemaleNames = [
      // Tamil female voices
      'vani',       // macOS Tamil female (ta_IN)
      'pallavi',    // Microsoft Tamil female
      'saranya',    // Microsoft Tamil female
      'inba',       // Tamil female
      'latha',      // Tamil female
      'tamil',      // Google Tamil female

      // Malayalam female voices
      'sobhana',    // Microsoft Malayalam female
      'ammu',       // Malayalam female
      'arya',       // Malayalam female
      'malayalam',  // Google Malayalam female

      // English / International female voices
      'moira',      // macOS Irish female (MCU F.R.I.D.A.Y.)
      'samantha',   // macOS English female
      'karen',      // macOS/Windows Australian female
      'kathy',      // macOS English female
      'tessa',      // macOS South African female
      'flo',        // macOS English female (UK)
      'sandy',      // macOS English female (UK)
      'shelley',    // macOS English female (UK)
      'grandma',    // macOS English female
      'victoria',   // macOS US female
      'fiona',      // macOS Scottish/Irish female
      'ava',        // macOS Premium female
      'allison',    // macOS US female
      'susan',      // macOS/Windows US female
      'zoe',        // macOS female
      'kate',       // macOS UK female
      'serena',     // macOS UK female
      'stephanie',  // macOS female
      'veena',      // Indian English female
      'sangeeta',   // Indian English female
      'heera',      // Indian English female
      'priya',      // Indian English female
      'zira',       // Windows US female
      'jenny',      // Microsoft Edge Natural female
      'aria',       // Microsoft Edge Natural female
      'sonia',      // Microsoft Edge UK female
      'libby',      // Microsoft Edge UK female
      'maisie',     // Microsoft Edge UK female
      'hazel',      // Windows UK female
      'clara',      // Canadian female
      'emma',       // British female
      'olivia',     // Australian female
      'amelie',     // French female
      'anna',       // German female
      'helena',     // Spanish female
      'monica',     // Spanish female
      'siri',       // Apple Siri female
      'catherine'   // Australian female
    ];

    for (const f of knownFemaleNames) {
      if (name.includes(f)) {
        return true;
      }
    }

    return false;
  }

  initSynthesis() {
    if (!this.synthesis) {
      console.warn('SpeechSynthesis is not supported in this environment.');
      return;
    }

    const loadVoices = () => {
      this.availableVoices = this.synthesis.getVoices();
      if (this.availableVoices.length > 0) {
        this.femaleVoices = this.availableVoices.filter(v => this.isFemaleVoice(v));
        this.selectBestFridayVoice();
        this.populateVoiceSelect();
      }
    };

    loadVoices();
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Selects the best voice for the currently active language (English, Tamil, or Malayalam)
   */
  selectBestFridayVoice() {
    if (this.availableVoices.length === 0) return;

    // Check saved preference first
    const savedVoiceName = localStorage.getItem('friday_preferred_voice_' + this.currentLanguage);
    if (savedVoiceName) {
      const saved = this.availableVoices.find(v => v.name === savedVoiceName);
      if (saved) {
        this.selectedVoice = saved;
        return;
      }
    }

    // ==========================================
    // 1. TAMIL (தமிழ்) Voice Selection
    // ==========================================
    if (this.currentLanguage.startsWith('ta')) {
      // 1a. Preferred Tamil Female Voices: Vani (macOS), Pallavi, Saranya, Inba, Google தமிழ்
      const tamilFemale = this.availableVoices.find(v => 
        (v.name.toLowerCase().includes('vani') ||
         v.name.toLowerCase().includes('pallavi') ||
         v.name.toLowerCase().includes('saranya') ||
         v.name.toLowerCase().includes('inba') ||
         v.name.includes('தமிழ்') ||
         (v.lang.toLowerCase().startsWith('ta') && this.isFemaleVoice(v)))
      );
      if (tamilFemale) {
        this.selectedVoice = tamilFemale;
        return;
      }

      // 1b. Any Tamil voice
      const anyTamil = this.availableVoices.find(v => 
        v.lang.toLowerCase().startsWith('ta') || v.name.toLowerCase().includes('tamil')
      );
      if (anyTamil) {
        this.selectedVoice = anyTamil;
        return;
      }

      // 1c. If no Tamil voice on system, use Indian English female voice with Tamil phonetic support
      const indianFemale = this.availableVoices.find(v => 
        (v.lang.toLowerCase().includes('in') && this.isFemaleVoice(v)) ||
        v.name.toLowerCase().includes('veena') ||
        v.name.toLowerCase().includes('heera')
      );
      if (indianFemale) {
        this.selectedVoice = indianFemale;
        return;
      }
    }

    // ==========================================
    // 2. MALAYALAM (മലയാളം) Voice Selection
    // ==========================================
    if (this.currentLanguage.startsWith('ml')) {
      // 2a. Preferred Malayalam Female Voices: Sobhana, Ammu, Arya, Google മലയാളം
      const malayalamFemale = this.availableVoices.find(v => 
        (v.name.toLowerCase().includes('sobhana') ||
         v.name.toLowerCase().includes('ammu') ||
         v.name.toLowerCase().includes('arya') ||
         v.name.includes('മലയാളം') ||
         (v.lang.toLowerCase().startsWith('ml') && this.isFemaleVoice(v)))
      );
      if (malayalamFemale) {
        this.selectedVoice = malayalamFemale;
        return;
      }

      // 2b. Any Malayalam voice
      const anyMalayalam = this.availableVoices.find(v => 
        v.lang.toLowerCase().startsWith('ml') || v.name.toLowerCase().includes('malayalam')
      );
      if (anyMalayalam) {
        this.selectedVoice = anyMalayalam;
        return;
      }

      // 2c. Fallback to Indian English female voice
      const indianFemale = this.availableVoices.find(v => 
        (v.lang.toLowerCase().includes('in') && this.isFemaleVoice(v)) ||
        v.name.toLowerCase().includes('veena') ||
        v.name.toLowerCase().includes('heera')
      );
      if (indianFemale) {
        this.selectedVoice = indianFemale;
        return;
      }
    }

    // ==========================================
    // 3. ENGLISH (F.R.I.D.A.Y. Female AI) Voice Selection
    // ==========================================
    // 3a. Preferred crystal-clear Natural Female AI Voices (Samantha, Ava, Karen, Victoria, Jenny, Aria, etc.)
    const premierFemaleNames = [
      'samantha',   // macOS US Natural AI Female (Apple crystal-clear Siri standard)
      'ava',        // macOS Premium Natural Female
      'karen',      // macOS Australian Female
      'victoria',   // macOS US Classic Female
      'jenny',      // Microsoft Edge Natural Female
      'aria',       // Microsoft Edge Natural Female
      'tessa',      // South African Female
      'sandy',      // UK Female
      'shelley',    // UK Female
      'kathy',      // US Female
      'fiona',      // Scottish/Irish Female
      'moira'       // Irish Female
    ];

    for (const fn of premierFemaleNames) {
      const match = this.availableVoices.find(v => 
        v.name.toLowerCase().includes(fn) && this.isFemaleVoice(v)
      );
      if (match) {
        this.selectedVoice = match;
        this.pitch = 1.04;
        this.rate = 1.00;
        return;
      }
    }

    // 3b. British / Commonwealth female voices
    const commonwealthFemale = this.availableVoices.find(v => 
      this.isFemaleVoice(v) && (
        v.name.toLowerCase().includes('uk english female') ||
        v.name.toLowerCase().includes('flo') ||
        v.name.toLowerCase().includes('sonia') ||
        v.name.toLowerCase().includes('libby') ||
        (v.lang.toLowerCase().includes('en-gb') && this.isFemaleVoice(v))
      )
    );
    if (commonwealthFemale) {
      this.selectedVoice = commonwealthFemale;
      return;
    }

    // 3c. Any detected English female voice
    const anyEnglishFemale = this.availableVoices.find(v => 
      v.lang.toLowerCase().startsWith('en') && this.isFemaleVoice(v)
    );
    if (anyEnglishFemale) {
      this.selectedVoice = anyEnglishFemale;
      return;
    }

    // 3d. Any detected female voice
    const anyFemale = this.femaleVoices[0];
    if (anyFemale) {
      this.selectedVoice = anyFemale;
      return;
    }

    // 3e. Fallback: non-male English voice with adjusted pitch
    const nonMaleEnglish = this.availableVoices.find(v => 
      v.lang.toLowerCase().startsWith('en') && this.isFemaleVoice(v) !== false
    );
    this.selectedVoice = nonMaleEnglish || this.availableVoices[0];
    this.pitch = 1.15;
  }

  /**
   * Cycle to the next available female voice profile
   */
  cycleFemaleVoice() {
    if (this.availableVoices.length === 0) return null;
    let list = this.availableVoices.filter(v => this.isFemaleVoice(v));
    const currentLangMatches = list.filter(v => {
      if (this.currentLanguage.startsWith('ta')) return v.lang.toLowerCase().startsWith('ta');
      if (this.currentLanguage.startsWith('ml')) return v.lang.toLowerCase().startsWith('ml');
      return v.lang.toLowerCase().startsWith('en');
    });
    if (currentLangMatches.length > 0) list = currentLangMatches;
    if (list.length === 0) list = this.availableVoices;

    let currentIndex = list.indexOf(this.selectedVoice);
    let nextIndex = (currentIndex + 1) % list.length;
    this.selectedVoice = list[nextIndex];
    localStorage.setItem('friday_preferred_voice_' + this.currentLanguage, this.selectedVoice.name);

    const select = document.getElementById('voiceSelect');
    if (select) {
      const voiceIndex = this.availableVoices.indexOf(this.selectedVoice);
      if (voiceIndex !== -1) select.value = voiceIndex;
    }

    if (window.FridayAudio) window.FridayAudio.playClick();
    this.speak(`Voice matrix updated to ${this.selectedVoice.name}, Gojo.`);
    if (window.FridayCore) {
      window.FridayCore.showToast(`Active Voice: ${this.selectedVoice.name}`);
    }
    return this.selectedVoice;
  }

  populateVoiceSelect() {
    const select = document.getElementById('voiceSelect');
    if (!select) return;

    select.innerHTML = '';

    // Target Language Group
    const optGroupTarget = document.createElement('optgroup');
    if (this.currentLanguage.startsWith('ta')) {
      optGroupTarget.label = '🇮🇳 தமிழ் (Tamil) பெண் குரல்கள் - FRIDEY';
    } else if (this.currentLanguage.startsWith('ml')) {
      optGroupTarget.label = '🇮🇳 മലയാളം (Malayalam) ശബ്ദങ്ങൾ - FRIDEY';
    } else {
      optGroupTarget.label = '🌟 FRIDEY Female Voices (Recommended)';
    }

    // All Other Female Voices
    const optGroupFemale = document.createElement('optgroup');
    optGroupFemale.label = '👩 Other Female Voices';

    // Other System Voices
    const optGroupOther = document.createElement('optgroup');
    optGroupOther.label = '🌐 Other System Voices';

    const priorityMarkers = ['moira', 'samantha', 'karen', 'tessa', 'flo', 'sandy', 'shelley', 'fiona', 'uk english female', 'kathy', 'victoria', 'vani', 'pallavi', 'saranya', 'sobhana', 'ammu', 'arya'];

    this.availableVoices.forEach((voice, index) => {
      const isFemale = this.isFemaleVoice(voice);
      const isTamil = voice.lang.toLowerCase().startsWith('ta') || voice.name.toLowerCase().includes('tamil') || voice.name.includes('தமிழ்');
      const isMalayalam = voice.lang.toLowerCase().startsWith('ml') || voice.name.toLowerCase().includes('malayalam') || voice.name.includes('മലയാളം');
      const isTargetLang = (this.currentLanguage.startsWith('ta') && isTamil) ||
                           (this.currentLanguage.startsWith('ml') && isMalayalam) ||
                           (this.currentLanguage.startsWith('en') && voice.lang.toLowerCase().startsWith('en'));

      // If female-only filter is on, filter non-female voices
      if (this.femaleOnlyFilter && !isFemale && !isTamil && !isMalayalam) {
        return;
      }

      const opt = document.createElement('option');
      opt.value = index;

      let tag = '';
      if (isTamil) tag = ' [தமிழ் • Tamil]';
      else if (isMalayalam) tag = ' [മലയാളം • Malayalam]';
      else if (voice.name.toLowerCase().includes('moira')) tag = ' [MCU Irish Female]';
      else if (isFemale && voice.lang.toLowerCase().includes('gb')) tag = ' [UK Female]';
      else if (isFemale && voice.lang.toLowerCase().includes('au')) tag = ' [AU Female]';
      else if (isFemale && voice.lang.toLowerCase().includes('za')) tag = ' [ZA Female]';
      else if (isFemale) tag = ' [Female]';

      opt.textContent = `${voice.name} (${voice.lang})${tag}${voice === this.selectedVoice ? ' ★ [ACTIVE]' : ''}`;
      if (voice === this.selectedVoice) {
        opt.selected = true;
      }

      if (isTargetLang) {
        optGroupTarget.appendChild(opt);
      } else if (isFemale) {
        optGroupFemale.appendChild(opt);
      } else {
        optGroupOther.appendChild(opt);
      }
    });

    if (optGroupTarget.children.length > 0) select.appendChild(optGroupTarget);
    if (optGroupFemale.children.length > 0) select.appendChild(optGroupFemale);
    if (!this.femaleOnlyFilter && optGroupOther.children.length > 0) select.appendChild(optGroupOther);

    select.onchange = (e) => {
      const chosen = this.availableVoices[e.target.value];
      if (chosen) {
        this.selectedVoice = chosen;
        localStorage.setItem('friday_preferred_voice_' + this.currentLanguage, chosen.name);
        if (window.FridayAudio) window.FridayAudio.playClick();
        
        let confirmText = "FRIDEY vocal matrix re-calibrated, Gojo.";
        if (this.currentLanguage.startsWith('ta')) confirmText = "குரல் அமைப்பு மாற்றப்பட்டது, கோஜோ.";
        else if (this.currentLanguage.startsWith('ml')) confirmText = "ശബ്ദ സംവിധാനം മാറ്റി, ഗോജോ.";

        this.speak(confirmText);
        if (window.FridayCore) {
          window.FridayCore.showToast(`Voice Set: ${chosen.name}`);
        }
      }
    };

    this.setupDOMListeners();
  }

  setupDOMListeners() {
    // Female filter toggle
    const chk = document.getElementById('chkFemaleOnly');
    if (chk && !chk._bound) {
      chk._bound = true;
      chk.checked = this.femaleOnlyFilter;
      chk.addEventListener('change', (e) => {
        this.toggleFemaleOnlyFilter(e.target.checked);
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    }

    // Test Voice button
    const testBtn = document.getElementById('btnTestVoice');
    if (testBtn && !testBtn._bound) {
      testBtn._bound = true;
      testBtn.addEventListener('click', () => {
        this.testVoice();
      });
    }

    // Change / Cycle Voice button
    const cycleBtn = document.getElementById('btnCycleVoice');
    if (cycleBtn && !cycleBtn._bound) {
      cycleBtn._bound = true;
      cycleBtn.addEventListener('click', () => {
        this.cycleFemaleVoice();
      });
    }

    // Language dropdowns synchronization
    const headerLang = document.getElementById('langSelect');
    const drawerLang = document.getElementById('drawerLangSelect');

    const handleLangChange = (newLang) => {
      this.setLanguage(newLang, true);
    };

    if (headerLang && !headerLang._bound) {
      headerLang._bound = true;
      headerLang.value = this.currentLanguage;
      headerLang.addEventListener('change', (e) => handleLangChange(e.target.value));
    }

    if (drawerLang && !drawerLang._bound) {
      drawerLang._bound = true;
      drawerLang.value = this.currentLanguage;
      drawerLang.addEventListener('change', (e) => handleLangChange(e.target.value));
    }

    // Continuous always-listening checkbox
    const chkCont = document.getElementById('chkContinuousListen');
    if (chkCont && !chkCont._bound) {
      chkCont._bound = true;
      chkCont.checked = this.continuousListening;
      chkCont.addEventListener('change', (e) => {
        this.toggleContinuousListening(e.target.checked);
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    }

    // Microphone device selection
    const micDevSelect = document.getElementById('micDeviceSelect');
    if (micDevSelect && !micDevSelect._bound) {
      micDevSelect._bound = true;
      micDevSelect.addEventListener('change', (e) => {
        this.setAudioInputDevice(e.target.value);
        if (window.FridayAudio) window.FridayAudio.playClick();
      });
    }

    // Direct Grant Full Mic Access Button
    const btnReqMic = document.getElementById('btnRequestMicAccess');
    if (btnReqMic && !btnReqMic._bound) {
      btnReqMic._bound = true;
      btnReqMic.addEventListener('click', () => {
        this.setMicMuted(false);
        if (window.FridayAudio) window.FridayAudio.playBootSequence();
      });
    }
  }

  setLanguage(langCode, speakConfirmation = true) {
    this.currentLanguage = langCode;
    localStorage.setItem('friday_language', langCode);

    // Sync dropdown values
    const headerLang = document.getElementById('langSelect');
    const drawerLang = document.getElementById('drawerLangSelect');
    if (headerLang) headerLang.value = langCode;
    if (drawerLang) drawerLang.value = langCode;

    // Update speech recognition language
    if (this.recognition) {
      this.recognition.lang = langCode;
    }

    // Re-select and populate voices
    this.selectBestFridayVoice();
    this.populateVoiceSelect();

    // Update suggestions chips in core UI
    if (window.FridayCore && typeof window.FridayCore.updateSuggestionChips === 'function') {
      window.FridayCore.updateSuggestionChips(langCode);
    }

    if (window.FridayAudio) window.FridayAudio.playNotice();

    // Native language confirmation speech
    if (speakConfirmation) {
      let announcement = "FRIDEY English vocal matrix active, Gojo.";
      let toastMsg = "Language: ENGLISH";

      if (langCode === 'ta-IN') {
        announcement = "வணக்கம் கோஜோ! FRIDEY தமிழ் குரல் அமைப்பு தயார். அனைத்து அமைப்புகளும் செயல்படுகின்றன.";
        toastMsg = "மொழி: தமிழ் (TAMIL)";
      } else if (langCode === 'ml-IN') {
        announcement = "നമസ്കാരം ഗോജോ! FRIDEY മലയാളം ശബ്ദ സംവിധാനം സജ്ജമാണ്. എല്ലാ സിസ്റ്റങ്ങളും കൃത്യമായി പ്രവർത്തിക്കുന്നു.";
        toastMsg = "ഭാഷ: മലയാളം (MALAYALAM)";
      }

      this.speak(announcement);
      if (window.FridayCore) {
        window.FridayCore.showToast(toastMsg);
      }
    }
  }

  toggleFemaleOnlyFilter(enabled) {
    this.femaleOnlyFilter = enabled;
    this.populateVoiceSelect();
  }

  testVoice() {
    const voiceName = this.selectedVoice ? this.selectedVoice.name : 'System';
    let text = `FRIDEY female vocal matrix online. Using ${voiceName}. All systems nominal, Gojo.`;

    if (this.currentLanguage.startsWith('ta')) {
      text = `FRIDEY தமிழ் குரல் சோதனை வெற்றி. கோஜோ, நான் உங்களுக்கு உதவ தயாராக உள்ளேன். (${voiceName})`;
    } else if (this.currentLanguage.startsWith('ml')) {
      text = `FRIDEY മലയാളം ശബ്ദ പരിശോധന പൂർത്തിയായി. ഗോജോ, ഞാൻ താങ്കളെ സഹായിക്കാൻ സജ്ജമാണ്. (${voiceName})`;
    }

    if (window.FridayAudio) window.FridayAudio.playNotice();
    this.speak(text);
    if (window.FridayCore) {
      window.FridayCore.showToast(`Testing Voice: ${voiceName}`);
    }
  }

  // ==========================================
  // Full System Microphone Hardware & Permissions
  // ==========================================

  async checkMicPermission() {
    if (navigator.permissions && navigator.permissions.query) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
        this.updateMicPermissionUI(permissionStatus.state);
        permissionStatus.onchange = () => {
          this.updateMicPermissionUI(permissionStatus.state);
          if (permissionStatus.state === 'granted') {
            this.initHardwareMic(false);
          }
        };
        if (permissionStatus.state === 'granted') {
          this.initHardwareMic(false);
        }
      } catch {
        if (localStorage.getItem('friday_mic_authorized') === 'true') {
          this.initHardwareMic(false);
        }
      }
    } else if (localStorage.getItem('friday_mic_authorized') === 'true') {
      this.initHardwareMic(false);
    }
  }

  updateMicPermissionUI(state) {
    this.micPermissionState = state;
    const badge = document.getElementById('micStatusBadge');
    if (!badge) return;
    badge.className = 'mic-badge ' + (state === 'granted' ? 'granted' : (state === 'denied' || state === 'blocked' ? 'denied blocked' : 'prompt'));
    if (state === 'granted') {
      badge.textContent = 'ONLINE / GRANTED';
    } else if (state === 'blocked') {
      badge.textContent = 'TEMPORARILY BLOCKED';
    } else if (state === 'denied') {
      badge.textContent = 'ACCESS BLOCKED';
    } else {
      badge.textContent = 'STANDBY / PROMPT';
    }
  }

  async initHardwareMic(triggerPermissionPrompt = false) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('getUserMedia is not supported on this browser.');
      this.updateMicPermissionUI('denied');
      return false;
    }

    try {
      if (this.micStream) {
        try {
          this.micStream.getTracks().forEach(t => t.stop());
        } catch (e) {}
        this.micStream = null;
      }

      const constraints = {
        audio: {
          deviceId: this.selectedDeviceId ? { exact: this.selectedDeviceId } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };

      this.micStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.isMicHardwareActive = true;
      this.isMicBlockedTemporarily = false;
      this.isMicMuted = false;
      this.updateMicPermissionUI('granted');
      localStorage.setItem('friday_mic_authorized', 'true');

      // Set up Web Audio Analyser
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        if (!this.audioCtx) {
          this.audioCtx = new AudioContextClass();
        }
        if (this.audioCtx.state === 'suspended') {
          await this.audioCtx.resume();
        }

        if (this.micSource) {
          try { this.micSource.disconnect(); } catch (e) {}
        }
        this.micSource = this.audioCtx.createMediaStreamSource(this.micStream);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.6;
        this.micSource.connect(this.analyser);
        this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

        this.startVuMonitoring();
      }

      await this.enumerateInputDevices();

      if (triggerPermissionPrompt && window.FridayCore) {
        window.FridayCore.showToast('Full system microphone connected, Gojo.');
      }

      return true;
    } catch (err) {
      console.warn('Microphone hardware access error:', err);
      this.isMicHardwareActive = false;
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.updateMicPermissionUI('denied');
        if (window.FridayCore) {
          window.FridayCore.showToast('Microphone access blocked. Please allow mic in browser permissions.');
        }
      }
      return false;
    }
  }

  startVuMonitoring() {
    if (this.rafVuId) cancelAnimationFrame(this.rafVuId);

    const vuMini = document.getElementById('micMiniVu');
    const levelFill = document.getElementById('micLevelFill');
    const rmsValEl = document.getElementById('micRmsVal');
    const bars = vuMini ? vuMini.querySelectorAll('.vu-bar') : [];

    const sample = () => {
      if (this.isMicBlockedTemporarily || !this.isMicHardwareActive || !this.micStream) {
        this.activeRmsLevel = 0;
        if (bars.length) {
          bars.forEach(b => {
            b.style.height = '4px';
            b.classList.remove('lit-1', 'lit-2', 'lit-3');
          });
        }
        if (levelFill) levelFill.style.width = '0%';
        if (rmsValEl) rmsValEl.textContent = '0% (BLOCKED)';
        return;
      }

      if (this.analyser && this.isMicHardwareActive && this.freqData) {
        this.analyser.getByteFrequencyData(this.freqData);
        let sum = 0;
        for (let i = 0; i < this.freqData.length; i++) {
          sum += this.freqData[i];
        }
        const avg = sum / this.freqData.length;
        const normalized = Math.min(1, avg / 128); // 0.0 to 1.0
        this.activeRmsLevel = normalized;

        // Update Header mini VU bars
        if (bars.length >= 3) {
          bars[0].style.height = (4 + normalized * 12) + 'px';
          bars[1].style.height = (4 + normalized * 14) + 'px';
          bars[2].style.height = (4 + normalized * 16) + 'px';

          if (normalized > 0.04) bars[0].classList.add('lit-1');
          else bars[0].classList.remove('lit-1');

          if (normalized > 0.18) bars[1].classList.add('lit-2');
          else bars[1].classList.remove('lit-2');

          if (normalized > 0.38) bars[2].classList.add('lit-3');
          else bars[2].classList.remove('lit-3');
        }

        // Update settings drawer fill
        if (levelFill) {
          levelFill.style.width = (normalized * 100).toFixed(0) + '%';
        }
        if (rmsValEl) {
          rmsValEl.textContent = (normalized * 100).toFixed(0) + '%';
        }
      } else {
        this.activeRmsLevel = 0;
        if (bars.length) {
          bars.forEach(b => {
            b.style.height = '4px';
            b.classList.remove('lit-1', 'lit-2', 'lit-3');
          });
        }
        if (levelFill) levelFill.style.width = '0%';
        if (rmsValEl) rmsValEl.textContent = '0%';
      }

      if (!this.isMicBlockedTemporarily && this.isMicHardwareActive) {
        this.rafVuId = requestAnimationFrame(sample);
      }
    };

    this.rafVuId = requestAnimationFrame(sample);
  }

  async enumerateInputDevices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableAudioInputs = devices.filter(d => d.kind === 'audioinput');
      const select = document.getElementById('micDeviceSelect');
      if (!select) return;

      select.innerHTML = '';
      const defaultOpt = document.createElement('option');
      defaultOpt.value = '';
      defaultOpt.textContent = 'Default System Microphone';
      select.appendChild(defaultOpt);

      this.availableAudioInputs.forEach((dev, idx) => {
        const opt = document.createElement('option');
        opt.value = dev.deviceId;
        opt.textContent = dev.label || `System Microphone ${idx + 1}`;
        if (this.selectedDeviceId === dev.deviceId) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });
    } catch (e) {
      console.warn('Error enumerating audio devices:', e);
    }
  }

  async setAudioInputDevice(deviceId) {
    this.selectedDeviceId = deviceId;
    localStorage.setItem('friday_mic_device', deviceId);
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
    }
    await this.initHardwareMic(true);
    if (window.FridayCore) {
      window.FridayCore.showToast('Audio input switched to selected device.');
    }
  }

  getRealMicFrequencyData() {
    if (this.analyser && this.isMicHardwareActive && this.freqData) {
      this.analyser.getByteFrequencyData(this.freqData);
      return this.freqData;
    }
    return null;
  }

  getMicRmsLevel() {
    return this.activeRmsLevel;
  }

  isHardwareMicActive() {
    return !this.isMicBlockedTemporarily && this.isMicHardwareActive && !!this.micStream && this.micStream.active;
  }

  toggleContinuousListening(enabled) {
    this.continuousListening = enabled;
    localStorage.setItem('friday_continuous_listening', enabled);
    if (this.recognition) {
      this.recognition.continuous = enabled;
    }
    if (window.FridayCore) {
      window.FridayCore.showToast(`Always-Listening: ${enabled ? 'ACTIVE' : 'OFF'}`);
    }
  }

  initRecognition() {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      console.warn('SpeechRecognition API not available in this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = this.continuousListening;
      this.recognition.interimResults = true;
      this.recognition.lang = this.currentLanguage;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateState('listening');
        if (window.FridayAudio) window.FridayAudio.playMicOn();

        let listeningHint = 'Listening for your command...';
        if (this.currentLanguage.startsWith('ta')) listeningHint = 'உங்கள் கட்டளைக்காக காத்திருக்கிறேன்...';
        else if (this.currentLanguage.startsWith('ml')) listeningHint = 'നിങ്ങളുടെ നിർദ്ദേശത്തിനായി കാത്തിരിക്കുന്നു...';

        this.setSubtitle(listeningHint);
      };

      this.recognition.onresult = (event) => {
        let transcript = '';
        let isFinal = false;
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const piece = event.results[i][0].transcript;
          transcript += piece;
          if (event.results[i].isFinal) {
            finalTranscript += piece;
            isFinal = true;
          }
        }

        this.setSubtitle(transcript);

        if (isFinal && finalTranscript.trim()) {
          if (this.onResultCallback) {
            this.onResultCallback(finalTranscript.trim());
          }
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          this.isListening = false;
          this.isListeningDesired = false;
          this.updateState('idle');
          this.updateMicPermissionUI('denied');
          this.setSubtitle('Microphone access blocked. Click mic icon to grant.');
        } else if (event.error === 'no-speech') {
          // If in continuous mode, gently continue
          if (this.continuousListening && this.isListeningDesired && !this.isSpeaking) {
            // Keep status listening
          } else {
            this.setSubtitle('Voice standby...');
          }
        } else {
          this.setSubtitle('Voice capture paused.');
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;

        // Auto-restart if continuous mode is enabled and user hasn't explicitly stopped it or blocked mic
        if (this.continuousListening && this.isListeningDesired && !this.isSpeaking && !this.isMicMuted && !this.isMicBlockedTemporarily) {
          setTimeout(() => {
            if (this.isListeningDesired && !this.isSpeaking && !this.isMicMuted && !this.isMicBlockedTemporarily) {
              try {
                this.recognition.start();
              } catch (e) {
                this.updateState('idle');
              }
            }
          }, 250);
        } else {
          if (!this.isSpeaking) {
            this.updateState('idle');
          }
          if (window.FridayAudio) window.FridayAudio.playMicOff();
        }
      };
    } catch (err) {
      console.warn('Failed to initialize speech recognition:', err);
    }
  }

  /**
   * Block or unblock microphone hardware access
   * When muted/off: completely stops all media tracks, releases the microphone from OS/browser,
   * disconnects Web Audio nodes, halts VU monitoring, resets visual levels, and aborts speech recognition.
   * When unmuted/on: re-requests hardware getUserMedia stream, reconnects Web Audio analyser,
   * restarts VU monitoring, and re-arms speech recognition.
   */
  async setMicMuted(muted) {
    this.isMicMuted = !!muted;
    this.isMicBlockedTemporarily = !!muted;

    if (muted) {
      // 1. Terminate speech recognition immediately
      this.isListeningDesired = false;
      this.isListening = false;
      if (this.recognition) {
        try { this.recognition.abort(); } catch (e) {
          try { this.recognition.stop(); } catch (e2) {}
        }
      }

      // 2. Completely block and release hardware MediaStream tracks
      if (this.micStream) {
        try {
          this.micStream.getTracks().forEach(track => {
            try {
              track.enabled = false;
              track.stop(); // Halts hardware recording and releases macOS/browser mic lock
            } catch (err) {}
          });
        } catch (e) {}
        this.micStream = null;
      }

      // 3. Disconnect Web Audio source
      if (this.micSource) {
        try { this.micSource.disconnect(); } catch (e) {}
        this.micSource = null;
      }

      // 4. Halt VU animation frame loop and zero out readings
      if (this.rafVuId) {
        cancelAnimationFrame(this.rafVuId);
        this.rafVuId = null;
      }
      this.activeRmsLevel = 0;

      // 5. Zero out UI meters and VU bars
      const vuMini = document.getElementById('micMiniVu');
      if (vuMini) {
        vuMini.querySelectorAll('.vu-bar').forEach(b => {
          b.style.height = '4px';
          b.classList.remove('lit-1', 'lit-2', 'lit-3');
        });
      }
      const levelFill = document.getElementById('micLevelFill');
      if (levelFill) levelFill.style.width = '0%';
      const rmsValEl = document.getElementById('micRmsVal');
      if (rmsValEl) rmsValEl.textContent = '0% (BLOCKED)';

      // 6. Update hardware state & permission UI
      this.isMicHardwareActive = false;
      this.updateMicPermissionUI('blocked');
      this.updateState('idle');

      if (typeof window !== 'undefined' && window.syncSwipeMicUI) {
        window.syncSwipeMicUI(false);
      }
      return false;
    } else {
      // Re-enable / Give microphone access back
      this.isMicBlockedTemporarily = false;
      this.isMicMuted = false;

      // 1. Re-request microphone hardware stream
      const success = await this.initHardwareMic(true);

      // 2. Re-arm speech recognition if available
      if (this.recognition) {
        this.isListeningDesired = true;
        try {
          if (this.synthesis && this.synthesis.speaking) {
            this.synthesis.cancel();
          }
          this.recognition.lang = this.currentLanguage;
          this.recognition.continuous = this.continuousListening;
          this.recognition.start();
        } catch (e) {}
      }

      if (typeof window !== 'undefined' && window.syncSwipeMicUI) {
        window.syncSwipeMicUI(true);
      }
      return success;
    }
  }

  async toggleListening() {
    if (this.isMicMuted || this.isMicBlockedTemporarily || !this.isMicHardwareActive || !this.micStream) {
      return await this.setMicMuted(false);
    }

    if (this.isListening) {
      return await this.setMicMuted(true);
    }

    if (!this.recognition) {
      if (window.FridayCore) {
        window.FridayCore.showToast('Microphone speech recognition unavailable. Use terminal.');
      }
      return;
    }

    try {
      if (this.synthesis && this.synthesis.speaking) {
        this.synthesis.cancel();
      }
      this.isListeningDesired = true;
      this.recognition.lang = this.currentLanguage;
      this.recognition.continuous = this.continuousListening;
      this.recognition.start();
    } catch (e) {
      console.warn('Error starting speech recognition:', e);
      this.isListeningDesired = true;
    }
  }

  cleanForSpeech(raw) {
    if (!raw) return '';
    let clean = String(raw)
      .replace(/```[\s\S]*?```/g, ' [code block omitted] ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#+\s*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[_~>|•]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (clean.length > 280) {
      const sentences = clean.split(/(?<=[.?!])\s+/);
      let truncated = '';
      for (const s of sentences) {
        if ((truncated + ' ' + s).length <= 260) {
          truncated += (truncated ? ' ' : '') + s;
        } else {
          break;
        }
      }
      clean = truncated || clean.substring(0, 260) + '...';
    }
    return clean || raw;
  }

  speak(text, onComplete) {
    if (!this.synthesis) {
      this.typeSubtitle(text);
      if (onComplete) onComplete();
      return;
    }

    // In Chrome/WebKit, ensure speech synthesis is not frozen or paused
    if (this.synthesis.paused) {
      try { this.synthesis.resume(); } catch (e) {}
    }

    // Temporarily pause speech recognition while speaking to prevent feedback loops
    const wasListening = this.isListening;
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch (e) {}
    }

    // Cancel any ongoing speech
    try { this.synthesis.cancel(); } catch (e) {}

    if (!this.selectedVoice) {
      this.selectBestFridayVoice();
    }

    const clean = this.cleanForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(clean);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.lang = this.currentLanguage;
    utterance.pitch = this.pitch;
    utterance.rate = this.rate;
    utterance.volume = this.volume;

    const resumeListeningIfDesired = () => {
      this.isSpeaking = false;
      this.updateState('idle');
      if (window.FridayCanvas) window.FridayCanvas.setMode('idle');
      if (onComplete) onComplete();

      // Resume listening if desired and mic access is not blocked
      if ((wasListening || this.isListeningDesired || this.continuousListening) && this.recognition && !this.isMicMuted && !this.isMicBlockedTemporarily) {
        setTimeout(() => {
          if ((this.isListeningDesired || this.continuousListening) && !this.isMicMuted && !this.isMicBlockedTemporarily) {
            try { this.recognition.start(); } catch (e) {}
          }
        }, 300);
      }
    };

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateState('speaking');
      if (window.FridayCanvas) window.FridayCanvas.setMode('speaking');
      this.typeSubtitle(clean);
    };

    utterance.onend = resumeListeningIfDesired;
    utterance.onerror = resumeListeningIfDesired;

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
    this.isSpeaking = false;
    this.updateState('idle');
    if (window.FridayCanvas) window.FridayCanvas.setMode('idle');
  }

  setSubtitle(text) {
    const subtitleEl = document.getElementById('subtitleDisplay');
    if (subtitleEl) {
      subtitleEl.textContent = text;
    }
  }

  typeSubtitle(text) {
    const subtitleEl = document.getElementById('subtitleDisplay');
    if (!subtitleEl) return;

    subtitleEl.textContent = '';
    let index = 0;
    const speed = Math.max(12, Math.min(35, 1200 / text.length));

    if (this.typeInterval) clearInterval(this.typeInterval);
    this.typeInterval = setInterval(() => {
      if (index < text.length) {
        subtitleEl.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(this.typeInterval);
      }
    }, speed);
  }

  updateState(state) {
    const statusDot = document.getElementById('headerStatusDot');
    const statusText = document.getElementById('headerStatusText');
    const micBtn = document.getElementById('btnActivateVoice');

    if (statusDot && statusText) {
      statusDot.className = 'status-dot';
      if (state === 'listening') {
        statusDot.classList.add('listening');
        if (this.currentLanguage.startsWith('ta')) statusText.textContent = 'கேட்கிறது...';
        else if (this.currentLanguage.startsWith('ml')) statusText.textContent = 'ശ്രദ്ധിക്കുന്നു...';
        else statusText.textContent = 'LISTENING...';
      } else if (state === 'speaking') {
        statusDot.classList.add('speaking');
        statusText.textContent = 'F.R.I.D.A.Y. SPEAKING';
      } else if (state === 'processing') {
        statusDot.textContent = '';
        statusText.textContent = 'PROCESSING DATA';
      } else {
        statusText.textContent = 'SYSTEMS ONLINE';
      }
    }

    if (micBtn) {
      if (state === 'listening') {
        micBtn.classList.add('active');
      } else {
        micBtn.classList.remove('active');
      }
    }

    if (typeof window !== 'undefined' && typeof window.syncSwipeMicUI === 'function') {
      window.syncSwipeMicUI(state === 'listening');
    }

    if (window.FridayCanvas) {
      window.FridayCanvas.setMode(state);
    }

    if (window.FridayNeuralBg) {
      window.FridayNeuralBg.setState(state);
    }
  }
}

// Global voice singleton
window.FridayVoice = new FridayVoiceEngine();
