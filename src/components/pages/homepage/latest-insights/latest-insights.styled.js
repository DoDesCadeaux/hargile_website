// src/components/pages/homepage/latest-insights/latest-insights.styled.js
import styled from "styled-components";
import { Link } from "@/i18n/navigation";

export const SectionContainer = styled.section`
    position: relative;
    top: 35vh;
    width: 100%;
    min-height: 90vh;
    padding: 8vh 2vw;
    background-color: rgba(0, 0, 0, 0.3);
    overflow: hidden;

    @media (min-width: 1024px) {
        padding: 8vh 10vw;
    }
`;

export const ContentWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const SectionHeader = styled.div`
    margin-bottom: 5rem;
`;

export const SectionTitle = styled.h2.attrs({
    className: 'fluid-type-5'
})`
    margin-bottom: 1rem;
    color: var(--color-text-light);
`;

export const SectionSubtitle = styled.p.attrs({
    className: 'fluid-type-1'
})`
    color: var(--color-text-secondary);
    max-width: 40ch;
`;

export const InsightsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const ViewAllLink = styled(Link)`
    margin-top: 3rem;
    align-self: flex-start;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(5px);
    }
`;
