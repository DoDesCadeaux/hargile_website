import styled from "styled-components";

export const PageContainer = styled.div`
    min-height: 100vh;
    color: white;
    position: relative;
    overflow: hidden;
`;

export const ContentWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    position: relative;
    z-index: 10;

    @media (min-width: 768px) {
        padding: 3rem 2rem;
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 2rem;
    }
`;

// Header section
export const Header = styled.header`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 768px) {
        grid-column: 1 / 3;
    }
`;

export const Title = styled.h1.attrs({
    className: "fluid-type-5",
})`
    font-weight: bold;
    color: white;
    margin: 0;
`;

export const TitleUnderline = styled.div`
    width: 80%;
    height: 4px;
    background-color: var(--color-accent-mihai);
    margin-top: 0.75rem;
    margin-bottom: 1rem;
`;

export const LastUpdate = styled.p.attrs({
    className: "fluid-type--1",
})`
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0.5rem;
`;

export const MenuButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
        display: none;
    }
`;

export const Sidebar = styled.aside`
    background-color: #0f0927;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: ${(props) => (props.$menuOpen ? "block" : "none")};

    @media (min-width: 768px) {
        display: block !important;
        position: sticky;
        top: 2rem;
        max-height: calc(100vh - 4rem);
        overflow-y: auto;
    }
`;

export const SidebarTitle = styled.h2.attrs({
    className: "fluid-type-0",
})`
    color: white;
    margin-bottom: 1rem;
`;

// Using data-active instead of active prop
export const NavItem = styled.a`
    display: block;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    text-decoration: none;
    transition: background-color 0.2s ease;
    background-color: ${(props) =>
            props["data-active"] === "true"
                    ? "rgba(124, 58, 237, 0.2)"
                    : "transparent"};
    border-left: ${(props) =>
            props["data-active"] === "true"
                    ? "3px solid var(--color-accent-mihai)"
                    : "3px solid transparent"};

    &:hover {
        background-color: rgba(124, 58, 237, 0.1);
    }
`;

// Main content section
export const MainContent = styled.main``;

export const Section = styled.section`
    background-color: #0f0927;
    border-radius: 0.75rem;
    padding: 2rem;
    margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2.attrs({
    className: "fluid-type-2",
})`
    color: white;
    margin-bottom: 1.5rem;
`;

export const SubSectionTitle = styled.h3.attrs({
    className: "fluid-type-1",
})`
    color: #9d4edd;
    margin: 1.5rem 0 1rem 0;
`;

export const Paragraph = styled.p.attrs({
    className: "fluid-type-0",
})`
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 1rem;
`;

export const BulletList = styled.ul`
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
`;

export const BulletItem = styled.li.attrs({
    className: "fluid-type-0",
})`
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 0.5rem;

    &::before {
        content: "• ";
        color: var(--color-accent-mihai);
    }
`;

// Action buttons
export const ActionButtons = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:first-child {
        background-color: #9d4edd;
        color: white;
        border: none;

        &:hover {
            background-color: #8e2de2;
        }
    }

    &:last-child {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }
    }
`;
