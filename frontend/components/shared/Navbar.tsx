"use client";

import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";

export default function Navbar() {
    const { lang } = useLang();
    const t = dict[lang];

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur bg-background/70 border-b">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
                <Link href="#top"
                className="font-semibold hover:opacity-80 transition"
                >
                    Emre Gulsen
                </Link>

                <div className="flex items-center gap-4 text-sm flex-wrap">
                    <a href="#projects" className="hover:opacity-80">
                        {t.nav.projects}
                    </a>
                    <a href="#skills" className="hover:opacity-80">
                        {t.nav.skills}
                    </a>
                    <a href="#about" className="hover:opacity-80">
                        {t.nav.about}
                    </a>
                    <a href="#contact" className="hover:opacity-80">
                        {t.nav.contact}
                    </a>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <LangToggle />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
