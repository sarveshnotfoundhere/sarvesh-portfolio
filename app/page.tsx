"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const roles = ["FINANCE", "STRATEGY", "CREATIVITY"];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -110]);
  const orbitY = useTransform(scrollYProgress, [0, 0.25], [0, 180]);
  const orbitRotate = useTransform(scrollYProgress, [0, 0.3], [12, 42]);

  return (
    <main className="site-shell">
      <div className="noise" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      <header className="nav-wrap">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Sarvesh home">SM</a>
          <div className="nav-links">
            <a href="#about">ABOUT</a>
            <a href="#experience">EXPERIENCE</a>
            <a href="#work">WORK</a>
            <a href="#contact">CONTACT</a>
          </div>
          <a className="nav-cta" href="mailto:sarveshm0718@gmail.com">LET'S TALK ↗</a>
        </nav>
      </header>

      <section id="top" className="hero" aria-label="Introduction">
        <div className="hero-inner">
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            ASPIRING FINANCE PROFESSIONAL · CHRIST UNIVERSITY
          </motion.p>

          <motion.div style={{ y: titleY }}>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>SARVESH</span>
              <span className="ghost">M.</span>
            </motion.h1>

            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: "easeOut" }}
            >
              Building at the intersection of finance, business thinking and
              creative execution — with a bias toward learning, making and
              turning ideas into useful experiences.
            </motion.p>

            <motion.div
              className="hero-meta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {roles.map((role) => (
                <span key={role} className="pill">{role}</span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-orbit"
            style={{ y: orbitY, rotate: orbitRotate }}
            aria-hidden="true"
          >
            <div className="orbit-dot dot-a" />
            <div className="orbit-dot dot-b" />
            <div className="orbit-dot dot-c" />
            <span className="orbit-label label-a">ANALYSIS</span>
            <span className="orbit-label label-b">IDEAS</span>
            <span className="orbit-label label-c">EXECUTION</span>
          </motion.div>

          <div className="hero-scroll">
            <span className="scroll-line" />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <p className="hero-kicker">01 · PROFILE</p>
        <h2 className="section-title">STRUCTURED THINKING. CREATIVE EXECUTION.</h2>
        <p className="section-subtitle">
          A portfolio built around finance and commerce, with space for leadership,
          reporting, design and digital media. More depth is coming in the next build.
        </p>
      </section>

      <section id="experience" className="section">
        <p className="hero-kicker">02 · EXPERIENCE</p>
        <h2 className="section-title">THE TIMELINE COMES NEXT.</h2>
        <p className="section-subtitle">
          Roles, impact, responsibilities and selected work will become an interactive timeline.
        </p>
      </section>

      <section id="work" className="section">
        <p className="hero-kicker">03 · WORK</p>
        <h2 className="section-title">FINANCE × DESIGN × MEDIA.</h2>
        <p className="section-subtitle">
          The creative portfolio layer will showcase projects, visual communication and digital work.
        </p>
      </section>

      <section id="contact" className="section" style={{ paddingBottom: "18vh" }}>
        <p className="hero-kicker">04 · CONTACT</p>
        <h2 className="section-title">LET'S BUILD SOMETHING MEANINGFUL.</h2>
        <p className="section-subtitle">
          sarveshm0718@gmail.com · LinkedIn · Resume
        </p>
      </section>
    </main>
  );
}
