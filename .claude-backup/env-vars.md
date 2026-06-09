# Required Environment Variables — ClaudeCode Portfolio Dev

## Vercel project (set via Vercel dashboard or `vercel env add`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_*` | No sensitive public vars — Next.js static env vars only |

## MCP servers (Claude Code, not runtime)

| Variable | Purpose |
|---|---|
| `FIGMA_API_KEY` | Figma Dev Mode MCP — extract design tokens from Figma files. Set in `~/.claude/mcp.json`. Get from figma.com → Account Settings → Personal Access Tokens. |

## No runtime secrets

This is a portfolio site — no database, no API keys, no backend secrets.
The Vercel deployment is purely static Next.js.

## Google Drive MCP auth

Not key-based — authenticate via OAuth when running `claude mcp add google-drive`.
Credentials stored by the MCP server locally after first auth.
