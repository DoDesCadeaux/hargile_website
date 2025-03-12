"use client"

import { useEffect } from "react";
import Lenis from "lenis";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
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

    return <Component {...pageProps} />;
}
