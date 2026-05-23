"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import ScrollReveal from "@/features/scroll-reveal/ScrollReveal";

const COLUMN_SPEEDS = [2, 3.3, 1.25, 3];
const MOBILE_PARALLAX_SCALE = 0.16;
const TABLET_PARALLAX_SCALE = 0.58;
const PARALLAX_EASE = 0.14;
const PARALLAX_SNAP_THRESHOLD = 0.08;

function getColumnCount(width) {
  if (width <= 900) {
    return 2;
  }

  if (width <= 1600) {
    return 3;
  }

  return 4;
}

function splitIntoColumns(images, columnCount) {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    images.filter((_, imageIndex) => imageIndex % columnCount === columnIndex),
  );
}

function getGalleryItemId(item, index) {
  if (typeof item === "string") {
    return item;
  }

  return item?.id || `gallery-item-${index}`;
}

function getGalleryItemSrc(item) {
  if (typeof item === "string") {
    return item;
  }

  return item?.src || null;
}

export default function ProjectParallaxGallery({ title, images = [] }) {
  const galleryRef = useRef(null);
  const columnRefs = useRef([]);
  const currentOffsets = useRef(COLUMN_SPEEDS.map(() => 0));
  const targetOffsets = useRef(COLUMN_SPEEDS.map(() => 0));
  const viewportHeightRef = useRef(0);
  const parallaxScaleRef = useRef(1);
  const [columnCount, setColumnCount] = useState(4);
  const columns = useMemo(() => splitIntoColumns(images, columnCount), [columnCount, images]);

  useEffect(() => {
    let targetFrameId = null;
    let renderFrameId = null;

    const renderColumns = () => {
      renderFrameId = null;

      let shouldKeepRendering = false;

      columnRefs.current.forEach((column, index) => {
        if (!column) {
          return;
        }

        const current = currentOffsets.current[index];
        const target = targetOffsets.current[index];
        const delta = target - current;
        const next = Math.abs(delta) < PARALLAX_SNAP_THRESHOLD
          ? target
          : current + delta * PARALLAX_EASE;

        currentOffsets.current[index] = next;
        column.style.transform = `translate3d(0, ${next.toFixed(3)}px, 0)`;

        if (next !== target) {
          shouldKeepRendering = true;
        }
      });

      if (shouldKeepRendering) {
        renderFrameId = window.requestAnimationFrame(renderColumns);
      }
    };

    const requestRender = () => {
      if (renderFrameId === null) {
        renderFrameId = window.requestAnimationFrame(renderColumns);
      }
    };

    const updateTargets = () => {
      targetFrameId = null;

      if (!galleryRef.current) {
        return;
      }

      const rect = galleryRef.current.getBoundingClientRect();
      const scrollRange = window.innerHeight + rect.height;
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / scrollRange, 0), 1);

      columns.forEach((_, index) => {
        const speed = COLUMN_SPEEDS[index] || COLUMN_SPEEDS[0];
        targetOffsets.current[index] = progress * viewportHeightRef.current * speed * parallaxScaleRef.current;
      });

      requestRender();
    };

    const requestUpdate = () => {
      if (targetFrameId === null) {
        targetFrameId = window.requestAnimationFrame(updateTargets);
      }
    };

    const resize = () => {
      const nextColumnCount = getColumnCount(window.innerWidth);

      viewportHeightRef.current = window.innerHeight;
      parallaxScaleRef.current =
        nextColumnCount === 2 ? MOBILE_PARALLAX_SCALE : nextColumnCount === 3 ? TABLET_PARALLAX_SCALE : 1;
      setColumnCount(nextColumnCount);
      requestUpdate();
    };

    resize();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      if (targetFrameId !== null) {
        window.cancelAnimationFrame(targetFrameId);
      }

      if (renderFrameId !== null) {
        window.cancelAnimationFrame(renderFrameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", resize);
    };
  }, [columns]);

  if (!images.length) {
    return null;
  }

  return (
    <section className="project-gallery" aria-labelledby="project-gallery-title">
      <ScrollReveal
        as="h2"
        id="project-gallery-title"
        className="project-gallery__title"
      >
        {title}
      </ScrollReveal>

      <div ref={galleryRef} className="project-gallery__parallax" data-columns={columnCount}>
        {columns.map((column, columnIndex) => (
          <div
            className="project-gallery__column"
            key={`gallery-column-${columnIndex}`}
            ref={(node) => {
              columnRefs.current[columnIndex] = node;
            }}
          >
            {column.map((item, imageIndex) => {
              const src = getGalleryItemSrc(item);
              const itemId = getGalleryItemId(item, imageIndex);

              return (
                <div
                  className={`project-gallery__image${src ? "" : " project-gallery__image--placeholder"}`}
                  key={itemId}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={`${title} ${columnIndex + 1}-${imageIndex + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 900px) 48vw, (max-width: 1600px) 31vw, 22vw"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
