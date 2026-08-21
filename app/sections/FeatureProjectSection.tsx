"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  SiPython,
  SiPostgresql,
  SiReact,
  SiExpo,
  SiFlutter,
  SiShadcnui,
  SiTailwindcss,
  SiDart,
  SiNextdotjs,
  SiSupabase,
  SiHono,
  SiTypescript,
  SiCloudflare,
} from "react-icons/si";
import { Timeline } from "@/components/ui/timeline";
import { Smartphone, ArrowUpRight, CreditCard } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";

// Import local images statically for Next.js image optimization
import forkplayImg1 from "@/assets/images/forkplay-image1.png";
import forkplayImg2 from "@/assets/images/forkplay-image2.png";
import forkplayImg3 from "@/assets/images/forkplay-image3.png";
import dashboardImg from "@/assets/images/dashboardImage.png";
import evershelfDashboard from "@/assets/images/everyshelf.png";
import bogoballersLogin from "@/assets/images/team_creator_or_player_login_screen.png";
import clinicsLogo from "@/assets/images/clinics.png";
import gunitLogo from "@/assets/images/gunit.png";

const imageMap: Record<string, any> = {
  "/assets/images/forkplay-image1.png": forkplayImg1,
  "/assets/images/forkplay-image2.png": forkplayImg2,
  "/assets/images/forkplay-image3.png": forkplayImg3,
  "/assets/images/clinics.png": clinicsLogo,
  "/assets/images/gunit.png": gunitLogo,
  "/assets/images/everyshelf.png": evershelfDashboard,
  "/assets/images/dashboardImage.png": dashboardImg,
  "/assets/images/team_creator_or_player_login_screen.png": bogoballersLogin,
};

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  SiFlutter,
  SiPython,
  SiReact,
  SiPostgresql,
  SiExpo,
  SiNextdotjs,
  SiSupabase,
  SiHono,
  SiTailwindcss,
  SiShadcnui,
  SiDart,
  SiTypescript,
  SiCloudflare,
  Smartphone,
  CreditCard,
};

function ExternalLink({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!href) return <>{children}</>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export default function FeatureProjectSection() {
  const { projects } = portfolioData.projectSectionData;

  const data = projects.map((project) => {
    // Support both images array and legacy single image field
    const projectImages: string[] = Array.isArray(
      (project as { images?: string[] }).images
    )
      ? (project as { images?: string[] }).images!
      : (project as { image?: string }).image
      ? [(project as { image?: string }).image!]
      : [];

    const renderImages = () => {
      if (!projectImages || projectImages.length === 0) return null;

      // Responsive compact grid classes based on image count
      const gridClass =
        projectImages.length === 1
          ? "grid grid-cols-1 w-full max-w-xs sm:max-w-sm md:max-w-md"
          : projectImages.length === 2
          ? "grid grid-cols-2 gap-3 w-full max-w-sm sm:max-w-md md:max-w-lg"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-lg sm:max-w-xl md:max-w-2xl";

      return (
        <div className={`${gridClass} mt-3`}>
          {projectImages.map((imgSrc, imgIndex) => {
            const resolvedSrc = imageMap[imgSrc] || imgSrc;
            const altText =
              project.imageAlt || `${project.title} image ${imgIndex + 1}`;

            const imageContent = (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border/60 bg-neutral-900 shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-md">
                <Image
                  src={resolvedSrc}
                  alt={altText}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 320px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-500" />
              </div>
            );

            return project.link ? (
              <ExternalLink
                key={imgIndex}
                href={project.link}
                className="block group"
              >
                {imageContent}
              </ExternalLink>
            ) : (
              <div key={imgIndex} className="group block">
                {imageContent}
              </div>
            );
          })}
        </div>
      );
    };

    return {
      title: project.title,
      link: project.link,
      content: (
        <div className="group relative bg-card/60 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 space-y-4 overflow-hidden">
          {/* Subtle top-right glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

          {/* Header row inside card */}
          <div className="flex items-center justify-between gap-3 flex-wrap relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              {project.role && (
                <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {project.role}
                </span>
              )}
              {project.company && (
                <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded-full border border-border/40">
                  {project.company}
                </span>
              )}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors ml-auto group/link"
                aria-label={`View ${project.title}`}
              >
                <span>View Project</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            )}
          </div>

          {/* Tech stack badges */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 relative z-10">
              {project.techStack.map((tech) => {
                const IconComponent = iconMap[tech.icon];
                return (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="flex gap-1.5 items-center border-border/60 bg-background/60 text-[10px] sm:text-[11px] font-medium py-0.5 px-2.5"
                  >
                    {IconComponent && (
                      <IconComponent
                        style={tech.color ? { color: tech.color } : undefined}
                        className="size-3"
                      />
                    )}
                    {tech.name}
                  </Badge>
                );
              })}
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed relative z-10">
            {project.description}
          </p>

          {/* Images */}
          {renderImages()}
        </div>
      ),
    };
  });

  return <Timeline data={data} />;
}
