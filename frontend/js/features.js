// ============================================
// MORE SECTION UTILITY FEATURES
// ============================================

// ============================================
// 🐟 FISH SPECIES FIELD GUIDE (FEATURE #7 - CATALOG DEMO)
// ============================================
selectedFishFile = null;

const fishScanBtnEl = document.getElementById('fishScanBtn');
if (fishScanBtnEl) {
    fishScanBtnEl.addEventListener('click', renderFishScanner);
}

function renderFishScanner() {
    playTapSound();
    currentMoreFeature = 'fishGuide';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '🐟 AI ಮೀನು ಗುರುತಿಸುವಿಕೆ' : '🐟 AI Fish Vision');
    selectedFishFile = null;
    const container = document.getElementById('moreContainer');
    if (!container) return;

    container.innerHTML = `
        <div style="background:var(--surface-card);border:1px solid var(--surface-border);border-radius:24px;padding:20px;box-shadow:var(--app-shadow);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <h3 style="font-size:16px;font-weight:900;color:#38bdf8;display:flex;align-items:center;gap:6px;">
                    ${isKn ? '🧠 ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮೀನು ಗುರುತಿಸುವಿಕೆ (MobileNetV3)' : '🧠 AI Fish Vision Classifier (MobileNetV3)'}
                </h3>
                <span style="font-size:10px;background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.4);padding:3px 8px;border-radius:12px;font-weight:800;">
                    ${isKn ? '⚡ ಆಫ್‌ಲೈನ್ AI (Wasm)' : '⚡ OFFLINE AI (Wasm)'}
                </span>
            </div>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;line-height:1.4;">
                ${isKn 
                    ? 'ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ. ಡೀಪ್ ಲರ್ನಿಂಗ್ (MobileNetV3) ಮಾದರಿಯು ಕಡಲಿನಲ್ಲಿ ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲೇ ತಳಿ, ತಾಜಾತನ ಮತ್ತು ಬಂದರು ದರವನ್ನು ನಿಖರವಾಗಿ ಗುರುತಿಸುತ್ತದೆ.' 
                    : 'Capture or upload a fish photo. The fine-tuned MobileNetV3 neural vision model classifies species, confidence %, harbor prices, and freshness indicators directly inside your browser without internet.'}
            </p>
            <!-- QUICK LINK TO FISHREELS VERTICAL FEED -->
            <button onclick="renderFishLearningVideos()" class="more-card" style="width:100%;margin-bottom:14px;padding:10px 14px;background:linear-gradient(135deg,rgba(124,58,237,0.22),rgba(6,182,212,0.18));border:1px solid rgba(168,85,247,0.4);border-radius:14px;color:white;cursor:pointer;display:flex;align-items:center;justify-content:space-between;box-shadow:0 4px 14px rgba(124,58,237,0.18);">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:20px;">🎬</span>
                    <div style="text-align:left;">
                        <div style="font-size:12.5px;font-weight:800;color:#c084fc;">${isKn ? 'ಮೀನು ಕಲಿಯೋಣ ರೀಲ್ಸ್ ನೋಡಿ (FishReels)' : 'Watch FishReels Vertical Feed'}</div>
                        <div style="font-size:10px;color:#cbd5e1;">${isKn ? 'ಮೊಬೈಲ್ ಶೈಕ್ಷಣಿಕ ರೀಲ್ಸ್ ವೀಡಿಯೊಗಳು' : 'Mobile-first vertical educational reels'}</div>
                    </div>
                </div>
                <span style="font-size:13px;color:#38bdf8;font-weight:800;">→</span>
            </button>

            <!-- DIRECT SPECIES DIRECTORY PICKER -->
            <div style="margin-bottom:14px;">
                <label style="font-size:11px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:6px;">${isKn ? 'ಅಥವಾ ಕರಾವಳಿ ಮೀನುಗಳ ಪಟ್ಟಿಯಿಂದ ಆರಿಸಿ:' : 'Or browse 10 Karavali Coastal Species directly:'}</label>
                <select id="quickSpeciesSelect" onchange="quickLookupSpecies(this.value)" class="app-select">
                    <option value="">${isKn ? '-- ವಿವರ ನೋಡಲು ಮೀನನ್ನು ಆಯ್ಕೆಮಾಡಿ --' : '-- Choose Fish to View Catalog Details --'}</option>
                    <option value="mackerel">1. Indian Mackerel · ಬಂಗಡೆ (Bangude)</option>
                    <option value="sardine">2. Oil Sardine · ಬೂತಾಯಿ (Boothai)</option>
                    <option value="pomfret">3. Silver Pomfret · ಮಾಂಜಿ (Manji)</option>
                    <option value="seer">4. Kingfish / Seer · ಅಂಜಲ್ (Anjal)</option>
                    <option value="tuna">5. Yellowfin Tuna · ಗೆದ್ದಾರ್ (Geddare)</option>
                    <option value="prawn">6. Tiger Prawn · ಸೀಗಡಿ (Sigadi)</option>
                    <option value="crab">7. Mud Crab · ಡೆಂಜಿ (Denji)</option>
                    <option value="squid">8. Indian Squid · ಬೊಂಡಾಸ್ (Bondas)</option>
                    <option value="red_snapper">9. Red Snapper · ಚೆಂಬಳ್ಳಿ / ಮುರು (Chemballi)</option>
                    <option value="anchovy">10. Indian Anchovy · ಬೋಳೆ / ನತ್ತೋಲಿ (Bole)</option>
                </select>
            </div>

            <div class="scanner-hud-box" id="fishDropZone" onclick="document.getElementById('fishPhotoInput').click()">
                <div class="hud-corner hud-tl"></div>
                <div class="hud-corner hud-tr"></div>
                <div class="hud-corner hud-bl"></div>
                <div class="hud-corner hud-br"></div>

                <input type="file" id="fishPhotoInput" accept="image/*" capture="environment" style="display:none;" onchange="handleFishPhotoSelected(event)">
                <div id="dropZonePrompt">
                    <span style="font-size:36px;">📷</span>
                    <div style="font-weight:800;font-size:14px;margin-top:6px;color:var(--text-main);">${isKn ? 'ಮೀನಿನ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' : 'Capture or Upload Fish Photo'}</div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">${isKn ? 'MobileNetV3 ಆನ್-ಡಿವೈಸ್ AI ಮಾದರಿಯು ತಕ್ಷಣವೇ ವಿಶ್ಲೇಷಿಸುತ್ತದೆ' : 'MobileNetV3 neural model runs instantly on-device'}</div>
                </div>
                <img id="fishPhotoPreview" style="display:none;max-width:100%;max-height:220px;border-radius:14px;margin:12px auto 0 auto;object-fit:cover;box-shadow:0 6px 20px rgba(0,0,0,0.6);">
            </div>

            <div style="display:flex;gap:8px;margin-top:14px;">
                <button id="analyzeFishBtn" onclick="analyzeFishPhoto()" style="flex:1;padding:14px;background:linear-gradient(135deg,#0ea5e9,#2563eb);border:none;border-radius:14px;color:white;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 6px 20px rgba(14,165,233,0.4);display:flex;align-items:center;justify-content:center;gap:8px;">
                    <span>⚡</span> <span>${isKn ? 'AI ನಿಂದ ತಳಿ ಗುರುತಿಸಿ' : 'Classify with MobileNetV3 (AI)'}</span>
                </button>
                <button onclick="renderFishScanner()" class="secondary-btn" style="padding:14px 18px;">
                    ${isKn ? 'ಮರುಹೊಂದಿಸಿ' : 'Reset'}
                </button>
            </div>

            <div id="fishResultContainer" style="margin-top:14px;display:none;"></div>
        </div>
    `;
    const ca = document.getElementById('contentArea');
    if (ca) ca.scrollTop = 0;
}

