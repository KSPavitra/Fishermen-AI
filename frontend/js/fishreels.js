// ============================================
// FISHREELS · EDUCATIONAL SHORTS CONTROLLER
// ============================================

// STATE VARIABLES

let currentReelIndex = 0;
let isReelsMuted = true;
let isReelsPlaying = true;
let reelCaptionLang = 'kn'; // Kannada is primary by default
let reelsObserver = null;
let reelsVideoList = [];
let reelTimeoutId = null;
let reelsKeyHandler = null;
let swipeHintTimeout = null;



function getReelsFilteredList() {
    let list = FISH_VIDEOS.slice();
    // Prioritize Kannada-language native shorts first
    list.sort((a, b) => {
        if (a.lang === 'kn' && b.lang !== 'kn') return -1;
        if (a.lang !== 'kn' && b.lang === 'kn') return 1;
        return 0;
    });
    return list;
}

function renderFishLearningVideos(targetIndex = 0) {
    openFishReels(targetIndex);
}

function openFishReels(targetIndex = 0) {
    playTapSound();
    currentMoreFeature = 'videos';
    const isKn = (currentLang === 'kn');
    openMoreFeature(isKn ? '🎬 ಮೀನು ಕಲಿಯೋಣ' : '🎬 FishReels');

    // 1. Enter Fullscreen Shorts Mode: hide website header, language selector, theme toggle, install banner, bottom nav
    document.body.classList.add('shorts-mode-active');
    document.documentElement.classList.add('shorts-mode-active');

    // Add .reels-active to parent layout containers so feed occupies full viewport
    const contentArea = document.getElementById('contentArea');
    const pageMore = document.getElementById('page-more');
    const featureView = document.getElementById('moreFeatureView');
    const moreContainer = document.getElementById('moreContainer');

    if (contentArea) contentArea.classList.add('reels-active');
    if (pageMore) pageMore.classList.add('reels-active');
    if (featureView) featureView.classList.add('reels-active');
    if (moreContainer) moreContainer.classList.add('reels-active');

    // Android Hardware / Browser Back Button handling
    try {
        history.pushState({ modal: 'fishReels' }, '');
    } catch (e) {}
    window.removeEventListener('popstate', handleReelsPopState);
    window.addEventListener('popstate', handleReelsPopState);

    reelsVideoList = getReelsFilteredList();
    currentReelIndex = Math.max(0, Math.min(targetIndex, reelsVideoList.length - 1));
    isReelsPlaying = true;

    buildReelsFeedMarkup();
    initReelsObserversAndControls();

    // Immediately play the active video
    goToReel(currentReelIndex, true);

    // Auto-dismiss swipe hint after 3.8s
    clearTimeout(swipeHintTimeout);
    swipeHintTimeout = setTimeout(() => {
        const hint = document.getElementById('shortsSwipeHint');
        if (hint) {
            hint.style.opacity = '0';
            setTimeout(() => { if (hint) hint.style.display = 'none'; }, 500);
        }
    }, 3800);
}

function handleReelsPopState(e) {
    if (document.body.classList.contains('shorts-mode-active')) {
        closeMoreFeature(false);
    }
}

function toggleReelCaptionLang(index) {
    playTapSound();
    reelCaptionLang = (reelCaptionLang === 'kn') ? 'en' : 'kn';
    reelsVideoList.forEach((_, idx) => {
        updateReelCaptionDisplay(idx);
    });
}

function updateReelCaptionDisplay(index) {
    const video = reelsVideoList[index];
    if (!video) return;
    const titleEl = document.getElementById(`reelTitle_${index}`);
    const captionEl = document.getElementById(`reelCaption_${index}`);
    const pillEl = document.getElementById(`reelLangPill_${index}`);

    const isKn = (reelCaptionLang === 'kn');
    if (titleEl) titleEl.textContent = isKn ? video.titleKn : video.titleEn;
    if (captionEl) captionEl.textContent = isKn ? (video.captionKn || video.factKn) : (video.captionEn || video.factEn);
    if (pillEl) pillEl.textContent = isKn ? 'EN' : 'ಕನ್ನಡ';
}

