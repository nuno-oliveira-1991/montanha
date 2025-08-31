import React from 'react';
import useMobileDetection from '../../hooks/useMobileDetection';

const ContactContent: React.FC = () => {
  const isMobile = useMobileDetection();
  return (
    <div className={`w-full h-full flex flex-col ${isMobile ? 'items-start' : 'items-center'} justify-center text-white px-4`}>
      <h1 className={`text-md font-bold mb-2 ${isMobile ? 'self-start' : ''}`}>CONTACT</h1>
      <p className={`text-sm sm:text-base ${isMobile ? 'text-left' : 'text-center'} break-all`}>
      montanha.cosmica2010@gmail.com
      </p>
      <br />
      <h1 className={`text-md font-bold mb-2 ${isMobile ? 'self-start' : ''}`}>LIVE</h1>
      <p className={`text-sm sm:text-base ${isMobile ? 'text-left' : 'text-center'} break-all`}>
      faveladiscos@gmail.com
      </p>
    </div>
  );
};

export default ContactContent;