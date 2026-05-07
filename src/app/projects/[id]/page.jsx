import { notFound } from "next/navigation";

import ProjectHero from "@/features/projects/components/ProjectHero";
import ProjectMeta from "@/features/projects/components/ProjectMeta";
import { getProject, getProjectSlugs } from "@/features/projects/lib/getProject";

export function generateStaticParams() {
  return getProjectSlugs();
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <ProjectHero project={project} />
      <ProjectMeta project={project} />
    </main>
  );
}
