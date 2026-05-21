"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const MAP_PARALLAX_MAX_OFFSET = 16;

export default function MauritiusMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current;
    let frame = null;

    if (!map) {
      return undefined;
    }

    const moveMap = (event) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        const normalizedX = event.clientX / window.innerWidth - 0.5;
        const normalizedY = event.clientY / window.innerHeight - 0.5;

        map.style.setProperty(
          "--about-map-x",
          `${normalizedX * MAP_PARALLAX_MAX_OFFSET * 2}px`
        );
        map.style.setProperty(
          "--about-map-y",
          `${normalizedY * MAP_PARALLAX_MAX_OFFSET * 2}px`
        );
      });
    };

    window.addEventListener("pointermove", moveMap, { passive: true });

    return () => {
      window.removeEventListener("pointermove", moveMap);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      aria-hidden="true"
      className="about-section__map"
    >
      <Image
        className="about-section__map-image"
        src="/image/svg/about-mauritius.svg"
        width={538}
        height={585}
        alt=""
        unoptimized
      />
    </div>
  );
}
