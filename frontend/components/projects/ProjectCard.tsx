"use client";

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
    return (
        <article className="card group overflow-hidden transition">
            {/* Kapak */}
            <div className="aspect-[16/9] bg-neutral overflow-hidden">
                {p.image ? (
                    <img
                        src={p.image ? `${p.image}` : "/projects/project-default.jpg"}
                        alt={p.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "/projects/project-default.jpg";
                        }}

                    />
                ) : (
                    <div className="w-full h-full grid place-items-center text-foreground/40 text-sm">
                        Kapak görseli yok
                    </div>
                )}
            </div>

            {/* İçerik */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-semibold line-clamp-1">{p.title}</h3>
                {p.description ? (
                    <p className="text-sm text-foreground/80 line-clamp-2">{p.description}</p>
                ) : null}

                {Array.isArray(p.tech) && p.tech.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                            <span key={t} className="text-xs px-2 py-1 rounded-full bg-neutral">
                                {t}
                            </span>
                        ))}
                    </div>
                ) : null}

                <div className="mt-auto flex gap-4 pt-1">
                    {p.liveUrl ? (
                        <a className="text-accent underline" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live
                        </a>
                    ) : null}
                    {p.githubUrl ? (
                        <a className="text-primary underline" href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
