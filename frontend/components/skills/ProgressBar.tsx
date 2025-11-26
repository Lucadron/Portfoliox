"use client";
import { useEffect, useRef } from "react";

export default function ProgressBar({ value }: { value: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.style.width = `${Math.max(0, Math.min(100, value))}%`;
                io.disconnect();
            }
        }, { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, [value]);

    return (
        <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
            <div ref={ref} className="h-full w-0 bg-accent transition-[width] duration-700" />
        </div>
    );
}
