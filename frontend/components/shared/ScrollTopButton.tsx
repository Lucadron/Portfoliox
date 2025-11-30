"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollTopButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handler = () => setShow(window.scrollY > 300);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    if (!show) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
            fixed bottom-6 right-6 z-[999]
            w-12 h-12 rounded-full
            backdrop-blur bg-background/70 border border-border
            shadow-xl hover:shadow-2xl
            flex items-center justify-center
            transition-transform hover:scale-110 
            text-accent
        "
        >
            <ChevronUp size={22} />
        </button>
    );
}