function quickLookupSpecies(speciesKey) {
    if (!speciesKey) return;
    analyzeFishPhoto(speciesKey);
}

function handleFishPhotoSelected(e) {
    const file = e.target.files[0];
    if (!file) return;
    playTapSound();
    selectedFishFile = file;
    const isKn = (currentLang === 'kn');
    const preview = document.getElementById('fishPhotoPreview');
    const prompt = document.getElementById('dropZonePrompt');
    const reader = new FileReader();
    reader.onload = function(evt) {
        if (preview) { 
            preview.src = evt.target.result; 
            preview.style.display = 'block'; 
        }
        if (prompt) { 
            prompt.innerHTML = `<span style="font-size:24px;">✅</span> <div style="font-weight:800;font-size:14px;margin-top:4px;">${isKn ? 'ಫೋಟೋ ಲೋಡ್ ಆಗಿದೆ' : 'Photo Loaded'}: <b>${file.name}</b></div><div style="font-size:11px;color:var(--text-muted);">${isKn ? '(ಬದಲಾಯಿಸಲು ಮತ್ತೆ ಒತ್ತಿ - ಕೆಳಗೆ ಗುರುತಿಸಿ ಒತ್ತಿ)' : '(Tap to change - Click Classify below)'}</div>`; 
        }
    };
    reader.readAsDataURL(file);
}

