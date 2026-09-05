"use client";

import { useEffect, useRef } from "react";

export default function InteractiveHeroGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--mx", `${Math.max(0, Math.min(100, x))}%`);
      node.style.setProperty("--my", `${Math.max(0, Math.min(100, y))}%`);
      node.style.setProperty("--grid-x", `${(x - 50) * 0.08}px`);
      node.style.setProperty("--grid-y", `${(y - 50) * 0.08}px`);
      node.dataset.gridHot = "true";
    };
    const onLeave = () => {
      node.dataset.gridHot = "false";
      node.style.setProperty("--mx", "50%");
      node.style.setProperty("--my", "50%");
      node.style.setProperty("--grid-x", "0px");
      node.style.setProperty("--grid-y", "0px");
    };
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="hero-grid-response" aria-hidden="true" />;
}
