"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import HeroWordmark from "@/features/hero/components/HeroWordmark";
import LoaderOverlay from "@/features/loader/LoaderOverlay";

const FractureStage = dynamic(
  () => import("@/features/face-scene/components/FractureStage"),
  { ssr: false },
);

export default function HeroScene({ eyebrow, title }) {
  const [isModelReady, setIsModelReady] = useState(false);
  const handleModelReady = useCallback(() => {
    setIsModelReady(true);
  }, []);

  return (
    <>
      <FractureStage isVisible={isModelReady} onModelReady={handleModelReady} />
      <HeroWordmark eyebrow={eyebrow} isReady={isModelReady} title={title} />
      <LoaderOverlay isVisible={!isModelReady} />
    </>
  );
}
