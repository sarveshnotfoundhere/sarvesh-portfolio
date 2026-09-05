"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

const EMBER_SEEDS = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: 4 + ((index * 17) % 92),
  top: 7 + ((index * 29) % 86),
  size: 9 + ((index * 5) % 9),
  duration: 12 + (index % 7) * 1.6,
  delay: -(index * 0.9),
  driftX: ((index % 7) - 3) * 54,
  driftY: ((index % 9) - 4) * 46,
  tilt: (index * 23) % 150 - 75,
}));

function EmberField() {
  const [dark, setDark] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    return () => document.body.classList.remove("dark-mode");
  }, [dark]);

  return (
    <div className="ember-field" aria-label="Interactive color controls">
      <style jsx global>{`
        .ember-field{isolation:isolate}
        .ember-wrap{
          transform-origin:50% 50%;
          animation:emberFloat 15s ease-in-out infinite alternate;
          animation-delay:var(--ember-delay);
          will-change:transform;
          z-index:1;
        }
        .ember{
          position:relative!important;
          display:block!important;
          border:1px solid rgba(230,248,255,.86)!important;
          clip-path:polygon(5% 53%,18% 12%,63% 2%,97% 32%,78% 94%,28% 84%);
          background:
            linear-gradient(132deg,rgba(255,255,255,.92) 0 9%,rgba(255,255,255,.22) 18%,rgba(142,216,255,.16) 36%,rgba(255,142,56,.5) 62%,rgba(255,74,12,.9) 100%),
            linear-gradient(35deg,rgba(83,178,255,.28),transparent 55%),
            linear-gradient(125deg,rgba(255,255,255,.34),transparent 45%)!important;
          box-shadow:
            inset 1px 1px 0 rgba(255,255,255,.95),
            inset -1px -2px 0 rgba(20,45,72,.3),
            inset 0 0 7px rgba(255,255,255,.4),
            0 2px 6px rgba(4,18,34,.48),
            0 0 9px rgba(118,214,255,.5),
            0 0 22px rgba(255,117,31,.32)!important;
          backdrop-filter:blur(8px) saturate(1.4)!important;
          -webkit-backdrop-filter:blur(8px) saturate(1.4)!important;
          opacity:.82;
          cursor:pointer;
          transition:transform .28s cubic-bezier(.16,1,.3,1),filter .28s ease,box-shadow .28s ease,opacity .28s ease!important;
        }
        .ember:before{
          content:"";
          position:absolute;
          left:12%;top:10%;
          width:64%;height:18%;
          background:linear-gradient(90deg,rgba(255,255,255,.98),rgba(255,255,255,.12));
          transform:rotate(-19deg);
          filter:blur(.6px);
          opacity:.8;
          pointer-events:none;
        }
        .ember:after{
          content:"";
          position:absolute;
          inset:-8px;
          background:radial-gradient(circle,rgba(129,219,255,.16) 0 25%,rgba(255,117,31,.18) 44%,transparent 72%);
          filter:blur(6px);
          z-index:-1;
          pointer-events:none;
        }
        .ember-wrap:hover{z-index:50}
        .ember-wrap:hover .ember{
          transform:rotate(calc(var(--ember-rot) + 10deg)) scale(1.65) translate3d(3px,-2px,0)!important;
          filter:brightness(1.34) saturate(1.18)!important;
          opacity:1;
          box-shadow:
            inset 1px 1px 0 rgba(255,255,255,1),
            inset -1px -2px 0 rgba(12,31,54,.24),
            inset 0 0 10px rgba(255,255,255,.56),
            0 4px 10px rgba(3,15,29,.6),
            0 0 12px rgba(172,235,255,.9),
            0 0 32px rgba(255,117,31,.66)!important;
        }
        .ember-tooltip{left:18px!important;bottom:18px!important}
        .ember-wrap:hover .ember-tooltip{transform:translateY(0) translateX(2px)!important}
        @keyframes emberFloat{
          0%{transform:translate3d(0,0,0) rotate(calc(var(--ember-rot) - 9deg))}
          20%{transform:translate3d(var(--ember-x1),var(--ember-y1),0) rotate(calc(var(--ember-rot) + 4deg))}
          42%{transform:translate3d(var(--ember-x2),var(--ember-y2),0) rotate(calc(var(--ember-rot) - 5deg))}
          68%{transform:translate3d(var(--ember-x3),var(--ember-y3),0) rotate(calc(var(--ember-rot) + 7deg))}
          84%{transform:translate3d(var(--ember-x4),var(--ember-y4),0) rotate(calc(var(--ember-rot) - 3deg))}
          100%{transform:translate3d(0,0,0) rotate(calc(var(--ember-rot) + 9deg))}
        }
        body.dark-mode .ember{filter:brightness(.98) saturate(1.1)}
      `}</style>
      {EMBER_SEEDS.map((ember) => {
        const drift = {
          ["--ember-x1"]: `${ember.driftX * 0.55}px`,
          ["--ember-y1"]: `${ember.driftY * -0.4}px`,
          ["--ember-x2"]: `${ember.driftX * -0.75}px`,
          ["--ember-y2"]: `${ember.driftY * 0.65}px`,
          ["--ember-x3"]: `${ember.driftX * 0.85}px`,
          ["--ember-y3"]: `${ember.driftY * -0.7}px`,
          ["--ember-x4"]: `${ember.driftX * -0.45}px`,
          ["--ember-y4"]: `${ember.driftY * -0.9}px`,
        };

        return (
          <span
            key={ember.id}
            className="ember-wrap"
            style={{
              left: `${ember.left}%`,
              top: `${ember.top}%`,
              animationDuration: `${ember.duration}s`,
              ["--ember-delay"]: `${ember.delay}s`,
              ...drift,
            } as React.CSSProperties}
          >
            <button
              className="ember"
              type="button"
              onClick={() => setDark((value) => !value)}
              onMouseEnter={() => setHovered(ember.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              data-cursor="view"
              data-cursor-label="SWITCH"
              style={{
                width: `${ember.size}px`,
                height: `${Math.max(ember.size * 0.58, 6)}px`,
                ["--ember-rot"]: `${ember.tilt}deg`,
              } as React.CSSProperties}
            />
            <span className={`ember-tooltip ${hovered === ember.id ? "is-visible" : ""}`} role="status">
              {dark ? "Click for light mode." : "Click for dark mode."}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function SiteChrome() {
  const pathname = usePathname();
  const [entered, setEntered] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setEntered(true);
      return;
    }

    const sync = () => setEntered(document.body.classList.contains("site-entered"));
    sync();
    window.addEventListener("portfolio:entered", sync);
    window.addEventListener("portfolio:loading", sync);
    return () => {
      window.removeEventListener("portfolio:entered", sync);
      window.removeEventListener("portfolio:loading", sync);
    };
  }, [pathname]);

  return <>
    <PortfolioCursor />
    <PortfolioMascot />
    <EmberField />
    <header className={`nav-wrap ${entered ? "nav-visible" : "nav-hidden"}`}>
      <nav className="nav" aria-label="Primary navigation">
        <Link className="brand" href="/" data-cursor="home" data-cursor-label="HOME">SM</Link>
        <div className="nav-links"><Link href="/about">ABOUT</Link><Link href="/experience">EXPERIENCE</Link><Link href="/work">WORK</Link><Link href="/contact">CONTACT</Link></div>
        <Link className="nav-cta" href="/contact" data-cursor="view" data-cursor-label="TALK">LET&apos;S TALK ↗</Link>
      </nav>
    </header>
  </>;
}
