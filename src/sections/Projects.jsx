// src/sections/Projects.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Adila from "../assets/adila.png";
import Mrr from "../assets/MRR.png";
// Replace this with your real 3rd featured project image file in /src/assets
import Project3Img from "../assets/adila.png";

/**
 * Projects — Enhanced:
 * - 3 featured projects (images supported)
 * - Grid of other projects with hover animation + click-to-open details modal
 * - Background animated blobs (framer-motion)
 * - Single-file, ready to paste into src/sections/Projects.jsx
 *
 * NOTE: If "../assets/project3.png" doesn't exist, add your image there or replace the import path.
 */

const FEATURED = [
  {
    id: "adilacs",
    title: "AI Recruitment Portal",
    role: "Backend · System Design",
    url: "https://adilacs.net/",
    blurb:
      "AI-driven recruitment platform: CV parsing, structured extraction and candidate ranking using vector similarity.",
    bullets: [
      "Microservices with Spring Boot for CV ingestion & parsing",
      "Parsed data stored in MongoDB and vector DB for similarity search",
      "Recommendation pipeline with scoring & pagination",
    ],
    colors: ["#302b63", "#00bf8f"],
    tech: ["Java", "Spring Boot", "MongoDB", "Vector DB"],
    image: Adila,
  },
  {
    id: "mrr",
    title: "MRR — Modern Record Room",
    role: "Secure Govt. Record System",
    url: "https://mrr.jharkhand.gov.in/",
    blurb:
      "Secure record-retrieval system for government archives with indexed scans, metadata search & role-based access.",
    bullets: [
      "Secure APIs & SHA-512 authentication",
      "Indexed scanned records with efficient retrieval",
      "Production hardening for performance & reliability",
    ],
    colors: ["#f97316", "#7c3aed"],
    tech: ["Java", "Spring Boot", "MySQL"],
    image: Mrr,
  },
  {
    id: "project3",
    title: "Project Three (Replace image)",
    role: "Fullstack · Integration",
    url: "#",
    blurb:
      "Third flagship project — replace this placeholder with a real title/image. Demonstrates fullstack integration and deployment.",
    bullets: [
      "Designed & implemented service APIs",
      "Built frontend dashboards and secure auth",
      "Deployed with CI/CD and monitoring",
    ],
    colors: ["#0ea5a4", "#7c3aed"],
    tech: ["Java", "React", "Docker"],
    image: Project3Img,
  },
];

const GRID = [
  {
    id: "donation",
    title: "NGO Donation Portal",
    subtitle: "Crowdfunding portal",
    short: "Crowdfunding portal with payment flows and admin dashboards.",
    tech: ["Java", "React"],
    url: "#",
  },
  {
    id: "crm",
    title: "Recruitment CRM",
    subtitle: "Candidate lifecycle",
    short: "Candidate lifecycle, interview scheduling, and tracking.",
    tech: ["Java", "Angular", "MongoDB"],
    url: "#",
  },
  {
    id: "billing",
    title: "Billing & Invoice System",
    subtitle: "Invoice engine",
    short: "Invoice generation, tax rules, PDF exports.",
    tech: ["Spring Boot", "MySQL"],
    url: "#",
  },
  {
    id: "analytics",
    title: "Analytics Pipeline",
    subtitle: "ETL & dashboards",
    short: "ETL and dashboarding for operational metrics.",
    tech: ["Node.js", "MongoDB", "Redis"],
    url: "#",
  },
  {
    id: "integration",
    title: "3rd-party Integrations",
    subtitle: "API orchestration",
    short: "API orchestration + retry & monitoring strategies.",
    tech: ["Spring Boot", "RabbitMQ"],
    url: "#",
  },
  {
    id: "tooling",
    title: "Developer Tooling",
    subtitle: "CI & automation",
    short: "CI scripts, deployment helpers, and test harnesses.",
    tech: ["Bash", "Jenkins"],
    url: "#",
  },
];

function Pill({ children }) {
  return <span className="text-xs px-2 py-1 rounded-full bg-white/6 text-white/90">{children}</span>;
}

/* small animated background blob component (reusable) */
function AnimatedBlob({ className = "", color = "#302b63", style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 0 }}
      animate={{ opacity: 1, scale: [0.98, 1.02, 0.98], y: [0, -10, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay }}
      className={className}
      style={{
        borderRadius: "9999px",
        background: `radial-gradient(circle at 30% 20%, ${color} 0%, rgba(0,0,0,0) 60%)`,
        ...style,
      }}
      aria-hidden
    />
  );
}

