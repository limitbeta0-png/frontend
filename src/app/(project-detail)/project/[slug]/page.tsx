"use client";

import { useState, use } from "react";
import { projectDetailsData } from "@/data/projectDetails";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import AuthModal from "@/components/shared/AuthModal";
import {
  Clock,
  DollarSign,
  Award,
  MapPin,
  Calendar,
  Target,
  CheckCircle2,
  Star,
  Linkedin,
  Globe,
  Briefcase,
  TrendingUp,
  Users,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const project = projectDetailsData[slug];
  const [activeRoleTab, setActiveRoleTab] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!project) {
    notFound();
  }

  const availableRoles = project.rolesNeeded.filter((role) => !role.filled);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>

        {/* Floating Badge */}
        <div className="absolute top-6 right-6 z-10">
          <span
            className={`text-sm font-bold px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-2 ${
              project.type === "paid"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900"
                : "bg-gradient-to-r from-green-400 to-green-500 text-green-900"
            }`}
          >
            {project.type === "paid" ? (
              <>
                <DollarSign className="h-4 w-4" />
                PAID PROJECT
              </>
            ) : (
              <>
                <Award className="h-4 w-4" />
                FREE PROJECT
              </>
            )}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                    {project.category}
                  </span>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h1>
                  <p className="text-muted-foreground">{project.shortDescription}</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{project.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{project.projectTimeline}</span>
                </div>
                {project.type === "paid" && project.budget && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-yellow-500" />
                    <span className="text-foreground font-bold">{project.budget}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {project.filledSlots}/{project.totalSlots} slots filled
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <UserPlus className="h-4 w-4 text-primary" />
                  <span className="text-foreground font-medium">
                    <span className="font-bold text-primary">{project.applicants}</span> orang sudah apply
                  </span>
                </div>
              </div>
            </div>

            {/* About Project */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Tentang Project
              </h2>
              <p className="text-foreground leading-relaxed mb-6">
                {project.fullDescription}
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Tujuan Project
                </h3>
                <p className="text-foreground">{project.objective}</p>
              </div>
            </div>

            {/* Expected Deliverables */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Output yang Diharapkan
              </h2>
              <ul className="space-y-3">
                {project.expectedDeliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Roles Needed - Tab Navigation */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                Role yang Dibutuhkan
              </h2>

              {/* Tab Headers */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {project.rolesNeeded.map((role, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveRoleTab(idx)}
                    disabled={role.filled}
                    className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all whitespace-nowrap relative ${
                      activeRoleTab === idx
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : role.filled
                        ? "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-60"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {role.name}
                    {role.filled && (
                      <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                        FILLED
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {project.rolesNeeded.map((role, idx) => (
                <div
                  key={idx}
                  className={`space-y-6 ${activeRoleTab === idx ? "block" : "hidden"}`}
                >
                  {role.filled ? (
                    // Filled Role Message
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Role Ini Sudah Terisi
                      </h3>
                      <p className="text-muted-foreground">
                        Posisi {role.name} sudah diisi oleh kandidat yang terpilih.
                        Silakan cek role lain yang masih tersedia.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Role Description */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Deskripsi Role</h3>
                        <p className="text-muted-foreground">{role.description}</p>
                      </div>

                      {/* Responsibilities */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Tanggung Jawab</h3>
                        <ul className="space-y-2">
                          {role.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-foreground">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Requirements</h3>
                        <ul className="space-y-2">
                          {role.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-foreground">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expected Output for this Role */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">
                          Output yang Diharapkan dari Role Ini
                        </h3>
                        <ul className="space-y-2">
                          {role.expectedOutput.map((output, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Target className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                              <span className="text-foreground">{output}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contract Duration */}
                      <div className="bg-accent/50 border border-border rounded-xl p-4">
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Durasi Kontrak
                        </h3>
                        <p className="text-foreground font-medium">{role.contractDuration}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Apply Button */}
            {availableRoles.length > 0 ? (
              <div className="bg-gradient-to-r from-primary to-cyan-600 rounded-2xl p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Tertarik dengan Project Ini?
                </h3>
                <p className="text-white/90 mb-6">
                  Apply sekarang dan jadilah bagian dari project yang amazing!
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Apply Now
                </button>
              </div>
            ) : (
              <div className="bg-muted border border-border rounded-2xl p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-muted-foreground mb-2">
                  Semua Role Sudah Terisi
                </h3>
                <p className="text-muted-foreground mb-4">
                  Maaf, saat ini semua posisi untuk project ini sudah terisi.
                  Silakan cek project lain yang tersedia.
                </p>
                <button
                  disabled
                  className="bg-muted text-muted-foreground px-8 py-4 rounded-xl font-bold text-lg cursor-not-allowed opacity-50"
                >
                  Project Penuh
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Initiator Profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Initiator Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-foreground mb-4">Project Initiator</h3>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
                    {project.initiator.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{project.initiator.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.initiator.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(project.initiator.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">{project.initiator.rating}</span>
                  <span className="text-sm text-muted-foreground">rating</span>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <h5 className="font-semibold text-foreground mb-2">Tentang</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.initiator.bio}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-accent/50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-primary">
                      {project.initiator.totalProjects}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Projects</p>
                  </div>
                  <div className="bg-accent/50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-500">
                      {project.initiator.completedProjects}
                    </p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>

                {/* Location & Join Date */}
                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{project.initiator.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Joined {project.initiator.joinedDate}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  {project.initiator.linkedinUrl && (
                    <a
                      href={project.initiator.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn Profile
                    </a>
                  )}
                  {project.initiator.portfolioUrl && (
                    <a
                      href={project.initiator.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      Portfolio Website
                    </a>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20" />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
