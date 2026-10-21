from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.app.config import settings
from backend.app.database import db_manager
from backend.app.services.prediction_service import predictor
from backend.app.routers import (
    dashboard,
    analytics,
    predict,
    sentiment,
    alerts,
    reports
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load posts and train machine learning predictor
    print("Initializing Reach Analysis Backend...")
    posts = db_manager.get_all_posts()
    print(f"Loaded {len(posts)} posts for training.")
    predictor.train(posts)
    print("AI Reach & Engagement Regression models trained successfully.")
    yield
    print("Shutting down Social Media Reach Analysis backend.")

app = FastAPI(
    title="Social Media Reach Analysis Dashboard API",
    description="AI-powered engine for social media reach, virality score, engagement prediction & sentiment analysis.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(predict.router)
app.include_router(sentiment.router)
app.include_router(alerts.router)
app.include_router(reports.router)

@app.get("/")
async def root():
    return {
        "service": "Social Media Reach Analysis AI API",
        "status": "online",
        "version": "1.0.0",
        "endpoints": {
            "dashboard": "/api/dashboard/summary",
            "posts": "/api/analytics/posts",
            "predict": "/api/predict/reach",
            "best_time": "/api/analytics/best-time",
            "hashtags": "/api/analytics/hashtags",
            "sentiment": "/api/sentiment/summary",
            "alerts": "/api/alerts/list",
            "reports": "/api/reports/summary",
            "docs": "/docs"
        }
    }

@app.get("/api/health")
async def health_check():
    posts_count = len(db_manager.get_all_posts())
    return {
        "status": "healthy",
        "database_mode": "MongoDB" if db_manager.use_mongo else "In-Memory/JSON Mock",
        "posts_loaded": posts_count,
        "ai_model_trained": predictor.is_trained
    }
