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
      let raf = 0;
      const watchDirection = () => {
        const y = window.scrollY;
        const goingUp = y < lastY - 2;
        document.body.classList.toggle("is-scrolling-up", goingUp);
        document.body.classList.toggle("is-scrolling-down", y > lastY + 2);
        lastY = y;
        raf = requestAnimationFrame(watchDirection);
      };
      raf = requestAnimationFrame(watchDirection);

      gsap.fromTo(
        ".page-hero .section-kicker, .page-hero .display-title, .page-hero .lead-copy, .contact-hero .section-kicker, .contact-hero .display-title, .contact-hero .lead-copy",
        { autoAlpha: 0, y: 70, rotateX: 8 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.05, stagger: 0.08, ease: "power4.out" }
      );

      gsap.utils.toArray<HTMLElement>(".about-section, .experience-section, .work-preview, .contact-section, .story-section").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "top 40%", scrub: 1.2 } });
      });

      gsap.utils.toArray<HTMLElement>(".project-card, .principle, .experience-item, .about-card, .contact-actions a").forEach((el, i) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 45, x: i % 2 ? 12 : -12 }, { autoAlpha: 1, y: 0, x: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 96%", end: "top 58%", scrub: 1.25 } });
      });

      gsap.utils.toArray<HTMLElement>(".section-title, .display-title").forEach((el) => {
        gsap.fromTo(el, { y: 18, opacity: .45 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 55%", scrub: 1.2 } });
      });

      gsap.to(".display-title", { yPercent: -8, rotateZ: -.3, ease: "none", scrollTrigger: { trigger: ".page-hero, .contact-hero", start: "top top", end: "bottom top", scrub: 2 } });
      gsap.to(".mascot-layer", { y: -45, rotate: 3, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 2 } });

      const topButton = document.querySelector<HTMLElement>(".goto-top");
      if (topButton) {
        gsap.set(topButton, { autoAlpha: 0, y: 30, scale: .9 });
        ScrollTrigger.create({
          start: "top -18%",
          end: "max",
          onEnter: () => gsap.to(topButton, { autoAlpha: 1, y: 0, scale: 1, duration: .7, ease: "back.out(1.7)", overwrite: true }),
          onLeaveBack: () => gsap.to(topButton, { autoAlpha: 0, y: 30, scale: .9, duration: .45, ease: "power2.in", overwrite: true }),
        });
      }

      window.addEventListener("resize", refresh);
      refresh();
      return () => { window.removeEventListener("resize", refresh); cancelAnimationFrame(raf); };
    }, root);
    return () => ctx.revert();
  }, { scope: root });

  return <div ref={root} className="motion-root">{children}</div>;
}
