"use client"
import "./styles/global.scss";
import {routing} from "@/i18n/routing";
import RootClientWrapper from "@/components/layout/RootClientWrapper";
import {useEffect, useState} from "react";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {usePageTransition} from "@/components/TransitionLink";
import {SpeedInsights} from "@vercel/speed-insights/next"

export default function RootLayout({children}) {
    const {isTransitioning} = usePageTransition();
    const [initialLoading, setInitialLoading] = useState(true);
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);

        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (<html lang={routing.defaultLocale ?? 'en'}>
    <head>
        <title>Hargile</title>
        <style jsx global>{`
            .page-transitioning {
                overflow: hidden !important;
            }

            html, body {
                overscroll-behavior-y: none;
            }

            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                z-index: 9999;
                pointer-events: none;
                opacity: 0;
                transition: opacity 2500ms cubic-bezier(0.22, 1, 0.36, 1);
            }

            .page-transition-overlay.active {
                opacity: 1;
            }

            .page-content {
                min-height: 100vh;
                opacity: 0;
                transition: opacity 1200ms cubic-bezier(0.33, 1, 0.68, 1);
            }

            .page-content.loaded {
                opacity: 1;
            }
        `}</style>
        <style dangerouslySetInnerHTML={{
            __html: `
                .loading-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    transition: opacity 0.5s ease;
                }
                
                .loading-container.fade-out {
                    opacity: 0;
                    pointer-events: none;
                }
                
                @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes dashArray {
                    0% { stroke-dasharray: 15 85; }
                    20% { stroke-dasharray: 25 75; }
                    40% { stroke-dasharray: 35 65; }
                    60% { stroke-dasharray: 45 55; }
                    80% { stroke-dasharray: 35 65; }
                    100% { stroke-dasharray: 15 85; }
                }
                
                @keyframes strokeWidth {
                    0% { stroke-width: 1; }
                    20% { stroke-width: 2; }
                    40% { stroke-width: 3; }
                    60% { stroke-width: 3; }
                    80% { stroke-width: 2; }
                    100% { stroke-width: 1; }
                }
                
                .loading-svg {
                    width: 30vh;
                    height: 30vh;
                }
                
                .loading-path {
                    fill: none;
                    stroke: #96b9fa;
                    stroke-width: 1;
                    stroke-linecap: round;
                    animation: rotate 1.5s linear infinite,
                               dashArray 3s ease-in-out infinite,
                               strokeWidth 5s ease-in-out infinite;
                    transform-origin: center;
                }
            `
        }}/>
    </head>
    <body style={{overflowX: 'hidden'}}>
    {/* Only show loading animation in the browser */}
    {isBrowser && (
        <div className={`loading-container ${!initialLoading ? 'fade-out' : ''}`}>
            <svg
                className="loading-svg"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="transparent"
                    strokeWidth="1"
                />
                <path
                    className="loading-path"
                    d="M 50,50 m 0,-45 a 45,45 0 1,1 0,90 a 45,45 0 1,1 0,-90"
                    pathLength="100"
                    strokeDasharray="20 80"
                    strokeDashoffset="0"
                />
            </svg>
        </div>
    )}


    <ThemeProvider>
        <RootClientWrapper>
            {/* Black overlay element for transitions */}
            <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}/>

            {/* Page content */}
            <main className={`page-content ${!isTransitioning && (!initialLoading || !isBrowser) ? 'loaded' : ''}`}>
                {children}
            </main>
        </RootClientWrapper>
    </ThemeProvider>

    <SpeedInsights/>
    </body>
    </html>);
}
