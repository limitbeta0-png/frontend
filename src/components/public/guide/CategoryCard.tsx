import React from "react";

interface CategoryCardProps {
  icon: React.ReactElement;
  title: string;
  subtitle: string;
  href?: string;
}

export default function CategoryCard({ icon, title, subtitle, href = "#" }: CategoryCardProps) {
  return (
    <a 
      href={href}
      className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer block"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-2">{title}</h3>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </a>
  );
}
