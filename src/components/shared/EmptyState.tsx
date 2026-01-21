"use client";

import { Search, Filter, Inbox } from "lucide-react";

interface EmptyStateProps {
  type?: "search" | "filter" | "no-data";
  searchQuery?: string;
  onReset?: () => void;
}

export default function EmptyState({ 
  type = "no-data", 
  searchQuery,
  onReset 
}: EmptyStateProps) {
  
  const getContent = () => {
    switch (type) {
      case "search":
        return {
          icon: <Search className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/40" />,
          title: "Tidak ada hasil pencarian",
          description: searchQuery 
            ? `Tidak ditemukan project untuk "${searchQuery}"`
            : "Coba gunakan kata kunci yang berbeda",
          showReset: true,
        };
      
      case "filter":
        return {
          icon: <Filter className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/40" />,
          title: "Tidak ada project yang sesuai",
          description: "Coba ubah atau reset filter untuk melihat lebih banyak project",
          showReset: true,
        };
      
      case "no-data":
      default:
        return {
          icon: <Inbox className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/40" />,
          title: "Belum ada project",
          description: "Saat ini belum ada project yang tersedia",
          showReset: false,
        };
    }
  };

  const content = getContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4">
      {/* Icon with subtle animation */}
      <div className="mb-4 sm:mb-6 animate-in fade-in-50 duration-500">
        <div className="relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
          <div className="relative">
            {content.icon}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 animate-in fade-in-50 duration-500 delay-100">
        {content.title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md mb-6 animate-in fade-in-50 duration-500 delay-200">
        {content.description}
      </p>

      {/* Reset Button */}
      {content.showReset && onReset && (
        <button
          onClick={onReset}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 text-sm sm:text-base font-medium shadow-sm hover:shadow-md animate-in fade-in-50 duration-500 delay-300"
        >
          Reset Filter
        </button>
      )}

      {/* Decorative elements */}
      <div className="mt-8 flex gap-2 opacity-30">
        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "150ms" }} />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
