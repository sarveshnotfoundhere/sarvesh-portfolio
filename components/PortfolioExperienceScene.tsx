"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SMObject() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.42 + pointer.x * 0.16;
    group.current.rotation.x = Math.sin(t * 0.55) * 0.18 + pointer.y * 0.12;
    group.current.rotation.z = Math.cos(t * 0.38) * 0.08;
  });

  const strokeMaterial = <meshStandardMaterial color="#080808" roughness={0.72} metalness={0.08} />;
  const edgeMaterial = <meshBasicMaterial color="#111111" wireframe transparent opacity={0.3} />;

  return (
    <group ref={group} scale={1.08}>
      <mesh>
        <icosahedronGeometry args={[1.48, 2]} />
        {edgeMaterial}
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.48, 0.018, 12, 160]} />
        <meshBasicMaterial color="#777777" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.28, 0.012, 12, 140]} />
        <meshBasicMaterial color="#999999" transparent opacity={0.45} />
      </mesh>

      <group position={[0, 0, 1.24]} rotation={[0.03, -0.08, 0]}>
        <mesh position={[-0.34, 0, 0]}>
          <capsuleGeometry args={[0.12, 1.25, 6, 14]} />
          {strokeMaterial}
        </mesh>
        <mesh position={[-0.03, 0.52, 0]} rotation={[0, 0, -0.62]}>
          <capsuleGeometry args={[0.105, 0.88, 6, 14]} />
          {strokeMaterial}
        </mesh>
        <mesh position={[0.03, -0.52, 0]} rotation={[0, 0, 0.62]}>
          <capsuleGeometry args={[0.105, 0.88, 6, 14]} />
          {strokeMaterial}
        </mesh>

        <mesh position={[0.33, 0, 0]}>
          <capsuleGeometry args={[0.12, 1.25, 6, 14]} />
          {strokeMaterial}
        </mesh>
        <mesh position={[0.58, 0.08, 0]} rotation={[0, 0, 0.46]}>
          <capsuleGeometry args={[0.105, 0.82, 6, 14]} />
          {strokeMaterial}
        </mesh>
        <mesh position={[0.82, 0, 0]} rotation={[0, 0, -0.46]}>
          <capsuleGeometry args={[0.105, 0.82, 6, 14]} />
          {strokeMaterial}
        </mesh>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#f4f3ee"]} />
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 5, 4]} intensity={2} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.65} color="#b8b8b8" />
      <Float speed={1.35} rotationIntensity={0.1} floatIntensity={0.28}>
        <SMObject />
      </Float>
      <Sparkles count={70} scale={[5.5, 4, 5.5]} size={0.38} speed={0.16} color="#222222" noise={0.75} />
    </>
  );
}

export default function PortfolioExperienceScene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
