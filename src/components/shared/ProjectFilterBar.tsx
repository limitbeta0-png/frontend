"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

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
  
  // Filter dropdowns configuration
  topRightFilter?: FilterConfig; // New prop for the filter next to search
  filters?: FilterConfig[]; // Remaining filters for the bottom row
  
  // Search button
  onSearchClick?: () => void;
  showSearchButton?: boolean;
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
        className={`w-full flex items-center gap-2 px-4 py-2.5 bg-background border rounded-lg text-sm transition-all duration-200 justify-between ${
          isOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex items-center gap-2 truncate text-muted-foreground group-hover:text-foreground">
          {icon}
          <span className={`truncate ${value !== "all" ? "text-foreground font-medium" : ""}`}>
             {selectedOption?.label || label}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
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
  topRightFilter,
  filters = [],
  onSearchClick,
  showSearchButton = true,
}: ProjectFilterBarProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm space-y-4">
      
      {/* 1. Top Row: Tabs */}
      {tabs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange?.(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedTab === tab.value
                  ? "bg-primary border-primary text-white shadow-md hover:bg-primary/90" // Custom dark blue from image
                  : "bg-transparent border-slate-300 text-slate-600 hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* 2. Middle Row: Search + Location + Button */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input - Grows to fill space */}
        {onSearchChange && (
          <div className="flex-grow">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-[46px] px-4 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>
        )}

        {/* Top Right Filter (e.g., Location) */}
        {topRightFilter && (
          <div className="w-full md:w-[200px] shrink-0">
            <FilterDropdown
               {...topRightFilter}
               className="w-full h-[46px]"
            />
          </div>
        )}

        {/* Search Button */}
        {showSearchButton && (
          <div className="shrink-0">
            <button
              onClick={onSearchClick}
              className="h-[46px] w-[46px] bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-lg transition-colors flex items-center justify-center shadow-sm active:scale-95 duration-200"
            >
              <BoxSearchIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Bottom Row: Grid Filters */}
      {filters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
  );
}

// Simple search icon component replacement for lucide 'Search' to match the 'box' style if needed, 
// using generic Search for now but styled properly.
import { Search as BoxSearchIcon } from "lucide-react";
