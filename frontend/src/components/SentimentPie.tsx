"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { SentimentData } from "@/lib/api";
import { Smile, Meh, Frown } from "lucide-react";

interface SentimentPieProps {
  sentiment: SentimentData | null;
}

const COLORS = {
  Positive: "#10b981", // Emerald
  Neutral: "#64748b",  // Slate
  Negative: "#ef4444", // Rose
};

export const SentimentPie: React.FC<SentimentPieProps> = ({ sentiment }) => {
  if (!sentiment) {
    return (
      <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800 flex items-center justify-center h-72">
        <span className="text-slate-500 text-sm">Loading sentiment analysis...</span>
      </div>
    );
  }

  const data = [
    { name: "Positive", value: sentiment.sentiment_distribution.Positive || 0 },
    { name: "Neutral", value: sentiment.sentiment_distribution.Neutral || 0 },
    { name: "Negative", value: sentiment.sentiment_distribution.Negative || 0 },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-white">Audience Comment Sentiment</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            NLP sentiment breakdown using VADER Sentiment Intensity Analyzer
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
          {sentiment.overall_sentiment}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[entry.name as keyof typeof COLORS]}
                    stroke="#141b27"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "10px",
                  fontSize: "12px",
                  color: "#f8fafc",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-white">{sentiment.positive_percentage}%</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Positive</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-300">Positive Comments</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">{sentiment.positive_percentage}%</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <Meh className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-300">Neutral Queries</span>
            </div>
            <span className="text-xs font-bold text-slate-300">{sentiment.neutral_percentage}%</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <Frown className="w-4 h-4 text-rose-400" />
              <span className="text-xs text-slate-300">Negative Feedback</span>
            </div>
            <span className="text-xs font-bold text-rose-400">{sentiment.negative_percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
