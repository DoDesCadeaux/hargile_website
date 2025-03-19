import styled from "styled-components";

export const FooterLink = styled.a.attrs({
    className: 'fluid-type-2'
})`
    color: #fff;
    margin-bottom: 0.5rem;
    display: block;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
