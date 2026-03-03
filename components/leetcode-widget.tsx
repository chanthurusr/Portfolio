"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Target, Zap, ExternalLink } from "lucide-react"

interface LeetCodeData {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  ranking: number
  reputation: number
}

const fallback: LeetCodeData = {
  totalSolved: 248,
  totalQuestions: 3400,
  easySolved: 182,
  totalEasy: 850,
  mediumSolved: 65,
  totalMedium: 1775,
  hardSolved: 2,
  totalHard: 775,
  ranking: 420000,
  reputation: 0,
}

export function LeetCodeWidget() {
  const [stats, setStats] = useState<LeetCodeData>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        const res = await fetch("https://alfa-leetcode-api.onrender.com/chanthuru/solved")
        if (!res.ok) throw new Error("Failed")
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
            ranking: data.ranking ?? fallback.ranking,
            reputation: data.reputation ?? 0,
          })
        }
      } catch {
        if (mounted) setStats(fallback)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchData()
    return () => { mounted = false }
  }, [])

  const totalPct = stats.totalQuestions > 0 ? ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1) : "0"

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-36 rounded-2xl bg-secondary animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Total solved */}
      <div className="p-8 rounded-2xl bg-card border border-border shadow-sm card-hover">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Problems Solved</p>
            <div className="text-6xl font-extrabold bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent heading-text">
              {stats.totalSolved}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              out of {stats.totalQuestions}+ problems ({totalPct}%)
            </p>
          </div>
          <svg className="w-28 h-28 flex-shrink-0" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(40 15% 93%)" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke="url(#lcGrad)" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${Number(totalPct) * 3.27} ${326.7 - Number(totalPct) * 3.27}`}
              strokeDashoffset="81.7"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="lcGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00b894" />
                <stop offset="100%" stopColor="#4361ee" />
              </linearGradient>
            </defs>
            <text x="60" y="56" textAnchor="middle" fill="hsl(220 25% 12%)" fontWeight="700" fontSize="18">{totalPct}%</text>
            <text x="60" y="72" textAnchor="middle" fill="hsl(220 10% 46%)" fontSize="10">solved</text>
          </svg>
        </div>
      </div>

      {/* Difficulty cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "#10b981", bg: "bg-emerald-50", border: "border-emerald-200", textColor: "text-emerald-600", icon: <Target className="w-5 h-5" /> },
          { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "#f59e0b", bg: "bg-amber-50", border: "border-amber-200", textColor: "text-amber-600", icon: <Zap className="w-5 h-5" /> },
          { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "#ef4444", bg: "bg-red-50", border: "border-red-200", textColor: "text-red-600", icon: <TrendingUp className="w-5 h-5" /> },
        ].map((d) => {
          const pct = d.total > 0 ? ((d.solved / d.total) * 100).toFixed(1) : "0"
          return (
            <div key={d.label} className={`p-5 rounded-2xl ${d.bg} border ${d.border} card-hover`}>
              <div className="flex items-center justify-between mb-3">
                <div className={d.textColor}>{d.icon}</div>
                <span className={`text-xs font-bold ${d.textColor}`}>{d.label}</span>
              </div>
              <div className={`text-3xl font-extrabold ${d.textColor} heading-text`}>{d.solved}</div>
              <p className="text-xs text-muted-foreground mt-1">/ {d.total} ({pct}%)</p>
              <div className="mt-3 h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: d.color }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Profile link */}
      <div className="text-center">
        <a
          href="https://leetcode.com/u/CHANTHURU/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border shadow-sm hover:border-teal/50 hover:shadow-md transition-all duration-300 group"
        >
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-teal transition-colors" />
          <span className="font-medium text-foreground/80 group-hover:text-teal transition-colors">View Full LeetCode Profile</span>
        </a>
      </div>
    </div>
  )
}
