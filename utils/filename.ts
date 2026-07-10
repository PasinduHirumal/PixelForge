/**
 * Removes the extension from a filename.
 * e.g., "my-photo.png" -> "my-photo"
 */
export function getFilenameWithoutExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return filename;
  return filename.substring(0, lastDotIndex);
}

/**
 * Returns the extension of a filename (lowercase).
 * e.g., "my-photo.PNG" -> "png"
 */
export function getFilenameExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return "";
  return filename.substring(lastDotIndex + 1).toLowerCase();
}

/**
 * Cleans a filename by replacing spaces and unsafe characters.
 */
export function sanitizeFilename(filename: string): string {
  const name = getFilenameWithoutExtension(filename);
  const cleanName = name
    .replace(/[^a-zA-Z0-9-_ ]/g, "") // Keep alphanumeric, dashes, underscores, and spaces
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .trim();
  
  return cleanName || "image";
}

/**
 * Builds a formatted filename with suffixes and target extension.
 * e.g., "photo", "cropped", "webp" -> "photo-cropped.webp"
 */
export function formatFilenameWithSuffix(
  filename: string,
  suffix: string,
  targetExt: string
): string {
  const cleanName = sanitizeFilename(filename);
  const cleanSuffix = suffix ? `-${suffix}` : "";
  const extension = targetExt.startsWith(".") ? targetExt : `.${targetExt}`;
  return `${cleanName}${cleanSuffix}${extension}`;
}
