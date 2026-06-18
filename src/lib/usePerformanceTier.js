"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 860;
const FRAME_SAMPLE_COUNT = 18;
const LOW_PERF_AVERAGE_FRAME_MS = 24;
const LOW_PERF_WORST_FRAME_MS = 40;

function getInitialTier() {
  if (typeof window === "undefined") {
    return "default";
  }

  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isMobileViewport = window.innerWidth <= MOBILE_BREAKPOINT;

  if (isCoarsePointer || isMobileViewport) {
    return "mobile";
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const logicalCores = navigator.hardwareConcurrency || 0;
  const deviceMemory = navigator.deviceMemory || 0;

  if (
    prefersReducedMotion ||
    (logicalCores > 0 && logicalCores <= 4) ||
    (deviceMemory > 0 && deviceMemory <= 4)
  ) {
    return "low";
  }

  return "default";
}

export function getPerformanceFlags(tier) {
  const isMobile = tier === "mobile";
  const isLowPerf = tier === "low" || isMobile;

  return {
    isLowPerf,
    isMobile,
    allowCursorSqueeze: !isLowPerf,
    allowInteractiveFaceScene: !isMobile,
  };
}

export default function usePerformanceTier() {
  const [tier, setTier] = useState(getInitialTier);

  useEffect(() => {
    let cancelled = false;

    const updateTier = () => {
      const nextTier = getInitialTier();
      setTier((currentTier) => {
        if (currentTier === "mobile" && nextTier !== "mobile") {
          return nextTier;
        }

        return nextTier;
      });
    };

    updateTier();

    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleTierChange = () => {
      updateTier();
    };

    coarsePointerQuery.addEventListener("change", handleTierChange);
    reducedMotionQuery.addEventListener("change", handleTierChange);
    window.addEventListener("resize", handleTierChange);

    const baselineTier = getInitialTier();

    if (baselineTier === "default") {
      const frameDurations = [];
      let frameHandle = 0;
      let previousTimestamp = 0;

      const sampleFrames = (timestamp) => {
        if (cancelled) {
          return;
        }

        if (previousTimestamp !== 0) {
          frameDurations.push(timestamp - previousTimestamp);
        }

        previousTimestamp = timestamp;

        if (frameDurations.length < FRAME_SAMPLE_COUNT) {
          frameHandle = window.requestAnimationFrame(sampleFrames);
          return;
        }

        const totalFrameTime = frameDurations.reduce((sum, duration) => sum + duration, 0);
        const averageFrameTime = totalFrameTime / frameDurations.length;
        const worstFrameTime = Math.max(...frameDurations);

        if (
          averageFrameTime >= LOW_PERF_AVERAGE_FRAME_MS ||
          worstFrameTime >= LOW_PERF_WORST_FRAME_MS
        ) {
          setTier((currentTier) => (currentTier === "mobile" ? currentTier : "low"));
        }
      };

      frameHandle = window.requestAnimationFrame(sampleFrames);

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frameHandle);
        coarsePointerQuery.removeEventListener("change", handleTierChange);
        reducedMotionQuery.removeEventListener("change", handleTierChange);
        window.removeEventListener("resize", handleTierChange);
      };
    }

    return () => {
      cancelled = true;
      coarsePointerQuery.removeEventListener("change", handleTierChange);
      reducedMotionQuery.removeEventListener("change", handleTierChange);
      window.removeEventListener("resize", handleTierChange);
    };
  }, []);

  return {
    tier,
    ...getPerformanceFlags(tier),
  };
}
