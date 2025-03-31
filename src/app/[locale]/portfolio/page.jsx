"use client";

import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Header } from "@/components/header/mainHeader";
import ProjectCard from "@/components/pages/portfolio/components/projectCards";
import Earth from "@/components/Earth";


// Page layout components
const PageWrapper = styled.div`
  min-height: 100vh;
  color: white;
  position: relative;
  padding: 3rem 2rem;

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;


const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ProjectsSection = styled.section`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CallToActionSection = styled.section`
  margin-top: 4rem;
  padding: 3rem;
  background: rgba(15, 10, 40, 0.7);
  border-radius: 12px;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const CTAButton = styled.a`
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

export default function PortfolioPage() {
  const t = useTranslations("pages.portfolio");
  const projects = [
    {
      id: 1,
      title: "AGVES",
      subtitle: t("projects.agves.subtitle"),
      description: t("projects.agves.description"),
      image: "/images/portfolio/agves.jpeg",
      actionText: t("viewMore"),
      actionUrl: "/portfolio/agves",
    },
    {
      id: 2,
      title: "I GO",
      subtitle: t("projects.igo.subtitle"),
      description: t("projects.igo.description"),
      image: "/images/portfolio/igo.jpg",
      actionText: t("viewProject"),
      actionUrl: "/portfolio/igo",
    },
    {
      id: 3,
      title: "Leafy",
      subtitle: t("projects.leafy.subtitle"),
      description: t("projects.leafy.description"),
      image: "/images/portfolio/leafy.jpg",
      actionText: t("readCaseStudy"),
      actionUrl: "/portfolio/leafy",
    },
    {
      id: 4,
      title: "Multipass",
      subtitle: t("projects.multipass.subtitle"),
      description: t("projects.multipass.description"),
      image: "/images/portfolio/multipass.jpg",
      actionText: t("viewMore"),
      actionUrl: "/portfolio/multipass",
    },
    {
      id: 5,
      title: "DataSense",
      subtitle: t("projects.datasense.subtitle"),
      description: t("projects.datasense.description"),
      image: "/images/portfolio/datasense.jpg",
      actionText: t("viewMore"),
      actionUrl: "/portfolio/datasense",
    },
    {
      id: 6,
      title: "EcoTrack",
      subtitle: t("projects.ecotrack.subtitle"),
      description: t("projects.ecotrack.description"),
      image: "/images/portfolio/ecotrack.jpg",
      actionText: t("viewMore"),
      actionUrl: "/portfolio/ecotrack",
    },
  ];

  return (
    <PageWrapper>
        <Earth/>
      <ContentContainer>
        <Header
          title={t("title")}
          subtitleRegular={t("subtitle.line1")}
          subtitleHighlight={t("subtitle.line2")}
          description={t("description")}
          showBackgroundBlur={true}
        />

        <ProjectsSection>
          <SectionTitle>{t("featuredProjects")}</SectionTitle>
          <ProjectsGrid>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                image={project.image}
                actionText={project.actionText}
                actionUrl={project.actionUrl}
              />
            ))}
          </ProjectsGrid>
        </ProjectsSection>

        <CallToActionSection>
          <CTATitle>{t("cta.title")}</CTATitle>
          <CTADescription>{t("cta.description")}</CTADescription>
          <CTAButton href="/contact">{t("cta.button")}</CTAButton>
        </CallToActionSection>
      </ContentContainer>
    </PageWrapper>
  );
}
