"use client";

import React, { useState } from "react";
import { HeatmapItem, BestTimeData } from "@/lib/api";
import { Clock, Calendar } from "lucide-react";

interface HeatmapMatrixProps {
  data: BestTimeData | null;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// Highlight major hour slots
const HOURS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

export const HeatmapMatrix: React.FC<HeatmapMatrixProps> = ({ data }) => {
  const [hoveredSlot, setHoveredSlot] = useState<HeatmapItem | null>(null);

  if (!data) {
    return (
      <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800 flex items-center justify-center h-80">
        <span className="text-slate-500 text-sm">Loading best time heatmap...</span>
      </div>
    );
  }

  // Lookup map for day-hour
  const slotMap: Record<string, HeatmapItem> = {};
  data.matrix.forEach((item) => {
    slotMap[`${item.day}-${item.hour}`] = item;
  });

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return "bg-indigo-500 text-white font-bold";
    if (intensity >= 60) return "bg-indigo-600/80 text-white";
    if (intensity >= 40) return "bg-indigo-700/50 text-indigo-200";
    if (intensity >= 20) return "bg-indigo-900/40 text-slate-400";
    return "bg-slate-900/60 text-slate-500";
  };

  return (
    <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Best Time to Post Heatmap
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Historical engagement velocity by Day of Week vs Hour (24h)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Low</span>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded bg-slate-900/60 border border-slate-800" />
            <div className="w-3.5 h-3.5 rounded bg-indigo-900/40" />
            <div className="w-3.5 h-3.5 rounded bg-indigo-700/50" />
            <div className="w-3.5 h-3.5 rounded bg-indigo-600/80" />
            <div className="w-3.5 h-3.5 rounded bg-indigo-500" />
          </div>
          <span>Peak</span>
        </div>
      </div>

      {/* Peak recommendation pill */}
      {data.peak_windows && data.peak_windows.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/30 text-xs text-indigo-300 flex items-start gap-2">
          <span className="font-semibold text-white shrink-0">🎯 Algorithm Recommendation:</span>
          <span>
            Optimal publishing window: <strong className="text-indigo-200">{data.best_day} at {data.best_hour}:00</strong>. Followed by: {data.peak_windows[1] || ""}.
          </span>
        </div>
      )}

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          {/* Header Hours */}
          <div className="grid grid-cols-13 gap-1 mb-1 text-[11px] text-slate-400 text-center font-mono">
            <div className="text-left font-sans text-xs">Day</div>
            {HOURS.map((h) => (
              <div key={`head-${h}`}>{h}:00</div>
            ))}
          </div>

          {/* Days Rows */}
          {DAYS.map((day) => (
            <div key={day} className="grid grid-cols-13 gap-1 mb-1 items-center">
              <div className="text-xs text-slate-300 font-medium truncate pr-2">{day.slice(0, 3)}</div>
              {HOURS.map((hour) => {
                const item = slotMap[`${day}-${hour}`] || {
                  day,
                  hour,
                  reach: 12000,
                  engagement_rate: 3.5,
                  intensity: 40,
                };
                return (
                  <div
                    key={`${day}-${hour}`}
                    onMouseEnter={() => setHoveredSlot(item)}
                    onMouseLeave={() => setHoveredSlot(null)}
                    className={`h-7 rounded-md cursor-pointer flex items-center justify-center text-[10px] transition-all duration-150 hover:ring-2 hover:ring-white/80 heatmap-cell ${getIntensityColor(
                      item.intensity
                    )}`}
                  >
                    {item.engagement_rate}%
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Hover Info Tooltip Bar */}
      <div className="mt-3 min-h-[28px] text-xs text-slate-300 flex items-center justify-between border-t border-slate-800 pt-3">
        {hoveredSlot ? (
          <div>
            <span className="font-semibold text-white">
              {hoveredSlot.day} at {hoveredSlot.hour}:00
            </span>
            {" — "}
            <span className="text-indigo-300">Avg Reach: {hoveredSlot.reach.toLocaleString()}</span>
            {" | "}
            <span className="text-emerald-400">Avg Engagement: {hoveredSlot.engagement_rate}%</span>
          </div>
        ) : (
          <span className="text-slate-500 italic">Hover over any time block to view detailed metrics.</span>
        )}
      </div>
    </div>
  );
};
