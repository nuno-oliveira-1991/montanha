import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ShapeParticles from './ShapeParticles';
import Navbar from './NavBar';

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
                        speed={0.02}     
                        minSpeed={0.002}  
                        maxSpeed={0.016}
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
        </div>
    );
};

export default Scene;