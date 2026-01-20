import { ProjectDetail } from "@/data/projectDetails";
import { Clock, Calendar, DollarSign, Users, UserPlus, MapPin, GraduationCap, Share2 } from "lucide-react";

interface ProjectHeaderProps {
  project: ProjectDetail;
  onApply?: () => void;
  hasAvailableRoles?: boolean;
}

export default function ProjectHeader({ project, onApply, hasAvailableRoles = true }: ProjectHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {project.category}
            </span>
            {/* Work Type Badge */}
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                project.workType === "online"
                  ? "bg-blue-500/10 text-blue-600"
                  : project.workType === "offline"
                  ? "bg-purple-500/10 text-purple-600"
                  : "bg-cyan-500/10 text-cyan-600"
              }`}
            >
              {project.workType === "online"
                ? "🌐 Online"
                : project.workType === "offline"
                ? "📍 Offline"
                : "🔄 Hybrid"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">{project.shortDescription}</p>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Meta Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Clock className="h-4 w-4 text-red-500 flex-shrink-0" />
          <div>
            <p className="text-muted-foreground text-[10px] sm:text-xs">Deadline</p>
            <p className="text-foreground font-semibold">{project.deadline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-muted-foreground text-[10px] sm:text-xs">Timeline</p>
            <p className="text-foreground font-semibold">{project.projectTimeline}</p>
          </div>
        </div>
        {project.type === "paid" && project.budget && (
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <DollarSign className="h-4 w-4 text-yellow-500 flex-shrink-0" />
            <div>
              <p className="text-muted-foreground text-[10px] sm:text-xs">Budget</p>
              <p className="text-foreground font-bold">{project.budget}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-muted-foreground text-[10px] sm:text-xs">Slots</p>
            <p className="text-foreground font-semibold">
              {project.filledSlots}/{project.totalSlots}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm col-span-2 sm:col-span-1">
          <UserPlus className="h-4 w-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-muted-foreground text-[10px] sm:text-xs">Applicants</p>
            <p className="text-foreground font-semibold">
              <span className="font-bold text-primary">{project.applicants}</span> applied
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 bg-muted rounded-lg">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{project.city}</span>
          </div>
          {project.university && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 bg-primary/10 text-primary rounded-lg">
              <GraduationCap className="h-3.5 w-3.5" />
              <span className="font-medium">{project.university}</span>
            </div>
          )}
        </div>
        <button 
          onClick={onApply}
          disabled={!hasAvailableRoles}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap ${
            hasAvailableRoles
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {hasAvailableRoles ? 'Apply Now' : 'Penuh'}
        </button>
      </div>
    </div>
  );
}
