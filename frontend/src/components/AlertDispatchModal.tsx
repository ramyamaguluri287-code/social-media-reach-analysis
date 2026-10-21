"use client";

import React, { useState } from "react";
import { Alert, simulateAlertDispatch } from "@/lib/api";
import { X, Send, Mail, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";

interface AlertDispatchModalProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AlertDispatchModal: React.FC<AlertDispatchModalProps> = ({
  alert,
  isOpen,
  onClose,
}) => {
  const [channel, setChannel] = useState<"email" | "whatsapp">("whatsapp");
  const [recipient, setRecipient] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen || !alert) return null;

  const handleDispatch = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await simulateAlertDispatch(
        alert.alert_id,
        channel,
        recipient || undefined
      );
      setResult(res);
    } catch (e: any) {
      setResult({ status: "ERROR", message: e.message || "Failed to dispatch" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-[#131a26] border border-slate-700 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              {alert.severity} ALERT TRIGGERED
            </span>
            <h2 className="text-lg font-bold text-white">{alert.title}</h2>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-5 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-400">
            <span>Impact:</span>
            <span className="font-semibold text-rose-400">-{alert.drop_percentage}% ({alert.metric})</span>
          </div>
          <div className="text-slate-300">
            <strong>Reason:</strong> {alert.message}
          </div>
          <div className="text-slate-400 pt-1 border-t border-slate-800">
            <strong>AI Remedy:</strong> {alert.recommendation}
          </div>
        </div>

        {/* Channel Selection */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Select Simulation Channel:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setChannel("whatsapp");
                setRecipient("+1 (555) 019-2834");
                setResult(null);
              }}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition ${
                channel === "whatsapp"
                  ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              WhatsApp Alert
            </button>
            <button
              type="button"
              onClick={() => {
                setChannel("email");
                setRecipient("growth-team@brand.com");
                setResult(null);
              }}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition ${
                channel === "email"
                  ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              Email Alert
            </button>
          </div>
        </div>

        {/* Recipient Input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Target Recipient (Simulated):
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={channel === "whatsapp" ? "+1 (555) 019-2834" : "growth-team@brand.com"}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Dispatch Button */}
        <button
          onClick={handleDispatch}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {isLoading ? (
            <span>Simulating Network Dispatch...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              Fire Simulated {channel === "whatsapp" ? "WhatsApp" : "Email"} Retention Alert
            </>
          )}
        </button>

        {/* Result Preview */}
        {result && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-900 border border-slate-700 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span>{result.dispatch_status || "Simulated Payload Generated"}</span>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 bg-black/40 p-2.5 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {result.body}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
