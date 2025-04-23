import styled from "styled-components";
import {TransitionLink} from "@/components/TransitionLink";

export const StyledNavbar = styled.div`
    display: flex;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 0 12px;
    z-index: 10000;
    backdrop-filter: blur(8px);
`;

export const Brand = styled.button`
    cursor: pointer;

    &:hover {
        box-shadow: none
    }

    &.transition::before {
        content: '';
        position: absolute;
        width: 150vw;
        height: 150vh;
        top: -25vh;
        left: -25vw;
        background: rgba(0, 0, 0, 0);
        z-index: 9999999;
        animation: 2000ms appearInOut ease-in-out;
    }

    @keyframes appearInOut {
        0% {
            background: rgba(0, 0, 0, 0);
        }
        20% {
            background: rgba(0, 0, 0, 1);
        }
        60% {
            background: rgba(0, 0, 0, 1);
        }
        100% {
            background: rgba(0, 0, 0, 0);
        }
    }
`;

export const NavbarMenuButtons = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
`;

export const NavbarNavigation = styled.nav`
    position: absolute;
    top: 15vh;
    left: 0;
    width: 100vw;
    height: 80vh;
    max-height: 80vh;
    padding-top: 10vh;
    padding-bottom: 10vh;
    overflow-y: auto;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc((15vh - 5vw) * 1);
    z-index: 10001;
    opacity: ${({$visible}) => $visible ? '1' : '0'};
    transition: opacity 0.25s ease;
    will-change: opacity;
`;

export const StyledLink = styled(TransitionLink)`
    text-decoration: none;
    color: white;
    font-size: clamp(30px, 15vw, 4vw);
    cursor: pointer;
    pointer-events: all;
    font-weight: 650;
    text-transform: uppercase;
    opacity: 0;
    transform: translateX(80px);
    will-change: transform, opacity;
`;

export const Spacer = styled.div`
    width: 100%;
`;
