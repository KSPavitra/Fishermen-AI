from flask import Flask, jsonify, request
from flask_cors import CORS  # Make sure this import is there
import random
import datetime
import os

app = Flask(__name__)

# 🔥 THIS FIXES THE CONNECTION ISSUE 🔥
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)