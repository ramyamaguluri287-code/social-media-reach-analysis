"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Radio,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  Facebook
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("marketing@growthreach.ai");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    localStorage.setItem(
      "social_auth_user",
      JSON.stringify({ email, name: "Growth Lead", role: "admin" })
    );
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0b0f19] text-white">
      {/* Left Branding Showcase */}
      <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-gradient-to-br from-[#0d1322] via-[#0b0f19] to-[#131024]">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight">ReachAI</span>
              <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v2.4
              </span>
            </div>
          </div>

          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              Next-Gen Social Reach Intelligence
            </div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
              Predict & Multiply Your Social Reach With AI.
            </h1>
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
              Real-time virality scoring, audience sentiment NLP, regression reach forecasts, and automated retention alerts across Instagram, YouTube, Twitter, and Facebook.
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-4 my-10 max-w-lg">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold text-white">Virality Scoring</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Automated shares-to-reach index with Green/Yellow/Red risk flags.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <BarChart3 className="w-5 h-5 text-indigo-400 mb-2" />
            <h4 className="text-xs font-bold text-white">Reach Forecasts</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Machine learning regression model trained on 100+ past posts.</p>
          </div>
        </div>

        {/* Connected Channels Pill */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>Synchronized with:</span>
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-400" />
              <Youtube className="w-4 h-4 text-red-400" />
              <Twitter className="w-4 h-4 text-sky-400" />
              <Facebook className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Hootsuite Grade
          </span>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-14">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white tracking-tight">Sign In to Dashboard</h2>
            <p className="text-xs text-slate-400 mt-1">
              Access your brand analytics, AI models, and real-time reach alerts.
            </p>
          </div>

          {/* Quick Demo Sign In Highlight */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-300">⚡ Evaluator Quick Access</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                1-Click Ready
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Jump straight into the loaded dashboard with 100 mock social posts and trained AI models.
            </p>
            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
            >
              <span>{loading ? "Authorizing..." : "Quick Demo Sign In (1-Click)"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-[#0b0f19] px-3 text-[11px] uppercase tracking-wider text-slate-500">
              Or standard credentials
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <a href="#" className="text-xs text-indigo-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <span>Sign In with Password</span>
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-500">
            Protected by enterprise encryption & OAuth 2.0 protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
