import { useState, useCallback, useEffect } from "react";
import { CropState, AspectRatioPreset, Area } from "../types";
import { ASPECT_RATIOS } from "../constants/ratios";

const INITIAL_STATE: CropState = {
  zoom: 1,
  rotation: 0,
  aspect: ASPECT_RATIOS[0], // Free Crop
  cropArea: null,
  croppedAreaPixels: null,
  flipH: false,
  flipV: false,
  customWidth: 800,
  customHeight: 600,
  keepRatio: true,
};

export function useCrop(imageWidth?: number, imageHeight?: number) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(INITIAL_STATE.zoom);
  const [rotation, setRotation] = useState(INITIAL_STATE.rotation);
  const [aspect, setAspect] = useState<AspectRatioPreset>(INITIAL_STATE.aspect);
  const [flipH, setFlipH] = useState(INITIAL_STATE.flipH);
  const [flipV, setFlipV] = useState(INITIAL_STATE.flipV);
  const [customWidth, setCustomWidth] = useState(INITIAL_STATE.customWidth);
  const [customHeight, setCustomHeight] = useState(INITIAL_STATE.customHeight);
  const [keepRatio, setKeepRatio] = useState(INITIAL_STATE.keepRatio);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropState["croppedAreaPixels"]>(null);

  // Undo/Redo Stacks
  const [history, setHistory] = useState<Omit<CropState, "cropArea" | "croppedAreaPixels">[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize custom dimensions when image sizes change
  useEffect(() => {
    if (imageWidth && imageHeight) {
      const defaultState = {
        zoom: INITIAL_STATE.zoom,
        rotation: INITIAL_STATE.rotation,
        aspect: INITIAL_STATE.aspect,
        flipH: INITIAL_STATE.flipH,
        flipV: INITIAL_STATE.flipV,
        customWidth: imageWidth,
        customHeight: imageHeight,
        keepRatio: INITIAL_STATE.keepRatio,
      };

      Promise.resolve().then(() => {
        setCustomWidth(imageWidth);
        setCustomHeight(imageHeight);
        setHistory([defaultState]);
        setHistoryIndex(0);
      });
    }
  }, [imageWidth, imageHeight]);

  const saveHistoryState = useCallback((newState: Omit<CropState, "cropArea" | "croppedAreaPixels">) => {
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      // Avoid duplicate states
      const last = updated[updated.length - 1];
      if (
        last &&
        last.zoom === newState.zoom &&
        last.rotation === newState.rotation &&
        last.aspect.value === newState.aspect.value &&
        last.aspect.isCircle === newState.aspect.isCircle &&
        last.flipH === newState.flipH &&
        last.flipV === newState.flipV &&
        last.customWidth === newState.customWidth &&
        last.customHeight === newState.customHeight &&
        last.keepRatio === newState.keepRatio
      ) {
        return prev;
      }
      const nextHistory = [...updated, newState];
      setHistoryIndex(nextHistory.length - 1);
      return nextHistory;
    });
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const state = history[prevIndex];
      setHistoryIndex(prevIndex);
      
      setZoom(state.zoom);
      setRotation(state.rotation);
      setAspect(state.aspect);
      setFlipH(state.flipH);
      setFlipV(state.flipV);
      setCustomWidth(state.customWidth);
      setCustomHeight(state.customHeight);
      setKeepRatio(state.keepRatio);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const state = history[nextIndex];
      setHistoryIndex(nextIndex);
      
      setZoom(state.zoom);
      setRotation(state.rotation);
      setAspect(state.aspect);
      setFlipH(state.flipH);
      setFlipV(state.flipV);
      setCustomWidth(state.customWidth);
      setCustomHeight(state.customHeight);
      setKeepRatio(state.keepRatio);
    }
  }, [history, historyIndex]);

  const reset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(INITIAL_STATE.zoom);
    setRotation(INITIAL_STATE.rotation);
    setAspect(INITIAL_STATE.aspect);
    setFlipH(INITIAL_STATE.flipH);
    setFlipV(INITIAL_STATE.flipV);
    if (imageWidth && imageHeight) {
      setCustomWidth(imageWidth);
      setCustomHeight(imageHeight);
    }
    setKeepRatio(INITIAL_STATE.keepRatio);

    const resetState = {
      zoom: INITIAL_STATE.zoom,
      rotation: INITIAL_STATE.rotation,
      aspect: INITIAL_STATE.aspect,
      flipH: INITIAL_STATE.flipH,
      flipV: INITIAL_STATE.flipV,
      customWidth: imageWidth || INITIAL_STATE.customWidth,
      customHeight: imageHeight || INITIAL_STATE.customHeight,
      keepRatio: INITIAL_STATE.keepRatio,
    };
    saveHistoryState(resetState);
  }, [imageWidth, imageHeight, saveHistoryState]);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleZoomChangeCommitted = useCallback((newZoom: number) => {
    saveHistoryState({
      zoom: newZoom,
      rotation,
      aspect,
      flipH,
      flipV,
      customWidth,
      customHeight,
      keepRatio,
    });
  }, [rotation, aspect, flipH, flipV, customWidth, customHeight, keepRatio, saveHistoryState]);

  const handleRotationChange = useCallback((newRotation: number) => {
    setRotation(newRotation);
  }, []);

  const handleRotationChangeCommitted = useCallback((newRotation: number) => {
    saveHistoryState({
      zoom,
      rotation: newRotation,
      aspect,
      flipH,
      flipV,
      customWidth,
      customHeight,
      keepRatio,
    });
  }, [zoom, aspect, flipH, flipV, customWidth, customHeight, keepRatio, saveHistoryState]);

  const handleFlipH = useCallback(() => {
    const nextVal = !flipH;
    setFlipH(nextVal);
    saveHistoryState({
      zoom,
      rotation,
      aspect,
      flipH: nextVal,
      flipV,
      customWidth,
      customHeight,
      keepRatio,
    });
  }, [zoom, rotation, aspect, flipH, flipV, customWidth, customHeight, keepRatio, saveHistoryState]);

  const handleFlipV = useCallback(() => {
    const nextVal = !flipV;
    setFlipV(nextVal);
    saveHistoryState({
      zoom,
      rotation,
      aspect,
      flipH,
      flipV: nextVal,
      customWidth,
      customHeight,
      keepRatio,
    });
  }, [zoom, rotation, aspect, flipH, flipV, customWidth, customHeight, keepRatio, saveHistoryState]);

  const handleAspectChange = useCallback((newAspect: AspectRatioPreset) => {
    setAspect(newAspect);
    
    // Auto-adjust custom sizes if aspect ratio changes and there's a reference width
    const nextWidth = customWidth;
    let nextHeight = customHeight;

    if (newAspect.value > 0) {
      if (keepRatio) {
        nextHeight = Math.round(customWidth / newAspect.value);
      }
    }

    setCustomWidth(nextWidth);
    setCustomHeight(nextHeight);

    saveHistoryState({
      zoom,
      rotation,
      aspect: newAspect,
      flipH,
      flipV,
      customWidth: nextWidth,
      customHeight: nextHeight,
      keepRatio,
    });
  }, [zoom, rotation, flipH, flipV, customWidth, customHeight, keepRatio, saveHistoryState]);

  const handleCustomWidthChange = useCallback((w: number) => {
    setCustomWidth(w);
    let h = customHeight;
    if (keepRatio) {
      if (aspect.value > 0) {
        h = Math.round(w / aspect.value);
      } else if (imageWidth && imageHeight) {
        h = Math.round(w / (imageWidth / imageHeight));
      }
      setCustomHeight(h);
    }
    saveHistoryState({
      zoom,
      rotation,
      aspect,
      flipH,
      flipV,
      customWidth: w,
      customHeight: h,
      keepRatio,
    });
  }, [zoom, rotation, aspect, flipH, flipV, customHeight, keepRatio, imageWidth, imageHeight, saveHistoryState]);

  const handleCustomHeightChange = useCallback((h: number) => {
    setCustomHeight(h);
    let w = customWidth;
    if (keepRatio) {
      if (aspect.value > 0) {
        w = Math.round(h * aspect.value);
      } else if (imageWidth && imageHeight) {
        w = Math.round(h * (imageWidth / imageHeight));
      }
      setCustomWidth(w);
    }
    saveHistoryState({
      zoom,
      rotation,
      aspect,
      flipH,
      flipV,
      customWidth: w,
      customHeight: h,
      keepRatio,
    });
  }, [zoom, rotation, aspect, flipH, flipV, customWidth, keepRatio, imageWidth, imageHeight, saveHistoryState]);

  const handleKeepRatioToggle = useCallback(() => {
    const nextVal = !keepRatio;
    setKeepRatio(nextVal);
    saveHistoryState({
      zoom,
      rotation,
      aspect,
      flipH,
      flipV,
      customWidth,
      customHeight,
      keepRatio: nextVal,
    });
  }, [zoom, rotation, aspect, flipH, flipV, customWidth, customHeight, keepRatio, saveHistoryState]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  return {
    crop,
    setCrop,
    zoom,
    setZoom: handleZoomChange,
    commitZoom: handleZoomChangeCommitted,
    rotation,
    setRotation: handleRotationChange,
    commitRotation: handleRotationChangeCommitted,
    aspect,
    setAspect: handleAspectChange,
    flipH,
    flipV,
    handleFlipH,
    handleFlipV,
    customWidth,
    customHeight,
    setCustomWidth: handleCustomWidthChange,
    setCustomHeight: handleCustomHeightChange,
    keepRatio,
    toggleKeepRatio: handleKeepRatioToggle,
    croppedAreaPixels,
    onCropComplete,
    reset,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
}


