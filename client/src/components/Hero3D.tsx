import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const TechKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshWobbleMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.9}
          factor={0.4}
          speed={1.5}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-[320px] md:h-[420px] relative flex items-center justify-center pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F5E5C0" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#3B82F6" />
        <TechKnot />
      </Canvas>
    </div>
  );
};
