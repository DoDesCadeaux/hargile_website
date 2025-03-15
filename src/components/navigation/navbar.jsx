"use client";

import {useEffect, useRef} from "react";
import styled from "styled-components";
import {NavbarButton} from "@/components/navigation/button/navbar-button";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {Link} from "@/i18n/navigation";
import {OptimizedImage} from "@/components/optimizedImage";
import anime from "animejs";

const StyledNavbar = styled.div`
    display: flex;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 1.77vw;
    z-index: 10000;
`;

const NavbarNavigation = styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc((15vh - 5vw) * 1);
    z-index: 10001;
    pointer-events: none;
    opacity: ${({$visible}) => $visible ? '1' : '0'};
    transition: opacity 0.5s ease;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: clamp(30px, 15vw, 4vw);
    cursor: pointer;
    pointer-events: visible;
    font-weight: 650;
    text-transform: uppercase;
    opacity: 0;
    transform: translateX(80px);
`;

const Spacer = styled.div`
    width: 100%;
`;

export const Navbar = () => {
    const siteNavigation = useSiteNavigation();
    const navbarRef = useRef(null);
    const menuState = useRef({
        navbarHeight: 0,
        menuItemsAnimation: null,
        menuItemDisplayed: false,
        navigationVisible: false,
        timers: []
    });

    // Handle component unmount
    useEffect(() => {
        return () => {
            // Clear all timers on unmount
            menuState.current.timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    // Handle menu open/close effects
    useEffect(() => {
        // Update navbar height
        if (navbarRef.current) {
            menuState.current.navbarHeight = navbarRef.current.offsetHeight;
        }

        // Toggle body scroll
        document.body.style.overflow = siteNavigation.isOpen ? "hidden" : "auto";

        if (siteNavigation.isOpen) {
            // Show menu items immediately
            menuState.current.menuItemDisplayed = true;

            // Force render update
            const navElement = document.querySelector('.navbar-navigation');
            if (navElement) {
                navElement.style.display = 'flex';
            }

            // Delay setting navigation visible to allow DOM to update
            const visibilityTimer = setTimeout(() => {
                menuState.current.navigationVisible = true;
                if (navElement) {
                    navElement.style.opacity = '1';
                }
            }, 50);

            menuState.current.timers.push(visibilityTimer);

            // Setup item animations
            const animationTimer = setTimeout(() => {
                // Reset to initial state before animating
                anime.set('.navbar__navigation__item', {
                    translateX: 80,
                    opacity: 0
                });

                // Animate menu items sliding in
                menuState.current.menuItemsAnimation = anime({
                    targets: '.navbar__navigation__item',
                    translateX: 0,
                    opacity: 1,
                    duration: 500,
                    easing: 'easeOutQuad',
                    delay: (el, i) => 950 + (i * 200)
                });
            }, 100);

            menuState.current.timers.push(animationTimer);
        } else {
            // Hide navigation container first with opacity transition
            menuState.current.navigationVisible = false;

            const navElement = document.querySelector('.navbar-navigation');
            if (navElement) {
                navElement.style.opacity = '0';
            }

            // Animate menu items out when closing
            if (menuState.current.menuItemsAnimation) {
                menuState.current.menuItemsAnimation.pause();
            }

            menuState.current.menuItemsAnimation = anime({
                targets: '.navbar__navigation__item',
                translateX: -80,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuad',
                delay: 500
            });

            // Then remove items from DOM after animations complete
            const hideTimer = setTimeout(() => {
                menuState.current.menuItemDisplayed = false;
                if (navElement) {
                    navElement.style.display = 'none';
                }
            }, 800);

            menuState.current.timers.push(hideTimer);
        }
    }, [siteNavigation.isOpen]);

    const menuItems = [
        {path: '/services', label: 'Services'},
        {path: '/solutions', label: 'Solutions'},
        {path: '/about-us', label: 'About Us'},
        {path: '/contact-us', label: 'Contact Us'},
    ];

    return (
        <>
            <StyledNavbar ref={navbarRef}>
                <div className="navbar__brand">
                    <Link href="/">
                        <OptimizedImage
                            width="1994" height="974" src="/images/brand/brand_large.png"
                            alt="Brand Logo"
                            style={{width: "calc(120px + 5vw)"}}
                        />
                    </Link>
                </div>

                <div className="navbar__menu__button"><NavbarButton/></div>

                <NavbarNavigation
                    className="navbar-navigation"
                    style={{display: menuState.current.menuItemDisplayed ? 'flex' : 'none'}}
                    $active={siteNavigation.isOpen}
                    $visible={menuState.current.navigationVisible}
                >
                    {menuItems.map((item, index) => (
                        <StyledLink key={index} className="navbar__navigation__item" href={item.path}>
                            {item.label}
                        </StyledLink>
                    ))}
                </NavbarNavigation>
            </StyledNavbar>

            <Spacer style={{height: menuState.current.navbarHeight}}/>
        </>
    );
};
