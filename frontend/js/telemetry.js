// ============================================
// MARINE TELEMETRY & CONDITIONS CONTROLLER
// ============================================

// ============================================
// 🌦️ TODAY'S FISHING CONDITIONS & HOMEPAGE LOGIC
// ============================================
lastConditionsData = null;
let lastConditionsDecision = null;
let lastConditionsTimestamp = null;
let lastConditionsIsCached = false;

function getWindDirectionText(deg, isKn) {
    if (deg === undefined || deg === null || isNaN(deg)) return isKn ? 'ಪಶ್ಚಿಮ (W)' : 'W (West)';
    const directionsEn = [
        'N (North)', 'NNE', 'NE', 'ENE',
        'E (East)', 'ESE', 'SE', 'SSE',
        'S (South)', 'SSW', 'SW', 'WSW',
        'W (West)', 'WNW', 'NW', 'NNW'
    ];
    const directionsKn = [
        'ಉತ್ತರ (N)', 'ಉತ್ತರ-ಈಶಾನ್ಯ (NNE)', 'ಈಶಾನ್ಯ (NE)', 'ಪೂರ್ವ-ಈಶಾನ್ಯ (ENE)',
        'ಪೂರ್ವ (E)', 'ಪೂರ್ವ-ಆಗ್ನೇಯ (ESE)', 'ಆಗ್ನೇಯ (SE)', 'ದಕ್ಷಿಣ-ಆಗ್ನೇಯ (SSE)',
        'ದಕ್ಷಿಣ (S)', 'ದಕ್ಷಿಣ-ನೈಋತ್ಯ (SSW)', 'ನೈಋತ್ಯ (SW)', 'ಪಶ್ಚಿಮ-ನೈಋತ್ಯ (WSW)',
        'ಪಶ್ಚಿಮ (W)', 'ಪಶ್ಚಿಮ-ವಾಯುವ್ಯ (WNW)', 'ವಾಯುವ್ಯ (NW)', 'ಉತ್ತರ-ವಾಯುವ್ಯ (NNW)'
    ];
    const index = Math.round(deg / 22.5) % 16;
    return isKn ? directionsKn[index] : directionsEn[index];
}

function getSeaConditionText(windSpeed, isKn) {
    const w = parseFloat(windSpeed) || 0;
    if (w >= 32) {
        return isKn ? 'ಪ್ರಕ್ಷುಬ್ಧ ಅಲೆಗಳು (>2.0m ತರಂಗ, ಎಚ್ಚರಿಕೆ)' : 'Rough (>2.0m swell, hazardous)';
    } else if (w >= 22) {
        return isKn ? 'ಚಂಚಲ ಕಡಲು (1.4m–1.8m ಅಲೆಗಳು)' : 'Choppy (1.4m–1.8m wave surge)';
    } else if (w >= 12) {
        return isKn ? 'ಮಧ್ಯಮ ಕಡಲು (0.8m–1.3m ಅಲೆಗಳು)' : 'Moderate (0.8m–1.3m swell)';
    } else {
        return isKn ? 'ಶಾಂತ ಸಮುದ್ರ (0.4m–0.7m ಸಣ್ಣ ಅಲೆಗಳು)' : 'Calm (0.4m–0.7m gentle swell)';
    }
}

function formatWeatherSummary(desc, temp, isKn) {
    if (!desc) return isKn ? 'ಲಭ್ಯವಿಲ್ಲ' : 'Unavailable';
    const d = desc.toLowerCase();
    const weatherMapKn = {
        'clear sky': 'ಸ್ವಚ್ಛ ಆಕಾಶ (Clear Sky)',
        'few clouds': 'ಸ್ವಲ್ಪ ಮೋಡ (Few Clouds)',
        'scattered clouds': 'ಚದುರಿದ ಮೋಡ (Scattered Clouds)',
        'broken clouds': 'ಭಾಗಶಃ ಮೋಡ (Broken Clouds)',
        'overcast clouds': 'ದಟ್ಟ ಮೋಡ (Overcast)',
        'light rain': 'ಹಗುರ ಮಳೆ (Light Rain)',
        'moderate rain': 'ಸಾಧಾರಣ ಮಳೆ (Moderate Rain)',
        'heavy intensity rain': 'ಭಾರೀ ಮಳೆ (Heavy Rain)',
        'thunderstorm': 'ಗುಡುಗು ಸಹಿತ ಮಳೆ (Thunderstorm)',
        'mist': 'ಮಂಜು (Mist)',
        'haze': 'ಮಬ್ಬು (Haze)'
    };
    const descText = isKn ? (weatherMapKn[d] || desc) : (desc.charAt(0).toUpperCase() + desc.slice(1));
    return temp ? `${descText} · ${temp}°C` : descText;
}

