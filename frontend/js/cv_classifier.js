// ============================================
// 🧠 ON-DEVICE COMPUTER VISION FISH CLASSIFIER
// MobileNetV3-Small Fine-Tuned for 10 Arabian Sea Species
// Runs 100% Offline in Browser via ONNX Runtime Web (Wasm / WebGL)
// ============================================

let fishOnnxSession = null;
let fishClassesMetadata = null;
let isClassifierLoading = false;

// Fallback embedded metadata if offline before JSON cache loads
const FALLBACK_FISH_CLASSES = [
    {
        id: 0,
        key: "mackerel",
        name: "Indian Mackerel",
        scientific_name: "Rastrelliger kanagurta",
        kannada: "ಬಂಗಡೆ (Bangude)",
        tulu: "Bangude",
        price: 220,
        min_price: 180,
        max_price: 260,
        season: "Aug - Dec",
        habitat: "Coastal pelagic, in schools",
        freshness_guide: "Bright iridescent golden-green sheen along the back; gills clear red without mucus; firm belly."
    },
    {
        id: 1,
        key: "sardine",
        name: "Oil Sardine",
        scientific_name: "Sardinella longiceps",
        kannada: "ಬೂತಾಯಿ (Boothai)",
        tulu: "Boothai",
        price: 150,
        min_price: 120,
        max_price: 180,
        season: "Sep - Jan",
        habitat: "Inshore pelagic surface waters",
        freshness_guide: "Glistening silver scales firmly attached; golden spot on post-opercle; crystal clear black pupils."
    },
    {
        id: 2,
        key: "pomfret",
        name: "Silver Pomfret",
        scientific_name: "Pampus argenteus",
        kannada: "ಮಾಂಜಿ / ರಾವ (Manji)",
        tulu: "Manji",
        price: 450,
        min_price: 380,
        max_price: 550,
        season: "Oct - Feb",
        habitat: "Coastal waters over muddy bottom",
        freshness_guide: "Pure metallic silver body; intact delicate skin without black bruises; stiff tail fin."
    },
    {
        id: 3,
        key: "seer",
        name: "Kingfish / Seer Fish",
        scientific_name: "Scomberomorus commerson",
        kannada: "ಅಂಜಲ್ / ಸೀರ್ (Anjal)",
        tulu: "Anjal / Surmai",
        price: 580,
        min_price: 500,
        max_price: 750,
        season: "Sep - Mar",
        habitat: "Deep coastal shelf waters",
        freshness_guide: "Prominent dark wavy vertical bars along silvery flanks; flesh firm and elastic to thumb pressure."
    },
    {
        id: 4,
        key: "tuna",
        name: "Yellowfin Tuna",
        scientific_name: "Thunnus albacares",
        kannada: "ಗೆದ್ದಾರ್ / ತುನಾ (Geddare)",
        tulu: "Geddare",
        price: 340,
        min_price: 280,
        max_price: 420,
        season: "Year-round",
        habitat: "Pelagic oceanic & shelf waters",
        freshness_guide: "Vibrant yellow finlets; dark metallic blue dorsal; belly shiny without brown discoloration."
    },
    {
        id: 5,
        key: "prawn",
        name: "Tiger Prawn",
        scientific_name: "Penaeus monodon",
        kannada: "ಸೀಗಡಿ (Sigadi)",
        tulu: "Ett",
        price: 420,
        min_price: 350,
        max_price: 520,
        season: "Aug - Nov",
        habitat: "Sandy & muddy bottom estuaries and coastal sea",
        freshness_guide: "Translucent carapace with crisp cross-bands; head firmly attached to body; no blackening."
    },
    {
        id: 6,
        key: "crab",
        name: "Mud Crab",
        scientific_name: "Scylla serrata",
        kannada: "ಡೆಂಜಿ / ಏಡಿ (Denji)",
        tulu: "Denji",
        price: 280,
        min_price: 220,
        max_price: 360,
        season: "Year-round",
        habitat: "Mangrove swamps, estuarine mud flats & coastal inshore",
        freshness_guide: "Heavy feel relative to size; active chelae movement; clean abdominal flap."
    },
    {
        id: 7,
        key: "squid",
        name: "Indian Squid",
        scientific_name: "Uroteuthis duvaucelii",
        kannada: "ಬೊಂಡಾಸ್ (Bondas)",
        tulu: "Bondas",
        price: 260,
        min_price: 200,
        max_price: 320,
        season: "Sep - Dec",
        habitat: "Coastal neritic waters",
        freshness_guide: "Dense, vibrant purple-red chromatophores on translucent mantle; firm elastic tube."
    },
    {
        id: 8,
        key: "red_snapper",
        name: "Red Snapper",
        scientific_name: "Lutjanus campechanus",
        kannada: "ಚೆಂಬಳ್ಳಿ / ಮುರು (Chemballi)",
        tulu: "Muru / Chemballi",
        price: 380,
        min_price: 320,
        max_price: 460,
        season: "Sep - Apr",
        habitat: "Rocky reefs & shelf drop-offs",
        freshness_guide: "Vivid deep red to pink skin; bright red gills; convex clear eyes with ruby ring."
    },
    {
        id: 9,
        key: "anchovy",
        name: "Indian Anchovy",
        scientific_name: "Stolephorus indicus",
        kannada: "ಬೋಳೆ / ನತ್ತೋಲಿ (Bole)",
        tulu: "Kole / Bole",
        price: 140,
        min_price: 100,
        max_price: 170,
        season: "Sep - Mar",
        habitat: "Inshore coastal schools",
        freshness_guide: "Pristine silver lateral stripe along translucent body; intact bellies; delicate sea-spray scent."
    }
];

