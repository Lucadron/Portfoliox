"use client";
import { useEffect, useState } from "react";

type ThemePref = "system" | "light" | "dark";

function getSystem(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
    const [pref, setPref] = useState<ThemePref>("light");

    // İlk yüklemede localStorage kontrolü
    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("theme-pref") as ThemePref | null;
        if (saved === "light" || saved === "dark" || saved === "system") {
            setPref(saved);
        } else {
            setPref("light");
        }
    }, []);

    // body tema sınıfını güncelle
    useEffect(() => {
        if (typeof document === "undefined") return;
        const active = pref === "system" ? getSystem() : pref;
        document.documentElement.setAttribute("data-theme", active);
        localStorage.setItem("theme-pref", pref);
    }, [pref]);

    return (
        <div className="glass flex items-center gap-2 px-3 py-2 whitespace-nowrap">
            <button
                className={`px-2 py-1 rounded-full ${pref === "light" ? "bg-accent text-white" : "bg-neutral"
                    }`}
                onClick={() => setPref("light")}
                aria-label="Light"
            >
                ☀️
            </button>
            <button
                className={`px-2 py-1 rounded-full ${pref === "dark" ? "bg-accent text-white" : "bg-neutral"
                    }`}
                onClick={() => setPref("dark")}
                aria-label="Dark"
            >
                🌙
            </button>
            <button
                className={`px-2 py-1 rounded-full ${pref === "system" ? "bg-accent text-white" : "bg-neutral"
                    }`}
                onClick={() => setPref("system")}
                aria-label="System"
            >
                🖥️
            </button>
        </div>
    );
}
