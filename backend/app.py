from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ============================================
# HOME
# ============================================
@app.route('/')
def home():
    return jsonify({
        'message': '🐟 Fisherman-AI is running!',
        'status': 'healthy',
        'version': '2.0.0',
        'endpoints': {
            '/health': 'Health check',
            '/weather': 'Get weather data',
            '/api/decision': 'POST - Get fishing decision'
        }
    })

# ============================================
# HEALTH CHECK
# ============================================
@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

# ============================================
# WEATHER - REAL OR MOCK
# ============================================
@app.route('/weather')
def get_weather():
    """Get weather data (real if API key exists, else mock)"""
    
    api_key = os.getenv('OPENWEATHER_API_KEY', '')
    
    # If API key exists, get REAL weather
    if api_key:
        try:
            import requests
            url = f"https://api.openweathermap.org/data/2.5/weather?lat=13.5&lon=74.5&appid={api_key}&units=metric"
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'weather': data['weather'][0]['description'],
                    'temp': data['main']['temp'],
                    'feels_like': data['main']['feels_like'],
                    'humidity': data['main']['humidity'],
                    'wind': data['wind']['speed'],
                    'pressure': data['main']['pressure'],
                    'city': data.get('name', 'Karavali'),
                    'source': 'OpenWeather'
                }
        except Exception as e:
            print(f"⚠️ Weather API error: {e}")
            # Fall through to mock data
    
    # Mock weather (if no API key or API failed)
    conditions = ['clear sky', 'scattered clouds', 'partly cloudy', 'light rain', 'sunny']
    return {
        'weather': random.choice(conditions),
        'temp': random.randint(25, 32),
        'feels_like': random.randint(26, 33),
        'humidity': random.randint(60, 85),
        'wind': random.randint(5, 20),
        'pressure': random.randint(1000, 1020),
        'city': 'Karavali',
        'source': 'Mock (No API Key)'
    }

# ============================================
# DECISION ENGINE
# ============================================
@app.route('/api/decision', methods=['POST'])
def get_decision():
    """Get fishing decision based on voice input"""
    try:
        data = request.json
        text = data.get('text', '')
        print(f"📝 Received: {text}")
        
        # Get weather
        weather = get_weather()
        
        # Generate decision based on weather and text
        decision = generate_decision(weather, text)
        
        return jsonify({
            'success': True,
            'decision': decision
        })
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================
# DECISION LOGIC
# ============================================
def generate_decision(weather, text):
    """Generate decision based on weather and user input"""
    
    weather_desc = weather.get('weather', '').lower()
    wind_speed = weather.get('wind', 10)
    temp = weather.get('temp', 28)
    
    score = 0
    reasons = []
    
    # === WEATHER SCORING ===
    good_weather = ['clear sky', 'sunny', 'few clouds', 'scattered clouds']
    medium_weather = ['partly cloudy', 'cloudy', 'light rain', 'mist']
    bad_weather = ['rain', 'storm', 'thunderstorm', 'heavy rain']
    
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
    else:
        reasons.append(f'🌡️ Temperature: {temp}°C')
    
    # === ECONOMIC SCORING ===
    fuel_cost = 2500
    estimated_catch = 20
    avg_price = 200
    profit = (estimated_catch * avg_price) - fuel_cost
    
    if profit > 2000:
        score += 25
        reasons.append(f'💰 Good profit expected (₹{profit})')
    elif profit > 500:
        score += 10
        reasons.append(f'💰 Moderate profit (₹{profit})')
    else:
        reasons.append(f'💰 Low profit (₹{profit})')
    
    # === FINAL DECISION ===
    if score >= 70:
        status = 'GO'
        voice = 'ಕಡಲಿಗೆ ಹೋಗಬಹುದು. ಪರಿಸ್ಥಿತಿ ಚೆನ್ನಾಗಿದೆ.'
    elif score >= 40:
        status = 'CAUTION'
        voice = 'ಕಡಲಿಗೆ ಹೋಗಬಹುದು ಆದರೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಿ.'
    else:
        status = "DON'T GO"
        voice = 'ಕಡಲಿಗೆ ಹೋಗಬೇಡಿ. ಸುರಕ್ಷಿತವಲ್ಲ.'
    
    return {
        'status': status,
        'reasons': reasons[:4],
        'voice_text': voice,
        'details': {
            'temp': temp,
            'wind': wind_speed,
            'profit': profit,
            'fuel_cost': fuel_cost,
            'weather': weather_desc
        }
    }

# ============================================
# FISH IDENTIFICATION
# ============================================
@app.route('/identify-fish', methods=['POST'])
def identify_fish():
    """Identify fish from uploaded image"""
    try:
        # Get the image
        if 'image' not in request.files:
            return jsonify({'success': False, 'error': 'No image uploaded'}), 400
        
        file = request.files['image']
        
        # Save temporarily
        import os
        import uuid
        temp_path = f"temp_{uuid.uuid4().hex}.jpg"
        file.save(temp_path)
        
        # For now, use mock detection
        # In production: Use Google Vision API or TensorFlow model
        
        import random
        fish_db = [
            {'name': 'Mackerel', 'kannada': 'ಬಂಗಡೆ', 'price': 200},
            {'name': 'Sardine', 'kannada': 'ಸಾರ್ಡಿನ್', 'price': 150},
            {'name': 'Pomfret', 'kannada': 'ರಾವ', 'price': 400},
            {'name': 'Tuna', 'kannada': 'ತುನಾ', 'price': 350},
            {'name': 'Seer', 'kannada': 'ಸೀರ್', 'price': 500},
            {'name': 'Prawn', 'kannada': 'ಸೀಗಡಿ', 'price': 350}
        ]
        
        # Randomly pick one
        fish = random.choice(fish_db)
        
        # Clean up temp file
        try:
            os.remove(temp_path)
        except:
            pass
        
        return jsonify({
            'success': True,
            'fish': fish['name'],
            'kannada': fish['kannada'],
            'price': fish['price'],
            'confidence': random.randint(85, 98)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================
# MARKET PRICES
# ============================================
@app.route('/market-prices')
def get_market_prices():
    prices = [
        {'fish': 'Mackerel', 'price': 200},
        {'fish': 'Sardine', 'price': 150},
        {'fish': 'Pomfret', 'price': 400},
        {'fish': 'Tuna', 'price': 350},
        {'fish': 'Seer', 'price': 500},
        {'fish': 'Prawn', 'price': 350}
    ]
    return jsonify({
        'success': True,
        'prices': prices
    })

# ============================================
# START SERVER
# ============================================
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)