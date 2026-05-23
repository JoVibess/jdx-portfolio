"use client";

import { useEffect, useRef } from "react";

const MAX_DISTANCE_RATIO = 0.32;

export default function FooterEyes() {
  const eyesRef = useRef(null);

  useEffect(() => {
    const eyesContainer = eyesRef.current;
    if (!eyesContainer) return undefined;

    const eyes = Array.from(eyesContainer.querySelectorAll(".site-footer-eyes__eye"));
    if (eyes.length !== 2) return undefined;

    const handleMouseMove = (event) => {
      const containerRect = eyesContainer.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const maxDistance = eyes[0].offsetWidth * MAX_DISTANCE_RATIO;
      const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY));
      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      eyes.forEach((eye) => {
        const pupil = eye.querySelector(".site-footer-eyes__pupil");
        if (!pupil) return;
        pupil.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="site-footer-eyes" ref={eyesRef} aria-hidden="true">
      <span className="site-footer-eyes__eye">
        <i className="site-footer-eyes__pupil" />
      </span>
      <span className="site-footer-eyes__eye">
        <i className="site-footer-eyes__pupil" />
      </span>
    </div>
  );
}
