"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Box, Text, Sphere, Cylinder, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function WhiteLaptop() {
  const laptopRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()

  useFrame((state) => {
    if (laptopRef.current) {
      // Base floating animation
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1

      // Mouse-responsive rotation
      const targetRotationY = (mousePosition.x / viewport.width) * Math.PI * 0.3
      const targetRotationX = -(mousePosition.y / viewport.height) * Math.PI * 0.2

      laptopRef.current.rotation.y += (targetRotationY - laptopRef.current.rotation.y) * 0.05
      laptopRef.current.rotation.x += (targetRotationX - laptopRef.current.rotation.x) * 0.05

      if (hovered) {
        laptopRef.current.scale.setScalar(1.05 + Math.sin(state.clock.elapsedTime * 3) * 0.02)
      } else {
        laptopRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group ref={laptopRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Laptop Base - White */}
      <Box args={[4.2, 0.25, 2.8]} position={[0, -0.6, 0]}>
        <meshStandardMaterial
          color="#f8f9fa"
          metalness={0.1}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </Box>

      {/* Laptop Screen - White Bezel */}
      <Box args={[4.0, 2.6, 0.1]} position={[0, 0.6, -1.25]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial
          color="#f8f9fa"
          metalness={0.1}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </Box>

      {/* Screen Display - Dark */}
      <Box args={[3.6, 2.2, 0.05]} position={[0, 0.6, -1.2]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#000000" emissive="#001122" emissiveIntensity={hovered ? 0.6 : 0.3} />
      </Box>

      {/* Apple Logo - White */}
      <Sphere args={[0.08]} position={[0, 1.4, -1.2]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Screen Code Content */}
      <Text
        position={[0, 0.8, -1.15]}
        rotation={[-0.1, 0, 0]}
        fontSize={0.12}
        color="#00f5d0"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Bold.ttf"
      >
        {`const developer = {
  name: "CHANTHURU S R",
  role: "Full-Stack Developer",
  skills: ["React", "Node.js", "Python"],
  passion: "Building Digital Future"
};

function createAwesome() {
  return developer.skills.map(skill => 
    skill + " mastery achieved!"
  );
}

console.log("Ready to code! 🚀");`}
      </Text>

      {/* Keyboard Area - White */}
      <Box args={[3.6, 0.05, 2.2]} position={[0, -0.52, 0.3]}>
        <meshStandardMaterial color="#f8f9fa" metalness={0.1} roughness={0.3} />
      </Box>

      {/* Individual Keys - White */}
      {Array.from({ length: 60 }).map((_, i) => {
        const row = Math.floor(i / 12)
        const col = i % 12
        return (
          <Box key={i} args={[0.12, 0.02, 0.12]} position={[-1.8 + col * 0.3, -0.5, -0.4 + row * 0.25]}>
            <meshStandardMaterial
              color="#f8f9fa"
              metalness={0.1}
              roughness={0.4}
              emissive={hovered ? "#00f5d0" : "#ffffff"}
              emissiveIntensity={hovered ? 0.1 : 0.02}
            />
          </Box>
        )
      })}

      {/* Trackpad - White */}
      <Box args={[1.4, 0.02, 1.0]} position={[0, -0.48, 0.9]}>
        <meshStandardMaterial
          color="#f8f9fa"
          metalness={0.1}
          roughness={0.2}
          emissive="#00f5d0"
          emissiveIntensity={0.05}
        />
      </Box>

      {/* Touch Bar */}
      <Box args={[3.0, 0.03, 0.15]} position={[0, -0.45, -0.8]}>
        <meshStandardMaterial
          color="#000000"
          emissive="#00f5d0"
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Ports - White */}
      {[-1.8, 1.8].map((x, i) => (
        <Cylinder key={i} args={[0.05, 0.05, 0.1]} position={[x, -0.6, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#e9ecef" metalness={0.1} roughness={0.1} />
        </Cylinder>
      ))}

      {/* Enhanced Holographic Particles */}
      {hovered && (
        <>
          {Array.from({ length: 15 }).map((_, i) => (
            <HolographicParticle key={i} index={i} />
          ))}
        </>
      )}

      {/* Laptop Brand Label */}
      <Text
        position={[0, 0.2, -1.15]}
        rotation={[-0.1, 0, 0]}
        fontSize={0.08}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Regular.ttf"
      >
        MacBook Pro
      </Text>
    </group>
  )
}

function HolographicParticle({ index }: { index: number }) {
  const particleRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (particleRef.current) {
      const time = state.clock.elapsedTime + index * 0.4
      particleRef.current.position.x = Math.cos(time) * 2.5
      particleRef.current.position.y = Math.sin(time * 1.5) * 1.5 + 1
      particleRef.current.position.z = Math.sin(time * 0.8) * 2
      particleRef.current.material.opacity = 0.7 + Math.sin(time * 5) * 0.3
    }
  })

  const colors = ["#00f5d0", "#4361ee", "#ff6b6b", "#feca57", "#96ceb4"]
  const color = colors[index % colors.length]

  return (
    <Sphere ref={particleRef} args={[0.025]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.8} />
    </Sphere>
  )
}

function MouseTracker({ setMousePosition }: { setMousePosition: (pos: { x: number; y: number }) => void }) {
  const { viewport } = useThree()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x: x * viewport.width, y: y * viewport.height })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [viewport, setMousePosition])

  return null
}

export function HolographicCPU() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  return (
    <div className="w-96 h-96 relative">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <MouseTracker setMousePosition={setMousePosition} />
        <ambientLight intensity={0.8} />
        <pointLight position={[8, 8, 8]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -8, -8]} intensity={1.0} color="#00f5d0" />
        <pointLight position={[0, 8, 0]} intensity={0.8} color="#4361ee" />
        <WhiteLaptop />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-electric-teal/20 to-neon-blue/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
  )
}
