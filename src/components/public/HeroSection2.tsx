"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function HeroSection2() {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Today
          </h2>
          <p className="text-muted-foreground">
            Discover the latest stories, highlights, and must-see moments for today.
          </p>
        </div>

        {/* Featured Cards Grid - Apple TV+ Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Large Featured Card 1 */}
          <WobbleCard
            containerClassName="min-h-[400px] lg:min-h-[500px]"
            backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
            badge="HAPPENING NOW"
            title="Creative Showcase"
            subtitle="Discover the latest projects from talented creators around the world."
            smallAppIcon="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80"
            smallAppName="Creative Hub"
            showViewButton
          />

          {/* Large Featured Card 2 */}
          <WobbleCard
            containerClassName="min-h-[400px] lg:min-h-[500px]"
            backgroundImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
            badge="GAMES WE LOVE"
            title="Abstract Adventures"
            subtitle="Immerse yourself in a world of creativity and imagination."
            smallAppIcon="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&q=80"
            smallAppName="Game Studio"
            showViewButton
          />
        </div>

        {/* Today's Biggest Events Section */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Hackathons
          </h3>
          <p className="text-muted-foreground">
            What to stream, play, and enjoy
          </p>
        </div>

        {/* Smaller Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <WobbleCard
            containerClassName="min-h-[300px]"
            backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
            badge="NOW AVAILABLE"
            title="Design Masterclass"
            subtitle="Learn from the best designers in the industry"
            showViewButton
          />

          {/* Card 2 */}
          <WobbleCard
            containerClassName="min-h-[300px]"
            backgroundImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80"
            badge="NOW AVAILABLE"
            title="Tech Innovation"
            subtitle="Explore cutting-edge technology and innovation"
            showViewButton
          />

          {/* Card 3 */}
          <WobbleCard
            containerClassName="min-h-[300px]"
            backgroundImage="https://images.unsplash.com/photo-1511376777868-611b54f68947?w=600&q=80"
            badge="TRENDING"
            title="Music & Arts"
            subtitle="Discover new artists and creative expressions"
            showViewButton
          />

          {/* Card 4 */}
          <WobbleCard
            containerClassName="min-h-[300px]"
            backgroundImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
            badge="FEATURED"
            title="Code & Create"
            subtitle="Build amazing applications with modern tools"
            showViewButton
          />

          {/* Card 5 */}
          <WobbleCard
            containerClassName="min-h-[300px]"
            backgroundImage="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80"
            badge="NEW RELEASE"
            title="Developer Tools"
            subtitle="Powerful tools for modern development"
            showViewButton
          />

          {/* Card 6 */}
          <WobbleCard
            containerClassName="min-h-[300px]"
            backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80"
            badge="POPULAR"
            title="Business Growth"
            subtitle="Scale your business with proven strategies"
            showViewButton
          />
        </div>

        {/* CTA Section */}
        {/* <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Want to feature your content here?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#submit"
              className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Submit Your Work
            </a>
            <a
              href="#browse"
              className="px-8 py-3 bg-transparent border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-all duration-200"
            >
              Browse All Content
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}
