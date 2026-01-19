import HeroSection from "@/components/public/HeroSection";
import CategorySection from "@/components/public/CategorySection";
import ProjectSection from "@/components/public/ProjectSection";

export default function Home() {
  return (
    <div className="bg-background">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategorySection />

      {/* Project Section */}
      <ProjectSection />

    </div>
  );
}
