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
  <div className="group border-t border-white/10 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white/[0.02] transition-all px-4">
    <div className="flex items-start gap-8 md:gap-12 flex-1">
      <span className="text-xl md:text-2xl text-primary font-bold tabular-nums">
        {number}
      </span>
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-2xl md:text-4xl font-bold group-hover:text-primary transition-colors">
            {title}
          </h3>
          {issuer && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
              {issuer}
            </span>
          )}
        </div>
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
        <span className="text-neutral-500 tabular-nums text-sm md:text-base whitespace-nowrap">
          {year}
        </span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/20 group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all"
            aria-label={`View ${title} credential`}
          >
            <ArrowUpRight className="size-4 md:size-5" />
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
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          id="certifications-heading"
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-none mb-4"
        >
          {heading.title}
          <span className="text-muted-foreground/60">{heading.highlight}</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-12 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col border-b border-white/10">
          {certifications.map((item) => (
            <CertificationItem key={item.number} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
