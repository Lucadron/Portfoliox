"use client";
import { useEffect, useState } from "react";

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
            className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:bg-accent/80 transition flex items-center justify-center text-xl"
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
}
