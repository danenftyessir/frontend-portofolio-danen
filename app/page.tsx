"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AISection } from "@/components/AISection";
import { ProfileImage } from "@/components/ui/profile-image";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/ParticlesBackground";

// data portfolio
const portfolioData = {
  hero: {
    title: "Hi, I'm Danendra Shafi Athallah",
    titleIcon: (
      <svg className="inline-block w-12 h-12 ml-2" viewBox="0 0 36 36" fill="currentColor">
        <path fill="#FFDC5D" d="M4.861 9.147c.94-.657 2.357-.531 3.201.166l-.968-1.407c-.779-1.111-.5-2.313.612-3.093 1.112-.777 4.263 1.312 4.263 1.312-.786-1.122-.639-2.544.483-3.331 1.122-.784 2.67-.513 3.456.611l10.42 14.72L25 19l-11.083-4.042c-1.229-.485-2.556.253-3.041 1.482-.485 1.229.253 2.556 1.482 3.041l7.932 3.244-4.106 5.738-13.948-8.303c-.916-.452-1.428-1.41-1.428-2.417-.011-1.023.5-2.017 1.053-2.595z"/>
        <path fill="#EE9547" d="M2.695 17.336s-1.132-1.65.519-2.781c1.649-1.131 2.78.518 2.78.518l5.251 7.658c.181.26-.016.615-.339.615-.109 0-.216-.037-.305-.107l-7.906-6.903z"/>
      </svg>
    ),
    typingTexts: [
      "Data Science Enthusiast",
      "ITB Computer Science Student",
      "AI Engineering Explorer",
      "Front-End Developer",
    ],
    description:
      "Student of Informatics Engineering at ITB with a deep passion for coding and continuous learning. Experienced in web development, data science, and algorithm design with a commitment to making meaningful contributions in every endeavor.",
    img: "/profile.jpg",
    stats: [
      { label: "Experience", value: "2+ Years", icon: "bx bx-briefcase" },
      { label: "Projects", value: "15+", icon: "bx bx-code-alt" },
      { label: "Certifications", value: "5+", icon: "bx bx-award" },
      { label: "Deployed Apps", value: "2+", icon: "bx bx-rocket" },
    ],
    socialMedia: [
      {
        platform: "GitHub",
        icon: "bx bxl-github",
        href: "https://github.com/danenftyessir",
      },
      {
        platform: "LinkedIn",
        icon: "bx bxl-linkedin",
        href: "https://linkedin.com/in/danendrashafiathallah",
      },
      {
        platform: "Instagram",
        icon: "bx bxl-instagram",
        href: "https://www.instagram.com/danennn__/",
      },
      {
        platform: "Email",
        icon: "bx bx-envelope",
        href: "mailto:danendra1967@gmail.com",
      },
    ],
  },
  about: {
    title: "About Me",
    subtitle: "Discover my journey, passions, and the story behind my work",
    image: "/profile.jpg",
    biodata: [
      {
        label: "Name",
        value: "Danendra Shafi Athallah",
        icon: "bx bx-id-card",
      },
      {
        label: "University",
        value: "Institut Teknologi Bandung",
        icon: "bx bx-book",
      },
      { label: "Major", value: "Computer Science", icon: "bx bx-code-alt" },
      { label: "Semester", value: "5", icon: "bx bx-calendar" },
      {
        label: "Focus",
        value: "Data Science & Algorithms",
        icon: "bx bx-brain",
      },
      {
        label: "Email",
        value: "danendra1967@gmail.com",
        icon: "bx bx-user",
      },
    ],
    aboutNarrative: {
      whoAmI: {
        text: "I am a student of Informatics Engineering at ITB, driven by a deep passion for coding and a relentless commitment to continuous learning. My journey in technology has allowed me to acquire diverse skills in web development, data science, and algorithm design.",
        icon: "bx-info-circle",
      },
      approach: {
        text: "I believe that growth comes from embracing challenges and never settling for the status quo. My involvement in various activities from technical projects to event management has taught me the importance of teamwork, leadership, and adaptability.",
        icon: "bx-bulb",
      },
    },
    experience: [
      {
        title: "Web Development Participant",
        company: "Google Developer Students Club ITB",
        period: "2024",
        description:
          "Earned completion certificate in web development, working extensively with HTML, CSS, JavaScript, React.js, and Tailwind CSS.",
      },
      {
        title: "Organizing Committee",
        company: "Arkavidia Academy 9.0",
        period: "Jan - Mar 2024",
        description:
          "Took on roles in event management and coordination, contributing to the successful execution of a tech bootcamp program for students across Indonesia.",
      },
      {
        title: "Algorithm Project Developer",
        company: "Personal Projects",
        period: "2023 - Present",
        description:
          "Developed complex algorithmic solutions including Rush Hour Puzzle Solver and Little Alchemy Search using multiple pathfinding algorithms and optimization techniques.",
      },
    ],
    skills: [
      { name: "Python", level: "Advanced", icon: "bx bxl-python" },
      { name: "Algorithm Design", level: "Advanced", icon: "bx bx-code-block" },
      {
        name: "Data Science",
        level: "Intermediate",
        icon: "bx bx-bar-chart-alt",
      },
      { name: "React/Next.js", level: "Intermediate", icon: "bx bxl-react" },
      { name: "Machine Learning", level: "Intermediate", icon: "bx bx-bot" },
      { name: "Problem Solving", level: "Advanced", icon: "bx bx-bulb" },
    ],
  },
  projects: [
    {
      title: "MBG - Makan Bergizi Ga Bocor",
      link: "https://makanbergizigabocor.vercel.app/",
      image: "/ss-mbg-1-project.png",
      techStack: ["Solidity", "Next.js", "Tailwind CSS", "Ethereum", "Supabase"],
      description: "Web-based app for transparent monitoring of the distribution of Makan Bergizi Gratis (MBG) using blockchain and mapping of priority areas using AI",
      features: ["Blockchain Integration", "AI-Powered Mapping"],
    },
    {
      title: "MBG Background Analysis",
      link: "https://github.com/danenftyessir/Nama-Ntaran",
      image: "/ss-mbg-2-project.png",
      techStack: ["Python", "Pandas", "NumPy", "NLTK", "Scikit-Learn", "Matplotlib"],
      description: "A data analysis project exploring public perception of the Makan Bergizi Gratis (MBG) program by processing social media comments and extracting sentiment insights using text preprocessing and machine learning classification",
      features: ["Sentiment Analysis", "Text Preprocessing"],
    },
    {
      title: "E-Facility ITB",
      link: "https://e-facility.itb.ac.id/v2/beranda",
      image: "/ss-efacility-project.png",
      techStack: ["PHP", "Laravel", "Node.js", "Oracle"],
      description: "E-Facility is a system that integrates ITB facility services, both tariff-based (rental based) and non-tariff-based (resource sharing based), for ITB academics",
      features: ["Service Integration", "Resource Sharing"],
    },
    {
      title: "MPM UPNVJ Official Website",
      link: "https://mpm.upnvj.ac.id/",
      image: "/ss-mpmupnvj-official-website-project.png",
      techStack: ["WordPress"],
      description: "Official website for Majelis Permusyawaratan Mahasiswa (MPM) UPN Veteran Jakarta, the highest student legislative body representing faculties and managing student aspirations and organizational transparency",
      features: ["Content Management", "Responsive Design"],
    },
    {
      title: "Little Alchemy 2 Recipe Finder",
      link: "https://github.com/danenftyessir/Tubes2_EldenBoys.git",
      image: "/ss-eldenboys-project.png",
      techStack: ["Golang", "Next.js", "TypeScript", "Tailwind CSS"],
      description: "Website to search for recipes of an element in the game little alchemy 2 using 3 approaches namely: BFS (Breadth First Search), DFS (Depth First Search), & Bidirectional",
      features: ["Algorithm Visualization", "Multiple Search Methods"],
    },
    {
      title: "Rick ASOYY",
      link: "https://github.com/danenftyessir/IF2150-2024-K03-G07-HalalHub",
      image: "/ss-rickasoyy-project.png",
      techStack: ["React.js", "TypeScript", "Flask", "Python", "PCA", "NumPy"],
      description: "Rick ASOYY is a website designed as an audio and image finder, utilizing linear algebra and geometry concepts such as the PCA method from scratch for image searching and Query by Humming for audio searching",
      features: ["PCA Image Search", "Audio Recognition"],
    },
    {
      title: "Pascal S Compiler",
      link: "https://github.com/danenftyessir/pascal-s-compiler-from-scratch",
      image: "/ss-pascal-compiler-project.jpeg",
      techStack: ["Python"],
      description: "A Python-based Pascal-S compiler featuring DFA lexical analysis, recursive descent parsing, and semantic checks, highlighting structured problem solving and formal language processing",
      features: ["Lexical Analysis", "Semantic Checking"],
    },
    {
      title: "Local Search for Class Scheduling",
      link: "https://github.com/danenftyessir/Hambapenat_Tubes-1_IF3170_Weekly_Class_Schedulling_Local_Search.git",
      image: "/ss-local-search-project.png",
      techStack: ["Python", "NumPy", "Pandas", "Matplotlib"],
      description: "A scheduling system that applies heuristic local search optimization to generate weekly university class timetables. It assigns courses to rooms and time slots while minimizing conflicts and capacity issues",
      features: ["Optimization Algorithm", "Constraint Solving"],
    },
    {
      title: "Sentiment Analysis on Retina Data",
      link: "https://github.com/danenftyessir/Support-Vector-Machine-Implementation-for-YouTube-Sentiment-Analysis-on-Retina-Data-Trade.git",
      image: "/ss-sentiment-analysis-retina-project.png",
      techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
      description: "A sentiment analysis system for YouTube comments on retina data trade, utilizing text preprocessing and Support Vector Machine classification to categorize opinions into positive, negative, and neutral sentiments",
      features: ["SVM Classification", "YouTube Data Analysis"],
    },
    {
      title: "Predicting Student Success",
      link: "https://github.com/danenftyessir/student-success-prediction-from-scratch-ml-models.git",
      image: "/ss-predict-student-success-project.png",
      techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
      description: "A student success prediction system using Decision Tree Learning, Logistic Regression, and SVM, featuring custom from-scratch implementations that are benchmarked against scikit-learn models",
      features: ["Custom ML Models", "Performance Benchmarking"],
    },
    {
      title: "O.W.C.A Logistics",
      link: "https://github.com/danenftyessir/if2010-tubes-2-2425-dkn",
      image: "/ss-owca-logistic-project.png",
      techStack: ["Java", "JavaFX", "Maven", "JSON/XML"],
      description: "A desktop logistics management system for handling shipments, couriers, parcels, and real-time tracking with a modular and extensible architecture",
      features: ["Real-time Tracking", "Modular Architecture"],
    },
    {
      title: "HalalHub",
      link: "https://github.com/danenftyessir/IF2150-2024-K03-G07-HalalHub",
      image: "/ss-halalhub-umkm-project.png",
      techStack: ["Python", "Tkinter"],
      description: "HalalHub is a GUI-based software developed using Python, designed specifically for small and medium-sized enterprises (SMEs/UMKM) to manage businesses selling Muslim clothing and accessories",
      features: ["Inventory Management", "Sales Tracking"],
    },
    {
      title: "KIZUNA",
      link: "https://github.com/danenftyessir/Tucil2_13523136",
      image: "/ss-kizuna-project.png",
      techStack: ["C++", "OpenCV", "CMake", "FFmpeg"],
      description: "A quadtree-driven image compression system that applies divide-and-conquer segmentation to efficiently represent visual data, reinforcing foundations in spatial data structures and image processing logic",
      features: ["Quadtree Compression", "Image Processing"],
    },
    {
      title: "ATS CV Search Application",
      link: "https://github.com/danenftyessir/Tubes3_StimaSukses",
      image: "/ss-ats-search-application-project.png",
      techStack: ["Python", "Docker", "MySQL", "PDF Processing"],
      description: "An ATS-style CV search application that extracts and matches keywords from PDF resumes using multiple pattern-matching algorithms including KMP, Boyer-Moore, Aho-Corasick, and Levenshtein Distance",
      features: ["Multiple Algorithms", "Fuzzy Search"],
    },
    {
      title: "Nimonspedia",
      link: "https://github.com/danenftyessir/Nimonspedia",
      image: "/ss-nimonspedia-project.png",
      techStack: ["PHP", "Node.js", "React", "PostgreSQL", "Docker", "WebSocket"],
      description: "A web-based e-commerce platform that supports multi-role users, product management, balance handling, shopping cart, checkout, and order tracking, developed using a hybrid architecture",
      features: ["Multi-role System", "Real-time Updates"],
    },
  ],
};

