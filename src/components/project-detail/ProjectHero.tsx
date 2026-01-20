import { ProjectDetail } from "@/data/projectDetails";
import Image from "next/image";
import { DollarSign, Award, ArrowLeft } from "lucide-react";

interface ProjectHeroProps {
  project: ProjectDetail;
  onBack: () => void;
}

export default function ProjectHero({ project, onBack }: ProjectHeroProps) {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden">
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-foreground px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-all flex items-center gap-2 font-semibold text-sm sm:text-base"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      {/* Type Badge */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10">
        <span
          className={`text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-1.5 sm:gap-2 ${
            project.type === "paid"
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900"
              : "bg-gradient-to-r from-green-400 to-green-500 text-green-900"
          }`}
        >
          {project.type === "paid" ? (
            <>
              <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">PAID PROJECT</span>
              <span className="sm:hidden">PAID</span>
            </>
          ) : (
            <>
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">FREE PROJECT</span>
              <span className="sm:hidden">FREE</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
