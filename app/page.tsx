"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import ScrollExperienceLayer from "@/components/ScrollExperienceLayer";
import PortfolioCursor from "@/components/PortfolioCursor";
import PortfolioMascot from "@/components/PortfolioMascot";

const roles = ["FINANCE", "STRATEGY", "CREATIVITY"];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -140]);
  const orbitY = useTransform(scrollYProgress, [0, 0.3], [0, 220]);
  const orbitRotate = useTransform(scrollYProgress, [0, 0.35], [12, 48]);
  const introY = useTransform(scrollYProgress, [0.12, 0.3], [80, -30]);

  return (
    <main className="site-shell">
      <ScrollExperienceLayer />
      <PortfolioMascot />
      <PortfolioCursor />
      <div className="noise" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      <header className="nav-wrap">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Sarvesh home" data-cursor="link">SM</a>
          <div className="nav-links">
            <a href="#about" data-cursor="link">ABOUT</a>
            <a href="#experience" data-cursor="link">EXPERIENCE</a>
            <a href="#work" data-cursor="link">WORK</a>
            <a href="#contact" data-cursor="link">CONTACT</a>
          </div>
          <a className="nav-cta" href="mailto:sarveshm0718@gmail.com" data-cursor="link">LET&apos;S TALK ↗</a>
        </nav>
      </header>

      <section id="top" className="hero" aria-label="Introduction">
        <div className="hero-inner">
          <motion.p className="hero-kicker" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            ASPIRING FINANCE PROFESSIONAL · CHRIST UNIVERSITY
          </motion.p>

          <motion.div style={{ y: titleY }}>
            <motion.h1 className="hero-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
              <span>SARVESH</span>
              <span className="ghost">M.</span>
            </motion.h1>

            <motion.p className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38, ease: "easeOut" }}>
              Building at the intersection of finance, business thinking and creative execution — with a bias toward learning, making and turning ideas into useful experiences.
            </motion.p>

            <motion.div className="hero-meta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              {roles.map((role) => <span key={role} className="pill">{role}</span>)}
            </motion.div>
          </motion.div>

          <motion.div className="hero-orbit" style={{ y: orbitY, rotate: orbitRotate }} aria-hidden="true">
            <div className="orbit-dot dot-a" /><div className="orbit-dot dot-b" /><div className="orbit-dot dot-c" />
            <span className="orbit-label label-a">ANALYSIS</span><span className="orbit-label label-b">IDEAS</span><span className="orbit-label label-c">EXECUTION</span>
          </motion.div>

          <div className="hero-scroll"><span className="scroll-line" /><span>SCROLL TO EXPLORE</span></div>
        </div>
      </section>

      <section id="about" className="about-section section section-dark">
        <motion.div className="about-intro" style={{ y: introY }}>
          <p className="section-kicker">01 · PROFILE</p>
          <h2 className="section-title">STRUCTURED THINKING.<br />CREATIVE EXECUTION.</h2>
          <p className="section-subtitle">I am a commerce and finance student building practical experience across reporting, student organisations, visual communication and digital media. I like structured problems, clear communication and work that becomes useful outside the screen.</p>
        </motion.div>
        <div className="about-grid">
          <div className="about-card" data-cursor="view" data-cursor-label="EXPLORE"><span>01</span><strong>FINANCE</strong><p>Commerce and finance education with a growing interest in analysis, accounting and business thinking.</p></div>
          <div className="about-card" data-cursor="view" data-cursor-label="EXPLORE"><span>02</span><strong>COMMUNICATION</strong><p>Reporting, presentation and audience-facing work developed through student organisations and digital roles.</p></div>
          <div className="about-card" data-cursor="view" data-cursor-label="EXPLORE"><span>03</span><strong>CREATIVE</strong><p>Graphic design, digital media and content work that turns ideas into visual experiences.</p></div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="section-heading-row">
          <div><p className="section-kicker">02 · EXPERIENCE</p><h2 className="section-title">WHERE I&apos;VE BEEN<br />PUTTING IT TO WORK.</h2></div>
          <p className="section-side-note">2024 → NOW<br />BENGALURU · INDIA</p>
        </div>
        <ExperienceTimeline />
      </section>

      <section id="work" className="section section-dark work-preview">
        <p className="section-kicker">03 · WORK</p>
        <h2 className="section-title">FINANCE × DESIGN × MEDIA.</h2>
        <p className="section-subtitle">Selected visual projects and deeper case studies will become the next layer of the portfolio.</p>
      </section>

      <section id="contact" className="section contact-section" style={{ paddingBottom: "18vh" }}>
        <p className="section-kicker">04 · CONTACT</p>
        <h2 className="section-title">LET&apos;S BUILD<br />SOMETHING MEANINGFUL.</h2>
        <div className="contact-links">
          <a href="mailto:sarveshm0718@gmail.com" data-cursor="link">sarveshm0718@gmail.com ↗</a>
          <a href="https://www.linkedin.com/in/sarvesh-m-gca/" target="_blank" rel="noreferrer" data-cursor="link">LINKEDIN ↗</a>
        </div>
      </section>
    </main>
  );
}
