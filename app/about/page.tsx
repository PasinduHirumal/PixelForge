"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, EyeOff, Code2, Globe } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <EyeOff className="w-6 h-6 text-indigo-500" />,
      title: "100% Client-Side Privacy",
      description:
        "Standard online editors require uploading your images to remote cloud servers. PixelForge executes all pixel processing right inside your browser sandbox. Your private photos never leave your device.",
    },
    {
      icon: <Zap className="w-6 h-6 text-violet-500" />,
      title: "Sub-Second Performance",
      description:
        "By bypassing network uploads and downloads, PixelForge eliminates API lags. We utilize the HTML5 Canvas API and WebGL pipelines directly on your GPU for ultra-fast, offline-first execution.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-cyan-500" />,
      title: "Next-Gen Format Encoding",
      description:
        "Optimize your images for core web vitals. Convert heavy PNGs and JPGs to lightweight next-generation formats like WebP and AVIF, reducing asset payloads by up to 80% without detail degradation.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 md:py-16 flex flex-col gap-16 px-4">
      {/* Title */}
      <section className="text-center flex flex-col gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:text-5xl font-black text-zinc-950 text-zinc-50"
        >
          About{" "}
          <span className="text-gradient bg-gradient-to-r from-primary to-secondary">
            PixelForge
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sm:text-lg text-zinc-500 text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          A premium, offline-first image cropping and conversion toolkit designed for developers, designer teams, and content creators who prioritize privacy and speed.
        </motion.p>
      </section>

      {/* Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="glass-panel p-6 bg-zinc-900/20 border border-zinc-800/40 shadow-lg flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-950/40 border border-zinc-800/30 flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="font-bold text-zinc-900 text-zinc-200">
              {item.title}
            </h3>
            <p className="text-zinc-500 text-zinc-400 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Inner Workings Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-panel p-8 md:p-10 bg-zinc-900/20 border border-zinc-800/40 shadow-xl flex flex-col gap-6"
      >
        <h2 className="sm:text-2xl font-black text-zinc-950 text-zinc-50">
          How It Works Under the Hood
        </h2>
        <div className="flex flex-col gap-4 sm:text-sm text-zinc-500 text-zinc-400 leading-relaxed">
          <p>
            When you select an image file inside PixelForge, the browser generates a local, virtual Object URL pointing to the file data in RAM. This URL is loaded into an off-screen HTML5 Image Node.
          </p>
          <p>
            For cropping, we calculate coordinates, zoom ratios, rotations, and reflection states. These factors are translated into matrix transform operations mapped onto a 2D drawing context node. The canvas performs the slice operation, yielding a clean data stream.
          </p>
          <p>
            For conversions, we draw the pixels onto an empty viewport canvas. If the destination format lacks an alpha channel (like JPEG), we fill the background with white or black pixels to prevent corruption of transparent details. We then call the native `canvas.toBlob()` method, specifying parameters like target MIME types and quality scales.
          </p>
        </div>
      </motion.section>

      {/* Quote */}
      <section className="text-center py-6 border-zinc-200/50 border-zinc-900/50">
        <p className="text-zinc-400 text-zinc-600 flex items-center justify-center gap-1.5 font-medium">
          <Globe className="w-3.5 h-3.5" /> Made for the decentralized, privacy-respecting web. No cookies, no trackers.
        </p>
      </section>

    </div>
  );
}
