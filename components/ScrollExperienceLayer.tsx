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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-kicker, .hero-copy, .hero-meta",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );

      gsap.to(".hero-title", {
        yPercent: -24,
        scale: 0.88,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "65% top",
          scrub: 1.1,
        },
      });

      gsap.to(".hero-copy, .hero-meta", {
        y: -90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "18% top",
          end: "52% top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(
        ".section-kicker, .section-title, .section-subtitle, .about-card, .experience-item, .contact-links a"
      ).forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 70, rotateX: -8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      gsap.to(".about-grid", {
        y: -55,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".work-preview", {
        backgroundPosition: "50% 75%",
        ease: "none",
        scrollTrigger: {
          trigger: ".work-preview",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
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
