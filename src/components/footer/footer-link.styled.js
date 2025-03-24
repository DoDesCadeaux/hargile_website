import styled from "styled-components";

export const FooterLinkStyled = styled.a.attrs({
    className: 'text-base-sm'
})`
    color: #fff;
    margin-bottom: 0.5rem;
    display: block;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
