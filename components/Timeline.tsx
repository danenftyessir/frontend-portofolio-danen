"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedElement from "./AnimatedElement";

interface TimelineItemData {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  details: string[];
  achievements: string[];
  tech: string[];
  type: "education" | "work" | "project" | "achievement";
  color: string;
  icon: string;
}

const timelineData: TimelineItemData[] = [
  {
    id: "asisten-praktikum",
    year: "2024",
    period: "2024 - sekarang",
    title: "asisten praktikum berpikir komputasional",
    organization: "institut teknologi bandung",
    description:
      "membantu mahasiswa memahami konsep algoritma dan pemrograman dasar dengan pendekatan yang mudah dipahami",
    details: [
      "mengajar konsep algoritma fundamental",
      "membimbing praktikum programming dengan python",
      "mengevaluasi dan memberikan feedback pada tugas mahasiswa",
      "mengembangkan materi pembelajaran yang interaktif",
    ],
    achievements: [
      "berhasil membimbing 50+ mahasiswa per semester",
      "mengembangkan modul pembelajaran praktikum",
      "mendapat apresiasi dari dosen pembimbing",
    ],
    tech: ["Python", "Algorithm Design", "Teaching", "Problem Solving"],
    type: "work",
    color: "from-blue-500 to-indigo-600",
    icon: "🎓",
  },
  {
    id: "arkavidia-academy",
    year: "2024",
    period: "januari - maret 2024",
    title: "organizing committee arkavidia academy",
    organization: "arkavidia 9.0 - hmif itb",
    description:
      "menyelenggarakan bootcamp data science untuk mahasiswa se-indonesia dengan kurikulum yang komprehensif",
    details: [
      "merancang kurikulum bootcamp data science path",
      "mengkoordinasi tim akademik dan mentor",
      "mengelola platform pembelajaran online",
      "mengorganisir sesi mentoring dan workshop",
    ],
    achievements: [
      "berhasil melatih 200+ peserta data science",
      "completion rate 85% untuk bootcamp",
      "feedback rating 4.8/5 dari peserta",
    ],
    tech: ["Data Science", "Python", "Machine Learning", "Event Management"],
    type: "work",
    color: "from-purple-500 to-pink-600",
    icon: "🚀",
  },
  {
    id: "datathon-ui",
    year: "2023",
    period: "oktober 2023",
    title: "participant datathon ui",
    organization: "universitas indonesia",
    description:
      "kompetisi data science dengan real-world dataset yang menantang kemampuan analisis dan modeling",
    details: [
      "analisis dataset komplex dengan multiple variables",
      "implementasi machine learning models",
      "data preprocessing dan feature engineering",
      "presentasi hasil analisis kepada juri",
    ],
    achievements: [
      "menyelesaikan challenge dalam waktu yang ditetapkan",
      "mengembangkan model dengan akurasi tinggi",
      "belajar competitive data science approach",
    ],
    tech: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Data Visualization",
      "Machine Learning",
    ],
    type: "achievement",
    color: "from-green-500 to-teal-600",
    icon: "📊",
  },
  {
    id: "rush-hour-project",
    year: "2023",
    period: "agustus - september 2023",
    title: "rush hour puzzle solver development",
    organization: "personal project",
    description:
      "mengembangkan solver untuk rush hour puzzle menggunakan multiple pathfinding algorithms dengan visualisasi interaktif",
    details: [
      "implementasi algoritma a*, dijkstra, ucs, dan greedy best-first",
      "optimasi performa untuk handle puzzle complexity",
      "pengembangan heuristic functions yang efektif",
      "membuat visualisasi step-by-step algorithm behavior",
    ],
    achievements: [
      "berhasil solve puzzle dengan optimal solution",
      "performa algorithm yang efficient",
      "visualisasi yang user-friendly dan educational",
    ],
    tech: [
      "Python",
      "Algorithm Design",
      "Pathfinding",
      "Data Structures",
      "Visualization",
    ],
    type: "project",
    color: "from-orange-500 to-red-600",
    icon: "🧩",
  },
  {
    id: "itb-start",
    year: "2022",
    period: "agustus 2022",
    title: "memulai kuliah di itb",
    organization: "teknik informatika - institut teknologi bandung",
    description:
      "memulai perjalanan akademik di salah satu kampus teknik terbaik indonesia dengan fokus computer science",
    details: [
      "adaptasi dengan kurikulum teknik informatika",
      "mempelajari fundamental programming dan algoritma",
      "bergabung dengan komunitas mahasiswa teknik",
      "mengembangkan passion di bidang data science",
    ],
    achievements: [
      "berhasil beradaptasi dengan pace pembelajaran yang cepat",
      "membangun network dengan mahasiswa dan dosen",
      "menemukan minat khusus di data science dan algoritma",
    ],
    tech: ["Python", "Java", "Algorithm", "Data Structure", "Mathematics"],
    type: "education",
    color: "from-cyan-500 to-blue-600",
    icon: "🏫",
  },
];

