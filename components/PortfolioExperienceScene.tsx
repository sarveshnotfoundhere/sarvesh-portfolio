"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SMObject() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.34 + pointer.x * 0.2;
    group.current.rotation.x = Math.sin(t * 0.42) * 0.1 - pointer.y * 0.12;
    group.current.rotation.z = Math.cos(t * 0.28) * 0.045;
  });

  const material = {
    color: "#111111",
    roughness: 0.3,
    metalness: 0.5,
    clearcoat: 0.6,
    clearcoatRoughness: 0.18,
  };

  return (
    <group ref={group} scale={1.28}>
      <mesh rotation={[0, 0, -0.16]} position={[-0.42, 0.03, 0]} castShadow receiveShadow>
        <RoundedBox args={[0.52, 1.72, 0.48]} radius={0.18} smoothness={5}>
          <meshPhysicalMaterial {...material} />
        </RoundedBox>
      </mesh>
      <mesh rotation={[0, 0, 0.52]} position={[-0.02, 0.43, 0]} castShadow receiveShadow>
        <RoundedBox args={[0.74, 0.42, 0.48]} radius={0.18} smoothness={5}>
          <meshPhysicalMaterial {...material} />
        </RoundedBox>
      </mesh>
      <mesh rotation={[0, 0, -0.52]} position={[-0.02, -0.43, 0]} castShadow receiveShadow>
        <RoundedBox args={[0.74, 0.42, 0.48]} radius={0.18} smoothness={5}>
          <meshPhysicalMaterial {...material} />
        </RoundedBox>
      </mesh>

      <mesh rotation={[0, 0, 0.1]} position={[0.48, 0.08, 0]} castShadow receiveShadow>
        <RoundedBox args={[0.46, 1.62, 0.48]} radius={0.18} smoothness={5}>
          <meshPhysicalMaterial {...material} />
        </RoundedBox>
      </mesh>
      <mesh rotation={[0, 0, 0.5]} position={[0.88, 0.34, 0]} castShadow receiveShadow>
        <RoundedBox args={[0.6, 0.38, 0.48]} radius={0.18} smoothness={5}>
          <meshPhysicalMaterial {...material} />
        </RoundedBox>
      </mesh>
      <mesh rotation={[0, 0, -0.5]} position={[0.88, -0.32, 0]} castShadow receiveShadow>
        <RoundedBox args={[0.6, 0.38, 0.48]} radius={0.18} smoothness={5}>
          <meshPhysicalMaterial {...material} />
        </RoundedBox>
      </mesh>

      <mesh position={[0, 0, -0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.018, 12, 96]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0.15} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#f3f2ec"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 5]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 1, 4]} intensity={1.15} color="#b7d7ff" />
      <Environment preset="studio" environmentIntensity={0.7} />
      <Float speed={1.15} rotationIntensity={0.08} floatIntensity={0.16}>
        <SMObject />
      </Float>
      <ContactShadows position={[0, -2.15, 0]} opacity={0.28} scale={6} blur={2.8} far={4.5} />
    </>
  );
}

export default function PortfolioExperienceScene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 37 }} dpr={[1, 1.5]} shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
