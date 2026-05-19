import FaceScenePreload from "@/features/face-scene/components/FaceScenePreload";
import AboutSection from "@/sections/about/AboutSection";
import HeroSection from "@/sections/hero/HeroSection";
import ProjectsSection from "@/sections/projects/ProjectsSection";
import SkillsCarouselSection from "@/sections/skills/SkillsCarouselSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FaceScenePreload />
      <HeroSection />
      <AboutSection />
      <SkillsCarouselSection />
      <ProjectsSection />
    </main>
  );
}
