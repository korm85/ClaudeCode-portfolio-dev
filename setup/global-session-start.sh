#!/usr/bin/env bash
jq -n '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"GLOBAL: Start every response with [Model: Haiku/Sonnet/Opus]. Route subagents: Haiku=search/reads, Sonnet=code (default), Opus=architecture. Announce every Agent spawn."}}'
