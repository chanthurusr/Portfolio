"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Target, Zap, ExternalLink } from "lucide-react"

interface LeetCodeProfile {
  totalSolved?: number
  totalQuestions?: number
  easySolved?: number
  totalEasy?: number
  mediumSolved?: number
  totalMedium?: number
  hardSolved?: number
  totalHard?: number
  acceptanceRate?: number
  ranking?: number
}

export function LeetCodeWidget() {
  const [stats, setStats] = useState<LeetCodeProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fallback: LeetCodeProfile = {
    totalSolved: 248,
    totalQuestions: 3400,
    easySolved: 182,
    totalEasy: 850,
    mediumSolved: 65,
    totalMedium: 1775,
    hardSolved: 2,
    totalHard: 775,
    acceptanceRate: 73.5,
    ranking: 420000,
  }

  useEffect(() => {
    let mounted = true
    const fetchStats = async () => {
      try {
        const res = await fetch("https://alfa-leetcode-api.onrender.com/chanthuru/solved")
        if (!res.ok) throw new Error("API error")
        const data = await res.json()
        if (mounted) {
          setStats({
            totalSolved: data.solvedProblem ?? fallback.totalSolved,
            totalQuestions: data.totalQuestions ?? fallback.totalQuestions,
            easySolved: data.easySolved ?? fallback.easySolved,
            totalEasy: data.totalEasy ?? fallback.totalEasy,
            mediumSolved: data.mediumSolved ?? fallback.mediumSolved,
            totalMedium: data.totalMedium ?? fallback.totalMedium,
            hardSolved: data.hardSolved ?? fallback.hardSolved,
            totalHard: data.totalHard ?? fallback.totalHard,
            acceptanceRate: data.acceptanceRate ?? fallback.acceptanceRate,
            ranking: data.ranking ?? fallback.ranking,
          })
        }
      } catch {
        if (mounted) setStats(fallback)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchStats()
    return () => { mounted = false }
  }, [])

  const d = stats || fallback
  const totalPct = d.totalQuestions ? ((d.totalSolved! / d.totalQuestions) * 100).toFixed(1) : "7.3"

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-secondary animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Total solved hero card */}
      <div className="relative p-8 rounded-2xl bg-white border border-border shadow-sm overflow-hidden card-hover">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal via-navy to-teal" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Problems Solved</p>
            <div className="text-6xl font-extrabold bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent heading-text">
              {d.totalSolved}
            </div>
            <p className="text-sm text-muted-foreground mt-1">out of {d.totalQuestions}+ problems ({totalPct}%)</p>
          </div>
          <div className="flex-shrink-0">
            <svg className="w-32 h-32" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke="url(#leetGrad)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${Number(totalPct) * 3.27} ${326.7 - Number(totalPct) * 3.27}`}
                strokeDashoffset="81.7"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="leetGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00b894" />
                  <stop offset="100%" stopColor="#4361ee" />
                </linearGradient>
              </defs>
              <text x="60" y="56" textAnchor="middle" className="fill-foreground text-lg font-bold" fontSize="18">{totalPct}%</text>
              <text x="60" y="72" textAnchor="middle" className="fill-muted-foreground" fontSize="10">solved</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Difficulty cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DifficultyCard
          label="Easy"
          solved={d.easySolved!}
          total={d.totalEasy!}
          color="emerald"
          icon={<Target className="w-5 h-5" />}
        />
        <DifficultyCard
          label="Medium"
          solved={d.mediumSolved!}
          total={d.totalMedium!}
          color="amber"
          icon={<Zap className="w-5 h-5" />}
        />
        <DifficultyCard
          label="Hard"
          solved={d.hardSolved!}
          total={d.totalHard!}
          color="red"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Profile link */}
      <div className="text-center">
        <a
          href="https://leetcode.com/u/CHANTHURU/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-border shadow-sm hover:border-teal/50 hover:shadow-md transition-all duration-300 group"
        >
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-teal transition-colors" />
          <span className="font-medium text-foreground/80 group-hover:text-teal transition-colors">View Full LeetCode Profile</span>
        </a>
      </div>
    </div>
  )
}

function DifficultyCard({
  label,
  solved,
  total,
  color,
  icon,
}: {
  label: string
  solved: number
  total: number
  color: string
  icon: React.ReactNode
}) {
  const pct = total > 0 ? ((solved / total) * 100).toFixed(1) : "0"
  const colorMap: Record<string, { bg: string; text: string; bar: string; border: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-500", border: "border-emerald-200" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", bar: "bg-amber-500", border: "border-amber-200" },
    red: { bg: "bg-red-50", text: "text-red-600", bar: "bg-red-500", border: "border-red-200" },
  }
  const c = colorMap[color]

  return (
    <div className={`p-6 rounded-2xl ${c.bg} border ${c.border} card-hover`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${c.bg} ${c.text}`}>{icon}</div>
        <span className={`text-xs font-semibold ${c.text}`}>{label}</span>
      </div>
      <div className={`text-3xl font-extrabold ${c.text} heading-text`}>{solved}</div>
      <p className="text-sm text-muted-foreground mt-1">/ {total} ({pct}%)</p>
      <div className="mt-3 w-full h-2 bg-white rounded-full overflow-hidden">
        <div
          className={`h-full ${c.bar} rounded-full transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
