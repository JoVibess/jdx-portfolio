"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DRAG_THRESHOLD = 42;

function clampIndex(value, max) {
  return Math.max(0, Math.min(value, max));
}

export default function SkillsCarousel({ skills, labels = {} }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const dragState = useRef({
    active: false,
    clickedIndex: null,
    pointerId: null,
    startX: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [metrics, setMetrics] = useState({ card: 0, gap: 0, viewport: 0 });

  const maxIndex = skills.length - 1;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const firstCard = trackRef.current?.querySelector(".skills-carousel__card");

    if (!viewport || !firstCard) return;

    const styles = window.getComputedStyle(trackRef.current);
    setMetrics({
      card: firstCard.getBoundingClientRect().width,
      gap: Number.parseFloat(styles.columnGap || styles.gap || "0"),
      viewport: viewport.getBoundingClientRect().width,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = metrics.card + metrics.gap;
  const centerOffset = metrics.viewport / 2 - metrics.card / 2;
  const translateX = centerOffset - activeIndex * step + dragOffset;

  const goTo = useCallback(
    (index) => {
      setActiveIndex(clampIndex(index, maxIndex));
      setDragOffset(0);
    },
    [maxIndex],
  );

  const handlePointerDown = (event) => {
    const clickedCard = event.target.closest(".skills-carousel__card");

    dragState.current = {
      active: true,
      clickedIndex: clickedCard?.dataset.index
        ? Number.parseInt(clickedCard.dataset.index, 10)
        : null,
      pointerId: event.pointerId,
      startX: event.clientX,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current.active || dragState.current.pointerId !== event.pointerId) return;
    setDragOffset(event.clientX - dragState.current.startX);
  };

  const finishDrag = (event) => {
    if (!dragState.current.active || dragState.current.pointerId !== event.pointerId) return;

    const moved = event.clientX - dragState.current.startX;
    const threshold = Math.max(DRAG_THRESHOLD, step * 0.18);
    const movedCardCount =
      Math.abs(moved) > threshold && step > 0
        ? Math.max(1, Math.round(Math.abs(moved) / step))
        : 0;
    const direction = movedCardCount > 0 ? (moved < 0 ? 1 : -1) : 0;
    const nextIndex =
      direction === 0 && dragState.current.clickedIndex !== null
        ? dragState.current.clickedIndex
        : activeIndex + direction * movedCardCount;

    dragState.current = {
      active: false,
      clickedIndex: null,
      pointerId: null,
      startX: 0,
    };
    setIsDragging(false);
    goTo(nextIndex);
  };

  const cardStyles = useMemo(
    () =>
      skills.map((skill) => ({
        "--skill-card-color": skill.color,
        "--skill-level": `${Math.max(0, Math.min(skill.level ?? 0, 10)) * 10}%`,
      })),
    [skills],
  );

  return (
    <div className="skills-carousel" aria-roledescription="carousel">
      <div
        ref={viewportRef}
        className="skills-carousel__viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          ref={trackRef}
          className="skills-carousel__track"
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          data-dragging={isDragging ? "true" : "false"}
        >
          {skills.map((skill, index) => (
            <button
              key={skill.slug}
              className="skills-carousel__card cursor-over"
              style={cardStyles[index]}
              type="button"
              data-index={index}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => goTo(index)}
            >
              <span className="skills-carousel__corner skills-carousel__corner--top-left" />
              <span className="skills-carousel__corner skills-carousel__corner--top-right" />
              <span className="skills-carousel__corner skills-carousel__corner--bottom-left" />
              <span className="skills-carousel__corner skills-carousel__corner--bottom-right" />
              <span className="skills-carousel__content">
                <span className="skills-carousel__title">{skill.title}</span>
                <span className="skills-carousel__progress" aria-hidden="true">
                  <span className="skills-carousel__progress-fill" />
                </span>
              </span>
              <span className="skills-carousel__type">{skill.type}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="skills-carousel__controls"
        aria-label={labels.controlsLabel || "Skill carousel controls"}
      >
        <button
          className="skills-carousel__control"
          type="button"
          aria-label={labels.previousLabel || "Previous skill"}
          onClick={() => goTo(activeIndex - 1)}
        >
          ←
        </button>
        <button
          className="skills-carousel__control"
          type="button"
          aria-label={labels.nextLabel || "Next skill"}
          onClick={() => goTo(activeIndex + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
