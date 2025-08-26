const Navbar: React.FC = () => {
    const buttons = ['Alvorada', 'Merch', 'Gigs', 'Videos', 'About', 'Social'];
    return (
        <div
            style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '2rem',
                zIndex: 20,
                fontFamily: 'Orbitron, monospace',
                color: 'white',
                fontSize: '1rem',
                letterSpacing: '0.1em',
            }}
        >
            {buttons.map((btn) => (
                <button
                    key={btn}
                    style={{
                        background: 'transparent',
                        border: '1px solid white',
                        padding: '0.5rem 1rem',
                        color: 'white',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'white';
                        (e.currentTarget as HTMLButtonElement).style.color = '#02010F';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                        (e.currentTarget as HTMLButtonElement).style.color = 'white';
                    }}
                >
                {btn}
                </button>
            ))}
        </div>
    );
};

export default Navbar;