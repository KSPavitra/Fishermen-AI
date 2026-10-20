// ============================================
// QUICK ACTIONS
// ============================================
const sosBtnEl = document.getElementById('sosBtn');
if (sosBtnEl) sosBtnEl.addEventListener('click', openSOS);
const marketBtnEl = document.getElementById('marketBtn');
if (marketBtnEl) marketBtnEl.addEventListener('click', function() {
    showPage('page-market');
});

let currentGpsCoords = null;

function openSOS() {
    playTapSound();
    const modal = document.getElementById('sosModal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    const isKn = (currentLang === 'kn');
    const coordEl = document.getElementById('sosCoordinates');
    const statusEl = document.getElementById('sosGpsStatus');
    const metaEl = document.getElementById('sosGpsMeta');
    
    if (coordEl) coordEl.textContent = isKn ? 'ಉಪಗ್ರಹ ಜಿಪಿಎಸ್ ಹುಡುಕಲಾಗುತ್ತಿದೆ...' : 'Acquiring satellite fix...';
    if (statusEl) { statusEl.textContent = isKn ? 'ಹುಡುಕಲಾಗುತ್ತಿದೆ...' : 'Acquiring...'; statusEl.style.color = '#facc15'; }
    if (metaEl) metaEl.textContent = isKn ? 'ಫೋನ್‌ನಿಂದ ಉಪಗ್ರಹ ಜಿಪಿಎಸ್ ಸಂಪರ್ಕ ಕೋರಲಾಗುತ್ತಿದೆ...' : 'Requesting GPS satellite fix from phone...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const acc = Math.round(pos.coords.accuracy || 0);
                const timeStr = new Date(pos.timestamp).toLocaleTimeString();
                currentGpsCoords = { lat: lat, lon: lon, accuracy: acc, time: timeStr };

                if (coordEl) coordEl.innerHTML = `${lat.toFixed(5)}° N, ${lon.toFixed(5)}° E`;
                if (statusEl) { statusEl.textContent = isKn ? '● GPS ಲಭ್ಯವಿದೆ' : '● GPS Locked'; statusEl.style.color = '#10b981'; }
                if (metaEl) metaEl.innerHTML = isKn ? `ಉಪಗ್ರಹ ನಿಖರತೆ: ±${acc}m · ಸಮಯ: ${timeStr}` : `Satellite accuracy: ±${acc}m · Fixed at ${timeStr}`;
            },
            err => {
                if (coordEl) coordEl.textContent = isKn ? '❌ ಲೊಕೇಶನ್ ಲಭ್ಯವಿಲ್ಲ' : '❌ Location Unavailable';
                if (statusEl) { statusEl.textContent = isKn ? 'GPS ವಿಫಲವಾಗಿದೆ' : 'GPS Failed'; statusEl.style.color = '#ef4444'; }
                if (metaEl) metaEl.textContent = isKn ? 'ದಯವಿಟ್ಟು ಸಾಧನ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಲೊಕೇಶನ್ ಅನುಮತಿ ನೀಡಿ.' : 'Please enable location / GPS permissions in device settings.';
            },
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
        );
    } else {
        if (coordEl) coordEl.textContent = isKn ? '❌ ಈ ಸಾಧನದಲ್ಲಿ ಜಿಪಿಎಸ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ' : '❌ GPS Not Supported';
        if (statusEl) { statusEl.textContent = isKn ? 'ಲಭ್ಯವಿಲ್ಲ' : 'Unavailable'; statusEl.style.color = '#ef4444'; }
    }

    if (typeof onScreenNavigated === 'function') {
        onScreenNavigated('sos-modal');
    }
}

function closeSOS() {
    const modal = document.getElementById('sosModal');
    if (modal) modal.style.display = 'none';
    if (typeof stopVoiceGuidance === 'function') {
        stopVoiceGuidance();
    }
}

