// src/components/sections/OurSolutions/SolutionCard/index.jsx
import React from "react";
import {useTranslations} from "next-intl";
import {
    CardContainer,
    CardContent,
    CardDescription,
    CardSubtitle,
    CardTitle,
    IconContainer,
    LearnMoreLink
} from "./solution-card.styled";

const SolutionCard = ({title, subtitle, description, iconSrc, link, id}) => {
    const t = useTranslations("pages.homepage.sections.our-solutions");

    return (
        <CardContainer className={`our-solutions__card our-solutions__card--${id}`}>
            <CardContent>
                <IconContainer className="our-solutions__card-icon">
                    {/* Using a placeholder SVG since we don't have the actual icons */}
                    <img src="/icons/circle_arrow.svg" alt=""/>
                </IconContainer>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardDescription>{description}</CardDescription>
                <LearnMoreLink href={link}>
                    {t("learn-more")}
                    <img src="/icons/circle_arrow.svg" alt=""/>
                </LearnMoreLink>
            </CardContent>
        </CardContainer>
    );
};

export default SolutionCard;