// typewriter effect hook
const useTypewriter = (texts: string[], speed: number = 100) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentTitle = texts[currentIndex];
    const typeSpeed = isDeleting ? 50 : speed;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, texts, speed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return { currentText, showCursor };
};

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { currentText, showCursor } = useTypewriter(
    portfolioData.hero.typingTexts,
    100
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <div className="text-gray-800 text-lg font-medium">
            Loading portfolio...
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-50">
      {/* hero section */}
      <section
        id="home"
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <ParticlesBackground
          className="absolute inset-0 z-0"
          quantity={60}
          color="#374151"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
            {/* content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 flex items-center">
                  {portfolioData.hero.title}
                  {portfolioData.hero.titleIcon}
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 flex items-center">
                  <span className="typing-text">
                    {currentText}
                    <span
                      className={`cursor ${
                        showCursor ? "opacity-100" : "opacity-0"
                      } transition-all duration-200`}
                    >
                      |
                    </span>
                  </span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg text-gray-600 leading-relaxed max-w-lg"
              >
                {portfolioData.hero.description}
              </motion.p>

              {/* social media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center space-x-4"
              >
                <span className="text-gray-700 font-medium">Follow me on:</span>
                <div className="flex space-x-3">
                  {portfolioData.hero.socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      aria-label={`Visit ${social.platform}`}
                    >
                      <i className={`${social.icon} text-lg`}></i>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() =>
                    document
                      .getElementById("ai-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="interactive bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <circle cx="8.5" cy="10.5" r="1.5"/>
                      <circle cx="15.5" cy="10.5" r="1.5"/>
                      <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                    Ask My AI Assistant
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                    </motion.div>
                  </span>
                </Button>

                <Button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="interactive border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-transparent"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Learn More
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                    </motion.div>
                  </span>
                </Button>
              </motion.div>

              {/* quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
              >
                {portfolioData.hero.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="text-2xl mb-2">
                      <i className={`${stat.icon} text-gray-800`}></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* profile image dengan floating icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative flex justify-center items-center"
            >
              <div className="relative z-10">
                <ProfileImage
                  src={portfolioData.hero.img}
                  alt="Danendra Shafi Athallah Profile"
                  size="xl"
                  className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl border-8 border-white hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
                />
              </div>

              {/* floating tech icons */}
              {[
                { icon: "bx bxl-html5", label: "HTML" },
                { icon: "bx bxl-css3", label: "CSS" },
                { icon: "bx bxl-javascript", label: "JavaScript" },
                { icon: "bx bxl-react", label: "React" },
                { icon: "bx bxl-python", label: "Python" },
                { icon: "bx bx-data", label: "Data Science" },
              ].map((tech, index) => {
                const positions = [
                  "top-0 left-16 sm:left-20",
                  "top-0 right-0",
                  "bottom-0 left-8 sm:left-10",
                  "bottom-8 sm:bottom-10 right-10 sm:right-12",
                  "top-1/2 left-0",
                  "top-1/2 right-0",
                ];
                return (
                  <motion.div
                    key={index}
                    className={`absolute ${
                      positions[index % positions.length]
                    } w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer`}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    title={tech.label}
                  >
                    <i
                      className={`${tech.icon} text-xl sm:text-2xl text-gray-800`}
                    ></i>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* about section */}
      <section id="about" className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              {portfolioData.about.title}
            </h2>
            <p className="text-lg text-gray-600">
              {portfolioData.about.subtitle}
            </p>
          </motion.div>

          {/* content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* profile image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex justify-center lg:justify-start"
            >
              <img
                src={portfolioData.about.image}
                alt="About Me"
                className="w-full max-w-md rounded-xl shadow-lg object-cover border-8 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              />
            </motion.div>

            {/* biodata section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              {/* about narrative */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-12 h-12 p-4 flex items-center justify-center rounded-lg shadow-lg bg-gray-800 text-white">
                      <i
                        className={`bx ${portfolioData.about.aboutNarrative.whoAmI.icon} text-xl`}
                      ></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Who Am I
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {portfolioData.about.aboutNarrative.whoAmI.text}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-800 p-4 shadow-lg text-white">
                      <i
                        className={`bx ${portfolioData.about.aboutNarrative.approach.icon} text-xl`}
                      ></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      My Approach
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {portfolioData.about.aboutNarrative.approach.text}
                  </p>
                </div>
              </div>

              {/* personal info */}
              <div className="flex items-center gap-2 mb-4">
                <i className="bx bx-info-circle text-2xl text-gray-800"></i>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Personal Info
                </h2>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
                {portfolioData.about.biodata.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 p-4 rounded-lg bg-gray-800 shadow-lg text-white">
                      <i className={`${item.icon} text-xl`}></i>
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-gray-800">
                        {item.label}:
                      </span>
                      <span className="text-sm text-gray-600 block">
                        {item.value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* experience timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Experience & Timeline
            </h3>
            <div className="space-y-8">
              {portfolioData.about.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-gray-600 font-semibold mb-1">
                        {exp.company}
                      </p>
                      <p className="text-gray-500 text-sm mb-3 font-medium">
                        {exp.period}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* featured projects section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                Featured Projects
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A continuously flowing showcase of my expertise in machine learning, web development, and data science.
              </p>
            </div>

            {/* carousel container */}
            <div className="relative overflow-hidden mb-12">
              <motion.div
                className="flex gap-8"
                animate={{
                  x: [0, -7680], // Move exactly one full set (15 projects × 512px each)
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 60,
                    ease: "linear",
                  },
                }}
              >
                {/* duplicate projects for seamless loop - use 4 sets for smoother experience */}
                {[...portfolioData.projects, ...portfolioData.projects, ...portfolioData.projects, ...portfolioData.projects].map((project, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[480px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* project image */}
                    <div
                      className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group cursor-pointer"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* project content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">
                        {project.title}
                      </h4>

                      {/* tech stack tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full font-medium">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* description */}
                      <p className="text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                        {project.description}
                      </p>

                      {/* features */}
                      <ul className="space-y-2 mb-6">
                        {project.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* view project button */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <span>View Project</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* view all projects button */}
            <div className="text-center">
              <motion.a
                href="https://github.com/danenftyessir"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-800 text-gray-800 rounded-2xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View All Projects
              </motion.a>
            </div>
          </motion.div>

          {/* skills section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Core Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {portfolioData.about.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center cursor-pointer group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${skill.icon} text-gray-800`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-gray-600">{skill.level}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ai assistant section */}
      <section id="ai-section" className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Ask My AI Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Berinteraksi dengan AI assistant yang dilatih dengan knowledge
              base lengkap tentang pengalaman, project, dan kepribadian saya.
              Yuk, Tanyakan apa saja!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <AISection variant="light" />
          </motion.div>
        </div>
      </section>

      {/* image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Project preview"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      )}

      {/* footer/contact section */}
      <footer id="contact" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Let's Collaborate Section */}
            <div className="mb-16">
              <h2 className="text-[30px] leading-[36px] font-light text-gray-900 mb-6" style={{ fontFamily: 'Ubuntu, "Ubuntu Fallback", sans-serif', fontWeight: 300 }}>
                Let's Collaborate
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                I'm always interested in hearing about new opportunities and projects.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email",
                  handle: "danendra1967@gmail.com",
                  href: "mailto:danendra1967@gmail.com",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  ),
                  label: "GitHub",
                  handle: "@danenftyessir",
                  href: "https://github.com/danenftyessir",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                  label: "Instagram",
                  handle: "@danennn__",
                  href: "https://www.instagram.com/danennn__/",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  ),
                  label: "LinkedIn",
                  handle: "danendrashafiathallah",
                  href: "https://linkedin.com/in/danendrashafiathallah",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    {social.icon}
                  </div>
                  <span className="text-base font-medium text-gray-900" style={{ fontFamily: 'Ubuntu, "Ubuntu Fallback", sans-serif', fontWeight: 500 }}>
                    {social.label}
                  </span>
                  <span className="text-[15px] text-gray-500" style={{ fontFamily: 'Ubuntu, "Ubuntu Fallback", sans-serif', fontWeight: 400 }}>
                    {social.handle}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <motion.a
                href="mailto:danendra1967@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
                style={{ fontFamily: 'Ubuntu, "Ubuntu Fallback", sans-serif', fontWeight: 500 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/danendrashafiathallah"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg"
                style={{ fontFamily: 'Ubuntu, "Ubuntu Fallback", sans-serif', fontWeight: 500 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Connect on LinkedIn
              </motion.a>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500" style={{ fontFamily: 'Ubuntu, "Ubuntu Fallback", sans-serif', fontWeight: 400 }}>
                © 2026 Danendra Shafi Athallah. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>

      <style jsx>{`
        .typing-text {
          display: inline-block;
        }
        .cursor {
          font-weight: 600;
          color: #374151;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </main>
  );
}
