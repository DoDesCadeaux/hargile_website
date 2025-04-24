"use client";

import dynamic from 'next/dynamic';

// Import components with no SSR to prevent window errors
const OurSolutions = dynamic(() => import("@/components/pages/homepage/our-solutions/our-solutions"), {ssr: false});
const TrustedBrandsContainer = dynamic(() => import("@/components/pages/homepage/trusted-brands/trusted-brands"), {ssr: false});
const RecentWorks = dynamic(() => import("@/components/pages/homepage/recent-works/recent-works"), {ssr: false});
const AboutUs = dynamic(() => import("@/components/pages/homepage/about-us/about-us"), {ssr: false});
const LatestInsights = dynamic(() => import("@/components/pages/homepage/latest-insights/latest-insights"), {ssr: false});
const HeroSection = dynamic(() => import("@/components/pages/homepage/hero/heroSection"), {ssr: false});
const OurServices = dynamic(() => import("@/components/pages/homepage/services/ourServices"), {ssr: false});
const QuoteRequestForm = dynamic(() => import("@/components/pages/homepage/quote-request/QuoteRequestForm"), {ssr: false});
const DigitalAuditSection = dynamic(() => import("@/components/pages/homepage/digital-audit/digital-audit"), {ssr: false});

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
            <DigitalAuditSection/>
            <QuoteRequestForm/>
        </>
    );
}
