"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Award, Code, ExternalLink, Zap, Target, AlertCircle } from "lucide-react"

interface LeetCodeStats {
  status: string
  message: string
  totalSolved: number
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
  submissionCalendar: Record<string, number>
}

export function LeetCodeWidget() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fallback data in case API fails
  const fallbackStats = {
    totalSolved: 248,
    easySolved: 182,
    mediumSolved: 65,
    hardSolved: 2,
    acceptanceRate: 85.5,
    ranking: 150000,
  }

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("https://leetcode-stats-api.herokuapp.com/CHANTHURU", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.status === "success") {
          setStats(data)
        } else {
          throw new Error(data.message || "Failed to fetch data")
        }
      } catch (error) {
        console.error("Error fetching LeetCode stats:", error)
        setError("Using cached data - API temporarily unavailable")
        // Use fallback data when API fails
        setStats({
          status: "success",
          message: "Fallback data",
          ...fallbackStats,
          totalQuestions: 3000,
          totalEasy: 800,
          totalMedium: 1600,
          totalHard: 600,
          contributionPoints: 0,
          reputation: 0,
          submissionCalendar: {},
        } as LeetCodeStats)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeetCodeStats()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-400/30 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-gray-800/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  const displayStats = stats || fallbackStats

  return (
    <div className="space-y-8">
      {/* Header with Live Status and Total Problems */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-400/30">
            <Code className="w-8 h-8 text-orange-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              LeetCode Performance
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-gray-400">Live Data from LeetCode API</p>
              {error && (
                <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Cached Data</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total Problems Solved - Prominent Display */}
        <div className="text-right">
          <div className="text-5xl font-bold bg-gradient-to-r from-electric-teal to-neon-blue bg-clip-text text-transparent">
            {displayStats.totalSolved}
          </div>
          <div className="text-lg font-semibold text-electric-teal">Problems Solved</div>
          <div className="text-sm text-gray-400">Total on LeetCode</div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Problem Breakdown */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 hover:border-green-400/60 transition-all duration-500 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold text-green-400">Problem Breakdown</h4>
              <Award className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{displayStats.easySolved}</div>
                  <div className="text-xs text-gray-400">Easy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{displayStats.mediumSolved}</div>
                  <div className="text-xs text-gray-400">Medium</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">{displayStats.hardSolved}</div>
                  <div className="text-xs text-gray-400">Hard</div>
                </div>
              </div>
              <div className="text-sm text-gray-400 text-center">
                Out of {stats?.totalQuestions || "3000+"} total problems
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full transition-all duration-1000 relative"
                  style={{ width: `${stats ? (stats.totalSolved / stats.totalQuestions) * 100 : 8.3}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Rate */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold text-blue-400">Acceptance Rate</h4>
              <TrendingUp className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stats?.acceptanceRate?.toFixed(1) || displayStats.acceptanceRate}%
              </div>
              <div className="text-sm text-gray-400">Problem Success Rate</div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-1000 relative"
                  style={{ width: `${stats?.acceptanceRate || displayStats.acceptanceRate}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Difficulty Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Easy Problems */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-green-400 group-hover:rotate-12 transition-transform" />
            <div className="text-3xl font-bold text-green-400">{displayStats.easySolved}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-white mb-1">Easy Solved</div>
            <div className="text-xs text-gray-400 mb-2">{stats?.totalEasy ? `/ ${stats.totalEasy}` : "/ 800+"}</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats ? (stats.easySolved / stats.totalEasy) * 100 : 22.75}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Medium Problems */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <div className="text-3xl font-bold text-yellow-400">{displayStats.mediumSolved}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-white mb-1">Medium Solved</div>
            <div className="text-xs text-gray-400 mb-2">
              {stats?.totalMedium ? `/ ${stats.totalMedium}` : "/ 1600+"}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats ? (stats.mediumSolved / stats.totalMedium) * 100 : 4.06}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Hard Problems */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 hover:border-red-400/60 transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="text-3xl font-bold text-red-400">{displayStats.hardSolved}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-white mb-1">Hard Solved</div>
            <div className="text-xs text-gray-400 mb-2">{stats?.totalHard ? `/ ${stats.totalHard}` : "/ 600+"}</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats ? (stats.hardSolved / stats.totalHard) * 100 : 0.33}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Link with Enhanced Design */}
      <div className="text-center">
        <a
          href="https://leetcode.com/u/CHANTHURU/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-electric-teal/20 via-neon-blue/20 to-purple-500/20 rounded-2xl border border-electric-teal/30 hover:border-electric-teal/60 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric-teal/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <ExternalLink className="w-6 h-6 group-hover:rotate-12 transition-transform relative z-10" />
          <span className="text-lg font-semibold bg-gradient-to-r from-electric-teal to-neon-blue bg-clip-text text-transparent relative z-10">
            View Full LeetCode Profile
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse relative z-10"></div>
        </a>
      </div>
    </div>
  )
}
