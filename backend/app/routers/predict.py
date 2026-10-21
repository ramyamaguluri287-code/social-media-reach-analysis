from fastapi import APIRouter
from backend.app.models.post import PredictionInput, PredictionOutput
from backend.app.services.prediction_service import predictor

router = APIRouter(prefix="/api/predict", tags=["Prediction"])

@router.post("/reach", response_model=PredictionOutput)
async def predict_post_reach(payload: PredictionInput):
    return predictor.predict(payload)

@router.get("/presets")
async def get_prediction_presets():
    return [
        {
            "name": "🔥 Prime Time Viral Reel (Prompt Example)",
            "description": "7 PM Wednesday Reel with #viral & #reels",
            "payload": {
                "platform": "Instagram",
                "day_of_week": "Wednesday",
                "hour": 19,
                "media_type": "Reel",
                "caption": "5 secrets top creators use to master the algorithm in 2025 #viral #growth",
                "hashtags": ["#viral", "#reels", "#growth"]
            }
        },
        {
            "name": "🎬 High Engagement YouTube Short",
            "description": "YouTube Short on Saturday at 14:00 with tech hashtags",
            "payload": {
                "platform": "YouTube",
                "day_of_week": "Saturday",
                "hour": 14,
                "media_type": "Short",
                "caption": "I tested 10 AI productivity tools so you don't have to #tech #ai #trending",
                "hashtags": ["#tech", "#ai", "#trending"]
            }
        },
        {
            "name": "🐦 Twitter Morning Thought Leadership Thread",
            "description": "Thursday 9 AM thread on engineering insights",
            "payload": {
                "platform": "Twitter",
                "day_of_week": "Thursday",
                "hour": 9,
                "media_type": "Thread",
                "caption": "Why clean architecture will save your startup 6 months of technical debt 🧵👇",
                "hashtags": ["#buildinpublic", "#datascience"]
            }
        },
        {
            "name": "⚠️ Underperforming Off-Peak Post",
            "description": "Monday 3 AM static image with no hashtags",
            "payload": {
                "platform": "Facebook",
                "day_of_week": "Monday",
                "hour": 3,
                "media_type": "Post",
                "caption": "Quick company update.",
                "hashtags": []
            }
        }
    ]
