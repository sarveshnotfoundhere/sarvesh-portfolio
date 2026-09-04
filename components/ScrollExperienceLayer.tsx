"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioExperienceScene from "@/components/PortfolioExperienceScene";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperienceLayer() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(".about-section", { yPercent: -4, ease: "none", scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".about-card, .experience-item, .section-kicker, .section-title, .section-subtitle, .contact-links a").forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 70, rotateX: -7 }, { opacity: 1, y: 0, rotateX: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".chroma-title, .display-title, .project-card h2").forEach((element) => {
        gsap.to(element, { backgroundPosition: "140% 0", ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="webgl-hero-layer" aria-hidden="true">
      <PortfolioExperienceScene />
    </div>
  );
}
