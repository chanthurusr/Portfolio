"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Box, Text, Sphere, Cylinder, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function Laptop({ mousePos }: { mousePos: { x: number; y: number } }) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
    const tx = mousePos.x * 0.3
    const ty = -mousePos.y * 0.2
    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.04
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.04
    ref.current.scale.setScalar(hovered ? 1.04 : 1)
  })

  return (
    <group ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Base */}
      <Box args={[4, 0.2, 2.6]} position={[0, -0.55, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
      </Box>
      {/* Screen back */}
      <Box args={[3.8, 2.5, 0.08]} position={[0, 0.65, -1.2]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
      </Box>
      {/* Screen display */}
      <Box args={[3.4, 2.1, 0.04]} position={[0, 0.65, -1.16]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#1e293b" emissive="#0f172a" emissiveIntensity={0.4} />
      </Box>
      {/* Code on screen */}
      <Text
        position={[0, 0.85, -1.12]}
        rotation={[-0.1, 0, 0]}
        fontSize={0.11}
        color="#00b894"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Bold.ttf"
      >
        {`const dev = {
  name: "CHANTHURU S R",
  role: "Full-Stack Dev",
  stack: ["MERN", "AI/ML"],
  passion: "Code & Create"
};`}
      </Text>
      {/* Keyboard area */}
      <Box args={[3.4, 0.04, 2]} position={[0, -0.48, 0.25]}>
        <meshStandardMaterial color="#f1f5f9" metalness={0.1} roughness={0.5} />
      </Box>
      {/* Keys */}
      {Array.from({ length: 48 }).map((_, i) => {
        const row = Math.floor(i / 12)
        const col = i % 12
        return (
          <Box key={i} args={[0.2, 0.02, 0.15]} position={[-1.65 + col * 0.3, -0.45, -0.3 + row * 0.22]}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.6} />
          </Box>
        )
      })}
      {/* Trackpad */}
      <Box args={[1.3, 0.02, 0.9]} position={[0, -0.44, 0.85]}>
        <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.3} />
      </Box>
      {/* Accent strip */}
      <Box args={[2.8, 0.025, 0.08]} position={[0, -0.42, -0.7]}>
        <meshStandardMaterial color="#00b894" emissive="#00b894" emissiveIntensity={hovered ? 0.6 : 0.25} />
      </Box>
      {/* Ports */}
      {[-1.7, 1.7].map((x, i) => (
        <Cylinder key={i} args={[0.04, 0.04, 0.08]} position={[x, -0.55, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
        </Cylinder>
      ))}
      {/* Hover particles */}
      {hovered &&
        Array.from({ length: 10 }).map((_, i) => <FloatingDot key={i} idx={i} />)}
    </group>
  )
}

function FloatingDot({ idx }: { idx: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime + idx * 0.5
    ref.current.position.set(Math.cos(t) * 2.2, Math.sin(t * 1.4) * 1.2 + 0.8, Math.sin(t * 0.7) * 1.8)
  })
  const colors = ["#00b894", "#4361ee", "#f59e0b", "#ef4444", "#8b5cf6"]
  const c = colors[idx % colors.length]
  return (
    <Sphere ref={ref} args={[0.025]}>
      <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.6} transparent opacity={0.7} />
    </Sphere>
  )
}

function Scene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [viewport])

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -4, -4]} intensity={0.5} color="#00b894" />
      <Laptop mousePos={mousePos} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} minDistance={4} maxDistance={8} />
    </>
  )
}

export function HolographicCPU() {
  return (
    <div className="w-80 h-80 lg:w-96 lg:h-96">
      <Canvas camera={{ position: [0, 1.5, 5.5], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
