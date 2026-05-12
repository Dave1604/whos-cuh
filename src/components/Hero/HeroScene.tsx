import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const ORANGE = new THREE.Color('#F8780A')
const ORANGE2 = new THREE.Color('#ff6b00')
const ORANGE3 = new THREE.Color('#ffb347')

function OrbField() {
  const orbs = useMemo(() => Array.from({ length: 16 }, () => ({
    pos: [
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 5 - 2,
    ] as [number, number, number],
    size: 0.06 + Math.random() * 0.22,
    speed: 0.5 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
    variant: Math.floor(Math.random() * 3),
  })), [])

  const colors = [ORANGE, ORANGE2, ORANGE3]

  return (
    <>
      {orbs.map((o, i) => (
        <group key={i} position={o.pos}>
          <Float speed={o.speed} floatIntensity={0.5} rotationIntensity={0.3} floatingRange={[-0.25, 0.25]}>
            <mesh>
              <sphereGeometry args={[o.size, 14, 14]} />
              <meshStandardMaterial
                color={colors[o.variant]}
                emissive={colors[o.variant]}
                emissiveIntensity={0.5}
                roughness={0.2}
                transparent
                opacity={0.75}
              />
            </mesh>
          </Float>
        </group>
      ))}
    </>
  )
}

function Rings() {
  const rings = useMemo(() => Array.from({ length: 5 }, () => ({
    pos: [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4 - 1,
    ] as [number, number, number],
    rot: [Math.random() * 2, Math.random() * 2, Math.random() * 2] as [number, number, number],
    size: 0.18 + Math.random() * 0.22,
    speed: 0.5 + Math.random() * 0.7,
  })), [])

  return (
    <>
      {rings.map((r, i) => (
        <group key={i} position={r.pos} rotation={r.rot}>
          <Float speed={r.speed} floatIntensity={0.4} rotationIntensity={1.0} floatingRange={[-0.2, 0.2]}>
            <mesh>
              <torusGeometry args={[r.size, r.size * 0.32, 12, 32]} />
              <meshStandardMaterial
                color={ORANGE}
                emissive={ORANGE}
                emissiveIntensity={0.4}
                roughness={0.3}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        </group>
      ))}
    </>
  )
}

function GlowCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!meshRef.current) return
    meshRef.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 0.7) * 0.06)
  })
  return (
    <mesh ref={meshRef} position={[2.5, 0.5, -4]}>
      <sphereGeometry args={[2, 20, 20]} />
      <meshStandardMaterial
        color="#fff0e0"
        emissive="#F8780A"
        emissiveIntensity={0.12}
        transparent
        opacity={0.25}
        roughness={1}
      />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, background: 'transparent' }}
    >
      <ambientLight intensity={0.8} color="#fff8f0" />
      <pointLight position={[4, 3, 5]} intensity={3} color="#F8780A" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#ffcc88" />
      <GlowCore />
      <OrbField />
      <Rings />
    </Canvas>
  )
}
