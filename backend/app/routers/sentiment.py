from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from backend.app.database import db_manager
from backend.app.services.sentiment_service import analyze_all_posts_sentiment, analyze_comments
from backend.app.models.post import SentimentAnalysisResponse

router = APIRouter(prefix="/api/sentiment", tags=["Sentiment Analysis"])

class CustomSentimentRequest(BaseModel):
    comments: List[str]

@router.get("/summary", response_model=SentimentAnalysisResponse)
async def get_sentiment_summary(platform: Optional[str] = None):
    posts = db_manager.get_all_posts(platform=platform)
    return analyze_all_posts_sentiment(posts)

@router.post("/analyze-custom", response_model=SentimentAnalysisResponse)
async def analyze_custom_comments(payload: CustomSentimentRequest):
    return analyze_comments(payload.comments)
