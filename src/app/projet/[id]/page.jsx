import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n";
import { getProjectMetadata } from "@/lib/seo";
import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import { getProject, getProjectRouteParams } from "@/features/projects/lib/getProject";

export function generateStaticParams() {
  return getProjectRouteParams();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return {};
  }

  return getProjectMetadata(project, "fr");
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} dictionary={getDictionary("fr")} locale="fr" />;
}
