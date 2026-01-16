"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AISection } from "@/components/AISection";
import { ProfileImage } from "@/components/ui/profile-image";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Timeline } from "@/components/Timeline";

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
      {
        name: "Python",
        icon: "python",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="url(#python-gradient-1)"
              d="M49.64 0C24.254 0 25.839 11.009 25.839 11.009l.028 11.406h24.225v3.424H16.245S0 23.997 0 49.61c0 25.615 14.179 24.707 14.179 24.707h8.462V62.432s-.457-14.18 13.952-14.18H60.62s13.5.219 13.5-13.046V13.273S76.17 0 49.64 0M36.282 7.67a4.354 4.354 0 0 1 4.358 4.358 4.356 4.356 0 0 1-6.027 4.028 4.35 4.35 0 0 1-2.69-4.028 4.355 4.355 0 0 1 4.359-4.358"
            />
            <path
              fill="url(#python-gradient-2)"
              d="M50.36 99.48c25.387 0 23.802-11.009 23.802-11.009l-.028-11.405H49.908V73.64h33.847S100 75.485 100 49.869c0-25.615-14.179-24.706-14.179-24.706H77.36v11.886s.457 14.179-13.952 14.179H39.38s-13.5-.218-13.5 13.047v21.933S23.83 99.48 50.36 99.48m13.359-7.67a4.355 4.355 0 0 1-4.028-6.026 4.35 4.35 0 0 1 4.028-2.69 4.355 4.355 0 0 1 4.027 6.027 4.355 4.355 0 0 1-4.027 2.69"
            />
            <defs>
              <linearGradient id="python-gradient-1" x1="9.61" x2="59.167" y1="8.948" y2="58.01" gradientUnits="userSpaceOnUse">
                <stop stopColor="#387EB8" />
                <stop offset={1} stopColor="#366994" />
              </linearGradient>
              <linearGradient id="python-gradient-2" x1="40.028" x2="93.247" y1="40.453" y2="90.762" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFE052" />
                <stop offset={1} stopColor="#FFC331" />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        name: "NumPy",
        icon: "numpy",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#013243" d="M16.5 16.5 50 4 83.5 16.5 50 29 16.5 16.5z" />
            <path fill="#0075A8" d="M16.5 45.5 50 58 83.5 45.5 50 33 16.5 45.5z" />
            <path fill="#00A8E1" d="M16.5 74.5 50 87 83.5 74.5 50 62 16.5 74.5z" />
          </svg>
        ),
      },
      {
        name: "Pandas",
        icon: "pandas",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#150458" d="M20 20h25v25H20zM55 20h25v25H55zM20 55h25v25H20z" />
            <path fill="#FFCA00" d="M55 55h25v25H55z" />
          </svg>
        ),
      },
      {
        name: "React",
        icon: "react",
        svg: (
          <svg viewBox="0 0 101 100" fill="none">
            <path fill="#61DAFB" d="M50.307 58.816a8.816 8.816 0 1 0 0-17.632 8.816 8.816 0 0 0 0 17.632" />
            <path stroke="#61DAFB" strokeWidth={5} d="M50.307 68.063c26.126 0 47.306-8.087 47.306-18.063s-21.18-18.062-47.306-18.062C24.18 31.938 3 40.024 3 50s21.18 18.063 47.307 18.063Z" />
            <path stroke="#61DAFB" strokeWidth={5} d="M34.664 59.031C47.727 81.658 65.321 95.957 73.96 90.97c8.64-4.988 5.053-27.374-8.01-50C52.885 18.342 35.291 4.043 26.652 9.03s-5.052 27.374 8.011 50Z" />
            <path stroke="#61DAFB" strokeWidth={5} d="M34.664 40.969c-13.063 22.626-16.65 45.012-8.01 50 8.638 4.988 26.232-9.311 39.295-31.938s16.65-45.012 8.01-50c-8.638-4.988-26.232 9.311-39.295 31.938Z" />
          </svg>
        ),
      },
      {
        name: "Next.js",
        icon: "nextjs",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#000" d="M66.477 40.008h17.418v3.215h-6.91v16.914H73.53V43.223h-7.053zm-28.647 0v3.215H23.87v5.172h11.228v3.215H23.869v5.312H37.83v3.215H20.414V43.223h-.002v-3.215zm8.698.009h-4.521L58.2 60.145h4.535l-8.099-10.057 8.086-10.056-4.522.007-5.827 7.238zm4.64 14.378-2.265-2.816-6.91 8.581h4.535z" />
            <path fillRule="evenodd" d="M20.535 60.137 4.319 40H0v20.128h3.455V44.302l12.74 15.835z" clipRule="evenodd" />
            <path d="M84.672 60.014a.9.9 0 0 1-.649-.263.85.85 0 0 1-.267-.639.84.84 0 0 1 .267-.63.9.9 0 0 1 .649-.263q.365 0 .636.263a.854.854 0 0 1 .148 1.084.93.93 0 0 1-.335.326.86.86 0 0 1-.45.122m5.898-8.48h1.53v5.899q-.004.812-.348 1.395-.347.584-.965.898-.616.312-1.435.313-.746-.001-1.343-.265a2.16 2.16 0 0 1-.946-.784q-.35-.52-.349-1.294h1.534q.004.34.151.586a1 1 0 0 0 .408.376q.263.13.604.131.37.001.627-.154a1 1 0 0 0 .393-.457q.135-.301.138-.745zm7.83 2.307a1.11 1.11 0 0 0-.487-.835q-.432-.3-1.117-.3-.481.001-.826.143-.345.145-.53.39a.95.95 0 0 0-.186.56q0 .264.124.455.122.195.334.325.211.135.469.224.26.09.52.152l.797.196q.483.11.93.3.447.188.803.475.354.287.562.692t.208.95q.001.738-.382 1.297-.381.557-1.105.872-.719.313-1.744.314c-.66 0-1.236-.102-1.72-.305a2.54 2.54 0 0 1-1.14-.883q-.41-.582-.443-1.416h1.518c.02.29.114.532.273.728q.243.29.63.434.39.143.87.143.503 0 .886-.15.379-.148.594-.417a.98.98 0 0 0 .22-.628.8.8 0 0 0-.194-.544 1.5 1.5 0 0 0-.534-.36 5.5 5.5 0 0 0-.8-.26l-.97-.245q-1.05-.267-1.66-.81-.608-.542-.608-1.444 0-.74.41-1.298.408-.558 1.114-.865.71-.311 1.601-.31.905-.001 1.59.31.685.307 1.074.855.391.547.403 1.255z" />
          </svg>
        ),
      },
      {
        name: "TypeScript",
        icon: "typescript",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#017ACB" d="M0 0h100v100H0z" />
            <path
              fill="#fff"
              d="M48.016 37.031h4.797v8.282h-12.97v36.843l-.343.094c-.469.125-6.64.125-7.969-.016l-1.062-.093V45.312H17.5v-8.28l4.11-.048c2.25-.03 8.03-.03 12.843 0 4.813.032 10.906.047 13.563.047m36.61 41.219c-1.907 2.016-3.954 3.14-7.36 4.063-1.485.406-1.735.421-5.078.406-3.344-.016-3.61-.016-5.235-.438-4.203-1.078-7.594-3.187-9.906-6.172-.656-.843-1.734-2.593-1.734-2.812 0-.063.156-.203.359-.297s.625-.36.969-.562c.343-.204.968-.579 1.39-.797.422-.22 1.64-.938 2.703-1.579 1.063-.64 2.032-1.156 2.141-1.156.11 0 .313.219.469.485.937 1.578 3.125 3.593 4.672 4.28.953.407 3.062.86 4.078.86.937 0 2.656-.406 3.578-.828.984-.453 1.484-.906 2.078-1.812.406-.641.453-.813.438-2.032 0-1.125-.063-1.437-.375-1.953-.875-1.437-2.063-2.187-6.875-4.312-4.97-2.203-7.204-3.516-9.016-5.282-1.344-1.312-1.61-1.67-2.453-3.312-1.094-2.11-1.235-2.797-1.25-5.937-.016-2.204.031-2.922.265-3.672.329-1.125 1.391-3.297 1.875-3.844 1-1.172 1.36-1.531 2.063-2.11 2.125-1.75 5.438-2.906 8.61-3.015.359 0 1.546.062 2.656.14 3.187.266 5.359 1.047 7.453 2.72 1.578 1.25 3.968 4.187 3.734 4.577-.156.235-6.39 4.391-6.797 4.516-.25.078-.422-.016-.765-.422-2.125-2.547-2.985-3.094-5.047-3.219-1.469-.093-2.25.078-3.235.735-1.03.687-1.53 1.734-1.53 3.187.015 2.125.827 3.125 3.827 4.61 1.938.953 3.594 1.734 3.719 1.734.188 0 4.203 2 5.25 2.625 4.875 2.86 6.86 5.797 7.375 10.86.375 3.812-.703 7.296-3.047 9.765"
            />
          </svg>
        ),
      },
      {
        name: "JavaScript",
        icon: "javascript",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#F7DF1E" d="M0 0h100v100H0z" />
            <path fill="#000" d="M67.5 77.8c1.9 3.1 4.4 5.4 8.8 5.4 3.7 0 6.1-1.9 6.1-4.4 0-3.1-2.4-4.2-6.5-6l-2.2-.9c-6.5-2.8-10.8-6.2-10.8-13.5 0-6.7 5.1-11.8 13.1-11.8 5.7 0 9.8 2 12.7 7.1l-7 4.5c-1.5-2.8-3.2-3.9-5.7-3.9-2.6 0-4.3 1.7-4.3 3.9 0 2.7 1.7 3.8 5.6 5.5l2.2.9c7.6 3.3 11.9 6.6 11.9 14.1 0 8.1-6.3 12.5-14.9 12.5-8.3 0-13.7-4-16.4-9.1l7.4-4.3M40.9 78.4c1.4 2.5 2.7 4.6 5.8 4.6 3 0 4.9-1.2 4.9-5.8V47.2h8.9v30c0 9.5-5.6 13.9-13.7 13.9-7.3 0-11.6-3.8-13.8-8.4l7.9-4.3" />
          </svg>
        ),
      },
      {
        name: "Node.js",
        icon: "nodejs",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="#8CC84B"
              d="M46.279 1.067c2.479-1.42 5.709-1.426 8.186 0 12.464 7.042 24.931 14.074 37.393 21.12 2.343 1.321 3.911 3.93 3.887 6.63v42.371c.018 2.813-1.705 5.483-4.178 6.774-12.422 7.004-24.838 14.016-37.259 21.02-2.53 1.447-5.825 1.335-8.277-.23-3.724-2.16-7.455-4.308-11.18-6.465-.76-.453-1.619-.815-2.156-1.552.475-.64 1.324-.72 2.015-1 1.554-.495 2.982-1.288 4.41-2.058.361-.247.802-.152 1.148.069 3.185 1.826 6.342 3.705 9.537 5.513.682.394 1.372-.129 1.955-.453 12.19-6.89 24.396-13.754 36.584-20.646a1.21 1.21 0 0 0 .664-1.191c.009-13.977.002-27.957.005-41.934a1.31 1.31 0 0 0-.781-1.308C75.852 20.756 63.479 13.773 51.102 6.8a1.29 1.29 0 0 0-1.458-.002c-12.378 6.975-24.749 13.964-37.126 20.935-.506.23-.845.738-.785 1.302q.002 20.966 0 41.936a1.19 1.19 0 0 0 .673 1.176c3.303 1.873 6.61 3.733 9.916 5.6 1.861 1.002 4.148 1.597 6.199.83 1.81-.65 3.08-2.497 3.045-4.42.017-13.895-.009-27.793.013-41.686-.046-.617.54-1.127 1.14-1.069 1.586-.01 3.175-.021 4.762.005.663-.015 1.119.649 1.037 1.27-.007 13.984.017 27.968-.01 41.952.003 3.726-1.528 7.781-4.975 9.605-4.247 2.2-9.496 1.733-13.691-.376-3.632-1.813-7.098-3.952-10.666-5.894C6.697 76.68 4.983 73.999 5 71.189V28.817c-.026-2.756 1.604-5.412 4.021-6.713Q27.651 11.588 46.28 1.067"
            />
            <path
              fill="#8CC84B"
              d="M57.114 30.417c5.417-.348 11.216-.206 16.091 2.462 3.774 2.046 5.867 6.338 5.933 10.53-.105.566-.696.878-1.236.84-1.572-.003-3.144.02-4.716-.011-.667.025-1.054-.59-1.138-1.179-.451-2.006-1.545-3.993-3.434-4.96-2.898-1.452-6.26-1.38-9.42-1.349-2.308.123-4.79.322-6.744 1.68-1.5 1.027-1.957 3.102-1.421 4.773.505 1.2 1.89 1.587 3.023 1.944 6.529 1.708 13.447 1.538 19.85 3.785 2.651.916 5.245 2.697 6.152 5.472 1.187 3.72.667 8.168-1.98 11.154-2.146 2.458-5.273 3.796-8.39 4.522-4.149.925-8.454.949-12.666.538-3.962-.451-8.084-1.492-11.142-4.191-2.614-2.27-3.892-5.808-3.765-9.223.03-.576.605-.978 1.157-.93 1.583-.014 3.165-.018 4.748.001.632-.045 1.101.501 1.133 1.097.292 1.912 1.01 3.918 2.678 5.051 3.216 2.075 7.253 1.933 10.936 1.991 3.052-.135 6.477-.176 8.967-2.193 1.314-1.15 1.703-3.075 1.348-4.73-.384-1.398-1.847-2.05-3.103-2.476-6.444-2.038-13.44-1.299-19.822-3.604-2.59-.916-5.096-2.647-6.092-5.309-1.389-3.767-.752-8.427 2.172-11.313 2.852-2.87 6.968-3.976 10.881-4.372"
            />
          </svg>
        ),
      },
      {
        name: "Tailwind",
        icon: "tailwind",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="#06B6D4"
              d="M50 20q-20 0-25 19.994 7.5-9.997 17.5-7.498c3.804.95 6.522 3.71 9.532 6.764 4.902 4.974 10.576 10.731 22.969 10.731q20 0 24.999-19.995-7.5 9.997-17.5 7.5c-3.803-.951-6.521-3.71-9.531-6.765C68.067 25.758 62.392 20 50 20M25 49.991q-20 0-25 19.995 7.5-9.998 17.5-7.498c3.803.952 6.522 3.71 9.532 6.763C31.933 74.225 37.608 79.984 50 79.984q20 0 25-19.995-7.5 9.997-17.5 7.498c-3.803-.95-6.522-3.71-9.532-6.763C43.066 55.75 37.393 49.991 25 49.991"
            />
          </svg>
        ),
      },
      {
        name: "Matplotlib",
        icon: "matplotlib",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#FFB700" d="M20 20h60v60H20z" opacity=".3" />
            <path fill="#FFB700" d="M25 55h10v25H25zM40 40h10v40H40zM55 50h10v30H55zM70 30h10v50H70z" />
          </svg>
        ),
      },
      {
        name: "Scikit-Learn",
        icon: "scikit",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#F7931E" d="M50 20 30 35v30l20 15 20-15V35L50 20z" />
            <circle cx="50" cy="50" r="10" fill="#fff" opacity=".3" />
          </svg>
        ),
      },
      {
        name: "PHP",
        icon: "php",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#777BB4" d="M20 35h10c8 0 12 4 12 10s-4 10-12 10h-5l-2 10H20l5-30M25 50h5c4 0 6-2 6-5s-2-5-6-5h-5l-2 10" />
            <path fill="#777BB4" d="M45 35h15c8 0 12 4 12 10s-4 10-12 10h-10l-2 10h-8l5-30M50 50h10c4 0 6-2 6-5s-2-5-6-5H50l-2 10" />
          </svg>
        ),
      },
      {
        name: "MySQL",
        icon: "mysql",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#00546B" d="M50 30c-15 0-25 5-25 12v16c0 7 10 12 25 12s25-5 25-12V42c0-7-10-12-25-12z" />
            <ellipse cx="50" cy="42" rx="20" ry="8" fill="#00758F" />
          </svg>
        ),
      },
      {
        name: "PostgreSQL",
        icon: "postgresql",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="#000"
              d="M98.472 59.902c-.582-1.766-2.105-2.995-4.074-3.29-.929-.14-1.992-.08-3.251.18-2.194.454-3.821.627-5.009.66 4.483-7.59 8.129-16.246 10.227-24.393 3.394-13.175 1.58-19.177-.539-21.892C90.218 3.981 82.036.121 72.166.003c-5.267-.065-9.89.978-12.3 1.728-2.246-.398-4.66-.62-7.193-.66-4.749-.076-8.944.962-12.529 3.095a57 57 0 0 0-8.848-2.227C22.644.514 15.672 1.624 10.57 5.237c-6.175 4.375-9.038 11.975-8.509 22.59.168 3.37 2.048 13.625 5.009 23.35 1.701 5.59 3.515 10.232 5.392 13.798 2.661 5.058 5.51 8.035 8.706 9.105 1.792.599 5.048 1.018 8.472-1.842.434.527 1.013 1.05 1.782 1.537.976.618 2.17 1.122 3.361 1.42 4.296 1.078 8.319.808 11.752-.701.02.612.037 1.197.05 1.702.023.82.046 1.623.076 2.374.203 5.08.548 9.029 1.57 11.792.055.152.13.384.21.63.51 1.564 1.361 4.182 3.529 6.232C54.215 99.35 56.929 100 59.415 100c1.247 0 2.437-.164 3.48-.388 3.72-.8 7.944-2.017 11-6.38 2.889-4.125 4.293-10.337 4.547-20.126l.093-.793.06-.517.68.06.176.012c3.788.173 8.42-.633 11.265-1.958 2.248-1.046 9.452-4.86 7.756-10.008"
            />
            <path
              fill="#336791"
              d="M91.994 60.903c-11.264 2.33-12.038-1.494-12.038-1.494C91.848 41.713 96.82 19.251 92.53 13.753 80.825-1.243 60.564 5.85 60.226 6.033l-.109.02c-2.225-.463-4.716-.74-7.515-.785-5.096-.084-8.963 1.34-11.896 3.57 0 0-36.145-14.93-34.463 18.78.357 7.17 10.25 54.262 22.05 40.039 4.313-5.202 8.48-9.6 8.48-9.6 2.07 1.38 4.547 2.082 7.145 1.83l.202-.172c-.063.646-.034 1.277.08 2.025-3.04 3.406-2.146 4.004-8.223 5.258-6.149 1.271-2.537 3.533-.178 4.125 2.859.717 9.474 1.732 13.943-4.542l-.178.716c1.19.957 2.027 6.222 1.887 10.996-.14 4.773-.234 8.05.704 10.61.94 2.56 1.874 8.32 9.863 6.604 6.674-1.435 10.134-5.152 10.615-11.353.341-4.407 1.114-3.756 1.163-7.697l.62-1.865c.715-5.976.113-7.904 4.225-7.007l1 .088c3.027.138 6.988-.488 9.313-1.572 5.007-2.33 7.976-6.22 3.04-5.198"
            />
          </svg>
        ),
      },
      {
        name: "Docker",
        icon: "docker",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="#2496ED"
              d="M99.014 41.088c-.271-.215-2.803-2.127-8.142-2.127-1.41.006-2.817.127-4.207.362-1.034-7.083-6.89-10.537-7.153-10.692l-1.433-.827-.943 1.361a19.2 19.2 0 0 0-2.55 5.96c-.955 4.043-.374 7.84 1.68 11.087-2.48 1.382-6.459 1.723-7.264 1.753H3.131a3.13 3.13 0 0 0-3.127 3.113A47.4 47.4 0 0 0 2.89 68.004c2.27 5.951 5.645 10.334 10.037 13.017 4.922 3.014 12.918 4.736 21.982 4.736a65.6 65.6 0 0 0 12.207-1.106 51 51 0 0 0 15.932-5.787 43.8 43.8 0 0 0 10.872-8.9c5.22-5.908 8.328-12.488 10.64-18.335h.922c5.714 0 9.227-2.286 11.165-4.203a12.2 12.2 0 0 0 2.945-4.361l.409-1.197z"
            />
            <path
              fill="#2496ED"
              d="M9.236 46.036h8.827a.77.77 0 0 0 .771-.771v-7.863a.77.77 0 0 0-.766-.775H9.236a.77.77 0 0 0-.77.771v7.867c0 .426.345.77.77.77m12.164.001h8.828a.77.77 0 0 0 .77-.771v-7.863a.77.77 0 0 0-.766-.775H21.4a.775.775 0 0 0-.775.775v7.863c.003.426.349.77.775.77m12.35.001h8.827a.77.77 0 0 0 .77-.771v-7.863a.77.77 0 0 0-.766-.775h-8.832a.77.77 0 0 0-.77.771v7.867c0 .426.345.77.77.77m12.204.001h8.827a.775.775 0 0 0 .775-.771v-7.863a.775.775 0 0 0-.775-.775h-8.827a.77.77 0 0 0-.771.771v7.867c0 .426.345.77.77.77M21.4 34.724h8.828a.775.775 0 0 0 .77-.775v-7.862a.77.77 0 0 0-.77-.771H21.4a.775.775 0 0 0-.775.77v7.863a.78.78 0 0 0 .775.775m12.35 0h8.827a.775.775 0 0 0 .77-.775v-7.862a.77.77 0 0 0-.77-.771H33.75a.77.77 0 0 0-.771.77v7.863c0 .426.344.773.77.775m12.204 0h8.827a.78.78 0 0 0 .775-.775v-7.862a.775.775 0 0 0-.775-.771h-8.827a.77.77 0 0 0-.771.77v7.863c0 .426.344.773.77.775m.001-11.316h8.827a.775.775 0 0 0 .775-.77V14.77a.775.775 0 0 0-.775-.77h-8.827a.77.77 0 0 0-.771.77v7.868c0 .425.345.77.77.77m12.311 22.628h8.827a.775.775 0 0 0 .775-.771v-7.863a.775.775 0 0 0-.775-.775h-8.827a.77.77 0 0 0-.77.771v7.867c0 .426.345.77.77.77"
            />
          </svg>
        ),
      },
      {
        name: "WordPress",
        icon: "wordpress",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#21759B" d="M50 10c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 72.5c-5 0-9.7-1.3-13.8-3.5l9.3-27.2 9.5 26c.1.2.1.3.1.5 0 0-4.8 4.2-5.1 4.2zm-23.5-16.7c-1.6-4.7-2.5-10-2.5-15.8 0-5.5.8-10.6 2.2-15.2l12.9 35.4L26.5 65.8zm42.7-30.3c0 3.1-1.2 5.4-3.2 7.2-.9.8-1.5 1.5-1.5 2.4 0 1.3 1 2.4 2.7 3.3 2.2 1.1 4.4 2.8 4.4 6.2 0 4.2-3.3 8.4-8.6 10.2l-8.2-22.5 14.4-6.8z" />
            <path fill="#fff" d="M50 15c19.3 0 35 15.7 35 35s-15.7 35-35 35-35-15.7-35-35 15.7-35 35-35z" opacity=".2" />
          </svg>
        ),
      },
      {
        name: "Java",
        icon: "java",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#E76F00" d="M50 30c-8 0-15 5-15 12 0 6 5 10 12 10l3-1v-5l-3 1c-3 0-6-2-6-5 0-4 4-7 9-7s9 3 9 7c0 3-2 5-4 6l-2 1v5l2-1c4-2 8-6 8-11 0-7-7-12-13-12z" />
            <path fill="#5382A1" d="M35 60v10l15 5 15-5V60l-15 5-15-5z" />
          </svg>
        ),
      },
      {
        name: "Flask",
        icon: "flask",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#000" d="M50 15 40 25v20L25 75h50L60 45V25l-10-10z" opacity=".2" />
            <path fill="#fff" stroke="#000" strokeWidth="2" d="M50 15 40 25v20L25 75h50L60 45V25l-10-10z" />
          </svg>
        ),
      },
      {
        name: "Laravel",
        icon: "laravel",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#FF2D20" d="M20 30h15v5H25v10h10v5H25v15h-5V30zM40 30h15v5H45v10h10v5H45v15h-5V30zM60 30h15v5H65v10h10v5H65v15h-5V30z" />
          </svg>
        ),
      },
      {
        name: "Git",
        icon: "git",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="#F05032"
              d="M94.812 48.294 55.606 9.085a9.63 9.63 0 0 0-13.594 0l-13.555 13.555 17.167 17.167a11.44 11.44 0 0 1 14.516 14.516l16.55 16.55a11.44 11.44 0 0 1 11.823 19.083 11.44 11.44 0 0 1-18.736-12.382l-15.456-15.456v40.624a11.44 11.44 0 1 1-6.652-1.092V54.241a11.38 11.38 0 0 1-3.096-8.259 11.38 11.38 0 0 1 3.748-8.416L24.363 22.237 5.188 41.411a9.63 9.63 0 0 0 0 13.594l39.207 39.207a9.63 9.63 0 0 0 13.594 0l39.008-39.008a9.63 9.63 0 0 0 0-13.594l-1.79-6.91z"
            />
          </svg>
        ),
      },
      {
        name: "FastAPI",
        icon: "fastapi",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="#009688"
              d="M50 5 25 20v30l25 15 25-15V20L50 5zm0 10 15 9v18l-15 9-15-9V24l15-9z"
            />
            <path fill="#009688" d="M45 35h10v20H45z" />
            <path fill="#009688" d="M45 35h10v5H45z" />
          </svg>
        ),
      },
      {
        name: "PyTorch",
        icon: "pytorch",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path
              fill="#EE4C2C"
              d="m75.5 31.799-6.6 6.6c10.8 10.8 10.8 28.2 0 38.8-10.8 10.8-28.2 10.8-38.8 0-10.8-10.8-10.8-28.2 0-38.8l17.1-17.1 2.4-2.4v-12.9l-25.8 25.8c-14.4 14.4-14.4 37.6 0 52s37.6 14.4 51.7 0c14.4-14.5 14.4-37.6 0-52"
            />
            <path
              fill="#EE4C2C"
              d="M62.6 30.198a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6"
            />
          </svg>
        ),
      },
      {
        name: "TensorFlow",
        icon: "tensorflow",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#FF6F00" d="M50 10 20 25v20l30 15 30-15V25L50 10z" />
            <path fill="#FFA726" d="M20 45v30l30 15V60L20 45z" />
            <path fill="#FFB74D" d="M80 45v30l-30 15V60l30-15z" />
          </svg>
        ),
      },
      {
        name: "Solidity",
        icon: "solidity",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#363636" d="M50 15 25 30v40l25 15 25-15V30L50 15z" />
            <path fill="#fff" d="M50 25 35 35v30l15 10 15-10V35L50 25z" opacity={0.2} />
          </svg>
        ),
      },
      {
        name: "Ethereum",
        icon: "ethereum",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#627EEA" d="M50 20 30 35v20l20 15 20-15V35L50 20z" />
            <path fill="#fff" d="M50 45 35 55v15l15 10 15-10V55L50 45z" opacity={0.3} />
          </svg>
        ),
      },
      {
        name: "Supabase",
        icon: "supabase",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#3ECF8E" d="M20 40c0-15 10-25 25-25h35v10H45c-10 0-15 5-15 15s5 15 15 15h35v10H45c-15 0-25-10-25-25z" />
            <path fill="#3ECF8E" d="M80 60c0 15-10 25-25 25H20V75h35c10 0 15-5 15-15s-5-15-15-15H20V35h35c15 0 25 10 25 25z" />
          </svg>
        ),
      },
      {
        name: "NLTK",
        icon: "nltk",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#4096A8" d="M20 20h60v60H20z" />
            <path fill="#fff" d="M30 35h40v5H30zM30 50h40v5H30zM30 65h25v5H30z" />
          </svg>
        ),
      },
      {
        name: "Golang",
        icon: "golang",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#00ADD8" d="M20 35h10c8 0 12 4 12 10s-4 10-12 10h-5v10h-5V35zM25 50h5c4 0 6-2 6-5s-2-5-6-5h-5v10z" />
            <path fill="#00ADD8" d="M45 35h5l15 20v-20h5v30h-5l-15-20v20h-5V35z" />
          </svg>
        ),
      },
      {
        name: "JavaFX",
        icon: "javafx",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#E76F00" d="M50 30c-8 0-15 5-15 12 0 6 5 10 12 10l3-1v-5l-3 1c-3 0-6-2-6-5 0-4 4-7 9-7s9 3 9 7c0 3-2 5-4 6l-2 1v5l2-1c4-2 8-6 8-11 0-7-7-12-13-12z" />
            <path fill="#5382A1" d="M35 60v10l15 5 15-5V60l-15 5-15-5z" />
          </svg>
        ),
      },
      {
        name: "Maven",
        icon: "maven",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#C71A36" d="M50 15 30 35v30l20 20 20-20V35L50 15z" />
            <path fill="#fff" d="M40 45h20v10H40z" />
          </svg>
        ),
      },
      {
        name: "Tkinter",
        icon: "tkinter",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#FFC107" d="M20 20h60v60H20z" />
            <path fill="#fff" d="M30 30h15v15H30zM55 30h15v15H55zM30 55h15v15H30zM55 55h15v15H55z" opacity={0.5} />
          </svg>
        ),
      },
      {
        name: "C++",
        icon: "cplusplus",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#00599C" d="M50 15c-19.3 0-35 15.7-35 35s15.7 35 35 35 35-15.7 35-35-15.7-35-35-35zm0 65c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z" />
            <path fill="#00599C" d="M35 45h-5v-5h5v-5h5v5h5v5h-5v5h-5v-5h-5v-5zM60 40h10v5h-10v-5zM60 50h10v5h-10v-5z" />
          </svg>
        ),
      },
      {
        name: "OpenCV",
        icon: "opencv",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#000" d="M20 30h60v40H20z" />
            <circle cx="50" cy="50" r="15" fill="#fff" opacity={0.3} />
            <path fill="#fff" d="M25 35h10v5H25zM65 60h10v5H65z" />
          </svg>
        ),
      },
      {
        name: "CMake",
        icon: "cmake",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#0D9670" d="M50 15 25 35v30l25 20 25-20V35L50 15z" />
            <path fill="#fff" d="M40 45h20v10H40z" />
          </svg>
        ),
      },
      {
        name: "FFmpeg",
        icon: "ffmpeg",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#007808" d="M20 30h15v40H20zM45 30h10v40H45zM65 30h15v40H65z" />
          </svg>
        ),
      },
      {
        name: "WebSocket",
        icon: "websocket",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#010101" d="M50 35c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
            <path fill="#010101" d="M30 50c0-11 9-20 20-20v5c-8.3 0-15 6.7-15 15s6.7 15 15 15v5c-11 0-20-9-20-20zM70 50c0 11-9 20-20 20v-5c8.3 0 15-6.7 15-15s-6.7-15-15-15v-5c11 0 20 9 20 20z" />
          </svg>
        ),
      },
      {
        name: "WooCommerce",
        icon: "woocommerce",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#96588a" d="M50 20c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 55c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z" />
            <path fill="#fff" d="M40 40h20l-5 20H40l5-15h-5z" opacity={0.5} />
          </svg>
        ),
      },
      {
        name: "Oracle",
        icon: "oracle",
        svg: (
          <svg viewBox="0 0 100 100" fill="none">
            <path fill="#C74634" d="M20 40h60v20H20z" />
            <path fill="#F80000" d="M25 45h50v10H25z" />
          </svg>
        ),
      },
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
      techStack: ["WordPress", "Advanced Custom Fields", "Contact Form 7", "Yoast SEO", "Polylang", "Slider Revolution", "Jetpack"],
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
    {
      title: "Pakansuper Marketplace",
      link: "",
      image: "/ss-pakansuper-project.png",
      techStack: ["WordPress", "WooCommerce", "Dokan", "PHP", "MySQL", "Stripe"],
      description: "An online platform that connects farmers who produce animal feed with livestock owners who need quality feed products. The marketplace streamlines the supply chain by enabling direct transactions between producers and consumers in the animal husbandry sector",
      features: ["Multi-vendor Marketplace", "Direct Farmer-Consumer Transactions", "Supply Chain Optimization", "Payment Integration"],
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
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [expandedTechStacks, setExpandedTechStacks] = useState<Set<string>>(new Set());

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

  const toggleTechStack = (projectTitle: string) => {
    setExpandedTechStacks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectTitle)) {
        newSet.delete(projectTitle);
      } else {
        newSet.add(projectTitle);
      }
      return newSet;
    });
  };

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
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/CV_Danendra Shafi Athallah.pdf';
                    link.download = 'CV_Danendra Shafi Athallah.pdf';
                    link.click();
                  }}
                  className="interactive border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-transparent"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download CV
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
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-800 mb-4 font-ubuntu">
                Experience & Timeline
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-ubuntu">
                My professional journey in software engineering, data science, and technology innovation.
              </p>
            </div>
            <Timeline />
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
              {/* fade overlay gradients */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* top fade */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent"></div>
                {/* bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
                {/* left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent"></div>
                {/* right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent"></div>
              </div>

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
                    key={`carousel-${index}`}
                    className="flex-shrink-0 w-[480px] bg-white/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 flex flex-col"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* project image */}
                    <div
                      className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group cursor-pointer"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-left group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* project content */}
                    <div className="p-6 flex-1 flex flex-col">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">
                          {project.title}
                        </h4>

                        {/* tech stack tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(expandedTechStacks.has(project.title)
                            ? project.techStack
                            : project.techStack.slice(0, 4)
                          ).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && !expandedTechStacks.has(project.title) && (
                            <span
                              className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full font-medium cursor-pointer hover:bg-gray-600 transition-colors"
                              onClick={() => toggleTechStack(project.title)}
                            >
                              +{project.techStack.length - 4}
                            </span>
                          )}
                          {project.techStack.length > 4 && expandedTechStacks.has(project.title) && (
                            <span
                              className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full font-medium cursor-pointer hover:bg-gray-600 transition-colors"
                              onClick={() => toggleTechStack(project.title)}
                            >
                              Show less
                            </span>
                          )}
                        </div>

                        {/* description */}
                        <p className="text-gray-600 leading-relaxed mb-4 flex-1">
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
                          className="w-full md:w-auto bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group"
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

            {/* Grid view for all projects - shown below carousel when button is clicked */}
            {showAllProjects && (
              <div className="mb-12 space-y-6">
                {portfolioData.projects.map((project, index) => (
                  <motion.div
                    key={`grid-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="bg-white/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 flex flex-col md:flex-row"
                  >
                    {/* project image */}
                    <div
                      className="relative w-full md:w-96 aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group cursor-pointer flex-shrink-0"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-left group-hover:scale-110 transition-transform duration-500"
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
                        {(expandedTechStacks.has(project.title)
                          ? project.techStack
                          : project.techStack.slice(0, 3)
                        ).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && !expandedTechStacks.has(project.title) && (
                          <span
                            className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full font-medium cursor-pointer hover:bg-gray-600 transition-colors"
                            onClick={() => toggleTechStack(project.title)}
                          >
                            +{project.techStack.length - 3}
                          </span>
                        )}
                        {project.techStack.length > 3 && expandedTechStacks.has(project.title) && (
                          <span
                            className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full font-medium cursor-pointer hover:bg-gray-600 transition-colors"
                            onClick={() => toggleTechStack(project.title)}
                          >
                            Show less
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
              </div>
            )}

            {/* view all projects button */}
            <div className="text-center flex items-center justify-center gap-4">
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

              {/* expand/collapse button */}
              <motion.button
                onClick={() => setShowAllProjects(!showAllProjects)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-800 text-gray-800 rounded-2xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-lg"
              >
                <span>{showAllProjects ? "Show Less" : "View All on This Page"}</span>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${!showAllProjects ? "animate-bounce" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showAllProjects ? (
                    <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
                  ) : (
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  )}
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* skills section - infinite scroll marquee - completely outside all containers for full width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden border-y border-neutral-100 bg-neutral-50/50 py-5 w-screen"
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `
        }} />
        <div className="animate-scroll flex w-max">
          {/* First set of skills */}
          <div className="flex shrink-0 items-center gap-10 md:gap-12 pr-10 md:pr-12">
            {portfolioData.about.skills.map((skill, index) => (
              <div
                key={`first-${index}`}
                className="group flex items-center gap-2.5 text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
              >
                <span className="h-4 w-4 md:h-5 md:w-5 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                  {skill.svg}
                </span>
                <span className="text-xs md:text-sm whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless infinite scroll */}
          <div className="flex shrink-0 items-center gap-10 md:gap-12 pr-10 md:pr-12">
            {portfolioData.about.skills.map((skill, index) => (
              <div
                key={`second-${index}`}
                className="group flex items-center gap-2.5 text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
              >
                <span className="h-4 w-4 md:h-5 md:w-5 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                  {skill.svg}
                </span>
                <span className="text-xs md:text-sm whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

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
