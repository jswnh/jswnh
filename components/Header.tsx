"use client";

import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { ScrollProgress } from "./ui/scroll-progress";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <div className="w-full border-b border-border/20 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto flex h-14 items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24">
          <a
            href="#hero"
            className="text-lg font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors"
            aria-label="Josuan — Full-Stack Developer home"
          >
            Josuan
          </a>

          <nav aria-label="Primary" className="flex items-center gap-6">
            <a
              href="#skills"
              className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
            <AnimatedThemeToggler duration={600} />
          </nav>
        </div>
      </div>
      <ScrollProgress className="relative w-full" />
    </header>
  );
}
