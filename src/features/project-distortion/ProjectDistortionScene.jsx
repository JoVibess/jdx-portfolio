"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import DistortedProjectImage from "./DistortedProjectImage";

export default function ProjectDistortionScene({ activeIndex, pointer, projects }) {
  return (
    <div className="project-distortion-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <DistortedProjectImage activeIndex={activeIndex} pointer={pointer} projects={projects} />
        </Suspense>
      </Canvas>
    </div>
  );
}
