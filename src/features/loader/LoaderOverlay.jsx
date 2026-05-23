"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { LOADER_PREVIEW_SETTINGS } from "./constants";

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

export default function LoaderOverlay({ isVisible }) {
  const { errors, progress } = useProgress();
  const [portalRoot, setPortalRoot] = useState(null);
  const [previewRun, setPreviewRun] = useState(0);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const isPreview = LOADER_PREVIEW_SETTINGS.enabled;

  useEffect(() => {
    if (isVisible) return undefined;
    const timer = setTimeout(() => setIsMounted(false), 700);
    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setPortalRoot(document.body);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!isPreview) {
      return undefined;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const elapsed = now - startedAt;
      const progressRatio = Math.min(1, elapsed / LOADER_PREVIEW_SETTINGS.durationMs);

      setPreviewProgress(Math.round(easeOutCubic(progressRatio) * 100));

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isPreview, previewRun]);

  if (!isMounted && !isPreview) {
    return null;
  }

  const safeProgress = Number.isFinite(progress) ? progress : 0;
  const progressValue = isPreview
    ? previewProgress
    : isVisible
      ? Math.min(99, Math.max(0, Math.round(safeProgress)))
      : 100;
  const hasError = !isPreview && errors.length > 0;

  const overlay = (
    <div
      className={`loader-overlay${!isVisible ? " loader-overlay--hiding" : ""}${isPreview ? " loader-overlay--preview" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="loader-overlay__content">
        <span className="loader-overlay__label">
          {hasError ? "Erreur de chargement" : "Chargement"}
        </span>
        <span className="loader-overlay__progress">
          {hasError ? "!" : `${progressValue}%`}
        </span>
      </div>
      {isPreview ? (
        <button
          className="loader-overlay__replay"
          type="button"
          onClick={() => {
            setPreviewProgress(0);
            setPreviewRun((currentRun) => currentRun + 1);
          }}
        >
          Relancer
        </button>
      ) : null}
    </div>
  );

  return portalRoot ? createPortal(overlay, portalRoot) : overlay;
}
