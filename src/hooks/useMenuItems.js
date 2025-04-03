"use client"

import {useEffect, useRef} from 'react';
import anime from 'animejs';

export const useMenuItems = (isOpen) => {
    const menuItemsAnimation = useRef(null);
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

        if (isOpen) {
            const animationTimer = setTimeout(() => {
                anime.set('.navbar__navigation__item', {
                    translateX: 80,
                    opacity: 0
                });

                menuItemsAnimation.current = anime({
                    targets: '.navbar__navigation__item',
                    translateX: 0,
                    opacity: 1,
                    duration: 500,
                    easing: 'easeOutQuad',
                    delay: (el, i) => 950 + (i * 200)
                });
            }, 100);

            timers.current.push(animationTimer);
        } else {
            if (menuItemsAnimation.current) {
                menuItemsAnimation.current.pause();
            }

            menuItemsAnimation.current = anime({
                targets: '.navbar__navigation__item',
                translateX: -80,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuad',
                delay: 500
            });
        }
    }, [isOpen]);
};
