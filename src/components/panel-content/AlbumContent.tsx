import React from 'react';
import Logo from '../Logo';
import CamaraLogo from '../../assets/porto-logo.png';
import favelaLogo from "../../assets/favela-logo.png"

const AlbumContent: React.FC = () => {
    return (
        <div className="w-full h-full relative">
            <div className="w-full h-[90%] flex flex-col items-center justify-center space-y-8 text-white">
                <p>COMING SOON</p>
                <br />
                <p>20 / 10 / 2025</p>
            </div>
            <div className="absolute flex flex items-center justify-center gap-2 bottom-0 right-0">
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