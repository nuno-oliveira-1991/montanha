import React from 'react';
import favelaLogo from '../assets/favela-logo.png';

const FavelaLogo: React.FC = () => {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: '3rem',
                right: '1.5rem',
                zIndex: 30,
            }}
        >
            <a 
                href="https://faveladiscos.bandcamp.com/"
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    display: 'block',
                    transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
                <img 
                    src={favelaLogo} 
                    alt="Favela Records" 
                    style={{
                        width: '60px',
                        height: 'auto',
                        filter: 'brightness(0) invert(1)',
                    }}
                />
            </a>
        </div>
    );
};

export default FavelaLogo;
