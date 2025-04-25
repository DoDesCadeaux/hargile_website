"use client";

import {Suspense, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';
import Footer from "@/components/footer/Footer";
import OptimizedSvgFilter from "@/components/navigation/opitmized-svg-filter";
import Navbar from "@/components/navigation/navbar";
import {usePageTransition} from '@/components/TransitionLink';
import {usePathname} from "@/i18n/navigation";
import Loading from "@/components/Loading";

// Dynamic imports in a client component where they're allowed
const EarthVideoLayer = dynamic(() => import("@/components/EarthVideoLayer"), {
    ssr: false
});

export default function ClientLayoutContent({children}) {
    const {transitionState} = usePageTransition();
    const intlReady = useRef(null);
    const timer = useRef(null);
    const ready = useRef(false);

    try {
        intlReady.current = usePathname()
    } catch (e) {
        intlReady.current = null;
    }

    useEffect(() => {
        if (intlReady.current === null) return;

        if (timer.current === null) {
            timer.current = setTimeout(() => {
                ready.current = true;
            }, 1000)
            return () => clearTimeout(timer.current);
        }

    }, []);


    // Apply transition classes based on state
    useEffect(() => {
        if (intlReady.current === false) return;

        const contentContainer = document.querySelector('.content-container');
        const pageExitElement = document.querySelector('.page-exit');
        const heroSection = document.querySelector('.hero-section');
        const ourSolutionsSection = document.querySelector('.our-solutions-section');
        const trustedBrandsSection = document.querySelector('.trusted-brands-section');

        // Remove all transition classes first
        document.body.classList.remove('exiting', 'entering', 'transitioning');
        contentContainer?.classList.remove('exiting', 'entering', 'transitioning');
        pageExitElement?.classList.remove('exiting', 'entering');
        heroSection?.classList.remove('exiting');
        ourSolutionsSection?.classList.remove('exiting');
        trustedBrandsSection?.classList.remove('exiting');

        // Apply appropriate classes based on transition state
        if (transitionState === 'exiting') {
            document.body.classList.add('exiting');
            contentContainer?.classList.add('exiting');
            pageExitElement?.classList.add('exiting');
            heroSection?.classList.add('exiting');
            ourSolutionsSection?.classList.add('exiting');
            trustedBrandsSection?.classList.add('exiting');

            // Disable scrolling during transition
            document.body.style.overflow = 'hidden';
        } else if (transitionState === 'entering') {
            document.body.classList.add('entering');
            contentContainer?.classList.add('entering');

            // Re-enable scrolling when entering new page
            document.body.style.overflow = '';
        } else {
            // Reset overflow when idle
            document.body.style.overflow = '';
        }
    }, [transitionState, intlReady.current]);

    if (intlReady.current === null) {
        return <Loading/>;
    }

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <EarthVideoLayer/>
                <div className="content-container page-exit">
                    <OptimizedSvgFilter/>
                    <Navbar/>
                    {children}
                    <Footer/>
                </div>
            </Suspense>
        </>
    );
}
