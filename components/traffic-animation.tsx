"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Sphere } from "@react-three/drei"
import type * as THREE from "three"

function TrafficLight() {
  const lightRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime
      lightRef.current.rotation.y = time * 0.5
    }
  })

  return (
    <group ref={lightRef}>
      {/* Traffic Light Pole */}
      <Box args={[0.1, 2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#333333" />
      </Box>

      {/* Traffic Light Box */}
      <Box args={[0.3, 0.8, 0.2]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#222222" />
      </Box>

      {/* Lights */}
      <Sphere args={[0.08]} position={[0, 1.5, 0.11]}>
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={Math.sin(Date.now() * 0.003) > 0 ? 0.5 : 0.1}
        />
      </Sphere>
      <Sphere args={[0.08]} position={[0, 1.3, 0.11]}>
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={Math.sin(Date.now() * 0.003 + 1) > 0 ? 0.5 : 0.1}
        />
      </Sphere>
      <Sphere args={[0.08]} position={[0, 1.1, 0.11]}>
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={Math.sin(Date.now() * 0.003 + 2) > 0 ? 0.5 : 0.1}
        />
      </Sphere>
    </group>
  )
}

export function TrafficAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <TrafficLight />
      </Canvas>
    </div>
  )
}
