// src/components/pages/homepage/recent-works/recent-works.styled.js
import styled from "styled-components";
import { Link } from "@/i18n/navigation";

export const SectionContainer = styled.section`
    position: relative;
    width: 100%;
    min-height: 75vh; /* Adjusted for better vertical space */
    padding: 10vh 0; /* Increased vertical padding */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SectionTitle = styled.h2.attrs({
    className: 'fluid-type-4'
})`
    position: relative;
    margin-bottom: calc(15vh - 1vw); /* Adjusted spacing */
    color: var(--color-text-light);
    text-align: center; /* Centered title */
    width: 100%;
    z-index: 10;
`;

export const WorksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(280px, max-content));
    grid-gap: 4vw;
    margin-bottom: 4rem;
    position: relative; /* Enable positioning for parallax children */
    width: 90%; /* Increased width for better display */
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    min-height: 40vh; /* Ensures minimum height for cards */

    .work-card-wrapper {
        position: relative;
        will-change: transform;
        height: auto;
    }

    @media (min-width: 650px) {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 3vw; /* Slightly reduced gap for better alignment */
        width: 100%;
        min-height: 50vh; /* Ensure enough height for parallax */

        .work-card-container {
            height: 60vh;
        }
    }
`;

export const OurWorksLink = styled.div`
    margin-top: calc(4vw + 4vh);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

export const SectionLink = styled(Link)`
    display: inline-block;
    color: var(--color-primary);
    font-size: 1.125rem;
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.3s ease;
    position: relative; /* Allow for absolute positioning of pseudo-elements */

    &:after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 1px;
        background-color: var(--color-primary);
        transition: width 0.3s ease;
    }

    &:hover {
        transform: translateX(5px);

        &:after {
            width: 100%;
        }
    }
`;
