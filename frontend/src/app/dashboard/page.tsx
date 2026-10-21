"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { ReachChart } from "@/components/ReachChart";
import { SentimentPie } from "@/components/SentimentPie";
import { HeatmapMatrix } from "@/components/HeatmapMatrix";
import { AlertBanner } from "@/components/AlertBanner";
import { ViralityBadge } from "@/components/ViralityBadge";
import {
  fetchDashboardSummary,
  fetchSentimentSummary,
  fetchBestTime,
  DashboardSummary,
  SentimentData,
  BestTimeData,
} from "@/lib/api";
import {
  Users,
  Eye,
  Activity,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Award
} from "lucide-react";

export default function DashboardPage() {
  const [platform, setPlatform] = useState<string>("all");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [bestTime, setBestTime] = useState<BestTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (plat = platform) => {
    try {
      setLoading(true);
      setError(null);
      const [sumRes, sentRes, btRes] = await Promise.all([
        fetchDashboardSummary(plat),
        fetchSentimentSummary(plat),
        fetchBestTime(),
      ]);
      setSummary(sumRes);
      setSentiment(sentRes);
      setBestTime(btRes);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(platform);
  }, [platform]);

  const getPlatformIcon = (plat: string) => {
    switch (plat?.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case "youtube":
        return <Youtube className="w-4 h-4 text-red-400" />;
      case "twitter":
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case "facebook":
        return <Facebook className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          selectedPlatform={platform}
          onPlatformChange={setPlatform}
          title="Social Reach & Engagement Dashboard"
          subtitle="AI-Powered Performance Insights, Predictive Forecasts & Virality Metrics"
          onRefresh={() => loadData(platform)}
        />

        <div className="p-6 space-y-6 max-w-7xl">
          {/* Error Banner if Backend is offline */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between">
              <span>Backend connection error: {error}. Verify FastAPI is running at http://localhost:8000.</span>
              <button
                onClick={() => loadData(platform)}
                className="px-3 py-1 rounded bg-rose-600 text-white font-semibold text-xs"
              >
                Retry
              </button>
            </div>
          )}

          {/* Retention & Drop Alert Banner (RED ALERT prompt requirement) */}
          {summary && summary.active_alerts && (
            <AlertBanner alerts={summary.active_alerts} />
          )}

          {/* Core KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Followers"
              value={summary ? summary.total_followers.toLocaleString() : "184,500"}
              change={4.2}
              changeLabel="network growth"
              subtext="across 4 connected channels"
              icon={<Users className="w-4 h-4" />}
            />

            <MetricCard
              title="Total Reach"
              value={summary ? summary.total_reach.toLocaleString() : "..."}
              change={summary?.reach_change_pct}
              subtext="organic reach (WoW)"
              icon={<Eye className="w-4 h-4" />}
            />

            <MetricCard
              title="Avg Engagement Rate"
              value={summary ? `${summary.avg_engagement_rate}%` : "..."}
              change={summary?.engagement_change_pct}
              variant={summary && summary.avg_engagement_rate >= 5.0 ? "success" : "default"}
              subtext="likes+comments+shares/reach"
              icon={<Activity className="w-4 h-4" />}
            />

            <MetricCard
              title="Avg Likes / Comments"
              value={
                summary && summary.posts_count > 0
                  ? `${Math.round(summary.total_likes / summary.posts_count)} / ${Math.round(
                      summary.total_comments / summary.posts_count
                    )}`
                  : "..."
              }
              subtext={`total ${summary?.total_shares.toLocaleString() || 0} shares recorded`}
              icon={<Heart className="w-4 h-4" />}
            />
          </div>

          {/* Main Chart + Top Performing Post Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reach vs Time Graph (7d / 30d) */}
            <div className="lg:col-span-2">
              <ReachChart
                trend7d={summary?.reach_trend_7d || []}
                trend30d={summary?.reach_trend_30d || []}
              />
            </div>

            {/* Top Performing Post Card */}
            <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-semibold text-white">Top Performing Post</h3>
                  </div>
                  {summary?.top_performing_post && (
                    <ViralityBadge
                      score={summary.top_performing_post.risk_score}
                      label={summary.top_performing_post.risk_label}
                    />
                  )}
                </div>

                {summary?.top_performing_post ? (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        {getPlatformIcon(summary.top_performing_post.platform)}
                        <span className="font-semibold text-white">
                          {summary.top_performing_post.platform}
                        </span>
                        <span>• {summary.top_performing_post.media_type}</span>
                      </div>
                      <span>{summary.top_performing_post.date}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 italic">
                      "{summary.top_performing_post.caption}"
                    </p>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5">
                      {summary.top_performing_post.hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] uppercase text-slate-400 block">Reach</span>
                        <span className="text-xs font-bold text-white">
                          {summary.top_performing_post.reach.toLocaleString()}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] uppercase text-slate-400 block">Engagement</span>
                        <span className="text-xs font-bold text-emerald-400">
                          {summary.top_performing_post.engagement_rate}%
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] uppercase text-slate-400 block">Virality</span>
                        <span className="text-xs font-bold text-cyan-400">
                          {summary.top_performing_post.virality_score}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-44 flex items-center justify-center text-slate-500 text-xs">
                    Loading top post metrics...
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Engagement multiplier:</span>
                <span className="font-bold text-indigo-400">2.6x above account avg</span>
              </div>
            </div>
          </div>

          {/* Sentiment Analysis & Best Time to Post Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentPie sentiment={sentiment} />
            <HeatmapMatrix data={bestTime} />
          </div>

          {/* Connected Platforms Breakdown */}
          {summary?.platform_distribution && summary.platform_distribution.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800">
              <h3 className="text-base font-semibold text-white mb-1">
                Cross-Platform Distribution Breakdown
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Comparison of organic reach volume and engagement yield across channels
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {summary.platform_distribution.map((item) => (
                  <div
                    key={item.platform}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(item.platform)}
                        <span className="text-xs font-bold text-white">{item.platform}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.posts_count} posts
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Total Reach:</span>
                        <span className="font-bold text-white">{item.reach.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Avg Engagement:</span>
                        <span className="font-bold text-emerald-400">{item.avg_engagement}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
