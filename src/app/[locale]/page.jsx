// src/app/[locale]/page.jsx
"use client";

import OurSolutions from "@/components/pages/homepage/our-solutions/our-solutions";
import TrustedBrandsContainer from "@/components/pages/homepage/trusted-brands/trusted-brands";
import RecentWorks from "@/components/pages/homepage/recent-works/recent-works";
import AboutUs from "@/components/pages/homepage/about-us/about-us";
import LatestInsights from "@/components/pages/homepage/latest-insights/latest-insights";
import HeroSection from "@/components/pages/homepage/hero/heroSection";
import OurServices from "@/components/pages/homepage/services/ourServices";
import QuoteRequestForm from "@/components/pages/homepage/quote-request/QuoteRequestForm";
import {AuditButton} from "@/components/AuditButton";

export default function HomePage() {
    return (
        <>
            <HeroSection/>
            <OurSolutions/>
            <TrustedBrandsContainer/>
            <RecentWorks/>
            <OurServices/>
            <AboutUs/>
            <LatestInsights/>
            <QuoteRequestForm/>

            <AuditButton/>
        </>
    );
}
