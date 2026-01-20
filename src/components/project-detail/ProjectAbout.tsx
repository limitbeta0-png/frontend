import { ProjectDetail } from "@/data/projectDetails";
import { Target, TrendingUp } from "lucide-react";

interface ProjectAboutProps {
  project: ProjectDetail;
}

export default function ProjectAbout({ project }: ProjectAboutProps) {
  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        Tentang Project
      </h2>
      <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6">
        {project.fullDescription}
      </p>

      <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 rounded-xl p-4 sm:p-6">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm sm:text-base">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Tujuan Project
        </h3>
        <p className="text-sm sm:text-base text-foreground">{project.objective}</p>
      </div>
    </div>
  );
}
