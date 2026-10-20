// ============================================
// GLOBAL REUSABLE VOICE ASSISTANT & GUIDANCE ENGINE
// ============================================

// ============================================
// GLOBAL REUSABLE VOICE ASSISTANT CONTROLLER
// ============================================
isAssistantSpeaking = false;
let lastAssistantResponseText = '';
let lastAssistantVoiceText = '';

function getCurrentScreenContext() {
    // 1. Check if a sub-feature in More is currently open
    const moreFeatureView = document.getElementById('moreFeatureView');
    if (moreFeatureView && moreFeatureView.style.display !== 'none' && currentMoreFeature) {
        if (currentMoreFeature === 'fuel') {
            return {
                id: 'fuel',
                icon: '⛽',
                nameKn: 'ಡೀಸೆಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ (Fuel)',
                nameEn: 'Fuel Calculator',
                descKn: 'ದೋಣಿಯ ಇಂಧನ ವೆಚ್ಚ ಮತ್ತು ಸಬ್ಸಿಡಿ ಮಾಹಿತಿ',
                descEn: 'Boat fuel cost, consumption & subsidy advice',
                promptsKn: [
                    '100 HP ದೋಣಿಗೆ 5 ಗಂಟೆಗೆ ಎಷ್ಟು ಡೀಸೆಲ್ ಬೇಕು?',
                    'ಡೀಸೆಲ್ ಸಬ್ಸಿಡಿ ಪಡೆಯುವುದು ಹೇಗೆ?',
                    'ಇಂಧನ ಉಳಿಸಲು ಸಲಹೆಗಳು'
                ],
                promptsEn: [
                    'How much diesel for 100 HP running 5 hours?',
                    'How to get government diesel subsidy?',
                    'Tips to reduce boat fuel consumption'
                ]
            };
        }
        if (currentMoreFeature === 'videos') {
            return {
                id: 'videos',
                icon: '🎬',
                nameKn: 'ಮೀನುಗಾರಿಕಾ ವಿಡಿಯೋಗಳು (FishReels)',
                nameEn: 'Educational Fish Videos',
                descKn: 'ಕರಾವಳಿ ವಿಡಿಯೋ ಪಾಠಗಳು (15-45 ಸೆಕೆಂಡುಗಳು)',
                descEn: 'Short educational marine & fishing videos',
                promptsKn: [
                    'ಕಡಲ ಸುರಕ್ಷತೆ ವಿಡಿಯೋ ಮಾಹಿತಿ',
                    'ಮೀನು ಗುರುತಿಸುವ ವಿಡಿಯೋ ಇದೆಯೇ?',
                    'ದೋಣಿ ಇಂಜಿನ್ ನಿರ್ವಹಣೆ ಕಲಿಯುವುದು ಹೇಗೆ?'
                ],
                promptsEn: [
                    'Show sea safety videos',
                    'Are there videos on fish identification?',
                    'Boat engine maintenance lessons'
                ]
            };
        }
        if (currentMoreFeature === 'fishGuide') {
            return {
                id: 'fishGuide',
                icon: '🐟',
                nameKn: 'ಮೀನು ಪ್ರಭೇದಗಳು (Fish Guide)',
                nameEn: 'Fish Species Guide',
                descKn: 'ಮೀನು ಪ್ರಭೇದಗಳು, ಬೆಲೆ ಮತ್ತು ಸೀಸನ್',
                descEn: 'Fish species, port rates and landing seasons',
                promptsKn: [
                    'ಅಂಜಲ್ (Kingfish) ದರ ಮತ್ತು ಸೀಸನ್ ಏನು?',
                    'ಬೆಳ್ಳಿ ಮಾಂಜಿ (Pomfret) ಮಾಹಿತಿ ಕೊಡಿ',
                    'ಕರಾವಳಿಯ ಪ್ರಮುಖ ಮೀನುಗಳು ಯಾವುವು?'
                ],
                promptsEn: [
                    'What is Anjal (Kingfish) price and peak season?',
                    'Tell me about Silver Pomfret',
                    'What are prime fish in Karavali?'
                ]
            };
        }
        if (currentMoreFeature === 'prediction') {
            return {
                id: 'prediction',
                icon: '📅',
                nameKn: 'ಸೀಸನ್ ಮಾರ್ಗದರ್ಶಿ (Catch Guide)',
                nameEn: 'Seasonal Catch Guide',
                descKn: 'ಕರಾವಳಿ ಮೀನುಗಾರಿಕೆ ಋತುಮಾನ ಮತ್ತು ಇಳುವರಿ',
                descEn: 'CMFRI seasonal fish abundance patterns',
                promptsKn: [
                    'ಈ ತಿಂಗಳು ಯಾವ ಮೀನು ಹೆಚ್ಚು ಸಿಗುತ್ತದೆ?',
                    'ಬಂಗಡೆ ಮೀನು ಸೀಸನ್ ಯಾವಾಗ?',
                    'ಮಳೆಗಾಲದ ಮೀನುಗಾರಿಕೆ ನಿಷೇಧ ಯಾವಾಗ?'
                ],
                promptsEn: [
                    'Which fish has peak season this month?',
                    'When is Mackerel season?',
                    'When is the monsoon fishing ban?'
                ]
            };
        }
        if (currentMoreFeature === 'schemes') {
            return {
                id: 'schemes',
                icon: '🏛️',
                nameKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು (Govt Schemes)',
                nameEn: 'Fisheries Schemes',
                descKn: 'ಪಿಎಂಎಂಎಸ್‌ವೈ ಮತ್ತು ಸಬ್ಸಿಡಿ ಮಾಹಿತಿ',
                descEn: 'PMMSY subsidies, kisan credit and loans',
                promptsKn: [
                    'ದೋಣಿ ಇಂಜಿನ್ ಸಬ್ಸಿಡಿ ಯೋಜನೆ ಯಾವುದು?',
                    'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?',
                    'ಮೀನುಗಾರರ ಜೀವ ವಿಮೆ ಮಾಹಿತಿ'
                ],
                promptsEn: [
                    'What subsidies exist for boat engines?',
                    'How to apply for Kisan Credit Card?',
                    'Fishermen life insurance schemes'
                ]
            };
        }
        if (currentMoreFeature === 'catchLog') {
            return {
                id: 'catchLog',
                icon: '🎣',
                nameKn: 'ಕ್ಯಾಚ್ ಲಾಗರ್ (Catch Logger)',
                nameEn: 'Catch Logger',
                descKn: 'ದೈನಂದಿನ ಮೀನು ತೂಕ ಮತ್ತು ಆದಾಯ ಲೆಕ್ಕ',
                descEn: 'Log catch weight, species and sales',
                promptsKn: [
                    'ಇಂದಿನ ಕ್ಯಾಚ್ ಲೆಕ್ಕ ಹೇಗೆ ದಾಖಲಿಸುವುದು?',
                    'ತಿಂಗಳ ಸರಾಸರಿ ಆದಾಯ ಲೆಕ್ಕ ಹೇಗೆ?',
                    'ದಾಖಲೆಗಳನ್ನು ಎಕ್ಸ್‌ಪೋರ್ಟ್ ಮಾಡುವುದು ಹೇಗೆ?'
                ],
                promptsEn: [
                    'How to log today\'s catch weight?',
                    'How to calculate monthly average profit?',
                    'How to export voyage records?'
                ]
            };
        }
    }

    // 2. Check top-level page
    const activePage = document.querySelector('.page.active');
    const pageId = activePage ? activePage.id : 'page-home';

    if (pageId === 'page-market') {
        const hMeta = (typeof HARBORS_METADATA !== 'undefined' && HARBORS_METADATA[selectedMarketId]) ? HARBORS_METADATA[selectedMarketId] : null;
        const harborNameKn = hMeta ? hMeta.kannada : 'ಮಲ್ಪೆ ಬಂದರು';
        const harborNameEn = hMeta ? hMeta.name : 'Malpe Harbor';
        return {
            id: 'market',
            icon: '💰',
            nameKn: `ಮೀನು ಮಾರುಕಟ್ಟೆ (${harborNameKn})`,
            nameEn: `Fish Market (${harborNameEn})`,
            descKn: 'ಬಂದರು ಸಗಟು ದರಗಳು ಮತ್ತು ಮಾರಾಟ ಮಾಹಿತಿ',
            descEn: 'Dockside wholesale rates and selling guidance',
            promptsKn: [
                'ಬಂಗಡೆ ಮೀನಿನ ಇಂದಿನ ದರ ಎಷ್ಟು?',
                'ಮಾಂಜಿ (Pomfret) ಮತ್ತು ಸೀಗಡಿ ಬೆಲೆ ಎಷ್ಟು?',
                'ಮಲ್ಪೆ ಮತ್ತು ಮಂಗಳೂರು ಧಕ್ಕೆಯಲ್ಲಿ ದರ ವ್ಯತ್ಯಾಸ ಏನು?'
            ],
            promptsEn: [
                'What is Mackerel price per kg today?',
                'What is Pomfret and Prawn price?',
                'Rate difference between Malpe and Mangalore?'
            ]
        };
    }

    if (pageId === 'page-safety') {
        return {
            id: 'safety',
            icon: '🆘',
            nameKn: 'ಹವಾಮಾನ & ಕಡಲ ಸುರಕ್ಷತೆ (Sea Weather)',
            nameEn: 'Sea Weather & Safety HUD',
            descKn: 'ಗಾಳಿ ವೇಗ, ಅಲೆಗಳ ಎತ್ತರ ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ',
            descEn: 'Wind speed, wave swell, tides & safety advice',
            promptsKn: [
                'ಈಗ ಗಾಳಿ ಮತ್ತು ಅಲೆಗಳ ಸ್ಥಿತಿ ಹೇಗಿದೆ?',
                'ಇಂದು ಕಡಲಿಗೆ ಹೋಗಲು ಸೂಕ್ತ ಸಮಯ ಯಾವುದು?',
                'ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಯಾರಿಗೆ ಕರೆ ಮಾಡಬೇಕು?'
            ],
            promptsEn: [
                'What are current wind and wave conditions?',
                'What is the best fishing window today?',
                'Who to call in a marine emergency?'
            ]
        };
    }

    if (pageId === 'page-more') {
        return {
            id: 'more',
            icon: '⚙️',
            nameKn: 'ಮೀನುಗಾರರ ಪರಿಕರಗಳು (Feature Hub)',
            nameEn: 'Fishermen Feature Hub',
            descKn: '8 ಪ್ರಮುಖ ಕರಾವಳಿ ತಾಂತ್ರಿಕ ಪರಿಕರಗಳು',
            descEn: '8 specialized marine tools & services',
            promptsKn: [
                'ಡೀಸೆಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ತೆರೆಯಿರಿ',
                'ಮೀನು ಕಲಿಯುವ ವಿಡಿಯೋಗಳು ಎಲ್ಲಿವೆ?',
                'ತುರ್ತು ಜಿಪಿಎಸ್ ರಕ್ಷಣೆ ಹೇಗೆ?'
            ],
            promptsEn: [
                'Open Fuel Calculator',
                'Where are educational fish videos?',
                'How does emergency GPS distress work?'
            ]
        };
    }

    if (pageId === 'page-voice') {
        return {
            id: 'voice',
            icon: '🎙️',
            nameKn: 'ಧ್ವನಿ ಸಲಹಾ ಕೇಂದ್ರ (Voice Hub)',
            nameEn: 'Karavali Voice Hub',
            descKn: 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ನೇರ ಧ್ವನಿ ಸಂಭಾಷಣೆ',
            descEn: 'Voice inquiry in Kannada or English',
            promptsKn: [
                'ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?',
                'ಬಂಗಡೆ ಮೀನು ಬೆಲೆ ಎಷ್ಟು?',
                'ಈಗ ಗಾಳಿ ಮತ್ತು ಅಲೆಗಳ ಸ್ಥಿತಿ ಹೇಗಿದೆ?'
            ],
            promptsEn: [
                'Should I go fishing tomorrow?',
                'What is mackerel fish rate today?',
                'What are current wind and wave conditions?'
            ]
        };
    }

    // Default to Home
    return {
        id: 'home',
        icon: '🏠',
        nameKn: 'ಹೋಮ್ & ದೈನಂದಿನ ಸಲಹೆ (Daily Advisory)',
        nameEn: 'Home & Fishing Advisory',
        descKn: 'ದೈನಂದಿನ ಮೀನುಗಾರಿಕೆ ಪರಿಸ್ಥಿತಿ ಮತ್ತು ನೇರ ಸಲಹೆ',
        descEn: 'Daily fishing conditions & AI advisory',
        promptsKn: [
            'ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?',
            'ಇಂದಿನ ಗಾಳಿ ಮತ್ತು ಅಲೆಗಳ ಸ್ಥಿತಿ ಹೇಗಿದೆ?',
            'ಬಂಗಡೆ ಮೀನು ಬೆಲೆ ಎಷ್ಟು?'
        ],
        promptsEn: [
            'Should I go fishing tomorrow?',
            'How are wind and wave conditions today?',
            'What is the fish market rate today?'
        ]
    };
}

