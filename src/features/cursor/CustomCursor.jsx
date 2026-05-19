"use client";

import { useEffect, useRef } from "react";

const CURSOR_SPEED = 0.17;
const VELOCITY_MULTIPLIER = 6.8;
const MAX_VELOCITY = 150;
const MAX_SQUEEZE = 0.5;
const ROTATION_THRESHOLD = 30;

export default function CustomCursor() {
  const circleRef = useRef(null);

  useEffect(() => {
    const circleElement = circleRef.current;

    if (!circleElement || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const previousMouse = { x: mouse.x, y: mouse.y };
    const circle = { x: mouse.x, y: mouse.y };
    let currentScale = 0;
    let currentAngle = 0;
    let frameId = 0;
    let hasMoved = false;
    let modelDragMode = false;

    const updateMode = (isDomDragMode = false) => {
      circleElement.dataset.mode = modelDragMode || isDomDragMode ? "drag" : "";
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      if (!hasMoved) {
        hasMoved = true;
        circleElement.dataset.visible = "true";
      }
    };

    const handlePointerOver = (event) => {
      if (event.target.closest(".cursor-over")) {
        updateMode(true);
      }
    };

    const handlePointerOut = (event) => {
      const overElement = event.target.closest(".cursor-over");

      if (!overElement || overElement.contains(event.relatedTarget)) {
        return;
      }

      updateMode(false);
    };

    const handleCursorMode = (event) => {
      modelDragMode = event.detail?.mode === "drag";
      updateMode(Boolean(document.elementFromPoint(mouse.x, mouse.y)?.closest(".cursor-over")));
    };

    const tick = () => {
      circle.x += (mouse.x - circle.x) * CURSOR_SPEED;
      circle.y += (mouse.y - circle.y) * CURSOR_SPEED;

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      const mouseVelocity = Math.min(
        Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * VELOCITY_MULTIPLIER,
        MAX_VELOCITY,
      );
      const isDragMode = circleElement.dataset.mode === "drag";
      const scaleValue = isDragMode ? 0 : (mouseVelocity / MAX_VELOCITY) * MAX_SQUEEZE;
      currentScale += (scaleValue - currentScale) * CURSOR_SPEED;

      if (!isDragMode && mouseVelocity > ROTATION_THRESHOLD) {
        currentAngle = Math.atan2(deltaMouseY, deltaMouseX) * (180 / Math.PI);
      }

      circleElement.style.transform = [
        `translate3d(${circle.x}px, ${circle.y}px, 0)`,
        `rotate(${isDragMode ? 0 : currentAngle}deg)`,
        `scale(${isDragMode ? 1 : 1 + currentScale}, ${isDragMode ? 1 : 1 - currentScale})`,
      ].join(" ");

      frameId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("jdx:cursor-mode", handleCursorMode);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("jdx:cursor-mode", handleCursorMode);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={circleRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor__label">Drag</span>
    </div>
  );
}
