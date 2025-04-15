// src/components/pages/homepage/about-us/about-us.jsx
"use client";

import {useTranslations} from "next-intl";
import {
    Conclusion,
    ContentWrapper,
    Description,
    MainTitle,
    PlusIcon,
    SectionContainer,
    SectionTitle,
    SectionWrapper,
    StyledLi,
    Subtitle,
    SubtitleContainer,
    TitleWrapper
} from "./about-us.styled";
import React, {useRef} from "react";
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

                <SectionWrapper as={motion.div} variants={itemVariants}>
                    <SectionTitle>{t("who_title")}</SectionTitle>
                    <Description>{t("who_description")}</Description>
                    <SubtitleContainer href="/about-us">
                        <Subtitle className={isInView ? "animate-underline" : ""}>
                            {t("subtitle")}
                        </Subtitle>
                        <PlusIcon>
                            <Plus size={24}/>
                        </PlusIcon>
                    </SubtitleContainer>
                </SectionWrapper>

                <SectionWrapper as={motion.div} variants={itemVariants}>
                    <SectionTitle>{t("approach_title").split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line === '' && <br/>}
                            <span>{line}</span>
                        </React.Fragment>
                    ))}</SectionTitle>
                    <Description>{t("approach_description")}</Description>
                    <ul style={{
                        listStyleType: "disclosure-closed",
                    }}>
                        {
                            t.raw('ideas').map((line, i) => (
                                <StyledLi key={i}>{line}</StyledLi>
                            ))
                        }
                    </ul>

                    <Conclusion>{t("conclusion")}</Conclusion>
                </SectionWrapper>

            </ContentWrapper>
        </SectionContainer>
    );
};

export default AboutUs;
