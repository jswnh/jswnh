"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  link?: string;
}

function TimelineTitle({
  title,
  link,
  className,
}: {
  title: string;
  link?: string;
  className: string;
}) {
  if (!link) {
    return <h3 className={className}>{title}</h3>;
  }

  return (
    <h3 className={className}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 hover:text-primary transition-colors group"
      >
        {title}
        <ArrowUpRight className="size-4 shrink-0 opacity-70 group-hover:opacity-100" />
      </a>
    </h3>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(ref.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, height - 60)]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const headerOpacity = useTransform(
    headerScrollProgress,
    [0, 0.2, 0.8, 1],
    [0.2, 1, 1, 0.2]
  );
  const headerY = useTransform(
    headerScrollProgress,
    [0, 0.2, 0.8, 1],
    [20, 0, 0, -20]
  );

  return (
    <div className="font-sans md:px-8" ref={containerRef}>
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity, y: headerY }}
        className="max-w-6xl mx-auto pt-10 md:pt-14 pb-4 px-4 md:px-8 will-change-transform"
      >
        <h2
          id="projects-heading"
          className="text-2xl sm:text-3xl md:text-4xl mb-3 max-w-3xl font-bold uppercase tracking-tight"
        >
          Projects & Skills in Action
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          A list of my technical projects where back-end skills, mobile skills,
          and web development skills come together. Each project reflects the
          skills I&apos;ve built — from server architecture and API design to
          full-stack delivery across clinic systems, POS apps, and league
          platforms.
        </p>
      </motion.div>
      <div ref={ref} className="relative max-w-6xl mx-auto pb-8">
        {data.map((item, index) => (
          <TimelineRow key={index} item={item} />
        ))}
        <div
          style={{
            height: Math.max(0, height - 60) + "px",
          }}
          className="absolute md:left-8 left-8 top-4 overflow-hidden w-[2px] -translate-x-[1px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-linear-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

function TimelineRow({ item }: { item: TimelineEntry }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.15, 1, 1, 0.15]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [25, 0, 0, -25]
  );

  return (
    <div
      ref={rowRef}
      className="flex justify-start pt-6 md:pt-12 md:gap-10"
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-xs">
          <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
        </div>
        <TimelineTitle
          title={item.title}
          link={item.link}
          className="hidden md:block text-sm md:pl-20 md:text-xl font-bold"
        />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative pl-20 pr-4 md:pl-4 w-full will-change-transform"
      >
        <TimelineTitle
          title={item.title}
          link={item.link}
          className="md:hidden block text-lg sm:text-xl mb-3 text-left font-bold"
        />
        {item.content}{" "}
      </motion.div>
    </div>
  );
}