export default function Projects() {
  const [active, setActive] = useState(FEATURED[0]);
  const [selected, setSelected] = useState(null); // for grid details
  const containerRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setActive((a) => FEATURED[(FEATURED.indexOf(a) + 1) % FEATURED.length]);
      } else if (e.key === "ArrowLeft") {
        setActive((a) => FEATURED[(FEATURED.indexOf(a) - 1 + FEATURED.length) % FEATURED.length]);
      } else if (e.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="projects" className="relative py-20 px-6 lg:px-12 bg-black text-white overflow-hidden">
      {/* animated background blobs */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#05060a] via-[#071024] to-[#041018]" />
        <AnimatedBlob
          className="absolute left-0 top-1/4"
          color="#302b63"
          delay={0}
          style={{ width: 320, height: 320, opacity: 0.18, filter: "blur(120px)" }}
        />
        <AnimatedBlob
          className="absolute right-0 bottom-1/4"
          color="#00bf8f"
          delay={1.2}
          style={{ width: 300, height: 300, opacity: 0.14, filter: "blur(120px)" }}
        />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">My Projects</h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Highlighted systems I architected followed by additional projects — click a featured project to visit it or click any grid card to view concise details.
          </p>
        </header>

        {/* Showcase area (3 featured) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-10">
          {FEATURED.map((f) => (
            <motion.div
              key={f.id}
              layout
              whileHover={{ y: -6, scale: 1.01 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl overflow-hidden relative bg-gradient-to-tr from-white/3 to-transparent border border-white/6 shadow-sm"
              style={{ minHeight: 360 }}
            >
              <a href={f.url || "#"} target="_blank" rel="noreferrer" className="block w-full h-full">
                {/* Image area */}
                <div className="w-full h-48 bg-black/10 flex items-center justify-center overflow-hidden">
                  {f.image ? (
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover object-center"
                      style={{ maxHeight: 220 }}
                    />
                  ) : (
                    <div
                      style={{
                        background: `linear-gradient(135deg, ${f.colors[0]}, ${f.colors[1]})`,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{f.title}</h3>
                      <div className="text-sm text-white/70 mt-1">{f.role}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-white/60">{active.id === f.id ? "Featured" : "Featured"}</div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-white/80">{f.blurb}</p>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {f.tech.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              </a>

              {/* small overlay to open site */}
              <div className="absolute top-4 right-4 text-white/30 text-xs">Open site ↗</div>
            </motion.div>
          ))}
        </div>

        {/* Grid for additional projects with animation + click-to-open */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Other projects</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRID.map((g, i) => (
  <motion.article
    key={g.id}
    whileHover={{ y: -6 }}
    initial={{ opacity: 0, y: 8, scale: 0.995 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: i * 0.06, type: "spring", stiffness: 220, damping: 20 }}
    className="rounded-2xl p-4 bg-gradient-to-tr from-white/3 to-transparent border border-white/6 cursor-pointer"
    onClick={() => setSelected(g)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && setSelected(g)}
  >
    <div className="flex items-start justify-between">
      <div>
        <h4 className="font-semibold">{g.title}</h4>
        <p className="text-sm text-white/80 mt-1">{g.short}</p>
      </div>
      <div className="hidden sm:flex flex-col items-end gap-2">
        {g.url && (
          <a href={g.url} target="_blank" rel="noreferrer" className="text-white/80 p-2 rounded-md">
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>

    <div className="mt-4 flex gap-2 flex-wrap">
      {g.tech.map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </div>
  </motion.article>
))}

          </div>
        </div>
      </div>

      {/* Modal for grid project details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 bg-black/70" onClick={() => setSelected(null)} />

            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 w-full max-w-3xl mx-6 rounded-2xl bg-[#071024] p-6 border border-white/6 shadow-2xl"
            >
              <header className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{selected.title}</h3>
                  <div className="text-sm text-white/70 mt-1">{selected.subtitle || ""}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white" aria-label="Close">
                  ✕
                </button>
              </header>

              <div className="mt-4 text-white/85 space-y-3">
                <p className="text-sm">{selected.short}</p>

                {selected.bullets && (
                  <ul className="list-disc list-inside mt-2 text-sm text-white/80">
                    {selected.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-4">
                  <strong className="text-sm">Tech</strong>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.tech?.map((t) => (
                      <span key={t} className="px-2 py-1 rounded bg-white/6 text-xs text-white/90">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {selected.repo && selected.repo !== "#" && (
                    <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm" href={selected.repo} target="_blank" rel="noreferrer">
                      <FaGithub /> View repo
                    </a>
                  )}
                  {selected.url && selected.url !== "#" && (
                    <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 text-white text-sm" href={selected.url} target="_blank" rel="noreferrer">
                      <FaExternalLinkAlt /> Visit site
                    </a>
                  )}

                  <button onClick={() => setSelected(null)} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 text-white text-sm">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
