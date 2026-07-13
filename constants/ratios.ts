import { AspectRatioPreset } from "../types";

export const ASPECT_RATIOS: AspectRatioPreset[] = [
  // Standard Ratios
  { label: "Free Crop", value: 0, category: "Standard" },
  { label: "Square (1:1)", value: 1, category: "Standard" },
  { label: "Circle (1:1)", value: 1, isCircle: true, category: "Standard" },
  { label: "Landscape (16:9)", value: 16 / 9, category: "Standard" },
  { label: "Portrait (9:16)", value: 9 / 16, category: "Standard" },
  { label: "Photo (3:2)", value: 3 / 2, category: "Standard" },
  { label: "Classic (4:3)", value: 4 / 3, category: "Standard" },
  { label: "Artistic (5:4)", value: 5 / 4, category: "Standard" },

  // Social Media Presets
  { label: "Instagram Post (1:1)", value: 1, category: "Social Media" },
  { label: "Instagram Portrait (4:5)", value: 4 / 5, category: "Social Media" },
  { label: "Instagram Story (9:16)", value: 9 / 16, category: "Social Media" },
  { label: "YouTube Thumbnail (16:9)", value: 16 / 9, category: "Social Media" },
  { label: "Facebook Cover (820:312)", value: 820 / 312, category: "Social Media" },
  { label: "Twitter Header (3:1)", value: 3, category: "Social Media" },
  { label: "LinkedIn Banner (4:1)", value: 4, category: "Social Media" },

  // Print & Document Presets
  { label: "A4 Paper (1:1.414)", value: 1 / 1.414, category: "Print & Documents" },
  { label: "Passport (3.5:4.5)", value: 3.5 / 4.5, category: "Print & Documents" },
];
