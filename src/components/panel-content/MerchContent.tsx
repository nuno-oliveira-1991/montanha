import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMobileDetection from '../../hooks/useMobileDetection';
import albumCover1 from '../../assets/album-cover-front.png';
import albumCover2 from '../../assets/album-cover-back.png';

const MerchContent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMobileDetection();
  
  const images = [
    { src: albumCover1, alt: "Album Cover Front" },
    { src: albumCover2, alt: "Album Cover Back" }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="relative w-full h-[70vh] overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt}
              className="w-full h-full object-contain"
              style={{ opacity: 0.9 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl font-light z-10"
          aria-label="Previous image"
        >
          &lt;
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl font-light z-10"
          aria-label="Next image"
        >
          &gt;
        </button>
      </div>

      {/* Pre-order button */}
      <a 
        href="https://montanha.bandcamp.com/alvorada" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-6 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
      >
        PRE-ORDER
      </a>
    </div>
  );
};

export default MerchContent;