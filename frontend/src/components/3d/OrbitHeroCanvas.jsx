import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Ring, Cylinder, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbitCore() {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const scannerRef = useRef();
  const particlesRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.35;
      ring3Ref.current.rotation.x -= delta * 0.2;
    }
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 1.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Smart Bin Geometric Model */}
      <group position={[0, -0.2, 0]}>
        {/* Bin Main Body */}
        <Cylinder args={[0.7, 0.55, 1.6, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.2}
            emissive="#087443"
            emissiveIntensity={0.08}
          />
        </Cylinder>
        
        {/* Bin Lid / Smart Sensor Cap */}
        <Cylinder args={[0.78, 0.74, 0.22, 32]} position={[0, 0.9, 0]}>
          <meshStandardMaterial color="#20A66A" metalness={0.3} roughness={0.3} />
        </Cylinder>

        {/* Sensor Solar Top */}
        <Cylinder args={[0.45, 0.45, 0.06, 24]} position={[0, 1.04, 0]}>
          <meshStandardMaterial color="#17211B" metalness={0.8} roughness={0.2} />
        </Cylinder>

        {/* Glowing Indicator Ring */}
        <Torus args={[0.72, 0.035, 16, 32]} position={[0, 0.8, 0]}>
          <meshBasicMaterial color="#00D2A0" />
        </Torus>

        {/* Waste Level LED Bar */}
        <Cylinder args={[0.705, 0.56, 0.7, 16, 1, true, 0, Math.PI * 0.6]} position={[0, -0.3, 0]}>
          <meshBasicMaterial color="#20A66A" transparent opacity={0.85} side={THREE.DoubleSide} />
        </Cylinder>
      </group>

      {/* Primary Orbital Ring 1 */}
      <Torus ref={ring1Ref} args={[2.0, 0.025, 16, 64]}>
        <meshStandardMaterial color="#20A66A" emissive="#20A66A" emissiveIntensity={0.6} />
      </Torus>

      {/* Secondary Orbital Ring 2 */}
      <Torus ref={ring2Ref} args={[2.4, 0.02, 16, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#00D2A0" emissive="#00D2A0" emissiveIntensity={0.5} />
      </Torus>

      {/* Outer Cyan Ring 3 */}
      <Torus ref={ring3Ref} args={[2.7, 0.015, 16, 64]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#0EA5E9" emissive="#0EA5E9" emissiveIntensity={0.4} />
      </Torus>

      {/* Dynamic Laser Scanning Ring */}
      <Ring ref={scannerRef} args={[0.75, 0.85, 32]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#00D2A0" side={THREE.DoubleSide} transparent opacity={0.7} />
      </Ring>

      {/* Orbiting AI Energy Nodes */}
      <group rotation={[0.4, 0, 0]}>
        <Sphere args={[0.09, 16, 16]} position={[2.0, 0, 0]}>
          <meshBasicMaterial color="#20A66A" />
        </Sphere>
      </group>
      <group rotation={[-0.6, 0.8, 0]}>
        <Sphere args={[0.07, 16, 16]} position={[-2.4, 0, 0]}>
          <meshBasicMaterial color="#00D2A0" />
        </Sphere>
      </group>
      <group rotation={[0.8, -0.5, 0]}>
        <Sphere args={[0.06, 16, 16]} position={[0, 2.7, 0]}>
          <meshBasicMaterial color="#0EA5E9" />
        </Sphere>
      </group>
    </group>
  );
}

export default function OrbitHeroCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '320px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.8, 5.2], fov: 45 }}
        style={{ pointerEvents: 'auto', background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-4, 2, -2]} intensity={1.8} color="#DDF7EA" />
        <pointLight position={[3, -2, 3]} intensity={1.2} color="#00D2A0" />

        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <OrbitCore />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.4}
        />
      </Canvas>
    </div>
  );
}
