import ProjectsCarouselSection from "@/sections/carousel/ProjectsCarouselSection";
import FaceScenePreload from "@/features/face-scene/components/FaceScenePreload";
import HeroSection from "@/sections/hero/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FaceScenePreload />
      <HeroSection />
      <ProjectsCarouselSection />
    </main>
  );
}
