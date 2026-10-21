"use client";

import React from "react";
import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Layers,
  RotateCcw,
  AlertTriangle
} from "lucide-react";
import { resetDemoData } from "@/lib/api";

interface HeaderProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  title?: string;
  subtitle?: string;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedPlatform,
  onPlatformChange,
  title = "Overview",
  subtitle = "Social Reach & Engagement Intelligence",
  onRefresh,
}) => {
  const platforms = [
    { id: "all", label: "All Feeds", icon: Layers },
    { id: "Instagram", label: "Instagram", icon: Instagram, color: "text-pink-400" },
    { id: "YouTube", label: "YouTube", icon: Youtube, color: "text-red-400" },
    { id: "Twitter", label: "Twitter / X", icon: Twitter, color: "text-sky-400" },
    { id: "Facebook", label: "Facebook", icon: Facebook, color: "text-blue-500" },
  ];

  const handleReset = async () => {
    if (confirm("Reset dataset back to the initial 100 mock social posts?")) {
      await resetDemoData();
      if (onRefresh) onRefresh();
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Platform Filter Buttons */}
        <div className="flex items-center p-1 bg-[#141b27] border border-slate-800 rounded-xl overflow-x-auto">
          {platforms.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onPlatformChange(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${p.color || ""}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          title="Reset to original 100 mock posts"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Reset Mock Data</span>
        </button>
      </div>
    </header>
  );
};
