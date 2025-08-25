import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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

// Generate points in a spherical distribution
const generateSpherePoints = (count: number, radius: number): [number, number, number][] => {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y) * radius; // radius at y
    
    // Golden angle increment
    const theta = phi * i;
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    points.push([x * radius, y * radius, z * radius]);
  }
  
  return points;
};

// Velocity distribution - mostly slow, subtle movements
const getRandomSpeed = (): number => {
  const speeds = [
    0.002, 0.003, 0.004, 0.005,  // Very slow
    0.006, 0.007, 0.008, 0.009, 0.01,  // Slow
    0.012, 0.014, 0.016, 0.018, 0.02,  // Medium slow
    0.025, 0.03, 0.035, 0.04, 0.05,    // Medium
    0.06, 0.07, 0.08, 0.09, 0.1       // Fastest (still quite slow)
  ];
  
  // 80% chance to pick from the slowest speeds
  if (Math.random() < 0.8) {
    return speeds[Math.floor(Math.random() * 10)]; // First 10 are slowest
  }
  // 15% chance for medium slow
  if (Math.random() < 0.75) {
    return speeds[10 + Math.floor(Math.random() * 5)];
  }
  // 5% chance for the fastest
  return speeds[15 + Math.floor(Math.random() * 5)];
};

// ShapeParticles component using instanced meshes
const ShapeParticles: React.FC<ShapeParticlesProps> = ({ 
  count = 200, 
  radius = 5 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const camera = useThree(state => state.camera) as THREE.PerspectiveCamera;
  
  // Create particles data in a spherical distribution
  const particles = useMemo(() => {
    const temp: Particle[] = [];
    const spherePoints = generateSpherePoints(count, radius);
    
    for (let i = 0; i < count; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 0.2 + Math.random() * 0.5;
      const speed = getRandomSpeed();
      
      // Get position from spherical distribution
      const [x, y, z] = spherePoints[i] || [0, 0, 0];
      
      // Create a direction vector pointing outward from center
      const direction = new THREE.Vector3(x, y, z).normalize();
      
      // Add some randomness to the direction
      direction.x += (Math.random() - 0.5) * 0.3;
      direction.y += (Math.random() - 0.5) * 0.3;
      direction.z += (Math.random() - 0.5) * 0.3;
      direction.normalize();
      
      temp.push({
        position: [x, y, z],
        startPosition: [x, y, z],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ],
        scale: [size, size, size],
        color: getRandomColor(),
        speed,
        direction,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ],
        timeOffset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count, radius]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    
    // Initial setup
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);
  
  // Animate particles
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    
    groupRef.current.children.forEach((mesh, i) => {
      const particle = particles[i];
      if (!particle) return;
      
      // Calculate pulsing effect
      const pulse = Math.sin(time * 0.5 + particle.timeOffset) * 0.1 + 0.9;
      
      // Move in a more organic, floating pattern
      const timeOffset = particle.timeOffset;
      const speed = particle.speed * 0.5;
      
      // Add some subtle noise to the movement
      const noiseX = Math.sin(time * 0.3 + timeOffset) * speed * 0.1;
      const noiseY = Math.cos(time * 0.4 + timeOffset) * speed * 0.1;
      const noiseZ = Math.sin(time * 0.2 + timeOffset) * speed * 0.1;
      
      // Move outward very slowly with some noise
      const distance = speed * time * 0.5;
      const [startX, startY, startZ] = particle.startPosition;
      
      mesh.position.x = startX + (particle.direction.x * distance) + noiseX;
      mesh.position.y = startY + (particle.direction.y * distance) + noiseY;
      mesh.position.z = startZ + (particle.direction.z * distance) + noiseZ;
      
      // Apply pulsing effect to scale
      const scale = particle.scale[0] * pulse;
      mesh.scale.set(scale, scale, scale);
      
      // Update rotation
      mesh.rotation.x = particle.rotation[0] + time * particle.rotationSpeed[0];
      mesh.rotation.y = particle.rotation[1] + time * particle.rotationSpeed[1];
      mesh.rotation.z = particle.rotation[2] + time * particle.rotationSpeed[2];
      
      // Reset particles that move too far
      const maxDistance = 20;
      if (Math.abs(mesh.position.x) > maxDistance || 
          Math.abs(mesh.position.y) > maxDistance || 
          Math.abs(mesh.position.z) > maxDistance) {
        
        // Reset to a new position within bounds
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * 0.5;
        
        mesh.position.x = Math.sin(phi) * Math.cos(theta) * r;
        mesh.position.y = Math.sin(phi) * Math.sin(theta) * r;
        mesh.position.z = Math.cos(phi) * r;
        
        // Update the particle's start position
        particle.startPosition = [mesh.position.x, mesh.position.y, mesh.position.z];
        
        // Reset the clock for this particle
        particle.timeOffset = Math.random() * Math.PI * 2;
      }
    });
  });
  
  return (
    <group ref={groupRef}>
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

const PsychedelicScene: React.FC = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
    >
      {/* Deep navy blue background */}
      <color attach="background" args={['#02010F']} />
      
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Simple orbit controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
      />
      
      {/* 3D Shapes */}
      <Suspense fallback={null}>
        <ShapeParticles count={150} radius={5} />
      </Suspense>
    </Canvas>
  );
};

export default PsychedelicScene;
