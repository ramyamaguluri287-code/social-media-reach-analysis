"use client";

import React, { useState } from "react";
import { Alert } from "@/lib/api";
import { AlertDispatchModal } from "./AlertDispatchModal";
import { AlertTriangle, MessageSquare, Mail, ChevronRight, Zap } from "lucide-react";

interface AlertBannerProps {
  alerts: Alert[];
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ alerts }) => {
  const [activeAlertModal, setActiveAlertModal] = useState<Alert | null>(null);

  if (!alerts || alerts.length === 0) return null;

  // Find the primary RED alert
  const redAlert = alerts.find((a) => a.severity === "RED") || alerts[0];

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/70 via-[#1e131d] to-[#141b27] border border-rose-500/40 p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-rose-500 text-white">
                  RED ALERT
                </span>
                <span className="text-xs font-semibold text-rose-300">
                  Engagement Drop: -{redAlert.drop_percentage}%
                </span>
                <span className="text-[11px] text-slate-400">({redAlert.timestamp})</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {redAlert.title}
              </h4>
              <p className="text-xs text-rose-200/80 mt-1 max-w-2xl">
                {redAlert.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => setActiveAlertModal(redAlert)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition"
              title="Simulate WhatsApp notification"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Alert</span>
            </button>

            <button
              onClick={() => setActiveAlertModal(redAlert)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition"
              title="Simulate Email notification"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Email Alert</span>
            </button>
          </div>
        </div>
      </div>

      <AlertDispatchModal
        alert={activeAlertModal}
        isOpen={!!activeAlertModal}
        onClose={() => setActiveAlertModal(null)}
      />
    </>
  );
};
