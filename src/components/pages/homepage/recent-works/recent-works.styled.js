// src/components/pages/homepage/recent-works/recent-works.styled.js
import styled from "styled-components";
import { Link } from "@/i18n/navigation";

export const SectionContainer = styled.section`
    position: relative;
    width: 100%;
    min-height: 70vh; /* Increased height to allow for parallax effect */
    padding: 8vh 2vw;
    overflow: hidden;

    @media (min-width: 1024px) {
        padding: 8vh 10vw;
    }
`;

export const SectionTitle = styled.h2.attrs({
    className: 'fluid-type-4'
})`
    position: relative;
    margin-bottom: 8vh;
    color: var(--color-text-light);
    text-align: left;
    z-index: 10;
`;

export const WorksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;
    margin-bottom: 4rem;
    position: relative; /* Enable positioning for parallax children */

    .work-card-wrapper {
        position: relative;
        will-change: transform;
        height: 65vh;
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        min-height: 500px; /* Ensure enough height for parallax */
    }
`;

export const SectionLink = styled(Link)`
    display: inline-block;
    color: var(--color-primary);
    font-size: 1.125rem;
    font-weight: 500;
    text-decoration: none;
    margin-top: 2rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateX(5px);
    }
`;
