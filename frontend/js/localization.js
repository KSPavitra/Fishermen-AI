// ============================================
// REGIONAL LANGUAGE SWITCHER & LOCALIZATION ENGINE
// ============================================
currentLang = currentLang || 'kn';
const translations = {
    'kn': {
        marineTag: '🌊 ಕರಾವಳಿ ಸಾಗರ ಹವಾಮಾನ ವರದಿ',
        appSubtitle: 'ಕರಾವಳಿ ಮೀನುಗಾರರ ಹವಾಮಾನ & ಸುರಕ್ಷತಾ ಸಹಾಯಕ · Karavali Coast',
        heroBadge: '🎙️ ಮೈಕ್ ಒತ್ತಿ ನಿಮ್ಮ ಮಾತಲ್ಲೇ ಕೇಳಿ',
        heroTitle: 'ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?',
        heroSub: 'ಕರಾವಳಿ ಹವಾಮಾನ ವರದಿ & ಬಂದರು ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆ',
        micText: 'ಒತ್ತಿ ಮಾತನಾಡಿ',
        micSub: 'ನಿಮ್ಮ ಮಾತಲ್ಲೇ ಕೇಳಿ (ಕನ್ನಡ / English)',
        typeBtnText: 'ಬರೆದು ಕೇಳಿ',
        textInputPlaceholder: 'ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ? ಅಥವಾ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...',
        textSubmitBtn: 'ಕೇಳಿ (Ask)',
        sosHomeTitle: 'SOS · ತುರ್ತು ಸಹಾಯ',
        sosHomeSub: 'ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ರಕ್ಷಣೆ (1554)',
        weatherLinkTitle: 'ಗಾಳಿ & ಅಲೆಗಳ ವಿವರ ನೋಡಿ',
        weatherLinkSub: 'ಗಾಳಿಯ ವೇಗ, ಅಲೆಗಳ ಎತ್ತರ, ಉಬ್ಬರವಿಳಿತ & ಸೂರ್ಯೋದಯ ➔',
        replayText: 'ಧ್ವನಿಯಲ್ಲಿ ಮತ್ತೆ ಕೇಳಿ (Listen Again)',

        // Homepage Conditions & Quick Actions
        homeLocationLabel: 'ಆಯ್ಕೆಮಾಡಿದ ಬಂದರು · Selected Harbor:',
        homeLocationChangeText: 'ಬದಲಾಯಿಸಿ / Change',
        homeVoiceHeroTitle: 'ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ? / How can I help you?',
        homeVoiceHeroSub: 'ಧ್ವನಿ ಮೂಲಕ ಮಾತನಾಡಲು ಮೈಕ್ ಒತ್ತಿ (ಕನ್ನಡ / English)',
        homeHeroMicLabel: 'ಮಾತನಾಡಿ',
        homeShortcutsHeaderTitle: '⚡ ತ್ವರಿತ ಸೇವೆಗಳು · Quick Access',
        homeMarketTitle: 'ಮೀನು ಮಾರುಕಟ್ಟೆ / Fish Market',
        homeMarketSub: 'ಇಂದಿನ ಬಂದರು ಸಗಟು ದರಗಳು & ಹರಾಜು ಮಾಹಿತಿ',
        homeFuelTitle: 'ಇಂಧನ ಲೆಕ್ಕಾಚಾರ / Fuel Calculator',
        homeFuelSub: 'ದೋಣಿಯ ಡೀಸೆಲ್ ಬಳಕೆ & ಪ್ರಯಾಣದ ವೆಚ್ಚ ಅಂದಾಜಿಸಿ',
        homeBrandSubtitle: 'ನಿಮ್ಮ ಮೀನುಗಾರಿಕೆ ಒಡನಾಡಿ',
        condCardTitle: '🌦️ ಇಂದಿನ ಮೀನುಗಾರಿಕೆ ಪರಿಸ್ಥಿತಿ',
        condLiveStatus: 'ಲೈವ್',
        recLabelTitle: 'ಮೀನುಗಾರಿಕೆ ನಿರ್ಧಾರ (RECOMMENDATION)',
        homeReplayBtnText: 'ಕೇಳಿ',
        condWeatherLabel: 'ಹವಾಮಾನ:',
        condWindLabel: 'ಗಾಳಿ:',
        condSeaLabel: 'ಸಮುದ್ರ ಪರಿಸ್ಥಿತಿ:',
        condRefreshText: 'ನವೀಕರಿಸಿ',
        homeVoiceFeatureTitle: 'Fishermen-AI ಗೆ ಕೇಳಿ',
        homeVoiceFeatureSub: 'ಧ್ವನಿ ಮೂಲಕ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ',
        homeSeaFeatureTitle: 'ಸಮುದ್ರ & ಹವಾಮಾನ',
        homeSeaFeatureSub: 'ಮೀನುಗಾರಿಕೆ ಪರಿಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ',
        homeMarketFeatureTitle: 'ಮೀನು ಮಾರುಕಟ್ಟೆ',
        homeMarketFeatureSub: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
        homeFuelFeatureTitle: 'ಇಂಧನ ಲೆಕ್ಕಾಚಾರ',
        homeFuelFeatureSub: 'ಇಂಧನ ಅಗತ್ಯಗಳನ್ನು ಅಂದಾಜಿಸಿ',
        homeEmergencySosText: 'ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ತುರ್ತು ಸಹಾಯವಾಣಿ: 1554',
        homeTypeToggleText: 'ಬರೆದು ಕೇಳಿ',
        homeStopVoiceText: 'ನಿಲ್ಲಿಸಿ',

        // Voice Tab & Global Assistant
        voicePageTitle: '🎤 ಕರಾವಳಿ ಧ್ವನಿ ಸಹಾಯಕ',
        voicePageSub: 'ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಮಾತನಾಡಿ.',
        voiceReadyStatus: 'ಧ್ವನಿ ಪ್ರಶ್ನೆಗೆ ಸಿದ್ಧವಾಗಿದೆ',
        voicePromptsTitle: '💡 ಜನಪ್ರಿಯ ಪ್ರಶ್ನೆಗಳು (POPULAR PROMPTS)',
        voiceHubHeroTitle: 'ಒಂದೇ ಗ್ಲೋಬಲ್ ಧ್ವನಿ ಸಹಾಯಕ',
        voiceHubDesc: 'ವೆಬ್‌ಸೈಟ್‌ನ ಯಾವುದೇ ಪುಟದಲ್ಲಿದ್ದರೂ ಕೆಳಗಿನ ಬಲಭಾಗದಲ್ಲಿರುವ 🎙️ ಫ್ಲೋಟಿಂಗ್ ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ಪ್ರಶ್ನೆ ಕೇಳಬಹುದು.',
        voiceHubLaunchText: 'ಧ್ವನಿ ಸಹಾಯಕ ತೆರೆಯಿರಿ (Open Voice Assistant)',
        vhFeat1: 'ಕನ್ನಡ & ಇಂಗ್ಲಿಷ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಸ್ಪೀಚ್',
        vhFeat2: 'ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ, ಇಂಧನ ಮತ್ತು ಸುರಕ್ಷತೆ ತಿಳಿಯುತ್ತದೆ',
        vhFeat3: 'ಪುಟ ಬಿಟ್ಟು ಹೋಗದೆ ಎಲ್ಲಾ ಸ್ಕ್ರೀನ್‌ಗಳಲ್ಲಿ ಲಭ್ಯ',
        promptItem1: '🐟 "ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?"',
        promptItem2: '💰 "ಬಂಗಡೆ ಮೀನು ಬೆಲೆ ಎಷ್ಟು?"',
        promptItem3: '🌊 "ಈಗ ಗಾಳಿ ಮತ್ತು ಅಲೆಗಳ ಸ್ಥಿತಿ ಹೇಗಿದೆ?"',
        promptItem4: '⛽ "100 HP ದೋಣಿಗೆ ಎಷ್ಟು ಡೀಸೆಲ್ ಬೇಕು?"',
        promptItem5: '🚨 "ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ತುರ್ತು ಸಂಖ್ಯೆ ಏನು?"',
        promptAskLabel: 'ಕೇಳಿ ➔',
        gvaModalTitle: 'ಫಿಶರ್‌ಮೆನ್-ಎಐ ಧ್ವನಿ ಸಹಾಯಕ',
        gvaPromptsTitle: '💡 ಈ ಸ್ಕ್ರೀನ್‌ಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಗಳು',
        gvaReplayText: 'ಮತ್ತೆ ಕೇಳಿ',
        gvaStopSpeechText: 'ನಿಲ್ಲಿಸಿ',
        gvaTranscriptLabel: '🗣️ ನಿಮ್ಮ ಪ್ರಶ್ನೆ / You said:',
        gvaResponseTitle: '🤖 ಸಹಾಯಕ ಸಲಹೆ',

        // Market Tab
        marketPageTitle: '💰 ಬಂದರು ಮೀನು ದರಗಳು',
        marketPageBadge: 'ಕರಾವಳಿ ಬಂದರುಗಳು',
        marketPageSub: 'ಪರಿಶೀಲಿಸಿದ ಬಂದರು ಸಗಟು ದರಗಳು & ಮಾರಾಟ ನಿರ್ಧಾರ ಮಾಹಿತಿ.',
        marketSelectLabel: 'ಕರಾವಳಿ ಬಂದರು ಆಯ್ಕೆಮಾಡಿ (Select Harbor):',
        marketSearchPlaceholder: 'ಮೀನಿನ ಹೆಸರು ಹುಡುಕಿ (Search: ಬಂಗಡೆ, Pomfret, Boothai)...',
        mthFish: 'Fish (ಮೀನು / ತಳಿ)',
        mthPrice: 'Market price (/kg)',
        mthUpdated: 'Updated (ನವೀಕರಣ)',
        marketAdvisoryTitle: 'ಮೀನುಗಾರರ ಮಾರಾಟ ಸಲಹೆ (Selling Decision Advisory):',
        marketAdvisoryText: 'ಇಲ್ಲಿ ನೀಡಿರುವ ಸಗಟು ದರಗಳು ಬಂದರು ಹರಾಜಿನ ಸರಾಸರಿ ಪ್ರತಿ ಕಿಲೋಗ್ರಾಂ ಬೆಲೆಯಾಗಿದೆ. ನಿಮ್ಮ ಕ್ಯಾಚ್‌ನ ತಾಜಾತನ (A-Grade / B-Grade), ಐಸ್ ಪ್ರಮಾಣ ಮತ್ತು ಮಾರುಕಟ್ಟೆಗೆ ಬರುವ ಒಟ್ಟು ದೋಣಿಗಳ ಸಂಖ್ಯೆಗೆ ಅನುಗುಣವಾಗಿ ಅಂತಿಮ ಹರಾಜು ದರ ವ್ಯತ್ಯಾಸವಾಗಬಹುದು. ದೋಣಿ ಇಳಿಸುವ ಮುನ್ನ ಬಂದರು ಹರಾಜುದಾರರೊಂದಿಗೆ (Auctioneer) ದರ ಮಾತನಾಡಿ.',

        // Safety Tab
        safetyPageTitle: '🆘 ತುರ್ತು & ಕಡಲ ಸುರಕ್ಷತಾ ಕೇಂದ್ರ',
        safetySosText: 'ತುರ್ತು ಕಡಲ ರಕ್ಷಣೆ · SOS (1554)',
        safetyAssistTitle: '📞 ಕರಾವಳಿ ತುರ್ತು ಸಹಾಯವಾಣಿ',
        contactGuardText: '🚨 ಭಾರತೀಯ ಕೋಸ್ಟ್ ಗಾರ್ಡ್ (SAR)',
        contactPoliceText: '🌊 ಕರಾವಳಿ ಭದ್ರತಾ ಪೊಲೀಸ್',
        contactRescueText: '🛟 ಸಾಗರ ರಕ್ಷಣಾ ಸಮನ್ವಯ (MRCC)',
        shareLocationBtnText: 'WhatsApp ಮೂಲಕ ಲೈವ್ GPS ಹಂಚಿಕೊಳ್ಳಿ',
        telemetrySectionTitle: '🌊 ಲೈವ್ ಸಾಗರ & ಹವಾಮಾನ ಮಾಹಿತಿ',
        hudWindLabel: 'ಗಾಳಿಯ ವೇಗ',
        hudTempLabel: 'ಸಾಗರ ತಾಪಮಾನ',
        hudWaveLabel: 'ಅಲೆಗಳ ಎತ್ತರ',
        bestTimeTitle: 'ಕಡಲಿಗೆ ಇಳಿಯಲು ಸೂಕ್ತ ಸಮಯ',

        // More Tab
        morePageTitle: '⚙️ ಮೀನುಗಾರರ ಉಪಕರಣಗಳು & ಮಾಹಿತಿ',
        morePageSub: 'ಸಲಹಾ ಪರಿಕರ ಅಥವಾ ಸಮುದಾಯ ಸಾಗರ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
        moreBackBtnText: 'ಎಲ್ಲಾ ಪರಿಕರಗಳಿಗೆ ಹಿಂತಿರುಗಿ (ಮೆನು)',
        fishScanCardTitle: 'ಮೀನು ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶಿ',
        fishScanCardSub: 'ತಳಿಗಳು, ಬಂದರು ದರ & ಋತುಮಾನದ ವಿವರ',
        videosCardTitle: 'ಮೀನು ಕಲಿಯೋಣ (FishReels)',
        videosCardSub: '15–45 ಸೆಕೆಂಡುಗಳ ಕಿರು ಶೈಕ್ಷಣಿಕ ಮೀನು & ಕಡಲ ವೀಡಿಯೊಗಳು (Shorts)',
        videosPageTitle: '🎬 ಮೀನು ಕಲಿಯೋಣ (FishReels)',
        videosPageSub: '15–45 ಸೆ. ಮೊಬೈಲ್ ಲಂಬ ಶಾರ್ಟ್ಸ್ · ಕನ್ನಡಕ್ಕೆ ಮೊದಲ ಆದ್ಯತೆ ⭐',
        videosBadge: '🎬 ಮೀನು ಕಲಿಯೋಣ',
        predictionCardTitle: 'ಋತುಮಾನ ಮಾರ್ಗದರ್ಶಿ',
        predictionCardSub: 'ಕರಾವಳಿ ಮೀನು ಲಭ್ಯತೆ ಸೂಚ್ಯಂಕ',
        fuelCardTitle: 'ಇಂಧನ ಲೆಕ್ಕಾಚಾರ',
        fuelCardSub: 'ಪ್ರಯಾಣದ ಡೀಸೆಲ್ ಬಳಕೆ ಮತ್ತು ವೆಚ್ಚ',
        schemeCardTitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
        schemeCardSub: 'PMMSY ಸಬ್ಸಿಡಿ & ವಿಮೆ ಯೋಜನೆಗಳು',
        dashboardCardTitle: 'ಪ್ರಯಾಣದ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        dashboardCardSub: 'ಸುರಕ್ಷತಾ ನಿರ್ಧಾರಗಳ ಲಾಗ್‌ಬುಕ್',
        historyCardTitle: 'ಸಲಹೆಗಳ ಇತಿಹಾಸ',
        historyCardSub: 'ಹಿಂದಿನ ದಾಖಲಾದ ಪ್ರವಾಸಗಳು',
        exportCardTitle: 'ವರದಿ ಡೌನ್‌ಲೋಡ್',
        exportCardSub: 'ಪ್ರಯಾಣ ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
        catchLogCardTitle: 'ಮೀನು ಬೇಟೆ ದಾಖಲೆ',
        catchLogCardSub: 'ಹಿಡಿದ ಮೀನಿನ ತೂಕ & ಆದಾಯ ದಾಖಲಿಸಿ',

        // Bottom Navigation
        tabHomeLabel: 'ಮುಖಪುಟ',
        tabVoiceLabel: 'ಧ್ವನಿ',
        tabMarketLabel: 'ಮಾರುಕಟ್ಟೆ',
        tabSafetyLabel: 'ಸುರಕ್ಷತೆ',
        tabMoreLabel: 'ಇನ್ನಷ್ಟು',
        footerTagline: '"ಟೈಪ್ ಮಾಡುವುದಕ್ಕಿಂತ ಮಾತನಾಡುವುದೇ ಸುಲಭ" · ಕರಾವಳಿ Fishermen-AI 2.0',

        // Modals
        sosModalTitle: 'ಕರಾವಳಿ ತುರ್ತು ರಕ್ಷಣಾ ಸೇವೆ (SOS)',
        sosModalSub: 'ರಕ್ಷಣಾ ಆಪರೇಟರ್‌ಗೆ ನಿಮ್ಮ ಜಿಪಿಎಸ್ ಸ್ಥಾನ ಓದಿ ತಿಳಿಸಿ',
        sosGpsHeader: '📍 ಪ್ರಸ್ತುತ ಸಮುದ್ರ ಜಿಪಿಎಸ್ ಸ್ಥಾನ',
        copyCoordsBtn: '📋 ಜಿಪಿಎಸ್ ಸ್ಥಾನ ನಕಲಿಸಿ',
        sosCallGuardBtnText: 'ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ರಕ್ಷಣೆ (1554)',
        sosCallPoliceBtnText: 'ಕರಾವಳಿ ಪೊಲೀಸ್ (1093)',
        sosCallAmbulanceBtnText: 'ಆಂಬ್ಯುಲೆನ್ಸ್ ಸೇವೆ (108)',
        sosBeaconBtnText: 'ಜಿಪಿಎಸ್ ತುರ್ತು ಸಂದೇಶ (WhatsApp/SMS)',
        sosModalDisclaimer: 'ಸಲಹಾ ಪರಿಕರ: ನೇರ ತುರ್ತು ಡಯಲ್ ಲಿಂಕ್. ಸಮುದ್ರದ VHF Channel 16 ಅಥವಾ EPIRB ಗೆ ಬದಲಿಯಲ್ಲ.',
        confirmCallTitle: 'ತುರ್ತು ಕರೆ ದೃಢೀಕರಿಸಿ',
        confirmCallMsg: 'ನೀವು ತುರ್ತು ರಕ್ಷಣಾ ಸೇವೆಗೆ ಕರೆ ಮಾಡಲು ಹೊರಟಿದ್ದೀರಿ. ಮುಂದುವರಿಯುವುದೇ?',
        confirmCallCancelBtn: 'ರದ್ದುಮಾಡಿ',
        confirmCallLink: 'ಹೌದು, ಕರೆ ಮಾಡಿ',
        themeLight: 'ಬೆಳಕು',
        themeDark: 'ಕತ್ತಲೆ',

        // PWA & Home Screen
        pwaBannerTitle: 'ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಸೇರಿಸಿ',
        pwaBannerSub: 'ಆಫ್‌ಲೈನ್ ಬಳಕೆಗಾಗಿ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
        pwaInstallBtnText: 'ಇನ್‌ಸ್ಟಾಲ್',
        installCardTitle: 'ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಸೇರಿಸಿ',
        installCardSub: 'ಬ್ರೌಸರ್ ರಹಿತ ಆ್ಯಪ್ ಸ್ಥಾಪಿಸಿ',
        iosModalTitle: 'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
        iosModalSub: 'ಸಫಾರಿ (Safari) ಅಥವಾ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಕೆಳಗಿನ ಹಂತಗಳನ್ನು ಅನುಸರಿಸಿ:',
        iosStep1: 'ಬ್ರೌಸರ್ ಮೆನು ಅಥವಾ ಹಂಚಿಕೆ ಬಟನ್ Share (⎋) ಟ್ಯಾಪ್ ಮಾಡಿ.',
        iosStep2: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ \'Add to Home Screen\' (➕) ಆಯ್ಕೆಮಾಡಿ.',
        iosStep3: 'ಮೇಲ್ಭಾಗದಲ್ಲಿ \'Add\' ಒತ್ತಿ. ಬ್ರೌಸರ್ ಬಾರ್ ಇಲ್ಲದೆ ಆ್ಯಪ್ ತೆರೆಯುತ್ತದೆ!',
        iosModalOkBtn: 'ಅರ್ಥವಾಯಿತು (Got it)',

        // Voice Guidance Localizations
        voiceGuideHeaderOn: 'ಧ್ವನಿ ON',
        voiceGuideHeaderOff: 'ಧ್ವನಿ OFF',
        homeVoiceGuideBtnText: 'ಸರಳ ಧ್ವನಿ ಸೂಚನೆ ಕೇಳಿ (ಕನ್ನಡ)',
        voiceVoiceGuideBtnText: 'ಬಳಸುವ ವಿಧಾನ ಕೇಳಿ (ಕನ್ನಡ)',
        marketVoiceGuideBtnText: 'ದರಗಳ ಮಾಹಿತಿ ಕೇಳಿ (ಕನ್ನಡ)',
        safetyVoiceGuideBtnText: 'ಸುರಕ್ಷತಾ ಸೂಚನೆ ಕೇಳಿ (ಕನ್ನಡ)',
        moreVoiceGuideBtnText: 'ಪರಿಕರಗಳ ಮಾಹಿತಿ ಕೇಳಿ (ಕನ್ನಡ)',
        moreAudioGuideText: 'ಕೇಳಿ',
        sosAudioGuideText: 'ತುರ್ತು ಸೂಚನೆ ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ (ಕನ್ನಡ)',
        voiceGuideHudTitle: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ',
        voiceGuideStopPillText: 'ನಿಲ್ಲಿಸಿ'
    },
    'en': {
        marineTag: '🌊 MARINE WEATHER ADVISORY',
        appSubtitle: 'Marine Weather & Safety Co-Pilot · Karavali Coast',
        heroBadge: '🎙️ Tap mic and ask in your language',
        heroTitle: 'Should I go fishing tomorrow?',
        heroSub: 'Marine weather advisory & harbor market outlook',
        micText: 'Tap to Speak',
        micSub: 'Ask in your language (Kannada / English)',
        typeBtnText: 'Type your query',
        textInputPlaceholder: 'Should I go fishing? Type query...',
        textSubmitBtn: 'Ask',
        sosHomeTitle: 'SOS',
        sosHomeSub: 'Coast Guard Distress (1554)',
        weatherLinkTitle: 'View Live Marine Telemetry',
        weatherLinkSub: 'Wind speed, wave height, tides & solunar times ➔',
        replayText: 'Listen Again in Audio',

        // Homepage Conditions & Quick Actions
        homeLocationLabel: 'Selected Harbor · ಆಯ್ಕೆಮಾಡಿದ ಬಂದರು:',
        homeLocationChangeText: 'Change / ಬದಲಾಯಿಸಿ',
        homeVoiceHeroTitle: 'How can I help you? / ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
        homeVoiceHeroSub: 'Tap to speak in Kannada or English · ಮಾತನಾಡಿ ಕೇಳಿ',
        homeHeroMicLabel: 'TAP TO SPEAK',
        homeShortcutsHeaderTitle: '⚡ Quick Access · ತ್ವರಿತ ಸೇವೆಗಳು',
        homeMarketTitle: 'Fish Market / ಮೀನು ಮಾರುಕಟ್ಟೆ',
        homeMarketSub: "Today's live harbor auction & benchmark catch rates",
        homeFuelTitle: 'Fuel Calculator / ಇಂಧನ ಲೆಕ್ಕಾಚಾರ',
        homeFuelSub: 'Estimate diesel consumption, engine burn & trip costs',
        homeBrandSubtitle: 'Your fishing companion',
        condCardTitle: "🌦️ Today's Fishing Conditions",
        condLiveStatus: 'LIVE',
        recLabelTitle: 'FISHING RECOMMENDATION',
        homeReplayBtnText: 'Listen',
        condWeatherLabel: 'Weather:',
        condWindLabel: 'Wind:',
        condSeaLabel: 'Sea conditions:',
        condRefreshText: 'Refresh',
        homeVoiceFeatureTitle: 'Ask Fishermen-AI',
        homeVoiceFeatureSub: 'Ask questions using voice',
        homeSeaFeatureTitle: 'Sea & Weather',
        homeSeaFeatureSub: 'Check fishing conditions',
        homeMarketFeatureTitle: 'Fish Market',
        homeMarketFeatureSub: 'Check market prices',
        homeFuelFeatureTitle: 'Fuel Calculator',
        homeFuelFeatureSub: 'Estimate fuel requirements',
        homeEmergencySosText: 'Coast Guard Distress Hotline: 1554',
        homeTypeToggleText: 'Type query',
        homeStopVoiceText: 'Stop',

        // Voice Tab & Global Assistant
        voicePageTitle: '🎤 Karavali Voice Assistant',
        voicePageSub: 'Speak directly in Kannada or English.',
        voiceReadyStatus: 'Ready for voice inquiry',
        voicePromptsTitle: '💡 POPULAR ADVISORY PROMPTS',
        voiceHubHeroTitle: 'One Global Voice Assistant',
        voiceHubDesc: 'You can ask Fishermen-AI from ANY screen using the persistent floating 🎙️ button on the bottom right.',
        voiceHubLaunchText: 'Open Voice Assistant (ಧ್ವನಿ ಸಹಾಯಕ)',
        vhFeat1: 'Kannada & English voice recognition & speech',
        vhFeat2: 'Context-aware for Weather, Market, Fuel, and Safety',
        vhFeat3: 'Accessible across all screens without leaving your page',
        promptItem1: '🐟 "Should I go fishing tomorrow?"',
        promptItem2: '💰 "What is mackerel fish rate today?"',
        promptItem3: '🌊 "How are wind and wave conditions?"',
        promptItem4: '⛽ "How much diesel for 100 HP engine?"',
        promptItem5: '🚨 "What is Coast Guard rescue hotline?"',
        promptAskLabel: 'Ask ➔',
        gvaModalTitle: 'Fishermen-AI Voice Assistant',
        gvaPromptsTitle: '💡 Suggested Questions for this Screen',
        gvaReplayText: 'Replay',
        gvaStopSpeechText: 'Stop',
        gvaTranscriptLabel: '🗣️ You said / ನಿಮ್ಮ ಪ್ರಶ್ನೆ:',
        gvaResponseTitle: '🤖 Assistant Advisory',

        // Market Tab
        marketPageTitle: '💰 Harbor Catch Rates',
        marketPageBadge: 'KARAVALI HARBORS',
        marketPageSub: 'Verified wholesale harbor benchmarks & selling decision guide.',
        marketSelectLabel: 'Select Local Harbor:',
        marketSearchPlaceholder: 'Search fish by name (Mackerel, Pomfret, Boothai)...',
        mthFish: 'Fish (Species)',
        mthPrice: 'Market price (/kg)',
        mthUpdated: 'Updated & Source',
        marketAdvisoryTitle: 'Fishermen Selling Decision Advisory:',
        marketAdvisoryText: 'Wholesale rates are harbor auction averages per kilogram. Actual dockside prices depend on catch freshness (Grade A / B), icing condition, and daily fleet supply volume. Always verify final rates with local harbor auctioneer before offloading catch.',

        // Safety Tab
        safetyPageTitle: '🆘 Emergency & Safety HUD',
        safetySosText: 'MARITIME DISTRESS & SOS (1554)',
        safetyAssistTitle: '📞 Rapid Coastal Assistance',
        contactGuardText: '🚨 Indian Coast Guard (SAR)',
        contactPoliceText: '🌊 Coastal Marine Police',
        contactRescueText: '🛟 Marine Rescue Coordination',
        shareLocationBtnText: 'Share My GPS Location via WhatsApp',
        telemetrySectionTitle: '🌊 Live Marine Telemetry & Swell',
        hudWindLabel: 'Wind Speed',
        hudTempLabel: 'Sea Temp',
        hudWaveLabel: 'Wave Swell',
        bestTimeTitle: 'Best Fishing Window',

        // More Tab
        morePageTitle: '⚙️ Fishermen Feature Hub',
        morePageSub: 'Select an advisory tool or community marine service:',
        moreBackBtnText: 'Back to Tools (ಮೆನು)',
        fishScanCardTitle: 'Fish Species Guide (ಮೀನು ಪರಿಚಯ)',
        fishScanCardSub: 'Photo & catalog reference: species, port rates & season',
        videosCardTitle: 'FishReels · ಮೀನು ಕಲಿಯೋಣ',
        videosCardSub: '15–45s short educational fish & marine clips (Shorts)',
        videosPageTitle: '🎬 FishReels',
        videosPageSub: '15–45s Mobile vertical educational Shorts · Kannada-First ⭐',
        videosBadge: '🎬 FishReels',
        predictionCardTitle: 'Seasonal Guide',
        predictionCardSub: 'Karavali landing trends',
        fuelCardTitle: 'Fuel Calculator',
        fuelCardSub: 'Voyage cost & net profit',
        schemeCardTitle: 'Govt Schemes',
        schemeCardSub: 'PMMSY Subsidies & Loans',
        dashboardCardTitle: 'Voyage Stats',
        dashboardCardSub: 'Safety decision log',
        historyCardTitle: 'Advisory History',
        historyCardSub: 'Past trips logged',
        exportCardTitle: 'Export Voyage',
        exportCardSub: 'Download trip report',
        catchLogCardTitle: 'Catch Logger',
        catchLogCardSub: 'Log kg & earnings',

        // Navigation Dock
        tabHomeLabel: 'Home',
        tabVoiceLabel: 'Voice',
        tabMarketLabel: 'Market',
        tabSafetyLabel: 'Safety',
        tabMoreLabel: 'More',
        footerTagline: '"Asking is easier than typing" · Karavali Fishermen AI 2.0',

        // Modals
        sosModalTitle: 'COASTAL DISTRESS & RESCUE',
        sosModalSub: 'Read coordinates out loud to maritime rescue operator',
        sosGpsHeader: '📍 Live Sea Coordinates',
        copyCoordsBtn: '📋 Copy GPS Coordinates',
        sosCallGuardBtnText: 'COAST GUARD RESCUE (1554)',
        sosCallPoliceBtnText: 'Coastal Marine Police (1093)',
        sosCallAmbulanceBtnText: '🚑 Medical Ambulance (108)',
        sosBeaconBtnText: 'Send GPS Distress Beacon (WhatsApp / SMS)',
        sosModalDisclaimer: 'Advisory tool: Direct dial link. Does not replace marine VHF Channel 16 or EPIRB beacons.',
        confirmCallTitle: 'Confirm Emergency Call',
        confirmCallMsg: 'You are about to dial emergency assistance. Please confirm to proceed.',
        confirmCallCancelBtn: 'Cancel',
        confirmCallLink: 'Yes, Call Now',
        themeLight: 'Light',
        themeDark: 'Dark',

        // PWA & Home Screen
        pwaBannerTitle: 'Add to Home Screen',
        pwaBannerSub: 'Install App for offline use',
        pwaInstallBtnText: 'Install',
        installCardTitle: 'Add to Home Screen',
        installCardSub: 'Install standalone app',
        iosModalTitle: 'Install App on Device',
        iosModalSub: 'Follow these steps in Safari or your browser:',
        iosStep1: 'Tap the browser Share button (⎋) or menu.',
        iosStep2: 'Scroll down and select \'Add to Home Screen\' (➕).',
        iosStep3: 'Tap \'Add\' in the top corner to launch without browser UI.',
        iosModalOkBtn: 'Got it',

        // Voice Guidance Localizations
        voiceGuideHeaderOn: 'Voice ON',
        voiceGuideHeaderOff: 'Voice OFF',
        homeVoiceGuideBtnText: 'Listen to Simple Instructions',
        voiceVoiceGuideBtnText: 'Listen to Voice Instructions',
        marketVoiceGuideBtnText: 'Listen to Prices (Audio)',
        safetyVoiceGuideBtnText: 'Listen to Safety Instructions',
        moreVoiceGuideBtnText: 'Listen to Tools Overview',
        moreAudioGuideText: 'Listen',
        sosAudioGuideText: 'Listen to Emergency Guidance',
        voiceGuideHudTitle: 'Voice Guidance',
        voiceGuideStopPillText: 'Stop'
    }
};

function applyLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
    });

    if (recognition) {
        recognition.lang = (lang === 'en') ? 'en-US' : 'kn-IN';
    }

    const t = translations[lang] || translations.kn;

    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.textContent = val;
    };

    setTxt('marineTag', t.marineTag);
    setTxt('appSubtitle', t.appSubtitle);
    setTxt('heroPromptBadge', t.heroBadge);
    setTxt('heroPromptTitle', t.heroTitle);
    setTxt('heroPromptSub', t.heroSub);
    setTxt('micText', t.micText);
    setTxt('micSub', t.micSub);
    setTxt('micText2', t.micText);
    setTxt('typeBtnText', t.typeBtnText);
    setTxt('textSubmitBtn', t.textSubmitBtn);
    setTxt('sosHomeTitle', t.sosHomeTitle);
    setTxt('sosHomeSub', t.sosHomeSub);
    setTxt('weatherLinkTitle', t.weatherLinkTitle);
    setTxt('weatherLinkSub', t.weatherLinkSub);
    setTxt('replayBtnText', t.replayText);

    // Homepage Localizations
    setTxt('homeLocationLabel', t.homeLocationLabel);
    setTxt('homeLocationChangeText', t.homeLocationChangeText);
    setTxt('homeVoiceHeroTitle', t.homeVoiceHeroTitle);
    setTxt('homeVoiceHeroSub', t.homeVoiceHeroSub);
    setTxt('homeHeroMicLabel', t.homeHeroMicLabel);
    setTxt('homeShortcutsHeaderTitle', t.homeShortcutsHeaderTitle);
    setTxt('homeMarketTitle', t.homeMarketTitle);
    setTxt('homeMarketSub', t.homeMarketSub);
    setTxt('homeFuelTitle', t.homeFuelTitle);
    setTxt('homeFuelSub', t.homeFuelSub);
    setTxt('homeBrandSubtitle', t.homeBrandSubtitle);
    setTxt('condCardTitle', t.condCardTitle);
    setTxt('condLiveStatus', t.condLiveStatus);
    setTxt('recLabelTitle', t.recLabelTitle);
    setTxt('homeReplayBtnText', t.homeReplayBtnText);
    setTxt('condWeatherLabel', t.condWeatherLabel);
    setTxt('condWindLabel', t.condWindLabel);
    setTxt('condSeaLabel', t.condSeaLabel);
    setTxt('condRefreshText', t.condRefreshText);
    setTxt('homeVoiceFeatureTitle', t.homeVoiceFeatureTitle);
    setTxt('homeVoiceFeatureSub', t.homeVoiceFeatureSub);
    setTxt('homeSeaFeatureTitle', t.homeSeaFeatureTitle);
    setTxt('homeSeaFeatureSub', t.homeSeaFeatureSub);
    setTxt('homeMarketFeatureTitle', t.homeMarketFeatureTitle);
    setTxt('homeMarketFeatureSub', t.homeMarketFeatureSub);
    setTxt('homeFuelFeatureTitle', t.homeFuelFeatureTitle);
    setTxt('homeFuelFeatureSub', t.homeFuelFeatureSub);
    setTxt('homeEmergencySosText', t.homeEmergencySosText);
    setTxt('homeTypeToggleText', t.homeTypeToggleText);
    setTxt('homeStopVoiceText', t.homeStopVoiceText);
    if (typeof updateHomeLocationUI === 'function') updateHomeLocationUI();

    const homeInput = document.getElementById('homeTextQueryInput');
    if (homeInput) homeInput.placeholder = (lang === 'kn') ? 'ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ: ಮೀನು ಬೆಲೆ? ಗಾಳಿ?...' : 'Type question: Fish rate? Wind?...';

    const homeLiveTranscript = document.getElementById('homeLiveTranscript');
    if (homeLiveTranscript && (!homeLiveTranscript.dataset.userSpoke || homeLiveTranscript.dataset.userSpoke === 'false')) {
        homeLiveTranscript.textContent = (lang === 'kn')
            ? '"ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ? / Should I go fishing?"'
            : '"Should I go fishing tomorrow? / ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?"';
    }

    const gvaTranscript = document.getElementById('gvaTranscriptText');
    if (gvaTranscript && (!gvaTranscript.dataset.userSpoke || gvaTranscript.dataset.userSpoke === 'false')) {
        gvaTranscript.textContent = currentLang === 'kn' ? '"ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ? / Should I go fishing?"' : '"Should I go fishing tomorrow? / ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?"';
    }

    const input = document.getElementById('textInput');
    if (input) input.placeholder = t.textInputPlaceholder;

    // Voice Hub & Global Assistant
    setTxt('voicePageTitle', t.voicePageTitle);
    setTxt('voicePageSub', t.voicePageSub);
    setTxt('voicePromptsTitle', t.voicePromptsTitle);
    setTxt('voiceHubHeroTitle', t.voiceHubHeroTitle);
    setTxt('voiceHubDesc', t.voiceHubDesc);
    setTxt('voiceHubLaunchText', t.voiceHubLaunchText);
    setTxt('vhFeat1', t.vhFeat1);
    setTxt('vhFeat2', t.vhFeat2);
    setTxt('vhFeat3', t.vhFeat3);
    setTxt('promptItem1', t.promptItem1);
    setTxt('promptItem2', t.promptItem2);
    setTxt('promptItem3', t.promptItem3);
    setTxt('promptItem4', t.promptItem4);
    setTxt('promptItem5', t.promptItem5);
    document.querySelectorAll('.prompt-ask-label').forEach(el => el.textContent = t.promptAskLabel);

    // Global Assistant Modal Elements
    setTxt('gvaModalTitle', t.gvaModalTitle);
    setTxt('gvaPromptsTitle', t.gvaPromptsTitle);
    setTxt('gvaReplayText', t.gvaReplayText);
    setTxt('gvaStopSpeechText', t.gvaStopSpeechText);
    setTxt('gvaTranscriptLabel', t.gvaTranscriptLabel);
    setTxt('gvaResponseTitle', t.gvaResponseTitle);
    if (typeof updateAssistantContextUI === 'function') {
        updateAssistantContextUI();
    }

    // Market Tab
    setTxt('marketPageTitle', t.marketPageTitle);
    setTxt('marketPageBadge', t.marketPageBadge);
    setTxt('marketPageSub', t.marketPageSub);
    setTxt('marketSelectLabel', t.marketSelectLabel);
    setTxt('mthFish', t.mthFish);
    setTxt('mthPrice', t.mthPrice);
    setTxt('mthUpdated', t.mthUpdated);
    setTxt('marketAdvisoryTitle', t.marketAdvisoryTitle);
    setTxt('marketAdvisoryText', t.marketAdvisoryText);
    const marketSearchInput = document.getElementById('marketSearchInput');
    if (marketSearchInput && t.marketSearchPlaceholder) {
        marketSearchInput.placeholder = t.marketSearchPlaceholder;
    }
    if (currentMarketPrices && currentMarketPrices.length > 0) {
        renderMarketMeta(currentMarketData ? currentMarketData.market : null);
        filterMarketPrices();
    }

    // Safety Tab
    setTxt('safetyPageTitle', t.safetyPageTitle);
    setTxt('safetySosText', t.safetySosText);
    setTxt('safetyAssistTitle', t.safetyAssistTitle);
    setTxt('contactGuardText', t.contactGuardText);
    setTxt('contactPoliceText', t.contactPoliceText);
    setTxt('contactRescueText', t.contactRescueText);
    setTxt('shareLocationBtnText', t.shareLocationBtnText);
    setTxt('telemetrySectionTitle', t.telemetrySectionTitle);
    setTxt('hudWindLabel', t.hudWindLabel);
    setTxt('hudTempLabel', t.hudTempLabel);
    setTxt('hudWaveLabel', t.hudWaveLabel);
    setTxt('bestTimeTitle', t.bestTimeTitle);

    // More Tab
    setTxt('morePageTitle', t.morePageTitle);
    setTxt('morePageSub', t.morePageSub);
    setTxt('moreBackBtnText', t.moreBackBtnText);
    setTxt('fishScanCardTitle', t.fishScanCardTitle);
    setTxt('fishScanCardSub', t.fishScanCardSub);
    setTxt('videosCardTitle', t.videosCardTitle);
    setTxt('videosCardSub', t.videosCardSub);
    setTxt('predictionCardTitle', t.predictionCardTitle);
    setTxt('predictionCardSub', t.predictionCardSub);
    setTxt('fuelCardTitle', t.fuelCardTitle);
    setTxt('fuelCardSub', t.fuelCardSub);
    setTxt('schemeCardTitle', t.schemeCardTitle);
    setTxt('schemeCardSub', t.schemeCardSub);
    setTxt('dashboardCardTitle', t.dashboardCardTitle);
    setTxt('dashboardCardSub', t.dashboardCardSub);
    setTxt('historyCardTitle', t.historyCardTitle);
    setTxt('historyCardSub', t.historyCardSub);
    setTxt('exportCardTitle', t.exportCardTitle);
    setTxt('exportCardSub', t.exportCardSub);
    setTxt('catchLogCardTitle', t.catchLogCardTitle);
    setTxt('catchLogCardSub', t.catchLogCardSub);

    // Bottom Navigation
    setTxt('tabHomeLabel', t.tabHomeLabel);
    setTxt('tabVoiceLabel', t.tabVoiceLabel);
    setTxt('tabMarketLabel', t.tabMarketLabel);
    setTxt('tabSafetyLabel', t.tabSafetyLabel);
    setTxt('tabMoreLabel', t.tabMoreLabel);
    setTxt('footerTagline', t.footerTagline);

    // Modals
    setTxt('sosModalTitle', t.sosModalTitle);
    setTxt('sosModalSub', t.sosModalSub);
    setTxt('sosGpsHeader', t.sosGpsHeader);
    setTxt('copyCoordsBtn', t.copyCoordsBtn);
    setTxt('sosCallGuardBtnText', t.sosCallGuardBtnText);
    setTxt('sosCallPoliceBtnText', t.sosCallPoliceBtnText);
    setTxt('sosCallAmbulanceBtnText', t.sosCallAmbulanceBtnText);
    setTxt('sosBeaconBtnText', t.sosBeaconBtnText);
    setTxt('sosModalDisclaimer', t.sosModalDisclaimer);
    setTxt('confirmCallTitle', t.confirmCallTitle);
    setTxt('confirmCallMsg', t.confirmCallMsg);
    setTxt('confirmCallCancelBtn', t.confirmCallCancelBtn);
    setTxt('confirmCallLink', t.confirmCallLink);

    // PWA & Home Screen Localizations
    setTxt('pwaBannerTitle', t.pwaBannerTitle);
    setTxt('pwaBannerSub', t.pwaBannerSub);
    setTxt('pwaInstallBtnText', t.pwaInstallBtnText);
    setTxt('installCardTitle', t.installCardTitle);
    setTxt('installCardSub', t.installCardSub);
    setTxt('iosModalTitle', t.iosModalTitle);
    setTxt('iosModalSub', t.iosModalSub);
    setTxt('iosStep1', t.iosStep1);
    setTxt('iosStep2', t.iosStep2);
    setTxt('iosStep3', t.iosStep3);
    setTxt('iosModalOkBtn', t.iosModalOkBtn);

    // Update dynamic cards if currently displayed
    if (currentDecision) {
        showResult(currentDecision);
    }
    if (currentMoreFeature) {
        renderCurrentMoreFeature();
    }
    const marketPage = document.getElementById('page-market');
    if (marketPage && marketPage.classList.contains('active')) {
        loadMarket();
    }
    // Update Homepage conditions if loaded
    if (lastConditionsData) {
        renderConditionsData(lastConditionsData, lastConditionsDecision, lastConditionsTimestamp, lastConditionsIsCached);
    }

    // Update Voice Guidance UI elements
    setTxt('homeVoiceGuideBtnText', t.homeVoiceGuideBtnText);
    setTxt('voiceVoiceGuideBtnText', t.voiceVoiceGuideBtnText);
    setTxt('marketVoiceGuideBtnText', t.marketVoiceGuideBtnText);
    setTxt('safetyVoiceGuideBtnText', t.safetyVoiceGuideBtnText);
    setTxt('moreVoiceGuideBtnText', t.moreVoiceGuideBtnText);
    setTxt('moreAudioGuideText', t.moreAudioGuideText);
    setTxt('sosAudioGuideText', t.sosAudioGuideText);
    setTxt('voiceGuideStopPillText', t.voiceGuideStopPillText);
    setTxt('voiceGuideHudTitle', t.voiceGuideHudTitle);
    if (typeof updateVoiceGuideToggleUI === 'function') {
        updateVoiceGuideToggleUI();
    }

    updateThemeToggleUI();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        playTapSound();
        applyLanguage(this.dataset.lang);
    });
});
