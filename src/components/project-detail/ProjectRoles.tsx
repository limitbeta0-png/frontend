import { useState } from "react";
import { RoleDetail } from "@/data/projectDetails";
import { Briefcase, CheckCircle2, Zap, Target, Calendar } from "lucide-react";

interface ProjectRolesProps {
  roles: RoleDetail[];
}

export default function ProjectRoles({ roles }: ProjectRolesProps) {
  const [activeRoleTab, setActiveRoleTab] = useState(0);

  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        Role yang Dibutuhkan
      </h2>

      {/* Tab Headers - Scrollable on mobile */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20">
        {roles.map((role, idx) => (
          <button
            key={idx}
            onClick={() => setActiveRoleTab(idx)}
            disabled={role.filled}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap relative ${
              activeRoleTab === idx
                ? "bg-primary text-primary-foreground shadow-lg"
                : role.filled
                ? "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-60"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {role.name}
            {role.filled && (
              <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-green-500 text-white text-[10px] sm:text-xs rounded-full">
                FILLED
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {roles.map((role, idx) => (
        <div
          key={idx}
          className={`space-y-4 sm:space-y-6 ${activeRoleTab === idx ? "block" : "hidden"}`}
        >
          {role.filled ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
              <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                Role Ini Sudah Terisi
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Posisi {role.name} sudah diisi. Silakan cek role lain yang masih tersedia.
              </p>
            </div>
          ) : (
            <>
              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                  Deskripsi Role
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">{role.description}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">
                  Tanggung Jawab
                </h3>
                <ul className="space-y-2">
                  {role.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {role.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expected Output */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">
                  Output yang Diharapkan
                </h3>
                <ul className="space-y-2">
                  {role.expectedOutput.map((output, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-foreground">{output}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contract Duration */}
              <div className="bg-accent/50 border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Durasi Kontrak
                </h3>
                <p className="text-sm sm:text-base text-foreground font-medium">
                  {role.contractDuration}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
