import { en } from "@/data/en";

const { projects } = en;

export function isProjectPublished(project) {
  return project?.isPublished !== false;
}

export function getPublishedProjects(projectList = []) {
  return projectList.filter(isProjectPublished);
}

export function getProject(slug, { includeUnpublished = false } = {}) {
  const project = projects.find(
    (project) => project.slug === slug || project.aliases?.includes(slug),
  );

  if (!project) {
    return undefined;
  }

  if (!includeUnpublished && !isProjectPublished(project)) {
    return undefined;
  }

  return project;
}

export function getProjectSlugs() {
  return getPublishedProjects(projects).map((project) => ({ slug: project.slug }));
}

export function getProjectRouteParams() {
  return getPublishedProjects(projects).map((project) => ({ id: project.slug }));
}
