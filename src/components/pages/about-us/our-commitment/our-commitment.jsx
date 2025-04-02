"use client";

import {useTranslations} from "next-intl";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";
import {
    BubblePercentage,
    BubbleText,
    ContentWrapper,
    Description,
    HighlightedText,
    InfoBubble,
    InfoBubbleContainer,
    MainTitle,
    PillarIcon,
    PillarItem,
    PillarsContainer,
    PillarTitle,
    PlanetWrapper,
    SectionContainer,
    Subtitle,
    TextWrapper
} from "./our-commitment.styled";
import {Leaf, Scale, Users} from "lucide-react";

const OurCommitment = () => {
    const t = useTranslations("pages.about-us.sections.our-commitment");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: true, amount: 0.2});

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

    const bubbleVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: i => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.2 + 0.3
            }
        })
    };

    return (
        <SectionContainer ref={sectionRef}>
            <MainTitle
                as={motion.h2}
                initial={{opacity: 0, y: -20}}
                animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: -20}}
                transition={{duration: 0.6, ease: "easeOut"}}
            >
                {t("title", "Our Commitment")}
            </MainTitle>

            <ContentWrapper>
                <PlanetWrapper>
                    <InfoBubbleContainer>

                        <InfoBubble
                            className="bubble-1"
                            as={motion.div}
                            custom={0}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={bubbleVariants}
                        >
                            <BubblePercentage>1%</BubblePercentage>
                            <BubbleText>{t("bubbles.goodplanet", "Of our profits go to GoodPlanet")}</BubbleText>
                        </InfoBubble>

                        <InfoBubble
                            className="bubble-85"
                            as={motion.div}
                            custom={1}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={bubbleVariants}
                        >
                            <BubblePercentage>85%</BubblePercentage>
                            <BubbleText>{t("bubbles.carbon", "Carbon footprint reduction")}</BubbleText>
                        </InfoBubble>

                        <InfoBubble
                            className="bubble-100"
                            as={motion.div}
                            custom={2}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={bubbleVariants}
                        >
                            <BubblePercentage>100%</BubblePercentage>
                            <BubbleText>{t("bubbles.renewable", "Renewable energy powered")}</BubbleText>
                        </InfoBubble>
                    </InfoBubbleContainer>
                </PlanetWrapper>

                <TextWrapper
                    as={motion.div}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <HighlightedText>{t("highlighted", "To foster sustainable innovation")}</HighlightedText>
                        <Subtitle>{t("subtitle", "through responsible technology and ethical practices.")}</Subtitle>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Description>
                            {t("description", "We strive to create digital solutions that not only transform businesses but also respect our planet and empower communities, making technology more sustainable, responsible, and impactful.")}
                        </Description>
                    </motion.div>

                    <PillarsContainer as={motion.div} variants={itemVariants}>
                        <PillarItem>
                            <PillarIcon>
                                <Leaf size={24}/>
                            </PillarIcon>
                            <PillarTitle>{t("pillars.environmental", "Environmental Responsibility")}</PillarTitle>
                        </PillarItem>

                        <PillarItem>
                            <PillarIcon>
                                <Scale size={24}/>
                            </PillarIcon>
                            <PillarTitle>{t("pillars.ethical", "Ethical Innovation")}</PillarTitle>
                        </PillarItem>

                        <PillarItem>
                            <PillarIcon>
                                <Users size={24}/>
                            </PillarIcon>
                            <PillarTitle>{t("pillars.inclusion", "Digital Inclusion")}</PillarTitle>
                        </PillarItem>
                    </PillarsContainer>
                </TextWrapper>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default OurCommitment;
