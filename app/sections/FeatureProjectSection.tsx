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
    const isMobile =
      project.id === "gunit" || project.id === "bogoballers-mobile";
    const aspectClass =
      project.id === "gunit" ? "aspect-square" : "aspect-[9/16]";
    const containerClass =
      project.id === "bogoballers-web"
        ? "relative h-44 md:h-80 w-full rounded-lg overflow-hidden border border-primary/10 shadow-2xl"
        : "relative h-44 md:h-64 w-full max-w-md rounded-lg overflow-hidden border border-primary/10 shadow-2xl";

    const imageSrc = project.image ? imageMap[project.image] : null;

    // Helper to render image wrapper
    const renderImage = () => {
      if (!imageSrc) return null;

      if (isMobile) {
        const mobileImageContent = (
          <div
            className={`relative ${aspectClass} w-32 md:w-42 rounded-lg bg-zinc-900 border border-primary/10 overflow-hidden shadow-xl transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-primary/5 ${
              project.link ? "cursor-pointer" : ""
            }`}
          >
            <Image
              src={imageSrc}
              alt={project.imageAlt || project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        );

        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {project.link ? (
              <ExternalLink href={project.link} className="block group">
                {mobileImageContent}
              </ExternalLink>
            ) : (
              <div className="group block">{mobileImageContent}</div>
            )}
          </div>
        );
      } else {
        const desktopImageContent = (
          <div
            className={`${containerClass} ${project.link ? "cursor-pointer" : ""}`}
          >
            <Image
              src={imageSrc}
              alt={project.imageAlt || project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          </div>
        );

        return (
          <div className="grid grid-cols-1 gap-4 mt-6">
            {project.link ? (
              <ExternalLink href={project.link} className="block group">
                {desktopImageContent}
              </ExternalLink>
            ) : (
              <div className="group block">{desktopImageContent}</div>
            )}
          </div>
        );
      }
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
          {renderImage()}
        </div>
      ),
    };
  });

  return <Timeline data={data} />;
}
