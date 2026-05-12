import "server-only";
import fs from "node:fs";
import path from "node:path";

import type { Project } from "./project-types";

export type { Project, ProjectCategory } from "./project-types";
export { categoryLabels } from "./project-types";

function loadProjects(): Project[] {
  const projectsDir = path.join(process.cwd(), "content/projects");
  if (!fs.existsSync(projectsDir)) return [];

  return fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
      return JSON.parse(raw) as Project;
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export const projects: Project[] = loadProjects();
