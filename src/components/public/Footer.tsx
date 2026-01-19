"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    kategori: [
      { name: "Software & Development", href: "#" },
      { name: "UI/UX Design", href: "#" },
      { name: "Data & AI", href: "#" },
      { name: "Business & Marketing", href: "#" },
      { name: "Research & KTI", href: "#" },
    ],
    tentang: [
      { name: "Tentang Kami", href: "#" },
      { name: "Cara Kerja", href: "#" },
      { name: "FAQ / Bantuan", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press Room", href: "#" },
    ],
    penggunaan: [
      { name: "Syarat & Ketentuan", href: "#" },
      { name: "Kebijakan Privasi", href: "#" },
      { name: "Cara Memulai", href: "#" },
      { name: "Cara Kerja Freelancer", href: "#" },
      { name: "Cara Kerja Client", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 xl:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent mb-4">
              Coollabs
            </h3>
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
            <ul className="space-y-2">
              {footerLinks.kategori.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Tentang Coollabs</h4>
            <ul className="space-y-2">
              {footerLinks.tentang.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cara Penggunaan */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Cara Penggunaan</h4>
            <ul className="space-y-2">
              {footerLinks.penggunaan.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
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
