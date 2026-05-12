import "server-only";
import fs from "node:fs";
import path from "node:path";

const OWNER = process.env.GITHUB_OWNER || "Sacha30650";
const REPO = process.env.GITHUB_REPO || "ManonCM";
const BRANCH = process.env.GITHUB_BRANCH || "main";

type GithubContentResponse = {
  content: string;
  encoding: "base64";
};

/**
 * Loads a JSON file from the repo.
 * - In production with GITHUB_TOKEN: fetch via GitHub Contents API (always
 *   fresh, cached by Next.js with the given tags so an admin save can
 *   `revalidateTag()` to instantly refresh without a redeploy).
 * - Locally or without token: fallback to reading from the deployed fs.
 */
export async function loadJson<T>(
  relativePath: string,
  tags: string[],
): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${relativePath}?ref=${BRANCH}`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "make-my-visu",
        },
        next: { tags, revalidate: 3600 },
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
      }
      const json = (await res.json()) as GithubContentResponse;
      const decoded = Buffer.from(json.content, "base64").toString("utf8");
      return JSON.parse(decoded) as T;
    } catch (err) {
      console.error(`[content-loader] GitHub fetch failed for ${relativePath}`, err);
      // fall through to fs fallback
    }
  }

  const filePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

/**
 * Lists JSON files in a folder via the GitHub Contents API (or fs fallback).
 * Returns the relative paths so the caller can pass them back to loadJson().
 */
export async function listJson(folder: string): Promise<string[]> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${folder}?ref=${BRANCH}`;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "make-my-visu",
        },
        next: { tags: [`list:${folder}`], revalidate: 3600 },
      });
      if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
      }
      const items = (await res.json()) as { name: string; type: string; path: string }[];
      return items
        .filter((it) => it.type === "file" && it.name.endsWith(".json"))
        .map((it) => it.path);
    } catch (err) {
      console.error(`[content-loader] GitHub list failed for ${folder}`, err);
    }
  }

  const dir = path.join(process.cwd(), folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => `${folder}/${f}`);
}

export const CONTENT_TAGS = {
  hero: "content:hero",
  pricing: "content:pricing",
  projects: "content:projects",
  projectsList: "list:content/projects",
};
