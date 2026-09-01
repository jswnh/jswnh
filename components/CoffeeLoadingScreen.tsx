"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CoffeeCup } from "@/components/ui/coffee-cup";

export default function CoffeeLoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fast load duration: ~1.2s total so the site loads promptly
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Allow visitor to skip immediately by pressing Esc, Enter, Space, or clicking anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        setIsVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background select-none overflow-hidden cursor-pointer"
          aria-hidden="true"
          onClick={() => setIsVisible(false)}
        >
          {/* Ambient glow behind the coffee cup matching theme */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          {/* Centered Coffee Cup: present immediately without any entrance delay */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: -10,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <CoffeeCup
              size="xl"
              className="text-primary dark:text-primary scale-125 sm:scale-150"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
