import styled from "styled-components";

export const FooterContent = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
