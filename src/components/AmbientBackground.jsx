import React, { useEffect, useState } from 'react';

const AmbientBackground = () => {
    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        const updateTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            setCurrentTheme(theme);
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    // Only show in Ambient Motion theme
    if (currentTheme !== 'ambient') {
        return null;
    }

    // Multiple floating ambient shapes
    const shapes = [
        { size: 300, top: '10%', left: '20%', delay: 0, duration: 25 },
        { size: 200, top: '60%', left: '70%', delay: 5, duration: 20 },
        { size: 250, top: '80%', left: '10%', delay: 10, duration: 22 },
        { size: 150, top: '30%', left: '80%', delay: 3, duration: 18 }
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
            {shapes.map((shape, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        top: shape.top,
                        left: shape.left,
                        background: `radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.05) 50%, transparent 70%)`,
                        filter: 'blur(40px)',
                        animation: `ambient-float ${shape.duration}s ease-in-out infinite`,
                        animationDelay: `${shape.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

export default AmbientBackground;
