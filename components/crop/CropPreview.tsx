"use client";

import React, { useState, useEffect } from "react";
import { X, Download, Image as ImageIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../shared/Button";
import Slider from "../shared/Slider";
import Select from "../shared/Select";
import { OUTPUT_FORMATS } from "../../constants/formats";
import { formatBytes } from "../../utils/image";
import { cn } from "../../lib/utils";

interface CropPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  croppedBlob: Blob | null;
  originalFilename: string;
  onDownload: (blob: Blob, filename: string, suffix: string, format: string) => void;
  targetWidth: number;
  targetHeight: number;
}

export default function CropPreview({
  isOpen,
  onClose,
  croppedBlob,
  originalFilename,
  onDownload,
  targetWidth,
  targetHeight,
}: CropPreviewProps) {
  const [filename, setFilename] = useState("");
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(0.9);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Set default filename and revoke previous URL to prevent memory leaks
  useEffect(() => {
    if (croppedBlob) {
      const baseName = originalFilename.substring(0, originalFilename.lastIndexOf(".")) || originalFilename;
      const url = URL.createObjectURL(croppedBlob);

      Promise.resolve().then(() => {
        setFilename(`${baseName}-cropped`);
        setPreviewUrl(url);
      });

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [croppedBlob, originalFilename]);

  const handleDownloadClick = () => {
    if (croppedBlob) {
      onDownload(croppedBlob, filename, "", format);
    }
  };

  const formatOptions = OUTPUT_FORMATS.filter(
    (f) => ["png", "jpg", "webp", "avif"].includes(f.value)
  ).map((f) => ({
    label: f.label,
    value: f.value,
  }));

  const showQualitySlider = ["jpg", "webp", "avif"].includes(format);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-sm"
          />

          {/* Sliding Preview Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-[130] w-full max-w-lg bg-white/95 dark:bg-zinc-950/95 border-l border-zinc-200/50 dark:border-zinc-900/50 shadow-2xl p-6 md:p-8 flex flex-col gap-6 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
                  Cropped Image Ready
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cropped Image Live Preview */}
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="glass-panel w-full relative flex items-center justify-center p-3 bg-zinc-950/5 dark:bg-zinc-950/45 border-dashed border-2 border-zinc-200/50 dark:border-zinc-800/50 min-h-[220px] rounded-2xl overflow-hidden shadow-inner group">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Cropped Preview"
                      className="max-h-[240px] md:max-h-[300px] w-auto rounded-xl object-contain shadow-lg border border-white/20 dark:border-zinc-900/50 transition-transform duration-500 group-hover:scale-101"
                    />
                    
                    {/* Dimension Tag */}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur text-[10px] font-bold text-white px-2.5 py-1 rounded-full shadow border border-white/10">
                      {targetWidth} × {targetHeight} px
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-400">
                    <ImageIcon className="w-10 h-10 animate-pulse text-zinc-300 dark:text-zinc-700" />
                    <span className="text-xs font-medium">Generating crop preview...</span>
                  </div>
                )}
              </div>

              {croppedBlob && (
                <div className="text-[10px] text-zinc-400 font-medium mt-2 flex gap-1 items-center">
                  <span>Approx. intermediate PNG size:</span>
                  <span className="font-semibold text-zinc-500 dark:text-zinc-300">
                    {formatBytes(croppedBlob.size)}
                  </span>
                </div>
              )}
            </div>

            {/* Downloader Settings Panel */}
            <div className="flex flex-col gap-4 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-5">
              
              {/* Filename */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Export Filename
                </label>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 text-sm rounded-2xl"
                  placeholder="Filename"
                />
              </div>

              {/* Format & Quality Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Output Format"
                  options={formatOptions}
                  selectedValue={format}
                  onChange={(newFormat) => setFormat(newFormat)}
                />

                <div className="flex items-end">
                  {showQualitySlider && (
                    <Slider
                      label="Quality Compression"
                      min={0.1}
                      max={1.0}
                      step={0.05}
                      value={quality}
                      onChange={setQuality}
                      valueDisplay={(v) => `${Math.round(v * 100)}%`}
                    />
                  )}
                </div>
              </div>

              {/* Download Trigger */}
              <Button
                variant="secondary"
                onClick={handleDownloadClick}
                className="w-full flex items-center gap-2 mt-4 py-3.5 shadow-lg cursor-pointer"
              >
                <Download className="w-4.5 h-4.5" />
                Download Cropped Image
              </Button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
