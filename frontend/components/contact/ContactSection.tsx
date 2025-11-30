"use client";
import { api } from "@/lib/api";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";

export default function ContactSection() {
    const { lang } = useLang();
    const t = dict[lang].contact;

    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState<null | boolean>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setOk(null);

        const fd = new FormData(e.currentTarget);
        const payload = {
            name: String(fd.get("name") || "").trim(),
            email: String(fd.get("email") || "").trim(),
            subject: fd.get("subject") ? String(fd.get("subject")) : undefined,
            message: String(fd.get("message") || "").trim(),
        };

        if (!payload.name || !payload.email || !payload.message) {
            setOk(false);
            return;
        }

        try {
            setLoading(true);

            await api.post("/api/contact", payload);

            setOk(true);

            if (e?.currentTarget) {
                e.currentTarget.reset();
            }

        } catch (err) {
            console.error(err);
            setOk(false);
        } finally {
            setLoading(false);
        }
    }
    const inputStyle =
        "w-full border border-border bg-surface text-text placeholder-muted rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 shadow-sm";

    return (
        <div id="contact" className="max-w-6xl mx-auto p-6 lg:p-10 card">
            <div className="grid md:grid-cols-2 gap-10">
                {/* Sol blok */}
                <div className="space-y-4 md:space-y-6 self-start md:self-center">
                    <h3 className="text-3xl font-bold text-primary">{t.title}</h3>
                    <p className="text-lg text-muted">{t.subtitle}</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="p-6 sm:p-8 rounded-lg shadow-md space-y-5 bg-panel border border-border"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="name" placeholder={t.name} className={inputStyle} required />
                        <input
                            name="email"
                            type="email"
                            placeholder={t.email}
                            className={inputStyle}
                            required
                        />
                    </div>

                    <input name="subject" required placeholder={t.subject} className={inputStyle} />

                    <textarea
                        name="message"
                        rows={6}
                        placeholder={t.message}
                        className={inputStyle + " resize-y"}
                        required
                    />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn-primary px-6 py-2.5 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                        >
                            {loading ? t.sending : t.send}
                        </button>

                        <div className="min-h-[20px]">
                            {ok === true && (
                                <span className="text-success font-medium flex items-center gap-1">
                                    {t.success}
                                </span>
                            )}
                            {ok === false && (
                                <span className="text-red-500 font-medium flex items-center gap-1">
                                    {t.error}
                                </span>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
