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
}

const timelineData: TimelineItemData[] = [
  {
    id: "direktorat-spsi-itb",
    year: "2025",
    period: "Oct 2025 - Present",
    title: "Software Engineer (Contract)",
    organization: "Direktorat Sarana Prasarana & Sistem Informasi ITB",
    description:
      "Developed end-to-end reporting system and data visualization dashboard for eFacility web platform by designing comprehensive report workflow engine using state machine pattern to handle submission-to-resolution lifecycle atomically and reliably, implementing dynamic task assignment system enabling admin-driven technician allocation based on priority, workload, and expertise matching, building data visualization dashboard with category-based aggregations, time-series trend analysis, and real-time status monitoring for actionable insights, and developing analytical features including funnel analysis, conversion tracking, and performance metrics to support operational decision making.",
    tech: ["Workflow Automation", "Data Visualization", "Dashboard Development", "State Management", "Analytics", "Full-Stack Development"],
    type: "work",
  },
  {
    id: "ralat-ind",
    year: "2025",
    period: "Jul 2025 - Nov 2025",
    title: "Frontend Engineer (Internship)",
    organization: "Ralat.ind",
    description:
      "Built adaptive learning platform for personalized UTBK preparation experience by developing daily flashcard system using spaced repetition algorithm that adaptively adjusts difficulty based on user performance and retention patterns, implementing comprehensive progress tracking engine with multi-dimensional gamification (streaks, badges, XP, leaderboards) to drive sustained user engagement, building analytics-ready event tracking system collecting granular behavioral data for future recommendation engine and personalized learning paths, and collaborating with product team to translate learning science principles into engaging interactive features balancing fun with educational effectiveness.",
    tech: ["React.js", "State Management", "Gamification", "Behavioral Analytics", "User Engagement", "Product Development"],
    type: "work",
  },
  {
    id: "bengkel-code",
    year: "2025",
    period: "Jun 2025 - Oct 2025",
    title: "Software Engineer (Freelance)",
    organization: "Bengkel Code",
    description:
      "Executed end-to-end website modernization for MPM UPNVJ organization by leading complete website redesign using mobile-first responsive architecture ensuring seamless experience across all device sizes and orientations, implementing custom Google Sheets API integration enabling real-time data collection with automatic sync, error recovery, and data validation, building downloadable digital booklet generation system with dynamic content rendering, PDF export capabilities, and asset optimization, and conducting comprehensive testing including edge case simulation, load testing, and error handling validation to ensure production-ready reliability.",
    tech: ["Responsive Design", "API Integration", "Google Sheets API", "PDF Generation", "Testing & QA", "Production Deployment"],
    type: "work",
  },
  {
    id: "arkavidia",
    year: "2024",
    period: "Nov 2024 - May 2025",
    title: "Data Science Academy Staff",
    organization: "Arkavidia",
    description:
      "Served as liaison officer and master of ceremony in 6-day intensive data science bootcamp by managing end-to-end participant support journey for 8 groups (24 participants) including technical guidance, progress monitoring, and bottleneck resolution, facilitating effective communication between participants, mentors, and expert speakers with proactive issue identification and rapid resolution protocols, delivering engaging master of ceremony duties maintaining high energy level, ensuring smooth session transitions, and creating positive learning environment, and coordinating logistical aspects of multi-day bootcamp including schedule management, resource allocation, and contingency planning for seamless execution.",
    tech: ["Leadership", "Communication", "Event Coordination", "Participant Support", "Community Building", "Problem Solving"],
    type: "work",
  },
  {
    id: "comlabs-itb",
    year: "2024",
    period: "Oct 2024 - Dec 2024",
    title: "Computational Thinking Assistant",
    organization: "Comlabs-USDI ITB",
    description:
      "Mentored and assessed computational thinking practicum by facilitating 2 Python-based practicum sessions with duration equivalent 2 credit hours combining theoretical explanation with hands-on problem solving, providing comprehensive code assessments for ~70 participants across 3 sessions with focus on algorithmic thinking, code readability, and best practices, developing rubric-based evaluation system assessing problem-solving approach, code efficiency, and programming fundamentals objectively and consistently, and giving personalized feedback helping students understand weaknesses and improve computational thinking skills in structured manner.",
    tech: ["Python", "Teaching", "Code Assessment", "Algorithmic Thinking", "Pedagogy", "Problem Solving"],
    type: "work",
  },
  {
    id: "pakansuper",
    year: "2023",
    period: "Aug 2023 - Dec 2023",
    title: "Software Engineer",
    organization: "Pakansuper Marketplace",
    description:
      "Led development of end-to-end web-based marketplace for farmers and breeders by designing and implementing full-stack marketplace solution from ground up with focus on user experience for less tech-savvy agricultural community, leading cross-functional team with responsibilities spanning technical architecture, product design, project management, and go-to-market strategy, developing innovative features addressing real agricultural supply chain challenges and creating tangible economic impact for farming communities, and managing end-to-end product lifecycle from ideation, development, testing, to deployment with focus on quality, scalability, and user adoption.",
    tech: ["Full-Stack Development", "Product Leadership", "Team Management", "System Design", "User-Centered Design", "Go-to-Market"],
    type: "work",
  },
];

const TimelineItem = ({
  item,
  index,
}: {
  item: TimelineItemData;
  index: number;
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex gap-4">
        {/* Left column - Time period */}
        <div className="w-32 flex-shrink-0 text-sm text-gray-400 font-ubuntu pt-1">
          {item.period}
        </div>

        {/* Right column - Job details */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-semibold text-black mb-1 font-ubuntu">
            {item.title}
          </h3>

          {/* Organization */}
          <p className="text-base text-gray-600 mb-3 font-ubuntu">
            {item.organization}
          </p>

          {/* Description */}
          <p className="text-sm text-black leading-relaxed mb-4 font-ubuntu">
            {item.description}
          </p>

          {/* Tech tags */}
          <div className="text-sm text-gray-500 font-ubuntu">
            {item.tech.join(" · ")}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Timeline = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {timelineData.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};
