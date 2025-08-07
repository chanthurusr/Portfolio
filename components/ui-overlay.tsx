"use client"

import { useState, useEffect } from "react"

export function UI() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2">
          <h1 className="text-white font-bold text-lg">CHANTHURU S R</h1>
          <p className="text-purple-400 text-sm">Full Stack Developer</p>
        </div>

        <div className="flex gap-2">
          <button className="bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
            Download CV
          </button>
          <button className="bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Contact
          </button>
        </div>
      </div>

      {/* Bottom Instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg px-6 py-3 inline-block">
          <p className="text-white text-sm">🖱️ Drag to rotate • 🔍 Scroll to zoom • ✨ Click orbs to navigate</p>
        </div>
      </div>

      {/* Side Panel for Developer Mode */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-auto">
        <button className="bg-green-600/80 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm">
          {"</>"}
        </button>
      </div>
    </div>
  )
}
