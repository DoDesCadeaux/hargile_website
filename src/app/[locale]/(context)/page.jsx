"use client";

import HeroSection from "@/components/pages/homepage/hero/heroSection";
import OurSolutions from "@/components/pages/homepage/our-solutions/our-solutions";
import {TrustedBrandsContainer} from "@/components/pages/homepage/trusted-brands/trusted-brands.styled";
import RecentWorks from "@/components/pages/homepage/recent-works/recent-works";
import OurServices from "@/components/pages/homepage/services/ourServices";
import AboutUs from "@/components/pages/homepage/about-us/about-us";
import DigitalAuditSection from "@/components/pages/homepage/digital-audit/digital-audit";
import QuoteRequestForm from "@/components/pages/homepage/quote-request/QuoteRequestForm";

export default function HomePage() {
    return (
        <div className="homepage-container page-exit">
            <HeroSection/>
            <OurSolutions/>
            <TrustedBrandsContainer/>
            <RecentWorks/>
            <OurServices/>
            <AboutUs/>
            {/*<LatestInsights/>*/}
            <DigitalAuditSection/>
            <QuoteRequestForm/>
        </div>
    );
}
