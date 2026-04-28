"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Box3, Vector3 } from "three";

import {
  DEFAULT_GLASS_SETTINGS,
  DRACO_PATH,
  DRAG_MAX_TILT,
  DRAG_ROTATION_EASE,
  DRAG_SPIN_SPEED,
  DRAG_TILT_STRENGTH,
  FACE_MODEL_URL,
  FRAGMENT_EASE_IN,
  FRAGMENT_EASE_OUT,
  HOVER_CORE,
  HOVER_RADIUS,
  POINTER_EASE,
} from "../constants";
import { clamp, hashName, normalizeModel, smoothstep } from "../lib/fractureMath";
import { applyGlassSettings, createGlassMaterial } from "../lib/glassMaterial";

export default function FaceModel({ settings }) {
  const fractured = useGLTF(FACE_MODEL_URL, DRACO_PATH);
  const fracturedScene = useMemo(() => fractured.scene.clone(true), [fractured.scene]);
  const invalidate = useThree((state) => state.invalidate);
  const stage = useRef(null);
  const modelGroup = useRef(null);
  const hoverActive = useRef(false);
  const hoverPoint = useRef(new Vector3(0, 0, 0));
  const hoverTargetPoint = useRef(new Vector3(0, 0, 0));
  const localHoverPoint = useRef(new Vector3(0, 0, 0));
  const dragActive = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragStartRotation = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });
  const material = useRef(null);
  const fragmentMaterials = useRef([]);

  if (material.current === null) {
    material.current = createGlassMaterial();
  }

  useEffect(() => {
    const fractureMaterials = [];

    normalizeModel(fracturedScene);

    fracturedScene.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(fracturedScene);
    const center = bounds.getCenter(new Vector3());

    fracturedScene.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      const fragmentMaterial = material.current.clone();
      applyGlassSettings(fragmentMaterial, DEFAULT_GLASS_SETTINGS);
      child.material = fragmentMaterial;
      child.castShadow = false;
      child.receiveShadow = false;
      child.renderOrder = 2;
      child.geometry.computeBoundingBox();
      fractureMaterials.push(fragmentMaterial);

      const meshCenter = new Vector3();
      new Box3().setFromObject(child).getCenter(meshCenter);

      const seed = hashName(child.name);
      const direction = meshCenter
        .clone()
        .sub(center)
        .normalize()
        .add(
          new Vector3(
            ((seed % 19) - 9) * 0.018,
            (((seed >> 3) % 17) - 8) * 0.02,
            (((seed >> 5) % 23) - 11) * 0.028,
          ),
        )
        .normalize();

      child.userData.origin = child.position.clone();
      child.userData.originRotation = child.rotation.clone();
      child.userData.center = meshCenter.clone();
      child.userData.influence = 0;
      child.userData.target = direction.multiplyScalar(0.95 + (seed % 100) / 115);
      child.userData.spin = new Vector3(
        ((seed % 7) - 3) * 0.28,
        (((seed >> 2) % 9) - 4) * 0.24,
        (((seed >> 4) % 11) - 5) * 0.22,
      );
    });

    fragmentMaterials.current = fractureMaterials;

    return () => {
      fractureMaterials.forEach((fragmentMaterial) => fragmentMaterial.dispose());
      fractureMaterials.length = 0;
      fragmentMaterials.current = [];
    };
  }, [fracturedScene]);

  useEffect(() => {
    fragmentMaterials.current.forEach((fragmentMaterial) => {
      applyGlassSettings(fragmentMaterial, settings);
    });
    invalidate();
  }, [settings, invalidate]);

  useEffect(() => {
    invalidate();
  }, [fracturedScene, invalidate]);

  useEffect(() => {
    const stopDrag = () => {
      dragActive.current = false;
    };

    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    return () => {
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, []);

  useFrame((_, delta) => {
    if (modelGroup.current) {
      const rotationEase = Math.min(1, delta * DRAG_ROTATION_EASE);

      modelGroup.current.rotation.x +=
        (dragRotation.current.x - modelGroup.current.rotation.x) * rotationEase;
      modelGroup.current.rotation.y +=
        (dragRotation.current.y - modelGroup.current.rotation.y) * rotationEase;
    }

    hoverPoint.current.lerp(
      hoverTargetPoint.current,
      Math.min(1, delta * POINTER_EASE),
    );

    fracturedScene.traverse((child) => {
      if (!child.isMesh || !child.userData.origin) {
        return;
      }

      const distance = hoverActive.current
        ? Math.hypot(
            child.userData.center.x - hoverPoint.current.x,
            child.userData.center.y - hoverPoint.current.y,
          )
        : Number.POSITIVE_INFINITY;
      const targetInfluence = smoothstep(HOVER_RADIUS, HOVER_CORE, distance);
      const easeSpeed = targetInfluence > child.userData.influence ? FRAGMENT_EASE_IN : FRAGMENT_EASE_OUT;

      child.userData.influence +=
        (targetInfluence - child.userData.influence) * Math.min(1, delta * easeSpeed);

      const eased = child.userData.influence * child.userData.influence * (3 - 2 * child.userData.influence);

      child.position.copy(child.userData.origin).addScaledVector(child.userData.target, eased);
      child.rotation.set(
        child.userData.originRotation.x + child.userData.spin.x * eased,
        child.userData.originRotation.y + child.userData.spin.y * eased,
        child.userData.originRotation.z + child.userData.spin.z * eased,
      );
    });
  });

  return (
    <group ref={stage}>
      <mesh
        position={[0, -0.08, 1.04]}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (!modelGroup.current) {
            return;
          }

          dragActive.current = true;
          dragStart.current = { x: event.clientX, y: event.clientY };
          dragStartRotation.current = {
            x: modelGroup.current.rotation.x,
            y: modelGroup.current.rotation.y,
          };
          dragRotation.current = dragStartRotation.current;
          event.target.setPointerCapture?.(event.pointerId);
        }}
        onPointerMove={(event) => {
          event.stopPropagation();
          if (!modelGroup.current) {
            return;
          }

          if (dragActive.current) {
            const deltaX = event.clientX - dragStart.current.x;
            const deltaY = event.clientY - dragStart.current.y;

            dragRotation.current = {
              x: clamp(
                dragStartRotation.current.x + deltaY * DRAG_TILT_STRENGTH,
                -DRAG_MAX_TILT,
                DRAG_MAX_TILT,
              ),
              y: dragStartRotation.current.y + deltaX * DRAG_SPIN_SPEED,
            };
          }

          hoverActive.current = true;
          localHoverPoint.current.copy(event.point);
          modelGroup.current.worldToLocal(localHoverPoint.current);
          hoverTargetPoint.current.copy(localHoverPoint.current);
        }}
        onPointerUp={(event) => {
          event.stopPropagation();
          dragActive.current = false;
          if (modelGroup.current) {
            dragRotation.current = {
              x: modelGroup.current.rotation.x,
              y: modelGroup.current.rotation.y,
            };
          }
          event.target.releasePointerCapture?.(event.pointerId);
        }}
        onPointerOut={() => {
          hoverActive.current = false;
        }}
      >
        <planeGeometry args={[2.2, 3.25]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <group ref={modelGroup}>
        <primitive object={fracturedScene} />
      </group>
    </group>
  );
}

useGLTF.preload(FACE_MODEL_URL, DRACO_PATH);
