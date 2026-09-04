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
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.14;
    group.current.rotation.z = Math.cos(t * 0.28) * 0.08;
    group.current.position.y = Math.sin(t * 0.7) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh scale={1.16}>
        <icosahedronGeometry args={[1.04, 4]} />
        <MeshDistortMaterial
          color="#092a68"
          roughness={0.16}
          metalness={0.9}
          distort={0.2}
          speed={1.2}
          transparent
          opacity={0.96}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.5}>
        <torusGeometry args={[0.98, 0.01, 16, 128]} />
        <meshBasicMaterial color="#66b4ff" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[0.55, 0.28, 0.86]} scale={1.84}>
        <torusGeometry args={[1.0, 0.006, 12, 128]} />
        <meshBasicMaterial color="#1e61bb" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[1.2, 0.4, 0.2]} scale={2.05}>
        <torusGeometry args={[1, 0.004, 10, 128]} />
        <meshBasicMaterial color="#0f346e" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function DataOrbit() {
  const ref = useRef<THREE.Group>(null);
  const positions = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const r = 1.7 + (i % 4) * 0.12;
    return [Math.cos(a) * r, Math.sin(a * 1.7) * 0.22, Math.sin(a) * r] as [number, number, number];
  });

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.11;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.05;
  });

  return (
    <group ref={ref}>
      {positions.map((position, index) => (
        <mesh key={index} position={position} scale={index % 5 === 0 ? 0.06 : 0.025}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={index % 5 === 0 ? "#9bd0ff" : "#245392"}
            transparent
            opacity={index % 5 === 0 ? 0.98 : 0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#010713"]} />
      <fog attach="fog" args={["#010713", 4.2, 8.5]} />
      <ambientLight intensity={0.22} />
      <pointLight position={[3, 2.5, 4]} intensity={14} color="#2f7fe0" distance={8} />
      <pointLight position={[-3, -1.5, 2]} intensity={7} color="#113b78" distance={7} />
      <directionalLight position={[2, 4, 1]} intensity={0.9} color="#ddecff" />

      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.3}>
        <Core />
      </Float>
      <DataOrbit />
      <Sparkles count={110} scale={[7, 5, 7]} size={1.1} speed={0.32} color="#78baff" noise={1.15} />
    </>
  );
}

export default function PortfolioExperienceScene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
