// Detail interface for project roles
export interface RoleDetail {
    name: string;
    filled: boolean;
    description: string; // Penjelasan spesifik tentang role ini
    responsibilities: string[]; // Tanggung jawab role
    requirements: string[]; // Skill/requirement yang dibutuhkan
    contractDuration: string; // Durasi kontrak untuk role ini
    expectedOutput: string[]; // Output yang diharapkan dari role ini
}

// Initiator profile interface
export interface InitiatorProfile {
    name: string;
    role: string;
    location: string;
    avatar: string;
    bio: string; // Penjelasan tentang dirinya
    linkedinUrl?: string;
    portfolioUrl?: string;
    rating: number; // Rating 1-5
    totalProjects: number; // Total project yang pernah dibuat
    completedProjects: number; // Project yang selesai
    joinedDate: string; // Kapan join platform
}

// Project Detail interface
export interface ProjectDetail {
    id: number;
    slug: string;
    title: string;
    shortDescription: string; // Deskripsi singkat
    fullDescription: string; // Deskripsi lengkap
    objective: string; // Tujuan project
    thumbnail: string;
    category: string;
    type: "paid" | "free";
    budget?: string;
    deadline: string;
    rolesNeeded: RoleDetail[]; // Detail per role
    totalSlots: number;
    filledSlots: number;
    applicants: number;
    expectedDeliverables: string[]; // Output keseluruhan yang diharapkan
    projectTimeline: string; // Timeline keseluruhan project
    initiator: InitiatorProfile; // Profile pemberi project
    tags: string[];
    createdAt: string;
}

