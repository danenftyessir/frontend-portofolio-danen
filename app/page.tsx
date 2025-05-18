"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { AISection } from "@/components/AISection";
import {
  ProjectCard,
  ProjectHighlightsSection,
} from "@/components/ProjectCard";

// data yang digunakan di halaman
const userData = {
  nama: "Danendra Shafi Athallah",
  lokasi: "Jakarta, Indonesia",
  pendidikan: "Institut Teknologi Bandung, Teknik Informatika (Semester 4)",
  keahlian: [
    "Java",
    "Python",
    "Next.js",
    "React",
    "Data Science",
    "Tailwind CSS",
  ],
  hobi: [
    "Membaca buku novel",
    "Traveling ke destinasi lokal",
    "Penggemar street food",
  ],
  bio: "“You had me at ‘Hello, World!’”",
  highlights: [
    "2 tahun pengalaman web development",
    "1 tahun fokus di data science",
    "Juara 2 Hackathon Nasional 2022",
    "Asisten praktikum Algoritma & Struktur Data",
  ],
};

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // fungsi untuk scroll ke bagian tertentu
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // scroll langsung ke AI section untuk pertanyaan cepat
  const scrollToAISection = () => {
    aiRef.current?.scrollIntoView({ behavior: "smooth" });
    // auto focus ke textarea dalam AI section (bisa ditambahkan)
  };

  useEffect(() => {
    // efek animasi untuk fade-in elemen saat scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    // pilih semua elemen dengan kelas animate-on-scroll
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <main className="flex flex-col items-center overflow-x-hidden">
      {/* hero section dengan call-to-action yang lebih engaging */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 text-white">
        <ParticlesBackground quantity={30} color="#6366f1" />

        <div className="relative z-10 text-center">
          {/* foto profil di hero section */}
          <div className="mb-8 flex justify-center">
            <div className="glow-effect relative h-40 w-40 overflow-hidden rounded-full border-2 border-indigo-500 p-1 shadow-lg md:h-48 md:w-48">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <img
                  src="/profile.jpg"
                  alt={`Foto profil ${userData.nama}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold md:text-7xl">
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Hi, Saya {userData.nama}
            </span>
          </h1>

          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>

          <p className="mb-4 text-xl text-slate-300 md:text-2xl">
            {userData.bio}
          </p>

          <p className="mb-8 text-lg text-slate-400">
            Tanya AI tentang pengalaman, proyek, dan passion saya di dunia
            teknologi
          </p>

          {/* call-to-action buttons yang lebih menarik */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={scrollToAISection}
              className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3 h-auto"
              size="lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Mulai Percakapan dengan AI
            </Button>
            <Button
              onClick={() => scrollToSection(aboutRef)}
              variant="outline"
              className="border-indigo-400 text-indigo-300 hover:bg-indigo-900/50 text-lg px-8 py-3 h-auto"
              size="lg"
            >
              Lihat Profile Lengkap
            </Button>
          </div>

          {/* social links */}
          <div className="mt-16 flex justify-center space-x-4">
            <a
              href="https://github.com/danenftyessir"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-800 p-3 text-slate-300 transition-colors duration-300 hover:bg-indigo-800 hover:text-white"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/danendrashafiathallah"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-800 p-3 text-slate-300 transition-colors duration-300 hover:bg-indigo-800 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/danennn__/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-800 p-3 text-slate-300 transition-colors duration-300 hover:bg-indigo-800 hover:text-white"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-indigo-400"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* about section yang lebih focused */}
      <section
        ref={aboutRef}
        className="w-full bg-gradient-to-b from-white via-indigo-50 to-indigo-100 px-4 py-20"
      >
        <div className="mx-auto max-w-4xl">
          <div>
            <h2 className="mb-8 text-center text-3xl font-bold">
              Tentang Saya
            </h2>

            {/* bio card dengan informasi yang lebih relevan */}
            <div className="mb-16 rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-on-scroll opacity-0">
              <div className="flex flex-col md:flex-row">
                {/* foto profil */}
                <div className="flex justify-center p-6 md:justify-start">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-slate-200 shadow-sm">
                    <img
                      src="/profile.jpg"
                      alt={`Foto profil ${userData.nama}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* informasi bio yang lebih engaging */}
                <div className="flex-1 p-6 md:pl-0">
                  <h3 className="mb-2 text-2xl font-bold">{userData.nama}</h3>

                  <div className="mb-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <span>{userData.lokasi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎓</span>
                      <span>Mahasiswa Teknik Informatika ITB, Semester 4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💻</span>
                      <span>{userData.bio}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚀</span>
                      <span>
                        Fokus: Algoritma, Data Science, Web Development
                      </span>
                    </div>
                  </div>

                  {/* skills badges dengan kategori */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      Keahlian Teknis:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {userData.keahlian.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 hover:bg-indigo-200 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* hobi dengan icon */}
                  <div className="text-slate-600">
                    <p className="text-sm font-medium mb-2">Hobi & Interest:</p>
                    <div className="space-y-1">
                      {userData.hobi.map((hobi, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-indigo-500">•</span>
                          <span>{hobi}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* quick action untuk AI */}
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-sm text-indigo-800 mb-2">
                      Ingin tahu lebih detail tentang pengalaman dan proyek
                      saya?
                    </p>
                    <Button
                      onClick={scrollToAISection}
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Tanya AI Asisten
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* ai section dengan referensi yang jelas */}
            <div ref={aiRef} className="animate-on-scroll opacity-0">
              <AISection />
            </div>
          </div>
        </div>
      </section>

      {/* project highlights section */}
      <ProjectHighlightsSection />

      {/* footer dengan informasi tambahan */}
      <footer className="w-full bg-slate-950 px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          {/* informasi kontak dan collaboration */}
          <div className="mb-8 text-center">
            <h3 className="text-xl font-bold mb-4">Mari Berkolaborasi!</h3>
            <p className="text-slate-300 mb-4">
              Tertarik untuk berdiskusi tentang data science, algoritma, atau
              proyek teknologi? Jangan ragu untuk menghubungi saya atau gunakan
              AI assistant di atas!
            </p>
          </div>

          {/* social links footer */}
          <div className="mb-6 flex justify-center gap-6">
            <a
              href="https://github.com/danenftyessir"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-indigo-400"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/danendrashafiathallah"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-indigo-400"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/danennn__/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-indigo-400"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          {/* tech stack info */}
          <div className="text-center">
            <p className="text-sm text-slate-400">
              Portfolio ini dikembangkan dengan Next.js + TypeScript, Python
              FastAPI, dan ditenagai oleh OpenAI.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              © {new Date().getFullYear()} {userData.nama}. Semua hak cipta
              dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
