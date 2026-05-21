import { en } from "@/data/en";

const { projects } = en;

export function getProject(slug) {
  return projects.find(
    (project) => project.slug === slug || project.aliases?.includes(slug),
  );
}

export function getProjectSlugs() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function getProjectRouteParams() {
  return projects.map((project) => ({ id: project.slug }));
}
