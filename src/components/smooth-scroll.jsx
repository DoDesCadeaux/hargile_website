"use client";

import {useLayoutEffect, useRef} from "react";
import Lenis from "lenis";

export default function SmoothScroll({children}) {
    const lenisRef = useRef(null);

    useLayoutEffect(() => {
        const lenis = new Lenis({
            wrapper: document.querySelector('[data-lenis-wrapper]') || window,
            content: document.querySelector('[data-lenis-content]') || document.documentElement,
            lerp: 0.1,
            smooth: true,
            wheelMultiplier: 1,
            gestureOrientation: 'vertical',
            normalizeWheel: true,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}

// Helper functions remain the same
export function lockScroll() {
    if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
        document.body.style.overflow = 'hidden';
    }
}

export function unlockScroll() {
    if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
        document.body.style.overflow = '';
    }
}

export function scrollTo(target, options) {
    if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(target, options);
    }
}
