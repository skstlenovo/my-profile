import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiLogoVisualStudio } from "react-icons/bi";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaGithub,
  FaHtml5,
  FaJava,
  FaReact,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { MdOutlineDataObject } from "react-icons/md";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiApachemaven,
  SiCloudflare,
  SiHibernate,
  SiHostinger,
  SiIntellijidea,
  SiJenkins,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiSpring,
  SiSpringboot,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { TbTopologyStar3 } from "react-icons/tb";
import springAi from "../assets/ai.svg";

import Dsa from "./Dsa";
import Git from "./GitHub";

export default function Skills() {
  const skills = [
    { icon: <SiIntellijidea />, name: "IntelliJ IDEA" },
    { icon: <BiLogoVisualStudio />, name: "VS Code" },
    { icon: <SiJenkins />, name: "Jenkins" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <FaDocker />, name: "Docker" },
    { icon: <FaJava />, name: "Java" },
    { icon: <SiSpringboot />, name: "Spring Boot" },
    { icon: <TbTopologyStar3 />, name: "Microservices" },
    { icon: <SiHibernate />, name: "Hibernate" },
    { icon: <SiSpring />, name: "Spring MVC" },
    {
      icon: (
        <img
          src={springAi}
          alt="Spring AI"
          className="w-14 h-14 object-contain"
        />
      ),
      name: "Spring AI",
    },
    { icon: <RiOpenaiFill />, name: "Open AI" },
    { icon: <SiApachemaven />, name: "Maven" },
    { icon: <MdOutlineDataObject />, name: "OOPs" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <LiaProjectDiagramSolid />, name: "DSA" },
    { icon: <FaReact />, name: "React.js" },
    { icon: <SiVite />, name: "Vite" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <IoLogoJavascript />, name: "JavaScript" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3 />, name: "CSS" },
    { icon: <FaAws />, name: "AWS Lightsail" },
    { icon: <SiCloudflare />, name: "Cloudflare" },
    { icon: <SiHostinger />, name: "Hostinger VPS" },
    { icon: <FaGithub />, name: "Git & GitHub" },
  ];

  const repeated = [...skills, ...skills];
  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      {
        threshold: [0.1],
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + dir * SPEED * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"></div>
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Technical Skills
      </motion.h2>

      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        A showcase of my expertise in various technologies and tools.
      </motion.p>

      <div className="relative w-full overflow-hidden mt-12 mb-5">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1cd8d2] cursor-grab active:cursor-grabbing"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }}
          dragElastic={0.08}
        >
          {repeated.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={skill.name}
              title={skill.name}
            >
              <span className="hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </span>
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </motion.div>
        
      </div>
   <div className="z-10 mb-10 flex flex-col items-center">
  <div
    onClick={() => setShowAll(prev => !prev)}
    className="group cursor-pointer flex items-center gap-3"
  >
    <span className="text-sm tracking-wide text-white/70 group-hover:text-white transition-colors">
      {showAll ? "Collapse skills" : "Explore all skills"}
    </span>

    <motion.span
      animate={{ rotate: showAll ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      className="text-[#1cd8d2]"
    >
      ▼
    </motion.span>
  </div>

  {/* glowing divider */}
  <div className="mt-2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#1cd8d2] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
</div>


        {showAll && (
  <motion.div
    className="max-w-5xl w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9
               gap-8 px-6 mb-12 z-10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {skills.map((skill, index) => (
      <div
        key={index}
        className="flex flex-col items-center gap-3
                   text-[#1cd8d2] hover:scale-105 transition-transform"
      >
        <span className="text-5xl">
          {skill.icon}
        </span>
        <p className="text-sm text-white/90 text-center">
          {skill.name}
        </p>
      </div>
    ))}
  </motion.div>
)}

      <Git />
      <Dsa />
    </section>
  );
}
