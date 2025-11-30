"use client";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import SkillGroup, { UiSkill } from "./SkillGroup";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";

type ApiSkill = {
    _id: string;
    name: string;
    level: number;
    category: "Frontend" | "Backend" | "Database" | "Tools";
    order?: number;
};

export default function SkillsSection() {
    const { lang } = useLang();
    const t = dict[lang];

    const { data, isLoading, isError } = useQuery({
        queryKey: ["skills"],
        queryFn: async (): Promise<
            { category: ApiSkill["category"]; title: string; items: UiSkill[] }[]
        > => {
            const res = await api.get<ApiSkill[]>("/api/skills");
            const arr = res.data ?? [];

            const categories: ApiSkill["category"][] = [
                "Frontend",
                "Backend",
                "Database",
                "Tools",
            ];

            return categories.map((category) => ({
                category,
                title: t.skillsCategories[category],
                items: arr
                    .filter((s) => s.category === category)
                    .sort(
                        (a, b) =>
                            (a.order ?? 0) - (b.order ?? 0) ||
                            a.name.localeCompare(b.name)
                    )
                    .map((s) => ({ id: s._id, name: s.name, level: s.level })),
            }));
        },
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-40 rounded-2xl bg-neutral animate-pulse" />
                ))}
            </div>
        );
    }
    if (isError || !data)
        return <p className="text-red-500">Yetenekler yüklenemedi.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.map((g) => (
                <SkillGroup
                    key={g.category}
                    category={g.category}
                    title={g.title}
                    items={g.items}
                />
            ))}
        </div>
    );
}
