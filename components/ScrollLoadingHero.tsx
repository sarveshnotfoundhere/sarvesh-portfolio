"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  ["01", "IDENTITY", "signal detected"],
  ["02", "THINKING", "systems online"],
  ["03", "EXPERIENCE", "memory loaded"],
  ["04", "CREATIVE", "visual engine ready"],
  ["05", "SARVESH", "portfolio unlocked"],
];

export default function ScrollLoadingHero() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const ctx = gsap.context(() => {
        const progress = { value: 0 };
        const setProgress = (value: number) => {
          const p = Math.max(0, Math.min(100, value));
          progress.value = p;
          gsap.set(".loader-percent", { textContent: String(Math.round(p)).padStart(2, "0") });
          gsap.set(".loader-fill", { scaleY: p / 100 });
          gsap.set(".loader-orbit-a", { rotation: p * 3.6 });
          gsap.set(".loader-orbit-b", { rotation: -p * 5.2 });
          gsap.set(".loader-orbit-c", { rotation: p * 7.5 });
          gsap.set(".loader-core", { rotation: p * 2.4, scale: 0.82 + p / 280 });
          gsap.set(".loader-scan", { rotation: p * 9 });
          gsap.set(".loader-grid", { yPercent: -p * 0.24, rotate: p * 0.04 });
          gsap.set(".loader-glow", { opacity: 0.08 + p / 300 });
          stages.forEach((_, index) => {
            const active = p >= index * 20 + 8;
            gsap.set(`.loader-stage-${index}`, { opacity: active ? 1 : 0.22, x: active ? 0 : 14 });
          });
          gsap.set(".loader-ready", { opacity: p >= 99.5 ? 1 : 0, scale: p >= 99.5 ? 1 : 0.92 });
        };

        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress * 100),
        });

        gsap.to(".loader-title", {
          yPercent: -24,
          scale: 0.66,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "45% top", scrub: 0.2 },
        });
        gsap.to(".loader-command", {
          y: -140,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "5% top", end: "30% top", scrub: 0.2 },
        });
        gsap.to(".loader-stage-stack", {
          y: -90,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "10% top", end: "bottom top", scrub: 0.25 },
        });
        setProgress(0);
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => st.kill();
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" className="loader-track" aria-label="Interactive portfolio loading sequence">
      <div className="loader-sticky">
        <div className="loader-grid" aria-hidden="true" />
        <div className="loader-glow" aria-hidden="true" />
        <div className="loader-scanlines" aria-hidden="true" />

        <div className="loader-topline"><span>SM / PORTFOLIO SYSTEM</span><span>2000—2026</span></div>
        <div className="loader-command"><span className="loader-command-dot" /> SCROLL INPUT DETECTED <b>INITIALISING</b></div>

        <div className="loader-main">
          <div className="loader-copy">
            <p className="loader-kicker">PERSONAL IDENTITY INTERFACE</p>
            <h1 className="loader-title chroma-title"><span>SARVESH</span><i>M.</i></h1>
            <p className="loader-subcopy">The portfolio remains locked until the system reaches 100%.</p>
          </div>

          <div className="loader-reactor" aria-hidden="true">
            <div className="loader-orbit loader-orbit-a"><span /></div>
            <div className="loader-orbit loader-orbit-b"><span /></div>
            <div className="loader-orbit loader-orbit-c"><span /></div>
            <div className="loader-scan" />
            <div className="loader-core"><b>SM</b></div>
            <span className="loader-particle p1" /><span className="loader-particle p2" /><span className="loader-particle p3" /><span className="loader-particle p4" />
          </div>

          <div className="loader-counter"><span className="loader-percent">00</span><em>%</em><small>LOADING EXPERIENCE</small></div>
        </div>

        <div className="loader-bottom">
          <div className="loader-meter"><span className="loader-fill" /></div>
          <div className="loader-stage-stack">
            {stages.map(([number, label, copy], index) => (
              <div className={`loader-stage loader-stage-${index}`} key={number}>
                <span>{number}</span><strong>{label}</strong><small>{copy}</small>
              </div>
            ))}
          </div>
          <div className="loader-scroll-note"><span /> SCROLL TO LOAD</div>
        </div>

        <div className="loader-ready" aria-hidden="true">100% <b>SYSTEM READY</b></div>
      </div>
    </section>
  );
}
