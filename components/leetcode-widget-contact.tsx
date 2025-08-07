"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Award, Target, Trophy } from "lucide-react"

// Mock data - replace with actual API integration
const mockLeetCodeData = {
  currentRating: 1535,
  maxRating: 1535,
  totalSolved: 547,
  easySolved: 198,
  mediumSolved: 287,
  hardSolved: 62,
  badges: [
    { name: "50 Days Badge 2024", year: "2024", icon: "🏆" },
    { name: "50 Days Badge 2025", year: "2025", icon: "🔥" },
    { name: "Annual Badge 2024", year: "2024", icon: "⭐" },
  ],
  streak: 50,
  ranking: "Top 15%",
}

export function LeetCodeWidget() {
  const [stats, setStats] = useState(mockLeetCodeData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchLeetCodeStats = async () => {
      try {
        // In a real implementation, you would call the LeetCode API here
        setTimeout(() => {
          setStats(mockLeetCodeData)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Failed to fetch LeetCode stats:", error)
        setIsLoading(false)
      }
    }

    fetchLeetCodeStats()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-700">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-orange-500/20">
          <Target className="w-6 h-6 text-orange-400" />
        </div>
        <h3 className="text-xl font-bold text-white">LeetCode Live Stats</h3>
        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium animate-pulse">
          Live
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Rating Card */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-orange-400">Max Rating</h4>
            <TrendingUp className="w-5 h-5 text-orange-400" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-white">{stats.maxRating}</div>
            <div className="text-sm text-gray-400">Current: {stats.currentRating}</div>
            <div className="text-sm text-gray-400">Ranking: {stats.ranking}</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(stats.currentRating / 2000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Problems Solved */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-green-400">Problems Solved</h4>
            <Award className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-bold text-white">{stats.totalSolved}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Easy: {stats.easySolved}</span>
                <span className="text-yellow-400">Medium: {stats.mediumSolved}</span>
                <span className="text-red-400">Hard: {stats.hardSolved}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 h-2">
                <div className="bg-green-400 rounded-l"></div>
                <div className="bg-yellow-400"></div>
                <div className="bg-red-400 rounded-r"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-700">
        <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-electric-blue" />
          <span>Recent Badges</span>
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {stats.badges.map((badge, index) => (
            <div
              key={badge.name}
              className="text-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-electric-blue/20 hover:border-electric-blue/50"
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className="text-sm font-medium text-white mb-1">{badge.name}</div>
              <div className="text-xs text-gray-400">{badge.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-electric-blue/10 border border-electric-blue/20 text-center">
          <div className="text-2xl font-bold text-electric-blue">{stats.streak}</div>
          <div className="text-sm text-gray-400">Day Streak</div>
        </div>
        <div className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/20 text-center">
          <div className="text-2xl font-bold text-neon-green">15%</div>
          <div className="text-sm text-gray-400">Top Ranking</div>
        </div>
      </div>
    </div>
  )
}
