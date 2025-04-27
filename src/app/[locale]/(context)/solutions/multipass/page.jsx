"use client";

import {useTranslations} from "next-intl";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";
import {Header} from "@/components/header/mainHeader";
import {
    ContentSection,
    ContentWrapper,
    CTAButton,
    CTASection,
    Description,
    FeatureCard,
    FeatureDescription,
    FeaturesGrid,
    FeatureTitle,
    HighlightItem,
    HighlightList,
    MainContent,
    SolutionContainer
} from "@/app/[locale]/(context)/solutions/multipass/page.styled";


export default function MultipassPage() {
    // const t = useTranslations("pages.solutions.multipass");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: true, amount: 0.2});

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6, ease: "easeOut"},
        },
    };

    const features = [
        {
            id: "modules",
            title: "Modules personnalisables",
            description: "architecture modulaire permettant d'activer uniquement les fonctionnalités pertinentes selon les besoins métiers spécifiques.",
        },
        {
            id: "integration",
            title: "Intégration transparente",
            description: "interopérabilité native avec les systèmes d'information existants (ERP, outils de messagerie, bases de données, etc.).",
        },
        {
            id: "scalable",
            title: "Architecture évolutive (scalable)",
            description: "infrastructure pensée pour accompagner la montée en charge et les évolutions organisationnelles.",
        },
        {
            id: "reporting",
            title: "Reporting & analytics avancés",
            description: "tableaux de bord dynamiques, indicateurs personnalisés, export et automatisation des rapports.",
        },
        {
            id: "ui",
            title: "Interface utilisateur optimisée",
            description: "UX/UI conçue pour maximiser la productivité et réduire le temps de prise en main.",
        },
    ];

    const highlights = [
        "Modulaire : activez uniquement les fonctionnalités dont vous avez besoin",
        "Polyvalente : convient à tous les types d'entreprises, de tous secteurs",
        "Scalable : grandit avec vous, à votre rythme",
    ];

    return (
        <SolutionContainer ref={sectionRef}>
            <ContentWrapper>
                <Header
                    title="Multipass"
                    subtitleRegular="L'avenir du"
                    subtitleHighlight="CRM"
                    description="Une solution numérique CRM polyvalente avec des options modulaires adaptables à tous les segments de marché."
                    showBackgroundBlur={true}
                />

                <MainContent>
                    <ContentSection
                        as={motion.div}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        <Description variants={itemVariants}>
                            Que vous soyez une startup ambitieuse ou une entreprise bien établie, Multipass vous offre
                            une plateforme CRM modulable et évolutive. Conçue pour s'adapter à tous les secteurs
                            d'activité, notre solution vous permet de centraliser, gérer et optimiser vos relations
                            clients avec une flexibilité inégalée.
                        </Description>

                        <HighlightList>
                            {highlights.map((highlight, index) => (
                                <HighlightItem
                                    key={index}
                                    as={motion.li}
                                    variants={itemVariants}
                                >
                                    {highlight}
                                </HighlightItem>
                            ))}
                        </HighlightList>

                        <Description variants={itemVariants}>
                            Passez à une gestion client intelligente !
                        </Description>
                    </ContentSection>

                    <FeaturesGrid>
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.id}
                                variants={itemVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                custom={index}
                            >
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                            </FeatureCard>
                        ))}
                    </FeaturesGrid>
                </MainContent>

                <CTASection>
                    <CTAButton href="/contact">
                        Découvrez Multipass en action
                    </CTAButton>
                </CTASection>
            </ContentWrapper>
        </SolutionContainer>
    );
}
