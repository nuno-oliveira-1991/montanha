import React from 'react';
import Logo from '../Logo';
import CamaraLogo from '../../assets/porto-logo.png';
import favelaLogo from "../../assets/favela-logo.png"

const AlbumContent: React.FC = () => {
    return (
        <div className="w-full h-full relative flex flex-col">
            <div className="w-full flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-8 text-white">
                <p>COMING SOON</p>
                <br />
                <p>20 / 10 / 2025</p>
                <a 
                    href="https://montanha.bandcamp.com/alvorada" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
                >
                    PRE-ORDER
                </a>
            </div>
            <div className="absolute flex flex-col sm:flex-row items-center justify-center gap-2 bottom-0 right-0 p-2">
                <Logo 
                    linkUrl="https://faveladiscos.bandcamp.com/"
                    imageUrl={favelaLogo}
                    title="Favela Discos"
                />
                <Logo imageUrl={CamaraLogo} title="Câmara Municipal do Porto" />
            </div>
        </div>
    );
};

export default AlbumContent;