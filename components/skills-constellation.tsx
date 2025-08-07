"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Line, Text, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

const skillsData = {
  center: {
    name: "CHANTHURU",
    position: [0, 0, 0],
    color: "#00f5d0",
    size: 0.6,
  },
  categories: [
    {
      name: "Programming Languages",
      position: [0, 5, 0],
      color: "#ff6b6b",
      skills: ["Java", "Python", "JavaScript", "HTML", "CSS"],
    },
    {
      name: "Databases",
      position: [4.5, 2.5, 0],
      color: "#4ecdc4",
      skills: ["SQL", "MongoDB"],
    },
    {
      name: "Frameworks",
      position: [4.5, -2.5, 0],
      color: "#45b7d1",
      skills: ["React Native", "ReactJS", "Node.js", "Express.js"],
    },
    {
      name: "Tools & Platforms",
      position: [0, -5, 0],
      color: "#96ceb4",
      skills: ["Visual Studio Code", "GitHub", "Figma", "Git"],
    },
    {
      name: "Technologies",
      position: [-4.5, -2.5, 0],
      color: "#feca57",
      skills: ["MERN Stack", "OpenCV", "TensorFlow"],
    },
    {
      name: "Soft Skills",
      position: [-4.5, 2.5, 0],
      color: "#ff9ff3",
      skills: ["Problem Solving", "Team Leadership", "Event Management"],
    },
  ],
}

function SkillNode({
  skill,
  position,
  isCenter = false,
  isHovered,
  onHover,
  onUnhover,
  size = 0.4,
}: {
  skill: { name: string; color: string }
  position: [number, number, number]
  isCenter?: boolean
  isHovered: boolean
  onHover: () => void
  onUnhover: () => void
  size?: number
}) {
  const nodeRef = useRef<THREE.Mesh>(null)
  const [scale, setScale] = useState(1)

  useFrame((state) => {
    if (nodeRef.current) {
      const targetScale = isHovered ? 1.4 : isCenter ? 1.2 : 1
      setScale(scale + (targetScale - scale) * 0.1)
      nodeRef.current.scale.setScalar(scale)

      if (!isCenter) {
        nodeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      }
    }
  })

  const intensity = isHovered ? 1.0 : isCenter ? 0.8 : 0.5

  return (
    <group>
      <Sphere ref={nodeRef} args={[size]} position={position} onPointerOver={onHover} onPointerOut={onUnhover}>
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={intensity}
          transparent
          opacity={0.9}
        />
      </Sphere>
      <Text
        position={[position[0], position[1] - (isCenter ? 1.2 : 0.8), position[2]]}
        fontSize={isCenter ? 0.4 : 0.25}
        color={skill.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Bold.ttf"
      >
        {skill.name}
      </Text>
    </group>
  )
}

function SkillItem({
  skill,
  position,
  categoryPosition,
  categoryColor,
  isVisible,
}: {
  skill: string
  position: [number, number, number]
  categoryPosition: [number, number, number]
  categoryColor: string
  isVisible: boolean
}) {
  const itemRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (itemRef.current && isVisible) {
      itemRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.08
    }
  })

  return (
    <group ref={itemRef}>
      <Sphere args={[0.15]} position={position}>
        <meshStandardMaterial
          color={categoryColor}
          emissive={categoryColor}
          emissiveIntensity={isVisible ? 0.4 : 0.1}
          transparent
          opacity={isVisible ? 0.9 : 0.3}
        />
      </Sphere>
      <Text
        position={[position[0], position[1] - 0.4, position[2]]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Regular.ttf"
      >
        {skill}
      </Text>
      {/* Connection line to category */}
      <Line
        points={[position, categoryPosition]}
        color={categoryColor}
        lineWidth={2}
        transparent
        opacity={isVisible ? 0.6 : 0.2}
      />
    </group>
  )
}

function SkillConstellation() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f5d0" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4361ee" />
      <pointLight position={[0, 10, 5]} intensity={0.6} color="#ff6b6b" />

      {/* Center Node */}
      <SkillNode
        skill={skillsData.center}
        position={skillsData.center.position as [number, number, number]}
        isCenter={true}
        isHovered={false}
        onHover={() => {}}
        onUnhover={() => {}}
        size={skillsData.center.size}
      />

      {/* Category Nodes */}
      {skillsData.categories.map((category) => (
        <group key={category.name}>
          <SkillNode
            skill={{ name: category.name, color: category.color }}
            position={category.position as [number, number, number]}
            isHovered={hoveredCategory === category.name}
            onHover={() => setHoveredCategory(category.name)}
            onUnhover={() => setHoveredCategory(null)}
          />

          {/* Connection line to center */}
          <Line
            points={[skillsData.center.position, category.position]}
            color={category.color}
            lineWidth={hoveredCategory === category.name ? 6 : 3}
            transparent
            opacity={hoveredCategory === category.name ? 0.9 : 0.5}
          />

          {/* Individual Skills */}
          {category.skills.map((skill, index) => {
            const angle = (index / category.skills.length) * Math.PI * 2
            const radius = 2.2
            const skillPosition: [number, number, number] = [
              category.position[0] + Math.cos(angle) * radius,
              category.position[1] + Math.sin(angle) * radius,
              category.position[2],
            ]

            return (
              <SkillItem
                key={skill}
                skill={skill}
                position={skillPosition}
                categoryPosition={category.position as [number, number, number]}
                categoryColor={category.color}
                isVisible={hoveredCategory === category.name}
              />
            )
          })}
        </group>
      ))}
    </>
  )
}

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 text-white">Skill Constellation</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Interactive skill network showing technology connections. Hover over categories to explore individual
            skills.
          </p>
        </div>

        {/* 3D Skill Constellation */}
        <div className="relative max-w-6xl mx-auto h-[600px] rounded-2xl bg-[#0b0c2a] border border-electric-teal/30 overflow-hidden">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <SkillConstellation />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={8}
              maxDistance={25}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Skill Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { label: "Programming Languages", value: "5+", color: "#ff6b6b" },
            { label: "Frameworks & Libraries", value: "8+", color: "#45b7d1" },
            { label: "Tools & Platforms", value: "10+", color: "#96ceb4" },
            { label: "Projects Completed", value: "15+", color: "#feca57" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-electric-teal/50 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: `${stat.color}40`,
                backgroundColor: `${stat.color}10`,
              }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
