import os
import requests
from dotenv import load_dotenv
import json
from datetime import datetime

load_dotenv()

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv('OPENWEATHER_API_KEY', '')
        self.base_url = 'https://api.openweathermap.org/data/2.5/weather'
        self.forecast_url = 'https://api.openweathermap.org/data/2.5/forecast'

    def get_weather(self, lat=13.5, lon=74.5):
        """Get live weather for Karavali region"""
        try:
            if not self.api_key:
                print("⚠️ No API key found, using mock data")
                return self._get_mock_weather()
            
            params = {
                'lat': lat,
                'lon': lon,
                'appid': self.api_key,
                'units': 'metric'
            }
            
            response = requests.get(self.base_url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Cache weather data
                self._cache_weather(data)
                
                return {
                    'weather': data['weather'][0]['description'],
                    'weather_icon': data['weather'][0]['icon'],
                    'temp': data['main']['temp'],
                    'feels_like': data['main']['feels_like'],
                    'humidity': data['main']['humidity'],
                    'wind': data['wind']['speed'],
                    'pressure': data['main']['pressure'],
                    'visibility': data.get('visibility', 10000),
                    'sunrise': data['sys']['sunrise'],
                    'sunset': data['sys']['sunset'],
                    'city': data.get('name', 'Karavali'),
                    'timestamp': datetime.now().isoformat()
                }
            else:
                print(f"⚠️ API error: {response.status_code}")
                return self._get_mock_weather()
                
        except Exception as e:
            print(f"❌ Weather API error: {e}")
            return self._get_mock_weather()

    def get_forecast(self, lat=13.5, lon=74.5):
        """Get 5-day forecast"""
        try:
            if not self.api_key:
                return self._get_mock_forecast()
            
            params = {
                'lat': lat,
                'lon': lon,
                'appid': self.api_key,
                'units': 'metric'
            }
            
            response = requests.get(self.forecast_url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                forecasts = []
                
                for item in data['list'][:8]:  # 8 items = 24 hours
                    forecasts.append({
                        'time': item['dt_txt'],
                        'temp': item['main']['temp'],
                        'weather': item['weather'][0]['description'],
                        'wind': item['wind']['speed']
                    })
                
                return forecasts
            else:
                return self._get_mock_forecast()
                
        except Exception as e:
            print(f"❌ Forecast error: {e}")
            return self._get_mock_forecast()

    def _cache_weather(self, data):
        """Cache weather data for offline use"""
        try:
            cache_file = 'weather_cache.json'
            cache_data = {
                'data': data,
                'timestamp': datetime.now().isoformat()
            }
            with open(cache_file, 'w') as f:
                json.dump(cache_data, f)
        except:
            pass

    def get_cached_weather(self):
        """Get cached weather for offline mode"""
        try:
            with open('weather_cache.json', 'r') as f:
                cache = json.load(f)
                # Check if cache is fresh (less than 1 hour old)
                cache_time = datetime.fromisoformat(cache['timestamp'])
                if (datetime.now() - cache_time).seconds < 3600:
                    data = cache['data']
                    return {
                        'weather': data['weather'][0]['description'],
                        'temp': data['main']['temp'],
                        'wind': data['wind']['speed'],
                        'humidity': data['main']['humidity'],
                        'cached': True
                    }
        except:
            pass
        return None

    def _get_mock_weather(self):
        """Mock weather for development"""
        import random
        weathers = ['clear sky', 'scattered clouds', 'partly cloudy', 'light rain', 'moderate rain']
        return {
            'weather': random.choice(weathers),
            'temp': random.randint(24, 32),
            'feels_like': random.randint(26, 34),
            'humidity': random.randint(60, 85),
            'wind': random.randint(5, 25),
            'pressure': random.randint(1000, 1020),
            'visibility': 10000,
            'city': 'Karavali',
            'timestamp': datetime.now().isoformat()
        }

    def _get_mock_forecast(self):
        """Mock forecast for development"""
        import random
        times = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        weathers = ['clear sky', 'partly cloudy', 'light rain']
        return [
            {
                'time': f'2024-01-01 {time}:00:00',
                'temp': random.randint(24, 32),
                'weather': random.choice(weathers),
                'wind': random.randint(5, 20)
            }
            for time in times
        ]