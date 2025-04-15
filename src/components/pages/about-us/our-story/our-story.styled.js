import styled from "styled-components";

export const SectionContainer = styled.section`
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-bottom: 15vw;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @media (min-width: 1024px) {
        flex-direction: row;
        align-items: flex-start;
        transform: translateY(10%);
    }
`;

export const TextContainer = styled.div`
    max-width: 98ch;
    margin-bottom: 4rem;

    @media (min-width: 1024px) {
        margin-bottom: 0;
        padding-right: 4rem;
    }
`;

export const HeadingContainer = styled.div`
    position: relative;
    margin-bottom: 2.5rem;
`;

export const StoryHeading = styled.h1.attrs({
    className: 'fluid-type-4'
})`
    color: var(--color-text-light);
    margin-bottom: 1rem;
`;

export const StorySubHeading = styled.h2.attrs({
    className: 'fluid-type-2-5'
})`
    color: var(--color-text-light);
`;

export const TitleUnderline = styled.div`
    width: 30%;
    height: 4px;
    background: linear-gradient(90deg, var(--color-accent-agves) 0%, var(--color-accent-multipass) 100%);
    margin-bottom: 3.5rem;
`;

export const StoryText = styled.p.attrs({
    className: 'fluid-type-0-5'
})`
    color: var(--color-text-light);
    margin-bottom: 1.5rem;
    line-height: 1.75;
`;

export const StoryLegend = styled.p.attrs({
    className: 'fluid-type-1-5'
})`
    margin-top: 3rem;
    color: var(--color-text-light);
    margin-bottom: 1.5rem;
    line-height: 1.75;
`;

export const GetInTouchButton = styled.a`
    display: inline-block;
    background-color: transparent;
    color: var(--color-text);
    padding: 0.75rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    margin-top: 1rem;
    transition: all 0.3s ease;
    border: 1px solid var(--color-text);
    backdrop-filter: blur(8px);

    &:hover {
        font-weight: 550;
        background-color: var(--color-text);
        color: var(--color-background);
        border: 1px solid var(--color-background);
        transform: translateY(-2px);
    }
`;

export const EarthImageContainer = styled.div`
    width: 100%;
    height: 100%;

    @media (min-width: 1024px) {
        width: 50%;
        height: auto;
    }
`;