function copyGpsCoordinates() {
    playTapSound();
    const btn = document.getElementById('copyCoordsBtn');
    const isKn = (currentLang === 'kn');
    if (currentGpsCoords) {
        const text = `${currentGpsCoords.lat.toFixed(5)}, ${currentGpsCoords.lon.toFixed(5)} (±${currentGpsCoords.accuracy}m at ${currentGpsCoords.time})`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                if (btn) {
                    btn.textContent = isKn ? '✅ ಜಿಪಿಎಸ್ ಸ್ಥಾನ ನಕಲಿಸಲಾಗಿದೆ!' : '✅ Coordinates Copied to Clipboard!';
                    setTimeout(() => { btn.textContent = isKn ? '📋 ಜಿಪಿಎಸ್ ಸ್ಥಾನ ನಕಲಿಸಿ' : '📋 Copy GPS Coordinates'; }, 3000);
                }
            }).catch(() => {
                prompt(isKn ? 'ನಿಮ್ಮ ಜಿಪಿಎಸ್ ಸ್ಥಾನ ನಕಲಿಸಿ:' : 'Copy your GPS coordinates:', text);
            });
        } else {
            prompt(isKn ? 'ನಿಮ್ಮ ಜಿಪಿಎಸ್ ಸ್ಥಾನ ನಕಲಿಸಿ:' : 'Copy your GPS coordinates:', text);
        }
    } else {
        if (btn) {
            btn.textContent = isKn ? '⚠️ ಉಪಗ್ರಹ ಸಂಪರ್ಕಕ್ಕೆ ಕಾಯಲಾಗುತ್ತಿದೆ...' : '⚠️ Waiting for GPS satellite lock...';
            setTimeout(() => { btn.textContent = isKn ? '📋 ಜಿಪಿಎಸ್ ಸ್ಥಾನ ನಕಲಿಸಿ' : '📋 Copy GPS Coordinates'; }, 2500);
        }
    }
}

function confirmEmergencyCall(number, name) {
    playTapSound();
    const modal = document.getElementById('callConfirmModal');
    const title = document.getElementById('confirmCallTitle');
    const msg = document.getElementById('confirmCallMsg');
    const link = document.getElementById('confirmCallLink');
    if (!modal) {
        window.location.href = 'tel:' + number;
        return;
    }
    const isKn = (currentLang === 'kn');
    if (title) title.textContent = isKn ? `${name} ಗೆ ಕರೆ ಮಾಡಬೇಕೇ?` : 'Call ' + name + '?';
    if (msg) msg.textContent = isKn
        ? `ನೀವು ತುರ್ತು ಸೇವೆ ${number} ಗೆ ಕರೆ ಮಾಡುತ್ತಿದ್ದೀರಿ. ಮುಂದುವರಿಯಲು ದೃಢೀಕರಿಸಿ.`
        : 'You are about to dial emergency service ' + number + '. Please confirm to proceed.';
    if (link) {
        link.href = 'tel:' + number;
        link.textContent = isKn ? 'ಹೌದು, ಕರೆ ಮಾಡಿ' : 'Yes, Call Now';
        link.onclick = function() {
            modal.style.display = 'none';
        };
    }
    modal.style.display = 'flex';
}

