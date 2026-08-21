"use client";

import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  IconSmartHome,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { Dock, DockIcon } from "./ui/dock";

const DATA = {
  navbar: [{ href: "#hero", icon: IconSmartHome, label: "Home" }],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jswnh",
        icon: IconBrandGithub,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/hulomjosuan/",
        icon: IconBrandLinkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://twitter.com/jswnh",
        icon: IconBrandX,
        navbar: true,
      },
    },
  },
};

export default function DockNavigation() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.history.replaceState(null, "", "#hero");
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex items-center justify-center">
      <Tooltip.Provider delayDuration={150}>
        <Dock className="pointer-events-auto relative h-14 p-2 flex items-center gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5 rounded-full mx-auto">
          {DATA.navbar.map((item) => (
            <Tooltip.Root key={item.label}>
              <Tooltip.Trigger asChild>
                <a
                  href={item.href}
                  onClick={handleScrollToTop}
                  aria-label="Scroll to top"
                  className="flex items-center justify-center"
                >
                  <DockIcon className="rounded-full cursor-pointer bg-background text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                    <item.icon className="size-5 shrink-0" stroke={2} />
                  </DockIcon>
                </a>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  sideOffset={8}
                  className="z-50 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                >
                  <p>{item.label}</p>
                  <Tooltip.Arrow
                    className="fill-primary"
                    width={10}
                    height={5}
                  />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ))}

          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border rounded-full"
          />

          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social], index) => {
              const isExternal = social.url.startsWith("http");
              const IconComponent = social.icon;
              return (
                <Tooltip.Root key={`social-${name}-${index}`}>
                  <Tooltip.Trigger asChild>
                    <a
                      href={social.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={name}
                      className="flex items-center justify-center"
                    >
                      <DockIcon className="rounded-full cursor-pointer bg-background text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                        <IconComponent className="size-5 shrink-0" stroke={2} />
                      </DockIcon>
                    </a>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      sideOffset={8}
                      className="z-50 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                    >
                      <p>{name}</p>
                      <Tooltip.Arrow
                        className="fill-primary"
                        width={10}
                        height={5}
                      />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              );
            })}

          <Separator
            orientation="vertical"
            className="h-2/3 m-auto w-px bg-border rounded-full"
          />

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="flex items-center justify-center">
                <DockIcon className="rounded-full cursor-pointer bg-background text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                  <ModeToggle />
                </DockIcon>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={8}
                className="z-50 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
              >
                <p>Theme</p>
                <Tooltip.Arrow className="fill-primary" width={10} height={5} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Dock>
      </Tooltip.Provider>
    </div>
  );
}
