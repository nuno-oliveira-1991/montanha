import React from 'react';
import bandImage from '../../assets/montanha-band.jpg'

const AboutContent: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="w-full h-full overflow-hidden">
        <img 
          src={bandImage} 
          alt="Montanha Band" 
          title="Photography by Paula Yubero"
          className="w-full h-full object-cover object-top"
          style={{ objectPosition: 'center 25%', opacity: 0.75 }}
          loading="lazy"
        />
      </div>
      <div className="w-full flex items-center">
        <p className="relative bottom-0text-white p-2 text-md leading-relaxed max-w-4xl">
          Montanha are André Azevedo, Nuno Oliveira, João Sarnadas and Tito Silva. They bonded over 
          architecture school all-nighters listening to videogame soundtracks, and grew to love and 
          make ambient songs that resemble drawings
        </p>
      </div>
    </div>
  );
};

export default AboutContent;