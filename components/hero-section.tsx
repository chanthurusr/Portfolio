"use client"

import { Github, Linkedin, Code, Sparkles, Zap, Download } from "lucide-react"
import { HolographicCPU } from "./holographic-cpu"

export function HeroSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 cyberpunk-grid opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-teal/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-teal rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float-gentle ${3 + Math.random() * 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          {/* Greeting with Enhanced Animation */}
          <div className="flex items-center space-x-3 animate-fade-in">
            <Sparkles className="w-6 h-6 text-electric-teal animate-spin" />
            <span className="text-electric-teal text-lg font-medium cyberpunk-text">வணக்கம் 🙏</span>
            <Zap className="w-5 h-5 text-neon-blue animate-bounce" />
          </div>

          <div className="space-y-6">
            {/* Enhanced Name with Gradient Animation */}
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-electric-teal to-neon-blue bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block cyberpunk-glow">
                CHANTHURU
              </span>
              <br />
              <span className="text-electric-teal hover:text-neon-blue transition-colors duration-300 cyberpunk-glow">
                S R
              </span>
            </h1>

            {/* Enhanced Title with Terminal Effect */}
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-300 terminal-text font-mono">
                Full-Stack & AI Developer_
              </h2>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-electric-teal to-neon-blue animate-expand-line"></div>
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-gray-700/50 hover:border-electric-teal/30 transition-all duration-500 cyberpunk-card">
            <p className="text-xl text-gray-300 leading-relaxed cyberpunk-text">
              B.E. Computer Science and Engineering student at{" "}
              <span className="text-electric-teal font-semibold">Nandha Engineering College</span>, passionate about
              full-stack development and artificial intelligence. Specializing in{" "}
              <span className="text-neon-blue font-semibold">MERN stack</span> and creating intelligent web solutions
              that bridge the gap between technology and user experience.
            </p>
            <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex space-x-6">
            {[
              {
                icon: <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />,
                href: "https://github.com/chanthurusr",
                label: "GitHub",
                color: "hover:text-white",
                bgGradient: "from-gray-600/20 to-gray-800/20",
              },
              {
                icon: <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />,
                href: "https://www.linkedin.com/in/chanthuru-s-r-678220267/",
                label: "LinkedIn",
                color: "hover:text-blue-400",
                bgGradient: "from-blue-600/20 to-blue-800/20",
              },
              {
                icon: <Code className="w-6 h-6 group-hover:scale-110 transition-transform" />,
                href: "https://leetcode.com/u/CHANTHURU/",
                label: "LeetCode",
                color: "hover:text-yellow-400",
                bgGradient: "from-yellow-600/20 to-orange-600/20",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-4 rounded-xl bg-gradient-to-br ${social.bgGradient} backdrop-blur-sm border border-gray-700 hover:border-electric-teal/50 transition-all duration-300 group cyberpunk-card hover:scale-110 ${social.color}`}
                aria-label={social.label}
              >
                {social.icon}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric-teal/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg border border-electric-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                  {social.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                </div>
              </a>
            ))}
          </div>

          {/* Download Resume Button */}
          <div className="pt-4">
            <a
              href="https://drive.google.com/file/d/1FzHipBrxCrfUue0epZmHzzpvRpRg7QjL/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-electric-teal/20 to-neon-blue/20 rounded-2xl border border-electric-teal/30 hover:border-electric-teal/60 transition-all duration-500 cyberpunk-button overflow-hidden hover:scale-105"
            >
              <span className="relative z-10 text-lg font-semibold bg-gradient-to-r from-electric-teal to-neon-blue bg-clip-text text-transparent">
                Download Resume
              </span>
              <Download className="w-5 h-5 text-electric-teal group-hover:animate-bounce relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-electric-teal/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          </div>
        </div>

        {/* Enhanced Laptop Section */}
        <div className="flex justify-center lg:justify-end relative">
          <div className="relative">
            <HolographicCPU />
            {/* Additional Glow Effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-electric-teal/20 via-transparent to-neon-blue/20 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
