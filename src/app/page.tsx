import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import CategorySection from "@/components/public/CategorySection";
import ProjectSection from "@/components/public/ProjectSection";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategorySection />

      {/* Project Section */}
      <ProjectSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
