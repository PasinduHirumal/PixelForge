"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crop, RefreshCw, Layers, ShieldCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Layers },
  { label: "Crop", href: "/crop", icon: Crop },
  { label: "Convert", href: "/convert", icon: RefreshCw },
  { label: "About", href: "/about", icon: ShieldCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] w-full px-4 py-3 md:px-8">
      <nav className="mx-auto max-w-7xl glass-panel bg-white/70 dark:bg-zinc-950/70 border border-white/30 dark:border-zinc-900/30 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <img src="/logo.png" alt="PixelForge Logo" />
          </div>
          <span className="font-bold text-2xl sm:text-3xl tracking-tight text-gradient bg-gradient-to-r from-primary to-secondary">
            PixelForge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                  isActive
                    ? "text-primary dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-indigo-50 dark:bg-zinc-900 rounded-full -z-10 border border-indigo-100/30 dark:border-zinc-800/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/crop"
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-full transition-all duration-300 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-98 cursor-pointer"
          >
            Start Cropping
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 z-50 glass-panel bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-white/40 dark:border-zinc-900/40 p-5 shadow-2xl flex flex-col gap-4"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-700 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/crop"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full py-3.5 text-center text-sm font-semibold text-white bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-lg shadow-indigo-600/10 cursor-pointer"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
