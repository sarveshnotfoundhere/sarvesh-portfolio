"use client";

import { motion } from "framer-motion";

const DESIGN_LINK = "https://www.instagram.com/liqu0rtalk/";
const LINKEDIN_LINK = "https://www.linkedin.com/in/sarvesh-m-gca/";

const projects = [
  ["01", "VISUAL SYSTEMS", "Graphic design and communication work shaped around clarity, hierarchy and audience.", DESIGN_LINK],
  ["02", "DIGITAL MEDIA", "Social-first creative execution, content direction and visual storytelling.", DESIGN_LINK],
  ["03", "FINANCE × DESIGN", "Experiments that combine analytical thinking with interfaces, data and visual communication.", LINKEDIN_LINK],
] as const;

export default function WorkPage() {
  return <main className="page-shell"><section className="page-hero compact"><p className="section-kicker">03 · WORK</p><motion.h1 className="display-title" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>WORK<br /><span>WITH</span><br />PURPOSE.</motion.h1><p className="lead-copy">Selected directions from my work across design, media and finance-focused thinking.</p></section><section className="work-grid">{projects.map(([n,t,d,href], i) => <motion.a className="project-card" href={href} target="_blank" rel="noreferrer" key={n} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .8, delay: i * .08 }} data-cursor="view" data-cursor-label="VIEW"><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div><b>↗</b></motion.a>)}<div className="social-strip"><a href={DESIGN_LINK} target="_blank" rel="noreferrer" data-cursor="view" data-cursor-label="VIEW">DESIGN ↗</a><a href={LINKEDIN_LINK} target="_blank" rel="noreferrer" data-cursor="view" data-cursor-label="VIEW">PROFESSIONAL ↗</a></div></section><div className="goto-top"><a href="/" data-cursor="view" data-cursor-label="TOP">GO TO TOP</a></div></main>;
}