function formatRelativeTime(timestamp, isKn) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const diffMins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diffMins <= 2) {
        return isKn ? `${timeStr} (ಈಗಷ್ಟೇ ನವೀಕರಿಸಲಾಗಿದೆ)` : `${timeStr} (Just updated)`;
    } else if (diffMins < 60) {
        return isKn ? `${timeStr} (${diffMins} ನಿಮಿಷಗಳ ಹಿಂದೆ)` : `${timeStr} (${diffMins} mins ago)`;
    } else {
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        return isKn ? `${timeStr} (${hours} ಗಂಟೆ ${mins} ನಿಮಿಷಗಳ ಹಿಂದೆ)` : `${timeStr} (${hours}h ${mins}m ago)`;
    }
}

function renderConditionsData(weatherData, decision, timestamp, isCached) {
    lastConditionsData = weatherData;
    lastConditionsDecision = decision;
    lastConditionsTimestamp = timestamp || Date.now();
    lastConditionsIsCached = !!isCached;

    const isKn = (currentLang === 'kn');
    const recBox = document.getElementById('homeRecommendationBox');
    const statusEl = document.getElementById('homeDecisionStatus');
    const subEl = document.getElementById('homeAdvisorySub');
    const weatherVal = document.getElementById('condWeatherVal');
    const windVal = document.getElementById('condWindVal');
    const seaVal = document.getElementById('condSeaVal');
    const timeText = document.getElementById('condTimestampText');
    const timeIcon = document.getElementById('condTimestampIcon');
    const liveDot = document.getElementById('condLiveDot');
    const liveStatus = document.getElementById('condLiveStatus');

    // 1. Recommendation Box
    let status = decision && decision.status ? decision.status : 'UNKNOWN';
    if (!decision && weatherData) {
        const w = parseFloat(weatherData.wind) || 0;
        const d = (weatherData.weather || '').toLowerCase();
        if (w >= 32 || d.includes('thunderstorm') || d.includes('squall') || d.includes('heavy rain')) {
            status = "DON'T GO";
        } else if (w >= 22 || d.includes('rain')) {
            status = 'CAUTION';
        } else {
            status = 'GO';
        }
    }

    const isFavorable = (status === 'FAVORABLE' || status === 'GO');
    const isCaution = (status === 'CAUTION');
    const isRough = (status === 'ROUGH' || status === "DON'T GO");

    if (recBox && statusEl) {
        recBox.className = 'recommendation-hero-box ' + (isFavorable ? 'go' : isCaution ? 'caution' : 'dontgo');
        if (isFavorable) {
            statusEl.textContent = isKn ? '🟢 ಹೋಗಿ (GO - ಪರಿಸ್ಥಿತಿ ಅನುಕೂಲಕರ)' : '🟢 GO (CONDITIONS FAVORABLE)';
            if (subEl) subEl.textContent = isKn
                ? 'ಕರಾವಳಿ ಸಣ್ಣ ಮತ್ತು ಯಾಂತ್ರಿಕ ದೋಣಿಗಳಿಗೆ ಶಾಂತ ಕಡಲು · ಸುರಕ್ಷಿತ ಪ್ರಯಾಣ'
                : 'Generally favorable marine conditions · Good for coastal craft';
        } else if (isCaution) {
            statusEl.textContent = isKn ? '🟡 ಎಚ್ಚರಿಕೆ (CAUTION - ಜಾಗರೂಕರಾಗಿರಿ)' : '🟡 CAUTION (MONITOR CONDITIONS)';
            if (subEl) subEl.textContent = isKn
                ? 'ಮಧ್ಯಮ ಅಲೆಗಳು ಅಥವಾ ಗಾಳಿ · ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಯೊಂದಿಗೆ ಕಡಲಿಗೆ ಇಳಿಯಿರಿ'
                : 'Moderate swell or breezy conditions · Monitor local harbor flags';
        } else if (isRough) {
            statusEl.textContent = isKn ? '🔴 ಹೋಗಬೇಡಿ (DON\'T GO - ಅಪಾಯಕಾರಿ)' : '🔴 DON\'T GO (HAZARDOUS SEA)';
            if (subEl) subEl.textContent = isKn
                ? 'ಪ್ರಕ್ಷುಬ್ಧ ಅಲೆಗಳು ಅಥವಾ ಬಿರುಗಾಳಿ ಗಾಳಿ · ಕಡಲಿಗೆ ಹೋಗುವುದನ್ನು ತಪ್ಪಿಸಿ'
                : 'Hazardous sea state or strong winds detected · Stay ashore in port';
        } else {
            statusEl.textContent = isKn ? '⚠️ ಪರಿಶೀಲಿಸಿ (CHECK HARBOR)' : '⚠️ CHECK HARBOR FLAGS';
            if (subEl) subEl.textContent = isKn
                ? 'ಬಂದರಿನ ಧ್ವಜ ಮತ್ತು ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ಸೂಚನೆ ಪರಿಶೀಲಿಸಿ'
                : 'Verify official port signal flags before setting out';
        }

        if (decision && decision.voice_text) {
            lastDecisionVoiceText = decision.voice_text;
        } else {
            lastDecisionVoiceText = isKn
                ? (isFavorable ? 'ಇಂದಿನ ಕಡಲು ಶಾಂತವಾಗಿದೆ, ಮೀನುಗಾರಿಕೆಗೆ ಹೋಗಲು ಅನುಕೂಲಕರವಾಗಿದೆ.' : isCaution ? 'ಕಡಲಿನಲ್ಲಿ ಮಧ್ಯಮ ಅಲೆಗಳಿವೆ, ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಿ.' : 'ಕಡಲು ಪ್ರಕ್ಷುಬ್ಧವಾಗಿದೆ, ದಯವಿಟ್ಟು ಇಂದು ಕಡಲಿಗೆ ಹೋಗಬೇಡಿ.')
                : (isFavorable ? 'Today conditions are favorable. Safe to go fishing.' : isCaution ? 'Caution advised. Monitor wave conditions.' : 'Rough conditions detected. Do not go fishing today.');
        }
    }

    // 2. Metrics: Weather, Wind, Sea Conditions
    if (weatherVal && weatherData) {
        weatherVal.textContent = formatWeatherSummary(weatherData.weather, weatherData.temp, isKn);
    }
    if (windVal && weatherData) {
        const windSpeed = weatherData.wind !== undefined ? `${weatherData.wind} km/h` : 'N/A';
        const windDir = getWindDirectionText(weatherData.wind_deg, isKn);
        windVal.textContent = `${windSpeed} (${windDir})`;
    }
    if (seaVal && weatherData) {
        seaVal.textContent = getSeaConditionText(weatherData.wind, isKn);
    }

    // 3. Timestamp & Accuracy Badge
    const formattedTime = formatRelativeTime(timestamp, isKn);
    const diffMins = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    const isOutdated = isCached || diffMins > 30;

    if (timeText) {
        if (isOutdated) {
            timeText.textContent = isKn ? `⚠️ ಹಳೆಯ ಮಾಹಿತಿ: ${formattedTime}` : `⚠️ Outdated data: ${formattedTime}`;
            if (timeIcon) timeIcon.textContent = '⚠️';
        } else {
            timeText.textContent = isKn ? `🕒 ನವೀಕರಿಸಲಾಗಿದೆ: ${formattedTime}` : `🕒 Updated: ${formattedTime}`;
            if (timeIcon) timeIcon.textContent = '🕒';
        }
    }

    if (liveDot && liveStatus) {
        if (isOutdated) {
            liveDot.className = 'live-dot stale';
            liveStatus.textContent = isKn ? 'ಹಳೆಯ ಮಾಹಿತಿ' : 'OUTDATED';
        } else {
            liveDot.className = 'live-dot online';
            liveStatus.textContent = isKn ? 'ಲೈವ್' : 'LIVE';
        }
    }

    // Keep Safety HUD elements in sync
    const hudWind = document.getElementById('hudWind');
    const hudTemp = document.getElementById('hudTemp');
    const hudWave = document.getElementById('hudWave');
    if (weatherData) {
        if (hudWind) hudWind.textContent = `${weatherData.wind} km/h`;
        if (hudTemp) hudTemp.textContent = `${weatherData.temp}°C`;
        if (hudWave) hudWave.textContent = getSeaConditionText(weatherData.wind, isKn);
    }
    if (typeof updateHomeLocationUI === 'function') updateHomeLocationUI();
}

