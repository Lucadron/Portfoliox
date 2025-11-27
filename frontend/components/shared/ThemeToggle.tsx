"use client";
import { useEffect, useState } from "react";
type ThemePref = "system" | "light" | "dark";

function getSystem(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
    const [pref, setPref] = useState<ThemePref>("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme-pref") as ThemePref | null;
        setPref(saved ?? "light");
    }, []);

    useEffect(() => {
        const active = pref === "system" ? getSystem() : pref;
        document.documentElement.setAttribute("data-theme", active);
        localStorage.setItem("theme-pref", pref);
    }, [pref]);

    return (
        <div className="glass flex items-center gap-2 px-3 py-2">
            <button className={`px-2 py-1 rounded ${pref === "light" ? "bg-accent text-white" : "bg-neutral"}`} onClick={() => setPref("light")}>☀️</button>
            <button className={`px-2 py-1 rounded ${pref === "dark" ? "bg-accent text-white" : "bg-neutral"}`} onClick={() => setPref("dark")}>🌙</button>
            <button className={`px-2 py-1 rounded ${pref === "system" ? "bg-accent text-white" : "bg-neutral"}`} onClick={() => setPref("system")}>🖥️</button>
        </div>
    );
}
