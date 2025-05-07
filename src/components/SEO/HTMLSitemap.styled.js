import styled from "styled-components";
import Link from "next/link";

export const SitemapContainer = styled.div`
    min-height: 100vh;
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 768px) {
        padding: 4rem 2rem;
    }
`;

export const Header = styled.header`
    margin-bottom: 2.5rem;
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
`;

export const Description = styled.p`
    color: rgba(255, 255, 255, 0.7);
    max-width: 800px;
    line-height: 1.6;
`;

export const SectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const SectionCard = styled.div`
    background: rgba(15, 9, 39, 0.8);
    border: 1px solid rgba(124, 58, 237, 0.2);
    border-radius: 0.75rem;
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3);
    }
`;

export const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: #9d4edd;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    svg {
        margin-right: 0.75rem;
    }
`;

export const LinksList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const LinkItem = styled.li`
    margin-bottom: 0.75rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: block;
    padding: 0.5rem 0;
    transition: color 0.2s ease;

    &:hover {
        color: #9d4edd;
    }

    &::before {
        content: "•";
        color: #9d4edd;
        display: inline-block;
        width: 1rem;
        margin-right: 0.5rem;
    }
`;
