import { createImage } from "./image";

interface FlipState {
  horizontal: boolean;
  vertical: boolean;
}

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Returns a crop helper using Canvas API, taking care of rotation and flipping.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation = 0,
  flip: FlipState = { horizontal: false, vertical: false },
  isCircle = false,
  targetSize?: { width: number; height: number }
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const rotRad = (rotation * Math.PI) / 180;

  // Calculate bounding box of the rotated image to size our canvas correctly
  const { width: bWidth, height: bHeight } = rotateSize(
    image.naturalWidth,
    image.naturalHeight,
    rotation
  );

  // Set canvas size to the bounding box of the rotated image
  canvas.width = bWidth;
  canvas.height = bHeight;

  // Translate canvas context to center, perform flip & rotate, and draw image centered
  ctx.translate(bWidth / 2, bHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

  // Now create a second canvas representing the crop window
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("No 2d context for cropped canvas");
  }

  // Set the output size (either custom resize size or the pixel crop size)
  const outputWidth = targetSize?.width || pixelCrop.width;
  const outputHeight = targetSize?.height || pixelCrop.height;

  croppedCanvas.width = outputWidth;
  croppedCanvas.height = outputHeight;

  // If circular crop, apply clipping mask before drawing the cropped area
  if (isCircle) {
    croppedCtx.beginPath();
    croppedCtx.arc(
      outputWidth / 2,
      outputHeight / 2,
      Math.min(outputWidth, outputHeight) / 2,
      0,
      2 * Math.PI
    );
    croppedCtx.clip();
  }

  // Draw the cropped section from the rotated canvas onto the cropped canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  // Return the cropped image as a Blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      },
      "image/png", // temporarily export as PNG to maintain transparency for editor, convert on download
      1
    );
  });
}

/**
 * Rotates and converts image formats, handles transparency filling and custom resizing.
 */
export async function getConvertedImg(
  imageSrc: string,
  targetMimeType: string,
  quality = 0.9,
  transparentColor: "white" | "black" | "transparent" = "transparent",
  resize?: { width: number; height: number }
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas size (original or resized)
  const outputWidth = resize?.width || image.naturalWidth;
  const outputHeight = resize?.height || image.naturalHeight;

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  // Handle transparency fill for formats that don't support alpha (like JPEG/JPG)
  const supportsAlpha = targetMimeType === "image/png" || targetMimeType === "image/webp" || targetMimeType === "image/gif";
  if (!supportsAlpha || transparentColor !== "transparent") {
    ctx.fillStyle = transparentColor === "black" ? "#000000" : "#FFFFFF";
    ctx.fillRect(0, 0, outputWidth, outputHeight);
  }

  // Draw image
  ctx.drawImage(image, 0, 0, outputWidth, outputHeight);

  // Export to Blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to convert image."));
          return;
        }
        resolve(blob);
      },
      targetMimeType,
      quality
    );
  });
}

/**
 * Calculates the bounding box size of an image when rotated by rotation degrees.
 */
function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}
