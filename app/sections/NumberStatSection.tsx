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
      <div className="max-w-3xl mx-auto px-3 sm:px-4">
        {/* 3-Column Framed Grid with scroll-linked spring parallax & fade */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative grid grid-cols-3 rounded-xl sm:rounded-2xl overflow-hidden border border-border/60 bg-card/60 dark:bg-card/40 backdrop-blur-md divide-x divide-border/60 shadow-xs hover:shadow-md hover:shadow-primary/5 transition-shadow duration-300"
        >
          {stats.map((item, index) => (
            <div
              key={item.id || index}
              className="p-3 sm:p-4 md:py-4 md:px-6 flex flex-col justify-center transition-colors duration-200 hover:bg-primary/[0.03]"
            >
              {/* Numeric Stat */}
              <div className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-primary leading-none select-none">
                {item.value}
              </div>

              {/* Short Uppercase Label */}
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-foreground mt-1.5 sm:mt-2.5 leading-snug">
                {item.label}
              </h3>
            </div>
          ))}

          {/* Animated Border Beam around the statistics card */}
          <BorderBeam
            size={140}
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
