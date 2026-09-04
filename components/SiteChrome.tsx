"use client";

import Link from "next/link";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

export default function SiteChrome() {
  return <><PortfolioCursor /><PortfolioMascot /><header className="nav-wrap"><nav className="nav" aria-label="Primary navigation"><Link className="brand" href="/" data-cursor="home" data-cursor-label="HOME">SM</Link><div className="nav-links"><Link href="/about">ABOUT</Link><Link href="/experience">EXPERIENCE</Link><Link href="/work">WORK</Link><Link href="/contact">CONTACT</Link></div><Link className="nav-cta" href="/contact" data-cursor="view" data-cursor-label="TALK">LET&apos;S TALK ↗</Link></nav></header><div className="page-transition" aria-hidden="true" /></>;
}
