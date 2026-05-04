"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useCallback, useState } from "react";

import { DEFAULT_GLASS_SETTINGS, PAGE_BACKGROUND } from "../constants";
import DebugGui from "./DebugGui";
import FaceModel from "./FaceModel";

const FACE_SCENE_Z_INDEX = 50;

export default function FractureStage({ isVisible = true, onModelReady }) {
  const [settings, setSettings] = useState(DEFAULT_GLASS_SETTINGS);
  const handleModelReady = useCallback(() => {
    onModelReady?.();
  }, [onModelReady]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: FACE_SCENE_Z_INDEX,
        width: "100%",
        height: "100%",
        cursor: "crosshair",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <DebugGui onChange={setSettings} />
      <Canvas
        camera={{ position: [0, 0, 4.85], fov: 34 }}
        dpr={[1, 1.75]}
        frameloop="always"
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <color attach="background" args={[PAGE_BACKGROUND]} />
        <ambientLight intensity={settings.ambientLight} />
        <directionalLight position={[2.5, 3, 4]} intensity={settings.keyLight} />
        <directionalLight position={[-3, -1.4, 2]} intensity={settings.fillLight} />
        <pointLight position={[0, 0.2, 2.3]} color="#baf4ff" intensity={settings.pointLight} />
        <spotLight
          position={[0, 1.4, 3.6]}
          angle={0.45}
          penumbra={0.8}
          intensity={settings.spotLight}
          color="#ffffff"
        />
        {settings.showModel ? (
          <Suspense fallback={null}>
            <FaceModel settings={settings} onReady={handleModelReady} />
            <Preload all />
          </Suspense>
        ) : null}
      </Canvas>
    </div>
  );
}