function buildReelsFeedMarkup() {
    const moreContainer = document.getElementById('moreContainer');
    if (!moreContainer) return;

    let slidesHTML = reelsVideoList.map((video, index) => {
        const isKn = (reelCaptionLang === 'kn');
        const title = isKn ? video.titleKn : video.titleEn;
        const caption = isKn ? (video.captionKn || video.factKn) : (video.captionEn || video.factEn || video.captionKn);

        return `
            <div class="reel-slide" data-index="${index}" data-id="${video.id}" id="reelSlide_${index}">
                <!-- Full-Screen Vertical Player Frame (width: 100vw, height: 100dvh) -->
                <div class="reel-player-box">
                    <div class="reel-player-mount" id="reelMount_${index}">
                        <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${title}" class="reel-poster-img" loading="lazy">
                    </div>

                    <!-- Transparent Touch Layer for Tap Play/Pause & Vertical Swipe -->
                    <div class="reel-touch-layer" id="reelTouch_${index}" onclick="onReelTouchTap(${index})" title="Tap to Play / Pause"></div>

                    <!-- Center Play/Pause Ripple Feedback Badge -->
                    <div class="reel-tap-feedback" id="reelTapFeedback_${index}">▶</div>

                    <!-- Spinner -->
                    <div class="reel-spinner" id="reelSpinner_${index}" style="display:none;">
                        <div class="reel-spinner-fish">🎣</div>
                        <div class="reel-spinner-text">${isKn ? 'ವೀಡಿಯೊ ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Loading video...'}</div>
                    </div>

                    <!-- Error Fallback -->
                    <div class="reel-error-card" id="reelError_${index}" style="display:none;">
                        <div style="font-size:28px;margin-bottom:8px;">⚠️</div>
                        <div style="font-size:12px;font-weight:700;line-height:1.35;margin-bottom:12px;color:#f87171;">
                            ${isKn ? 'ವೀಡಿಯೊ ಪ್ಲೇಬ್ಯಾಕ್ ಲಭ್ಯವಿಲ್ಲ' : 'In-app playback restricted for this video'}
                        </div>
                        <button onclick="event.stopPropagation(); retryReel(${index});" class="reel-error-btn primary">
                            🔄 ${isKn ? 'ಮರುಪ್ರಯತ್ನಿಸಿ' : 'Retry'}
                        </button>
                        <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="reel-error-btn secondary">
                            ↗️ ${isKn ? 'ಯೂಟ್ಯೂಬ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ' : 'Watch on YouTube'}
                        </a>
                    </div>
                </div>

                <!-- Minimal Overlaid Bottom Caption (Short Kannada Caption + English Toggle) -->
                <div class="shorts-caption-overlay">
                    <div class="shorts-title-row">
                        <h4 class="shorts-video-title" id="reelTitle_${index}">${title}</h4>
                        <button class="shorts-lang-pill" id="reelLangPill_${index}" onclick="event.stopPropagation(); toggleReelCaptionLang(${index});" aria-label="Toggle language">
                            ${isKn ? 'EN' : 'ಕನ್ನಡ'}
                        </button>
                    </div>
                    <div class="shorts-short-caption" id="reelCaption_${index}">${caption}</div>
                </div>
            </div>
        `;
    }).join('');

    moreContainer.innerHTML = `
        <div class="fish-reels-container" id="fishReelsContainer">
            <!-- Minimal Translucent Back Button (Top-Left Safe Area) -->
            <button class="shorts-back-btn" onclick="closeMoreFeature()" aria-label="Exit Shorts" title="Back">
                ←
            </button>

            <!-- Top Right Group: Video Counter + Sound Button -->
            <div class="shorts-top-right-group">
                <span class="shorts-counter-badge" id="shortsCounterBadge">${currentReelIndex + 1} / ${reelsVideoList.length}</span>
                <button class="shorts-sound-btn ${isReelsMuted ? '' : 'unmuted'}" id="shortsSoundBtn" onclick="toggleReelSound()" aria-label="Toggle Sound" title="Sound">
                    <span id="shortsSoundIcon">${isReelsMuted ? '🔇' : '🔊'}</span>
                </button>
            </div>

            <!-- Sound Status Toast -->
            <div class="reels-toast" id="reelsToast" style="display:none;"></div>

            <!-- Fullscreen Vertical Snap Viewport -->
            <div class="reels-viewport" id="reelsViewport" tabindex="0" role="region" aria-label="Vertical Shorts Feed">
                ${slidesHTML}
            </div>

            <!-- Subtle Swipe Hint (Auto fades out) -->
            <div class="shorts-swipe-hint" id="shortsSwipeHint">
                <span>↑ ${reelCaptionLang === 'kn' ? 'ಮುಂದಿನ ವೀಡಿಯೊಗೆ ಮೇಲಕ್ಕೆ ಸ್ವೈಪ್ ಮಾಡಿ' : 'Swipe up for next video'}</span>
            </div>
        </div>
    `;
}

