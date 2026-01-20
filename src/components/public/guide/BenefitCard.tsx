import { ReactNode } from "react";

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
