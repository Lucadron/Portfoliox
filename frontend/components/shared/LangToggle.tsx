"use client";
import { useLang } from "@/context/LangContext";

export default function LangToggle() {
    const { lang, setLang } = useLang();

    return (
        <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "tr" | "en")}
            className="
                px-3 py-1 rounded-md border 
                bg-white text-black 
                dark:bg-gray-800 dark:text-white 
                dark:border-gray-600
            "
        >
            <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="tr">TR</option>
            <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="en">EN</option>
        </select>
    );
}