let isSwipingGesture = false;

function initReelsObserversAndControls() {
    const viewport = document.getElementById('reelsViewport');
    if (!viewport) return;

    if (reelsObserver) {
        reelsObserver.disconnect();
    }

    // Modern IntersectionObserver to track visible slide at 55% visibility
    reelsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                const idx = parseInt(entry.target.dataset.index, 10);
                if (!isNaN(idx) && idx !== currentReelIndex) {
                    onReelChanged(idx);
                }
            }
        });
    }, {
        root: viewport,
        threshold: [0.55]
    });

    const slides = viewport.querySelectorAll('.reel-slide');
    slides.forEach(slide => reelsObserver.observe(slide));

    // Touch Swipe Event Listeners for smooth vertical swipe gesture on mobile
    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;
    isSwipingGesture = false;

    viewport.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            touchStartTime = Date.now();
            isSwipingGesture = false;
        }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            const diffY = Math.abs(e.touches[0].clientY - touchStartY);
            const diffX = Math.abs(e.touches[0].clientX - touchStartX);
            if (diffY > 8 || diffX > 8) {
                isSwipingGesture = true;
            }
        }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches.length > 0) {
            const touchEndY = e.changedTouches[0].clientY;
            const diffY = touchStartY - touchEndY;
            const elapsed = Date.now() - touchStartTime;

            // Fast vertical flick gesture or swipe distance > 45px
            if ((Math.abs(diffY) > 40 && elapsed < 400) || Math.abs(diffY) > 75) {
                isSwipingGesture = true;
                const hint = document.getElementById('shortsSwipeHint');
                if (hint) {
                    hint.style.opacity = '0';
                    setTimeout(() => { if (hint) hint.style.display = 'none'; }, 400);
                }

                if (diffY > 0 && currentReelIndex < reelsVideoList.length - 1) {
                    goToReel(currentReelIndex + 1);
                } else if (diffY < 0 && currentReelIndex > 0) {
                    goToReel(currentReelIndex - 1);
                }
            }
            setTimeout(() => {
                isSwipingGesture = false;
            }, 100);
        }
    }, { passive: true });

    // Wheel listener for desktop and laptop trackpads
    let wheelThrottle = false;
    viewport.addEventListener('wheel', (e) => {
        if (wheelThrottle) return;
        if (Math.abs(e.deltaY) > 25) {
            wheelThrottle = true;
            setTimeout(() => { wheelThrottle = false; }, 450);
            const hint = document.getElementById('shortsSwipeHint');
            if (hint) {
                hint.style.opacity = '0';
                setTimeout(() => { if (hint) hint.style.display = 'none'; }, 400);
            }

            if (e.deltaY > 0 && currentReelIndex < reelsVideoList.length - 1) {
                goToReel(currentReelIndex + 1);
            } else if (e.deltaY < 0 && currentReelIndex > 0) {
                goToReel(currentReelIndex - 1);
            }
        }
    }, { passive: true });

    // Keyboard Shortcuts
    if (reelsKeyHandler) {
        document.removeEventListener('keydown', reelsKeyHandler);
    }
    reelsKeyHandler = function(e) {
        if (currentMoreFeature !== 'videos') return;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            goToReel(currentReelIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            goToReel(currentReelIndex - 1);
        } else if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
            e.preventDefault();
            toggleReelPlayPause();
        } else if (e.key === 'm' || e.key === 'M') {
            e.preventDefault();
            toggleReelSound();
        } else if (e.key === 'Escape') {
            closeMoreFeature();
        }
    };
    document.addEventListener('keydown', reelsKeyHandler);
}

