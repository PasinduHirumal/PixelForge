import React, { useState, useEffect } from "react";
import { Download, RefreshCw, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { FileMeta } from "../../types";
import { formatBytes } from "../../utils/image";
import Button from "../shared/Button";
import { cn } from "../../lib/utils";

interface ConvertWorkspaceProps {
  inputImage: FileMeta;
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  settings: {
    format: string;
    width: number;
    height: number;
  };
  onDownload: () => void;
  loading: boolean;
  imageLayoutId?: string;
}

export default function ConvertWorkspace({
  inputImage,
  convertedBlob,
  convertedUrl,
  settings,
  onDownload,
  loading,
  imageLayoutId,
}: ConvertWorkspaceProps) {
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Trigger image loading overlay when converted URL changes
  useEffect(() => {
    if (convertedUrl) {
      const frame = requestAnimationFrame(() => {
        setIsImageLoading(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [convertedUrl]);

  // Calculate compression savings percentage
  const showStats = convertedBlob !== null;
  const originalSize = inputImage.size;
  const convertedSize = convertedBlob ? convertedBlob.size : 0;
  const savedRatio = originalSize > 0 ? (originalSize - convertedSize) / originalSize : 0;
  const isCompressed = savedRatio > 0;
  const savedPercent = Math.round(savedRatio * 100);

  return (
    <div className="flex flex-col gap-6 w-full flex-grow">
      
      {/* Comparative View Container */}
      <div className="glass-panel p-6 bg-white/50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/40 rounded-3xl flex flex-col flex-grow shadow-inner min-h-[400px] md:min-h-[500px]">
        {loading ? (
          <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
            <p className="font-semibold text-zinc-655 dark:text-zinc-400 animate-pulse">
              Performing format conversion & compression...
            </p>
          </div>
        ) : convertedUrl && convertedBlob ? (
          /* Split Comparison Screen */
          <div className="flex-grow flex flex-col gap-6 justify-between h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-center justify-center">
              
              {/* Original Preview */}
              <div className="flex flex-col gap-2 h-full justify-center">
                <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-center text-xs">
                  Original Image
                </span>
                <motion.div
                  layoutId={imageLayoutId}
                  className="glass-panel p-2.5 bg-zinc-50/50 dark:bg-black/40 border border-zinc-200/50 dark:border-zinc-800/40 rounded-2xl flex items-center justify-center overflow-hidden h-[240px] md:h-[320px]"
                >
                  <img
                    src={inputImage.url}
                    alt="Original Upload"
                    className="max-h-[220px] md:max-h-[300px] w-auto rounded-lg object-contain"
                  />
                </motion.div>
                <div className="text-center text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                  {inputImage.width}×{inputImage.height}px • {formatBytes(inputImage.size)}
                </div>
              </div>

              {/* Converted Preview */}
              <div className="flex flex-col gap-2 h-full justify-center">
                <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-center text-xs flex items-center justify-center gap-1">
                  Converted Preview <Sparkles className="w-3 h-3 text-amber-500" />
                </span>
                <div className="glass-panel p-2.5 bg-zinc-50/50 dark:bg-black/40 border border-indigo-500/30 dark:border-indigo-500/15 rounded-2xl flex items-center justify-center overflow-hidden h-[240px] md:h-[320px] shadow-lg shadow-indigo-500/5 relative min-w-[200px]">
                  
                  {isImageLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 dark:bg-zinc-950/80 z-10">
                      <div className="w-8 h-8 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
                      <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-450 animate-pulse">Rendering preview...</span>
                    </div>
                  )}

                  <img
                    src={convertedUrl}
                    alt="Converted Export"
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                    className={cn(
                      "max-h-[220px] md:max-h-[300px] w-auto rounded-lg object-contain transition-all duration-300",
                      isImageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    )}
                  />
                  
                  {/* Format Badge */}
                  {!isImageLoading && (
                    <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-md uppercase">
                      {settings.format}
                    </span>
                  )}
                </div>
                <div className="text-center text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                  {settings.width}×{settings.height}px • {formatBytes(convertedBlob.size)}
                </div>
              </div>

            </div>

            {/* Savings & Download Panel */}
            <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-5 mt-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-200">
                    Conversion Complete
                  </h4>
                  {showStats && (
                    <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {isCompressed ? (
                        <>
                          Saved <span className="text-emerald-600 dark:text-emerald-400 font-bold">{savedPercent}%</span> in file size
                        </>
                      ) : (
                        `File format converted to ${settings.format.toUpperCase()}`
                      )}
                    </p>
                  )}
                </div>
              </div>

              <Button
                variant="secondary"
                onClick={onDownload}
                className="w-full md:w-auto flex items-center gap-2 py-3 cursor-pointer"
              >
                <Download className="w-4.5 h-4.5" />
                Download Converted Image
              </Button>
            </div>
          </div>
        ) : (
          /* Empty Preview State */
          <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/30 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <RefreshCw className="w-8 h-8 animate-pulse-slow text-zinc-500 dark:text-zinc-650" />
            </div>
            <div>
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                Ready for Conversion
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs text-sm">
                Adjust the formats, quality, and resolution settings on the left sidebar, and click &quot;Convert Image&quot; to load a live comparative review.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
