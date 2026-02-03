"use client";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";

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

type AboutContent = {
    bio: string;
    experiences: Experience[];
    education: Education[];
};

/* ===================== TR ===================== */

const TR_CONTENT: AboutContent = {
    bio: `Backend odaklı çalışan bir yazılım mühendisiyim. Gerçek dünya problemlerine
ölçeklenebilir ve sürdürülebilir çözümler üretmeye odaklanıyorum.

Java, Spring Boot, Node.js ve TypeScript ile RESTful servisler geliştirdim; PostgreSQL,
MongoDB ve Redis ile veri modelleme ve performans optimizasyonu yaptım.
JWT tabanlı güvenlik, CI/CD süreçleri, Docker ile containerization ve
temiz mimari prensipleri günlük çalışma pratiğimin bir parçasıdır.`,

    experiences: [
        {
            title: "Software Engineering Intern",
            place: "Çemsan Endüstriyel Proses ve Otomasyon A.Ş.",
            start: "08.2025",
            end: "09.2025",
            desc:
                "Java, Spring Boot, PostgreSQL ve Redis kullanarak RESTful backend servisleri geliştirdim. " +
                "JWT tabanlı kimlik doğrulama, logging ve CI/CD pipeline’ları üzerine çalıştım.",
        },
        {
            title: "Software Engineering Intern",
            place: "Bytemounts Yazılım",
            start: "06.2025",
            end: "07.2025",
            desc:
                "Node.js, TypeScript ve MongoDB ile ölçeklenebilir REST API’ler geliştirdim. " +
                "Modüler mimari, clean code ve Git tabanlı Agile çalışma süreçlerinde aktif rol aldım.",
        },
        {
            title: "Junior Back-End Developer (Gönüllü)",
            place: "Teknofest T3 Vakfı – Medscript Takımı",
            start: "07.2023",
            end: "05.2024",
            desc:
                "Java, Spring Boot ve Spring Security kullanarak tıbbi backend servisleri geliştirdim. " +
                "Güvenli API’ler ve transactional veri akışları üzerinde çalıştım.",
        },
        {
            title: "Topluluk Başkanı",
            place: "SAÜ Bilişim Sistemleri Mühendisliği Topluluğu",
            start: "04.2022",
            end: "05.2024",
            desc:
                "1000+ üyeli mühendislik topluluğuna liderlik ettim. Teknik etkinlikler, ekip koordinasyonu " +
                "ve sürdürülebilir topluluk büyümesi sağladım.",
        },
    ],

    education: [
        {
            title: "Bilişim Sistemleri Mühendisliği (Lisans)",
            place: "Sakarya Üniversitesi",
            start: "2021",
            end: "2025",
        },
    ],
};

/* ===================== EN ===================== */

const EN_CONTENT: AboutContent = {
    bio: `I am a backend-focused software engineer, building scalable and maintainable
solutions for real-world problems.

I have hands-on experience developing RESTful services with Java, Spring Boot,
Node.js, and TypeScript, alongside data modeling and performance optimization
using PostgreSQL, MongoDB, and Redis.
Security with JWT, CI/CD pipelines, Docker containerization, and clean architecture
principles are part of my daily workflow.`,

    experiences: [
        {
            title: "Software Engineering Intern",
            place: "Çemsan Industrial Processes & Automation",
            start: "08.2025",
            end: "09.2025",
            desc:
                "Developed RESTful backend services using Java, Spring Boot, PostgreSQL, and Redis. " +
                "Worked on JWT-based authentication, logging, and CI/CD pipelines.",
        },
        {
            title: "Software Engineering Intern",
            place: "Bytemounts Software",
            start: "06.2025",
            end: "07.2025",
            desc:
                "Built scalable REST APIs with Node.js, TypeScript, and MongoDB. " +
                "Focused on modular architecture, clean code practices, and Git-based Agile collaboration.",
        },
        {
            title: "Junior Back-End Developer (Volunteer)",
            place: "Teknofest T3 Foundation – Medscript Team",
            start: "07.2023",
            end: "05.2024",
            desc:
                "Developed medical backend services using Java, Spring Boot, and Spring Security, " +
                "delivering secure APIs and transactional data workflows.",
        },
        {
            title: "Community President",
            place: "Information Systems Engineering Community – Sakarya University",
            start: "04.2022",
            end: "05.2024",
            desc:
                "Led a 1000+ member engineering community, organizing technical events and " +
                "driving sustainable growth through cross-team coordination.",
        },
    ],

    education: [
        {
            title: "BSc in Information Systems Engineering",
            place: "Sakarya University",
            start: "2021",
            end: "2025",
        },
    ],
};

/* ===================== HELPERS ===================== */

function formatRange(start: string, end: string, lang: "tr" | "en") {
    if (!start && !end) return "";
    if (start && !end) return lang === "tr" ? `${start} – Güncel` : `${start} – Present`;
    return `${start} – ${end}`;
}

/* ===================== COMPONENT ===================== */

export default function AboutSection() {
    const { lang } = useLang();
    const strings = dict[lang].about;
    const content = lang === "tr" ? TR_CONTENT : EN_CONTENT;

    return (
        <div id="about" className="grid gap-6 md:grid-cols-3">
            {/* About */}
            <div className="card p-6 md:col-span-1">
                <h3 className="text-lg font-semibold mb-3">{strings.aboutTitle}</h3>
                <p className="text-muted leading-relaxed whitespace-pre-line">
                    {content.bio}
                </p>
            </div>

            {/* Experience */}
            <div className="card p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                    {strings.experienceTitle}
                </h3>
                <ol className="relative border-s border-border/80 ps-6 space-y-5">
                    {content.experiences.map((exp, i) => (
                        <li key={i} className="relative ps-2">
                            <div className="absolute -start-1.5 mt-2 size-3 rounded-full bg-accent" />
                            <div className="font-medium">
                                {exp.title} @ {exp.place}
                            </div>
                            <div className="text-sm text-muted">
                                {formatRange(exp.start, exp.end, lang)}
                            </div>
                            {exp.desc && (
                                <p className="text-sm mt-1 text-foreground/80">
                                    {exp.desc}
                                </p>
                            )}
                        </li>
                    ))}
                </ol>
            </div>

            {/* Education */}
            <div className="card p-6 md:col-span-2 md:col-start-2">
                <h3 className="text-lg font-semibold mb-4">
                    {strings.educationTitle}
                </h3>
                <ol className="relative border-s border-border/80 ps-6 space-y-5">
                    {content.education.map((edu, i) => (
                        <li key={i} className="relative ps-2">
                            <div className="absolute -start-1.5 mt-2 size-3 rounded-full bg-success" />
                            <div className="font-medium">
                                {edu.title} @ {edu.place}
                            </div>
                            <div className="text-sm text-muted">
                                {formatRange(edu.start, edu.end, lang)}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
