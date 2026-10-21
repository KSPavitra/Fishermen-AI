// ============================================
// PAGE & SECTION NAVIGATION CONTROLLER
// ============================================

// ============================================
// PAGE NAVIGATION
// ============================================
function showPage(pageId) {
    playTapSound();
    if (typeof destroyFishReels === 'function') destroyFishReels();

    // 1. Immediately terminate any active microphone speech recognition session
    if (typeof stopRecording === 'function' && isRecording) {
        stopRecording();
    }
    // 2. Immediately stop any active speech synthesis audio
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    if (typeof stopAssistantSpeech === 'function') {
        stopAssistantSpeech();
    }
    // 3. Stop screen voice guidance HUD if playing
    if (typeof stopVoiceGuidance === 'function') {
        stopVoiceGuidance();
    }

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.tab-btn[data-page="${pageId}"]`);
    if (btn) btn.classList.add('active');

    const contentArea = document.getElementById('contentArea');
    if (contentArea) contentArea.scrollTop = 0;

    if (pageId === 'page-home') {
        if (typeof updateHomeLocationUI === 'function') updateHomeLocationUI();
    }
    if (pageId === 'page-more') {
        closeMoreFeature(false); // Reset to show all 8 tools when user taps More tab
    }
    if (pageId === 'page-market') loadMarket();
    if (pageId === 'page-safety') {
        loadHomeWeather();
        loadBestTime();
        loadTide();
        loadCalendar();
    }

    // Refresh context in shared global voice assistant if open
    if (typeof updateAssistantContextUI === 'function') {
        updateAssistantContextUI();
    }

    // Auto Spoken Voice Guidance
    if (typeof onScreenNavigated === 'function') {
        onScreenNavigated(pageId);
    }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        showPage(this.dataset.page);
    });
});

// ============================================
// MORE SECTION NAVIGATION CONTROLLER
// ============================================
function openMoreFeature(badgeText) {
    // Terminate any active voice recording or speaking
    if (typeof stopRecording === 'function' && isRecording) stopRecording();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (typeof stopAssistantSpeech === 'function') stopAssistantSpeech();

    const hub = document.getElementById('moreMenuHub');
    const view = document.getElementById('moreFeatureView');
    const badge = document.getElementById('moreFeatureBadge');
    
    if (badge && badgeText) badge.textContent = badgeText;
    if (hub) hub.style.display = 'none';
    if (view) {
        view.style.display = 'block';
        view.classList.remove('feature-fade-in');
        void view.offsetWidth; // Trigger reflow for smooth animation
        view.classList.add('feature-fade-in');
    }
    
    const contentArea = document.getElementById('contentArea');
    if (contentArea) contentArea.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Refresh context in shared global voice assistant if open
    if (typeof updateAssistantContextUI === 'function') {
        updateAssistantContextUI();
    }

    // Auto Spoken Voice Guidance for specific sub-tool
    if (typeof onScreenNavigated === 'function') {
        onScreenNavigated(currentMoreFeature || 'page-more');
    }
}

function closeMoreFeature(playSound = true) {
    if (playSound) playTapSound();
    // Terminate any active voice recording or speaking
    if (typeof stopRecording === 'function' && isRecording) stopRecording();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (typeof stopAssistantSpeech === 'function') stopAssistantSpeech();

    const wasShorts = document.body.classList.contains('shorts-mode-active');
    if (typeof destroyFishReels === 'function') destroyFishReels();
    currentMoreFeature = null;
    const hub = document.getElementById('moreMenuHub');
    const view = document.getElementById('moreFeatureView');
    if (view) view.style.display = 'none';
    if (hub) {
        hub.style.display = 'block';
        hub.classList.remove('feature-fade-in');
        void hub.offsetWidth;
        hub.classList.add('feature-fade-in');
    }
    
    const contentArea = document.getElementById('contentArea');
    if (contentArea) contentArea.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (wasShorts && window.history.state && window.history.state.modal === 'fishReels') {
        try { window.history.back(); } catch (e) {}
    }

    // Refresh context in shared global voice assistant if open
    if (typeof updateAssistantContextUI === 'function') {
        updateAssistantContextUI();
    }

    // Auto Spoken Voice Guidance return to hub
    if (typeof onScreenNavigated === 'function') {
        onScreenNavigated('page-more');
    }
}

// ============================================
// DOM REFS
// ============================================
const globalVoiceFab = document.getElementById('globalVoiceFab');
const globalVoiceModal = document.getElementById('globalVoiceModal');
const resultContainer = document.getElementById('resultContainer');
const decisionStatus = document.getElementById('decisionStatus');
const decisionReasons = document.getElementById('decisionReasons');
const decisionDetails = document.getElementById('decisionDetails');
const connectionDot = document.getElementById('connectionDot');
const connectionText = document.getElementById('connectionText');




// Backwards-compatibility helpers for Home and Voice views
function toggleHomeVoice() {
    openGlobalVoiceAssistant(true);
}
function toggleHomeTextFallback() {
    openGlobalVoiceAssistant(false);
    const input = document.getElementById('gvaTextInput');
    if (input) input.focus();
}
function submitHomeTextQuery() {
    submitGvaTextQuery();
}
function handleHomeHeroMicClick() {
    playTapSound();
    openGlobalVoiceAssistant(true);
}

function openLocationSelector() {
    playTapSound();
    showPage('page-market');
    setTimeout(() => {
        const chipsEl = document.getElementById('marketChipsScroll');
        if (chipsEl) {
            chipsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 120);
}

function updateHomeLocationUI() {
    const locNameEl = document.getElementById('homeLocationName');
    const locLabelEl = document.getElementById('homeLocationLabel');
    if (!locNameEl) return;
    const isKn = (currentLang === 'kn');
    if (locLabelEl) {
        locLabelEl.textContent = isKn ? 'ಆಯ್ಕೆಮಾಡಿದ ಬಂದರು · Selected Harbor:' : 'Selected Harbor:';
    }
    const harbor = (typeof HARBORS_METADATA !== 'undefined' && HARBORS_METADATA[selectedMarketId]) 
        ? HARBORS_METADATA[selectedMarketId] 
        : null;
    if (harbor) {
        locNameEl.textContent = isKn
            ? `${harbor.kannada} (${harbor.district.split('·')[1]?.trim() || harbor.district})`
            : `${harbor.name}, ${harbor.district.split('·')[0].trim()}`;
    } else {
        locNameEl.textContent = isKn ? 'ಕರಾವಳಿ ಬಂದರು (Karavali Coast)' : 'Karavali Coast';
    }
}

function openHomeWeather() {
    playTapSound();
    showPage('page-safety');
}
function openHomeMarket() {
    playTapSound();
    showPage('page-market');
}
function openHomeFuelCalculator() {
    playTapSound();
    showPage('page-more');
    renderFuelCalculator();
}

function showVoiceState(state, message) {
    const el = document.getElementById('voiceState');
    const txt = document.getElementById('voiceStateText');
    if (!el) return;
    el.className = 'voice-state active ' + state;
    if (txt) txt.textContent = message;

    if (state === 'responding' || state === 'error') {
        setTimeout(() => {
            el.classList.remove('active');
        }, 4000);
    }
}

function hideVoiceState() {
    const el = document.getElementById('voiceState');
    if (el) el.classList.remove('active');
}
