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
        gsap.set(".loader-orbit-a", { rotation: value * 2.8 });
        gsap.set(".loader-orbit-b", { rotation: -value * 4.2 });
        gsap.set(".loader-orbit-c", { rotation: value * 6.4 });

        stages.forEach((stage, index) => {
          const threshold = index * 20;
          const active = value >= threshold + 6;
          gsap.set(`.loader-stage-${index}`, { opacity: active ? 1 : 0.25, x: active ? 0 : 18 });
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
        scrollTrigger: { trigger: ".loader-track", start: "top top", end: "72% top", scrub: 0.6 },
      });

      gsap.to(".loader-command", {
        y: -180,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".loader-track", start: "12% top", end: "48% top", scrub: 0.6 },
      });

      gsap.to(".loader-stage-stack", {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: ".loader-track", start: "18% top", end: "bottom top", scrub: 0.8 },
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

        <div className="loader-topline"><span>SCROLL / SYSTEM BOOT</span><span>SM — 2026</span></div>
        <div className="loader-command"><span className="loader-command-dot" /><span>PERSONAL PORTFOLIO ENGINE</span><span className="loader-command-status">ONLINE</span></div>

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
            <div className="loader-particle particle-1" /><div className="loader-particle particle-2" />
            <div className="loader-particle particle-3" /><div className="loader-particle particle-4" />
          </div>

          <div className="loader-counter"><span className="loader-percent">00</span><span>%</span><small>LOADING EXPERIENCE</small></div>
        </div>

        <div className="loader-bottom">
          <div className="loader-meter" aria-hidden="true"><span className="loader-fill" /></div>
          <div className="loader-stage-stack">
            {stages.map((stage, index) => (
              <div className={`loader-stage loader-stage-${index}`} key={stage.number}>
                <span>{stage.number}</span><strong>{stage.label}</strong><small>{stage.copy}</small>
              </div>
            ))}
          </div>
          <div className="loader-scroll-note"><span className="scroll-line" /> KEEP SCROLLING</div>
        </div>
      </div>

      <style jsx>{`
        .loader-track{position:relative;height:360vh;z-index:3}
        .loader-sticky{position:sticky;top:0;height:100vh;min-height:680px;overflow:hidden;padding:112px 28px 34px;background:radial-gradient(circle at 72% 48%,rgba(37,99,235,.12),transparent 25%),linear-gradient(135deg,rgba(0,4,13,.94),rgba(1,9,24,.78));isolation:isolate}
        .loader-grid{position:absolute;inset:-30%;background-image:linear-gradient(rgba(120,186,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(120,186,255,.055) 1px,transparent 1px);background-size:58px 58px;transform-origin:center;mask-image:radial-gradient(circle at 50% 50%,#000 0%,rgba(0,0,0,.8) 35%,transparent 72%);z-index:-3}
        .loader-glow{position:absolute;width:48vw;height:48vw;right:3vw;top:15vh;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,.3),rgba(30,64,175,.1) 35%,transparent 70%);filter:blur(20px);opacity:.16;z-index:-2}
        .loader-topline{position:absolute;top:108px;left:28px;right:28px;display:flex;justify-content:space-between;color:#60758d;font:600 10px Inter;letter-spacing:.22em}
        .loader-command{position:absolute;top:154px;left:28px;display:flex;align-items:center;gap:10px;color:#9db3cc;font:600 10px Inter;letter-spacing:.2em}
        .loader-command-dot{width:6px;height:6px;border-radius:50%;background:#9bd0ff;box-shadow:0 0 16px #78baff;animation:loaderPulse 1.1s infinite}
        .loader-command-status{margin-left:10px;color:#79baff}
        .loader-main{width:min(1180px,100%);height:68%;margin:auto;display:flex;align-items:center;position:relative}
        .loader-copy{position:relative;z-index:4;width:62%}
        .loader-copy .hero-kicker{margin:0;color:#89a4c0}
        .loader-title{margin:18px 0 0;font:800 clamp(78px,13vw,190px)/.78 Manrope;letter-spacing:-.075em;text-shadow:0 0 80px rgba(30,100,220,.22);transform-origin:left center}
        .loader-title-outline{display:block;color:transparent;-webkit-text-stroke:1px rgba(191,219,254,.5)}
        .loader-subcopy{margin:34px 0 0;max-width:390px;color:#8296ae;font-size:14px;line-height:1.7}
        .loader-reactor{position:absolute;right:4%;top:50%;width:min(43vw,530px);aspect-ratio:1;transform:translateY(-50%);z-index:2}
        .loader-orbit,.loader-ring{position:absolute;inset:5%;border:1px solid rgba(125,183,255,.18);border-radius:50%;transform-origin:center}
        .loader-orbit span,.loader-ring span{position:absolute;width:9px;height:9px;border-radius:50%;background:#cde8ff;box-shadow:0 0 25px rgba(125,183,255,.9);top:-4px;left:50%}
        .loader-orbit-a{inset:2%;border-style:dashed}.loader-orbit-b{inset:14%;border-color:rgba(125,183,255,.13);transform:rotate(28deg) scaleY(.62)}.loader-orbit-c{inset:26%;border-color:rgba(125,183,255,.2);transform:rotate(-34deg) scaleY(.55)}
        .loader-ring{inset:17%;border:2px solid transparent;border-top-color:#9bd0ff;border-right-color:rgba(125,183,255,.22);box-shadow:inset 0 0 50px rgba(37,99,235,.1),0 0 50px rgba(37,99,235,.12)}
        .loader-ring span{top:auto;bottom:-5px;left:18%;width:6px;height:6px}
        .loader-scan{position:absolute;left:50%;top:50%;width:50%;height:1px;transform-origin:left center;background:linear-gradient(90deg,rgba(155,208,255,.9),transparent);box-shadow:0 0 14px rgba(120,186,255,.7)}
        .loader-core{position:absolute;left:50%;top:50%;width:25%;aspect-ratio:1;transform:translate(-50%,-50%);display:grid;place-items:center;border-radius:50%;background:radial-gradient(circle at 38% 32%,#dff2ff 0%,#78baff 13%,#174ea6 43%,#020b1f 72%);border:1px solid rgba(200,230,255,.8);box-shadow:0 0 60px rgba(37,99,235,.55),inset 0 0 30px rgba(255,255,255,.18)}
        .loader-core:before{content:"";position:absolute;inset:-15%;border:1px solid rgba(125,183,255,.28);border-radius:50%;animation:loaderSpin 5s linear infinite}
        .loader-core b{font:800 clamp(18px,2.5vw,34px) Manrope;letter-spacing:-.08em;color:#041126}
        .loader-particle{position:absolute;width:4px;height:4px;border-radius:50%;background:#bfe1ff;box-shadow:0 0 18px #78baff}.particle-1{left:12%;top:27%}.particle-2{right:9%;top:37%}.particle-3{right:22%;bottom:12%}.particle-4{left:28%;bottom:7%}
        .loader-counter{position:absolute;right:0;bottom:2%;z-index:5;display:grid;grid-template-columns:auto auto;align-items:start;font:800 clamp(52px,8vw,104px)/.8 Manrope;letter-spacing:-.08em;color:#dbeafe}.loader-counter small{grid-column:1/-1;margin-top:10px;font:600 9px Inter;letter-spacing:.2em;color:#627994}
        .loader-bottom{position:absolute;left:28px;right:28px;bottom:30px;z-index:6}.loader-meter{position:absolute;left:0;bottom:0;width:2px;height:118px;background:rgba(148,163,184,.13);overflow:hidden}.loader-fill{position:absolute;left:0;bottom:0;width:100%;height:100%;transform-origin:bottom;background:linear-gradient(#cbe8ff,#4c9dff);box-shadow:0 0 18px rgba(120,186,255,.6)}
        .loader-stage-stack{margin-left:28px;width:min(430px,48vw);display:grid;gap:8px}.loader-stage{display:grid;grid-template-columns:30px 110px 1fr;gap:12px;align-items:baseline;padding:7px 0;border-bottom:1px solid rgba(148,163,184,.07);transition:opacity .2s}.loader-stage span{font:600 9px Inter;color:#5f7894}.loader-stage strong{font:800 11px Manrope;letter-spacing:.12em}.loader-stage small{color:#657b94;font-size:10px;line-height:1.4}.loader-scroll-note{position:absolute;right:0;bottom:0;display:flex;align-items:center;gap:12px;color:#71869f;font:600 9px Inter;letter-spacing:.2em}
        @keyframes loaderSpin{to{transform:rotate(360deg)}}@keyframes loaderPulse{50%{opacity:.35;transform:scale(.6);box-shadow:0 0 5px #78baff}}
        @media (max-width:900px){.loader-track{height:300vh}.loader-sticky{min-height:620px;padding:100px 20px 26px}.loader-topline{top:96px;left:20px;right:20px}.loader-command{top:137px;left:20px}.loader-main{height:72%;align-items:flex-start;padding-top:100px}.loader-copy{width:100%}.loader-title{font-size:clamp(66px,18vw,120px)}.loader-subcopy{max-width:290px}.loader-reactor{width:70vw;right:-18%;top:54%}.loader-counter{right:4px;bottom:7%;font-size:54px}.loader-stage-stack{width:calc(100% - 28px);max-width:390px}.loader-stage{grid-template-columns:25px 90px 1fr}.loader-stage small{font-size:9px}.loader-scroll-note{display:none}.loader-bottom{left:20px;right:20px}.loader-meter{height:92px}}
        @media (prefers-reduced-motion:reduce){.loader-core:before,.loader-command-dot{animation:none}.loader-track{height:100vh}.loader-sticky{position:relative}.loader-grid,.loader-glow{transform:none!important}.loader-stage{opacity:1!important;transform:none!important}}
      `}</style>
    </section>
  );
}
