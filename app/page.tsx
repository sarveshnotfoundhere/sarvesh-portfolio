"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import ScrollLoadingHero from "@/components/ScrollLoadingHero";
import PortfolioExperienceScene from "@/components/PortfolioExperienceScene";

const DESIGN_LINK = "https://www.instagram.com/liqu0rtalk/";
const LINKEDIN_LINK = "https://www.linkedin.com/in/sarvesh-m-gca/";

export default function Home() {
  return (
    <main className="site-shell home-space">
      <ScrollLoadingHero />
      <section className="hero-after-loader" aria-label="Portfolio introduction">
        <div className="hero-after-loader-copy">
          <p className="section-kicker">SARVESH M.</p>
          <h2 className="hero-after-title">FINANCE<br />MEETS<br /><span>CREATIVITY.</span></h2>
          <p className="hero-after-copy">Finance, strategy and visual thinking brought together in one portfolio.</p>
          <div className="hero-after-actions">
            <a className="magnetic-button" href="#about" data-cursor="view" data-cursor-label="EXPLORE">EXPLORE ↓</a>
            <Link className="magnetic-button magnetic-button-light" href="/contact" data-cursor="view" data-cursor-label="TALK">CONTACT ↗</Link>
          </div>
        </div>
        <div className="hero-after-visual"><PortfolioExperienceScene /><span className="hero-orbit-label">SM / 360°</span></div>
      </section>

      <section id="about" className="about-section section section-dark">
        <motion.div className="about-intro" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9 }}>
          <p className="section-kicker">01 · ABOUT</p>
          <h2 className="section-title">STRUCTURED THINKING.<br />CREATIVE EXECUTION.</h2>
          <p className="section-subtitle">Commerce, finance, communication and design — connected through practical work.</p>
        </motion.div>
        <div className="about-grid">
          <div className="about-card interactive-card"><span>01</span><strong>FINANCE</strong><p>Analysis, accounting and business thinking with a practical approach.</p></div>
          <div className="about-card interactive-card"><span>02</span><strong>COMMUNICATION</strong><p>Reporting, presentation and audience-facing work across student and digital roles.</p></div>
          <div className="about-card interactive-card"><span>03</span><strong>CREATIVE</strong><p>Graphic design and media work that turns ideas into clear visual systems.</p></div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="section-heading-row"><div><p className="section-kicker">02 · EXPERIENCE</p><h2 className="section-title">WHERE I&apos;VE WORKED.</h2></div><p className="section-side-note">2024 → NOW<br />BENGALURU · INDIA</p></div>
        <ExperienceTimeline />
        <Link className="section-link" href="/experience" data-cursor="view" data-cursor-label="VIEW">FULL EXPERIENCE ↗</Link>
      </section>

      <section id="work" className="section section-dark work-preview">
        <p className="section-kicker">03 · WORK</p><h2 className="section-title">FINANCE × DESIGN × MEDIA.</h2>
        <p className="section-subtitle">Selected work across visual communication, digital media and finance-focused thinking.</p>
        <div className="home-social-links">
          <a className="section-link" href={DESIGN_LINK} target="_blank" rel="noreferrer" data-cursor="view" data-cursor-label="VIEW">DESIGN ↗</a>
          <Link className="section-link" href="/work" data-cursor="view" data-cursor-label="VIEW">VIEW WORK ↗</Link>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <p className="section-kicker">04 · CONTACT</p><h2 className="section-title">LET&apos;S BUILD<br />SOMETHING MEANINGFUL.</h2>
        <div className="contact-links">
          <Link href="/contact" data-cursor="view" data-cursor-label="TALK">START A CONVERSATION ↗</Link>
          <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer" data-cursor="view" data-cursor-label="LINKEDIN">LINKEDIN ↗</a>
          <a href="mailto:sarveshm0718@gmail.com" data-cursor="email">EMAIL ↗</a>
        </div>
      </section>
      <div className="goto-top"><a href="#top" data-cursor="view" data-cursor-label="TOP">GO TO TOP ↑</a></div>
    </main>
  );
}
