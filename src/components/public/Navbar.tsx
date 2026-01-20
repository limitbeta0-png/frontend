"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, Bell, ChevronDown, ChevronUp, User, Settings, LogOut, Briefcase, Code, Palette, Gamepad2, Smartphone, Database, Globe } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AuthModal from "@/components/shared/AuthModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileCategoriesExpanded, setIsMobileCategoriesExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Toggle ini untuk demo - ubah jadi true untuk lihat logged-in state
  const isLoggedIn = false; // Ubah ke false untuk lihat logged-out state
  const hasNotifications = true; // Ubah ke false untuk hide notification badge
  const notificationCount = 3; // Jumlah notifikasi

  const categories = [
    { icon: Code, name: "Web Development", count: 24, href: "/categories/web-dev" },
    { icon: Palette, name: "UI/UX Design", count: 18, href: "/categories/ui-ux" },
    { icon: Briefcase, name: "Business", count: 12, href: "/categories/business" },
    { icon: Gamepad2, name: "Game Dev", count: 8, href: "/categories/game-dev" },
    // Extra categories for testing
    { icon: Smartphone, name: "Mobile App", count: 15, href: "/categories/mobile-app" },
    { icon: Database, name: "Data Science", count: 6, href: "/categories/data-science" },
    { icon: Globe, name: "Digital Marketing", count: 10, href: "/categories/marketing" },
    { icon: Code, name: "DevOps", count: 5, href: "/categories/devops" }, 
  ];

  // Logic: 
  // - Close: Show 4
  // - Open: Show 7
  // - If Total > 7: Show "See All" link to /projects
  const MAX_VISIBLE_MOBILE = 7;
  const INITIAL_VISIBLE_MOBILE = 4;
  
  const displayedMobileCategories = isMobileCategoriesExpanded 
    ? categories.slice(0, MAX_VISIBLE_MOBILE) 
    : categories.slice(0, INITIAL_VISIBLE_MOBILE);
    
  const remainingCount = categories.length - MAX_VISIBLE_MOBILE;

  return (
    <nav role="navigation" aria-label="Main Navigation" className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Coollabs Home">
              <Image
                src="/logo-white-mode.svg"
                alt="Coollabs Logo"
                width={120}
                height={50}
                className="h-10 w-auto dark:hidden"
                priority
              />
              <Image
                src="/logo-dark-mode.svg"
                alt="Coollabs Logo"
                width={120}
                height={50}
                className="h-10 w-auto hidden dark:block"
                priority
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div
              className={`relative w-full transition-all duration-200 ${
                searchFocused ? "scale-[1.01]" : ""
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  className={`h-5 w-5 transition-colors ${
                    searchFocused ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Temukan project impianmu di sini..."
                aria-label="Search projects"
                className="block w-full pl-11 pr-4 py-2.5 border border-input rounded-lg 
                         bg-muted text-foreground placeholder:text-muted-foreground text-sm
                         focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary
                         focus:bg-background transition-all duration-200"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Kategori Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onBlur={() => setTimeout(() => setIsCategoryOpen(false), 200)}
                aria-expanded={isCategoryOpen}
                aria-haspopup="true"
                className="flex items-center space-x-1 px-4 py-2 text-foreground hover:text-primary font-medium transition-colors duration-200 text-sm"
              >
                <span>Kategori</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Kategori Dropdown Menu */}
              {isCategoryOpen && (
                <div role="menu" className="absolute top-full mt-2 w-56 bg-popover rounded-lg shadow-lg border border-border py-2">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.href}
                      role="menuitem"
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm text-popover-foreground">{category.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{category.count}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Buka Open Project - Primary CTA */}
            <button className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 text-sm">
              Open Project
            </button>

            {/* Cara Memulai? */}
            <Link
              href="/guide"
              className="px-4 py-2 text-foreground hover:text-primary font-medium transition-colors duration-200 text-sm"
            >
              Cara Memulai?
            </Link>

            {/* Conditional: Logged In vs Logged Out */}
            {isLoggedIn ? (
              <>
                {/* Notification Bell */}
                <button 
                  aria-label="Notifications"
                  className="relative p-2 text-foreground hover:bg-accent rounded-lg transition-colors duration-200"
                >
                  <Bell className="h-5 w-5" />
                  {hasNotifications && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* User Avatar & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                    aria-label="User menu"
                    aria-expanded={isProfileOpen}
                    className="flex items-center space-x-2 p-1 hover:bg-accent rounded-lg transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-cyan-600 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      JD
                    </div>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div role="menu" className="absolute right-0 top-full mt-2 w-56 bg-popover rounded-lg shadow-lg border border-border py-2">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-popover-foreground">John Doe</p>
                        <p className="text-xs text-muted-foreground">john@university.edu</p>
                      </div>
                      <Link href="/profile" role="menuitem" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent transition-colors">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-popover-foreground">Profile Saya</span>
                      </Link>
                      <Link href="/my-projects" role="menuitem" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent transition-colors">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-popover-foreground">Project Saya</span>
                      </Link>
                      <Link href="/settings" role="menuitem" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent transition-colors">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-popover-foreground">Pengaturan</span>
                      </Link>
                      <div className="border-t border-border mt-2 pt-2">
                        <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-accent transition-colors text-destructive">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Logged Out State */
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 text-foreground hover:text-primary font-medium transition-colors duration-200 text-sm"
              >
                Login
              </button>
            )}

            <div className="border-1 border-border h-6"></div>

            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-lg text-foreground hover:bg-accent transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Cari project Web Dev, UI/UX, Mobile App..."
              aria-label="Search"
              className="block w-full pl-11 pr-4 py-2.5 border border-input rounded-lg 
                       bg-muted text-foreground placeholder:text-muted-foreground text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary
                       focus:bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-2">
            {/* Kategori - Mobile */}
            <div className="border-b border-border pb-2 mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Kategori</p>
              
              {/* Limited Categories Display */}
              {displayedMobileCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="flex items-center justify-between px-3 py-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <category.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{category.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </Link>
              ))}

              {/* Action Buttons */}
              <div className="space-y-1 mt-1">
                {/* 1. Toggle Button (Show 7 or 4) */}
                {categories.length > INITIAL_VISIBLE_MOBILE && !isMobileCategoriesExpanded && (
                   <button
                   onClick={() => setIsMobileCategoriesExpanded(true)}
                   className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                 >
                   Lihat Lebih Detail <ChevronDown className="h-3.5 w-3.5" />
                 </button>
                )}

                {/* 2. Show Less Button */}
                {isMobileCategoriesExpanded && (
                   <button
                   onClick={() => setIsMobileCategoriesExpanded(false)}
                   className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                 >
                   Sembunyikan <ChevronUp className="h-3.5 w-3.5" />
                 </button>
                )}

                {/* 3. "See All" Link if Total > MAX_VISIBLE_MOBILE (7) & Expanded */}
                {isMobileCategoriesExpanded && categories.length > MAX_VISIBLE_MOBILE && (
                  <Link
                    href="/projects"
                    className="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors border border-primary/20 bg-primary/5"
                  >
                    Lihat Semua Kategori Lainnya ({remainingCount}+)
                  </Link>
                )}
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 text-left">
              Open Project
            </button>
            <Link
              href="/guide"
              className="block px-4 py-3 text-foreground hover:bg-accent hover:text-primary rounded-lg font-medium transition-colors duration-200"
            >
              Cara Memulai?
            </Link>

            {/* Mobile: Logged In vs Logged Out */}
            {isLoggedIn ? (
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex items-center space-x-3 px-4 py-3 bg-muted rounded-lg mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyan-600 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@university.edu</p>
                  </div>
                </div>
                <Link href="/profile" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent rounded-lg transition-colors">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Profile Saya</span>
                </Link>
                <Link href="/my-projects" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent rounded-lg transition-colors">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Project Saya</span>
                </Link>
                <Link href="/notifications" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent rounded-lg transition-colors">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Notifikasi</span>
                  {hasNotifications && (
                    <span className="ml-auto w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                <Link href="/settings" className="flex items-center space-x-3 px-4 py-2.5 hover:bg-accent rounded-lg transition-colors">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Pengaturan</span>
                </Link>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-destructive/10 rounded-lg transition-colors text-destructive mt-2">
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="block w-full px-4 py-3 text-foreground hover:bg-accent hover:text-primary rounded-lg font-medium transition-colors duration-200 text-left"
              >
                Login
              </button>
            )}

            {/* Dark Mode Toggle - Mobile */}
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
}
