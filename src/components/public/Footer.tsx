"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    kategori: [
      { name: "Software & Development", href: "/categories/software" },
      { name: "UI/UX Design", href: "/categories/ui-ux" },
      { name: "Data & AI", href: "/categories/data-ai" },
      { name: "Business & Marketing", href: "/categories/business" },
      { name: "Research & KTI", href: "/categories/research" },
    ],
    tentang: [
      { name: "Tentang Kami", href: "/about" },
      { name: "Cara Kerja", href: "/how-it-works" },
      { name: "FAQ / Bantuan", href: "/faq" },
      { name: "Blog", href: "/blog" },
      { name: "Press Room", href: "/press" },
    ],
    penggunaan: [
      { name: "Syarat & Ketentuan", href: "/terms" },
      { name: "Kebijakan Privasi", href: "/privacy" },
      { name: "Cara Memulai", href: "/start" },
      { name: "Cara Kerja Freelancer", href: "/freelancer-guide" },
      { name: "Cara Kerja Client", href: "/client-guide" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer role="contentinfo" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 xl:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
              <Image
                src="/logo-white-mode.svg"
                alt="Coollabs Logo"
                width={120}
                height={50}
                className="h-10 w-auto dark:hidden"
                priority
              />
              <Image
                src="/logo-dark-mode.svg"
                alt="Coollabs Logo"
                width={120}
                height={50}
                className="h-10 w-auto hidden dark:block"
                priority
              />
            <div className="py-2"></div>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Platform kolaborasi untuk mahasiswa dan profesional. Temukan project, bangun tim, dan kembangkan{" "}
              <span className="text-primary font-semibold">portfolio</span> bersama komunitas kreatif!
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:hello@coollabs.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@coollabs.id
              </a>
              <a 
                href="tel:+6281234567890" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +6285975360990
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Yogyakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kategori</h4>
            <nav aria-label="Footer Categories">
              <ul className="space-y-2">
                {footerLinks.kategori.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Tentang Coollabs</h4>
            <nav aria-label="Footer About">
              <ul className="space-y-2">
                {footerLinks.tentang.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Cara Penggunaan */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Cara Penggunaan</h4>
            <nav aria-label="Footer Guides">
              <ul className="space-y-2">
                {footerLinks.penggunaan.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Coollabs. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
