"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Box } from "@react-three/drei"
import type * as THREE from "three"

const techStack = ["React", "Node.js", "MongoDB", "Python", "Java", "OpenCV"]

function RotatingCube() {
  const cubeRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.3
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group>
      <Box ref={cubeRef} args={[2, 2, 2]}>
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
          wireframe
        />
      </Box>

      {/* Tech Stack Labels */}
      {techStack.map((tech, index) => (
        <FloatingText
          key={tech}
          text={tech}
          position={[
            Math.cos((index / techStack.length) * Math.PI * 2) * 3,
            Math.sin((index / techStack.length) * Math.PI * 2) * 1.5,
            Math.sin((index / techStack.length) * Math.PI * 2) * 2,
          ]}
          delay={index * 0.3}
        />
      ))}
    </group>
  )
}

function FloatingText({
  text,
  position,
  delay,
}: {
  text: string
  position: [number, number, number]
  delay: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={ref} position={position}>
      <Text fontSize={0.3} color="#22d3ee" anchorX="center" anchorY="middle" font="/fonts/Geist-Bold.ttf">
        {text}
      </Text>
    </group>
  )
}

export function TechCube() {
  return (
    <div className="w-96 h-96">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
        <RotatingCube />
      </Canvas>
    </div>
  )
}
