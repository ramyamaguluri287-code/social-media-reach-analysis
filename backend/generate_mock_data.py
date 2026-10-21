import json
import random
from datetime import datetime, timedelta

platforms = ["Instagram", "YouTube", "Twitter", "Facebook"]

media_types = {
    "Instagram": ["Reel", "Carousel", "Image", "Story"],
    "YouTube": ["Video", "Short", "Community Post"],
    "Twitter": ["Tweet", "Thread", "Media Tweet"],
    "Facebook": ["Post", "Video", "Photo Album"]
}

hashtag_pool = [
    "#viral", "#trending", "#tech", "#ai", "#creator", "#marketing",
    "#reels", "#growth", "#socialmedia", "#business", "#startup",
    "#motivation", "#innovation", "#contentstrategy", "#community",
    "#datascience", "#futureoftech", "#buildinpublic", "#influencer", "#insights"
]

positive_comments = [
    "This is mind-blowing! Absolutely loved the insights 🔥",
    "Game changer! Shared with my whole marketing team.",
    "Such clean execution and valuable breakdown! 🚀",
    "Super useful content, keep doing what you do!",
    "Best breakdown I have seen all week. Thank you! 🙌",
    "Saved this immediately! Incredible stats."
]

neutral_comments = [
    "What tool did you use for this chart?",
    "Can you share the dataset link?",
    "Does this apply to B2B accounts as well?",
    "Interesting perspective. Waiting for part 2.",
    "Noticed similar trends on LinkedIn too.",
    "What time zone is this timestamp based on?"
]

negative_comments = [
    "Not seeing these results with my account at all.",
    "The reach has been terrible since the new algorithm update 🙄",
    "Disagreed with point #3, that's misleading.",
    "Audio was out of sync on this one.",
    "Feels a bit repetitive compared to last week's post.",
    "Overhyped claims, engagement didn't match."
]

captions = [
    "5 strategies that 10x'd our organic reach this quarter 📈 Break down in thread 👇",
    "Stop posting at random times! Here is what 500,000 impressions taught us about peak hours ⏰",
    "Is the algorithm really suppressing video content? We ran an experiment for 30 days 🧪",
    "Behind the scenes of our highest virality reel of the year 🎬",
    "Top 3 AI tools that will save you 15 hours a week creating social assets 🤖",
    "The harsh truth about organic follower retention in 2025/2026 💡",
    "Step-by-step framework to convert casual viewers into active community members 🎯",
    "Why your engagement rate drops after hitting 10k followers and how to fix it 🛠️",
    "Quick tutorial: How we automate weekly performance reports in under 5 minutes 📊",
    "Case Study: Growing a niche tech audience from 0 to 50k without paid ads 🚀"
]

base_date = datetime(2025, 9, 1)

