"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

const EMBERS = [
  [8, 18, "Click to switch to dark mode."], [18, 66, "Click to switch to dark mode."],
  [31, 34, "Click to switch to dark mode."], [46, 82, "Click to switch to dark mode."],
  [58, 21, "Click to switch to dark mode."], [69, 58, "Click to switch to dark mode."],
  [82, 28, "Click to switch to dark mode."], [92, 74, "Click to switch to dark mode."],
  [12, 91, "Click to switch to dark mode."], [87, 12, "Click to switch to dark mode."],
] as const;

function EmberField() {
  const [dark, setDark] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    return () => document.body.classList.remove("dark-mode");
  }, [dark]);
  return <div className="ember-field" aria-label="Interactive color controls">
    {EMBERS.map(([left, top, message], index) => <span key={`${left}-${top}`} className="ember-wrap" style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${-(index * .6)}s` }}>
      <button className="ember" type="button" onClick={() => setDark((value) => !value)} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} aria-label={message} data-cursor="view" data-cursor-label="SWITCH" />
      <span className={`ember-tooltip ${hovered === index ? "is-visible" : ""}`} role="status">{message}</span>
    </span>)}
  </div>;
}

export default function SiteChrome() {
  const pathname = usePathname();
  const [entered, setEntered] = useState(pathname !== "/");
  useEffect(() => {
    if (pathname !== "/") { setEntered(true); return; }
    const sync = () => setEntered(document.body.classList.contains("site-entered"));
    sync();
    window.addEventListener("portfolio:entered", sync);
    window.addEventListener("portfolio:loading", sync);
    return () => { window.removeEventListener("portfolio:entered", sync); window.removeEventListener("portfolio:loading", sync); };
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
