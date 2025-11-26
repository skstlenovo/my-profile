import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Adila from "../assets/adila.png";
import Crowdfunding from "../assets/crowdfunding.png";
import Mrr from "../assets/MRR.png";
import Vaccination from "../assets/Vactination.png";

const PROJECTS = [
  {
    id: "mrr",
    title: "MRR — Modern Record Room",
    subtitle: "Digitilize old land records",
    url: "https://mrr.jharkhand.gov.in/",
    image: Mrr,
    summary: `"MRR" (Modern Record Room) is a web application designed exclusively for the Jharkhand Government. It 
      facilitates efficient retrieval of digital files, including old Khatiyan and case records, stored on a secure server. This 
      application serves as a comprehensive solution for accessing and managing historical land-related documents in 
      digital format.`,
    bullets: [
      "Played a key role in enhancing project functionality by integrating impactful new features. ",
      "Developed a secure login page utilizing SHA-512 encryption for password hashing to ensure data security. ",
      "Implemented CRUD operations using Spring Boot APIs for effective data managemen.",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "Microservices"],
    colors: ["#f97316", "#7c3aed"],
  },
  {
    id: "adilacs",
    title: "Recruitment Portal",
    subtitle: "Resume parsing · Candidate recommendation for hiring process",
    url: "https://adilacs.net/",
    image: Adila,
    summary: `This AI-driven project streamlines the recruitment process by automating candidate shortlisting based on job 
      descriptions (JDs). The application collects data automatically—users simply upload CVs, which are processed to 
      extract relevant details using AI tools. The extracted data is stored in both a relational database (MongoDB) and a 
      vector database for efficient search and retrieval. This solution significantly reduces manual effort and enhances 
      recruitment efficiency. `,
    bullets: [
      "Designed and developed both backend services using Spring Boot and frontend interfaces using Angular.",
      "Integrated AI tools to extract CV details for automated shortlisting against job descriptions.",
      "Implemented seamless data storage in MongoDB and a vector database for optimized data retrieval and similarity searches.",
      "Ensured scalability and efficiency of the application for real-world recruitment workflows.",
      "Designed and developed both backend services using Spring Boot and frontend interfaces using Angular.",
      "Integrated AI tools to extract CV details for automated shortlisting against job descriptions.",
      "Implemented seamless data storage in MongoDB and a vector database for optimized data retrieval and similarity searches.",
      "Ensured scalability and efficiency of the application for real-world recruitment workflows.",
    ],
    tech: ["Java", "Spring Boot", "MongoDB", "Microservices", "Flutter"],
    colors: ["#302b63", "#00bf8f"],
  },
  {
    id: "crowdfunding",
    title: "Crowdfunding Platform",
    subtitle: "Donation & fundraising",
    url: "#",
    image: Crowdfunding,
    summary:
      "This project is a community-focused crowdfunding platform designed to support individuals in need by connecting volunteers, NGOs, hospitals, and an admin team in one unified system. It enables transparent fundraising, efficient donation management, and quick support delivery for medical cases, social causes, and emergency needs. The platform ensures secure transactions, real-time updates, and a streamlined workflow that makes helping others simple, reliable, and impactful.",
    bullets: [
      "Designed and developed core backend services to support donations, user workflows, and case management.",
      "Implemented secure APIs enabling volunteers, NGOs, hospitals, and admins to collaborate seamlessly.",
      "Built features for transparent fundraising, real-time updates, and smooth transaction handling.",
      "Ensured system reliability, scalability, and performance across all critical modules.",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "React"],
    colors: ["#0ea5a4", "#7c3aed"],
  },
  {
    id: "vacination",
    title: "API for vaccination management system",
    subtitle: "API that controls vaccination process",
    url: "https://github.com/skstlenovo/VaccinationManagementSystem",
    image: Vaccination,
    summary:
      "This API serves as the core backend for a vaccination management system, enabling end-to-end control of all critical operations. It handles appointment booking, dose tracking, user profile management, and administration of doctors and vaccination centers. The service ensures secure, efficient, and scalable processing of vaccination-related workflows, supporting seamless coordination across all stakeholders.",
    bullets: [
      "Designed and developed RESTful APIs to manage appointments, vaccination doses, users, doctors, and centers.",
      "Implemented secure, scalable backend architecture ensuring reliable data flow and high system availability.",
      "Integrated validation, authentication, and role-based access control to support smooth user and admin operations.",
      "Optimized database interactions and improved overall performance for faster, consistent responses.",
    ],
    tech: ["Java", "Spring Boot", "MySQL"],
    colors: ["#0369a1", "#0ea5a4"],
  },
  {
    id: "Custome Notification Tool",
    title: "Custom Notification Tool",
    subtitle: "Designed to deliver customized notifications",
    image: "",
    summary:
      "This tool is designed to deliver customized notifications across multiple channels, ensuring timely and accurate communication with users. It supports configurable templates, dynamic message generation, and targeted delivery based on user preferences and event triggers. The system provides a centralized way to manage notification workflows, improving reliability, consistency, and communication efficiency across applications.",
    bullets: [
      "Built template management, scheduling logic, and event-driven triggers to automate communication workflows.",
      "Implemented robust logging, error handling, and retry mechanisms to ensure high delivery accuracy.",
      "Optimized architecture for scalability, enabling seamless integration with existing platforms and services.",
    ],
    tech: ["Java", "React"],
    colors: ["#6d28d9", "#d946ef"],
  },
  {
    id: "File downloading tool",
    title: "File Downloading tool",
    subtitle: "Automatically downloads file attachments from mails",
    summary:
      "This tool automates the retrieval and downloading of file attachments from incoming emails. It continuously monitors designated mailboxes, identifies relevant messages based on predefined rules, and securely extracts and stores attached files. The solution streamlines data collection workflows, reduces manual effort, and ensures timely availability of critical documents.",
    bullets: [
      "Developed an automated system to scan inboxes, filter emails, and download attachments securely.",
      "Implemented parsing logic, rule-based email categorization, and scheduled polling for continuous processing.",
      "Ensured reliable file handling with error recovery, logging, and duplicate prevention mechanisms.",
      "Integrated with storage services and optimized performance to support large volumes of emails and attachments.",
    ],
    tech: ["Node.js", "MongoDB", "Redis"],
    colors: ["#0891b2", "#0ea5a4"],
  },
];

