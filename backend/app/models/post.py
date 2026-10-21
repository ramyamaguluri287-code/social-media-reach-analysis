from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class PostBase(BaseModel):
    post_id: str
    platform: str
    likes: int
    comments: int
    shares: int
    reach: int
    impressions: int
    date: str
    hour: Optional[int] = 12
    media_type: Optional[str] = "Image"
    hashtags: List[str] = Field(default_factory=list)
    caption: Optional[str] = ""
    sample_comments: Optional[List[str]] = Field(default_factory=list)

class PostWithMetrics(PostBase):
    engagement_rate: float
    virality_score: float
    risk_score: str  # Green (Viral), Yellow (Average), Red (Low Reach)
    risk_label: str

class PredictionInput(BaseModel):
    platform: str = "Instagram"
    day_of_week: str = "Wednesday"  # Monday - Sunday
    hour: int = Field(default=19, ge=0, le=23)  # 0 to 23
    media_type: str = "Reel"
    caption: str = "Check out our latest update! #viral #tech"
    hashtags: List[str] = Field(default_factory=lambda: ["#viral", "#reels"])

class PredictionOutput(BaseModel):
    predicted_reach: int
    predicted_impressions: int
    predicted_engagement_rate: float
    predicted_likes: int
    predicted_comments: int
    predicted_shares: int
    virality_potential_percent: float
    risk_score: str
    risk_label: str
    factors: Dict[str, Any]
    optimization_recommendations: List[str]

class SentimentCommentResult(BaseModel):
    text: str
    sentiment: str  # Positive, Neutral, Negative
    compound: float
    pos: float
    neu: float
    neg: float

class SentimentAnalysisResponse(BaseModel):
    overall_sentiment: str
    compound_score: float
    positive_percentage: float
    neutral_percentage: float
    negative_percentage: float
    total_comments_analyzed: int
    sentiment_distribution: Dict[str, int]
    top_positive_comments: List[SentimentCommentResult]
    top_negative_comments: List[SentimentCommentResult]
    recent_comments: List[SentimentCommentResult]

class AlertItem(BaseModel):
    alert_id: str
    severity: str  # RED, YELLOW, GREEN, INFO
    title: str
    message: str
    drop_percentage: float
    metric: str
    timestamp: str
    recommendation: str

class AlertDispatchSimulationRequest(BaseModel):
    alert_id: str
    channel: str  # email or whatsapp
    recipient: Optional[str] = None

class DashboardSummaryResponse(BaseModel):
    total_followers: int
    total_reach: int
    total_impressions: int
    avg_engagement_rate: float
    avg_virality_score: float
    total_likes: int
    total_comments: int
    total_shares: int
    posts_count: int
    reach_change_pct: float
    engagement_change_pct: float
    top_performing_post: Optional[PostWithMetrics]
    reach_trend_7d: List[Dict[str, Any]]
    reach_trend_30d: List[Dict[str, Any]]
    platform_distribution: List[Dict[str, Any]]
    active_alerts: List[AlertItem]
