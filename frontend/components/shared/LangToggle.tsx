"use client";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

export default function LangToggle() {
    const [lang, setLang] = useState<Lang>("tr");

    useEffect(() => {
        const saved = (localStorage.getItem("lang") as Lang) || "tr";
        setLang(saved);
        document.documentElement.lang = saved;
    }, []);
    useEffect(() => {
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang;
    }, [lang]);

    return (
        <select value={lang} onChange={e => setLang(e.target.value as Lang)} className="glass px-2 py-1" aria-label="Dil">
            <option value="tr">TR</option>
            <option value="en">EN</option>
        </select>
    );
}
