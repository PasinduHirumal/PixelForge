"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crop,
  RefreshCw,
  Zap,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileImage
} from "lucide-react";
import Button from "../components/shared/Button";
import { cn } from "../lib/utils";

// FAQs Data
const FAQS = [
  {
    question: "Is PixelForge free to use?",
    answer:
      "Yes! PixelForge is 100% free with no subscription tiers, no usage limits, and no watermarks. You can crop and convert as many images as you like.",
  },
  {
    question: "Are my images uploaded to any server?",
    answer:
      "Never. PixelForge is built completely offline-first. All operations (cropping, rotation, resizing, format conversion, and compression) are executed directly inside your web browser using the HTML5 Canvas API. Your image files never leave your device.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support importing PNG, JPG, JPEG, WebP, AVIF, BMP, GIF, SVG, and ICO files. You can export/convert images to PNG, JPEG/JPG, WebP, AVIF, BMP, ICO, and static single-frame GIF.",
  },
  {
    question: "Why should I convert my images to WebP or AVIF?",
    answer:
      "WebP and AVIF are next-generation image formats that provide superior compression quality. They can reduce image file sizes by up to 50% to 80% compared to standard PNG or JPEG, significantly speeding up website loading times without visible loss in details.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "PixelForge supports image file sizes up to 50MB. Since all processing is performed locally in your browser, the performance depends on your device's hardware, but standard images load and process in milliseconds.",
  },
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <div className="flex flex-col gap-24 py-10 md:py-16">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center max-w-4xl mx-auto gap-6 px-4">
        {/* Glow Effects */}
        <div className="absolute top-[-50px] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute bottom-[-50px] w-[350px] h-[350px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Promo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-950/30 border border-indigo-900/40 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="font-bold text-primary text-indigo-400">
            100% Client-Side & Private
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-zinc-950 dark:text-zinc-50"
        >
          Crop, Convert & Download{" "}
          <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent">
            Images Instantly
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="sm:text-lg md:text-xl text-zinc-500 text-zinc-400 max-w-2xl leading-relaxed mt-2"
        >
          Upload your images and crop or convert them directly inside your browser. No files are uploaded to any servers. Keep your files 100% private.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center"
        >
          <Link href="/crop">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center gap-2 cursor-pointer">
              <Crop className="w-4.5 h-4.5" />
              Open Image Cropper
            </Button>
          </Link>
          <Link href="/convert">
            <Button variant="glass" size="lg" className="w-full sm:w-auto flex items-center gap-2 cursor-pointer">
              <RefreshCw className="w-4.5 h-4.5" />
              Open Converter
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <h2 className="sm:text-3xl font-black text-zinc-950 text-zinc-50">
            Engineered for Creators & Developers
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Experience desktop-grade image processing right inside the web.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-6 bg-zinc-900/20 border border-zinc-800/40 hover:border-indigo-900/50 transition-all duration-300 shadow-lg flex flex-col gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950/30 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Precision Crop
              </h3>
              <p className="text-zinc-500 text-zinc-400 leading-relaxed mt-2">
                Crop with free dimensions or standard presets for social banners, circle avatars, and paper templates.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-6 bg-zinc-900/20 border border-zinc-800/40 hover:border-indigo-900/50 transition-all duration-300 shadow-lg flex flex-col gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950/30 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Format Converter
              </h3>
              <p className="text-zinc-500 text-zinc-400 leading-relaxed mt-2">
                Convert files instantly to next-gen formats like WebP and AVIF, or classic PNG, JPEG, BMP, and ICO.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-6 bg-zinc-900/20 border border-zinc-800/40 hover:border-indigo-900/50 transition-all duration-300 shadow-lg flex flex-col gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950/30 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Instant Processing
              </h3>
              <p className="text-zinc-500 text-zinc-400 leading-relaxed mt-2">
                No uploads, no network delay. Your GPU and CPU handle the canvas drawing locally, outputting results in milliseconds.
              </p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-6 bg-zinc-900/20 border border-zinc-800/40 hover:border-indigo-900/50 transition-all duration-300 shadow-lg flex flex-col gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950/30 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                100% Private
              </h3>
              <p className="text-zinc-500 text-zinc-400 leading-relaxed mt-2">
                Privacy-first architecture. All pixel manipulation happens inside sandbox canvas nodes. No tracking, no uploads.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col gap-10 max-w-3xl mx-auto w-full px-4">
        <div className="text-center flex flex-col gap-3">
          <h2 className="sm:text-3xl font-black text-zinc-950 dark:text-zinc-50">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Have questions? We have compiled responses to typical inquiries.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-panel bg-zinc-900/25 border border-zinc-800/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4.5 font-semibold text-sm sm:text-base text-zinc-800 dark:text-zinc-100 cursor-pointer hover:bg-zinc-300/40 dark:hover:bg-zinc-900/40 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-zinc-400 transition-transform duration-300 flex-shrink-0 ml-4",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-zinc-200/30 dark:border-zinc-800/30 pt-3">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
