"use client";

import React, {useEffect} from "react";
import styled from "styled-components";
import {useTranslations} from "next-intl";
import Lenis from "lenis";
import {motion} from "framer-motion";
import {Header} from "@/components/header/mainHeader";
import ProjectCard from "@/components/pages/portfolio/components/projectCards";

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

const BackgroundLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background: transparent; // or an image
  pointer-events: none; // prevent it from blocking interactions
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

const SectionTitle = styled(motion.h2)`
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
`;

const ProjectsGrid = styled.div`
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

const CallToActionSection = styled(motion.section)`
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

const CTAButton = styled(motion.a)`
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

    // Project data
    const projects = [
      {
        id: 1,
        title: "EREN",
        subtitle: t("projects.eren.subtitle"),
        description: t("projects.eren.description"),
        image: "/images/portfolio/eren2.webp",
        actionText: t("viewMore"),
        actionUrl: "https://erenenergystorage.be/",
      },
      {
        id: 2,
        title: "ALUVI",
        subtitle: t("projects.aluvi.subtitle"),
        description: t("projects.aluvi.description"),
        image: "/images/portfolio/aluviPortofolio.webp",
        actionText: t("viewProject"),
        actionUrl: "https://aluvi.be/",
      },
      {
        id: 3,
        title: "Artaban",
        subtitle: t("projects.artaban.subtitle"),
        description: t("projects.artaban.description"),
        image: "/images/portfolio/artaban.webp",
        actionText: t("readCaseStudy"),
        actionUrl: "https://artabanstudio.com/",
      },
      {
        id: 4,
        title: "Drip Drops",
        subtitle: t("projects.dripdrops.subtitle"),
        description: t("projects.dripdrops.description"),
        image: "/images/portfolio/dripDrops.webp",
        actionText: t("viewMore"),
        actionUrl: "https://www.dripdrops.eu/",
      },
      {
        id: 5,
        title: "Ferme de Basseilles",
        subtitle: t("projects.ferme_de_basseilles.subtitle"),
        description: t("projects.ferme_de_basseilles.description"),
        image: "/images/portfolio/fdb.webp",
        actionText: t("viewMore"),
        actionUrl: "https://fermedebasseilles.be/",
      },
      {
        id: 6,
        title: "Azza Izzy",
        subtitle: t("projects.azza.subtitle"),
        description: t("projects.azza.description"),
        image: "/images/portfolio/azza.webp",
        actionText: t("viewMore"),
        actionUrl: "https://www.azzaworld.com/",
      },
      {
        id: 7,
        title: "GVE Group",
        subtitle: t("projects.gve.subtitle"),
        description: t("projects.gve.description"),
        image: "/images/portfolio/gve.webp",
        actionText: t("viewMore"),
        actionUrl: "https://www.gv-e.com/",
      },
      {
        id: 8,
        title: "Foorn",
        subtitle: t("projects.foorn.subtitle"),
        description: t("projects.foorn.description"),
        image: "/images/portfolio/foorn.webp",
        actionText: t("viewMore"),
        actionUrl:
          "https://www.order.store/be/store/foorn/I3Y1G6SoTV6qXb_mSIMXWw",
      },    {
        id: 9,
        title: "Inspirite",
        subtitle: t("projects.inspirite.subtitle"),
        description: t("projects.inspirite.description"),
        image: "/images/portfolio/inspirite.webp",
        actionText: t("viewMore"),
        actionUrl:
          "https://www.order.store/be/store/foorn/I3Y1G6SoTV6qXb_mSIMXWw",
      },
    ];

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        // Create Lenis smooth scroll instance
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // Connect lenis to requestAnimationFrame
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
      <PageWrapper>
        <BackgroundLayer />
        <ContentContainer>
          <Header
            title={t("title")}
            subtitleRegular={t("subtitle.line1")}
            subtitleHighlight={t("subtitle.line2")}
            description={t("description")}
            showBackgroundBlur={true}
          />

          <ProjectsSection>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {t("featuredProjects")}
            </SectionTitle>

            <ProjectsGrid>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  image={project.image}
                  actionText={project.actionText}
                  actionUrl={project.actionUrl}
                  index={index}
                />
              ))}
            </ProjectsGrid>
          </ProjectsSection>

          <CallToActionSection
            initial={{ opacity: 0, y: 40 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <CTATitle>{t("cta.title")}</CTATitle>
            <CTADescription>{t("cta.description")}</CTADescription>
            <CTAButton
              href="/contact"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              {t("cta.button")}
            </CTAButton>
          </CallToActionSection>
        </ContentContainer>
      </PageWrapper>
    );
}