function renderConditionsUnavailable() {
    lastConditionsData = null;
    lastConditionsDecision = null;
    lastConditionsTimestamp = null;
    lastConditionsIsCached = false;

    const isKn = (currentLang === 'kn');
    const recBox = document.getElementById('homeRecommendationBox');
    const statusEl = document.getElementById('homeDecisionStatus');
    const subEl = document.getElementById('homeAdvisorySub');
    const weatherVal = document.getElementById('condWeatherVal');
    const windVal = document.getElementById('condWindVal');
    const seaVal = document.getElementById('condSeaVal');
    const timeText = document.getElementById('condTimestampText');
    const timeIcon = document.getElementById('condTimestampIcon');
    const liveDot = document.getElementById('condLiveDot');
    const liveStatus = document.getElementById('condLiveStatus');

    if (recBox && statusEl) {
        recBox.className = 'recommendation-hero-box caution';
        statusEl.textContent = isKn ? '⚠️ ಮಾಹಿತಿ ಅಲಭ್ಯ (ಬಂದರು ಸಿಗ್ನಲ್ ಪರಿಶೀಲಿಸಿ)' : '⚠️ UNKNOWN (CHECK HARBOR FLAGS)';
        if (subEl) subEl.textContent = isKn
            ? 'ಲೈವ್ ಹವಾಮಾನ ಸಂಪರ್ಕ ಲಭ್ಯವಿಲ್ಲ · ಬಂದರಿನ ಅಧಿಕೃತ ಸಿಗ್ನಲ್ ಇಲ್ಲದೆ ತೆರಳಬೇಡಿ'
            : 'Live telemetry unavailable · Verify local port signal flags before sailing';
        lastDecisionVoiceText = isKn
            ? 'ಹವಾಮಾನ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಬಂದರಿನ ಅಧಿಕೃತ ಸಿಗ್ನಲ್ ಪರಿಶೀಲಿಸಿ.'
            : 'Live telemetry unavailable. Verify local port signal flags before setting out.';
    }

    const unavailText = isKn ? 'ಅಲಭ್ಯ (ಆಫ್‌ಲೈನ್)' : 'Unavailable (Offline)';
    if (weatherVal) weatherVal.textContent = unavailText;
    if (windVal) windVal.textContent = unavailText;
    if (seaVal) seaVal.textContent = unavailText;

    if (timeText) {
        timeText.textContent = isKn ? '❌ ಮಾಹಿತಿ ಸಿಗಲಿಲ್ಲ · ಕೋಸ್ಟ್ ಗಾರ್ಡ್ 1554 ಸಂಪರ್ಕಿಸಿ' : '❌ Telemetry unavailable · Contact Coast Guard 1554';
        if (timeIcon) timeIcon.textContent = '❌';
    }
    if (liveDot && liveStatus) {
        liveDot.className = 'live-dot offline';
        liveStatus.textContent = isKn ? 'ಆಫ್‌ಲೈನ್' : 'OFFLINE';
    }
    if (typeof updateHomeLocationUI === 'function') updateHomeLocationUI();
}

