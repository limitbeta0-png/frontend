"use client";

import { useState } from "react";
import Link from "next/link";
import { Code } from "lucide-react";
import RoleToggle from "@/components/public/guide/RoleToggle";
import StepCard from "@/components/public/guide/StepCard";
import BenefitCard from "@/components/public/guide/BenefitCard";
import CategoryCard from "@/components/public/guide/CategoryCard";
import FAQItem from "@/components/public/guide/FAQItem";
import { initiatorSteps, seekerSteps, faqData } from "@/data/guideData";

type Role = "initiator" | "seeker";

export default function GuidePage() {
  const [selectedRole, setSelectedRole] = useState<Role>("seeker");

  const currentSteps = selectedRole === "initiator" ? initiatorSteps : seekerSteps;
  const currentTitle = selectedRole === "initiator" ? "Alur Project Initiator" : "Alur Project Seeker";
  const currentSubtitle = selectedRole === "initiator" 
    ? "Dari ide project hingga dapat kolaborator terbaik"
    : "Dari membuat profil hingga mendapat project impian";

  // Categories data
  const categories = [
    {
      icon: <Code className="w-7 h-7 text-primary" />,
      title: "Web Development",
      subtitle: "Frontend, Backend, Fullstack",
      href: "/projects"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "UI/UX Design",
      subtitle: "Design, Prototyping, Research",
      href: "/projects"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile App",
      subtitle: "iOS, Android, React Native",
      href: "/projects"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Data Science",
      subtitle: "Analytics, ML, Visualization",
      href: "/projects"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: "Digital Marketing",
      subtitle: "SEO, Content, Social Media",
      href: "/projects"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Video Production",
      subtitle: "Editing, Animation, Motion",
      href: "/projects"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Content Writing",
      subtitle: "Article, Copywriting, Blog",
      href: "/projects"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Game Development",
      subtitle: "Unity, Unreal, 2D/3D",
      href: "/projects"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 xl:px-10 py-12 xl:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Cara Kerja Coollabs
          </h1>
          <p className="text-base xl:text-lg text-muted-foreground mb-10">
            Langkah mudah untuk kolaborasi project yang sukses
          </p>

          {/* Tab Toggle */}
          <div className="mb-16">
            <RoleToggle selectedRole={selectedRole} onRoleChange={setSelectedRole} />
          </div>

          {/* Section Title */}
          <div className="mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-3">
              {currentTitle}
            </h2>
            <p className="text-muted-foreground">
              {currentSubtitle}
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 xl:gap-6">
            {currentSteps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl xl:text-4xl font-bold text-foreground text-center mb-12">
            Kenapa Coollabs?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01" />
                </svg>
              }
              title="Proses Cepat & Mudah"
              description="Posting project atau apply ke project hanya dalam hitungan menit. Sistem kami yang intuitif membuat kolaborasi jadi lebih efisien."
            />
            <BenefitCard
              icon={
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Aman & Terpercaya"
              description="Semua profile terverifikasi. Review dan rating system membantu kamu menemukan kolaborator yang tepat dan terpercaya."
            />
            <BenefitCard
              icon={
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Komunitas Berkualitas"
              description="Bergabung dengan ribuan mahasiswa dan profesional yang siap berkolaborasi untuk project yang impactful."
            />
          </div>
        </div>

        {/* Popular Categories Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl xl:text-4xl font-bold text-foreground text-center mb-4">
            Kategori Project Populer
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Temukan project sesuai dengan keahlian dan minat kamu
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                subtitle={category.subtitle}
                href={category.href}
              />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mt-20 max-w-6xl mx-auto scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-8 xl:gap-12">
            {/* Left Side - Title */}
            <div>
              <h2 className="text-5xl xl:text-6xl font-bold text-foreground mb-4">
                Ada pertanyaan?<br />Kami siap membantu.
              </h2>
              <p className="text-muted-foreground text-lg">
                Temukan jawaban untuk pertanyaan umum tentang Coollabs dan bagaimana kami membantu kamu berkolaborasi dalam project dengan teknologi terdepan.
              </p>
            </div>

            {/* Right Side - FAQ Accordion */}
            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 xl:p-10 border border-primary/20">
            <h3 className="text-2xl xl:text-3xl font-bold text-foreground mb-3">
              Siap Memulai?
            </h3>
            <p className="text-muted-foreground mb-6">
              {selectedRole === "initiator" 
                ? "Posting project pertama kamu dan temukan kolaborator terbaik!"
                : "Explore project menarik dan mulai bangun portfolio kamu sekarang!"
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/">
            <button className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20">
                {selectedRole === "initiator" ? "Buat Project" : "Cari Project"}
            </button>
            </Link>

            <Link href="/projects">
            <button className="px-8 py-3.5 border border-border hover:border-primary text-foreground hover:text-primary rounded-lg transition-colors duration-200 font-semibold">
                Pelajari Lebih Lanjut
            </button>
            </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Punya pertanyaan? Lihat{" "}
            <a href="#faq" className="text-primary hover:underline font-medium">
              FAQ
            </a>
            {" "}atau{" "}
            <a 
              href="https://wa.me/6281235873675?text=Halo%20Coollabs!%20Saya%20ingin%20bertanya%20tentang%20platform%20kolaborasi%20project." 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              hubungi kami
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
