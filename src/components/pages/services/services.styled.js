import styled from "styled-components";
import {ChevronRight} from "lucide-react";

export const PageContainer = styled.div`
    width: 100%;
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    gap: 5rem;

    @media (min-width: 768px) {
        padding: 5rem 0;
    }

    @media (min-width: 1024px) {
        padding: 6rem 0;
    }
`;

export const SectionContainer = styled.section`
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0 auto 4rem;
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

export const SectionIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({bgColor}) => bgColor || 'rgba(255, 255, 255, 0.05)'};
    color: var(--color-text-light);
`;

export const SectionTitle = styled.h2.attrs({
    className: 'fluid-type-3'
})`
    color: var(--color-text-light);
    font-weight: 600;
`;

export const ServiceGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const ServiceCard = styled.div`
    position: relative;
    display: flex;
    background-color: rgba(13, 16, 45, 0.5);
    border-radius: 0.75rem;
    overflow: hidden;
    padding: 1.5rem;
    transition: transform 0.3s ease, background-color 0.3s ease;
    height: 100%;
    border: 1px solid ${({sectionColor}) => `color-mix(in srgb, #000000 50%, ${sectionColor})`};
`;

export const CardIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({bgColor}) => bgColor || 'rgba(255, 255, 255, 0.05)'};
    color: var(--color-text-light);
    margin-right: 1rem;
    flex-shrink: 0;
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const CardTitle = styled.h3.attrs({
    className: 'fluid-type-1'
})`
    color: var(--color-text-light);
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p.attrs({
    className: 'fluid-type--1'
})`
    color: var(--color-text-secondary);
    line-height: 1.5;
`;

export const ServiceArrow = styled(ChevronRight)`
    position: absolute;
    right: 1.25rem;
    bottom: 1.25rem;
    opacity: 0;
    transform: translateX(-0.5rem);
    transition: opacity 0.3s ease, transform 0.3s ease;
    color: ${({color}) => color || 'var(--color-primary)'};

    ${ServiceCard}:hover & {
        opacity: 1;
        transform: translateX(0);
    }
`;

// Header général de la page
export const PageHeader = styled.div`
    text-align: center;
    margin-bottom: 5rem;
`;

export const PageTitle = styled.h1.attrs({
    className: 'fluid-type-5'
})`
    color: var(--color-text-light);
    margin-bottom: 1rem;
    font-weight: 600;
`;

export const PageSubtitle = styled.p.attrs({
    className: 'fluid-type-1'
})`
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
`;
