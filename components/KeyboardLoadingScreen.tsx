"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard } from "@/components/ui/keyboard";

export default function KeyboardLoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = useCallback(() => {
    if (isStarting) return;
    setIsStarting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 450);
  }, [isStarting]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "KeyS" ||
        e.key.toLowerCase() === "s" ||
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "Escape"
      ) {
        handleStart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStart]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl text-foreground px-4 select-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              y: -120,
              opacity: 0,
              scale: 0.94,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
            }}
            className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-4xl"
          >
            {/* Non-clickable instruction above keyboard */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="pointer-events-none select-none inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-medium shadow-xs"
            >
              <kbd className="inline-flex items-center justify-center size-5 rounded bg-white text-neutral-800 font-mono font-bold text-xs shadow-xs ring-1 ring-neutral-300 animate-pulse">
                S
              </kbd>
              <span>
                {isStarting ? "Starting..." : "Press S on the keyboard to Start"}
              </span>
            </motion.div>

            {/* Keyboard Component with literal S key start trigger */}
            <div className="w-full flex justify-center py-1 max-w-full overflow-visible">
              <Keyboard
                enableSound={true}
                showPreview={true}
                onKeyAction={(keyCode) => {
                  if (keyCode === "KeyS") {
                    handleStart();
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
