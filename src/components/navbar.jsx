"use client";

import {OptimizedImage} from "@/components/optimizedImage";
import styled from "styled-components";
import {NavbarButton} from "@/components/navigation/navbar-button";
import {useState} from "react";

const StyledNavbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 1.77vw;
`;

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledNavbar>
            <div className="navbar__brand">
                <OptimizedImage
                    style={{width: "20vw"}}
                    src="/images/brand/brand_large.png"
                    alt="Logo de la marque"
                    width="1994"
                    height="974"
                />
            </div>

            <nav className={'navbar__navigation'}>

            </nav>

            <div className="navbar__menu__button">
                <NavbarButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>
            </div>
        </StyledNavbar>
    )
}
