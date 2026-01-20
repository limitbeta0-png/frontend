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
      className={`w-full text-left bg-card border rounded-xl p-4 transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "border-primary shadow-md"
          : "border-border hover:border-primary/50"
      }`}
    >
      {/* Company Logo & Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-primary">
            {project.owner.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-1">
            {project.owner.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {project.owner.role}
          </p>
        </div>
      </div>

      {/* Project Title */}
      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
        {project.title}
      </h4>

      {/* Location & Deadline */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{project.owner.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{project.deadline}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Closing Date */}
      <div className="mt-3 pt-3 border-t border-border flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>Ditutup {project.deadline}</span>
      </div>
    </button>
  );
}
