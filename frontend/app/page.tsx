"use client";

import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SkillsSection from "@/components/skills/SkillsSection";
import AboutSection from "@/components/about/AboutSection";
import HobbyGrid from "@/components/about/HobbyGrid";
import ContactSection from "@/components/contact/ContactSection";
import { useLang } from "@/context/LangContext";
import { dict } from "@/lib/i18n";

export default function HomePage() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    
    <div className="space-y-12">
      <Hero />

      {/* Stats */}
      <section className="section py-10">
        <div className="max-w-6xl mx-auto px-4">
          <Stats />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl font-semibold">
            {t.sections.projectsTitle}
          </h2>
          <ProjectGrid />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl font-semibold">
            {t.sections.skillsTitle}
          </h2>
          <SkillsSection />
        </div>
      </section>

      {/* About */}
      <section id="about" className="section py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <h2 className="text-2xl font-semibold">
            {t.sections.aboutTitle}
          </h2>
          <AboutSection />
        </div>
      </section>

      {/* Hobbies  */}
      <section id="hobbies" className="section py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl font-semibold">
            {t.sections.hobbiesTitle}
          </h2>
          <HobbyGrid />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <ContactSection />
        </div>
      </section>
    </div>
  );
}
