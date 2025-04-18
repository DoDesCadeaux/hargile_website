import styled from "styled-components";

export const FooterContentStyled = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;

    @media (min-width: 550px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }


    @media (min-width: 1024px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
