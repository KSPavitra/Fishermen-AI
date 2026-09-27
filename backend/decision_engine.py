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
        """Enhanced marine decision engine with real weather and economics"""
        score = 50  # Baseline neutral score
        reasons = []
        details = {}

        weather_desc = weather.get('weather', '').lower()
        wind_speed = float(weather.get('wind', 0))
        temp = float(weather.get('temp', 28))
        humidity = float(weather.get('humidity', 75))

        # Check for specific fish mentioned in user query
        mentioned_fish = self.detect_fish_in_text(text)

        # === 1. SEVERE WEATHER OVERRIDE (Safety First) ===
        danger_keywords = ['thunderstorm', 'squall', 'gale', 'storm', 'heavy rain', 'cyclone', 'tornado']
        is_severe = any(d in weather_desc for d in danger_keywords) or wind_speed >= 38

        # === 2. WEATHER SCORING ===
        good_weather = ['clear sky', 'few clouds', 'scattered clouds', 'sunny']
        moderate_weather = ['partly cloudy', 'broken clouds', 'overcast clouds', 'light rain', 'mist', 'haze']
        bad_weather = ['moderate rain', 'heavy intensity rain', 'shower rain', 'rain']

        if any(w in weather_desc for w in good_weather):
            score += 25
            reasons.append(f'☀️ Good weather: {weather_desc.title()}')
        elif any(w in weather_desc for w in moderate_weather):
            score += 10
            reasons.append(f'⛅ Moderate sky: {weather_desc.title()}')
        elif any(w in weather_desc for w in bad_weather):
            score -= 20
            reasons.append(f'🌧️ Rainy conditions: {weather_desc.title()}')

        # === 3. WIND SCORING (Crucial for Marine Safety) ===
        if wind_speed < 15:
            score += 25
            reasons.append(f'💨 Calm breeze ({wind_speed} km/h) — Safe for small boats')
        elif wind_speed < 28:
            score += 5
            reasons.append(f'💨 Moderate wind ({wind_speed} km/h) — Caution for dinghies')
        elif wind_speed < 38:
            score -= 25
            reasons.append(f'💨 High wind ({wind_speed} km/h) — Rough waves expected')
        else:
            score -= 40
            reasons.append(f'💨 Gale force wind ({wind_speed} km/h) — DANGEROUS SEA')

        # === 4. TEMPERATURE SCORING ===
        if 24 <= temp <= 32:
            score += 10
            reasons.append(f'🌡️ Comfortable temperature ({temp}°C)')
        elif 20 <= temp < 24 or 32 < temp <= 35:
            score += 5
            reasons.append(f'🌡️ Acceptable temperature ({temp}°C)')
        else:
            reasons.append(f'🌡️ Extreme temperature ({temp}°C)')

        # === 5. ECONOMIC SCORING ===
        fuel_cost = 2500  # Average round trip fuel for outboard motor (OBM)
        estimated_catch = 20  # kg

        if mentioned_fish:
            target_price = mentioned_fish['price']
            reasons.append(f"🐟 Target: {mentioned_fish['kannada']} (~₹{target_price}/kg)")
        else:
            # Average coastal market price
            target_price = sum(p['price'] for p in self.fish_prices.values()) / len(self.fish_prices)

        revenue = estimated_catch * target_price
        profit = int(revenue - fuel_cost)

        if profit > 3000:
            score += 15
            reasons.append(f'💰 Excellent estimated profit (₹{profit})')
        elif profit > 1000:
            score += 10
            reasons.append(f'💰 Good estimated profit (₹{profit})')
        elif profit > 0:
            score += 5
            reasons.append(f'💰 Moderate estimated profit (₹{profit})')
        else:
            score -= 10
            reasons.append(f'💰 Low or negative profit margin (₹{profit})')

        details = {
            'fuel_cost': fuel_cost,
            'profit': profit,
            'temp': temp,
            'wind': wind_speed,
            'weather': weather_desc,
            'humidity': humidity
        }

        # === 6. FINAL DECISION ===
        if is_severe:
            status = "DON'T GO"
            emoji = '🔴'
            score = min(score, 30)
            if not any('DANGER' in r or 'Bad' in r or 'Rain' in r for r in reasons):
                reasons.insert(0, '⚠️ Dangerous sea conditions — stay in port')
        elif score >= 70:
            status = 'GO'
            emoji = '🟢'
        elif score >= 45:
            status = 'CAUTION'
            emoji = '🟡'
        else:
            status = "DON'T GO"
            emoji = '🔴'

        # Natural voice response in Kannada
        voice_text = self._generate_voice_response(status, weather_desc, profit, mentioned_fish, wind_speed)

        return {
            'status': status,
            'emoji': emoji,
            'score': max(0, min(100, score)),
            'reasons': reasons[:4],
            'details': details,
            'voice_text': voice_text
        }

    def _generate_voice_response(self, status, weather, profit, mentioned_fish=None, wind_speed=0):
        """Generate natural, clear Kannada voice response"""
        if status == 'GO':
            voice = 'ಇವತ್ತು ಕಡಲಿಗೆ ಹೋಗುವುದು ಒಳ್ಳೆಯದು. ಹವಾಮಾನ ಮತ್ತು ಕಡಲು ಶಾಂತವಾಗಿದೆ.'
            if mentioned_fish:
                voice += f" {mentioned_fish['kannada']} ಬೆಲೆ ಉತ್ತಮವಾಗಿದೆ."
            elif profit > 1000:
                voice += f' ಸುಮಾರು ₹{profit} ಲಾಭ ನಿರೀಕ್ಷಿಸಬಹುದು.'
        elif status == 'CAUTION':
            voice = f'ಕಡಲಿಗೆ ಹೋಗಬಹುದು ಆದರೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಿ. ಗಾಳಿಯ ವೇಗ {wind_speed} ಕಿಲೋಮೀಟರ್ ಇದೆ.'
        else:
            voice = 'ಇವತ್ತು ಕಡಲಿಗೆ ಹೋಗುವುದು ಸುರಕ್ಷಿತವಲ್ಲ. ಕಡಲು ಪ್ರಕ್ಷುಬ್ಧವಾಗಿದೆ, ದಯವಿಟ್ಟು ದಡದಲ್ಲೇ ಇರಿ.'

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