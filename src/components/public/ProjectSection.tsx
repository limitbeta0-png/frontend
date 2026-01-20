"use client";

import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { openProjects } from "@/data/projects";
import { projectDetailsData } from "@/data/projectDetails";
import ProjectCardCompact from "@/components/shared/ProjectCardCompact";
import ProjectCardDetail from "@/components/shared/ProjectCardDetail";
import ProjectFilterBar from "@/components/shared/ProjectFilterBar";
import Link from "next/link";

export default function OpenProjectSection() {
  // Filter States
  const [activeTab, setActiveTab] = useState<"all" | "paid" | "free" | "competition">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedMajor, setSelectedMajor] = useState("all");
  const [selectedLocationType, setSelectedLocationType] = useState("all");
  const [selectedRequirement, setSelectedRequirement] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "deadline" | "budget">("newest");

  const [selectedCity, setSelectedCity] = useState("all");

  // Get unique categories for filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = new Set(openProjects.map((p) => p.category));
    return ["all", ...Array.from(categories)];
  }, []);

  // Get unique universities (Owner Location as uni)
  const uniqueUniversities = useMemo(() => {
    const universities = new Set(
      openProjects
        .filter(p => p.university)
        .map(p => p.university!)
    );
    return ["all", ...Array.from(universities)];
  }, []);

  // Get unique cities from project.city field
  const uniqueCities = useMemo(() => {
    const cities = new Set(openProjects.map((p) => p.city));
    return ["all", ...Array.from(cities)];
  }, []);

  // Get unique majors
  const uniqueMajors = useMemo(() => {
    const majors = new Set(openProjects.flatMap(p => p.major));
    return ["all", ...Array.from(majors)];
  }, []);

  // Filter projects based on all criteria
  const filteredProjects = useMemo(() => {
    return openProjects
      .filter((project) => {
        // 1. Tab/Type Filter
        if (activeTab === "paid" && project.type !== "paid") return false;
        if (activeTab === "free" && project.type !== "free") return false;
        if (activeTab === "competition" && (project.category !== "Competition" && !project.tags.includes("Competition"))) return false;

        // 2. Category Filter
        if (selectedCategory !== "all" && project.category !== selectedCategory) return false;

        // 3. University Filter (using project.university)
        if (selectedUniversity !== "all" && project.university !== selectedUniversity) return false;

        // 4. City Filter (using project.city)
        if (selectedCity !== "all" && project.city !== selectedCity) return false;

        // 5. Major Filter (using project.major array)
        if (selectedMajor !== "all" && !project.major.includes(selectedMajor)) return false;

        // 6. Work Type Filter (using project.workType)
        if (selectedLocationType !== "all") {
          const mode = selectedLocationType.toLowerCase();
          if (project.workType !== mode) return false;
        }

        // 7. Requirement Level Filter (using project.requirementLevel)
        if (selectedRequirement !== "all") {
          if (selectedRequirement === "all_levels" && project.requirementLevel !== "open-for-all") return false;
          if (selectedRequirement === "campus" && project.requirementLevel !== "campus-only") return false;
          if (selectedRequirement === "pro" && project.requirementLevel !== "professional") return false;
        }

        // 8. Search Query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = project.title.toLowerCase().includes(query);
          const matchesOwner = project.owner.name.toLowerCase().includes(query);
          const matchesTags = project.tags.some(tag => tag.toLowerCase().includes(query));
          const matchesCity = project.city.toLowerCase().includes(query);
          const matchesMajor = project.major.some(m => m.toLowerCase().includes(query));
          if (!matchesTitle && !matchesOwner && !matchesTags && !matchesCity && !matchesMajor) return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // ... (sorting remains same)
        if (sortBy === "deadline") {
           const daysA = parseInt(a.deadline) || 999;
           const daysB = parseInt(b.deadline) || 999;
           return daysA - daysB;
        }
        if (sortBy === "budget") {
          if (a.type !== "paid" && b.type === "paid") return 1;
          if (a.type === "paid" && b.type !== "paid") return -1;
          return 0; 
        }
        return b.id - a.id;
      });
  }, [activeTab, searchQuery, selectedCategory, selectedUniversity, selectedMajor, selectedLocationType, selectedRequirement, sortBy, selectedCity]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, selectedCategory, selectedUniversity, selectedMajor, selectedLocationType, selectedRequirement, sortBy, selectedCity]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // Ensure we have a valid selection even after filtering
  const selectedProject = filteredProjects.find(p => p.id === selectedProjectId) || displayedProjects[0];
  
  // Get detailed project data if available
  const selectedProjectDetail = selectedProject ? projectDetailsData[selectedProject.slug] : null;

  // Stats
  const totalProjects = filteredProjects.length;
  const totalCompanies = new Set(filteredProjects.map(p => p.owner.name)).size;
  const totalRoles = filteredProjects.reduce((sum, p) => sum + p.totalSlots, 0);

  return (
    <section className="bg-background py-4">
      {/* ... Filter Bar and Stats ... */}
      <div className="container mx-auto px-4 xl:px-10">
        
        {/* Filter Bar */}
        <ProjectFilterBar
          tabs={[
            { label: "Semua", value: "all" },
            { label: "Paid", value: "paid" },
            { label: "Free", value: "free" },
            { label: "Competition", value: "competition" },
          ]}
          selectedTab={activeTab}
          onTabChange={(value) => setActiveTab(value as any)}
          
          searchPlaceholder="Cari posisi atau lokasi..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}

          topRightFilter={{
            label: "Lokasi",
            value: selectedCity,
            onChange: setSelectedCity,
            options: uniqueCities.map(c => ({ label: c === "all" ? "Semua Lokasi" : c, value: c })),
          }}
          
          filters={[
             {
               label: "Kategori",
               value: selectedCategory,
               onChange: setSelectedCategory,
               options: [
                 { label: "Semua Kategori", value: "all" },
                 ...uniqueCategories
                   .filter(c => c !== "all")
                   .map(c => ({ label: c, value: c }))
               ],
               colSpan: 1,
             },
             {
               label: "Universitas",
               value: selectedUniversity,
               onChange: setSelectedUniversity,
               options: [
                 { label: "Semua Universitas", value: "all" },
                 ...uniqueUniversities
                   .filter(u => u !== "all")
                   .map(u => ({ label: u, value: u }))
               ],
               colSpan: 1,
             },
             {
               label: "Jurusan",
               value: selectedMajor,
               onChange: setSelectedMajor,
               options: [
                 { label: "Semua Jurusan", value: "all" },
                 ...uniqueMajors
                   .filter(m => m !== "all")
                   .map(m => ({ label: m, value: m }))
               ],
               colSpan: 1,
             },
            {
              label: "Tipe Kerja", // Renamed from Lokasi/Metode to avoid conflict with top right Lokasi
              value: selectedLocationType,
              onChange: setSelectedLocationType,
              options: [
                { label: "Semua Tipe", value: "all" },
                { label: "Offline", value: "offline" },
                { label: "Full Online", value: "online" },
                { label: "Hybrid", value: "hybrid" },
              ],
              colSpan: 1,
            },
            {
              label: "Requirement Level",
              value: selectedRequirement,
              onChange: setSelectedRequirement,
              options: [
                { label: "Requirements Level", value: "all" },
                { label: "Open for All", value: "all_levels" },
                { label: "Campus Only", value: "campus" },
                { label: "Professional", value: "pro" },
              ],
              colSpan: 1,
            },
            {
              label: "Urutkan",
              value: sortBy,
              onChange: (val) => setSortBy(val as any),
              options: [
                { label: "Paling Baru", value: "newest" },
                { label: "Budget Tertinggi", value: "budget" },
                { label: "Deadline Terdekat", value: "deadline" },
              ],
              icon: <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />,
              colSpan: 1,
            },
          ]}
          showSearchButton={true}
        />

        {/* Stats Summary */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div>
            <span className="font-semibold text-foreground">Total Project: </span>
            <span className="text-primary font-bold">{totalProjects}</span>
          </div>
          <div>
            <span className="font-semibold text-foreground">Total Initiator: </span>
            <span className="text-primary font-bold">{totalCompanies}</span>
          </div>
          <div>
            <span className="font-semibold text-foreground">Total Roles: </span>
            <span className="text-primary font-bold">{totalRoles}</span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Project List (Using ProjectCardCompact) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="space-y-4 flex-grow">
              {displayedProjects.map((project) => (
                <ProjectCardCompact
                  key={project.id}
                  project={project}
                  isSelected={selectedProjectId === project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                />
              ))}
              
              {/* Empty State within list if needed */}
              {displayedProjects.length === 0 && (
                <div className="text-center py-10 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">Tidak ada project</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t border-border">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Project Detail (Using ProjectCardDetail) */}
          <div className="lg:col-span-7">
            <ProjectCardDetail
              project={selectedProject}
              projectDetail={selectedProjectDetail}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
