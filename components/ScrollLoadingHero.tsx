"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = ["SIGNAL", "FORM", "MOTION", "IDENTITY", "ACCESS"];

export default function ScrollLoadingHero() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const host = root.current;
    if (!host) return;

    const ctx = gsap.context(() => {
      const update = (value: number) => {
        const p = gsap.utils.clamp(0, 100, value);
        gsap.set(".loader-percent", { textContent: String(Math.round(p)).padStart(2, "0") });
        gsap.set(".loader-energy", { scaleX: p / 100 });
        gsap.set(".loader-ring-1", { rotation: p * 1.55 });
        gsap.set(".loader-ring-2", { rotation: -p * 1.05 });
        gsap.set(".loader-ring-3", { rotation: p * 2.1 });
        gsap.set(".loader-core", { rotation: p * 1.1, scale: 0.88 + p / 420 });
        gsap.set(".loader-mass", { rotation: p * 0.24, y: -p * 0.04, scale: 0.96 + p / 620 });
        gsap.set(".loader-grid", { xPercent: p * 0.012, yPercent: -p * 0.07 });
        gsap.set(".loader-noise", { opacity: 0.5 + p / 180 });
        stages.forEach((_, index) => gsap.set(`.loader-stage-${index}`, {
          opacity: p >= index * 20 + 5 ? 1 : 0.24,
          x: p >= index * 20 + 5 ? 0 : 10,
        }));
      };

      ScrollTrigger.create({
        trigger: host,
        start: "top top",
        end: "88% top",
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress * 100),
        onLeave: () => {
          gsap.to(".loader-percent", { textContent: "100", duration: 0.3 });
          gsap.to(".loader-ready", { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" });
          gsap.to(".loader-hold", { autoAlpha: 1, duration: 0.55, delay: 0.15 });
          gsap.to(".loader-hold", { autoAlpha: 0, duration: 0.75, delay: 2.45 });
        },
        onEnterBack: () => {
          gsap.set(".loader-ready", { autoAlpha: 0, scale: 0.92 });
          gsap.set(".loader-hold", { autoAlpha: 0 });
        },
      });

      const intro = gsap.timeline({
        scrollTrigger: { trigger: host, start: "top top", end: "32% top", scrub: 0.9 },
      });
      intro.to(".loader-intro", { yPercent: -12, opacity: 0.42, scale: 1.02 }, 0)
        .to(".loader-command", { y: -35, opacity: 0.2 }, 0)
        .to(".loader-final-title", { scale: 0.86, opacity: 0.22, yPercent: -7 }, 0);

      const finish = gsap.timeline({
        scrollTrigger: { trigger: host, start: "66% top", end: "88% top", scrub: 0.9 },
      });
      finish.to(".loader-final-title", { scale: 1.14, yPercent: -42, opacity: 0 }, 0)
        .to(".loader-mass", { scale: 1.55, opacity: 0.18 }, 0)
        .to(".loader-ui", { y: -12, opacity: 0.28 }, 0)
        .to(".loader-reveal", { scale: 14, opacity: 1, ease: "power2.inOut" }, 0.42);

      update(0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, host);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="loader-track" aria-label="Scroll to enter portfolio">
      <div className="loader-stage-lock">
        <div className="loader-grid" aria-hidden="true" />
        <div className="loader-noise" aria-hidden="true" />
        <div className="loader-vignette" aria-hidden="true" />
        <div className="loader-scanbar" aria-hidden="true" />

        <div className="loader-ui loader-topbar"><span>SM / ENTRY</span><span>SCROLL TO ENTER</span></div>
        <div className="loader-ui loader-command"><i /> BUILDING EXPERIENCE</div>

        <div className="loader-intro">
          <p className="loader-eyebrow">PORTFOLIO · ENTRY</p>
          <p className="loader-microcopy">Scroll slowly. Let it build.</p>
        </div>

        <div className="loader-mass" aria-hidden="true">
          <div className="loader-ring loader-ring-1"><span /></div>
          <div className="loader-ring loader-ring-2"><span /></div>
          <div className="loader-ring loader-ring-3"><span /></div>
          <div className="loader-ring loader-ring-4" />
          <div className="loader-core"><b>SM</b><small>BUILD</small></div>
          <div className="loader-orbit-label label-a">SIGNAL</div>
          <div className="loader-orbit-label label-b">FORM</div>
          <div className="loader-orbit-label label-c">MOTION</div>
        </div>

        <div className="loader-final-title"><span>SARVESH</span><em>M.</em></div>

        <div className="loader-ui loader-progress">
          <div className="loader-energy-track"><span className="loader-energy" /></div>
          <div className="loader-progress-number"><strong className="loader-percent">00</strong><i>%</i></div>
          <div className="loader-stage-list">
            {stages.map((stage, index) => <div className={`loader-stage loader-stage-${index}`} key={stage}><span>0{index + 1}</span><b>{stage}</b></div>)}
          </div>
          <span className="loader-scroll-hint">SCROLL TO BUILD ↓</span>
        </div>

        <div className="loader-ready" aria-hidden="true"><strong>100%</strong><span>READY</span></div>
        <div className="loader-hold" aria-hidden="true"><span>BREATHE</span><small>PORTFOLIO READY</small></div>
        <div className="loader-reveal" aria-hidden="true" />
      </div>
    </section>
  );
}
