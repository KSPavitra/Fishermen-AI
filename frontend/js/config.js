// ============================================
// CONFIGURATION & STATIC DATA REFERENCES
// ============================================

// ============================================
// ENVIRONMENT & BACKEND SETUP
// ============================================
const BACKEND_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')
    ? 'http://127.0.0.1:5000'
    : 'https://fishermen-ai-backend.onrender.com';




// Comprehensive Coastal Karnataka Fish Reference for Voice Assistant
const VOICE_FISH_CATALOG = {
    'mackerel': {
        name: 'Indian Mackerel',
        kannada: 'ಬಂಗಡೆ (Bangude)',
        basePrice: 220,
        min: 180,
        max: 260,
        season: 'Aug - Dec',
        keywords: ['mackerel', 'bangude', 'ಬಂಗಡೆ', 'ಬಂಗುಡೆ']
    },
    'sardine': {
        name: 'Oil Sardine',
        kannada: 'ಬೂತಾಯಿ / ಸಾರ್ಡಿನ್ (Boothai)',
        basePrice: 150,
        min: 120,
        max: 180,
        season: 'Sep - Jan',
        keywords: ['sardine', 'boothai', 'ಬೂತಾಯಿ', 'ಸಾರ್ಡಿನ್', 'ಭೂತಾಯಿ']
    },
    'pomfret': {
        name: 'Silver Pomfret',
        kannada: 'ಮಾಂಜಿ / ರಾವ (Manji)',
        basePrice: 450,
        min: 380,
        max: 550,
        season: 'Oct - Feb',
        keywords: ['pomfret', 'manji', 'rava', 'ಮಾಂಜಿ', 'ರಾವ', 'ಬೆಳ್ಳಿ ಮಾಂಜಿ']
    },
    'seer': {
        name: 'Kingfish / Seer Fish',
        kannada: 'ಅಂಜಲ್ / ಸೀರ್ (Anjal)',
        basePrice: 580,
        min: 500,
        max: 750,
        season: 'Sep - Mar',
        keywords: ['seer', 'kingfish', 'anjal', 'surmai', 'ಅಂಜಲ್', 'ಸೀರ್', 'ಸುರ್ಮೆ']
    },
    'tuna': {
        name: 'Yellowfin Tuna',
        kannada: 'ಗೆದ್ದಾರ್ / ತುನಾ (Geddare)',
        basePrice: 340,
        min: 280,
        max: 420,
        season: 'Year-round',
        keywords: ['tuna', 'geddare', 'geddar', 'ತುನಾ', 'ಗೆದ್ದಾರ್', 'ಗೆದ್ದರೆ']
    },
    'prawn': {
        name: 'Tiger Prawn',
        kannada: 'ಸೀಗಡಿ (Sigadi)',
        basePrice: 420,
        min: 350,
        max: 520,
        season: 'Aug - Nov',
        keywords: ['prawn', 'shrimp', 'sigadi', 'ett', 'ಸೀಗಡಿ', 'ಸಿಗಡಿ', 'ಎಟ್']
    },
    'crab': {
        name: 'Mud Crab',
        kannada: 'ಡೆಂಜಿ / ಏಡಿ (Denji)',
        basePrice: 280,
        min: 220,
        max: 360,
        season: 'Year-round',
        keywords: ['crab', 'denji', 'edi', 'ಡೆಂಜಿ', 'ಏಡಿ']
    },
    'squid': {
        name: 'Squid',
        kannada: 'ಬೊಂಡಾಸ್ (Bondas)',
        basePrice: 260,
        min: 200,
        max: 320,
        season: 'Sep - Dec',
        keywords: ['squid', 'bondas', 'ಬೊಂಡಾಸ್', 'ಬೊಂದಾಸ್']
    }
};


