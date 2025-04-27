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
    z-index: 999;
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
        z-index: 1000;
        animation: 2000ms appearInOut ease-in-out;
        pointer-events: none;
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
    top: 15dvh;
    left: 0;
    width: 100vw;
    height: 80vh;
    padding-top: 10vh;
    padding-bottom: 20vh;
    overflow-y: auto;
    flex-direction: column;
    display: flex;
    align-items: center;
    gap: calc((13vh - 4.8vw) * 1);
    z-index: 1001;
    opacity: ${({$visible}) => $visible ? '1' : '0'};
    transition: opacity 0.25s ease;
    will-change: opacity;
    max-height: 85dvh;
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
