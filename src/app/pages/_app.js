"use client"
import {NextIntlClientProvider} from "next-intl";
import {SpeedInsights} from "@vercel/speed-insights/next"
import {useEffect, useState} from "react";
import {ThemeProvider} from "@/components/providers/theme-provider";
import Loading from "@/components/Loading";

export default function App({Component, pageProps}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsTransitioning(true);
            document.body.classList.add('page-transitioning');
        };

        const handleRouteChangeComplete = () => {
            setTimeout(() => {
                setIsTransitioning(false);
                document.body.classList.remove('page-transitioning');
            }, 100);
        };

        if (typeof window !== 'undefined') {
            const nextRouter = require('next/router');
            nextRouter.default.events.on('routeChangeStart', handleRouteChangeStart);
            nextRouter.default.events.on('routeChangeComplete', handleRouteChangeComplete);

            return () => {
                nextRouter.default.events.off('routeChangeStart', handleRouteChangeStart);
                nextRouter.default.events.off('routeChangeComplete', handleRouteChangeComplete);
            };
        }
    }, []);

    return (
        <>
            <ThemeProvider>
                {isMounted && isLoading && (
                    <Loading/>
                )}

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
                    <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}/>
                    <main className={`page-content ${!isTransitioning ? 'loaded' : ''}`}>
                        <Component {...pageProps} />
                    </main>
                </NextIntlClientProvider>
            </ThemeProvider>
        </>
    );
}
