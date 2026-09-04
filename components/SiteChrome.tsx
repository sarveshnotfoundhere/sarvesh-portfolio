"use client";

import Link from "next/link";
import { useEffect } from "react";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

function EmberField() {
  useEffect(() => {
    const root = document.createElement("div");
    root.className = "ember-field";
    root.setAttribute("aria-hidden", "true");
    const positions = [[8,18],[18,66],[31,34],[46,82],[58,21],[69,58],[82,28],[92,74],[12,91],[87,12]];
    positions.forEach(([left, top], index) => {
      const ember = document.createElement("button");
      ember.className = "ember";
      ember.type = "button";
      ember.style.left = `${left}%`;
      ember.style.top = `${top}%`;
      ember.style.animationDelay = `${-(index * 0.6)}s`;
      ember.addEventListener("pointerenter", () => document.body.classList.toggle("dark-mode"));
      ember.addEventListener("click", () => document.body.classList.add("dark-mode"));
      root.appendChild(ember);
    });
    document.body.appendChild(root);
    return () => root.remove();
  }, []);
  return null;
}

export default function SiteChrome() {
  return <><PortfolioCursor /><PortfolioMascot /><EmberField /><header className="nav-wrap"><nav className="nav" aria-label="Primary navigation"><Link className="brand" href="/" data-cursor="home" data-cursor-label="HOME">SM</Link><div className="nav-links"><Link href="/about">ABOUT</Link><Link href="/experience">EXPERIENCE</Link><Link href="/work">WORK</Link><Link href="/contact">CONTACT</Link></div><Link className="nav-cta" href="/contact" data-cursor="view" data-cursor-label="TALK">LET&apos;S TALK ↗</Link></nav></header></>;
}