const TimelineItem = ({
  item,
  index,
  isActive,
  onClick,
}: {
  item: TimelineItemData;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`flex items-center mb-16 ${
        isLeft ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* content card */}
      <motion.div
        className={`w-full lg:w-5/12 ${isLeft ? "lg:mr-16" : "lg:ml-16"}`}
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
      >
        <motion.div
          className={`glass-strong rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
            isActive
              ? "ring-2 ring-indigo-500 shadow-glow"
              : "hover:shadow-glow-lg"
          }`}
          onClick={onClick}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* header */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-20`}
              animate={{ rotate: isActive ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-indigo-300 font-semibold text-sm">
                {item.organization}
              </p>
            </div>
          </div>

          {/* period badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-4 py-2 bg-gradient-to-r ${item.color} bg-opacity-30 text-white rounded-full text-sm font-semibold border border-white/20`}
            >
              {item.period}
            </span>
          </div>

          {/* description */}
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* tech tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tech.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
              >
                {tech}
              </span>
            ))}
            {item.tech.length > 4 && (
              <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                +{item.tech.length - 4} more
              </span>
            )}
          </div>

          {/* expand indicator */}
          <motion.div
            className="flex items-center gap-2 text-indigo-300 text-sm font-medium"
            animate={{ x: isActive ? 5 : 0 }}
          >
            {isActive ? "tutup detail" : "lihat detail"}
            <motion.div
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* timeline dot */}
      <motion.div
        className="hidden lg:block relative"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
      >
        <motion.div
          className={`w-8 h-8 rounded-full border-4 border-white z-10 relative bg-gradient-to-r ${item.color} shadow-glow`}
          animate={{
            scale: isActive ? 1.3 : 1,
            boxShadow: isActive
              ? "0 0 30px rgba(99, 102, 241, 0.6)"
              : "0 0 20px rgba(99, 102, 241, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* year label */}
        <motion.div
          className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 px-3 py-1 rounded-lg text-sm font-bold text-indigo-300 whitespace-nowrap border border-indigo-500/30"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {item.year}
        </motion.div>
      </motion.div>
    </div>
  );
};

const TimelineDetails = ({ item }: { item: TimelineItemData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 mx-4 lg:mx-0"
    >
      <div className="glass-strong rounded-2xl p-8 border-l-4 border-indigo-500">
        <div className="grid md:grid-cols-2 gap-8">
          {/* details */}
          <div>
            <h4 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
              📋 detail aktivitas
            </h4>
            <ul className="space-y-2">
              {item.details.map((detail, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-white/80 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-indigo-400 mt-1">•</span>
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* achievements */}
          <div>
            <h4 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
              🏆 pencapaian
            </h4>
            <ul className="space-y-2">
              {item.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-white/80 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <span className="text-green-400 mt-1">✓</span>
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* all tech stack */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <h4 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            🛠️ teknologi yang digunakan
          </h4>
          <div className="flex flex-wrap gap-3">
            {item.tech.map((tech, i) => (
              <motion.span
                key={i}
                className={`px-4 py-2 bg-gradient-to-r ${item.color} bg-opacity-20 rounded-lg text-sm font-medium text-white border border-white/20`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Timeline = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* vertical line */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 rounded-full shadow-glow" />

      {/* timeline items */}
      <div className="relative space-y-0">
        {timelineData.map((item, index) => (
          <div key={item.id}>
            <TimelineItem
              item={item}
              index={index}
              isActive={activeItem === item.id}
              onClick={() => toggleItem(item.id)}
            />

            <AnimatePresence>
              {activeItem === item.id && <TimelineDetails item={item} />}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* stats summary */}
      <motion.div
        className="mt-16 glass-strong rounded-2xl p-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-center mb-8 gradient-text">
          perjalanan dalam angka
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">2+</div>
            <div className="text-sm text-white/70">tahun experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
            <div className="text-sm text-white/70">mahasiswa dibimbing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
            <div className="text-sm text-white/70">projects completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">10+</div>
            <div className="text-sm text-white/70">tech stacks</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
