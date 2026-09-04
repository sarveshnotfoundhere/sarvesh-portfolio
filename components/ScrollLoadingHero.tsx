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
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const progress = { value: 0 };
        const update = (value: number) => {
          const p = gsap.utils.clamp(0, 100, value);
          gsap.set(".loader-percent", { textContent: String(Math.round(p)).padStart(2, "0") });
          gsap.set(".loader-energy", { scaleX: p / 100 });
          gsap.set(".loader-ring-1", { rotation: p * 2.3 });
          gsap.set(".loader-ring-2", { rotation: -p * 1.7 });
          gsap.set(".loader-ring-3", { rotation: p * 3.4 });
          gsap.set(".loader-core", { rotation: p * 1.8, scale: 0.86 + p / 300 });
          gsap.set(".loader-mass", { rotation: p * 0.5, y: -p * 0.08 });
          gsap.set(".loader-grid", { xPercent: p * 0.02, yPercent: -p * 0.12 });
          gsap.set(".loader-noise", { opacity: 0.1 + p / 800 });
          stages.forEach((_, index) => gsap.set(`.loader-stage-${index}`, {
            opacity: p >= index * 20 + 6 ? 1 : 0.22,
            x: p >= index * 20 + 6 ? 0 : 16,
          }));
        };

        ScrollTrigger.create({
          trigger: host,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.12,
          invalidateOnRefresh: true,
          onUpdate: self => {
            progress.value = self.progress * 100;
            update(progress.value);
          },
        });

        const intro = gsap.timeline({
          scrollTrigger: { trigger: host, start: "top top", end: "34% top", scrub: true },
        });
        intro.to(".loader-intro", { yPercent: -18, opacity: 0.18, scale: 1.05 }, 0)
          .to(".loader-command", { y: -60, opacity: 0 }, 0)
          .to(".loader-final-title", { scale: 0.72, opacity: 0.12, yPercent: -12 }, 0);

        const outro = gsap.timeline({
          scrollTrigger: { trigger: host, start: "70% top", end: "100% top", scrub: true },
        });
        outro.to(".loader-final-title", { scale: 1.35, yPercent: -72, opacity: 0 }, 0)
          .to(".loader-mass", { scale: 2.4, opacity: 0 }, 0)
          .to(".loader-ui", { y: -24, opacity: 0 }, 0)
          .to(".loader-reveal", { scale: 18, opacity: 1, ease: "power2.in" }, 0.32)
          .to(".loader-ready", { autoAlpha: 1, scale: 1 }, 0.72);

        update(0);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, host);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" className="loader-track" aria-label="Scroll to enter portfolio">
      <div className="loader-stage-lock">
        <div className="loader-grid" aria-hidden="true" />
        <div className="loader-noise" aria-hidden="true" />
        <div className="loader-vignette" aria-hidden="true" />
        <div className="loader-scanbar" aria-hidden="true" />

        <div className="loader-ui loader-topbar"><span>SM / ENTRY ENGINE</span><span>SCROLL TO INITIALISE</span></div>
        <div className="loader-ui loader-command"><i /> MOVE THROUGH THE SEQUENCE</div>

        <div className="loader-intro">
          <p className="loader-eyebrow">PRIVATE PORTFOLIO INTERFACE · 01</p>
          <p className="loader-microcopy">The site does not exist yet. Your scroll constructs it.</p>
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

        <div className="loader-ready" aria-hidden="true">100<span>PORTFOLIO UNLOCKED</span></div>
        <div className="loader-reveal" aria-hidden="true" />
      </div>
    </section>
  );
}
