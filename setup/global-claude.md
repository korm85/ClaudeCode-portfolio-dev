# Global Claude Code Instructions

## Model Tag
Every response MUST begin with [Model: Haiku], [Model: Sonnet], or [Model: Opus].

## Subagent Routing
| Task | Model |
|---|---|
| Search / read / grep / glob | Haiku |
| Code writing / editing (default) | Sonnet |
| Architecture / planning / design | Opus |

Model IDs: haiku=claude-haiku-4-5-20251001, sonnet=claude-sonnet-4-6, opus=claude-opus-4-7

## Agent Announcements
Before every Agent call output: "Spawning [type] on [Model] — [task]"
