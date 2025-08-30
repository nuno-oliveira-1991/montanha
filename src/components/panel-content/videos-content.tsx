import React from 'react';

const VideosContent: React.FC = () => {
  return (
    <div className="w-full h-full">
      <iframe 
        className="w-full h-full"
        src="https://www.youtube.com/embed/x_IKiNsmRFE?si=p78i95i2k2Shgh23" 
        title="Vice City - music by Montanha videoby Rubber Mirror" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default VideosContent;