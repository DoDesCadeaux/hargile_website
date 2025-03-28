"use client";

import Earth from '@/components/Earth';
import OurStory from '@/components/pages/about-us/our-story/our-story';
import OurTeam from "@/components/pages/about-us/our-team/our-team";

export default function AboutUsPage() {
    return (
        <>
            <Earth>
                <OurStory/>
                <OurTeam/>
            </Earth>
        </>
    );
}
