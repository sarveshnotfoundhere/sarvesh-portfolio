"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

const EMBER_MESSAGES = [
  "Click to switch to dark mode.", "A spark in the system.", "Click to switch to dark mode.",
  "A tiny piece of energy.", "Click to switch to dark mode.", "Keep exploring.",
  "A spark in the system.", "Click to switch to dark mode.", "One more detail.", "Click to switch to dark mode.",
] as const;

const EMBER_SEEDS = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: 5 + ((index * 17) % 88),
  top: 10 + ((index * 29) % 78),
  size: 5 + ((index * 7) % 10),
  radius: `${18 + ((index * 23) % 60)}% ${28 + ((index * 13) % 55)}% ${22 + ((index * 19) % 58)}% ${34 + ((index * 11) % 48)}% / ${30 + ((index * 17) % 54)}% ${20 + ((index * 29) % 58)}% ${36 + ((index * 7) % 50)}% ${24 + ((index * 31) % 56)}%`,
  duration: 8 + (index % 7),
  delay: -(index * 0.9),
  driftX: ((index % 5) - 2) * 28,
  driftY: ((index % 7) - 3) * 34,
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
        .ember-wrap { transform-origin:center; }
        .ember {
          border:1px solid rgba(255,190,120,.62)!important;
          background:radial-gradient(circle at 32% 28%,#fff8df 0 8%,#ffd18a 22%,#ff7a18 54%,#e94800 100%)!important;
          box-shadow:0 0 5px rgba(255,150,50,.95),0 0 18px rgba(255,106,0,.7),0 0 42px rgba(255,70,0,.24)!important;
          filter:saturate(1.12);
          transition:transform .32s cubic-bezier(.16,1,.3,1),filter .32s ease,box-shadow .32s ease!important;
        }
        .ember:before,.ember:after { content:"";position:absolute;inset:-7px;border-radius:inherit;pointer-events:none; }
        .ember:before { border:1px solid rgba(255,170,80,.24);filter:blur(1px); }
        .ember:after { inset:-16px;background:radial-gradient(circle,rgba(255,112,25,.16),transparent 68%);opacity:.8; }
        .ember-wrap:hover { z-index:30; }
        .ember-wrap:hover .ember {
          transform:rotate(calc(var(--ember-rot,0deg) + 8deg)) scale(1.7)!important;
          filter:brightness(1.28) saturate(1.3)!important;
          box-shadow:0 0 7px #fff1c7,0 0 22px rgba(255,125,32,1),0 0 58px rgba(255,80,0,.42)!important;
        }
        .ember-tooltip { left:20px!important;bottom:18px!important; border-color:rgba(255,106,0,.38)!important; box-shadow:0 10px 38px rgba(255,90,0,.13),0 16px 36px rgba(0,0,0,.12)!important; }
        .ember-wrap:hover .ember-tooltip { transform:translateY(0) translateX(2px)!important; }
        body.dark-mode .ember { background:radial-gradient(circle at 32% 28%,#fff9e9 0 8%,#ffdca5 20%,#ff9847 52%,#f04b00 100%)!important; }
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
              height: `${ember.size}px`,
              borderRadius: ember.radius,
            }}
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
