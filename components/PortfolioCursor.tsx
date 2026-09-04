"use client";

import { useEffect, useRef } from "react";

export default function PortfolioCursor() {
  const cursor = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = cursor.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const render = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      el.classList.add("is-visible");
    };
    const leave = () => el.classList.remove("is-visible");
    const onOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      if (!target) {
        el.dataset.state = "default";
        if (label.current) label.current.textContent = "";
        return;
      }
      const type = target.dataset.cursor ?? "link";
      el.dataset.state = type;
      if (label.current) label.current.textContent = target.dataset.cursorLabel ?? (type === "view" ? "VIEW" : "OPEN");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={cursor} className="portfolio-cursor" aria-hidden="true"><span ref={label} /></div>;
}
