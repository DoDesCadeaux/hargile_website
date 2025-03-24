import styled from "styled-components";

export const BottomBarStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 640px) {
        flex-direction: column;
        gap: 1rem;
    }
`;
