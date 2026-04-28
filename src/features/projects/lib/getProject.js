import { projects } from "@/data/projects";

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => ({ slug: project.slug }));
}
