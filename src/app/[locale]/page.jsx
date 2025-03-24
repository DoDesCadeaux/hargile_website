"use client";

import Earth from '@/components/Earth';
import OurSolutions from "@/components/pages/homepage/our-solutions/our-solutions";
import TrustedBrandsContainer from "@/components/pages/homepage/trusted-brands/trusted-brands";

export default function HomePage() {
    return (
        <>
            <Earth>
                <OurSolutions/>
                <TrustedBrandsContainer/>
            </Earth>
        </>
    );
}
