import { GraduationCap } from "lucide-react";

interface ProjectMajorsProps {
  majors: string[];
}

export default function ProjectMajors({ majors }: ProjectMajorsProps) {
  if (!majors || majors.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        Jurusan yang Dibutuhkan
      </h2>
      <div className="flex flex-wrap gap-2">
        {majors.map((major, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 bg-accent text-foreground rounded-lg border border-border text-xs sm:text-sm font-medium"
          >
            {major}
          </span>
        ))}
      </div>
    </div>
  );
}
