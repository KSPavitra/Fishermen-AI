# 🐟 Fishermen-AI

![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-2.x-black?logo=flask)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Deployed](https://img.shields.io/badge/Deployed-Vercel+-green?logo=vercel)

**🌐 [Live Demo](https://fishermen-ai.vercel.app)** | **🔧 [Backend API](https://fishermen-ai-backend.onrender.com)**

## AI Co-Pilot for Coastal Fishermen

Built for the fishing community of Karavali (Coastal Karnataka).

---

## 🎯 The Problem

Small-scale fishermen in coastal Karnataka face three daily challenges:

1. **Language barrier** — Weather and marine advisories come in English, not in Kannada/Tulu/Konkani
2. **Complex information** — Wave height, wind speed, tides, and PFZ zones are scattered across 5+ websites
3. **Low digital literacy** — Most fishermen can't type or navigate complex apps

**They need one simple thing:** A clear answer to *"Should I go fishing tomorrow?"*

---

## 💡 The Solution

Fishermen-AI is a **voice-first AI assistant** that:

- 🎤 Understands **Kannada, Tulu, Konkani, and English**
- 🌤️ Combines weather, tides, and market data
- ✅ Gives a **clear answer**: GO / CAUTION / DON'T GO
- 🆘 Provides **one-tap emergency contacts** for Coast Guard and rescue teams

**Built with fishermen, not just for fishermen.**

---

## 🌟 Features

| # | Feature | Status |
|---|---------|--------|
| 1 | 🎤 Voice Recognition (Kannada/Tulu/Konkani/English) | ✅ |
| 2 | ⌨️ Text input fallback | ✅ |
| 3 | 🌤️ Real-time weather (OpenWeatherMap) | ✅ |
| 4 | 🌊 Tide information | ✅ |
| 5 | 📊 Daily fish market prices | ✅ |
| 6 | 🐟 Fish migration predictions | ✅ |
| 7 | 📸 AI Fish Photo Identification | ✅ |
| 8 | 🆘 SOS with GPS location sharing | ✅ |
| 9 | 📞 Emergency Contacts (Coast Guard, Rescue, Police) | ✅ |
| 10 | 📍 Share location with family | ✅ |
| 11 | 📋 Trip history | ✅ |
| 12 | 📈 Dashboard with GO/CAUTION/DON'T GO stats | ✅ |
| 13 | ⛽ Fuel cost calculator | ✅ |
| 14 | 🏛️ Government schemes for fishermen | ✅ |
| 15 | 🗓️ 7-day fishing calendar | ✅ |
| 16 | 📄 Export trip reports | ✅ |
| 17 | 📴 Offline support (cached data) | ✅ |

---

## 📱 App Structure

### Bottom Tab Navigation (Mobile-First)

- 🏠 **Home** — Voice input + GO/CAUTION/DON'T GO decision + today's weather
- 🎤 **Voice** — Full voice assistant with history
- 📊 **Market** — Today's fish prices
- 🆘 **Safety** — SOS + Emergency Contacts + Tide + Calendar
- ⚙️ **More** — Dashboard, History, Fuel, Schemes, Predictions, Export

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3 + Flask + Flask-CORS |
| **Frontend** | HTML5 + CSS3 + Vanilla JavaScript |
| **Voice** | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| **Weather** | OpenWeatherMap API |
| **Storage** | LocalStorage (offline support) |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 🚀 Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py

Backend runs on http://127.0.0.1:5000

Frontend

```bash
# Open frontend/index.html in a browser
# Or use Live Server in VS Code
```

---

🌐 Live Demo

· Frontend: https://fishermen-ai.vercel.app
· Backend: https://fishermen-ai-backend.onrender.com

Try saying: "Naale kadlige hogbahuda?" (Should I go fishing tomorrow?)

---

📅 Development Timeline

Day Focus Status
Day 1 Flask backend + decision engine ✅
Day 2 Fish ID + Market + SOS ✅
Day 3 Tide + Dashboard + Fuel ✅
Day 4 Schemes + Calendar + Export ✅
Day 5 Multi-language support ✅
Day 6 Deployment (Vercel + Render) ✅
Day 7 Fish migration predictions ✅
Day 8 Bottom tab navigation ✅
Day 9 Mobile fixes + tap-to-speak ✅
Day 10 Homepage redesign ✅
Day 11 Voice UX + text fallback ✅
Day 12 Emergency Contacts page ✅

---

🎯 Impact

Built for the ~1.5 lakh (150,000+) small-scale fishermen across Coastal Karnataka.

Goals:

· Reduce time to understand daily advisories from 15 minutes to 30 seconds
· Prevent unnecessary risky trips
· Increase profit through better market timing
· Emergency alert reach in remote coastal areas

---

🤝 Contributing

This is an open-source project built for the fishing community. Contributions are welcome.

---

👨‍💻 Developer

KSPavitra

https://github-readme-streak-stats.herokuapp.com/?user=KSPavitra

---

📝 License

MIT License

---

⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!