async function loadHomeConditions(forceRefresh = false) {
    const timeText = document.getElementById('condTimestampText');
    const isKn = (currentLang === 'kn');

    if (forceRefresh && timeText) {
        timeText.textContent = isKn ? '🔄 ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...' : '🔄 Fetching live data...';
    }

    try {
        const weatherPromise = fetch(BACKEND_URL + '/weather', { signal: AbortSignal.timeout(6000) });
        const decisionPromise = fetch(BACKEND_URL + '/api/decision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: '' }),
            signal: AbortSignal.timeout(6000)
        });

        const [weatherRes, decisionRes] = await Promise.allSettled([weatherPromise, decisionPromise]);

        let weatherData = null;
        let decisionData = null;

        if (weatherRes.status === 'fulfilled' && weatherRes.value.ok) {
            weatherData = await weatherRes.value.json();
        }
        if (decisionRes.status === 'fulfilled' && decisionRes.value.ok) {
            const d = await decisionRes.value.json();
            if (d && d.success) decisionData = d.decision;
        }

        if (weatherData && weatherData.weather) {
            const now = Date.now();
            try {
                localStorage.setItem('fishermen_telemetry_cache', JSON.stringify({
                    weather: weatherData,
                    decision: decisionData,
                    timestamp: now
                }));
            } catch (e) {}

            renderConditionsData(weatherData, decisionData, now, false);
            return;
        }
        throw new Error('Incomplete weather payload');
    } catch (err) {
        console.warn('Live telemetry fetch failed, checking cache:', err);
        try {
            const cached = localStorage.getItem('fishermen_telemetry_cache');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed && parsed.weather) {
                    renderConditionsData(parsed.weather, parsed.decision, parsed.timestamp, true);
                    return;
                }
            }
        } catch (e) {}

        renderConditionsUnavailable();
    }
}

