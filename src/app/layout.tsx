import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://coollabs.id"),
  title: {
    default: "Coollabs | Platform Project & Kolaborasi Terdepan",
    template: "%s | Coollabs",
  },
  description: "Platform kolaborasi #1 di Indonesia untuk mahasiswa dan profesional. Temukan project impianmu, bangun tim solid, dan kembangkan portofolio bersama komunitas kreatif.",
  keywords: ["kolaborasi project", "cari tim", "mahasiswa", "portfolio", "software engineer", "ui/ux designer", "lomba", "hackathon"],
  authors: [{ name: "Coollabs Team" }],
  creator: "Coollabs",
  publisher: "Coollabs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Coollabs | Bangun Karier dan Tim Impianmu Disini",
    description: "Gabung dengan ribuan talenta digital lainnya. Temukan project, cari tim, dan wujudkan ide kreatifmu sekarang juga!",
    url: "/",
    siteName: "Coollabs",
    images: [
      {
        url: "/logo-bg.png",
        width: 1200,
        height: 630,
        alt: "Coollabs - Platform Kolaborasi Project",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coollabs | Platform Project & Kolaborasi",
    description: "Temukan project dan tim yang tepat untuk mengembangkan skill dan portofoliomu.",
    images: ["/logo-bg.png"],
    creator: "@coollabs_id", // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Coollabs",
              url: "https://coollabs.id",
              logo: "https://coollabs.id/logo-bg.png",
              sameAs: [
                "https://facebook.com/coollabs",
                "https://twitter.com/coollabs_id",
                "https://instagram.com/coollabs"
              ],
              description: "Platform kolaborasi project #1 di Indonesia for students and professionals.",
            }),
          }}
        />
      </body>
    </html>
  );
}
