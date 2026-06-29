"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

import { DEFAULT_SCENE_SETTINGS } from "@/features/face-scene/constants";
import LoaderOverlay from "@/features/loader/LoaderOverlay";
import SvgCurveTransition from "@/features/page-transition/SvgCurveTransition";
import usePerformanceTier from "@/lib/usePerformanceTier";
import DebugGui from "@/utils/DebugGui";

const FractureStage = dynamic(
  () => import("@/features/face-scene/components/FractureStage"),
  { ssr: false },
);

let hasLoadedFaceScene = false;
const INTRO_TRANSITION_DURATION = 920;

export default function HeroScene() {
  const [isModelReady, setIsModelReady] = useState(hasLoadedFaceScene);
  const [settings, setSettings] = useState(DEFAULT_SCENE_SETTINGS);
  const [loadProgress, setLoadProgress] = useState({ value: 0, errors: [] });
  const { allowInteractiveFaceScene, isLowPerf } = usePerformanceTier();

  const handleProgress = useCallback((progress, errors) => {
    setLoadProgress({ value: progress, errors });
  }, []);
  const [introTransition, setIntroTransition] = useState({
    isActive: false,
    playKey: 0,
  });
  const introTransitionTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (introTransitionTimeoutRef.current) {
        window.clearTimeout(introTransitionTimeoutRef.current);
      }
    };
  }, []);

  const handleModelReady = useCallback(() => {
    const wasLoaded = hasLoadedFaceScene;
    hasLoadedFaceScene = true;
    setIsModelReady(true);

    if (!wasLoaded) {
      setIntroTransition((current) => ({
        isActive: true,
        playKey: current.playKey + 1,
      }));

      if (introTransitionTimeoutRef.current) {
        window.clearTimeout(introTransitionTimeoutRef.current);
      }

      introTransitionTimeoutRef.current = window.setTimeout(() => {
        setIntroTransition((current) => ({
          ...current,
          isActive: false,
        }));
      }, INTRO_TRANSITION_DURATION);
    }
  }, []);

  return (
    <>
      {process.env.NODE_ENV !== "production" ? <DebugGui onChange={setSettings} /> : null}
      <FractureStage
        isVisible={isModelReady}
        interactionEnabled={allowInteractiveFaceScene}
        isLowPerf={isLowPerf}
        onModelReady={handleModelReady}
        onProgress={handleProgress}
        settings={settings}
      />
      <LoaderOverlay
        isVisible={!isModelReady}
        progress={loadProgress.value}
        errors={loadProgress.errors}
      />
      <SvgCurveTransition
        isActive={introTransition.isActive}
        playKey={introTransition.playKey}
      />
    </>
  );
}
