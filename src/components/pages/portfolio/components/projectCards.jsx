import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(15, 10, 40, 0.7);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
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

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
`;

const CardSubtitle = styled.div`
  font-size: 0.875rem;
  color: #a78bfa;
`;

const CardBody = styled.p`
  font-size: 0.9375rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  margin-top: auto;
`;

const CardButton = styled.a`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #9333ea;
  }
`;

const PurpleAccent = styled.div`
  height: 3px;
  width: 40px;
  background: linear-gradient(90deg, #9333ea, #4f46e5);
  margin-bottom: 1rem;
`;

/**
 * Project card component for displaying portfolio items
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Project title
 * @param {string} props.subtitle - Project subtitle/category
 * @param {string} props.description - Project description
 * @param {string} props.image - Project image URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.actionText - Action button text
 * @param {string} props.actionUrl - Action button URL
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
}) {
  return (
    <CardContainer>
      <CardImage>
        <img src={image} alt={alt} />
      </CardImage>
      <CardContent>
        <PurpleAccent />
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
  );
}

export default ProjectCard;
