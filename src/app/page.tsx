import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