function sendEmergencyBeacon() {
    playTapSound();
    const isKn = (currentLang === 'kn');
    let coordsText = currentGpsCoords
        ? `${currentGpsCoords.lat.toFixed(5)}, ${currentGpsCoords.lon.toFixed(5)} (Accuracy: ±${currentGpsCoords.accuracy}m)`
        : (isKn ? 'ಸ್ಥಳ/ಜಿಪಿಎಸ್ ಲಭ್ಯವಿಲ್ಲ' : 'Coordinates acquiring/unavailable');
    let mapLink = currentGpsCoords
        ? `https://maps.google.com/?q=${currentGpsCoords.lat},${currentGpsCoords.lon}`
        : (isKn ? 'ದಯವಿಟ್ಟು ಭಾರತೀಯ ಕೋಸ್ಟ್ ಗಾರ್ಡ್ 1554 ಗೆ ಕರೆ ಮಾಡಿ' : 'Please contact Indian Coast Guard 1554');

    const msg = isKn
        ? `🆘 ತುರ್ತು ಸಾಗರ ರಕ್ಷಣಾ ಸಂದೇಶ (EMERGENCY DISTRESS BEACON)\n\n📍 ಸಮುದ್ರ ಸ್ಥಾನ:\n${coordsText}\n\n🗺️ ನಕ್ಷೆ ಲಿಂಕ್:\n${mapLink}\n\n⏰ ಸಮಯ: ${new Date().toLocaleTimeString()}\nಮೂಲ: ಕರಾವಳಿ ತೀರ (Fishermen-AI). ಸಮುದ್ರದಲ್ಲಿ ತುರ್ತು ರಕ್ಷಣೆ ಅಗತ್ಯವಿದೆ. ದಯವಿಟ್ಟು ಕೋಸ್ಟ್ ಗಾರ್ಡ್ 1554 ಸಂಪರ್ಕಿಸಿ.`
        : `🆘 EMERGENCY MARITIME DISTRESS BEACON\n\n📍 Sea Coordinates:\n${coordsText}\n\n🗺️ Map Location:\n${mapLink}\n\n⏰ Time: ${new Date().toLocaleTimeString()}\nOrigin: Karavali Coast (Fishermen-AI). Require maritime assistance. Please contact Coast Guard 1554.`;

    if (navigator.share) {
        navigator.share({ title: isKn ? '🆘 ತುರ್ತು ಸಾಗರ ರಕ್ಷಣಾ ಸಂದೇಶ' : '🆘 Maritime Distress Beacon', text: msg }).catch(() => {});
        return;
    }
    window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(msg), '_blank');
}

function shareLocationWithFamily() {
    playTapSound();
    const isKn = (currentLang === 'kn');
    if (!navigator.geolocation) {
        alert(isKn ? 'ಈ ಸಾಧನದಲ್ಲಿ ಜಿಪಿಎಸ್ ಲಭ್ಯವಿಲ್ಲ.' : 'GPS location is not supported on this device.');
        return;
    }
    navigator.geolocation.getCurrentPosition(
        async function(pos) {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const acc = Math.round(pos.coords.accuracy || 0);
            const msg = isKn
                ? `📍 Fishermen-AI ಸುರಕ್ಷಿತ ಲೊಕೇಶನ್ ಹಂಚಿಕೆ\n\nಸಮುದ್ರ ಸ್ಥಾನ: ${lat.toFixed(5)}, ${lng.toFixed(5)} (±${acc}m)\nನಕ್ಷೆ: https://maps.google.com/?q=${lat},${lng}\nಸಮಯ: ${new Date().toLocaleTimeString()}\nಕರ್ನಾಟಕ ಕರಾವಳಿ ತೀರ.`
                : `📍 Fishermen-AI Safe Location Share\n\nSea Position: ${lat.toFixed(5)}, ${lng.toFixed(5)} (±${acc}m)\nMaps Link: https://maps.google.com/?q=${lat},${lng}\nTime: ${new Date().toLocaleTimeString()}\nKaravali Coast, Karnataka.`;
            if (navigator.share) {
                try { await navigator.share({ title: isKn ? '📍 ನನ್ನ ಸಮುದ್ರ ಸ್ಥಾನ' : '📍 My Sea Location', text: msg }); return; } catch (e) {}
            }
            window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(msg), '_blank');
        },
        () => alert(isKn ? 'ನಿಮ್ಮ ಜಿಪಿಎಸ್ ಸ್ಥಾನ ಪಡೆಯಲು ಲೊಕೇಶನ್ ಅನುಮತಿ ನೀಡಿ.' : 'Please enable location permissions to share your GPS position.')
    );
}

function saveToHistory(decision) {
    try {
        const trips = JSON.parse(localStorage.getItem('trips') || '[]');
        trips.push({ date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), status: decision.status });
        localStorage.setItem('trips', JSON.stringify(trips.slice(-20)));
    } catch {}
}
