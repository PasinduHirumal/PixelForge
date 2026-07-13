"use client";

import React from "react";
import {
  RotateCcw,
  Undo2,
  Redo2,
  FlipHorizontal,
  FlipVertical,
  Lock,
  Unlock,
  RotateCw,
  Maximize2,
  Scissors
} from "lucide-react";
import Slider from "../shared/Slider";
import Select from "../shared/Select";
import Button from "../shared/Button";
import { ASPECT_RATIOS } from "../../constants/ratios";
import { AspectRatioPreset } from "../../types";
import { cn } from "../../lib/utils";

interface CropControlsProps {
  zoom: number;
  setZoom: (z: number) => void;
  commitZoom: (z: number) => void;
  rotation: number;
  setRotation: (r: number) => void;
  commitRotation: (r: number) => void;
  aspect: AspectRatioPreset;
  setAspect: (a: AspectRatioPreset) => void;
  flipH: boolean;
  flipV: boolean;
  handleFlipH: () => void;
  handleFlipV: () => void;
  customWidth: number;
  customHeight: number;
  setCustomWidth: (w: number) => void;
  setCustomHeight: (h: number) => void;
  keepRatio: boolean;
  toggleKeepRatio: () => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onCropTrigger: () => void;
  loading: boolean;
}

export default function CropControls({
  zoom,
  setZoom,
  commitZoom,
  rotation,
  setRotation,
  commitRotation,
  aspect,
  setAspect,
  flipH,
  flipV,
  handleFlipH,
  handleFlipV,
  customWidth,
  customHeight,
  setCustomWidth,
  setCustomHeight,
  keepRatio,
  toggleKeepRatio,
  reset,
  undo,
  redo,
  canUndo,
  canRedo,
  onCropTrigger,
  loading,
}: CropControlsProps) {
  // Format options for our Select component
  const aspectOptions = ASPECT_RATIOS.map((r) => ({
    label: r.label,
    value: r,
    category: r.category,
  }));

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setCustomWidth(val);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setCustomHeight(val);
  };

  return (
    <div className="glass-panel p-6 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/40 flex flex-col gap-6 w-full shadow-lg">
      
      {/* Top Toolbar: Undo, Redo, Reset */}
      <div className="flex items-center justify-between border-zinc-200/50 border-zinc-800/50 pb-4">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
          Adjustment Tools
        </h3>
        
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Undo2 className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Redo2 className="w-4.5 h-4.5" />
          </button>
          <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />
          <button
            onClick={reset}
            title="Reset Settings"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Ratios & Masking */}
      <div className="flex flex-col gap-4">
        <Select
          label="Aspect Ratio Preset"
          options={aspectOptions}
          selectedValue={aspect}
          onChange={(newAspect) => setAspect(newAspect)}
        />
        
        {/* Dimensions Inputs */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-zinc-500 dark:text-zinc-400">
            Output Resolution (px)
          </span>
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <input
                type="number"
                min="10"
                value={customWidth || ""}
                onChange={handleWidthChange}
                className="w-full glass-input px-3.5 py-2 text-sm rounded-xl"
                placeholder="Width"
              />
              <span className="absolute right-3 top-2.5 text-[10px] font-bold text-zinc-400 select-none">
                W
              </span>
            </div>
            
            <button
              onClick={toggleKeepRatio}
              type="button"
              title={keepRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer",
                keepRatio
                  ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              {keepRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>

            <div className="relative flex-grow">
              <input
                type="number"
                min="10"
                value={customHeight || ""}
                onChange={handleHeightChange}
                className="w-full glass-input px-3.5 py-2 text-sm rounded-xl"
                placeholder="Height"
              />
              <span className="absolute right-3 top-2.5 text-[10px] font-bold text-zinc-400 select-none">
                H
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-5 border-zinc-200/50 border-zinc-800/50 pt-5">
        
        {/* Zoom */}
        <Slider
          label="Zoom Scale"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={setZoom}
          onChangeCommitted={commitZoom}
          valueDisplay={(v) => `${Math.round(v * 100)}%`}
          iconLeft={<Maximize2 className="w-4 h-4" />}
        />

        {/* Rotation */}
        <Slider
          label="Rotate Angle"
          min={0}
          max={360}
          step={1}
          value={rotation}
          onChange={setRotation}
          onChangeCommitted={commitRotation}
          valueDisplay={(v) => `${v}°`}
          iconLeft={<RotateCw className="w-4 h-4" />}
        />

        {/* Flipping Buttons */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-zinc-500 dark:text-zinc-400">
            Flip Image
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleFlipH}
              className={cn(
                "py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer",
                flipH
                  ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
              )}
            >
              <FlipHorizontal className="w-4 h-4" />
              Horizontal
            </button>
            <button
              onClick={handleFlipV}
              className={cn(
                "py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer",
                flipV
                  ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
              )}
            >
              <FlipVertical className="w-4 h-4" />
              Vertical
            </button>
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <Button
        variant="primary"
        onClick={onCropTrigger}
        loading={loading}
        className="w-full flex items-center gap-2 mt-2 py-3 cursor-pointer"
      >
        <Scissors className="w-4 h-4" />
        Crop Image
      </Button>

    </div>
  );
}
