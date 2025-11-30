"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProjectCard, { UiProject } from "./ProjectCard";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";

// API'den gelen ham proje tipini genel ama typesafe tutuyoruz
type RawProject = Record<string, unknown>;

function toUiProject(x: RawProject): UiProject {
    const getString = (...keys: string[]): string => {
        for (const key of keys) {
            const value = x[key];
            if (typeof value === "string" && value.trim() !== "") {
                return value;
            }
        }
        return "";
    };

    const getStringArray = (...keys: string[]): string[] => {
        for (const key of keys) {
            const value = x[key];

            if (Array.isArray(value)) {
                return value.map((v) => String(v));
            }

            if (typeof value === "string" && value.trim() !== "") {
                return value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
            }
        }
        return [];
    };

    const idSource = x["_id"] ?? x["id"];
    const id = idSource ? String(idSource) : crypto.randomUUID();

    return {
        id,
        title: getString("title", "name", "projectTitle") || "Untitled",
        description: getString("description", "desc"),
        image: getString("coverUrl", "imageUrl", "thumbnail"),
        tech: getStringArray("tech", "techStack", "technologies"),
        liveUrl: getString("liveUrl", "demoUrl", "previewUrl"),
        githubUrl: getString("githubUrl", "repoUrl"),
    };
}

export default function ProjectGrid() {
    const { lang } = useLang();
    const t = dict[lang].projects;

    const { data, isLoading, isError } = useQuery<UiProject[]>({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await api.get("/api/projects");
            const body = res.data as unknown;

            let arr: RawProject[] = [];

            if (Array.isArray(body)) {
                arr = body as RawProject[];
            } else if (
                body &&
                typeof body === "object" &&
                Array.isArray((body as Record<string, unknown>).projects)
            ) {
                arr = (body as Record<string, unknown>).projects as RawProject[];
            }

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

    if (isError || !data) {
        return <p className="text-red-500">{t.loadingError}</p>;
    }

    if (data.length === 0) {
        return <p className="text-foreground/60">{t.empty}</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((p) => (
                <ProjectCard key={p.id} p={p} />
            ))}
        </div>
    );
}
