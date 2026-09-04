"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  { year: "2026 — PRESENT", organization: "Christ University Commerce Association", role: "REPORT WRITER", location: "Bengaluru", number: "01", description: "Reporting and documentation for the commerce association, with a focus on clear communication and organised execution." },
  { year: "2026 — PRESENT", organization: "Student Welfare Office (SWO)", role: "GRAPHIC DESIGNER", location: "Bengaluru", number: "02", description: "Visual communication for student initiatives, turning information into clear, engaging graphics." },
  { year: "2026 — PRESENT", organization: "Ozark Productions", role: "GRAPHIC DESIGNER", location: "Bengaluru", number: "03", description: "Graphic design work in a production environment, balancing visual craft with fast execution." },
  { year: "2024", organization: "YouVah", role: "SOCIAL MEDIA MANAGER", location: "India", number: "04", description: "Social media communication, content development and audience-facing digital work." },
];

function ExperienceItem({ item, index }: { item: (typeof experiences)[number]; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.article ref={ref} className="experience-item" initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}>
      <div className="experience-index">{item.number}</div>
      <div className="experience-year">{item.year}</div>
      <div className="experience-main">
        <div className="experience-topline"><p className="experience-organization">{item.organization}</p><span className="experience-location">{item.location}</span></div>
        <h3 className="experience-role">{item.role}</h3>
        <p className="experience-description">{item.description}</p>
      </div>
      <div className="experience-arrow" aria-hidden="true">↗</div>
    </motion.article>
  );
}

export function ExperienceTimeline() {
  return <div className="experience-timeline"><div className="experience-line" aria-hidden="true" />{experiences.map((item, index) => <ExperienceItem key={item.number} item={item} index={index} />)}</div>;
}
