"use client"

import { useRef, useState, useEffect } from "react"

const skills = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "lang" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "lang" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "lang" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "lang" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "lang" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "db" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "db" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "fw" },
  { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "lib" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "tool" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "tool" },
  { name: "MERN Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "other" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "tool" },
  { name: "Snowflake", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/snowflake.svg", category: "tool" },
  { name: "Networking", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cisco.svg", category: "other" },
  { name: "Problem Solving", icon: "", category: "other" },
]

const categoryColors: Record<string, string> = {
  lang: "from-amber-400 to-orange-500",
  db: "from-emerald-400 to-green-600",
  fw: "from-cyan-400 to-blue-500",
  lib: "from-sky-400 to-indigo-500",
  tool: "from-violet-400 to-purple-600",
  other: "from-rose-400 to-pink-600",
}

const categoryBorders: Record<string, string> = {
  lang: "hover:border-amber-400/60",
  db: "hover:border-emerald-400/60",
  fw: "hover:border-cyan-400/60",
  lib: "hover:border-sky-400/60",
  tool: "hover:border-violet-400/60",
  other: "hover:border-rose-400/60",
}

export function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let mounted = true
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mounted) setVisible(true)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => {
      mounted = false
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={ref} id="skills" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold heading-text tracking-tight">
            <span className="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent">Skills</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-5">
          {skills.map((skill, i) => (
            <SkillHex key={skill.name} skill={skill} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillHex({
  skill,
  index,
  visible,
}: {
  skill: (typeof skills)[0]
  index: number
  visible: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const gradient = categoryColors[skill.category]
  const borderHover = categoryBorders[skill.category]

  return (
    <div
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        className={`group relative w-28 h-28 lg:w-32 lg:h-32 rounded-2xl bg-white border-2 border-border ${borderHover} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-default card-hover`}
      >
        {/* Top gradient bar */}
        <div className={`absolute top-0 left-3 right-3 h-1 rounded-b-full bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
          {skill.icon && !imgError ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              onError={() => setImgError(true)}
              crossOrigin="anonymous"
            />
          ) : (
            <div className={`w-full h-full rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">{skill.name.charAt(0)}</span>
            </div>
          )}
        </div>

        <span className="text-xs lg:text-sm font-semibold text-foreground/80 text-center leading-tight px-1">
          {skill.name}
        </span>
      </div>
    </div>
  )
}
