import React from "react";

interface NavBarButtonProps {
  label: string;
  onClick: (event: React.MouseEvent) => void;
  isActive?: boolean;
};

const NavBarButton: React.FC<NavBarButtonProps> = ({ label, onClick, isActive = false }) => {
  return (
    <button
      onClick={(e: React.MouseEvent) => onClick(e)}
      className={`nav-button h-8 sm:h-10 text-xs sm:text-sm uppercase transition-all duration-300 relative group flex items-center justify-center ${
        isActive ? 'text-[#ffffff]' : 'text-[#ffffff] hover:text-[#ffffff]'
      }`}
      style={{  
        fontFamily: 'Array'
      }}
    >
      <span className="relative text-[#ffffff] font-medium">
        {label}
        {/* Active underline */}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffffff]"></div>
        )}
        {/* Hover underline */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></div>
      </span>
    </button>
  );
};

export default NavBarButton;