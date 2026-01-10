import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

// viewport export terpisah - fix warning kedua
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f9fafb",
};

// metadata export dengan metadataBase - fix warning pertama
export const metadata: Metadata = {
  metadataBase: new URL("https://danendra-portfolio.vercel.app"),
  title: "Danendra Shafi Athallah - Personal AI Portfolio",
  description:
    "Student of Informatics Engineering at ITB with a deep passion for coding and continuous learning. Portfolio interaktif dengan AI assistant untuk mengenal lebih dalam tentang pengalaman, project, dan kepribadian saya.",
  keywords: [
    "Danendra Shafi Athallah",
    "portfolio",
    "data science",
    "algoritma",
    "ITB",
    "Teknik Informatika",
    "AI assistant",
    "machine learning",
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
      "Student of Informatics Engineering at ITB with a deep passion for coding and continuous learning. Berinteraksi dengan AI assistant untuk mengenal lebih dalam tentang pengalaman dan project saya.",
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
      "Student of Informatics Engineering at ITB with a deep passion for coding and continuous learning",
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
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://danendra-portfolio.vercel.app",
  },
  other: {
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

        {/* boxicons CDN */}
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
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
                "Student of Informatics Engineering at ITB with a deep passion for coding and continuous learning",
              url: "https://danendra-portfolio.vercel.app",
              image: "https://danendra-portfolio.vercel.app/profile.jpg",
              sameAs: [
                "https://github.com/danenftyessir",
                "https://linkedin.com/in/danendrashafiathallah",
                "mailto:danendra1967@gmail.com",
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
            }),
          }}
        />

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
        className={`${ubuntu.variable} font-sans antialiased bg-gray-50 text-gray-800 min-h-screen selection:bg-gray-200 selection:text-gray-800`}
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
      </body>
    </html>
  );
}
