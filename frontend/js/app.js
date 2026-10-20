// ============================================
// APPLICATION ENTRY POINT & BOOTSTRAPPER
// ============================================

// ============================================
// KEYBOARD INPUT FALLBACK
// ============================================
function toggleTextFallback() {
    playTapSound();
    const el = document.getElementById('textFallback');
    if (el) el.classList.toggle('active');
}
function submitTextInput() {
    const input = document.getElementById('textInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    toggleTextFallback();
    askGlobalVoiceAssistant(text);
}

document.addEventListener('DOMContentLoaded', function(){
    const input = document.getElementById('textInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') submitTextInput();
        });
    }
});



// ============================================
// INITIALIZATION
// ============================================
initGlobalSpeech();
applyTheme(currentTheme);
applyLanguage(currentLang);
checkBackend();
setInterval(checkBackend, 30000);
loadHomeConditions();
loadHomeWeather();
loadBestTime();

window.addEventListener('online', () => {
    checkBackend();
    loadHomeConditions(true);
});
window.addEventListener('offline', () => {
    checkBackend();
    loadHomeConditions();
});

// Register Service Worker for PWA & Deep-Sea Offline Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js?v=24')
            .then(reg => {
                console.log('🐟 [PWA] Service Worker v24 registered:', reg.scope);
                reg.update();
            })
            .catch(err => console.log('🐟 [PWA] SW registration failed:', err));
    });
}

console.log('🐟 Fishermen-AI 2.0 Showstopper UX Loaded Successfully!');
