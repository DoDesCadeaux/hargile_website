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


const menuItems = Array.from([
    {path: '/services', id: 'services'},
    // {path: '/solutions', id: 'solutions'},
    {path: '/about-us', id: 'our-dna'},
    {path: '/contact', id: 'contact'},
    {path: '/portfolio', id: 'portfolio'}
]);

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

                clearTimeout(cleanupTimer)
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
