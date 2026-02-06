from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__, 
            static_folder='../',
            template_folder='../')
CORS(app)

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query', '')
    
    # Mock search results
    results = [
        {"title": f"Result 1 for {query}", "score": 85},
        {"title": f"Result 2 for {query}", "score": 72},
        {"title": f"Result 3 for {query}", "score": 68}
    ]
    
    return jsonify({
        "success": True,
        "query": query,
        "results": results,
        "count": len(results)
    })

@app.route('/api/plans')
def get_plans():
    plans = [
        {
            "name": "Basic",
            "price": 0,
            "features": ["5 searches/day", "Basic analysis"]
        },
        {
            "name": "Pro",
            "price": 9,
            "features": ["Unlimited searches", "Advanced analysis", "API access"]
        },
        {
            "name": "Enterprise",
            "price": 29,
            "features": ["All Pro features", "White label", "Dedicated support"]
        }
    ]
    return jsonify(plans)

@app.route('/api/languages')
def get_languages():
    languages = [
        {"code": "en", "name": "English"},
        {"code": "hi", "name": "Hindi"},
        {"code": "es", "name": "Spanish"},
        {"code": "fr", "name": "French"},
        {"code": "de", "name": "German"},
        {"code": "ja", "name": "Japanese"},
        {"code": "zh", "name": "Chinese"},
        {"code": "ar", "name": "Arabic"},
        {"code": "ru", "name": "Russian"},
        {"code": "pt", "name": "Portuguese"}
    ]
    return jsonify(languages)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name', '')
    email = data.get('email', '')
    message = data.get('message', '')
    
    # Here you would typically send an email or save to database
    print(f"Contact form: {name} <{email}>: {message}")
    
    return jsonify({
        "success": True,
        "message": "Thank you for your message!"
    })

if __name__ == '__main__':
    # Create directories if they don't exist
    if not os.path.exists('backend'):
        os.makedirs('backend')
    
    print("""
    ====================================
    Silent Demand Finder Server Starting
    ====================================
    
    Server running on: http://localhost:5000
    
    Available endpoints:
    - GET  /                    : Home page
    - POST /api/search          : Search endpoint
    - GET  /api/plans           : Subscription plans
    - GET  /api/languages       : Available languages
    - POST /api/contact         : Contact form
    
    Press Ctrl+C to stop the server
    """)
    
    app.run(debug=True, port=5000)
