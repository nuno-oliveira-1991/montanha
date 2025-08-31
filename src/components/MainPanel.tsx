import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMobileDetection from "../hooks/useMobileDetection";
import useViewportHeight from "../hooks/useViewportHeight";
import { usePanelContext } from "../contexts/PanelContext";

interface MainPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  onBackToMenu?: () => void;
};

const MainPanel: React.FC<MainPanelProps> = ({ children, isOpen, onClose, title, panelRef, onBackToMenu }) => {
  const [renderMobile, setRenderMobile] = useState<boolean | null>(null);
  const { setPanelOpen } = usePanelContext();
  const isMobile = useMobileDetection();
  const viewportHeight = useViewportHeight();
  
  useEffect(() => {
    if (isOpen || renderMobile === null) {
      setRenderMobile(isMobile);
    }
  }, [isMobile]);
  
  useEffect(() => {
    setPanelOpen(isOpen);
    if (isOpen) {
      setRenderMobile(isMobile);
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      setRenderMobile(null);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [isOpen, setPanelOpen, isMobile]);
  
  if (isOpen && renderMobile === null) {
    return null;
  }
  
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop - mobile mode */}
          {renderMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black backdrop-blur-md z-40"
              onClick={onClose}
            />
          )}
          
          {/* Panel Content */}
          {renderMobile ? (
            <motion.div
              key={`${title}-mobile`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-50 w-full h-full"
            >
              <div className="w-full flex flex-col bg-transparent overflow-hidden touch-none" ref={panelRef} style={{ height: viewportHeight }}>
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-lg uppercase text-[#ffffff]" style={{ fontFamily: 'Array' }}>{title}</h2>
                </div>
                <div className="flex-1 overflow-hidden px-4 pb-4 h-full">
                  {children || <p className="text-center text-[#ffffff]/70">Content goes here...</p>}
                </div>
              </div>
            </motion.div>
          ) : renderMobile === false && (
            <motion.div
              key={`${title}-desktop`}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-50 w-full h-full"
            >
              <div className="relative bg-[#050511] rounded-md border-[1px] border-white w-full max-w-4xl overflow-hidden flex flex-col" 
                   ref={panelRef} 
                   style={{ height: `calc(${viewportHeight} * 0.7)`, maxHeight: `calc(${viewportHeight} * 0.7)` }}>
                <div className="flex justify-between items-center py-1 pl-4 pr-2 border-b-[1px] border-white">
                  <h2 className="text-md uppercase text-[#ffffff]" style={{ fontFamily: 'Array' }}>{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-[4px] w-6 h-6 flex rounded-md items-center justify-center text-[#ffffff] hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1 h-full">
                  {children || <p className="text-center text-[#ffffff]/70">No Content</p>}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default MainPanel;