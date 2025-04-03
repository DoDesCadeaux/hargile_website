import styled from "styled-components";

export const FooterContainerStyled = styled.footer`
    color: #fff;
    position: relative;
    padding: 4rem 12px 1rem;

    @media (min-width: 1024px) {
        padding: 4rem clamp(12px, 8vw, 6vw) 1rem;
    }
`;
