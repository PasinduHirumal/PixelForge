"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { SUPPORTED_INPUT_TYPES } from "../../constants/formats";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export default function Dropzone({
  onFileSelect,
  loading = false,
  error = null,
  className,
}: DropzoneProps) {
  const [isDragActiveLocal, setIsDragActiveLocal] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  // Map SUPPORTED_INPUT_TYPES array to react-dropzone accept object format
  const acceptObj: Record<string, string[]> = {};
  SUPPORTED_INPUT_TYPES.forEach((type) => {
    acceptObj[type] = [];
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptObj,
    maxFiles: 1,
    disabled: loading,
    onDragEnter: () => setIsDragActiveLocal(true),
    onDragLeave: () => setIsDragActiveLocal(false),
  });

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "glass-panel relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 hover:scale-[1.005] active:scale-[0.995]",
          isDragActive || isDragActiveLocal
            ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10 shadow-lg shadow-indigo-500/5"
            : "border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-900 bg-white/40 dark:bg-zinc-900/30",
          loading && "opacity-50 pointer-events-none cursor-default"
        )}
      >
        <input {...getInputProps()} />

        {/* Dynamic Background Glow for Drag Hover */}
        <div
          className={cn(
            "absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
            (isDragActive || isDragActiveLocal) && "opacity-100"
          )}
        />

        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-t-indigo-600 animate-spin border-zinc-200 dark:border-zinc-800 border-t-indigo-400" />
            </div>
            <p className="font-semibold text-zinc-600 dark:text-zinc-400">
              Processing image metadata...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 z-10">
            {/* Animated Icon Wrapper */}
            <motion.div
              animate={
                isDragActive || isDragActiveLocal
                  ? { y: -8, scale: 1.1 }
                  : { y: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-md transition-colors",
                isDragActive || isDragActiveLocal
                  ? "bg-indigo-600 text-white shadow-indigo-500/20"
                  : "bg-zinc-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400"
              )}
            >
              {isDragActive || isDragActiveLocal ? (
                <ImageIcon className="w-8 h-8" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </motion.div>

            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                {isDragActive || isDragActiveLocal
                  ? "Drop your image here"
                  : "Drag & drop image here, or click to browse"}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">
                Supports PNG, JPG, JPEG, WEBP, AVIF, BMP, GIF (static), SVG, ICO (Max size 50MB)
              </p>
            </div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-medium border border-rose-100 dark:border-rose-950/30"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
