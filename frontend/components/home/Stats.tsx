"use client";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type StatsResponse = {
    totalProjects: number;
    totalProjectViews: number;
    totalCvDownloads: number;
};

function Counter({ value }: { value: number | undefined }) {
    const safe = Number.isFinite(value) ? (value as number) : 0;
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = Math.max(1, Math.ceil(safe / 50));
        const id = setInterval(() => {
            start += step;
            if (start >= safe) { start = safe; clearInterval(id); }
            setCount(start);
        }, 30);
        return () => clearInterval(id);
    }, [safe]);

    return <span>{count}</span>;
}

export default function Stats() {
    const { data, isLoading, isError } = useQuery<StatsResponse>({
        queryKey: ["stats"],
        queryFn: async () => {
            const res = await api.get("/api/stats"); // public yaptığın endpoint
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-12">
                {[0, 1, 2].map(i => <div key={i} className="h-16 rounded-xl bg-neutral animate-pulse" />)}
            </div>
        );
    }

    if (isError || !data) {
        return <p className="text-center text-red-500">İstatistikler yüklenemedi.</p>;
    }

    const projects = Number(data.totalProjects ?? 0);
    const views = Number(data.totalProjectViews ?? 0);
    const downloads = Number(data.totalCvDownloads ?? 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-12 text-center">
            <div className="glass p-4 rounded-xl">
                <h3 className="text-2xl font-bold text-accent"><Counter value={projects} /></h3>
                <p className="text-sm">Projeler</p>
            </div>

            <div className="glass p-4 rounded-xl">
                <h3 className="text-2xl font-bold text-primary"><Counter value={views} /></h3>
                <p className="text-sm">Proje Görüntülenmeleri</p>
            </div>

            <div className="glass p-4 rounded-xl">
                <h3 className="text-2xl font-bold text-secondary"><Counter value={downloads} /></h3>
                <p className="text-sm">CV İndirmeleri</p>
            </div>
        </div>
    );
}
