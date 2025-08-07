"use client"

import { useRef, useState, useEffect } from "react"

const skillsData = {
  "Programming Languages": [
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "#ED8B00",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "#3776AB",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "#E34F26",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "#1572B6",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#F7DF1E",
    },
  ],
  "Query Language": [
    {
      name: "SQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "#4479A1",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "#47A248",
    },
  ],
  Frameworks: [
    {
      name: "React Native",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB",
    },
  ],
  Tools: [
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      color: "#181717",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      color: "#F24E1E",
    },
  ],
  Libraries: [
    {
      name: "ReactJS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB",
    },
  ],
  Others: [
    {
      name: "MERN Stack",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#339933",
    },
    {
      name: "Problem Solving",
      icon: "🧠",
      color: "#FF6B6B",
    },
  ],
}

export function SkillsSection() {
  const [visibleCategories, setVisibleCategories] = useState<string[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let mounted = true

    const observer = new IntersectionObserver(
      (entries) => {
        if (!mounted) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Object.keys(skillsData).forEach((category, index) => {
              setTimeout(() => {
                if (mounted) {
                  setVisibleCategories((prev) => [...prev, category])
                }
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    const currentRef = sectionRef.current
    if (currentRef && observer) {
      observer.observe(currentRef)
    }

    return () => {
      mounted = false
      if (currentRef && observer) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  // Flatten all skills into a single array
  const allSkills = Object.values(skillsData).flat()

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-teal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-electric-teal to-neon-blue bg-clip-text text-transparent cyberpunk-glow">
              SKILLS
            </span>
          </h2>
        </div>

        {/* Single Grid Layout for All Skills */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {allSkills.map((skill, index) => (
              <SkillCard
                key={`${skill.name}-${index}`}
                skill={skill}
                isVisible={visibleCategories.length > 0}
                delay={index * 50}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  isVisible,
  delay,
}: {
  skill: { name: string; icon: string; color: string }
  isVisible: boolean
  delay: number
}) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-32 h-32 rounded-2xl bg-white/95 backdrop-blur-sm border border-gray-200 hover:border-electric-teal/50 transition-all duration-300 flex flex-col items-center justify-center p-4 hover:scale-110 hover:shadow-2xl group-hover:shadow-electric-teal/25 ${
          isHovered ? "transform rotate-2" : ""
        }`}
      >
        <div className="w-16 h-16 flex items-center justify-center mb-3">
          {skill.icon.startsWith("http") && !imageError ? (
            <img
              src={skill.icon || "/placeholder.svg"}
              alt={skill.name}
              className="w-full h-full object-contain"
              onError={() => setImageError(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div
              className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{ backgroundColor: skill.color }}
            >
              {skill.icon.startsWith("http") ? skill.name.charAt(0) : skill.icon}
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-700 text-center leading-tight">{skill.name}</span>
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            isHovered ? "opacity-10" : "opacity-0"
          }`}
          style={{ backgroundColor: skill.color }}
        />
      </div>

      {isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg border border-electric-teal/30 whitespace-nowrap z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {skill.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  )
}
