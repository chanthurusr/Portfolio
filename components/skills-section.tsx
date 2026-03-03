"use client"

import { useRef, useState, useEffect } from "react"

const categories = [
  {
    label: "Programming Languages",
    color: "#f59e0b",
    bg: "bg-amber-50",
    border: "border-amber-200",
    skills: [
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    label: "Query Languages",
    color: "#10b981",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    skills: [
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    color: "#3b82f6",
    bg: "bg-blue-50",
    border: "border-blue-200",
    skills: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    ],
  },
  {
    label: "Tools & Platforms",
    color: "#8b5cf6",
    bg: "bg-violet-50",
    border: "border-violet-200",
    skills: [
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Snowflake", icon: "https://cdn.simpleicons.org/snowflake/29B5E8" },
    ],
  },
  {
    label: "Others",
    color: "#ef4444",
    bg: "bg-red-50",
    border: "border-red-200",
    skills: [
      { name: "MERN Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Problem Solving", icon: "" },
      { name: "Computer Networking", icon: "https://cdn.simpleicons.org/cisco/1BA0D7" },
    ],
  },
]

export function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let mounted = true
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && mounted) setVisible(true) },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => { mounted = false; observer.disconnect() }
  }, [])

  return (
    <section ref={ref} id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold heading-text tracking-tight">
            <span className="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent">Skills</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-10">
          {categories.map((cat, ci) => (
            <div
              key={cat.label}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${ci * 120}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <h3 className="text-lg font-bold text-foreground">{cat.label}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="flex flex-wrap gap-4">
                {cat.skills.map((skill, si) => (
                  <SkillPill
                    key={skill.name}
                    skill={skill}
                    catColor={cat.color}
                    catBg={cat.bg}
                    catBorder={cat.border}
                    visible={visible}
                    delay={ci * 120 + si * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillPill({
  skill,
  catColor,
  catBg,
  catBorder,
  visible,
  delay,
}: {
  skill: { name: string; icon: string }
  catColor: string
  catBg: string
  catBorder: string
  visible: boolean
  delay: number
}) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl ${catBg} border ${catBorder} cursor-default transition-all duration-300 ${hovered ? "shadow-lg -translate-y-1" : "shadow-sm"}`}
        style={hovered ? { borderColor: catColor, boxShadow: `0 8px 30px ${catColor}18` } : {}}
      >
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
          {skill.icon && !imgError ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className={`w-7 h-7 object-contain transition-transform duration-300 ${hovered ? "scale-110" : ""}`}
              onError={() => setImgError(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: catColor }}
            >
              {skill.name.charAt(0)}
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-foreground/90 whitespace-nowrap">{skill.name}</span>
      </div>
    </div>
  )
}
