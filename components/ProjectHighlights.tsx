"use client";

import React from "react";
import { motion } from "framer-motion";

const projectsData = [
  {
    icon: "🧩",
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
    icon: "🔍",
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
    icon: "🎯",
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
    icon: "🤖",
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
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 font-mono">
          🧩 featured projects
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
                    <span className="text-green-500 text-xs">✓</span>
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
          <span>🤖</span>
          <span>tanya ai assistant saya!</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