function onReelTouchTap(index) {
    if (isSwipingGesture) return;
    onReelCenterTap(index);
}

function onReelChanged(newIndex) {
    if (newIndex < 0 || newIndex >= reelsVideoList.length) return;

    // 1. Unload previous reel iframe to stop audio & free mobile memory
    if (currentReelIndex !== newIndex) {
        const prevMount = document.getElementById(`reelMount_${currentReelIndex}`);
        const prevVideo = reelsVideoList[currentReelIndex];
        if (prevMount && prevVideo) {
            const isKn = (reelCaptionLang === 'kn');
            const title = isKn ? prevVideo.titleKn : prevVideo.titleEn;
            prevMount.innerHTML = `
                <img src="https://i.ytimg.com/vi/${prevVideo.id}/hqdefault.jpg" alt="${title}" class="reel-poster-img" loading="lazy">
            `;
        }
        const prevSpinner = document.getElementById(`reelSpinner_${currentReelIndex}`);
        if (prevSpinner) prevSpinner.style.display = 'none';
        const prevError = document.getElementById(`reelError_${currentReelIndex}`);
        if (prevError) prevError.style.display = 'none';
    }

    currentReelIndex = newIndex;
    isReelsPlaying = true;

    // Update Counter badge
    const counterBadge = document.getElementById('shortsCounterBadge');
    if (counterBadge) {
        counterBadge.textContent = `${newIndex + 1} / ${reelsVideoList.length}`;
    }

    // Dismiss swipe hint
    const hint = document.getElementById('shortsSwipeHint');
    if (hint && newIndex > 0) {
        hint.style.opacity = '0';
        setTimeout(() => { if (hint) hint.style.display = 'none'; }, 500);
    }

    // 2. Update active slide player
    const activeMount = document.getElementById(`reelMount_${newIndex}`);
    const activeSpinner = document.getElementById(`reelSpinner_${newIndex}`);
    const activeError = document.getElementById(`reelError_${newIndex}`);
    const activeVideo = reelsVideoList[newIndex];
    if (!activeMount || !activeVideo) return;

    if (activeSpinner) activeSpinner.style.display = 'flex';
    if (activeError) activeError.style.display = 'none';

    clearTimeout(reelTimeoutId);
    reelTimeoutId = setTimeout(() => {
        if (activeSpinner && activeSpinner.style.display === 'flex') {
            activeSpinner.style.display = 'none';
            if (activeError) activeError.style.display = 'flex';
        }
    }, 8500);

    const isKn = (reelCaptionLang === 'kn');
    const title = isKn ? activeVideo.titleKn : activeVideo.titleEn;

    activeMount.innerHTML = `
        <iframe 
            id="activeReelIframe"
            src="https://www.youtube-nocookie.com/embed/${activeVideo.id}?enablejsapi=1&autoplay=1&mute=${isReelsMuted ? 1 : 0}&playsinline=1&rel=0&modestbranding=1&controls=0&loop=1&playlist=${activeVideo.id}" 
            title="${title}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen 
            loading="eager">
        </iframe>
    `;

    const iframeEl = activeMount.querySelector('iframe');
    if (iframeEl) {
        iframeEl.onload = () => {
            clearTimeout(reelTimeoutId);
            setTimeout(() => {
                if (activeSpinner) activeSpinner.style.display = 'none';
            }, 300);
        };
        iframeEl.onerror = () => {
            clearTimeout(reelTimeoutId);
            if (activeSpinner) activeSpinner.style.display = 'none';
            if (activeError) activeError.style.display = 'flex';
        };
    }
}

function goToReel(index, instant = false) {
    if (index < 0 || index >= reelsVideoList.length) return;
    const targetSlide = document.getElementById(`reelSlide_${index}`);
    const viewport = document.getElementById('reelsViewport');
    if (targetSlide && viewport) {
        targetSlide.scrollIntoView({
            behavior: instant ? 'instant' : 'smooth',
            block: 'start'
        });
        onReelChanged(index);
    }
}

