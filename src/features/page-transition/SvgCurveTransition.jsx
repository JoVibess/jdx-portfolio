"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const INITIAL_CURVE = 280;
const TARGET_CURVE = -280;
const DURATION = 500;
const START_DELAY = 200;

function easeOutQuad(time, start, distance, duration) {
  return -distance * (time /= duration) * (time - 2) + start;
}

export default function SvgCurveTransition({ playKey = 0, isActive = false }) {
  const loaderRef = useRef(null);
  const pathRef = useRef(null);
  const frameRef = useRef(null);
  const timeoutRef = useRef(null);

  useLayoutEffect(() => {
    if (!isActive || !loaderRef.current || !pathRef.current) return undefined;

    const setInitialPath = () => {
      const width = window.innerWidth;
      const height = loaderRef.current?.getBoundingClientRect().height || window.innerHeight + INITIAL_CURVE;

      pathRef.current?.setAttribute(
        "d",
        `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - INITIAL_CURVE} 0 ${height} L0 0`
      );
    };

    setInitialPath();
    loaderRef.current.style.transform = "translate3d(0, 0, 0)";
    window.addEventListener("resize", setInitialPath);

    return () => {
      window.removeEventListener("resize", setInitialPath);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return undefined;

    let animationStart;

    const getLoaderHeight = () => {
      return loaderRef.current?.getBoundingClientRect().height || window.innerHeight + INITIAL_CURVE;
    };

    const setPath = (curve) => {
      if (!pathRef.current) return;

      const width = window.innerWidth;
      const height = getLoaderHeight();

      pathRef.current.setAttribute(
        "d",
        `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height - curve} 0 ${height} L0 0`
      );
    };

    const animate = (timestamp) => {
      if (!loaderRef.current) return;

      if (animationStart === undefined) {
        animationStart = timestamp;
      }

      const elapsed = timestamp - animationStart;
      const height = getLoaderHeight();
      const curve = easeOutQuad(elapsed, INITIAL_CURVE, TARGET_CURVE, DURATION);
      const top = easeOutQuad(elapsed, 0, -height, DURATION);

      setPath(curve);
      loaderRef.current.style.transform = `translate3d(0, ${top}px, 0)`;

      if (elapsed < DURATION) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    setPath(INITIAL_CURVE);
    if (loaderRef.current) {
      loaderRef.current.style.transform = "translate3d(0, 0, 0)";
    }

    timeoutRef.current = window.setTimeout(() => {
      frameRef.current = window.requestAnimationFrame(animate);
    }, START_DELAY);

    return () => {
      window.clearTimeout(timeoutRef.current);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isActive, playKey]);

  if (!isActive) return null;

  return (
    <div className="svg-curve-transition" ref={loaderRef} aria-hidden="true">
      <svg className="svg-curve-transition__svg" focusable="false">
        <path ref={pathRef} className="svg-curve-transition__path" />
      </svg>
    </div>
  );
}
