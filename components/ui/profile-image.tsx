"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  border?: boolean;
  borderColor?: string;
}

const ProfileImage = ({
  src,
  alt,
  size = "md",
  className,
  border = false,
  borderColor = "border-gray-200",
}: ProfileImageProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-48 w-48",
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden shadow-xl backdrop-blur-sm",
        sizeClasses[size],
        border && `p-1 ${borderColor} border-4 bg-white/90`,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`(max-width: 768px) ${
          parseInt(sizeClasses[size].slice(2, 4)) * 16
        }px, ${parseInt(sizeClasses[size].slice(2, 4)) * 16}px`}
        className="object-cover rounded-full"
        priority
      />
    </div>
  );
};

export { ProfileImage };
