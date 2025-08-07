"use client"

import { useState, useEffect } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState("")

  const loadingSteps = [
    "Initializing Cyberpunk Matrix...",
    "Loading 3D Components...",
    "Connecting to LeetCode API...",
    "Rendering Skill Constellation...",
    "Preparing Portfolio Data...",
    "Almost Ready...",
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 500)

    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 300)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-teal/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="cyberpunk-grid h-full w-full"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Rotating SRC Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-electric-teal to-neon-blue flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-electric-teal/50 animate-spin-slow">
              SRC
            </div>
            {/* Orbital rings */}
            <div className="absolute inset-0 w-24 h-24 border-2 border-electric-teal/30 rounded-full animate-ping"></div>
            <div className="absolute -inset-2 w-28 h-28 border border-neon-blue/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-electric-teal via-neon-blue to-purple-400 bg-clip-text text-transparent">
            CHANTHURU S R
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 cyberpunk-text">Full-Stack & AI Developer</p>

        {/* Loading Steps */}
        <div className="mb-6">
          <p className="text-electric-teal text-lg font-medium mb-2">
            {loadingSteps[currentStep]}
            {dots}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-electric-teal via-neon-blue to-purple-400 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-white mt-2 text-lg font-semibold">{progress}%</p>
        </div>

        {/* Loading Animation Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-electric-teal rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Tech Stack Preview */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { icon: "⚛️", name: "React" },
            { icon: "🟢", name: "Node.js" },
            { icon: "🐍", name: "Python" },
            { icon: "☕", name: "Java" },
          ].map((tech, index) => (
            <div
              key={tech.name}
              className={`flex items-center space-x-2 p-2 rounded-lg bg-slate-800/50 border border-gray-700 transition-all duration-300 ${
                currentStep > index ? "opacity-100 scale-100" : "opacity-50 scale-95"
              }`}
            >
              <span className="text-lg">{tech.icon}</span>
              <span className="text-gray-300">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Loading Messages */}
        <div className="mt-8 text-xs text-gray-400 space-y-1">
          <p>🚀 Preparing cyberpunk experience...</p>
          <p>💻 Loading interactive 3D elements...</p>
          <p>⚡ Optimizing for best performance...</p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-teal rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
