export type Lang = "tr" | "en";

export const dict = {
    tr: {
        // Navbar
        nav: {
            projects: "Projeler",
            skills: "Yetenekler",
            about: "Hakkımda",
            contact: "İletişim",
        },

        // Hero
        heroTitle: "Merhaba, ben Emre",
        heroSubtitle: "Software Engineer | Bilişim Sistemleri Mühendisi",
        downloadCV: "CV İndir",

        // Stats (eğer varsa kartların başlıkları)
        stats: {
            projects: "Projeler",
            projectViews: "Proje Görüntülenmeleri",
            cvDownloads: "CV İndirmeleri",
        },

        // Bölüm başlıkları / alt yazılar
        sections: {
            projectsTitle: "Projeler",
            projectsSubtitle: "Gerçek problem çözen, backend odaklı projeler.",
            skillsTitle: "Yetenekler",
            skillsSubtitle: "Sık kullandığım teknolojiler ve araçlar.",
            aboutTitle: "Hakkımda",
            aboutSubtitle: "Deneyim, eğitim ve kariyer yolculuğum.",
            hobbiesTitle: "Hobiler",
            hobbiesSubtitle: "Boş zamanlarımda yaptığım şeyler.",
            contactTitle: "İletişim",
            contactSubtitle: "Birlikte çalışmak istersen bana buradan yazabilirsin.",
        },

        // Yetenek kategori başlıkları
        skillsCategories: {
            Frontend: "Frontend",
            Backend: "Backend",
            Database: "Veritabanı",
            Tools: "Araçlar",
        },

        // Contact form
        contact: {
            title: "İletişim 📞",
            subtitle:
                "İşbirliği yapmak için bana buradan bir mesaj bırakabilirsin. Geri dönüş yapmaktan memnuniyet duyarım!",
            name: "Adınız",
            email: "E-posta Adresiniz",
            subject: "Konu",
            message: "Mesajınız",
            send: "Gönder",
            sending: "Gönderiliyor...",
            success: "Mesajınız alındı! ✅",
            error: "Gönderilemedi, tekrar deneyin. ❌",
        },

        // Hobbies
        hobbies: {
            fallbackTitle: "Hobi",
            loadingError: "Hobiler yüklenemedi.",
        },

        // Projects
        projects: {
            loadingError: "Projeler yüklenemedi.",
            empty: "Henüz proje eklenmemiş.",
            noCover: "Kapak görseli yok",
            live: "Canlı",
            github: "GitHub",
        },

        // About section başlıkları
        about: {
            aboutTitle: "Hakkımda",
            experienceTitle: "Deneyim",
            educationTitle: "Eğitim",
        },
    },

    en: {
        nav: {
            projects: "Projects",
            skills: "Skills",
            about: "About",
            contact: "Contact",
        },

        heroTitle: "Hi, I'm Emre",
        heroSubtitle: "Software Developer | Information Systems Engineer",
        downloadCV: "Download CV",

        stats: {
            projects: "Projects",
            projectViews: "Project Views",
            cvDownloads: "CV Downloads",
        },

        sections: {
            projectsTitle: "Projects",
            projectsSubtitle: "Backend-focused, real-world problem solving projects.",
            skillsTitle: "Skills",
            skillsSubtitle: "Technologies and tools I use frequently.",
            aboutTitle: "About Me",
            aboutSubtitle: "My experience, education and career journey.",
            hobbiesTitle: "Hobbies",
            hobbiesSubtitle: "Things I enjoy in my free time.",
            contactTitle: "Contact",
            contactSubtitle: "Reach out if you’d like to work together.",
        },

        skillsCategories: {
            Frontend: "Frontend",
            Backend: "Backend",
            Database: "Database",
            Tools: "Tools",
        },

        contact: {
            title: "Contact 📞",
            subtitle:
                "You can send me a message here if you’d like to collaborate. I’d be happy to get back to you!",
            name: "Name",
            email: "Email Address",
            subject: "Subject",
            message: "Message",
            send: "Send",
            sending: "Sending...",
            success: "Your message has been received! ✅",
            error: "Could not send, please try again. ❌",
        },

        hobbies: {
            fallbackTitle: "Hobby",
            loadingError: "Hobbies could not be loaded.",
        },

        projects: {
            loadingError: "Projects could not be loaded.",
            empty: "No projects have been added yet.",
            noCover: "No cover image",
            live: "Live",
            github: "GitHub",
        },

        about: {
            aboutTitle: "About Me",
            experienceTitle: "Experience",
            educationTitle: "Education",
        },
    },
} as const;
