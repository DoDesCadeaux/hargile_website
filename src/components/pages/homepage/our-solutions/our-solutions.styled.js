// src/components/sections/OurSolutions/styles.js
import styled from "styled-components";

export const SectionContainer = styled.section`
    position: relative;
    width: 100%;
    padding-top: 8vh;
    padding-bottom: 25vh;
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
    margin-top: 6vh;

    & > * {
        width: 100%;
    }

    @media (min-width: 670px) {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        
        & > * {
            width: 45%;
        }
    }

    @media (min-width: 900px) {
        gap: 1.5vw;

        & > * {
            min-width: auto;
            max-width: 650px;
        }
    }
`;

