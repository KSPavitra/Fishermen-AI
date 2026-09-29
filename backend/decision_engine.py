import random
import json
import re

class DecisionEngine:
    def __init__(self):
        # Comprehensive coastal Karnataka fish database (English, Kannada, Tulu)
        self.fish_prices = {
            'mackerel': {
                'name': 'Indian Mackerel',
                'kannada': 'ಬಂಗಡೆ (Bangude)',
                'price': 220,
                'min_price': 180,
                'max_price': 260,
                'season': 'Aug - Dec',
                'keywords': ['mackerel', 'bangude', 'ಬಂಗಡೆ', 'ಬಂಗುಡೆ']
            },
            'sardine': {
                'name': 'Oil Sardine',
                'kannada': 'ಬೂತಾಯಿ / ಸಾರ್ಡಿನ್ (Boothai)',
                'price': 150,
                'min_price': 120,
                'max_price': 180,
                'season': 'Sep - Jan',
                'keywords': ['sardine', 'boothai', 'ಬೂತಾಯಿ', 'ಸಾರ್ಡಿನ್', 'ಭೂತಾಯಿ']
            },
            'pomfret': {
                'name': 'Silver Pomfret',
                'kannada': 'ಮಾಂಜಿ / ರಾವ (Manji)',
                'price': 450,
                'min_price': 380,
                'max_price': 550,
                'season': 'Oct - Feb',
                'keywords': ['pomfret', 'manji', 'rava', 'ಮಾಂಜಿ', 'ರಾವ', 'ಬೆಳ್ಳಿ ಮಾಂಜಿ']
            },
            'seer': {
                'name': 'Kingfish / Seer Fish',
                'kannada': 'ಅಂಜಲ್ / ಸೀರ್ (Anjal)',
                'price': 580,
                'min_price': 500,
                'max_price': 750,
                'season': 'Sep - Mar',
                'keywords': ['seer', 'kingfish', 'anjal', 'surmai', 'ಅಂಜಲ್', 'ಸೀರ್', 'ಸುರ್ಮೆ']
            },
            'tuna': {
                'name': 'Yellowfin Tuna',
                'kannada': 'ಗೆದ್ದಾರ್ / ತುನಾ (Geddare)',
                'price': 340,
                'min_price': 280,
                'max_price': 420,
                'season': 'Year-round',
                'keywords': ['tuna', 'geddare', 'geddar', 'ತುನಾ', 'ಗೆದ್ದಾರ್', 'ಗೆದ್ದರೆ']
            },
            'prawn': {
                'name': 'Tiger Prawn',
                'kannada': 'ಸೀಗಡಿ (Sigadi)',
                'price': 420,
                'min_price': 350,
                'max_price': 520,
                'season': 'Aug - Nov',
                'keywords': ['prawn', 'shrimp', 'sigadi', 'ett', 'ಸೀಗಡಿ', 'ಸಿಗಡಿ', 'ಎಟ್']
            },
            'crab': {
                'name': 'Mud Crab',
                'kannada': 'ಡೆಂಜಿ / ಏಡಿ (Denji)',
                'price': 280,
                'min_price': 220,
                'max_price': 360,
                'season': 'Year-round',
                'keywords': ['crab', 'denji', 'edi', 'ಡೆಂಜಿ', 'ಏಡಿ']
            },
            'squid': {
                'name': 'Squid',
                'kannada': 'ಬೊಂಡಾಸ್ (Bondas)',
                'price': 260,
                'min_price': 200,
                'max_price': 320,
                'season': 'Sep - Dec',
                'keywords': ['squid', 'bondas', 'ಬೊಂಡಾಸ್', 'ಬೊಂದಾಸ್']
            }
        }

    def detect_fish_in_text(self, text):
        """Check if user query mentions a specific fish"""
        if not text:
            return None
        text_lower = text.lower()
        for key, fish_info in self.fish_prices.items():
            for kw in fish_info['keywords']:
                if kw in text_lower:
                    return fish_info
        return None

    def get_decision(self, weather, text=''):
        """
        Marine advisory decision engine.
        CRITICAL SAFETY RULE: Navigational safety is strictly governed by
        marine meteorology (wind, squall/storm keywords, temperature).
        Economic profit is informational only and NEVER increases the safety score.
        """
        score = 50  # Baseline neutral score
        reasons = []
        details = {}

        weather_desc = weather.get('weather', '').lower()
        wind_speed = float(weather.get('wind', 0))
        temp = float(weather.get('temp', 28))
        humidity = float(weather.get('humidity', 75))

        # Check for specific fish mentioned in user query
        mentioned_fish = self.detect_fish_in_text(text)

        # === 1. SEVERE WEATHER & WIND OVERRIDE (Safety First) ===
        danger_keywords = ['thunderstorm', 'squall', 'gale', 'storm', 'heavy rain', 'cyclone', 'tornado']
        is_severe = any(d in weather_desc for d in danger_keywords) or wind_speed >= 35

        # === 2. WEATHER / SKY SCORING ===
        good_weather = ['clear sky', 'few clouds', 'scattered clouds', 'sunny']
        moderate_weather = ['partly cloudy', 'broken clouds', 'overcast clouds', 'light rain', 'mist', 'haze']
        bad_weather = ['moderate rain', 'heavy intensity rain', 'shower rain', 'rain']

        if any(w in weather_desc for w in good_weather):
            score += 25
            reasons.append(f'☀️ Good visibility: {weather_desc.title()}')
        elif any(w in weather_desc for w in moderate_weather):
            score += 10
            reasons.append(f'⛅ Moderate sky: {weather_desc.title()}')
        elif any(w in weather_desc for w in bad_weather):
            score -= 25
            reasons.append(f'🌧️ Rainy conditions: {weather_desc.title()}')

        # === 3. WIND SCORING (Crucial for Small Craft Safety) ===
        if wind_speed < 15:
            score += 25
            reasons.append(f'💨 Calm breeze ({wind_speed} km/h) — Favorable for small craft')
        elif wind_speed < 26:
            score += 5
            reasons.append(f'💨 Moderate breeze ({wind_speed} km/h) — Caution advised for dinghies')
        elif wind_speed < 35:
            score -= 30
            reasons.append(f'💨 Strong breeze ({wind_speed} km/h) — Choppy waves, high caution')
        else:
            score -= 50
            reasons.append(f'💨 Gale/Squall force wind ({wind_speed} km/h) — Dangerous sea state')

        # === 4. TEMPERATURE SCORING ===
        if 24 <= temp <= 32:
            score += 10
            reasons.append(f'🌡️ Normal temperature ({temp}°C)')
        elif 20 <= temp < 24 or 32 < temp <= 35:
            score += 5
            reasons.append(f'🌡️ Acceptable temperature ({temp}°C)')
        else:
            reasons.append(f'🌡️ Extreme temperature ({temp}°C)')

        # === 5. ECONOMIC ESTIMATE (INFORMATIONAL ONLY - DOES NOT ALTER SAFETY SCORE) ===
        fuel_cost = 2500  # Average round trip fuel for outboard motor (OBM)
        estimated_catch = 20  # kg

        if mentioned_fish:
            target_price = mentioned_fish['price']
            reasons.append(f"🐟 Target market rate: {mentioned_fish['kannada']} (~₹{target_price}/kg)")
        else:
            target_price = sum(p['price'] for p in self.fish_prices.values()) / len(self.fish_prices)

        revenue = estimated_catch * target_price
        profit = int(revenue - fuel_cost)

        details = {
            'fuel_cost': fuel_cost,
            'estimated_profit': profit,
            'temp': temp,
            'wind': wind_speed,
            'weather': weather_desc,
            'humidity': humidity
        }

        # === 6. RESPONSIBLE ADVISORY CLASSIFICATION ===
        # Note: Avoid absolute "SAFE" or "GO" claims.
        # Informational decision support only.
        if is_severe or score < 45:
            status = 'ROUGH'
            title = 'Advisory: Rough Conditions Detected'
            advisory_text = 'Based on available weather data: Unfavorable or rough sea conditions detected. Small craft advised to stay in port.'
            emoji = '🔴'
            score = min(score, 35)
            if not any('Dangerous' in r or 'Squall' in r or 'Rain' in r for r in reasons):
                reasons.insert(0, '⚠️ Unfavorable marine conditions — stay ashore')
        elif score >= 70:
            status = 'FAVORABLE'
            title = 'Advisory: Conditions Generally Favorable'
            advisory_text = 'Based on available weather and marine data: Conditions appear generally favorable for small craft.'
            emoji = '🟢'
        else:
            status = 'CAUTION'
            title = 'Advisory: Caution Advised'
            advisory_text = 'Based on available weather and marine data: Moderate conditions detected. Exercise caution and check local port signals.'
            emoji = '🟡'

        # Natural, responsible voice response in Kannada
        voice_text = self._generate_voice_response(status, weather_desc, profit, mentioned_fish, wind_speed)

        disclaimer = "Informational advisory only based on available weather data. Does not replace official marine/weather warnings from Indian Coast Guard, IMD, or INCOIS. Always check official port signals before setting out."

        return {
            'status': status,
            'title': title,
            'advisory_text': advisory_text,
            'emoji': emoji,
            'score': max(0, min(100, score)),
            'reasons': reasons[:4],
            'details': details,
            'voice_text': voice_text,
            'disclaimer': disclaimer
        }

    def _generate_voice_response(self, status, weather, profit, mentioned_fish=None, wind_speed=0):
        """
        Generate responsible Kannada voice response.
        Explicitly mentions 'based on available weather data' and reminds user to check official warnings.
        """
        if status == 'FAVORABLE':
            voice = 'ಲಭ್ಯವಿರುವ ಹವಾಮಾನ ಮಾಹಿತಿಯ ಪ್ರಕಾರ ಇವತ್ತು ಕಡಲು ಸಾಮಾನ್ಯವಾಗಿ ಶಾಂತವಾಗಿದೆ. ಇದು ಮಾಹಿತಿ ಸಲಹೆಯಾಗಿದ್ದು, ಅಧಿಕೃತ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
            if mentioned_fish:
                voice += f" {mentioned_fish['kannada']} ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಉತ್ತಮವಾಗಿದೆ."
        elif status == 'CAUTION':
            voice = f'ಹವಾಮಾನ ಮಾಹಿತಿಯ ಪ್ರಕಾರ ಕಡಲಿನಲ್ಲಿ ಮಧ್ಯಮ ಗಾಳಿ ಇದೆ (ಗಂಟೆಗೆ {int(wind_speed)} ಕಿಲೋಮೀಟರ್). ಸಣ್ಣ ದೋಣಿಗಳು ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಿ. ಅಧಿಕೃತ ಸಲಹೆಗಳನ್ನು ಗಮನಿಸಿ.'
        else:
            voice = 'ಹವಾಮಾನ ಮಾಹಿತಿಯ ಪ್ರಕಾರ ಕಡಲು ಪ್ರಕ್ಷುಬ್ಧವಾಗಿರುವ ಸಾಧ್ಯತೆ ಇದೆ. ಸಣ್ಣ ದೋಣಿಗಳು ದಡದಲ್ಲೇ ಇರುವುದು ಸೂಕ್ತ. ಅಧಿಕೃತ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಪಾಲಿಸಿ.'

        return voice

    def identify_fish(self, fish_name):
        """Identify fish by name (Kannada or English)"""
        if not fish_name:
            return None
        fish_name = fish_name.lower().strip()
        for eng, data in self.fish_prices.items():
            if fish_name == eng or fish_name in data['kannada'].lower() or any(kw in fish_name for kw in data['keywords']):
                return {
                    'key': eng,
                    'name': data['name'],
                    'kannada': data['kannada'],
                    'price': data['price'],
                    'range': f"₹{data['min_price']} - ₹{data['max_price']}",
                    'season': data['season']
                }
        return None

    def get_all_fish(self):
        """Get all fish with prices and details"""
        return [{'key': k, 'name': v['name'], 'kannada': v['kannada'], 'price': v['price'], 'range': f"₹{v['min_price']} - ₹{v['max_price']}", 'season': v['season']}
                for k, v in self.fish_prices.items()]