"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, Stats } from "@react-three/drei";
import { Suspense, useCallback } from "react";

import FaceModel from "./FaceModel";

export default function FractureStage({
  isVisible = true,
  onModelReady,
  settings,
}) {
  const handleModelReady = useCallback(() => {
    onModelReady?.();
  }, [onModelReady]);

  return (
    <div
      className="face-scene-stage"
      style={{
        cursor: "crosshair",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.85], fov: 34 }}
        dpr={[1, 1.75]}
        frameloop="always"
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
            <FaceModel onReady={handleModelReady} settings={settings} />
            <Preload all />
          </Suspense>
        ) : null}
      </Canvas>
    </div>
  );
}
