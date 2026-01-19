"use client";

import { Clock, DollarSign, Award, UserPlus, Users, MapPin } from "lucide-react";
import Image from "next/image";

interface Role {
  name: string;
  filled: boolean;
}

export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  type: "paid" | "free";
  budget?: string;
  deadline: string;
  rolesNeeded: Role[];
  totalSlots: number;
  filledSlots: number;
  applicants: number;
  owner: {
    name: string;
    role: string;
    location: string;
    avatar: string;
  };
  tags: string[];
}

export default function ProjectCard({ project }: { project: ProjectCardProps }) {
  return (
    <a
      href={`/project/${project.id}`}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-1.5 ${
              project.type === "paid"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-yellow-500/50"
                : "bg-gradient-to-r from-green-400 to-green-500 text-green-900 shadow-green-500/50"
            }`}
          >
            {project.type === "paid" ? (
              <>
                <DollarSign className="h-3.5 w-3.5" />
                PAID
              </>
            ) : (
              <>
                <Award className="h-3.5 w-3.5" />
                FREE
              </>
            )}
          </span>
        </div>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {project.deadline}
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1.5 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Roles Needed */}
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-foreground mb-1.5">
            Roles Dibutuhkan:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.rolesNeeded.map((role, idx) => (
              <span
                key={idx}
                className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  role.filled
                    ? "bg-muted text-muted-foreground border-border line-through"
                    : "bg-background text-foreground border-primary"
                }`}
              >
                {role.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-accent text-foreground rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {/* Owner Info */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-primary-foreground text-[10px] font-semibold">
              {project.owner.name.charAt(0)}
            </div>
            <div>
              <p className="text-[11px] font-medium text-foreground">
                {project.owner.name}
              </p>
              <p className="text-[9px] text-muted-foreground">
                {project.owner.role}
              </p>
              <p className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                <MapPin className="h-2 w-2" />
                {project.owner.location}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            {project.type === "paid" && project.budget && (
              <p className="text-xs font-bold text-primary mb-1">
                {project.budget}
              </p>
            )}
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <UserPlus className="h-3 w-3" />
                {project.applicants}
              </span>
              <span className="flex items-center gap-0.5">
                <Users className="h-3 w-3" />
                {project.filledSlots}/{project.totalSlots}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
