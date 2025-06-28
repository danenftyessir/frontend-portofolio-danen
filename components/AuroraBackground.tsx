"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  showRadialGradient?: boolean;
  interactive?: boolean;
}

export const AuroraBackground = ({
  className,
  showRadialGradient = true,
  interactive = false,
}: AuroraBackgroundProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveRef.current) return;

      const rect = interactiveRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      interactiveRef.current.style.setProperty("--mouse-x", `${x}px`);
      interactiveRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const element = interactiveRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      return () => element.removeEventListener("mousemove", handleMouseMove);
    }
  }, [interactive]);

  return (
    <div
      ref={interactiveRef}
      className={cn(
        "relative overflow-hidden",
        interactive && "cursor-none",
        className
      )}
    >
      {/* base gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/30" />
        {showRadialGradient && (
          <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
        )}
      </div>

      {/* aurora blobs dengan motion */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        style={{
          background: "linear-gradient(45deg, #667eea, #764ba2)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        style={{
          background: "linear-gradient(45deg, #f093fb, #f5576c)",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-40 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        style={{
          background: "linear-gradient(45deg, #4facfe, #00f2fe)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* additional smaller blobs */}
      <motion.div
        className="absolute top-20 left-1/3 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl opacity-50"
        style={{
          background: "linear-gradient(45deg, #a8edea, #fed6e3)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl opacity-50"
        style={{
          background: "linear-gradient(45deg, #ffecd2, #fcb69f)",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* interactive mouse follower */}
      {interactive && (
        <div
          className="absolute w-60 h-60 rounded-full pointer-events-none mix-blend-multiply filter blur-2xl opacity-30 transition-all duration-300"
          style={{
            background: "linear-gradient(45deg, #ff9a9e, #fecfef)",
            left: "var(--mouse-x, 50%)",
            top: "var(--mouse-y, 50%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  );
};

// floating geometric shapes untuk tambahan visual
export const FloatingShapes = () => {
  const shapes = [
    { size: "w-4 h-4", delay: 0 },
    { size: "w-6 h-6", delay: 2 },
    { size: "w-3 h-3", delay: 4 },
    { size: "w-5 h-5", delay: 1 },
    { size: "w-7 h-7", delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={cn("absolute bg-white/10 rounded-lg", shape.size)}
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// animated waves untuk footer
export const AnimatedWaves = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg
        className="relative block w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="rgba(255,255,255,0.1)"
          animate={{
            d: [
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
              "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
};

export default AuroraBackground;
