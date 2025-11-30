"use client";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";

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
        queryKey: ["hobbies"],
        queryFn: async () => {
            const res = await api.get("/api/hobbies");
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
                <div key={h.id} className="card p-4 flex items-center gap-3">
                    <div className="size-9 grid place-items-center rounded-full bg-accent/10 text-lg">
                        {h.icon}
                    </div>
                    <div className="min-w-0">
                        <div className="font-medium truncate">{h.title}</div>
                        {h.description ? (
                            <p className="text-sm text-muted whitespace-pre-line break-words">
                                {h.description}
                            </p>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
}
