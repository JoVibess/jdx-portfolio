"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function splitText(text) {
  let letterIndex = 0;

  return text.split(" ").map((word, wordIndex) => ({
    id: `${word}-${wordIndex}`,
    letters: word.split("").map((letter, index) => {
      const currentIndex = letterIndex;
      letterIndex += 1;

      return {
        id: `${word}-${wordIndex}-${letter}-${index}`,
        index: currentIndex,
        value: letter,
      };
    }),
  }));
}

export default function ProjectReadingText({ text }) {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const words = useMemo(() => splitText(text), [text]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const letters = letterRefs.current.filter(Boolean);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduceMotion) {
      gsap.set(letters, { opacity: 1 });
      return undefined;
    }

    gsap.set(letters, { opacity: 0.2 });

    const tween = gsap.to(letters, {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        scrub: true,
        start: () => `top ${window.innerHeight - container.offsetHeight * 0.5}px`,
        end: () => `+=${window.innerHeight / 1.5}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <p ref={containerRef} className="project-reading-text" aria-label={text}>
      {words.map((word) => (
        <span className="project-reading-text__word" key={word.id} aria-hidden="true">
          {word.letters.map((letter) => (
            <span
              className="project-reading-text__letter"
              key={letter.id}
              ref={(node) => {
                letterRefs.current[letter.index] = node;
              }}
            >
              {letter.value}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
