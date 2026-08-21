"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import portfolioData from "@/data/portfolio-data.json";

export default function ContactSection() {
  const { heading, description, formAction, contactInfo, socialLinks, footer } =
    portfolioData.contactSectionData;
  const { location } = portfolioData.personalInfo;

  return (
    <div className="py-10 md:py-14 px-5 sm:px-8 lg:px-12 bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Centered Section Header */}
        <div className="text-center space-y-3 mb-8 max-w-xl mx-auto">
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground"
          >
            {heading.title}{" "}
            <span className="text-primary">{heading.highlight}</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Centered 2-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Form Column */}
          <div className="w-full bg-card/50 border border-border/50 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <form
              action={formAction}
              method="POST"
              className="space-y-4 w-full"
            >
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="bg-background/80"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="bg-background/80"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="How can I help you?"
                    required
                    className="min-h-[120px] bg-background/80"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full font-semibold transition-all active:scale-95 hover:opacity-90 cursor-pointer rounded-xl"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Details Column */}
          <div className="w-full flex flex-col justify-between space-y-6 bg-card/50 border border-border/50 rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-3.5">
                  Get in Touch
                </p>
                <div className="space-y-2.5">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/60 hover:border-primary/40 hover:bg-accent transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase">
                        Email
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/60">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Phone className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase">
                        Phone
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </div>

                  {location && (
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/60">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <MapPin className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase">
                          Location
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-3">
                  Follow Me
                </p>
                <div className="flex gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={
                        social.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        social.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="p-3 rounded-xl border border-border/40 bg-background/60 hover:border-primary/50 hover:bg-accent transition-all group"
                      title={social.title}
                      aria-label={social.ariaLabel || social.title}
                    >
                      {social.name === "LinkedIn" ? (
                        <FaLinkedin className="size-4 text-foreground group-hover:text-primary transition-colors" />
                      ) : (
                        <Mail className="size-4 text-foreground group-hover:text-primary transition-colors" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 mb-20 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-muted-foreground text-[10px] sm:text-xs text-center">
          <p className="text-foreground/60 font-medium">
            © {new Date().getFullYear()} {footer.copyrightText}
          </p>
          <p className="italic opacity-80 font-light">{footer.tagline}</p>
        </div>
      </div>
    </div>
  );
}
