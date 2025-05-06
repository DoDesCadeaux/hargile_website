import styled from "styled-components";
import {motion} from "framer-motion";

export const PageWrapper = styled.div`
    min-height: 100vh;
    color: white;
    position: relative;
    padding: 3rem 2rem;

    @media (min-width: 768px) {
        padding: 4rem;
    }
`;

export const ContentContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

export const ProjectsSection = styled.section`
    margin-top: 2rem;
`;

export const SectionTitle = styled(motion.h2)`
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
`;

export const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem; /* Increased from 2rem to 3rem for more spacing */

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem; /* Consistent gap at different breakpoints */
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 3.5rem; /* Even more space between cards on larger screens */
    }
`;

export const CallToActionSection = styled(motion.section)`
    margin-top: 4rem;
    padding: 3rem;
    background: rgba(15, 10, 40, 0.7);
    border-radius: 12px;
    text-align: center;
`;

export const CTATitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
`;

export const CTADescription = styled.p`
    font-size: 1rem;
    line-height: 1.6;
    color: #cbd5e1;
    max-width: 700px;
    margin: 0 auto 2rem;
`;

export const CTAButton = styled(motion.a)`
    display: inline-block;
    background-color: #3b82f6;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 9999px;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #2563eb;
    }
`;
