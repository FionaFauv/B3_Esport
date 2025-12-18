import React from "react";

interface MeruBackgroundProps {
    children: React.ReactNode;
}

export function MeruBackground({ children }: MeruBackgroundProps) {
    return (
        <div className="meru-page-background">
            {children}
            {/* Particules décoratives */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="meru-particle" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
                <div className="meru-particle" style={{ left: '80%', top: '30%', animationDelay: '1s' }}></div>
                <div className="meru-particle" style={{ left: '20%', top: '70%', animationDelay: '2s' }}></div>
                <div className="meru-particle" style={{ left: '90%', top: '60%', animationDelay: '1.5s' }}></div>
                <div className="meru-particle" style={{ left: '50%', top: '40%', animationDelay: '0.5s' }}></div>
                <div className="meru-particle" style={{ left: '15%', top: '50%', animationDelay: '3s' }}></div>
                <div className="meru-particle" style={{ left: '70%', top: '15%', animationDelay: '2.5s' }}></div>
                <div className="meru-particle" style={{ left: '40%', top: '80%', animationDelay: '1.8s' }}></div>
                <div className="meru-particle" style={{ left: '60%', top: '45%', animationDelay: '0.8s' }}></div>
                <div className="meru-particle" style={{ left: '25%', top: '35%', animationDelay: '3.5s' }}></div>
                <div className="meru-particle" style={{ left: '85%', top: '75%', animationDelay: '2.2s' }}></div>
                <div className="meru-particle" style={{ left: '5%', top: '85%', animationDelay: '1.2s' }}></div>
            </div>
        </div>
    );
}