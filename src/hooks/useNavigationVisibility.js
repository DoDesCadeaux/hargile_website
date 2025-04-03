"use client"

import {useEffect, useRef, useState} from 'react';

export const useNavigationVisibility = (isOpen) => {
    const [menuItemDisplayed, setMenuItemDisplayed] = useState(false);
    const [navigationVisible, setNavigationVisible] = useState(false);
    const timers = useRef([]);

    const clearTimers = () => {
        timers.current.forEach(timer => clearTimeout(timer));
        timers.current = [];
    };

    useEffect(() => {
        return () => clearTimers();
    }, []);

    useEffect(() => {
        clearTimers();

        document.body.style.overflow = isOpen ? "hidden" : "auto";

        if (isOpen) {
            setMenuItemDisplayed(true);

            const visibilityTimer = setTimeout(() => {
                setNavigationVisible(true);
            }, 50);

            timers.current.push(visibilityTimer);
        } else {
            setNavigationVisible(false);

            const hideTimer = setTimeout(() => {
                setMenuItemDisplayed(false);
            }, 800);

            timers.current.push(hideTimer);
        }
    }, [isOpen]);

    return {menuItemDisplayed, navigationVisible};
};
