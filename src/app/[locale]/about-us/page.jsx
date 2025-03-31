"use client";

import Earth from '@/components/Earth';
import OurStory from '@/components/pages/about-us/our-story/our-story';
import OurTeam from "@/components/pages/about-us/our-team/our-team";
import OurMission from "@/components/pages/about-us/our-mission/our-mission";
import OurCommitment from "@/components/pages/about-us/our-commitment/our-commitment";

export default function AboutUsPage() {
    return (
        <>
            <Earth>
                <OurStory/>
                <OurTeam/>
                <OurMission/>
                <OurCommitment/>
            </Earth>
        </>
    );
}
