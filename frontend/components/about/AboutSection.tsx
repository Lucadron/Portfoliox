"use client";

const BIO = `Takım çalışmalarına yatkın, yazılım mimarilerine ilgi duyan ve analitik
çözüm odaklı bir Junior Back-End Developer’ım. Gerçek dünya odaklı
sistemler geliştirerek; C#, .NET, ASP .NET Core, Node.js, TypeScript,
Docker ve Redis teknolojilerinde uygulamalı tecrübe kazandım.

RESTful API geliştirme, MSSQL, MongoDB ve PostgreSQL ile veritabanı
tasarımı, JWT ile güvenlik prensipleri ve GitHub Actions ile CI/CD
süreçlerinde proje deneyimine sahibim.`;

type Experience = {
    title: string;
    place: string;
    start: string;
    end: string;
    desc?: string;
};

type Education = {
    title: string;
    place: string;
    start: string;
    end: string;
};

const EXPERIENCES: Experience[] = [
    {
        title: "Topluluk Başkanı",
        place: "Sakarya Üniversitesi Bilişim Sistemleri Topluluğu",
        start: "2021",
        end: "2024",
        desc:
            "Takım faaliyetlerini yönettim, projeleri ve etkinlikleri organize ettim, " +
            "ekip üyeleriyle koordinasyonu sağlayarak liderlik ve iletişim becerilerimi geliştirdim.",
    },
    {
        title: "Yazılım Stajyeri",
        place: "42 Kocaeli",
        start: "06.2022",
        end: "09.2022",
        desc:
            "Algoritma geliştirme ve C++, C# programlama odaklı projeler tamamlayarak " +
            "problem çözme ve kodlama becerilerimi güçlendirdim.",
    },
    {
        title: "Takım Üyesi - Back-End Geliştirici (.NET)",
        place: "Teknofest T3 Vakfı – Medscript Takımı",
        start: "07.2023",
        end: "05.2024",
        desc:
            ".NET, C#, MSSQL, Bootstrap ve Git kullanarak back-end bileşenleri geliştirdim; " +
            "yarışma düzeyinde bir uygulamanın geliştirme ve test süreçlerinde aktif rol aldım.",
    },
    {
        title: "Yazılım Stajyeri",
        place: "Bytemounts Yazılım",
        start: "06.2025",
        end: "08.2025",
        desc:
            "Node.js, Express.js, TypeScript ve MongoDB ile ölçeklenebilir REST API’ler geliştirdim; " +
            "modern yazılım mimarileri ve kurumsal sistemler üzerinde çalıştım.",
    },
    {
        title: "Yazılım Stajyeri",
        place: "Çemsan Endüstriyel Proses ve Otomasyon A.Ş.",
        start: "08.2025",
        end: "10.2025",
        desc:
            "ASP.NET Core tabanlı kurumsal API geliştirme, MSSQL veri modelleme ve optimizasyonu, " +
            "Redis cache, JWT auth, Swagger dokümantasyonu ve GitHub Actions ile CI/CD süreçlerine katkı sağladım.",
    },
];

const EDUCATION: Education[] = [
    {
        title: "Bilişim Sistemleri Mühendisliği",
        place: "Sakarya Üniversitesi",
        start: "2021",
        end: "2025 (Eylül)",
    },
    {
        title: "Ceyhan İMKB Anadolu Lisesi",
        place: "Ceyhan",
        start: "2017",
        end: "2021",
    },
];

function formatRange(start: string, end: string) {
    if (!start && !end) return "";
    if (start && !end) return `${start} – Güncel`;
    if (!start && end) return end;
    return `${start} – ${end}`;
}

export default function AboutSection() {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {/* Hakkımda */}
            <div className="card p-6 md:col-span-1">
                <h3 className="text-lg font-semibold mb-3">Hakkımda</h3>
                <p className="text-muted leading-relaxed whitespace-pre-line">
                    {BIO}
                </p>
            </div>

            {/* Deneyim */}
            <div className="card p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Deneyim</h3>
                <ol className="relative border-s border-border/80 ps-6 space-y-5">
                    {EXPERIENCES.map((exp, i) => (
                        <li key={i} className="relative ps-2">
                            <div className="absolute -start-1.5 mt-2 size-3 rounded-full bg-accent" />
                            <div className="font-medium">
                                {exp.title}
                                {exp.place ? ` @ ${exp.place}` : ""}
                            </div>
                            <div className="text-sm text-muted">
                                {formatRange(exp.start, exp.end)}
                            </div>
                            {exp.desc && (
                                <p className="text-sm mt-1 text-foreground/80">{exp.desc}</p>
                            )}
                        </li>
                    ))}
                </ol>
            </div>

            {/* Eğitim */}
            <div className="card p-6 md:col-span-2 md:col-start-2">
                <h3 className="text-lg font-semibold mb-4">Eğitim</h3>
                <ol className="relative border-s border-border/80 ps-6 space-y-5">
                    {EDUCATION.map((edu, i) => (
                        <li key={i} className="relative ps-2">
                            <div className="absolute -start-1.5 mt-2 size-3 rounded-full bg-success" />
                            <div className="font-medium">
                                {edu.title}
                                {edu.place ? ` @ ${edu.place}` : ""}
                            </div>
                            <div className="text-sm text-muted">
                                {formatRange(edu.start, edu.end)}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
