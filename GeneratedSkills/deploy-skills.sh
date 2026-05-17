#!/usr/bin/env bash
# RootIB: RB-20260504022302-A1B2C3D4
# deploy-skills.sh — Deploy all customized Alexa skills via ASK CLI
# Usage: ./deploy-skills.sh [--dry-run]

set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "🔍 Dry run mode — no deployments will be made."
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILT=0
FAILED=0

echo "🚀 Deploying Alexa skills from $SCRIPT_DIR ..."

for skill_dir in "$SCRIPT_DIR"/*/; do
  skill_name="$(basename "$skill_dir")"

  # Skip if status.json says not customized
  status_file="$skill_dir/status.json"
  if [[ ! -f "$status_file" ]]; then
    echo "  ⚠️  Skipping $skill_name (no status.json)"
    continue
  fi

  customized=$(node -e "const s=require('$status_file'); process.stdout.write(String(s.customized||false))")
  if [[ "$customized" != "true" ]]; then
    echo "  ⏩ Skipping $skill_name (not customized)"
    continue
  fi

  echo "  📦 Deploying: $skill_name"

  if [[ "$DRY_RUN" == "false" ]]; then
    pushd "$skill_dir" > /dev/null
    ask deploy --ignore-hash || {
      echo "  ❌ Deploy failed for $skill_name"
      FAILED=$((FAILED+1))
      popd > /dev/null
      continue
    }
    popd > /dev/null
  fi

  BUILT=$((BUILT+1))
done

echo ""
echo "✅ Deployment complete: $BUILT succeeded, $FAILED failed."
