"use client"

import { useRef, useState, useEffect, useCallback } from "react"

interface SkillNode {
  name: string
  icon: string
  description: string
  color: string
  angle: number
  ring: number
}

const skills: SkillNode[] = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", description: "Object-Oriented Programming", color: "#f89820", angle: 0, ring: 1 },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", description: "Scripting & AI/ML", color: "#3776ab", angle: 24, ring: 1 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "Web Development", color: "#f7df1e", angle: 48, ring: 1 },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "Markup Language", color: "#e34f26", angle: 72, ring: 1 },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", description: "Styling & Layouts", color: "#264de4", angle: 96, ring: 1 },
  { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Frontend Library", color: "#61dafb", angle: 120, ring: 1 },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Mobile Framework", color: "#61dafb", angle: 144, ring: 1 },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Server Runtime", color: "#339933", angle: 168, ring: 1 },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", description: "NoSQL Database", color: "#47a248", angle: 192, ring: 1 },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", description: "Query Language", color: "#00758f", angle: 216, ring: 1 },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", description: "Cloud Platform", color: "#ff9900", angle: 240, ring: 1 },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", description: "Version Control", color: "#6e7681", angle: 264, ring: 1 },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", description: "UI/UX Design", color: "#a259ff", angle: 288, ring: 1 },
  { name: "Snowflake", icon: "https://cdn.simpleicons.org/snowflake/29B5E8", description: "Data Cloud", color: "#29b5e8", angle: 312, ring: 1 },
  { name: "MERN Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Full-Stack Bundle", color: "#68a063", angle: 336, ring: 1 },
  { name: "Networking", icon: "https://cdn.simpleicons.org/cisco/049fd9", description: "Computer Networks", color: "#049fd9", angle: 355, ring: 2 },
  { name: "Problem Solving", icon: "", description: "Competitive Coding", color: "#ef4444", angle: 180, ring: 2 },
]

function getPosition(angleDeg: number, ring: number, centerX: number, centerY: number, radius: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  const r = ring === 2 ? radius * 0.55 : radius
  return { x: centerX + r * Math.cos(rad), y: centerY + r * Math.sin(rad) }
}

