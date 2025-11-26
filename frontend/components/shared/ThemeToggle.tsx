"use client";
import { useEffect, useState } from "react";
type ThemePref = "system" | "light" | "dark";

function getSystem(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
    const [pref, setPref] = useState<ThemePref>("system");

    useEffect(() => {
        const saved = (localStorage.getItem("theme-pref") as ThemePref) || "system";
        setPref(saved);
    }, []);

    useEffect(() => {
        const active = pref === "system" ? getSystem() : pref;
        document.documentElement.setAttribute("data-theme", active);
        localStorage.setItem("theme-pref", pref);
    }, [pref]);

    return (
        <div className="glass flex items-center gap-2 px-3 py-2">
            <button className={`px-2 py-1 rounded ${pref === "light" ? "bg-accent text-white" : "bg-neutral"}`} onClick={() => setPref("light")} aria-label="Açık">☀️</button>
            <button className={`px-2 py-1 rounded ${pref === "dark" ? "bg-accent text-white" : "bg-neutral"}`} onClick={() => setPref("dark")} aria-label="Koyu">🌙</button>
            <button className={`px-2 py-1 rounded ${pref === "system" ? "bg-accent text-white" : "bg-neutral"}`} onClick={() => setPref("system")} aria-label="Sistem">🖥️</button>
        </div>
    );
}
