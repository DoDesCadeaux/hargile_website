"use client";

import {useTranslations} from "next-intl";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";
import {Header} from "@/components/header/mainHeader";
import {
    AvailabilityBadge,
    ContentSection,
    ContentWrapper, CTAButton, CTASection, Description, FeatureCard, FeatureDescription, FeaturesGrid, FeatureTitle,
    MainContent,
    SolutionContainer
} from "@/app/[locale]/(context)/solutions/agves/page.styled";


export default function AgvesPage() {
    // const t = useTranslations("pages.solutions.agves");
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
            id: "wallet",
            title: "Portefeuille électronique intégré",
            description: "solution de paiement sécurisée pour la gestion des frais scolaires, repas, activités et autres transactions, avec suivi en temps réel.",
        },
        {
            id: "access",
            title: "Clés d'accès numériques",
            description: "authentification sécurisée via identifiants cryptés ou badges NFC pour un contrôle renforcé des accès physiques et numériques.",
        },
        {
            id: "communication",
            title: "Portail de communication parents-école",
            description: "messagerie intégrée, notifications en temps réel, diffusion d'annonces et gestion des autorisations.",
        },
        {
            id: "finance",
            title: "Module de gestion financière",
            description: "suivi budgétaire, facturation automatisée, gestion des subventions et export comptable.",
        },
        {
            id: "dashboard",
            title: "Tableau de bord administrateur ergonomique",
            description: "interface centralisée pour la supervision des données scolaires, avec indicateurs personnalisables et accès multi-profil.",
        },
    ];

    return (
        <SolutionContainer ref={sectionRef}>
            <ContentWrapper>
                <Header
                    title="AGVES"
                    subtitleRegular="Transforme la gestion"
                    subtitleHighlight="scolaire"
                    description="Application de gestion des ventes spécialisée pour le secteur de l'éducation."
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
                            AGVES révolutionne la communication de la vie scolaire et extrascolaire par la mise en place
                            d'un interface simplificateur. Il améliore toutes opérations liées aux transactions
                            financières comme les process de sécurité.
                        </Description>
                        <Description variants={itemVariants}>
                            AGVES garantit aux élèves l'accès aux ressources dont ils ont besoin tout en fournissant aux
                            administrateurs des outils de gestion puissants et performants.
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
                        Contactez-nous pour une démonstration
                    </CTAButton>
                </CTASection>
            </ContentWrapper>
        </SolutionContainer>
    );
}
