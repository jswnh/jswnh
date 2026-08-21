import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin, Loader2 } from "lucide-react";
import Image from "next/image";
import resumeImage from "@/assets/images/resume.jpg";
import { SiPython, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { Highlighter } from "@/components/ui/highlighter";
import { motion, cubicBezier } from "framer-motion";
import portfolioData from "@/data/portfolio-data.json";
import { NoiseBackground } from "@/components/ui/noise-background";
import { confetti } from "@/components/ui/confetti";

export default function HeroSection() {
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    badgeLocation,
    greeting,
    highlightedName,
    roleTitle,
    subtitle,
    buttons,
    floatingBadges,
  } = portfolioData.heroSectionData;
  const { resumeUrl, name, role } = portfolioData.personalInfo;

  const handleDownloadResume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDownloading) return;
    setIsDownloading(true);

    const target = e.currentTarget;
    if (target) {
      const rect = target.getBoundingClientRect();
      const origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      };

      try {
        await confetti({
          particleCount: 80,
          spread: 70,
          origin,
          colors: ["#6e56cf", "#60a5fa", "#a855f7", "#c084fc", "#93c5fd"],
          zIndex: 9999,
        });
      } catch (err) {
        console.error("Confetti error:", err);
      }
    }

    setTimeout(() => {
      window.open(resumeUrl, "_blank");
      setIsDownloading(false);
    }, 700);
  };

  const floatAnimation = (delay: number = 0) => ({
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: cubicBezier(0.45, 0, 0.55, 1),
        delay: delay,
      },
    },
  });

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-x-hidden py-14 md:py-20"
      aria-label="Introduction and developer skills overview"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
        <div className="flex-1 space-y-5 md:space-y-6 animate-in fade-in slide-in-from-left duration-700 z-10 text-center md:text-left flex flex-col items-center md:items-start">
          <Badge
            variant="secondary"
            className="rounded-full px-3.5 py-1 text-xs bg-secondary/50 border-primary/20 text-primary flex w-fit items-center gap-1.5"
          >
            <MapPin className="size-3" />
            {badgeLocation}
          </Badge>

          <div className="space-y-3 md:space-y-4">
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]"
            >
              {greeting}{" "}
              <span className="relative inline-block text-foreground">
                <Highlighter action="box" color="#6e56cf">
                  {highlightedName}
                </Highlighter>
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-semibold text-primary leading-snug max-w-[90%] md:max-w-none mx-auto md:mx-0">
              {roleTitle}
            </p>

            <p className="text-muted-foreground text-sm sm:text-base max-w-[460px] leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-1">
            <NoiseBackground
              containerClassName="w-fit p-1 sm:p-1.5 rounded-full"
              gradientColors={[
                "rgb(110, 86, 207)",
                "rgb(96, 165, 250)",
                "rgb(168, 85, 247)",
              ]}
              noiseIntensity={0.15}
              speed={0.08}
            >
              <button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 cursor-pointer rounded-full bg-gradient-to-r from-white via-purple-50/70 to-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.9)_inset,0px_1px_3px_0px_rgba(110,86,207,0.15)] transition-all duration-200 active:scale-95 hover:opacity-95 dark:from-[#26174a] dark:via-[#1e133b] dark:to-[#2e1c59] dark:text-purple-100 dark:border-primary/50 dark:shadow-[0px_1px_0px_0px_rgba(168,85,247,0.3)_inset,0px_2px_10px_0px_rgba(110,86,207,0.25)] hover:dark:border-primary/80 hover:dark:from-[#2e1d5a] hover:dark:to-[#37226c] border border-primary/30 disabled:opacity-80"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-primary" />
                    <span>Opening Resume...</span>
                  </>
                ) : (
                  <>
                    <Download className="size-4 text-primary" />
                    <span>{buttons.downloadResume}</span>
                  </>
                )}
              </button>
            </NoiseBackground>
          </div>
        </div>

        <div className="flex-1 relative animate-in fade-in zoom-in duration-1000 flex justify-center w-full max-w-[280px] sm:max-w-[340px] md:max-w-none">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] md:blur-3xl opacity-40" />

          {/* Main Image Container with subtle float */}
          <motion.div
            {...floatAnimation(0)}
            className="relative z-10 w-full aspect-square max-w-[240px] sm:max-w-[290px] lg:max-w-[350px]"
          >
            <div className="relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/20 shadow-xl">
              <Image
                src={resumeImage}
                alt={`${name} — ${role} with back-end, mobile, and web development skills`}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Floating Stack Label */}
            <motion.div
              {...floatAnimation(0.5)}
              className="absolute top-2 -left-5 sm:top-3 sm:-left-8 bg-background/90 backdrop-blur-md border border-border p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-md z-20"
            >
              <div className="flex flex-col items-center">
                <span className="text-[8px] sm:text-[9px] font-bold text-primary mb-1 uppercase tracking-wider">
                  {floatingBadges.coreSkillsTitle}
                </span>
                <div className="flex gap-1.5">
                  <div className="size-5 sm:size-6 flex items-center justify-center bg-white rounded-md border border-slate-200 shadow-xs">
                    <SiTypescript className="size-3 sm:size-3.5 text-[#3178C6]" />
                  </div>
                  <div className="size-5 sm:size-6 flex items-center justify-center bg-white rounded-md border border-slate-200 shadow-xs">
                    <SiPython className="size-3 sm:size-3.5 text-[#3776AB]" />
                  </div>
                  <div className="size-5 sm:size-6 flex items-center justify-center bg-white rounded-md border border-slate-200 shadow-xs">
                    <TbBrandCSharp className="size-3 sm:size-3.5 text-[#239120]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Role Label */}
            <motion.div
              {...floatAnimation(1.2)}
              className="absolute -top-2.5 -right-2 sm:-top-4 sm:-right-4 bg-background/90 backdrop-blur-md border border-border p-2 sm:p-3 rounded-xl shadow-md z-20"
            >
              <div className="flex items-center gap-2">
                <div className="size-5 sm:size-6 bg-primary/20 rounded-md flex items-center justify-center text-primary font-bold text-[9px] sm:text-[10px]">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-[9px] sm:text-[11px] font-bold leading-none">
                    {floatingBadges.educationBadge.degree}
                  </p>
                  <p className="text-[7px] sm:text-[9px] text-muted-foreground mt-0.5 whitespace-nowrap">
                    {floatingBadges.educationBadge.role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Availability Label */}
            <motion.div
              {...floatAnimation(0.8)}
              className="absolute -bottom-2.5 -left-2 sm:-bottom-4 sm:-left-4 bg-background/90 backdrop-blur-md border border-border p-2 sm:p-3 rounded-xl shadow-md z-20"
            >
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-[9px] sm:text-xs font-medium">
                  {floatingBadges.availabilityBadge.status}
                </p>
              </div>
              <p className="text-[7px] sm:text-[9px] text-muted-foreground mt-0.5 ml-3 whitespace-nowrap">
                {floatingBadges.availabilityBadge.subtitle}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
