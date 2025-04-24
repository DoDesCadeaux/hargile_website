"use client";

import {useEffect} from 'react';
import {usePageTransition} from '@/components/TransitionLink';

export default function TransitionHandler({children}) {
    const {isTransitioning, transitionState} = usePageTransition();

    useEffect(() => {
        const contentContainer = document.querySelector('.content-container');
        const pageExitElement = document.querySelector('.page-exit');
        const heroSection = document.querySelector('.hero-section');

        // Remove all transition classes first
        document.body.classList.remove('exiting', 'entering');
        contentContainer?.classList.remove('exiting', 'entering');
        pageExitElement?.classList.remove('exiting', 'entering');
        heroSection?.classList.remove('exiting', 'entering');

        // Apply appropriate classes based on transition state
        if (transitionState === 'exiting') {
            document.body.classList.add('exiting');
            contentContainer?.classList.add('exiting');
            pageExitElement?.classList.add('exiting');
            heroSection?.classList.add('exiting');

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

        return () => {
            // Cleanup function to reset classes if component unmounts during transition
            if (isTransitioning) {
                document.body.style.overflow = '';
            }
        };
    }, [isTransitioning, transitionState]);

    return <>{children}</>;
}
