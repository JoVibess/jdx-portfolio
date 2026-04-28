"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import { DEFAULT_GLASS_SETTINGS, PAGE_BACKGROUND } from "../constants";
import DebugGui from "./DebugGui";
import FaceModel from "./FaceModel";

export default function FractureStage() {
  const [settings, setSettings] = useState(DEFAULT_GLASS_SETTINGS);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        width: "100%",
        height: "100%",
        cursor: "crosshair",
      }}
    >
      <DebugGui onChange={setSettings} />
      <Canvas
        camera={{ position: [0, 0, 4.85], fov: 34 }}
        dpr={[1, 1.75]}
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
            <FaceModel settings={settings} />
          </Suspense>
        ) : null}
      </Canvas>
    </div>
  );
}
