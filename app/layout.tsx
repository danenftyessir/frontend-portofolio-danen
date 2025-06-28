import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danendra Shafi Athallah - Personal AI Portfolio",
  description:
    "Mahasiswa Teknik Informatika ITB yang passionate di bidang data science dan algoritma. Portfolio interaktif dengan AI assistant untuk mengenal lebih dalam tentang pengalaman, project, dan kepribadian saya.",
  keywords: [
    "Danendra Shafi Athallah",
    "portfolio",
    "data science",
    "algoritma",
    "ITB",
    "Teknik Informatika",
    "AI assistant",
    "machine learning",
    "asisten praktikum",
    "pathfinding algorithms",
    "rush hour puzzle solver",
    "arkavidia academy",
    "web development",
    "python programming",
    "computer science student",
  ],
  authors: [{ name: "Danendra Shafi Athallah" }],
  creator: "Danendra Shafi Athallah",
  publisher: "Danendra Shafi Athallah",
  openGraph: {
    title: "Danendra Shafi Athallah - Personal AI Portfolio",
    description:
      "Mahasiswa Teknik Informatika ITB yang passionate di bidang data science dan algoritma. Berinteraksi dengan AI assistant untuk mengenal lebih dalam tentang pengalaman dan project saya.",
    url: "https://danendra-portfolio.vercel.app",
    siteName: "Danendra Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Danendra Shafi Athallah - Data Science Enthusiast & Algorithm Problem Solver",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danendra Shafi Athallah - Personal AI Portfolio",
    description:
      "Mahasiswa Teknik Informatika ITB yang passionate di bidang data science dan algoritma",
    images: ["/profile.jpg"],
    creator: "@danendra_dev",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Personal Portfolio",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "google-site-verification-code", // ganti dengan kode verifikasi google search console
  },
  alternates: {
    canonical: "https://danendra-portfolio.vercel.app",
  },
  other: {
    "theme-color": "#f9fafb",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Danendra Portfolio",
    "application-name": "Danendra Portfolio",
    "msapplication-TileColor": "#f9fafb",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* preconnect untuk optimasi loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* dns-prefetch untuk backend api */}
        <link
          rel="dns-prefetch"
          href="https://portofolio-danen-backend.up.railway.app"
        />

        {/* preload critical assets */}
        <link rel="preload" href="/profile.jpg" as="image" type="image/jpeg" />

        {/* structured data untuk seo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Danendra Shafi Athallah",
              jobTitle: "Computer Science Student & Data Science Enthusiast",
              description:
                "Mahasiswa Teknik Informatika ITB yang passionate di bidang data science dan algoritma",
              url: "https://danendra-portfolio.vercel.app",
              image: "https://danendra-portfolio.vercel.app/profile.jpg",
              sameAs: [
                "https://github.com/danendra-athallah",
                "https://linkedin.com/in/danendra-athallah",
                "mailto:danendra.athallah@gmail.com",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Institut Teknologi Bandung",
                sameAs: "https://www.itb.ac.id/",
              },
              knowsAbout: [
                "Data Science",
                "Machine Learning",
                "Algorithm Design",
                "Python Programming",
                "Web Development",
                "Problem Solving",
              ],
              worksFor: {
                "@type": "EducationalOrganization",
                name: "Institut Teknologi Bandung",
                description: "Teaching Assistant for Computational Thinking",
              },
            }),
          }}
        />

        {/* meta tags tambahan untuk SEO */}
        <meta name="theme-color" content="#f9fafb" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Danendra Portfolio" />

        {/* performance hints */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-800 min-h-screen selection:bg-gray-200 selection:text-gray-800`}
      >
        {/* skip to main content untuk accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gray-800 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* main content wrapper */}
        <div id="main-content" className="relative">
          {children}
        </div>

        {/* toast container */}
        <Toaster />

        {/* loading indicator untuk development */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 left-4 z-50 text-xs text-gray-500 font-mono bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-200">
            DEV MODE
          </div>
        )}

        {/* analytics script placeholder */}
        {process.env.NODE_ENV === "production" && (
          <>
            {/* google analytics atau analytics lain bisa ditambahkan di sini */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // analytics initialization bisa ditambahkan di sini
                  console.log('Portfolio loaded successfully');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
