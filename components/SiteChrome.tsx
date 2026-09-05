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
            aria-label={EMBER_MESSAGES[ember.id % EMBER_MESSAGES.length]}
            data-cursor="view"
            data-cursor-label="SWITCH"
            style={{
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              borderRadius: ember.radius,
            }}
          />
          <span className={`ember-tooltip ${hovered === ember.id ? "is-visible" : ""}`} role="status">
            {EMBER_MESSAGES[ember.id % EMBER_MESSAGES.length]}
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
