"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ProjectCard from "@/components/shared/ProjectCard";
import { openProjects } from "@/data/projects";

export default function OpenProjectSection() {
  const [activeTab, setActiveTab] = useState<"all" | "paid" | "free" | "competition">("all");

  // Filter projects based on active tab
  const filteredProjects = openProjects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "paid") return project.type === "paid";
    if (activeTab === "free") return project.type === "free";
    if (activeTab === "competition") return project.category === "Competition";
    return true;
  });

  // Limit to 9 projects
  const displayedProjects = filteredProjects.slice(0, 9);
  const hasMore = filteredProjects.length > 9;

  return (
    <section className="bg-background py-8 xl:py-12">
      <div className="container mx-auto px-4 xl:px-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-2">
            Open Projects
          </h2>
          <p className="text-muted-foreground">
            Temukan project kolaborasi, bangun tim, dan kembangkan portfolio!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6 border-b border-border overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
              activeTab === "all"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Semua Project
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("paid")}
            className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
              activeTab === "paid"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Paid
            {activeTab === "paid" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("free")}
            className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
              activeTab === "free"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Free
            {activeTab === "free" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("competition")}
            className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
              activeTab === "competition"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Competition
            {activeTab === "competition" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More Link - Only show if there are more than 9 projects */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <a 
              href="/projects" 
              className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Lihat lebih banyak project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