// Dummy data untuk 2 projects (1 PAID, 1 FREE)
export const projectDetailsData: Record<string, ProjectDetail> = {
    // PAID PROJECT
    "startup-competition-butuh-tim-lengkap": {
        id: 1,
        slug: "startup-competition-butuh-tim-lengkap",
        title: "Startup Competition - Butuh Tim Lengkap!",
        shortDescription: "Ikut lomba startup nasional, butuh CTO dan UI Designer untuk bikin MVP",
        fullDescription:
            "Kami sedang mempersiapkan untuk mengikuti kompetisi startup tingkat nasional yang akan diadakan 2 bulan lagi. Kompetisi ini merupakan salah satu kompetisi startup terbesar di Indonesia dengan total hadiah mencapai 500 juta rupiah. Kami sudah memiliki ide bisnis yang solid di bidang EdTech dan sudah melakukan riset pasar yang mendalam. Sekarang kami membutuhkan tim teknis yang kompeten untuk mewujudkan MVP (Minimum Viable Product) yang akan dipresentasikan di kompetisi.",
        objective:
            "Membangun MVP aplikasi EdTech yang inovatif untuk kompetisi startup nasional, dengan target memenangkan kompetisi dan mendapatkan pendanaan untuk pengembangan lebih lanjut.",
        thumbnail: "https://images.pexels.com/photos/7414050/pexels-photo-7414050.jpeg",
        category: "Competition",
        type: "paid",
        budget: "Rp500.000/orang",
        deadline: "7 hari lagi",
        totalSlots: 3,
        filledSlots: 1,
        applicants: 12,
        rolesNeeded: [
            {
                name: "CTO (Chief Technology Officer)",
                filled: false,
                description:
                    "Kami mencari seorang CTO yang berpengalaman untuk memimpin pengembangan teknis aplikasi EdTech kami. Anda akan bertanggung jawab atas arsitektur sistem, pemilihan teknologi, dan koordinasi tim developer.",
                responsibilities: [
                    "Merancang arsitektur sistem aplikasi EdTech yang scalable",
                    "Memimpin dan mengkoordinasi tim developer",
                    "Membuat keputusan teknis terkait teknologi yang digunakan",
                    "Melakukan code review dan memastikan kualitas kode",
                    "Berkolaborasi dengan tim bisnis untuk memahami kebutuhan produk",
                    "Menyiapkan dokumentasi teknis untuk presentasi kompetisi",
                ],
                requirements: [
                    "Minimal 2 tahun pengalaman sebagai Full Stack Developer",
                    "Menguasai Node.js/Python untuk backend",
                    "Menguasai React/Next.js untuk frontend",
                    "Pengalaman dengan database (PostgreSQL/MongoDB)",
                    "Memahami konsep microservices dan cloud deployment",
                    "Pengalaman memimpin tim developer (nilai plus)",
                    "Pernah ikut kompetisi startup/hackathon (nilai plus)",
                ],
                contractDuration: "3 bulan (persiapan + kompetisi + follow-up)",
                expectedOutput: [
                    "Arsitektur sistem yang terdokumentasi dengan baik",
                    "MVP aplikasi yang fully functional",
                    "API documentation lengkap",
                    "Deployment di cloud platform (AWS/GCP/Vercel)",
                    "Technical pitch deck untuk presentasi kompetisi",
                ],
            },
            {
                name: "UI/UX Designer",
                filled: false,
                description:
                    "Kami membutuhkan UI/UX Designer yang kreatif dan memahami prinsip user-centered design untuk menciptakan pengalaman pengguna yang luar biasa di aplikasi EdTech kami.",
                responsibilities: [
                    "Melakukan user research untuk memahami target pengguna",
                    "Membuat user flow dan information architecture",
                    "Mendesain wireframe dan prototype interaktif",
                    "Membuat design system yang konsisten",
                    "Melakukan usability testing",
                    "Berkolaborasi dengan developer untuk implementasi design",
                    "Menyiapkan design presentation untuk kompetisi",
                ],
                requirements: [
                    "Minimal 1 tahun pengalaman sebagai UI/UX Designer",
                    "Menguasai Figma/Adobe XD untuk design dan prototyping",
                    "Memahami prinsip UI/UX design dan design thinking",
                    "Portfolio design yang menarik (wajib)",
                    "Pengalaman design aplikasi mobile/web",
                    "Memahami accessibility dan responsive design",
                    "Pernah design untuk EdTech/startup (nilai plus)",
                ],
                contractDuration: "2.5 bulan (design sprint + revisi + support)",
                expectedOutput: [
                    "User research report dan user personas",
                    "Complete user flow dan sitemap",
                    "High-fidelity mockup untuk semua screens",
                    "Interactive prototype di Figma",
                    "Design system lengkap (colors, typography, components)",
                    "Design presentation deck untuk kompetisi",
                ],
            },
        ],
        expectedDeliverables: [
            "MVP aplikasi EdTech yang fully functional dan siap demo",
            "Design yang menarik dan user-friendly",
            "Dokumentasi teknis dan design lengkap",
            "Pitch deck untuk presentasi kompetisi",
            "Video demo aplikasi",
        ],
        projectTimeline: "2.5 bulan (hingga kompetisi selesai)",
        initiator: {
            name: "Ahmad Rizki",
            role: "Mahasiswa Semester 7 - Business Development",
            location: "Universitas Indonesia",
            avatar: "/avatar-1.jpg",
            bio: "Saya adalah mahasiswa Fakultas Ekonomi UI yang passionate di bidang entrepreneurship dan EdTech. Saya sudah pernah mengikuti 3 kompetisi bisnis dan memenangkan 2 diantaranya. Saya percaya bahwa teknologi dapat merevolusi cara kita belajar, dan saya ingin mewujudkan visi tersebut melalui startup ini.",
            linkedinUrl: "https://linkedin.com/in/ahmad-rizki",
            portfolioUrl: "https://ahmadrizki.com",
            rating: 4.8,
            totalProjects: 5,
            completedProjects: 4,
            joinedDate: "Januari 2025",
        },
        tags: ["Startup", "Competition", "Tech", "EdTech", "MVP"],
        createdAt: "15 Januari 2026",
    },

    // FREE PROJECT
    "hackathon-project-build-social-impact-app": {
        id: 2,
        slug: "hackathon-project-build-social-impact-app",
        title: "Hackathon Project - Build Social Impact App",
        shortDescription: "Bikin aplikasi untuk social impact, gratis tapi bisa untuk portfolio!",
        fullDescription:
            "Kami mengajak kamu untuk berkolaborasi dalam hackathon bertema 'Tech for Good' yang akan diadakan bulan depan. Project ini fokus pada pembuatan aplikasi mobile yang membantu menghubungkan donatur dengan penerima bantuan secara transparan. Meskipun ini adalah project gratis, ini adalah kesempatan emas untuk menambah portfolio, networking dengan profesional, dan berkontribusi untuk social impact. Tim yang menang akan mendapatkan mentoring dari industry experts dan kesempatan pitching ke investor.",
        objective:
            "Membangun aplikasi mobile berbasis social impact yang menghubungkan donatur dengan penerima bantuan, dengan sistem tracking donasi yang transparan menggunakan teknologi blockchain.",
        thumbnail: "https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg",
        category: "Hackathon",
        type: "free",
        deadline: "3 hari lagi",
        totalSlots: 3,
        filledSlots: 1,
        applicants: 8,
        rolesNeeded: [
            {
                name: "Backend Developer",
                filled: false,
                description:
                    "Kami mencari Backend Developer yang passionate tentang social impact dan tertarik belajar teknologi blockchain untuk sistem tracking donasi yang transparan.",
                responsibilities: [
                    "Membangun RESTful API untuk aplikasi donasi",
                    "Implementasi sistem autentikasi dan authorization",
                    "Integrasi dengan blockchain untuk tracking donasi",
                    "Membuat database schema yang efisien",
                    "Implementasi payment gateway integration",
                    "Berkolaborasi dengan mobile developer untuk API integration",
                ],
                requirements: [
                    "Menguasai Node.js/Express atau Python/Django",
                    "Pengalaman dengan database (PostgreSQL/MongoDB)",
                    "Memahami RESTful API design",
                    "Basic understanding tentang blockchain (akan ada learning session)",
                    "Pengalaman dengan Git dan collaborative development",
                    "Passionate tentang social impact",
                ],
                contractDuration: "1.5 bulan (development + hackathon + polish)",
                expectedOutput: [
                    "RESTful API yang terdokumentasi",
                    "Database schema dan migration scripts",
                    "Blockchain integration untuk donation tracking",
                    "Payment gateway integration",
                    "API testing dan documentation",
                ],
            },
            {
                name: "Mobile Developer",
                filled: false,
                description:
                    "Kami butuh Mobile Developer yang bisa membuat aplikasi mobile yang intuitif dan engaging untuk platform iOS dan Android menggunakan React Native atau Flutter.",
                responsibilities: [
                    "Develop aplikasi mobile untuk iOS dan Android",
                    "Implementasi UI/UX design yang sudah dibuat",
                    "Integrasi dengan backend API",
                    "Implementasi push notification",
                    "Optimasi performa aplikasi",
                    "Testing di berbagai devices",
                ],
                requirements: [
                    "Menguasai React Native atau Flutter",
                    "Pengalaman develop aplikasi mobile minimal 6 bulan",
                    "Memahami mobile UI/UX best practices",
                    "Pengalaman dengan API integration",
                    "Familiar dengan state management (Redux/Provider)",
                    "Portfolio aplikasi mobile (nilai plus)",
                ],
                contractDuration: "1.5 bulan (development + hackathon + polish)",
                expectedOutput: [
                    "Aplikasi mobile untuk iOS dan Android",
                    "Clean code dengan proper architecture",
                    "Smooth animations dan transitions",
                    "Offline capability untuk basic features",
                    "App ready untuk demo di hackathon",
                ],
            },
        ],
        expectedDeliverables: [
            "Aplikasi mobile yang fully functional",
            "Backend API dengan blockchain integration",
            "Presentasi untuk hackathon",
            "Demo video aplikasi",
            "Source code di GitHub dengan dokumentasi",
        ],
        projectTimeline: "1.5 bulan (hingga hackathon selesai)",
        initiator: {
            name: "Sarah Putri",
            role: "Mahasiswa Semester 5 - Computer Science",
            location: "Institut Teknologi Bandung",
            avatar: "/avatar-2.jpg",
            bio: "Halo! Saya Sarah, mahasiswa Informatika ITB yang passionate tentang menggunakan teknologi untuk social good. Saya sudah pernah mengikuti 2 hackathon dan memenangkan 1 hackathon bertema sustainability. Saya percaya bahwa teknologi harus accessible dan memberikan impact positif untuk masyarakat. Let's build something meaningful together!",
            linkedinUrl: "https://linkedin.com/in/sarah-putri",
            rating: 4.9,
            totalProjects: 3,
            completedProjects: 3,
            joinedDate: "November 2025",
        },
        tags: ["Hackathon", "Social Impact", "Mobile", "Blockchain", "Tech for Good"],
        createdAt: "17 Januari 2026",
    },
};
