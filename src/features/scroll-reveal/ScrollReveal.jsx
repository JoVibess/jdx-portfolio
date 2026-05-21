"use client";

import { useEffect, useRef } from "react";

const WORD_SELECTOR = ".scroll-reveal__word";
const WORD_STAGGER_MS = 40;

export default function ScrollReveal({ as: Tag = "div", children, className = "" }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    const splitTextNode = (textNode, indexRef) => {
      const parts = textNode.textContent.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (!part) return;

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const word = document.createElement("span");
        word.className = "scroll-reveal__word";
        word.style.setProperty("--word-delay", `${indexRef.current * WORD_STAGGER_MS}ms`);
        word.textContent = part;
        fragment.appendChild(word);
        indexRef.current += 1;
      });

      textNode.parentNode.replaceChild(fragment, textNode);
    };

    const splitElement = () => {
      const indexRef = { current: 0 };
      const nodeFilter = window.NodeFilter;
      const walker = document.createTreeWalker(element, nodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.textContent.trim()) return nodeFilter.FILTER_REJECT;
          if (node.parentElement?.closest(WORD_SELECTOR)) return nodeFilter.FILTER_REJECT;
          return nodeFilter.FILTER_ACCEPT;
        },
      });
      const textNodes = [];

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }

      textNodes.forEach((textNode) => splitTextNode(textNode, indexRef));
    };

    splitElement();

    if (!("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        element.classList.add("is-visible");
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Tag ref={elementRef} className={`${className} scroll-reveal`}>
      {children}
    </Tag>
  );
}
