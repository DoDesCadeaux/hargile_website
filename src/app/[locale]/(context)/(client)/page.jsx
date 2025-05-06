"use client";

import HeroSection from "@/components/pages/homepage/hero/heroSection";
import OurSolutions from "@/components/pages/homepage/our-solutions/our-solutions";
import OurServices from "@/components/pages/homepage/services/ourServices";
import AboutUs from "@/components/pages/homepage/about-us/about-us";
import DigitalAuditSection from "@/components/pages/homepage/digital-audit/digital-audit";
import ContactForm from "@/components/form/contact-form";
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import {use} from "react";

export default function HomePage({params}) {
    const paramsUsed = use(params);
    const locale = paramsUsed.locale;

    const homePageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": locale === 'fr'
            ? "HARGILE - Innovation digitale au service de votre entreprise"
            : "HARGILE - Digital Innovation for Your Business",
        "description": locale === 'fr'
            ? "Agence digitale spécialisée dans le développement web, les solutions IA et les stratégies marketing"
            : "Digital agency specializing in web development, AI solutions, and marketing strategies",
        "url": `https://hargile-website.vercel.app/${locale}`,
        "image": "https://hargile-website.vercel.app/images/brand/brand_large.png"
    };

    return (
        <div className="homepage-container page-exit">
            <SchemaMarkup data={homePageSchema}/>
            <HeroSection/>
            <OurSolutions/>
            {/*<TrustedBrands/>*/}
            {/*<RecentWorks/>*/}
            <OurServices/>
            <AboutUs/>
            {/*<LatestInsights/>*/}
            <DigitalAuditSection/>
            <ContactForm/>
        </div>
    );
}
