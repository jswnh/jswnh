import { IconCloud } from "@/components/ui/icon-cloud";
import { useMemo } from "react";
import portfolioData from "@/data/portfolio-data.json";

export default function SkillSection() {
  const {
    heading,
    description,
    subDescription,
    highlightedSkills,
    iconCloudSlugs,
  } = portfolioData.skillSectionData;

  const images = useMemo(
    () =>
      iconCloudSlugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
      ),
    [iconCloudSlugs],
  );

  return (
    <div className="max-w-6xl mx-auto py-16 px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
        <div className="w-full md:w-1/2 space-y-5 text-left">
          <h2
            id="skills-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground leading-tight"
          >
            {heading.title}{" "}
            <span className="text-muted-foreground/60">
              {heading.highlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
            {description}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed max-w-md">
            {subDescription}
          </p>

          <ul
            className="flex flex-wrap gap-2 pt-1"
            aria-label="Highlighted technical skills"
          >
            {highlightedSkills.map((skill) => (
              <li
                key={skill}
                className="text-xs font-medium px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-1">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <div className="h-1 w-3 bg-muted rounded-full" />
          </div>
        </div>

        <div
          className="relative w-full md:w-1/2 flex items-center justify-center overflow-hidden h-[260px] sm:h-[320px] md:h-[400px]"
          aria-label="Visual cloud of programming skills and technologies"
        >
          <IconCloud images={images} />
        </div>
      </div>
    </div>
  );
}
