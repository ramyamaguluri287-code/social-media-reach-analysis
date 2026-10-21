# Social Media Reach Analysis Dashboard — AI Powered

> A production-grade, full-stack intelligence platform that analyzes social media reach, engagement, virality, and predicts future reach for **Instagram, YouTube, Facebook, and Twitter**.

---

## 🚀 Key Features

### 1. Executive Dashboard (`/dashboard`)
- **Core KPI Metrics:** Total Followers (184.5k across channels), Total Reach, Impressions, Average Engagement Rate, and Likes/Comments/Shares velocity.
- **Reach vs. Time Trend Chart:** Interactive Recharts area visualization with 7-Day and 30-Day toggles.
- **Top Performing Post Card:** Automatically highlights the highest reach and engagement post with virality multipliers.
- **Cross-Platform Breakdown:** Performance yield across Instagram, YouTube, Twitter, and Facebook.
- **Flagship Retention Alert Banner:** Immediate visual trigger with 1-click WhatsApp and Email dispatch simulation.

### 2. Reach Analysis Module (`/analytics`)
- **CSV Data Ingestion:** Upload custom social media CSV files with automatic normalization and live regression retraining.
- **Automated Mathematical Formulations:**
  $$\text{Engagement Rate} = \frac{\text{likes} + \text{comments} + \text{shares}}{\text{reach}} \times 100$$
  $$\text{Virality Score} = \frac{\text{shares}}{\text{reach}}$$
- **Algorithmic Risk Tiers:**
  - 🟢 **Green (Viral):** $\text{Engagement Rate} \ge 5.0\%$ or $\text{Virality Score} \ge 0.015$
  - 🟡 **Yellow (Average):** $\text{Engagement Rate}$ between $2.0\%$ and $5.0\%$
  - 🔴 **Red (Low Reach):** $\text{Engagement Rate} < 2.0\%$ (Decay Alert)
- **Interactive Data Grid:** Search, platform filtering, risk scoring, multi-metric sorting, and live CSV export.

### 3. AI Prediction Module (`/predict`)
- **Scikit-Learn Machine Learning:** Trained regression model (`RandomForestRegressor` and `Ridge`) leveraging historical post dynamics.
- **Prompt Specification Example:** Predicts that posting at **7:00 PM (19:00)** with **#viral** yields **~85%+ Virality Potential**.
- **Interactive Controls:** Hour slider (0–23h), day-of-week selection, platform picker, media format (Reels, Carousels, Shorts, Videos), and dynamic hashtag chips.
- **Algorithm Drivers & Recommendations:** Prescriptive suggestions for optimal posting windows and hashtag optimization.

### 4. Audience Sentiment Analysis (VADER NLP)
- **Comment Sentiment Analysis:** Lexicon and rule-based NLP powered by VADER (`vaderSentiment`).
- **Distribution Visualizations:** Interactive Donut / Pie chart displaying Positive, Neutral, and Negative percentages with compound polarity scores.
- **Feedback Highlights:** Top positive endorsements and critical feedback alerts.

### 5. Hashtag & Best Time Heatmap
- **Publishing Matrix:** 7 Days (Monday–Sunday) $\times$ 24 Hours engagement intensity heatmap.
- **Peak Recommendations:** Dynamic detection of optimal posting windows (e.g., Wednesday at 19:00).
- **Hashtag Performance Table:** Reach volume, virality velocity, and engagement yield per hashtag.

### 6. Retention Alert System & Simulation
- **Automated Alert Trigger:** If engagement drops by $>20\%$, a **RED ALERT** is immediately generated:
  > *"Reach Dropped! Reason: Low posting frequency detected."*
- **Dispatch Simulation:** Live modal to simulate sending automated WhatsApp Cloud API messages and formatted SMTP Emails.

### 7. Executive Reports & Export (`/reports`)
- **PDF Export:** Clean print-optimized layout for C-suite presentation via `Export to PDF / Print`.
- **CSV Export:** Complete downloadable dataset of all posts and metrics.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React 18, Tailwind CSS, Recharts, Lucide Icons |
| **Backend** | Python 3.12, FastAPI, Uvicorn, Pydantic v2 |
| **AI / ML** | `scikit-learn` (Regression Models), `vaderSentiment` (NLP Polarity Analysis), `pandas`, `numpy` |
| **Database** | MongoDB (with graceful fallback to in-memory/JSON mock store out-of-the-box) |
| **Dataset** | 100 realistic multi-platform posts (`mock_data.json`) across Instagram, YouTube, Twitter, and Facebook |

