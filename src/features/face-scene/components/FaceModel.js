"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Plane, Raycaster, Vector2, Vector3 } from "three";

import {
  DEFAULT_GLASS_SETTINGS,
  DRACO_PATH,
  DRAG_MAX_TILT,
  DRAG_ROTATION_EASE,
  DRAG_SPIN_SPEED,
  DRAG_TILT_SPEED,
  FACE_MODEL_URL,
  FRAGMENT_EASE_IN,
  FRAGMENT_EASE_OUT,
  HOVER_CORE,
  HOVER_RADIUS,
  INTERACTION_PLANE_HEIGHT,
  INTERACTION_PLANE_WIDTH,
  INTERACTION_PLANE_Y,
  INTERACTION_PLANE_Z,
  MODEL_VISUAL_OFFSET,
  POINTER_EASE,
} from "../constants";
import { clamp, hashName, normalizeModel, smoothstep } from "../lib/fractureMath";
import { applyGlassSettings, createGlassMaterial } from "../lib/glassMaterial";

export default function FaceModel({ onReady, settings }) {
  const fractured = useGLTF(FACE_MODEL_URL, DRACO_PATH);
  const fracturedScene = useMemo(() => fractured.scene.clone(true), [fractured.scene]);
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const stage = useRef(null);
  const modelGroup = useRef(null);
  const hoverActive = useRef(false);
  const hoverPoint = useRef(new Vector3(0, 0, 0));
  const hoverTargetPoint = useRef(new Vector3(0, 0, 0));
  const localHoverPoint = useRef(new Vector3(0, 0, 0));
  const dragActive = useRef(false);
  const dragStartPointer = useRef({ x: 0, y: 0 });
  const dragStartRotation = useRef({ x: 0, y: 0 });
  const dragTargetRotation = useRef({ x: 0, y: 0 });
  const hasNotifiedReady = useRef(false);
  const readyElapsed = useRef(0);
  const onReadyRef = useRef(onReady);
  const material = useRef(null);
  const fragmentMaterials = useRef([]);
  const raycaster = useRef(new Raycaster());
  const pointerNdc = useRef(new Vector2());
  const interactionPlane = useRef(
    new Plane(new Vector3(0, 0, 1), -INTERACTION_PLANE_Z),
  );
  const interactionPoint = useRef(new Vector3());

  if (material.current === null) {
    material.current = createGlassMaterial();
  }

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const updatePointerPoint = useCallback((event) => {
    const rect = gl.domElement.getBoundingClientRect();
    const pointerX = (event.clientX - rect.left) / rect.width;
    const pointerY = (event.clientY - rect.top) / rect.height;

    pointerNdc.current.set(pointerX * 2 - 1, -(pointerY * 2 - 1));
    raycaster.current.setFromCamera(pointerNdc.current, camera);

    const point = raycaster.current.ray.intersectPlane(
      interactionPlane.current,
      interactionPoint.current,
    );

    if (!point) {
      hoverActive.current = false;
      return false;
    }

    const isInside =
      Math.abs(point.x) <= INTERACTION_PLANE_WIDTH / 2 &&
      Math.abs(point.y - INTERACTION_PLANE_Y) <= INTERACTION_PLANE_HEIGHT / 2;

    if (!isInside) {
      hoverActive.current = false;
      return false;
    }

    hoverActive.current = true;
    localHoverPoint.current.copy(point);
    modelGroup.current?.worldToLocal(localHoverPoint.current);
    hoverTargetPoint.current.copy(localHoverPoint.current);

    return true;
  }, [camera, gl.domElement]);

  useLayoutEffect(() => {
    const fractureMaterials = [];

    hoverActive.current = false;
    hoverPoint.current.set(0, 0, 0);
    hoverTargetPoint.current.set(0, 0, 0);
    dragActive.current = false;
    dragStartPointer.current = { x: 0, y: 0 };
    dragStartRotation.current = { x: 0, y: 0 };
    dragTargetRotation.current = { x: 0, y: 0 };
    hasNotifiedReady.current = false;
    readyElapsed.current = 0;

    if (modelGroup.current) {
      modelGroup.current.position.set(0, 0, 0);
      modelGroup.current.rotation.set(0, 0, 0);
      modelGroup.current.scale.set(1, 1, 1);
    }

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
    invalidate();

    return () => {
      fractureMaterials.forEach((fragmentMaterial) => fragmentMaterial.dispose());
      fractureMaterials.length = 0;
      fragmentMaterials.current = [];
    };
  }, [fracturedScene, invalidate]);

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerMove = (event) => {
      if (!modelGroup.current) {
        return;
      }

      if (dragActive.current) {
        const deltaX = event.clientX - dragStartPointer.current.x;
        const deltaY = event.clientY - dragStartPointer.current.y;

        hoverActive.current = false;
        dragTargetRotation.current = {
          x: clamp(
            dragStartRotation.current.x + deltaY * DRAG_TILT_SPEED,
            -DRAG_MAX_TILT,
            DRAG_MAX_TILT,
          ),
          y: dragStartRotation.current.y + deltaX * DRAG_SPIN_SPEED,
        };
        event.preventDefault();
        return;
      }

      if (event.buttons !== 0) {
        hoverActive.current = false;
        return;
      }

      updatePointerPoint(event);
    };

    const handlePointerLeave = () => {
      hoverActive.current = false;
    };

    const stopDrag = (event) => {
      if (!dragActive.current) {
        return;
      }

      dragActive.current = false;
      hoverActive.current = false;

      if (modelGroup.current) {
        dragTargetRotation.current = {
          x: modelGroup.current.rotation.x,
          y: modelGroup.current.rotation.y,
        };
      }

      if (
        event?.pointerId !== undefined &&
        canvas.hasPointerCapture?.(event.pointerId)
      ) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const handlePointerDown = (event) => {
      if (!modelGroup.current || !updatePointerPoint(event)) {
        hoverActive.current = false;
        return;
      }

      hoverActive.current = false;
      dragActive.current = true;
      dragStartPointer.current = { x: event.clientX, y: event.clientY };
      dragStartRotation.current = {
        x: modelGroup.current.rotation.x,
        y: modelGroup.current.rotation.y,
      };
      dragTargetRotation.current = { ...dragStartRotation.current };
      if (event.pointerId !== undefined) {
        canvas.setPointerCapture?.(event.pointerId);
      }
      event.preventDefault();
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", stopDrag);
    canvas.addEventListener("pointercancel", stopDrag);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", stopDrag);
      canvas.removeEventListener("pointercancel", stopDrag);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, [gl.domElement, updatePointerPoint]);

  useEffect(() => {
    fragmentMaterials.current.forEach((fragmentMaterial) => {
      applyGlassSettings(fragmentMaterial, settings);
    });
    invalidate();
  }, [settings, invalidate]);

  useEffect(() => {
    invalidate();
  }, [fracturedScene, invalidate]);

  useFrame((_, delta) => {
    if (modelGroup.current) {
      const dragEase = Math.min(1, delta * DRAG_ROTATION_EASE);

      modelGroup.current.rotation.x +=
        (dragTargetRotation.current.x - modelGroup.current.rotation.x) * dragEase;
      modelGroup.current.rotation.y +=
        (dragTargetRotation.current.y - modelGroup.current.rotation.y) * dragEase;
    }

    if (!hasNotifiedReady.current) {
      readyElapsed.current += delta;
      if (readyElapsed.current >= 1.0) {
        hasNotifiedReady.current = true;
        onReadyRef.current?.();
      }
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
    <group ref={stage} position={MODEL_VISUAL_OFFSET}>
      <group ref={modelGroup}>
        <primitive object={fracturedScene} />
      </group>
    </group>
  );
}

useGLTF.preload(FACE_MODEL_URL, DRACO_PATH);
