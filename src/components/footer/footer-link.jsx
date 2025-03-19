import styled from "styled-components";

export const FooterLink = styled.a.attrs({
    className: 'fluid-type--1'
})`
    color: #fff;
    margin-bottom: 0.5rem;
    display: block;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
