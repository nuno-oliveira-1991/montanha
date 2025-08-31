import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MainPanel from "./main-panel";
import NavbarButton from "./navbar-button";
import AboutContent from "./panel-content/about-content";
import ContactContent from "./panel-content/contact-content";
import LiveContent from "./panel-content/live-content";
import AlbumContent from "./panel-content/album-content";
import VideosContent from "./panel-content/videos-content";

const Navbar: React.FC = () => {
    const [activePanel, setActivePanel] = useState<string | null>("Videos");

    const panelRef = useRef<HTMLDivElement | null>(null);

    const buttons = ['About', 'Contact', 'Alvorada', 'Videos', 'Live', 'Merch'];

    // Close panel when clicking outside
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
            window.open('https://faveladiscos.bandcamp.com/merch', '_blank');
            return;
        }
        setActivePanel(button);
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
                    >
                        {activePanel === 'About' && <AboutContent />}
                        {activePanel === 'Contact' && <ContactContent />}
                        {activePanel === 'Alvorada' && <AlbumContent />}
                        {activePanel === 'Videos' && <VideosContent />}
                        {activePanel === 'Live' && <LiveContent />}
                    </MainPanel>
                )}
            </AnimatePresence>
            <div
                className="absolute z-20 color-white bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4"
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
        </>
    );
};

export default Navbar;