"use client";

import { useLang } from "@/context/LangContext";

export default function LangToggle() {
    const { lang, setLang } = useLang();

    return (
        <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "tr" | "en")}
            className="px-3 py-1 rounded-full border border-border bg-surface text-foreground text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
            <option value="tr">TR</option>
            <option value="en">EN</option>
        </select>
    );
}
 