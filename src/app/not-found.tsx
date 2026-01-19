"use client";

import Link from "next/link";
import { Hammer, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      {/* Icon Wrapper */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 ring-8 ring-primary/5 animate-pulse">
        <Hammer className="h-10 w-10 text-primary" />
      </div>

      {/* Heading */}
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
        Ups! Halaman Belum Siap
      </h1>

      {/* Description */}
      <p className="mb-8 max-w-[500px] text-lg text-muted-foreground leading-relaxed">
        Halaman yang kamu cari sedang dalam proses pengembangan oleh tim kami. Cek lagi nanti ya!
      </p>

      {/* Action Button */}
      <Link
        href="/"
        className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-primary/25 transition-all duration-300 hover:gap-3"
      >
        <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Kembali ke Beranda
      </Link>
      
      {/* 404 Visual Text */}
      <div className="absolute bottom-8 text-[120px] font-black text-foreground/5 opacity-20 pointer-events-none select-none blur-sm">
        404
      </div>
    </div>
  );
}
