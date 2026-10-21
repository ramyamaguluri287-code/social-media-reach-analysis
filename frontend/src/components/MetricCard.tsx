import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  subtext?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel = "vs prior period",
  subtext,
  icon,
  variant = "default"
}) => {
  const isPositive = (change ?? 0) > 0;
  const isNeutral = change === 0 || change === undefined;

  const borderClass =
    variant === "danger"
      ? "border-rose-500/40 bg-rose-950/10"
      : variant === "success"
      ? "border-emerald-500/40 bg-emerald-950/10"
      : "border-slate-800 bg-[#141b27]";

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-200 hover:border-slate-700 ${borderClass}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</span>
        {icon && <div className="p-2 rounded-xl bg-slate-800/80 text-indigo-400">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{value}</span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        {change !== undefined && (
          <span
            className={`inline-flex items-center font-semibold px-1.5 py-0.5 rounded ${
              isPositive
                ? "bg-emerald-500/20 text-emerald-400"
                : isNeutral
                ? "bg-slate-700 text-slate-300"
                : "bg-rose-500/20 text-rose-400"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : isNeutral ? (
              <Minus className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {Math.abs(change)}%
          </span>
        )}
        <span className="text-slate-400 truncate">{subtext || changeLabel}</span>
      </div>
    </div>
  );
};
