import random
import json

class DecisionEngine:
    def __init__(self):
        # Fish price database
        self.fish_prices = {
            'mackerel': {'price': 200, 'kannada': 'ಬಂಗಡೆ'},
            'sardine': {'price': 150, 'kannada': 'ಸಾರ್ಡಿನ್'},
            'pomfret': {'price': 400, 'kannada': 'ರಾವ'},
            'tuna': {'price': 350, 'kannada': 'ತುನಾ'},
            'seer': {'price': 500, 'kannada': 'ಸೀರ್'},
            'shark': {'price': 300, 'kannada': 'ಶಾರ್ಕ್'},
            'crab': {'price': 250, 'kannada': 'ಏಡಿ'},
            'prawn': {'price': 350, 'kannada': 'ಸೀಗಡಿ'}
        }

    def get_decision(self, weather, text=''):
        """Enhanced decision with real weather"""
        score = 0
        reasons = []
        details = {}

        # Weather based scoring
        weather_desc = weather.get('weather', '').lower()
        wind_speed = weather.get('wind', 0)
        temp = weather.get('temp', 28)

        # === WEATHER SCORING ===
        good_weather = ['clear sky', 'sunny', 'few clouds', 'scattered clouds']
        medium_weather = ['partly cloudy', 'cloudy', 'light rain', 'mist']
        bad_weather = ['rain', 'storm', 'thunderstorm', 'heavy rain', 'snow']

        if any(w in weather_desc for w in good_weather):
            score += 30
            reasons.append(f'☀️ Good weather: {weather_desc}')
        elif any(w in weather_desc for w in medium_weather):
            score += 15
            reasons.append(f'⛅ Moderate weather: {weather_desc}')
        elif any(w in weather_desc for w in bad_weather):
            score -= 20
            reasons.append(f'🌧️ Bad weather: {weather_desc}')

        # === WIND SCORING ===
        if wind_speed < 10:
            score += 25
            reasons.append(f'💨 Light wind ({wind_speed} km/h)')
        elif wind_speed < 20:
            score += 10
            reasons.append(f'💨 Moderate wind ({wind_speed} km/h)')
        else:
            score -= 20
            reasons.append(f'💨 Strong wind ({wind_speed} km/h) - UNSAFE')

        # === TEMPERATURE SCORING ===
        if 22 <= temp <= 30:
            score += 10
            reasons.append(f'🌡️ Good temperature ({temp}°C)')
        elif 18 <= temp <= 35:
            score += 5
            reasons.append(f'🌡️ Acceptable temperature ({temp}°C)')
        else:
            reasons.append(f'🌡️ Extreme temperature ({temp}°C)')

        # === ECONOMIC SCORING ===
        fuel_cost = 2500
        estimated_catch = 20
        
        # Get average fish price
        avg_price = sum(p['price'] for p in self.fish_prices.values()) / len(self.fish_prices)
        revenue = estimated_catch * avg_price
        profit = revenue - fuel_cost

        if profit > 3000:
            score += 25
            reasons.append(f'💰 Excellent profit expected (₹{int(profit)})')
        elif profit > 1000:
            score += 15
            reasons.append(f'💰 Good profit expected (₹{int(profit)})')
        elif profit > 0:
            score += 5
            reasons.append(f'💰 Moderate profit (₹{int(profit)})')
        else:
            score -= 10
            reasons.append(f'💰 Low profit (₹{int(profit)})')

        details = {
            'fuel_cost': fuel_cost,
            'profit': int(profit),
            'temp': temp,
            'wind': wind_speed,
            'weather': weather_desc
        }

        # === FINAL DECISION ===
        if score >= 70:
            status = 'GO'
            emoji = '🟢'
        elif score >= 40:
            status = 'CAUTION'
            emoji = '🟡'
        else:
            status = "DON'T GO"
            emoji = '🔴'

        # Voice response in Kannada
        voice_text = self._generate_voice_response(status, weather_desc, profit)

        return {
            'status': status,
            'emoji': emoji,
            'score': score,
            'reasons': reasons[:4],  # Show top 4 reasons
            'details': details,
            'voice_text': voice_text
        }

    def _generate_voice_response(self, status, weather, profit):
        """Generate natural Kannada voice response"""
        base = {
            'GO': 'ಇವತ್ತು ಕಡಲಿಗೆ ಹೋಗುವುದು ಒಳ್ಳೆಯದು. ಪರಿಸ್ಥಿತಿ ಅನುಕೂಲಕರವಾಗಿದೆ.',
            'CAUTION': 'ಕಡಲಿಗೆ ಹೋಗಬಹುದು ಆದರೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಿ. ಪರಿಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸಿ.',
            "DON'T GO": 'ಇವತ್ತು ಕಡಲಿಗೆ ಹೋಗುವುದು ಸುರಕ್ಷಿತವಲ್ಲ. ದಯವಿಟ್ಟು ನಿಲ್ಲಿಸಿ.'
        }
        
        voice = base.get(status, 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.')
        
        if status == 'GO' and profit > 1000:
            voice += f' ಉತ್ತಮ ಲಾಭ ನಿರೀಕ್ಷೆ: ₹{profit}'
        elif status == "DON'T GO":
            voice += f' ಹವಾಮಾನ: {weather}'
        
        return voice

    def identify_fish(self, fish_name):
        """Identify fish by name (Kannada or English)"""
        fish_name = fish_name.lower().strip()
        
        # Check in fish database
        for eng, data in self.fish_prices.items():
            if fish_name == eng or fish_name == data['kannada']:
                return {
                    'name': eng,
                    'kannada': data['kannada'],
                    'price': data['price']
                }
        
        return None

    def get_all_fish(self):
        """Get all fish with prices"""
        return [{'name': k, 'kannada': v['kannada'], 'price': v['price']} 
                for k, v in self.fish_prices.items()]