export type Lang = "tr" | "en";

export const dict = {
    tr: {
        // NAVBAR
        nav: {
            home: "Anasayfa",
            projects: "Projeler",
            skills: "Yetenekler",
            about: "Hakkımda",
            contact: "İletişim",
        },

        // HERO
        heroTitle: "Merhaba, ben Emre",
        heroSubtitle: "Software Engineer | Bilişim Sistemleri Mühendisi",
        downloadCV: "CV İndir",

        // STATS
        stats: {
            projects: "Projeler",
            views: "Proje Görüntülenmeleri",
            downloads: "CV İndirmeleri",
        },

        // ABOUT
        aboutTitle: "Hakkımda",
        aboutDescription:
            "4+ yıllık tecrübeye sahip bir Full-Stack Developer olarak .NET, Node.js, React, MongoDB ve MSSQL alanlarında üretim seviyesinde projeler geliştiriyorum. Temiz kod, sağlam mimari ve performans odaklı uygulamalar geliştirmeye önem veriyorum.",

        // SKILLS
        skillsTitle: "Yetenekler",
        skillsSubtitle: "Backend, Frontend, Database ve DevOps yeteneklerim",

        // PROJECTS
        projectsTitle: "Projeler",
        projectsSubtitle: "Geliştirdiğim projeler ve çalışmalarım",

        // HOBBIES
        hobbiesTitle: "Hobilerim",
        hobbiesSubtitle: "Kendimi geliştirmek için yaptığım aktiviteler",

        // CONTACT
        contactTitle: "İletişime Geç",
        contactSubtitle: "Bana mesaj gönderebilir veya bağlantı kurabilirsin",

        form: {
            name: "Ad Soyad",
            email: "E-posta",
            message: "Mesajınız",
            send: "Gönder",
            sending: "Gönderiliyor...",
            success: "Mesaj başarıyla gönderildi!",
            error: "Gönderilemedi! Daha sonra tekrar deneyin.",
        },

        // FOOTER
        footer: {
            text: "Tüm hakları saklıdır.",
        },
    },

    // ENGLISH
    en: {
        nav: {
            home: "Home",
            projects: "Projects",
            skills: "Skills",
            about: "About",
            contact: "Contact",
        },

        heroTitle: "Hi, I'm Emre",
        heroSubtitle: "Software Engineer | Information System Engineer",
        downloadCV: "Download CV",

        stats: {
            projects: "Projects",
            views: "Project Views",
            downloads: "CV Downloads",
        },

        aboutTitle: "About Me",
        aboutDescription:
            "I am a Full-Stack Developer with 4+ years of experience, building production-level applications with .NET, Node.js, React, MSSQL and MongoDB. I focus on clean code, solid architecture and performance-driven development.",

        skillsTitle: "Skills",
        skillsSubtitle: "My backend, frontend, database and DevOps skills",

        projectsTitle: "Projects",
        projectsSubtitle: "Some of my work and contributions",

        hobbiesTitle: "Hobbies",
        hobbiesSubtitle: "Activities I enjoy and improve myself with",

        contactTitle: "Contact Me",
        contactSubtitle: "You can send me a message or reach out",

        form: {
            name: "Full Name",
            email: "Email",
            message: "Message",
            send: "Send",
            sending: "Sending...",
            success: "Message sent successfully!",
            error: "Failed to send message! Please try again later.",
        },

        footer: {
            text: "All rights reserved.",
        },
    },
} as const;
