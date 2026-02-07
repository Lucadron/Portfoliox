"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";
import { api } from "@/lib/api"; // API instance'ınızı buradan aldığınızı varsayıyorum

export type UiProject = {
    id: string;
    title: string;
    description?: string;
    image?: string;
    tech?: string[];
    liveUrl?: string;
    githubUrl?: string;
};

export default function ProjectCard({ p }: { p: UiProject }) {
    const { lang } = useLang();
    const t = dict[lang].projects;

    const [expanded, setExpanded] = useState(false);

    // GitHub linkine tıklandığında sayaç artırma tetikleyicisi
    const handleGithubClick = async (e: React.MouseEvent) => {
        // Kartın açılmasını (expand) engellemek için
        e.stopPropagation();

        try {
            // Belirttiğin üzere /api/projects/:id endpoint'i sayacı 1 artırıyor
            // Kullanıcıyı bekletmemek için await'i burada tutuyoruz ama hata olsa da link açılmaya devam eder
            await api.get(`/api/projects/${p.id}`);
        } catch (err) {
            // Sessizce konsola yazdırıyoruz, kullanıcı deneyimini bozmaya gerek yok
            console.error("Sayaç artırma hatası:", err);
        }
    };

    const imageSrc = p.image && p.image.trim() !== "" ? p.image : "/projects/project-default.jpg";

    return (
        <article
            className="card group overflow-hidden transition cursor-pointer"
            onClick={() => setExpanded((prev) => !prev)}
        >
            {/* Kapak Görseli */}
            <div className="aspect-[16/9] bg-neutral overflow-hidden">
                <img
                    src={imageSrc}
                    alt={p.title}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/projects/project-default.jpg";
                    }}
                />
            </div>

            {/* İçerik */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-semibold line-clamp-1">{p.title}</h3>

                {/* Açıklama */}
                {p.description ? (
                    <p
                        className={`
                            text-sm text-foreground/80 transition-all duration-300
                            line-clamp-2 
                            group-hover:line-clamp-none
                            ${expanded ? "line-clamp-none" : ""}
                        `}
                    >
                        {p.description}
                    </p>
                ) : null}

                {/* Kullanılan Teknolojiler */}
                {Array.isArray(p.tech) && p.tech.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {p.tech.map((tTech) => (
                            <span key={tTech} className="text-xs px-2 py-1 rounded-full bg-neutral">
                                {tTech}
                            </span>
                        ))}
                    </div>
                ) : null}

                {/* Aksiyon Linkleri */}
                <div className="mt-auto flex gap-4 pt-1">
                    {p.liveUrl ? (
                        <a
                            className="text-accent underline"
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            {t.live}
                        </a>
                    ) : null}

                    {p.githubUrl ? (
                        <a
                            className="text-primary underline"
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleGithubClick} // Güncellenen onClick fonksiyonu
                        >
                            {t.github}
                        </a>
                    ) : null}
                </div>
            </div>
        </article>
    );
}