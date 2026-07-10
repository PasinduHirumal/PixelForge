import { FileMeta } from "../types";
import { SUPPORTED_INPUT_TYPES } from "../constants/formats";

/**
 * Creates an HTMLImageElement from an image URL.
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.setAttribute("crossOrigin", "anonymous"); // avoid CORS canvas stains
    image.src = url;
  });

/**
 * Validates if a file is a supported image and within size limits.
 */
export function validateImage(file: File, maxSizeMB: number = 50): { valid: boolean; error?: string } {
  if (!SUPPORTED_INPUT_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported format (${file.type}). Please upload JPG, PNG, WEBP, AVIF, BMP, GIF, SVG, or ICO.`,
    };
  }

  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File is too large (${formatBytes(file.size)}). Max allowed size is ${maxSizeMB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Extracts metadata (width, height, orientation) from a File object.
 */
export function getFileMetadata(file: File): Promise<FileMeta> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    img.onload = () => {
      resolve({
        name: file.name,
        size: file.size,
        type: file.type,
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
        url: url,
      });
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image metadata. The file may be corrupted."));
    };
  });
}

/**
 * Formats bytes into a human-readable string (KB, MB).
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
