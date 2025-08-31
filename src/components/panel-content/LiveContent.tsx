import React from 'react';
import useMobileDetection from '../../hooks/useMobileDetection';

interface Show {
  date: string;
  city: string;
  venue: string;
  upcoming?: boolean;
}

const LiveContent: React.FC = () => {
  const isMobile = useMobileDetection();
  
  const shows: Show[] = [
    { date: 'October 16, 2025', city: 'Porto', venue: 'Lovers & Lollypops', upcoming: true },
    { date: 'April 20, 2013', city: 'Aveiro', venue: 'Cais do Paraíso' },
    { date: 'April 19, 2013', city: 'Vale de Cambra', venue: 'Dunas Bar' },
    { date: 'April 4, 2013', city: 'Porto', venue: 'Hard Club' },
    { date: 'March 2, 2013', city: 'Barcelos', venue: 'CCOB' },
    { date: 'September 25, 2012', city: 'Gemeses', venue: 'Casa do Lago' },
  ];

  return (
    <div className={`w-full h-full flex flex-col items-start justify-start text-white overflow-y-auto ${isMobile ? 'mt-12' : ''}`}>
      <div className="w-full space-y-6">
        {shows.map((show, index) => (
          <div 
            key={index} 
            className={`w-full ${show.upcoming ? 'border-l-4 border-white pl-3' : ''}`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4">
              <div className={`text-md md:text-lg ${show.upcoming ? 'font-bold' : ''}`}>
                {show.date}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                <div className="text-base md:text-md">
                  {show.city} . {show.venue}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveContent;