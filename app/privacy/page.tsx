"use client";

import { motion } from "framer-motion";
import { ShieldCheck, EyeOff, FileText, Lock } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <EyeOff className="w-5 h-5 text-indigo-500" />,
      title: "Zero Image Uploads",
      description:
        "All image cropping, conversions, and rendering calculations are performed strictly inside your browser sandbox. We do not operate remote servers, APIs, or cloud processors to store or analyze your files.",
    },
    {
      icon: <Lock className="w-5 h-5 text-violet-500" />,
      title: "Data Isolation",
      description:
        "We do not collect, read, or track any identifiable details, filenames, or coordinates. Your workspace runs in-memory, and all object URLs are instantly revoked when you clear an image or navigate away.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-500" />,
      title: "No Cookies or Tracking",
      description:
        "PixelForge is tracker-free. We do not inject telemetry, analytics packages, cookies, or marketing tags into your session. The only data written to your device is your light/dark theme toggle setting stored in localStorage.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 px-4">
      {/* Header */}
      <section className="text-center flex flex-col gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-zinc-50 flex items-center justify-center gap-2"
        >
          <FileText className="w-8 h-8 text-primary" />
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed"
        >
          Effective Date: July 13, 2026. Review how we protect your files and privacy.
        </motion.p>
      </section>

      {/* Main Pillars */}
      <section className="flex flex-col gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + index * 0.1 }}
            className="glass-panel p-5 bg-white/40 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/40 shadow-md flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/30 dark:border-zinc-800/30 flex items-center justify-center flex-shrink-0">
              {section.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-200">
                {section.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                {section.description}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Policy Details */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-panel p-6 sm:p-8 bg-white/40 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/40 shadow-lg flex flex-col gap-5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed"
      >
        <h2 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
          Frequently Clarified Points
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              Local Browser Storage
            </h3>
            <p>
              We write a single item (`pixelforge-theme`) to your browser&apos;s LocalStorage to save your light or dark mode theme selection. This data is stored entirely on your computer and is never shared.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              External Hosting & CDN Boundaries
            </h3>
            <p>
              While our application logic is served from hosting servers (like Vercel or local static servers), once the HTML, JavaScript, and CSS bundle are loaded by your browser, all image actions execute locally. The host has no connection to or sight of any image loaded into the app.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              Changes to This Policy
            </h3>
            <p>
              Because PixelForge is a static website that does not record cookies or build databases, we do not have means to contact users. Any updates to this policy will be posted on this page.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Close Message */}
      <section className="text-center text-xs text-zinc-400 dark:text-zinc-600 font-medium">
        <span>If you have privacy questions, feel free to run PixelForge fully offline or inspect our client source code.</span>
      </section>

    </div>
  );
}
