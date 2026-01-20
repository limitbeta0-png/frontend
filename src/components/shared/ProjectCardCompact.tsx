"use client";

import { MapPin, Clock, Calendar } from "lucide-react";
import { ProjectCardProps } from "./ProjectCard";

interface ProjectCardCompactProps {
  project: ProjectCardProps;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ProjectCardCompact({ project, isSelected = false, onClick }: ProjectCardCompactProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-card border rounded-xl p-5 transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "border-primary shadow-md"
          : "border-border hover:border-primary/50"
      }`}
    >
      {/* Header: Title on left, Avatar & Initiator on right */}
      <div className="flex  items-center gap-4 mb-4">
        {/* Left: Project Title */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground text-lg mb-0 line-clamp-2 leading-snug">
            {project.title}
          </h4>
        </div>

        {/* Right: Company Logo & Info */}
        <div className="flex items-start gap-2.5 flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-base font-bold text-primary">
              {project.owner.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-sm mb-0.5 line-clamp-1">
              {project.owner.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {project.owner.role}
            </p>
          </div>
        </div>
      </div>

      {/* Location & Deadline */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{project.owner.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{project.deadline}</span>
        </div>
      </div>

      {/* Paid/Free Badge with Budget */}
      <div className="mb-4">
        {project.type === "paid" ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/5 text-primary rounded-md text-sm font-semibold">
            <span>PAID</span>
            {project.budget && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="font-bold">{project.budget}</span>
              </>
            )}
          </div>
        ) : (
          <div className="inline-flex items-center px-3 py-1.5 border border-border bg-muted text-muted-foreground rounded-md text-sm font-semibold">
            <span>FREE</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 bg-primary/10 text-primary text-sm rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Closing Date */}
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Ditutup {project.deadline}</span>
      </div>
    </button>
  );
}