function refreshHomeConditions() {
    playTapSound();
    loadHomeConditions(true);
}



// ============================================
// BACKEND HEALTH CHECK
// ============================================
async function checkBackend() {
    try {
        const res = await fetch(BACKEND_URL + '/health', { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
            if (connectionDot) { connectionDot.className = 'status-dot online'; }
            if (connectionText) { connectionText.textContent = 'Online'; }
        } else {
            throw new Error();
        }
    } catch {
        if (connectionDot) { connectionDot.className = 'status-dot offline'; }
        if (connectionText) { connectionText.textContent = 'Offline (Cache)'; }
    }
}


// State for current marine weather decision
// (currentDecision and lastDecisionVoiceText are defined in state.js)

function replayCurrentDecisionVoice() {
    playTapSound();
    if (lastDecisionVoiceText) {
        speakResponse(lastDecisionVoiceText);
    } else {
        const statusEl = document.getElementById('decisionStatus');
        const text = statusEl ? statusEl.textContent : (currentLang === 'kn' ? 'ಹವಾಮಾನ ಮುನ್ನೆಚ್ಚರಿಕೆ' : 'Marine Weather Advisory');
        speakResponse(text);
    }
}

// ============================================
// SEND QUERY TO BACKEND
// ============================================
async function sendToBackend(text) {
    try {
        const response = await fetch(BACKEND_URL + '/api/decision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });
        const data = await response.json();
        if (data.success) {
            playSuccessChime();
            lastDecisionVoiceText = data.decision.voice_text || (data.decision.status === 'FAVORABLE' || data.decision.status === 'GO' ? 'ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಲು ಅನುಕೂಲಕರವಾಗಿದೆ.' : 'ಕಡಲು ಪ್ರಕ್ಷುಬ್ಧವಾಗಿದೆ, ಜಾಗರೂಕರಾಗಿರಿ.');
            showResult(data.decision);
            speakResponse(lastDecisionVoiceText);
            saveToHistory(data.decision);
        } else {
            showVoiceState('error', '❌ ' + (data.error || (currentLang === 'kn' ? 'ಪ್ರಶ್ನೆ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ' : 'Could not process query')));
        }
    } catch (err) {
        showVoiceState('error', currentLang === 'kn' ? '❌ ಹವಾಮಾನ ಸಂಪರ್ಕ ಸಮಸ್ಯೆ.' : '❌ Weather service connection issue.');
        lastDecisionVoiceText = currentLang === 'kn'
            ? 'ಹವಾಮಾನ ಸಂಪರ್ಕ ಲಭ್ಯವಿಲ್ಲ. ಕಡಲಿಗೆ ಹೋಗುವ ಮುನ್ನ ಬಂದರಿನ ಅಧಿಕೃತ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
            : 'Live weather service unreachable. Check official harbor advisories before setting out.';
        showResult({
            status: 'CAUTION',
            title: currentLang === 'kn' ? 'ಸಲಹೆ ಲಭ್ಯವಿಲ್ಲ (ಆಫ್‌ಲೈನ್)' : 'Advisory Unavailable (Offline)',
            advisory_text: currentLang === 'kn' ? 'ಲೈವ್ ಹವಾಮಾನ ಸರ್ವರ್ ಸಂಪರ್ಕ ಲಭ್ಯವಿಲ್ಲ. ಅಧಿಕೃತ ಮುನ್ಸೂಚನೆ ಪರಿಶೀಲಿಸಿ.' : 'Live weather service unreachable. Cannot compute real-time marine advisory.',
            reasons: currentLang === 'kn' ? ['⚠️ ಹವಾಮಾನ ಸಂಪರ್ಕ ಆಫ್‌ಲೈನ್ ಅಥವಾ ಸರ್ವರ್ ಆರಂಭಗೊಳ್ಳುತ್ತಿದೆ', '🚨 ಬಂದರಿನ ಅಧಿಕೃತ ಸಿಗ್ನಲ್ ಪರಿಶೀಲಿಸದೆ ಕಡಲಿಗೆ ಹೋಗಬೇಡಿ'] : ['⚠️ Weather connection offline or server starting up', '🚨 Do not sail without checking local harbor flags and official warnings'],
            details: null,
            voice_text: lastDecisionVoiceText
        });
    }
}

function showResult(decision) {
    currentDecision = decision;
    const resBox = document.getElementById('resultContainer');
    const statusEl = document.getElementById('decisionStatus');
    const reasonsEl = document.getElementById('decisionReasons');
    const detailsEl = document.getElementById('decisionDetails');
    const card = document.getElementById('decisionCard');
    const replayTextEl = document.getElementById('replayBtnText');
    const isKn = (currentLang === 'kn');

    if (!resBox) return;
    resBox.classList.add('visible');

    const status = decision.status || 'UNKNOWN';
    const isFavorable = (status === 'FAVORABLE' || status === 'GO');
    const isCaution = (status === 'CAUTION');
    const isRough = (status === 'ROUGH' || status === "DON'T GO");

    const emoji = isFavorable ? '🟢' : isCaution ? '🟡' : '🔴';
    const statusLabel = isKn
        ? (isFavorable ? 'ಹೋಗಿ (GO - ಪರಿಸ್ಥಿತಿ ಅನುಕೂಲಕರ)' : isCaution ? 'ಎಚ್ಚರಿಕೆ (CAUTION - ಜಾಗರೂಕರಾಗಿರಿ)' : 'ಹೋಗಬೇಡಿ (DON\'T GO - ಅಪಾಯಕಾರಿ)')
        : (isFavorable ? 'GO (CONDITIONS FAVORABLE)' : isCaution ? 'CAUTION (MONITOR CONDITIONS)' : 'DON\'T GO (HAZARDOUS SEA)');
    if (statusEl) {
        statusEl.innerHTML = `<span style="font-size:32px;display:inline-block;vertical-align:middle;margin-right:8px;">${emoji}</span>${statusLabel}`;
    }

    // Prominent Homepage hero recommendation box update
    const homeBox = document.getElementById('homeRecommendationBox');
    const homeStatus = document.getElementById('homeDecisionStatus');
    const homeSub = document.getElementById('homeAdvisorySub');
    if (homeBox && homeStatus) {
        homeBox.className = 'recommendation-hero-box ' + (isFavorable ? 'go' : isCaution ? 'caution' : 'dontgo');
        homeStatus.textContent = `${emoji} ${statusLabel}`;
        if (homeSub) {
            homeSub.textContent = decision.advisory_text || (isKn ? 'ಹವಾಮಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆ ಲಭ್ಯವಿದೆ.' : 'Advisory calculated from live telemetry.');
        }
    }
    const homeVoiceState = document.getElementById('homeVoiceStateText');
    if (homeVoiceState) {
        homeVoiceState.textContent = isKn ? '✅ ಸಲಹೆ ಸಿದ್ಧವಾಗಿದೆ (Advisory ready)' : '✅ Advisory ready';
    }

    if (replayTextEl) {
        replayTextEl.textContent = isKn ? 'ಧ್ವನಿಯಲ್ಲಿ ಮತ್ತೆ ಕೇಳಿ' : 'Listen Again in Audio';
    }

    if (decision.voice_text) {
        lastDecisionVoiceText = decision.voice_text;
    }

    card.className = 'decision-card';
    if (isFavorable) card.classList.add('go');
    else if (isCaution) card.classList.add('caution');
    else if (isRough) card.classList.add('dontgo');

    let reasonsHtml = '';
    if (decision.advisory_text) {
        reasonsHtml += `<div style="font-size:12.5px;font-weight:700;color:var(--text-main);margin-bottom:8px;padding:6px 2px;border-bottom:1px solid var(--item-separator);line-height:1.4;">${decision.advisory_text}</div>`;
    }

    if (decision.reasons && decision.reasons.length) {
        reasonsHtml += '<ul>' + decision.reasons.map(r => '<li>' + r + '</li>').join('') + '</ul>';
    }
    reasonsEl.innerHTML = reasonsHtml;

    if (decision.details) {
        let html = '';
        const tempLbl = isKn ? 'ಸಮುದ್ರ/ಗಾಳಿ ತಾಪಮಾನ:' : 'Sea/Air Temp:';
        const windLbl = isKn ? 'ಗಾಳಿಯ ವೇಗ:' : 'Wind Speed:';
        const profitLbl = isKn ? 'ಅಂದಾಜು ಲಾಭ:' : 'Estimated Profit:';
        const skyLbl = isKn ? 'ಆಕಾಶ:' : 'Sky:';

        if (decision.details.temp) html += '<div>🌡️ <b>' + tempLbl + '</b> ' + decision.details.temp + '°C</div>';
        if (decision.details.wind) html += '<div>💨 <b>' + windLbl + '</b> ' + decision.details.wind + ' km/h</div>';
        const profit = decision.details.estimated_profit || decision.details.profit;
        if (profit) html += '<div>💰 <b>' + profitLbl + '</b> ₹' + profit + '</div>';
        if (decision.details.weather) html += '<div>⛅ <b>' + skyLbl + '</b> ' + decision.details.weather + '</div>';
        detailsEl.innerHTML = html;
        detailsEl.style.display = 'grid';
    } else {
        detailsEl.style.display = 'none';
    }

    // Safety disclaimer banner below card
    let disclaimerEl = document.getElementById('advisoryDisclaimer');
    if (!disclaimerEl) {
        disclaimerEl = document.createElement('div');
        disclaimerEl.id = 'advisoryDisclaimer';
        disclaimerEl.style.cssText = 'margin-top:12px;font-size:11px;color:var(--text-muted);line-height:1.5;padding:8px 4px;border-top:1px solid var(--item-separator);text-align:center;';
        card.parentNode.appendChild(disclaimerEl);
    }
    disclaimerEl.innerHTML = isKn
        ? `⚠️ <b>ಕೇವಲ ಸಲಹಾ ಮಾಹಿತಿ:</b> ಲಭ್ಯವಿರುವ ಹವಾಮಾನ ಮತ್ತು ಕಡಲ ಟೆಲಿಮೆಟ್ರಿ ಆಧಾರಿತ. ಇದು ಭಾರತೀಯ ಕರಾವಳಿ ಕಾವಲು ಪಡೆ (Coast Guard), IMD ಅಥವಾ INCOIS ನ ಅಧಿಕೃತ ಎಚ್ಚರಿಕೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ. ಕಡಲಿಗೆ ಇಳಿಯುವ ಮುನ್ನ ಯಾವಾಗಲೂ ಬಂದರಿನ ಅಧಿಕೃತ ಸಿಗ್ನಲ್ ಪರಿಶೀಲಿಸಿ.`
        : `⚠️ <b>Advisory Only:</b> Based on available weather and marine telemetry. Does not replace official marine/weather warnings from the Indian Coast Guard, IMD, or INCOIS. Always check official port signals before setting out.`;

    hideVoiceState();
    setTimeout(() => {
        resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}




async function loadTide() {
    const el = document.getElementById('tideList');
    if (!el) return;
    const isKn = (currentLang === 'kn');
    try {
        const response = await fetch(BACKEND_URL + '/tide');
        const data = await response.json();
        if (data.success) {
            el.innerHTML = `<h3 style="font-size:14px;font-weight:800;margin-bottom:8px;color:#38bdf8;">${isKn ? '🌊 ಉಬ್ಬರವಿಳಿತ ಮಾಹಿತಿ' : '🌊 Tide Telemetry'}</h3>` +
                data.tides.map(t => {
                    const tideType = isKn ? (t.type === 'High' ? 'ಏರಿಳಿತ (High)' : 'ಇಳಿಕೆ (Low)') : `${t.type} Tide`;
                    return `
                        <div class="item-row" style="align-items:center;">
                            <span style="font-weight:650;font-size:13px;color:var(--text-main);">${tideType}</span>
                            <span style="font-weight:750;font-size:13px;color:var(--primary);text-align:right;">${t.time} <span style="font-size:11px;color:var(--text-muted);font-weight:500;">(${t.height}m)</span></span>
                        </div>
                    `;
                }).join('');
        }
    } catch {}
}

async function loadCalendar() {
    const el = document.getElementById('calendarList');
    if (!el) return;
    const isKn = (currentLang === 'kn');
    try {
        const response = await fetch(BACKEND_URL + '/calendar');
        const data = await response.json();
        if (data.success) {
            el.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <h3 style="font-size:14px;font-weight:800;color:#38bdf8;margin-bottom:0;">${isKn ? '🗓️ 7 ದಿನಗಳ ಉಬ್ಬರವಿಳಿತ & ಚಂದ್ರನ ಮುನ್ನೋಟ' : '🗓️ 7-Day Solunar & Tidal Outlook'}</h3>
                    <span style="font-size:10px;background:rgba(6,182,212,0.12);color:#38bdf8;padding:2px 8px;border-radius:10px;font-weight:700;">${isKn ? 'ಚಂದ್ರನ ಚಕ್ರ' : 'LUNAR CYCLE'}</span>
                </div>
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">${isKn ? 'ಖಗೋಳ ಚಂದ್ರನ ಹಂತಗಳನ್ನು ಆಧರಿಸಿ ಅಲೆಗಳ ಪ್ರವಾಹ ಅಂದಾಜು. ಕಡಲಿಗೆ ಹೋಗುವ ಮುನ್ನ ದೈನಂದಿನ ಹವಾಮಾನ ಪರಿಶೀಲಿಸಿ.' : 'Tidal current estimation based on astronomical moon phases. Check daily weather before trips.'}</div>
            ` +
                data.days.map(d => `
                    <div class="item-row" style="align-items:center;">
                        <span style="font-weight:650;font-size:13px;color:var(--text-main);line-height:1.25;">${d.date}</span>
                        <span style="font-weight:750;font-size:12.5px;color:var(--primary);text-align:right;line-height:1.25;">${d.rating}</span>
                    </div>
                `).join('');
        }
    } catch {
        el.innerHTML = `<div style="font-size:12px;color:var(--text-muted);padding:10px 0;">${isKn ? 'ಉಬ್ಬರವಿಳಿತ ಮುನ್ನೋಟ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ.' : 'Tidal outlook temporarily unavailable offline.'}</div>`;
    }
}

async function loadHomeWeather() {
    try {
        const response = await fetch(BACKEND_URL + '/weather');
        const data = await response.json();
        const main = document.getElementById('homeWeatherMain');
        const meta = document.getElementById('homeWeatherMeta');
        const hudWind = document.getElementById('hudWind');
        const hudTemp = document.getElementById('hudTemp');
        const hudWave = document.getElementById('hudWave');
        const isKn = (currentLang === 'kn');

        if (data.weather) {
            if (main) main.textContent = `${data.weather.toUpperCase()} · ${data.temp}°C · ${isKn ? 'ಗಾಳಿ' : 'Wind'} ${data.wind} km/h`;
            if (meta) meta.textContent = isKn ? `📍 ${data.city || 'ಕರಾವಳಿ ತೀರ'} · ಮೂಲ: OpenWeather · ಲೈವ್` : `📍 ${data.city || 'Karavali Coast'} · Source: OpenWeather · Live`;
            if (hudWind) hudWind.textContent = `${data.wind} km/h`;
            if (hudTemp) hudTemp.textContent = `${data.temp}°C`;
            const waveText = data.wind > 20
                ? (isKn ? 'ಪ್ರಕ್ಷುಬ್ಧ (1.8m)' : 'Rough (1.8m)')
                : data.wind > 12
                    ? (isKn ? 'ಮಧ್ಯಮ (1.1m)' : 'Moderate (1.1m)')
                    : (isKn ? 'ಶಾಂತ (0.6m)' : 'Calm (0.6m)');
            if (hudWave) hudWave.textContent = waveText;
        }
    } catch {}
}

async function loadBestTime() {
    const container = document.getElementById('bestTimeWindows');
    const dateEl = document.getElementById('bestTimeDate');
    const nowEl = document.getElementById('bestTimeNow');
    if (!container) return;
    const isKn = (currentLang === 'kn');

    try {
        const response = await fetch(BACKEND_URL + '/best-time');
        const data = await response.json();
        if (data.success) {
            if (dateEl) dateEl.textContent = isKn ? 'ಇಂದು' : data.date;
            container.innerHTML = data.windows.map(w => {
                const color = w.rating === 5 ? '#10b981' : w.rating === 4 ? '#38bdf8' : '#ef4444';
                return `
                    <div class="item-row" style="display:block;padding:10px 2px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:13px;font-weight:750;color:${color};line-height:1.25;">${w.label}</span>
                            <span style="font-size:12.5px;font-weight:750;color:var(--text-main);line-height:1.25;">${w.time}</span>
                        </div>
                        <div style="font-size:10.5px;color:var(--text-muted);opacity:0.85;margin-top:2px;line-height:1.3;">${w.reason}</div>
                    </div>
                `;
            }).join('');

            if (nowEl && data.current_message) {
                nowEl.style.display = 'block';
                nowEl.textContent = data.current_message;
                nowEl.style.background = data.current_status === 'best' ? 'rgba(16,185,129,0.25)' : 'rgba(56,189,248,0.25)';
                nowEl.style.color = data.current_status === 'best' ? '#6ee7b7' : '#7dd3fc';
            }
        }
    } catch {}
}
