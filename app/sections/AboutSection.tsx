"use client";

import React, { useRef, useId } from "react";
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Sparkles,
  Heart,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { DottedMap } from "@/components/ui/dotted-map";
import type { Marker } from "@/components/ui/dotted-map";
import portfolioData from "@/data/portfolio-data.json";

type MyMarker = Marker & {
  overlay: {
    countryCode: string;
    label: string;
  };
};

export default function AboutSection() {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Bidirectional parallax & scroll fade
  const yMapRaw = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const yTextRaw = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0],
  );

  const yMap = useSpring(yMapRaw, { stiffness: 100, damping: 25 });
  const yText = useSpring(yTextRaw, { stiffness: 100, damping: 25 });

  const { heading, subtitle, location, lat, lng, bio, subBio, highlights } =
    portfolioData.aboutSectionData;

  const markers: MyMarker[] = [
    {
      lat,
      lng,
      size: 2.8,
      pulse: true,
      overlay: { countryCode: "ph", label: "Philippines" },
    },
  ];

  const iconLookup: Record<string, React.ReactNode> = {
    MapPin: <MapPin className="size-3.5 text-primary" />,
    GraduationCap: <GraduationCap className="size-3.5 text-amber-500" />,
    Briefcase: <Briefcase className="size-3.5 text-blue-500" />,
    Sparkles: <Sparkles className="size-3.5 text-purple-500" />,
  };

  return (
    <div
      ref={containerRef}
      className="max-w-6xl mx-auto py-10 md:py-14 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
        {/* Left Side: Unboxed Dotted Map with Pulse Marker in Philippines & FlagCDN Overlay */}
        <motion.div
          style={{ y: yMap, opacity }}
          className="relative w-full md:w-1/2 flex items-center justify-center overflow-hidden h-[260px] sm:h-[320px] md:h-[380px] will-change-transform"
          aria-label="Interactive world map showing developer location in the Philippines"
        >
          <DottedMap<MyMarker>
            width={150}
            height={80}
            mapSamples={4000}
            dotRadius={0.32}
            dotColor="#60A5FA"
            markerColor="#60A5FA"
            pulse={true}
            className="w-full h-auto max-w-md sm:max-w-lg opacity-85 dark:opacity-75"
            markers={markers}
            renderMarkerOverlay={({ marker, x, y, r, index }) => {
              const { countryCode, label } = marker.overlay;
              const href = `https://flagcdn.com/w80/${countryCode}.webp`;

              const clipId = `${id}-flag-clip-${index}`.replace(/:/g, "-");
              const imgR = r * 0.75;

              const fontSize = r * 0.9;
              const pillH = r * 1.5;
              const pillW = label.length * (fontSize * 0.62) + r * 1.4;
              const pillX = x + r + r * 0.6;
              const pillY = y - pillH / 2;

              return (
                <g style={{ pointerEvents: "none" }}>
                  <clipPath id={clipId}>
                    <circle cx={x} cy={y} r={imgR} />
                  </clipPath>

                  <image
                    href={href}
                    x={x - imgR}
                    y={y - imgR}
                    width={imgR * 2}
                    height={imgR * 2}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#${clipId})`}
                  />

                  <rect
                    x={pillX}
                    y={pillY}
                    width={pillW}
                    height={pillH}
                    rx={pillH / 2}
                    fill="rgba(0,0,0,0.65)"
                    stroke="rgba(96,165,250,0.5)"
                    strokeWidth={0.3}
                  />
                  <text
                    x={pillX + r * 0.7}
                    y={y + fontSize * 0.35}
                    fontSize={fontSize}
                    fill="white"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {label}
                  </text>
                </g>
              );
            }}
          />
        </motion.div>

        {/* Right Side: About Me Story & Highlights */}
        <motion.div
          style={{ y: yText, opacity }}
          className="w-full md:w-1/2 space-y-5 text-left will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide">
            <Heart className="size-3 text-primary" />
            {subtitle}
          </div>

          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground leading-tight"
          >
            {heading.title}{" "}
            <span className="text-primary">{heading.highlight}</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {bio}
          </p>

          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
            {subBio}
          </p>

          {/* Highlight Badges: Origin & Experience on top row, Education spanning full width below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {highlights.map((item, idx) => {
              const isEducation = item.label.toLowerCase() === "education";
              return (
                <div
                  key={item.label}
                  className={`relative overflow-hidden p-2.5 px-3 rounded-xl bg-card/50 border border-border/60 flex items-center gap-2.5 shadow-2xs hover:border-primary/30 transition-colors ${
                    isEducation ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-primary/10 shrink-0 relative z-10">
                    {iconLookup[item.icon] || (
                      <Sparkles className="size-3.5 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 relative z-10">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug break-words">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-1">
            <div className="h-1 w-10 bg-primary rounded-full" />
            <div className="h-1 w-3 bg-muted rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
