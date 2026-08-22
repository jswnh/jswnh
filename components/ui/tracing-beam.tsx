"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(contentRef.current);

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-6xl px-4 sm:px-6 md:px-8", className)}
    >
      <div className="absolute top-3 -right-2 sm:-right-6 md:-right-10 lg:-right-14 flex flex-col items-center z-30 pointer-events-none w-6">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(110, 86, 207, 0.35) 0px 3px 8px",
          }}
          className="border-border/60 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full border shadow-xs bg-background/80 backdrop-blur-md shrink-0"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "#6e56cf" : "#60A5FA",
              borderColor: scrollYProgress.get() > 0 ? "#a855f7" : "#3b82f6",
            }}
            className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-primary/30 bg-primary"
          />
        </motion.div>
        <svg
          viewBox={`0 0 24 ${svgHeight}`}
          width="24"
          height={svgHeight}
          className="block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 12 0 V -36 l -8 24 V ${svgHeight * 0.8} l 8 24 V ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            className="text-neutral-300/40 dark:text-neutral-700/40"
            strokeOpacity="0.4"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`M 12 0 V -36 l -8 24 V ${svgHeight * 0.8} l 8 24 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#60A5FA" stopOpacity="0" />
              <stop stopColor="#60A5FA" />
              <stop offset="0.325" stopColor="#6e56cf" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
