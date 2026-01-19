"use client";

import React, { useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const trendingSearches = [
    "UI Design",
    "3D Art",
    "Web Development",
    "Illustration",
    "Photography",
    "Mobile Apps",
  ];

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 -z-10" />

      <div className="relative mx-auto max-w-4xl">
        {/* Clean Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Find Your Inspiration
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Search through thousands of creative projects
          </p>
        </div>

        {/* Glassmorphism Search Bar */}
        <div className="relative mb-8">
          <div
            className={`
              relative flex items-center gap-3
              bg-card/50 backdrop-blur-xl
              border-2 rounded-2xl
              transition-all duration-300 ease-out
              ${
                isFocused
                  ? "border-primary/50 shadow-lg shadow-primary/5"
                  : "border-border/50 hover:border-border"
              }
            `}
          >
            {/* Search Icon */}
            <div className="pl-6">
              <Search
                className={`w-5 h-5 transition-colors ${
                  isFocused ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>

            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for projects, creators, or tags..."
              className="
                flex-1 py-4 bg-transparent 
                text-foreground placeholder:text-muted-foreground 
                outline-none text-base
              "
            />

            {/* Clear Button */}
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClear}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Search Button */}
            <button
              className="
                mr-2 px-6 py-2.5 
                bg-primary text-primary-foreground 
                rounded-xl font-medium
                hover:bg-primary/90
                transition-all duration-200
              "
            >
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute top-full mt-2 w-full 
                  bg-card/80 backdrop-blur-xl 
                  border border-border/50 
                  rounded-xl shadow-xl 
                  overflow-hidden
                "
              >
                <div className="p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-3">
                    Suggestions
                  </p>
                  <div className="space-y-0.5">
                    {["Design", "Development", "Art", "Photography"]
                      .filter((item) =>
                        item.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="
                            w-full text-left px-3 py-2.5 
                            rounded-lg 
                            hover:bg-muted/50 
                            transition-colors
                            text-foreground text-sm
                            flex items-center gap-2
                          "
                          onClick={() => setSearchQuery(suggestion)}
                        >
                          <Search className="w-3.5 h-3.5 text-muted-foreground" />
                          {suggestion}
                        </button>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trending Searches */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 text-muted-foreground mr-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Trending:</span>
          </div>
          {trendingSearches.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(tag)}
              className="
                px-4 py-1.5 
                bg-muted/50 backdrop-blur-sm
                border border-border/50 
                rounded-full 
                text-sm font-medium text-foreground
                hover:bg-primary/10 hover:border-primary/30 hover:text-primary
                transition-all duration-200
              "
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
