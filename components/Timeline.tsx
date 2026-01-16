"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineItemData {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  tech: string[];
  type: "education" | "work" | "project" | "achievement";
  color: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItemData[] = [
  {
    id: "direktorat-spsi-itb",
    year: "2025",
    period: "October 2025 - Present",
    title: "Software Engineer (Contract)",
    organization: "Direktorat Sarana Prasarana & Sistem Informasi ITB",
    description:
      "Developed end-to-end reporting system and data visualization dashboard for eFacility web platform by designing comprehensive report workflow engine using state machine pattern to handle submission-to-resolution lifecycle atomically and reliably, implementing dynamic task assignment system enabling admin-driven technician allocation based on priority, workload, and expertise matching, building data visualization dashboard with category-based aggregations, time-series trend analysis, and real-time status monitoring for actionable insights, and developing analytical features including funnel analysis, conversion tracking, and performance metrics to support operational decision making.",
    tech: ["Workflow Automation", "Data Visualization", "Dashboard Development", "State Management", "Analytics", "Full-Stack Development"],
    type: "work",
    color: "from-blue-600 to-indigo-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
      </svg>
    ),
  },
  {
    id: "ralat-ind",
    year: "2025",
    period: "July - November 2025",
    title: "Frontend Engineer (Internship)",
    organization: "Ralat.ind",
    description:
      "Built adaptive learning platform for personalized UTBK preparation experience by developing daily flashcard system using spaced repetition algorithm that adaptively adjusts difficulty based on user performance and retention patterns, implementing comprehensive progress tracking engine with multi-dimensional gamification (streaks, badges, XP, leaderboards) to drive sustained user engagement, building analytics-ready event tracking system collecting granular behavioral data for future recommendation engine and personalized learning paths, and collaborating with product team to translate learning science principles into engaging interactive features balancing fun with educational effectiveness.",
    tech: ["React.js", "State Management", "Gamification", "Behavioral Analytics", "User Engagement", "Product Development"],
    type: "work",
    color: "from-emerald-500 to-teal-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z"/>
      </svg>
    ),
  },
  {
    id: "bengkel-code",
    year: "2025",
    period: "June - October 2025",
    title: "Software Engineer (Freelance)",
    organization: "Bengkel Code",
    description:
      "Executed end-to-end website modernization for MPM UPNVJ organization by leading complete website redesign using mobile-first responsive architecture ensuring seamless experience across all device sizes and orientations, implementing custom Google Sheets API integration enabling real-time data collection with automatic sync, error recovery, and data validation, building downloadable digital booklet generation system with dynamic content rendering, PDF export capabilities, and asset optimization, and conducting comprehensive testing including edge case simulation, load testing, and error handling validation to ensure production-ready reliability.",
    tech: ["Responsive Design", "API Integration", "Google Sheets API", "PDF Generation", "Testing & QA", "Production Deployment"],
    type: "work",
    color: "from-orange-500 to-amber-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20,6H16V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V6H4C2.89,6 2,6.89 2,8V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V8C22,6.89 21.1,6 20,6M10,4H14V6H10V4M20,19H4V8H20V19Z"/>
      </svg>
    ),
  },
  {
    id: "arkavidia",
    year: "2024",
    period: "November 2024 - May 2025",
    title: "Data Science Academy Staff",
    organization: "Arkavidia",
    description:
      "Served as liaison officer and master of ceremony in 6-day intensive data science bootcamp by managing end-to-end participant support journey for 8 groups (24 participants) including technical guidance, progress monitoring, and bottleneck resolution, facilitating effective communication between participants, mentors, and expert speakers with proactive issue identification and rapid resolution protocols, delivering engaging master of ceremony duties maintaining high energy level, ensuring smooth session transitions, and creating positive learning environment, and coordinating logistical aspects of multi-day bootcamp including schedule management, resource allocation, and contingency planning for seamless execution.",
    tech: ["Leadership", "Communication", "Event Coordination", "Participant Support", "Community Building", "Problem Solving"],
    type: "work",
    color: "from-purple-500 to-violet-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z"/>
      </svg>
    ),
  },
  {
    id: "comlabs-itb",
    year: "2024",
    period: "October - December 2024",
    title: "Computational Thinking Assistant",
    organization: "Comlabs-USDI ITB",
    description:
      "Mentored and assessed computational thinking practicum by facilitating 2 Python-based practicum sessions with duration equivalent 2 credit hours combining theoretical explanation with hands-on problem solving, providing comprehensive code assessments for ~70 participants across 3 sessions with focus on algorithmic thinking, code readability, and best practices, developing rubric-based evaluation system assessing problem-solving approach, code efficiency, and programming fundamentals objectively and consistently, and giving personalized feedback helping students understand weaknesses and improve computational thinking skills in structured manner.",
    tech: ["Python", "Teaching", "Code Assessment", "Algorithmic Thinking", "Pedagogy", "Problem Solving"],
    type: "work",
    color: "from-cyan-500 to-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
      </svg>
    ),
  },
  {
    id: "pakansuper",
    year: "2023",
    period: "August - December 2023",
    title: "Software Engineer",
    organization: "Pakansuper Marketplace",
    description:
      "Led development of end-to-end web-based marketplace for farmers and breeders by designing and implementing full-stack marketplace solution from ground up with focus on user experience for less tech-savvy agricultural community, leading cross-functional team with responsibilities spanning technical architecture, product design, project management, and go-to-market strategy, developing innovative features addressing real agricultural supply chain challenges and creating tangible economic impact for farming communities, and managing end-to-end product lifecycle from ideation, development, testing, to deployment with focus on quality, scalability, and user adoption.",
    tech: ["Full-Stack Development", "Product Leadership", "Team Management", "System Design", "User-Centered Design", "Go-to-Market"],
    type: "work",
    color: "from-green-500 to-lime-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12Z"/>
      </svg>
    ),
  },
];

const TimelineItem = ({
  item,
  index,
}: {
  item: TimelineItemData;
  index: number;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
      {/* Empty spacer for center alignment */}
      <div className="hidden md:block w-5/12"></div>

      {/* Center dot */}
      <div className="relative flex items-center justify-center w-8 md:w-12 flex-shrink-0">
        <motion.div
          className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-white shadow-lg z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        />
      </div>

      {/* Content card */}
      <motion.div
        className="w-full md:w-5/12 px-4 md:px-6"
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Period badge */}
          <div className="mb-3">
            <span
              className={`inline-block px-3 py-1 bg-gradient-to-r ${item.color} text-white rounded-full text-xs font-semibold font-ubuntu`}
            >
              {item.period}
            </span>
          </div>

          {/* Title and Organization */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-ubuntu">
            {item.title}
          </h3>
          <p className="text-sm font-semibold text-gray-600 mb-4 font-ubuntu">
            {item.organization}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed mb-4 font-ubuntu">
            {item.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {item.tech.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-ubuntu"
              >
                {tech}
              </span>
            ))}
            {item.tech.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-ubuntu">
                +{item.tech.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Timeline = () => {
  return (
    <div className="relative max-w-5xl mx-auto px-4">
      {/* Vertical line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400" />

      {/* Timeline items */}
      <div className="py-8">
        {timelineData.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};
