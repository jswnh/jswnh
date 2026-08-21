"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false;

  const toggleTheme = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={cn(
        "flex size-full items-center justify-center text-foreground transition-colors focus:outline-hidden",
        className
      )}
    >
      {isDark ? (
        <IconSun className="size-5 shrink-0" stroke={2} />
      ) : (
        <IconMoon className="size-5 shrink-0" stroke={2} />
      )}
    </button>
  );
}
