"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, Stats, useProgress } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import FaceModel from "./FaceModel";

function ProgressBridge({ onProgress }) {
  const { progress, errors } = useProgress();
  useEffect(() => {
    onProgress?.(progress, errors);
  }, [progress, errors, onProgress]);
  return null;
}

export default function FractureStage({
  isVisible = true,
  interactionEnabled = true,
  isLowPerf = false,
  onModelReady,
  onProgress,
  settings,
}) {
  const stageRef = useRef(null);
  const [headerOffsetPx, setHeaderOffsetPx] = useState(0);

  const handleModelReady = useCallback(() => {
    onModelReady?.();
  }, [onModelReady]);

  useLayoutEffect(() => {
    const stageElement = stageRef.current;
    const headerElement = stageElement
      ?.closest(".hero-section")
      ?.querySelector(".hero-section__header");

    if (!headerElement) return undefined;

    const updateHeaderOffset = () => {
      setHeaderOffsetPx(headerElement.getBoundingClientRect().height / 2);
    };

    updateHeaderOffset();

    const resizeObserver = new ResizeObserver(updateHeaderOffset);
    resizeObserver.observe(headerElement);
    window.addEventListener("resize", updateHeaderOffset);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderOffset);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="face-scene-stage"
      style={{
        cursor: interactionEnabled ? "crosshair" : "default",
        pointerEvents: isVisible ? "auto" : "none",
        touchAction: "pan-y",
      }}
    >
      <ProgressBridge onProgress={onProgress} />
      <Canvas
        camera={{ position: [0, 0, 4.85], fov: 34 }}
        dpr={isLowPerf ? [1, 1.2] : [1, 1.5]}
        frameloop="demand"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <ambientLight
          color={settings.ambientLightColor}
          intensity={settings.ambientLightIntensity}
        />
        <directionalLight
          color={settings.keyLightColor}
          position={[settings.keyLightX, settings.keyLightY, settings.keyLightZ]}
          intensity={settings.keyLightIntensity}
        />
        <directionalLight
          color={settings.verticalLightColor}
          position={[
            settings.verticalLightX,
            settings.verticalLightY,
            settings.verticalLightZ,
          ]}
          intensity={settings.verticalLightIntensity}
        />
        <directionalLight
          color={settings.fillLightColor}
          position={[
            settings.fillLightX,
            settings.fillLightY,
            settings.fillLightZ,
          ]}
          intensity={settings.fillLightIntensity}
        />
        <pointLight
          color={settings.pointLightColor}
          position={[
            settings.pointLightX,
            settings.pointLightY,
            settings.pointLightZ,
          ]}
          intensity={settings.pointLightIntensity}
        />
        <spotLight
          color={settings.spotLightColor}
          position={[
            settings.spotLightX,
            settings.spotLightY,
            settings.spotLightZ,
          ]}
          angle={settings.spotLightAngle}
          penumbra={settings.spotLightPenumbra}
          intensity={settings.spotLightIntensity}
        />
        {settings.showFps ? <Stats /> : null}
        {settings.showModel ? (
          <Suspense fallback={null}>
            <FaceModel
              headerOffsetPx={headerOffsetPx}
              interactionEnabled={interactionEnabled}
              onReady={handleModelReady}
              settings={settings}
            />
            <Preload all />
          </Suspense>
        ) : null}
      </Canvas>
    </div>
  );
}
