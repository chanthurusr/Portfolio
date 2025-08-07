"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function DeveloperModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Laptop */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.2, -0.7]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Code on Screen */}
      <Text
        position={[0, 0.2, -0.65]}
        rotation={[-0.2, 0, 0]}
        fontSize={0.1}
        color="#22d3ee"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {`const dev = {\n  name: "Chanthuru",\n  skills: ["React", "Node"]\n}`}
      </Text>

      {/* Coffee Cup */}
      <mesh position={[1.2, -0.3, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Floating Code Symbols */}
      <FloatingSymbols />
    </group>
  )
}

function FloatingSymbols() {
  const symbols = ["{ }", "< />", "( )", "[ ]"]

  return (
    <>
      {symbols.map((symbol, index) => (
        <FloatingSymbol
          key={index}
          symbol={symbol}
          position={[
            Math.cos((index / symbols.length) * Math.PI * 2) * 2,
            Math.sin((index / symbols.length) * Math.PI * 2) * 1 + 1,
            Math.sin((index / symbols.length) * Math.PI * 2) * 1,
          ]}
          delay={index * 0.5}
        />
      ))}
    </>
  )
}

function FloatingSymbol({
  symbol,
  position,
  delay,
}: { symbol: string; position: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime + delay) * 0.1
    }
  })

  return (
    <group ref={ref} position={position}>
      <Text fontSize={0.3} color="#22d3ee" anchorX="center" anchorY="middle" font="/fonts/GeistMono-Bold.ttf">
        {symbol}
      </Text>
    </group>
  )
}

export function FloatingDeveloperIcon() {
  return (
    <div className="w-96 h-96 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <DeveloperModel />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>

      {/* Placeholder for actual photo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg opacity-20">
          Photo Here
        </div>
      </div>
    </div>
  )
}