---

## 📂 Project Structure

```text
social-media-reach-analysis/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   └── post.py              # Pydantic data schemas & request models
│   │   ├── routers/
│   │   │   ├── dashboard.py         # Summary KPIs & trends endpoint
│   │   │   ├── analytics.py         # Posts table, CSV upload/export
│   │   │   ├── predict.py           # ML regression prediction endpoints
│   │   │   ├── sentiment.py         # VADER sentiment analysis
│   │   │   ├── alerts.py            # Retention alerts & dispatch simulation
│   │   │   └── reports.py           # Executive report summary
│   │   ├── services/
│   │   │   ├── reach_analysis.py    # Formulas, heatmap & hashtag analytics
│   │   │   ├── prediction_service.py # Scikit-Learn training & inference pipeline
│   │   │   ├── sentiment_service.py # VADER polarity & comment NLP
│   │   │   └── alert_service.py     # Velocity drop evaluation & dispatch
│   │   ├── config.py                # App settings & environment loader
│   │   ├── database.py              # Dual-mode (MongoDB + JSON fallback)
│   │   └── main.py                  # FastAPI application entrypoint
│   ├── data/
│   │   └── mock_data.json           # 100 realistic Instagram/YouTube/Twitter posts
│   ├── .env.example                 # Backend environment template
│   ├── requirements.txt             # Python dependencies
│   ├── run.py                       # Server runner script
│   └── test_api.py                  # End-to-end backend test suite
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # / (Hootsuite style Login page)
│   │   │   ├── layout.tsx           # Dark mode root layout
│   │   │   ├── globals.css          # Tailwind & custom CSS
│   │   │   ├── dashboard/page.tsx   # /dashboard page
│   │   │   ├── analytics/page.tsx   # /analytics page
│   │   │   ├── predict/page.tsx     # /predict AI module
│   │   │   └── reports/page.tsx     # /reports executive dossier
│   │   ├── components/
│   │   │   ├── Sidebar.tsx          # Dark Hootsuite navigation
│   │   │   ├── Header.tsx           # Platform filter & refresh actions
│   │   │   ├── MetricCard.tsx       # KPI stat cards
│   │   │   ├── ReachChart.tsx       # Recharts 7d/30d reach velocity
│   │   │   ├── SentimentPie.tsx     # Sentiment Donut chart
│   │   │   ├── HeatmapMatrix.tsx    # 7x24 Best Time Heatmap
│   │   │   ├── ViralityBadge.tsx    # Green/Yellow/Red risk badge
│   │   │   ├── AlertBanner.tsx      # RED Drop Alert banner
│   │   │   └── AlertDispatchModal.tsx # WhatsApp/Email simulator modal
│   │   └── lib/
│   │       └── api.ts               # Full typed API client
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── .env.example
└── README.md
```

---

## ⚡ Setup & Run Instructions

### 1. Prerequisites
- **Python 3.10+** (tested on Python 3.12)
- **Node.js 18+** & **npm**

---

### 2. Backend Setup

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Verify setup and run the built-in test suite:
   ```bash
   python test_api.py
   ```

5. Launch the FastAPI backend server:
   ```bash
   python run.py
   ```
   *The backend will be running at:* `http://localhost:8000`  
   *Interactive Swagger API Docs:* `http://localhost:8000/docs`

> **Note on MongoDB:** If MongoDB is running on `mongodb://localhost:27017`, the backend automatically connects and persists data there. If MongoDB is not running, the application gracefully falls back to the bundled 100-post dataset in `data/mock_data.json` so you can use all features immediately with zero setup.

---

### 3. Frontend Setup

1. Open a second terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 🧭 Page Routes & Walkthrough

| Route | Purpose | Highlights |
| :--- | :--- | :--- |
| `/` | **Login / Authentication** | Hootsuite-inspired dark aesthetic with 1-Click Demo Login |
| `/dashboard` | **Main Dashboard** | KPI cards, 7d/30d reach chart, top post card, RED alert banner, sentiment donut |
| `/analytics` | **Reach Analysis** | CSV file uploader, virality calculations, risk status (Green/Yellow/Red), export to CSV |
| `/predict` | **AI Prediction** | Scikit-learn regression model, 7 PM with #viral preset (85% virality), hour slider |
| `/reports` | **Executive Reports** | C-suite summary, PDF printable report, active alert history, strategic recommendations |

---

## 📄 License
MIT License. Built for advanced social media marketing intelligence and virality prediction.
