import "server-only";
import { Octokit } from "@octokit/rest";

const OWNER = process.env.GITHUB_OWNER || "Sacha30650";
const REPO = process.env.GITHUB_REPO || "ManonCM";
const BRANCH = process.env.GITHUB_BRANCH || "main";

function getClient(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN env var is not set");
  }
  return new Octokit({ auth: token });
}

async function getFileSha(path: string): Promise<string | undefined> {
  const octokit = getClient();
  try {
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
    if (Array.isArray(data) || data.type !== "file") return undefined;
    return data.sha;
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    if (status === 404) return undefined;
    throw err;
  }
}

export async function commitTextFile(
  path: string,
  contents: string,
  message: string,
): Promise<void> {
  const octokit = getClient();
  const sha = await getFileSha(path);
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    branch: BRANCH,
    message,
    content: Buffer.from(contents, "utf8").toString("base64"),
    sha,
  });
}

export async function commitBinaryFile(
  path: string,
  base64Content: string,
  message: string,
): Promise<void> {
  const octokit = getClient();
  const sha = await getFileSha(path);
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    branch: BRANCH,
    message,
    content: base64Content,
    sha,
  });
}

export async function deleteFile(path: string, message: string): Promise<void> {
  const octokit = getClient();
  const sha = await getFileSha(path);
  if (!sha) return;
  await octokit.repos.deleteFile({
    owner: OWNER,
    repo: REPO,
    path,
    branch: BRANCH,
    message,
    sha,
  });
}
