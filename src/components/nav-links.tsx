"use client";

import { useCallback, useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function NavLinks() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;

      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollY) {
          current = section.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActive(id);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <nav className="hidden lg:block">
      <ul className="flex flex-col gap-5">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`group flex cursor-pointer items-center text-xs font-bold uppercase tracking-widest transition-colors duration-300 ease-in-out ${
                  isActive
                    ? "text-slate-50"
                    : "text-slate-400 hover:text-slate-50"
                }`}
              >
                <span
                  className="mr-3 inline-block h-px transition-all duration-300 ease-in-out"
                  style={{
                    width: isActive ? "4rem" : "2rem",
                    backgroundColor: isActive
                      ? "rgb(226, 232, 240)"
                      : "rgb(100, 116, 139)",
                  }}
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
