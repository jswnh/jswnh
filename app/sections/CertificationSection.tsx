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
  credlyBadgeId?: string;
  embedIframe?: string;
  iframe?: string;
  pdf?: string;
}

function getEmbedUrl(item: {
  embedIframe?: string;
  iframe?: string;
  credlyBadgeId?: string;
}): { url: string; isCredlyBadge: boolean } | null {
  if (item.credlyBadgeId) {
    return {
      url: `https://www.credly.com/embedded_badge/${item.credlyBadgeId}`,
      isCredlyBadge: true,
    };
  }

  const raw = item.embedIframe || item.iframe;
  if (!raw) return null;
  const trimmed = raw.trim();

  // If it's a Credly badge UUID directly
  if (/^[a-f0-9-]{36}$/i.test(trimmed)) {
    return {
      url: `https://www.credly.com/embedded_badge/${trimmed}`,
      isCredlyBadge: true,
    };
  }

  // If user pasted Credly script / div snippet: extract data-share-badge-id
  const badgeIdMatch = trimmed.match(
    /data-share-badge-id=["']([a-f0-9-]+)["']/i,
  );
  if (badgeIdMatch && badgeIdMatch[1]) {
    return {
      url: `https://www.credly.com/embedded_badge/${badgeIdMatch[1]}`,
      isCredlyBadge: true,
    };
  }

  // If it's a Credly badge URL (public or embed)
  const credlyUrlMatch = trimmed.match(
    /credly\.com\/(?:badges|embedded_badge)\/([a-f0-9-]+)/i,
  );
  if (credlyUrlMatch && credlyUrlMatch[1]) {
    return {
      url: `https://www.credly.com/embedded_badge/${credlyUrlMatch[1]}`,
      isCredlyBadge: true,
    };
  }

  // If user pasted an iframe tag: extract src="..."
  const iframeSrcMatch = trimmed.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeSrcMatch && iframeSrcMatch[1]) {
    const src = iframeSrcMatch[1];
    return {
      url: src,
      isCredlyBadge: src.includes("credly.com/embedded_badge/"),
    };
  }

  // If it's a plain URL (e.g. https://www.credly.com/embedded_badge/... or any https://...)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return {
      url: trimmed,
      isCredlyBadge: trimmed.includes("credly.com/embedded_badge/"),
    };
  }

  return null;
}

const formatPdfPath = (path?: string): string => {
  if (!path) return "";
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const normalized = trimmed.replace(/\\/g, "/").replace(/\/+/g, "/");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
};

const parseDateToTimestamp = (dateStr?: string): number => {
  if (!dateStr) return 0;
  const str = dateStr.toLowerCase().trim();
  const yearMatch = str.match(/\b(20\d\d)\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : 2000;

  let month = 0;
  if (str.includes("jan")) month = 0;
  else if (str.includes("feb")) month = 1;
  else if (str.includes("mar")) month = 2;
  else if (str.includes("apr")) month = 3;
  else if (str.includes("may") || str.includes("graduation")) month = 4;
  else if (str.includes("jun")) month = 5;
  else if (str.includes("jul")) month = 6;
  else if (str.includes("aug")) month = 7;
  else if (str.includes("sep")) month = 8;
  else if (str.includes("oct")) month = 9;
  else if (str.includes("nov")) month = 10;
  else if (str.includes("dec")) month = 11;

  return new Date(year, month, 1).getTime();
};

const CertificationItem = ({
  number,
  title,
  issuer,
  description,
  tags,
  year,
  link,
  embedIframe,
  iframe,
  credlyBadgeId,
  pdf,
}: CertificationProps) => {
  const embed = getEmbedUrl({ embedIframe, iframe, credlyBadgeId });

  return (
    <div className="group border-t border-border/40 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:bg-muted/30 transition-all px-3 sm:px-4 rounded-xl">
      <div className="flex items-start gap-5 md:gap-8 flex-1">
        <span className="text-base sm:text-lg text-primary font-bold tabular-nums">
          {number}
        </span>
        <div className="space-y-1.5 flex-1">
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
          {embed ? (
            <div className="w-[140px] h-[140px] aspect-square mt-2 rounded-xl overflow-hidden border border-border/60 bg-card/60 flex items-center justify-center shrink-0">
              <iframe
                src={embed.url}
                title={`${title} credential embed`}
                className="w-full h-full aspect-square border-0 rounded-xl"
                loading="lazy"
                scrolling="no"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
              {description}
            </p>
          )}
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
        {(() => {
          const pdfUrl = formatPdfPath(pdf);
          if (!pdfUrl) return null;
          return (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-primary hover:text-primary/80 border border-primary/20 px-2.5 py-1 rounded-full bg-primary/10 transition-colors"
            >
              PDF
            </a>
          );
        })()}
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
};

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
          {[...certifications]
            .sort((a, b) => {
              const diff =
                parseDateToTimestamp(b.year) - parseDateToTimestamp(a.year);
              if (diff !== 0) return diff;
              return a.number.localeCompare(b.number);
            })
            .map((item) => (
              <CertificationItem key={item.number} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
}
