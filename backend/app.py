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
    """
    7-Day Coastal Solunar & Tidal Activity Guide.
    Calculates deterministic lunar phase and tidal activity approximation.
    NO random data. Informational tidal guide only.
    """
    days = []
    now = datetime.datetime.now()
    # Reference New Moon: Jan 11, 2024 (Synodic lunar month = 29.530588 days)
    ref_new_moon = datetime.datetime(2024, 1, 11, 11, 57)
    synodic_month = 29.530588

    for i in range(7):
        d = now + datetime.timedelta(days=i)
        days_since_ref = (d - ref_new_moon).total_seconds() / 86400.0
        lunar_age = days_since_ref % synodic_month

        if lunar_age < 2.5 or lunar_age > 27.0:
            rating = '🌊 Spring Tide (New Moon · Active Currents)'
            activity = 'High'
        elif 12.3 <= lunar_age <= 17.2:
            rating = '🌕 Spring Tide (Full Moon · Peak Feeding)'
            activity = 'High'
        elif (6.0 <= lunar_age <= 8.8) or (20.8 <= lunar_age <= 23.6):
            rating = '⚓ Neap Tide (Quarter Moon · Moderate Currents)'
            activity = 'Moderate'
        else:
            rating = '⛵ Normal Tide (Steady Water Movement)'
            activity = 'Normal'

        days.append({
            'date': d.strftime('%A, %b %d'),
            'rating': rating,
            'activity_level': activity
        })

    return jsonify({
        'success': True,
        'title': '7-Day Coastal Solunar & Tidal Guide',
        'disclaimer': 'Tidal movement estimation based on astronomical lunar cycle. Does not predict weather storms. Always verify daily weather before sailing.',
        'days': days
    })

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
    """
    Coastal Seasonal Catch Guide (Historical Karavali Patterns).
    Based on published CMFRI regional landing seasons for Coastal Karnataka.
    Transparently labeled as an informational seasonal guide, NOT a real-time radar.
    """
    now = datetime.datetime.now()
    current_month_num = now.month  # 1 to 12

    # Historical landing season calendar for Coastal Karnataka (CMFRI reference)
    species_catalog = [
        {
            'fish': 'Mackerel',
            'kannada': 'ಬಂಗಡೆ (Bangude)',
            'peak_months': [8, 9, 10, 11, 12],
            'shoulder_months': [1, 2, 7],
            'primary_harbor': 'Malpe & Mangalore',
            'gear': 'Purse seine / Ring seine'
        },
        {
            'fish': 'Sardine',
            'kannada': 'ಬೂತಾಯಿ (Boothai)',
            'peak_months': [9, 10, 11, 12, 1],
            'shoulder_months': [2, 3, 8],
            'primary_harbor': 'Gangolli & Malpe',
            'gear': 'Traditional gillnet / Ring seine'
        },
        {
            'fish': 'Pomfret',
            'kannada': 'ಮಾಂಜಿ (Manji)',
            'peak_months': [10, 11, 12, 1, 2],
            'shoulder_months': [3, 9],
            'primary_harbor': 'Mangalore & Karwar',
            'gear': 'Drift gillnet / Trawl'
        },
        {
            'fish': 'Seer',
            'kannada': 'ಅಂಜಲ್ (Anjal)',
            'peak_months': [9, 10, 11, 12, 1, 2, 3],
            'shoulder_months': [4, 8],
            'primary_harbor': 'Malpe & Bhatkal',
            'gear': 'Hooks & lines / Large mesh gillnet'
        },
        {
            'fish': 'Tuna',
            'kannada': 'ಗೆದ್ದಾರ್ (Geddare)',
            'peak_months': [10, 11, 12, 1, 2, 3, 4],
            'shoulder_months': [5, 9],
            'primary_harbor': 'Karwar & Malpe',
            'gear': 'Pelagic longline / Gillnet'
        },
        {
            'fish': 'Prawn',
            'kannada': 'ಸೀಗಡಿ (Sigadi)',
            'peak_months': [8, 9, 10, 11],
            'shoulder_months': [12, 1, 7],
            'primary_harbor': 'Mangalore & Honnavar',
            'gear': 'Trawl / Estuarine nets'
        },
        {
            'fish': 'Squid',
            'kannada': 'ಬೊಂಡಾಸ್ (Bondas)',
            'peak_months': [9, 10, 11, 12],
            'shoulder_months': [1, 2, 8],
            'primary_harbor': 'Malpe & Gangolli',
            'gear': 'Jigging / Trawl'
        }
    ]

    predictions = []
    for sp in species_catalog:
        if current_month_num in sp['peak_months']:
            status_text = '🎯 Peak Landing Season'
            prob = 88
            advice = f"Historically high abundance in {now.strftime('%B')}. Primary landings at {sp['primary_harbor']}."
        elif current_month_num in sp['shoulder_months']:
            status_text = '✅ Moderate Seasonal Presence'
            prob = 72
            advice = f"Moderate seasonal occurrence in {now.strftime('%B')}. Targeted with {sp['gear']}."
        else:
            status_text = '⚠️ Off-Season / Dispersed'
            prob = 40
            advice = f"Historically low landing volume in {now.strftime('%B')}. Dispersed offshore."

        predictions.append({
            'fish': sp['fish'],
            'kannada': sp['kannada'],
            'location': sp['primary_harbor'],
            'date': now.strftime('%B %Y'),
            'probability': prob,
            'advice': advice,
            'status_text': status_text,
            'gear': sp['gear']
        })

    # Sort so peak season items appear first
    predictions.sort(key=lambda x: x['probability'], reverse=True)

    return jsonify({
        'success': True,
        'title': 'Coastal Seasonal Catch Guide (Historical Karavali Patterns)',
        'month': now.strftime('%B %Y'),
        'source': 'CMFRI Regional Marine Fisheries Reference (Coastal Karnataka)',
        'disclaimer': 'Informational seasonal guide based on regional historical catch trends. This is not a real-time sonar or live migration radar.',
        'predictions': predictions,
        'updated': now.isoformat()
    })

@app.route('/identify-fish', methods=['POST'])
def identify():
    """
    Fish Species Field Guide & Identification Demo.
    Matches uploaded photo filename or query text against Karavali coastal species catalog.
    Transparently labeled as a catalog demo, NOT a neural vision model.
    """
    data = request.get_json(silent=True) or {}
    query = data.get('query', '') or data.get('text', '') or data.get('species', '')
    
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

    search_target = f"{filename} {query}".lower().strip()
    identified = None
    is_direct_match = False

    if search_target:
        for key, fish_info in decision_engine.fish_prices.items():
            if key in search_target or any(kw in search_target for kw in fish_info['keywords']):
                identified = fish_info
                is_direct_match = True
                break

    # If no search target or no direct match, provide default reference sample (Mackerel)
    if not identified:
        identified = decision_engine.fish_prices.get('mackerel', list(decision_engine.fish_prices.values())[0])
        is_direct_match = False

    return jsonify({
        'success': True,
        'is_demo': True,
        'is_direct_match': is_direct_match,
        'match_type': 'Catalog Reference Match' if is_direct_match else 'Catalog Reference Sample (Demo)',
        'fish': identified['name'],
        'kannada': identified['kannada'],
        'price': identified['price'],
        'range': f"₹{identified['min_price']} - ₹{identified['max_price']}",
        'season': identified['season'],
        'advice': "Prime market demand at Malpe & Mangalore harbor. Best landed fresh between 6:00 AM - 9:00 AM.",
        'disclaimer': 'Field catalog identification demo. Computer vision model is not active. Always verify species with a local harbor expert or fisheries official before sale or consumption.'
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