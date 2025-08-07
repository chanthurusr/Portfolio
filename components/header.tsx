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
      if (!mounted) return

      try {
        if (typeof window !== "undefined") {
          setScrolled(window.scrollY > 50)

          // Update active section based on scroll position
          const sections = navItems.map((item) => item.href.substring(1))
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              return rect.top <= 100 && rect.bottom >= 100
            }
            return false
          })
          if (currentSection) {
            setActiveSection(currentSection)
          }
        }
      } catch (error) {
        console.warn("Scroll handler error:", error)
      }
    }

    // Only add event listener if window is available
    if (typeof window !== "undefined" && window.addEventListener) {
      handleScroll() // Call once to set initial state
      window.addEventListener("scroll", handleScroll, { passive: true })

      return () => {
        mounted = false
        if (window.removeEventListener) {
          window.removeEventListener("scroll", handleScroll)
        }
      }
    }

    return () => {
      mounted = false
    }
  }, [])

  const scrollToSection = (href: string) => {
    try {
      if (typeof window !== "undefined") {
        const element = document.getElementById(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } catch (error) {
      console.warn("Scroll to section error:", error)
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-dark/80 backdrop-blur-lg border-b border-electric-teal/20 shadow-lg shadow-electric-teal/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* SRC Logo with continuous rotation */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-electric-teal to-neon-blue flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-electric-teal/25 animate-spin-slow">
            SRC
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-2 font-medium transition-all duration-300 group ${
                  activeSection === item.href.substring(1)
                    ? "text-electric-teal"
                    : "text-gray-300 hover:text-electric-teal"
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-teal to-neon-blue rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-electric-teal/30"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-lg bg-slate-dark/90 backdrop-blur-lg border border-electric-teal/30">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left py-3 px-4 rounded-lg transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-electric-teal bg-electric-teal/10"
                    : "text-gray-300 hover:text-electric-teal hover:bg-electric-teal/5"
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
