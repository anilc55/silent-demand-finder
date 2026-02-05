#!/usr/bin/env python3
"""
Silent Demand Finder Backend Server
Auto-chalne wala system - No maintenance needed
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import random
import time
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to access API

# Data storage (in production, use database)
users_db = {}
api_keys_db = {}
payments_db = {}

# ==================== MOCK DATA GENERATION ====================
class MockDataGenerator:
    """Auto-generated realistic data"""
    
    @staticmethod
    def generate_trends(keyword):
        """Generate fake Google Trends data"""
        trends = {
            "keyword": keyword,
            "interest_over_time": [
                {"date": f"2024-{m:02d}-01", "value": random.randint(30, 100)}
                for m in range(1, 13)
            ],
            "related_queries": [
                {"query": f"{keyword} tools", "value": random.randint(50, 100)},
                {"query": f"{keyword} tutorial", "value": random.randint(40, 90)},
                {"query": f"learn {keyword}", "value": random.randint(60, 100)},
                {"query": f"{keyword} for beginners", "value": random.randint(70, 100)},
                {"query": f"advanced {keyword}", "value": random.randint(20, 60)}
            ],
            "interest_by_region": [
                {"region": "United States", "value": random.randint(70, 100)},
                {"region": "India", "value": random.randint(60, 95)},
                {"region": "United Kingdom", "value": random.randint(50, 90)},
                {"region": "Germany", "value": random.randint(40, 80)},
                {"region": "Japan", "value": random.randint(30, 70)}
            ]
        }
        return trends
    
    @staticmethod
    def generate_social_mentions(keyword):
        """Generate fake social media data"""
        platforms = ["Reddit", "Twitter", "Quora", "LinkedIn", "Facebook"]
        return {
            platform: {
                "mentions": random.randint(100, 10000),
                "sentiment": round(random.uniform(0.5, 0.9), 2),
                "top_posts": [
                    f"How to use {keyword} for business growth",
                    f"{keyword} vs traditional methods",
                    f"Hidden benefits of {keyword}",
                    f"{keyword} tutorial for beginners"
                ][:random.randint(2, 4)]
            }
            for platform in platforms
        }
    
    @staticmethod
    def generate_monetization_ideas(keyword):
        """Generate monetization ideas"""
        ideas = [
            {
                "title": f"{keyword} Online Course",
                "description": f"Create a comprehensive course teaching {keyword}",
                "revenue_potential": f"${random.randint(1000, 5000)}/month",
                "difficulty": "Medium",
                "time_required": "2-4 weeks"
            },
            {
                "title": f"{keyword} Affiliate Website",
                "description": f"Review and recommend {keyword} tools",
                "revenue_potential": f"${random.randint(500, 3000)}/month",
                "difficulty": "Easy",
                "time_required": "1-2 weeks"
            },
            {
                "title": f"{keyword} Consulting Service",
                "description": f"Offer personalized {keyword} consultations",
                "revenue_potential": f"${random.randint(2000, 10000)}/month",
                "difficulty": "Hard",
                "time_required": "Ongoing"
            },
            {
                "title": f"{keyword} Digital Product",
                "description": f"Create and sell {keyword} templates/tools",
                "revenue_potential": f"${random.randint(1000, 8000)}/month",
                "difficulty": "Medium",
                "time_required": "3-6 weeks"
            }
        ]
        return random.sample(ideas, random.randint(2, 4))
    
    @staticmethod
    def generate_competition_analysis(keyword):
        """Generate competition data"""
        return {
            "competition_score": random.randint(10, 90),
            "top_competitors": [
                {"name": f"{keyword}Master", "traffic": random.randint(10000, 100000)},
                {"name": f"Learn{keyword}", "traffic": random.randint(5000, 80000)},
                {"name": f"{keyword}Pro", "traffic": random.randint(2000, 50000)}
            ],
            "market_gap": [
                f"Lack of practical {keyword} tutorials",
                f"No comprehensive {keyword} comparison",
                f"Missing {keyword} case studies",
                f"Limited {keyword} tools for beginners"
            ][:random.randint(2, 3)]
        }
    
    @staticmethod
    def generate_full_analysis(keyword):
        """Generate complete analysis"""
        return {
            "timestamp": datetime.now().isoformat(),
            "keyword": keyword,
            "demand_score": random.randint(50, 100),
            "competition_score": random.randint(10, 70),
            "opportunity_score": random.randint(60, 100),
            "trends": MockDataGenerator.generate_trends(keyword),
            "social_mentions": MockDataGenerator.generate_social_mentions(keyword),
            "monetization_ideas": MockDataGenerator.generate_monetization_ideas(keyword),
            "competition_analysis": MockDataGenerator.generate_competition_analysis(keyword),
            "recommendations": [
                "Create content around practical applications",
                "Focus on beginner-friendly tutorials",
                "Build comparison articles",
                "Develop case studies"
            ]
        }

# ==================== API ENDPOINTS ====================
@app.route('/')
def home():
    return jsonify({
        "status": "active",
        "service": "Silent Demand Finder API",
        "version": "1.0.0",
        "endpoints": {
            "/api/search": "POST - Search for keyword analysis",
            "/api/trends": "GET - Get trends data",
            "/api/monetization": "GET - Get monetization ideas",
            "/api/generate_key": "POST - Generate API key",
            "/api/validate_key": "POST - Validate API key",
            "/api/user/register": "POST - Register user",
            "/api/user/login": "POST - Login user",
            "/api/payment/create": "POST - Create payment"
        }
    })

@app.route('/api/search', methods=['POST'])
def search_keyword():
    """Search for keyword analysis"""
    try:
        data = request.json
        keyword = data.get('keyword', '').strip()
        api_key = data.get('api_key', '')
        
        if not keyword:
            return jsonify({"error": "Keyword is required"}), 400
        
        # Validate API key if provided
        if api_key and api_key not in api_keys_db:
            return jsonify({"error": "Invalid API key"}), 401
        
        # Generate analysis
        analysis = MockDataGenerator.generate_full_analysis(keyword)
        
        # Track usage
        if api_key:
            if api_key not in api_keys_db:
                api_keys_db[api_key] = {"usage": 0, "limit": 100}
            api_keys_db[api_key]["usage"] += 1
        
        return jsonify({
            "success": True,
            "keyword": keyword,
            "analysis": analysis,
            "usage": api_keys_db.get(api_key, {}).get("usage", 0) if api_key else None
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/trends', methods=['GET'])
def get_trends():
    """Get trends for a keyword"""
    keyword = request.args.get('keyword', 'AI')
    days = int(request.args.get('days', 30))
    
    trends = MockDataGenerator.generate_trends(keyword)
    return jsonify({
        "success": True,
        "keyword": keyword,
        "period_days": days,
        "trends": trends
    })

@app.route('/api/monetization', methods=['GET'])
def get_monetization():
    """Get monetization ideas"""
    keyword = request.args.get('keyword', 'AI')
    
    ideas = MockDataGenerator.generate_monetization_ideas(keyword)
    return jsonify({
        "success": True,
        "keyword": keyword,
        "monetization_ideas": ideas,
        "total_ideas": len(ideas)
    })

@app.route('/api/generate_key', methods=['POST'])
def generate_api_key():
    """Generate API key for user"""
    try:
        data = request.json
        user_id = data.get('user_id', '')
        plan = data.get('plan', 'free')
        
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400
        
        # Generate API key
        import secrets
        api_key = f"sdf_{secrets.token_hex(16)}"
        
        # Set limits based on plan
        limits = {
            "free": {"daily_limit": 10, "monthly_limit": 100},
            "pro": {"daily_limit": 100, "monthly_limit": 1000},
            "enterprise": {"daily_limit": 1000, "monthly_limit": 10000}
        }
        
        api_keys_db[api_key] = {
            "user_id": user_id,
            "plan": plan,
            "created_at": datetime.now().isoformat(),
            "usage": 0,
            "limits": limits.get(plan, limits["free"])
        }
        
        return jsonify({
            "success": True,
            "api_key": api_key,
            "plan": plan,
            "limits": api_keys_db[api_key]["limits"],
            "created_at": api_keys_db[api_key]["created_at"]
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/validate_key', methods=['POST'])
def validate_api_key():
    """Validate API key"""
    try:
        data = request.json
        api_key = data.get('api_key', '')
        
        if not api_key:
            return jsonify({"error": "API key is required"}), 400
        
        if api_key not in api_keys_db:
            return jsonify({"valid": False, "message": "Invalid API key"})
        
        key_data = api_keys_db[api_key]
        usage = key_data.get("usage", 0)
        limit = key_data.get("limits", {}).get("monthly_limit", 100)
        
        return jsonify({
            "valid": True,
            "plan": key_data.get("plan", "free"),
            "usage": usage,
            "limit": limit,
            "remaining": limit - usage if usage < limit else 0,
            "user_id": key_data.get("user_id")
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/register', methods=['POST'])
def register_user():
    """Register new user"""
    try:
        data = request.json
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        name = data.get('name', '').strip()
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Check if user exists
        if email in users_db:
            return jsonify({"error": "User already exists"}), 409
        
        # Create user
        user_id = f"user_{int(time.time())}_{random.randint(1000, 9999)}"
        users_db[email] = {
            "user_id": user_id,
            "email": email,
            "name": name,
            "password": password,  # In production, hash this!
            "plan": "free",
            "created_at": datetime.now().isoformat(),
            "api_keys": [],
            "searches": 0
        }
        
        return jsonify({
            "success": True,
            "user_id": user_id,
            "email": email,
            "name": name,
            "plan": "free",
            "message": "User registered successfully"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/login', methods=['POST'])
def login_user():
    """Login user"""
    try:
        data = request.json
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Check credentials
        if email not in users_db or users_db[email]["password"] != password:
            return jsonify({"error": "Invalid credentials"}), 401
        
        user = users_db[email]
        
        return jsonify({
            "success": True,
            "user_id": user["user_id"],
            "email": email,
            "name": user["name"],
            "plan": user["plan"],
            "searches": user.get("searches", 0)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/payment/create', methods=['POST'])
def create_payment():
    """Create payment record"""
    try:
        data = request.json
        user_id = data.get('user_id', '')
        amount = data.get('amount', 0)
        plan = data.get('plan', 'pro')
        gateway = data.get('gateway', 'razorpay')
        
        if not user_id or amount <= 0:
            return jsonify({"error": "Invalid payment data"}), 400
        
        # Generate payment ID
        payment_id = f"pay_{int(time.time())}_{random.randint(1000, 9999)}"
        
        # Store payment
        payments_db[payment_id] = {
            "payment_id": payment_id,
            "user_id": user_id,
            "amount": amount,
            "plan": plan,
            "gateway": gateway,
            "status": "pending",
            "created_at": datetime.now().isoformat()
        }
        
        # Generate payment link based on gateway
        payment_links = {
            "razorpay": f"https://razorpay.com/payment/{payment_id}",
            "paypal": f"https://paypal.com/payment/{payment_id}",
            "stripe": f"https://stripe.com/payment/{payment_id}",
            "bank": "BANK_TRANSFER_DETAILS"
        }
        
        return jsonify({
            "success": True,
            "payment_id": payment_id,
            "payment_url": payment_links.get(gateway, "#"),
            "amount": amount,
            "plan": plan,
            "gateway": gateway,
            "status": "pending"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get system statistics"""
    return jsonify({
        "users_count": len(users_db),
        "api_keys_count": len(api_keys_db),
        "payments_count": len(payments_db),
        "total_searches": sum(user.get("searches", 0) for user in users_db.values()),
        "active_plans": {
            "free": len([u for u in users_db.values() if u.get("plan") == "free"]),
            "pro": len([u for u in users_db.values() if u.get("plan") == "pro"]),
            "enterprise": len([u for u in users_db.values() if u.get("plan") == "enterprise"])
        }
    })

