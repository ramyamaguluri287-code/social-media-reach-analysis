"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface TrendPoint {
  date: string;
  reach: number;
  impressions: number;
  engagement_rate: number;
}

interface ReachChartProps {
  trend7d: TrendPoint[];
  trend30d: TrendPoint[];
}

export const ReachChart: React.FC<ReachChartProps> = ({ trend7d, trend30d }) => {
  const [period, setPeriod] = useState<"7d" | "30d">("7d");
  const data = period === "7d" ? trend7d : trend30d;

  return (
    <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">Reach & Impression Velocity</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Daily organic reach trajectory across all synchronized social channels
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start">
          <button
            onClick={() => setPeriod("7d")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              period === "7d"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setPeriod("30d")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              period === "30d"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="impGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => {
                  try {
                    const parts = val.split("-");
                    return `${parts[1]}/${parts[2]}`;
                  } catch {
                    return val;
                  }
                }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
                formatter={(value: any, name: string) => [
                  Number(value).toLocaleString(),
                  name === "reach" ? "Organic Reach" : "Total Impressions",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: 16, fontSize: "12px" }}
              />
              <Area
                type="monotone"
                dataKey="reach"
                name="reach"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#reachGradient)"
              />
              <Area
                type="monotone"
                dataKey="impressions"
                name="impressions"
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#impGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No reach data recorded for this time range.
          </div>
        )}
      </div>
    </div>
  );
};
