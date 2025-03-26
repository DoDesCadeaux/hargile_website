// src/components/pages/homepage/about-us/about-us.jsx
"use client";

import {useTranslations} from "next-intl";
import {
    ContentWrapper,
    Description,
    MainTitle,
    PlusIcon,
    SectionContainer,
    SectionTitle,
    SectionWrapper,
    StatItem,
    StatLabel,
    StatsWrapper,
    StatValue,
    Subtitle,
    SubtitleContainer,
    TitleWrapper
} from "./about-us.styled";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";
import {Plus} from "lucide-react";

const AboutUs = () => {
    const t = useTranslations("pages.homepage.sections.about-us");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: true, amount: 0.2});

    const stats = [
        {value: "10+", label: t("stats.years")},
        {value: "50+", label: t("stats.projects")},
        {value: "100%", label: t("stats.satisfaction")}
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6, ease: "easeOut"}
        }
    };

    return (
        <SectionContainer ref={sectionRef}>
            <ContentWrapper
                as={motion.div}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <TitleWrapper>
                        <MainTitle>{t("title")}</MainTitle>
                    </TitleWrapper>
                    <SubtitleContainer href="/about-us">
                        <Subtitle className={isInView ? "animate-underline" : ""}>
                            {t("subtitle")}
                        </Subtitle>
                        <PlusIcon>
                            <Plus size={24}/>
                        </PlusIcon>
                    </SubtitleContainer>
                </motion.div>

                <SectionWrapper as={motion.div} variants={itemVariants}>
                    <SectionTitle>{t("who_title")}</SectionTitle>
                    <Description>{t("who_description")}</Description>
                </SectionWrapper>

                <SectionWrapper as={motion.div} variants={itemVariants}>
                    <SectionTitle>{t("approach_title")}</SectionTitle>
                    <Description>{t("approach_description")}</Description>
                </SectionWrapper>

                <StatsWrapper as={motion.div} variants={itemVariants}>
                    {stats.map((stat, index) => (
                        <StatItem key={index}>
                            <StatValue>{stat.value}</StatValue>
                            <StatLabel>{stat.label}</StatLabel>
                        </StatItem>
                    ))}
                </StatsWrapper>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default AboutUs;
