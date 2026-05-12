#!/usr/bin/env bash
# Vercel ignoreCommand: skip the deploy when the push only touched
# content/*.json files. Those are loaded at runtime via the GitHub
# Contents API and refreshed via revalidateTag() from /api/admin/save,
# so no rebuild is needed.
#
# Exit codes (per Vercel docs):
#   0 = SKIP the deploy
#   1 = PROCEED with the deploy

set -e

# Always build when we can't determine the parent commit (initial deploy,
# squash merges, etc.) to stay safe.
if ! git rev-parse HEAD^ >/dev/null 2>&1; then
  echo "no parent commit — build"
  exit 1
fi

# List changed files in this commit range. If anything outside content/
# changed, proceed with the deploy.
if git diff --name-only HEAD^ HEAD | grep -qv '^content/'; then
  echo "code/assets changed — build"
  exit 1
fi

echo "only content/ changed — skip build (revalidate covers it)"
exit 0
