import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin } from "lucide-react";
import Image from "next/image";
import resumeImage from "@/assets/images/resume.jpg";
import { SiPython, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { Highlighter } from "@/components/ui/highlighter";
import { motion, cubicBezier } from "framer-motion";
import portfolioData from "@/data/portfolio-data.json";

export default function HeroSection() {
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden py-16 md:py-0"
      aria-label="Introduction and developer skills overview"
    >
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
        <div className="flex-1 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-700 z-10 text-center md:text-left flex flex-col items-center md:items-start">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 bg-secondary/50 border-primary/20 text-primary flex w-fit items-center gap-2"
          >
            <MapPin className="size-3" />
            {badgeLocation}
          </Badge>

          <div className="space-y-4">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              {greeting}{" "}
              <span className="relative inline-block text-foreground">
                <Highlighter action="box" color="#6e56cf">
                  {highlightedName}
                </Highlighter>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-primary leading-tight max-w-[90%] md:max-w-none mx-auto md:mx-0">
              {roleTitle}
            </p>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-[500px]">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              className="rounded-full px-8 bg-primary text-primary-foreground w-full sm:w-auto cursor-pointer"
              onClick={() => window.open(resumeUrl, "_blank")}
            >
              <Download className="mr-2 size-4" />
              {buttons.downloadResume}
            </Button>
          </div>
        </div>

        <div className="flex-1 relative animate-in fade-in zoom-in duration-1000 flex justify-center w-full max-w-[300px] sm:max-w-[400px] md:max-w-none">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] md:blur-3xl opacity-50" />

          {/* Main Image Container with subtle float */}
          <motion.div
            {...floatAnimation(0)}
            className="relative z-10 w-full aspect-square max-w-[280px] sm:max-w-[350px] lg:max-w-[450px]"
          >
            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-primary/20 shadow-2xl">
              <Image
                src={resumeImage}
                alt={`${name} — ${role} with back-end, mobile, and web development skills`}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Floating Stack Label - Offset delay for organic feel */}
            <motion.div
              {...floatAnimation(0.5)}
              className="absolute top-2 -left-8 sm:top-4 sm:-left-12 bg-background/90 backdrop-blur-md border border-border p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg z-20"
            >
              <div className="flex flex-col items-center">
                <span className="text-[8px] sm:text-[10px] font-bold text-primary mb-1.5 uppercase tracking-wider">
                  {floatingBadges.coreSkillsTitle}
                </span>
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="size-5 sm:size-7 flex items-center justify-center bg-white rounded-md border border-slate-200 shadow-sm">
                    <SiTypescript className="size-3 sm:size-4 text-[#3178C6]" />
                  </div>
                  <div className="size-5 sm:size-7 flex items-center justify-center bg-white rounded-md border border-slate-200 shadow-sm">
                    <SiPython className="size-3 sm:size-4 text-[#3776AB]" />
                  </div>
                  <div className="size-5 sm:size-7 flex items-center justify-center bg-white rounded-md border border-slate-200 shadow-sm">
                    <TbBrandCSharp className="size-3 sm:size-4 text-[#239120]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Role Label */}
            <motion.div
              {...floatAnimation(1.2)}
              className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 bg-background/90 backdrop-blur-md border border-border p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl z-20"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="size-6 sm:size-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-[10px] sm:text-xs">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold leading-none">
                    {floatingBadges.educationBadge.degree}
                  </p>
                  <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-0.5 sm:mt-1 whitespace-nowrap">
                    {floatingBadges.educationBadge.role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Availability Label */}
            <motion.div
              {...floatAnimation(0.8)}
              className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 bg-background/90 backdrop-blur-md border border-border p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl z-20"
            >
              <div className="flex items-center gap-2">
                <div className="size-1.5 sm:size-2 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] sm:text-sm font-medium">
                  {floatingBadges.availabilityBadge.status}
                </p>
              </div>
              <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-0.5 sm:mt-1 ml-3 sm:ml-4 whitespace-nowrap">
                {floatingBadges.availabilityBadge.subtitle}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
