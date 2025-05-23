"use client";

import {useEffect} from 'react';
import Footer from "@/components/footer/Footer";
import OptimizedSvgFilter from "@/components/navigation/opitmized-svg-filter";
import {usePageTransition} from '@/components/TransitionLink';


export default function ClientLayoutContent({children}) {
    "use client";
    const {transitionState} = usePageTransition();

    // Apply transition classes based on state
    useEffect(() => {
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
    }, [transitionState]);

    return (
        <>
            <div className="content-container page-exit">
                <OptimizedSvgFilter/>
                {children}
                <Footer/>
            </div>
        </>
    );
}
