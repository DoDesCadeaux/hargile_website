import styled from "styled-components";

export const SectionContainer = styled.section`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12vh 0;
    overflow: hidden;

    @media (min-width: 1600px) {
        padding: 0 6vw;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

`;

export const PlanetWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 296px;
    z-index: 1;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 1024px) {
        max-width: 512px;
    }

    @media (min-width: 1600px) {
        max-width: 800px;
        justify-content: flex-start;
    }
`;

export const InfoBubbleContainer = styled.div`
    aspect-ratio: 1;
    width: 100%;
    position: relative;
    max-width: 600px;
`;

export const TextWrapper = styled.div`
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 2;
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(8px);
    border-radius: 1rem;
    padding: 2rem 5vw;

    @media (min-width: 1024px) {
        width: 100%;
        padding: 2rem 2rem 2rem 2rem;
        margin: 0;
        align-items: flex-start;
        text-align: left;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 2rem;
        width: 3rem;
        height: 3px;
        background: var(--color-accent-mihai);

        @media (min-width: 768px) {
            width: 5rem;
        }
    }
`;

export const MainTitle = styled.h2.attrs({
    className: 'fluid-type-4'
})`
    color: var(--color-text-light);
    margin-bottom: 5rem;
    font-weight: 600;
    align-self: flex-start;
`;

export const HighlightedText = styled.h3.attrs({
    className: 'fluid-type-2'
})`
    color: var(--color-text-light);
    font-weight: 500;
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
`;

export const Subtitle = styled.h3.attrs({
    className: 'fluid-type-2'
})`
    color: var(--color-text-light);
    margin-bottom: 0.5rem;
    font-weight: 500;
`;

export const Description = styled.p.attrs({
    className: 'fluid-type-0'
})`
    color: var(--color-text-secondary);
    margin-bottom: 2.5rem;
    line-height: 1.6;

    @media (min-width: 768px) {
        margin-bottom: 3.5rem;
    }
`;

export const PillarsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
`;

export const PillarItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1.25rem;
`;

export const PillarIcon = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-light);

    @media (min-width: 450px) {
        width: 3.8rem;
        height: 3.8rem;
        padding: 0.6rem;
    }
`;

export const PillarTitle = styled.h4.attrs({
    className: 'fluid-type-1'
})`
    color: var(--color-text-light);
    font-weight: 500;
    margin-bottom: 0;
`;

export const InfoBubble = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 0.75rem 1rem;
    max-width: 110px;
    box-shadow: ${({$color}) => `0 0 8px color-mix(in srgb, transparent 50%, ${$color})`};
    border: 1px solid ${({$color}) => `${$color}`};

    @media (min-width: 768px) {
        max-width: 120px;
        padding: 1rem 1.5rem;
    }

    @media (min-width: 1300px) {
        max-width: 170px;
    }

    &.bubble-1 {
        top: 4%;
        left: 4%;
        transform: translateX(-50%);
    }

    &.bubble-85 {
        top: 12%;
        left: 65%;
        transform: translateX(-50%);
    }

    &.bubble-100 {
        top: 70%;
        left: 15%;
        transform: translateX(-50%);
    }
`;

export const BubblePercentage = styled.div.attrs({
    className: 'fluid-type-3'
})`
    color: ${({$color}) => `${$color}`};
    font-weight: 700;
    margin-bottom: 0.25rem;
`;

export const BubbleText = styled.div.attrs({
    className: 'fluid-type--1'
})`
    color: var(--color-text-secondary);
`;
