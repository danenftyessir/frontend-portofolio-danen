"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  animatedBorder?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, animatedBorder = false, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative group",
          animatedBorder &&
            "p-[1px] overflow-hidden rounded-lg bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-[length:200%_200%] animate-gradient-xy"
        )}
      >
        <textarea
          className={cn(
            "flex w-full rounded-lg border-2 border-gray-200/80 bg-white/90 backdrop-blur-sm px-4 py-3 text-sm shadow-lg placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-xl",
            animatedBorder && "border-none bg-white rounded-[calc(0.5rem-1px)]",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
