"use client";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import SkillGroup, { UiSkill } from "./SkillGroup";

type ApiSkill = {
    _id: string;
    name: string;
    level: number; // 0–100
    category: "Frontend" | "Backend" | "Database" | "Tools";
    order?: number;
};

export default function SkillsSection() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["skills"],
        queryFn: async (): Promise<{ title: string; items: UiSkill[] }[]> => {
            const res = await api.get<ApiSkill[]>("/api/skills");
            const arr = res.data ?? [];

            const titles = ["Frontend", "Backend","Database", "Tools"] as const;
            return titles.map((title) => ({
                title,
                items: arr
                    .filter((s) => s.category === title)
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name))
                    .map((s) => ({ id: s._id, name: s.name, level: s.level })),
            }));
        },
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="h-40 rounded-2xl bg-neutral animate-pulse" />
                ))}
            </div>
        );
    }
    if (isError || !data) return <p className="text-red-500">Yetenekler yüklenemedi.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((g) => (
                <SkillGroup key={g.title} title={g.title} items={g.items} />
            ))}
        </div>
    );
}
