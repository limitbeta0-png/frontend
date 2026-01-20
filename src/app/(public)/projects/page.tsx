"use client";

import { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/shared/ProjectCard";
import CategorySection from "@/components/public/CategorySection";
import ProjectFilterBar from "@/components/shared/ProjectFilterBar";
import { openProjects } from "@/data/projects";
import { Filter, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

export default function ProjectsPage() {
  // Filter States
  const [selectedType, setSelectedType] = useState<"all" | "paid" | "free" | "competition">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedMajor, setSelectedMajor] = useState("all");
  const [selectedLocationType, setSelectedLocationType] = useState("all");
  const [selectedRequirement, setSelectedRequirement] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "deadline" | "budget">("newest");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Get unique categories for filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = new Set(openProjects.map((p) => p.category));
    return ["all", ...Array.from(categories)];
  }, []);

  // Get unique universities/locations
  const uniqueUniversities = useMemo(() => {
    const locations = new Set(openProjects.map((p) => p.owner.location));
    return ["all", ...Array.from(locations)];
  }, []);

  // Use this to trigger reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, selectedCategory, selectedUniversity, selectedMajor, selectedLocationType, selectedRequirement, sortBy, searchQuery]);

  // Advanced Filtering Logic
  const filteredProjects = useMemo(() => {
    return openProjects
      .filter((project) => {
        // 1. Type Filter (Paid, Free, Competition)
        let matchesType = true;
        if (selectedType !== "all") {
          if (selectedType === "competition") matchesType = project.category === "Competition" || project.tags.includes("Competition");
          else matchesType = project.type === selectedType;
        }

        // 2. Category Filter
        const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;

        // 3. University Filter (Location)
        const matchesUniversity = selectedUniversity === "all" || project.owner.location === selectedUniversity;

        // 4. Major Filter (Placeholder logic as data doesn't have major explicit)
        const matchesMajor = selectedMajor === "all"; // Implement real logic if data available

        // 5. Location Type Filter (Placeholder)
        const matchesLocationType = selectedLocationType === "all"; // Implement real logic if data available

        // 6. Requirement Level Filter (Placeholder)
        const matchesRequirement = selectedRequirement === "all"; // Implement real logic if data available

        // 7. Search Query
        const matchesSearch = searchQuery === "" || 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.owner.location.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesType && matchesCategory && matchesUniversity && matchesMajor && matchesLocationType && matchesRequirement && matchesSearch;
      })
      .sort((a, b) => {
        // Sorting
        if (sortBy === "deadline") {
          const daysA = parseInt(a.deadline) || 999;
          const daysB = parseInt(b.deadline) || 999;
          return daysA - daysB;
        }
        if (sortBy === "budget") {
          // Sort Paid first
          if (a.type !== "paid" && b.type === "paid") return 1;
          if (a.type === "paid" && b.type !== "paid") return -1;
          return 0; 
        }
        // Default: Newest
        return b.id - a.id;
      });
  }, [selectedType, selectedCategory, selectedUniversity, selectedMajor, selectedLocationType, selectedRequirement, sortBy, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 xl:px-10 py-8">

        {/* Filter Bar - Using Reusable Component */}
        {/* Filter Bar - Using Reusable Component */}
        <ProjectFilterBar
          tabs={[
            { label: "Semua Lowongan", value: "all" },
            { label: "Lowongan Magang", value: "paid" }, // Mapping to 'paid' (or whatever logic user wants for magang)
            { label: "Lowongan Kerja", value: "free" }, // Mapping to 'free'
            { label: "Kompetisi", value: "competition" },
          ]}
          selectedTab={selectedType}
          onTabChange={(value) => setSelectedType(value as any)}
          searchPlaceholder="Posisi"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          
          // The "Lokasi" filter is now here
          topRightFilter={{
            label: "Lokasi",
            value: selectedLocationType,
            onChange: setSelectedLocationType,
            options: [
              { label: "Semua Lokasi", value: "all" },
              { label: "Offline", value: "offline" },
              { label: "Full Online", value: "online" },
              { label: "Hybrid", value: "hybrid" },
            ],
          }}

          filters={[
            {
              label: "Semua Lowongan", // Kategori
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
              label: "Perusahaan", // Universitas/Owner
              value: selectedUniversity,
              onChange: setSelectedUniversity,
              options: [
                { label: "Semua Perusahaan", value: "all" },
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
                { label: "Informatika", value: "informatika" },
                { label: "Sistem Informasi", value: "si" },
                { label: "DKV", value: "dkv" },
                { label: "Bisnis", value: "business" },
              ],
              colSpan: 1,
            },
            {
              label: "Jenjang Pendidikan", // Requirement
              value: selectedRequirement,
              onChange: setSelectedRequirement,
              options: [
                { label: "Semua Jenjang", value: "all" },
                { label: "Open for All", value: "all_levels" },
                { label: "Campus Only", value: "campus" },
                { label: "Professional", value: "pro" },
              ],
              colSpan: 1,
            },
          ]}
          onSearchClick={() => {/* Optional search action */}}
          showSearchButton={true}
        />

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
                setSelectedUniversity("all");
                setSelectedMajor("all");
                setSelectedLocationType("all");
                setSelectedRequirement("all");
                setSearchQuery("");
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
    </div>
  );
}
