"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { NavbarThemeToggle } from "@/components/ui/navbar-theme-toggle";
import { motion } from "motion/react";

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Discover", link: "#discover" },
    { name: "Community", link: "#community" },
    { name: "Submit", link: "#submit" },
  ];

  return (
    <Navbar className="fixed top-0">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-3">
          <NavbarThemeToggle />
          <motion.a
            href="#get-started"
            className="relative z-20 px-5 py-2 text-sm font-medium text-white bg-primary rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-3">
            <NavbarThemeToggle />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="w-full text-left text-base font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              {item.name}
            </a>
          ))}
          <motion.a
            href="#get-started"
            onClick={() => setIsOpen(false)}
            className="w-full text-center px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
