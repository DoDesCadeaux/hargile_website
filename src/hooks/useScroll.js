"use client"; // Mark as client-only code

import {useCallback, useEffect} from 'react';
import scrollManager from "@/services/scroll-manager";

export function useScroll(
    {
        shouldLock = false,
        isTransitioning = false
    } = {}) {

    // Initialize scroll on mount - client side only
    useEffect(() => {
        console.log("[useScroll] Initializing scrollManager on mount");
        scrollManager.initialize();

        return () => {
            // Only unlock when unmounting, don't destroy
            console.log("[useScroll] Component unmounting, unlocking scroll");
            scrollManager.unlock();
        };
    }, []);

    // Handle lock state changes - client side only
    useEffect(() => {
        console.log(`[useScroll] Lock state check: shouldLock=${shouldLock}, isTransitioning=${isTransitioning}`);

        if (shouldLock || isTransitioning) {
            console.log("[useScroll] Locking scroll");
            scrollManager.lock();
        } else {
            console.log("[useScroll] Unlocking scroll");
            scrollManager.unlock();
        }
    }, [shouldLock, isTransitioning]);

    const scrollTo = useCallback((target, options) => {
        console.log(`[useScroll] scrollTo called with target=${target}`);
        scrollManager.scrollTo(target, options);
    }, []);

    return {
        scrollTo,
        lenis: scrollManager.instance,
        isLocked: scrollManager.isLocked
    };
}

export default useScroll;
