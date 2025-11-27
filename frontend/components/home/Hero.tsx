"use client";
import { dict } from "@/lib/i18n";
import { useEffect, useState } from "react";

export default function Hero() {
    const [lang, setLang] = useState<"tr" | "en">("tr");

    useEffect(() => {
        const saved = (localStorage.getItem("lang") as "tr" | "en") || "tr";
        setLang(saved);
    }, []);

    const t = dict[lang];

    const fileName = "cv.pdf"; // istersen: "Emre-Gulsen-CV.pdf"
    const cvDownloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/cv/download`;
    const cvApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/cv/`;


    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">
            {/* Sol */}
            <div className="space-y-6">
                <h1 className="text-4xl font-bold">{t.heroTitle}</h1>
                <p className="text-lg text-foreground/80">{t.heroSubtitle}</p>

                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/cv/download`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-accent text-white px-6 py-3 rounded-lg shadow hover:bg-accent/90 transition"
                >
                    {t.downloadCV}
                </a>
            </div>

            {/* Sağ */}
            <div className="flex justify-center">
                <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-56 h-56 object-cover rounded-full shadow-lg border-4 border-accent"
                    onError={(e) => {
                        // Görsel yoksa basit bir placeholder çizin
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
                {/* Görsel yoksa boş kalmasın diye halka */}
                <div className="w-56 h-56 rounded-full border-4 border-accent shadow-lg hidden" />
            </div>
        </section>
    );
}
