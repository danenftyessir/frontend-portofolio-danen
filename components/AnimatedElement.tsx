"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const AnimatedElement = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
  threshold = 0.1,
}: AnimatedElementProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();

  const getInitialVariants = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      case "fade":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getAnimateVariants = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getAnimateVariants());
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialVariants()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};

// komponen khusus untuk staggered animations
interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const StaggeredContainer = ({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggeredContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            delayChildren: initialDelay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// komponen untuk experience cards dengan hover effects minimalist
interface ExperienceCardProps {
  title: string;
  organization: string;
  duration: string;
  description: string;
  delay?: number;
  variant?: "dark" | "light";
}

export const ExperienceCard = ({
  title,
  organization,
  duration,
  description,
  delay = 0,
  variant = "dark",
}: ExperienceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardBg =
    variant === "dark"
      ? "bg-gray-800/60 border-gray-700/50"
      : "bg-white/60 border-gray-300/50";

  const textColor = variant === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = variant === "dark" ? "text-gray-300" : "text-gray-600";
  const textMuted = variant === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <AnimatedElement delay={delay} direction="up">
      <motion.div
        className={`${cardBg} backdrop-blur-md border-2 rounded-2xl p-6 shadow-xl transition-all duration-300`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          scale: 1.02,
          y: -8,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <h3 className={`text-lg font-bold ${textColor} mb-2`}>{title}</h3>
          <p className={`${textSecondary} font-semibold mb-1`}>
            {organization}
          </p>
          <p className={`${textMuted} text-sm mb-3 font-medium`}>{duration}</p>
          <p className={`${textColor} text-sm leading-relaxed`}>
            {description}
          </p>
        </motion.div>
      </motion.div>
    </AnimatedElement>
  );
};

// komponen untuk project highlight cards minimalist
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  delay?: number;
  variant?: "dark" | "light";
}

export const ProjectCard = ({
  title,
  description,
  technologies,
  link,
  delay = 0,
  variant = "dark",
}: ProjectCardProps) => {
  const cardBg =
    variant === "dark"
      ? "bg-gray-800/60 border-gray-700/50"
      : "bg-white/60 border-gray-300/50";

  const textColor = variant === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = variant === "dark" ? "text-gray-300" : "text-gray-600";
  const badgeClass =
    variant === "dark"
      ? "bg-gray-700/50 text-gray-300"
      : "bg-gray-100/50 text-gray-600";

  return (
    <AnimatedElement delay={delay} direction="up">
      <motion.div
        className={`${cardBg} backdrop-blur-md border-2 rounded-2xl p-6 h-full flex flex-col shadow-xl`}
        whileHover={{
          scale: 1.02,
          y: -5,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <h3 className={`text-xl font-bold ${textColor} mb-4`}>{title}</h3>
        <p className={`${textColor} mb-6 flex-grow leading-relaxed`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className={`px-3 py-1 ${badgeClass} text-xs rounded-full font-medium`}
            >
              {tech}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textSecondary} hover:${textColor} transition-colors font-semibold text-sm hover:scale-105 inline-block`}
          >
            Lihat Detail →
          </a>
        )}
      </motion.div>
    </AnimatedElement>
  );
};

// scroll progress indicator minimalist
export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-gray-800 z-50 origin-left shadow-lg"
      style={{
        scaleX: scrollProgress / 100,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1 }}
    />
  );
};

// section wrapper dengan partikel minimalist
interface ParticlesSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  particleCount?: number;
}

export const ParticlesSection = ({
  children,
  className,
  variant = "dark",
  particleCount = 20,
}: ParticlesSectionProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* floating particles minimalist */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              variant === "dark" ? "bg-white/20" : "bg-gray-800/20"
            } animate-float-particle opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// timeline component minimalist
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
  variant?: "dark" | "light";
}

export const TimelineItem = ({
  year,
  title,
  description,
  isLast = false,
  variant = "dark",
}: TimelineItemProps) => {
  const dotColor = variant === "dark" ? "bg-gray-600" : "bg-gray-400";
  const lineColor = variant === "dark" ? "bg-gray-600" : "bg-gray-400";
  const textColor = variant === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = variant === "dark" ? "text-gray-300" : "text-gray-600";
  const textMuted = variant === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <AnimatedElement direction="left" className="flex items-start gap-6">
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full ${dotColor} border-2 ${
            variant === "dark" ? "border-gray-500" : "border-gray-300"
          } z-10`}
        ></div>
        {!isLast && <div className={`w-0.5 h-16 ${lineColor} mt-2`}></div>}
      </div>

      <div className="flex-1 pb-8">
        <div className={`text-sm font-bold ${textMuted} mb-1`}>{year}</div>
        <h3 className={`text-lg font-bold ${textColor} mb-2`}>{title}</h3>
        <p className={`${textSecondary} leading-relaxed`}>{description}</p>
      </div>
    </AnimatedElement>
  );
};

// hero section dengan typewriter effect minimalist
interface TypewriterProps {
  texts: string[];
  className?: string;
  variant?: "dark" | "light";
}

export const TypewriterEffect = ({
  texts,
  className,
  variant = "dark",
}: TypewriterProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const textColor = variant === "dark" ? "text-white" : "text-gray-900";
  const cursorColor =
    variant === "dark" ? "border-gray-400" : "border-gray-600";

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }

        if (!isDeleting && currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={cn(textColor, className)}>
      {currentText}
      <span
        className={`inline-block w-0.5 h-6 ml-1 ${cursorColor} border-r-2 animate-pulse`}
      ></span>
    </span>
  );
};

export default AnimatedElement;
