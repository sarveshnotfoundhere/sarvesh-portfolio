"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

const EMBERS = [
  [8, 18, "Click me to switch the interface to dark mode."],
  [18, 66, "Click me to switch the interface to dark mode."],
  [31, 34, "Click me to switch the interface to dark mode."],
  [46, 82, "Click me to switch the interface to dark mode."],
  [58, 21, "Click me to switch the interface to dark mode."],
  [69, 58, "Click me to switch the interface to dark mode."],
  [82, 28, "Click me to switch the interface to dark mode."],
  [92, 74, "Click me to switch the interface to dark mode."],
  [12, 91, "Click me to switch the interface to dark mode."],
  [87, 12, "Click me to switch the interface to dark mode."],
] as const;

function EmberField() {
  const [dark, setDark] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    return () => document.body.classList.remove("dark-mode");
  }, [dark]);

  return (
    <div ref={rootRef} className="ember-field" aria-label="Interactive color controls">
      {EMBERS.map(([left, top, message], index) => (
        <button
          key={`${left}-${top}`}
          className="ember"
          type="button"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${-(index * 0.6)}s` }}
          onClick={() => setDark((value) => !value)}
          title={message}
          aria-label={message}
          data-cursor="view"
          data-cursor-label="SWITCH"
        />
      ))}
    </div>
  );
}

export default function SiteChrome() {
  return (
    <>
      <PortfolioCursor />
      <PortfolioMascot />
      <EmberField />
      <header className="nav-wrap">
        <nav className="nav" aria-label="Primary navigation">
          <Link className="brand" href="/" data-cursor="home" data-cursor-label="HOME">SM</Link>
          <div className="nav-links">
            <Link href="/about">ABOUT</Link>
            <Link href="/experience">EXPERIENCE</Link>
            <Link href="/work">WORK</Link>
            <Link href="/contact">CONTACT</Link>
          </div>
          <Link className="nav-cta" href="/contact" data-cursor="view" data-cursor-label="TALK">LET&apos;S TALK ↗</Link>
        </nav>
      </header>
    </>
  );
}