function Particle({ x1, y1, x2, y2, delay, color }: { x1: number; y1: number; x2: number; y2: number; delay: number; color: string }) {
  return (
    <circle r="2.5" fill={color} opacity="0.8">
      <animateMotion
        dur={`${2.5 + delay * 0.3}s`}
        repeatCount="indefinite"
        begin={`${delay * 0.4}s`}
        path={`M${x1},${y1} L${x2},${y2}`}
      />
      <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${2.5 + delay * 0.3}s`} repeatCount="indefinite" begin={`${delay * 0.4}s`} />
    </circle>
  )
}

export function SkillsSection() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [dims, setDims] = useState({ w: 800, h: 800 })
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && mounted) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => { mounted = false; obs.disconnect() }
  }, [])

  const handleResize = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const size = Math.min(rect.width, 800)
    setDims({ w: size, h: size })
  }, [])

  useEffect(() => {
    handleResize()
    if (typeof window === "undefined") return
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const cx = dims.w / 2
  const cy = dims.h / 2
  const radius = dims.w * 0.4
  const nodeSize = dims.w < 500 ? 32 : 42

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden">
      {/* Neutral metallic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#2c3e50]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Skill Constellation
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
            Interactive skill network showing technology connections
          </p>
        </div>

        <div ref={containerRef} className="max-w-[800px] mx-auto flex items-center justify-center">
          <svg
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            width={dims.w}
            height={dims.h}
            className={`transition-all duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00b894" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00b894" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Web rings */}
            {[0.3, 0.55, 0.8, 1].map((scale, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={radius * scale}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray={i % 2 === 0 ? "4 8" : "none"}
              />
            ))}

            {/* Cross web lines */}
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5 - 90) * (Math.PI / 180)
              return (
                <line
                  key={`web-${i}`}
                  x1={cx + radius * 0.15 * Math.cos(a)}
                  y1={cy + radius * 0.15 * Math.sin(a)}
                  x2={cx + radius * 1.05 * Math.cos(a)}
                  y2={cy + radius * 1.05 * Math.sin(a)}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              )
            })}

            {/* Connection lines from center to each node */}
            {skills.map((skill, i) => {
              const pos = getPosition(skill.angle, skill.ring, cx, cy, radius)
              const isHovered = hovered === skill.name
              return (
                <g key={`line-${i}`}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isHovered ? skill.color : "rgba(255,255,255,0.12)"}
                    strokeWidth={isHovered ? 2 : 1}
                    style={{ transition: "all 0.4s ease" }}
                  />
                  {/* Animated particles along lines */}
                  <Particle x1={cx} y1={cy} x2={pos.x} y2={pos.y} delay={i} color={skill.color} />
                  <Particle x1={pos.x} y1={pos.y} x2={cx} y2={cy} delay={i + 8} color={skill.color} />
                </g>
              )
            })}

            {/* Center glow */}
            <circle cx={cx} cy={cy} r={radius * 0.2} fill="url(#centerGlow)" />

            {/* Center node */}
            <g filter="url(#nodeGlow)">
              <circle cx={cx} cy={cy} r={nodeSize * 0.9} fill="rgba(0,184,148,0.15)" stroke="rgba(0,184,148,0.5)" strokeWidth="2">
                <animate attributeName="r" values={`${nodeSize * 0.85};${nodeSize * 0.95};${nodeSize * 0.85}`} dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r={nodeSize * 0.65} fill="rgba(0,184,148,0.25)" stroke="#00b894" strokeWidth="1.5" />
              {/* Monitor icon */}
              <rect x={cx - 14} y={cy - 12} width="28" height="18" rx="2" fill="none" stroke="#00b894" strokeWidth="1.5" />
              <line x1={cx - 6} y1={cy + 9} x2={cx + 6} y2={cy + 9} stroke="#00b894" strokeWidth="1.5" strokeLinecap="round" />
              <line x1={cx} y1={cy + 6} x2={cx} y2={cy + 9} stroke="#00b894" strokeWidth="1.5" />
              <circle cx={cx - 4} cy={cy - 3} r="1.5" fill="#00b894" opacity="0.6" />
              <circle cx={cx + 2} cy={cy - 3} r="1.5" fill="#00b894" opacity="0.8" />
              <circle cx={cx + 7} cy={cy - 3} r="1.5" fill="#00b894" />
              <text x={cx} y={cy + 22 + nodeSize * 0.5} textAnchor="middle" fill="#00b894" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">
                SKILLS
              </text>
            </g>

            {/* Skill nodes */}
            {skills.map((skill, i) => {
              const pos = getPosition(skill.angle, skill.ring, cx, cy, radius)
              const isHovered = hovered === skill.name
              const r = isHovered ? nodeSize * 0.7 : nodeSize * 0.55

              return (
                <g
                  key={skill.name}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
                  className={`transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
                >
                  {/* Outer ring glow on hover */}
                  {isHovered && (
                    <circle cx={pos.x} cy={pos.y} r={r + 8} fill="none" stroke={skill.color} strokeWidth="1" opacity="0.4">
                      <animate attributeName="r" values={`${r + 6};${r + 12};${r + 6}`} dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Glass node background */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r}
                    fill={isHovered ? `${skill.color}30` : "rgba(255,255,255,0.07)"}
                    stroke={isHovered ? skill.color : "rgba(255,255,255,0.15)"}
                    strokeWidth={isHovered ? 2 : 1}
                    style={{ transition: "all 0.3s ease" }}
                    filter={isHovered ? "url(#glow)" : "none"}
                  />

                  {/* Icon via foreignObject */}
                  {skill.icon ? (
                    <foreignObject x={pos.x - 12} y={pos.y - 12} width="24" height="24">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{ width: 24, height: 24, objectFit: "contain" }}
                        crossOrigin="anonymous"
                      />
                    </foreignObject>
                  ) : (
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill={skill.color} fontSize="16" fontWeight="800">
                      {skill.name.charAt(0)}
                    </text>
                  )}

                  {/* Label */}
                  <text
                    x={pos.x}
                    y={pos.y + r + 16}
                    textAnchor="middle"
                    fill={isHovered ? "#fff" : "rgba(255,255,255,0.7)"}
                    fontSize={isHovered ? "12" : "11"}
                    fontWeight={isHovered ? "700" : "500"}
                    fontFamily="Inter, sans-serif"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {skill.name}
                  </text>

                  {/* Description on hover */}
                  {isHovered && (
                    <text
                      x={pos.x}
                      y={pos.y + r + 30}
                      textAnchor="middle"
                      fill={skill.color}
                      fontSize="9"
                      fontWeight="500"
                      fontFamily="Inter, sans-serif"
                      opacity="0.9"
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
