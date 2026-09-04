"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import ScrollExperienceLayer from "@/components/ScrollExperienceLayer";
import ScrollLoadingHero from "@/components/ScrollLoadingHero";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const introY = useTransform(scrollYProgress, [0.14, 0.3], [80, -30]);

  return <main className="site-shell">
    <ScrollExperienceLayer />
    <div className="noise" aria-hidden="true" />
    <div className="grid-overlay" aria-hidden="true" />
    <div className="aurora" aria-hidden="true"><div className="orb orb-a" /><div className="orb orb-b" /><div className="orb orb-c" /></div>

    <ScrollLoadingHero />

    <section id="about" className="about-section section section-dark">
      <motion.div className="about-intro" style={{ y: introY }}>
        <p className="section-kicker">01 · PROFILE</p>
        <h2 className="section-title">STRUCTURED THINKING.<br />CREATIVE EXECUTION.</h2>
        <p className="section-subtitle">I am a commerce and finance student building practical experience across reporting, student organisations, visual communication and digital media.</p>
      </motion.div>
      <div className="about-grid">
        <div className="about-card"><span>01</span><strong>FINANCE</strong><p>Commerce and finance education with a growing interest in analysis, accounting and business thinking.</p></div>
        <div className="about-card"><span>02</span><strong>COMMUNICATION</strong><p>Reporting, presentation and audience-facing work developed through student organisations and digital roles.</p></div>
        <div className="about-card"><span>03</span><strong>CREATIVE</strong><p>Graphic design, digital media and content work that turns ideas into visual experiences.</p></div>
      </div>
    </section>

    <section id="experience" className="section experience-section">
      <div className="section-heading-row"><div><p className="section-kicker">02 · EXPERIENCE</p><h2 className="section-title">WHERE I&apos;VE BEEN<br />PUTTING IT TO WORK.</h2></div><p className="section-side-note">2024 → NOW<br />BENGALURU · INDIA</p></div>
      <ExperienceTimeline />
      <Link className="section-link" href="/experience" data-cursor="view" data-cursor-label="VIEW">VIEW FULL EXPERIENCE ↗</Link>
    </section>

    <section id="work" className="section section-dark work-preview">
      <p className="section-kicker">03 · WORK</p><h2 className="section-title">FINANCE × DESIGN × MEDIA.</h2>
      <p className="section-subtitle">A growing collection of visual work, digital experiments and finance-focused thinking.</p>
      <Link className="section-link" href="/work" data-cursor="view" data-cursor-label="EXPLORE">EXPLORE WORK ↗</Link>
    </section>

    <section id="contact" className="section contact-section">
      <p className="section-kicker">04 · CONTACT</p><h2 className="section-title">LET&apos;S BUILD<br />SOMETHING MEANINGFUL.</h2>
      <div className="contact-links"><Link href="/contact" data-cursor="view" data-cursor-label="TALK">START A CONVERSATION ↗</Link><a href="mailto:sarveshm0718@gmail.com" data-cursor="email">EMAIL ↗</a></div>
    </section>
  </main>;
}
