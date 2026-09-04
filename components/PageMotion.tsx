"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());

      let lastY = window.scrollY;
      let upFrame = 0;
      const watchDirection = () => {
        const y = window.scrollY;
        document.body.classList.toggle("is-scrolling-up", y < lastY - 2);
        lastY = y;
        upFrame = requestAnimationFrame(watchDirection);
      };
      upFrame = requestAnimationFrame(watchDirection);

      gsap.fromTo(
        ".page-hero .section-kicker, .page-hero .display-title, .page-hero .lead-copy, .contact-hero .section-kicker, .contact-hero .display-title, .contact-hero .lead-copy",
        { autoAlpha: 0, y: 80, rotateX: 10 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.08, ease: "power4.out" }
      );

      gsap.utils.toArray<HTMLElement>(".about-section, .experience-section, .work-preview, .contact-section, .story-section").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 90, scale: 0.99 }, {
          autoAlpha: 1, y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 35%", scrub: 0.9 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-card, .principle, .experience-item, .about-card, .contact-actions a").forEach((el, i) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 55, x: i % 2 ? 16 : -16, rotateZ: i % 2 ? 0.7 : -0.7 }, {
          autoAlpha: 1, y: 0, x: 0, rotateZ: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 55%", scrub: 1.1 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-title, .display-title").forEach((el) => {
        gsap.fromTo(el, { y: 22, opacity: 0.35 }, {
          y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 52%", scrub: 1 },
        });
      });

      gsap.to(".display-title", {
        yPercent: -10,
        rotateZ: -0.45,
        ease: "none",
        scrollTrigger: { trigger: ".page-hero, .contact-hero", start: "top top", end: "bottom top", scrub: 1.6 },
      });

      gsap.to(".mascot-layer", {
        y: -55,
        rotate: 4,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 1.8 },
      });

      const topButton = document.querySelector<HTMLElement>(".goto-top");
      if (topButton) {
        gsap.set(topButton, { autoAlpha: 0, y: 72, scale: 0.92 });
        ScrollTrigger.create({
          start: "top -20%",
          end: "max",
          onEnter: () => gsap.to(topButton, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, ease: "expo.out", overwrite: true }),
          onLeaveBack: () => gsap.to(topButton, { autoAlpha: 0, y: 72, scale: 0.92, duration: 0.45, ease: "power2.in", overwrite: true }),
        });
      }

      const onMove = (event: PointerEvent) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        gsap.to(".loader-mass, .scene-wrap", { x: x * 16, y: y * 12, duration: 0.8, overwrite: true, ease: "power2.out" });
        gsap.to(".about-grid", { x: x * -8, duration: 0.8, overwrite: true, ease: "power2.out" });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", refresh);
      refresh();

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", refresh);
        cancelAnimationFrame(upFrame);
      };
    }, root);

    return () => ctx.revert();
  }, { scope: root });

  return <div ref={root} className="motion-root">{children}</div>;
}
