"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const SPOTIFY_PLAYLIST = "https://open.spotify.com/playlist/6k0xKv8O5qbefk8CFgSthg";

function MascotModel() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.45 + Math.sin(t * 0.55) * 0.05, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.22, 0.05);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.18, 0.05);
    group.current.position.y = Math.sin(t * 1.15) * 0.07;
  });

  const blue = new THREE.MeshStandardMaterial({ color: "#b9d8f6", roughness: 0.28, metalness: 0.08 });
  const deep = new THREE.MeshStandardMaterial({ color: "#6687ae", roughness: 0.4, metalness: 0.12 });
  const dark = new THREE.MeshStandardMaterial({ color: "#07182c", roughness: 0.34, metalness: 0.04 });

  return (
    <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.08}>
      <group ref={group} scale={0.68} position={[0, -0.35, 0]}>
        <mesh position={[0, 0.32, 0]} material={blue}>
          <sphereGeometry args={[0.72, 32, 20]} />
        </mesh>
        <mesh position={[0, -0.68, 0]} material={deep}>
          <sphereGeometry args={[0.5, 28, 18]} />
        </mesh>
        <mesh position={[-0.34, 0.95, 0]} rotation={[0, 0, -0.12]} material={blue}>
          <capsuleGeometry args={[0.12, 0.34, 8, 16]} />
        </mesh>
        <mesh position={[0.34, 0.95, 0]} rotation={[0, 0, 0.12]} material={blue}>
          <capsuleGeometry args={[0.12, 0.34, 8, 16]} />
        </mesh>
        <mesh position={[-0.25, 0.35, 0.64]} material={dark}>
          <sphereGeometry args={[0.085, 16, 16]} />
        </mesh>
        <mesh position={[0.25, 0.35, 0.64]} material={dark}>
          <sphereGeometry args={[0.085, 16, 16]} />
        </mesh>
        <mesh position={[0, 0.02, 0.66]} rotation={[0, 0, 0]} material={dark}>
          <capsuleGeometry args={[0.045, 0.18, 6, 12]} />
        </mesh>
        <mesh position={[-0.44, -0.42, 0]} rotation={[0, 0, -0.36]} material={deep}>
          <capsuleGeometry args={[0.07, 0.42, 8, 14]} />
        </mesh>
        <mesh position={[0.44, -0.42, 0]} rotation={[0, 0, 0.36]} material={deep}>
          <capsuleGeometry args={[0.07, 0.42, 8, 14]} />
        </mesh>
      </group>
    </Float>
  );
}

export default function PortfolioMascot() {
  return (
    <div className="mascot-layer">
      <div className="mascot-canvas">
        <Canvas camera={{ position: [0, 0, 4.3], fov: 30 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[2, 4, 5]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-3, 1, 2]} intensity={1.1} color="#8cc7ff" />
          <MascotModel />
        </Canvas>
      </div>
      <a className="mascot-spotify" href={SPOTIFY_PLAYLIST} target="_blank" rel="noreferrer" data-cursor="view" data-cursor-label="PLAY" aria-label="Open Sarvesh's Spotify playlist">
        <span className="mascot-spotify-dot" />
        <span><b>SPOTIFY</b><small>OPEN PLAYLIST ↗</small></span>
      </a>
    </div>
  );
}
