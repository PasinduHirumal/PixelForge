"use client";

import React from "react";
import Cropper from "react-easy-crop";
import { FileMeta, AspectRatioPreset, Area } from "../../types";
import { cn } from "../../lib/utils";

interface CropWorkspaceProps {
  image: FileMeta;
  crop: { x: number; y: number };
  setCrop: (c: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (z: number) => void;
  rotation: number;
  aspect: AspectRatioPreset;
  flipH: boolean;
  flipV: boolean;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

export default function CropWorkspace({
  image,
  crop,
  setCrop,
  zoom,
  setZoom,
  rotation,
  aspect,
  flipH,
  flipV,
  onCropComplete,
}: CropWorkspaceProps) {
  // Determine aspect ratio value for react-easy-crop
  // If free crop (0), react-easy-crop will let user crop any size. But wait!
  // In react-easy-crop, if aspect is undefined/null/0, it allows free cropping if
  // you configure it correctly, or we can pass undefined.
  const cropAspect = aspect.value === 0 ? undefined : aspect.value;

  return (
    <div className="glass-panel relative flex flex-col flex-grow min-h-[400px] md:min-h-[500px] bg-zinc-950/40 border border-zinc-800/40 rounded-3xl shadow-inner overflow-hidden">
      
      {/* Aspect Ratio Badge indicator */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className="bg-zinc-900/90 backdrop-blur border border-zinc-800/50 font-bold text-zinc-500 text-zinc-400 px-3 py-1 rounded-full shadow-sm">
          Preset: {aspect.label}
        </span>
        <span className="bg-zinc-900/90 backdrop-blur border border-zinc-800/50 font-bold text-zinc-500 text-zinc-400 px-3 py-1 rounded-full shadow-sm">
          Src: {image.width} × {image.height} px
        </span>
      </div>

      {/* Main Cropper Container */}
      <div className="relative w-full h-[400px] md:h-full flex-grow">
        <Cropper
          image={image.url}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={cropAspect}
          cropShape={aspect.isCircle ? "round" : "rect"}
          showGrid={true}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          transform={
            // react-easy-crop supports custom transform overrides for flips
            `translate(${crop.x}px, ${crop.y}px) rotate(${rotation}deg) scale(${
              flipH ? -1 : 1
            }, ${flipV ? -1 : 1})`
          }
          classes={{
            containerClassName: "react-easy-crop_Container",
            cropAreaClassName: cn(
              "react-easy-crop_CropArea",
              aspect.isCircle && "react-easy-crop_CropAreaRound"
            ),
          }}
        />
      </div>

      {/* Guide details */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-zinc-900/80 backdrop-blur border border-zinc-800/50 text-[10px] font-semibold text-zinc-400 px-4 py-1.5 rounded-full shadow-lg">
        Drag image to position • Pinch/Scroll to zoom
      </div>

    </div>
  );
}
