"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import type * as THREE from "three"

const projects = [
  {
    id: 1,
    title: "Smart Urban Development",
    description: "AI-powered urban planning solution",
    tech: ["React", "Node.js", "AI/ML", "MongoDB"],
    achievements: ["Real-time analytics", "Predictive modeling"],
  },
  {
    id: 2,
    title: "Milk Delivery App",
    description: "Full-stack delivery management system",
    tech: ["React Native", "Express", "PostgreSQL"],
    achievements: ["Route optimization", "Real-time tracking"],
  },
  {
    id: 3,
    title: "EMO Platform",
    description: "Emotion recognition system",
    tech: ["OpenCV", "Python", "TensorFlow"],
    achievements: ["95% accuracy", "Real-time processing"],
  },
  {
    id: 4,
    title: "Garbage Detection",
    description: "Computer vision waste management",
    tech: ["OpenCV", "YOLO", "React"],
    achievements: ["Automated detection", "Environmental impact"],
  },
]

export function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <group>
      <Text
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Bold.ttf"
        position={[0, 3, 0]}
      >
        Projects Gallery
      </Text>

      {projects.map((project, index) => (
        <ProjectCube
          key={project.id}
          project={project}
          position={[(index % 2) * 4 - 2, Math.floor(index / 2) * 2 - 1, 0]}
          isSelected={selectedProject === project.id}
          onSelect={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
        />
      ))}
    </group>
  )
}

function ProjectCube({
  project,
  position,
  isSelected,
  onSelect,
}: {
  project: (typeof projects)[0]
  position: [number, number, number]
  isSelected: boolean
  onSelect: () => void
}) {
  const cubeRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.005
      cubeRef.current.rotation.y += 0.01
    }
    if (groupRef.current && isSelected) {
      groupRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={cubeRef}
        onClick={onSelect}
        onPointerOver={(e) => e.object.scale.setScalar(1.1)}
        onPointerOut={(e) => e.object.scale.setScalar(1)}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color={isSelected ? "#8b5cf6" : "#3b82f6"}
          emissive={isSelected ? "#8b5cf6" : "#3b82f6"}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {isSelected && (
        <Html position={[2.5, 0, 0]} center>
          <div className="bg-black/80 backdrop-blur-sm border border-purple-500 rounded-lg p-4 w-64 text-white">
            <h3 className="text-lg font-bold text-purple-400 mb-2">{project.title}</h3>
            <p className="text-sm mb-3">{project.description}</p>

            <div className="mb-3">
              <h4 className="text-xs font-semibold text-blue-400 mb-1">Tech Stack:</h4>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech) => (
                  <span key={tech} className="bg-blue-600/30 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-green-400 mb-1">Key Achievements:</h4>
              <ul className="text-xs space-y-1">
                {project.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 p-2 bg-gray-800 rounded text-xs text-center">Project Screenshot Placeholder</div>
          </div>
        </Html>
      )}
    </group>
  )
}
