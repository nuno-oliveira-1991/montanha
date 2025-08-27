import { motion, AnimatePresence } from "framer-motion";

interface MainPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  panelRef?: React.RefObject<HTMLDivElement | null>;
}
;
const MainPanel: React.FC<MainPanelProps> = ({ isOpen, onClose, title = '', children, panelRef }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
        >
          <div ref={panelRef} className="relative bg-[#02010F] rounded-md backdrop-blur-sm border-[1px] border-white w-full max-w-4xl h-[70vh] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center py-1 pl-4 pr-2 border-b-[1px] border-white">
              <h2 className="text-md font-bold uppercase text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-[4px] w-6 h-6 flex rounded-md items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {children || <p className="text-center text-white/70">Content goes here...</p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainPanel;