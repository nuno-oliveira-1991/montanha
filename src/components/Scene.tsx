import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import useMobileDetection from '../hooks/useMobileDetection';
import useViewportHeight from '../hooks/useViewportHeight';
import ShapeParticles from './ShapeParticles';
import Navbar from './NavBar';
import { usePanelContext } from '../contexts/PanelContext';

const Scene: React.FC = () => {
    const isMobile = useMobileDetection();
    const { isPanelOpen } = usePanelContext();
    const viewportHeight = useViewportHeight();
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
                    height: viewportHeight,
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
                    enableDamping={true}
                    dampingFactor={isMobile ? 0.1 : 0.05}
                    rotateSpeed={isMobile ? 0.3 : 0.5}
                />

                {/* 3D Shapes */}
                <Suspense fallback={null}>
                    <ShapeParticles 
                        count={isMobile ? 300 : 500} 
                        radius={isMobile ? 15 : 20} 
                        position={[0, 0, 0]} 
                        rotate 
                        speed={isMobile ? 0.003 : 0.005}     
                        minSpeed={isMobile ? 0.001 : 0.002}  
                        maxSpeed={isMobile ? 0.004 : 0.006}
                    />
                </Suspense>
            </Canvas>

            {/* Overlay text */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
                className="absolute left-1/2 transform -translate-x-1/2 text-[#ffffff] text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase z-50 pointer-events-none tracking-wider px-4 text-center touch-none" 
                style={{ 
                    fontFamily: 'Array', 
                    fontSize: isMobile ? 'clamp(2rem, 8vw, 3.5rem)' : undefined,
                    top: isMobile ? '1.1rem' : '5%',
                    userSelect: 'none'
                }}
            >
                MONTANHA
            </motion.div>

            {/* Navbar */}
            <Navbar />
        </div>
    );
};

export default Scene;