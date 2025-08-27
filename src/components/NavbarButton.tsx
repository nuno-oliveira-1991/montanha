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
      className={`nav-button px-4 py-1 uppercase text-white rounded-md transition-all duration-300 border-[1px] ${
        isActive 
          ? 'border-white bg-white/10' 
          : 'border-transparent hover:border-white'
      }`}
    >
      {label}
    </button>
  );
};

export default NavBarButton;