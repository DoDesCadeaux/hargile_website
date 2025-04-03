"use client"

import {useEffect} from "react";
import Lenis from "lenis";
import {NextIntlClientProvider} from "next-intl";
import {router} from "next/client";
import {motion} from "framer-motion";


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
            <motion.main
                initial="hidden" // Set the initial state to variants.hidden
                animate="enter" // Animated state to variants.enter
                exit="exit" // Exit state (used later) to variants.exit
                transition={{type: 'linear'}} // Set the transition to linear
                className=""
            >
                <Component {...pageProps} />
            </motion.main>
        </NextIntlClientProvider>
    );
}
