interface ProjectCTAProps {
  hasAvailableRoles: boolean;
  onApply: () => void;
}

export default function ProjectCTA({ hasAvailableRoles, onApply }: ProjectCTAProps) {
  if (hasAvailableRoles) {
    return (
      <div className="bg-gradient-to-r from-primary via-primary to-cyan-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Tertarik dengan Project Ini?
        </h3>
        <p className="text-sm sm:text-base text-white/90 mb-6">
          Apply sekarang dan jadilah bagian dari project yang amazing!
        </p>
        <button
          onClick={onApply}
          className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          Apply Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-muted border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center">
      <h3 className="text-xl sm:text-2xl font-bold text-muted-foreground mb-2">
        Semua Role Sudah Terisi
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4">
        Maaf, saat ini semua posisi sudah terisi. Silakan cek project lain.
      </p>
      <button
        disabled
        className="bg-muted text-muted-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg cursor-not-allowed opacity-50"
      >
        Project Penuh
      </button>
    </div>
  );
}
