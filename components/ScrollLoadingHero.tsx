"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NUMBERS = [
  [7, "3 + 4 = 07"], [13, "2² + 9 = 13"], [21, "3 × 7 = 21"], [34, "13 + 21 = 34"],
  [42, "6 × 7 = 42"], [55, "100 − 45 = 55"], [64, "8² = 64"], [73, "81 − 8 = 73"],
  [89, "144 − 55 = 89"], [100, "10 × 10 = 100"],
] as const;

export default function ScrollLoadingHero() {
  const root = useRef<HTMLElement | null>(null);
  const entered = useRef(false);

  useLayoutEffect(() => {
    const host = root.current;
    if (!host) return;

    const alreadyEntered = sessionStorage.getItem("sarvesh-portfolio-entered") === "1";
    if (alreadyEntered) {
      document.body.classList.add("site-entered");
      host.classList.add("loader-already-entered");
      entered.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      const setProgress = (progress: number) => {
        const p = gsap.utils.clamp(0, 100, progress);
        gsap.set(".loader-percent", { textContent: String(Math.round(p)).padStart(2, "0") });
        gsap.set(".loader-bar", { scaleX: p / 100 });
        gsap.set(".loader-number", { y: `${(1 - p / 100) * 80}px` });
        NUMBERS.forEach(([number], index) => {
          const threshold = (index / (NUMBERS.length - 1)) * 82;
          const active = p >= threshold;
          gsap.set(`.loader-number-${index}`, {
            autoAlpha: active ? 1 : 0.08,
            scale: active ? 1 : 0.88,
            x: active ? 0 : 24,
          });
        });
      };

      ScrollTrigger.create({
        trigger: host,
        start: "top top",
        end: "82% top",
        scrub: 0.9,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress * 100),
      });

      gsap.to(".loader-number-column", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: host, start: "top top", end: "82% top", scrub: 1.15 },
      });

      gsap.fromTo(".loader-title", { y: 40, opacity: 0.2 }, {
        y: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: host, start: "top top", end: "18% top", scrub: 0.8 },
      });

      gsap.to(".loader-title", {
        scale: 0.82, opacity: 0.18,
        scrollTrigger: { trigger: host, start: "42% top", end: "78% top", scrub: 1 },
      });

      gsap.to(".loader-hold", {
        autoAlpha: 1,
        scrollTrigger: { trigger: host, start: "82% top", end: "88% top", scrub: 0.35 },
      });

      // A genuine visual pause after 100%: the hold zone occupies the final
      // 12% of the loading track while the page itself remains locked.
      gsap.to(".loader-hold", {
        autoAlpha: 1,
        scrollTrigger: { trigger: host, start: "88% top", end: "96% top", scrub: false },
      });

      ScrollTrigger.create({
        trigger: host,
        start: "98% top",
        end: "max",
        onEnter: () => {
          if (entered.current) return;
          entered.current = true;
          sessionStorage.setItem("sarvesh-portfolio-entered", "1");
          document.body.classList.add("site-entered");
          window.dispatchEvent(new Event("portfolio:entered"));
        },
        onEnterBack: () => {
          entered.current = false;
          document.body.classList.remove("site-entered");
          sessionStorage.removeItem("sarvesh-portfolio-entered");
          window.dispatchEvent(new Event("portfolio:loading"));
        },
      });

      setProgress(0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, host);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="loader-track" aria-label="Scroll to enter portfolio">
      <div className="loader-stage-lock">
        <div className="loader-grain" aria-hidden="true" />
        <div className="loader-rule loader-rule-top" aria-hidden="true" />
        <div className="loader-rule loader-rule-bottom" aria-hidden="true" />
        <div className="loader-topbar"><span>SM</span><span>PORTFOLIO / 001</span></div>
        <div className="loader-title"><span>SCROLL</span><em>DOWN.</em></div>
        <p className="loader-subtitle">A little space before the work.</p>

        <div className="loader-number-column" aria-hidden="true">
          {NUMBERS.map(([number, formula], index) => (
            <div className={`loader-number loader-number-${index}`} key={number}>
              <span>{String(number).padStart(3, "0")}</span>
              <small>{formula}</small>
            </div>
          ))}
        </div>

        <div className="loader-percent-wrap"><strong className="loader-percent">00</strong><span>%</span></div>
        <div className="loader-progress-track"><span className="loader-bar" /></div>
        <div className="loader-footer"><span>BUILDING / SARVESH M.</span><span>KEEP SCROLLING ↓</span></div>

        <div className="loader-hold" aria-hidden="true">
          <span className="hold-percent">100</span>
          <small>LOADED · TAKE A BREATH</small>
        </div>
      </div>
    </section>
  );
}
