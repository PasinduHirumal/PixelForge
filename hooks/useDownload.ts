import { useState, useCallback } from "react";
import { downloadBlob } from "../utils/download";
import { formatFilenameWithSuffix } from "../utils/filename";

interface UseDownloadResult {
  downloading: boolean;
  downloadFile: (
    blob: Blob | null,
    originalName: string,
    suffix: string,
    targetExtension: string
  ) => boolean;
}

export function useDownload(): UseDownloadResult {
  const [downloading, setDownloading] = useState(false);

  const downloadFile = useCallback(
    (
      blob: Blob | null,
      originalName: string,
      suffix: string,
      targetExtension: string
    ): boolean => {
      if (!blob) return false;

      setDownloading(true);
      try {
        const finalFilename = formatFilenameWithSuffix(
          originalName,
          suffix,
          targetExtension
        );
        downloadBlob(blob, finalFilename);
        setDownloading(false);
        return true;
      } catch (error) {
        console.error("Failed to download image file", error);
        setDownloading(false);
        return false;
      }
    },
    []
  );

  return {
    downloading,
    downloadFile,
  };
}
