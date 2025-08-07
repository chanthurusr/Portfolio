"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import type * as THREE from "three"

const achievements = [
  {
    id: 1,
    title: "LeetCode 500+ Problems",
    description: "Consistent problem solving",
    icon: "🏆",
    stats: "500+ solved",
  },
  {
    id: 2,
    title: "Event Organization",
    description: "Technical event management",
    icon: "🎯",
    stats: "5+ events",
  },
  {
    id: 3,
    title: "Certifications",
    description: "Industry recognized credentials",
    icon: "📜",
    stats: "Multiple certs",
  },
  {
    id: 4,
    title: "Open Source",
    description: "Community contributions",
    icon: "🌟",
    stats: "Active contributor",
  },
]

export function AchievementsShowcase() {
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
        Achievements Showcase
      </Text>

      <TrophyCase achievements={achievements} />
      <LeetCodeStats />
    </group>
  )
}

function TrophyCase({ achievements }: { achievements: typeof achievements }) {
  return (
    <group position={[0, 0, 0]}>
      {achievements.map((achievement, index) => (
        <AchievementTrophy
          key={achievement.id}
          achievement={achievement}
          position={[(index % 2) * 3 - 1.5, Math.floor(index / 2) * 1.5 - 0.5, 0]}
          delay={index * 0.3}
        />
      ))}
    </group>
  )
}

function AchievementTrophy({
  achievement,
  position,
  delay,
}: {
  achievement: (typeof achievements)[0]
  position: [number, number, number]
  delay: number
}) {
  const trophyRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (trophyRef.current) {
      trophyRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1
      trophyRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={trophyRef} position={position}>
      {/* Trophy Base */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.2} />
      </mesh>

      {/* Trophy Cup */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.2, 0.6, 8]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <Html position={[0, 1, 0]} center>
        <div className="bg-black/80 backdrop-blur-sm border border-yellow-500 rounded-lg p-3 w-48 text-white text-center">
          <div className="text-2xl mb-2">{achievement.icon}</div>
          <h3 className="text-sm font-bold text-yellow-400 mb-1">{achievement.title}</h3>
          <p className="text-xs text-gray-300 mb-2">{achievement.description}</p>
          <div className="bg-yellow-600/20 px-2 py-1 rounded text-xs font-semibold">{achievement.stats}</div>
        </div>
      </Html>
    </group>
  )
}

function LeetCodeStats() {
  const statsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (statsRef.current) {
      statsRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={statsRef} position={[0, -2.5, 0]}>
      <mesh>
        <boxGeometry args={[4, 1, 0.2]} />
        <meshStandardMaterial color="#1f2937" emissive="#1f2937" emissiveIntensity={0.1} />
      </mesh>

      <Html position={[0, 0, 0.2]} center>
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-4 w-64 text-white">
          <h3 className="text-lg font-bold text-center mb-3">LeetCode Progress</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">500+</div>
              <div className="text-xs">Problems</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">85%</div>
              <div className="text-xs">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">1800+</div>
              <div className="text-xs">Rating</div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}
