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
    // Filter fields
    major: string[]; // Jurusan yang dibutuhkan (bisa lebih dari 1)
    workType: "offline" | "online" | "hybrid"; // Tipe pekerjaan
    requirementLevel: "open-for-all" | "campus-only" | "professional"; // Level requirement
    city: string; // Lokasi kota (berbeda dari universitas)
    university?: string; // Universitas (optional, untuk campus-only)
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
        // Filter fields
        major: ["Teknik Informatika", "Sistem Informasi", "Desain Komunikasi Visual"],
        workType: "hybrid",
        requirementLevel: "campus-only",
        city: "Jakarta",
        university: "Universitas Indonesia",
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
        // Filter fields
        major: ["Teknik Informatika", "Teknik Komputer", "Ilmu Komputer"],
        workType: "online",
        requirementLevel: "open-for-all",
        city: "Bandung",
        university: "Institut Teknologi Bandung",
    },

    // PAID PROJECT - Web Development
    "website-company-profile-butuh-developer": {
        id: 3,
        slug: "website-company-profile-butuh-developer",
        title: "Website Company Profile - Butuh Developer",
        shortDescription: "Bikin website company profile untuk startup, paid project",
        fullDescription:
            "Kami adalah startup di bidang teknologi yang sedang berkembang pesat dan membutuhkan website company profile yang profesional dan modern. Website ini akan menjadi wajah perusahaan kami di dunia digital dan harus mencerminkan nilai-nilai inovasi dan profesionalisme kami. Kami mencari developer yang berpengalaman untuk membangun website yang responsive, fast-loading, dan SEO-friendly.",
        objective:
            "Membangun website company profile yang profesional dengan design modern, performa optimal, dan SEO-friendly untuk meningkatkan brand awareness dan kredibilitas perusahaan.",
        thumbnail: "https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg",
        category: "Web Development",
        type: "paid",
        budget: "Rp1.000.000/orang",
        deadline: "14 hari lagi",
        totalSlots: 2,
        filledSlots: 0,
        applicants: 15,
        rolesNeeded: [
            {
                name: "Frontend Developer",
                filled: false,
                description:
                    "Kami mencari Frontend Developer yang ahli dalam membuat website yang beautiful dan responsive dengan performa yang optimal.",
                responsibilities: [
                    "Develop responsive website menggunakan modern framework",
                    "Implementasi design dari Figma ke code",
                    "Optimasi performa website (Core Web Vitals)",
                    "Implementasi SEO best practices",
                    "Cross-browser testing dan bug fixing",
                    "Integrasi dengan backend API",
                ],
                requirements: [
                    "Menguasai React/Next.js atau Vue/Nuxt.js",
                    "Pengalaman dengan Tailwind CSS atau CSS frameworks",
                    "Memahami responsive design principles",
                    "Pengalaman dengan Git dan modern development workflow",
                    "Portfolio website yang menarik (wajib)",
                    "Pengalaman dengan SEO optimization (nilai plus)",
                ],
                contractDuration: "1 bulan (development + revisi)",
                expectedOutput: [
                    "Responsive website untuk desktop, tablet, dan mobile",
                    "Clean dan maintainable code",
                    "Optimized assets dan fast loading time",
                    "SEO-friendly structure",
                    "Documentation untuk maintenance",
                ],
            },
            {
                name: "Backend Developer",
                filled: false,
                description:
                    "Kami butuh Backend Developer untuk membuat CMS sederhana dan API untuk website company profile kami.",
                responsibilities: [
                    "Develop RESTful API untuk content management",
                    "Setup CMS untuk manage website content",
                    "Implementasi contact form dengan email notification",
                    "Database design dan optimization",
                    "API documentation",
                    "Deploy ke production server",
                ],
                requirements: [
                    "Menguasai Node.js/Express atau PHP/Laravel",
                    "Pengalaman dengan database (MySQL/PostgreSQL)",
                    "Memahami RESTful API design",
                    "Pengalaman dengan CMS (Strapi/Directus/WordPress)",
                    "Familiar dengan cloud deployment (Vercel/Netlify/AWS)",
                ],
                contractDuration: "1 bulan (development + deployment)",
                expectedOutput: [
                    "RESTful API yang terdokumentasi",
                    "CMS untuk content management",
                    "Contact form dengan email integration",
                    "Deployed backend di production",
                    "API documentation dan user guide",
                ],
            },
        ],
        expectedDeliverables: [
            "Website company profile yang fully functional",
            "CMS untuk manage content",
            "Source code dengan dokumentasi",
            "Deployed website di production",
            "User guide untuk maintenance",
        ],
        projectTimeline: "1 bulan (development + deployment)",
        initiator: {
            name: "Budi Santoso",
            role: "Startup Founder & CEO",
            location: "Jakarta",
            avatar: "/avatar-3.jpg",
            bio: "Saya adalah founder startup teknologi yang fokus pada digital transformation untuk UMKM. Kami sudah memiliki beberapa klien dan sekarang ingin meningkatkan brand presence kami melalui website yang profesional. Saya percaya bahwa website yang baik adalah investasi penting untuk pertumbuhan bisnis.",
            linkedinUrl: "https://linkedin.com/in/budi-santoso",
            portfolioUrl: "https://budisantoso.com",
            rating: 4.7,
            totalProjects: 4,
            completedProjects: 3,
            joinedDate: "Desember 2025",
        },
        tags: ["Web Dev", "Startup", "Paid"],
        createdAt: "12 Januari 2026",
        major: ["Teknik Informatika", "Sistem Informasi"],
        workType: "offline",
        requirementLevel: "professional",
        city: "Jakarta",
    },

    // FREE PROJECT - Research
    "research-project-data-analysis": {
        id: 4,
        slug: "research-project-data-analysis",
        title: "Research Project - Data Analysis",
        shortDescription: "Butuh tim untuk research project tentang AI, free collaboration",
        fullDescription:
            "Kami sedang melakukan penelitian tentang penerapan AI dalam prediksi pola konsumsi energi di Indonesia. Penelitian ini akan dipublikasikan di jurnal internasional dan dipresentasikan di konferensi. Kami mencari mahasiswa atau profesional yang passionate tentang AI dan data science untuk berkolaborasi dalam penelitian ini. Meskipun tidak berbayar, ini adalah kesempatan bagus untuk menambah publikasi dan pengalaman riset.",
        objective:
            "Melakukan penelitian tentang AI untuk prediksi konsumsi energi dengan target publikasi di jurnal internasional bereputasi.",
        thumbnail: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
        category: "Research",
        type: "free",
        deadline: "30 hari lagi",
        totalSlots: 3,
        filledSlots: 1,
        applicants: 6,
        rolesNeeded: [
            {
                name: "Data Scientist",
                filled: false,
                description:
                    "Kami mencari Data Scientist untuk melakukan analisis data dan modeling untuk penelitian AI kami.",
                responsibilities: [
                    "Data cleaning dan preprocessing",
                    "Exploratory Data Analysis (EDA)",
                    "Feature engineering",
                    "Model development dan tuning",
                    "Statistical analysis dan validation",
                    "Menulis bagian methodology di paper",
                ],
                requirements: [
                    "Menguasai Python (Pandas, NumPy, Scikit-learn)",
                    "Pengalaman dengan statistical analysis",
                    "Memahami machine learning algorithms",
                    "Pengalaman dengan data visualization (Matplotlib, Seaborn)",
                    "Familiar dengan Jupyter Notebook",
                    "Pengalaman menulis paper (nilai plus)",
                ],
                contractDuration: "3 bulan (research + paper writing)",
                expectedOutput: [
                    "Clean dataset siap untuk modeling",
                    "EDA report dengan insights",
                    "Trained ML models dengan evaluation metrics",
                    "Methodology section untuk paper",
                    "Code repository dengan dokumentasi",
                ],
            },
            {
                name: "ML Engineer",
                filled: false,
                description:
                    "Kami butuh ML Engineer untuk implementasi dan deployment model AI yang sudah dikembangkan.",
                responsibilities: [
                    "Implementasi ML models untuk production",
                    "Model optimization dan tuning",
                    "Setup MLOps pipeline",
                    "Performance monitoring",
                    "Documentation dan reproducibility",
                ],
                requirements: [
                    "Menguasai Python dan ML frameworks (TensorFlow/PyTorch)",
                    "Pengalaman dengan model deployment",
                    "Memahami MLOps best practices",
                    "Familiar dengan Docker dan cloud platforms",
                    "Pengalaman dengan time series forecasting (nilai plus)",
                ],
                contractDuration: "3 bulan (implementation + deployment)",
                expectedOutput: [
                    "Production-ready ML models",
                    "MLOps pipeline untuk training dan deployment",
                    "Performance monitoring dashboard",
                    "Technical documentation",
                    "Reproducible experiments",
                ],
            },
        ],
        expectedDeliverables: [
            "Research paper untuk submission ke jurnal",
            "Trained ML models dengan dokumentasi",
            "Dataset dan code repository",
            "Presentation slides untuk konferensi",
            "Technical report",
        ],
        projectTimeline: "3 bulan (research + paper writing)",
        initiator: {
            name: "Dr. Andi Wijaya",
            role: "Dosen & Researcher - Data Science",
            location: "Universitas Gadjah Mada",
            avatar: "/avatar-4.jpg",
            bio: "Saya adalah dosen dan peneliti di bidang AI dan Data Science dengan fokus pada aplikasi AI untuk sustainability. Saya sudah mempublikasikan 15+ paper di jurnal internasional dan aktif sebagai reviewer. Saya senang berkolaborasi dengan mahasiswa dan profesional muda untuk menghasilkan penelitian yang impactful.",
            linkedinUrl: "https://linkedin.com/in/dr-andi-wijaya",
            rating: 5.0,
            totalProjects: 8,
            completedProjects: 8,
            joinedDate: "Oktober 2025",
        },
        tags: ["Research", "AI", "Data Science"],
        createdAt: "10 Januari 2026",
        major: ["Teknik Informatika", "Statistika", "Matematika", "Ilmu Komputer"],
        workType: "hybrid",
        requirementLevel: "campus-only",
        city: "Yogyakarta",
        university: "Universitas Gadjah Mada",
    },

    // FREE PROJECT - UI/UX Design
    "ui-ux-redesign-app-edukasi": {
        id: 5,
        slug: "ui-ux-redesign-app-edukasi",
        title: "UI/UX Redesign App Edukasi",
        shortDescription: "Redesign UI/UX aplikasi edukasi, cocok buat portfolio",
        fullDescription:
            "Kami memiliki aplikasi edukasi yang sudah berjalan namun perlu redesign untuk meningkatkan user experience. Aplikasi ini digunakan oleh ribuan pelajar dan kami ingin membuat interface yang lebih intuitif dan engaging. Ini adalah project gratis namun hasil kerja kalian akan digunakan di production dan bisa menjadi portfolio yang kuat. Kalian juga akan mendapat testimonial dan recommendation letter.",
        objective:
            "Redesign UI/UX aplikasi edukasi untuk meningkatkan user engagement dan learning experience dengan pendekatan user-centered design.",
        thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        category: "UI/UX Design",
        type: "free",
        deadline: "10 hari lagi",
        totalSlots: 2,
        filledSlots: 0,
        applicants: 9,
        rolesNeeded: [
            {
                name: "UI/UX Designer",
                filled: false,
                description:
                    "Kami mencari UI/UX Designer yang passionate tentang education technology dan user-centered design.",
                responsibilities: [
                    "Conduct user research dan usability testing",
                    "Create user personas dan user journey maps",
                    "Design wireframes dan mockups",
                    "Create interactive prototypes",
                    "Design system dan component library",
                    "Collaborate dengan developer untuk implementation",
                ],
                requirements: [
                    "Menguasai Figma untuk design dan prototyping",
                    "Memahami UI/UX design principles",
                    "Portfolio design yang menarik (wajib)",
                    "Pengalaman dengan user research methods",
                    "Memahami accessibility standards",
                    "Pengalaman design untuk EdTech (nilai plus)",
                ],
                contractDuration: "1.5 bulan (research + design + handoff)",
                expectedOutput: [
                    "User research report dan insights",
                    "User personas dan journey maps",
                    "Complete UI mockups untuk semua screens",
                    "Interactive prototype di Figma",
                    "Design system dengan documentation",
                ],
            },
            {
                name: "Product Designer",
                filled: false,
                description:
                    "Kami butuh Product Designer untuk membantu define product strategy dan ensure design alignment dengan business goals.",
                responsibilities: [
                    "Product strategy dan roadmap",
                    "Competitive analysis",
                    "Feature prioritization",
                    "Stakeholder communication",
                    "Design QA dan consistency check",
                ],
                requirements: [
                    "Pengalaman sebagai Product Designer minimal 1 tahun",
                    "Memahami product development lifecycle",
                    "Strong analytical dan problem-solving skills",
                    "Excellent communication skills",
                    "Portfolio product design (wajib)",
                ],
                contractDuration: "1.5 bulan (strategy + design)",
                expectedOutput: [
                    "Product strategy document",
                    "Competitive analysis report",
                    "Feature prioritization matrix",
                    "Design specifications",
                    "Handoff documentation untuk developer",
                ],
            },
        ],
        expectedDeliverables: [
            "Complete UI/UX redesign untuk aplikasi",
            "Design system dan component library",
            "Interactive prototype",
            "User research insights",
            "Handoff documentation",
        ],
        projectTimeline: "1.5 bulan (research + design + handoff)",
        initiator: {
            name: "Nadia Putri",
            role: "Product Lead - EdTech Startup",
            location: "Bandung",
            avatar: "/avatar-5.jpg",
            bio: "Saya adalah Product Lead di startup EdTech yang fokus pada pembelajaran interaktif untuk pelajar SMA. Kami passionate tentang membuat pendidikan lebih accessible dan engaging melalui teknologi. Saya percaya bahwa good design adalah kunci untuk menciptakan learning experience yang memorable.",
            linkedinUrl: "https://linkedin.com/in/nadia-putri",
            portfolioUrl: "https://nadiaputri.design",
            rating: 4.8,
            totalProjects: 6,
            completedProjects: 5,
            joinedDate: "November 2025",
        },
        tags: ["UIUX", "Design", "Portfolio"],
        createdAt: "14 Januari 2026",
        major: ["Desain Komunikasi Visual", "Desain Produk", "Teknik Informatika"],
        workType: "online",
        requirementLevel: "open-for-all",
        city: "Bandung",
    },

    // PAID PROJECT - Mobile Development
    "mobile-app-mvp-flutter-project": {
        id: 6,
        slug: "mobile-app-mvp-flutter-project",
        title: "Mobile App MVP - Flutter Project",
        shortDescription: "Bangun MVP aplikasi mobile pakai Flutter, paid project",
        fullDescription:
            "Kami sedang mengembangkan aplikasi mobile untuk membantu UMKM mengelola inventory dan penjualan mereka. Kami sudah memiliki design dan backend yang ready, sekarang butuh Flutter developer untuk build mobile app nya. Target kami adalah launching MVP dalam 3 minggu untuk testing dengan early adopters. Budget yang kami tawarkan kompetitif dan ada bonus jika selesai tepat waktu.",
        objective:
            "Membangun MVP aplikasi mobile inventory management untuk UMKM menggunakan Flutter dengan target launching dalam 3 minggu.",
        thumbnail: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
        category: "Mobile Development",
        type: "paid",
        budget: "Rp750.000/orang",
        deadline: "21 hari lagi",
        totalSlots: 2,
        filledSlots: 1,
        applicants: 11,
        rolesNeeded: [
            {
                name: "Flutter Developer",
                filled: false,
                description:
                    "Kami mencari Flutter Developer yang berpengalaman untuk build mobile app dengan timeline yang tight.",
                responsibilities: [
                    "Develop mobile app menggunakan Flutter",
                    "Implementasi design dari Figma",
                    "Integrasi dengan backend API",
                    "Implementasi state management",
                    "Testing dan bug fixing",
                    "Deploy ke Play Store dan App Store",
                ],
                requirements: [
                    "Minimal 1 tahun pengalaman dengan Flutter",
                    "Menguasai Dart programming language",
                    "Pengalaman dengan state management (Provider/Riverpod/Bloc)",
                    "Familiar dengan REST API integration",
                    "Portfolio aplikasi Flutter (wajib)",
                    "Pengalaman deploy ke stores (nilai plus)",
                ],
                contractDuration: "3 minggu (development + deployment)",
                expectedOutput: [
                    "Mobile app untuk Android dan iOS",
                    "Clean architecture dan maintainable code",
                    "Integrated dengan backend API",
                    "Deployed ke Play Store dan App Store",
                    "Documentation dan user guide",
                ],
            },
        ],
        expectedDeliverables: [
            "MVP aplikasi mobile yang fully functional",
            "Source code dengan dokumentasi",
            "Deployed app di Play Store dan App Store",
            "User manual",
            "Bug fixing support 1 minggu setelah launch",
        ],
        projectTimeline: "3 minggu (development + deployment)",
        initiator: {
            name: "Raka Pratama",
            role: "Startup Co-Founder & CTO",
            location: "Yogyakarta",
            avatar: "/avatar-6.jpg",
            bio: "Saya adalah co-founder startup yang fokus pada digitalisasi UMKM. Kami sudah punya beberapa klien pilot dan sekarang ingin scale up dengan mobile app. Saya sendiri adalah developer dan akan support tim dalam technical aspect. Kami looking for passionate developer yang bisa work fast tanpa compromise quality.",
            linkedinUrl: "https://linkedin.com/in/raka-pratama",
            portfolioUrl: "https://rakapratama.dev",
            rating: 4.6,
            totalProjects: 5,
            completedProjects: 4,
            joinedDate: "Januari 2026",
        },
        tags: ["Mobile", "Flutter", "Startup"],
        createdAt: "16 Januari 2026",
        major: ["Teknik Informatika", "Sistem Informasi"],
        workType: "hybrid",
        requirementLevel: "professional",
        city: "Yogyakarta",
    },

    // FREE PROJECT - Data Visualization
    "data-visualization-project": {
        id: 7,
        slug: "data-visualization-project",
        title: "Data Visualization Project",
        shortDescription: "Visualisasi data publik untuk kebutuhan riset & publikasi",
        fullDescription:
            "Kami sedang melakukan riset tentang pola urbanisasi di Indonesia dan membutuhkan bantuan untuk visualisasi data yang kami miliki. Data sudah clean dan ready, tinggal perlu divisualisasikan dengan cara yang menarik dan insightful. Hasil visualisasi akan digunakan untuk publikasi di media dan konferensi. Ini adalah kesempatan bagus untuk belajar data visualization dan menambah portfolio.",
        objective:
            "Membuat visualisasi data yang menarik dan insightful tentang pola urbanisasi di Indonesia untuk publikasi dan presentasi.",
        thumbnail: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
        category: "Data",
        type: "free",
        deadline: "14 hari lagi",
        totalSlots: 2,
        filledSlots: 0,
        applicants: 5,
        rolesNeeded: [
            {
                name: "Data Analyst",
                filled: false,
                description:
                    "Kami mencari Data Analyst untuk menganalisis data dan membuat insights yang meaningful.",
                responsibilities: [
                    "Analisis data urbanisasi",
                    "Identifikasi patterns dan trends",
                    "Statistical analysis",
                    "Create data summary dan insights",
                    "Collaborate dengan data visualization specialist",
                ],
                requirements: [
                    "Menguasai Python atau R untuk data analysis",
                    "Pengalaman dengan Pandas, NumPy",
                    "Memahami statistical concepts",
                    "Good analytical thinking",
                    "Pengalaman dengan data cleaning",
                ],
                contractDuration: "2 minggu (analysis + visualization)",
                expectedOutput: [
                    "Data analysis report",
                    "Statistical insights",
                    "Data summary untuk visualization",
                    "Recommendations",
                ],
            },
            {
                name: "Data Visualization Specialist",
                filled: false,
                description:
                    "Kami butuh specialist untuk membuat visualisasi yang menarik dan easy to understand.",
                responsibilities: [
                    "Create interactive visualizations",
                    "Design infographics",
                    "Dashboard development",
                    "Storytelling dengan data",
                ],
                requirements: [
                    "Menguasai tools seperti Tableau, Power BI, atau D3.js",
                    "Pengalaman dengan Python visualization libraries (Matplotlib, Seaborn, Plotly)",
                    "Good design sense",
                    "Portfolio visualization projects",
                ],
                contractDuration: "2 minggu (visualization + refinement)",
                expectedOutput: [
                    "Interactive dashboard",
                    "Infographics untuk publikasi",
                    "Presentation slides dengan visualizations",
                    "Source files",
                ],
            },
        ],
        expectedDeliverables: [
            "Data analysis report",
            "Interactive dashboard",
            "Infographics untuk publikasi",
            "Presentation materials",
        ],
        projectTimeline: "2 minggu (analysis + visualization)",
        initiator: {
            name: "Kevin Wijaya",
            role: "Mahasiswa Data Science - Researcher",
            location: "Universitas Airlangga",
            avatar: "/avatar-7.jpg",
            bio: "Saya mahasiswa Data Science yang sedang melakukan riset tentang urbanisasi untuk tugas akhir. Saya passionate tentang menggunakan data untuk memahami fenomena sosial. Saya looking for collaborators yang juga tertarik dengan data visualization dan social research.",
            linkedinUrl: "https://linkedin.com/in/kevin-wijaya",
            rating: 4.5,
            totalProjects: 2,
            completedProjects: 2,
            joinedDate: "Desember 2025",
        },
        tags: ["Data", "Visualization", "Research"],
        createdAt: "13 Januari 2026",
        major: ["Statistika", "Matematika", "Teknik Informatika", "Sistem Informasi"],
        workType: "online",
        requirementLevel: "campus-only",
        city: "Surabaya",
        university: "Universitas Airlangga",
    },

    // PAID PROJECT - AI Chatbot
    "ai-chatbot-untuk-customer-service": {
        id: 8,
        slug: "ai-chatbot-untuk-customer-service",
        title: "AI Chatbot untuk Customer Service",
        shortDescription: "Bikin chatbot AI sederhana untuk customer service UMKM",
        fullDescription:
            "Kami adalah UMKM yang menjual produk fashion online dan ingin meningkatkan customer service dengan AI chatbot. Chatbot ini akan membantu menjawab pertanyaan umum customer, memberikan rekomendasi produk, dan membantu proses order. Kami sudah punya data FAQ dan product catalog. Budget yang kami tawarkan sangat kompetitif dan ada potensi untuk long-term collaboration.",
        objective:
            "Membangun AI chatbot untuk customer service yang dapat menjawab pertanyaan, memberikan rekomendasi produk, dan membantu proses pemesanan.",
        thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        category: "AI Project",
        type: "paid",
        budget: "Rp900.000/orang",
        deadline: "20 hari lagi",
        totalSlots: 2,
        filledSlots: 0,
        applicants: 13,
        rolesNeeded: [
            {
                name: "ML Engineer",
                filled: false,
                description:
                    "Kami mencari ML Engineer untuk develop dan train AI chatbot model.",
                responsibilities: [
                    "Develop chatbot model menggunakan NLP",
                    "Train model dengan FAQ data",
                    "Implement product recommendation system",
                    "Model optimization",
                    "Testing dan evaluation",
                ],
                requirements: [
                    "Menguasai Python dan NLP libraries",
                    "Pengalaman dengan chatbot frameworks (Rasa, Dialogflow, atau custom)",
                    "Memahami NLP concepts dan techniques",
                    "Pengalaman dengan recommendation systems (nilai plus)",
                    "Portfolio AI/ML projects",
                ],
                contractDuration: "3 minggu (development + training + testing)",
                expectedOutput: [
                    "Trained chatbot model",
                    "Product recommendation engine",
                    "Model evaluation report",
                    "Documentation",
                ],
            },
            {
                name: "Backend Engineer",
                filled: false,
                description:
                    "Kami butuh Backend Engineer untuk integrate chatbot dengan website dan database.",
                responsibilities: [
                    "Develop API untuk chatbot integration",
                    "Database setup untuk chat history",
                    "Integration dengan e-commerce platform",
                    "Deploy chatbot ke production",
                    "Monitoring dan logging",
                ],
                requirements: [
                    "Menguasai Node.js atau Python untuk backend",
                    "Pengalaman dengan API development",
                    "Familiar dengan database (MongoDB/PostgreSQL)",
                    "Pengalaman deploy ML models (nilai plus)",
                    "Understanding of webhooks dan integrations",
                ],
                contractDuration: "3 minggu (development + deployment)",
                expectedOutput: [
                    "Chatbot API",
                    "Database schema untuk chat data",
                    "Integration dengan website",
                    "Deployed chatbot",
                    "Admin dashboard untuk monitoring",
                ],
            },
        ],
        expectedDeliverables: [
            "AI chatbot yang fully functional",
            "Integration dengan website",
            "Admin dashboard",
            "Documentation dan user guide",
            "1 bulan support setelah launch",
        ],
        projectTimeline: "3 minggu (development + deployment)",
        initiator: {
            name: "Dewi Lestari",
            role: "UMKM Owner - Fashion E-commerce",
            location: "Surabaya",
            avatar: "/avatar-8.jpg",
            bio: "Saya adalah owner UMKM fashion yang sudah berjalan 3 tahun dengan omzet yang terus meningkat. Kami ingin meningkatkan customer experience dengan teknologi AI. Saya percaya bahwa investasi di teknologi adalah kunci untuk scale up bisnis UMKM.",
            linkedinUrl: "https://linkedin.com/in/dewi-lestari",
            rating: 4.9,
            totalProjects: 2,
            completedProjects: 2,
            joinedDate: "Januari 2026",
        },
        tags: ["AI", "Chatbot", "Paid"],
        createdAt: "11 Januari 2026",
        major: ["Teknik Informatika", "Ilmu Komputer", "Teknik Komputer"],
        workType: "online",
        requirementLevel: "professional",
        city: "Surabaya",
    },

    // FREE PROJECT - Content & Branding
    "content-branding-startup-media": {
        id: 9,
        slug: "content-branding-startup-media",
        title: "Content & Branding Startup Media",
        shortDescription: "Butuh tim content & branding untuk startup media digital",
        fullDescription:
            "Kami adalah startup media digital yang fokus pada konten edukatif untuk Gen Z. Kami sedang membangun brand identity dan content strategy. Kami mencari content writer dan brand strategist yang passionate tentang media dan storytelling. Meskipun ini free project, kalian akan mendapat byline di semua konten dan exposure ke audience kami yang sudah 10K+ followers.",
        objective:
            "Membangun brand identity yang kuat dan content strategy yang engaging untuk startup media digital yang target audience nya Gen Z.",
        thumbnail: "https://images.pexels.com/photos/6476582/pexels-photo-6476582.jpeg",
        category: "Branding",
        type: "free",
        deadline: "12 hari lagi",
        totalSlots: 2,
        filledSlots: 0,
        applicants: 7,
        rolesNeeded: [
            {
                name: "Content Writer",
                filled: false,
                description:
                    "Kami mencari Content Writer yang understand Gen Z language dan trends.",
                responsibilities: [
                    "Write engaging articles dan social media content",
                    "Research trending topics",
                    "SEO optimization",
                    "Content calendar planning",
                    "Collaborate dengan design team",
                ],
                requirements: [
                    "Excellent writing skills dalam Bahasa Indonesia",
                    "Understanding of Gen Z culture dan trends",
                    "Portfolio writing samples (wajib)",
                    "Basic SEO knowledge",
                    "Social media savvy",
                ],
                contractDuration: "1 bulan (content creation + strategy)",
                expectedOutput: [
                    "10+ articles untuk website",
                    "Social media content plan",
                    "Content guidelines",
                    "SEO-optimized content",
                ],
            },
            {
                name: "Brand Strategist",
                filled: false,
                description:
                    "Kami butuh Brand Strategist untuk define brand identity dan positioning.",
                responsibilities: [
                    "Brand identity development",
                    "Brand positioning strategy",
                    "Competitor analysis",
                    "Brand guidelines creation",
                    "Messaging framework",
                ],
                requirements: [
                    "Pengalaman dengan brand strategy minimal 1 tahun",
                    "Understanding of media industry",
                    "Strong analytical skills",
                    "Portfolio brand projects",
                    "Excellent presentation skills",
                ],
                contractDuration: "1 bulan (strategy + guidelines)",
                expectedOutput: [
                    "Brand identity document",
                    "Brand guidelines",
                    "Messaging framework",
                    "Competitor analysis report",
                    "Brand strategy presentation",
                ],
            },
        ],
        expectedDeliverables: [
            "Brand identity dan guidelines",
            "Content strategy document",
            "10+ published articles",
            "Social media content calendar",
            "Brand presentation deck",
        ],
        projectTimeline: "1 bulan (strategy + content creation)",
        initiator: {
            name: "Fajar Nugroho",
            role: "Media Startup Founder & Editor-in-Chief",
            location: "Jakarta",
            avatar: "/avatar-9.jpg",
            bio: "Saya adalah founder media startup yang fokus pada konten edukatif untuk Gen Z. Kami passionate tentang membuat konten yang meaningful dan engaging. Saya looking for creative people yang share the same vision untuk build media brand yang impactful.",
            linkedinUrl: "https://linkedin.com/in/fajar-nugroho",
            portfolioUrl: "https://fajarnugroho.media",
            rating: 4.7,
            totalProjects: 3,
            completedProjects: 3,
            joinedDate: "November 2025",
        },
        tags: ["Branding", "Content", "Startup"],
        createdAt: "15 Januari 2026",
        major: ["Ilmu Komunikasi", "Desain Komunikasi Visual", "Marketing"],
        workType: "hybrid",
        requirementLevel: "open-for-all",
        city: "Jakarta",
    },

    // FREE PROJECT - Open Source
    "open-source-web-app-collaboration": {
        id: 10,
        slug: "open-source-web-app-collaboration",
        title: "Open Source Web App Collaboration",
        shortDescription: "Kolaborasi bangun open source web app untuk komunitas",
        fullDescription:
            "Kami adalah tech community yang ingin membangun open source web app untuk membantu developer Indonesia belajar dan berkolaborasi. Project ini akan menjadi platform untuk sharing knowledge, finding collaborators, dan showcasing projects. Semua code akan open source dan contributors akan mendapat recognition. Ini adalah kesempatan bagus untuk belajar, networking, dan contribute ke open source community.",
        objective:
            "Membangun open source platform untuk developer Indonesia untuk belajar, berkolaborasi, dan showcase projects mereka.",
        thumbnail: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
        category: "Open Source",
        type: "free",
        deadline: "45 hari lagi",
        totalSlots: 3,
        filledSlots: 0,
        applicants: 10,
        rolesNeeded: [
            {
                name: "Frontend Developer",
                filled: false,
                description:
                    "Kami mencari Frontend Developer untuk build user interface yang modern dan responsive.",
                responsibilities: [
                    "Develop frontend menggunakan React/Next.js",
                    "Implement responsive design",
                    "State management",
                    "API integration",
                    "Code review dan collaboration",
                ],
                requirements: [
                    "Menguasai React/Next.js",
                    "Pengalaman dengan TypeScript",
                    "Familiar dengan Git workflow",
                    "Understanding of open source contribution",
                    "Good communication skills",
                ],
                contractDuration: "2 bulan (development + iteration)",
                expectedOutput: [
                    "Responsive web interface",
                    "Clean dan documented code",
                    "Component library",
                    "Contribution to open source repo",
                ],
            },
            {
                name: "Backend Developer",
                filled: false,
                description:
                    "Kami butuh Backend Developer untuk build scalable API dan database.",
                responsibilities: [
                    "Develop RESTful API",
                    "Database design",
                    "Authentication dan authorization",
                    "API documentation",
                    "Code review",
                ],
                requirements: [
                    "Menguasai Node.js atau Python",
                    "Pengalaman dengan database design",
                    "Understanding of API best practices",
                    "Familiar dengan open source workflow",
                    "Good documentation skills",
                ],
                contractDuration: "2 bulan (development + iteration)",
                expectedOutput: [
                    "Scalable API",
                    "Database schema",
                    "API documentation",
                    "Contribution to open source repo",
                ],
            },
            {
                name: "Maintainer",
                filled: false,
                description:
                    "Kami butuh Maintainer untuk manage project, review PRs, dan coordinate contributors.",
                responsibilities: [
                    "Project management",
                    "Code review dan PR management",
                    "Community management",
                    "Documentation",
                    "Release management",
                ],
                requirements: [
                    "Pengalaman dengan open source projects",
                    "Good understanding of Git dan GitHub",
                    "Strong communication skills",
                    "Leadership skills",
                    "Passionate about open source",
                ],
                contractDuration: "Ongoing (long-term commitment)",
                expectedOutput: [
                    "Well-managed project",
                    "Active community",
                    "Quality code reviews",
                    "Regular releases",
                    "Good documentation",
                ],
            },
        ],
        expectedDeliverables: [
            "Open source web application",
            "Complete documentation",
            "Active GitHub repository",
            "Community guidelines",
            "Regular releases",
        ],
        projectTimeline: "2 bulan (initial version) + ongoing maintenance",
        initiator: {
            name: "Open Community Indonesia",
            role: "Tech Community - Open Source Advocates",
            location: "Indonesia",
            avatar: "/avatar-10.jpg",
            bio: "Kami adalah komunitas developer Indonesia yang passionate tentang open source dan knowledge sharing. Kami percaya bahwa dengan berkolaborasi, kita bisa membuat tools yang bermanfaat untuk developer community di Indonesia. Join us untuk build something meaningful together!",
            linkedinUrl: "https://linkedin.com/company/open-community-id",
            rating: 4.8,
            totalProjects: 5,
            completedProjects: 4,
            joinedDate: "September 2025",
        },
        tags: ["Open Source", "Community", "Web"],
        createdAt: "8 Januari 2026",
        major: ["Teknik Informatika", "Sistem Informasi", "Ilmu Komputer"],
        workType: "online",
        requirementLevel: "open-for-all",
        city: "Online",
    },
};
