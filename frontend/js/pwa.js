// ============================================
// PWA INSTALLATION CONTROLLER (ADD TO HOME SCREEN)
// ============================================
deferredInstallPrompt = null;

function isPwaStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
}

function isIosDevice() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
}

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredInstallPrompt = e;

    // Show banner only if not standalone and not dismissed this session
    if (!isPwaStandalone() && !sessionStorage.getItem('pwa_banner_dismissed')) {
        const banner = document.getElementById('pwaInstallBanner');
        if (banner) {
            banner.style.display = 'flex';
        }
    }
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    dismissPwaBanner();
    console.log('🐟 [PWA] Fishermen-AI successfully installed on device!');
    showVoiceState('responding', currentLang === 'kn' ? '✅ ಆ್ಯಪ್ ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ!' : '✅ App successfully added to Home Screen!');
});

function triggerPwaInstall() {
    playTapSound();
    if (isPwaStandalone()) {
        showVoiceState('responding', currentLang === 'kn' ? '✅ ಆ್ಯಪ್ ಈಗಾಗಲೇ ಇನ್‌ಸ್ಟಾಲ್ ಆಗಿದೆ' : '✅ Fishermen-AI is already running as installed app');
        return;
    }

    if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('🐟 [PWA] User accepted the install prompt');
                dismissPwaBanner();
            }
            deferredInstallPrompt = null;
        });
        return;
    }

    // iOS or browser fallback modal
    openIosInstallModal();
}

function dismissPwaBanner() {
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) {
        banner.style.display = 'none';
    }
    try {
        sessionStorage.setItem('pwa_banner_dismissed', 'true');
    } catch (e) {}
}

function openIosInstallModal() {
    playTapSound();
    const modal = document.getElementById('pwaIosModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeIosInstallModal() {
    playTapSound();
    const modal = document.getElementById('pwaIosModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Check on initial startup: on mobile browser (not standalone), show banner after brief delay
window.addEventListener('DOMContentLoaded', () => {
    if (!isPwaStandalone() && !sessionStorage.getItem('pwa_banner_dismissed')) {
        setTimeout(() => {
            const banner = document.getElementById('pwaInstallBanner');
            if (banner && (deferredInstallPrompt || isIosDevice())) {
                banner.style.display = 'flex';
            }
        }, 1500);
    }
});