function updateAssistantContextUI() {
    const ctx = getCurrentScreenContext();
    const isKn = (currentLang === 'kn');

    const iconEl = document.getElementById('gvaContextIcon');
    const labelEl = document.getElementById('gvaContextLabel');
    if (iconEl) iconEl.textContent = ctx.icon;
    if (labelEl) labelEl.textContent = isKn ? ctx.nameKn : ctx.nameEn;

    const chipsContainer = document.getElementById('gvaPromptChips');
    if (chipsContainer) {
        const prompts = isKn ? ctx.promptsKn : ctx.promptsEn;
        chipsContainer.innerHTML = prompts.map(p => `
            <div class="gva-prompt-chip" onclick="askGlobalVoiceAssistant('${p.replace(/'/g, "\\'")}')">
                <span>💬 "${p}"</span>
                <span class="gva-prompt-arrow">Ask ➔</span>
            </div>
        `).join('');
    }

    const input = document.getElementById('gvaTextInput');
    if (input) {
        input.placeholder = isKn
            ? `ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ (${ctx.nameKn.split('(')[0].trim()})...`
            : `Type question (${ctx.nameEn.split('(')[0].trim()})...`;
    }
}

function openGlobalVoiceAssistant(autoRecord = true) {
    playTapSound();
    const modal = document.getElementById('globalVoiceModal');
    if (!modal) return;
    
    modal.classList.add('active');
    updateAssistantContextUI();

    // Reset state banner
    setAssistantState('ready', currentLang === 'kn' ? '🎙️ ಸಿದ್ಧ. ಮೈಕ್ ಒತ್ತಿ ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ' : '🎙️ Ready. Tap microphone and speak in Kannada or English');

    if (autoRecord) {
        startGlobalVoiceRecording();
    }
}

function closeGlobalVoiceAssistant() {
    playTapSound();
    const modal = document.getElementById('globalVoiceModal');
    if (modal) modal.classList.remove('active');

    // Terminate any active recording or speaking
    if (isRecording) {
        stopRecording();
    }
    if (isAssistantSpeaking) {
        stopAssistantSpeech();
    }
}

function handleGlobalVoiceFabClick(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('globalVoiceModal');
    const isModalOpen = modal && modal.classList.contains('active');

    if (!isModalOpen) {
        openGlobalVoiceAssistant(true);
    } else {
        // Toggle mic if modal is already open
        if (isRecording) {
            stopRecording();
        } else {
            startGlobalVoiceRecording();
        }
    }
}

function toggleGlobalAssistantMic() {
    if (isRecording) {
        stopRecording();
    } else {
        startGlobalVoiceRecording();
    }
}

