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
    title: "Hi, I'm Danendra Shafi Athallah 👋",
    typingTexts: [
      "Data Science Enthusiast",
      "Algorithm Problem Solver",
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
      { label: "Semester", value: "4", icon: "bx bx-calendar" },
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

  const { currentText, showCursor } = useTypewriter(
    portfolioData.hero.typingTexts,
    100
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
                  {portfolioData.hero.title}
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
                    🤖 Ask My AI Assistant
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
                    📄 Learn More
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

      {/* footer/contact section */}
      <footer id="contact" className="bg-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Mari Berkolaborasi!
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Tertarik untuk berdiskusi tentang data science, algoritma, atau
                sekadar sharing tentang street food Jakarta? Jangan ragu untuk
                menghubungi saya!
              </p>
            </div>

            {/* contact buttons */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: "bx bx-envelope",
                  label: "Email",
                  href: "mailto:danendra1967@gmail.com",
                  color: "from-red-500 to-orange-500",
                },
                {
                  icon: "bx bxl-linkedin",
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/danendrashafiathallah",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: "bx bxl-github",
                  label: "GitHub",
                  href: "https://github.com/danenftyessir",
                  color: "from-gray-600 to-gray-800",
                },
                {
                  icon: "bx bxl-instagram",
                  label: "Instagram",
                  href: "https://www.instagram.com/danennn__/",
                  color: "from-pink-500 to-purple-600",
                },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`interactive group flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${contact.color} text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold`}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                >
                  <i className={`${contact.icon} text-2xl`}></i>
                  <span>{contact.label}</span>
                </motion.a>
              ))}
            </div>

            {/* credits */}
            <div className="pt-12 border-t border-gray-700 text-gray-400 space-y-4">
              <p className="text-lg">&copy; 2024 Danendra Shafi Athallah</p>
              <p className="text-sm">
                Dibuat dengan ❤️ menggunakan{" "}
                <span className="text-blue-400 font-semibold">Next.js</span> +{" "}
                <span className="text-purple-400 font-semibold">FastAPI</span> •
                Powered by{" "}
                <span className="text-green-400 font-semibold">AI</span>
              </p>
              <motion.div
                className="inline-block text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
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
