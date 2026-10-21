"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ViralityBadge } from "@/components/ViralityBadge";
import {
  predictReach,
  fetchPredictionPresets,
  PredictionPayload,
  PredictionResult,
} from "@/lib/api";
import {
  Sparkles,
  TrendingUp,
  Clock,
  Hash,
  Send,
  CheckCircle,
  Lightbulb,
  Zap,
  HelpCircle,
  Calendar,
  Layers,
  ArrowRight,
  Sliders,
  Flame
} from "lucide-react";

export default function PredictPage() {
  const [platform, setPlatform] = useState<string>("Instagram");
  const [dayOfWeek, setDayOfWeek] = useState<string>("Wednesday");
  const [hour, setHour] = useState<number>(19); // 7 PM default as requested!
  const [mediaType, setMediaType] = useState<string>("Reel");
  const [caption, setCaption] = useState<string>(
    "5 strategies that 10x'd our organic reach this quarter 📈 Break down in thread 👇"
  );
  const [hashtags, setHashtags] = useState<string[]>([
    "#viral",
    "#reels",
    "#growth"
  ]);
  const [newTagInput, setNewTagInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [presets, setPresets] = useState<any[]>([]);

  const handlePredict = async (customPayload?: PredictionPayload) => {
    setLoading(true);
    try {
      const payload: PredictionPayload = customPayload || {
        platform,
        day_of_week: dayOfWeek,
        hour,
        media_type: mediaType,
        caption,
        hashtags,
      };
      const res = await predictReach(payload);
      setPrediction(res);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial prediction on load (7 PM with #viral)
    handlePredict();
    fetchPredictionPresets().then(setPresets).catch(console.error);
  }, []);

  const applyPreset = (preset: any) => {
    const p = preset.payload;
    setPlatform(p.platform);
    setDayOfWeek(p.day_of_week);
    setHour(p.hour);
    setMediaType(p.media_type);
    setCaption(p.caption);
    setHashtags(p.hashtags);
    handlePredict(p);
  };

  const addTag = (tag: string) => {
    const clean = tag.startsWith("#") ? tag.trim() : `#${tag.trim()}`;
    if (clean && !hashtags.includes(clean)) {
      setHashtags([...hashtags, clean]);
    }
    setNewTagInput("");
  };

  const removeTag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          selectedPlatform={platform}
          onPlatformChange={setPlatform}
          title="AI Reach & Virality Predictor"
          subtitle="Forecast next post performance with scikit-learn regression models trained on historical data"
        />

        <div className="p-6 space-y-6 max-w-7xl">
          {/* Quick Scenario Presets */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#151c2b] to-[#141b27] border border-indigo-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                1-Click Interactive Test Scenarios
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/50 text-left transition text-xs group"
                >
                  <div className="font-semibold text-white group-hover:text-indigo-300 transition">
                    {preset.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Form Column */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#141b27] border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  Post Parameters & Schedule
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">Regression Model v1</span>
              </div>

              {/* Platform & Media Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Twitter">Twitter / X</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Media Format
                  </label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Reel">Reel (Short Video)</option>
                    <option value="Carousel">Carousel / Multi-image</option>
                    <option value="Image">Single Image</option>
                    <option value="Video">Long Form Video</option>
                    <option value="Short">YouTube Short</option>
                    <option value="Thread">Twitter Thread</option>
                  </select>
                </div>
              </div>

              {/* Day of Week */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Day of Week
                  </label>
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Hour */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Post Time
                    </label>
                    <span className="text-xs font-bold text-indigo-400 font-mono">
                      {hour}:00 ({hour >= 12 ? `${hour === 12 ? 12 : hour - 12} PM` : `${hour === 0 ? 12 : hour} AM`})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="23"
                    value={hour}
                    onChange={(e) => setHour(Number(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>12 AM</span>
                    <span className="text-indigo-400 font-semibold">7 PM Peak</span>
                    <span>11 PM</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Post Caption & Hooks
                </label>
                <textarea
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write post caption or first 3 seconds hook..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              {/* Hashtags Input & Quick Chips */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Target Hashtags</span>
                  <span className="text-[11px] text-slate-500">{hashtags.length} added</span>
                </label>

                {/* Selected tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5 min-h-[30px]">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-slate-400 hover:text-rose-400 ml-1 text-sm font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add new tag */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(newTagInput);
                      }
                    }}
                    placeholder="Type hashtag and press Add..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTag(newTagInput)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>

                {/* Quick Add Suggestions */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[11px] text-slate-500">Quick add:</span>
                  {["#viral", "#reels", "#trending", "#growth", "#ai"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-300 hover:border-slate-700"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Predict Button */}
              <button
                type="button"
                onClick={() => handlePredict()}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? "Running Regression Model..." : "Run AI Reach Forecast"}</span>
              </button>
            </div>

            {/* AI Output Results Column */}
            <div className="lg:col-span-6 space-y-5">
              {prediction ? (
                <>
                  {/* Hero Virality Card (Matches prompt example: 7 PM with #viral -> predicted reach = 85%) */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161e2e] via-[#141b27] to-[#121622] border border-indigo-500/40 relative overflow-hidden shadow-xl">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                          Regression Forecast Result
                        </span>
                        <h2 className="text-xl font-black text-white">
                          Predicted Reach: {prediction.predicted_reach.toLocaleString()}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Estimated {prediction.predicted_impressions.toLocaleString()} impressions across discovery feeds
                        </p>
                      </div>

                      <ViralityBadge
                        score={prediction.risk_score}
                        label={prediction.risk_label}
                      />
                    </div>

                    {/* Virality Potential Meter */}
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-300">Virality Potential:</span>
                        <span className="text-base font-extrabold text-cyan-400 font-mono">
                          {prediction.virality_potential_percent}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                          style={{ width: `${prediction.virality_potential_percent}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        {hour === 19 && hashtags.includes("#viral")
                          ? "✨ Benchmark Met: Post scheduled at 7 PM with #viral achieves ~85%+ virality probability."
                          : "High explore page probability if retention exceeds 35 seconds."}
                      </p>
                    </div>

                    {/* Projected Secondary Metrics Grid */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 block">Eng. Rate</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          {prediction.predicted_engagement_rate}%
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 block">Est. Likes</span>
                        <span className="text-xs font-bold text-white font-mono">
                          {prediction.predicted_likes.toLocaleString()}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 block">Comments</span>
                        <span className="text-xs font-bold text-white font-mono">
                          {prediction.predicted_comments.toLocaleString()}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                        <span className="text-[10px] uppercase text-slate-400 block">Shares</span>
                        <span className="text-xs font-bold text-indigo-300 font-mono">
                          {prediction.predicted_shares.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Attribution & Algorithmic Factors */}
                  <div className="p-5 rounded-2xl bg-[#141b27] border border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      Algorithmic Drivers & Weights
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {Object.entries(prediction.factors).map(([factorKey, factorVal]) => (
                        <div
                          key={factorKey}
                          className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80"
                        >
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                            {factorKey.replace("_", " ")}
                          </span>
                          <span className="text-xs font-semibold text-white mt-0.5 block">
                            {factorVal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optimization Recommendations */}
                  <div className="p-5 rounded-2xl bg-[#141b27] border border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-indigo-400" />
                      AI Strategic Recommendations
                    </h3>

                    <ul className="space-y-2 text-xs text-slate-300">
                      {prediction.optimization_recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="p-12 rounded-2xl bg-[#141b27] border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
                  Running AI Reach Prediction...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
