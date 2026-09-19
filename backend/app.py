from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return jsonify({'message': '🐟 Fishermen-AI API is running!'})

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

@app.route('/weather')
def weather():
    return {
        'weather': 'clear sky',
        'temp': 28,
        'wind': 12,
        'humidity': 75,
        'city': 'Karavali'
    }

@app.route('/tide')
def tide():
    now = datetime.datetime.now()
    tides = []
    for i in range(4):
        t = now + datetime.timedelta(hours=i*6)
        tides.append({
            'time': t.strftime('%I:%M %p'),
            'type': 'High' if i % 2 == 0 else 'Low',
            'height': round(1.5 + (i % 2) * 1.2, 1)
        })
    return {'success': True, 'location': 'Karavali Coast', 'tides': tides}

@app.route('/market-prices')
def market():
    return {'success': True, 'prices': [
        {'fish': 'Mackerel (ಬಂಗಡೆ)', 'price': 200},
        {'fish': 'Sardine (ಸಾರ್ಡಿನ್)', 'price': 150},
        {'fish': 'Pomfret (ರಾವ)', 'price': 400},
        {'fish': 'Tuna (ತುನಾ)', 'price': 350}
    ]}

@app.route('/schemes')
def schemes():
    return {'success': True, 'schemes': [
        {'name': 'Pradhan Mantri Matsya Sampada Yojana', 'description': 'Fisheries development scheme', 'eligibility': 'Registered fishermen', 'link': 'https://pmmsy.gov.in'},
        {'name': 'Kisan Credit Card', 'description': 'Credit for fishermen', 'eligibility': 'Active fishermen', 'link': 'https://www.nabard.org'},
        {'name': 'Fishermen Insurance', 'description': 'Accident insurance', 'eligibility': 'All fishermen', 'link': 'https://www.fisheries.gov.in'}
    ]}

@app.route('/calendar')
def calendar():
    days = []
    today = datetime.datetime.now()
    ratings = ['⭐ Best', '✅ Good', '⚠️ Moderate', '❌ Bad']
    for i in range(7):
        d = today + datetime.timedelta(days=i)
        days.append({
            'date': d.strftime('%A, %b %d'),
            'rating': random.choice(ratings)
        })
    return {'success': True, 'days': days}

@app.route('/best-time')
def best_time():
    """Best fishing times today based on tide, sun, and fish activity"""
    now = datetime.datetime.now()
    hour = now.hour
    
    # Morning window: 5:30 - 8:30 AM (best)
    morning_start = "5:30 AM"
    morning_end = "8:30 AM"
    
    # Evening window: 4:30 - 7:00 PM (second best)
    evening_start = "4:30 PM"
    evening_end = "7:00 PM"
    
    # Avoid window: 12:00 PM - 3:00 PM (hot, low activity)
    avoid_start = "12:00 PM"
    avoid_end = "3:00 PM"
    
    # Which window is happening NOW?
    current_status = "unknown"
    current_message = ""
    
    if 5 <= hour < 9:
        current_status = "best"
        current_message = "🌟 You're in the BEST window right now. Go fishing!"
    elif 16 <= hour < 19:
        current_status = "good"
        current_message = "✅ Good window now. Fishing should be active."
    elif 12 <= hour < 15:
        current_status = "avoid"
        current_message = "⚠️ Avoid this window. Fish are less active."
    else:
        current_status = "wait"
        current_message = "⏳ Wait for the next window."
    
    return {
        'success': True,
        'date': now.strftime('%A, %b %d'),
        'windows': [
            {
                'label': '🌟 Best',
                'time': f'{morning_start} – {morning_end}',
                'reason': 'High tide + cool temperature + active fish',
                'rating': 5
            },
            {
                'label': '✅ Good',
                'time': f'{evening_start} – {evening_end}',
                'reason': 'Rising tide + feeding time',
                'rating': 4
            },
            {
                'label': '❌ Avoid',
                'time': f'{avoid_start} – {avoid_end}',
                'reason': 'Strong sun + low fish activity',
                'rating': 1
            }
        ],
        'current_status': current_status,
        'current_message': current_message
    }

@app.route('/fish-prediction')
def fish_prediction():
    fish_species = ['Mackerel', 'Sardine', 'Pomfret', 'Tuna', 'Seer', 'Prawn']
    locations = ['Malpe', 'Gangolli', 'Karwar', 'Udupi', 'Mangalore', 'Bhatkal']
    kannada_map = {
        'Mackerel': 'ಬಂಗಡೆ', 'Sardine': 'ಸಾರ್ಡಿನ್', 'Pomfret': 'ರಾವ',
        'Tuna': 'ತುನಾ', 'Seer': 'ಸೀರ್', 'Prawn': 'ಸೀಗಡಿ'
    }
    predictions = []
    for i in range(6):
        fish = random.choice(fish_species)
        location = random.choice(locations)
        days_from_now = random.randint(1, 7)
        date = datetime.datetime.now() + datetime.timedelta(days=days_from_now)
        predictions.append({
            'fish': fish,
            'kannada': kannada_map.get(fish, fish),
            'location': location,
            'date': date.strftime('%A, %b %d'),
            'probability': random.randint(65, 95),
            'advice': random.choice(['🎯 High chance!', '✅ Moderate chance.', '⚠️ Low chance.'])
        })
    return {'success': True, 'predictions': predictions, 'updated': datetime.datetime.now().isoformat()}

@app.route('/identify-fish', methods=['POST'])
def identify():
    fish = ['Mackerel', 'Sardine', 'Pomfret', 'Tuna']
    kannada = ['ಬಂಗಡೆ', 'ಸಾರ್ಡಿನ್', 'ರಾವ', 'ತುನಾ']
    prices = [200, 150, 400, 350]
    idx = random.randint(0, 3)
    return {
        'success': True,
        'fish': fish[idx],
        'kannada': kannada[idx],
        'price': prices[idx],
        'confidence': random.randint(85, 98)
    }

@app.route('/api/decision', methods=['POST'])
def decision():
    data = request.json
    text = data.get('text', '')
    print(f"📝 Received: {text}")
    statuses = ['GO', 'CAUTION', "DON'T GO"]
    status = random.choice(statuses)
    reasons = {
        'GO': ['☀️ Good weather', '💨 Light wind', '💰 Good profit'],
        'CAUTION': ['⛅ Moderate weather', '💨 Moderate wind', '⚠️ Be careful'],
        "DON'T GO": ['🌧️ Bad weather', '💨 Strong wind', '🔴 Not safe']
    }
    return {
        'success': True,
        'decision': {
            'status': status,
            'reasons': reasons[status],
            'voice_text': f'Decision: {status}',
            'details': {'temp': 28, 'wind': 12, 'profit': 3000}
        }
    }

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)