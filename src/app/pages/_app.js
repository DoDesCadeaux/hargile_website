"use client"

import {useEffect} from "react";
import Lenis from "lenis";
import "@/styles/globals.css";
import {NextIntlClientProvider} from "next-intl";
import {router} from "next/client";



export default function App({Component, pageProps}) {
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

        return () => lenis.destroy();
    }, []);

    return (
        <NextIntlClientProvider
            locale={router.locale}
            timeZone="Europe/Bruxelles"
            messages={pageProps.messages}
        >
            <Component {...pageProps} />
        </NextIntlClientProvider>
    );
}
