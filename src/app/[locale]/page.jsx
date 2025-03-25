"use client";
import Earth from "@/components/Earth";
import { Navbar } from "@/components/navigation/navbar";
import BlurredCircles from "@/components/pages/homepage/BlurredCircles";
import HeroSection from "@/components/pages/homepage/hero/heroSection";
import OurServices from "@/components/pages/homepage/services/ourServices";
import Stars from "@/components/pages/homepage/Stars";

export default function HomePage() {
  return (
    <>
    <BlurredCircles/>
      <Earth>
        <HeroSection />
        <OurServices/>
      </Earth>
    </>
  );
}
