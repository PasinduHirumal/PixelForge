import { useState, useCallback, useEffect } from "react";
import { ConvertSettings, FileMeta } from "../types";
import { convertImage } from "../utils/converter";

const DEFAULT_SETTINGS: ConvertSettings = {
  format: "webp",
  quality: 0.9,
  transparentColor: "white",
  resizeMode: "original",
  width: 800,
  height: 600,
  keepRatio: true,
  renameText: "",
};

export function useConvert(inputImage: FileMeta | null) {
  const [settings, setSettings] = useState<ConvertSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  // Auto-initialize dimensions when image uploads
  useEffect(() => {
    if (inputImage) {
      // Determine default format value based on input file type (to avoid converting to the same format initially)
      let defaultFormat = "webp";
      const inputExt = inputImage.name.split(".").pop()?.toLowerCase();
      if (inputExt === "webp") {
        defaultFormat = "jpg";
      }

      Promise.resolve().then(() => {
        setSettings((prev) => ({
          ...prev,
          width: inputImage.width,
          height: inputImage.height,
          format: defaultFormat,
          renameText: inputImage.name.substring(0, inputImage.name.lastIndexOf(".")),
        }));
        setConvertedBlob(null);
        setConvertedUrl(null);
        setError(null);
      });
    }
  }, [inputImage]);

  // Clean up Object URL
  useEffect(() => {
    return () => {
      if (convertedUrl) {
        URL.revokeObjectURL(convertedUrl);
      }
    };
  }, [convertedUrl]);

  const updateSetting = useCallback(<K extends keyof ConvertSettings>(key: K, value: ConvertSettings[K]) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      
      // Auto-adjust dimensions if keep aspect ratio is toggled
      if (inputImage && updated.keepRatio && key === "width") {
        const ratio = inputImage.width / inputImage.height;
        updated.height = Math.round(Number(value) / ratio);
      } else if (inputImage && updated.keepRatio && key === "height") {
        const ratio = inputImage.width / inputImage.height;
        updated.width = Math.round(Number(value) * ratio);
      }

      return updated;
    });
    // Invalidate previous conversion output
    setConvertedBlob(null);
    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
      setConvertedUrl(null);
    }
  }, [inputImage, convertedUrl]);

  const handleConvert = useCallback(async () => {
    if (!inputImage) return null;

    setLoading(true);
    setError(null);

    try {
      const resizeParams =
        settings.resizeMode === "custom"
          ? { width: settings.width, height: settings.height }
          : undefined;

      const blob = await convertImage(
        inputImage.url,
        settings.format,
        settings.quality,
        settings.transparentColor,
        resizeParams
      );

      setConvertedBlob(blob);
      const url = URL.createObjectURL(blob);
      setConvertedUrl(url);
      setLoading(false);
      return { blob, url };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to convert image.";
      setError(errorMsg);
      setLoading(false);
      return null;
    }
  }, [inputImage, settings]);

  const reset = useCallback(() => {
    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
    }
    setConvertedBlob(null);
    setConvertedUrl(null);
    setError(null);
    if (inputImage) {
      setSettings({
        ...DEFAULT_SETTINGS,
        width: inputImage.width,
        height: inputImage.height,
        renameText: inputImage.name.substring(0, inputImage.name.lastIndexOf(".")),
      });
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
  }, [inputImage, convertedUrl]);

  return {
    settings,
    updateSetting,
    loading,
    error,
    convertedBlob,
    convertedUrl,
    convert: handleConvert,
    reset,
  };
}
