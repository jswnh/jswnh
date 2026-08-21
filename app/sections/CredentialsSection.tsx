"use client";

import React, { useState, useRef } from "react";
import {
  Trophy,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
  Medal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import portfolioData from "@/data/portfolio-data.json";

type CredentialType = "all" | "awards" | "certifications";

interface CredentialItem {
  id: string;
  type: "award" | "certification";
  number: string;
  title: string;
  issuer?: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
  credentialId?: string;
}

export default function CredentialsSection() {
  const [activeTab, setActiveTab] = useState<CredentialType>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yHeaderRaw = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const yCardsRaw = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const yHeader = useSpring(yHeaderRaw, { stiffness: 100, damping: 25 });
  const yCards = useSpring(yCardsRaw, { stiffness: 100, damping: 25 });

  const { achievements } = portfolioData.achievementSectionData;
  const { certifications } = portfolioData.certificationSectionData;

  const allItems: CredentialItem[] = [
    ...achievements.map((item) => ({
      ...item,
      id: `award-${item.number}`,
      type: "award" as const,
      issuer: "Graduation Honor / Competition",
    })),
    ...certifications.map((item) => ({
      ...item,
      id: `cert-${item.number}`,
      type: "certification" as const,
    })),
  ];

  const filteredItems = allItems.filter((item) => {
    if (activeTab === "awards") return item.type === "award";
    if (activeTab === "certifications") return item.type === "certification";
    return true;
  });

  const getIcon = (item: CredentialItem) => {
    if (item.type === "award") {
      if (item.title.toLowerCase().includes("troubleshooting")) {
        return <Medal className="size-4 text-amber-500" />;
      }
      if (item.title.toLowerCase().includes("contest") || item.title.toLowerCase().includes("python")) {
        return <Trophy className="size-4 text-amber-500" />;
      }
      return <GraduationCap className="size-4 text-amber-500" />;
    }

    if (item.issuer?.toLowerCase().includes("hackerrank")) {
      return <ShieldCheck className="size-4 text-emerald-500" />;
    }
    if (item.issuer?.toLowerCase().includes("microsoft")) {
      return <Award className="size-4 text-blue-500" />;
    }
    return <CheckCircle2 className="size-4 text-purple-500" />;
  };

  const getIconBg = (item: CredentialItem) => {
    if (item.type === "award") {
      return "bg-amber-500/10 border-amber-500/20";
    }
    if (item.issuer?.toLowerCase().includes("hackerrank")) {
      return "bg-emerald-500/10 border-emerald-500/20";
    }
    if (item.issuer?.toLowerCase().includes("microsoft")) {
      return "bg-blue-500/10 border-blue-500/20";
    }
    return "bg-purple-500/10 border-purple-500/20";
  };

  return (
    <div
      ref={containerRef}
      className="py-10 md:py-14 px-5 sm:px-8 lg:px-12 bg-background transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ y: yHeader, opacity }}
          className="text-center space-y-3 mb-6 max-w-xl mx-auto will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="size-3.5" />
            Verified Credentials & Honors
          </div>
          <h2
            id="credentials-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground"
          >
            Achievements & <span className="text-primary">Certifications</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            Graduation awards, competitive programming honors, and verified
            certifications from Microsoft, HackerRank, and freeCodeCamp.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          style={{ y: yHeader, opacity }}
          className="flex justify-center mb-8 will-change-transform"
        >
          <div className="inline-flex p-1.5 rounded-full bg-card border border-border shadow-xs gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "all" && (
                <motion.div
                  layoutId="activeCredentialsTab"
                  className="absolute inset-0 bg-primary rounded-full shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">All ({allItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("awards")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "awards"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "awards" && (
                <motion.div
                  layoutId="activeCredentialsTab"
                  className="absolute inset-0 bg-primary rounded-full shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Trophy className="size-3" />
                Awards ({achievements.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab("certifications")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "certifications"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "certifications" && (
                <motion.div
                  layoutId="activeCredentialsTab"
                  className="absolute inset-0 bg-primary rounded-full shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <ShieldCheck className="size-3" />
                Certifications ({certifications.length})
              </span>
            </button>
          </div>
        </motion.div>

        {/* Credentials Grid */}
        <motion.div
          layout
          style={{ y: yCards, opacity }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 will-change-transform"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-card/60 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                <div className="space-y-3 relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${getIconBg(
                          item
                        )}`}
                      >
                        {getIcon(item)}
                      </div>
                      <span className="text-[11px] font-semibold text-muted-foreground truncate">
                        {item.issuer || (item.type === "award" ? "Award" : "Certification")}
                      </span>
                    </div>

                    <span className="text-[10px] font-medium text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full shrink-0 tabular-nums border border-border/40">
                      {item.year}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] px-2 py-0.5 border-border/50 bg-background/60 font-normal truncate"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-[9px] text-muted-foreground self-center">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 group/link"
                      aria-label={`Verify ${item.title}`}
                    >
                      <span>Verify</span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider shrink-0">
                      Honored
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
