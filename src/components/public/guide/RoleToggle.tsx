import { Code, Briefcase } from "lucide-react";

type Role = "initiator" | "seeker";

interface RoleToggleProps {
  selectedRole: Role;
  onRoleChange: (role: Role) => void;
}

export default function RoleToggle({ selectedRole, onRoleChange }: RoleToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 p-1.5 bg-muted rounded-full">
      <button
        onClick={() => onRoleChange("seeker")}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
          selectedRole === "seeker"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Code className="h-4 w-4" />
        Untuk Project Seeker
      </button>
      <button
        onClick={() => onRoleChange("initiator")}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
          selectedRole === "initiator"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Briefcase className="h-4 w-4" />
        Untuk Project Initiator
      </button>
    </div>
  );
}
