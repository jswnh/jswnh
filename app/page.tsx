"use client";

import { DockItem, DockNavigation } from "@/components/dock-navigation";
import {
  Home,
  Code2,
  Cpu,
  Trophy,
  BadgeCheck,
  Github,
  Mail,
} from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import HeroSection from "./sections/HeroSection";
import Header from "@/components/Header";
import FeatureProjectSection from "./sections/FeatureProjectSection";
import SkillSection from "./sections/SkillSection";
import AchievementSection from "./sections/AchievementSection";
import CertificationSection from "./sections/CertificationSection";
import ContactSection from "./sections/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";

export default function Page() {
  const navItems: DockItem[] = [
    { label: "Home", href: "#hero", icon: Home },
    { label: "Skills", href: "#skills", icon: Cpu },
    { label: "Projects", href: "#projects", icon: Code2 },
    { label: "Achievements", href: "#awards", icon: Trophy },
    { label: "Certifications", href: "#certifications", icon: BadgeCheck },
    { label: "GitHub", href: "https://github.com/jswnh", icon: Github },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hulomjosuan/",
      icon: SiLinkedin,
    },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <div className="relative scroll-smooth">
      <LoadingScreen />
      <Header />

      <main id="main-content">
        <section id="hero" aria-labelledby="hero-heading">
          <HeroSection />
        </section>
        <section id="skills" aria-labelledby="skills-heading">
          <SkillSection />
        </section>
        <section id="projects" aria-labelledby="projects-heading">
          <FeatureProjectSection />
        </section>
        <section id="awards" aria-labelledby="achievements-heading">
          <AchievementSection />
        </section>
        <section id="certifications" aria-labelledby="certifications-heading">
          <CertificationSection />
        </section>
        <section id="contact" aria-labelledby="contact-heading">
          <ContactSection />
        </section>
      </main>

      <nav aria-label="Site navigation">
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <DockNavigation groups={[navItems]} />
        </div>
      </nav>
    </div>
  );
}
