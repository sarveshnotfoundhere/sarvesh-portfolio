"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioExperienceScene from "@/components/PortfolioExperienceScene";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperienceLayer() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap.fromTo(q(".hero-kicker, .hero-copy, .hero-meta"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );

      gsap.to(q(".hero-title"), {
        yPercent: -16,
        scale: 0.9,
        opacity: 0.26,
        ease: "none",
        scrollTrigger: {
          trigger: q(".hero"),
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(q(".hero-copy, .hero-meta, .hero-kicker"), {
        y: -90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: q(".hero"),
          start: "20% top",
          end: "58% top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(q(".section-kicker, .section-title, .section-subtitle, .about-card, .experience-item, .contact-links a"))
        .forEach((element, index) => {
          gsap.fromTo(element,
            { opacity: 0, y: 70, rotateX: -8 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              delay: (index % 5) * 0.03,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                end: "top 55%",
                scrub: 0.7,
              },
            }
          );
        });

      gsap.to(q(".about-grid"), {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: q("#about"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(q(".work-preview"), {
        backgroundPosition: "50% 75%",
        ease: "none",
        scrollTrigger: {
          trigger: q(".work-preview"),
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
    <div ref={root} className="portfolio-experience-root">
      <div className="webgl-hero-layer" aria-hidden="true">
        <PortfolioExperienceScene />
      </div>
    </div>
  );
}
