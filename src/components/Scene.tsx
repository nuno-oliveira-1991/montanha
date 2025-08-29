import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ShapeParticles from './shape-particles';
import Navbar from './navbar';
import favelaLogo from '../assets/favela-logo.png';

const Scene: React.FC = () => {
    return (
        <div>
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
                    <ShapeParticles 
                        count={500} 
                        radius={20} 
                        position={[0, 0, 0]} 
                        rotate 
                        speed={0.005}     
                        minSpeed={0.002}  
                        maxSpeed={0.006}
                    />
                </Suspense>
            </Canvas>

            {/* Overlay text */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scaleY(0.6)',
                    color: 'white',
                    fontSize: '5rem',
                    fontFamily: 'monospace',
                    letterSpacing: '0.3em',
                    lineHeight: '0.5',
                    textTransform: 'uppercase',
                    zIndex: 10,
                    pointerEvents: 'none'
                }}
            >
                MONTANHA
              </div>

            {/* Navbar */}
            <Navbar />

            {/* Favela Logo Link - Bottom Right */}
            <a
                href="https://faveladiscos.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '20px',
                    zIndex: 1000,
                    transition: 'opacity 0.3s ease'
                }}
                className="hover:opacity-70"
            >
                <img
                    src={favelaLogo}
                    alt="Favela Discos"
                    style={{
                        width: '40px',
                        height: 'auto',
                        filter: 'brightness(0) invert(1)', // Makes the logo white
                        opacity: 0.8
                    }}
                />
            </a>
        </div>
    );
};

export default Scene;