function setAssistantState(state, message) {
    const banner = document.getElementById('gvaStateBanner');
    const textEl = document.getElementById('gvaStateText');
    const iconEl = document.getElementById('gvaStateIcon');
    if (banner && textEl) {
        banner.className = 'gva-state-banner ' + state;
        textEl.textContent = message;

        const icons = {
            'ready': '🎙️',
            'listening': '🔴',
            'processing': '⏳',
            'speaking': '🔊',
            'error': '❌'
        };
        if (iconEl) iconEl.textContent = icons[state] || '🎙️';
    }

    // Mirror state on homepage prominent hero microphone
    const homeMic = document.getElementById('homeHeroMicBtn');
    const homeSonar = document.getElementById('homeHeroMicSonar');
    const homeMicLabel = document.getElementById('homeHeroMicLabel');
    if (homeMic) {
        if (state === 'listening') {
            homeMic.classList.add('recording');
            if (homeSonar) {
                homeSonar.className = 'home-hero-mic-sonar active';
            }
            if (homeMicLabel) homeMicLabel.textContent = (currentLang === 'kn' ? 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ' : 'LISTENING');
        } else if (state === 'processing') {
            homeMic.classList.remove('recording');
            if (homeSonar) {
                homeSonar.className = 'home-hero-mic-sonar';
            }
            if (homeMicLabel) homeMicLabel.textContent = (currentLang === 'kn' ? 'ಯೋಚಿಸುತ್ತಿದೆ...' : 'PROCESSING...');
        } else if (state === 'speaking') {
            homeMic.classList.remove('recording');
            if (homeSonar) {
                homeSonar.className = 'home-hero-mic-sonar speaking';
            }
            if (homeMicLabel) homeMicLabel.textContent = (currentLang === 'kn' ? 'ಮಾತನಾಡುತ್ತಿದೆ' : 'SPEAKING');
        } else {
            homeMic.classList.remove('recording');
            if (homeSonar) {
                homeSonar.className = 'home-hero-mic-sonar';
            }
            if (homeMicLabel) homeMicLabel.textContent = (currentLang === 'kn' ? 'ಮಾತನಾಡಿ' : 'TAP TO SPEAK');
        }
    }
}




function initGlobalSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        setAssistantState('error', currentLang === 'kn' ? '❌ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಲಭ್ಯವಿಲ್ಲ. ಕೆಳಗೆ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ.' : '❌ Voice recognition not supported in this browser. Please type below.');
        const textInput = document.getElementById('gvaTextInput');
        if (textInput) textInput.focus();
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'en' ? 'en-US' : 'kn-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = function() {
        isRecording = true;
        playTapSound();
        if (navigator.vibrate) {
            try { navigator.vibrate([80]); } catch (e) {}
        }
        
        // Update FAB
        const fab = document.getElementById('globalVoiceFab');
        if (fab) fab.classList.add('recording');

        // Update Center Mic in Modal
        const centerMic = document.getElementById('gvaCenterMicBtn');
        if (centerMic) centerMic.classList.add('recording');
        const centerText = document.getElementById('gvaCenterMicText');
        if (centerText) centerText.textContent = (currentLang === 'kn') ? 'ಕೇಳುತ್ತಿದ್ದೇವೆ...' : 'Listening...';
        const centerIcon = document.getElementById('gvaCenterMicIcon');
        if (centerIcon) centerIcon.textContent = '🔴';

        // Update Wave & Equalizer
        const sonar = document.getElementById('gvaSonarWave');
        if (sonar) sonar.classList.add('active');
        const eq = document.getElementById('gvaEqualizer');
        if (eq) {
            eq.classList.add('active');
            eq.classList.remove('speaking');
        }

        setAssistantState('listening', currentLang === 'kn' ? '🔴 ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ... ಮಾತನಾಡಿ' : '🔴 Listening... Please speak now');
    };

    recognition.onresult = function(event) {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                final += event.results[i][0].transcript;
            } else {
                interim += event.results[i][0].transcript;
            }
        }

        const transcriptEl = document.getElementById('gvaTranscriptText');
        if (transcriptEl) {
            transcriptEl.textContent = `📝 "${final || interim}"`;
        }

        if (final) {
            setAssistantState('processing', currentLang === 'kn' ? '⏳ ಪ್ರಶ್ನೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : '⏳ Processing query...');
            processAssistantQuery(final);
        }
    };

    recognition.onerror = function(event) {
        let msg = currentLang === 'kn' ? '❌ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : '❌ Could not hear clearly. Tap and try again.';
        if (event.error === 'not-allowed') {
            msg = currentLang === 'kn' ? '🎤 ದಯವಿಟ್ಟು ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನೀಡಿ.' : '🎤 Microphone permission denied. Please allow mic access.';
        }
        if (event.error === 'no-speech') {
            msg = currentLang === 'kn' ? '🔇 ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ಬಟನ್ ಒತ್ತಿ ಮಾತನಾಡಿ.' : '🔇 No speech detected. Tap microphone and speak.';
        }
        setAssistantState('error', msg);
        stopRecording();
    };

    recognition.onend = function() {
        stopRecording();
    };
}

function startGlobalVoiceRecording() {
    // If speaking, cancel audio first to prevent mic picking up own voice
    if (isAssistantSpeaking) {
        stopAssistantSpeech();
    }
    if (typeof isVoiceGuideSpeaking !== 'undefined' && isVoiceGuideSpeaking) {
        stopVoiceGuidance();
    }

    if (!recognition) {
        initGlobalSpeech();
    }
    if (!recognition) return;

    recognition.lang = (currentLang === 'en') ? 'en-US' : 'kn-IN';

    try {
        recognition.start();
    } catch (err) {
        console.warn('SpeechRecognition start err:', err);
        try {
            recognition.stop();
        } catch (e) {}
    }
}

function stopRecording() {
    isRecording = false;
    if (recognition) {
        try { recognition.stop(); } catch (e) {}
    }

    // Reset FAB
    const fab = document.getElementById('globalVoiceFab');
    if (fab) fab.classList.remove('recording');

    // Reset Center Mic in Modal
    const centerMic = document.getElementById('gvaCenterMicBtn');
    if (centerMic) centerMic.classList.remove('recording');
    const centerText = document.getElementById('gvaCenterMicText');
    if (centerText) centerText.textContent = (currentLang === 'kn') ? 'ಮಾತನಾಡಲು ಒತ್ತಿ' : 'Tap to Speak';
    const centerIcon = document.getElementById('gvaCenterMicIcon');
    if (centerIcon) centerIcon.textContent = '🎙️';

    // Reset Waves
    const sonar = document.getElementById('gvaSonarWave');
    if (sonar) sonar.classList.remove('active');
    const eq = document.getElementById('gvaEqualizer');
    if (eq) {
        eq.classList.remove('active');
        if (!isAssistantSpeaking) eq.classList.remove('speaking');
    }

    const banner = document.getElementById('gvaStateBanner');
    if (banner && banner.classList.contains('listening')) {
        setAssistantState('ready', currentLang === 'kn' ? '🎙️ ಸಿದ್ಧ. ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ' : '🎙️ Ready. Tap mic and speak');
    }
}

