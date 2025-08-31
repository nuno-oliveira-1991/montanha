import React from 'react';

interface MobileLogoProps {
    linkUrl?: string;
    imageUrl: string;
    title: string;
}

const MobileLogo: React.FC<MobileLogoProps> = ({
    linkUrl, imageUrl, title  
}) => {
    const imageElement = (
        <img 
            src={imageUrl} 
            alt={title}
            title={title}
            style={{
                width: '40px',
                height: 'auto',
                filter: 'brightness(0) invert(1)',
            }}
        />
    );

    return (
        <div style={{ zIndex: 30 }}>
            {linkUrl ? (
                <a 
                    href={linkUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        display: 'block',
                        transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    {imageElement}
                </a>
            ) : (
                <div style={{ display: 'block' }}>
                    {imageElement}
                </div>
            )}
        </div>
    );
};

export default MobileLogo;