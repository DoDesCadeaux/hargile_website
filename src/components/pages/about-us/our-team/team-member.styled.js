// src/components/pages/about-us/our-team/team-member.styled.js
import styled from "styled-components";

export const MemberCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: rgba(13, 16, 33, 0.7);
    backdrop-filter: blur(2px);
    border-radius: 0.75rem;
    padding: 2.5rem 3rem 7rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-8px);
    }
`;

export const MemberImage = styled.div`
    width: 100%;
    max-width: 180px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    ${MemberCard}:hover & img {
        transform: scale(1.05);
    }
`;

export const MemberInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const MemberName = styled.h3.attrs({
    className: 'fluid-type-1-5'
})`
    color: var(--color-text-light);
    margin-bottom: 0.5rem;
    font-weight: 600;
`;

export const MemberRole = styled.p.attrs({
    className: 'fluid-type-0'
})`
    color: var(--color-primary);
    font-weight: 500;
    margin-bottom: 1.5rem;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -1.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 124px;
        height: 1px;
        background: rgba(255, 255, 255, 0.3);
    }
`;
