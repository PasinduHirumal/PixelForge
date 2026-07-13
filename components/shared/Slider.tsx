"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { useTheme } from "./ThemeProvider";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
  valueDisplay?: (value: number) => string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

export default function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  onChangeCommitted,
  valueDisplay = (v) => `${v}`,
  iconLeft,
  iconRight,
  className,
}: SliderProps) {
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleMouseUp = () => {
    if (onChangeCommitted) {
      onChangeCommitted(value);
    }
  };

  const handleTouchEnd = () => {
    if (onChangeCommitted) {
      onChangeCommitted(value);
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;
  const trackBg = theme === "dark" ? "#27272a" : "#e2e8f0";

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center font-semibold text-zinc-500 dark:text-zinc-400">
        <span>{label}</span>
        <span className="font-mono bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md text-xs">
          {valueDisplay(value)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {iconLeft && (
          <div className="text-zinc-500 flex-shrink-0">
            {iconLeft}
          </div>
        )}

        <div className="relative flex-grow flex items-center h-5">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
            style={{
              background: `linear-gradient(to right, #4F46E5 0%, #7C3AED ${percentage}%, ${trackBg} ${percentage}%, ${trackBg} 100%)`,
            }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-95 [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:active:scale-95"
          />
        </div>

        {iconRight && (
          <div className="text-zinc-500 flex-shrink-0">
            {iconRight}
          </div>
        )}
      </div>
    </div>
  );
}
