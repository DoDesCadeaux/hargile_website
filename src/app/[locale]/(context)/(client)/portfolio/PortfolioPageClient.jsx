"use client";

import React from "react";
import {useLocale, useTranslations} from "next-intl";
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
} from "@/app/[locale]/(context)/(client)/portfolio/PortfolioPageClient.styled";
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import {generatePortfolioCollectionSchema, generatePortfolioItemSchema} from "@/seo/portfolio-schema-generator";

export default function PortfolioPage() {
    const t = useTranslations("pages.portfolio");
    const locale = useLocale();

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
        },
        {
            id: 9,
            title: "I N S P I R I T E Coaching",
            subtitle: t("projects.inspirite.subtitle"),
            description: t("projects.inspirite.description"),
            image: "/images/portfolio/inspirite.webp",
            actionText: t("viewMore"),
            actionUrl: "https://inspiritecoaching.com/",
        },
        {
            id: 10,
            title: "Alia Nature",
            subtitle: t("projects.alianature.subtitle"),
            description: t("projects.alianature.description"),
            image: "/images/portfolio/aliaNature.webp",
            actionText: t("viewMore"),
            actionUrl: "https://alianature.com/",
        },
        {
            id: 11,
            title: "Maya Global",
            subtitle: t("projects.mayaglobal.subtitle"),
            description: t("projects.mayaglobal.description"),
            image: "/images/portfolio/mayaglobal.webp",
            actionText: t("viewMore"),
            actionUrl: "https://mayaglobal.io/",
        },
        {
            id: 12,
            title: "Creative ID",
            subtitle: t("projects.creativeid.subtitle"),
            description: t("projects.creativeid.description"),
            image: "/images/portfolio/creativeid.webp",
            actionText: t("viewMore"),
            actionUrl: "https://www.creativeid.eu/",
        },
        {
            id: 13,
            title: "Hexi Designs",
            subtitle: t("projects.hexidesigns.subtitle"),
            description: t("projects.hexidesigns.description"),
            image: "/images/portfolio/hexidesigns.webp",
            actionText: t("viewMore"),
            actionUrl: "https://hexidesigns.com/",
        },
        {
            id: 14,
            title: "Mardi Editions",
            subtitle: t("projects.mardieditions.subtitle"),
            description: t("projects.mardieditions.description"),
            image: "/images/portfolio/mardieditions.webp",
            actionText: t("viewMore"),
            actionUrl: "https://mardi-editions.com/",
        },
        {
            id: 15,
            title: "Locafût",
            subtitle: t("projects.locafut.subtitle"),
            description: t("projects.locafut.description"),
            image: "/images/portfolio/locafut.webp",
            actionText: t("viewMore"),
            actionUrl: "https://locafut.be",
        },
        {
            id: 16,
            title: "Cristophe de Fierlant",
            subtitle: t("projects.defierlant.subtitle"),
            description: t("projects.defierlant.description"),
            image: "/images/portfolio/defierlant.webp",
            actionText: t("viewMore"),
            actionUrl: "https://christophedefierlant.com",
        },
    ];

    // Get domain from environment or use default
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const schemaOptions = {locale, domain};

    // Generate schema for the collection (portfolio page)
    const collectionSchema = generatePortfolioCollectionSchema(
        projects,
        schemaOptions,
        t("title"),
        t("description")
    );

    // Generate individual schema for each project
    const projectSchemas = projects.map(project =>
        generatePortfolioItemSchema(project, schemaOptions)
    );

    return (
        <PageWrapper>
            {/* Schema Markup for the collection page */}
            <SchemaMarkup data={collectionSchema}/>

            {/* Schema Markup for each individual project */}
            {projectSchemas.map((schema, index) => (
                <SchemaMarkup key={`schema-${projects[index].id}`} data={schema}/>
            ))}

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
                        viewport={{once: true, amount: 0.01}}
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
                    viewport={{once: true, amount: 0.01}}
                >
                    <CTATitle>{t("cta.title")}</CTATitle>
                    <CTADescription>{t("cta.description")}</CTADescription>
                    <CTAButton
                        href="/contact"
                        whileHover={{
                            scale: 1.05,
                            transition: {duration: 0.01},
                        }}
                    >
                        {t("cta.button")}
                    </CTAButton>
                </CallToActionSection>
            </ContentContainer>
        </PageWrapper>
    );
}
