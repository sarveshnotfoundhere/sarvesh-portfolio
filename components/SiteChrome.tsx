"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

const EMBER_SEEDS = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: 5 + ((index * 17) % 88),
  top: 10 + ((index * 29) % 78),
  size: 18 + ((index * 9) % 18),
  radius: 38 + ((index * 17) % 38),
  duration: 9 + (index % 8),
  delay: -(index * 0.8),
  driftX: ((index % 5) - 2) * 38,
  driftY: ((index % 7) - 3) * 42,
  tilt: (index * 19) % 70 - 35,
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
        .ember-field { isolation:isolate; }
        .ember-wrap {
          transform-origin:center;
          filter:drop-shadow(0 0 12px rgba(255,120,20,.26));
        }
        .ember {
          position:relative!important;
          display:block!important;
          border:1px solid rgba(255,242,215,.76)!important;
          border-top-color:rgba(255,255,255,.95)!important;
          border-left-color:rgba(255,255,255,.62)!important;
          background:
            linear-gradient(145deg,rgba(255,255,255,.78),rgba(255,255,255,.08) 24%,transparent 25%),
            linear-gradient(115deg,rgba(255,255,255,.2),transparent 42%),
            linear-gradient(135deg,#fff5d0 0%,#ffbd73 22%,#ff7a18 58%,#c93400 100%)!important;
          box-shadow:
            inset 2px 2px 0 rgba(255,255,255,.72),
            inset -2px -2px 0 rgba(94,20,0,.16),
            inset 0 0 14px rgba(255,255,255,.22),
            0 0 8px rgba(255,190,110,.75),
            0 0 24px rgba(255,100,10,.42),
            0 0 56px rgba(255,55,0,.17)!important;
          backdrop-filter:blur(7px) saturate(1.35)!important;
          -webkit-backdrop-filter:blur(7px) saturate(1.35)!important;
          overflow:visible!important;
          cursor:pointer;
          animation:emberShardPulse var(--ember-speed,6s) ease-in-out infinite;
          transition:transform .35s cubic-bezier(.16,1,.3,1),filter .35s ease,box-shadow .35s ease!important;
        }
        .ember:before {
          content:"";
          position:absolute;
          width:48%;
          height:24%;
          left:12%;
          top:11%;
          border-radius:999px;
          background:linear-gradient(90deg,rgba(255,255,255,.92),rgba(255,255,255,0));
          filter:blur(1px);
          transform:rotate(-18deg);
          opacity:.8;
          pointer-events:none;
        }
        .ember:after {
          content:"";
          position:absolute;
          inset:-12px;
          border-radius:inherit;
          background:radial-gradient(circle,rgba(255,119,25,.32),transparent 66%);
          filter:blur(7px);
          opacity:.7;
          z-index:-1;
          pointer-events:none;
        }
        .ember-wrap:hover { z-index:30; }
        .ember-wrap:hover .ember {
          transform:rotate(calc(var(--ember-rot,0deg) + 14deg)) scale(1.42)!important;
          filter:brightness(1.22) saturate(1.32)!important;
          box-shadow:
            inset 2px 2px 0 rgba(255,255,255,.9),
            inset -2px -2px 0 rgba(94,20,0,.14),
            inset 0 0 20px rgba(255,255,255,.34),
            0 0 10px rgba(255,245,215,1),
            0 0 30px rgba(255,130,40,1),
            0 0 72px rgba(255,72,0,.4)!important;
        }
        .ember-tooltip {
          left:24px!important;
          bottom:24px!important;
          border-color:rgba(255,132,44,.42)!important;
          box-shadow:0 10px 38px rgba(255,90,0,.13),0 16px 36px rgba(0,0,0,.12)!important;
        }
        .ember-wrap:hover .ember-tooltip { transform:translateY(0) translateX(2px)!important; }
        body.dark-mode .ember {
          background:
            linear-gradient(145deg,rgba(255,255,255,.85),rgba(255,255,255,.08) 24%,transparent 25%),
            linear-gradient(115deg,rgba(255,255,255,.22),transparent 42%),
            linear-gradient(135deg,#fff2ce 0%,#ffc987 24%,#ff8e36 58%,#de4300 100%)!important;
        }
        @keyframes emberShardPulse {
          0%,100% { opacity:.68; filter:brightness(.96) saturate(1.08); }
          50% { opacity:1; filter:brightness(1.14) saturate(1.22); }
        }
      `}</style>
      {EMBER_SEEDS.map((ember) => (
        <span
          key={ember.id}
          className="ember-wrap"
          style={{
            left: `${ember.left}%`,
            top: `${ember.top}%`,
            animationDuration: `${ember.duration}s`,
            animationDelay: `${ember.delay}s`,
            ["--ember-x"]: `${ember.driftX}px`,
            ["--ember-y"]: `${ember.driftY}px`,
            ["--ember-rot"]: `${ember.tilt}deg`,
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
              height: `${Math.round(ember.size * 0.58)}px`,
              borderRadius: `${ember.radius}% ${100 - ember.radius}% ${38 + (ember.id * 7) % 28}% ${62 - (ember.id * 5) % 30}% / 35% 28% 72% 65%`,
              ["--ember-speed"]: `${5.4 + (ember.id % 5) * 0.55}s`,
            } as React.CSSProperties}
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
