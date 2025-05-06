"use client"

import OurStory from '@/components/pages/about-us/our-story/our-story';
import OurTeam from "@/components/pages/about-us/our-team/our-team";
import OurMission from "@/components/pages/about-us/our-mission/our-mission";
import OurCommitment from "@/components/pages/about-us/our-commitment/our-commitment";

export default function AboutUsPageClient() {
    return (
        <>
            <OurStory/>
            <OurTeam/>
            <OurMission/>
            <OurCommitment/>
        </>
    );
}
