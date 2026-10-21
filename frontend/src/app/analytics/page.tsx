"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ViralityBadge } from "@/components/ViralityBadge";
import {
  fetchPosts,
  uploadCsvFile,
  getExportCsvUrl,
  Post,
} from "@/lib/api";
import {
  UploadCloud,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowUpDown,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  HelpCircle,
  Sparkles
} from "lucide-react";

export default function AnalyticsPage() {
  const [platform, setPlatform] = useState<string>("all");
  const [riskScore, setRiskScore] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("reach");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [page, setPage] = useState<number>(1);

  const [postsData, setPostsData] = useState<{
    posts: Post[];
    total: number;
    total_pages: number;
  }>({ posts: [], total: 0, total_pages: 1 });

  const [loading, setLoading] = useState<boolean>(true);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await fetchPosts({
        platform,
        risk_score: riskScore,
        search,
        sort_by: sortBy,
        sort_order: sortOrder,
        page,
        limit: 20,
      });
      setPostsData(res);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [platform, riskScore, sortBy, sortOrder, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadPosts();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadMessage(null);

    try {
      const res = await uploadCsvFile(file);
      setUploadMessage({ type: "success", text: res.message || "CSV parsed successfully!" });
      loadPosts();
    } catch (err: any) {
      setUploadMessage({ type: "error", text: err.message || "Failed to process CSV file." });
    } finally {
      setUploadLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const downloadSampleCsv = () => {
    const sampleHeaders = "post_id,likes,comments,shares,reach,impressions,date,platform,hashtags,caption\n";
    const sampleRows = [
      '2001,1540,120,85,18500,24000,2025-10-20,Instagram,"#viral,#reels","Top 5 AI tools that will save you 10 hours a week"',
      '2002,420,35,12,8500,11000,2025-10-18,Twitter,"#tech,#innovation","Why social media algorithms prioritize video retention"',
      '2003,3200,280,190,45000,62000,2025-10-15,YouTube,"#trending,#growth","How we scaled our organic reach without ad spend"'
    ].join("\n");
    const blob = new Blob([sampleHeaders + sampleRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample_social_posts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const getPlatformIcon = (plat: string) => {
    switch (plat?.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-3.5 h-3.5 text-pink-400" />;
      case "youtube":
        return <Youtube className="w-3.5 h-3.5 text-red-400" />;
      case "twitter":
        return <Twitter className="w-3.5 h-3.5 text-sky-400" />;
      case "facebook":
        return <Facebook className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          selectedPlatform={platform}
          onPlatformChange={(p) => {
            setPlatform(p);
            setPage(1);
          }}
          title="Reach Analysis & Virality Engine"
          subtitle="Upload post datasets, compute virality indices, and audit risk scores"
          onRefresh={loadPosts}
        />

        <div className="p-6 space-y-6 max-w-7xl">
          {/* Formula & Rule Explainer Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#141b27] via-[#161f30] to-[#141b27] border border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Calculated Formulae & Virality Thresholds
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Automated metric derivations applied to every synchronized post
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
                  <span className="text-indigo-400 font-semibold">Engagement Rate</span> = (likes + comments + shares) / reach * 100
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
                  <span className="text-cyan-400 font-semibold">Virality Score</span> = shares / reach
                </div>
              </div>
            </div>

            {/* Risk Score Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-400">Green (Viral):</span>{" "}
                  <span className="text-slate-300">Engagement &ge; 5% or Virality &ge; 0.015</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-amber-300">Yellow (Average):</span>{" "}
                  <span className="text-slate-300">Engagement between 2% and 5%</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                <div>
                  <span className="font-bold text-rose-400">Red (Low Reach):</span>{" "}
                  <span className="text-slate-300">Engagement &lt; 2% (Decay Risk)</span>
                </div>
              </div>
            </div>
          </div>

          {/* CSV Upload & Export Actions Bar */}
          <div className="p-5 rounded-2xl bg-[#141b27] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
                id="csv-file-input"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadLoading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{uploadLoading ? "Processing CSV..." : "Upload CSV Data"}</span>
              </button>

              <button
                onClick={downloadSampleCsv}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                title="Download template CSV format"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
                <span>Sample CSV Template</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={getExportCsvUrl()}
                download
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Export Dataset to CSV</span>
              </a>
            </div>
          </div>

          {/* Upload Status Alert */}
          {uploadMessage && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                uploadMessage.type === "success"
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-300"
              }`}
            >
              {uploadMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{uploadMessage.text}</span>
            </div>
          )}

          {/* Table Filters & Search */}
          <div className="p-4 rounded-2xl bg-[#141b27] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by caption, post_id, or hashtag..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </form>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Risk Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Risk Filter:</span>
                <select
                  value={riskScore}
                  onChange={(e) => {
                    setRiskScore(e.target.value);
                    setPage(1);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Scores</option>
                  <option value="Green">Green (Viral)</option>
                  <option value="Yellow">Yellow (Average)</option>
                  <option value="Red">Red (Low Reach)</option>
                </select>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="reach">Organic Reach</option>
                  <option value="engagement_rate">Engagement Rate</option>
                  <option value="virality_score">Virality Score</option>
                  <option value="likes">Likes</option>
                  <option value="shares">Shares</option>
                  <option value="date">Publish Date</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                  title="Toggle Ascending / Descending"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Posts Data Table */}
          <div className="rounded-2xl bg-[#141b27] border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Post & Platform</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4 text-right">Reach</th>
                    <th className="py-3 px-4 text-right">Eng. Rate</th>
                    <th className="py-3 px-4 text-right">Virality Score</th>
                    <th className="py-3 px-4">Risk Status</th>
                    <th className="py-3 px-4 text-right">Engagement Breakdown</th>
                    <th className="py-3 px-4">Top Hashtags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-500">
                        Filtering and updating post records...
                      </td>
                    </tr>
                  ) : postsData.posts.length > 0 ? (
                    postsData.posts.map((post) => (
                      <tr key={post.post_id} className="hover:bg-slate-800/40 transition">
                        {/* Post & Platform */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            <div>
                              <span className="font-mono text-slate-400 block text-[11px]">
                                #{post.post_id}
                              </span>
                              <span className="font-medium text-white truncate max-w-[200px] block" title={post.caption}>
                                {post.caption || `${post.platform} ${post.media_type}`}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                          {post.date}
                          <span className="block text-[10px] text-slate-500">{post.hour}:00</span>
                        </td>

                        {/* Reach */}
                        <td className="py-3.5 px-4 text-right font-bold text-white font-mono">
                          {post.reach.toLocaleString()}
                          <span className="block text-[10px] text-slate-500 font-normal">
                            {post.impressions.toLocaleString()} imp
                          </span>
                        </td>

                        {/* Engagement Rate */}
                        <td className="py-3.5 px-4 text-right font-bold text-emerald-400 font-mono">
                          {post.engagement_rate}%
                        </td>

                        {/* Virality Score */}
                        <td className="py-3.5 px-4 text-right font-bold text-cyan-400 font-mono">
                          {post.virality_score}
                        </td>

                        {/* Risk Status */}
                        <td className="py-3.5 px-4">
                          <ViralityBadge score={post.risk_score} label={post.risk_label} />
                        </td>

                        {/* Breakdown */}
                        <td className="py-3.5 px-4 text-right font-mono text-[11px] text-slate-400">
                          <span className="text-slate-200">{post.likes.toLocaleString()}</span> L ·{" "}
                          <span className="text-slate-200">{post.comments.toLocaleString()}</span> C ·{" "}
                          <span className="text-indigo-300">{post.shares.toLocaleString()}</span> S
                        </td>

                        {/* Hashtags */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {post.hashtags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-indigo-300 font-mono"
                              >
                                {t}
                              </span>
                            ))}
                            {post.hashtags.length > 2 && (
                              <span className="text-[10px] text-slate-500">
                                +{post.hashtags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-500">
                        No posts matching the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>
                Showing <strong className="text-white">{postsData.posts.length}</strong> of{" "}
                <strong className="text-white">{postsData.total}</strong> social posts
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-slate-400">
                  Page {page} of {postsData.total_pages}
                </span>
                <button
                  onClick={() => setPage(Math.min(postsData.total_pages, page + 1))}
                  disabled={page >= postsData.total_pages}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