function TechBadge({ children }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-white/6 text-white/90">
      {children}
    </span>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  // lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="projects"
      className="relative w-full pt-12 pb-16 bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/2 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-0  w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-0  w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500"></div>
      </div>
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#05060a] via-[#071024] to-[#041018]" />
        <div
          className="absolute left-0 top-1/4 rounded-full opacity-20"
          style={{
            width: 300,
            height: 300,
            filter: "blur(120px)",
            background:
              "radial-gradient(circle at 30% 20%, #302b63 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute right-0 bottom-1/4 rounded-full opacity-16"
          style={{
            width: 300,
            height: 300,
            filter: "blur(120px)",
            background:
              "radial-gradient(circle at 30% 20%, #00bf8f 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My Projects
        </motion.h2>
        <motion.p
          className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Selected projects — click any card to read concise technical details.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 8, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: idx * 0.04,
                type: "spring",
                stiffness: 200,
                damping: 22,
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => setSelected(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(p)}
              className="rounded-2xl overflow-hidden border border-white/6 bg-gradient-to-tr from-white/3 to-transparent cursor-pointer"
            >
              {/* image / visual area */}
              <div className="w-full h-48 sm:h-56 bg-black/10 flex items-center justify-center overflow-hidden relative">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-black/30" aria-hidden />
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <div className="text-sm text-white/70 mt-1">
                        {p.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm text-white/80 line-clamp-3">
                  {p.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ y: 12, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="
          relative z-10
          w-full
          max-w-lg          /* smaller modal */
          sm:max-w-2xl      /* moderate size on bigger screens */
          max-h-[85vh]      /* prevents overflow */
          max-h-[85vh] overflow-y-auto 
          sm:scrollbar-hide 
scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent
          mx-auto
          rounded-2xl
          bg-[#071024]
          p-4 sm:p-6
          border border-white/6
          shadow-2xl
        "
            >
              <header className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold truncate">
                    {selected.title}
                  </h3>
                  {selected.subtitle && (
                    <div className="text-sm text-white/70 mt-1 truncate">
                      {selected.subtitle}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selected.repo && selected.repo !== "#" && (
                    <a
                      href={selected.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/80 p-2 rounded-md"
                    >
                      <FaGithub />
                    </a>
                  )}

                  {selected.url && selected.url !== "#" && (
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex gap-2 px-3 py-1.5 rounded-full text-white/80 text-sm"
                    >
                      <FaExternalLinkAlt />
                      Visit Site
                    </a>
                  )}

                  <button
                    onClick={() => setSelected(null)}
                    className="text-white/60 hover:text-white p-2"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </header>

              <div className="mt-4 text-white/85 space-y-4">
                <div className="w-full h-40 sm:h-52 bg-black/10 overflow-hidden rounded-md">
                  {selected.image ? (
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        background: `linear-gradient(135deg, ${
                          selected.colors?.[0] ?? "#333"
                        }, ${selected.colors?.[1] ?? "#666"})`,
                      }}
                      className="w-full h-full"
                    />
                  )}
                </div>

                <p className="text-sm">{selected.summary}</p>

                <div>
                  <strong className="text-sm">Responsibilities & Role:</strong>
                  <ul className="list-disc list-inside mt-2 text-sm text-white/80 space-y-1">
                    {selected.bullets?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong className="text-sm">Tech</strong>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.tech?.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded bg-white/6 text-xs text-white/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
