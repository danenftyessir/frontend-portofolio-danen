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
    id: "direktorat-spsi-itb",
    year: "2025",
    period: "oktober 2025 - sekarang",
    title: "software engineer (contract)",
    organization: "direktorat sarana prasarana & sistem informasi itb",
    description:
      "mengembangkan end-to-end reporting system dan data visualization dashboard untuk eFacility web platform dengan merancang comprehensive report workflow engine menggunakan state machine pattern yang handle submission-to-resolution lifecycle secara atomik dan reliable, mengimplementasikan dynamic task assignment system yang memungkinkan admin-driven technician allocation berdasarkan priority, workload, dan expertise matching, membangun data visualization dashboard dengan category-based aggregations, time-series trend analysis, dan real-time status monitoring untuk actionable insights, serta mengembangkan analytical features termasuk funnel analysis, conversion tracking, dan performance metrics yang support operational decision making.",
    details: [],
    achievements: [
      "berhasil mengimplementasikan scalable reporting workflow yang handle ribuan facility reports dengan proper state management dan audit trail",
      "menciptakan data-driven dashboard yang membantu administrative users dalam monitoring operational performance dan identifying bottleneck areas",
      "contributing ke digital transformation initiative yang meningkatkan operational efficiency dan service delivery quality",
    ],
    tech: ["Workflow Automation", "Data Visualization", "Dashboard Development", "State Management", "Analytics", "Full-Stack Development"],
    type: "work",
    color: "from-blue-600 to-indigo-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
      </svg>
    ),
  },
  {
    id: "ralat-ind",
    year: "2025",
    period: "juli - november 2025",
    title: "frontend engineer (internship)",
    organization: "ralat.ind",
    description:
      "membangun adaptive learning platform untuk personalized UTBK preparation experience dengan mengembangkan daily flashcard system menggunakan spaced repetition algorithm yang adaptively adjust difficulty berdasarkan user performance dan retention patterns, mengimplementasikan comprehensive progress tracking engine dengan multi-dimensional gamification (streaks, badges, XP, leaderboards) untuk drive sustained user engagement, membangun analytics-ready event tracking system yang collect granular behavioral data untuk future recommendation engine dan personalized learning paths, serta collaborating dengan product team untuk translate learning science principles ke engaging interactive features yang balance fun dengan educational effectiveness.",
    details: [],
    achievements: [
      "berhasil men-develop foundation gamification infrastructure yang enables data-driven personalization untuk thousands of users",
      "mengimplementasikan scalable user engagement system yang capture behavioral insights untuk future ML-driven recommendation features",
      "contributing ke product evolution dari MVP ke production-ready platform dengan measurable improvements di user retention dan completion rates",
    ],
    tech: ["React.js", "State Management", "Gamification", "Behavioral Analytics", "User Engagement", "Product Development"],
    type: "work",
    color: "from-emerald-500 to-teal-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z"/>
      </svg>
    ),
  },
  {
    id: "bengkel-code",
    year: "2025",
    period: "juni - oktober 2025",
    title: "software engineer (freelance)",
    organization: "bengkel code",
    description:
      "melakukan end-to-end website modernization untuk organisasi MPM UPNVJ dengan memimpin complete website redesign menggunakan mobile-first responsive architecture yang ensure seamless experience di semua device sizes dan orientations, mengimplementasikan custom Google Sheets API integration yang enable real-time data collection dengan automatic sync, error recovery, dan data validation, membangun downloadable digital booklet generation system dengan dynamic content rendering, PDF export capabilities, dan asset optimization, serta conducting comprehensive testing termasuk edge case simulation, load testing, dan error handling validation untuk ensure production-ready reliability.",
    details: [],
    achievements: [
      "berhasil delivering modernized website yang significantly improve user engagement dan organizational digital presence",
      "mengimplementasikan reliable data collection system yang streamline operational workflows dan reduce manual data processing overhead",
      "establishing robust testing methodology yang catch critical edge cases sebelum production deployment",
    ],
    tech: ["Responsive Design", "API Integration", "Google Sheets API", "PDF Generation", "Testing & QA", "Production Deployment"],
    type: "work",
    color: "from-orange-500 to-amber-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20,6H16V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V6H4C2.89,6 2,6.89 2,8V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V8C22,6.89 21.1,6 20,6M10,4H14V6H10V4M20,19H4V8H20V19Z"/>
      </svg>
    ),
  },
  {
    id: "arkavidia",
    year: "2024",
    period: "november 2024 - mei 2025",
    title: "data science academy staff",
    organization: "arkavidia",
    description:
      "berperan sebagai liaison officer dan master of ceremony dalam 6-hari intensive data science bootcamp dengan managing end-to-end participant support journey untuk 8 groups (24 participants) termasuk technical guidance, progress monitoring, dan bottleneck resolution, facilitating effective communication antara participants, mentors, dan expert speakers dengan proactive issue identification dan rapid resolution protocols, delivering engaging master of ceremony duties yang maintain high energy level, ensure smooth session transitions, dan create positive learning environment, serta coordinating logistical aspects dari multi-day bootcamp termasuk schedule management, resource allocation, dan contingency planning untuk seamless execution.",
    details: [],
    achievements: [
      "berhasil memfasilitasi positive learning experience yang menerima strong participant feedback dan high completion rate",
      "mengembangkan strong communication dan leadership skills dalam fast-paced, high-stakes environment dengan multiple stakeholders",
      "contributing ke data science community building dengan creating engaging, informative sessions yang inspire continued learning",
    ],
    tech: ["Leadership", "Communication", "Event Coordination", "Participant Support", "Community Building", "Problem Solving"],
    type: "work",
    color: "from-purple-500 to-violet-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z"/>
      </svg>
    ),
  },
  {
    id: "comlabs-itb",
    year: "2024",
    period: "oktober - desember 2024",
    title: "computational thinking assistant",
    organization: "comlabs-usdi itb",
    description:
      "membimbing dan mengases practicum computational thinking dengan memfasilitasi 2 sessions praktikum berbasis Python dengan duration equivalent 2 credit hours yang mengkombinasikan theoretical explanation dengan hands-on problem solving, memberikan comprehensive code assessments untuk ~70 participants across 3 sessions dengan focus pada algorithmic thinking, code readability, dan best practices, mengembangkan rubric-based evaluation system yang assess problem-solving approach, code efficiency, dan programming fundamentals secara objective dan consistent, serta memberikan personalized feedback yang help students understand weaknesses dan improve computational thinking skills secara structured.",
    details: [],
    achievements: [
      "berhasil membimbing 70+ students dalam developing foundational programming skills dengan measurable improvements di code quality dan problem-solving abilities",
      "mengimplementasikan fair assessment methodology yang provide actionable feedback untuk student growth",
      "contributing ke academic mission dengan ensuring students develop strong computational thinking fundamentals untuk advanced CS coursework",
    ],
    tech: ["Python", "Teaching", "Code Assessment", "Algorithmic Thinking", "Pedagogy", "Problem Solving"],
    type: "work",
    color: "from-cyan-500 to-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
      </svg>
    ),
  },
  {
    id: "pakansuper",
    year: "2023",
    period: "agustus - desember 2023",
    title: "software engineer",
    organization: "pakansuper marketplace",
    description:
      "memimpin development end-to-end web-based marketplace untuk farmers dan breeders dengan merancang dan mengimplementasikan full-stack marketplace solution dari ground up dengan focus pada user experience untuk less tech-savvy agricultural community, memimpin cross-functional team dengan responsibilities spanning technical architecture, product design, project management, dan go-to-market strategy, mengembangkan innovative features yang address real agricultural supply chain challenges dan create tangible economic impact untuk farming communities, serta managing end-to-end product lifecycle dari ideation, development, testing, hingga deployment dengan focus pada quality, scalability, dan user adoption.",
    details: [],
    achievements: [
      "berhasil mencapai selection sebagai ONLY project representing ITB di campus fair dari 9 competing teams",
      "membangun high-performing team culture yang delivered production-ready application dalam tight timeline",
      "menciptakan measurable social impact dengan addressing real-world agricultural challenges melalui technology innovation",
    ],
    tech: ["Full-Stack Development", "Product Leadership", "Team Management", "System Design", "User-Centered Design", "Go-to-Market"],
    type: "work",
    color: "from-green-500 to-lime-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z"/>
      </svg>
    ),
  },
  {
    id: "itb-education",
    year: "2023",
    period: "agustus 2023 - sekarang",
    title: "bachelor of computer science",
    organization: "institut teknologi bandung",
    description:
      "pursuing rigorous computer science education dengan dual focus pada artificial intelligence dan software engineering dengan mastering fundamental cs concepts termasuk algorithms, data structures, dan software engineering principles dengan academic rigor, specializing di ai/ml domains dengan coursework di machine learning, computer vision, dan natural language processing, applying theoretical knowledge melalui competitive programming, hackathons, dan diverse portfolio projects, serta building strong technical foundation yang enables effective problem-solving di complex, real-world scenarios.",
    details: [],
    achievements: [
      "maintaining excellent academic performance while balancing dengan multiple professional work commitments",
      "developing comprehensive, industry-relevant skill set yang spans ai engineering dan software development",
      "establishing strong network dengan peers, faculty, dan tech community untuk continuous growth dan collaboration",
    ],
    tech: ["Python", "Java", "Machine Learning", "Algorithms", "Data Structures", "Software Engineering"],
    type: "education",
    color: "from-indigo-500 to-purple-600",
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
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
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
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
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
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          {item.year}
        </motion.div>
      </motion.div>
    </div>
  );
};

const TimelineDetails = ({ item }: { item: TimelineItemData }) => {
  const hasDetails = item.details && item.details.length > 0;
  const hasAchievements = item.achievements && item.achievements.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 mx-4 lg:mx-0"
    >
      <div className="glass-strong rounded-2xl p-8 border-l-4 border-indigo-500">
        {(hasDetails || hasAchievements) && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* details */}
            {hasDetails && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
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
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                    >
                      <span className="text-indigo-400 mt-1">•</span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* achievements */}
            {hasAchievements && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
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
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                    >
                      <span className="text-green-400 mt-1">✓</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        )}

        {/* all tech stack */}
        <motion.div
          className="mt-8 pt-6 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
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
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
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
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-2xl font-bold text-center mb-8 gradient-text">
          impact dalam angka
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="text-3xl font-bold text-indigo-400 mb-2">2+</div>
            <div className="text-sm text-white/70">years experience</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
            <div className="text-sm text-white/70">hackathon wins</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="text-3xl font-bold text-green-400 mb-2">70+</div>
            <div className="text-sm text-white/70">students mentored</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="text-3xl font-bold text-orange-400 mb-2">3</div>
            <div className="text-sm text-white/70">research papers</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
