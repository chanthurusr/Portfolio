"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function EasterEgg() {
  const [showMeme, setShowMeme] = useState(false)

  useEffect(() => {
    const handleEasterEgg = () => {
      setShowMeme(true)
    }

    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      window.addEventListener("easterEgg", handleEasterEgg)

      return () => {
        window.removeEventListener("easterEgg", handleEasterEgg)
      }
    }
  }, [])

  if (!showMeme) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-electric-teal cyberpunk-modal">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-electric-teal cyberpunk-text">Cyberpunk Tamil Developer Mode! 🔥</h3>
          <button onClick={() => setShowMeme(false)} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🚀</div>
          <h4 className="text-xl font-bold text-white cyberpunk-text">Mass Vara Leave Activated!</h4>
          <p className="text-electric-teal text-lg font-semibold cyberpunk-text">
            "Code-ல கலக்குறேன், Future-ல mass-ஆ build செய்றேன்!"
          </p>
          <p className="text-gray-300 text-sm cyberpunk-text">
            When you unlock the secret Tamil developer mode in a cyberpunk portfolio 😎
          </p>

          <div className="bg-electric-teal/10 p-4 rounded-lg border border-electric-teal/30 cyberpunk-info-box">
            <p className="text-electric-teal font-medium cyberpunk-text">
              🎯 Cyberpunk Tamil Developer
              <br />💻 MERN Stack Specialist
              <br />🤖 AI/ML Enthusiast
              <br />🏆 LeetCode Warrior (1535 Rating)
              <br />🔥 Building the Digital Future!
            </p>
          </div>

          <button
            onClick={() => setShowMeme(false)}
            className="px-6 py-2 bg-gradient-to-r from-electric-teal to-neon-blue rounded-lg font-semibold hover:scale-105 transition-transform cyberpunk-button"
          >
            Back to Matrix
          </button>
        </div>
      </div>
    </div>
  )
}
