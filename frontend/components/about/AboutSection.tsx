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

const TR_CONTENT: AboutContent = {
    bio: `Takım çalışmalarına yatkın, yazılım mimarilerine ilgi duyan ve analitik çözüm
odaklı bir Junior Back-End Developer’ım. Gerçek dünya odaklı sistemler geliştirerek;
C#, Node.js, TypeScript, .NET, Docker ve Redis teknolojilerinde uygulamalı tecrübe kazandım.

RESTful API geliştirme, MSSQL, MongoDB ve PostgreSQL ile veritabanı tasarımı,
JWT ve Zod ile güvenlik prensipleri, GitHub Actions ile CI/CD ve Swagger, Kibana ile
gözlemlenebilirlik konularında proje deneyimine sahibim.`,
    experiences: [
        {
            title: "Topluluk Başkanı",
            place: "Sakarya Üniversitesi Bilişim Sistemleri Topluluğu",
            start: "2021",
            end: "2024",
            desc:
                "Takım faaliyetlerini yönettim, projeleri ve etkinlikleri organize ettim, ekip koordinasyonunu sağlayarak liderlik ve iletişim becerilerimi geliştirdim.",
        },
        {
            title: "Yazılım Stajyeri",
            place: "42 Kocaeli",
            start: "06.2022",
            end: "09.2022",
            desc:
                "Algoritma geliştirme ve C++, C# programlama odaklı projeler tamamlayarak problem çözme ve kodlama becerilerimi güçlendirdim.",
        },
        {
            title: "Takım Üyesi - Back-End Geliştirici (.NET)",
            place: "Teknofest T3 Vakfı – Medscript Takımı",
            start: "07.2023",
            end: "05.2024",
            desc:
                ".NET, C#, MSSQL, Bootstrap ve Git kullanarak back-end bileşenleri geliştirdim; yarışma düzeyinde bir uygulamanın geliştirme ve test süreçlerinde aktif rol aldım.",
        },
        {
            title: "Yazılım Stajyeri",
            place: "Bytemounts Yazılım",
            start: "06.2025",
            end: "08.2025",
            desc:
                "Node.js, Express.js, TypeScript ve MongoDB ile ölçeklenebilir REST API’ler geliştirerek modern kurumsal sistemler üzerinde çalıştım.",
        },
        {
            title: "Yazılım Stajyeri",
            place: "Çemsan Endüstriyel Proses ve Otomasyon A.Ş.",
            start: "08.2025",
            end: "10.2025",
            desc:
                "Node.js, Redis cache, JWT auth, PostgreSQL ve Swagger ile kurumsal API geliştirme; GitHub Actions ile CI/CD süreçlerinde görev aldım.",
        },
    ],
    education: [
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
    ],
};

const EN_CONTENT: AboutContent = {
    bio: `I am a junior back-end developer who enjoys working in teams, cares about
software architecture and focuses on analytical problem solving. By building real-world
systems I gained hands-on experience with C#, Node.js, TypeScript, .NET, Docker and Redis.

I have project experience in designing RESTful APIs, modelling databases with MSSQL,
MongoDB and PostgreSQL, applying security principles with JWT & Zod, and setting up
CI/CD pipelines with GitHub Actions together with documentation and observability using Swagger & Kibana.`,
    experiences: [
        {
            title: "Community President",
            place: "Sakarya University Information Systems Community",
            start: "2021",
            end: "2024",
            desc:
                "Led the community activities, organized projects and events, and improved my leadership and communication skills by coordinating the team.",
        },
        {
            title: "Software Intern",
            place: "42 Kocaeli",
            start: "06.2022",
            end: "09.2022",
            desc:
                "Completed projects focused on algorithms and C++ / C#, improving problem-solving and programming skills through peer-reviewed exercises.",
        },
        {
            title: "Team Member – Back-End Developer (.NET)",
            place: "Teknofest T3 Foundation – Medscript Team",
            start: "07.2023",
            end: "05.2024",
            desc:
                "Developed back-end components using .NET, C#, MSSQL, Bootstrap and Git; actively took part in development and testing of a competition-level application.",
        },
        {
            title: "Software Intern",
            place: "Bytemounts Software",
            start: "06.2025",
            end: "08.2025",
            desc:
                "Developed scalable REST APIs with Node.js, Express.js, TypeScript and MongoDB, gaining practical experience with modern enterprise systems.",
        },
        {
            title: "Software Intern",
            place: "Çemsan Industrial Process & Automation",
            start: "08.2025",
            end: "10.2025",
            desc:
                "Worked on corporate APIs using Node.js, Redis cache, JWT auth, PostgreSQL and Swagger; contributed to CI/CD pipelines with GitHub Actions.",
        },
    ],
    education: [
        {
            title: "BSc in Information Systems Engineering",
            place: "Sakarya University",
            start: "2021",
            end: "2025 (September)",
        },
        {
            title: "Ceyhan IMKB Anatolian High School",
            place: "Ceyhan",
            start: "2017",
            end: "2021",
        },
    ],
};

function formatRange(start: string, end: string, lang: "tr" | "en") {
    if (!start && !end) return "";
    if (start && !end) return lang === "tr" ? `${start} – Güncel` : `${start} – Present`;
    if (!start && end) return end;
    return `${start} – ${end}`;
}

export default function AboutSection() {
    const { lang } = useLang();
    const strings = dict[lang].about;
    const content = lang === "tr" ? TR_CONTENT : EN_CONTENT;

    return (
        <div id="about" className="grid gap-6 md:grid-cols-3">
            {/* Hakkımda */}
            <div className="card p-6 md:col-span-1">
                <h3 className="text-lg font-semibold mb-3">{strings.aboutTitle}</h3>
                <p className="text-muted leading-relaxed whitespace-pre-line">{content.bio}</p>
            </div>

            {/* Deneyim */}
            <div className="card p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">{strings.experienceTitle}</h3>
                <ol className="relative border-s border-border/80 ps-6 space-y-5">
                    {content.experiences.map((exp, i) => (
                        <li key={i} className="relative ps-2">
                            <div className="absolute -start-1.5 mt-2 size-3 rounded-full bg-accent" />
                            <div className="font-medium">
                                {exp.title}
                                {exp.place ? ` @ ${exp.place}` : ""}
                            </div>
                            <div className="text-sm text-muted">
                                {formatRange(exp.start, exp.end, lang)}
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
                <h3 className="text-lg font-semibold mb-4">{strings.educationTitle}</h3>
                <ol className="relative border-s border-border/80 ps-6 space-y-5">
                    {content.education.map((edu, i) => (
                        <li key={i} className="relative ps-2">
                            <div className="absolute -start-1.5 mt-2 size-3 rounded-full bg-success" />
                            <div className="font-medium">
                                {edu.title}
                                {edu.place ? ` @ ${edu.place}` : ""}
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
