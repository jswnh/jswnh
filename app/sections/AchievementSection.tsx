"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";

interface AchievementProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

const AchievementItem = ({
  number,
  title,
  description,
  tags,
  year,
  link,
}: AchievementProps) => (
  <div className="group border-t border-border/40 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:bg-muted/30 transition-all px-3 sm:px-4 rounded-xl">
    <div className="flex items-start gap-5 md:gap-8 flex-1">
      <span className="text-base sm:text-lg text-primary font-bold tabular-nums">
        {number}
      </span>
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end">
      <div className="flex gap-1.5 flex-wrap">
        {tags.map((tag) => (
          <Badge key={tag} variant={"outline"} className="text-[10px] sm:text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground tabular-nums text-xs sm:text-sm">
          {year}
        </span>
        {link && (
          <a
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            aria-label={`View ${title}`}
          >
            <ArrowUpRight className="size-3.5 sm:size-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function AchievementSection() {
  const { heading, description, achievements } = portfolioData.achievementSectionData;

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <h2
          id="achievements-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground leading-tight mb-3"
        >
          {heading.title}{" "}
          <span className="text-muted-foreground/60">{heading.highlight}</span>
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col border-b border-border/40">
          {achievements.map((item) => (
            <AchievementItem key={item.number} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

