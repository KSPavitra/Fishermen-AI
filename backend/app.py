from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return jsonify({
        'message': '🐟 Fisherman-AI API is running!',
        'status': 'healthy',
        'version': '1.0.0'
    })

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
    import datetime
    now = datetime.datetime.now()
    tides = []
    for i in range(4):
        t = now + datetime.timedelta(hours=i*6)
        tides.append({
            'time': t.strftime('%I:%M %p'),
            'type': 'High' if i % 2 == 0 else 'Low',
            'height': round(1.5 + (i % 2) * 1.2, 1)
        })
    return {'success': True, 'location': 'Karavali Coast', 'tides': tides, 'next_tide': tides[0]}

@app.route('/market-prices')
def market():
    prices = [
        {'fish': 'Mackerel (ಬಂಗಡೆ)', 'price': 200},
        {'fish': 'Sardine (ಸಾರ್ಡಿನ್)', 'price': 150},
        {'fish': 'Pomfret (ರಾವ)', 'price': 400},
        {'fish': 'Tuna (ತುನಾ)', 'price': 350}
    ]
    return {'success': True, 'prices': prices}

@app.route('/schemes')
def schemes():
    schemes = [
        {'name': 'Pradhan Mantri Matsya Sampada Yojana', 'description': 'Fisheries development scheme', 'eligibility': 'Registered fishermen', 'link': 'https://pmmsy.gov.in'},
        {'name': 'Kisan Credit Card', 'description': 'Credit for fishermen', 'eligibility': 'Active fishermen', 'link': 'https://www.nabard.org'},
        {'name': 'Fishermen Insurance', 'description': 'Accident insurance', 'eligibility': 'All fishermen', 'link': 'https://www.fisheries.gov.in'}
    ]
    return {'success': True, 'schemes': schemes}

@app.route('/calendar')
def calendar():
    import datetime
    days = []
    today = datetime.datetime.now()
    ratings = ['⭐ Best', '✅ Good', '⚠️ Moderate', '❌ Bad']
    for i in range(7):
        d = today + datetime.timedelta(days=i)
        days.append({
            'date': d.strftime('%A, %b %d'),
            'rating': random.choice(ratings),
            'advice': 'Check weather before going'
        })
    return {'success': True, 'days': days}

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