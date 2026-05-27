#!/usr/bin/env bash
# setup.sh — installs global Claude Code config for ClaudeCode-portfolio-dev
# Run once after cloning: bash setup.sh
# Safe to re-run: backs up existing files before overwriting.

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SETUP_DIR="$REPO_DIR/setup"
CLAUDE_DIR="$HOME/.claude"

# ── colours ────────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}!${NC} $1"; }
die()  { echo -e "${RED}✗${NC} $1"; exit 1; }

echo ""
echo "Claude Code — portfolio-dev setup"
echo "==================================="
echo ""

# ── prereqs ────────────────────────────────────────────────────────────────────
command -v jq >/dev/null 2>&1 || die "jq is required. Install: sudo apt install jq"
command -v git >/dev/null 2>&1 || die "git is required."

# ── github token ───────────────────────────────────────────────────────────────
if [ -z "$GITHUB_TOKEN" ]; then
  echo -n "Enter your GitHub personal access token (repo scope): "
  read -rs GITHUB_TOKEN
  echo ""
fi
[ -z "$GITHUB_TOKEN" ] && die "GITHUB_TOKEN is required."

# ── create directories ─────────────────────────────────────────────────────────
mkdir -p "$CLAUDE_DIR/hooks"
ok "Created $CLAUDE_DIR/hooks"

# ── backup helper ──────────────────────────────────────────────────────────────
backup() {
  local file="$1"
  if [ -f "$file" ]; then
    cp "$file" "${file}.bak.$(date +%Y%m%d_%H%M%S)"
    warn "Backed up existing $(basename "$file")"
  fi
}

# ── 1. global CLAUDE.md ────────────────────────────────────────────────────────
backup "$CLAUDE_DIR/CLAUDE.md"
cp "$SETUP_DIR/global-claude.md" "$CLAUDE_DIR/CLAUDE.md"
ok "Installed ~/.claude/CLAUDE.md"

# ── 2. global settings.json ────────────────────────────────────────────────────
backup "$CLAUDE_DIR/settings.json"
sed "s/GITHUB_TOKEN_PLACEHOLDER/$GITHUB_TOKEN/g" \
  "$SETUP_DIR/global-settings.json" > "$CLAUDE_DIR/settings.json"
ok "Installed ~/.claude/settings.json (token injected)"

# ── 3. global settings.local.json ─────────────────────────────────────────────
backup "$CLAUDE_DIR/settings.local.json"
cp "$SETUP_DIR/global-settings-local.json" "$CLAUDE_DIR/settings.local.json"
ok "Installed ~/.claude/settings.local.json"

# ── 4. global session-start hook ──────────────────────────────────────────────
backup "$CLAUDE_DIR/hooks/global-session-start.sh"
cp "$SETUP_DIR/global-session-start.sh" "$CLAUDE_DIR/hooks/global-session-start.sh"
chmod +x "$CLAUDE_DIR/hooks/global-session-start.sh"
ok "Installed ~/.claude/hooks/global-session-start.sh"

# ── 5. git credentials ────────────────────────────────────────────────────────
GITHUB_USER=$(curl -sf https://api.github.com/user \
  -H "Authorization: token $GITHUB_TOKEN" | jq -r '.login // empty')
if [ -n "$GITHUB_USER" ]; then
  git config --global credential.helper store
  echo "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com" > "$HOME/.git-credentials"
  chmod 600 "$HOME/.git-credentials"
  git config --global github.token "$GITHUB_TOKEN"
  ok "Configured git credentials for $GITHUB_USER"

  # persist in shell profile
  for profile in "$HOME/.bashrc" "$HOME/.zshrc" "$HOME/.profile"; do
    if [ -f "$profile" ] && ! grep -q "GITHUB_TOKEN" "$profile"; then
      echo "export GITHUB_TOKEN=$GITHUB_TOKEN" >> "$profile"
      echo "export GH_TOKEN=$GITHUB_TOKEN" >> "$profile"
      ok "Added GITHUB_TOKEN to $profile"
    fi
  done
else
  warn "Could not verify GitHub token — git credentials not configured"
fi

# ── 6. memory files ───────────────────────────────────────────────────────────
# Compute the project-specific memory path Claude Code uses:
# it sanitizes the absolute path by replacing / with - (with a leading -)
SANITIZED_PATH=$(echo "$REPO_DIR" | sed 's|/|-|g')
MEMORY_DIR="$CLAUDE_DIR/projects/${SANITIZED_PATH}/memory"
mkdir -p "$MEMORY_DIR"

# Copy all memory files, updating the absolute path in the reference file
for f in "$SETUP_DIR/memory/"*.md; do
  fname="$(basename "$f")"
  if [ "$fname" = "reference_product_case_studies.md" ]; then
    # Replace relative path placeholder with actual absolute path
    sed "s|docs/product-case-studies.md (relative to repo root — resolved to absolute path at install time by setup.sh)|${REPO_DIR}/docs/product-case-studies.md|g" \
      "$f" > "$MEMORY_DIR/$fname"
  else
    cp "$f" "$MEMORY_DIR/$fname"
  fi
done
ok "Installed memory files → $MEMORY_DIR"

# ── 7. project settings git remote ────────────────────────────────────────────
cd "$REPO_DIR"
if ! git remote get-url origin >/dev/null 2>&1; then
  REPO_NAME=$(basename "$REPO_DIR")
  warn "No git remote configured. Creating GitHub repo: $REPO_NAME"
  curl -sf -X POST https://api.github.com/user/repos \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"auto_init\":false}" > /dev/null
  git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
  git push -u origin "$(git branch --show-current)" 2>/dev/null || true
  ok "GitHub remote configured: github.com/${GITHUB_USER}/${REPO_NAME}"
else
  ok "Git remote already configured: $(git remote get-url origin)"
fi

# ── done ──────────────────────────────────────────────────────────────────────
echo ""
echo "Setup complete. Start Claude Code from this directory:"
echo "  cd $REPO_DIR && claude"
echo ""
echo "On first run Claude Code will sync plugins automatically."
echo "Remote Control auto-starts (remoteControlAtStartup: true)."
echo ""
