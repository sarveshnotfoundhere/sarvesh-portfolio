"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return <main className="page-shell"><section className="contact-hero"><p className="section-kicker">04 · CONTACT</p><motion.h1 className="display-title" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>LET&apos;S<br /><span>MAKE</span><br />SOMETHING.</motion.h1><p className="lead-copy">Have an opportunity, project or idea worth exploring? Let&apos;s start a conversation.</p><div className="contact-actions"><a data-cursor="view" data-cursor-label="EMAIL" href="mailto:sarveshm0718@gmail.com">sarveshm0718@gmail.com ↗</a><a data-cursor="view" data-cursor-label="CONNECT" href="https://www.linkedin.com/in/sarvesh-m-gca/" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></section></main>;
}
