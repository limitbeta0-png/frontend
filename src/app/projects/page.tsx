"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import ProjectCard from "@/components/shared/ProjectCard";
import CategorySection from "@/components/public/CategorySection";
import { openProjects } from "@/data/projects";
import { Filter, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";

// Reusable Custom Dropdown Component
interface FilterDropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string; // Added className prop
}

function FilterDropdown({ label, value, options, onChange, icon, className = "" }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 px-4 py-2 bg-background border rounded-lg text-sm font-medium transition-all duration-200 min-w-[160px] justify-between ${
          isOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {icon}
          <span className={`${value === "all" || value === "newest" ? "text-muted-foreground" : "text-foreground"}`}>
             {selectedOption?.label || label}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group ${
                  value === option.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {option.label}
                {value === option.value && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  // Filter States
  const [selectedType, setSelectedType] = useState<"all" | "paid" | "free" | "competition">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "deadline" | "budget">("newest");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Get unique categories for filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = new Set(openProjects.map((p) => p.category));
    return ["all", ...Array.from(categories)];
  }, []);

  // Use this to trigger reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, selectedCategory, sortBy]);

  // Advanced Filtering Logic
  const filteredProjects = useMemo(() => {
    return openProjects
      .filter((project) => {
        // 1. Type Filter
        let matchesType = true;
        if (selectedType !== "all") {
          if (selectedType === "competition") matchesType = project.category === "Competition";
          else matchesType = project.type === selectedType;
        }

        // 2. Category Filter
        const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;

        return matchesType && matchesCategory;
      })
      .sort((a, b) => {
        // 3. Sorting
        if (sortBy === "deadline") {
          // Simplistic deadline sort (assuming format "X hari lagi") - In real app use Dates
          const daysA = parseInt(a.deadline) || 999;
          const daysB = parseInt(b.deadline) || 999;
          return daysA - daysB;
        }
        if (sortBy === "budget") {
          // Sort Paid first, then by budget string roughly
          if (a.type !== "paid") return 1;
          if (b.type !== "paid") return -1;
          return 0; // Better budget parsing needed for accurate sort
        }
        // Default: Newest (using ID as proxy for now)
        return b.id - a.id;
      });
  }, [selectedType, selectedCategory, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 xl:px-10 py-8">

        {/* Filter Bar - Responsive Grid */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            
            <div className="w-full md:w-auto flex items-center gap-2 mb-2 md:mb-0">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-3 w-full md:w-auto items-center">
              {/* Custom Filter Dropdowns */}
              <FilterDropdown 
                label="Tipe Project"
                value={selectedType}
                onChange={(val) => setSelectedType(val as any)}
                options={[
                  { label: "Semua Tipe", value: "all" },
                  { label: "Paid Projects", value: "paid" },
                  { label: "Free Collaboration", value: "free" },
                  { label: "Competition", value: "competition" },
                ]}
                className="w-full md:w-auto"
              />

              <FilterDropdown 
                label="Kategori"
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                options={[
                  { label: "Semua Kategori", value: "all" },
                  ...uniqueCategories
                    .filter(c => c !== "all")
                    .map(c => ({ label: c, value: c }))
                ]}
                className="w-full md:w-auto"
              />
            </div>

            <div className="flex-1 hidden md:block"></div>

            <div className="w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border mt-1 md:mt-0">
               <FilterDropdown 
                label="Urutkan"
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                icon={<SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />}
                options={[
                  { label: "Terbaru", value: "newest" },
                  { label: "Deadline Terdekat", value: "deadline" },
                  { label: "Budget Tertinggi", value: "budget" },
                ]}
                className="w-full md:w-auto"
              />
            </div>

          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-card/50">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-foreground mb-2">Project tidak ditemukan</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
              Coba ubah filter pencarianmu untuk menemukan project lain.
            </p>
            <button 
              onClick={() => {
                setSelectedType("all");
                setSelectedCategory("all");
              }}
              className="text-primary hover:underline text-sm font-medium"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
