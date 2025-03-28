import styled from "styled-components";

export const SectionContainer = styled.section`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8vh 2rem;
    overflow: hidden;

    @media (min-width: 768px) {
        padding: 8vh 4rem;
    }

    @media (min-width: 1200px) {
        padding: 8vh 6rem;
    }
`;

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1024px) {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
`;

export const TextContainer = styled.div`
    width: 100%;
    margin-bottom: 4rem;

    @media (min-width: 1024px) {
        width: 50%;
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

export const TitleUnderline = styled.div`
    width: 50%;
    height: 4px;
    background: linear-gradient(90deg, var(--color-accent-agves) 0%, var(--color-accent-multipass) 100%);
    margin-top: 0.5rem;
`;

export const StoryText = styled.p.attrs({
    className: 'fluid-type-0'
})`
    color: var(--color-text-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;
`;

export const GetInTouchButton = styled.a`
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-text-light);
    padding: 0.75rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    margin-top: 1rem;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: var(--color-primary-hover);
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
