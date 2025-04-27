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
    MainContent,
    SolutionContainer
} from "@/app/[locale]/(context)/solutions/i-go/page.styled";


export default function IGoPage() {
    // const t = useTranslations("pages.solutions.igo");
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
            id: "database",
            title: "Base de données enrichie des points de recharge",
            description: "référencement exhaustif des bornes de recharge, avec classification par type, puissance, compatibilité et opérateur.",
        },
        {
            id: "realtime",
            title: "Mises à jour en temps réel",
            description: "actualisation dynamique de la disponibilité des bornes grâce à la synchronisation avec les opérateurs et les retours utilisateurs.",
        },
        {
            id: "collaborative",
            title: "Système collaboratif de contribution",
            description: "ajout de nouveaux points de recharge par la communauté, modération intégrée et validation participative.",
        },
        {
            id: "navigation",
            title: "Navigation intelligente intégrée",
            description: "calcul d'itinéraires optimisés tenant compte de l'autonomie, du trafic et de la localisation des bornes.",
        },
        {
            id: "community",
            title: "Fonctionnalités communautaires avancées",
            description: "partages d'itinéraires, avis, notations et échanges entre utilisateurs autour de la mobilité électrique.",
        },
    ];

    return (
        <SolutionContainer ref={sectionRef}>
            <ContentWrapper>
                <Header
                    title="I GO"
                    subtitleRegular="Réinventer la"
                    subtitleHighlight="mobilité urbaine"
                    description="Une application mobile dédiée conçue pour les utilisateurs d'engins de déplacement personnel motorisés (EDPM) et de vélos à assistance électrique (VAE)."
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
                            I GO est une application mobile innovante dédiée à la mobilité électrique, conçue pour
                            répondre aux besoins croissants des utilisateurs d'Engins de Déplacement Personnel Motorisés
                            (EDPM) et de Vélo à Assistance Électrique (VAE).
                        </Description>
                        <Description variants={itemVariants}>
                            Né du constat lié à la difficulté croissante pour ces utilisateurs de trouver des bornes de
                            recharge, I GO propose un enrichissement de l'expérience utilisateur par une solution
                            complète de référencement et de localisation de ces points de recharge à travers son moteur
                            de recherche intuitif.
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
                        Rejoignez la révolution de la mobilité électrique
                    </CTAButton>
                </CTASection>
            </ContentWrapper>
        </SolutionContainer>
    );
}
