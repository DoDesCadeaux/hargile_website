// src/components/pages/about-us/our-mission/our-mission.jsx
"use client";

import {useTranslations} from "next-intl";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";
import {
    ConnectorLine,
    ContentWrapper,
    Description,
    HighlightedText,
    IconContainer,
    MainTitle,
    SectionContainer,
    SubheadingText,
    TitleWrapper,
    ValueDescription,
    ValueItem,
    ValuesContainer,
    ValueTitle
} from "./our-mission.styled";
import {Heart, Megaphone, User} from "lucide-react";

const OurMission = () => {
    const t = useTranslations("pages.about-us.sections.our-mission");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: true, amount: 0.2});

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6, ease: "easeOut"}
        }
    };

    const valueVariants = {
        hidden: {opacity: 0, y: 50},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.8, ease: "easeOut"}
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
                <TitleWrapper variants={titleVariants} as={motion.div}>
                    <MainTitle>{t("title")}</MainTitle>
                </TitleWrapper>

                <motion.div variants={titleVariants}>
                    <HighlightedText>{t("highlighted")}</HighlightedText>
                    <SubheadingText>{t("subheading")}</SubheadingText>
                </motion.div>

                <motion.div variants={titleVariants}>
                    <Description>{t("description")}</Description>
                </motion.div>

                <ValuesContainer>
                    <ValueItem as={motion.div} variants={valueVariants}>
                        <IconContainer>
                            <User size={32} strokeWidth={1.5}/>
                        </IconContainer>
                        <div>
                            <ValueTitle>{t("values.human.title")}</ValueTitle>
                            <ValueDescription>{t("values.human.description")}</ValueDescription>
                        </div>
                    </ValueItem>

                    <ConnectorLine/>

                    <ValueItem as={motion.div} variants={valueVariants}>
                        <IconContainer>
                            <Megaphone size={32} strokeWidth={1.5}/>
                        </IconContainer>
                        <div>
                            <ValueTitle>{t("values.innovation.title")}</ValueTitle>
                            <ValueDescription>{t("values.innovation.description")}</ValueDescription>
                        </div>
                    </ValueItem>

                    <ConnectorLine/>

                    <ValueItem as={motion.div} variants={valueVariants}>
                        <IconContainer>
                            <Heart size={32} strokeWidth={1.5}/>
                        </IconContainer>
                        <div>
                            <ValueTitle>{t("values.integrity.title")}</ValueTitle>
                            <ValueDescription>{t("values.integrity.description")}</ValueDescription>
                        </div>
                    </ValueItem>
                </ValuesContainer>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default OurMission;
