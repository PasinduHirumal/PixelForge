export interface OutputFormat {
  label: string;
  value: string; // extension e.g., 'png'
  mimeType: string; // e.g., 'image/png'
  description: string;
}

export const SUPPORTED_INPUT_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/bmp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
  "image/x-icon",
];

export const OUTPUT_FORMATS: OutputFormat[] = [
  { label: "PNG", value: "png", mimeType: "image/png", description: "Lossless compression, supports transparency." },
  { label: "JPEG / JPG", value: "jpg", mimeType: "image/jpeg", description: "Standard photo format, adjustable quality." },
  { label: "WebP", value: "webp", mimeType: "image/webp", description: "Modern format with excellent compression and quality." },
  { label: "AVIF", value: "avif", mimeType: "image/avif", description: "Next-gen AV1 compression, superior detail at small sizes." },
  { label: "SVG", value: "svg", mimeType: "image/svg+xml", description: "Scalable Vector Graphics. Uses raster wrapping inside vector viewport." },
  { label: "BMP", value: "bmp", mimeType: "image/bmp", description: "Raw bitmap format, uncompressed lossless image." },
  { label: "ICO", value: "ico", mimeType: "image/x-icon", description: "Windows icon file, standard 16x16, 32x32, or 256x256." },
  { label: "GIF (Static)", value: "gif", mimeType: "image/gif", description: "Static single-frame Graphics Interchange Format." },
];
