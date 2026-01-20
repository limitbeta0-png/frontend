import { LucideIcon } from "lucide-react";

interface StepCardProps {
  step: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}

export default function StepCard({ step, index }: StepCardProps) {
  const StepIcon = step.icon;

  return (
    <div className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      {/* Number Badge */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
        <span className="text-sm font-bold text-primary">{index + 1}</span>
      </div>

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <StepIcon className="h-7 w-7 text-primary" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-foreground mb-2">
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}
