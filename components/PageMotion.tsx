"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function PageMotion() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set("[data-reveal], [data-stagger] > *", { clearProps: "all" });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.fromTo(
            Array.from(group.children),
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        gsap.to(".hero-copy", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to(".hero-title", {
          scale: 0.82,
          yPercent: -16,
          opacity: 0.08,
          transformOrigin: "left top",
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-kicker", {
          yPercent: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "45% top",
            scrub: 0.8,
          },
        });

        const experience = document.querySelector<HTMLElement>("#experience");
        const experienceHeading = document.querySelector<HTMLElement>(".experience-sticky");
        if (experience && experienceHeading && window.innerWidth > 900) {
          ScrollTrigger.create({
            trigger: experience,
            start: "top 130px",
            end: "bottom bottom",
            pin: experienceHeading,
            pinSpacing: false,
            anticipatePin: 1,
          });
        }

        gsap.fromTo(
          ".experience-line",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".experience-timeline",
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.8,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".about-card").forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 55, rotateX: 8, opacity: 0 },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.75,
              delay: index * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }, root);

      return () => ctx.revert();
    },
    { scope: root },
  );

  return <div ref={root} className="motion-root" aria-hidden="true" />;
}