posts = []
for i in range(1, 101):
    platform = random.choice(platforms)
    date_offset = random.randint(0, 50)
    post_date = (base_date + timedelta(days=date_offset)).strftime("%Y-%m-%d")
    hour = random.choice([8, 10, 12, 14, 17, 18, 19, 20, 21, 22])
    
    # Generate realistic metrics with correlation
    if platform == "Instagram":
        reach = random.randint(3000, 45000)
        impressions = int(reach * random.uniform(1.15, 1.6))
        # Viral vs average vs low
        tier = random.choices(["viral", "average", "low"], weights=[0.2, 0.6, 0.2])[0]
        if tier == "viral":
            reach = random.randint(25000, 65000)
            impressions = int(reach * random.uniform(1.3, 1.8))
            likes = int(reach * random.uniform(0.06, 0.12))
            comments = int(likes * random.uniform(0.04, 0.10))
            shares = int(reach * random.uniform(0.015, 0.04))
        elif tier == "average":
            likes = int(reach * random.uniform(0.03, 0.06))
            comments = int(likes * random.uniform(0.02, 0.05))
            shares = int(reach * random.uniform(0.004, 0.012))
        else:
            likes = int(reach * random.uniform(0.01, 0.025))
            comments = int(likes * random.uniform(0.01, 0.03))
            shares = int(reach * random.uniform(0.001, 0.003))

    elif platform == "YouTube":
        reach = random.randint(5000, 80000)
        impressions = int(reach * random.uniform(1.5, 2.5))
        tier = random.choices(["viral", "average", "low"], weights=[0.25, 0.55, 0.2])[0]
        if tier == "viral":
            reach = random.randint(40000, 120000)
            impressions = int(reach * random.uniform(1.8, 3.0))
            likes = int(reach * random.uniform(0.05, 0.09))
            comments = int(likes * random.uniform(0.05, 0.12))
            shares = int(reach * random.uniform(0.01, 0.03))
        elif tier == "average":
            likes = int(reach * random.uniform(0.025, 0.05))
            comments = int(likes * random.uniform(0.02, 0.06))
            shares = int(reach * random.uniform(0.003, 0.008))
        else:
            likes = int(reach * random.uniform(0.008, 0.02))
            comments = int(likes * random.uniform(0.01, 0.03))
            shares = int(reach * random.uniform(0.0005, 0.002))

    elif platform == "Twitter":
        reach = random.randint(2000, 35000)
        impressions = int(reach * random.uniform(1.2, 1.9))
        tier = random.choices(["viral", "average", "low"], weights=[0.2, 0.6, 0.2])[0]
        if tier == "viral":
            reach = random.randint(20000, 60000)
            likes = int(reach * random.uniform(0.04, 0.08))
            comments = int(likes * random.uniform(0.08, 0.15))
            shares = int(reach * random.uniform(0.02, 0.05)) # retweets
        elif tier == "average":
            likes = int(reach * random.uniform(0.02, 0.04))
            comments = int(likes * random.uniform(0.03, 0.08))
            shares = int(reach * random.uniform(0.005, 0.015))
        else:
            likes = int(reach * random.uniform(0.005, 0.018))
            comments = int(likes * random.uniform(0.01, 0.04))
            shares = int(reach * random.uniform(0.001, 0.004))

    else: # Facebook
        reach = random.randint(1500, 28000)
        impressions = int(reach * random.uniform(1.1, 1.4))
        tier = random.choices(["viral", "average", "low"], weights=[0.15, 0.65, 0.2])[0]
        if tier == "viral":
            reach = random.randint(18000, 50000)
            likes = int(reach * random.uniform(0.05, 0.09))
            comments = int(likes * random.uniform(0.04, 0.09))
            shares = int(reach * random.uniform(0.015, 0.035))
        elif tier == "average":
            likes = int(reach * random.uniform(0.02, 0.045))
            comments = int(likes * random.uniform(0.02, 0.05))
            shares = int(reach * random.uniform(0.003, 0.01))
        else:
            likes = int(reach * random.uniform(0.006, 0.018))
            comments = int(likes * random.uniform(0.01, 0.03))
            shares = int(reach * random.uniform(0.0008, 0.002))

    likes = max(likes, 10)
    comments = max(comments, 2)
    shares = max(shares, 1)

    # Pick 2-4 hashtags
    chosen_tags = random.sample(hashtag_pool, k=random.randint(2, 4))
    if tier == "viral" and "#viral" not in chosen_tags:
        chosen_tags[0] = "#viral"

    # Select comments for sentiment
    sampled_comments = []
    if tier == "viral":
        p_count, n_count, neg_count = 5, 2, 1
    elif tier == "average":
        p_count, n_count, neg_count = 3, 3, 1
    else:
        p_count, n_count, neg_count = 1, 3, 3

    for _ in range(p_count):
        sampled_comments.append(random.choice(positive_comments))
    for _ in range(n_count):
        sampled_comments.append(random.choice(neutral_comments))
    for _ in range(neg_count):
        sampled_comments.append(random.choice(negative_comments))

    random.shuffle(sampled_comments)

    post = {
        "post_id": str(1000 + i),
        "platform": platform,
        "media_type": random.choice(media_types[platform]),
        "likes": likes,
        "comments": comments,
        "shares": shares,
        "reach": reach,
        "impressions": impressions,
        "date": post_date,
        "hour": hour,
        "hashtags": chosen_tags,
        "caption": random.choice(captions),
        "sample_comments": sampled_comments
    }
    posts.append(post)

# Sort by date
posts.sort(key=lambda x: x["date"], reverse=True)

out_path = r"C:\Users\venug\.gemini\antigravity\scratch\social-media-reach-analysis\backend\data\mock_data.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(posts, f, indent=2)

print(f"Generated {len(posts)} posts in {out_path}")
