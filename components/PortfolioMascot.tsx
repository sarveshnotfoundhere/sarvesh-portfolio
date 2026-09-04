"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function MascotModel() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.6, 0.045);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.35, 0.045);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.34, 0.045);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * 0.2 + Math.sin(clock.elapsedTime * 1.4) * 0.04, 0.045);
  });

  return (
    <Float speed={1.7} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={group} scale={0.55} position={[1.65, -0.7, 0.25]}>
        <mesh position={[0, 0.25, 0]} castShadow><sphereGeometry args={[0.5, 24, 24]} /><meshStandardMaterial color="#b9d8f6" roughness={0.32} metalness={0.15} /></mesh>
        <mesh position={[0, -0.42, 0]}><sphereGeometry args={[0.38, 20, 20]} /><meshStandardMaterial color="#6f8fb5" roughness={0.4} metalness={0.2} /></mesh>
        {[[ -0.18, 0.72, 0.02 ], [ 0.18, 0.72, 0.02 ]].map(([x,y,z], index) => <mesh key={index} position={[x,y,z]} scale={[0.12,0.24,0.1]}><sphereGeometry args={[1,16,16]} /><meshStandardMaterial color="#b9d8f6" roughness={0.32} /></mesh>)}
        {[[ -0.16, 0.32, 0.45 ], [ 0.16, 0.32, 0.45 ]].map(([x,y,z], index) => <mesh key={`eye-${index}`} position={[x,y,z]}><sphereGeometry args={[0.055,12,12]} /><meshBasicMaterial color="#041225" /></mesh>)}
        <mesh position={[0,0.08,0.46]} scale={[0.14,0.06,0.04]}><sphereGeometry args={[1,16,16]} /><meshBasicMaterial color="#78baff" /></mesh>
        {[-0.2,0.2].map((x,index) => <mesh key={`arm-${index}`} position={[x,-0.35,0]} rotation={[0,0,index===0?-0.45:0.45]}><capsuleGeometry args={[0.05,0.32,6,12]} /><meshStandardMaterial color="#6f8fb5" roughness={0.42} /></mesh>)}
      </group>
    </Float>
  );
}

export default function PortfolioMascot() {
  return (
    <div className="mascot-layer" aria-hidden="true">
      <div className="mascot-canvas">
        <Canvas camera={{ position:[0,0,3.2], fov:32 }} dpr={[1,1.5]} gl={{ alpha:true, antialias:true, powerPreference:"high-performance" }}>
          <ambientLight intensity={1.25} />
          <directionalLight position={[2,3,4]} intensity={2.2} color="#dbeafe" />
          <pointLight position={[-2,1,2]} intensity={4} color="#4da3ff" distance={5} />
          <MascotModel />
        </Canvas>
      </div>
    </div>
  );
}