function askGlobalVoiceAssistant(queryText) {
    if (!queryText) return;
    openGlobalVoiceAssistant(false);
    
    const transcriptEl = document.getElementById('gvaTranscriptText');
    if (transcriptEl) transcriptEl.textContent = `📝 "${queryText}"`;

    setAssistantState('processing', currentLang === 'kn' ? '⏳ ಪ್ರಶ್ನೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : '⏳ Processing query...');
    processAssistantQuery(queryText);
}



async function processAssistantQuery(query) {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim().toLowerCase();
    const isKn = (currentLang === 'kn');
    const screenCtx = getCurrentScreenContext();

    // ============================================
    // INTENT 1: EMERGENCY SOS / DISTRESS QUERY (TOP PRIORITY)
    // ============================================
    const isSosWord = cleanQuery.includes('sos') || cleanQuery.includes('ತುರ್ತು') || cleanQuery.includes('emergency') ||
                      cleanQuery.includes('ರಕ್ಷಣೆ') || cleanQuery.includes('rescue') || cleanQuery.includes('ಕೋಸ್ಟ್ ಗಾರ್ಡ್') ||
                      cleanQuery.includes('coast guard') || cleanQuery.includes('1554') || cleanQuery.includes('1093') ||
                      cleanQuery.includes('distress') || cleanQuery.includes('mayday');

    if (isSosWord) {
        const respText = isKn
            ? `🚨 <b>ಕರಾವಳಿ ತುರ್ತು ರಕ್ಷಣಾ ಹೆಲ್ಪ್‌ಲೈನ್</b>:<br>• ಭಾರತೀಯ ಕೋಸ್ಟ್ ಗಾರ್ಡ್: <b><a href="tel:1554" style="color:#f87171;">1554</a></b> (ಉಚಿತ ಟೋಲ್-ಫ್ರೀ)<br>• ಕರಾವಳಿ ಪೊಲೀಸ್: <b><a href="tel:1093" style="color:#38bdf8;">1093</a></b><br>• ಆಂಬ್ಯುಲೆನ್ಸ್: <b>108</b><br><br>📍 ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ರಕ್ಷಣಾ ಸಿಬ್ಬಂದಿಗೆ ನಿಮ್ಮ ಜಿಪಿಎಸ್ ಸ್ಥಾನವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಓದಿ ತಿಳಿಸಿ.`
            : `🚨 <b>Coastal Maritime Rescue Hotlines</b>:<br>• Indian Coast Guard SAR: <b><a href="tel:1554" style="color:#f87171;">1554</a></b> (Toll-free 24/7)<br>• Coastal Marine Police: <b><a href="tel:1093" style="color:#38bdf8;">1093</a></b><br>• Ambulance: <b>108</b><br><br>📍 Read your sea GPS coordinates out loud when contacting rescue operators.`;

        const voiceText = isKn
            ? `ತುರ್ತು ರಕ್ಷಣೆಗಾಗಿ ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ಸಂಖ್ಯೆ 1554 ಅಥವಾ ಕರಾವಳಿ ಪೊಲೀಸ್ 1093 ಗೆ ಕರೆ ಮಾಡಿ.`
            : `For marine rescue, dial Indian Coast Guard hotline 1554 or Coastal Police 1093 immediately.`;

        displayAssistantResponse({
            title: isKn ? '🚨 ಕರಾವಳಿ ತುರ್ತು ರಕ್ಷಣೆ' : '🚨 Coastal Rescue Distress',
            text: respText,
            voiceText: voiceText,
            badge: 'HOTLINE 1554'
        });
        return;
    }

    // ============================================
    // INTENT 2: FISH MARKET / PRICE QUERY
    // ============================================
    let matchedFishKey = null;
    for (const [k, info] of Object.entries(VOICE_FISH_CATALOG)) {
        if (info.keywords.some(kw => cleanQuery.includes(kw.toLowerCase()))) {
            matchedFishKey = k;
            break;
        }
    }
    const isMarketWord = cleanQuery.includes('ದರ') || cleanQuery.includes('ಬೆಲೆ') || cleanQuery.includes('ರೇಟ್') ||
                         cleanQuery.includes('price') || cleanQuery.includes('rate') || cleanQuery.includes('market') ||
                         cleanQuery.includes('ಹರಾಜು') || cleanQuery.includes('auction') || cleanQuery.includes('ಬಂದರು');

    if (matchedFishKey || (screenCtx.id === 'market' && isMarketWord)) {
        const fish = matchedFishKey ? VOICE_FISH_CATALOG[matchedFishKey] : VOICE_FISH_CATALOG['mackerel'];
        const hKey = (typeof selectedMarketId !== 'undefined' && selectedMarketId) ? selectedMarketId : 'malpe';
        const hMeta = (typeof HARBORS_METADATA !== 'undefined' && HARBORS_METADATA[hKey]) ? HARBORS_METADATA[hKey] : {
            name: 'Malpe Harbor',
            kannada: 'ಮಲ್ಪೆ ಬಂದರು',
            multiplier: 1.0,
            time: '06:30 AM',
            sourceKn: 'ಮಲ್ಪೆ ಮೀನುಗಾರರ ಸಹಕಾರಿ ಸಂಘ',
            sourceEn: 'Malpe Co-Op Society'
        };

        const calcPrice = Math.round(fish.basePrice * (hMeta.multiplier || 1.0));
        const calcMin = Math.round(fish.min * (hMeta.multiplier || 1.0));
        const calcMax = Math.round(fish.max * (hMeta.multiplier || 1.0));

        // If on Market page, automatically search for this fish!
        const marketSearchInput = document.getElementById('marketSearchInput');
        const marketPage = document.getElementById('page-market');
        if (marketSearchInput && marketPage && marketPage.classList.contains('active')) {
            marketSearchInput.value = fish.name;
            if (typeof filterMarketPrices === 'function') filterMarketPrices();
        }

        const respText = isKn
            ? `🏛️ <b>${hMeta.kannada}</b>: <b>${fish.kannada}</b> ಇಂದಿನ ಬೆಂಚ್‌ಮಾರ್ಕ್ ದರ ಪ್ರತಿ ಕೆಜಿಗೆ <b>₹${calcPrice}/kg</b> ಇದೆ (ಅಂದಾಜು ಹರಾಜು ವ್ಯಾಪ್ತಿ: ₹${calcMin} - ₹${calcMax}/kg).<br><br>⏰ ಕೊನೆಯ ನವೀಕರಣ: ${hMeta.time} · ಮೂಲ: ${hMeta.sourceKn}.<br><small style="color:#94a3b8;">⚠️ ಇದು ಬಂದರು ಹರಾಜು ಸರಾಸರಿ. ಮೀನು ತಾಜಾತನ (Grade A/B) ಆಧಾರದ ಮೇಲೆ ಅಂತಿಮ ದರವನ್ನು ಹರಾಜುದಾರರೊಂದಿಗೆ ಖಚಿತಪಡಿಸಿ.</small>`
            : `🏛️ <b>${hMeta.name}</b>: Today's benchmark rate for <b>${fish.name}</b> (${fish.kannada}) is <b>₹${calcPrice}/kg</b> (auction range: ₹${calcMin} - ₹${calcMax}/kg).<br><br>⏰ Updated: ${hMeta.time} · Source: ${hMeta.sourceEn}.<br><small style="color:#94a3b8;">⚠️ Verified harbor auction benchmark. Final dockside price depends on catch grading & daily supply volume.</small>`;

        const voiceText = isKn
            ? `${hMeta.kannada}ದಲ್ಲಿ ಇಂದಿನ ${fish.kannada} ದರ ಪ್ರತಿ ಕೆಜಿಗೆ ಸುಮಾರು ${calcPrice} ರೂಪಾಯಿ ಇದೆ. ಹರಾಜುದಾರರೊಂದಿಗೆ ದರ ಖಚಿತಪಡಿಸಿ.`
            : `At ${hMeta.name}, today's benchmark price for ${fish.name} is approximately ${calcPrice} rupees per kilogram. Verify with local auctioneer before offloading.`;

        displayAssistantResponse({
            title: isKn ? '💰 ಬಂದರು ಮೀನು ದರ ಸಲಹೆ' : '💰 Harbor Catch Rate Advisory',
            text: respText,
            voiceText: voiceText,
            badge: `${fish.name} · ₹${calcPrice}/kg`
        });
        return;
    }

    // ============================================
    // INTENT 3: FUEL CALCULATOR QUERY
    // ============================================
    const isFuelWord = cleanQuery.includes('ಡೀಸೆಲ್') || cleanQuery.includes('ಇಂಧನ') || cleanQuery.includes('diesel') ||
                       cleanQuery.includes('fuel') || cleanQuery.includes('ಲೀಟರ್') || cleanQuery.includes('litre') ||
                       cleanQuery.includes('ಕ್ಯಾಲ್ಕುಲೇಟರ್') || cleanQuery.includes('ಖರ್ಚು') || cleanQuery.includes('hp');

    const isFuelHelpOnPage = screenCtx.id === 'fuel' && (
        isFuelWord || cleanQuery.includes('help') || cleanQuery.includes('how') ||
        cleanQuery.includes('use') || cleanQuery.includes('calculate') || cleanQuery.includes('ಲೆಕ್ಕ') ||
        cleanQuery.includes('ವೆಚ್ಚ') || cleanQuery.includes('ಸಹಾಯ') || cleanQuery.includes('ಬಳಕೆ') ||
        cleanQuery.includes('calculator') || cleanQuery.match(/\d+/)
    );

    if (isFuelWord || isFuelHelpOnPage) {
        const hpMatch = cleanQuery.match(/(\d+)\s*(?:hp|ಅಶ್ವಶಕ್ತಿ)/i) || cleanQuery.match(/(\d+)/);
        const hoursMatch = cleanQuery.match(/(\d+)\s*(?:hours|hour|ಗಂಟೆ|ತಾಸು)/i);
        
        let hp = hpMatch ? parseInt(hpMatch[1]) : 100;
        let hrs = hoursMatch ? parseInt(hoursMatch[1]) : 5;
        if (hp > 1000) hp = 100;

        const estLitres = Math.round(hp * 0.20 * hrs);
        const estCost = Math.round(estLitres * 92);

        // If on fuel calculator, auto fill inputs and compute
        const hpInput = document.getElementById('boatHp');
        const hrsInput = document.getElementById('tripHours');
        if (hpInput && hrsInput) {
            hpInput.value = hp;
            hrsInput.value = hrs;
            if (typeof calculateFuel === 'function') calculateFuel();
        }

        const respText = isKn
            ? `⛽ <b>ಇಂಧನ ಅಂದಾಜು</b>: <b>${hp} HP</b> ದೋಣಿ <b>${hrs} ಗಂಟೆ</b> ಚಲಿಸಿದರೆ ಸುಮಾರು <b>${estLitres} ಲೀಟರ್</b> ಡೀಸೆಲ್ ಬೇಕಾಗುತ್ತದೆ (ಅಂದಾಜು ವೆಚ್ಚ: <b>₹${estCost.toLocaleString('en-IN')}</b>).<br><br>💡 <b>ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಸಬ್ಸಿಡಿ</b>: ಮೋಟಾರೀಕೃತ ದೋಣಿಗಳಿಗೆ ದಿನಕ್ಕೆ ಗರಿಷ್ಠ 300 ಲೀಟರ್ ವರೆಗೆ ಮಾರಾಟ ತೆರಿಗೆ ವಿನಾಯಿತಿ ಸಬ್ಸಿಡಿ ಲಭ್ಯವಿದೆ.`
            : `⛽ <b>Fuel Estimation</b>: A <b>${hp} HP</b> engine operating for <b>${hrs} hours</b> consumes approx <b>${estLitres} litres</b> of diesel (~<b>₹${estCost.toLocaleString('en-IN')}</b> at ₹92/L).<br><br>💡 <b>State Subsidy</b>: Karnataka Govt sales-tax exemption is available for up to 300 litres/day for motorized craft.`;

        const voiceText = isKn
            ? `${hp} HP ದೋಣಿ ${hrs} ಗಂಟೆ ಚಲಿಸಲು ಸುಮಾರು ${estLitres} ಲೀಟರ್ ಡೀಸೆಲ್ ಬೇಕಾಗುತ್ತದೆ. ಅಂದಾಜು ವೆಚ್ಚ ${estCost} ರೂಪಾಯಿ.`
            : `A ${hp} HP engine running ${hrs} hours requires approximately ${estLitres} litres of diesel, costing around ${estCost} rupees.`;

        displayAssistantResponse({
            title: isKn ? '⛽ ಡೀಸೆಲ್ ಲೆಕ್ಕಾಚಾರ ಸಲಹೆ' : '⛽ Fuel Estimation Advisory',
            text: respText,
            voiceText: voiceText,
            badge: `${estLitres} L · ₹${estCost.toLocaleString('en-IN')}`
        });
        return;
    }

    // ============================================
    // INTENT 4: EDUCATIONAL VIDEOS / REELS QUERY
    // ============================================
    const isVideoWord = cleanQuery.includes('ವಿಡಿಯೋ') || cleanQuery.includes('video') || cleanQuery.includes('shorts') ||
                        cleanQuery.includes('fishreels') || cleanQuery.includes('ರೀಲ್ಸ್') || cleanQuery.includes('ಕಲಿ');

    const isVideoHelpOnPage = screenCtx.id === 'videos' && (
        isVideoWord || cleanQuery.includes('help') || cleanQuery.includes('watch') ||
        cleanQuery.includes('play') || cleanQuery.includes('ನೋಡು') || cleanQuery.includes('ಸಹಾಯ') ||
        cleanQuery.includes('ಕಲಿಕೆ')
    );

    if (isVideoWord || isVideoHelpOnPage) {
        const respText = isKn
            ? `🎬 <b>FishReels (ಮೀನು ಕಲಿಯೋಣ)</b>:<br>ಕರಾವಳಿ ಮೀನುಗಾರಿಕೆ, ಕಡಲ ಸುರಕ್ಷತೆ, ಜಿಪಿಎಸ್ ಬಳಕೆ ಮತ್ತು ಬಲೆ ಹಾಕುವ ವಿಧಾನಗಳ ಕುರಿತು 15 ರಿಂದ 45 ಸೆಕೆಂಡುಗಳ ಕನ್ನಡ ಕಿರು ವಿಡಿಯೋಗಳು ಲಭ್ಯವಿದೆ.<br><br><button onclick="closeGlobalVoiceAssistant(); openMoreFeature('🎬 FishReels'); renderFishLearningVideos();" style="padding:8px 14px;background:#0284c7;border:none;border-radius:10px;color:white;font-weight:700;cursor:pointer;">🎬 FishReels ವಿಡಿಯೋಗಳನ್ನು ವೀಕ್ಷಿಸಿ</button>`
            : `🎬 <b>FishReels (Educational Shorts)</b>:<br>Watch 15–45 second vertical educational clips in Kannada covering sea safety, GPS navigation, and fish species identification.<br><br><button onclick="closeGlobalVoiceAssistant(); openMoreFeature('🎬 FishReels'); renderFishLearningVideos();" style="padding:8px 14px;background:#0284c7;border:none;border-radius:10px;color:white;font-weight:700;cursor:pointer;">🎬 Open FishReels Video Feed</button>`;

        const voiceText = isKn
            ? `ಫಿಶ್‌ರೀಲ್ಸ್‌ನಲ್ಲಿ ಮೀನುಗಾರಿಕೆ ಮತ್ತು ಸುರಕ್ಷತೆಯ ಕಿರು ಕನ್ನಡ ವಿಡಿಯೋಗಳು ಲಭ್ಯವಿದೆ.`
            : `FishReels offers short educational fishing clips in Kannada. You can watch them in the More menu.`;

        displayAssistantResponse({
            title: isKn ? '🎬 ಮೀನುಗಾರಿಕಾ ವಿಡಿಯೋಗಳು' : '🎬 FishReels Educational Videos',
            text: respText,
            voiceText: voiceText,
            badge: 'FishReels 🎬'
        });
        return;
    }

    // ============================================
    // INTENT 5: WEATHER, SAFETY & FISHING DECISION (BACKEND / TELEMETRY)
    // ============================================
    try {
        const response = await fetch(BACKEND_URL + '/api/decision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: query })
        });
        const data = await response.json();
        
        if (data && data.success && data.decision) {
            playSuccessChime();
            const dec = data.decision;
            const status = dec.status || 'FAVORABLE';
            const isFavorable = (status === 'FAVORABLE' || status === 'GO');
            const isCaution = (status === 'CAUTION');
            const emoji = isFavorable ? '🟢' : isCaution ? '🟡' : '🔴';

            const statusText = isKn
                ? (isFavorable ? 'ಹೋಗಿ (GO - ಪರಿಸ್ಥಿತಿ ಅನುಕೂಲಕರ)' : isCaution ? 'ಎಚ್ಚರಿಕೆ (CAUTION - ಜಾಗರೂಕರಾಗಿರಿ)' : 'ಹೋಗಬೇಡಿ (DON\'T GO - ಅಪಾಯಕಾರಿ)')
                : (isFavorable ? 'GO (CONDITIONS FAVORABLE)' : isCaution ? 'CAUTION (MONITOR CAREFULLY)' : 'DON\'T GO (HAZARDOUS SEA)');

            let reasonsList = '';
            if (dec.reasons && dec.reasons.length > 0) {
                reasonsList = '<ul style="margin:8px 0 0;padding-left:18px;">' +
                    dec.reasons.map(r => `<li style="margin-bottom:3px;">${r}</li>`).join('') +
                    '</ul>';
            }

            const advisory = dec.advisory_text || (isFavorable ? 'ಕಡಲ ಪರಿಸ್ಥಿತಿ ಶಾಂತವಾಗಿದೆ.' : 'ಗಾಳಿಯ ವೇಗ ಹೆಚ್ಚಿದೆ.');
            const spokenText = dec.voice_text || (isFavorable ? 'ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಲು ಅನುಕೂಲಕರವಾಗಿದೆ.' : 'ಕಡಲು ಪ್ರಕ್ಷುಬ್ಧವಾಗಿದೆ, ಜಾಗರೂಕರಾಗಿರಿ.');

            displayAssistantResponse({
                title: `${emoji} ${statusText}`,
                text: `<b>${advisory}</b>${reasonsList}`,
                voiceText: spokenText,
                badge: status,
                decision: dec
            });

            // Update main resultContainer as well so page telemetry syncs
            showResult(dec);
            return;
        }
    } catch (err) {
        console.warn('Backend decision fetch failed, using local telemetry fallback:', err);
    }

    // Offline / Local Telemetry Fallback
    const condData = lastConditionsData;
    let fallbackText = isKn
        ? `🌊 <b>ಕರಾವಳಿ ಹವಾಮಾನ ವರದಿ</b>:<br>ಲೈವ್ ಸರ್ವರ್ ಸಂಪರ್ಕ ಲಭ್ಯವಿಲ್ಲದ ಕಾರಣ ಇತ್ತೀಚಿನ ಕ್ಯಾಶ್ ಡೇಟಾ ಬಳಸಲಾಗಿದೆ. ಕಡಲಿಗೆ ಹೋಗುವ ಮುನ್ನ ಸ್ಥಳೀಯ ಬಂದರು ಧ್ವಜ ಮತ್ತು ಅಧಿಕೃತ ಮುನ್ನೆಚ್ಚರಿಕೆ ಪರಿಶೀಲಿಸಿ.`
        : `🌊 <b>Marine Weather Report</b>:<br>Using local cached telemetry. Always verify local harbor flags and official advisories before sailing.`;
    let fallbackVoice = isKn
        ? `ಕಡಲಿಗೆ ಹೋಗುವ ಮುನ್ನ ಬಂದರಿನ ಅಧಿಕೃತ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.`
        : `Check official harbor flags and warnings before setting out.`;

    if (condData) {
        fallbackText += `<br><br>💨 ಗಾಳಿ: ${condData.wind_speed || '14'} km/h · 🌊 ಅಲೆ: ${condData.wave_height || '1.1'}m`;
    }

    displayAssistantResponse({
        title: isKn ? '⚠️ ಹವಾಮಾನ ಸಲಹಾ ವರದಿ' : '⚠️ Weather Advisory',
        text: fallbackText,
        voiceText: fallbackVoice,
        badge: 'OFFLINE'
    });
}

