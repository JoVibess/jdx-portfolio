"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { DEFAULT_SCENE_SETTINGS } from "@/features/face-scene/constants";
import LoaderOverlay from "@/features/loader/LoaderOverlay";
import DebugGui from "@/utils/DebugGui";

const FractureStage = dynamic(
  () => import("@/features/face-scene/components/FractureStage"),
  { ssr: false },
);

let hasLoadedFaceScene = false;

export default function HeroScene() {
  const [isModelReady, setIsModelReady] = useState(hasLoadedFaceScene);
  const [settings, setSettings] = useState(DEFAULT_SCENE_SETTINGS);
  const handleModelReady = useCallback(() => {
    hasLoadedFaceScene = true;
    setIsModelReady(true);
  }, []);

  return (
    <>
      <DebugGui onChange={setSettings} />
      <FractureStage
        isVisible={isModelReady}
        onModelReady={handleModelReady}
        settings={settings}
      />
      <LoaderOverlay isVisible={!isModelReady} />
    </>
  );
}
