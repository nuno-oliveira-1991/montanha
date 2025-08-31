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
      className={`nav-button w-24 h-10 uppercase text-white transition-all duration-300 relative group flex items-center justify-center ${
        isActive ? 'text-white' : 'text-white hover:text-white'
      }`}
      style={{  
        fontFamily: 'Array'
      }}
    >
      <span className="relative">
        {label}
        {/* Active underline */}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
        )}
        {/* Hover underline - grows from left to right */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
      </span>
    </button>
  );
};

export default NavBarButton;