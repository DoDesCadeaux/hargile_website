"use client"

import React from "react";

// Global transition state
let isTransitioning = false;
let transitionCallbacks = [];

// Function to subscribe to transition events
function subscribeToTransition(callback) {
    transitionCallbacks.push(callback);
    return () => {
        transitionCallbacks = transitionCallbacks.filter(cb => cb !== callback);
    };
}

// Function to trigger transition manually
export function triggerTransition(callback, delay = 600) {
    if (isTransitioning) return;

    isTransitioning = true;

    // Notify all subscribers
    transitionCallbacks.forEach(cb => cb(true));

    // Add class to prevent scrolling
    document.documentElement.classList.add('page-transitioning');

    // Execute callback after delay
    setTimeout(() => {
        if (callback) callback();

        // Reset state after navigation
        setTimeout(() => {
            isTransitioning = false;
            document.documentElement.classList.remove('page-transitioning');
            transitionCallbacks.forEach(cb => cb(false));
        }, 200); // Small delay after page load
    }, delay);
}

// Custom Link component that triggers transition
export function TransitionLink({href, children, className, onClick, delay = 600, ...props}) {
    "use client"
    const handleClick = (e) => {
        e.preventDefault();

        // Call original onClick if provided
        if (onClick) onClick(e);

        // Trigger transition
        triggerTransition(() => {
            window.location.href = href;
        }, delay);
    };

    return (
        <a href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
}

export function usePageTransition() {
    const [transitioning, setTransitioning] = React.useState(isTransitioning);

    React.useEffect(() => {
        return subscribeToTransition(setTransitioning);
    }, []);

    return {
        isTransitioning: transitioning,
        triggerTransition
    };
}

