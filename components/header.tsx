"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let mounted = true

    const handleScroll = () => {
      if (!mounted || typeof window === "undefined") return
      setScrolled(window.scrollY > 50)
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    if (typeof window !== "undefined") {
      handleScroll()
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        mounted = false
        window.removeEventListener("scroll", handleScroll)
      }
    }
    return () => { mounted = false }
  }, [])

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.substring(1))
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-navy flex items-center justify-center text-sm font-bold text-white shadow-md animate-spin-slow">
            SRC
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "text-teal bg-teal/10"
                    : "text-foreground/70 hover:text-teal hover:bg-teal/5"
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-teal to-navy rounded-full" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-xl bg-white border border-border shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-teal bg-teal/10"
                    : "text-foreground/70 hover:text-teal hover:bg-teal/5"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
