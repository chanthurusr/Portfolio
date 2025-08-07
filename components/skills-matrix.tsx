"use client"

import { useState, useEffect, useRef } from "react"

const skillCategories = [
  {
    name: "Programming Languages",
    color: "from-teal-400 to-cyan-400",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 80 },
      { name: "C++", level: 75 },
    ],
  },
  {
    name: "Frontend Frameworks",
    color: "from-blue-400 to-indigo-400",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "React Native", level: 85 },
      { name: "Vue.js", level: 70 },
      { name: "Angular", level: 65 },
    ],
  },
  {
    name: "Backend & Database",
    color: "from-green-400 to-emerald-400",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    name: "AI/ML & Tools",
    color: "from-purple-400 to-pink-400",
    skills: [
      { name: "OpenCV", level: 85 },
      { name: "TensorFlow", level: 80 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Git", level: 95 },
    ],
  },
]

export function SkillsMatrix() {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate categories one by one
            skillCategories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCategories((prev) => [...prev, index])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit built through continuous learning and hands-on experience. Proficiency levels based
            on real-world project implementations.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={category.name}
              category={category}
              isVisible={visibleCategories.includes(categoryIndex)}
              delay={categoryIndex * 100}
            />
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { label: "Years of Experience", value: "3+", icon: "🚀" },
            { label: "Projects Completed", value: "15+", icon: "💻" },
            { label: "Technologies Mastered", value: "20+", icon: "⚡" },
            { label: "LeetCode Problems", value: "500+", icon: "🧠" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-teal-500/50 transition-all duration-300 ${
                visibleCategories.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-teal-400 mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCategory({
  category,
  isVisible,
  delay,
}: {
  category: (typeof skillCategories)[0]
  isVisible: boolean
  delay: number
}) {
  return (
    <div
      className={`p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-teal-500/30 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
        {category.name}
      </h3>

      <div className="space-y-4">
        {category.skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            color={category.color}
            isVisible={isVisible}
            delay={delay + index * 100}
          />
        ))}
      </div>
    </div>
  )
}

function SkillBar({
  skill,
  color,
  isVisible,
  delay,
}: {
  skill: { name: string; level: number }
  color: string
  isVisible: boolean
  delay: number
}) {
  const [animatedLevel, setAnimatedLevel] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, skill.level, delay])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-gray-400 text-sm">{skill.level}%</span>
      </div>

      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </div>
  )
}
