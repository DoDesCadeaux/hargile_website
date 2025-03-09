"use client"

import { useEffect } from "react";
import Lenis from "lenis";
import "@/styles/globals.css"; // Assure-toi d'avoir un fichier global

export default function App({ Component, pageProps }) {
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.1, // Ajuste la vitesse du scroll
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy(); // Nettoyage sur démontage
    }, []);

    return <Component {...pageProps} />;
}
