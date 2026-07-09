export type Theme = "light" | "dark";

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AspectRatioPreset {
  label: string;
  value: number; // width/height ratio, 0 represents free
  isCircle?: boolean;
  category: "Standard" | "Social Media" | "Print & Documents";
}

export interface FileMeta {
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  aspectRatio: number;
  url: string;
}

export interface CropState {
  zoom: number;
  rotation: number;
  aspect: AspectRatioPreset;
  cropArea: Area | null;
  croppedAreaPixels: Area | null;
  flipH: boolean;
  flipV: boolean;
  customWidth: number;
  customHeight: number;
  keepRatio: boolean;
}

export interface ConvertSettings {
  format: string;
  quality: number;
  transparentColor: "white" | "black" | "transparent";
  resizeMode: "original" | "custom";
  width: number;
  height: number;
  keepRatio: boolean;
  renameText: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}
