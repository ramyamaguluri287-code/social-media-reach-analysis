import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PORT: int = int(os.getenv("PORT", 8000))
    HOST: str = os.getenv("HOST", "0.0.0.0")
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "social_reach_db")
    ENABLE_MOCK_FALLBACK: bool = os.getenv("ENABLE_MOCK_FALLBACK", "true").lower() == "true"
    INSTAGRAM_BASIC_DISPLAY_TOKEN: str = os.getenv("INSTAGRAM_BASIC_DISPLAY_TOKEN", "")
    YOUTUBE_DATA_API_KEY: str = os.getenv("YOUTUBE_DATA_API_KEY", "")
    TWITTER_BEARER_TOKEN: str = os.getenv("TWITTER_BEARER_TOKEN", "")
    NOTIFICATION_EMAIL: str = os.getenv("NOTIFICATION_EMAIL_RECIPIENT", "alerts@reachanalysis.ai")
    NOTIFICATION_WHATSAPP: str = os.getenv("NOTIFICATION_WHATSAPP_NUMBER", "+1234567890")

settings = Settings()
