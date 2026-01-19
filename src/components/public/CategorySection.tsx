"use client";

import { 
  Palette, 
  TrendingUp, 
  Code, 
  Video, 
  Database,
  Lightbulb,
  FileText,
  Trophy
} from "lucide-react";

// Define category type
interface Category {
  icon: React.ElementType;
  name: string;
  slug: string;
}

// CUSTOMIZE YOUR CATEGORIES HERE!
const categories: Category[] = [
  { icon: Code, name: "Software & Development", slug: "software-dev" },
  { icon: Palette, name: "UI/UX & Design", slug: "ui-ux-design" },
  { icon: Database, name: "Data & AI", slug: "data-ai" },
  { icon: TrendingUp, name: "Business & Marketing", slug: "business-marketing" },
  { icon: Lightbulb, name: "Product & Startup", slug: "product-startup" },
  { icon: FileText, name: "Research & KTI", slug: "research-kti" },
  { icon: Trophy, name: "Competition & Hackathon", slug: "competition" },
  { icon: Video, name: "Creative Media", slug: "creative-media" },
];


interface CategorySectionProps {
  className?: string; // Custom class for section
  compact?: boolean; // Smaller icons/text for tight spaces
  disableContainer?: boolean; // Remove container wrapper if needed
}

export default function CategorySection({ 
  className = "", 
  compact = false,
  disableContainer = false 
}: CategorySectionProps) {
  
  const Content = () => (
    <>
      {/* Category Grid - Desktop */}
      <div className={`hidden md:grid ${compact ? "grid-cols-8 gap-4" : "grid-cols-4 lg:grid-cols-8 gap-6"}`}>
        {categories.map((category, index) => (
          <a
            key={index}
            href={`/category/${category.slug}`}
            className={`group flex flex-col items-center text-center ${compact ? "space-y-2 p-2" : "space-y-3 p-4"} rounded-xl hover:bg-accent transition-all duration-200`}
          >
            {/* Icon Container */}
            <div className={`${compact ? "w-10 h-10" : "w-14 h-14"} bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200`}>
              <category.icon className={`${compact ? "h-5 w-5" : "h-7 w-7"} text-primary`} />
            </div>
            
            {/* Category Name */}
            <span className={`${compact ? "text-[10px]" : "text-xs"} font-medium text-foreground group-hover:text-primary transition-colors duration-200 leading-tight`}>
              {category.name}
            </span>
          </a>
        ))}
      </div>

      {/* Category Scroll - Mobile */}
      <div className={`md:hidden overflow-x-auto scrollbar-hide ${disableContainer ? "" : "-mx-4 px-4"}`}>
        <div className="flex space-x-4 pb-2">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/category/${category.slug}`}
              className={`group flex flex-col items-center text-center space-y-2 min-w-[80px] ${compact ? "p-2" : "p-3"} rounded-xl hover:bg-accent transition-all duration-200`}
            >
              {/* Icon Container */}
              <div className={`${compact ? "w-10 h-10" : "w-12 h-12"} bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200`}>
                <category.icon className={`${compact ? "h-5 w-5" : "h-6 w-6"} text-primary`} />
              </div>
              
              {/* Category Name */}
              <span className="text-[10px] font-medium text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );

  if (disableContainer) {
    return <div className={className}><Content /></div>;
  }

  return (
    <section className={`bg-background py-1 ${className}`}>
      <div className="container mx-auto px-4 xl:px-10">
        <Content />
      </div>
    </section>
  );
}

