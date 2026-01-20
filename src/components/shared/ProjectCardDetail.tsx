"use client";

import { MapPin, Calendar, Users, Clock, FileText, CheckCircle2, ExternalLink, Star, Briefcase, Mail, Linkedin, Globe, Wallet, Target, Share2, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ProjectCardProps } from "./ProjectCard";
import { ProjectDetail } from "@/data/projectDetails";
import AuthModal from "./AuthModal";

interface ProjectCardDetailProps {
  project: ProjectCardProps;
  projectDetail?: ProjectDetail | null;
}

export default function ProjectCardDetail({ project, projectDetail }: ProjectCardDetailProps) {
  const [activeTab, setActiveTab] = useState<"description" | "initiator">("description");
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setShowFloatingHeader(scrollTop > 100);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-24">
      {/* Floating Header - muncul saat scroll */}
      <div className={`absolute top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 z-10 transition-all duration-300 ${
        showFloatingHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate mb-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="truncate">{project.owner.name}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{project.owner.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
              <Link href={`/project/${project.slug}`}>
                <ExternalLink className="h-4 w-4 hover:text-primary" />
              </Link>
            </button>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content - Header stays on top when scrolling */}
      <div ref={scrollContainerRef} className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {/* Thumbnail/Logo Section (Inside scroll, optional) */}
        {project.thumbnail && (
          <div className="relative h-48 w-full bg-muted">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content Padding */}
        <div className="p-6">
          {/* Header with Status Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  project.type === "paid"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-blue-500/10 text-blue-600"
                }`}>
                  {project.type === "paid" ? "Berbayar" : "Gratis"}
                </span>
                <span className="text-xs text-muted-foreground">
                  • Diposting {projectDetail?.createdAt || project.deadline}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{project.owner.name}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{project.owner.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                  <Link
                    href={`/project/${project.slug}`}
                  >
                    <ExternalLink  className="h-5 w-5 hover:text-primary" />
                  </Link>
                </button>
              </div>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Project Info - Compact Icon Based */}
          <div className="space-y-3 mb-6">
            {/* First Row: Deadline, Budget, Applicants, Slots */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border border-border rounded-lg p-4">
              <div className="flex items-center gap-2" title="Deadline">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{project.deadline}</span>
              </div>
              {project.budget && (
                <div className="flex items-center gap-2" title="Budget">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span>{project.budget}</span>
                </div>
              )}
              <div className="flex items-center gap-2" title="Applicants">
                <Users className="h-4 w-4 text-primary" />
                <span>{project.applicants} Applicants</span>
              </div>
              <div className="flex items-center gap-2" title="Slots">
                <Target className="h-4 w-4 text-primary" />
                <span>{project.filledSlots}/{project.totalSlots} Slots</span>
              </div>
            </div>

            {/* Second Row: Work Type, Requirement Level, City, University */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Work Type Badge */}
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                  project.workType === "online"
                    ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                    : project.workType === "offline"
                    ? "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                    : "bg-cyan-500/10 text-cyan-600 border border-cyan-500/20"
                }`}
              >
                {project.workType === "online" ? "🌐 Full Online" : project.workType === "offline" ? "📍 Offline" : "🔄 Hybrid"}
              </span>

              {/* Requirement Level Badge */}
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                  project.requirementLevel === "open-for-all"
                    ? "bg-green-500/10 text-green-600 border border-green-500/20"
                    : project.requirementLevel === "campus-only"
                    ? "bg-orange-500/10 text-orange-600 border border-orange-500/20"
                    : "bg-red-500/10 text-red-600 border border-red-500/20"
                }`}
              >
                {project.requirementLevel === "open-for-all" 
                  ? "✨ Open for All" 
                  : project.requirementLevel === "campus-only" 
                  ? "🎓 Campus Only" 
                  : "💼 Professional"}
              </span>

              {/* City */}
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border">
                📍 {project.city}
              </span>

              {/* University (if campus-only) */}
              {project.university && project.requirementLevel === "campus-only" && (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  🏛️ {project.university}
                </span>
              )}
            </div>

            {/* Third Row: Major/Jurusan */}
            {project.major && project.major.length > 0 && (
              <div className="border border-border rounded-lg p-3">
                <p className="text-xs font-semibold text-foreground mb-2">📚 Jurusan yang Dibutuhkan:</p>
                <div className="flex flex-wrap gap-2">
                  {project.major.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-accent text-foreground rounded-md border border-border"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-6 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
                activeTab === "description"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Deskripsi Project
              {activeTab === "description" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("initiator")}
              className={`pb-3 px-1 font-medium text-sm whitespace-nowrap transition-colors relative ${
                activeTab === "initiator"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Profile Initiator
              {activeTab === "initiator" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          </div>

          {/* Tab Content: Description */}
          {activeTab === "description" && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Deskripsi Project
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {projectDetail?.fullDescription || project.description}
                </p>
              </div>

              {/* Objective (if available) */}
              {projectDetail?.objective && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tujuan Project</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {projectDetail.objective}
                  </p>
                </div>
              )}

              {/* Roles Needed */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Role yang Dibutuhkan
                </h4>
                <div className="space-y-3">
                  {(projectDetail?.rolesNeeded || project.rolesNeeded).map((role, idx) => (
                    <div
                      key={idx}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          {role.name}
                        </span>
                        {role.filled ? (
                          <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Terisi
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                            Tersedia
                          </span>
                        )}
                      </div>
                      
                      {/* Role Description (if detailed data available) */}
                      {('description' in role && role.description) ? (
                        <p className="text-xs text-muted-foreground mb-2">
                          {role.description as string}
                        </p>
                      ) : null}

                      {/* Requirements (if available) */}
                      {('requirements' in role && Array.isArray(role.requirements) && role.requirements.length > 0) ? (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-foreground mb-1">Requirements:</p>
                          <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                            {(role.requirements as string[]).slice(0, 3).map((req: string, i: number) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Deliverables (if available) */}
              {projectDetail?.expectedDeliverables && projectDetail.expectedDeliverables.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Deliverables</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    {projectDetail.expectedDeliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Initiator Profile */}
          {activeTab === "initiator" && projectDetail?.initiator && (
            <div className="space-y-6">
              {/* Initiator Header */}
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">
                    {projectDetail.initiator.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-foreground">{projectDetail.initiator.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{projectDetail.initiator.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{projectDetail.initiator.role}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{project.owner.location}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Tentang Saya</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {projectDetail.initiator.bio}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Total Projects</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{projectDetail.initiator.totalProjects}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{projectDetail.initiator.completedProjects}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Bergabung</p>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{projectDetail.initiator.joinedDate}</p>
                </div>
              </div>

              {/* Social Links */}
              {(projectDetail.initiator.linkedinUrl || projectDetail.initiator.portfolioUrl) && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Connect</h4>
                  <div className="flex flex-wrap gap-2">
                    {projectDetail.initiator.linkedinUrl && (
                      <a
                        href={projectDetail.initiator.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {projectDetail.initiator.portfolioUrl && (
                      <a
                        href={projectDetail.initiator.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Globe className="h-4 w-4" />
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fallback if no detailed initiator data */}
          {activeTab === "initiator" && !projectDetail?.initiator && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Profile initiator tidak tersedia</p>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}