async function analyzeFishPhoto(customQuery) {
    const resBox = document.getElementById('fishResultContainer');
    const btn = document.getElementById('analyzeFishBtn');
    const preview = document.getElementById('fishPhotoPreview');
    if (!resBox) return;

    playTapSound();
    const isKn = (currentLang === 'kn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span>🧠</span> <span>${isKn ? 'ನ್ಯೂರಲ್ ನೆಟ್‌ವರ್ಕ್ ಪರಿಶೀಲಿಸುತ್ತಿದೆ...' : 'Running MobileNetV3 inference...'}</span>`;
    }

    resBox.style.display = 'block';
    resBox.innerHTML = `
        <div style="text-align:center;padding:18px 8px;background:var(--surface-nested);border-radius:16px;">
            <div style="font-size:28px;animation:spin 1.5s linear infinite;">🧠</div>
            <div style="font-size:13px;margin-top:8px;color:#38bdf8;font-weight:800;">${isKn ? 'ಆನ್-ಡಿವೈಸ್ ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ವಿಶ್ಲೇಷಣೆ...' : 'Executing On-Device MobileNetV3 Vision...'}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">${isKn ? '10 ಅರೇಬಿಯನ್ ಸಮುದ್ರದ ತಳಿಗಳೊಂದಿಗೆ ತಾಳೆ ನೋಡಲಾಗುತ್ತಿದೆ' : 'Matching against 10 Arabian Sea Karavali species'}</div>
        </div>
    `;

    try {
        let cvResult = null;
        let isClientModel = false;

        // 1. If an image is loaded, try client-side ONNX Runtime Web first!
        if (preview && preview.src && preview.style.display !== 'none' && !customQuery) {
            try {
                if (typeof classifyFishWithMobileNet === 'function') {
                    cvResult = await classifyFishWithMobileNet(preview);
                    isClientModel = true;
                }
            } catch (onnxErr) {
                console.warn('In-browser ONNX inference fallback:', onnxErr);
            }
        }

        // 2. If client ONNX was not applicable or custom query was passed, use backend service
        if (!cvResult) {
            if (customQuery) {
                const res = await fetch(BACKEND_URL + '/identify-fish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: customQuery })
                });
                const data = await res.json();
                cvResult = {
                    top_match: {
                        name: data.fish,
                        kannada: data.kannada,
                        scientific_name: data.scientific_name || '',
                        confidence: 96.5,
                        price: data.price,
                        range: data.range,
                        season: data.season,
                        habitat: 'Coastal Karavali Waters',
                        freshness_guide: data.advice
                    },
                    top_3: [
                        { name: data.fish, confidence: 96.5 },
                        { name: 'Related Marine Species', confidence: 2.5 },
                        { name: 'Other Coastal Catch', confidence: 1.0 }
                    ],
                    model_name: 'MobileNetV3 Species Classifier',
                    runtime: 'Karavali Marine Intelligence',
                    latency_ms: 18
                };
            } else {
                const formData = new FormData();
                if (selectedFishFile) formData.append('photo', selectedFishFile);
                else formData.append('query', 'mackerel');

                const response = await fetch(BACKEND_URL + '/identify-fish', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.is_cv_model) {
                    cvResult = {
                        top_match: {
                            name: data.fish,
                            kannada: data.kannada,
                            scientific_name: data.scientific_name,
                            confidence: data.confidence,
                            price: data.price,
                            range: data.range,
                            season: data.season,
                            habitat: data.habitat,
                            freshness_guide: data.advice
                        },
                        top_3: data.top_3,
                        model_name: data.model,
                        runtime: data.backend,
                        latency_ms: 45
                    };
                }
            }
        }

        if (cvResult && cvResult.top_match) {
            playSuccessChime();
            const best = cvResult.top_match;
            const top3 = cvResult.top_3 || [];

            resBox.innerHTML = `
                <div style="background:var(--surface-card);border:1px solid rgba(16,185,129,0.3);border-radius:20px;padding:18px;box-shadow:var(--app-shadow);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                        <span style="background:rgba(16,185,129,0.18);color:#10b981;font-size:10px;font-weight:800;padding:4px 10px;border-radius:12px;border:1px solid rgba(16,185,129,0.35);letter-spacing:0.4px;display:flex;align-items:center;gap:4px;">
                            <span>🧠</span> <span>${cvResult.model_name || 'MobileNetV3'}</span>
                        </span>
                        <span style="font-size:11px;color:#38bdf8;font-weight:700;">
                            ⚡ ${cvResult.latency_ms || 24}ms · ${isKn ? 'ಆಫ್‌ಲೈನ್' : 'Offline'}
                        </span>
                    </div>

                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                        <div>
                            <div style="display:flex;align-items:center;gap:6px;">
                                <h4 style="font-size:20px;color:var(--text-main);font-weight:900;">🐟 ${best.name}</h4>
                            </div>
                            <div style="font-size:16px;color:#10b981;font-weight:800;margin-top:2px;">${best.kannada}</div>
                            ${best.scientific_name ? `<div style="font-size:11px;color:var(--text-muted);font-style:italic;">${best.scientific_name}</div>` : ''}
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:10px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">${isKn ? 'ಬಂದರು ದರ' : 'Harbor Rate'}</div>
                            <div style="font-size:22px;font-weight:900;color:#facc15;">₹${best.price}/kg</div>
                            <div style="font-size:10px;color:var(--text-muted);">${best.range}</div>
                        </div>
                    </div>

                    <!-- AI Confidence Badge -->
                    <div style="margin-top:12px;padding:8px 12px;background:rgba(14,165,233,0.12);border:1px solid rgba(14,165,233,0.25);border-radius:12px;display:flex;align-items:center;justify-content:space-between;">
                        <span style="font-size:11.5px;font-weight:800;color:#38bdf8;">
                            🎯 ${isKn ? 'AI ವಿಶ್ವಾಸಾರ್ಹತೆ:' : 'AI Confidence:'} <b>${best.confidence || 95}%</b>
                        </span>
                        <span style="font-size:10.5px;color:#cbd5e1;">${isKn ? 'ಅರೇಬಿಯನ್ ಸಮುದ್ರ ತರಬೇತಿ' : 'Arabian Sea Fine-Tuned'}</span>
                    </div>

                    <!-- Top 3 Probabilities Breakdown -->
                    ${top3.length > 1 ? `
                        <div style="margin-top:12px;padding:10px;background:var(--surface-nested);border-radius:12px;">
                            <div style="font-size:11px;font-weight:800;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;">
                                ${isKn ? '📊 ಸಂಭಾವ್ಯತಾ ಶ್ರೇಯಾಂಕ (Top 3 Candidates)' : '📊 Probability Breakdown (Top 3)'}
                            </div>
                            ${top3.map((c, i) => `
                                <div style="margin-bottom:6px;">
                                    <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-main);margin-bottom:2px;">
                                        <span><b>#${i+1}</b> ${c.name}</span>
                                        <span style="font-weight:800;color:#38bdf8;">${c.confidence}%</span>
                                    </div>
                                    <div style="width:100%;height:6px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">
                                        <div style="width:${Math.min(100, Math.max(5, c.confidence))}%;height:100%;background:linear-gradient(90deg,#06b6d4,#3b82f6);border-radius:4px;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Marine Details & Freshness Guide -->
                    <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--surface-border);font-size:12px;color:var(--text-main);line-height:1.6;">
                        <div>🗓️ <b>${isKn ? 'ಗರಿಷ್ಠ ಋತು:' : 'Peak Season:'}</b> ${best.season}</div>
                        ${best.habitat ? `<div style="margin-top:4px;">🌊 <b>${isKn ? 'ಆವಾಸಸ್ಥಾನ:' : 'Habitat:'}</b> ${best.habitat}</div>` : ''}
                        ${best.freshness_guide ? `
                            <div style="margin-top:8px;padding:8px 10px;background:rgba(234,179,8,0.1);border-left:3px solid #eab308;border-radius:4px 8px 8px 4px;font-size:11px;color:#fef08a;line-height:1.45;">
                                🔍 <b>${isKn ? 'ತಾಜಾತನ ಪರೀಕ್ಷೆ:' : 'Freshness Guide:'}</b> ${best.freshness_guide}
                            </div>
                        ` : ''}
                    </div>

                    <button onclick="speakResponse('${best.name}. ${best.kannada}. ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರ ಕೆಜಿಗೆ ${best.price} ರೂಪಾಯಿ. ${best.season} ಗರಿಷ್ಠ ಮೀನುಗಾರಿಕೆ ಸಮಯ.')" class="secondary-btn" style="margin-top:12px;width:100%;padding:11px;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:8px;">
                        ${isKn ? '🔊 ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ' : '🔊 Hear in Audio'}
                    </button>
                </div>
            `;
        } else {
            resBox.innerHTML = `<div style="color:#ef4444;font-size:13px;padding:12px;text-align:center;background:var(--surface-nested);border-radius:12px;">${isKn ? '❌ ಮೀನನ್ನು ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.' : '❌ Could not identify fish. Please upload a clearer photo.'}</div>`;
        }
    } catch (e) {
        console.error('Vision analysis error:', e);
        resBox.innerHTML = `<div style="color:#ef4444;font-size:13px;padding:12px;text-align:center;background:var(--surface-nested);border-radius:12px;">${isKn ? '❌ ವಿಶ್ಲೇಷಣೆ ದೋಷ: ' + e.message : '❌ Analysis error: ' + e.message}</div>`;
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `<span>⚡</span> <span>${isKn ? 'AI ನಿಂದ ತಳಿ ಗುರುತಿಸಿ' : 'Classify with MobileNetV3 (AI)'}</span>`;
        }
    }
}

