import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MapControls, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo, Suspense, useEffect } from 'react';
import { Particle, ShapeType, ShapeParticlesProps } from '@/types/particles';

// Shape types with their respective geometries
const shapes: ShapeType[] = [
  { type: 'box', geometry: new THREE.BoxGeometry(1, 1, 1) },
  { type: 'sphere', geometry: new THREE.SphereGeometry(0.5, 8, 8) },
  { type: 'cone', geometry: new THREE.ConeGeometry(0.5, 1, 8) },
  { type: 'torus', geometry: new THREE.TorusGeometry(0.5, 0.2, 8, 16) },
  { type: 'octahedron', geometry: new THREE.OctahedronGeometry(0.5, 0) },
  { type: 'tetrahedron', geometry: new THREE.TetrahedronGeometry(0.5, 0) },
  { type: 'dodecahedron', geometry: new THREE.DodecahedronGeometry(0.5, 0) },
  { type: 'icosahedron', geometry: new THREE.IcosahedronGeometry(0.5, 0) },
];

// Generate a random color
const getRandomColor = (): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
    '#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#41B3A3',
    '#E8A87C', '#C38D9E', '#E27D60', '#41B3A3'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ShapeParticles: React.FC<ShapeParticlesProps> = ({ 
  count = 500, 
  radius = 15,
  position = [0, 0, 0],
  rotate = false,
  speed = 0.01
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const temp: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random()); 
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const randomOffset = 0.1;
      const randomX = (Math.random() - 0.5) * randomOffset * 2;
      const randomY = (Math.random() - 0.5) * randomOffset * 2;
      const randomZ = (Math.random() - 0.5) * randomOffset * 2;

      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 0.15 + Math.random() * 0.3;

      temp.push({
        position: [x + randomX, y + randomY, z + randomZ],
        startPosition: [x, y, z],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ],
        scale: [size, size, size],
        color: getRandomColor(),
        speed: 0,
        direction: new THREE.Vector3(0, 0, 0),
        rotationSpeed: [
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002
        ],
        timeOffset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count, radius]);

  // Animate particles
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();

    // Rotate whole group if enabled
    if (rotate) {
      groupRef.current.rotation.y = time * speed;
    }
    groupRef.current.children.forEach((mesh, i) => {
      const particle = particles[i];
      if (!particle) return;
      mesh.rotation.x = particle.rotation[0] + time * particle.rotationSpeed[0];
      mesh.rotation.y = particle.rotation[1] + time * particle.rotationSpeed[1];
      mesh.rotation.z = particle.rotation[2] + time * particle.rotationSpeed[2];
      const pulse = 0.95 + Math.sin(time * 0.5 + particle.timeOffset) * 0.05;
      mesh.scale.set(
        particle.scale[0] * pulse,
        particle.scale[1] * pulse,
        particle.scale[2] * pulse
      );
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {particles.map((particle, i) => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return (
          <mesh
            key={i}
            position={particle.position}
            rotation={particle.rotation}
            scale={particle.scale}
            castShadow
            receiveShadow
          >
            <primitive object={shape.geometry.clone()} attach="geometry" />
            <meshStandardMaterial 
              color={particle.color} 
              emissive={particle.color}
              emissiveIntensity={0.2}
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
      dpr={[1, 2]}
    >
      {/* Scene Background */}
      <color attach="background" args={['#02010F']} />
      
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Orbit controls */}
      <OrbitControls 
        enablePan={true}            
        enableZoom={false}          
        target={[0, 0, 0]}          
      />
      
      {/* 3D Shapes */}
      <Suspense fallback={null}>
      <ShapeParticles count={500} radius={20} position={[0, 0, 0]} rotate speed={0.02} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;