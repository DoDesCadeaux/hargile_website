"use client"

import {useEffect, useState} from "react";
import Lenis from "lenis";
import {NextIntlClientProvider} from "next-intl";
import {usePageTransition} from "@/components/TransitionLink";

// Example of integrating the custom transition system with your app

export default function App({Component, pageProps}) {
    const [lenis, setLenis] = useState(null);
    const {isTransitioning} = usePageTransition();

    // Initialize Lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        setLenis(lenis);

        return () => lenis.destroy();
    }, []);

    // Control scrolling during transitions
    useEffect(() => {
        if (!lenis) return;

        if (isTransitioning) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [isTransitioning, lenis]);

    return (
        <NextIntlClientProvider
            locale={pageProps.locale}
            timeZone="Europe/Bruxelles"
            messages={pageProps.messages}
        >
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

            {/* Black overlay element for transitions */}
            <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}/>

            {/* Page content */}
            <main className={`page-content ${!isTransitioning ? 'loaded' : ''}`}>
                <Component {...pageProps} />
            </main>
        </NextIntlClientProvider>
    );
}
