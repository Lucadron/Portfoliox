"use client";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProjectCard, { UiProject } from "./ProjectCard";

type Any = Record<string, any>;

function toUiProject(x: Any): UiProject {
    return {
        id: String(x._id ?? x.id ?? crypto.randomUUID()),
        title: String(x.title ?? x.name ?? x.projectTitle ?? "Untitled"),
        description: x.description ?? x.desc ?? "",
        image: x.coverUrl ?? x.imageUrl ?? x.thumbnail ?? "",
        tech: x.tech ?? x.techStack ?? x.technologies ?? [],
        liveUrl: x.liveUrl ?? x.demoUrl ?? x.previewUrl ?? "",
        githubUrl: x.githubUrl ?? x.repoUrl ?? "",
    };
}

export default function ProjectGrid() {
    const { data, isLoading, isError } = useQuery<UiProject[]>({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await api.get("/api/projects");
            const arr: Any[] = Array.isArray(res.data) ? res.data : res.data?.projects ?? [];
            return arr.map(toUiProject);
        },
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-80 rounded-2xl bg-neutral animate-pulse" />
                ))}
            </div>
        );
    }

    if (isError || !data) return <p className="text-red-500">Projeler yüklenemedi.</p>;
    if (data.length === 0) return <p className="text-foreground/60">Henüz proje eklenmemiş.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((p) => (
                <ProjectCard key={p.id} p={p} />
            ))}
        </div>
    );
}
