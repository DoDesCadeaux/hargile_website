import styled from "styled-components";

export const TrustedBrandsContainer = styled.section`
    position: relative;
    width: 100%;
    min-height: 30vh;
    padding: 8vh 2vw;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    @media (min-width: 1024px) {
        padding: 8vh 10vw;
    }
`;

export const SectionTitle = styled.h2.attrs({
    className: 'fluid-type-3'
})`
    text-align: center;
    margin-bottom: 8vh;
    color: #ffffff;
    font-weight: 600;
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 2vh 4vw;
    max-width: 1200px;
    margin: 0 auto;
    @media (max-width: 768px) {
        gap: 3vh 6vw;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
    animation-delay: ${props => props.index * 0.2}s;
    position: relative;
    width: clamp(60px, calc(40px + 8vw), 7vw);
    height: clamp(60px, calc(40px + 8vw), 7vw);
    border-radius: 50%;
    box-shadow: 0 -4px 2px rgba(50, 50, 100, 0.45),
    inset 0 5px 4px rgba(50, 50, 100, 0.6),
    inset -1px -1px 4px rgba(0, 0, 0, 0.1);

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(to bottom, rgba(200, 200, 200, 0.1), rgba(255, 255, 255, 0.001) 60%);
        opacity: 0.5;
        z-index: 1;
    }

    &::after {
        content: '';
        position: absolute;
        width: 85%;
        height: 85%;
        top: 7.5%;
        left: 7.5%;
        border-radius: 50%;
        background: transparent;
        z-index: 0;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
}

img {
    position: relative;
    z-index: 3;
    max-width: 75%;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
    filter: brightness(1.05);
    @media (max-width: 768px) {
        max-width: 70%;
    }
}
`;
