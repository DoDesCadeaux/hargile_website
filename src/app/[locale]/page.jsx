// src/app/[locale]/page.jsx
"use client";

import Earth from '@/components/Earth';
import OurSolutions from "@/components/pages/homepage/our-solutions/our-solutions";
import TrustedBrandsContainer from "@/components/pages/homepage/trusted-brands/trusted-brands";
import RecentWorks from "@/components/pages/homepage/recent-works/recent-works";
import AboutUs from "@/components/pages/homepage/about-us/about-us";

export default function HomePage() {
    return (
        <>
            <Earth>
                <OurSolutions/>
                <TrustedBrandsContainer/>
                <RecentWorks/>
                <AboutUs/>
            </Earth>
        </>
    );
}
