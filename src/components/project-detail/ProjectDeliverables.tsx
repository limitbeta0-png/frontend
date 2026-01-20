import { CheckCircle2 } from "lucide-react";

interface ProjectDeliverablesProps {
  deliverables: string[];
}

export default function ProjectDeliverables({ deliverables }: ProjectDeliverablesProps) {
  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        Output yang Diharapkan
      </h2>
      <ul className="space-y-2 sm:space-y-3">
        {deliverables.map((deliverable, idx) => (
          <li key={idx} className="flex items-start gap-2 sm:gap-3">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground">{deliverable}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
