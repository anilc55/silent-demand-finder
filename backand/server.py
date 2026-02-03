from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import random
from datetime import datetime

app = Flask(__name__, static_folder='../')
CORS(app)

# Sample data for silent demand analysis
DEMAND_DATA = {
    "analysis": {
        "demand_score": random.randint(70, 95),
        "competition_score": random.randint(20, 60),
        "monetization_potential": random.randint(60, 90),
        "trend_score": random.randint(50, 85)
    },
    "findings": [
        {
            "type": "WHY",
            "title": "Hidden Motivation",
            "description": "People search this but don't discuss openly due to fear of competition or judgment.",
            "confidence": random.randint(80, 95)
        },
        {
            "type": "HOW",
            "title": "Silent Implementation",
            "description": "Step-by-step methods people secretly want but won't ask about publicly.",
            "confidence": random.randint(75, 90)
        },
        {
            "type": "PROBLEM",
            "title": "Unspoken Issues",
            "description": "Real problems users face but don't mention in open forums.",
            "confidence": random.randint(70, 85)
        },
        {
            "type": "COMPARE",
            "title": "Secret Comparisons",
            "description": "What people actually compare but won't admit publicly.",
            "confidence": random.randint(65, 80)
        },
        {
            "type": "MISTAKE",
            "title": "Hidden Mistakes",
            "description": "Common errors people make but hide from others.",
            "confidence": random.randint(75, 90)
        },
        {
            "type": "SECRET",
            "title": "Industry Secrets",
            "description": "What professionals know but don't share openly.",
            "confidence": random.randint(85, 95)
        }
    ],
    "monetization_ideas": [
        "Create beginner-friendly course",
        "Develop template/product",
        "Offer consulting service",
        "Build SaaS tool",
        "Create YouTube content",
        "Write ebook/guide"
    ]
}

@app.route('/')
def serve_frontend():
    return send_from_directory('..', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('..', path)

@app.route('/api/analyze', methods=['POST'])
def analyze_keyword():
    try:
        data = request.json
        keyword = data.get('keyword', 'AI').lower()
        
        # Generate analysis based on keyword
        response = {
            "success": True,
            "keyword": keyword,
            "timestamp": datetime.now().isoformat(),
            "analysis": {
                **DEMAND_DATA["analysis"],
                "keyword": keyword.upper(),
                "search_volume": random.randint(1000, 50000),
                "growth_rate": random.randint(5, 50)
            },
            "findings": DEMAND_DATA["findings"],
            "monetization_ideas": random.sample(DEMAND_DATA["monetization_ideas"], 3),
            "recommendations": [
                f"Create content around '{keyword} for beginners'",
                f"Address common problems with {keyword}",
                f"Compare {keyword} with alternatives",
                f"Share secret tips about {keyword}"
            ]
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/trends', methods=['GET'])
def get_trends():
    # Generate sample trend data
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return jsonify({
        "success": True,
        "trends": {
            "demand": [random.randint(30, 90) for _ in months],
            "competition": [random.randint(20, 80) for _ in months],
            "months": months
        }
    })

@app.route('/api/premium/waitlist', methods=['POST'])
def join_waitlist():
    data = request.json
    email = data.get('email', '')
    
    # In production, save to database
    return jsonify({
        "success": True,
        "message": "Added to waitlist successfully!",
        "position": random.randint(1, 500)
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
