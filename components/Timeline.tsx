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
  icon: React.ReactNode;
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
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
      </svg>
    ),
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
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M13.5,6V11.5L17,15L15.6,16.5L11.5,12.5V6H13.5Z"/>
        <path d="M9,1V7L7,8.5L9,10V16H7V10L4,7.5L7,5V1H9M17,1V5L20,7.5L17,10V16H15V10L17,8.5L15,7V1H17Z"/>
      </svg>
    ),
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
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M4,11H6V17H4V11M9,7H11V17H9V7M16,13H18V17H16V13M22,3H2V21H22V3M20,19H4V5H20V19Z"/>
      </svg>
    ),
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
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20A2,2 0 0,0 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z"/>
      </svg>
    ),
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
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
      </svg>
    ),
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3Z"/>
              </svg>
              detail aktivitas
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/>
              </svg>
              pencapaian
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
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M13.78,15.3L19.78,21.3L21.89,19.14L15.89,13.14L13.78,15.3M17.5,10.1C17.11,10.1 16.69,10.05 16.36,9.91L4.97,21.25L2.86,19.14L10.27,11.74L8.5,9.96L7.78,10.66L6.33,9.25V12.11L5.63,12.81L2.11,9.25L2.81,8.55H5.62L4.22,7.14L7.78,3.58C8.95,2.41 10.83,2.41 12,3.58L9.89,5.74L11.3,7.14L10.59,7.85L12.38,9.63L14.2,7.75C14.06,7.42 14,7 14,6.63C14,4.66 15.56,3.11 17.5,3.11C18,3.11 18.5,3.23 18.97,3.44L16.64,5.77L17.85,7L20.17,4.68C20.38,5.15 20.5,5.65 20.5,6.13C20.5,8.11 18.94,9.66 17,9.66C16.63,9.66 16.2,9.6 15.87,9.46L13.78,15.3Z"/>
            </svg>
            teknologi yang digunakan
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
