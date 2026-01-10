/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["var(--font-ubuntu)", "Ubuntu", "system-ui", "sans-serif"],
      },
      animation: {
        // advanced gradient animations
        "gradient-xy": "gradientXY 15s ease infinite",
        "gradient-conic": "gradientConic 8s linear infinite",
        "gradient-shift": "gradientShift 6s ease-in-out infinite",

        // shimmer and glow effects
        shimmer: "shimmer 2s linear infinite",
        "shimmer-slow": "shimmer 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",

        // floating and movement
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-fast": "floatFast 4s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",

        // tech-specific animations
        "float-tech": "floatTech 4s ease-in-out infinite",
        "pulse-tech": "pulseTech 2s ease-in-out infinite",
        "rotate-tech": "rotateTech 20s linear infinite",

        // particle effects
        sparkle: "sparkle 3s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "dust-float": "dustFloat 8s ease-in-out infinite",
        "particle-flow": "particleFlow 15s linear infinite",

        // text and typing effects
        typewriter: "typewriter 4s steps(40) infinite",
        blink: "blink 1s step-end infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",

        // background effects
        aurora: "aurora 20s ease-in-out infinite",
        wave: "wave 10s ease-in-out infinite",
        morph: "morph 8s ease-in-out infinite",

        // hover and interaction effects
        "scale-pulse": "scalePulse 0.3s ease-in-out",
        wiggle: "wiggle 1s ease-in-out infinite",
        "rubber-band": "rubberBand 1s ease-in-out",

        // loading and progress
        progress: "progress 2s ease-in-out infinite",
        "loading-dots": "loadingDots 1.5s ease-in-out infinite",
        skeleton: "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        // gradient animations
        gradientXY: {
          "0%": { backgroundPosition: "0% 0%" },
          "25%": { backgroundPosition: "100% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        gradientConic: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },

        // shimmer effects
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(99, 102, 241, 0.8)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" },
          "50%": {
            boxShadow:
              "0 0 40px rgba(99, 102, 241, 0.8), 0 0 60px rgba(168, 85, 247, 0.5)",
          },
        },

        // floating animations
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0px)" },
          "25%": { transform: "translateX(20px)" },
          "75%": { transform: "translateX(-20px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(100px) rotate(-360deg)",
          },
        },
        bounceSlow: {
          "0%, 100%": {
            transform: "translateY(0%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },

        // tech animations
        floatTech: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "33%": { transform: "translateY(-15px) rotate(5deg) scale(1.05)" },
          "66%": { transform: "translateY(-5px) rotate(-3deg) scale(0.98)" },
        },
        pulseTech: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
        },
        rotateTech: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },

        // particle effects
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1) rotate(0deg)" },
          "25%": { opacity: "0.8", transform: "scale(1.2) rotate(90deg)" },
          "50%": { opacity: "1", transform: "scale(0.8) rotate(180deg)" },
          "75%": { opacity: "0.6", transform: "scale(1.1) rotate(270deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        dustFloat: {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
            opacity: "0.3",
          },
          "25%": {
            transform: "translateY(-20px) translateX(10px)",
            opacity: "0.8",
          },
          "50%": {
            transform: "translateY(-10px) translateX(-15px)",
            opacity: "0.6",
          },
          "75%": {
            transform: "translateY(-25px) translateX(5px)",
            opacity: "0.9",
          },
        },
        particleFlow: {
          "0%": {
            transform: "translateX(-100px) translateY(0px)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateX(calc(100vw + 100px)) translateY(-50px)",
            opacity: "0",
          },
        },

        // text effects
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },

        // background effects
        aurora: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px) scale(1)" },
          "25%": {
            transform: "translateX(100px) translateY(-50px) scale(1.1)",
          },
          "50%": {
            transform: "translateX(-50px) translateY(100px) scale(0.9)",
          },
          "75%": {
            transform: "translateX(-100px) translateY(-25px) scale(1.05)",
          },
        },
        wave: {
          "0%": { transform: "translateX(0) translateY(0) scaleY(1)" },
          "50%": {
            transform: "translateX(-25%) translateY(-5px) scaleY(0.95)",
          },
          "100%": { transform: "translateX(-50%) translateY(0) scaleY(1)" },
        },
        morph: {
          "0%, 100%": { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" },
          "25%": { borderRadius: "58% 42% 75% 25% / 76% 46% 54% 24%" },
          "50%": { borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%" },
          "75%": { borderRadius: "33% 67% 58% 42% / 63% 68% 32% 37%" },
        },

        // interaction effects
        scalePulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        wiggle: {
          "0%, 7%, 100%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(-3deg)" },
          "20%": { transform: "rotate(3deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "30%": { transform: "rotate(3deg)" },
          "35%": { transform: "rotate(-1deg)" },
          "40%": { transform: "rotate(1deg)" },
          "50%": { transform: "rotate(0deg)" },
        },
        rubberBand: {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "30%": { transform: "scale3d(1.25, 0.75, 1)" },
          "40%": { transform: "scale3d(0.75, 1.25, 1)" },
          "50%": { transform: "scale3d(1.15, 0.85, 1)" },
          "65%": { transform: "scale3d(0.95, 1.05, 1)" },
          "75%": { transform: "scale3d(1.05, 0.95, 1)" },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },

        // loading and progress
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        loadingDots: {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
        skeleton: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "calc(200px + 100%) 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-rainbow":
          "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)",
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        "dots-pattern":
          "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
        "mesh-gradient":
          "linear-gradient(45deg, rgba(99, 102, 241, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(168, 85, 247, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(236, 72, 153, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(59, 130, 246, 0.1) 75%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.3)",
        "glow-lg": "0 0 40px rgba(99, 102, 241, 0.4)",
        "glow-xl": "0 0 60px rgba(99, 102, 241, 0.5)",
        neon: "0 0 5px theme(colors.purple.400), 0 0 20px theme(colors.purple.400), 0 0 40px theme(colors.purple.400)",
        "neon-pink":
          "0 0 5px theme(colors.pink.400), 0 0 20px theme(colors.pink.400), 0 0 40px theme(colors.pink.400)",
        "inner-glow": "inset 0 0 20px rgba(99, 102, 241, 0.2)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
