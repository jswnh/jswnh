import { IconCloud } from "@/components/ui/icon-cloud";
import React, { useMemo } from "react";
import portfolioData from "@/data/portfolio-data.json";

export default function SkillSection() {
  const { heading, description, subDescription, highlightedSkills, iconCloudSlugs } =
    portfolioData.skillSectionData;

  const images = useMemo(
    () => iconCloudSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`),
    [iconCloudSlugs]
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
            {heading.title} <br />
            <span className="text-muted-foreground/60">{heading.highlight}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
            {description}
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
            {subDescription}
          </p>

          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Highlighted technical skills">
            {highlightedSkills.map((skill) => (
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

