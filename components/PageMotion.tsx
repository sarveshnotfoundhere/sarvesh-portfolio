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
        { autoAlpha: 0, y: 70, rotateX: 10 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.09, ease: "power4.out" }
      );

      gsap.utils.toArray<HTMLElement>(
        ".about-section, .experience-section, .work-preview, .contact-section, .story-section, .project-card, .contact-actions a"
      ).forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 90, rotateX: 4, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 45%", scrub: 0.45 },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".section-title, .display-title, .loader-title").forEach((el) => {
        gsap.fromTo(
          el,
          { letterSpacing: "0.06em", filter: "blur(7px)" },
          {
            letterSpacing: "-0.08em",
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.7 },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".about-card, .project-card, .principle").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? -18 : 18,
          rotateZ: i % 2 ? -0.4 : 0.4,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.1 },
        });
      });

      gsap.to(".work-preview", {
        backgroundPosition: "50% 110%",
        ease: "none",
        scrollTrigger: { trigger: ".work-preview", start: "top bottom", end: "bottom top", scrub: 1 },
      });

      gsap.to(".display-title", {
        yPercent: -16,
        rotateZ: -1,
        ease: "none",
        scrollTrigger: { trigger: ".page-hero, .contact-hero", start: "top top", end: "bottom top", scrub: 1.1 },
      });

      gsap.to(".mascot-layer", {
        y: -60,
        rotate: 5,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 1.3 },
      });

      const onMove = (event: MouseEvent) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        gsap.to(".loader-reactor, .scene-wrap", { x: x * 18, y: y * 14, duration: 0.8, overwrite: true, ease: "power2.out" });
        gsap.to(".about-grid", { x: x * -10, duration: 0.8, overwrite: true, ease: "power2.out" });
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const onResize = refresh;
      window.addEventListener("resize", onResize);
      refresh();

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
      };
    }, root);

    return () => ctx.revert();
  }, { scope: root });

  return <div ref={root} className="motion-root">{children}</div>;
}
