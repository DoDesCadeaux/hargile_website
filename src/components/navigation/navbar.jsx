"use client";

import React, {memo, useEffect, useRef, useState} from "react";
import NavbarButton from "@/components/navigation/button/navbar-button";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {useRouter} from "@/i18n/navigation";
import {OptimizedImage} from "@/components/optimizedImage";
import {useMenuItems} from "@/hooks/useMenuItems";
import {useNavigationVisibility} from "@/hooks/useNavigationVisibility";
import {useTranslations} from "next-intl";
import LanguageSelector from "@/app/[locale]/components/language-selector/language-selector";
import {
    Brand,
    NavbarMenuButtons,
    NavbarNavigation,
    Spacer,
    StyledLink,
    StyledNavbar
} from "@/components/navigation/navbar.styled";
import {usePageTransition} from '@/components/TransitionLink';

const menuItems = Array.from([
    {path: '/services', id: 'services'},
    // {path: '/solutions', id: 'solutions'},
    {path: '/about-us', id: 'our-dna'},
    {path: '/contact', id: 'contact'},
    {path: '/portfolio', id: 'portfolio'},
    {path: '/solutions/agves', id: 'agves'},
    {path: '/solutions/i-go', id: 'i-go'},
    {path: '/solutions/multipass', id: 'multipass'},
]);

const Navbar = () => {
    const {isOpen, toggleMenu} = useSiteNavigation();
    const router = useRouter();
    const navbarRef = useRef(null);
    const brandRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const t = useTranslations('menu');
    const {setIsTransitioning, setTransitionState, timing} = usePageTransition();
    const [isMounted, setIsMounted] = useState(false);

    useMenuItems(isOpen);
    const {menuItemDisplayed, navigationVisible} = useNavigationVisibility(isOpen);

    useEffect(() => {
        setIsMounted(true);

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
            setIsMounted(false);
        };
    }, []);

    const triggerHomeTransitionAnimation = (e) => {
        e.preventDefault();

        if (!isMounted) return;

        if (brandRef.current) {
            brandRef.current.classList.add('transition');

            // Start exit animation
            setIsTransitioning(true);
            setTransitionState('exiting');

            // Simplified timing using constants
            setTimeout(() => {
                router.push('/');

                setTimeout(() => {
                    setTransitionState('entering');

                    setTimeout(() => {
                        if (brandRef.current) {
                            brandRef.current.classList.remove('transition');
                        }
                        setIsTransitioning(false);
                        setTransitionState('idle');
                    }, 600); // TRANSITION_DURATION
                }, 400); // BLACK_SCREEN_DURATION
            }, 600); // TRANSITION_DURATION
        }
    };

    return (
        <>
            <StyledNavbar ref={navbarRef}>
                <Brand
                    ref={brandRef}
                    as="a"
                    href="/"
                    onClick={triggerHomeTransitionAnimation}
                >
                    <OptimizedImage
                        width="1754"
                        height="815"
                        src="/images/brand/brand_large.png"
                        alt="Brand Logo"
                        style={{
                            width: "calc(100px + 6vw)",
                        }}
                    />
                </Brand>

                <NavbarMenuButtons>
                    <LanguageSelector/>
                    <NavbarButton/>
                </NavbarMenuButtons>

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
