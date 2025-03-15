"use client"

import styled from "styled-components";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {useEffect, useRef} from "react";

const ContentStyled = styled.div`
    padding: 1.125vw;
    aspect-ratio: 1;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    perspective: 800px;

    .menu-bar-container {
        display: flex;
        flex-direction: column;
        width: ${({$width}) => $width};
        min-width: 30px;
        height: calc(${({$width}) => $width} / 1.78);
        min-height: calc(30px / 1.78);
        justify-content: space-between;
        align-items: center;
        position: relative;
        transition: transform ${({$menuIconAnimationTime}) => $menuIconAnimationTime + 'ms'} ease-out;
    }

    .menu-bar-container.open {
        transform: translateZ(0px);
        animation: shockwave ${({$menuIconAnimationTime}) => $menuIconAnimationTime * 2 + 'ms'} forwards;
    }

    @keyframes shockwave {
        20% {
            transform: translateZ(0);
        }
        85% {
            transform: translateZ(300px);
        }
        100% {
            transform: translateZ(0);
        }
    }

    .menu-bar-container.open .bar-top {
        opacity: 1;
        transform: rotate(45deg) translateY(235%) translateX(16.5%);
        box-shadow: 0 0 0.5vw 2px rgba(255, 255, 255, 0.8);
    }

    .menu-bar-container.open .bar-middle {
        opacity: 0;
    }

    .menu-bar-container.open .bar-bottom {
        opacity: 1;
        transform: rotate(-45deg) translateY(-240%) translateX(16.5%);
        box-shadow: 0 0 0.5vw 2px rgba(255, 255, 255, 0.8);
    }
`;

const MenuBarStyled = styled.div`
    width: ${({$width}) => $width};
    height: 13%;
    background: white;
    border-radius: 6px;
    box-shadow: 0 0 0.35vw 1px rgba(255, 255, 255, 0.6);
    transition: transform ${({$menuIconAnimationTime}) => $menuIconAnimationTime + 'ms'} ease-in-out,
    opacity ${({$menuIconAnimationTime}) => $menuIconAnimationTime + 'ms'} ease-in-out,
    width ${({$menuIconAnimationTime}) => $menuIconAnimationTime + 'ms'} ease-in-out,
    box-shadow ${({$menuIconAnimationTime}) => $menuIconAnimationTime + 'ms'} ease-in-out;
    margin: 0;
    padding: 0;

    ${({$position}) => {
        switch ($position) {
            case "right":
                return `
                    align-self: flex-end;
                `;
            case "center":
                return `
                    align-self: center;
                `;
            case "left":
            default:
                return `
                    align-self: flex-start;
                `;
        }
    }};
`;

export const AnimatedMenuIcon = ({menuIconAnimationTime, width = '2.5vw', onCrashComplete}) => {
    const siteNavigation = useSiteNavigation();
    const animationRef = useRef(null);

    useEffect(() => {
        if (siteNavigation.isOpen && typeof onCrashComplete === 'function') {
            // Trigger callback after the crash part (70% of animation)
            const totalAnimationTime = menuIconAnimationTime * 3;
            const crashTime = totalAnimationTime * 0.7;
            const timer = setTimeout(() => {
                onCrashComplete();
            }, crashTime);

            return () => clearTimeout(timer);
        }
    }, [siteNavigation.isOpen, menuIconAnimationTime, onCrashComplete]);

    return (
        <ContentStyled
            $width={width}
            $menuIconAnimationTime={menuIconAnimationTime}
            ref={animationRef}
        >
            <div className={`menu-bar-container ${siteNavigation.isOpen ? "open" : ""}`}>
                <MenuBarStyled className="bar-top" $width="100%" $menuIconAnimationTime={menuIconAnimationTime}/>
                <MenuBarStyled className="bar-middle" $width="100%" $menuIconAnimationTime={menuIconAnimationTime}/>
                <MenuBarStyled className="bar-bottom" $width="100%" $menuIconAnimationTime={menuIconAnimationTime}/>
            </div>
        </ContentStyled>
    )
}
