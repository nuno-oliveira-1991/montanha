import React from 'react';
import Logo from '../Logo';
import CamaraLogo from '../../assets/porto-logo.png';
import favelaLogo from "../../assets/favela-logo.png"
import albumDigital from "../../assets/album-digital.webp"
import useMobileDetection from '../../hooks/useMobileDetection';
import MobileLogo from '../MobileLogo';

const AlbumContent: React.FC = () => {
    const isMobile = useMobileDetection();
    
    return (
        <div className={`w-full h-full overflow-hidden relative ${isMobile ? 'flex flex-col' : 'flex'}`}>
            {/* Album image */}
            <div className={`${isMobile ? 'relative w-full mt-2 flex justify-center items-center mb-2' : 'h-full aspect-square flex items-center justify-center'}`}>
                <img 
                    src={albumDigital} 
                    alt="Montanha - Alvorada Album" 
                    className={isMobile 
                        ? "relative w-auto h-auto max-h-[50vh] max-w-[90%] object-contain" 
                        : "h-full w-full object-contain"
                    }
                    style={{ opacity: 0.9 }}
                />
            </div>
            
            {/* Content section */}
            <div className={`flex ${isMobile ? 'w-full px-4 mt-2' : 'w-full flex-col'} ${isMobile ? 'justify-between' : 'justify-between'}`}>
                {!isMobile ? (
                    <>
                        <div className="flex flex-col items-end text-white">
                            <p className="text-right font-medium text-lg">COMING SOON</p>
                            <p className="text-right text-sm mt-1">20 / 10 / 2025</p>
                        </div>
                        <div className="flex justify-end">
                            <a 
                                href="https://montanha.bandcamp.com/alvorada" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors text-center"
                            >
                                PRE-ORDER
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-start text-white">
                            <p className="text-left font-medium text-xs">COMING SOON</p>
                            <p className="text-left text-xs mt-0.5">20 / 10 / 2025</p>
                        </div>
                        <div className="flex justify-end">
                            <a 
                                href="https://montanha.bandcamp.com/alvorada" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-1.5 bg-white text-black text-xs font-medium rounded hover:bg-gray-200 transition-colors text-center"
                            >
                                PRE-ORDER
                            </a>
                        </div>
                    </>
                )}
                
                {/* Logos - mobile mode */}
                {!isMobile ? (
                    <div className="flex flex-row items-center justify-end gap-4">
                        <Logo 
                            linkUrl="https://faveladiscos.bandcamp.com/"
                            imageUrl={favelaLogo}
                            title="Favela Discos"
                        />
                        <Logo imageUrl={CamaraLogo} title="Câmara Municipal do Porto" />
                    </div>
                ) : null}
            </div>
            
            {/* Logos */}
            {isMobile && (
                <div className="absolute bottom-4 right-4 flex flex-row items-center justify-end gap-4">
                    <MobileLogo 
                        linkUrl="https://faveladiscos.bandcamp.com/"
                        imageUrl={favelaLogo}
                        title="Favela Discos"
                    />
                    <MobileLogo imageUrl={CamaraLogo} title="Câmara Municipal do Porto" />
                </div>
            )}
        </div>
    );
};

export default AlbumContent;