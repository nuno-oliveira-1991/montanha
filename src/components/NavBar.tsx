import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MainPanel from "./MainPanel";
import NavbarButton from "./NavbarButton";

const Navbar: React.FC = () => {
    const [activePanel, setActivePanel] = useState<string | null>(null);

    const panelRef = useRef<HTMLDivElement | null>(null);

    const buttons = ['About', 'Contact', 'Alvorada', 'Gigs', 'Videos', 'Merch', 'Social'];

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
                        {activePanel === 'About' && <div className="text-white">About content</div>}
                        {activePanel === 'Contact' && <div className="text-white">Contact content</div>}
                        {activePanel === 'Alvorada' && <div className="text-white">Alvorada content</div>}
                        {activePanel === 'Gigs' && <div className="text-white">Gigs content</div>}
                        {activePanel === 'Videos' && <div className="text-white">Videos content</div>}
                        {activePanel === 'Merch' && <div className="text-white">Merch content</div>}
                        {activePanel === 'Social' && <div className="text-white">Social content</div>}
                    </MainPanel>
                )}
            </AnimatePresence>
            <div
                className="absolute z-20 color-white bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4"
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