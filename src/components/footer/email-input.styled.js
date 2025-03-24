import styled from "styled-components";

export const EmailInputStyled = styled.input`
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 4px;
    color: #fff;
    padding: 0.75rem 1rem;
    width: 100%;
    max-width: 20rem;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: 1px solid rgba(255, 255, 255, 0.5);
    }
`;
