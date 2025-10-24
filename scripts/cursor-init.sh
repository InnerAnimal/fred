#!/usr/bin/env bash
set -euo pipefail
export CURSOR_OWNER="InnerAnimal"
export CURSOR_REPO="fred"
export CURSOR_BRANCH="main"
cursor auth status || cursor auth login
cursor repo set --owner "$CURSOR_OWNER" --repo "$CURSOR_REPO" --branch "$CURSOR_BRANCH"
cursor repo sync   # pulls the right repo/branch into the current workspace
