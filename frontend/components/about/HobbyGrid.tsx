"use client";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";
import { useState } from "react";

type HobbyRaw = {
    _id: string;
    title?: string;
    name?: string;
    description?: string;
    desc?: string;
    icon?: string;
};

type Hobby = { id: string; title: string; description?: string; icon?: string };

function normalize(h: HobbyRaw, fallbackTitle: string): Hobby {
    return {
        id: String(h._id),
        title: (h.title || h.name || fallbackTitle).trim(),
        description: (h.description || h.desc || "").trim(),
        icon: h.icon || "🎯",
    };
}

export default function HobbyGrid() {
    const { lang } = useLang();
    const t = dict[lang].hobbies;

    const { data, isLoading, isError } = useQuery<Hobby[]>({
        queryKey: ["hobbies", lang],
        queryFn: async () => {
            const res = await api.get(`/api/hobbies?lang=${lang}`);
            const arr = Array.isArray(res.data) ? res.data : [];
            return arr.map((h) => normalize(h, t.fallbackTitle));
        },
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="card h-20 animate-pulse" />
                ))}
            </div>
        );
    }

    if (isError || !data) return <p className="text-red-500">{t.loadingError}</p>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.map((h) => (
                <HobbyCard key={h.id} hobby={h} />
            ))}
        </div>
    );
}

/* -----------------------------------------
 *   Card Component (ProjectCard tarzı)
 * ----------------------------------------- */

function HobbyCard({ hobby }: { hobby: Hobby }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            onClick={() => setExpanded((p) => !p)}
            className="
                card p-3 flex gap-3 group cursor-pointer
                transition-all duration-300
            "
        >
            {/* Icon */}
            <div className="min-w-10 min-h-10 flex items-center justify-center rounded-full bg-accent/10 text-xl">
                {hobby.icon}
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm break-words leading-tight mb-1">
                    {hobby.title}
                </div>

                {hobby.description && (
                    <p
                        className={`
                            text-xs text-muted leading-snug whitespace-pre-line
                            transition-all duration-300
                            line-clamp-2
                            group-hover:line-clamp-none
                            ${expanded ? "line-clamp-none" : ""}
                        `}
                    >
                        {hobby.description}
                    </p>
                )}
            </div>
        </div>
    );
}
