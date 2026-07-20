"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import portfolioData from "@/data/portfolio-data.json";

export default function ContactSection() {
  const { heading, description, formAction, contactInfo, socialLinks, footer } =
    portfolioData.contactSectionData;

  return (
    <div className="py-12 md:py-24 px-5 sm:px-10 md:px-16 lg:px-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col space-y-8 order-2 lg:order-1">
            <div className="space-y-4 text-center lg:text-left">
              <h2
                id="contact-heading"
                className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tighter text-foreground"
              >
                {heading.title} <br />
                <span className="text-primary">{heading.highlight}</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0">
                {description}
              </p>
            </div>

            <form
              action={formAction}
              method="POST"
              className="space-y-4 w-full max-w-md mx-auto lg:mx-0"
            >
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                />
                <Textarea
                  name="message"
                  placeholder="How can I help you?"
                  required
                  className="min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full font-bold transition-all active:scale-95 hover:opacity-90"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className="flex flex-col space-y-10 lg:pl-12 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-6">
                  Get in Touch
                </p>
                <div className="flex flex-col space-y-6 items-center lg:items-start">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 text-lg sm:text-xl md:text-2xl font-medium text-foreground hover:text-primary transition-colors group break-all justify-center lg:justify-start"
                  >
                    <div className="p-3 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                      <Mail className="size-5 md:size-6 text-primary" />
                    </div>
                    {contactInfo.email}
                  </a>

                  <div className="flex items-center gap-4 text-lg sm:text-xl md:text-2xl font-medium text-foreground/80 justify-center lg:justify-start">
                    <div className="p-3 rounded-full bg-secondary">
                      <Phone className="size-5 md:size-6 text-primary" />
                    </div>
                    {contactInfo.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-4">
                Follow Me
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-4 rounded-full border border-border bg-card hover:border-primary/50 hover:bg-accent transition-all group"
                    title={social.title}
                    aria-label={social.ariaLabel || social.title}
                  >
                    {social.name === "LinkedIn" ? (
                      <SiLinkedin className="size-6 text-foreground group-hover:text-primary transition-colors" />
                    ) : (
                      <Mail className="size-6 text-foreground group-hover:text-primary transition-colors" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 mb-24 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-[10px] sm:text-xs text-center md:text-left">
          <p className="text-foreground/60 font-medium">
            © {new Date().getFullYear()} {footer.copyrightText}
          </p>
          <p className="italic opacity-80 font-light">
            {footer.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

