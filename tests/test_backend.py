import sys
import os

if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app import app

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
    print("  /api/decision passed:", d['status'], "Score:", d['score'])
    print("  Reasons:", d['reasons'])

    print("Testing /identify-fish ...")
    res = client.post('/identify-fish', json={'query': 'bangude'})
    assert res.status_code == 200
    fish = res.get_json()
    print("  /identify-fish passed:", fish['fish'], fish['kannada'], "Price: Rs", fish['price'])

    print("\nALL BACKEND TESTS PASSED SUCCESSFULLY!")

if __name__ == '__main__':
    test_endpoints()
