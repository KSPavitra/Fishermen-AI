# 🐟 Fishermen-AI

<div align="center">

![Fishermen-AI Banner](https://img.shields.io/badge/Fishermen--AI-Marine%20Safety%20Co--Pilot-0ea5e9?style=for-the-badge&logo=compass&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live_App-fishermen--ai.vercel.app-00c853?style=flat-square&logo=vercel&logoColor=white)](https://fishermen-ai.vercel.app)
[![Backend API](https://img.shields.io/badge/API_Status-Online-blue?style=flat-square&logo=render&logoColor=white)](https://fishermen-ai-backend.onrender.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Framework-Flask_2.x-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![PWA](https://img.shields.io/badge/PWA-Deep--Sea_Offline-blueviolet?style=flat-square&logo=pwa&logoColor=white)](https://fishermen-ai.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Voice-first AI Maritime Safety Co-Pilot & Harbor Intelligence System for Coastal Karnataka Fishermen (Karavali Coast).**

[Explore Live App](https://fishermen-ai.vercel.app) • [View API](https://fishermen-ai-backend.onrender.com) • [Report Issue](https://github.com/KSPavitra/Fishermen-AI/issues)

</div>

---

## 🌊 The Challenge & Mission

Over **150,000 artisanal and small-craft fishermen** navigate the Arabian Sea along the Karavali Coast of Karnataka (spanning Mangalore, Malpe, Gangolli, Honnavar, and Karwar). Every dawn, they face critical life-or-death decisions:

1. **Information Fragmentation** — Marine forecasts, wind gusts, tidal surges, and PFZ (Potential Fishing Zone) bulletins are scattered across disparate official websites.
2. **Language & Literacy Barriers** — Most official weather and maritime advisories are published in technical English or dense formats, rather than spoken **Kannada**.
3. **Deep-Sea Connectivity Drops** — When operating miles offshore, cellular towers lose line-of-sight, leaving crew vessels cut off from real-time internet telemetry.

**Fishermen-AI solves this with one unified, voice-driven tool:**  
Fishermen simply tap the microphone and ask: *"ನಾಳೆ ಕಡಲಿಗೆ ಹೋಗಬಹುದಾ?"* (Should I go fishing tomorrow?), receiving an immediate, spoken advisory: **🟢 GO (ಹೋಗಿ)**, **🟡 CAUTION (ಎಚ್ಚರಿಕೆ)**, or **🔴 STAY (ಹೋಗಬೇಡಿ)** with deterministic safety protection.

---

## ✨ Key Features

### 🎙️ 1. Bioluminescent Voice Co-Pilot
- **Bilingual Speech Engine**: Full voice interaction powered by the Web Speech API with native **🇮🇳 ಕನ್ನಡ (Kannada)** (`kn-IN`) and **🇬🇧 English** (`en-US`).
- **Hands-Free Audio Readback**: Clear spoken synthesizer responses so illiterate crew members can hear the advisory without reading text.
- **Sonar Waveform HUD**: Visual pulsating wave equalizer and audio chime cues synthesized via Web Audio API.
- **Glassmorphic Quick Query Input**: Subtle glowing pill button (`⌨️ Type your query →`) with keyboard input fallback.

### 🛡️ 2. Deterministic Safety Decision Engine
- Evaluates real-time wind speed, air/sea surface temperature, sky clarity, and harbor profit potential.
- **Mandatory Safety Override**: Severe wind gusts exceeding 35 km/h strictly force a **DON'T GO** advisory, overriding any high catch or market price incentives.

### ⚙️ 3. Feature Hub (Zero-Scroll Instant View)
- ⛽ **Outboard Motor Fuel Calculator** — Computes voyage diesel consumption in liters and net expense based on nautical distance.
- 🐟 **Seasonal Catch Guide** — CMFRI historical marine landing index for coastal Karnataka.
- 🏛️ **Government Subsidies & Schemes** — Curated PMMSY (Pradhan Mantri Matsya Sampada Yojana), NFDB grants, and state welfare schemes with eligibility requirements.
- 📈 **Voyage Analytics & History** — Decision telemetry log tracking safe trip percentages and past advisories.
- 📄 **Voyage Report Export** — Generates and downloads trip log files (`.txt`) with one tap.
- 🐟 **Fish Species Field Guide & Catalog** — Catalog reference covering local harbor rates, landing seasons, and port handling tips.

### 🎣 4. Daily Catch & Revenue Logger
- Real-time logging of daily species, catch weight in kilograms (kg), and gross harbor earnings (₹).
- Local storage persistence allows fishermen to review their financial history even when disconnected.

### 📊 5. Harbor Wholesale Catch Rates
- Live market indices for 8 staple Karavali marine species:
  - Indian Mackerel (*ಬಂಗಡೆ / Bangude*)
  - Oil Sardine (*ಬೂತಾಯಿ / Boothai*)
  - Silver Pomfret (*ಮಾಂಜಿ / Manji*)
  - Kingfish / Seer (*ಅಂಜಲ್ / Anjal*)
  - Yellowfin Tuna (*ಗೆದ್ದಾರ್ / Geddare*)
  - Tiger Prawn (*ಸೀಗಡಿ / Sigadi*)
  - Mud Crab (*ಡೆಂಜಿ / Denji*)
  - Squid (*ಬೊಂಡಾಸ್ / Bondas*)

### 🆘 6. Maritime Distress & Emergency Beacon
- **Live GPS Satellite Fix**: Locks device coordinates with latitude, longitude, and accuracy radius (±meters).
- **Two-Step Verified Emergency Calling**:
  - 🚨 Indian Coast Guard Search & Rescue (`1554`)
  - 🌊 Coastal Marine Police (`1093`)
  - 🚑 Medical Emergency Ambulance (`108`)
- **Distress Beacon Broadcast**: Formatted emergency payload containing GPS coordinates and Google Maps pin dispatchable via WhatsApp or SMS.

### 📴 7. Deep-Sea PWA Offline Support
- Built as a Progressive Web App (PWA) with **Service Worker v5**.
- Employs a **Network-First** strategy for document requests when online, with instant offline cache fallback to ensure safety tools remain functional far out at sea.

### ☀️ / 🌙 8. Daylight & Deep-Sea Night Mode
- **Sunlight Readability**: High-contrast daylight theme designed specifically for outdoor visibility against intense sun glare on open fishing crafts and harbor docks.
- **Deep-Sea Night Mode**: Bioluminescent dark theme tailored for night navigation and pre-dawn voyages without blinding boat operators.
- **One-Tap Header HUD Switcher**: Bilingual toggle button (`☀️ Light / ಬೆಳಕು` ↔ `🌙 Dark / ಕತ್ತಲೆ`) with automatic `localStorage` persistence and OS `prefers-color-scheme` support.

---

## 🏗️ Architecture & Tech Stack

```
Fishermen-AI/
├── backend/
│   ├── app.py                 # Flask REST API & service orchestration
│   ├── decision_engine.py     # Deterministic safety rule engine
│   ├── weather_service.py     # OpenWeather integration & fallback caching
│   ├── weather_cache.json     # Offline telemetry cache fallback
│   ├── requirements.txt       # Python dependencies
│   └── render.yaml            # Render deployment manifest
├── frontend/
│   ├── index.html             # Single Page Application (UI + Logic)
│   ├── sw.js                  # PWA Service Worker (v3 cache & network-first)
│   ├── manifest.json          # Web App Manifest
│   └── icon.svg               # Marine application icon
├── tests/
│   └── test_backend.py        # Automated test suite (health, decision, weather)
└── docs/                      # Documentation and resources
```

### Technology Matrix

| Layer | Technologies |
|---|---|
| **Frontend UI** | HTML5, CSS3 Glassmorphism, Vanilla ES6+ JavaScript |
| **Voice & Audio** | Web Speech API (`SpeechRecognition`, `SpeechSynthesis`), Web Audio API |
| **Offline / PWA** | Service Worker v3, Web App Manifest, Cache API |
| **Backend API** | Python 3.10+, Flask, Flask-CORS |
| **Telemetry** | OpenWeatherMap API, Local Marine Cache Fallback |
| **Deployment** | Frontend on **Vercel**, Backend API on **Render** |

---

## 🔌 API Endpoints

The backend exposes RESTful endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | Service index & active endpoints list |
| `/health` | `GET` | Health status and timestamp check |
| `/weather` | `GET` | Current weather (lat/lon parameters optional) |
| `/forecast` | `GET` | 5-day / 3-hour marine weather forecast |
| `/tide` | `GET` | High and low tide schedule predictions |
| `/calendar` | `GET` | 7-day astronomical lunar & tidal outlook |
| `/market-prices` | `GET` | Wholesale harbor fish market rates |
| `/api/decision` | `POST` / `GET` | Evaluates question query & returns GO/CAUTION/STAY |
| `/fish-prediction` | `GET` | CMFRI seasonal species availability index |
| `/schemes` | `GET` | Government subsidy and welfare scheme database |
| `/identify-fish` | `POST` | Fish catalog lookup by query or uploaded photo |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10 or higher
- Modern web browser (Chrome, Edge, or Safari with microphone permissions enabled)

### 1. Clone the Repository
```bash
git clone https://github.com/KSPavitra/Fishermen-AI.git
cd Fishermen-AI
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Create .env with OpenWeatherMap API key:
# OPENWEATHER_API_KEY=your_key_here

# Run the Flask development server
python app.py
```
The backend API will start at `http://127.0.0.1:5000`.

### 3. Frontend Setup
You can serve the frontend with any static web server:
```bash
# In a new terminal, navigate to frontend:
cd frontend

# Using Python's built-in HTTP server:
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### 4. Running the Test Suite
To verify backend safety logic, endpoints, and deterministic overrides:
```bash
python tests/test_backend.py
```

---

## 📱 Mobile-First Navigation

- 🏠 **Home**: Voice cockpit, instant GO/CAUTION decision, telemetry banner, quick SOS & Market tiles.
- 🎤 **Voice**: Dedicated voice inquiry cockpit with popular prompts.
- 📊 **Market**: Real-time harbor catch rate index (Malpe & Mangalore).
- 🆘 **Safety**: Full emergency dashboard, GPS fix lock, two-step call confirm, distress beacon.
- ⚙️ **More**: Bento hub with zero-scroll instant view switching into all 8 marine tools.

---

## 🤝 Contributing

Contributions to support our coastal fishing community are warmly welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Developer & Acknowledgments

Developed by **[KSPavitra](https://github.com/KSPavitra)**.

*Dedicated to the hardworking fishermen of the Karavali Coast. Safe voyages and bountiful catches!* 🌊🐟