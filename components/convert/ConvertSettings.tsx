"use client";

import React from "react";
import { RefreshCw, Scissors, ChevronRight, Lock, Unlock, Image as ImageIcon } from "lucide-react";
import Slider from "../shared/Slider";
import Select from "../shared/Select";
import Button from "../shared/Button";
import { OUTPUT_FORMATS } from "../../constants/formats";
import { ConvertSettings as SettingsType, FileMeta } from "../../types";
import { formatBytes } from "../../utils/image";
import { cn } from "../../lib/utils";

interface ConvertSettingsProps {
  inputImage: FileMeta;
  settings: SettingsType;
  updateSetting: <K extends keyof SettingsType>(key: K, value: SettingsType[K]) => void;
  onConvert: () => void;
  loading: boolean;
  canConvert: boolean;
}

export default function ConvertSettings({
  inputImage,
  settings,
  updateSetting,
  onConvert,
  loading,
  canConvert,
}: ConvertSettingsProps) {
  // Format options for Select dropdown
  const formatOptions = OUTPUT_FORMATS.map((f) => ({
    label: `${f.label} (.${f.value})`,
    value: f.value,
  }));

  const inputExt = inputImage.name.split(".").pop()?.toLowerCase();
  const showQualitySlider = ["jpg", "webp", "avif"].includes(settings.format);
  const showAlphaSettings = ["jpg", "bmp"].includes(settings.format) || (settings.format === "gif");

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting("width", parseInt(e.target.value) || 0);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting("height", parseInt(e.target.value) || 0);
  };

  return (
    <div className="glass-panel p-6 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/40 flex flex-col gap-6 w-full shadow-lg">
      
      {/* File Info */}
      <div className="flex flex-col gap-3 pb-4 border-zinc-200/50 border-zinc-800/50">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
          Source File Metadata
        </h3>
        <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/40 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800/30">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">
              {inputImage.name}
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              {inputExt?.toUpperCase()} • {formatBytes(inputImage.size)} • {inputImage.width}x{inputImage.height}px
            </p>
          </div>
        </div>
      </div>

      {/* Target Format */}
      <div className="flex flex-col gap-4">
        <Select
          label="Output Format Target"
          options={formatOptions}
          selectedValue={settings.format}
          onChange={(newFormat) => updateSetting("format", newFormat)}
        />
        
        {/* Filename Rename */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-zinc-500 dark:text-zinc-400">
            Output Filename
          </label>
          <input
            type="text"
            value={settings.renameText}
            onChange={(e) => updateSetting("renameText", e.target.value)}
            className="w-full glass-input px-3.5 py-2.5 text-sm rounded-2xl"
            placeholder="Rename file"
          />
        </div>
      </div>

      {/* Quality Settings */}
      {showQualitySlider && (
        <Slider
          label="Compression Quality"
          min={0.1}
          max={1.0}
          step={0.05}
          value={settings.quality}
          onChange={(q) => updateSetting("quality", q)}
          valueDisplay={(v) => `${Math.round(v * 100)}%`}
        />
      )}

      {/* Transparency / Background Handling */}
      {showAlphaSettings && (
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-zinc-500 dark:text-zinc-400">
            Fill Transparency background
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => updateSetting("transparentColor", "white")}
              className={cn(
                "py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer",
                settings.transparentColor === "white"
                  ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
              )}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-white border border-zinc-300" />
              White Fill
            </button>
            <button
              onClick={() => updateSetting("transparentColor", "black")}
              className={cn(
                "py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer",
                settings.transparentColor === "black"
                  ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
              )}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-700" />
              Black Fill
            </button>
          </div>
        </div>
      )}

      {/* Image Size customization */}
      <div className="flex flex-col gap-3.5 border-zinc-200/50 border-zinc-800/50 pt-5">
        <span className="font-semibold text-zinc-500 dark:text-zinc-400">
          Output Resolution Scaling
        </span>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateSetting("resizeMode", "original")}
            className={cn(
              "py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
              settings.resizeMode === "original"
                ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
            )}
          >
            Original Dimensions
          </button>
          <button
            onClick={() => updateSetting("resizeMode", "custom")}
            className={cn(
              "py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
              settings.resizeMode === "custom"
                ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
            )}
          >
            Resize Scaling
          </button>
        </div>

        {settings.resizeMode === "custom" && (
          <div className="flex items-center gap-3 mt-1.5">
            <div className="relative flex-grow">
              <input
                type="number"
                min="10"
                value={settings.width || ""}
                onChange={handleWidthChange}
                className="w-full glass-input px-3 py-2 text-xs rounded-xl"
                placeholder="Width"
              />
              <span className="absolute right-2.5 top-2.5 text-[9px] font-bold text-zinc-400 select-none">
                W
              </span>
            </div>
            
            <button
              onClick={() => updateSetting("keepRatio", !settings.keepRatio)}
              type="button"
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center border transition-all cursor-pointer",
                settings.keepRatio
                  ? "text-primary border-indigo-100 bg-indigo-50/50 dark:border-indigo-950/30 dark:bg-indigo-950/20"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              {settings.keepRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>

            <div className="relative flex-grow">
              <input
                type="number"
                min="10"
                value={settings.height || ""}
                onChange={handleHeightChange}
                className="w-full glass-input px-3 py-2 text-xs rounded-xl"
                placeholder="Height"
              />
              <span className="absolute right-2.5 top-2.5 text-[9px] font-bold text-zinc-400 select-none">
                H
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Convert button */}
      <Button
        variant="primary"
        onClick={onConvert}
        loading={loading}
        disabled={!canConvert}
        className="w-full flex items-center gap-2 mt-2 py-3.5 cursor-pointer"
      >
        <RefreshCw className={cn("w-4.5 h-4.5", loading && "animate-spin")} />
        Convert Image
      </Button>

    </div>
  );
}
