import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gray-800 text-white shadow-lg hover:bg-gray-700 hover:shadow-xl",
        destructive:
          "bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl",
        outline:
          "border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-gray-50 hover:border-gray-300 text-gray-800 shadow-md hover:shadow-lg",
        secondary:
          "bg-gray-100 text-gray-800 shadow-md hover:bg-gray-200 hover:shadow-lg",
        ghost: "text-gray-800 hover:bg-gray-100/80 hover:text-gray-900",
        link: "text-gray-700 underline-offset-4 hover:underline hover:text-gray-900",
        clean:
          "bg-white/90 border border-gray-200/80 text-gray-800 shadow-lg backdrop-blur-sm hover:bg-white hover:border-gray-300 hover:shadow-xl",
        primary:
          "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg hover:from-gray-800 hover:to-gray-900 hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
        xl: "h-14 rounded-xl px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
