"use client";

import { motion } from "framer-motion";

const principles = [
  ["01", "THINK", "I start with structure: understand the problem, find the signal, and turn complexity into a clear direction."],
  ["02", "MAKE", "I enjoy moving from idea to execution — whether that means analysis, a visual system, a presentation, or an interactive experience."],
  ["03", "LEARN", "Finance gives me the discipline; design and technology give me room to experiment. I am building at the intersection of both."],
];

export default function AboutPage() {
  return <main className="page-shell"><section className="page-hero"><p className="section-kicker">01 · ABOUT</p><motion.h1 className="display-title" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>STRUCTURE<br /><span>MEETS</span><br />CURIOSITY.</motion.h1><p className="lead-copy">I am Sarvesh M — a commerce and finance student building practical experience across analysis, communication, design and digital media.</p></section><section className="story-section"><div className="story-index">THE APPROACH</div><div className="principle-list">{principles.map(([n,t,d]) => <motion.article className="principle" key={n} whileHover={{ x: 12 }}><span>{n}</span><h2>{t}</h2><p>{d}</p></motion.article>)}</div></section></main>;
}
