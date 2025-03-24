// src/components/sections/OurSolutions/index.jsx
"use client";

import {useTranslations} from "next-intl";
import {CardsContainer, ContentWrapper, SectionContainer, SectionTitle} from "./our-solutions.styled";
import SolutionCard from "./solution-card";

const OurSolutions = () => {
    const t = useTranslations("pages.homepage.sections.our-solutions");

    const solutions = [
        {
            id: "agves",
            title: t("solutions.agves.title"),
            description: t("solutions.agves.description"),
            iconSrc: "/images/solutions/agves-icon.svg",
            link: "/solutions/agves",
            subtitle: t("solutions.agves.subtitle"),
        },
        {
            id: "i-go",
            title: t("solutions.i-go.title"),
            description: t("solutions.i-go.description"),
            iconSrc: "/images/solutions/i-go-icon.svg",
            link: "/solutions/i-go",
            subtitle: t("solutions.i-go.subtitle"),
        },
        {
            id: 'multipass',
            title: 'Multipass',
            description: '',
            iconSrc: '',
            link: '',
            subtitle: 'Comming Soon',
        }
    ];

    return (
        <SectionContainer className="our-solutions">
            <ContentWrapper>
                <SectionTitle>{t("title")}</SectionTitle>

                <CardsContainer>
                    {solutions.map((solution) => (
                        <SolutionCard
                            key={solution.id}
                            id={solution.id}
                            title={solution.title}
                            description={solution.description}
                            iconSrc={solution.iconSrc}
                            link={solution.link}
                            subtitle={solution.subtitle}
                        />
                    ))}
                </CardsContainer>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default OurSolutions;
