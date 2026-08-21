"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import portfolioData from "@/data/portfolio-data.json";

interface CertificationProps {
  number: string;
  title: string;
  issuer?: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
  credentialId?: string;
}

const CertificationItem = ({
  number,
  title,
  issuer,
  description,
  tags,
  year,
  link,
}: CertificationProps) => (
  <div className="group border-t border-border/40 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:bg-muted/30 transition-all px-3 sm:px-4 rounded-xl">
    <div className="flex items-start gap-5 md:gap-8 flex-1">
      <span className="text-base sm:text-lg text-primary font-bold tabular-nums">
        {number}
      </span>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="text-base sm:text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </h3>
          {issuer && (
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium border border-border/40">
              {issuer}
            </span>
          )}
        </div>
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
        <span className="text-muted-foreground tabular-nums text-xs sm:text-sm whitespace-nowrap">
          {year}
        </span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            aria-label={`View ${title} credential`}
          >
            <ArrowUpRight className="size-3.5 sm:size-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function CertificationSection() {
  const { heading, description, certifications } =
    portfolioData.certificationSectionData;

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <h2
          id="certifications-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground leading-tight mb-3"
        >
          {heading.title}{" "}
          <span className="text-muted-foreground/60">{heading.highlight}</span>
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col border-b border-border/40">
          {certifications.map((item) => (
            <CertificationItem key={item.number} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
