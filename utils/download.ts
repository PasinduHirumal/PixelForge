import { saveAs } from "file-saver";

/**
 * Downloads a binary Blob in the browser with the specified filename.
 * Falls back to native anchor link click if FileSaver fails.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  try {
    saveAs(blob, filename);
  } catch (error) {
    console.warn("FileSaver failed, falling back to native link download", error);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
