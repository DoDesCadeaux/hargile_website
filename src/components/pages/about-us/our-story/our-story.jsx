"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {
    ContentWrapper,
    EarthImageContainer,
    GetInTouchButton,
    HeadingContainer,
    SectionContainer,
    StoryHeading,
    StoryText,
    TextContainer,
    TitleUnderline
} from "./our-story.styled";
import {motion, useInView} from "framer-motion";
import {useRef} from "react";

const OurStory = () => {
    const t = useTranslations("pages.about-us.sections.our-story");
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

    return (
        <SectionContainer ref={sectionRef}>
            <ContentWrapper
                as={motion.div}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <TextContainer>
                    <HeadingContainer as={motion.div} variants={itemVariants}>
                        <StoryHeading>{t("title")}</StoryHeading>
                        <TitleUnderline/>
                    </HeadingContainer>

                    <motion.div variants={itemVariants}>
                        <StoryText>{t("paragraph1")}</StoryText>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <StoryText>{t("paragraph2")}</StoryText>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <GetInTouchButton as={Link} href="/contact">
                            {t("getInTouch")}
                        </GetInTouchButton>
                    </motion.div>
                </TextContainer>

                <EarthImageContainer as={motion.div} variants={itemVariants}>
                    {/* Image is provided by the Earth component background */}
                </EarthImageContainer>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default OurStory;