/**
 * Initializes the ONNX Runtime Web session and loads the MobileNetV3 model
 */
async function initFishClassifier() {
    if (fishOnnxSession) return fishOnnxSession;
    if (isClassifierLoading) {
        while (isClassifierLoading) {
            await new Promise(r => setTimeout(r, 100));
        }
        return fishOnnxSession;
    }

    isClassifierLoading = true;
    try {
        // Load metadata
        if (!fishClassesMetadata) {
            try {
                const res = await fetch('./models/fish_classes.json');
                if (res.ok) {
                    fishClassesMetadata = await res.json();
                } else {
                    fishClassesMetadata = FALLBACK_FISH_CLASSES;
                }
            } catch (err) {
                console.warn('Using fallback fish metadata:', err);
                fishClassesMetadata = FALLBACK_FISH_CLASSES;
            }
        }

        if (typeof ort === 'undefined') {
            console.warn('ONNX Runtime Web (ort) not detected in global scope.');
            isClassifierLoading = false;
            return null;
        }

        // Configure wasm local paths and single-threaded execution for universal mobile compatibility
        ort.env.wasm.wasmPaths = './libs/';
        ort.env.wasm.numThreads = 1;

        try {
            console.log('🐟 [Fish-CV] Initializing MobileNetV3 ONNX Runtime Web Session...');
            fishOnnxSession = await ort.InferenceSession.create('./models/fish_mobilenet_v3.onnx', {
                executionProviders: ['wasm', 'webgl'],
                graphOptimizationLevel: 'all'
            });
            console.log('✅ [Fish-CV] MobileNetV3 In-Browser Model Loaded Successfully!');
            isClassifierLoading = false;
            return fishOnnxSession;
        } catch (localErr) {
            console.warn('🐟 [Fish-CV] Local wasm provider retry with unthreaded wasm:', localErr);
            ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0-dev.20250206-b333cfc163/dist/';
            fishOnnxSession = await ort.InferenceSession.create('./models/fish_mobilenet_v3.onnx', {
                executionProviders: ['wasm']
            });
            console.log('✅ [Fish-CV] MobileNetV3 Loaded via fallback!');
            isClassifierLoading = false;
            return fishOnnxSession;
        }
    } catch (err) {
        console.error('❌ [Fish-CV] Failed to initialize ONNX model:', err);
        isClassifierLoading = false;
        return null;
    }
}

/**
 * Preprocesses an HTMLImageElement or Canvas to [1, 3, 224, 224] Float32Array (ImageNet stats)
 */
function preprocessImageForMobileNet(imgElement) {
    const targetSize = 224;
    const canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Aspect-ratio preserving center crop & draw
    const imgW = imgElement.naturalWidth || imgElement.width || targetSize;
    const imgH = imgElement.naturalHeight || imgElement.height || targetSize;
    const minDim = Math.min(imgW, imgH);
    const sx = (imgW - minDim) / 2;
    const sy = (imgH - minDim) / 2;

    ctx.drawImage(imgElement, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);
    const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
    const { data } = imageData; // RGBA 224*224*4

    // ImageNet normalization constants
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];

    const float32Data = new Float32Array(1 * 3 * targetSize * targetSize);
    const planeSize = targetSize * targetSize;

    for (let i = 0; i < planeSize; i++) {
        const r = data[i * 4] / 255.0;
        const g = data[i * 4 + 1] / 255.0;
        const b = data[i * 4 + 2] / 255.0;

        float32Data[i] = (r - mean[0]) / std[0];                   // R channel
        float32Data[planeSize + i] = (g - mean[1]) / std[1];       // G channel
        float32Data[planeSize * 2 + i] = (b - mean[2]) / std[2];   // B channel
    }

    return new ort.Tensor('float32', float32Data, [1, 3, targetSize, targetSize]);
}

/**
 * Runs MobileNetV3 inference on an image element and returns classified species with top-3 probabilities
 */
async function classifyFishWithMobileNet(imgElement) {
    const session = await initFishClassifier();
    if (!session) {
        throw new Error('Neural network session could not be initialized.');
    }

    const inputTensor = preprocessImageForMobileNet(imgElement);
    const startTime = performance.now();
    const outputMap = await session.run({ input: inputTensor });
    const latency = Math.round(performance.now() - startTime);

    const probsTensor = outputMap.probabilities || outputMap[Object.keys(outputMap)[0]];
    const rawProbs = Array.from(probsTensor.data);

    // Map probabilities to species metadata
    const classes = fishClassesMetadata || FALLBACK_FISH_CLASSES;
    const ranked = classes.map((fish, idx) => ({
        ...fish,
        probability: rawProbs[idx] || 0.0,
        confidence: Math.round((rawProbs[idx] || 0.0) * 1000) / 10 // e.g. 94.2%
    })).sort((a, b) => b.probability - a.probability);

    return {
        success: true,
        is_neural_model: true,
        model_name: 'MobileNetV3-Small (Arabian Sea Karavali Edition)',
        runtime: 'ONNX Runtime Web (Wasm / WebGL)',
        latency_ms: latency,
        top_match: ranked[0],
        top_3: ranked.slice(0, 3),
        all_predictions: ranked
    };
}
