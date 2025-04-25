"use client";

import dynamic from 'next/dynamic';
import HeroSection from "@/components/pages/homepage/hero/heroSection";

// Import components with proper section classes for animations

const OurSolutions = dynamic(() => import("@/components/pages/homepage/our-solutions/our-solutions"), {
    ssr: false,
});

const TrustedBrandsContainer = dynamic(() => import("@/components/pages/homepage/trusted-brands/trusted-brands"), {
    ssr: false,
});

const RecentWorks = dynamic(() => import("@/components/pages/homepage/recent-works/recent-works"), {ssr: false});

const OurServices = dynamic(() => import("@/components/pages/homepage/services/ourServices"), {ssr: false});

const AboutUs = dynamic(() => import("@/components/pages/homepage/about-us/about-us"), {ssr: false});

// const LatestInsights = dynamic(() => import("@/components/pages/homepage/latest-insights/latest-insights"), {ssr: false});

const DigitalAuditSection = dynamic(() => import("@/components/pages/homepage/digital-audit/digital-audit"), {ssr: false});

const QuoteRequestForm = dynamic(() => import("@/components/pages/homepage/quote-request/QuoteRequestForm"), {ssr: false});


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
