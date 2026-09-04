"use client";

import { useEffect, useRef } from "react";

export default function PortfolioCursor() {
  const cursor = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const el = cursor.current;
    if (!el) return;

    const move = (event: MouseEvent) => {
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    const enter = () => el.classList.add("is-visible");
    const leave = () => el.classList.remove("is-visible");

    const setState = (type: string | null, text = "") => {
      el.dataset.state = type ?? "default";
      if (label.current) label.current.textContent = text;
    };

    const interactiveSelector = "a, button, [data-cursor]";
    const onOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(interactiveSelector);
      if (!target) return setState(null);
      const type = target.dataset.cursor ?? "link";
      setState(type, target.dataset.cursorLabel ?? (type === "view" ? "VIEW" : type === "drag" ? "DRAG" : "OPEN"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div ref={cursor} className="portfolio-cursor" aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
