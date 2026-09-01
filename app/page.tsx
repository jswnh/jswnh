"use client";

import {
  Home,
  Code2,
  Cpu,
  Trophy,
  BadgeCheck,
  Github,
  Mail,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import FeatureProjectSection from "./sections/FeatureProjectSection";
import SkillSection from "./sections/SkillSection";
import CredentialsSection from "./sections/CredentialsSection";
import ContactSection from "./sections/ContactSection";
import CoffeeLoadingScreen from "@/components/CoffeeLoadingScreen";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { TracingBeam } from "@/components/ui/tracing-beam";
import DockNavigation from "@/components/dock-navigation";

export default function Page() {
  return (
    <div className="relative scroll-smooth overflow-x-clip min-h-screen">
      <CoffeeLoadingScreen />

      {/* Top Header Flickering Grid Background with bottom fade */}
      <div className="absolute top-0 left-0 right-0 z-0 h-64 sm:h-80 md:h-[420px] w-full overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.4}
          flickerChance={0.1}
        />
      </div>

      <TracingBeam className="relative z-10">
        <main id="main-content">
          <section id="hero" aria-labelledby="hero-heading">
            <HeroSection />
          </section>
          <section id="about" aria-labelledby="about-heading">
            <AboutSection />
          </section>
          <section id="skills" aria-labelledby="skills-heading">
            <SkillSection />
          </section>
          <section id="credentials" aria-labelledby="credentials-heading">
            <CredentialsSection />
          </section>
          <section id="projects" aria-labelledby="projects-heading">
            <FeatureProjectSection />
          </section>
          <section id="contact" aria-labelledby="contact-heading">
            <ContactSection />
          </section>
        </main>
      </TracingBeam>

      <nav aria-label="Site navigation">
        <DockNavigation />
      </nav>
    </div>
  );
}
