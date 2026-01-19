import HeroSection2 from "@/components/public/HeroSection2";
import FloatingSearchBar from "@/components/public/FloatingSearchBar";
import SidebarLayout from "@/components/layouts/SidebarLayout";

export default function Home() {
  return (
    <SidebarLayout>
      {/* Floating Search Bar */}
      <FloatingSearchBar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Hero Section with Cards */}
        <div className="pt-16">
          <HeroSection2 />
        </div>

        {/* Additional sections can go here */}
      </div>
    </SidebarLayout>
  );
}
