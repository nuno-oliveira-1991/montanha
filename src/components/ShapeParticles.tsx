import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Particle, ShapeParticlesProps, ShapeType } from "@/types/particles";
import { useFrame } from '@react-three/fiber';

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

const ShapeParticles: React.FC<ShapeParticlesProps> = ({ 
    count = 500, 
    radius = 15,
    position = [0, 0, 0],
    rotate = false,
    speed = 0.01,
    minSpeed = 0.002,
    maxSpeed = 0.01
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
            const size = 0.15 + Math.random() * 0.3;
            const dir = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize();
            temp.push({
                position: [x + randomX, y + randomY, z + randomZ],
                startPosition: [x, y, z],
                rotation: [
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2
                ],
                scale: [size, size, size],
                color: "white",
                speed: minSpeed + Math.random() * (maxSpeed - minSpeed), 
                direction: dir,
                rotationSpeed: [
                    (Math.random() - 0.5) * 0.002,
                    (Math.random() - 0.5) * 0.002,
                    (Math.random() - 0.5) * 0.002
                ],
                timeOffset: Math.random() * Math.PI * 2
            });
        }
        return temp;
    }, [count, radius, minSpeed, maxSpeed]);
  
    useFrame(({ clock }) => {
      if (!groupRef.current) return;
      const time = clock.getElapsedTime();
      if (rotate) {
        groupRef.current.rotation.y = time * speed;
      }
      groupRef.current.children.forEach((mesh, i) => {
        const particle = particles[i];
        if (!particle) return;
        const pos = new THREE.Vector3(...particle.position);
        pos.addScaledVector(particle.direction, particle.speed);
        if (pos.length() > radius) {
            particle.direction.multiplyScalar(-1);
        } else {
            particle.position = [pos.x, pos.y, pos.z];
            mesh.position.set(pos.x, pos.y, pos.z);
        }
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
            >
              <primitive object={shape.geometry.clone()} attach="geometry" />
              <meshBasicMaterial 
                color={0xbdd3ff} 
                wireframe={true}
              />
            </mesh>
          );
        })}
      </group>
    );
};

export default ShapeParticles;