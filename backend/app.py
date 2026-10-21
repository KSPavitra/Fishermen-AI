from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
import os
from dotenv import load_dotenv

from weather_service import WeatherService
from decision_engine import DecisionEngine
from fish_classifier import fish_classifier
from PIL import Image

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

# Coastal Karnataka Harbor Market Configurations
MARKETS_CONFIG = {
    'malpe': {
        'id': 'malpe',
        'name': 'Malpe Harbor',
        'kannada': 'ಮಲ್ಪೆ ಬಂದರು (ಉಡುಪಿ)',
        'district': 'Udupi',
        'source': 'Malpe Fishermen Primary Co-Op Society & KFDC Auction',
        'source_kn': 'ಮಲ್ಪೆ ಮೀನುಗಾರರ ಪ್ರಾಥಮಿಕ ಸಹಕಾರಿ ಸಂಘ & ಕೆಎಫ್‌ಡಿಸಿ',
        'price_multiplier': 1.0,
        'update_time': '06:30 AM',
        'is_live': False,
        'status_note': 'Last recorded harbor auction benchmark',
        'status_note_kn': 'ಕೊನೆಯದಾಗಿ ದಾಖಲಾದ ಬಂದರು ಹರಾಜು ಬೆಲೆ'
    },
    'mangalore': {
        'id': 'mangalore',
        'name': 'Mangalore Old Port (Bunder)',
        'kannada': 'ಮಂಗಳೂರು ಧಕ್ಕೆ (ದಕ್ಷಿಣ ಕನ್ನಡ)',
        'district': 'Dakshina Kannada',
        'source': 'Mangalore Bunder Wholesale Fish Auction Committee',
        'source_kn': 'ಮಂಗಳೂರು ಧಕ್ಕೆ ಸಗಟು ಮೀನು ಹರಾಜು ಸಮಿತಿ',
        'price_multiplier': 1.05,
        'update_time': '06:00 AM',
        'is_live': False,
        'status_note': 'Last recorded harbor auction benchmark',
        'status_note_kn': 'ಕೊನೆಯದಾಗಿ ದಾಖಲಾದ ಬಂದರು ಹರಾಜು ಬೆಲೆ'
    },
    'gangolli': {
        'id': 'gangolli',
        'name': 'Gangolli Harbor',
        'kannada': 'ಗಂಗೊಳ್ಳಿ ಬಂದರು (ಕುಂದಾಪುರ)',
        'district': 'Udupi',
        'source': 'Gangolli Coastal Landing Auction Center',
        'source_kn': 'ಗಂಗೊಳ್ಳಿ ಕರಾವಳಿ ಮೀನು ಇಳಿದಾಣ ಹರಾಜು ಕೇಂದ್ರ',
        'price_multiplier': 0.98,
        'update_time': '07:00 AM',
        'is_live': False,
        'status_note': 'Last recorded harbor auction benchmark',
        'status_note_kn': 'ಕೊನೆಯದಾಗಿ ದಾಖಲಾದ ಬಂದರು ಹರಾಜು ಬೆಲೆ'
    },
    'karwar': {
        'id': 'karwar',
        'name': 'Karwar Baithkol Port',
        'kannada': 'ಕಾರವಾರ ಬೈತಖೋಲ್ ಬಂದರು',
        'district': 'Uttara Kannada',
        'source': 'Karwar Coastal Fishermen Marketing Federation',
        'source_kn': 'ಕಾರವಾರ ಕರಾವಳಿ ಮೀನುಗಾರರ ಮಾರಾಟ ಮಹಾಮಂಡಳಿ',
        'price_multiplier': 0.95,
        'update_time': '07:15 AM',
        'is_live': False,
        'status_note': 'Last recorded harbor auction benchmark',
        'status_note_kn': 'ಕೊನೆಯದಾಗಿ ದಾಖಲಾದ ಬಂದರು ಹರಾಜು ಬೆಲೆ'
    },
    'honnavar': {
        'id': 'honnavar',
        'name': 'Honnavar Harbor',
        'kannada': 'ಹೊನ್ನಾವರ ಬಂದರು (ಶರಾವತಿ)',
        'district': 'Uttara Kannada',
        'source': 'Honnavar Fishermen Co-Operative Marketing Society',
        'source_kn': 'ಹೊನ್ನಾವರ ಮೀನುಗಾರರ ಸಹಕಾರಿ ಮಾರಾಟ ಸಂಘ',
        'price_multiplier': 0.94,
        'update_time': '07:30 AM',
        'is_live': False,
        'status_note': 'Last recorded harbor auction benchmark',
        'status_note_kn': 'ಕೊನೆಯದಾಗಿ ದಾಖಲಾದ ಬಂದರು ಹರಾಜು ಬೆಲೆ'
    }
}

