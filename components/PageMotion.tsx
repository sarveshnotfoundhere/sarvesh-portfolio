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
      gsap.fromTo(".page-hero .section-kicker, .page-hero .display-title, .page-hero .lead-copy, .contact-hero .section-kicker, .contact-hero .display-title, .contact-hero .lead-copy", { autoAlpha: 0, y: 45 }, { autoAlpha: 1, y: 0, duration: 1, stagger: .08, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".story-section, .project-card, .contact-actions a").forEach(el => gsap.fromTo(el, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
      gsap.to(".display-title", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".page-hero, .contact-hero", start: "top top", end: "bottom top", scrub: 1.1 } });
      gsap.to(".mascot-layer", { y: -28, rotate: 2, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.5 } });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, { scope: root });

  return <div ref={root} className="motion-root">{children}</div>;
}
