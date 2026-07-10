import { getConvertedImg } from "./canvas";
import { OUTPUT_FORMATS } from "../constants/formats";

/**
 * Converts an image source into a target output format Blob, applying quality and dimension resizing.
 */
export async function convertImage(
  imageSrc: string,
  targetFormatValue: string, // e.g. 'webp', 'jpg', 'avif'
  quality: number, // 0.1 to 1.0
  transparentColor: "white" | "black" | "transparent" = "transparent",
  resize?: { width: number; height: number }
): Promise<Blob> {
  const matchedFormat = OUTPUT_FORMATS.find(
    (f) => f.value.toLowerCase() === targetFormatValue.toLowerCase()
  );
  
  const mimeType = matchedFormat ? matchedFormat.mimeType : "image/png";
  
  return getConvertedImg(
    imageSrc,
    mimeType,
    quality,
    transparentColor,
    resize
  );
}
