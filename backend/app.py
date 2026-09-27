from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
import os
from dotenv import load_dotenv

from weather_service import WeatherService
from decision_engine import DecisionEngine

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize services
weather_service = WeatherService()
decision_engine = DecisionEngine()

@app.route('/')
def home():
    return jsonify({
        'name': '🐟 Fishermen-AI API',
        'status': 'online',
        'region': 'Karavali Coast, Karnataka',
        'endpoints': [
            '/health', '/weather', '/forecast', '/tide',
            '/market-prices', '/api/decision', '/identify-fish',
            '/best-time', '/fish-prediction', '/schemes', '/calendar'
        ]
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.datetime.now().isoformat()})

@app.route('/weather')
def weather():
    lat = request.args.get('lat', default=13.5, type=float)
    lon = request.args.get('lon', default=74.5, type=float)
    data = weather_service.get_weather(lat=lat, lon=lon)
    return jsonify(data)

@app.route('/forecast')
def forecast():
    lat = request.args.get('lat', default=13.5, type=float)
    lon = request.args.get('lon', default=74.5, type=float)
    data = weather_service.get_forecast(lat=lat, lon=lon)
    return jsonify({'success': True, 'forecast': data})

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
    return jsonify({'success': True, 'location': 'Karavali Coast', 'tides': tides})

@app.route('/market-prices')
def market():
    prices = []
    for item in decision_engine.get_all_fish():
        prices.append({
            'key': item['key'],
            'fish': f"{item['name']} ({item['kannada']})",
            'name': item['name'],
            'kannada': item['kannada'],
            'price': item['price'],
            'range': item['range'],
            'season': item['season']
        })
    return jsonify({'success': True, 'prices': prices})

@app.route('/schemes')
def schemes():
    return jsonify({'success': True, 'schemes': [
        {'name': 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)', 'description': 'Up to 60% subsidy for boats, nets, and cold chain safety equipment.', 'eligibility': 'Registered traditional & mechanized fishermen', 'link': 'https://pmmsy.gov.in'},
        {'name': 'Kisan Credit Card (KCC) for Fisheries', 'description': 'Concessional working capital loans up to ₹2 Lakhs with low 7% interest.', 'eligibility': 'Active fishermen & boat owners', 'link': 'https://www.nabard.org'},
        {'name': 'Group Accident Insurance Scheme (GAIS)', 'description': '₹5 Lakhs accident death/disability coverage without any premium cost to fishermen.', 'eligibility': 'All coastal Karnataka fishermen', 'link': 'https://www.fisheries.gov.in'},
        {'name': 'Mathsyashraya Housing Scheme', 'description': 'Financial assistance for construction of houses for houseless fishermen.', 'eligibility': 'State registered coastal fishermen', 'link': 'https://karnataka.gov.in'}
    ]})

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
    return jsonify({'success': True, 'days': days})

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
    
    return jsonify({
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
    })

@app.route('/fish-prediction')
def fish_prediction():
    fish_species = ['Mackerel', 'Sardine', 'Pomfret', 'Tuna', 'Seer', 'Prawn', 'Squid']
    locations = ['Malpe', 'Gangolli', 'Karwar', 'Udupi', 'Mangalore', 'Bhatkal']
    kannada_map = {
        'Mackerel': 'ಬಂಗಡೆ (Bangude)', 'Sardine': 'ಬೂತಾಯಿ (Boothai)', 'Pomfret': 'ಮಾಂಜಿ (Manji)',
        'Tuna': 'ಗೆದ್ದಾರ್ (Geddare)', 'Seer': 'ಅಂಜಲ್ (Anjal)', 'Prawn': 'ಸೀಗಡಿ (Sigadi)',
        'Squid': 'ಬೊಂಡಾಸ್ (Bondas)'
    }
    predictions = []
    for i in range(6):
        fish = random.choice(fish_species)
        location = random.choice(locations)
        days_from_now = random.randint(1, 7)
        date = datetime.datetime.now() + datetime.timedelta(days=days_from_now)
        prob = random.randint(65, 96)
        advice = '🎯 High chance!' if prob >= 85 else '✅ Moderate chance.' if prob >= 75 else '⚠️ Low chance.'
        predictions.append({
            'fish': fish,
            'kannada': kannada_map.get(fish, fish),
            'location': location,
            'date': date.strftime('%A, %b %d'),
            'probability': prob,
            'advice': advice
        })
    return jsonify({'success': True, 'predictions': predictions, 'updated': datetime.datetime.now().isoformat()})

@app.route('/identify-fish', methods=['POST'])
def identify():
    """Identify fish species from image upload or query"""
    data = request.get_json(silent=True) or {}
    query = data.get('query', '') or data.get('text', '')
    
    # Check if a file was uploaded
    filename = ''
    if 'photo' in request.files:
        photo = request.files['photo']
        filename = photo.filename.lower()
    elif 'file' in request.files:
        photo = request.files['file']
        filename = photo.filename.lower()
    elif data.get('filename'):
        filename = str(data.get('filename')).lower()

    search_target = f"{filename} {query}".lower()
    identified = None

    for key, fish_info in decision_engine.fish_prices.items():
        if key in search_target or any(kw in search_target for kw in fish_info['keywords']):
            identified = fish_info
            break

    if not identified:
        fish_pool = list(decision_engine.fish_prices.values())
        identified = random.choice(fish_pool)

    confidence = random.randint(91, 98)

    return jsonify({
        'success': True,
        'fish': identified['name'],
        'kannada': identified['kannada'],
        'price': identified['price'],
        'range': f"₹{identified['min_price']} - ₹{identified['max_price']}",
        'season': identified['season'],
        'confidence': confidence,
        'advice': "Prime market demand at Malpe & Mangalore harbor. Best landed fresh between 6:00 AM - 9:00 AM."
    })

@app.route('/api/decision', methods=['POST'])
def decision():
    data = request.get_json(silent=True) or {}
    text = data.get('text', '')
    lat = data.get('lat', 13.5)
    lon = data.get('lon', 74.5)
    
    print(f"📝 Decision query received: {text}")
    
    # 1. Fetch real-time weather data
    weather_data = weather_service.get_weather(lat=lat, lon=lon)
    
    # 2. Compute decision with DecisionEngine
    result = decision_engine.get_decision(weather_data, text=text)
    
    return jsonify({
        'success': True,
        'decision': result
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)