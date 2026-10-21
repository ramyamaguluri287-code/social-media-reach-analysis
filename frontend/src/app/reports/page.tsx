"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ViralityBadge } from "@/components/ViralityBadge";
import {
  fetchReportSummary,
  getExportCsvUrl,
} from "@/lib/api";
import {
  Printer,
  Download,
  FileText,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Award,
  Hash,
  Smile,
  ShieldCheck
} from "lucide-react";

export default function ReportsPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadReport = async () => {
    try {
      setLoading(true);
      const res = await fetchReportSummary();
      setReport(res);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19]">
      {/* Hide sidebar when printing */}
      <div className="print:hidden">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="print:hidden">
          <Header
            selectedPlatform="all"
            onPlatformChange={() => {}}
            title="Executive Reach & Retention Report"
            subtitle="C-suite audit report ready for export to PDF or CSV"
            onRefresh={loadReport}
          />
        </div>

        <div className="p-6 space-y-6 max-w-5xl mx-auto w-full">
          {/* Action Header Bar (Hidden in Print) */}
          <div className="print:hidden p-5 rounded-2xl bg-[#141b27] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Comprehensive Performance Dossier
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Download or print this formatted report for stakeholders & marketing directors
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={getExportCsvUrl()}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export CSV</span>
              </a>

              <button
                onClick={handlePrintPdf}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export to PDF / Print</span>
              </button>
            </div>
          </div>

          {/* Printable Report Document Card */}
          {report ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111722] border border-slate-800 text-slate-200 print:bg-white print:text-black print:border-none print:p-0 space-y-8">
              {/* Document Header */}
              <div className="border-b border-slate-800 print:border-slate-300 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-extrabold text-xl tracking-tight text-white print:text-black">
                      ReachAI
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 print:bg-slate-200 print:text-slate-800">
                      EXECUTIVE AUDIT
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-white print:text-black">
                    Social Media Reach Analysis & Virality Report
                  </h1>
                  <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                    Multi-Platform Evaluation across Instagram, YouTube, Twitter & Facebook
                  </p>
                </div>

                <div className="text-xs text-slate-400 print:text-slate-600 sm:text-right font-mono space-y-1">
                  <div>Report ID: <strong className="text-white print:text-black">{report.report_id}</strong></div>
                  <div>Generated: {report.generated_at}</div>
                  <div>Coverage: 100 Synchronized Posts</div>
                </div>
              </div>

              {/* Executive KPI Summary Table */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 mb-3">
                  1. Executive KPI Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                    <span className="text-[10px] uppercase text-slate-400 print:text-slate-600 block">Total Reach</span>
                    <span className="text-lg font-bold text-white print:text-black font-mono">
                      {report.kpis.total_reach.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                    <span className="text-[10px] uppercase text-slate-400 print:text-slate-600 block">Total Impressions</span>
                    <span className="text-lg font-bold text-white print:text-black font-mono">
                      {report.kpis.total_impressions.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                    <span className="text-[10px] uppercase text-slate-400 print:text-slate-600 block">Avg Engagement Rate</span>
                    <span className="text-lg font-bold text-emerald-400 print:text-emerald-700 font-mono">
                      {report.kpis.avg_engagement_rate}%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                    <span className="text-[10px] uppercase text-slate-400 print:text-slate-600 block">Avg Virality Score</span>
                    <span className="text-lg font-bold text-cyan-400 print:text-cyan-700 font-mono">
                      {report.kpis.avg_virality_score}
                    </span>
                  </div>
                </div>
              </div>

              {/* Virality Risk Distribution */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 mb-3">
                  2. Content Virality Risk Distribution
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 print:bg-emerald-50 border border-emerald-500/30">
                    <span className="text-xs font-bold text-emerald-400 print:text-emerald-800 block">
                      Green (Viral Reach)
                    </span>
                    <span className="text-xl font-black text-emerald-300 print:text-emerald-900 font-mono">
                      {report.risk_breakdown.green_pct}%
                    </span>
                    <span className="text-[11px] text-slate-400 print:text-slate-600 block mt-0.5">
                      {report.risk_breakdown.green_viral} posts exceeding 5% engagement
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-950/20 print:bg-amber-50 border border-amber-500/30">
                    <span className="text-xs font-bold text-amber-400 print:text-amber-800 block">
                      Yellow (Average Reach)
                    </span>
                    <span className="text-xl font-black text-amber-300 print:text-amber-900 font-mono">
                      {report.risk_breakdown.yellow_pct}%
                    </span>
                    <span className="text-[11px] text-slate-400 print:text-slate-600 block mt-0.5">
                      {report.risk_breakdown.yellow_average} posts in 2% - 5% range
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-950/20 print:bg-rose-50 border border-rose-500/30">
                    <span className="text-xs font-bold text-rose-400 print:text-rose-800 block">
                      Red (Low Reach / Decay)
                    </span>
                    <span className="text-xl font-black text-rose-300 print:text-rose-900 font-mono">
                      {report.risk_breakdown.red_pct}%
                    </span>
                    <span className="text-[11px] text-slate-400 print:text-slate-600 block mt-0.5">
                      {report.risk_breakdown.red_low_reach} posts underperforming
                    </span>
                  </div>
                </div>
              </div>

              {/* Audience NLP Sentiment Breakdown */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 mb-3">
                  3. Audience NLP Sentiment Summary (VADER)
                </h3>
                <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300 flex items-center justify-between flex-wrap gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 print:text-slate-600">Overall Sentiment:</span>{" "}
                    <strong className="text-white print:text-black font-semibold">
                      {report.sentiment_overview.overall}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-600">Positive:</span>{" "}
                    <strong className="text-emerald-400 print:text-emerald-700">
                      {report.sentiment_overview.positive_pct}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-600">Neutral:</span>{" "}
                    <strong className="text-slate-300 print:text-slate-700">
                      {report.sentiment_overview.neutral_pct}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-600">Negative:</span>{" "}
                    <strong className="text-rose-400 print:text-rose-700">
                      {report.sentiment_overview.negative_pct}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-600">Compound Polarity:</span>{" "}
                    <strong className="font-mono text-cyan-400 print:text-cyan-800">
                      {report.sentiment_overview.compound}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Top 5 Performing Posts */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 mb-3">
                  4. Top 5 Highest Reach Social Posts
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-800 print:border-slate-300">
                    <thead className="bg-slate-900 print:bg-slate-200 text-slate-400 print:text-slate-800 font-semibold text-[10px] uppercase">
                      <tr>
                        <th className="p-2.5">Post ID</th>
                        <th className="p-2.5">Platform</th>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5 text-right">Reach</th>
                        <th className="p-2.5 text-right">Eng. Rate</th>
                        <th className="p-2.5 text-right">Virality</th>
                        <th className="p-2.5">Risk Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 print:divide-slate-300 text-slate-300 print:text-slate-800">
                      {report.top_5_posts.map((p: any) => (
                        <tr key={p.post_id}>
                          <td className="p-2.5 font-mono">#{p.post_id}</td>
                          <td className="p-2.5">{p.platform} ({p.media_type})</td>
                          <td className="p-2.5 font-mono">{p.date}</td>
                          <td className="p-2.5 text-right font-bold text-white print:text-black font-mono">
                            {p.reach.toLocaleString()}
                          </td>
                          <td className="p-2.5 text-right font-bold text-emerald-400 print:text-emerald-700 font-mono">
                            {p.engagement_rate}%
                          </td>
                          <td className="p-2.5 text-right font-mono text-cyan-400 print:text-cyan-800">
                            {p.virality_score}
                          </td>
                          <td className="p-2.5">
                            <span className="font-bold">{p.risk_score}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Retention & Drop Alerts */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 print:text-rose-800 mb-3">
                  5. Automated Retention Alerts Triggered
                </h3>
                <div className="space-y-2.5">
                  {report.active_alerts.map((al: any) => (
                    <div
                      key={al.alert_id}
                      className="p-3.5 rounded-xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-rose-400 print:text-rose-800">{al.title}</strong>
                        <span className="font-mono text-[11px] text-slate-400 print:text-slate-600">
                          {al.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-300 print:text-slate-800">{al.message}</p>
                      <p className="text-slate-400 print:text-slate-600 mt-1">
                        <strong>Action:</strong> {al.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic AI Recommendations */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 mb-3">
                  6. AI Strategic Recommendations & Next Steps
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 print:text-slate-800">
                  {report.ai_strategic_recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 print:text-emerald-700 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sign-off footer */}
              <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex items-center justify-between text-[11px] text-slate-500 print:text-slate-600">
                <span>Certified by ReachAI Machine Learning Engine</span>
                <span>Confidential — Internal Growth Team Use Only</span>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#141b27] border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
              Compiling Executive Audit Report...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
