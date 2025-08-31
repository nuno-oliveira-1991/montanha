import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ShapeParticles from './ShapeParticles';
import Navbar from './Navbar';

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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl uppercase z-10 pointer-events-none tracking-wider" style={{ fontFamily: 'Array' }}>
                MONTANHA
            </div>

            {/* Navbar */}
            <Navbar />
        </div>
    );
};

export default Scene;