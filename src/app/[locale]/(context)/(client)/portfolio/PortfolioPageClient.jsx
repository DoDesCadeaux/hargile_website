"use client";

import React from "react";
import {useTranslations} from "next-intl";
import {Header} from "@/components/header/mainHeader";
import ProjectCard from "@/components/pages/portfolio/components/projectCards";
import {
    CallToActionSection,
    ContentContainer,
    CTAButton,
    CTADescription,
    CTATitle,
    PageWrapper,
    ProjectsGrid,
    ProjectsSection,
    SectionTitle
} from "@/app/[locale]/(context)/(client)/portfolio/page.styled";


export default function PortfolioPageClient() {
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

            <ContentContainer>
                <Header
                    titleAs={'h1'}
                    title={t("title")}
                    subtitleRegular={t("subtitle.line1")}
                    subtitleHighlight={t("subtitle.line2")}
                    description={t("description")}
                    showBackgroundBlur={true}
                />

                <ProjectsSection>
                    <SectionTitle
                        initial={{opacity: 0, y: 20}}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {duration: 0.6, ease: "easeOut"},
                        }}
                        viewport={{once: true, amount: 0.2}}
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
                    initial={{opacity: 0, y: 40}}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {duration: 0.8, ease: "easeOut", delay: 0.2},
                    }}
                    viewport={{once: true, amount: 0.2}}
                >
                    <CTATitle>{t("cta.title")}</CTATitle>
                    <CTADescription>{t("cta.description")}</CTADescription>
                    <CTAButton
                        href="/contact"
                        whileHover={{
                            scale: 1.05,
                            transition: {duration: 0.2},
                        }}
                    >
                        {t("cta.button")}
                    </CTAButton>
                </CallToActionSection>
            </ContentContainer>
        </PageWrapper>
    );
}
