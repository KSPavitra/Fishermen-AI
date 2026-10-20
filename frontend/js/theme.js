// ============================================
// THEME CONTROLLER (LIGHT / DARK SUNLIGHT MODE)
// ============================================
currentTheme = localStorage.getItem('fishermen_theme');
if (!currentTheme) {
    currentTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
}

function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('fishermen_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f0f7ff' : '#030712');
    updateThemeToggleUI();
}

function toggleTheme() {
    playTapSound();
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function updateThemeToggleUI() {
    const icon = document.getElementById('themeToggleIcon');
    const text = document.getElementById('themeToggleText');
    const btn = document.getElementById('themeToggleBtn');
    const t = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : (translations ? translations.kn : null);
    if (currentTheme === 'dark') {
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = (t && t.themeLight) ? t.themeLight : 'Light';
        if (btn) {
            btn.setAttribute('title', currentLang === 'kn' ? 'ಬೆಳಕಿನ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ (Light Mode)' : 'Switch to Light Mode');
            btn.setAttribute('aria-label', currentLang === 'kn' ? 'ಬೆಳಕಿನ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ' : 'Switch to Light Mode');
        }
    } else {
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = (t && t.themeDark) ? t.themeDark : 'Dark';
        if (btn) {
            btn.setAttribute('title', currentLang === 'kn' ? 'ಕತ್ತಲೆಯ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ (Dark Mode)' : 'Switch to Dark Mode');
            btn.setAttribute('aria-label', currentLang === 'kn' ? 'ಕತ್ತಲೆಯ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ' : 'Switch to Dark Mode');
        }
    }
}
