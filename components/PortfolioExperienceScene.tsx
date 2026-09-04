"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = Math.sin(t * 0.35) * 0.12;
    group.current.position.y = Math.sin(t * 0.65) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.05, 5]} />
        <MeshDistortMaterial
          color="#0b2a66"
          roughness={0.18}
          metalness={0.82}
          distort={0.16}
          speed={1.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.52}>
        <torusGeometry args={[0.96, 0.008, 16, 160]} />
        <meshBasicMaterial color="#4da3ff" transparent opacity={0.72} />
      </mesh>

      <mesh rotation={[0.52, 0.22, 0.9]} scale={1.9}>
        <torusGeometry args={[0.98, 0.005, 12, 160]} />
        <meshBasicMaterial color="#164b9b" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function DataOrbit() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y -= delta * 0.08;
    ref.current.rotation.z = Math.sin(t * 0.23) * 0.08;
  });

  const points = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const radius = 1.7 + (i % 3) * 0.16;
    return [Math.cos(angle) * radius, Math.sin(angle * 1.7) * 0.28, Math.sin(angle) * radius] as [number, number, number];
  });

  return (
    <group ref={ref}>
      {points.map((position, index) => (
        <mesh key={index} position={position} scale={index % 4 === 0 ? 0.055 : 0.028}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color={index % 5 === 0 ? "#7fc5ff" : "#244f90"} transparent opacity={index % 5 === 0 ? 0.92 : 0.56} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#02040b"]} />
      <fog attach="fog" args={["#02040b", 3.8, 8]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 4]} intensity={12} color="#2d78d8" distance={8} />
      <pointLight position={[-3, -2, 1]} intensity={8} color="#15386f" distance={7} />
      <directionalLight position={[2, 4, 1]} intensity={1.2} color="#d9ebff" />

      <Float speed={1.1} rotationIntensity={0.28} floatIntensity={0.32}>
        <Core />
      </Float>
      <DataOrbit />
      <Sparkles count={90} scale={[6.5, 4.5, 6.5]} size={1.15} speed={0.28} color="#6aaeff" noise={1.1} />
    </>
  );
}

export default function PortfolioExperienceScene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
