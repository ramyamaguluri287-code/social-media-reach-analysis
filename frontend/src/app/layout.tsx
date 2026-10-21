import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReachAI | Social Media Reach Analysis Dashboard",
  description: "AI-powered social media reach, virality score, engagement prediction & sentiment analysis dashboard for Instagram, YouTube, Facebook, and Twitter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f19] text-slate-100 min-h-screen antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
