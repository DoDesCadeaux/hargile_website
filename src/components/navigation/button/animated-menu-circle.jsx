import styled from "styled-components";
import {useEffect, useRef} from "react";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";

const SvgCircle = styled.svg`
    width: ${({$width}) => $width ? `calc(${$width} * 1.8)` : 'calc(30px * 1.8)'};
    height: ${({$width}) => $width ? `calc(${$width} * 1.8)` : 'calc(30px * 1.8)'};
    min-width: calc(30px * 1.8);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) ${({$isOpen}) => $isOpen ? 'scale(1)' : 'scale(1)'};
    overflow: visible;
    z-index: 99;
    pointer-events: none;

    &.closed {
        transform: translate(-50%, -50%) scale(1);
        transition: transform 300ms ease-in;
    }
`;

const AnimatedCircle = styled.circle`
    fill: white;
    transition: r 800ms ease-in, opacity 600ms ease-in-out;
    r: ${({$r}) => $r}px;
    opacity: ${({$opacity}) => $opacity};
`;

const Ripple = styled.circle`
    fill: rgba(255, 255, 255, 0.3);
    transform-origin: center;
    opacity: ${({$opacity}) => $opacity};
    r: ${({$r}) => $r}px;
    animation: rippleEffect 1000ms ease-out;

    @keyframes rippleEffect {
        0% {
            opacity: 0.7;
            r: 150;
        }
        100% {
            opacity: 0;
            r: 300;
        }
    }
`;

export const AnimatedMenuCircle = ({width, menuIconAnimationTime, crashTriggered = false}) => {
    const siteNavigation = useSiteNavigation();
    const timerRef = useRef(null);
    const circleState = useRef({
        radius: 150,
        opacity: 0,
        showRipple: false,
        gaussianBlur: 2,
        isFirstRender: true
    });

    const growDelay = crashTriggered ? 100 : menuIconAnimationTime;

    useEffect(() => {
        // Clear any existing timers
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        const state = circleState.current;

        // Handle first render
        if (state.isFirstRender) {
            state.isFirstRender = false;
            state.radius = 150;
            state.opacity = 0;
            return;
        }

        // Update DOM directly for performance
        const circle = document.querySelector('.menu-animated-circle');
        const ripple = document.querySelector('.menu-ripple');

        if (!circle) return;

        // Handle crash triggered animation
        if (siteNavigation.isOpen && crashTriggered) {
            state.showRipple = true;
            state.opacity = 1;

            if (circle) {
                circle.setAttribute('opacity', '1');
            }

            if (ripple) {
                ripple.style.display = 'block';
            }

            timerRef.current = setTimeout(() => {
                state.radius = 30000;
                state.gaussianBlur = 5;

                if (circle) {
                    circle.setAttribute('r', '30000');
                }

                const filter = document.querySelector('#glowEffect feGaussianBlur');
                if (filter) {
                    filter.setAttribute('stdDeviation', '5');
                }
            }, 1800);

            setTimeout(() => {
                state.showRipple = false;
                if (ripple) {
                    ripple.style.display = 'none';
                }
            }, 1800);
        }
        // Handle standard open animation
        else if (siteNavigation.isOpen) {
            state.opacity = 0;

            if (circle) {
                circle.setAttribute('opacity', '0');
            }

            timerRef.current = setTimeout(() => {
                state.opacity = 1;
                if (circle) {
                    circle.setAttribute('opacity', '1');
                }

                setTimeout(() => {
                    state.radius = 30000;
                    if (circle) {
                        circle.setAttribute('r', '30000');
                    }
                }, 550);

                setTimeout(() => {
                    state.gaussianBlur = 5;
                    const filter = document.querySelector('#glowEffect feGaussianBlur');
                    if (filter) {
                        filter.setAttribute('stdDeviation', '5');
                    }
                }, 1150);
            }, 40);
        }
        // Handle menu close
        else {
            state.radius = 150;
            state.gaussianBlur = 2;

            if (circle) {
                circle.setAttribute('r', '150');
            }

            const filter = document.querySelector('#glowEffect feGaussianBlur');
            if (filter) {
                filter.setAttribute('stdDeviation', '2');
            }

            timerRef.current = setTimeout(() => {
                state.opacity = 0;
                if (circle) {
                    circle.setAttribute('opacity', '0');
                }
            }, 150);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [siteNavigation.isOpen, menuIconAnimationTime, crashTriggered]);

    return (
        <SvgCircle
            viewBox="0 0 300 300"
            $width={width}
            $growDelay={growDelay}
            $isOpen={siteNavigation.isOpen}
            className={siteNavigation.isOpen ? "open" : "closed"}
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation={circleState.current.gaussianBlur} result="blur"/>
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
                </filter>
            </defs>

            <AnimatedCircle
                className="menu-animated-circle"
                cx="150"
                cy="150"
                $r={circleState.current.radius}
                $opacity={circleState.current.opacity}
                filter="url(#glowEffect)"
            />
            {circleState.current.showRipple && (
                <Ripple
                    className="menu-ripple"
                    cx="150"
                    cy="150"
                    $opacity={0.9}
                    $r={0}
                />
            )}
        </SvgCircle>
    );
};
