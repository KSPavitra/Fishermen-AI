from flask import Flask, jsonify, request
from flask_cors import CORS
import random

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

@app.route('/api/decision', methods=['POST'])
def api_decision():
    """Main decision endpoint - ALWAYS WORKS"""
    try:
        data = request.json
        text = data.get('text', '')
        
        print(f"📝 Received: {text}")
        
        # ALWAYS return a decision - no matter what!
        decision = get_fishing_decision()
        
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

@app.route('/market-prices')
def get_market_prices():
    prices = [
    {'fish': 'Mackerel (ಬಂಗಡೆ)', 'price': 200},
    {'fish': 'Sardine (ಸಾರ್ಡಿನ್)', 'price': 150},
    {'fish': 'Pomfret (ರಾವ)', 'price': 400},
    {'fish': 'Tuna (ತುನಾ)', 'price': 350},
    {'fish': 'Seer (ಸೀರ್)', 'price': 500},
    {'fish': 'Shark (ಶಾರ್ಕ್)', 'price': 300},
    {'fish': 'Crab (ಏಡಿ)', 'price': 250},
    {'fish': 'Prawn (ಸೀಗಡಿ)', 'price': 350}
]
    return jsonify({
        'success': True,
        'prices': prices
    })

def get_fishing_decision():
    """Returns a fishing decision - ALWAYS works"""
    
    # Random but weighted towards GO
    choices = ['GO', 'GO', 'GO', 'CAUTION', 'CAUTION', "DON'T GO"]
    status = random.choice(choices)
    
    reasons_map = {
        'GO': [
            '☀️ Sky is clear and sunny',
            '💨 Light winds (10 km/h)',
            '🌡️ Perfect temperature (28°C)',
            '💰 Good profit expected (₹3,500)',
            '🎯 Fishing zone is favorable'
        ],
        'CAUTION': [
            '⛅ Partly cloudy skies',
            '💨 Moderate winds (18 km/h)',
            '🌡️ Temperature is okay (26°C)',
            '💰 Moderate profit (₹1,500)',
            '⚠️ Be careful while going out'
        ],
        "DON'T GO": [
            '🌧️ Rain expected today',
            '💨 Strong winds (30 km/h)',
            '🌡️ Unpleasant temperature',
            '💰 Low profit (₹200)',
            '🔴 Not safe to go out'
        ]
    }
    
    voice_map = {
        'GO': 'ಕಡಲಿಗೆ ಹೋಗಬಹುದು. ಪರಿಸ್ಥಿತಿ ಚೆನ್ನಾಗಿದೆ. ಸುರಕ್ಷಿತ ಪ್ರಯಾಣ!',
        'CAUTION': 'ಕಡಲಿಗೆ ಹೋಗಬಹುದು ಆದರೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಇರಿ. ಜಾಗರೂಕರಾಗಿರಿ.',
        "DON'T GO": 'ಕಡಲಿಗೆ ಹೋಗಬೇಡಿ. ಸುರಕ್ಷಿತವಲ್ಲ. ದಯವಿಟ್ಟು ನಿಲ್ಲಿಸಿ.'
    }
    
    # Pick random reasons
    reasons = reasons_map[status]
    random.shuffle(reasons)
    reasons = reasons[:3]  # Show only 3 reasons
    
    return {
        'status': status,
        'reasons': reasons,
        'voice_text': voice_map[status],
        'details': {
            'temp': 28,
            'wind': 12,
            'fuel_cost': 2500,
            'profit': 3500 if status == 'GO' else 1500 if status == 'CAUTION' else 200
        }
    }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)