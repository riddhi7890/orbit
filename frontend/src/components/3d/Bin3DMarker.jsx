import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function Bin3DMarker({ bin, isSelected, onClick }) {
  const groupRef = useRef();
  const pulseRef = useRef();
  const [hovered, setHovered] = useState(false);

  const fill = Number(bin.fill_level || 0);
  const isCritical = fill >= 80 || bin.status === 'CRITICAL';
  const isMedium = fill >= 50 && fill < 80;

  const colorHex = isCritical ? '#EF4444' : isMedium ? '#F59E0B' : '#10B981';
  const coords = bin.coordinates || [0, 1.2, 0];

  useFrame((state, delta) => {
    if (pulseRef.current && isCritical) {
      pulseRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      pulseRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
    }
    if (groupRef.current && hovered) {
      groupRef.current.position.y = coords[1] + 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
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
        onClick(bin);
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
      {/* Base Platform */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.2, 16]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
      </mesh>

      {/* Smart Bin Body */}
      <mesh position={[0, 0, 0]} scale={hovered || isSelected ? 1.15 : 1}>
        <cylinderGeometry args={[0.55, 0.45, 1.3, 16]} />
        <meshStandardMaterial
          color={colorHex}
          roughness={0.3}
          metalness={0.2}
          emissive={colorHex}
          emissiveIntensity={isCritical ? 0.4 : 0.15}
        />
      </mesh>

      {/* Smart Sensor Solar Cap */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.62, 0.6, 0.2, 16]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pulsing Beacon for Critical Bins */}
      {isCritical && (
        <group position={[0, 1.1, 0]}>
          <mesh ref={pulseRef}>
            <ringGeometry args={[0.4, 0.6, 16]} />
            <meshBasicMaterial color="#EF4444" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
        </group>
      )}

      {/* Interactive 3D Label */}
      <Html
        position={[0, 1.4, 0]}
        center
        distanceFactor={28}
        style={{ pointerEvents: 'none', transition: 'all 0.2s' }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: `1.5px solid ${colorHex}`,
            padding: '3px 8px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
            fontSize: '11px',
            fontWeight: '700',
            color: '#17211B',
            transform: hovered || isSelected ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: colorHex,
              display: 'inline-block'
            }}
          />
          <span>{bin.bin_id}</span>
          <span style={{ color: colorHex }}>{fill}%</span>
          {isCritical && (
            <span style={{ background: '#EF4444', color: '#FFF', fontSize: '9px', padding: '1px 4px', borderRadius: '4px' }}>
              CRITICAL
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}
