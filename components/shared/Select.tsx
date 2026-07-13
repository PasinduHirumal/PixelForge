"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface SelectOption<T> {
  label: string;
  value: T;
  category?: string;
  isCircle?: boolean;
}

interface SelectProps<T> {
  label?: string;
  options: SelectOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  className?: string;
  placeholder?: string;
}

export default function Select<T>({
  label,
  options,
  selectedValue,
  onChange,
  className,
  placeholder = "Select an option",
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [openDirection, setOpenDirection] = useState<"up" | "down">("down");

  const selectedOption = options.find((o) => {
    if (o.value === selectedValue) return true;
    if (
      selectedValue &&
      o.value &&
      typeof selectedValue === "object" &&
      typeof o.value === "object"
    ) {
      const val1 = selectedValue as Record<string, unknown>;
      const val2 = o.value as Record<string, unknown>;
      return val1.value === val2.value || val1.label === val2.label;
    }
    return false;
  });

  // Position detection
  useEffect(() => {
    const handlePosition = () => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Dropdown max height (max-h-64 = 256px + padding/border ~280px)
        if (spaceBelow < 280 && spaceAbove > spaceBelow) {
          setOpenDirection("up");
        } else {
          setOpenDirection("down");
        }
      }
    };

    if (isOpen) {
      handlePosition();
      window.addEventListener("scroll", handlePosition, { passive: true });
      window.addEventListener("resize", handlePosition);
    }

    return () => {
      window.removeEventListener("scroll", handlePosition);
      window.removeEventListener("resize", handlePosition);
    };
  }, [isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Group options by category if they exist
  const categories: { [key: string]: SelectOption<T>[] } = {};
  options.forEach((opt) => {
    const cat = opt.category || "Options";
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(opt);
  });

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
      )}

      <div ref={containerRef} className="relative w-full">
        {/* Selector Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-panel w-full flex items-center justify-between px-4 py-2.5 bg-white/70 dark:bg-zinc-900/60 border border-white/50 dark:border-zinc-800/40 text-sm text-zinc-900 dark:text-zinc-50 rounded-2xl shadow-sm text-left hover:bg-white/95 dark:hover:bg-zinc-900/85 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-zinc-400 transition-transform duration-300",
              isOpen && "rotate-180 text-primary"
            )}
          />
        </button>

        {/* Options Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: openDirection === "up" ? -10 : 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: openDirection === "up" ? -10 : 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute left-0 right-0 z-50 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 max-h-64 overflow-y-auto p-1.5 shadow-xl rounded-2xl",
                openDirection === "up" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
              )}
            >
              {Object.entries(categories).map(([category, items]) => (
                <div key={category} className="mb-2 last:mb-0">
                  {Object.keys(categories).length > 1 && (
                    <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-600 uppercase">
                      {category}
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 mt-1">
                    {items.map((opt) => {
                      const isSelected =
                        selectedOption?.label === opt.label &&
                        selectedOption?.value === opt.value;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => {
                            onChange(opt.value);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors text-left cursor-pointer",
                            isSelected
                              ? "bg-indigo-50 dark:bg-indigo-950/30 text-primary dark:text-indigo-400 font-medium"
                              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                          )}
                        >
                          <span className="truncate">{opt.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
