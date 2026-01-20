"use client";

import { useState, use, useEffect } from "react";
import { projectDetailsData } from "@/data/projectDetails";
import { notFound, useRouter } from "next/navigation";
import AuthModal from "@/components/shared/AuthModal";
import { MapPin, Share2, ExternalLink } from "lucide-react";
import {
  ProjectHero,
  ProjectHeader,
  ProjectAbout,
  ProjectDeliverables,
  ProjectMajors,
  ProjectRoles,
  InitiatorCard,
  ProjectTags,
} from "@/components/project-detail";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const project = projectDetailsData[slug];
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);

  if (!project) {
    notFound();
  }

  const availableRoles = project.rolesNeeded.filter((role) => !role.filled);
  const hasAvailableRoles = availableRoles.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingHeader(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Header - appears on scroll */}
      <div className={`fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${
        showFloatingHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-foreground truncate mb-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span className="truncate">{project.initiator.name}</span>
                <span className="hidden sm:inline">•</span>
                <div className="hidden sm:flex items-center gap-1">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{project.initiator.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors hidden sm:block"
                aria-label="Share project"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setShowAuthModal(true)}
                disabled={!hasAvailableRoles}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-bold rounded-lg transition-all shadow-md hover:shadow-lg ${
                  hasAvailableRoles
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {hasAvailableRoles ? 'Apply Now' : 'Penuh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <ProjectHero project={project} onBack={() => router.back()} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-32 relative z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <ProjectHeader 
              project={project} 
              onApply={() => setShowAuthModal(true)}
              hasAvailableRoles={hasAvailableRoles}
            />
            <ProjectAbout project={project} />
            <ProjectDeliverables deliverables={project.expectedDeliverables} />
            <ProjectMajors majors={project.major} />
            <ProjectRoles roles={project.rolesNeeded} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4 sm:space-y-6">
              <InitiatorCard initiator={project.initiator} />
              <ProjectTags tags={project.tags} />
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

