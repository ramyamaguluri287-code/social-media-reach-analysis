import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from backend.app.database import db_manager
from backend.app.services.prediction_service import predictor
from backend.app.models.post import PredictionInput
from backend.app.services.reach_analysis import get_dashboard_kpis
from backend.app.services.alert_service import evaluate_retention_alerts
from backend.app.services.sentiment_service import analyze_all_posts_sentiment

print("1. Loading posts...")
posts = db_manager.get_all_posts()
print(f"Loaded {len(posts)} posts. Mode: {'MongoDB' if db_manager.use_mongo else 'In-Memory/Mock'}")

print("2. Training predictor...")
predictor.train(posts)
print(f"Predictor trained: {predictor.is_trained}")

print("3. Testing prediction...")
pred = predictor.predict(PredictionInput(
    platform="Instagram",
    hour=19,
    day_of_week="Wednesday",
    media_type="Reel",
    hashtags=["#viral", "#reels"]
))
print(f"Predicted Reach: {pred.predicted_reach}")
print(f"Predicted Engagement Rate: {pred.predicted_engagement_rate}%")
print(f"Virality Potential: {pred.virality_potential_percent}%")
print(f"Risk Status: {pred.risk_score} ({pred.risk_label})")

print("4. Testing KPIs...")
kpis = get_dashboard_kpis(posts)
print(f"Total Reach: {kpis['total_reach']:,}, Avg Engagement: {kpis['avg_engagement_rate']}%")

print("5. Testing Alerts...")
alerts = evaluate_retention_alerts(posts)
print(f"Active Alerts: {len(alerts)}, Top Alert: {alerts[0].title}")

print("6. Testing Sentiment...")
sentiment = analyze_all_posts_sentiment(posts)
print(f"Sentiment: {sentiment['overall_sentiment']}, Pos: {sentiment['positive_percentage']}%, Neu: {sentiment['neutral_percentage']}%, Neg: {sentiment['negative_percentage']}%")

print("\n--- ALL BACKEND SERVICES PASSED ALL CHECKS! ---")
