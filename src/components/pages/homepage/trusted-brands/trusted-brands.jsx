"use client";

import {useTranslations} from "next-intl";
import {LogoContainer, LogoWrapper, SectionTitle, TrustedBrandsContainer} from "./trusted-brands.styled";
import {OptimizedImage} from "@/components/optimizedImage";

const TrustedBrands = () => {
    const t = useTranslations("pages.homepage.sections.trusted-brands");

    const brands = [
        {id: "stella-artois", logoSrc: "/images/brand/brand_large.png"},
        {id: "leffe", logoSrc: "/images/brand/brand_large.png"},
        {id: "hoegaarden", logoSrc: "/images/brand/brand_large.png"},
        {id: "cristal", logoSrc: "/images/brand/brand_large.png"}
    ];

    return (
        <TrustedBrandsContainer className="trusted-brands">
            <SectionTitle>{t("title")}</SectionTitle>
            <LogoContainer>
                {brands.map((brand, index) => (
                    <LogoWrapper key={brand.id} index={index}>
                        <OptimizedImage
                            width="200"
                            height="200"
                            src={brand.logoSrc}
                            alt={`${brand.id} logo`}
                        />
                    </LogoWrapper>
                ))}
            </LogoContainer>
        </TrustedBrandsContainer>
    );
};

export default TrustedBrands;
