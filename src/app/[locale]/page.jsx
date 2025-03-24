"use client";
import Earth from "@/components/Earth";
import { Navbar } from "@/components/navigation/navbar";
import HeroSection from "@/components/pages/homepage/hero/heroSection";

export default function HomePage() {
  return (
    <>
      <Earth>
        <HeroSection />
      </Earth>
    </>
  );
}
