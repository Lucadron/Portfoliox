"use client";

import { useEffect, useState } from "react";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";

export default function TopSettingsBar() {
    const [progress, setProgress] = useState(0); // 0=visible, 1=hidden

    const NAVBAR_HEIGHT = 56; // Navbar yüksekliğini burada belirledik

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;

            // Scroll 0 → görünür, 60px sonrası tamamen kayıp
            const p = Math.min(y / 60, 1);
            setProgress(p);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="w-full z-40 md:hidden flex justify-center"
            style={{
                position: "sticky",
                top: NAVBAR_HEIGHT, // navbar altına yerleşiyor
                transform: `translateY(-${progress * NAVBAR_HEIGHT}px)`,
                opacity: 1 - progress,
                transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
        >
            {/* İç panel */}
            <div
                className="px-4 py-2 rounded-2xl shadow-md border bg-background/90 backdrop-blur flex items-center gap-4 mt-2"
            >
                <LangToggle />
                <ThemeToggle />
            </div>
        </div>
    );
}
