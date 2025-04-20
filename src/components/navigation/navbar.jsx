"use client";

import React, {memo, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import NavbarButton from "@/components/navigation/button/navbar-button";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {useRouter} from "@/i18n/navigation";
import {OptimizedImage} from "@/components/optimizedImage";
import {useMenuItems} from "@/hooks/useMenuItems";
import {useNavigationVisibility} from "@/hooks/useNavigationVisibility";
import {TransitionLink} from "@/components/TransitionLink";
import {useTranslations} from "next-intl";

const StyledNavbar = styled.div`
    display: flex;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    padding: 4px 24px 4px 12px;
    z-index: 10000;
`;

const Brand = styled.button`
    cursor: pointer;

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

const NavbarNavigation = styled.nav`
    position: absolute;
    top: 15vh;
    left: 0;
    width: 100vw;
    height: 80vh;
    max-height: 80vh;
    padding-top: 20vh;
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

const StyledLink = styled(TransitionLink)`
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

const Spacer = styled.div`
    width: 100%;
`;

const menuItems = [
    {path: '/services', id: 'services'},
    {path: '/solutions', id: 'solutions'},
    {path: '/about-us', id: 'our-dna'},
    {path: '/contact', id: 'contact'},
    {path: '/portfolio', id: 'portfolio'}
];

const Navbar = () => {
    const {isOpen, toggleMenu} = useSiteNavigation();
    const router = useRouter();
    const navbarRef = useRef(null);
    const brandRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const t = useTranslations('menu')

    useMenuItems(isOpen);
    const {menuItemDisplayed, navigationVisible} = useNavigationVisibility(isOpen);

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (navbarRef.current) {
                setNavbarHeight(navbarRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const triggerHomeTransitionAnimation = () => {
        if (brandRef.current) {
            brandRef.current.classList.add('transition');

            const navigationTimer = setTimeout(() => {
                router.push('/');

                const cleanupTimer = setTimeout(() => {
                    if (brandRef.current) {
                        brandRef.current.classList.remove('transition');
                    }
                }, 150);
            }, 150);

            return () => {
                clearTimeout(navigationTimer);
            };
        }
    };

    return (
        <>
            <StyledNavbar ref={navbarRef}>
                <Brand
                    ref={brandRef}
                    onClick={triggerHomeTransitionAnimation}
                >
                    <OptimizedImage
                        width="1754"
                        height="815"
                        src="/images/brand/brand_large.png"
                        alt="Brand Logo"
                        style={{width: "calc(100px + 6vw)"}}
                    />
                </Brand>

                <div className="navbar__menu__button">
                    <NavbarButton/>
                </div>

                <NavbarNavigation
                    className="navbar-navigation"
                    style={{display: menuItemDisplayed ? 'flex' : 'none'}}
                    $active={isOpen}
                    $visible={navigationVisible}
                >
                    {menuItems.map((item, index) => (
                        <StyledLink
                            onClick={toggleMenu}
                            key={index}
                            className="navbar__navigation__item"
                            href={item.path}
                        >
                            {t(item.id)}
                        </StyledLink>
                    ))}
                </NavbarNavigation>
            </StyledNavbar>

            {navbarHeight > 0 && <Spacer style={{height: `${navbarHeight}px`}}/>}
        </>
    );
};

export default memo(Navbar);
