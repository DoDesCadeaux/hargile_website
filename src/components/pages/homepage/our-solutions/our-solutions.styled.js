// src/components/sections/OurSolutions/styles.js
import styled from "styled-components";

export const SectionContainer = styled.section`
    position: relative;
    width: 100%;
    min-height: 90vh;
    padding: 0 2vw 0;

    @media (min-width: 1024px) {
        padding: 0 10vw 0;
    }
`;

export const ContentWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
`;

export const SectionTitle = styled.h2.attrs({
    className: 'fluid-type-4'
})`
`;

export const CardsContainer = styled.div`
    grid-gap: 2.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4vw;
    margin-top: 15vh;

    & > * {
        width: 100%;
    }

    @media (min-width: 670px) {
        flex-direction: row;
        flex-wrap: wrap;
        & > * {
            width: 45%;
            aspect-ratio: 1;
        }
    }

    @media (min-width: 900px) {
        margin-top: 50vh;
        gap: 1.5vw;
        flex-direction: row;
        align-items: stretch;

        & > * {
            flex: 1;
            min-width: auto;
            max-width: none;
            aspect-ratio: auto;
        }
    }

    @media (min-width: 1900px) {
        position: absolute;
        top: 8vh;
        right: 2vw;
        margin-top: 5vh;
        gap: 5vh;
        flex-direction: column;

        & > * {
            width: auto;
            max-width: 650px;
        }
    }

    @media (min-width: 2000px) {
        right: 8vw;
    }
`;

