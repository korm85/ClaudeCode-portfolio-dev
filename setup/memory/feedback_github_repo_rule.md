---
name: feedback_github_repo_rule
description: Always create and maintain a GitHub repository when building something — repo name matches the working directory name
metadata:
  type: feedback
---

Always create a GitHub repository when starting or working in any project directory. Repo name should match the main working folder name exactly.

**Why:** User expects GitHub to always be set up and in sync — it's a standing rule, not a per-project decision.

**How to apply:** At the start of any new project or when joining a project with no remote configured, check `git remote -v`. If no remote exists, prompt to create and push immediately. Don't wait to be asked.
