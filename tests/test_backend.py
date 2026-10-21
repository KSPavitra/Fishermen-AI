import sys
import os
import io

if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app import app
from PIL import Image

def test_endpoints():
    client = app.test_client()
    
    print("Testing / ...")
    res = client.get('/')
    assert res.status_code == 200
    print("  / passed:", res.get_json()['name'])

    print("Testing /weather ...")
    res = client.get('/weather')
    assert res.status_code == 200
    w = res.get_json()
    print("  /weather passed:", w.get('city'), w.get('temp'), "C, wind:", w.get('wind'), "km/h")

    print("Testing /market-prices ...")
    res = client.get('/market-prices')
    assert res.status_code == 200
    prices = res.get_json()['prices']
    assert len(prices) >= 8
    print(f"  /market-prices passed: {len(prices)} fish species listed.")

    print("Testing /api/decision ...")
    res = client.post('/api/decision', json={'text': 'Can I go fishing today?'})
    assert res.status_code == 200
    d = res.get_json()['decision']
    assert d['status'] in ['FAVORABLE', 'CAUTION', 'ROUGH']
    assert 'disclaimer' in d
    assert 'advisory_text' in d
    print("  /api/decision passed:", d['status'], "Score:", d['score'])
    print("  Reasons:", d['reasons'])
    print("  Disclaimer:", d['disclaimer'])

    print("Testing safety logic: Severe wind override must trigger ROUGH ...")
    from decision_engine import DecisionEngine
    engine = DecisionEngine()
    storm_weather = {'weather': 'clear sky', 'wind': 42.0, 'temp': 28, 'humidity': 70}
    storm_dec = engine.get_decision(storm_weather, text='Can I catch expensive pomfret?')
    assert storm_dec['status'] == 'ROUGH', f"Expected ROUGH for 42 km/h wind, got {storm_dec['status']}"
    print("  Safety override passed: 42 km/h wind triggers ROUGH despite high fish profit.")

    print("Testing /calendar (Deterministic Solunar Lunar Cycle) ...")
    res = client.get('/calendar')
    assert res.status_code == 200
    cal_data = res.get_json()
    assert cal_data['success'] is True
    assert len(cal_data['days']) == 7
    assert 'disclaimer' in cal_data
    res2 = client.get('/calendar')
    assert cal_data['days'][0]['rating'] == res2.get_json()['days'][0]['rating']
    print(f"  /calendar passed: 7 days returned deterministically. Day 1: {cal_data['days'][0]['date']} -> {cal_data['days'][0]['rating']}")

    print("Testing /fish-prediction (Deterministic CMFRI Seasonal Guide) ...")
    res = client.get('/fish-prediction')
    assert res.status_code == 200
    pred_data = res.get_json()
    assert pred_data['success'] is True
    assert len(pred_data['predictions']) == 7
    assert 'disclaimer' in pred_data
    res_pred2 = client.get('/fish-prediction')
    assert pred_data['predictions'][0]['fish'] == res_pred2.get_json()['predictions'][0]['fish']
    print(f"  /fish-prediction passed: {len(pred_data['predictions'])} species in seasonal guide. Top: {pred_data['predictions'][0]['fish']} ({pred_data['predictions'][0]['status_text']})")

    print("Testing /identify-fish (Catalog Field Guide Demo) ...")
    res = client.post('/identify-fish', json={'query': 'bangude'})
    assert res.status_code == 200
    fish = res.get_json()
    assert fish['is_demo'] is True
    assert fish['is_direct_match'] is True
    assert 'disclaimer' in fish
    assert 'confidence' not in fish  # Text query returns catalog details without fake confidence
    print("  /identify-fish passed:", fish['fish'], fish['kannada'], "Price: Rs", fish['price'])
    print("  Match type:", fish['match_type'], "| Disclaimer:", fish['disclaimer'][:60] + '...')

    print("Testing /identify-fish (Genuine MobileNetV3 Neural Vision Inference) ...")
    test_img = Image.new('RGB', (224, 224), (70, 140, 110))
    img_byte_arr = io.BytesIO()
    test_img.save(img_byte_arr, format='JPEG')
    img_byte_arr.seek(0)
    res_cv = client.post('/identify-fish', data={'photo': (img_byte_arr, 'test_mackerel.jpg')}, content_type='multipart/form-data')
    assert res_cv.status_code == 200
    cv_data = res_cv.get_json()
    assert cv_data['is_cv_model'] is True
    assert 'confidence' in cv_data
    assert len(cv_data['top_3']) == 3
    print(f"  MobileNetV3 CV test passed: {cv_data['fish']} ({cv_data['kannada']}) - Confidence: {cv_data['confidence']}%")
    print(f"  Top 3 classes: {[c['name'] for c in cv_data['top_3']]}")

    print("\nALL BACKEND, SAFETY & MOBILENETV3 TESTS PASSED SUCCESSFULLY!")

if __name__ == '__main__':
    test_endpoints()
