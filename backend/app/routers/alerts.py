from fastapi import APIRouter, HTTPException
from typing import List
from backend.app.database import db_manager
from backend.app.services.alert_service import evaluate_retention_alerts, simulate_alert_dispatch
from backend.app.models.post import AlertItem, AlertDispatchSimulationRequest

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])

@router.get("/list", response_model=List[AlertItem])
async def get_alerts_list():
    posts = db_manager.get_all_posts()
    return evaluate_retention_alerts(posts)

@router.post("/simulate-dispatch")
async def dispatch_alert_simulation(payload: AlertDispatchSimulationRequest):
    posts = db_manager.get_all_posts()
    alerts = evaluate_retention_alerts(posts)
    
    selected_alert = next((a for a in alerts if a.alert_id == payload.alert_id), None)
    if not selected_alert:
        if alerts:
            selected_alert = alerts[0]
        else:
            raise HTTPException(status_code=404, detail="Alert not found.")

    result = simulate_alert_dispatch(selected_alert, payload.channel, payload.recipient)
    return result
