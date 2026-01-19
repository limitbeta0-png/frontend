"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconCalendar,
  IconTrophy,
  IconUsers,
  IconDeviceMobile,
  IconWorld,
  IconPalette,
  IconDeviceGamepad,
  IconBrandGithub,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Main navigation links
  const mainLinks = [
    {
      label: "Today",
      href: "/",
      icon: (
        <IconCalendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Hackathons",
      href: "#hackathons",
      icon: (
        <IconTrophy className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Community",
      href: "#community",
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  // Category links
  const categoryLinks = [
    {
      label: "Apps Mobile",
      href: "#apps-mobile",
      icon: (
        <IconDeviceMobile className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Website",
      href: "#website",
      icon: (
        <IconWorld className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "UI/UX Design",
      href: "#ui-ux-design",
      icon: (
        <IconPalette className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Game",
      href: "#game",
      icon: (
        <IconDeviceGamepad className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-background w-full flex-1 mx-auto border border-border/40 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            {open ? <Logo /> : <LogoIcon />}
            
            {/* Main Navigation */}
            <div className="mt-8 flex flex-col gap-2">
              {mainLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>

            {/* Categories Section */}
            <div className="mt-8">
              {/* Categories Header */}
              <motion.div
                animate={{
                  display: open ? "block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="px-2 mb-2"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Categories
                </p>
              </motion.div>
              
              {/* Category Links */}
              <div className="flex flex-col gap-2">
                {categoryLinks.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Link */}
          <div>
            <SidebarLink
              link={{
                label: "GitHub",
                href: "https://github.com",
                icon: (
                  <IconBrandGithub className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-auto">
        <div className="flex flex-col w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-foreground whitespace-pre"
      >
        Creative Hub
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};
