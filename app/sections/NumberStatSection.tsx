"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import portfolioData from "@/data/portfolio-data.json";
import { BorderBeam } from "@/components/ui/border-beam";

export default function NumberStatSection() {
  const { stats } = portfolioData.numberStatSectionData;
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into scroll position with target & offset like other sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Bidirectional parallax, subtle scale, and scroll fade matching other portfolio sections
  const yRaw = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.3, 1, 1, 0.3],
  );
  const scaleRaw = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.96, 1, 1, 0.96],
  );

  const y = useSpring(yRaw, { stiffness: 100, damping: 25 });
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 25 });

  return (
    <section
      ref={containerRef}
      id="by-the-numbers"
      aria-label="Key statistics"
      className="relative w-full py-4 sm:py-6 md:py-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        {/* 4-Column Framed Grid with scroll-linked spring parallax & fade */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative grid grid-cols-4 rounded-xl sm:rounded-2xl overflow-hidden border border-border/60 bg-card/60 dark:bg-card/40 backdrop-blur-md divide-x divide-border/60 shadow-xs hover:shadow-md hover:shadow-primary/5 transition-shadow duration-300"
        >
          {stats.map((item, index) => (
            <div
              key={item.id || index}
              className="px-1.5 py-2 sm:p-3 md:py-4 md:px-5 flex flex-col justify-center min-w-0 overflow-hidden transition-colors duration-200 hover:bg-primary/[0.03]"
            >
              {/* Numeric Stat */}
              <div className="font-sans text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-primary leading-none select-none truncate">
                {item.value}
              </div>

              {/* Short Uppercase Label */}
              <h3 className="text-[7px] sm:text-[9.5px] md:text-xs font-bold uppercase tracking-tight sm:tracking-normal md:tracking-wider text-foreground mt-1 sm:mt-1.5 md:mt-2 leading-tight break-words">
                {item.label}
              </h3>
            </div>
          ))}

          {/* Animated Border Beam around the 4-column statistics card */}
          <BorderBeam
            size={160}
            duration={8}
            colorFrom="#60A5FA"
            colorTo="#A855F7"
            borderWidth={1.5}
          />
        </motion.div>
      </div>
    </section>
  );
}
