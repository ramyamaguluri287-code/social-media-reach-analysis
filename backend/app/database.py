import json
import os
from typing import List, Dict, Any, Optional
from backend.app.config import settings

MOCK_FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "mock_data.json")

# In-memory storage fallback
_in_memory_posts: List[Dict[str, Any]] = []

def load_initial_mock_data() -> List[Dict[str, Any]]:
    global _in_memory_posts
    if os.path.exists(MOCK_FILE_PATH):
        try:
            with open(MOCK_FILE_PATH, "r", encoding="utf-8") as f:
                _in_memory_posts = json.load(f)
                return _in_memory_posts
        except Exception as e:
            print(f"Error loading mock data: {e}")
            _in_memory_posts = []
    return _in_memory_posts

class DatabaseManager:
    def __init__(self):
        self.client = None
        self.db = None
        self.use_mongo = False
        self._init_connection()

    def _init_connection(self):
        try:
            from pymongo import MongoClient
            self.client = MongoClient(settings.MONGODB_URI, serverSelectionTimeoutMS=1500)
            # Trigger quick command to verify connection
            self.client.admin.command('ping')
            self.db = self.client[settings.MONGODB_DB_NAME]
            self.use_mongo = True
            print("Successfully connected to MongoDB")
            
            # Seed mongo if empty
            if self.db.posts.count_documents({}) == 0:
                initial_data = load_initial_mock_data()
                if initial_data:
                    self.db.posts.insert_many([dict(p) for p in initial_data])
                    print(f"Seeded MongoDB with {len(initial_data)} posts.")
        except Exception as e:
            print(f"MongoDB not available ({e}). Using in-memory / JSON mock database.")
            self.use_mongo = False
            load_initial_mock_data()

    def get_all_posts(self, platform: Optional[str] = None) -> List[Dict[str, Any]]:
        if self.use_mongo and self.db is not None:
            try:
                query = {}
                if platform and platform.lower() != "all":
                    query["platform"] = {"$regex": f"^{platform}$", "$options": "i"}
                cursor = self.db.posts.find(query, {"_id": 0})
                return list(cursor)
            except Exception as e:
                print(f"Mongo read error: {e}, falling back to memory")
        
        # In-memory fallback
        if not _in_memory_posts:
            load_initial_mock_data()
            
        if platform and platform.lower() != "all":
            return [p for p in _in_memory_posts if p.get("platform", "").lower() == platform.lower()]
        return list(_in_memory_posts)

    def add_posts(self, new_posts: List[Dict[str, Any]]) -> int:
        global _in_memory_posts
        added = 0
        if self.use_mongo and self.db is not None:
            try:
                self.db.posts.insert_many([dict(p) for p in new_posts])
                added = len(new_posts)
            except Exception as e:
                print(f"Mongo write error: {e}")
                
        # Also maintain in-memory
        for p in new_posts:
            # Avoid duplicate post_ids
            existing = next((item for item in _in_memory_posts if item["post_id"] == p["post_id"]), None)
            if not existing:
                _in_memory_posts.insert(0, p)
                added += 1
                
        # Save back to mock_data.json
        try:
            with open(MOCK_FILE_PATH, "w", encoding="utf-8") as f:
                json.dump(_in_memory_posts, f, indent=2)
        except Exception as e:
            print(f"Failed to persist json: {e}")
            
        return added

    def reset_to_default_mock(self):
        global _in_memory_posts
        load_initial_mock_data()
        if self.use_mongo and self.db is not None:
            try:
                self.db.posts.delete_many({})
                if _in_memory_posts:
                    self.db.posts.insert_many([dict(p) for p in _in_memory_posts])
            except Exception as e:
                print(f"Reset mongo error: {e}")

db_manager = DatabaseManager()
