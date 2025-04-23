import styled from "styled-components";

export const FooterContainerStyled = styled.footer`
    color: #fff;
    position: relative;
    padding: 1rem 26px 2rem 12px;

    @media (min-width: 1024px) {
        padding: 1rem clamp(26px, 8vw, 6vw) 7rem clamp(12px, 8vw, 6vw);
    }
`;
