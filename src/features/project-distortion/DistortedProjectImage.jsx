"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { MathUtils, Vector2 } from "three";

import { fragmentShader, vertexShader } from "./shader";

const IMAGE_SCALE = 0.2;
const MOUSE_LERP = 0.1;
const OPACITY_LERP = 0.22;
const DISTORTION_AMPLITUDE = 0.0005;

export default function DistortedProjectImage({ activeIndex, pointer, projects }) {
  const plane = useRef(null);
  const material = useRef(null);
  const alpha = useRef(0);
  const { viewport, size } = useThree();
  const smoothMouse = useRef({ x: size.width * 0.5, y: size.height * 0.5 });
  const textureUrls = useMemo(() => projects.map((project) => project.featuredImage), [projects]);
  const loadedTextures = useTexture(textureUrls);
  const textures = useMemo(
    () => (Array.isArray(loadedTextures) ? loadedTextures : [loadedTextures]),
    [loadedTextures],
  );
  const activeTexture = textures[activeIndex ?? 0] || textures[0] || null;

  const firstImage = textures[0]?.image;
  const imageWidth = firstImage?.width || 1;
  const imageHeight = firstImage?.height || 1;
  const scale = useAspect(imageWidth, imageHeight, IMAGE_SCALE);

  useEffect(() => {
    if (!activeTexture) return;

    if (material.current) {
      material.current.uniforms.uTexture.value = activeTexture;
      material.current.needsUpdate = true;
    }
  }, [activeTexture]);

  useFrame(() => {
    if (!plane.current) return;

    const targetAlpha = activeIndex === null ? 0 : 1;
    alpha.current = MathUtils.lerp(alpha.current, targetAlpha, OPACITY_LERP);
    if (material.current) {
      material.current.uniforms.uAlpha.value = alpha.current;
    }

    const targetX = pointer.x || size.width * 0.5;
    const targetY = pointer.y || size.height * 0.5;
    const nextX = MathUtils.lerp(smoothMouse.current.x, targetX, MOUSE_LERP);
    const nextY = MathUtils.lerp(smoothMouse.current.y, targetY, MOUSE_LERP);
    const deltaX = targetX - smoothMouse.current.x;
    const deltaY = targetY - smoothMouse.current.y;

    smoothMouse.current.x = nextX;
    smoothMouse.current.y = nextY;

    if (material.current) {
      material.current.uniforms.uDelta.value.set(deltaX, -deltaY);
    }

    plane.current.position.x = (nextX / size.width - 0.5) * viewport.width;
    plane.current.position.y = -(nextY / size.height - 0.5) * viewport.height;
  });

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        key={activeTexture?.uuid}
        ref={material}
        fragmentShader={fragmentShader}
        depthWrite={false}
        transparent
        uniforms={{
          uDelta: { value: new Vector2(0, 0) },
          uAmplitude: { value: DISTORTION_AMPLITUDE },
          uTexture: { value: activeTexture },
          uAlpha: { value: 0 },
        }}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}
