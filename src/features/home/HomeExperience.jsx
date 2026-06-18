"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getDictionary } from "@/lib/i18n";
import FaceScenePreload from "@/features/face-scene/components/FaceScenePreload";
import SvgCurveTransition from "@/features/page-transition/SvgCurveTransition";
import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import { getPublishedProjects } from "@/features/projects/lib/getProject";
import AboutSection from "@/sections/about/AboutSection";
import HeroSection from "@/sections/hero/HeroSection";
import ProjectsSection from "@/sections/projects/ProjectsSection";
import SkillsCarouselSection from "@/sections/skills/SkillsCarouselSection";

const PAGE_TRANSITION_SWAP_DELAY = 180;
const PAGE_TRANSITION_END_DELAY = 680;

export default function HomeExperience({ dictionary = getDictionary("en"), locale = "en" }) {
  const router = useRouter();
  const pathname = usePathname() || `/${locale}`;
  const searchParams = useSearchParams();
  const { site, skills } = dictionary;
  const projects = getPublishedProjects(dictionary.projects);
  const projectSlug = searchParams.get("project");
  const selectedProject =
    projects.find((project) => project.slug === projectSlug || project.aliases?.includes(projectSlug)) ||
    null;
  const [activeProject, setActiveProject] = useState(selectedProject);
  const transitionTimeouts = useRef([]);
  const [pageTransition, setPageTransition] = useState({
    isActive: false,
    playKey: 0,
  });

  useEffect(() => {
    return () => {
      transitionTimeouts.current.forEach((timeout) => window.clearTimeout(timeout));
      transitionTimeouts.current = [];
    };
  }, []);

  const clearTransitionTimeouts = () => {
    transitionTimeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    transitionTimeouts.current = [];
  };

  const runPageTransition = (nextProject, nextUrl) => {
    clearTransitionTimeouts();
    setPageTransition((current) => ({
      isActive: true,
      playKey: current.playKey + 1,
    }));

    transitionTimeouts.current.push(
      window.setTimeout(() => {
        setActiveProject(nextProject);
        router.replace(nextUrl, { scroll: false });
        window.scrollTo({ top: 0, behavior: "auto" });
      }, PAGE_TRANSITION_SWAP_DELAY)
    );

    transitionTimeouts.current.push(
      window.setTimeout(() => {
        setPageTransition((current) => ({
          ...current,
          isActive: false,
        }));
      }, PAGE_TRANSITION_END_DELAY)
    );
  };

  const handleProjectSelect = (project) => {
    runPageTransition(project, `${pathname}?project=${project.slug}`);
  };

  return (
    <>
      {activeProject ? (
        <ProjectDetailPage
          dictionary={dictionary}
          isPageTransitionActive={pageTransition.isActive}
          locale={locale}
          project={activeProject}
          onProjectSelect={handleProjectSelect}
          onBack={() => {
            runPageTransition(null, pathname);
          }}
        />
      ) : (
        <>
          <FaceScenePreload />
          <HeroSection site={site} />
          <AboutSection site={site} />
          <SkillsCarouselSection site={site} skills={skills} />
          <ProjectsSection
            labels={site.sections.projects}
            projects={projects}
            onProjectSelect={handleProjectSelect}
          />
        </>
      )}
      <SvgCurveTransition isActive={pageTransition.isActive} playKey={pageTransition.playKey} />
    </>
  );
}
