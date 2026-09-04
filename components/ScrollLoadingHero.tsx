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
        gsap.set(".loader-ring-1", { rotation: p * 2.3 });
        gsap.set(".loader-ring-2", { rotation: -p * 1.7 });
        gsap.set(".loader-ring-3", { rotation: p * 3.4 });
        gsap.set(".loader-core", { rotation: p * 1.8, scale: 0.84 + p / 330 });
        gsap.set(".loader-mass", { rotation: p * 0.42, y: -p * 0.06, scale: 0.92 + p / 520 });
        gsap.set(".loader-grid", { xPercent: p * 0.02, yPercent: -p * 0.12 });
        gsap.set(".loader-noise", { opacity: 0.1 + p / 800 });
        stages.forEach((_, index) => gsap.set(`.loader-stage-${index}`, {
          opacity: p >= index * 20 + 6 ? 1 : 0.2,
          x: p >= index * 20 + 6 ? 0 : 16,
        }));
      };

      // The final 12% is an intentional visual hold: users must see the
      // interface reach 100% and breathe before the portfolio is revealed.
      ScrollTrigger.create({
        trigger: host,
        start: "top top",
        end: "88% top",
        scrub: 0.18,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress * 100),
        onLeave: () => {
          gsap.to(".loader-percent", { textContent: "100", duration: 0.2 });
          gsap.to(".loader-ready", { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out" });
          gsap.to(".loader-hold", { autoAlpha: 1, duration: 0.35, delay: 0.08 });
          gsap.to(".loader-hold", { autoAlpha: 0, duration: 0.5, delay: 1.8 });
        },
        onEnterBack: () => {
          gsap.set(".loader-ready", { autoAlpha: 0, scale: 0.92 });
          gsap.set(".loader-hold", { autoAlpha: 0 });
        },
      });

      const intro = gsap.timeline({
        scrollTrigger: { trigger: host, start: "top top", end: "34% top", scrub: true },
      });
      intro.to(".loader-intro", { yPercent: -18, opacity: 0.16, scale: 1.04 }, 0)
        .to(".loader-command", { y: -60, opacity: 0 }, 0)
        .to(".loader-final-title", { scale: 0.7, opacity: 0.1, yPercent: -12 }, 0);

      const finish = gsap.timeline({
        scrollTrigger: { trigger: host, start: "70% top", end: "88% top", scrub: true },
      });
      finish.to(".loader-final-title", { scale: 1.28, yPercent: -62, opacity: 0 }, 0)
        .to(".loader-mass", { scale: 2.25, opacity: 0.28 }, 0)
        .to(".loader-ui", { y: -20, opacity: 0.18 }, 0)
        .to(".loader-reveal", { scale: 16, opacity: 1, ease: "power2.in" }, 0.28);

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
          <p className="loader-microcopy">Scroll to reveal the site.</p>
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
        <div className="loader-hold" aria-hidden="true"><span>PAUSE</span><small>PORTFOLIO READY</small></div>
        <div className="loader-reveal" aria-hidden="true" />
      </div>
    </section>
  );
}
