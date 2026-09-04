"use client";

import { motion } from "framer-motion";

const projects = [
  ["01", "VISUAL SYSTEMS", "Graphic design and communication work shaped around clarity, hierarchy and audience."],
  ["02", "DIGITAL MEDIA", "Social-first creative execution, content direction and visual storytelling."],
  ["03", "FINANCE × DESIGN", "Experiments that combine analytical thinking with interfaces, data and visual communication."],
];

export default function WorkPage() {
  return <main className="page-shell"><section className="page-hero compact"><p className="section-kicker">03 · WORK</p><motion.h1 className="display-title" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>WORK<br /><span>WITH</span><br />PURPOSE.</motion.h1><p className="lead-copy">Selected directions from my work across design, media and finance-focused thinking.</p></section><section className="work-grid">{projects.map(([n,t,d], i) => <motion.article className="project-card" key={n} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .8, delay: i * .08 }} data-cursor="view" data-cursor-label="VIEW"><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div><b>↗</b></motion.article>)}</section></main>;
}
