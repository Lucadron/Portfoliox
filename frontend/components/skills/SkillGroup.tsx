"use client";
import ProgressBar from "./ProgressBar";

export type UiSkill = {
    id: string;
    name: string;
    level?: number;
};

const ICONS: Record<string, string> = {
    Frontend: "🎨",
    Backend: "🧩",
    Database: "⛃",
    Tools: "🛠️",
};

export default function SkillGroup({
    category,
    title,
    items,
}: {
    category: "Frontend" | "Backend" | "Database" | "Tools";
    title: string;
    items: UiSkill[];
}) {
    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">
                <span className="mr-2">{ICONS[category] ?? "⭐"}</span>
                {title}
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {items.map((s) => (
                    <div key={s.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{s.name}</span>
                            {Number.isFinite(s.level) ? <span>{s.level}%</span> : null}
                        </div>
                        <ProgressBar value={Number(s.level ?? 0)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
