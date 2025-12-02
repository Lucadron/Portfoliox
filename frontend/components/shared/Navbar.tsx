"use client";

import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";
import { useEffect, useState } from "react";
import TopSettingsBar from "@/components/shared/TopSettingsBar";
import { Github, Linkedin } from "lucide-react";

export default function Navbar() {
    const { lang } = useLang();
    const t = dict[lang];

    const [active, setActive] = useState<string>("home");

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
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const linkClass = (id: string) =>
        `relative px-2 py-1 transition
         after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all
         hover:after:w-full
         ${active === id ? "after:w-full font-semibold text-accent" : "text-foreground/80"}`;

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur bg-background/70 border-b">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4 flex-wrap">

                {/* Brand */}
                <Link href="#top" className="text-lg font-bold hover:opacity-80 transition">
                    Emre Gulsen
                </Link>

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

                {/* Toggles + Social (desktop only) */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://github.com/Lucadron"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-accent transition"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/emregulsen/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-accent transition"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>

                    <LangToggle />
                    <ThemeToggle />
                </div>

            </nav>
        </header>
    );
}
