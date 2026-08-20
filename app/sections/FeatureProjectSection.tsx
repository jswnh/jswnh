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
} from "react-icons/si";
import { Timeline } from "@/components/ui/timeline";
import { Smartphone } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";

// Import local images statically for Next.js image optimization
import dashboardImg from "@/assets/images/dashboardImage.png";
import evershelfDashboard from "@/assets/images/everyshelf.png";
import bogoballersLogin from "@/assets/images/team_creator_or_player_login_screen.png";
import clinicsLogo from "@/assets/images/clinics.png";
import gunitLogo from "@/assets/images/gunit.png";

const imageMap: Record<string, any> = {
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
  Smartphone,
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
        <div className={`${gridClass} mt-4`}>
          {projectImages.map((imgSrc, imgIndex) => {
            const resolvedSrc = imageMap[imgSrc] || imgSrc;
            const altText =
              project.imageAlt || `${project.title} image ${imgIndex + 1}`;

            const imageContent = (
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900 shadow-md transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg">
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
        <div className="space-y-6">
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => {
                const IconComponent = iconMap[tech.icon];
                return (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="flex gap-1 items-center border-primary/20 bg-primary/5"
                  >
                    {IconComponent && (
                      <IconComponent
                        style={tech.color ? { color: tech.color } : undefined}
                        className="size-3.5"
                      />
                    )}
                    {tech.name}
                  </Badge>
                );
              })}
            </div>
          )}
          <p className="text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            {project.description}
          </p>
          {renderImages()}
        </div>
      ),
    };
  });

  return <Timeline data={data} />;
}
