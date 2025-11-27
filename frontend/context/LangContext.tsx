"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "tr" | "en";

type LangContextType = {
    lang: Lang;
    setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType>({
    lang: "tr",
    setLang: () => { },
});

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("tr");

    useEffect(() => {
        const saved = localStorage.getItem("lang") as Lang | null;
        if (saved) setLang(saved);
    }, []);

    function updateLang(l: Lang) {
        setLang(l);
        localStorage.setItem("lang", l);
    }

    return (
        <LangContext.Provider value={{ lang, setLang: updateLang }}>
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);
