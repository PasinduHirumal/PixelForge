import Link from "next/link";
import { Crop, Heart } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-3" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 border-zinc-200/50 border-zinc-900/50 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <Crop className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-zinc-900 text-zinc-50">
              PixelForge
            </span>
          </Link>
          <p className="text-zinc-500 text-zinc-500 max-w-sm text-center md:text-left mt-1">
            Browser-based image suite for creators. Instant crops, custom conversions, zero server uploads.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link
            href="/crop"
            className="text-zinc-500 hover:text-indigo-400 transition-colors"
          >
            Image Cropper
          </Link>
          <Link
            href="/convert"
            className="text-zinc-500 hover:text-indigo-400 transition-colors"
          >
            Converter
          </Link>
          <Link
            href="/about"
            className="text-zinc-500 hover:text-indigo-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-zinc-500 hover:text-indigo-400 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Copyright & Source Code */}
        <div className="flex flex-col items-center md:items-end gap-2 text-zinc-400 text-zinc-600">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} PixelForge.</span>
            <span className="text-zinc-800">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> offline
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Open Source</span>
          </a>
        </div>


      </div>
    </footer>
  );
}
