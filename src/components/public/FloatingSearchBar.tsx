"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          relative flex items-center gap-3
          bg-card/80 backdrop-blur-xl
          border-2 rounded-2xl
          shadow-lg
          transition-all duration-300 ease-out
          ${
            isFocused
              ? "border-primary/50 shadow-xl shadow-primary/10"
              : "border-border/50 hover:border-border"
          }
        `}
      >
        {/* Search Icon */}
        <div className="pl-5">
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
            flex-1 py-3 bg-transparent 
            text-foreground placeholder:text-muted-foreground 
            outline-none text-sm
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
            mr-2 px-5 py-2 
            bg-primary text-primary-foreground 
            rounded-xl font-medium text-sm
            hover:bg-primary/90
            transition-all duration-200
          "
        >
          Search
        </button>
      </motion.div>

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
              bg-card/90 backdrop-blur-xl 
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
  );
}
