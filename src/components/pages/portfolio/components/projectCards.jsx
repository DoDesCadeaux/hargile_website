import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// We'll use a regular div for the outer container and put motion on an inner wrapper
const CardOuterContainer = styled.div`
  height: 100%;
`;

// Convert the CardContainer to use motion.div
const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: rgba(15, 10, 40, 0.7);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  position: relative;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

// New purple accent positioned at top left
const PurpleAccent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  width: 20%;
  background: var(--color-accent-mihai);
  border-top-left-radius: 12px;
  z-index: 2;
`;

const CardImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  ${CardContainer}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  margin-bottom: 0.75rem;
`;

const CardTitle = styled.h3.attrs({
  className: "fluid-type-2",
})`
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
`;

const CardSubtitle = styled.div.attrs({
  className: "fluid-type-1",
})`
  color: #a78bfa;
`;

const CardBody = styled.p.attrs({
  className: "fluid-type-0",
})`
  color: #cbd5e1;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  margin-top: auto;
`;

const CardButton = styled.a.attrs({
  className: "fluid-type-0",
})`
  display: inline-block;
  font-weight: 500;
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #9333ea;
  }
`;

/**
 * Project card component for displaying portfolio items with scroll animation
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Project title
 * @param {string} props.subtitle - Project subtitle/category
 * @param {string} props.description - Project description
 * @param {string} props.image - Project image URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.actionText - Action button text
 * @param {string} props.actionUrl - Action button URL
 * @param {number} props.index - Index of the card for staggered animations
 * @returns {JSX.Element} Project card component
 */
export function ProjectCard({
  title,
  subtitle,
  description,
  image,
  alt = "Project image",
  actionText = "Learn More",
  actionUrl = "#",
  index = 0,
}) {
  return (
    <CardOuterContainer>
      <CardContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.15, // Stagger based on card index
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <PurpleAccent />
        <CardImage>
          <img src={image} alt={alt} />
        </CardImage>
        <CardContent>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{subtitle}</CardSubtitle>
          </CardHeader>
          <CardBody>{description}</CardBody>
          <CardFooter>
            <CardButton href={actionUrl}>{actionText}</CardButton>
          </CardFooter>
        </CardContent>
      </CardContainer>
    </CardOuterContainer>
  );
}

export default ProjectCard;
