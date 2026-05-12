import "server-only";

import { CONTENT_TAGS, listJson, loadJson } from "@/lib/content-loader";
import type { Project } from "./project-types";

export type { Project, ProjectCategory } from "./project-types";
export { categoryLabels } from "./project-types";

export async function getProjects(): Promise<Project[]> {
  const files = await listJson("content/projects");
  const items = await Promise.all(
    files.map((file) => loadJson<Project>(file, [CONTENT_TAGS.projects])),
  );
  return items
    .filter((p): p is Project => p !== null)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}