function displayAssistantResponse(resp) {
    lastAssistantResponseText = resp.text || '';
    lastAssistantVoiceText = resp.voiceText || resp.text || '';

    const modal = document.getElementById('globalVoiceModal');
    if (modal && !modal.classList.contains('active')) {
        modal.classList.add('active');
        updateAssistantContextUI();
    }

    const box = document.getElementById('gvaResponseBox');
    const titleEl = document.getElementById('gvaResponseTitle');
    const textEl = document.getElementById('gvaResponseText');
    const chipEl = document.getElementById('gvaDecisionChip');

    if (titleEl) titleEl.innerHTML = resp.title || '🤖 Assistant Advisory';
    if (textEl) textEl.innerHTML = resp.text || '';

    if (chipEl) {
        if (resp.badge) {
            chipEl.style.display = 'block';
            chipEl.innerHTML = `🏷️ <b>${resp.badge}</b>`;
        } else {
            chipEl.style.display = 'none';
        }
    }

    if (box) {
        box.style.display = 'block';
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Speak response
    if (lastAssistantVoiceText) {
        speakAssistantResponse(lastAssistantVoiceText);
    } else {
        setAssistantState('ready', currentLang === 'kn' ? '🎙️ ಸಿದ್ಧ. ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ' : '🎙️ Ready. Tap mic and speak');
    }
}

function speakAssistantResponse(text) {
    if (!('speechSynthesis' in window)) {
        setAssistantState('ready', currentLang === 'kn' ? '🎙️ ಸಿದ್ಧ. ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ' : '🎙️ Ready. Tap mic and speak');
        return;
    }

    window.speechSynthesis.cancel();
    isAssistantSpeaking = true;

    // Update UI to Speaking State
    setAssistantState('speaking', currentLang === 'kn' ? '🔊 ಉತ್ತರಿಸುತ್ತಿದ್ದೇವೆ...' : '🔊 Speaking response...');
    
    const fab = document.getElementById('globalVoiceFab');
    if (fab) fab.classList.add('speaking');
    const eq = document.getElementById('gvaEqualizer');
    if (eq) {
        eq.classList.add('active');
        eq.classList.add('speaking');
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const hasKannada = /[\u0C80-\u0CFF]/.test(text);
    const chosenVoice = (typeof getBestGuidanceVoice === 'function')
        ? getBestGuidanceVoice(hasKannada ? 'kn' : 'en')
        : null;

    if (chosenVoice) utterance.voice = chosenVoice;
    utterance.lang = hasKannada ? 'kn-IN' : 'en-IN';
    utterance.rate = hasKannada ? 0.88 : 0.94;

    utterance.onend = function() {
        stopAssistantSpeech();
    };
    utterance.onerror = function() {
        stopAssistantSpeech();
    };

    window.speechSynthesis.speak(utterance);
}

function stopAssistantSpeech() {
    isAssistantSpeaking = false;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    const fab = document.getElementById('globalVoiceFab');
    if (fab) fab.classList.remove('speaking');
    const eq = document.getElementById('gvaEqualizer');
    if (eq) {
        eq.classList.remove('speaking');
        if (!isRecording) eq.classList.remove('active');
    }

    const banner = document.getElementById('gvaStateBanner');
    if (banner && banner.classList.contains('speaking')) {
        setAssistantState('ready', currentLang === 'kn' ? '🎙️ ಸಿದ್ಧ. ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ' : '🎙️ Ready. Tap mic and speak');
    }
}

function replayAssistantVoice() {
    playTapSound();
    if (lastAssistantVoiceText) {
        speakAssistantResponse(lastAssistantVoiceText);
    }
}

function submitGvaTextQuery() {
    playTapSound();
    const input = document.getElementById('gvaTextInput');
    if (!input) return;
    const q = input.value.trim();
    if (!q) return;

    input.value = '';
    askGlobalVoiceAssistant(q);
}


// ============================================
// 🔊 KANNADA VOICE GUIDANCE ENGINE
// ============================================
isVoiceGuideEnabled = (localStorage.getItem('fishermen_voice_guide') !== 'false'); // Defaults to ON
let isVoiceGuideSpeaking = false;
let voiceGuideTimer = null;
let currentGuidanceKey = null;
let cachedVoicesList = [];

const VOICE_GUIDES = {
    'page-home': {
        titleKn: 'ಮುಖಪುಟ ಮಾರ್ಗದರ್ಶನ',
        titleEn: 'Home Screen Guidance',
        kn: 'ಫಿಶರ್‌ಮೆನ್-ಎಐ ಮುಖಪುಟಕ್ಕೆ ಸುಸ್ವಾಗತ. ಇಂದಿನ ಕಡಲ ಪರಿಸ್ಥಿತಿ ಮತ್ತು ಮೀನುಗಾರಿಕೆ ಶಿಫಾರಸು ಇಲ್ಲಿದೆ. ಧ್ವನಿ ಮೂಲಕ ಪ್ರಶ್ನೆ ಕೇಳಲು ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ, ಅಥವಾ ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಇಂಧನ ಲೆಕ್ಕಾಚಾರ ಬಟನ್ ಒತ್ತಿ.',
        en: 'Welcome to Fishermen-AI. Check today\'s marine conditions and fishing recommendation here. Tap the mic button to ask questions by voice, or tap the buttons for sea weather, fish market, and fuel calculator.'
    },
    'page-voice': {
        titleKn: 'ಧ್ವನಿ ಕಾಕ್‌ಪಿಟ್ ಮಾರ್ಗದರ್ಶನ',
        titleEn: 'Voice Cockpit Guidance',
        kn: 'ಇದು ಧ್ವನಿ ಸಹಾಯಕ. ನೀಲಿ ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ನಿಮ್ಮ ಮಾತಲ್ಲೇ ಪ್ರಶ್ನೆ ಕೇಳಿ. ಉದಾಹರಣೆಗೆ: ಇಂದು ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ? ಅಥವಾ ಬಂಗಡೆ ಮೀನಿನ ಬೆಲೆ ಎಷ್ಟು? ಎಂದು ಕೇಳಿ.',
        en: 'This is the voice cockpit. Press the blue mic button and speak your question. For example, ask: Should I go fishing today? or What is the price of mackerel?'
    },
    'page-market': {
        titleKn: 'ಬಂದರು ಮಾರುಕಟ್ಟೆ ದರಗಳು',
        titleEn: 'Harbor Fish Rates',
        kn: 'ಇಲ್ಲಿ ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಮಲ್ಪೆ, ಮಂಗಳೂರು, ಗಂಗೊಳ್ಳಿ, ಕಾರವಾರ ಮತ್ತು ಹೊನ್ನಾವರ ಬಂದರುಗಳ ಪರಿಶೀಲಿಸಿದ ಸಗಟು ಮೀನು ದರಗಳಿವೆ. ಬಂದರು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಮೀನಿನ ಹೆಸರನ್ನು ಹುಡುಕಿ ಪ್ರತಿ ಕೆಜಿ ದರ, ಹರಾಜು ಸಮಯ ಮತ್ತು ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸಿ.',
        en: 'Here are verified wholesale dockside fish prices for Malpe, Mangalore, Gangolli, Karwar, and Honnavar harbors. Select a harbor or search fish names to check rates per kilogram, update times, and auction sources.'
    },
    'page-safety': {
        titleKn: 'ಕಡಲ ಸುರಕ್ಷತಾ ಕೇಂದ್ರ',
        titleEn: 'Maritime Safety HUD',
        kn: 'ಇದು ಕಡಲ ಸುರಕ್ಷತಾ ಕೇಂದ್ರ. ಇಲ್ಲಿ ಗಾಳಿ ವೇಗ, ಅಲೆಗಳ ಎತ್ತರ, ಉಬ್ಬರ-ವಿಳಿತದ ಸಮಯ ಮತ್ತು ತುರ್ತು ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಗಳಿವೆ. ಅಪಾಯದ ಸಂದರ್ಭದಲ್ಲಿ ಕೆಂಪು ಎಸ್-ಒ-ಎಸ್ ಬಟನ್ ಬಳಸಿ.',
        en: 'This is the maritime safety dashboard. Here you can check wind speed, wave swell, tide timings, and Coast Guard emergency numbers. Tap the red SOS button in case of danger.'
    },
    'page-more': {
        titleKn: 'ಮೀನುಗಾರರ ಉಪಕರಣಗಳ ಕೇಂದ್ರ',
        titleEn: 'Feature Hub Guidance',
        kn: 'ಇದು ಮೀನುಗಾರರ ಉಪಕರಣಗಳ ಕೇಂದ್ರ. ಇಲ್ಲಿ ಮೀನು ಕಲಿಯೋಣ ವೀಡಿಯೊಗಳು, ದೋಣಿಯ ಇಂಧನ ಲೆಕ್ಕಾಚಾರ, ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಮೀನು ಬೇಟೆ ದಾಖಲೆ ಪರಿಕರಗಳಿವೆ. ನಿಮಗೆ ಬೇಕಾದ ಉಪಕರಣವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
        en: 'This is the Feature Hub. Access fish learning videos, boat fuel calculator, government subsidies, and catch logger tools. Tap any tool to open.'
    },
    'fuel': {
        titleKn: 'ದೋಣಿ ಇಂಧನ ಲೆಕ್ಕಾಚಾರ',
        titleEn: 'Fuel Calculator',
        kn: 'ಇದು ದೋಣಿ ಇಂಧನ ಲೆಕ್ಕಾಚಾರ ಸಾಧನ. ನಿಮ್ಮ ಎಂಜಿನ್ ಅಶ್ವಶಕ್ತಿ ಮತ್ತು ಪ್ರಯಾಣದ ನಾಟಿಕಲ್ ಮೈಲಿ ನಮೂದಿಸಿ. ಅಗತ್ಯವಿರುವ ಡೀಸೆಲ್ ಲೀಟರ್ ಮತ್ತು ಅಂದಾಜು ಖರ್ಚನ್ನು ಸುಲಭವಾಗಿ ತಿಳಿಯಿರಿ.',
        en: 'This is the boat fuel calculator. Enter your engine horsepower and nautical miles to calculate required fuel liters and estimated voyage expense.'
    },
    'videos': {
        titleKn: 'ಮೀನು ಕಲಿಯೋಣ (FishReels)',
        titleEn: 'FishReels Guidance',
        kn: 'ಮೀನು ಕಲಿಯೋಣ ಕಿರು ವೀಡಿಯೊಗಳು. ಮುಂದಿನ ವೀಡಿಯೊ ನೋಡಲು ಮೇಲಕ್ಕೆ ಸ್ವೈಪ್ ಮಾಡಿ, ಹಿಂದಿನ ವೀಡಿಯೊಗೆ ಕೆಳಕ್ಕೆ ಸ್ವೈಪ್ ಮಾಡಿ. ಧ್ವನಿ ಕೇಳಲು ಮೇಲಿನ ಸ್ಪೀಕರ್ ಬಟನ್ ಬಳಸಿ.',
        en: 'Fish learning short videos. Swipe up for the next video, swipe down for the previous video. Use the speaker button at the top to toggle audio.'
    },
    'catchLog': {
        titleKn: 'ಮೀನು ಬೇಟೆ ದಾಖಲೆ',
        titleEn: 'Catch Logger',
        kn: 'ಇದು ದೈನಂದಿನ ಮೀನು ಬೇಟೆ ಲಾಗ್‌ಬುಕ್. ಇಂದು ಹಿಡಿದ ಮೀನಿನ ತಳಿ, ಒಟ್ಟು ತೂಕ ಮತ್ತು ಬಂದರಿನ ಗಳಿಕೆಯನ್ನು ಇಲ್ಲಿ ದಾಖಲಿಸಿ ಇಟ್ಟುಕೊಳ್ಳಿ. ಇದು ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ಉಳಿಯುತ್ತದೆ.',
        en: 'This is the daily catch logger. Record the species, total weight in kilograms, and harbor earnings. Your logs remain saved even offline.'
    },
    'fishGuide': {
        titleKn: 'ಮೀನು ತಳಿ ಮಾರ್ಗದರ್ಶಿ',
        titleEn: 'Fish Species Guide',
        kn: 'ಇದು ಮೀನು ತಳಿ ಮಾರ್ಗದರ್ಶಿ. ಮೀನಿನ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಪಟ್ಟಿಯಿಂದ ಆಯ್ಕೆ ಮಾಡಿ. ಮೀನಿನ ಸ್ಥಳೀಯ ಹೆಸರು, ತಾಜಾತನ ಪರೀಕ್ಷೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರವನ್ನು ತಿಳಿಯಿರಿ.',
        en: 'This is the fish species guide. Take a photo or browse the catalog to check local names, freshness indicators, and harbor price.'
    },
    'prediction': {
        titleKn: 'ಋತುಮಾನ ಮೀನು ಮಾರ್ಗದರ್ಶಿ',
        titleEn: 'Seasonal Guide',
        kn: 'ಇದು ಋತುಮಾನ ಮೀನು ಮಾರ್ಗದರ್ಶಿ. ಕರಾವಳಿಯಲ್ಲಿ ಈ ತಿಂಗಳಲ್ಲಿ ಯಾವ ಮೀನುಗಳು ಹೆಚ್ಚು ಸಿಗುತ್ತವೆ ಎಂಬುದನ್ನು ಇಲ್ಲಿ ನೋಡಿ.',
        en: 'This is the seasonal fish guide. See which fish species have peak landings along the coast during this month.'
    },
    'schemes': {
        titleKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
        titleEn: 'Govt Schemes',
        kn: 'ಇಲ್ಲಿ ಪ್ರಧಾನಮಂತ್ರಿ ಮತ್ಸ್ಯ ಸಂಪದ ಯೋಜನೆ, ದೋಣಿ ಇಂಜಿನ್ ಸಬ್ಸಿಡಿ ಮತ್ತು ಮೀನುಗಾರರ ವಿಮಾ ಸೌಲಭ್ಯಗಳ ಸರ್ಕಾರಿ ವಿವರಗಳಿವೆ.',
        en: 'Here are government schemes, including PM Matsya Sampada Yojana, boat engine subsidies, and insurance programs for fishermen.'
    },
    'dashboard': {
        titleKn: 'ಪ್ರಯಾಣದ ಅಂಕಿಅಂಶ',
        titleEn: 'Voyage Stats',
        kn: 'ಇಲ್ಲಿ ನಿಮ್ಮ ಹಿಂದಿನ ಕಡಲ ಪ್ರವಾಸಗಳ ಸುರಕ್ಷತಾ ನಿರ್ಧಾರಗಳು, ಅನುಕೂಲಕರ ದಿನಗಳ ಪ್ರಮಾಣ ಮತ್ತು ಅಂಕಿಅಂಶಗಳಿವೆ.',
        en: 'Here you can review your voyage safety statistics and the log of past recommendations.'
    },
    'history': {
        titleKn: 'ಸಲಹೆಗಳ ಇತಿಹಾಸ',
        titleEn: 'Advisory History',
        kn: 'ಇಲ್ಲಿ ನೀವು ಈ ಹಿಂದೆ ಪಡೆದ ಕಡಲ ಸುರಕ್ಷತಾ ಸಲಹೆಗಳ ದಿನಾಂಕ ಮತ್ತು ಇತಿಹಾಸವಿದೆ.',
        en: 'Here is the history of all past weather advisories and safety decisions recorded for your device.'
    },
    'export': {
        titleKn: 'ಪ್ರವಾಸ ವರದಿ ಡೌನ್‌ಲೋಡ್',
        titleEn: 'Export Voyage',
        kn: 'ನಿಮ್ಮ ಮೀನುಗಾರಿಕೆ ಪ್ರವಾಸ ಮತ್ತು ಸುರಕ್ಷತಾ ವರದಿಯನ್ನು ಪಠ್ಯ ಕಡತದ ರೂಪದಲ್ಲಿ ಮೊಬೈಲ್‌ಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಇಲ್ಲಿ ಒತ್ತಿ.',
        en: 'Tap here to export and download your voyage telemetry and safety log file.'
    },
    'sos-modal': {
        titleKn: 'ತುರ್ತು ಕಡಲ ರಕ್ಷಣೆ',
        titleEn: 'Emergency SOS',
        kn: 'ತುರ್ತು ರಕ್ಷಣಾ ಕೇಂದ್ರ. ನಿಮ್ಮ ಜಿಪಿಎಸ್ ಸ್ಥಾನವನ್ನು ಕೋಸ್ಟ್ ಗಾರ್ಡ್ 1554 ಅಥವಾ ಕರಾವಳಿ ಪೊಲೀಸ್ 1093 ಗೆ ತಕ್ಷಣ ತಿಳಿಸಿ. ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಲೊಕೇಶನ್ ಕಳುಹಿಸಲು ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ.',
        en: 'Emergency assistance. Share your live GPS coordinates with the Indian Coast Guard 1554 or Coastal Police 1093. Tap the WhatsApp button to dispatch location.'
    }
};

function warmUpVoices() {
    if ('speechSynthesis' in window) {
        cachedVoicesList = window.speechSynthesis.getVoices() || [];
    }
}
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = warmUpVoices;
    warmUpVoices();
}

function getBestGuidanceVoice(lang) {
    if (!('speechSynthesis' in window)) return null;
    const voices = (cachedVoicesList && cachedVoicesList.length) ? cachedVoicesList : (window.speechSynthesis.getVoices() || []);
    if (!voices || voices.length === 0) return null;

    if (lang === 'kn') {
        return voices.find(v => v.lang && (v.lang.toLowerCase() === 'kn-in' || v.lang.toLowerCase() === 'kn')) ||
               voices.find(v => v.name && (v.name.toLowerCase().includes('kannada') || v.name.includes('ಕನ್ನಡ'))) ||
               voices.find(v => v.lang && v.lang.toLowerCase().startsWith('kn')) || null;
    } else {
        return voices.find(v => v.lang && v.lang.toLowerCase() === 'en-in') ||
               voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en')) || null;
    }
}

function updateVoiceGuideToggleUI() {
    const btn = document.getElementById('voiceGuideToggleBtn');
    const textEl = document.getElementById('voiceGuideText');
    const iconEl = document.getElementById('voiceGuideIcon');
    const isKn = (currentLang === 'kn');

    if (btn) {
        btn.classList.toggle('active', isVoiceGuideEnabled);
        btn.setAttribute('title', isVoiceGuideEnabled
            ? (isKn ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಆನ್ ಆಗಿದೆ (ಟ್ಯಾಪ್ ಮಾಡಿ ಆಫ್ ಮಾಡಲು)' : 'Voice Guidance is ON (Tap to mute)')
            : (isKn ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಆಫ್ ಆಗಿದೆ (ಟ್ಯಾಪ್ ಮಾಡಿ ಆನ್ ಮಾಡಲು)' : 'Voice Guidance is OFF (Tap to enable)'));
        btn.setAttribute('aria-label', isVoiceGuideEnabled ? 'Voice Guidance ON' : 'Voice Guidance OFF');
    }
    if (textEl) {
        textEl.textContent = isVoiceGuideEnabled
            ? (isKn ? 'ಧ್ವನಿ ON' : 'Voice ON')
            : (isKn ? 'ಧ್ವನಿ OFF' : 'Voice OFF');
    }
    if (iconEl) {
        iconEl.textContent = isVoiceGuideEnabled ? '🔊' : '🔈';
    }
}

function toggleVoiceGuide() {
    playTapSound();
    isVoiceGuideEnabled = !isVoiceGuideEnabled;
    localStorage.setItem('fishermen_voice_guide', isVoiceGuideEnabled ? 'true' : 'false');
    updateVoiceGuideToggleUI();

    if (!isVoiceGuideEnabled) {
        stopVoiceGuidance();
    } else {
        const isKn = (currentLang === 'kn');
        speakGuidance(
            isKn ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಆನ್ ಆಗಿದೆ. ಪ್ರತಿಯೊಂದು ಪರದೆಯ ಸೂಚನೆಗಳನ್ನು ನೀವು ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಬಹುದು.' : 'Voice guidance enabled. You will hear spoken instructions across screens.',
            isKn ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಸಕ್ರಿಯ' : 'Voice Guide Active'
        );
    }
}

function stopVoiceGuidance() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    isVoiceGuideSpeaking = false;
    const hud = document.getElementById('voiceGuideHud');
    if (hud) hud.style.display = 'none';

    const toggleBtn = document.getElementById('voiceGuideToggleBtn');
    if (toggleBtn) toggleBtn.classList.remove('speaking');
}

function speakGuidance(text, titleText) {
    if (!('speechSynthesis' in window) || !text) return;

    window.speechSynthesis.cancel();

    const isKn = (currentLang === 'kn') || /[\u0C80-\u0CFF]/.test(text);
    const utterance = new SpeechSynthesisUtterance(text);
    const chosenVoice = getBestGuidanceVoice(isKn ? 'kn' : 'en');
    if (chosenVoice) {
        utterance.voice = chosenVoice;
    }
    utterance.lang = isKn ? 'kn-IN' : 'en-IN';
    utterance.rate = isKn ? 0.88 : 0.94; // Calm, clear tempo
    utterance.pitch = 1.0;

    // Show floating Voice HUD
    const hud = document.getElementById('voiceGuideHud');
    const hudTitle = document.getElementById('voiceGuideHudTitle');
    const hudSub = document.getElementById('voiceGuideHudSub');
    const toggleBtn = document.getElementById('voiceGuideToggleBtn');

    if (hud) {
        if (hudTitle) hudTitle.textContent = titleText || (isKn ? '🔊 ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ' : '🔊 Voice Guidance');
        if (hudSub) hudSub.textContent = text.length > 55 ? text.substring(0, 52) + '...' : text;
        hud.style.display = 'flex';
    }

    if (toggleBtn) toggleBtn.classList.add('speaking');
    isVoiceGuideSpeaking = true;

    utterance.onend = function() {
        isVoiceGuideSpeaking = false;
        if (hud) hud.style.display = 'none';
        if (toggleBtn) toggleBtn.classList.remove('speaking');
    };

    utterance.onerror = function() {
        isVoiceGuideSpeaking = false;
        if (hud) hud.style.display = 'none';
        if (toggleBtn) toggleBtn.classList.remove('speaking');
    };

    window.speechSynthesis.speak(utterance);
}

function getCurrentScreenKey() {
    if (document.body.classList.contains('shorts-mode-active')) return 'videos';
    const sosModal = document.getElementById('sosModal');
    if (sosModal && sosModal.style.display !== 'none') return 'sos-modal';

    const moreView = document.getElementById('moreFeatureView');
    if (moreView && moreView.style.display !== 'none' && currentMoreFeature) {
        return currentMoreFeature;
    }

    const activePage = document.querySelector('.page.active');
    return activePage ? activePage.id : 'page-home';
}

function playVoiceGuidance(key, force = false) {
    if (!force && !isVoiceGuideEnabled) return;
    if (document.body.classList.contains('shorts-mode-active') && !force) return; // Don't interrupt reels unless tapped

    const isKn = (currentLang === 'kn');
    const guide = VOICE_GUIDES[key];
    if (!guide) return;

    currentGuidanceKey = key;
    const text = isKn ? guide.kn : (guide.en || guide.kn);
    const title = isKn ? guide.titleKn : (guide.titleEn || guide.titleKn);

    speakGuidance(text, title);
}

function playCurrentScreenGuidance() {
    playTapSound();
    const key = getCurrentScreenKey();
    playVoiceGuidance(key, true); // force=true ensures playback even if auto-mode was turned off
}

function onScreenNavigated(screenKey) {
    if (!isVoiceGuideEnabled) return;
    if (voiceGuideTimer) clearTimeout(voiceGuideTimer);
    voiceGuideTimer = setTimeout(() => {
        playVoiceGuidance(screenKey, false);
    }, 280);
}

function speakResponse(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        showVoiceState('responding', '🔊 Speaking response...');
        const utterance = new SpeechSynthesisUtterance(text);
        const hasKannada = /[\u0C80-\u0CFF]/.test(text);
        const chosenVoice = getBestGuidanceVoice(hasKannada ? 'kn' : 'en');
        if (chosenVoice) {
            utterance.voice = chosenVoice;
        }
        utterance.lang = hasKannada ? 'kn-IN' : 'en-IN';
        utterance.rate = hasKannada ? 0.88 : 0.94;
        utterance.onend = function() { hideVoiceState(); };
        utterance.onerror = function() { hideVoiceState(); };
        window.speechSynthesis.speak(utterance);
    }
}



// ============================================
// VOICE PROMPTS RUNNER (UNIFIED WITH GLOBAL ASSISTANT)
// ============================================
function runVoicePrompt(index) {
    playTapSound();
    let query = '';
    if (currentLang === 'kn') {
        if (index === 1) query = 'ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?';
        else if (index === 2) query = 'ಬಂಗಡೆ ಮೀನು ಬೆಲೆ ಎಷ್ಟು?';
        else if (index === 3) query = 'ಈಗ ಗಾಳಿ ಮತ್ತು ಅಲೆಗಳ ಸ್ಥಿತಿ ಹೇಗಿದೆ?';
        else if (index === 4) query = '100 HP ದೋಣಿಗೆ ಎಷ್ಟು ಡೀಸೆಲ್ ಬೇಕು?';
        else if (index === 5) query = 'ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ತುರ್ತು ಸಂಖ್ಯೆ ಏನು?';
    } else {
        if (index === 1) query = 'Should I go fishing tomorrow?';
        else if (index === 2) query = 'What is mackerel fish rate today?';
        else if (index === 3) query = 'What are current wind and wave conditions?';
        else if (index === 4) query = 'How much diesel for 100 HP engine?';
        else if (index === 5) query = 'What is Coast Guard rescue hotline?';
    }
    askGlobalVoiceAssistant(query);
}
