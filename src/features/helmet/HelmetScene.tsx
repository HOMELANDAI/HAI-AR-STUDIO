import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Sparkles, Text } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import type { HelmetPreset } from '../../domain/presets'

function Helmet({ preset }: { preset: HelmetPreset }) {
  const group = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = preset.animated
        ? Math.sin(clock.elapsedTime * 0.35) * 0.1
        : 0
      group.current.position.y = preset.animated
        ? Math.sin(clock.elapsedTime * 0.65) * 0.045
        : 0
    }
  })
  return (
    <group ref={group} rotation={[0, -0.17, 0]}>
      <mesh castShadow scale={[1.16, 1.2, 1]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial color={preset.shell} metalness={0.68} roughness={0.23} clearcoat={0.7} />
      </mesh>
      <mesh scale={[1.11, 0.56, 0.18]} position={[0, 0.1, 0.92]}>
        <sphereGeometry args={[1, 40, 20]} />
        <meshPhysicalMaterial
          color={preset.visor}
          emissive={preset.visor}
          emissiveIntensity={preset.glow * 0.75}
          metalness={0.55}
          roughness={0.16}
          clearcoat={0.95}
        />
      </mesh>
      <mesh position={[0, 0.12, 1.07]} scale={[0.95, 0.47, 0.10]}>
        <sphereGeometry args={[1, 40, 20]} />
        <meshBasicMaterial color="#050710" transparent opacity={0.86} />
      </mesh>
      <Text
        position={[0, 0.17, 1.178]}
        rotation={[0, 0, 0]}
        fontSize={0.15}
        letterSpacing={0.08}
        color={preset.accent}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
      >
        BARS LOADED
      </Text>
      <mesh position={[0, -0.64, 0.77]} rotation={[0.15, 0, 0]} scale={[0.9, 0.25, 0.42]}>
        <boxGeometry args={[1.55, 0.76, 0.5]} />
        <meshStandardMaterial color={preset.shell} metalness={0.8} roughness={0.23} />
      </mesh>
      <mesh position={[-1.16, -0.09, 0]} rotation={[0, 0, Math.PI / 2]} scale={[0.24, 0.14, 0.12]}>
        <cylinderGeometry args={[1, 1, 1, 24]} />
        <meshStandardMaterial color={preset.accent} emissive={preset.accent} emissiveIntensity={preset.glow} />
      </mesh>
      <mesh position={[1.16, -0.09, 0]} rotation={[0, 0, Math.PI / 2]} scale={[0.24, 0.14, 0.12]}>
        <cylinderGeometry args={[1, 1, 1, 24]} />
        <meshStandardMaterial color={preset.accent} emissive={preset.accent} emissiveIntensity={preset.glow} />
      </mesh>
      <mesh scale={[1.18, 0.08, 0.92]} position={[0, -0.99, 0.01]}>
        <torusGeometry args={[0.78, 0.08, 12, 48]} />
        <meshStandardMaterial color={preset.accent} emissive={preset.accent} emissiveIntensity={preset.glow * 0.4} />
      </mesh>
    </group>
  )
}

export function HelmetScene({ preset }: { preset: HelmetPreset }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.1, 4.8], fov: 35 }} gl={{ antialias: true }} shadows fallback={<div className="canvas-fallback">WebGL unavailable. 3D preview requires a compatible browser/GPU.</div>}>
      <color attach="background" args={['#0b1020']} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="#e2f5ff" />
      <directionalLight position={[-4, 0, -3]} intensity={2.8} color={preset.accent} />
      <Environment preset="city" />
      <Helmet preset={preset} />
      <Sparkles count={24} size={2.2} color={preset.accent} opacity={0.4} speed={0.3} scale={[4, 3, 3]} />
      <OrbitControls enablePan={false} minDistance={3.4} maxDistance={7.2} autoRotate={false} />
    </Canvas>
  )
}
