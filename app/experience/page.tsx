"use client";

import { motion } from "framer-motion";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export default function ExperiencePage() {
  return <main className="page-shell"><section className="page-hero compact"><p className="section-kicker">02 · EXPERIENCE</p><motion.h1 className="display-title" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>PUTTING<br /><span>IDEAS</span> TO<br />WORK.</motion.h1><p className="lead-copy">A growing body of experience across student organisations, reporting, graphic design and social media.</p></section><section className="story-section timeline-page"><ExperienceTimeline /></section></main>;
}
