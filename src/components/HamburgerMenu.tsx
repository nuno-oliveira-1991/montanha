import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMobileDetection from "../hooks/useMobileDetection";

interface HamburgerMenuProps {
  buttons: string[];
  activePanel: string | null;
  onButtonClick: (button: string) => void;
  showAsCloseButton?: boolean;
  onClosePanel?: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ buttons, activePanel, onButtonClick, showAsCloseButton, onClosePanel }) => {
  const isMobile = useMobileDetection();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (button: string) => {
    onButtonClick(button);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (showAsCloseButton && onClosePanel) {
      onClosePanel();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={handleClick}
        className={`fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center ${!isMobile && !showAsCloseButton ? 'hidden' : ''}`}
      >
        <div className="relative w-5 h-4 flex flex-col justify-center">
          {showAsCloseButton ? (
            // Left Arrow
            <>
              <motion.div
                initial={{ rotate: 0, x: 0, y: 0 }}
                animate={{ rotate: 45, x: 0, y: 0 }}
                className="absolute w-3 h-0.5 bg-white origin-right transition-all duration-300"
                style={{ top: '50%', left: '40%', transform: 'translate(-25%, -50%)' }}
              />
              <motion.div
                initial={{ rotate: 0, x: 0, y: 0 }}
                animate={{ rotate: -45, x: 0, y: 0 }}
                className="absolute w-3 h-0.5 bg-white origin-right transition-all duration-300"
                style={{ top: '50%', left: '40%', transform: 'translate(-25%, -50%)' }}
              />
            </>
          ) : (
            // Cross
            <>
              <motion.div
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                className="absolute w-5 h-0.5 bg-white origin-center transition-all duration-300"
              />
              <motion.div
                animate={isOpen ? { opacity: 0 , rotate: 0, x: 0, y: 0} : { opacity: 1 , rotate: 0, x: 0, y: 0}}
                className="absolute w-5 h-0.5 bg-white origin-center transition-all duration-300"
              />
              <motion.div
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                className="absolute w-5 h-0.5 bg-white origin-center transition-all duration-300"
              />
            </>
          )}
        </div>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {(isOpen && !showAsCloseButton && isMobile) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-20"
          >
            <div className="flex flex-col space-y-6 p-8">
              {buttons.map((button) => (
                <button
                  key={button}
                  onClick={() => handleButtonClick(button)}
                  className={`text-center px-6 py-3 uppercase transition-all duration-300 text-lg ${
                    activePanel === button 
                      ? 'text-[#ffffff]' 
                      : 'text-[#ffffff]'
                  }`}
                  style={{ fontFamily: 'Array' }}
                >
                  {button}
                  {activePanel === button && (
                    <div className="w-1 h-1 bg-[#ffffff] rounded-full inline-block ml-2" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black backdrop-blur-md z-10"
            onClick={handleClick}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;