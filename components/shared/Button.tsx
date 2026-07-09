"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "danger" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/15 hover:shadow-indigo-600/25 dark:bg-indigo-500 dark:hover:bg-indigo-600",
    secondary: "bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/15 hover:shadow-violet-600/25 dark:bg-violet-500 dark:hover:bg-violet-600",
    accent: "bg-cyan-500 hover:bg-cyan-600 text-white shadow-md shadow-cyan-500/15 hover:shadow-cyan-500/25",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/15",
    ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
    glass: "glass-panel bg-white/30 dark:bg-zinc-900/30 hover:bg-white/50 dark:hover:bg-zinc-900/50 border border-white/20 dark:border-zinc-800/40 text-zinc-900 dark:text-zinc-50 shadow-sm",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
