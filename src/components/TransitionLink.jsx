"use client";

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';

const PageTransitionContext = createContext({
    isTransitioning: false,
    setIsTransitioning: () => {},
});

export const usePageTransition = () => {
    return useContext(PageTransitionContext);
};

export const PageTransitionProvider = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    return (
        <PageTransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
            {children}
        </PageTransitionContext.Provider>
    );
};

export const TransitionLink = ({ href, children, className, onClick, ...props }) => {
    const router = useRouter();
    const { setIsTransitioning } = usePageTransition();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleClick = (e) => {
        if (!isMounted) return;

        e.preventDefault();

        if (onClick) {
            onClick(e);
        }

        setIsTransitioning(true);

        setTimeout(() => {
            router.push(href);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 1000);
        }, 500);
    };

    if (!isMounted) {
        return (
            <Link href={href} className={className} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <a href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
};
