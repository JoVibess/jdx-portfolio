"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { LOADER_PREVIEW_SETTINGS } from "./constants";

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

// Fake progress goes from 0 to 90 over this duration (ms).
// If loading finishes before, we snap to 100. If it takes longer, we wait at 90.
const FAKE_DURATION_MS = 7000;

export default function LoaderOverlay({ isVisible, progress = 0, errors = [] }) {
  const [portalRoot, setPortalRoot] = useState(null);
  const [previewRun, setPreviewRun] = useState(0);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const isPreview = LOADER_PREVIEW_SETTINGS.enabled;
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (isVisible) return undefined;
    const timer = setTimeout(() => setIsMounted(false), 700);
    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setPortalRoot(document.body);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Smooth fake progress: linear 0→90 over FAKE_DURATION_MS,
  // snaps to real progress if it's ahead, never exceeds 99 while loading.
  useEffect(() => {
    if (isPreview || !isVisible) return undefined;

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const elapsed = now - startedAt;
      const fakeRatio = Math.min(1, elapsed / FAKE_DURATION_MS);
      const fakeProgress = fakeRatio * 90;
      const realProgress = Math.min(99, Math.max(0, Number.isFinite(progressRef.current) ? progressRef.current : 0));

      setDisplayedProgress(Math.round(Math.max(fakeProgress, realProgress)));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPreview, isVisible]);

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

  const progressValue = isPreview
    ? previewProgress
    : isVisible
      ? Math.round(displayedProgress)
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
