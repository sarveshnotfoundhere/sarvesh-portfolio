"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import ScrollLoadingHero from "@/components/ScrollLoadingHero";
import PortfolioExperienceScene from "@/components/PortfolioExperienceScene";

export default function Home() {
  return (
    <main className="site-shell home-space">
      <ScrollLoadingHero />

      <section className="hero-after-loader" aria-label="Portfolio introduction">
        <div className="hero-after-loader-copy">
          <p className="section-kicker">SYSTEM ONLINE · SARVESH M.</p>
          <h2 className="hero-after-title chroma-title">FINANCE<br />WITH A<br /><span>CREATIVE EDGE.</span></h2>
          <p className="hero-after-copy">A finance-focused portfolio built around analysis, communication, strategy and visual thinking.</p>
          <div className="hero-after-actions">
            <a className="magnetic-button" href="#about" data-cursor="view" data-cursor-label="EXPLORE">ENTER EXPERIENCE ↓</a>
            <Link className="magnetic-button magnetic-button-light" href="/contact" data-cursor="view" data-cursor-label="TALK">LET&apos;S TALK ↗</Link>
          </div>
        </div>
        <div className="hero-after-visual">
          <PortfolioExperienceScene />
          <span className="hero-orbit-label">SM / 360°</span>
        </div>
      </section>

      <section id="about" className="about-section section section-dark">
        <motion.div className="about-intro" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9 }}>
          <p className="section-kicker">01 · PROFILE</p>
          <h2 className="section-title chroma-title">STRUCTURED THINKING.<br />CREATIVE EXECUTION.</h2>
          <p className="section-subtitle">Commerce, finance, reporting, visual communication and digital media — brought together as one evolving practice.</p>
        </motion.div>
        <div className="about-grid">
          <div className="about-card interactive-card"><span>01</span><strong>FINANCE</strong><p>Analysis, accounting and business thinking with a practical, learning-first approach.</p></div>
          <div className="about-card interactive-card"><span>02</span><strong>COMMUNICATION</strong><p>Reporting, presentation and audience-facing work across student organisations and digital roles.</p></div>
          <div className="about-card interactive-card"><span>03</span><strong>CREATIVE</strong><p>Graphic design and media work that turns ideas into clear, memorable visual systems.</p></div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="section-heading-row"><div><p className="section-kicker">02 · EXPERIENCE</p><h2 className="section-title chroma-title">WHERE I&apos;VE BEEN<br />PUTTING IT TO WORK.</h2></div><p className="section-side-note">2024 → NOW<br />BENGALURU · INDIA</p></div>
        <ExperienceTimeline />
        <Link className="section-link" href="/experience" data-cursor="view" data-cursor-label="VIEW">VIEW FULL EXPERIENCE ↗</Link>
      </section>

      <section id="work" className="section section-dark work-preview">
        <p className="section-kicker">03 · WORK</p><h2 className="section-title chroma-title">FINANCE × DESIGN × MEDIA.</h2>
        <p className="section-subtitle">A growing collection of visual work, digital experiments and finance-focused thinking.</p>
        <Link className="section-link" href="/work" data-cursor="view" data-cursor-label="EXPLORE">EXPLORE WORK ↗</Link>
      </section>

      <section id="contact" className="section contact-section">
        <p className="section-kicker">04 · CONTACT</p><h2 className="section-title chroma-title">LET&apos;S BUILD<br />SOMETHING MEANINGFUL.</h2>
        <div className="contact-links"><Link href="/contact" data-cursor="view" data-cursor-label="TALK">START A CONVERSATION ↗</Link><a href="mailto:sarveshm0718@gmail.com" data-cursor="email">EMAIL ↗</a></div>
      </section>
    </main>
  );
}
