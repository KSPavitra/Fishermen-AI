// ============================================
// GLOBAL APPLICATION STATE
// ============================================
let currentLang = localStorage.getItem('fishermen_language') || 'kn';
let currentTheme = localStorage.getItem('fishermen_theme') || 'dark';
let isVoiceGuideEnabled = (localStorage.getItem('fishermen_voice_guide') !== 'false'); // Defaults to ON
let selectedMarketId = 'malpe';
let lastConditionsData = null;
let currentMoreFeature = null;

// Voice Assistant & Recording State
let isAssistantSpeaking = false;
let isRecording = false;
let recognition = null;
let lastAssistantQuery = '';
let lastAssistantVoice = '';
let lastDecisionVoice = '';
let currentScreenGuidanceText = '';

// More Features & Uploads
let selectedFishFile = null;
let deferredInstallPrompt = null;