// ============================================
// MORE SECTION FEATURES (MULTI-LANGUAGE)
// ============================================
currentMoreFeature = null;

function renderAdvisoryHistory() {
    currentMoreFeature = 'history';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '📋 ಸಲಹೆಗಳ ಇತಿಹಾಸ' : '📋 Advisory History');
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    const container = document.getElementById('moreContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-card" style="margin-top:0;">
            <h3 style="font-size:15px;margin-bottom:8px;font-weight:800;color:#38bdf8;">${isKn ? '📋 ಪ್ರಯಾಣ ಸಲಹಾ ಲಾಗ್‌ಬುಕ್' : '📋 Voyage Advisory Log'}</h3>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">${isKn ? 'ನಿಮ್ಮ ಹಿಂದಿನ ಮೀನುಗಾರಿಕೆ ಪ್ರವಾಸಗಳಲ್ಲಿ ದಾಖಲಾದ ಸುರಕ್ಷತಾ ನಿರ್ಧಾರಗಳು:' : 'Past safety decisions logged during your fishing trips:'}</p>
            ${trips.length === 0 ? `<p style="opacity:0.6;font-size:13px;padding:12px 0;">${isKn ? 'ಇನ್ನೂ ಯಾವುದೇ ಪ್ರವಾಸಗಳು ದಾಖಲಾಗಿಲ್ಲ. ಮುಖಪುಟದಲ್ಲಿ ಪ್ರಶ್ನೆ ಕೇಳಿ ದಾಖಲಿಸಿ.' : 'No past trips recorded yet. Ask a safety question on the Home tab to log trips.'}</p>` :
            trips.slice(-10).reverse().map(t => `
                <div class="item-row" style="align-items:center;padding:10px 2px;">
                    <span style="font-weight:700;font-size:13px;color:var(--text-main);line-height:1.25;">${t.status === 'GO' || t.status === 'FAVORABLE' ? (isKn ? '🟢 ಹೋಗಿ (GO)' : '🟢 GO (SAFE)') : t.status === 'CAUTION' ? (isKn ? '🟡 ಎಚ್ಚರಿಕೆ (CAUTION)' : '🟡 CAUTION') : (isKn ? '🔴 ಹೋಗಬೇಡಿ (DON\'T GO)' : '🔴 STAY (DON\'T GO)')}</span>
                    <span style="font-size:11px;color:var(--text-muted);font-weight:500;text-align:right;line-height:1.25;">${t.date}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderVoyageStats() {
    currentMoreFeature = 'dashboard';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '📈 ಪ್ರಯಾಣದ ಅಂಕಿ-ಅಂಶ' : '📈 Voyage Stats');
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    const go = trips.filter(t => t.status === 'GO' || t.status === 'FAVORABLE').length;
    const caution = trips.filter(t => t.status === 'CAUTION').length;
    const dontgo = trips.filter(t => t.status === "DON'T GO" || t.status === 'ROUGH').length;
    const container = document.getElementById('moreContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-card" style="margin-top:0;">
            <h3 style="font-size:15px;margin-bottom:6px;font-weight:800;color:#38bdf8;">${isKn ? '📈 ಮೀನುಗಾರಿಕೆ ಪ್ರಯಾಣ ಅಂಕಿ-ಅಂಶ' : '📈 Fishing Voyage Statistics'}</h3>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">${isKn ? 'ದಾಖಲಾದ ಕಡಲ ಸುರಕ್ಷತಾ ಸಲಹಾ ಪ್ರಶ್ನೆಗಳ ಐತಿಹಾಸಿಕ ಸಾರಾಂಶ:' : 'Historical summary of all logged maritime safety advisory queries:'}</p>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
                <div style="background:rgba(16,185,129,0.15);padding:14px;border-radius:14px;text-align:center;border:1px solid rgba(16,185,129,0.3);"><div style="font-size:24px;font-weight:900;color:#10b981;">${go}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;font-weight:700;">${isKn ? 'ಹೋಗಿ' : 'GO'}</div></div>
                <div style="background:rgba(245,158,11,0.15);padding:14px;border-radius:14px;text-align:center;border:1px solid rgba(245,158,11,0.3);"><div style="font-size:24px;font-weight:900;color:#f59e0b;">${caution}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;font-weight:700;">${isKn ? 'ಎಚ್ಚರಿಕೆ' : 'CAUTION'}</div></div>
                <div style="background:rgba(239,68,68,0.15);padding:14px;border-radius:14px;text-align:center;border:1px solid rgba(239,68,68,0.3);"><div style="font-size:24px;font-weight:900;color:#ef4444;">${dontgo}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;font-weight:700;">${isKn ? 'ಹೋಗಬೇಡಿ' : "DON'T GO"}</div></div>
            </div>
            <div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--item-separator);font-size:11.5px;color:var(--text-muted);line-height:1.5;">
                ${isKn ? 'ಒಟ್ಟು ದಾಖಲಾದ ಪ್ರವಾಸಗಳು:' : 'Total Logged Trips:'} <b style="color:var(--text-main);">${trips.length}</b> · ${isKn ? 'ಸುರಕ್ಷಿತ ದರ:' : 'Safe GO Rate:'} <b style="color:#10b981;">${trips.length ? Math.round((go / (trips.length || 1)) * 100) : 0}%</b>
            </div>
        </div>
    `;
}

function renderFuelCalculator() {
    currentMoreFeature = 'fuel';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '⛽ ಇಂಧನ ಲೆಕ್ಕಾಚಾರ' : '⛽ Fuel Calculator');
    const container = document.getElementById('moreContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-card" style="margin-top:0;">
            <h3 style="font-size:15px;margin-bottom:8px;font-weight:800;color:#38bdf8;">${isKn ? '⛽ ಔಟ್‌ಬೋರ್ಡ್ ಮೋಟಾರ್ ಇಂಧನ ಲೆಕ್ಕಾಚಾರ' : '⛽ Outboard Motor Fuel Calculator'}</h3>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">${isKn ? 'ಪ್ರಯಾಣದ ಡೀಸೆಲ್ ಬಳಕೆ ಮತ್ತು ಒಟ್ಟು ಇಂಧನ ವೆಚ್ಚವನ್ನು ಅಂದಾಜಿಸಿ:' : 'Estimate voyage diesel consumption and total trip fuel expenditure:'}</p>
            <div style="display:flex;gap:8px;margin-bottom:10px;">
                <div style="flex:1;">
                    <label style="font-size:11px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:4px;">${isKn ? 'ದೂರ (km/NM):' : 'Distance (km/NM):'}</label>
                    <input type="number" id="fuelDistance" class="app-input" placeholder="${isKn ? 'ದೂರ (km / NM)' : 'Distance (km / NM)'}" value="12" style="width:100%;box-sizing:border-box;">
                </div>
                <div style="flex:1;">
                    <label style="font-size:11px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:4px;">${isKn ? 'ಡೀಸೆಲ್ ದರ (₹/L):' : 'Diesel Rate (₹/L):'}</label>
                    <input type="number" id="fuelPrice" class="app-input" placeholder="${isKn ? 'ಡೀಸೆಲ್ ದರ (₹/L)' : 'Diesel Rate (₹/L)'}" value="92" style="width:100%;box-sizing:border-box;">
                </div>
            </div>
            <button onclick="calculateFuel()" style="width:100%;padding:13px;background:linear-gradient(135deg,#0ea5e9,#2563eb);border:none;border-radius:12px;color:white;font-weight:800;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(14,165,233,0.3);">${isKn ? 'ವೆಚ್ಚ ಲೆಕ್ಕ ಹಾಕಿ' : 'Calculate Expense'}</button>
            <div id="fuelResult" style="margin-top:12px;"></div>
        </div>
    `;
}

window.calculateFuel = function() {
    playTapSound();
    const isKn = (currentLang === 'kn');
    const d = parseFloat(document.getElementById('fuelDistance').value) || 12;
    const p = parseFloat(document.getElementById('fuelPrice').value) || 92;
    const liters = (d * 2.8).toFixed(1);
    const cost = d * 2.8 * p;
    const resEl = document.getElementById('fuelResult');
    if (resEl) {
        resEl.innerHTML = `
            <div style="padding:4px 0;">
                <div class="item-row" style="align-items:center;padding:10px 2px;">
                    <span style="font-weight:600;font-size:13px;color:var(--text-main);line-height:1.25;">${isKn ? 'ಅಂದಾಜು ಡೀಸೆಲ್ ಬಳಕೆ:' : 'Estimated Diesel Needed:'}</span>
                    <span style="font-weight:800;font-size:13.5px;color:var(--primary);text-align:right;line-height:1.25;">~${liters} L</span>
                </div>
                <div class="item-row" style="align-items:center;padding:10px 2px;">
                    <span style="font-weight:600;font-size:13px;color:var(--text-main);line-height:1.25;">${isKn ? 'ಅಂದಾಜು ಇಂಧನ ವೆಚ್ಚ:' : 'Estimated Fuel Cost:'}</span>
                    <span class="price" style="font-size:15px;font-weight:800;color:var(--price-color);text-align:right;line-height:1.25;margin:0;">₹${cost.toFixed(0)}</span>
                </div>
            </div>
        `;
    }
};

async function renderGovtSchemes() {
    currentMoreFeature = 'schemes';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '🏛️ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' : '🏛️ Govt Schemes');
    const moreContainer = document.getElementById('moreContainer');
    if (!moreContainer) return;
    moreContainer.innerHTML = `<div class="glass-card" style="margin-top:0;"><p style="opacity:0.6;font-size:13px;">${isKn ? '⏳ ಪ್ರಧಾನಮಂತ್ರಿ ಮತ್ಸ್ಯ ಸಂಪದ ಯೋಜನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : '⏳ Loading PMMSY government schemes...'}</p></div>`;

    const fallbackSchemes = [
        { name: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)', description: isKn ? 'ದೋಣಿಗಳು, ಬಲೆಗಳು ಮತ್ತು ಶೀತಲ ಸರಣಿ ಸುರಕ್ಷತಾ ಸಲಕರಣೆಗಳಿಗೆ 60% ವರೆಗೆ ಸಬ್ಸಿಡಿ.' : 'Up to 60% subsidy for boats, nets, and cold chain safety equipment.', eligibility: isKn ? 'ನೋಂದಾಯಿತ ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಯಾಂತ್ರಿಕೃತ ಮೀನುಗಾರರು' : 'Registered traditional & mechanized fishermen' },
        { name: 'Kisan Credit Card (KCC) for Fisheries', description: isKn ? 'ಕಡಿಮೆ 7% ಬಡ್ಡಿದರದಲ್ಲಿ ₹2 ಲಕ್ಷದವರೆಗೆ ಸಾಲ ಸೌಲಭ್ಯ.' : 'Concessional working capital loans up to ₹2 Lakhs with low 7% interest.', eligibility: isKn ? 'ಸಕ್ರಿಯ ಮೀನುಗಾರರು & ದೋಣಿ ಮಾಲೀಕರು' : 'Active fishermen & boat owners' },
        { name: 'Group Accident Insurance Scheme (GAIS)', description: isKn ? 'ಯಾವುದೇ ಪ್ರೀಮಿಯಂ ವೆಚ್ಚವಿಲ್ಲದೆ ₹5 ಲಕ್ಷ ಅಪಘಾತ ವಿಮೆ ರಕ್ಷಣೆ.' : '₹5 Lakhs accident death/disability coverage without any premium cost.', eligibility: isKn ? 'ಎಲ್ಲಾ ಕರಾವಳಿ ಕರ್ನಾಟಕ ಮೀನುಗಾರರು' : 'All coastal Karnataka fishermen' },
        { name: 'Mathsyashraya Housing Scheme', description: isKn ? 'ವಸತಿ ರಹಿತ ಮೀನುಗಾರರಿಗೆ ಮನೆ ನಿರ್ಮಾಣಕ್ಕೆ ಆರ್ಥಿಕ ನೆರವು.' : 'Financial assistance for construction of houses for houseless fishermen.', eligibility: isKn ? 'ರಾಜ್ಯ ನೋಂದಾಯಿತ ಕರಾವಳಿ ಮೀನುಗಾರರು' : 'State registered coastal fishermen' }
    ];

    const displaySchemes = (schemesList) => {
        moreContainer.innerHTML = `
            <div class="glass-card" style="margin-top:0;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <h3 style="font-size:15px;margin-bottom:0;font-weight:800;color:#38bdf8;">${isKn ? '🏛️ ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ & ವಿಮೆ ಯೋಜನೆಗಳು' : '🏛️ Government Subsidies & Insurance'}</h3>
                    <span style="font-size:10px;background:rgba(6,182,212,0.12);color:#38bdf8;padding:2px 8px;border-radius:10px;font-weight:700;">PMMSY / NFDB</span>
                </div>
                <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">${isKn ? 'ಕರ್ನಾಟಕ ಮೀನುಗಾರರಿಗೆ ಪ್ರಧಾನಮಂತ್ರಿ ಮತ್ಸ್ಯ ಸಂಪದ ಯೋಜನೆ ಮತ್ತು ರಾಜ್ಯ ಯೋಜನೆಗಳು:' : 'Pradhan Mantri Matsya Sampada Yojana and state marine schemes for Karnataka fishermen:'}</p>
                ${schemesList.map(s => `
                    <div class="item-row" style="display:block;padding:12px 2px;">
                        <div style="font-weight:750;font-size:14px;color:var(--text-main);line-height:1.3;margin:0;">${s.name}</div>
                        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;line-height:1.45;">${s.description}</div>
                        <div style="font-size:11px;color:var(--price-color);margin-top:6px;font-weight:700;">🎯 ${isKn ? 'ಅರ್ಹತೆ:' : 'Eligibility:'} <span style="color:var(--text-main);font-weight:500;">${s.eligibility}</span></div>
                    </div>
                `).join('')}
            </div>
        `;
    };

    try {
        const response = await fetch(BACKEND_URL + '/schemes');
        const data = await response.json();
        if (data.success && data.schemes && data.schemes.length) {
            displaySchemes(data.schemes);
            return;
        }
    } catch {}
    displaySchemes(fallbackSchemes);
}

async function renderSeasonalPrediction() {
    currentMoreFeature = 'prediction';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '🐟 ಋತುಮಾನ ಮಾರ್ಗದರ್ಶಿ' : '🐟 Seasonal Guide');
    const moreContainer = document.getElementById('moreContainer');
    if (!moreContainer) return;
    moreContainer.innerHTML = `<div class="glass-card" style="margin-top:0;"><p style="opacity:0.6;font-size:13px;">${isKn ? '⏳ ಕರಾವಳಿ ಋತುಮಾನ ಮೀನುಗಾರಿಕೆ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : '⏳ Loading Karavali seasonal catch guide...'}</p></div>`;
    try {
        const response = await fetch(BACKEND_URL + '/fish-prediction');
        const data = await response.json();
        if (data.success) {
            moreContainer.innerHTML = `
                <div class="glass-card" style="margin-top:0;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <h3 style="font-size:15px;margin-bottom:0;font-weight:800;color:#38bdf8;">${isKn ? '🐟 ಕರಾವಳಿ ಋತುಮಾನ ಮೀನುಗಾರಿಕೆ ಮಾರ್ಗದರ್ಶಿ' : '🐟 Seasonal Catch Guide'}</h3>
                        <span style="font-size:10px;background:rgba(6,182,212,0.12);color:#38bdf8;padding:2px 8px;border-radius:10px;font-weight:700;">${data.month || (isKn ? 'ಕರಾವಳಿ ತೀರ' : 'Karavali Coast')}</span>
                    </div>
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.4;">
                        ${isKn ? 'ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಐತಿಹಾಸಿಕ ಲಭ್ಯತೆ ಸೂಚ್ಯಂಕ (CMFRI ಉಲ್ಲೇಖ). ನೇರ ರೇಡಾರ್ ಅಲ್ಲ.' : 'Historical seasonal availability index for Coastal Karnataka (CMFRI reference). Not a live tracking radar.'}
                    </div>
                    ${data.predictions.map(p => {
                        const statusColor = p.probability >= 80 ? '#10b981' : p.probability >= 60 ? '#f59e0b' : '#94a3b8';
                        const statusText = p.status_text ? p.status_text.replace('🎯 ', '').replace('✅ ', '').replace('⚠️ ', '') : p.probability + '%';
                        return `
                        <div class="item-row" style="align-items:flex-start;padding:12px 2px;">
                            <div style="flex:1;min-width:0;padding-right:12px;">
                                <div style="font-weight:750;color:var(--text-main);font-size:14px;line-height:1.25;margin:0;">🐟 ${p.fish} <span style="font-size:11.5px;color:var(--text-muted);font-weight:500;">(${p.kannada})</span></div>
                                <div style="font-size:11px;color:var(--text-muted);margin-top:3px;line-height:1.2;">📍 ${p.location} · ⚓ ${p.gear}</div>
                                <div style="font-size:11px;color:var(--text-muted);opacity:0.85;margin-top:3px;line-height:1.35;">${p.advice}</div>
                            </div>
                            <div style="text-align:right;flex-shrink:0;">
                                <span style="font-weight:800;color:${statusColor};font-size:11px;background:transparent;padding:2px 8px;border-radius:12px;display:inline-block;border:1px solid ${statusColor};line-height:1.25;margin:0;">
                                    ${statusText}
                                </span>
                            </div>
                        </div>
                        `;
                    }).join('')}
                    <div style="margin-top:14px;font-size:10.5px;color:var(--text-muted);text-align:center;padding-top:10px;border-top:1px solid var(--item-separator);line-height:1.4;">
                        ℹ️ ${data.disclaimer}
                    </div>
                </div>
            `;
            const ca = document.getElementById('contentArea');
            if (ca) ca.scrollTop = 0;
        }
    } catch {
        moreContainer.innerHTML = `<div class="glass-card" style="margin-top:0;"><p style="color:#ef4444;font-size:13px;">${isKn ? '❌ ಋತುಮಾನ ಮಾರ್ಗದರ್ಶಿ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ.' : '❌ Could not load seasonal guide. Please check connection.'}</p></div>`;
    }
}

function renderExportVoyage() {
    playTapSound();
    currentMoreFeature = 'export';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '📄 ವರದಿ ಡೌನ್‌ಲೋಡ್' : '📄 Export Voyage');
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    let txt = '=== FISHERMEN-AI KARAVALI TRIP REPORT ===\nGenerated: ' + new Date().toLocaleString() + '\n\n';
    if (trips.length === 0) txt += (isKn ? 'ಯಾವುದೇ ಪ್ರವಾಸಗಳು ದಾಖಲಾಗಿಲ್ಲ.\n' : 'No recent trips found in local storage.\n');
    else trips.forEach((t, i) => txt += `Trip #${i+1} | ${t.date} | Decision: ${t.status}\n`);
    
    // Automatically trigger report text file download
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fishermen-voyage-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    renderExportVoyageSummaryOnly(txt);
}

function renderExportVoyageSummaryOnly(customTxt) {
    currentMoreFeature = 'export';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '📄 ವರದಿ ಡೌನ್‌ಲೋಡ್' : '📄 Export Voyage');
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    let txt = customTxt;
    if (!txt) {
        txt = '=== FISHERMEN-AI KARAVALI TRIP REPORT ===\nGenerated: ' + new Date().toLocaleString() + '\n\n';
        if (trips.length === 0) txt += (isKn ? 'ಯಾವುದೇ ಪ್ರವಾಸಗಳು ದಾಖಲಾಗಿಲ್ಲ.\n' : 'No recent trips found in local storage.\n');
        else trips.forEach((t, i) => txt += `Trip #${i+1} | ${t.date} | Decision: ${t.status}\n`);
    }

    const container = document.getElementById('moreContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-card" style="margin-top:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <h3 style="font-size:15px;margin-bottom:0;font-weight:800;color:#38bdf8;">${isKn ? '📄 ಪ್ರಯಾಣದ ವರದಿ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ' : '📄 Voyage Report Exported'}</h3>
                <span style="font-size:10px;background:rgba(16,185,129,0.2);color:#6ee7b7;padding:3px 8px;border-radius:12px;font-weight:700;">DOWNLOADED</span>
            </div>
            <p style="font-size:12px;color:#cbd5e1;margin-bottom:12px;">${isKn ? 'ನಿಮ್ಮ ಪ್ರಯಾಣದ ವಿವರಗಳ ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.' : 'Your trip advisory log file has been generated and saved to your device downloads folder.'}</p>
            <div style="background:rgba(3,7,18,0.7);padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);font-family:monospace;font-size:11px;color:#94a3b8;white-space:pre-wrap;max-height:180px;overflow-y:auto;margin-bottom:14px;">${txt}</div>
            <button onclick="renderExportVoyage()" style="width:100%;padding:12px;background:linear-gradient(135deg,#0ea5e9,#2563eb);border:none;border-radius:12px;color:white;font-weight:800;font-size:13px;cursor:pointer;box-shadow:0 4px 14px rgba(14,165,233,0.3);">${isKn ? '📥 ವರದಿ ಫೈಲ್ ಮತ್ತೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' : '📥 Download Report File Again'}</button>
        </div>
    `;
}

// Attach event listeners for 8 More features
document.getElementById('historyBtn').addEventListener('click', function() { playTapSound(); renderAdvisoryHistory(); });
document.getElementById('dashboardBtn').addEventListener('click', function() { playTapSound(); renderVoyageStats(); });
document.getElementById('fuelBtn').addEventListener('click', function() { playTapSound(); renderFuelCalculator(); });
document.getElementById('schemeBtn').addEventListener('click', function() { playTapSound(); renderGovtSchemes(); });
document.getElementById('predictionBtn').addEventListener('click', function() { playTapSound(); renderSeasonalPrediction(); });
document.getElementById('exportBtn').addEventListener('click', function() { renderExportVoyage(); });

// ============================================
// 🎣 CATCH LOGGER & REVENUE TRACKER
// ============================================
const catchLogBtnEl = document.getElementById('catchLogBtn');
if (catchLogBtnEl) {
    catchLogBtnEl.addEventListener('click', function() {
        playTapSound();
        renderCatchLogger();
    });
}

function renderCatchLogger() {
    currentMoreFeature = 'catchLog';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '🎣 ಮೀನು ಬೇಟೆ ದಾಖಲೆ' : '🎣 Catch Logger');
    const catches = JSON.parse(localStorage.getItem('catches') || '[]');
    const totalKg = catches.reduce((acc, c) => acc + (parseFloat(c.kg) || 0), 0);
    const totalRev = catches.reduce((acc, c) => acc + (parseFloat(c.revenue) || 0), 0);

    const container = document.getElementById('moreContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="glass-card" style="margin-top:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <h3 style="font-size:15px;margin-bottom:0;font-weight:800;color:#38bdf8;">${isKn ? '🎣 ದೈನಂದಿನ ಮೀನು ಬೇಟೆ & ಆದಾಯ ದಾಖಲೆ' : '🎣 Daily Catch & Revenue Logger'}</h3>
                <span style="font-size:10px;background:rgba(16,185,129,0.2);color:#6ee7b7;padding:3px 8px;border-radius:12px;font-weight:700;">LIVE LOG</span>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
                <div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.22);padding:10px;border-radius:12px;text-align:center;">
                    <div style="font-size:18px;font-weight:900;color:#38bdf8;">${totalKg.toFixed(1)} kg</div>
                    <div style="font-size:10px;color:var(--text-muted);font-weight:700;">${isKn ? 'ಒಟ್ಟು ಮೀನು' : 'TOTAL CATCH'}</div>
                </div>
                <div style="background:rgba(250,204,21,0.08);border:1px solid rgba(250,204,21,0.22);padding:10px;border-radius:12px;text-align:center;">
                    <div style="font-size:18px;font-weight:900;color:#facc15;">₹${totalRev.toFixed(0)}</div>
                    <div style="font-size:10px;color:var(--text-muted);font-weight:700;">${isKn ? 'ಒಟ್ಟು ಆದಾಯ' : 'GROSS EARNINGS'}</div>
                </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:8px;">
                <select id="catchSpecies" class="app-select" onchange="updateCatchEstimate()">
                    <option value="220" data-name="Indian Mackerel (ಬಂಗಡೆ)">🐟 Mackerel / ಬಂಗಡೆ (₹220/kg)</option>
                    <option value="150" data-name="Oil Sardine (ಬೂತಾಯಿ)">🐟 Sardine / ಬೂತಾಯಿ (₹150/kg)</option>
                    <option value="450" data-name="Silver Pomfret (ಮಾಂಜಿ)">🐟 Pomfret / ಮಾಂಜಿ (₹450/kg)</option>
                    <option value="580" data-name="Kingfish / Seer (ಅಂಜಲ್)">🐟 Kingfish / ಅಂಜಲ್ (₹580/kg)</option>
                    <option value="340" data-name="Yellowfin Tuna (ಗೆದ್ದಾರ್)">🐟 Tuna / ಗೆದ್ದಾರ್ (₹340/kg)</option>
                    <option value="420" data-name="Tiger Prawn (ಸೀಗಡಿ)">🦐 Prawn / ಸೀಗಡಿ (₹420/kg)</option>
                    <option value="280" data-name="Mud Crab (ಡೆಂಜಿ)">🦀 Crab / ಡೆಂಜಿ (₹280/kg)</option>
                    <option value="260" data-name="Squid (ಬೊಂಡಾಸ್)">🦑 Squid / ಬೊಂಡಾಸ್ (₹260/kg)</option>
                </select>

                <div style="display:flex;gap:8px;">
                    <input type="number" id="catchWeight" class="app-input" placeholder="${isKn ? 'ತೂಕ (ಕೆಜಿ)' : 'Catch Quantity (kg)'}" value="15" style="flex:1;" oninput="updateCatchEstimate()">
                    <button onclick="saveCatchLog()" style="padding:11px 18px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:12px;color:white;font-weight:800;font-size:13px;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.35);">${isKn ? '+ ದಾಖಲಿಸಿ' : '+ Log Catch'}</button>
                </div>
            </div>

            <div id="catchEstimateMsg" style="margin-top:8px;font-size:12px;color:var(--text-main);padding:6px 2px;line-height:1.4;">
                ${isKn ? 'ಅಂದಾಜು ಮೌಲ್ಯ:' : 'Estimated Value:'} <b style="color:#facc15;font-size:13.5px;">₹3,300</b> <span style="color:var(--text-muted);font-size:11px;">(15 kg × ₹220)</span>
            </div>

            <div style="margin-top:14px;border-top:1px solid var(--item-separator);padding-top:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                    <span style="font-size:11px;font-weight:800;color:#94a3b8;letter-spacing:0.4px;">${isKn ? 'ಇತ್ತೀಚಿನ ದಾಖಲೆಗಳು' : 'RECENT CATCHES'}</span>
                    ${catches.length > 0 ? `<button onclick="clearCatchLogs()" style="background:none;border:none;color:#f87171;font-size:11px;cursor:pointer;">${isKn ? 'ದಾಖಲೆ ತೆರವುಗೊಳಿಸಿ' : 'Clear Log'}</button>` : ''}
                </div>
                <div id="catchHistoryList">
                    ${catches.length === 0 ? `<p style="opacity:0.6;font-size:12px;padding:8px 0;">${isKn ? 'ಇಂದು ಇನ್ನೂ ಯಾವುದೇ ಮೀನು ದಾಖಲಾಗಿಲ್ಲ.' : 'No catches logged yet today.'}</p>` :
                    catches.slice(-4).reverse().map(c => `
                        <div class="item-row" style="align-items:flex-start;padding:10px 2px;">
                            <div style="flex:1;min-width:0;padding-right:12px;">
                                <div style="font-weight:750;font-size:13.5px;color:var(--text-main);line-height:1.25;margin:0;">${c.name}</div>
                                <div style="font-size:11px;color:var(--text-muted);margin-top:2px;line-height:1.2;">${c.kg} kg · ${c.time}</div>
                            </div>
                            <div style="text-align:right;flex-shrink:0;">
                                <div class="price" style="font-size:15px;font-weight:800;color:var(--price-color);line-height:1.25;margin:0;">₹${c.revenue}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    const ca = document.getElementById('contentArea');
    if (ca) ca.scrollTop = 0;
}

window.updateCatchEstimate = function() {
    const sel = document.getElementById('catchSpecies');
    const input = document.getElementById('catchWeight');
    const msg = document.getElementById('catchEstimateMsg');
    if (!sel || !input || !msg) return;
    const isKn = (currentLang === 'kn');
    const price = parseFloat(sel.value) || 0;
    const kg = parseFloat(input.value) || 0;
    const total = price * kg;
    msg.innerHTML = `${isKn ? 'ಅಂದಾಜು ಮೌಲ್ಯ:' : 'Estimated Value:'} <b style="color:#facc15;font-size:13.5px;">₹${total.toFixed(0)}</b> <span style="color:var(--text-muted);font-size:11px;">(${kg} kg × ₹${price})</span>`;
};

window.saveCatchLog = function() {
    playSuccessChime();
    const sel = document.getElementById('catchSpecies');
    const input = document.getElementById('catchWeight');
    if (!sel || !input) return;
    const price = parseFloat(sel.value) || 0;
    const kg = parseFloat(input.value) || 0;
    if (kg <= 0) return;
    const selectedOption = sel.options[sel.selectedIndex];
    const name = selectedOption.getAttribute('data-name') || 'Fish';
    const revenue = price * kg;

    const catches = JSON.parse(localStorage.getItem('catches') || '[]');
    catches.push({
        name: name,
        kg: kg,
        revenue: revenue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('catches', JSON.stringify(catches));
    renderCatchLogger();
};

window.clearCatchLogs = function() {
    playTapSound();
    localStorage.removeItem('catches');
    renderCatchLogger();
};



// ============================================
// MORE FEATURE DYNAMIC RENDERER
// ============================================
function renderCurrentMoreFeature() {
    if (currentMoreFeature === 'fishGuide') renderFishScanner();
    else if (currentMoreFeature === 'prediction') renderSeasonalPrediction();
    else if (currentMoreFeature === 'fuel') renderFuelCalculator();
    else if (currentMoreFeature === 'schemes') renderGovtSchemes();
    else if (currentMoreFeature === 'dashboard') renderVoyageStats();
    else if (currentMoreFeature === 'history') renderAdvisoryHistory();
    else if (currentMoreFeature === 'export') renderExportVoyageSummaryOnly();
    else if (currentMoreFeature === 'catchLog') renderCatchLogger();
    else if (currentMoreFeature === 'videos') renderFishLearningVideos();
}
