"use client";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type HobbyRaw = {
    _id: string;
    title?: string;
    name?: string;           // olası eski alan
    description?: string;
    desc?: string;           // olası eski alan
    icon?: string;
};

type Hobby = { id: string; title: string; description?: string; icon?: string };

function normalize(h: HobbyRaw): Hobby {
    return {
        id: String(h._id),
        title: (h.title || h.name || "Hobi").trim(),
        description: (h.description || h.desc || "").trim(),
        icon: h.icon || "🎯",
    };
}

export default function HobbyGrid() {
    const { data, isLoading, isError } = useQuery<Hobby[]>({
        queryKey: ["hobbies"],
        queryFn: async () => {
            const res = await api.get("/api/hobbies");
            const arr = Array.isArray(res.data) ? res.data : [];
            return arr.map(normalize);
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
    if (isError || !data) return <p className="text-red-500">Hobiler yüklenemedi.</p>;

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
                            <p className="text-sm text-muted whitespace-pre-line break-words">{h.description}</p>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
}
