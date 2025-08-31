import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bandImage from '../../assets/montanha-band.webp'
import useMobileDetection from '../../hooks/useMobileDetection';

const AboutContent: React.FC = () => {
  const isMobile = useMobileDetection();
  const [imageHeight, setImageHeight] = useState('100%');
  
  const images = [
    { 
      src: bandImage, 
      alt: "Montanha Band", 
      title: "Photography by Paula Yubero" 
    }
  ];
  
  useEffect(() => {
    const updateImageHeight = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      if (isMobile) {
        if (windowHeight < 700) {
          setImageHeight('50vh');
        } else if (windowWidth < 380) {
          setImageHeight('60vh');
        } else {
          setImageHeight('70vh');
        }
      } else {
        setImageHeight('100%');
      }
    };
    updateImageHeight();
    window.addEventListener('resize', updateImageHeight);
    return () => window.removeEventListener('resize', updateImageHeight);
  }, [isMobile]);
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="w-full overflow-hidden" style={{ height: imageHeight }}>
        <div className="relative w-full h-full bg-black">
          <img 
            src={images[0].src} 
            alt={images[0].alt}
            title={images[0].title}
            className={isMobile ? "max-h-full max-w-full object-contain" : "w-full h-full object-cover"}
            style={{ 
              opacity: 0.75,
              objectPosition: isMobile ? 'center center' : 'center 25%'
            }}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <p className="relative text-white text-md leading-relaxed max-w-4xl">
          Montanha are André Azevedo, Nuno Oliveira, João Sarnadas and Tito Silva. They bonded over 
          architecture school all-nighters listening to videogame soundtracks, and grew to love and 
          make ambient songs that resemble drawings.
        </p>
      </div>
    </div>
  );
};

export default AboutContent;