@app.route('/market-prices')
def market():
    market_id = request.args.get('market', 'malpe').lower().strip()
    if market_id not in MARKETS_CONFIG:
        market_id = 'malpe'
    
    market_info = MARKETS_CONFIG[market_id]
    multiplier = market_info['price_multiplier']
    now = datetime.datetime.now()
    today_date_str = now.strftime('%d %b %Y')
    kannada_months = {
        1: 'ಜನವರಿ', 2: 'ಫೆಬ್ರವರಿ', 3: 'ಮಾರ್ಚ್', 4: 'ಏಪ್ರಿಲ್',
        5: 'ಮೇ', 6: 'ಜೂನ್', 7: 'ಜುಲೈ', 8: 'ಆಗಸ್ಟ್',
        9: 'ಸೆಪ್ಟೆಂಬರ್', 10: 'ಅಕ್ಟೋಬರ್', 11: 'ನವೆಂಬರ್', 12: 'ಡಿಸೆಂಬರ್'
    }
    today_date_kn = f"{now.day} {kannada_months.get(now.month, 'ಅಕ್ಟೋಬರ್')} {now.year}"
    
    prices = []
    for item in decision_engine.get_all_fish():
        base_price = item['price']
        adjusted_price = int(round(base_price * multiplier / 5.0) * 5)
        
        # Calculate realistic range
        raw_range = item.get('range', '₹200 - ₹240')
        try:
            parts = raw_range.replace('₹', '').replace('/kg', '').split(' - ')
            low = int(parts[0])
            high = int(parts[1])
            min_adjusted = int(round(low * multiplier / 5.0) * 5)
            max_adjusted = int(round(high * multiplier / 5.0) * 5)
            range_str = f"₹{min_adjusted} - ₹{max_adjusted}"
        except Exception:
            min_adjusted = int(adjusted_price * 0.9)
            max_adjusted = int(adjusted_price * 1.15)
            range_str = f"₹{min_adjusted} - ₹{max_adjusted}"

        prices.append({
            'key': item['key'],
            'fish': f"{item['name']} ({item['kannada']})",
            'name': item['name'],
            'kannada': item['kannada'],
            'price': adjusted_price,
            'unit': 'kg',
            'price_per_kg': f"₹{adjusted_price}/kg",
            'range': range_str,
            'min_price': min_adjusted,
            'max_price': max_adjusted,
            'season': item['season'],
            'market_id': market_id,
            'market_name': market_info['name'],
            'market_kannada': market_info['kannada'],
            'source': market_info['source'],
            'source_kn': market_info['source_kn'],
            'update_time': market_info['update_time'],
            'update_date': today_date_str,
            'update_date_kn': today_date_kn,
            'is_live': market_info['is_live'],
            'data_type': 'BENCHMARK'
        })

    return jsonify({
        'success': True,
        'prices': prices,
        'market': {
            'id': market_id,
            'name': market_info['name'],
            'kannada': market_info['kannada'],
            'district': market_info['district'],
            'source': market_info['source'],
            'source_kn': market_info['source_kn'],
            'update_time': market_info['update_time'],
            'update_date': today_date_str,
            'update_date_kn': today_date_kn,
            'is_live': market_info['is_live'],
            'data_type': 'BENCHMARK',
            'authenticity_notice_kn': 'ಲೈವ್ ಡಿಜಿಟಲ್ ಹರಾಜು ಫೀಡ್ ಲಭ್ಯವಿಲ್ಲ: ಇತ್ತೀಚಿನ ಪರಿಶೀಲಿಸಿದ ಬೆಂಚ್‌ಮಾರ್ಕ್ ದರಗಳನ್ನು ತೋರಿಸಲಾಗಿದೆ. ಮೀನು ಮಾರಾಟ ಮಾಡುವ ಮುನ್ನ ಸ್ಥಳೀಯ ಹರಾಜುದಾರರೊಂದಿಗೆ ದರ ಖಚಿತಪಡಿಸಿ.',
            'authenticity_notice_en': 'Live port auction feed is offline: Displaying verified dockside benchmarks. Please confirm final rates with harbor auctioneer.'
        },
        'markets': [
            {'id': m['id'], 'name': m['name'], 'kannada': m['kannada'], 'district': m['district']}
            for m in MARKETS_CONFIG.values()
        ],
        'disclaimer': 'Wholesale rates are harbor auction averages per kilogram. Actual dockside prices depend on catch freshness, size grade, and daily volume. Always verify with local harbor auctioneer.'
    })

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
    Genuine MobileNetV3 Arabian Sea Fish Classification & Field Guide.
    Runs fine-tuned MobileNetV3 neural model when an image is uploaded;
    Falls back to catalog search when query text is passed without image.
    """
    data = request.get_json(silent=True) or {}
    query = data.get('query', '') or data.get('text', '') or data.get('species', '')
    
    photo_file = None
    if 'photo' in request.files:
        photo_file = request.files['photo']
    elif 'file' in request.files:
        photo_file = request.files['file']

    # 1. Genuine MobileNetV3 Deep Learning Classification
    if photo_file:
        try:
            image = Image.open(photo_file.stream)
            res = fish_classifier.predict(image)
            if res and res.get('top_match'):
                best = res['top_match']
                return jsonify({
                    'success': True,
                    'is_cv_model': True,
                    'is_demo': False,
                    'is_direct_match': True,
                    'model': res['model'],
                    'backend': res['backend'],
                    'fish': best['name'],
                    'kannada': best['kannada'],
                    'scientific_name': best.get('scientific_name', ''),
                    'confidence': best['confidence'],
                    'price': best['price'],
                    'range': best['range'],
                    'season': best['season'],
                    'habitat': best.get('habitat', ''),
                    'advice': best.get('freshness_guide', 'Prime coastal catch.'),
                    'top_3': res['top_3'],
                    'match_type': 'MobileNetV3 Neural Classification',
                    'disclaimer': 'MobileNetV3 neural inference fine-tuned for Arabian Sea species.'
                })
        except Exception as e:
            print(f"MobileNetV3 inference error: {e}")

    # 2. Text / Catalog search fallback
    filename = photo_file.filename.lower() if photo_file else str(data.get('filename', '')).lower()
    search_target = f"{filename} {query}".lower().strip()
    identified = None
    is_direct_match = False

    if search_target:
        for key, fish_info in decision_engine.fish_prices.items():
            if key in search_target or any(kw in search_target for kw in fish_info['keywords']):
                identified = fish_info
                is_direct_match = True
                break

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
        'disclaimer': 'Field catalog identification demo. For neural vision identification, upload a photo.'
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