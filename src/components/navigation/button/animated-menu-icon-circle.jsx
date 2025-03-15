import styled from "styled-components";
import {useEffect, useState} from "react";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";

const AnimatedMenuIconCircleStyled = styled.svg`
    width: calc(${({$width}) => $width} * 1.8 /** factor */);
    min-width: calc(30px * 1.8 /** factor */);
    position: absolute;
    overflow: initial;
    transition: width 200ms ease-in-out;
    z-index: 99;

    .open {
        animation: growth 1080ms ease-in
    }

    @keyframes growth {
        0% {
            opacity: 0;
        }
        10% {
            transform: scale(1) translateX(0%) translateY(0%);
        }
        35% {
            transform: scale(1.5) translateX(-16.5%) translateY(-16.5%);
        }
        50% {
            transform: scale(1) translateX(0%) translateY(0%);
        }
        90% {
            opacity: 1;
        }
    }

    circle {
        fill: none;
        stroke: white;
        stroke-width: 2;
        stroke-dasharray: 157;
        stroke-dashoffset: ${({$isOpen}) => ($isOpen ? "0" : "157")};
        transition: ${({$shouldAnimate}) => ($shouldAnimate ? "stroke-dashoffset 1s 550ms ease-in-out stroke-dasharray 1s 550ms ease-in-out" : "none")};
    }
`

export const AnimatedMenuIconCircle = ({width, menuIconAnimationTime}) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const siteNavigation = useSiteNavigation();

    useEffect(() => {
        setShouldAnimate(true);
    }, []);

    return (
        <AnimatedMenuIconCircleStyled
            viewBox="0 0 54 54"
            $width={width}
            $menuIconAnimationTime={menuIconAnimationTime}
            $isOpen={siteNavigation.isOpen}
            $shouldAnimate={shouldAnimate}
        >
            <filter id="glowe" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255, 255, 255, 0.6)"/>
            </filter>
            <circle className={siteNavigation.isOpen ? 'open' : ''} cx="27" cy="27" r="25" filter={'url(#glowe)'}/>
            <circle className={siteNavigation.isOpen ? 'open' : ''} cx="27" cy="27" r="25"/>
        </AnimatedMenuIconCircleStyled>
    )
}
