"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Define slide data type
interface HeroSlide {
  heading: string; // Main heading text
  highlightWords: string[]; // Words to highlight in yellow
  buttonText: string;
  buttonLink: string;
  bgGradient: string; // Tailwind gradient classes
  imageSrc: string;
}

// CUSTOMIZE YOUR SLIDES HERE!
const heroSlides: HeroSlide[] = [
  {
    heading: "Mulai Dapat Penghasilan dari Bakat yang Kamu Kuasai.",
    highlightWords: ["Penghasilan", "Bakat"],
    buttonText: "Bangun Portofolio Sekarang!",
    buttonLink: "#",
    bgGradient: "from-[#00B6D0] to-[#0099B8]",
    imageSrc: "/hero-person-3.webp",
  },
  {
    heading: "Kolaborasi Project Seru dengan Para Profesional!!",
    highlightWords: ["Kolaborasi", "Profesional"],
    buttonText: "Temukan Project!",
    buttonLink: "#",
    bgGradient: "from-[#4E54C8] to-[#8F94FB]",
    imageSrc: "/hero-person-4.webp",
  },
  {
    heading: "Tingkatkan Skill dan Bangun Portfolio yang Impressive!",
    highlightWords: ["Skill", "Portfolio"],
    buttonText: "Mulai Belajar!",
    buttonLink: "#",
    bgGradient: "from-[#FF6B6B] to-[#EE5A6F]",
    imageSrc: "/hero-person-8.webp",
  },
//   {
//     heading: "Raih Pengalaman Kerja Nyata Sambil Kuliah!",
//     highlightWords: ["Pengalaman", "Kerja Nyata"],
//     buttonText: "Lihat Peluang!",
//     buttonLink: "#",
//     bgGradient: "from-[#4E54C8] to-[#8F94FB]",
//     imageSrc: "/hero-person-3.webp",
//   },
//   {
//     heading: "Bergabung dengan Komunitas Developer Terbaik!",
//     highlightWords: ["Komunitas", "Developer"],
//     buttonText: "Join Sekarang!",
//     buttonLink: "#",
//     bgGradient: "from-[#F093FB] to-[#F5576C]",
//     imageSrc: "/hero-person-3.webp",
//   },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Helper function to highlight words
  const renderHeading = (heading: string, highlightWords: string[]) => {
    let parts = [heading];
    
    highlightWords.forEach((word) => {
      const newParts: string[] = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(word);
          splitParts.forEach((p, i) => {
            newParts.push(p);
            if (i < splitParts.length - 1) {
              newParts.push(word);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts.map((part, index) => {
      if (highlightWords.includes(part)) {
        return (
          <strong key={index} className="text-yellow-300 relative inline-block">
            {part}
            {index === 1 && (
              <Sparkles className="hidden xl:block absolute -top-2 -right-8 h-6 w-6 text-yellow-300 animate-pulse" />
            )}
          </strong>
        );
      }
      return <span key={index} className="text-white">{part}</span>;
    });
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="bg-background container mx-auto px-4 xl:px-10 pt-4 pb-4 xl:-mt-12 xl:pb-20">
      <div className="relative w-full">
        {/* Hero Banner */}
        <div className="relative w-full h-[145px] xl:h-[435px] pt-[5px] xl:pt-20">
          <div className={`banner-carousel w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br ${slide.bgGradient} transition-all duration-500`}>
            {/* Content Container */}
            <div className="relative flex items-center h-full">
              {/* Left Content */}
              <div className="px-4 xl:px-12 max-w-[calc(100%-123px)] xl:max-w-[calc(100%-362px)]">
                <div className="mb-2.5 xl:mb-8 text-sm xl:text-5xl font-bold xl:leading-[1.2]">
                  <h2>{renderHeading(slide.heading, slide.highlightWords)}</h2>
                </div>
                <a
                  href={slide.buttonLink}
                  className="inline-block px-3 py-1.5 xl:px-8 xl:py-3.5 rounded-full xl:rounded-2xl font-bold transition-all duration-300 hover:scale-105 text-xs xl:text-xl leading-none bg-yellow-400 text-black hover:bg-yellow-300"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="absolute right-0 bottom-0 h-[152px] w-[123px] xl:h-[446px] xl:w-[362px] flex flex-col justify-end rounded-2xl overflow-hidden">
              <div className="h-full w-full relative">
                <Image
                  src={slide.imageSrc}
                  alt={slide.heading}
                  fill
                  className="object-contain transition-opacity duration-500"
                  style={{ objectPosition: 'center bottom' }}
                  priority
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-2 flex w-full justify-center gap-1">
            {heroSlides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`cursor-pointer rounded-full transition-all h-1 xl:h-2 mb-0 xl:mb-4 ${
                  index === currentSlide
                    ? "w-2 xl:w-10 bg-white"
                    : "w-1 xl:w-2 bg-white/30"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
