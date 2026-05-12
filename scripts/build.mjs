#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const hasTinaCreds =
  !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID && !!process.env.TINA_TOKEN;

if (hasTinaCreds) {
  console.log("→ Tina Cloud credentials found, building admin");
  const tinaResult = spawnSync("npx", ["tinacms", "build"], {
    stdio: "inherit",
    shell: true,
  });
  if (tinaResult.status !== 0) {
    console.error("✗ tinacms build failed");
    process.exit(tinaResult.status ?? 1);
  }
} else {
  console.log(
    "→ Tina Cloud credentials missing (NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN) — skipping admin build",
  );
}

console.log("→ Building Next.js");
const nextResult = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
});
process.exit(nextResult.status ?? 0);
