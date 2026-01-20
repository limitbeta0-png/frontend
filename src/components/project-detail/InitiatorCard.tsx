import { InitiatorProfile } from "@/data/projectDetails";
import { Star, MapPin, Calendar, Linkedin, Globe } from "lucide-react";

interface InitiatorCardProps {
  initiator: InitiatorProfile;
}

export default function InitiatorCard({ initiator }: InitiatorCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
      <h3 className="font-bold text-foreground mb-4 text-sm sm:text-base">Project Initiator</h3>

      {/* Avatar & Name */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-white text-lg sm:text-2xl font-bold flex-shrink-0">
          {initiator.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-foreground text-sm sm:text-base truncate">
            {initiator.name}
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{initiator.role}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-0.5 sm:gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                i < Math.floor(initiator.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="font-bold text-foreground text-sm sm:text-base">{initiator.rating}</span>
        <span className="text-xs sm:text-sm text-muted-foreground">rating</span>
      </div>

      {/* Bio */}
      <div className="mb-4">
        <h5 className="font-semibold text-foreground mb-2 text-xs sm:text-sm">Tentang</h5>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{initiator.bio}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
        <div className="bg-accent/50 rounded-lg p-2 sm:p-3 text-center">
          <p className="text-lg sm:text-2xl font-bold text-primary">{initiator.totalProjects}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Total Projects</p>
        </div>
        <div className="bg-accent/50 rounded-lg p-2 sm:p-3 text-center">
          <p className="text-lg sm:text-2xl font-bold text-green-500">
            {initiator.completedProjects}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Location & Join Date */}
      <div className="space-y-2 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-foreground truncate">{initiator.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-foreground">Joined {initiator.joinedDate}</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-2">
        {initiator.linkedinUrl && (
          <a
            href={initiator.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:underline"
          >
            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            LinkedIn Profile
          </a>
        )}
        {initiator.portfolioUrl && (
          <a
            href={initiator.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:underline"
          >
            <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Portfolio Website
          </a>
        )}
      </div>
    </div>
  );
}
