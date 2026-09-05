"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

const EMBER_SEEDS = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: 3 + ((index * 37) % 94),
  top: 5 + ((index * 53) % 90),
  size: 8 + ((index * 11) % 10),
  duration: 18 + (index % 8) * 2.25,
  delay: -(index * 1.35),
  x: ((index * 29) % 130) - 65,
  y: ((index * 41) % 120) - 60,
  rot: ((index * 31) % 170) - 85,
  scale: 0.72 + ((index * 7) % 28) / 100,
}));

function EmberField() {
  const [dark, setDark] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const seedStyles = useMemo(() => EMBER_SEEDS.map((ember) => ({
    left: `${ember.left}%`,
    top: `${ember.top}%`,
    width: `${ember.size}px`,
    height: `${Math.max(ember.size * 0.56, 5)}px`,
    ["--ember-duration"]: `${ember.duration}s`,
    ["--ember-delay"]: `${ember.delay}s`,
    ["--ember-x"]: `${ember.x}px`,
    ["--ember-y"]: `${ember.y}px`,
    ["--ember-rot"]: `${ember.rot}deg`,
    ["--ember-scale"]: ember.scale,
  } as React.CSSProperties)), []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    return () => document.body.classList.remove("dark-mode");
  }, [dark]);

  return (
    <div className="ember-field" aria-label="Interactive color controls">
      <style jsx global>{`
        .ember-field{
          isolation:isolate;
          pointer-events:none;
        }
        .ember-wrap{
          position:absolute;
          display:grid;
          place-items:center;
          pointer-events:auto;
          transform-origin:50% 50%;
          animation:emberFloat var(--ember-duration) cubic-bezier(.45,.05,.55,.95) infinite;
          animation-delay:var(--ember-delay);
          will-change:transform;
          z-index:2;
        }
        .ember{
          position:relative!important;
          display:block!important;
          padding:0!important;
          border:1px solid rgba(237,249,255,.9)!important;
          clip-path:polygon(0 53%,17% 11%,65% 0,100% 30%,78% 100%,27% 86%);
          overflow:visible!important;
          opacity:.9;
          cursor:pointer;
          transform:rotate(var(--ember-rot)) scale(var(--ember-scale));
          background:
            linear-gradient(132deg,rgba(255,255,255,.96) 0 7%,rgba(210,243,255,.42) 9%,rgba(107,186,255,.13) 30%,rgba(255,255,255,.03) 46%,rgba(255,147,67,.56) 68%,rgba(255,79,18,.76) 100%)!important;
          box-shadow:
            inset 1px 1px 0 rgba(255,255,255,.98),
            inset -1px -2px 0 rgba(9,31,53,.34),
            inset 0 0 5px rgba(225,248,255,.35),
            0 2px 7px rgba(1,13,26,.72),
            0 0 7px rgba(154,224,255,.42),
            0 0 18px rgba(255,115,31,.28)!important;
          backdrop-filter:blur(5px) saturate(1.25)!important;
          -webkit-backdrop-filter:blur(5px) saturate(1.25)!important;
          transition:transform .38s cubic-bezier(.16,1,.3,1),filter .38s ease,opacity .38s ease,box-shadow .38s ease!important;
        }
        .ember:before{
          content:"";
          position:absolute;
          left:11%;
          top:8%;
          width:70%;
          height:14%;
          background:linear-gradient(90deg,rgba(255,255,255,.98),rgba(255,255,255,.12) 72%,transparent);
          transform:rotate(-18deg);
          filter:blur(.45px);
          opacity:.9;
          pointer-events:none;
        }
        .ember:after{
          content:"";
          position:absolute;
          inset:-5px;
          background:
            radial-gradient(circle at 62% 45%,rgba(187,232,255,.28),transparent 38%),
            radial-gradient(circle at 72% 52%,rgba(255,104,24,.25),transparent 68%);
          filter:blur(4px);
          z-index:-1;
          pointer-events:none;
        }
        .ember-wrap:hover{
          z-index:60;
        }
        .ember-wrap:hover .ember{
          transform:rotate(calc(var(--ember-rot) + 18deg)) scale(1.55)!important;
          filter:brightness(1.42) saturate(1.22)!important;
          opacity:1;
          box-shadow:
            inset 1px 1px 0 rgba(255,255,255,1),
            inset -1px -2px 0 rgba(8,27,48,.23),
            inset 0 0 8px rgba(255,255,255,.54),
            0 4px 10px rgba(0,11,24,.8),
            0 0 11px rgba(193,239,255,.95),
            0 0 30px rgba(255,119,31,.72)!important;
        }
        .ember-tooltip{left:16px!important;bottom:16px!important}
        .ember-wrap:hover .ember-tooltip{transform:translateY(0) translateX(2px)!important}
        body.dark-mode .ember{filter:saturate(1.12)}
        @keyframes emberFloat{
          0%{transform:translate3d(0,0,0) rotate(0deg)}
          18%{transform:translate3d(calc(var(--ember-x) * -.18),calc(var(--ember-y) * .72),0) rotate(17deg)}
          37%{transform:translate3d(calc(var(--ember-x) * .76),calc(var(--ember-y) * -.3),0) rotate(-21deg)}
          58%{transform:translate3d(calc(var(--ember-x) * -.42),calc(var(--ember-y) * -.88),0) rotate(12deg)}
          77%{transform:translate3d(calc(var(--ember-x) * .66),calc(var(--ember-y) * .35),0) rotate(-16deg)}
          100%{transform:translate3d(0,0,0) rotate(0deg)}
        }
        @media (max-width:700px){
          .ember-field{opacity:.86}
          .ember-wrap:hover .ember{transform:rotate(calc(var(--ember-rot) + 16deg)) scale(1.35)!important}
        }
      `}</style>
      {EMBER_SEEDS.map((ember, index) => (
        <span key={ember.id} className="ember-wrap" style={seedStyles[index]}>
          <button
            className="ember"
            type="button"
            onClick={() => setDark((value) => !value)}
            onMouseEnter={() => setHovered(ember.id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            data-cursor="view"
            data-cursor-label="SWITCH"
          />
          <span className={`ember-tooltip ${hovered === ember.id ? "is-visible" : ""}`} role="status">
            {dark ? "Click for light mode." : "Click for dark mode."}
          </span>
        </span>
      ))}
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
