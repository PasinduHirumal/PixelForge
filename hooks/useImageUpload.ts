import { useState, useCallback } from "react";
import { FileMeta } from "../types";
import { validateImage, getFileMetadata } from "../utils/image";

interface UseImageUploadResult {
  image: FileMeta | null;
  loading: boolean;
  error: string | null;
  handleFile: (file: File) => Promise<FileMeta | null>;
  clearImage: () => void;
}

export function useImageUpload(maxSizeMB = 50): UseImageUploadResult {
  const [image, setImage] = useState<FileMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File): Promise<FileMeta | null> => {
      setLoading(true);
      setError(null);

      // Clean up previous image URL to prevent memory leaks
      if (image?.url) {
        URL.revokeObjectURL(image.url);
      }

      const validation = validateImage(file, maxSizeMB);
      if (!validation.valid) {
        setError(validation.error || "Invalid file");
        setLoading(false);
        return null;
      }

      try {
        const metadata = await getFileMetadata(file);
        setImage(metadata);
        setLoading(false);
        return metadata;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to load image";
        setError(errorMsg);
        setLoading(false);
        return null;
      }
    },
    [image, maxSizeMB]
  );

  const clearImage = useCallback(() => {
    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }
    setImage(null);
    setError(null);
  }, [image]);

  return {
    image,
    loading,
    error,
    handleFile,
    clearImage,
  };
}
