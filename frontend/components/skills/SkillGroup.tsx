"use client";
import ProgressBar from "./ProgressBar";

export type UiSkill = {
    id: string;
    name: string;
    level?: number;   // 0-100
};
const ICONS: Record<string, string> = { Frontend: "🎨", Backend: "🧩", Tools: "🛠️" };

export default function SkillGroup({ title, items }: { title: string; items: UiSkill[] }) {
    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">  <span className="mr-2">{ICONS[title] ?? "⭐"}</span>{title}
            </h3>

            <div className="space-y-4">
                {items.map(s => (
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
