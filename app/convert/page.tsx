"use client";

import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useConvert } from "../../hooks/useConvert";
import { useDownload } from "../../hooks/useDownload";
import { useToast } from "../../components/shared/Toast";
import Dropzone from "../../components/shared/Dropzone";
import ConvertSettings from "../../components/convert/ConvertSettings";
import ConvertWorkspace from "../../components/convert/ConvertWorkspace";
import Button from "../../components/shared/Button";

export default function ConvertPage() {
  const { success, error: toastError } = useToast();
  const { image, loading: uploadLoading, error: uploadError, handleFile, clearImage } = useImageUpload(50);
  
  const {
    settings,
    updateSetting,
    loading: convertLoading,
    convertedBlob,
    convertedUrl,
    convert,
    reset,
  } = useConvert(image);

  const { downloadFile } = useDownload();

  // Detect input extension
  const inputExt = image ? image.name.split(".").pop()?.toLowerCase() : "";
  // Check if same format is selected
  const isSameFormat = inputExt === settings.format;
  const canConvert = !isSameFormat && !convertLoading;

  const handleConvertTrigger = async () => {
    const result = await convert();
    if (result) {
      success("Conversion Success", `Image converted to ${settings.format.toUpperCase()} successfully!`);
    } else {
      toastError("Conversion Failed", "Canvas conversion encountered an error.");
    }
  };

  const handleDownloadTrigger = () => {
    if (convertedBlob) {
      const ok = downloadFile(
        convertedBlob,
        settings.renameText || "image",
        "",
        settings.format
      );
      if (ok) {
        success("Downloaded", "Converted image saved successfully!");
      } else {
        toastError("Download Failed", "Something went wrong during export.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 py-4 flex-grow">
      
      {/* Header Breadcrumbs Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <RefreshCw className="w-5.5 h-5.5 text-primary animate-pulse-slow" />
              Image Converter
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Convert image extensions, optimize sizes, adjust background colors, and compress quality locally.
            </p>
          </div>
        </div>

        {image && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearImage();
              reset();
            }}
            className="self-start md:self-auto border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            Upload Different Image
          </Button>
        )}
      </div>

      {/* Dropzone vs Convert Editor */}
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-grow flex items-center justify-center py-10 md:py-16 w-full"
          >
            <Dropzone
              onFileSelect={handleFile}
              loading={uploadLoading}
              error={uploadError}
            />
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start flex-grow w-full"
          >
            {/* Settings Column */}
            <div className="lg:col-span-1">
              <ConvertSettings
                inputImage={image}
                settings={settings}
                updateSetting={updateSetting}
                onConvert={handleConvertTrigger}
                loading={convertLoading}
                canConvert={canConvert}
              />
            </div>

            {/* Workspace / Comparison Column */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <ConvertWorkspace
                inputImage={image}
                convertedBlob={convertedBlob}
                convertedUrl={convertedUrl}
                settings={settings}
                onDownload={handleDownloadTrigger}
                loading={convertLoading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
