"use client";
import Earth from "@/components/Earth";
import { Navbar } from "@/components/navigation/navbar";
import BlurredCircles from "@/components/pages/homepage/BlurredCircles";
import HeroSection from "@/components/pages/homepage/hero/heroSection";
import Stars from "@/components/pages/homepage/Stars";

export default function HomePage() {
  return (
    <>
    <BlurredCircles/>
      <Earth>
        <Stars/>
        <HeroSection />
      </Earth>
    </>
  );
}
