"use client"

import styled from "styled-components";
import {AnimatedMenuCircle} from "@/components/navigation/button/animated-menu-circle";
import {AnimatedMenuIcon} from "@/components/navigation/button/animated-menu-icon";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {AnimatedMenuIconCircle} from "@/components/navigation/button/animated-menu-icon-circle";
import {useState} from "react";

const BoxStyled = styled.button`
    position: relative;
    width: max-content;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: visible;
    z-index: 100;
`

const BackgroundStyled = styled.div`
    aspect-ratio: 1;
    border-radius: 9999px;
    width: calc(${({$width}) => $width} * 1.8 /** factor */);
    min-width: calc(30px * 1.8 /** factor */);
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(10px);
    position: absolute;
    transition: width 200ms ease-in-out, background 200ms ease-in-out;
    pointer-events: none;
    z-index: -1;

    &.open {
        transition: width 400ms ease-in-out, background 200ms ease-in-out;
        background: rgba(0, 0, 0, 0.8);
        width: 300vw;
    }
`

export const NavbarButton = ({width = '2.5vw'}) => {
    const siteNavigation = useSiteNavigation();
    const menuIconAnimationTime = 300;
    const [crashTriggered, setCrashTriggered] = useState(false);

    const handleCrashComplete = () => {
        setCrashTriggered(true);
    };

    // Reset states when menu is closed
    if (!siteNavigation.isOpen && crashTriggered) {
        setTimeout(() => {
            setCrashTriggered(false);
        }, 500);
    }

    return (
        <BoxStyled onClick={siteNavigation.toggleMenu}>
            <AnimatedMenuCircle
                width={width}
                menuIconAnimationTime={menuIconAnimationTime}
                crashTriggered={crashTriggered}
            />
            <AnimatedMenuIcon
                width={width}
                menuIconAnimationTime={menuIconAnimationTime}
                onCrashComplete={handleCrashComplete}
            />
            <AnimatedMenuIconCircle menuIconAnimationTime={menuIconAnimationTime} width={width}/>
        </BoxStyled>
    )
}
