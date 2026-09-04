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

      gsap.fromTo(
        ".page-hero .section-kicker, .page-hero .display-title, .page-hero .lead-copy, .contact-hero .section-kicker, .contact-hero .display-title, .contact-hero .lead-copy",
        { autoAlpha: 0, y: 80, rotateX: 12 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.05, stagger: 0.08, ease: "power4.out" }
      );

      gsap.utils.toArray<HTMLElement>(".about-section, .experience-section, .work-preview, .contact-section, .story-section").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 120, scale: 0.985 }, {
          autoAlpha: 1, y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 35%", scrub: 0.55 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-card, .principle, .experience-item, .about-card, .contact-actions a").forEach((el, i) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 70, x: i % 2 ? 24 : -24, rotateZ: i % 2 ? 1.2 : -1.2 }, {
          autoAlpha: 1, y: 0, x: 0, rotateZ: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 55%", scrub: 0.7 },
        });
        gsap.to(el, {
          y: i % 2 ? -14 : 14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-title, .display-title").forEach((el) => {
        gsap.fromTo(el, { y: 28, opacity: 0.2 }, {
          y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 52%", scrub: 0.7 },
        });
      });

      gsap.to(".work-preview", {
        backgroundPosition: "50% 120%",
        ease: "none",
        scrollTrigger: { trigger: ".work-preview", start: "top bottom", end: "bottom top", scrub: 1.1 },
      });

      gsap.to(".display-title", {
        yPercent: -12,
        rotateZ: -0.6,
        ease: "none",
        scrollTrigger: { trigger: ".page-hero, .contact-hero", start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.to(".mascot-layer", {
        y: -70,
        rotate: 6,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 1.2 },
      });

      const topButton = document.querySelector<HTMLElement>(".goto-top");
      if (topButton) {
        gsap.set(topButton, { autoAlpha: 0, y: 70, scale: 0.9 });
        ScrollTrigger.create({
          start: "top -25%",
          end: "max",
          onEnter: () => gsap.to(topButton, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", overwrite: true }),
          onLeaveBack: () => gsap.to(topButton, { autoAlpha: 0, y: 70, scale: 0.9, duration: 0.35, ease: "power2.in", overwrite: true }),
        });
      }

      const onMove = (event: PointerEvent) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        gsap.to(".loader-mass, .scene-wrap", { x: x * 22, y: y * 16, duration: 0.65, overwrite: true, ease: "power2.out" });
        gsap.to(".about-grid", { x: x * -12, duration: 0.65, overwrite: true, ease: "power2.out" });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", refresh);
      refresh();

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", refresh);
      };
    }, root);

    return () => ctx.revert();
  }, { scope: root });

  return <div ref={root} className="motion-root">{children}</div>;
}
