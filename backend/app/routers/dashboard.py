from fastapi import APIRouter, Query
from typing import Optional
from backend.app.database import db_manager
from backend.app.services.reach_analysis import get_dashboard_kpis
from backend.app.services.alert_service import evaluate_retention_alerts
from backend.app.models.post import DashboardSummaryResponse

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/summary", response_model=DashboardSummaryResponse)
async def get_dashboard_summary(platform: Optional[str] = Query(None, description="Filter by platform: Instagram, YouTube, Twitter, Facebook, or all")):
    posts = db_manager.get_all_posts(platform=platform)
    kpis = get_dashboard_kpis(posts)
    alerts = evaluate_retention_alerts(posts)
    kpis["active_alerts"] = alerts
    return kpis
