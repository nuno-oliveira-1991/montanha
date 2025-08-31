import { useState, useRef, useEffect } from "react";
import useMobileDetection from "../hooks/useMobileDetection";
import { AnimatePresence } from "framer-motion";
import MainPanel from "./MainPanel";
import NavbarButton from "./NavbarButton";
import HamburgerMenu from "./HamburgerMenu";
import AboutContent from "./panel-content/AboutContent";
import ContactContent from "./panel-content/ContactContent";
import LiveContent from "./panel-content/LiveContent";
import AlbumContent from "./panel-content/AlbumContent";
import VideosContent from "./panel-content/VideosContent";

const Navbar: React.FC = () => {
    const [activePanel, setActivePanel] = useState<string | null>("Videos");
    const isMobile = useMobileDetection();
    const panelRef = useRef<HTMLDivElement | null>(null);

    const buttons = ['Merch', 'Alvorada', 'Live', 'Videos', 'About', 'Contact'];
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest('.nav-button') || !panelRef.current) return;
            if (!panelRef.current.contains(target)) {
                setActivePanel(null);
            }
        };
        if (activePanel) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activePanel]);

    const handleButtonClick = (button: string) => {
        if (button === 'Merch') {
            window.open('https://montanha.bandcamp.com/alvorada', '_blank');
            return;
        }
        setActivePanel(button);
    };

    const handleBackToMenu = () => {
        setActivePanel(null);
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {activePanel && (
                    <MainPanel
                        key={activePanel}
                        isOpen={true}
                        onClose={() => setActivePanel(null)}
                        title={activePanel}
                        panelRef={panelRef}
                        onBackToMenu={handleBackToMenu}
                    >
                        {activePanel === 'About' && <AboutContent />}
                        {activePanel === 'Contact' && <ContactContent />}
                        {activePanel === 'Alvorada' && <AlbumContent />}
                        {activePanel === 'Videos' && <VideosContent />}
                        {activePanel === 'Live' && <LiveContent />}
                    </MainPanel>
                )}
            </AnimatePresence>
            
            {/* Desktop Navigation */}
            {!isMobile && (
                <div
                    className="absolute z-20 text-[#ffffff] bottom-4 sm:bottom-12 left-1/2 transform -translate-x-1/2 gap-2 sm:gap-4 px-4 flex"
                >
                {buttons.map((button) => (
                    <NavbarButton
                        key={button}
                        label={button}
                        isActive={activePanel === button}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleButtonClick(button);
                        }}
                    />
                ))}
            </div>
            )}
            
            {/* Mobile Hamburger Menu */}
            <HamburgerMenu
                buttons={buttons}
                activePanel={activePanel}
                onButtonClick={handleButtonClick}
                showAsCloseButton={!!activePanel}
                onClosePanel={handleBackToMenu}
            />
        </>
    );
};

export default Navbar;