import { useState, useRef, useEffect } from "react";
import useMobileDetection from "../hooks/useMobileDetection";
import { AnimatePresence, motion } from "framer-motion";
import MainPanel from "./MainPanel";
import NavbarButton from "./NavbarButton";
import HamburgerMenu from "./HamburgerMenu";
import AboutContent from "./panel-content/AboutContent";
import ContactContent from "./panel-content/ContactContent";
import LiveContent from "./panel-content/LiveContent";
import AlbumContent from "./panel-content/AlbumContent";
import VideosContent from "./panel-content/VideosContent";
import MerchContent from "./panel-content/MerchContent";

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
                        {activePanel === 'Merch' && <MerchContent />}
                    </MainPanel>
                )}
            </AnimatePresence>
            
            {/* Desktop Navigation */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="fixed z-20 text-[#ffffff] bottom-4 sm:bottom-12 left-0 right-0 flex justify-center items-center w-full"
                >
                <div className="flex gap-6 sm:gap-8 md:gap-10 justify-center">
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
            </motion.div>
            )}
            
            {/* Mobile Hamburger Menu */}
            {isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    <HamburgerMenu
                        buttons={buttons}
                        activePanel={activePanel}
                        onButtonClick={handleButtonClick}
                        showAsCloseButton={!!activePanel}
                        onClosePanel={handleBackToMenu}
                    />
                </motion.div>
            )}
        </>
    );
};

export default Navbar;