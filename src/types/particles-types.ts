import * as THREE from 'three';

export interface Particle {
  position: [number, number, number];
  startPosition: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  speed: number;
  direction: THREE.Vector3;
  rotationSpeed: [number, number, number];
  timeOffset: number;
}

export interface ShapeType {
  type: string;
  geometry: THREE.BufferGeometry;
}

export interface ShapeParticlesProps {
    count?: number;
    radius?: number;
    position?: [number, number, number];
    rotate?: boolean;
    speed?: number; // group rotation speed
    minSpeed?: number; // per-shape min speed
    maxSpeed?: number; // per-shape max speed
  }