// ============================================
// ============================================
// 🎬 FISHREELS · ಮೀನು ಕಲಿಯೋಣ (15–45s EDUCATIONAL SHORTS FEED)
// ============================================
const FISH_VIDEOS = [
    // 1. Identifying Coastal Fish: Indian Mackerel / Bangude (15s)
    {
        id: "I8N1KersEzM",
        lang: "kn",
        titleKn: "🐟 ಬಂಗಡೆ (Indian Mackerel)",
        titleEn: "🐟 Indian Mackerel (Bangude)",
        captionKn: "ಕರಾವಳಿಯ ಪ್ರಮುಖ ಬೆಳ್ಳಿ-ಹೊಳಪಿನ ಮೀನು · ಒಮೆಗಾ-3 ಸಮೃದ್ಧ",
        captionEn: "Key coastal fish with wavy blue-green stripes · Rich in Omega-3",
        author: "Jyothsna Vlogs",
        duration: "0:15",
        seconds: 15,
        topic: "identification"
    },
    // 2. Coastal Landing Seasons: Seer Fish & Pomfret (36s)
    {
        id: "dg5XPW-iFNE",
        lang: "kn",
        titleKn: "🗓️ ಅಂಜಲ್ & ಮಾಂಜಿ ಋತುಮಾನ",
        titleEn: "🗓️ Seer & Pomfret Seasons",
        captionKn: "ಸೆಪ್ಟೆಂಬರ್–ಫೆಬ್ರವರಿ ಗರಿಷ್ಠ ಋತು · ಕರಾವಳಿಯ ಅತ್ಯಧಿಕ ಮೌಲ್ಯದ ಮೀನು",
        captionEn: "Peak landings in Sept–Feb · Highest market value at Karavali ports",
        author: "News Beat Kannada",
        duration: "0:36",
        seconds: 36,
        topic: "seasons"
    },
    // 3. Recognizing Fish by Appearance: Freshness Testing (25s)
    {
        id: "ZiKAKKjWUqA",
        lang: "kn",
        titleKn: "🔍 ತಾಜಾ ಮೀನು ಗುರುತಿಸುವುದು",
        titleEn: "🔍 Spotting Fresh Fish",
        captionKn: "ಪ್ರಕಾಶಮಾನ ಕೆಂಪು ಕಿವಿರು & ಬೆರಳು ಒತ್ತಿದಾಗ ಪುಟಿಯುವ ಗಟ್ಟಿ ಮಾಂಸ",
        captionEn: "Bright red gills & firm flesh that springs back immediately when pressed",
        author: "sagar fish world hoodi",
        duration: "0:25",
        seconds: 25,
        topic: "appearance"
    },
    // 4. Identifying Coastal Species: Marine Fish Varieties (40s)
    {
        id: "WDeUemcRjOU",
        lang: "kn",
        titleKn: "🐟 ಕರಾವಳಿ ಮೀನು ಪ್ರಭೇದಗಳು",
        titleEn: "🐟 Coastal Fish Species",
        captionKn: "ಕರ್ನಾಟಕ ಅರಬ್ಬೀ ಸಮುದ್ರದ 120 ಕ್ಕೂ ಹೆಚ್ಚು ವಾಣಿಜ್ಯ ಸಮುದ್ರ ಮೀನು ತಳಿಗಳು",
        captionEn: "Over 120 commercial marine fish species identified on Karnataka coast",
        author: "Yuvakeerthiraj_Official",
        duration: "0:40",
        seconds: 40,
        topic: "identification"
    },
    // 5. Recognizing Fish by Appearance: Shoreline Sheen (21s)
    {
        id: "C8X0KOgkDB0",
        lang: "kn",
        titleKn: "🌊 ಕಡಲ ತೀರದ ತಾಜಾತನ",
        titleEn: "🌊 Shoreline Freshness",
        captionKn: "ಹಿಡಿದ ತಕ್ಷಣ ಐಸ್ ಬಾಕ್ಸ್‌ನಲ್ಲಿಟ್ಟರೆ 36 ಗಂಟೆಗಳ ಕಾಲ ನೈಸರ್ಗಿಕ ತಾಜಾತನ",
        captionEn: "Chilled on ice immediately after harvest to preserve natural ocean sheen",
        author: "Aashraya vlogs",
        duration: "0:21",
        seconds: 21,
        topic: "appearance"
    },
    // 6. Identifying Coastal Fish: Reef Grouper / Kalluru (14s)
    {
        id: "IDQ2LwvPAA4",
        lang: "kn",
        titleKn: "🪸 ಗ್ರೂಪರ್ / ಕಲ್ಲೂರು ಮೀನು",
        titleEn: "🪸 Reef Grouper (Kalluru)",
        captionKn: "ಹವಳದ ಬಂಡೆಗಳ ದಪ್ಪ ಕಂದು ಚುಕ್ಕೆ ಮೀನು · ಅತ್ಯುತ್ತಮ ಪೋಷಕಾಂಶ",
        captionEn: "Spotted rock-reef fish found near Malpe · High nutrition & demand",
        author: "malpe angular",
        duration: "0:14",
        seconds: 14,
        topic: "identification"
    },
    // 7. Marine Life Facts: Deep-Sea Creatures & Abyss (15s)
    {
        id: "-FkEBIu_tg8",
        lang: "en",
        titleKn: "✨ ಆಳ ಸಮುದ್ರದ ವಿಸ್ಮಯ",
        titleEn: "✨ Deep Sea Wonders",
        captionKn: "ಕತ್ತಲ ಆಳ ಸಾಗರದಲ್ಲಿ ಸ್ವಯಂ ಬೆಳಕು ಬೀರುವ ಅಚ್ಚರಿಯ ಜೀವಿಗಳು",
        captionEn: "Fascinating bioluminescent marine life surviving in deep sea abyss",
        author: "Forrest Galante",
        duration: "0:15",
        seconds: 15,
        topic: "marinelife"
    },
    // 8. Responsible Fishing Practices: Mesh Sizes & Juvenile Stock (20s)
    {
        id: "ADP1j6Uukvw",
        lang: "en",
        titleKn: "🛟 ಸುಸ್ಥಿರ ಮೀನುಗಾರಿಕೆ",
        titleEn: "🛟 Responsible Fishing",
        captionKn: "ದೊಡ್ಡ ಕಣ್ಣಿನ ಬಲೆ ಬಳಸಿ · ಮರಿ ಮೀನು ತಪ್ಪಿಸಿಕೊಂಡು ಸಂತತಿ ಬೆಳೆಯುತ್ತದೆ",
        captionEn: "Larger net mesh size lets juvenile fish escape to preserve future stocks",
        author: "Koshur Kashtkar",
        duration: "0:20",
        seconds: 20,
        topic: "responsible"
    },
    // 9. Recognizing Fish by Appearance: Eye Clarity Test (38s)
    {
        id: "zorz2KwxrPk",
        lang: "en",
        titleKn: "👀 ತಾಜಾ ಮೀನಿನ ಕಣ್ಣು ಪರೀಕ್ಷೆ",
        titleEn: "👀 Checking Fish Eyes",
        captionKn: "ತಾಜಾ ಮೀನಿನ ಕಣ್ಣು ಗಾಜಿನಂತೆ ಸ್ವಚ್ಛ & ಉಬ್ಬಿರುತ್ತದೆ, ಮಬ್ಬಿರಬಾರದು",
        captionEn: "Fresh fish have clear protruding crystal eyes without any cloudiness",
        author: "Made With Lau",
        duration: "0:38",
        seconds: 38,
        topic: "appearance"
    }
];

// Backwards compatibility aliases
FISH_VIDEOS.forEach(v => {
    v.factKn = v.captionKn;
    v.factEn = v.captionEn;
});
