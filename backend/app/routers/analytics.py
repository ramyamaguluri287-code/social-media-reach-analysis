import io
import csv
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Query, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from backend.app.database import db_manager
from backend.app.services.reach_analysis import (
    enrich_posts,
    get_best_time_heatmap,
    get_hashtag_analysis,
    calculate_metrics_for_post
)
from backend.app.services.prediction_service import predictor

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/posts")
async def get_posts_analytics(
    platform: Optional[str] = Query(None),
    risk_score: Optional[str] = Query(None, description="Green, Yellow, Red"),
    search: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("date", description="reach, engagement_rate, virality_score, likes, date"),
    sort_order: Optional[str] = Query("desc", description="asc or desc"),
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=200)
):
    raw_posts = db_manager.get_all_posts(platform=platform)
    enriched = enrich_posts(raw_posts)

    # Filter by risk score
    if risk_score and risk_score.lower() != "all":
        enriched = [p for p in enriched if p.get("risk_score", "").lower() == risk_score.lower()]

    # Filter by search
    if search:
        s = search.lower()
        enriched = [
            p for p in enriched
            if s in p.get("caption", "").lower()
            or s in p.get("post_id", "").lower()
            or any(s in tag.lower() for tag in p.get("hashtags", []))
            or s in p.get("platform", "").lower()
        ]

    # Sort
    reverse = (sort_order.lower() == "desc")
    if sort_by in ["reach", "likes", "comments", "shares", "engagement_rate", "virality_score", "impressions"]:
        enriched.sort(key=lambda x: x.get(sort_by, 0), reverse=reverse)
    else:
        enriched.sort(key=lambda x: x.get("date", ""), reverse=reverse)

    total_count = len(enriched)
    start_idx = (page - 1) * limit
    paginated = enriched[start_idx : start_idx + limit]

    return {
        "total": total_count,
        "page": page,
        "limit": limit,
        "total_pages": (total_count + limit - 1) // limit if total_count > 0 else 1,
        "posts": paginated
    }

@router.get("/best-time")
async def get_best_time():
    posts = db_manager.get_all_posts()
    return get_best_time_heatmap(posts)

@router.get("/hashtags")
async def get_hashtags():
    posts = db_manager.get_all_posts()
    return get_hashtag_analysis(posts)

@router.post("/upload-csv")
async def upload_csv_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are accepted.")

    try:
        content = await file.read()
        text_stream = io.StringIO(content.decode("utf-8-sig", errors="ignore"))
        reader = csv.DictReader(text_stream)
        
        parsed_posts = []
        for i, row in enumerate(reader):
            # Normalize column names
            row_clean = {k.strip().lower(): v.strip() for k, v in row.items() if k}
            
            post_id = row_clean.get("post_id") or str(9000 + i)
            platform = row_clean.get("platform", "Instagram").capitalize()
            likes = int(float(row_clean.get("likes", 0)))
            comments = int(float(row_clean.get("comments", 0)))
            shares = int(float(row_clean.get("shares", 0)))
            reach = int(float(row_clean.get("reach", 1000)))
            impressions = int(float(row_clean.get("impressions", reach * 1.3)))
            date = row_clean.get("date", datetime.now().strftime("%Y-%m-%d"))
            caption = row_clean.get("caption", "Uploaded campaign post")
            
            # Hashtags parse
            raw_tags = row_clean.get("hashtags", "")
            if isinstance(raw_tags, str):
                tags = [t.strip() for t in raw_tags.replace(";", ",").split(",") if t.strip()]
            else:
                tags = ["#growth"]

            post_obj = {
                "post_id": post_id,
                "platform": platform,
                "likes": likes,
                "comments": comments,
                "shares": shares,
                "reach": max(reach, 1),
                "impressions": impressions,
                "date": date,
                "hour": 18,
                "media_type": row_clean.get("media_type", "Reel"),
                "hashtags": tags,
                "caption": caption,
                "sample_comments": ["Great post!", "Very interesting stats!"]
            }
            parsed_posts.append(post_obj)

        if not parsed_posts:
            raise HTTPException(status_code=400, detail="No valid post rows found in the uploaded CSV.")

        added_count = db_manager.add_posts(parsed_posts)
        
        # Retrain AI models with updated dataset
        all_posts = db_manager.get_all_posts()
        predictor.train(all_posts)

        return {
            "status": "SUCCESS",
            "message": f"Successfully parsed and ingested {added_count} posts from CSV.",
            "total_posts_now": len(all_posts)
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process CSV: {str(e)}")

@router.get("/export-csv")
async def export_csv():
    posts = db_manager.get_all_posts()
    enriched = enrich_posts(posts)

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "post_id", "platform", "media_type", "date", "hour", "likes", "comments",
        "shares", "reach", "impressions", "engagement_rate", "virality_score",
        "risk_score", "risk_label", "hashtags", "caption"
    ])

    for p in enriched:
        writer.writerow([
            p.get("post_id", ""),
            p.get("platform", ""),
            p.get("media_type", ""),
            p.get("date", ""),
            p.get("hour", ""),
            p.get("likes", 0),
            p.get("comments", 0),
            p.get("shares", 0),
            p.get("reach", 0),
            p.get("impressions", 0),
            p.get("engagement_rate", 0),
            p.get("virality_score", 0),
            p.get("risk_score", ""),
            p.get("risk_label", ""),
            ";".join(p.get("hashtags", [])),
            p.get("caption", "").replace("\n", " ")
        ])

    output.seek(0)
    filename = f"social_media_reach_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@router.post("/reset-demo-data")
async def reset_demo_data():
    db_manager.reset_to_default_mock()
    all_posts = db_manager.get_all_posts()
    predictor.train(all_posts)
    return {"status": "SUCCESS", "message": "Reset to default 100 mock social posts."}
