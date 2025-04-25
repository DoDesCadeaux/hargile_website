"use client"

import {NextIntlClientProvider} from "next-intl";
import {SpeedInsights} from "@vercel/speed-insights/next"
import {usePageTransition} from "@/components/TransitionLink";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {useEffect, useRef} from "react";
import Loading from "@/components/Loading";

// Example of integrating the custom transition system with your app

export default function App({Component, pageProps}) {
    const {isTransitioning} = usePageTransition();
    const isLoading = useRef(true);
    const loadingTimeout = useRef(null);

    useEffect(() => {
        if (isLoading.current) {
            loadingTimeout.current = setTimeout(() => {
                isLoading.current = false;
            }, 1500)

            return () => clearTimeout(loadingTimeout.current)
        }
    })
    return (
        <>
            <ThemeProvider>

                {isLoading.current && <Loading/>}

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
                    <SpeedInsights/>

                    {/* Black overlay element for transitions */}
                    <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}/>

                    {/* Page content */}
                    <main className={`page-content ${!isTransitioning ? 'loaded' : ''}`}>
                        <Component {...pageProps} />

                    </main>
                </NextIntlClientProvider>
            </ThemeProvider>
        </>
    );
}
