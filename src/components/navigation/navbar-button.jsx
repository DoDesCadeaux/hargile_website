import styled from "styled-components";
import {useEffect, useRef, useState} from "react";


const ContentStyled = styled.div`
    padding: 1.125vw;
    aspect-ratio: 1;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    .menu-bar-container {
        display: flex;
        flex-direction: column;
        width: 5vw;
        height: 2.75vw;
        justify-content: space-between;
        align-items: center;
        position: relative;
        transition: transform 0.3s ease-in-out;
    }

    /* Bar animation when menu is opened */

    .menu-bar-container.open .bar-top {
        opacity: 1;
        transform: rotate(45deg) translateY(235%) translateX(16.5%);
    }

    .menu-bar-container.open .bar-middle {
        opacity: 0;
    }

    .menu-bar-container.open .bar-bottom {
        opacity: 1;
        transform: rotate(-45deg) translateY(-240%) translateX(16.5%);
    }
`;


const SvgCircle = styled.svg`
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: initial;

    circle {
        fill: none;
        stroke: white;
        stroke-width: 2;
        stroke-dasharray: 157;
        stroke-dashoffset: ${({$isOpen}) => ($isOpen ? "0" : "157")};
        transition: ${({$shouldAnimate}) => ($shouldAnimate ? "stroke-dashoffset 0.8s ease-in-out" : "none")};
    }
`;

export const AnimatedCircle = ({isOpen}) => {
    "use client"
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const circleRef = useRef(null);

    useEffect(() => {
        setShouldAnimate(true);
    }, []);

    return (
        <SvgCircle viewBox="0 0 54 54" $isOpen={isOpen} $shouldAnimate={shouldAnimate}>
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    {/*stroke shadow*/}
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                    {/*big shadow*/}
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 0.8)"/>
                </filter>
            </defs>

            <circle cx="27" cy="27" r="25" fill="white"/>
            <circle
                ref={circleRef}
                cx="27"
                cy="27"
                r="25"
                filter="url(#glow)"
            />
        </SvgCircle>
    );
};

const MenuBarStyled = styled.div`
    width: ${({$width}) => $width};
    height: 13%;
    background: white;
    border-radius: 6px;
    box-shadow: 0 0 0.35vw 1px rgba(255, 255, 255, 0.6);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, width 0.3s ease-in-out;
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

const BoxStyled = styled.button`
    position: relative;
    width: max-content;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const NavbarButton = ({isOpen, onClick}) => {
    return (
        <BoxStyled onClick={onClick}>
            <AnimatedCircle isOpen={isOpen}/>
            <ContentStyled>
                <div className={`menu-bar-container ${isOpen ? "open" : ""}`}>
                    <MenuBarStyled className="bar-top" $width="100%"/>
                    <MenuBarStyled className="bar-middle" $width="100%"/>
                    <MenuBarStyled className="bar-bottom" $width="100%"/>
                </div>
            </ContentStyled>
        </BoxStyled>
    )
}
