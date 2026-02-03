"""
Silent Demand Finder API Documentation

BASE URL: http://localhost:5000

ENDPOINTS:
1. POST /api/analyze
   Analyze a keyword for silent demand
   
   Request Body:
   {
     "keyword": "AI"
   }
   
   Response:
   {
     "success": true,
     "keyword": "ai",
     "analysis": {
       "demand_score": 85,
       "competition_score": 35,
       "monetization_potential": 78,
       "trend_score": 65,
       "keyword": "AI",
       "search_volume": 24500,
       "growth_rate": 25
     },
     "findings": [...],
     "monetization_ideas": [...],
     "recommendations": [...]
   }

2. GET /api/trends
   Get trend data for visualization
   
   Response:
   {
     "success": true,
     "trends": {
       "demand": [45, 52, 60, 68, 75, 82],
       "competition": [65, 60, 55, 50, 45, 40],
       "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
     }
   }

3. POST /api/premium/waitlist
   Join premium waitlist
   
   Request Body:
   {
     "email": "user@example.com"
   }
   
   Response:
   {
     "success": true,
     "message": "Added to waitlist successfully!",
     "position": 42
   }
"""
