"use client";

import React from "react";
import { motion } from "framer-motion";

interface AchievementItemData {
  id: string;
  period: string;
  title: string;
  event: string;
  description: string;
  medal: "gold" | "silver" | "special";
  certificate?: string;
}

const achievementsData: AchievementItemData[] = [
  {
    id: "nitro-ump-hackathon",
    period: "May 2026",
    title: "2nd Place Winner – Nitro UMP Hackathon",
    event: "National Information Technology Roll Out, Universitas Muhammadiyah Purwokerto",
    description:
      "Awarded second place for developing Karsa, a KKN-based digital platform designed to extend the impact of university community service into internship and recruitment opportunities.",
    medal: "silver",
    certificate: "/Danendra%20Shafi%20Athallah%20(3).pdf",
  },
  {
    id: "it-fair-xiv-hackathon",
    period: "Dec 2025",
    title: "1st Place Winner – IT FAIR XIV Hackathon",
    event: "HIMATIF UIN Sunan Gunung Djati, Bandung",
    description:
      "Awarded first place for developing MBG, a data-driven transparency platform for school meal distribution under the theme Smart Solutions with AI & Blockchain.",
    medal: "gold",
    certificate: "/Danendra%20Shafi%20Athallah%20(1).pdf",
  },
  {
    id: "s-technophoria-webdev",
    period: "Oct 2025",
    title: "1st Place Winner – Web Development Competition",
    event: "Soedirman Technophoria 2025, Purwokerto",
    description:
      "Achieved first place for building KKN-Go, a web platform designed to enhance efficiency, transparency, and real-world impact of university community service programs.",
    medal: "gold",
    certificate: "/Danendra%20Shafi%20Athallah%20(2).pdf",
  },
  {
    id: "pakansuper-best-team",
    period: "Dec 2023",
    title: "Best Team as Software Engineer – Pakansuper 2023",
    event: "Pakansuper 2023, Bandung",
    description:
      "Selected as the best team among Top 9 Teams 2023 and represented the campus at bigger events.",
    medal: "special",
  },
];

const medalStyles: Record<AchievementItemData["medal"], string> = {
  gold: "text-yellow-500",
  silver: "text-gray-400",
  special: "text-amber-600",
};

const AchievementItem = ({ item }: { item: AchievementItemData }) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex gap-4">
        {/* Left column - Time period */}
        <div className="w-32 flex-shrink-0 text-sm text-gray-400 font-ubuntu pt-1">
          {item.period}
        </div>

        {/* Right column - Achievement details */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-semibold text-black mb-1 font-ubuntu flex items-center gap-2">
            <i className={`bx bxs-medal text-xl ${medalStyles[item.medal]}`}></i>
            {item.title}
          </h3>

          {/* Event */}
          <p className="text-base text-gray-600 mb-3 font-ubuntu">
            {item.event}
          </p>

          {/* Description */}
          <p className="text-sm text-black leading-relaxed mb-4 font-ubuntu">
            {item.description}
          </p>

          {/* Certificate link */}
          {item.certificate && (
            <a
              href={item.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-600 underline underline-offset-4 transition-colors duration-200 font-ubuntu"
            >
              <i className="bx bx-file-blank text-base"></i>
              View Certificate
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Achievements = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {achievementsData.map((item) => (
        <AchievementItem key={item.id} item={item} />
      ))}
    </div>
  );
};
