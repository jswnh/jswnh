"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

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
  <div className="group border-t border-white/10 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white/[0.02] transition-all px-4">
    <div className="flex items-start gap-8 md:gap-12 flex-1">
      <span className="text-xl md:text-2xl text-primary font-bold tabular-nums">
        {number}
      </span>
      <div className="space-y-2">
        <h3 className="text-2xl md:text-4xl font-bold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-neutral-500 text-sm md:text-base max-w-xl">
          {description}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Badge key={tag} variant={"outline"}>
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-neutral-500 tabular-nums text-sm md:text-base">
          {year}
        </span>
        {link && (
          <a
            href={link || "#"}
            target="_blank"
            className="p-2 rounded-full border border-white/20 group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all"
          >
            <ArrowUpRight className="size-4 md:size-5" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function AchievementSection() {
  const achievements = [
    {
      number: "01",
      title: "ISITE National Python Contest",
      description:
        "Selected as the official school representative to compete against student developers in a national-level technical tournament — validating Python programming skills and algorithmic problem-solving skills under high-pressure conditions.",
      tags: ["National Representative", "Python Skills", "Algorithms"],
      year: "2025",
    },
    {
      number: "02",
      title: "Foundational C# Certification",
      description:
        "Foundational certification awarded by Microsoft Developer — strengthening C# programming skills, .NET skills, and object-oriented development skills.",
      tags: ["Microsoft", "C# Skills", "Foundational"],
      year: "2024",
      link: "https://www.freecodecamp.org/certification/josuanhulom/foundational-c-sharp-with-microsoft",
    },
  ];

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          id="achievements-heading"
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-none mb-4"
        >
          Achieve
          <span className="text-muted-foreground/60">ments</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-12 leading-relaxed">
          Milestones that sharpened my technical skills — from competitive
          programming to certified development skills recognized by industry
          leaders.
        </p>
        <div className="flex flex-col border-b border-white/10">
          {achievements.map((item) => (
            <AchievementItem key={item.number} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
