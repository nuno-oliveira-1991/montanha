import React, { useState } from 'react';
import useMobileDetection from '../../hooks/useMobileDetection';

const VideosContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMobileDetection();

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`w-full h-full relative ${isMobile ? 'pt-12' : ''}`}>
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#02010F] z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm uppercase tracking-wider" style={{ fontFamily: 'Array' }}>
              Loading Video...
            </p>
          </div>
        </div>
      )}
      
      {/* YouTube iframe */}
      <iframe 
        className={`w-full h-full`}
        src="https://www.youtube.com/embed/x_IKiNsmRFE?si=p78i95i2k2Shgh23" 
        title="Vice City - music by Montanha videoby Rubber Mirror" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default VideosContent;