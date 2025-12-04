"use client";

import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";

export default function Navbar() {
    const { lang } = useLang();
    const t = dict[lang];

    const [active, setActive] = useState<string>("home");
    const [shrink, setShrink] = useState(false); // scroll shrink

    /* Active section detection */
    useEffect(() => {
        const sections = ["projects", "skills", "about", "contact"];

        const handler = () => {
            let current = "home";

            for (const id of sections) {
                const el = document.getElementById(id);
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    current = id;
                    break;
                }
            }

            setActive(current);
            setShrink(window.scrollY > 40);
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    /* Premium underline + active highlight */
    const linkClass = (id: string) =>
        `relative px-2 py-1 transition
         after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-accent 
         after:transition-all after:rounded-full
         hover:after:w-full
         ${active === id
            ? "after:w-full font-semibold text-accent"
            : "text-foreground/80"
        }`;

    return (
        <header
            className={`
                sticky top-0 z-50 w-full backdrop-blur bg-background/70 border-b
                transition-all duration-300
                ${shrink ? "py-1" : "py-3"}
            `}
        >
            <nav
                className={`
                    mx-auto max-w-6xl px-4 
                    flex items-center justify-between gap-4 flex-wrap
                    transition-all duration-300
                `}
            >
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <Link
                        href="#top"
                        className={`
                            font-bold hover:opacity-80 transition
                            ${shrink ? "text-base" : "text-lg"}
                        `}
                    >
                        Emre Gulsen
                    </Link>

                    {/* Social icons */}
                    <a href="https://github.com/Lucadron" target="_blank" className="opacity-70">
                        <Github size={18} />
                    </a>

                    <a href="https://linkedin.com/in/emregulsen" target="_blank" className="opacity-70">
                        <Linkedin size={18} />
                    </a>


                </div>

                {/* Menu */}
                <div className="flex items-center gap-4 text-sm flex-wrap">
                    <a href="#projects" className={linkClass("projects")}>
                        {t.nav.projects}
                    </a>

                    <a href="#skills" className={linkClass("skills")}>
                        {t.nav.skills}
                    </a>

                    <a href="#about" className={linkClass("about")}>
                        {t.nav.about}
                    </a>

                    <a href="#contact" className={linkClass("contact")}>
                        {t.nav.contact}
                    </a>
                </div>

                {/* Toggles (desktop only) */}
                <div className="hidden md:flex items-center gap-4">
                    <LangToggle />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
