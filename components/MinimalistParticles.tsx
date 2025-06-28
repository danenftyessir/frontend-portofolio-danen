"use client";

import React from "react";

interface MinimalistParticlesProps {
  variant?: "dark" | "light";
  density?: "low" | "medium" | "high";
}

export const MinimalistParticles = ({
  variant = "dark",
  density = "medium",
}: MinimalistParticlesProps) => {
  const particleCount = density === "low" ? 15 : density === "medium" ? 25 : 35;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* layer 1: base particles - large */}
      <div
        className="absolute inset-0 animate-float-slow opacity-30"
        style={{
          background: `radial-gradient(1px 1px at 20px 30px, ${
            variant === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
          }, transparent),
                      radial-gradient(1px 1px at 40px 70px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.2)"
                      }, transparent),
                      radial-gradient(2px 2px at 90px 40px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.2)"
                      }, transparent),
                      radial-gradient(1px 1px at 130px 80px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(0,0,0,0.3)"
                      }, transparent),
                      radial-gradient(2px 2px at 160px 30px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.2)"
                      }, transparent)`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 100px",
        }}
      />

      {/* layer 2: medium particles */}
      <div
        className="absolute inset-0 animate-drift opacity-40"
        style={{
          background: `radial-gradient(1px 1px at 25px 50px, ${
            variant === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"
          }, transparent),
                      radial-gradient(1px 1px at 50px 20px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(0,0,0,0.3)"
                      }, transparent),
                      radial-gradient(1px 1px at 125px 60px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.2)"
                      }, transparent),
                      radial-gradient(1px 1px at 150px 90px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.4)"
                          : "rgba(0,0,0,0.4)"
                      }, transparent)`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 120px",
        }}
      />

      {/* layer 3: fine particles */}
      <div
        className="absolute inset-0 animate-sparkle opacity-50"
        style={{
          background: `radial-gradient(0.5px 0.5px at 15px 25px, ${
            variant === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
          }, transparent),
                      radial-gradient(0.5px 0.5px at 35px 55px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)"
                      }, transparent),
                      radial-gradient(0.5px 0.5px at 65px 15px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.4)"
                          : "rgba(0,0,0,0.4)"
                      }, transparent),
                      radial-gradient(0.5px 0.5px at 85px 45px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(0,0,0,0.6)"
                      }, transparent),
                      radial-gradient(0.5px 0.5px at 105px 75px, ${
                        variant === "dark"
                          ? "rgba(255,255,255,0.4)"
                          : "rgba(0,0,0,0.4)"
                      }, transparent)`,
          backgroundRepeat: "repeat",
          backgroundSize: "120px 80px",
        }}
      />

      {/* floating individual particles */}
      <div className="absolute inset-0">
        {Array.from({ length: Math.floor(particleCount / 3) }).map((_, i) => (
          <div
            key={`float-particle-${i}`}
            className={`absolute w-1 h-1 ${
              variant === "dark" ? "bg-white/20" : "bg-black/20"
            } rounded-full`}
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + i * 7}%`,
              animation: `dustFloat ${8 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
