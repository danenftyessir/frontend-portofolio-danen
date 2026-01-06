"use client";

import React from "react";
import { motion } from "framer-motion";

const projectsData = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20A2,2 0 0,0 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z"/>
      </svg>
    ),
    title: "rush hour solver",
    type: "algorithm project",
    description:
      "implementasi multiple pathfinding algorithms (a*, dijkstra, ucs, greedy best-first) untuk menyelesaikan rush hour puzzle dengan visualisasi step-by-step",
    tech: ["Python", "Algorithm Design", "Pathfinding", "Visualization"],
    features: [
      "optimal solution finding",
      "multiple algorithm comparison",
      "interactive visualization",
      "performance optimization",
    ],
    year: "2023",
    status: "completed",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
      </svg>
    ),
    title: "little alchemy search",
    type: "search optimization",
    description:
      "algoritma pencarian optimal untuk game little alchemy menggunakan bfs, dfs, dan graph theory untuk menemukan kombinasi recipe terbaik",
    tech: ["Graph Theory", "BFS", "DFS", "Optimization"],
    features: [
      "recipe combination solver",
      "shortest path finding",
      "game state optimization",
      "efficient search algorithms",
    ],
    year: "2023",
    status: "completed",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"/>
      </svg>
    ),
    title: "iq puzzler solver",
    type: "backtracking engine",
    description:
      "solver untuk iq puzzler game menggunakan backtracking algorithm dengan optimasi pruning untuk menyelesaikan puzzle kompleks",
    tech: ["Java", "Backtracking", "Constraint Satisfaction", "Optimization"],
    features: [
      "puzzle piece placement",
      "constraint satisfaction solving",
      "backtracking with pruning",
      "multiple solution finding",
    ],
    year: "2023",
    status: "completed",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M17.5,15.5C17.5,16.61 16.61,17.5 15.5,17.5C14.39,17.5 13.5,16.61 13.5,15.5C13.5,14.39 14.39,13.5 15.5,13.5C16.61,13.5 17.5,14.39 17.5,15.5M8.5,15.5C8.5,16.61 7.61,17.5 6.5,17.5C5.39,17.5 4.5,16.61 4.5,15.5C4.5,14.39 5.39,13.5 6.5,13.5C7.61,13.5 8.5,14.39 8.5,15.5M12,0C7,0 2.73,3.11 1.23,7.39C0.46,7.39 0,8.11 0,9V11.5C0,12.39 0.46,13.11 1.23,13.11C1.83,15.92 3.71,18.28 6.21,19.64L6.5,19.11C6.5,19.11 7,18 8.5,18H13.5C15,18 15.5,19.11 15.5,19.11L15.79,19.64C18.29,18.28 20.17,15.92 20.77,13.11C21.54,13.11 22,12.39 22,11.5V9C22,8.11 21.54,7.39 20.77,7.39C19.27,3.11 15,0 12,0Z"/>
      </svg>
    ),
    title: "ai portfolio assistant",
    type: "fullstack ai app",
    description:
      "portfolio interaktif dengan ai assistant yang dilatih menggunakan knowledge base personal. built with next.js frontend dan fastapi backend",
    tech: ["Next.js", "FastAPI", "AI/ML", "TypeScript", "Tailwind"],
    features: [
      "interactive ai chat",
      "knowledge base integration",
      "responsive design",
      "real-time conversations",
    ],
    year: "2024-2025",
    status: "in progress",
    color: "from-blue-500 to-indigo-600",
  },
];

interface ProjectHighlightsProps {
  variant?: "dark" | "light";
}

export const ProjectHighlights = ({
  variant = "light",
}: ProjectHighlightsProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-600"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 font-mono flex items-center justify-center gap-3">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20A2,2 0 0,0 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z"/>
          </svg>
          featured projects
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-mono">
          beberapa project yang paling challenging dan educational
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 cursor-pointer group h-full flex flex-col"
          >
            {/* project header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${project.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}
              >
                {project.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1 font-mono group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 bg-gradient-to-r ${project.color} bg-opacity-20 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold font-mono`}
                  >
                    {project.type}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-mono font-semibold ${
                      project.status === "completed"
                        ? "text-green-600 dark:text-green-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {project.year}
                </p>
              </div>
            </div>

            {/* project description */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
              {project.description}
            </p>

            {/* project features */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 font-mono">
                key features:
              </h5>
              <ul className="space-y-2">
                {project.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500 flex-shrink-0">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                    <span className="font-mono">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* tech stack */}
            <div>
              <h5 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 font-mono">
                tech stack:
              </h5>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full font-mono font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* call to action */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-600"
      >
        <p className="text-gray-600 dark:text-gray-300 font-mono mb-4">
          tertarik untuk mengetahui lebih detail tentang project-project ini?
        </p>
        <motion.button
          onClick={() =>
            document
              .getElementById("ai-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold font-mono transition-all duration-300 hover:scale-105 hover:shadow-lg"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.5,15.5C17.5,16.61 16.61,17.5 15.5,17.5C14.39,17.5 13.5,16.61 13.5,15.5C13.5,14.39 14.39,13.5 15.5,13.5C16.61,13.5 17.5,14.39 17.5,15.5M8.5,15.5C8.5,16.61 7.61,17.5 6.5,17.5C5.39,17.5 4.5,16.61 4.5,15.5C4.5,14.39 5.39,13.5 6.5,13.5C7.61,13.5 8.5,14.39 8.5,15.5M12,0C7,0 2.73,3.11 1.23,7.39C0.46,7.39 0,8.11 0,9V11.5C0,12.39 0.46,13.11 1.23,13.11C1.83,15.92 3.71,18.28 6.21,19.64L6.5,19.11C6.5,19.11 7,18 8.5,18H13.5C15,18 15.5,19.11 15.5,19.11L15.79,19.64C18.29,18.28 20.17,15.92 20.77,13.11C21.54,13.11 22,12.39 22,11.5V9C22,8.11 21.54,7.39 20.77,7.39C19.27,3.11 15,0 12,0Z"/>
          </svg>
          <span>tanya ai assistant saya!</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
