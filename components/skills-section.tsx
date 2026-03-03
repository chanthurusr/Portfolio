"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"

interface SkillNode {
  name: string
  icon: string
  description: string
  color: string
  angle: number
}

const skills: SkillNode[] = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", description: "Object-Oriented Programming", color: "#f89820", angle: 0 },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", description: "Scripting & AI/ML", color: "#3776ab", angle: 22.5 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "Web Development", color: "#f7df1e", angle: 45 },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "Markup Language", color: "#e34f26", angle: 67.5 },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", description: "Styling & Layouts", color: "#264de4", angle: 90 },
  { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Frontend Library", color: "#61dafb", angle: 112.5 },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Mobile Framework", color: "#61dafb", angle: 135 },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Server Runtime", color: "#339933", angle: 157.5 },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", description: "NoSQL Database", color: "#47a248", angle: 180 },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", description: "Query Language", color: "#00758f", angle: 202.5 },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", description: "Cloud Platform", color: "#ff9900", angle: 225 },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", description: "Version Control", color: "#6e7681", angle: 247.5 },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", description: "UI/UX Design", color: "#a259ff", angle: 270 },
  { name: "Snowflake", icon: "https://cdn.simpleicons.org/snowflake/29B5E8", description: "Data Cloud", color: "#29b5e8", angle: 292.5 },
  { name: "MERN Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Full-Stack Bundle", color: "#68a063", angle: 315 },
  { name: "Networking", icon: "https://cdn.simpleicons.org/cisco/049fd9", description: "Computer Networks", color: "#049fd9", angle: 337.5 },
]

function getPos(angleDeg: number, cx: number, cy: number, radius: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

export function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [size, setSize] = useState(700)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mounted) setVisible(true)
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => {
      mounted = false
      obs.disconnect()
    }
  }, [])

  const handleResize = useCallback(() => {
    if (!containerRef.current) return
    const w = containerRef.current.getBoundingClientRect().width
    setSize(Math.min(w, 700))
  }, [])

  useEffect(() => {
    handleResize()
    if (typeof window === "undefined") return
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.38
  const nodeR = size < 450 ? 24 : 30

  const positions = useMemo(
    () => skills.map((s) => getPos(s.angle, cx, cy, radius)),
    [cx, cy, radius]
  )

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #2c3e50 0%, #34495e 40%, #2c3e50 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Skill Constellation
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
            Interactive skill network showing technology connections
          </p>
        </div>

        <div ref={containerRef} className="max-w-[700px] mx-auto flex items-center justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <defs>
              <radialGradient id="cGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00b894" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00b894" stopOpacity="0" />
              </radialGradient>
              <filter id="nGlow">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Web rings */}
            {[0.3, 0.55, 0.8, 1].map((s, i) => (
              <circle
                key={`ring-${i}`}
                cx={cx}
                cy={cy}
                r={radius * s}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
                strokeDasharray={i % 2 === 0 ? "4 8" : undefined}
              />
            ))}

            {/* Radial spokes */}
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5 - 90) * (Math.PI / 180)
              return (
                <line
                  key={`spoke-${i}`}
                  x1={cx + radius * 0.12 * Math.cos(a)}
                  y1={cy + radius * 0.12 * Math.sin(a)}
                  x2={cx + radius * 1.05 * Math.cos(a)}
                  y2={cy + radius * 1.05 * Math.sin(a)}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth={1}
                />
              )
            })}

            {/* Connection lines + particles */}
            {skills.map((skill, i) => {
              const p = positions[i]
              const active = hovered === skill.name
              return (
                <g key={`conn-${i}`}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={p.x}
                    y2={p.y}
                    stroke={active ? skill.color : "rgba(255,255,255,0.12)"}
                    strokeWidth={active ? 2 : 1}
                    style={{ transition: "all 0.4s ease" }}
                  />
                  <circle r={2.5} fill={skill.color} opacity={0.7}>
                    <animateMotion
                      dur={`${2.5 + i * 0.15}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                      path={`M${cx},${cy} L${p.x},${p.y}`}
                    />
                  </circle>
                  <circle r={2} fill={skill.color} opacity={0.5}>
                    <animateMotion
                      dur={`${3 + i * 0.12}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.5 + 1}s`}
                      path={`M${p.x},${p.y} L${cx},${cy}`}
                    />
                  </circle>
                </g>
              )
            })}

            {/* Center glow */}
            <circle cx={cx} cy={cy} r={radius * 0.18} fill="url(#cGlow)" />

            {/* Center node */}
            <g filter="url(#nGlow)">
              <circle
                cx={cx}
                cy={cy}
                r={nodeR * 0.95}
                fill="rgba(0,184,148,0.15)"
                stroke="rgba(0,184,148,0.5)"
                strokeWidth={2}
              />
              <circle
                cx={cx}
                cy={cy}
                r={nodeR * 0.7}
                fill="rgba(0,184,148,0.25)"
                stroke="#00b894"
                strokeWidth={1.5}
              />
              {/* Monitor icon */}
              <rect
                x={cx - 12}
                y={cy - 10}
                width={24}
                height={16}
                rx={2}
                fill="none"
                stroke="#00b894"
                strokeWidth={1.5}
              />
              <line
                x1={cx - 5}
                y1={cy + 8}
                x2={cx + 5}
                y2={cy + 8}
                stroke="#00b894"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <line
                x1={cx}
                y1={cy + 6}
                x2={cx}
                y2={cy + 8}
                stroke="#00b894"
                strokeWidth={1.5}
              />
              <text
                x={cx}
                y={cy + nodeR + 18}
                textAnchor="middle"
                fill="#00b894"
                fontSize={12}
                fontWeight={700}
              >
                SKILLS
              </text>
            </g>

            {/* Skill nodes */}
            {skills.map((skill, i) => {
              const p = positions[i]
              const active = hovered === skill.name
              const r = active ? nodeR * 0.72 : nodeR * 0.58

              return (
                <g
                  key={skill.name}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
                >
                  {active && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r + 10}
                      fill="none"
                      stroke={skill.color}
                      strokeWidth={1}
                      opacity={0.35}
                    >
                      <animate
                        attributeName="r"
                        values={`${r + 8};${r + 14};${r + 8}`}
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.35;0.1;0.35"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r}
                    fill={active ? `${skill.color}30` : "rgba(255,255,255,0.07)"}
                    stroke={active ? skill.color : "rgba(255,255,255,0.15)"}
                    strokeWidth={active ? 2 : 1}
                    style={{ transition: "all 0.3s ease" }}
                    filter={active ? "url(#nGlow)" : undefined}
                  />

                  {skill.icon && (
                    <foreignObject
                      x={p.x - 11}
                      y={p.y - 11}
                      width={22}
                      height={22}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        width={22}
                        height={22}
                        style={{ objectFit: "contain" }}
                        crossOrigin="anonymous"
                      />
                    </foreignObject>
                  )}

                  <text
                    x={p.x}
                    y={p.y + r + 14}
                    textAnchor="middle"
                    fill={active ? "#ffffff" : "rgba(255,255,255,0.65)"}
                    fontSize={active ? 11 : 10}
                    fontWeight={active ? 700 : 500}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {skill.name}
                  </text>

                  {active && (
                    <text
                      x={p.x}
                      y={p.y + r + 27}
                      textAnchor="middle"
                      fill={skill.color}
                      fontSize={8}
                      fontWeight={500}
                      opacity={0.85}
                    >
                      {skill.description}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
