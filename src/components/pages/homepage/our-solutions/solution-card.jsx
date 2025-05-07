// src/components/sections/OurSolutions/SolutionCard/index.jsx
import React from "react";
import {useTranslations} from "next-intl";
import {
    CardContainer,
    CardContent,
    CardDescription,
    CardSubtitle,
    CardTitle,
    LearnMoreLink
} from "./solution-card.styled";

const SolutionCard = ({title, subtitle, description, iconSrc, link, id}) => {
    const t = useTranslations("pages.homepage.sections.our-solutions");

    return (
        <CardContainer className={`our-solutions__card our-solutions__card--${id}`}>
            <CardContent>
                {/*<IconContainer className="our-solutions__card-icon">*/}
                {/*    /!* Using a placeholder SVG since we don't have the actual icons *!/*/}
                {/*    <img src="/icons/circle_arrow.svg" width={30} height={30} alt="Circle arrow"/>*/}
                {/*</IconContainer>*/}
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardDescription>{description}</CardDescription>

                {link &&
                    <LearnMoreLink title={title} href={link} aria-label={title}>
                        {t("learn-more")}
                        {/*<img src="/icons/circle_arrow.svg" width={30} height={30} alt="Circle arrow"/>*/}
                    </LearnMoreLink>
                }
            </CardContent>
        </CardContainer>
    );
};

export default SolutionCard;
