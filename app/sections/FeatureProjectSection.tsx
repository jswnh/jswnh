"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  SiPython,
  SiPostgresql,
  SiReact,
  SiExpo,
  SiFlutter,
  SiShadcnui,
  SiTailwindcss,
  SiDart,
  SiNextdotjs,
  SiSupabase,
  SiHono,
} from "react-icons/si";
import { Timeline } from "@/components/ui/timeline";
import { Smartphone } from "lucide-react";
import dashboardImg from "@/assets/images/dashboardImage.png";
import evershelfDashboard from "@/assets/images/staging_everyshelf_dashboard.png";
import bogoballersLogin from "@/assets/images/team_creator_or_player_login_screen.png";
import clinicsLogo from "@/assets/images/clinics.png";
import gunitLogo from "@/assets/images/gunit.png";
import Link from "next/link";
export default function FeatureProjectSection() {
  const data = [
    {
      title: "QrWise Clinic \u2014 Full-Stack Developer",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiFlutter className="text-[#02569B]" /> Flutter
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiPython className="text-[#3776AB]" /> Python
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiReact className="text-[#61DAFB]" /> React.js
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiPostgresql className="text-[#336791]" /> PostgreSQL
            </Badge>
          </div>
          <p className="text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            Currently employed at <strong>QrWise Clinic</strong>, applying
            full-stack skills to build an inventory POS and booking system with
            integrated marketing tools. Using back-end architecture skills,
            mobile development skills, and web skills to streamline clinic
            operations and patient scheduling.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative h-44 md:h-64 w-full max-w-md rounded-lg overflow-hidden border border-primary/10 shadow-2xl">
              <Image
                src={clinicsLogo}
                alt="QrWise Clinic — inventory POS and booking system built with full-stack developer skills"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Gunit \u2014 Personal Project",
      link: "https://github.com/jswnh/gunit",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiExpo className="text-[#000020]" /> Expo
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              React Native
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <Smartphone className="size-3" /> Offline-First
            </Badge>
          </div>
          <p className="text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            A personal project showcasing mobile development skills — a
            minimalist offline inventory POS app built to support local
            businesses. Built with Expo and React Native for reliable day-to-day
            sales tracking without depending on a constant internet connection.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square w-32 md:w-42 rounded-lg overflow-hidden border border-primary/10 shadow-xl transition-all duration-300 hover:border-primary/30 hover:shadow-primary/5">
              <Image
                src={gunitLogo}
                alt="Gunit — offline inventory POS mobile app built with Expo and React Native"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Everyshelf \u2014 Backend Developer",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiNextdotjs className="text-[#3776AB]" /> Next.js
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiSupabase className="text-[#336791]" /> Supabase
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiHono className="text-[#336791]" /> Hono
            </Badge>
          </div>
          <p className="text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            Contributed to the development of <strong>Everyshelf</strong>, an
            inventory management system & stock transfer management, during my
            internship. Architected scalable backend services using Hono and
            Supabase.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="https://staging--everyshelf-web.netlify.app"
                target="_blank"
                className="block group"
              >
                <div className="relative h-44 md:h-80 w-full rounded-lg overflow-hidden border border-primary/10 shadow-2xl cursor-pointer">
                  <Image
                    src={evershelfDashboard}
                    alt="Everyshelf Web Dashboard"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Optional: Add a subtle overlay on hover to signal it's clickable */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "BogoBallers \u2014 Backend",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiPython className="text-[#3776AB]" /> Python (Quart)
            </Badge>
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiPostgresql className="text-[#336791]" /> SQLAlchemy
            </Badge>
          </div>
          <p className="text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            Built the backend for a league management system as part of an
            academic project. Implemented basic
            <strong> role-based access control (RBAC)</strong> to manage user
            permissions and improve data organization and security.
          </p>
        </div>
      ),
    },
    {
      title: "BogoBallers \u2014 Web Dashboard",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiReact className="text-[#61DAFB]" /> React.js
            </Badge>
            <Badge
              variant="outline"
              className="text-xs border-primary/20 bg-primary/5"
            >
              <SiTailwindcss /> Tailwind CSS
            </Badge>
            <Badge
              variant="outline"
              className="text-xs border-primary/20 bg-primary/5"
            >
              <SiShadcnui /> Shadcnui
            </Badge>
          </div>
          <p className="text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            Developed a web-based dashboard for managing league data. Focused on
            building reusable UI components and implementing features such as
            match scheduling.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="relative h-44 md:h-80 w-full rounded-lg overflow-hidden border border-primary/10 shadow-2xl">
                <Image
                  src={dashboardImg}
                  alt="BogoBallers Web Dashboard Preview"
                  fill
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "BogoBallers \u2014 Mobile App",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="flex gap-1 items-center border-primary/20 bg-primary/5"
            >
              <SiFlutter className="text-[#02569B]" /> Flutter
            </Badge>
            <Badge
              variant="outline"
              className="text-xs border-primary/20 bg-primary/5"
            >
              <SiDart className="text-[#02569B]" />
              Dart
            </Badge>
          </div>
          <p className="text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed">
            Created a mobile application prototype focused on displaying league
            and match information. Practiced integrating backend APIs and
            building responsive layouts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Container defines the size and aspect ratio */}
            <div className="relative aspect-[9/16] w-32 md:w-42 rounded-lg bg-zinc-900 border border-primary/10 overflow-hidden shadow-xl transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-primary/5 cursor-pointer">
              <Image
                src={bogoballersLogin} // 1. Replace with your actual mobile screenshot variable
                alt="BogoBallers Mobile App Interface"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              {/* Optional: Slight overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={data} />;
}