function toggleReelSound() {
    playTapSound();
    isReelsMuted = !isReelsMuted;
    const isKn = (currentLang === 'kn');

    // Update sound button UI
    const soundBtn = document.getElementById('shortsSoundBtn');
    const soundIcon = document.getElementById('shortsSoundIcon');
    if (soundBtn && soundIcon) {
        soundIcon.textContent = isReelsMuted ? '🔇' : '🔊';
        soundBtn.classList.toggle('unmuted', !isReelsMuted);
    }

    // Show floating toast
    const toast = document.getElementById('reelsToast');
    if (toast) {
        toast.textContent = isReelsMuted ? (isKn ? '🔇 ಮ್ಯೂಟ್ ಮಾಡಲಾಗಿದೆ' : '🔇 Sound Muted') : (isKn ? '🔊 ಧ್ವನಿ ಆನ್ ಆಗಿದೆ' : '🔊 Sound Enabled');
        toast.style.display = 'block';
        clearTimeout(window._reelsToastTimeout);
        window._reelsToastTimeout = setTimeout(() => {
            if (toast) toast.style.display = 'none';
        }, 1600);
    }

    // Send postMessage command to active iframe
    const iframe = document.getElementById('activeReelIframe');
    if (iframe && iframe.contentWindow) {
        try {
            iframe.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: isReelsMuted ? 'mute' : 'unMute'
            }), '*');
            if (!isReelsMuted) {
                iframe.contentWindow.postMessage(JSON.stringify({
                    event: 'command',
                    func: 'setVolume',
                    args: [100]
                }), '*');
            }
        } catch (e) {
            console.warn('postMessage sound error:', e);
        }
    }
}

function toggleReelPlayPause() {
    onReelCenterTap(currentReelIndex);
}

function onReelCenterTap(index) {
    if (index !== currentReelIndex) {
        goToReel(index);
        return;
    }
    playTapSound();
    isReelsPlaying = !isReelsPlaying;

    // Animated Center Feedback Badge
    const feedback = document.getElementById(`reelTapFeedback_${index}`);
    if (feedback) {
        feedback.textContent = isReelsPlaying ? '▶' : '⏸';
        feedback.classList.remove('animate');
        void feedback.offsetWidth;
        feedback.classList.add('animate');
        setTimeout(() => {
            feedback.classList.remove('animate');
        }, 600);
    }

    // Send postMessage command to active iframe
    const iframe = document.getElementById('activeReelIframe');
    if (iframe && iframe.contentWindow) {
        try {
            iframe.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: isReelsPlaying ? 'playVideo' : 'pauseVideo'
            }), '*');
        } catch (e) {
            console.warn('postMessage play/pause error:', e);
        }
    }
}

function retryReel(index) {
    playTapSound();
    onReelChanged(index);
}

function destroyFishReels() {
    clearTimeout(reelTimeoutId);
    if (reelsObserver) {
        reelsObserver.disconnect();
        reelsObserver = null;
    }
    if (reelsKeyHandler) {
        document.removeEventListener('keydown', reelsKeyHandler);
        reelsKeyHandler = null;
    }
    window.removeEventListener('popstate', handleReelsPopState);

    // Remove shorts-mode-active to restore header and bottom nav
    document.body.classList.remove('shorts-mode-active');
    document.documentElement.classList.remove('shorts-mode-active');

    const mount = document.getElementById(`reelMount_${currentReelIndex}`);
    if (mount) {
        mount.innerHTML = '';
    }
    const contentArea = document.getElementById('contentArea');
    const pageMore = document.getElementById('page-more');
    const featureView = document.getElementById('moreFeatureView');
    const moreContainer = document.getElementById('moreContainer');

    if (contentArea) contentArea.classList.remove('reels-active');
    if (pageMore) pageMore.classList.remove('reels-active');
    if (featureView) featureView.classList.remove('reels-active');
    if (moreContainer) moreContainer.classList.remove('reels-active');
}

// Fallback legacy stubs
function openVideoPlayer(videoId) {
    const idx = reelsVideoList.findIndex(v => v.id === videoId);
    openFishReels(idx >= 0 ? idx : 0);
}

function closeVideoPlayer() {
    destroyFishReels();
}

// Attach event listener for #videosBtn
const videosBtnEl = document.getElementById('videosBtn');
if (videosBtnEl) {
    videosBtnEl.addEventListener('click', function() {
        playTapSound();
        renderFishLearningVideos();
    });
}
