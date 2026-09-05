"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SMObject() {
  const group = useRef<THREE.Group>(null);
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#101318",
    roughness: 0.22,
    metalness: 0.48,
    clearcoat: 0.82,
    clearcoatRoughness: 0.1,
    emissive: "#05070a",
    emissiveIntensity: 0.22,
  }), []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.46 + pointer.x * 0.3;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.13 + Math.sin(t * 0.34) * 0.06, 0.055);
    group.current.rotation.z = Math.sin(t * 0.22) * 0.028;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.12, 0.05);
    group.current.position.y = Math.sin(t * 0.7) * 0.1;
  });

  return (
    <group ref={group} scale={1.05}>
      <mesh position={[-0.46, 0.02, 0]} rotation={[0, 0, -0.06]} castShadow>
        <capsuleGeometry args={[0.11, 1.7, 12, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[-0.1, 0.46, 0]} rotation={[0, 0, 0.45]} castShadow>
        <capsuleGeometry args={[0.11, 0.68, 12, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[-0.1, -0.43, 0]} rotation={[0, 0, -0.45]} castShadow>
        <capsuleGeometry args={[0.11, 0.68, 12, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0.42, 0.02, 0]} rotation={[0, 0, 0.04]} castShadow>
        <capsuleGeometry args={[0.11, 1.58, 12, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0.79, 0.35, 0]} rotation={[0, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.11, 0.63, 12, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0.79, -0.31, 0]} rotation={[0, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.11, 0.63, 12, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#f3f2ec"]} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={2.7} />
      <directionalLight position={[-4, 2, 3]} intensity={1.35} color="#9bc7ff" />
      <Environment preset="studio" environmentIntensity={0.5} />
      <SMObject />
    </>
  );
}

export default function PortfolioExperienceScene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.25], fov: 34 }} dpr={[1, 1.5]} shadows gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
