"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SMObject() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.28;
    group.current.rotation.x = Math.sin(t * 0.6) * 0.14;
    group.current.rotation.z = Math.cos(t * 0.42) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.28, 2]} />
        <meshBasicMaterial color="#111111" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh scale={0.92}>
        <torusGeometry args={[1.08, 0.018, 16, 140]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.16}>
        <torusGeometry args={[0.92, 0.012, 12, 120]} />
        <meshBasicMaterial color="#777777" transparent opacity={0.65} />
      </mesh>
      <group position={[0, 0, 1.1]} rotation={[0.08, -0.12, 0.03]}>
        <mesh position={[-0.2, 0.06, 0]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.12, 1.0, 0.08]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <mesh position={[-0.02, 0.38, 0]} rotation={[0, 0, 0.04]}>
          <boxGeometry args={[0.52, 0.11, 0.08]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <mesh position={[-0.01, -0.38, 0]} rotation={[0, 0, 0.04]}>
          <boxGeometry args={[0.52, 0.11, 0.08]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <mesh position={[0.22, 0.02, 0]} rotation={[0, 0, 0.78]}>
          <boxGeometry args={[0.12, 0.9, 0.08]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <mesh position={[0.0, 0.02, 0]} rotation={[0, 0, -0.78]}>
          <boxGeometry args={[0.12, 0.9, 0.08]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#f8f8f5"]} />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 4, 3]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-3, -1, 2]} intensity={0.45} color="#bdbdbd" />
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
        <SMObject />
      </Float>
      <Sparkles count={45} scale={[5, 3.5, 5]} size={0.45} speed={0.14} color="#111111" noise={0.8} />
    </>
  );
}

export default function PortfolioExperienceScene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
