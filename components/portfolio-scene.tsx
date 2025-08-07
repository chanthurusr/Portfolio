"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Stars, Text } from "@react-three/drei"
import { HeroSection } from "./hero-section"
import { ProjectsGallery } from "./projects-gallery"
import { SkillsMatrix } from "./skills-matrix"
import { ExperienceTimeline } from "./experience-timeline"
import { AchievementsShowcase } from "./achievements-showcase"
import { ParticleSystem } from "./particle-system"
import type * as THREE from "three"

export function PortfolioScene() {
  const [currentSection, setCurrentSection] = useState("hero")
  const sceneRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.001
    }
  })

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />

      <Environment preset="night" />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />

      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      <group ref={sceneRef}>
        <ParticleSystem />

        {currentSection === "hero" && <HeroSection />}
        {currentSection === "projects" && <ProjectsGallery />}
        {currentSection === "skills" && <SkillsMatrix />}
        {currentSection === "experience" && <ExperienceTimeline />}
        {currentSection === "achievements" && <AchievementsShowcase />}
      </group>

      {/* Navigation Orbs */}
      <NavigationOrbs currentSection={currentSection} setCurrentSection={setCurrentSection} />
    </>
  )
}

function NavigationOrbs({
  currentSection,
  setCurrentSection,
}: {
  currentSection: string
  setCurrentSection: (section: string) => void
}) {
  const sections = [
    { id: "hero", label: "Home", position: [-8, 4, 0] },
    { id: "projects", label: "Projects", position: [-6, 4, 0] },
    { id: "skills", label: "Skills", position: [-4, 4, 0] },
    { id: "experience", label: "Experience", position: [-2, 4, 0] },
    { id: "achievements", label: "Achievements", position: [0, 4, 0] },
  ]

  return (
    <>
      {sections.map((section) => (
        <group key={section.id} position={section.position}>
          <mesh
            onClick={() => setCurrentSection(section.id)}
            onPointerOver={(e) => e.object.scale.setScalar(1.2)}
            onPointerOut={(e) => e.object.scale.setScalar(1)}
          >
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
              color={currentSection === section.id ? "#8b5cf6" : "#3b82f6"}
              emissive={currentSection === section.id ? "#8b5cf6" : "#3b82f6"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Bold.ttf"
          >
            {section.label}
          </Text>
        </group>
      ))}
    </>
  )
}
