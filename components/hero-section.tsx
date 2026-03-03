"use client"

import { Github, Linkedin, Code, Download, ArrowDown } from "lucide-react"
import { HolographicCPU } from "./holographic-cpu"

export function HeroSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight heading-text tracking-tight">
              <span className="text-foreground">CHANTHURU</span>
              <br />
              <span className="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent">S R</span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium text-muted-foreground mono-text terminal-cursor">
              Full-Stack, Data Engineering Developer
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
            <p className="text-foreground/80 leading-relaxed">
              B.E. Computer Science and Engineering student at{" "}
              <span className="font-semibold text-teal">Nandha Engineering College</span>, passionate about
              building scalable full-stack applications and intelligent systems. I specialize in the{" "}
              <span className="font-semibold text-navy">MERN stack</span>,{" "}
              <span className="font-semibold text-navy">AI-driven solutions</span>,{" "}
              <span className="font-semibold text-teal">AWS cloud services</span>, and data engineering concepts.
              I am highly interested in exploring emerging technologies and continuously improving my skills to build innovative, real-world solutions.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/chanthurusr", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/chanthuru-s-r-678220267/", label: "LinkedIn" },
              { icon: Code, href: "https://leetcode.com/u/CHANTHURU/", label: "LeetCode" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-card border border-border shadow-sm hover:border-teal/50 hover:shadow-md transition-all duration-300 group"
                aria-label={s.label}
              >
                <s.icon className="w-5 h-5 text-foreground/60 group-hover:text-teal transition-colors" />
              </a>
            ))}
          </div>

          <a
            href="https://drive.google.com/file/d/1NsjvOVzdczbMO-2CsS5lBZMF01nwMEJZ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal to-navy text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HolographicCPU />
        </div>
      </div>

      <button
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full border border-border hover:border-teal/50 transition-colors animate-bounce"
        aria-label="Scroll to projects"
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </button>
    </section>
  )
}
