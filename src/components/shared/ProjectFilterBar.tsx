"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Filter, SlidersHorizontal, ChevronDown, Check, X } from "lucide-react";

// Types
export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  colSpan?: number; // For grid layout control
}

export interface TabConfig {
  label: string;
  value: string;
}

interface ProjectFilterBarProps {
  // Tab configuration
  tabs?: TabConfig[];
  selectedTab?: string;
  onTabChange?: (value: string) => void;
  
  // Search configuration
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  
  // Filter dropdowns configuration
  topRightFilter?: FilterConfig; // New prop for the filter next to search
  filters?: FilterConfig[]; // Remaining filters for the bottom row
  
  // Search button
  onSearchClick?: () => void;
  showSearchButton?: boolean;
  
  // Suggestions data (optional - for autocomplete)
  suggestions?: {
    projects?: string[];
    tags?: string[];
    cities?: string[];
    majors?: string[];
  };
}

// Reusable Dropdown Component
interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

function FilterDropdown({ label, value, options, onChange, icon, className = "" }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-background border rounded-lg text-xs sm:text-sm transition-all duration-200 justify-between ${
          isOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex items-center gap-2 truncate text-muted-foreground group-hover:text-foreground">
          {icon}
          <span className={`truncate ${value !== "all" ? "text-foreground font-medium" : ""}`}>
             {selectedOption?.label || label}
          </span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1 max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group ${
                  value === option.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {option.label}
                {value === option.value && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Main Filter Bar Component
export default function ProjectFilterBar({
  tabs = [],
  selectedTab,
  onTabChange,
  searchPlaceholder = "Cari...",
  searchValue = "",
  onSearchChange,
  onSearchKeyPress,
  topRightFilter,
  filters = [],
  onSearchClick,
  showSearchButton = true,
  suggestions,
}: ProjectFilterBarProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Generate filtered suggestions based on search input
  const filteredSuggestions = useMemo(() => {
    if (!searchValue || searchValue.length < 2 || !suggestions) {
      return { projects: [], tags: [], cities: [], majors: [] };
    }

    const query = searchValue.toLowerCase();
    return {
      projects: (suggestions.projects || []).filter((p: string) => p.toLowerCase().includes(query)).slice(0, 5),
      tags: (suggestions.tags || []).filter((t: string) => t.toLowerCase().includes(query)).slice(0, 3),
      cities: (suggestions.cities || []).filter((c: string) => c.toLowerCase().includes(query)).slice(0, 3),
      majors: (suggestions.majors || []).filter((m: string) => m.toLowerCase().includes(query)).slice(0, 3),
    };
  }, [searchValue, suggestions]);

  // Flatten suggestions for keyboard navigation
  const allSuggestions = useMemo(() => {
    const all: Array<{ type: string; value: string }> = [];
    filteredSuggestions.projects.forEach((p: string) => all.push({ type: 'Project', value: p }));
    filteredSuggestions.tags.forEach((t: string) => all.push({ type: 'Tag', value: t }));
    filteredSuggestions.cities.forEach((c: string) => all.push({ type: 'City', value: c }));
    filteredSuggestions.majors.forEach((m: string) => all.push({ type: 'Major', value: m }));
    return all;
  }, [filteredSuggestions]);

  const hasSuggestions = allSuggestions.length > 0;

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || !hasSuggestions) {
      if (e.key === 'Enter') {
        onSearchKeyPress?.(e);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(allSuggestions[selectedSuggestionIndex].value);
        } else {
          onSearchKeyPress?.(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (value: string) => {
    onSearchChange?.(value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    // Trigger search immediately when suggestion is clicked
    setTimeout(() => {
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' }) as any;
      onSearchKeyPress?.(enterEvent);
    }, 0);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-5 lg:mb-6 shadow-sm space-y-3 sm:space-y-4">
        
        {/* 1. Top Row: Tabs (Hidden on mobile) */}
        {tabs.length > 0 && (
          <div className="hidden lg:flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  selectedTab === tab.value
                    ? "bg-primary border-primary text-white shadow-md hover:bg-primary/90"
                    : "bg-transparent border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* 2. Search Row */}
        <div className="flex gap-2 sm:gap-3">
          {/* Search Input with Autocomplete */}
          {onSearchChange && (
            <div className="flex-grow relative" ref={searchRef}>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSuggestions(true);
                  setSelectedSuggestionIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => searchValue.length >= 2 && setShowSuggestions(true)}
                className="w-full h-[40px] sm:h-[46px] px-3 sm:px-4 pr-10 bg-background border border-border rounded-lg text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />

              {/* Clear Button (X) - Only show when there's text */}
              {searchValue && (
                <button
                  onClick={() => {
                    onSearchChange("");
                    setShowSuggestions(false);
                    setSelectedSuggestionIndex(-1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors group"
                  type="button"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && hasSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[400px] overflow-y-auto">
                  {/* Projects */}
                  {filteredSuggestions.projects.length > 0 && (
                    <div className="py-2">
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground">Projects</div>
                      {filteredSuggestions.projects.map((project, idx) => {
                        const globalIdx = idx;
                        return (
                          <button
                            key={`project-${idx}`}
                            onClick={() => handleSuggestionClick(project)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${
                              selectedSuggestionIndex === globalIdx ? 'bg-primary/10 text-primary' : 'text-foreground'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <BoxSearchIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                              <span className="truncate">{project}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Tags */}
                  {filteredSuggestions.tags.length > 0 && (
                    <div className="py-2 border-t border-border">
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground">Tags</div>
                      {filteredSuggestions.tags.map((tag, idx) => {
                        const globalIdx = filteredSuggestions.projects.length + idx;
                        return (
                          <button
                            key={`tag-${idx}`}
                            onClick={() => handleSuggestionClick(tag)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${
                              selectedSuggestionIndex === globalIdx ? 'bg-primary/10 text-primary' : 'text-foreground'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">#{tag}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Cities */}
                  {filteredSuggestions.cities.length > 0 && (
                    <div className="py-2 border-t border-border">
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground">Locations</div>
                      {filteredSuggestions.cities.map((city, idx) => {
                        const globalIdx = filteredSuggestions.projects.length + filteredSuggestions.tags.length + idx;
                        return (
                          <button
                            key={`city-${idx}`}
                            onClick={() => handleSuggestionClick(city)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${
                              selectedSuggestionIndex === globalIdx ? 'bg-primary/10 text-primary' : 'text-foreground'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">📍</span>
                              <span>{city}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Majors */}
                  {filteredSuggestions.majors.length > 0 && (
                    <div className="py-2 border-t border-border">
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground">Majors</div>
                      {filteredSuggestions.majors.map((major, idx) => {
                        const globalIdx = filteredSuggestions.projects.length + filteredSuggestions.tags.length + filteredSuggestions.cities.length + idx;
                        return (
                          <button
                            key={`major-${idx}`}
                            onClick={() => handleSuggestionClick(major)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${
                              selectedSuggestionIndex === globalIdx ? 'bg-primary/10 text-primary' : 'text-foreground'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">🎓</span>
                              <span>{major}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Mobile: Filter Button */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="lg:hidden h-[40px] sm:h-[46px] px-3 sm:px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm flex-shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">Filter</span>
          </button>

          {/* Desktop: Top Right Filter + Search Button */}
          <div className="hidden lg:flex gap-3 flex-shrink-0">
            {topRightFilter && (
              <div className="w-[200px]">
                <FilterDropdown
                   {...topRightFilter}
                   className="w-full"
                />
              </div>
            )}

            {showSearchButton && (
              <button
                onClick={onSearchClick}
                className="h-[46px] w-[46px] bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-lg transition-colors flex items-center justify-center shadow-sm active:scale-95 duration-200"
              >
                <BoxSearchIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Desktop: Grid Filters */}
        {filters.length > 0 && (
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filters.map((filter, index) => (
              <div key={index} className={`col-span-1 ${filter.colSpan ? `lg:col-span-${filter.colSpan}` : ''}`}>
                <FilterDropdown
                  label={filter.label}
                  value={filter.value}
                  onChange={filter.onChange}
                  options={filter.options}
                  icon={filter.icon}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsFilterModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
              <h3 className="text-lg font-bold text-foreground">Filter</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(85vh-64px)] space-y-4">
              {/* Tabs */}
              {tabs.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">Tipe</label>
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => onTabChange?.(tab.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          selectedTab === tab.value
                            ? "bg-primary border-primary text-white"
                            : "bg-transparent border-border text-foreground hover:border-primary"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Right Filter */}
              {topRightFilter && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">{topRightFilter.label}</label>
                  <FilterDropdown {...topRightFilter} className="w-full" />
                </div>
              )}

              {/* All Filters */}
              {filters.map((filter, index) => (
                <div key={index}>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">{filter.label}</label>
                  <FilterDropdown
                    label={filter.label}
                    value={filter.value}
                    onChange={filter.onChange}
                    options={filter.options}
                    icon={filter.icon}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border sticky bottom-0 bg-background">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple search icon component replacement for lucide 'Search' to match the 'box' style if needed, 
// using generic Search for now but styled properly.
import { Search as BoxSearchIcon } from "lucide-react";
