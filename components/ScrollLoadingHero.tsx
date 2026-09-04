"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { number: "01", label: "IDENTITY", copy: "Finding the signal behind the name." },
  { number: "02", label: "THINKING", copy: "Mapping finance, strategy and ideas." },
  { number: "03", label: "EXPERIENCE", copy: "Turning experience into momentum." },
  { number: "04", label: "CREATIVE", copy: "Making the invisible feel tangible." },
  { number: "05", label: "SARVESH", copy: "System ready. Scroll complete." },
];

export default function ScrollLoadingHero() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      const setProgress = (value: number) => {
        progress.value = value;
        const p = Math.round(value);
        gsap.set(".loader-percent", { textContent: String(p).padStart(2, "0") });
        gsap.set(".loader-fill", { scaleY: Math.max(0.01, value / 100) });
        gsap.set(".loader-ring", { rotate: value * 3.6 });
        gsap.set(".loader-core", { scale: 0.72 + value / 250, rotate: value * 1.4 });
        gsap.set(".loader-scan", { rotation: value * 7 });
        gsap.set(".loader-glow", { opacity: 0.16 + value / 240 });
        gsap.set(".loader-grid", { yPercent: -value * 0.22, rotate: value * 0.035 });
        gsap.set(".loader-word", { xPercent: -value * 0.7, skewX: -value * 0.018 });
        gsap.set(".loader-orbit-a", { rotation: value * 2.8 });
        gsap.set(".loader-orbit-b", { rotation: -value * 4.2 });
        gsap.set(".loader-orbit-c", { rotation: value * 6.4 });

        stages.forEach((stage, index) => {
          const threshold = index * 20;
          const active = value >= threshold + 6;
          gsap.set(`.loader-stage-${index}`, {
            opacity: active ? 1 : 0.25,
            x: active ? 0 : 18,
          });
        });
      };

      setProgress(0);

      gsap.to(progress, {
        value: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".loader-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          onUpdate: () => setProgress(progress.value),
        },
      });

      gsap.to(".loader-title", {
        yPercent: -18,
        scale: 0.72,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".loader-track",
          start: "top top",
          end: "72% top",
          scrub: 0.6,
        },
      });

      gsap.to(".loader-command", {
        y: -180,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".loader-track",
          start: "12% top",
          end: "48% top",
          scrub: 0.6,
        },
      });

      gsap.to(".loader-stage-stack", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".loader-track",
          start: "18% top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="loader-track" aria-label="Sarvesh interactive introduction">
      <div className="loader-sticky">
        <div className="loader-grid" aria-hidden="true" />
        <div className="loader-glow" aria-hidden="true" />

        <div className="loader-topline">
          <span>SCROLL / SYSTEM BOOT</span>
          <span>SM — 2026</span>
        </div>

        <div className="loader-command">
          <span className="loader-command-dot" />
          <span>PERSONAL PORTFOLIO ENGINE</span>
          <span className="loader-command-status">ONLINE</span>
        </div>

        <div className="loader-main">
          <div className="loader-copy">
            <p className="hero-kicker">ASPIRING FINANCE PROFESSIONAL · CHRIST UNIVERSITY</p>
            <h1 className="loader-title"><span>SARVESH</span><span className="loader-title-outline">M.</span></h1>
            <p className="loader-subcopy">Scroll to initialize the person behind the portfolio.</p>
          </div>

          <div className="loader-reactor" aria-hidden="true">
            <div className="loader-orbit loader-orbit-a"><span /></div>
            <div className="loader-orbit loader-orbit-b"><span /></div>
            <div className="loader-orbit loader-orbit-c"><span /></div>
            <div className="loader-scan" />
            <div className="loader-ring"><span /></div>
            <div className="loader-core"><b>SM</b></div>
            <div className="loader-particle particle-1" />
            <div className="loader-particle particle-2" />
            <div className="loader-particle particle-3" />
            <div className="loader-particle particle-4" />
          </div>

          <div className="loader-counter">
            <span className="loader-percent">00</span><span>%</span>
            <small>LOADING EXPERIENCE</small>
          </div>
        </div>

        <div className="loader-bottom">
          <div className="loader-meter" aria-hidden="true"><span className="loader-fill" /></div>
          <div className="loader-stage-stack">
            {stages.map((stage, index) => (
              <div className={`loader-stage loader-stage-${index}`} key={stage.number}>
                <span>{stage.number}</span>
                <strong>{stage.label}</strong>
                <small>{stage.copy}</small>
              </div>
            ))}
          </div>
          <div className="loader-scroll-note"><span className="scroll-line" /> KEEP SCROLLING</div>
        </div>
      </div>
    </section>
  );
}
