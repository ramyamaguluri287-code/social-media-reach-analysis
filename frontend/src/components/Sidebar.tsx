"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Sparkles,
  FileText,
  LogOut,
  Radio,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  ShieldAlert
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Reach Analysis",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      label: "AI Prediction",
      href: "/predict",
      icon: Sparkles,
      badge: "AI",
    },
    {
      label: "Reports & Export",
      href: "/reports",
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("social_auth_user");
    router.push("/");
  };

  return (
    <aside className="w-64 bg-[#0d121c] border-r border-slate-800 flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white tracking-tight">ReachAI</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Social Reach Intelligence</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 mb-2">
          Analytics & Growth
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-indigo-500/15 text-indigo-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Connected Channels status */}
        <div className="pt-6">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 mb-2.5">
            Active Social Feeds
          </div>
          <div className="space-y-1.5 px-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram Basic</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connected" />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                <span>YouTube Data v3</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connected" />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Twitter className="w-3.5 h-3.5 text-sky-400" />
                <span>Twitter / X API</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connected" />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Facebook className="w-3.5 h-3.5 text-blue-500" />
                <span>Facebook Pages</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connected" />
            </div>
          </div>
        </div>
      </div>

      {/* User profile & Logout */}
      <div className="p-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              AG
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Growth Lead</p>
              <p className="text-[10px] text-slate-400 truncate">demo@antigravity.ai</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
