// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

const LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "cv", label: "Download CV", href: "/Sanjay_Java_Developer_[3.3Yrs].pdf" , download: true},
];

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [visible, setVisible] = useState(true); // navbar show/hide on scroll
  const [active, setActive] = useState(() => (typeof window !== "undefined" ? window.location.hash || "#home" : "#home"));

  

  // scroll hide / show behavior
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 20) {
        setVisible(true);
      } else if (currentY > lastY) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // track hash changes (so active link updates when user navigates)
  useEffect(() => {
    const onHash = () => setActive(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY + 120; // offset for navbar height

    for (const link of LINKS) {
      if (!link.href.startsWith("#")) continue;
      const id = link.href.slice(1);
      const section = document.getElementById(id);
      if (!section) continue;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        setActive(`#${id}`);
        break;
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // run on page load

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const onLinkClick = (href) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="mx-auto max-w-full px-6">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <img src={Logo} alt="logo" className="h-11 w-11 rounded-md object-cover" />
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-white leading-none ">Sanjay Kumar</div>
                <div className="text-xs text-white/60">Software Developer</div>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {LINKS.map((l) => {
                  const isActive = active === l.href;
                  return (
                    <li key={l.id}>
                      <a
                        href={l.href}
                        onClick={() => onLinkClick(l.href)}
                        download={l.download ? "Sanjay-Kumar-CV.pdf" : undefined}
                        className={`relative inline-block px-1 py-1 text-sm font-medium transition-transform duration-200 ease-out transform will-change-transform
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-400
                                    ${isActive ? "text-white" : "text-white/80 hover:text-white"}
                                    hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {l.label}
                        {/* underline */}
                        <span
                          className={`absolute left-0 -bottom-1 h-0.5 w-full transform origin-left transition-transform duration-200 ${
                            isActive ? "scale-x-100 bg-linear-to-r from-pink-400 to-violet-400" : "scale-x-0 bg-white/40"
                          }`}
                          style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <a
                href="#contact"
                onClick={() => onLinkClick("#contact")}
                className="ml-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-white/10 transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                style={{ background: "linear-gradient(90deg,#ff6ea1,#7c3aed)" }}
              >
                Get in touch
              </a>
            </div>

            {/* Mobile: hamburger */}
            <div className="md:hidden">
              <button
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((s) => !s)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/6 p-1 text-white/90 transition hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                {open ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex transform flex-col items-center justify-center bg-black/80 px-6 transition-all duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="w-full max-w-md">
          <ul className="flex w-full flex-col gap-6 text-center">
            {LINKS.map((l, i) => (
              <li
                key={l.id}
                style={{ transitionDelay: `${open ? i * 45 : 0}ms` }}
                className={`transform transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              >
                <a
                  href={l.href}
                  onClick={() => onLinkClick(l.href)}
                  className={`block rounded-lg px-4 py-3 text-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-400 ${
                    active === l.href ? "text-white" : "text-white/90 hover:text-white/100"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <a
              href="#contact"
              onClick={() => onLinkClick("#contact")}
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={{ background: "linear-gradient(90deg,#ff6ea1,#7c3aed)" }}
            >
              Contact Me
            </a>
          </div>
        </nav>

        {/* small close hint */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 inline-flex items-center justify-center rounded-md bg-white/6 p-2 text-white/80 md:hidden focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          <span className="sr-only">Close menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}
