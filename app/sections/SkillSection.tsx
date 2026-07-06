import { IconCloud } from "@/components/ui/icon-cloud";
import React, { useMemo } from "react";
import { siteConfig } from "@/lib/seo";

const SLUGS = [
  "typescript",
  "javascript",
  "dart",
  "react",
  "flutter",
  "nodedotjs",
  "express",
  "nextdotjs",
  "python",
  "fastapi",
  "dotnet",
  "postgresql",
  "mongodb",
  "firebase",
  "vercel",
  "docker",
  "github",
  "visualstudiocode",
  "figma",
];

export default function SkillSection() {
  const images = useMemo(
    () => SLUGS.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`),
    []
  );

  return (
    <div
      className="max-w-7xl mx-auto py-12 px-6 md:px-16 lg:px-24"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 space-y-6 text-left">
          <h2
            id="skills-heading"
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-none"
          >
            Technical <br />
            <span className="text-muted-foreground/60">Skills</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
            These are the development skills I use every day — back-end skills,
            server architecture skills, mobile skills, and web skills applied
            across real projects. From React.js and Next.js front-end skills to
            Python and PostgreSQL back-end skills, this skills stack covers the
            full software development lifecycle.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
            My skills include{" "}
            {siteConfig.skills.slice(0, 6).join(", ")}, and more. I keep
            sharpening these skills through professional work and personal
            builds.
          </p>

          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Highlighted technical skills">
            {siteConfig.skills.slice(0, 8).map((skill) => (
              <li
                key={skill}
                className="text-xs font-medium px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-2">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <div className="h-1 w-4 bg-muted rounded-full" />
          </div>
        </div>

        <div
          className="relative w-full md:w-1/2 flex items-center justify-center overflow-hidden h-[300px] md:h-[500px]"
          aria-label="Visual cloud of programming skills and technologies"
        >
          <IconCloud images={images} />
        </div>
      </div>
    </div>
  );
}
