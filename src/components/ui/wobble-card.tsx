"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
  // Apple TV+ style props
  backgroundImage,
  badge,
  title,
  subtitle,
  smallAppIcon,
  smallAppName,
  showViewButton,
}: {
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
  // Optional props for Apple TV+ style cards
  backgroundImage?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  smallAppIcon?: string;
  smallAppName?: string;
  showViewButton?: boolean;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  // Check if this is a featured card with background image
  const isFeaturedCard = backgroundImage && title;

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.02, 1.02, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.2s ease-out",
      }}
      className={cn(
        "mx-auto w-full relative rounded-3xl overflow-hidden cursor-pointer group",
        containerClassName
      )}
    >
      <div className="relative h-full overflow-hidden rounded-3xl">
        {isFeaturedCard ? (
          <>
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={backgroundImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>

            {/* Content Overlay */}
            <motion.div
              style={{
                transform: isHovering
                  ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0)`
                  : "translate3d(0px, 0px, 0)",
                transition: "transform 0.2s ease-out",
              }}
              className="relative z-10 h-full flex flex-col justify-between p-6"
            >
              {/* Badge */}
              {badge && (
                <div className="self-start">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-md uppercase tracking-wide">
                    {badge}
                  </span>
                </div>
              )}

              {/* Bottom Content */}
              <div className="space-y-3">
                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl mb-2 leading-tight">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-white/90 text-sm sm:text-base">
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Small App Info or View Button */}
                {(smallAppIcon || showViewButton) && (
                  <div className="flex items-center justify-between">
                    {smallAppIcon && smallAppName && (
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={smallAppIcon}
                            alt={smallAppName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white text-xs font-medium">
                            {smallAppName}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {showViewButton && (
                      <button className="ml-auto px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full font-medium transition-all duration-200 text-sm">
                        View
                      </button>
                    )}
                  </div>
                )}

                {/* Additional children content */}
                {children}
              </div>
            </motion.div>
          </>
        ) : (
          // Default card style (for backwards compatibility)
          <div
            className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-3xl overflow-hidden"
            style={{
              boxShadow:
                "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
            }}
          >
            <motion.div
              style={{
                transform: isHovering
                  ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
                  : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                transition: "transform 0.1s ease-out",
              }}
              className={cn("h-full px-4 py-20 sm:px-10", className)}
            >
              <Noise />
              {children}
            </motion.div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}
    ></div>
  );
};
