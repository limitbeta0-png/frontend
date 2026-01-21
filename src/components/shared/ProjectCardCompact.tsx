"use client";

import { MapPin, Clock, Calendar, Users } from "lucide-react";
import { ProjectCardProps } from "./ProjectCard";
import Link from "next/link";

interface ProjectCardCompactProps {
  project: ProjectCardProps;
  isSelected?: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

export default function ProjectCardCompact({ project, isSelected = false, onClick, isMobile = false }: ProjectCardCompactProps) {
  const cardContent = (
    <div className="w-full overflow-hidden">
      {/* Header: Title on left, Avatar & Initiator on right */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-3 lg:mb-4 w-full">
        {/* Left: Project Title */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <h4 className="font-bold text-foreground text-sm sm:text-base lg:text-lg mb-0 line-clamp-2 leading-tight break-words">
            {project.title}
          </h4>
        </div>

        {/* Right: Avatar + Initiator Info */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <span className="text-xs sm:text-sm lg:text-base font-bold text-primary">
              {project.owner.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 max-w-[80px] sm:max-w-[120px] text-center sm:text-left">
            <h3 className="font-bold text-foreground text-[9px] sm:text-xs lg:text-sm mb-0 truncate">
              {project.owner.name}
            </h3>
            <p className="text-[8px] sm:text-[10px] lg:text-xs text-muted-foreground truncate hidden sm:block">
              {project.owner.role}
            </p>
          </div>
        </div>
      </div>

      {/* Location & Deadline */}
      <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-3 lg:mb-4 w-full overflow-hidden">
        <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 flex-shrink-0" />
          <span className="truncate">{project.owner.location}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 flex-shrink-0" />
          <span className="whitespace-nowrap text-[10px] sm:text-xs lg:text-sm">{project.deadline}</span>
        </div>
      </div>

      {/* Paid/Free Badge with Budget */}
      <div className="mb-3 lg:mb-4 w-full overflow-hidden">
        {project.type === "paid" ? (
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 border border-primary/30 bg-primary/5 text-primary rounded-md text-xs sm:text-sm font-semibold max-w-full overflow-hidden">
            <span className="flex-shrink-0">PAID</span>
            {project.budget && (
              <>
                <span className="text-muted-foreground hidden sm:inline flex-shrink-0">•</span>
                <span className="font-bold text-[10px] sm:text-xs lg:text-sm truncate min-w-0">{project.budget}</span>
              </>
            )}
          </div>
        ) : (
          <div className="inline-flex items-center px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 border border-border bg-muted text-muted-foreground rounded-md text-xs sm:text-sm font-semibold">
            <span>FREE</span>
          </div>
        )}
      </div>

      {/* Available Roles */}
      {project.rolesNeeded && project.rolesNeeded.length > 0 && (
        <div className="mb-3 lg:mb-4 w-full overflow-hidden">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-1 sm:gap-1.5 flex-1 min-w-0">
              {project.rolesNeeded.map((role, idx) => (
                <span
                  key={idx}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 border text-[10px] sm:text-xs font-medium rounded whitespace-nowrap ${
                    role.filled
                      ? 'bg-primary/5 border-primary/20 text-primary/50 line-through'
                      : 'bg-primary/10 border-primary/30 text-primary'
                  }`}
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Closing Date */}
      <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-border flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground w-full overflow-hidden">
        <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 flex-shrink-0" />
        <span className="truncate min-w-0">Ditutup {project.deadline}</span>
      </div>
    </div>
  );

  const cardClassName = `block w-full text-left bg-card border rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 transition-all duration-200 hover:shadow-md overflow-hidden ${
    isSelected
      ? "border-primary shadow-md"
      : "border-border hover:border-primary/50"
  }`;

  // On mobile (lg breakpoint), use Link to navigate to detail page
  // On desktop, use button with onClick for inline detail view
  return (
    <>
      {/* Mobile: Link to detail page */}
      <Link
        href={`/project/${project.slug}`}
        className={`lg:hidden ${cardClassName}`}
      >
        {cardContent}
      </Link>

      {/* Desktop: Button for inline detail */}
      <button
        onClick={onClick}
        className={`hidden lg:block ${cardClassName}`}
      >
        {cardContent}
      </button>
    </>
  );
}
