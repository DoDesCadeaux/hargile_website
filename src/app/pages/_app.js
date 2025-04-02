"use client"

import {useEffect} from "react";
import Lenis from "lenis";
import {NextIntlClientProvider} from "next-intl";
import {router} from "next/client";


export default function App({Component, pageProps}) {
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.1,
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
