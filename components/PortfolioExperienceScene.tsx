"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SMObject() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.52 + pointer.x * 0.28;
    group.current.rotation.x = Math.sin(t * 0.38) * 0.08 - pointer.y * 0.16;
    group.current.rotation.z = Math.sin(t * 0.22) * 0.035;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.16, 0.045);
    group.current.position.y = Math.sin(t * 0.78) * 0.12;
  });

  const material = new THREE.MeshPhysicalMaterial({
    color: "#101318",
    roughness: 0.2,
    metalness: 0.5,
    clearcoat: 0.8,
    clearcoatRoughness: 0.12,
    emissive: "#05070a",
    emissiveIntensity: 0.24,
  });

  const edge = new THREE.MeshBasicMaterial({ color: "#8ebeff", transparent: true, opacity: 0.22 });

  return (
    <Float speed={1.05} rotationIntensity={0.035} floatIntensity={0.08}>
      <group ref={group} position={[0, 0, 0]} scale={1.02}>
        {/* Freestanding SM geometry — no container or box */}
        <mesh position={[-0.48, 0.02, 0]} rotation={[0, 0, -0.08]} castShadow>
          <capsuleGeometry args={[0.12, 1.64, 12, 28]} />
          <primitive object={material} attach="material" />
        </mesh>
        <mesh position={[-0.12, 0.47, 0]} rotation={[0, 0, 0.46]} castShadow>
          <capsuleGeometry args={[0.12, 0.66, 12, 28]} />
          <primitive object={material} attach="material" />
        </mesh>
        <mesh position={[-0.12, -0.43, 0]} rotation={[0, 0, -0.46]} castShadow>
          <capsuleGeometry args={[0.12, 0.66, 12, 28]} />
          <primitive object={material} attach="material" />
        </mesh>

        <mesh position={[0.44, 0.02, 0]} rotation={[0, 0, 0.04]} castShadow>
          <capsuleGeometry args={[0.12, 1.52, 12, 28]} />
          <primitive object={material} attach="material" />
        </mesh>
        <mesh position={[0.82, 0.36, 0]} rotation={[0, 0, 0.5]} castShadow>
          <capsuleGeometry args={[0.12, 0.62, 12, 28]} />
          <primitive object={material} attach="material" />
        </mesh>
        <mesh position={[0.82, -0.32, 0]} rotation={[0, 0, -0.5]} castShadow>
          <capsuleGeometry args={[0.12, 0.62, 12, 28]} />
          <primitive object={material} attach="material" />
        </mesh>

        <group scale={1.02}>
          <mesh position={[0, 0, -0.09]}>
            <torusGeometry args={[1.48, 0.012, 10, 96]} />
            <primitive object={edge} attach="material" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#f3f2ec"]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={2.7} />
      <directionalLight position={[-4, 2, 3]} intensity={1.4} color="#9bc7ff" />
      <Environment preset="studio" environmentIntensity={0.55} />
      <SMObject />
    </>
  );
}

export default function PortfolioExperienceScene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 34 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
