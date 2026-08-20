"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal } from "@/components/ui/terminal";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  // Allow visitor to press Escape to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleComplete = () => {
    // Give visitors enough time to read the terminal output
    setTimeout(() => {
      setIsVisible(false);
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, delay: 0.15, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md text-foreground px-4"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              y: -140,
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
            }}
            className="w-full max-w-xl flex flex-col items-center gap-4"
          >
            <Terminal
              username="visitor@josuan.cv"
              commands={["echo 'Hi, Welcome to my portfolio! 👋'"]}
              outputs={{
                0: [
                  "👋 Hi there! Great to have you here.",
                  "✨ Enjoy exploring my projects & skills.",
                ],
              }}
              typingSpeed={30}
              delayBetweenCommands={300}
              initialDelay={200}
              onComplete={handleComplete}
              className="w-full"
            />

            <button
              onClick={() => setIsVisible(false)}
              className="mt-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-widest cursor-pointer"
            >
              Skip (Esc)
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TerminalDemo() {
  return (
    <section className="w-full py-10 md:py-20">
      <Terminal
        commands={[
          "npx shadcn@latest init",
          "npm install motion",
          "npx shadcn@latest add button card",
          "Term Deez Nuts",
        ]}
        outputs={{
          0: [
            "✔ Preflight checks passed.",
            "✔ Created components.json",
            "✔ Initialized project.",
          ],
          1: ["added 1 package in 2s"],
          2: ["✔ Done. Installed button, card."],
        }}
        typingSpeed={45}
        delayBetweenCommands={1000}
      />
    </section>
  );
}
