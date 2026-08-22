import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import Bin3DMarker from './Bin3DMarker';
import Facility3DMarker from './Facility3DMarker';

// Procedural Buildings in Smart Waste Treatment City
function CityBuildings() {
  const buildings = useMemo(() => {
    const list = [];
    const blocks = [
      { x: -16, z: -8, w: 4, d: 4, h: 10, color: '#F1F5F9' },
      { x: -16, z: 0, w: 4, d: 4, h: 5, color: '#FFFFFF' },
      { x: -8, z: -16, w: 4, d: 4, h: 12, color: '#E2E8F0' },
      { x: -8, z: -8, w: 4, d: 4, h: 15, color: '#FFFFFF' },
      { x: -8, z: 0, w: 4, d: 4, h: 8, color: '#F8FAFC' },
      
      { x: 8, z: -16, w: 5, d: 4, h: 11, color: '#FFFFFF' },
      { x: 8, z: -8, w: 4, d: 5, h: 14, color: '#F1F5F9' },
      { x: 8, z: 0, w: 4, d: 4, h: 9, color: '#FFFFFF' },
      { x: 16, z: -16, w: 4, d: 4, h: 6, color: '#F8FAFC' },
      { x: 16, z: 0, w: 4, d: 4, h: 8, color: '#E2E8F0' },

      // Zone C & D lower-rise eco facilities & logistics centers
      { x: -6, z: 12, w: 5, d: 5, h: 3.5, color: '#FFFFFF' },
      { x: 6, z: 12, w: 7, d: 5, h: 4, color: '#F1F5F9' },
    ];
    return blocks;
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* City Zone Road Grid Overlays */}
      {/* North-South Main Avenues */}
      <mesh position={[-12, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 48]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 48]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>
      <mesh position={[12, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 48]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* East-West Cross Streets */}
      <mesh position={[0, 0.05, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[48, 2.5]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, 0.05, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[48, 2.5]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, 0.05, 6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[48, 3.2]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>

      {/* Eco Park / Green Zone */}
      <mesh position={[-16, 0.08, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#A7F3D0" />
      </mesh>
    </group>
  );
}

// Moving Electric Collection Vehicle
function CollectionTruck({ routeOffset = 0, speed = 1.2, color = '#20A66A' }) {
  const truckRef = useRef();

  useFrame((state) => {
    if (truckRef.current) {
      const t = (state.clock.elapsedTime * speed + routeOffset) % 24;
      // Moving along the central avenue (Z axis from -20 to 20)
      truckRef.current.position.z = -20 + (t / 24) * 40;
      truckRef.current.position.x = 0.6; // driving on right lane
    }
  });

  return (
    <group ref={truckRef} position={[0.6, 0.4, -20]}>
      {/* Truck Cabin */}
      <mesh position={[0, 0.4, 0.6]}>
        <boxGeometry args={[0.9, 0.8, 0.9]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      {/* Truck Waste Compactor Container */}
      <mesh position={[0, 0.5, -0.6]}>
        <boxGeometry args={[1.0, 1.0, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.3} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.55, 0.2, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 12]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      <mesh position={[-0.55, 0.2, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 12]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      <mesh position={[0.55, 0.2, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 12]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      <mesh position={[-0.55, 0.2, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 12]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
    </group>
  );
}

export default function SmartCityCanvas({
  bins = [],
  facilities = [],
  selectedBinId = null,
  selectedFacilityId = null,
  onSelectBin = () => {},
  onSelectFacility = () => {}
}) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '480px', position: 'relative' }}>
      <Canvas
        camera={{ position: [28, 30, 32], fov: 42 }}
        style={{ background: '#F8FAF9', borderRadius: '16px' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[30, 45, 20]}
          intensity={1.6}
          castShadow
          color="#FFFFFF"
        />
        <pointLight position={[-15, 10, 15]} intensity={0.8} color="#DDF7EA" />

        {/* City Base Ground */}
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[68, 68]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.8} />
        </mesh>

        <Grid
          args={[68, 68]}
          position={[0, 0.01, 0]}
          cellSize={2}
          cellThickness={0.5}
          cellColor="#CBD5E1"
          sectionSize={8}
          sectionThickness={1}
          sectionColor="#20A66A"
          fadeDistance={55}
        />

        {/* 3D Smart City Architecture */}
        <CityBuildings />

        {/* Animated Fleet Collection Vehicles */}
        <CollectionTruck routeOffset={0} speed={1.0} color="#20A66A" />
        <CollectionTruck routeOffset={12} speed={1.2} color="#0EA5E9" />

        {/* 3D Treatment Facilities (Treatment Plants, Recycling Centers, Processing Plants, Recovery Hubs) */}
        {facilities.map((fac) => (
          <Facility3DMarker
            key={fac.facility_id}
            facility={fac}
            isSelected={selectedFacilityId === fac.facility_id}
            onClick={onSelectFacility}
          />
        ))}

        {/* Real Smart Bins from Backend */}
        {bins.map((bin) => (
          <Bin3DMarker
            key={bin.bin_id}
            bin={bin}
            isSelected={selectedBinId === bin.bin_id}
            onClick={onSelectBin}
          />
        ))}

        <OrbitControls
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={10}
          maxDistance={70}
          target={[0, 2, 0]}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

