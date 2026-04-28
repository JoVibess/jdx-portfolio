import ProjectsCarouselSection from "@/sections/carousel/ProjectsCarouselSection";
import HeroSection from "@/sections/hero/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <HeroSection />
      <ProjectsCarouselSection />
    </main>
  );
}