# ==================== ADMIN ENDPOINTS ====================
@app.route('/admin/login', methods=['POST'])
def admin_login():
    """Admin login"""
    data = request.json
    username = data.get('username', '')
    password = data.get('password', '')
    
    # Default admin credentials
    if username == 'admin' and password == 'admin123':
        return jsonify({
            "success": True,
            "role": "admin",
            "token": "admin_token_" + str(int(time.time()))
        })
    
    return jsonify({"error": "Invalid admin credentials"}), 401

@app.route('/admin/stats', methods=['GET'])
def admin_stats():
    """Get admin statistics"""
    token = request.headers.get('Authorization', '')
    
    if not token.startswith('admin_token_'):
        return jsonify({"error": "Unauthorized"}), 401
    
    revenue = sum(p.get("amount", 0) for p in payments_db.values() if p.get("status") == "completed")
    
    return jsonify({
        "revenue": {
            "total": revenue,
            "monthly": revenue * 0.1,  # 10% monthly
            "today": revenue * 0.01  # 1% today
        },
        "users": {
            "total": len(users_db),
            "active": len([u for u in users_db.values() if u.get("searches", 0) > 0]),
            "new_today": random.randint(1, 10)
        },
        "payments": {
            "total": len(payments_db),
            "successful": len([p for p in payments_db.values() if p.get("status") == "completed"]),
            "pending": len([p for p in payments_db.values() if p.get("status") == "pending"])
        }
    })

# ==================== FRONTEND SERVING ====================
@app.route('/<path:path>')
def serve_frontend(path):
    """Serve frontend files"""
    try:
        return send_from_directory('../', path)
    except:
        return jsonify({"error": "File not found"}), 404

# ==================== ERROR HANDLERS ====================
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

# ==================== MAIN ====================
if __name__ == '__main__':
    print("=" * 60)
    print("SILENT DEMAND FINDER API SERVER")
    print("=" * 60)
    print("Server starting on: http://localhost:5000")
    print("API Endpoints:")
    print("  • http://localhost:5000/")
    print("  • http://localhost:5000/api/search")
    print("  • http://localhost:5000/api/trends")
    print("  • http://localhost:5000/api/monetization")
    print("  • http://localhost:5000/api/generate_key")
    print("Admin Panel: http://localhost:5000/admin/login.html")
    print("=" * 60)
    
    # Create required directories
    os.makedirs('data', exist_ok=True)
    
    # Start server
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
            )
