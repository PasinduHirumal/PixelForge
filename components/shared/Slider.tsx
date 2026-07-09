"use client";

import React from "react";
import { cn } from "../../lib/utils";

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

  // Calculate percentage of track filled
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center font-semibold text-zinc-500 text-zinc-400">
        <span>{label}</span>
        <span className="font-mono bg-indigo-950/30 text-indigo-400 px-2 py-0.5 rounded-md">
          {valueDisplay(value)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {iconLeft && (
          <div className="text-zinc-500 flex-shrink-0">
            {iconLeft}
          </div>
        )}

        <div className="relative flex-grow flex items-center h-5 group">
          {/* Custom Track Background */}
          <div className="absolute left-0 right-0 h-1.5 rounded-full bg-zinc-800 pointer-events-none" />
          
          {/* Custom Track Fill */}
          <div
            className="absolute left-0 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary pointer-events-none"
            style={{ width: `${percentage}%` }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />

          {/* Custom Thumb indicator */}
          <div
            className="absolute w-4 h-4 rounded-full bg-zinc-50 border-indigo-600 border-indigo-400 shadow-md group-hover:scale-110 group-active:scale-95 transition-all pointer-events-none"
            style={{
              left: `calc(${percentage}% - 8px)`,
            }}
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
