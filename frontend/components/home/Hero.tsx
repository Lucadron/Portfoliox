"use client";
import { dict } from "@/lib/i18n";
import { useLang } from "@/context/LangContext";

export default function Hero() {
    const { lang } = useLang();
    const t = dict[lang];

    const cvDownloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/cv/download`;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">
            {/* Sol */}
            <div className="space-y-6">
                <h1 className="text-4xl font-bold">{t.heroTitle}</h1>
                <p className="text-lg text-foreground/80">{t.heroSubtitle}</p>

                <a
                    href="#"
                    onClick={async (e) => {
                        e.preventDefault();

                        // 1) Sayaç artır
                        try {
                            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cv/download-counter`);
                        } catch (err) {
                            console.error("Sayaç artırılamadı:", err);
                        }

                        // 2) PDF’i yeni sekmede aç
                        window.open("/Emre-Gulsen-CV.pdf", "_blank");
                    }}
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
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
                <div className="w-56 h-56 rounded-full border-4 border-accent shadow-lg hidden" />
            </div>
        </section>
    );
}
