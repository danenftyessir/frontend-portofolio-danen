"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticlesBackgroundProps {
  className?: string;
  quantity?: number;
  color?: string;
  speed?: number;
  variant?: "light" | "dark";
}

const ParticlesBackground = ({
  className,
  quantity = 40,
  color = "#9ca3af", // gray-400 untuk light theme
  speed = 0.5,
  variant = "light",
}: ParticlesBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // particle configuration untuk clean theme
    const particlesArray: Particle[] = [];
    for (let i = 0; i < quantity; i++) {
      const size = Math.random() * 2 + 0.5; // ukuran lebih kecil dan halus
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      const directionX = (Math.random() * 0.4 - 0.2) * speed; // pergerakan lebih lambat
      const directionY = (Math.random() * 0.4 - 0.2) * speed;
      const opacity = Math.random() * 0.15 + 0.05; // opacity sangat rendah untuk clean look

      particlesArray.push(
        new Particle(
          x,
          y,
          directionX,
          directionY,
          size,
          color,
          opacity,
          canvasWidth,
          canvasHeight,
          variant
        )
      );
    }

    // animation loop
    function animate() {
      requestAnimationFrame(animate);

      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);
      }

      // connect particles dengan lines yang sangat subtle
      connectParticles(particlesArray, ctx, canvasWidth, canvasHeight, variant);
    }

    animate();
  }, [quantity, color, speed, variant]);

  // handle window resize dengan throttling
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        drawParticles();
      }, 100);
    };

    drawParticles();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0 h-full w-full opacity-60", className)}
      style={{ pointerEvents: "none" }}
    />
  );
};

// particle class yang dioptimasi untuk clean theme
class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;
  variant: "light" | "dark";

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string,
    opacity: number,
    canvasWidth: number,
    canvasHeight: number,
    variant: "light" | "dark"
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.opacity = opacity;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.variant = variant;
  }

  // draw particle dengan style yang clean
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    // gradient fill untuk effect yang lebih halus
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );

    if (this.variant === "light") {
      gradient.addColorStop(0, `rgba(156, 163, 175, ${this.opacity})`); // gray-400
      gradient.addColorStop(1, `rgba(156, 163, 175, 0)`);
    } else {
      gradient.addColorStop(0, `rgba(229, 231, 235, ${this.opacity})`); // gray-200
      gradient.addColorStop(1, `rgba(229, 231, 235, 0)`);
    }

    ctx.fillStyle = gradient;
    ctx.fill();
  }

  // update particle position dengan smooth movement
  update() {
    // bounce off edges dengan margin
    const margin = 50;

    if (this.x > this.canvasWidth - margin || this.x < margin) {
      this.directionX = -this.directionX;
    }
    if (this.y > this.canvasHeight - margin || this.y < margin) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    // add slight random movement untuk organic feel
    this.x += (Math.random() - 0.5) * 0.1;
    this.y += (Math.random() - 0.5) * 0.1;
  }
}

// connect particles dengan lines yang sangat subtle
function connectParticles(
  particles: Particle[],
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  variant: "light" | "dark"
) {
  const maxDistance = 60; // jarak koneksi lebih pendek
  const maxConnections = 3; // batasi jumlah koneksi per particle

  for (let a = 0; a < particles.length; a++) {
    let connections = 0;

    for (
      let b = a + 1;
      b < particles.length && connections < maxConnections;
      b++
    ) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        // draw line dengan opacity sangat rendah
        const opacity = (1 - distance / maxDistance) * 0.05; // opacity sangat rendah

        ctx.beginPath();
        if (variant === "light") {
          ctx.strokeStyle = `rgba(156, 163, 175, ${opacity})`; // gray-400
        } else {
          ctx.strokeStyle = `rgba(229, 231, 235, ${opacity})`; // gray-200
        }
        ctx.lineWidth = 0.3; // garis sangat tipis
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();

        connections++;
      }
    }
  }
}

export { ParticlesBackground };
