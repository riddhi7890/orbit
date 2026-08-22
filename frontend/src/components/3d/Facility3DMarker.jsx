import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function Facility3DMarker({ facility, isSelected, onClick }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  const coords = facility.coordinates || [0, 1.8, 0];
  const typeCode = facility.type_code;

  // Custom theme colors by facility type
  const facilityTheme = {
    TREATMENT_PLANT: {
      color: '#087443',
      emissive: '#20A66A',
      badgeBg: '#EDF7F2',
      badgeText: '#087443',
      icon: '♻️'
    },
    RECYCLING_CENTER: {
      color: '#20A66A',
      emissive: '#00D2A0',
      badgeBg: '#DDF7EA',
      badgeText: '#0A5C36',
      icon: '🔄'
    },
    PROCESSING_CENTER: {
      color: '#0D9488',
      emissive: '#14B8A6',
      badgeBg: '#CCFBF1',
      badgeText: '#0F766E',
      icon: '⚙️'
    },
    RESOURCE_RECOVERY: {
      color: '#D97706',
      emissive: '#F59E0B',
      badgeBg: '#FEF3C7',
      badgeText: '#B45309',
      icon: '🌐'
    }
  }[typeCode] || {
    color: '#20A66A',
    emissive: '#20A66A',
    badgeBg: '#EDF7F2',
    badgeText: '#087443',
    icon: '🏢'
  };

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
    }
    if (groupRef.current && (hovered || isSelected)) {
      groupRef.current.position.y = coords[1] + 0.2 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
    } else if (groupRef.current) {
      groupRef.current.position.y = coords[1];
    }
  });

  return (
    <group
      ref={groupRef}
      position={[coords[0], coords[1], coords[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(facility);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Foundation Platform */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 0.4, 24]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
      </mesh>

      {/* Facility Primary Dome / Geometric Structure */}
      <mesh position={[0, 0, 0]} scale={hovered || isSelected ? 1.15 : 1}>
        <cylinderGeometry args={[1.4, 1.6, 1.8, 24]} />
        <meshStandardMaterial
          color={facilityTheme.color}
          roughness={0.25}
          metalness={0.2}
          emissive={facilityTheme.emissive}
          emissiveIntensity={isSelected ? 0.35 : 0.15}
        />
      </mesh>

      {/* Glass Top Solar / Treatment Core */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[1.1, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Rotating Circular Recovery Orbit Ring */}
      <group ref={ringRef} position={[0, 1.2, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.7, 0.06, 16, 32]} />
          <meshStandardMaterial
            color={facilityTheme.emissive}
            emissive={facilityTheme.emissive}
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Pulsing Beacon Sphere */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color={facilityTheme.emissive} />
      </mesh>

      {/* Interactive 3D Label */}
      <Html
        position={[0, 2.8, 0]}
        center
        distanceFactor={32}
        style={{ pointerEvents: 'none', transition: 'all 0.2s ease' }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(8px)',
            border: `1.5px solid ${facilityTheme.color}`,
            padding: '5px 10px',
            borderRadius: '14px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            fontSize: '11.5px',
            fontWeight: '800',
            color: '#17211B',
            transform: hovered || isSelected ? 'scale(1.12)' : 'scale(1)'
          }}
        >
          <span>{facilityTheme.icon}</span>
          <span style={{ color: facilityTheme.badgeText }}>{facility.type}</span>
          <span style={{ color: 'var(--border)' }}>•</span>
          <span style={{ color: 'var(--deep-green)', fontWeight: '700' }}>{facility.recovery_rate_percent}% Recovery</span>
        </div>
      </Html>
    </group>
  );
}
