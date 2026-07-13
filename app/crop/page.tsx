"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Crop as CropIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useCrop } from "../../hooks/useCrop";
import { useDownload } from "../../hooks/useDownload";
import { useToast } from "../../components/shared/Toast";
import Dropzone from "../../components/shared/Dropzone";
import CropWorkspace from "../../components/crop/CropWorkspace";
import CropControls from "../../components/crop/CropControls";
import CropPreview from "../../components/crop/CropPreview";
import { getCroppedImg } from "../../utils/canvas";
import { convertImage } from "../../utils/converter";
import Button from "../../components/shared/Button";

export default function CropPage() {
  const { success, error: toastError } = useToast();
  const { image, loading: uploadLoading, error: uploadError, handleFile, clearImage } = useImageUpload(50);
  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    commitZoom,
    rotation,
    setRotation,
    commitRotation,
    aspect,
    setAspect,
    flipH,
    flipV,
    handleFlipH,
    handleFlipV,
    customWidth,
    customHeight,
    setCustomWidth,
    setCustomHeight,
    keepRatio,
    toggleKeepRatio,
    croppedAreaPixels,
    onCropComplete,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useCrop(image?.width, image?.height);

  const { downloadFile } = useDownload();
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [cropLoading, setCropLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [animationPhase, setAnimationPhase] = useState<"idle" | "animating" | "done">("idle");

  // Sync image upload with animation phase
  useEffect(() => {
    if (image) {
      setAnimationPhase("animating");
      const timer = setTimeout(() => {
        setAnimationPhase("done");
      }, 700); // 700ms showcase
      return () => clearTimeout(timer);
    } else {
      setAnimationPhase("idle");
    }
  }, [image]);

  const handleCropTrigger = async () => {
    if (!image || !croppedAreaPixels) return;

    setCropLoading(true);
    try {
      const cropped = await getCroppedImg(
        image.url,
        croppedAreaPixels,
        rotation,
        { horizontal: flipH, vertical: flipV },
        !!aspect.isCircle,
        { width: customWidth, height: customHeight }
      );

      setCroppedBlob(cropped);
      setIsPreviewOpen(true);
      setCropLoading(false);
      success("Success", "Cropped image rendered successfully!");
    } catch (err) {
      console.error(err);
      setCropLoading(false);
      toastError("Crop Failed", "Could not generate cropped image. Try again.");
    }
  };

  const handleDownload = async (
    blob: Blob,
    filename: string,
    suffix: string,
    format: string,
    quality: number
  ) => {
    let finalBlob = blob;

    if (format !== "png") {
      setCropLoading(true);
      try {
        const imageUrl = URL.createObjectURL(blob);
        finalBlob = await convertImage(imageUrl, format, quality);
        URL.revokeObjectURL(imageUrl);
      } catch (err) {
        console.error("Conversion failed during download", err);
      } finally {
        setCropLoading(false);
      }
    }

    const ok = downloadFile(finalBlob, filename, suffix, format);
    if (ok) {
      success("Downloaded", "Image downloaded to your device!");
      setIsPreviewOpen(false);
    } else {
      toastError("Download Failed", "Something went wrong during export.");
    }
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Header breadcrumb row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <CropIcon className="w-6 h-6 text-primary" />
              Image Cropper
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
              Crop, rotate, scale, and flip images inside your sandbox canvas.
            </p>
          </div>
        </div>

        {image && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearImage}
            className="self-end md:self-auto border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            Upload Different Image
          </Button>
        )}
      </div>

      {/* Upload State vs Editor Workspace State */}
      <AnimatePresence mode="wait">
        {animationPhase === "idle" && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex-grow flex items-center justify-center py-10 md:py-16 w-full"
          >
            <Dropzone
              onFileSelect={handleFile}
              loading={uploadLoading}
              error={uploadError}
            />
          </motion.div>
        )}

        {animationPhase === "animating" && image && (
          <motion.div
            key="animating-showcase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col items-center justify-center py-12 md:py-24 w-full relative min-h-[400px]"
          >
            <motion.div
              layoutId="workspace-image-container"
              className="glass-panel p-4 bg-white/70 dark:bg-zinc-900/60 border border-white/50 dark:border-zinc-800/40 rounded-3xl shadow-2xl flex items-center justify-center max-w-md w-full aspect-video overflow-hidden"
            >
              <img
                src={image.url}
                alt="Loading..."
                className="max-h-[220px] w-auto rounded-xl object-contain shadow-lg"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-4 animate-pulse"
            >
              Opening image in workspace...
            </motion.p>
          </motion.div>
        )}

        {animationPhase === "done" && image && (
          <motion.div
            key="workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start flex-grow w-full"
          >
            {/* Main Cropper Workspace Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col h-full"
            >
              <CropWorkspace
                image={image}
                crop={crop}
                setCrop={setCrop}
                zoom={zoom}
                setZoom={setZoom}
                rotation={rotation}
                aspect={aspect}
                flipH={flipH}
                flipV={flipV}
                onCropComplete={onCropComplete}
                imageLayoutId="workspace-image-container"
              />
            </motion.div>

            {/* Adjustments Controls Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, type: "spring", damping: 20 }}
              className="lg:col-span-1"
            >
              <CropControls
                zoom={zoom}
                setZoom={setZoom}
                commitZoom={commitZoom}
                rotation={rotation}
                setRotation={setRotation}
                commitRotation={commitRotation}
                aspect={aspect}
                setAspect={setAspect}
                flipH={flipH}
                flipV={flipV}
                handleFlipH={handleFlipH}
                handleFlipV={handleFlipV}
                customWidth={customWidth}
                customHeight={customHeight}
                setCustomWidth={setCustomWidth}
                setCustomHeight={setCustomHeight}
                keepRatio={keepRatio}
                toggleKeepRatio={toggleKeepRatio}
                reset={reset}
                undo={undo}
                redo={redo}
                canUndo={canUndo}
                canRedo={canRedo}
                onCropTrigger={handleCropTrigger}
                loading={cropLoading}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Preview Sidebar Drawer */}
      <CropPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        croppedBlob={croppedBlob}
        originalFilename={image?.name || "image.png"}
        onDownload={handleDownload}
        targetWidth={customWidth}
        targetHeight={customHeight}
      />

    </div>
  );
}
