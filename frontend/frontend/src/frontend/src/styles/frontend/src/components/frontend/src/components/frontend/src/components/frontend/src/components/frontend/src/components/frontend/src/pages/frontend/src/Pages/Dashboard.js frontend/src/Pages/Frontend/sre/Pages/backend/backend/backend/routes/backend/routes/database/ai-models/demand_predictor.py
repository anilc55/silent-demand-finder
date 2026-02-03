import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import json

class DemandPredictor:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.load_model()
    
    def load_model(self):
        """Load pre-trained model and vectorizer"""
        try:
            self.model = joblib.load('models/demand_model.pkl')
            self.vectorizer = joblib.load('models/vectorizer.pkl')
        except:
            print("Model not found, initializing new model")
            self.initialize_model()
    
    def initialize_model(self):
        """Initialize a new model"""
        self.vectorizer = TfidfVectorizer(max_features=1000)
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
    
    def predict_demand(self, keyword, context=None):
        """Predict demand type and opportunities for a keyword"""
        
        # Mock prediction - in real implementation, this would use actual ML
        predictions = {
            'keyword': keyword,
            'demand_type': self._get_demand_type(keyword),
            'confidence_score': np.random.uniform(0.7, 0.95),
            'search_volume_estimate': int(np.random.uniform(1000, 100000)),
            'competition_score': np.random.uniform(0.1, 0.9),
            'monetization_potential': self._calculate_monetization(keyword),
            'opportunities': self._generate_opportunities(keyword),
            'trend_prediction': self._predict_trend(keyword)
        }
        
        return predictions
    
    def _get_demand_type(self, keyword):
        """Determine demand type based on keyword analysis"""
        demand_types = ['Hidden +', 'Silent Search', 'Emerging Trend', 'Established']
        weights = [0.4, 0.3, 0.2, 0.1]  # Higher weight for hidden/silent
        return np.random.choice(demand_types, p=weights)
    
    def _calculate_monetization(self, keyword):
        """Calculate monetization potential score"""
        score = {
            'affiliate_marketing': np.random.uniform(0.3, 0.9),
            'digital_products': np.random.uniform(0.2, 0.8),
            'services': np.random.uniform(0.1, 0.7),
            'ad_revenue': np.random.uniform(0.4, 0.95),
            'overall_score': np.random.uniform(0.5, 0.9)
        }
        return score
    
    def _generate_opportunities(self, keyword):
        """Generate content opportunities for the keyword"""
        opportunities = []
        
        content_types = [
            'Beginner Guide',
            'Advanced Tutorial',
            'Comparison Review',
            'Problem Solution',
            'Case Study',
            'Tool/Resource List'
        ]
        
        for content_type in content_types[:3]:  # Return top 3
            opportunities.append({
                'type': content_type,
                'title': f"{keyword} - {content_type}",
                'estimated_traffic': int(np.random.uniform(1000, 50000)),
                'competition': np.random.choice(['Low', 'Medium', 'High'], p=[0.4, 0.4, 0.2]),
                'monetization_estimate': f"${int(np.random.uniform(1000, 20000))}/month"
            })
        
        return opportunities
    
    def _predict_trend(self, keyword):
        """Predict trend for next 6 months"""
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        base = np.random.uniform(100, 1000)
        trend = [base * (1 + np.random.uniform(-0.1, 0.3) * i) for i in range(6)]
        
        return {
            'months': months,
            'projected_volume': [int(v) for v in trend],
            'growth_rate': f"{np.random.uniform(5, 40):.1f}%",
            'trend_direction': 'up' if np.random.random() > 0.3 else 'stable'
        }
    
    def batch_predict(self, keywords):
        """Predict for multiple keywords"""
        results = []
        for keyword in keywords:
            results.append(self.predict_demand(keyword))
        return results

# Example usage
if __name__ == "__main__":
    predictor = DemandPredictor()
    
    # Test prediction
    result = predictor.predict_demand("AI Tools 2024")
    print(json.dumps(result, indent=2))
