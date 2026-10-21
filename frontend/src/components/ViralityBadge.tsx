import React from "react";

interface ViralityBadgeProps {
  score: "Green" | "Yellow" | "Red" | string;
  label?: string;
  className?: string;
}

export const ViralityBadge: React.FC<ViralityBadgeProps> = ({ score, label, className = "" }) => {
  const normalized = score?.toLowerCase() || "yellow";

  if (normalized.includes("green") || normalized.includes("viral")) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {label || "Viral Reach"}
      </span>
    );
  }

  if (normalized.includes("yellow") || normalized.includes("average")) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        {label || "Average Reach"}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
      {label || "Low Reach / Risk"}
    </span>
  );
};
