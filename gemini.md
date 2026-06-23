# AkiClaudeDoc Router for Gemini / Antigravity

**CRITICAL INSTRUCTION FOR GEMINI / ANTIGRAVITY:**
You are operating within the Aki ecosystem. This project relies on a strict set of external rules located at `~/.aki/claudedoc/`. As an AI agent (Gemini/Antigravity), you do NOT automatically load these rules via `@` syntax like Claude Code. Therefore, **you MUST manually comply with this routing mechanism using your file reading tools (e.g., `view_file`) on EVERY task.**

Failure to load and follow these rules is a critical violation of system constraints.

## Tier 1: Core Rules (MANDATORY IMMEDIATE LOAD)
Before proceeding with any analysis, planning, or code execution, you MUST use your file reading tool to read the absolute paths of the following core rules:
1. `/Users/xk/.aki/claudedoc/index.md`
2. `/Users/xk/.aki/claudedoc/RULE-agent-behavior.md`
3. `/Users/xk/.aki/claudedoc/RULE-coding.md`

You must internalize these rules and apply them as absolute constraints to your current task.

## Tier 2: Dynamic Rules (Load based on Task Signals)
After loading Tier 1, evaluate the current task against the following signals. If any signal matches, you MUST read the corresponding file BEFORE executing the task.

### `/Users/xk/.aki/claudedoc/RULE-docs.md`
Read this file NOW if the task involves:
- Editing or creating `docs/**`, `gemini.md`, `README.md`, `PLAN.md`, or project instruction files.
- Code that is complex, architectural, or references a `docs/feat/` or `docs/arch/` path.
- A complex function/flow where documentation coverage should be verified/added.
- Creating, moving, or completing plan files under `docs/plan/`.
- Deciding on flow/architecture diagrams (Mermaid).
- Questions about docs structure, index, or discoverability.

### `/Users/xk/.aki/claudedoc/RULE-content-write.md`
Read this file NOW if the task involves:
- UI text: button labels, field labels, headings, error messages, empty states, tooltips.
- i18n locale files, or introducing/renaming translation keys.
- Meta titles, meta descriptions, OG text, JSON-LD text fields, FAQ answers.
- Article copy, landing page content, or product-facing prose.
- Renaming or redefining a concept/term used across the product.
- Content that appears across multiple channels (UI, SERP snippet, bots).

### `/Users/xk/.aki/claudedoc/RULE-stack-akiNuxtCf.md`
Read this file NOW if the task involves:
- Nuxt, Vue, Cloudflare Pages/Workers, or the Aki frontend stack.
- Components, composables, pages, layouts, plugins, or middleware.
- Routing, `wrangler.toml`, Tailwind classes, i18n config, or SEO helpers.
*(Default to load this file for any Aki project context unless provably stack-independent)*

## Tier 3: Analytical Methods (Load for Depth/Complexity)

### `/Users/xk/.aki/claudedoc/METHOD-flow-audit.md`
Read this file NOW if the task involves:
- Refactoring, restructuring, or simplifying a function, component, or flow.
- A bug fix spanning multiple files or requiring tracing cause-and-effect.
- Code described as fragile, over-guarded, or hard to follow.
- A user journey, multi-step coordination, async chain, or state machine.
- Questions like "why is this complicated", "is this flow correct", etc.
- Repeated guard patterns, fallbacks, or ownership/timing confusion.

### `/Users/xk/.aki/claudedoc/METHOD-techbiz-optimizer.md`
Read this file NOW if the task involves:
- Introducing a new feature or extending existing scope.
- Questions like "Should we do X", "what's the simplest way", "is this worth it".
- Architecture or tooling decisions appearing before evidence of need.
- Unclear or contested effort/value ratio.
- Signals of scope creep, rising complexity, or premature automation.

## Full Load Override
If the user includes `[load full]` or `[nạp full]` in their prompt, you MUST read EVERY file matching `RULE-*.md` and `METHOD-*.md` in `/Users/xk/.aki/claudedoc/` (excluding the `ref-ECC/` directory).

---
**FINAL REMINDER:**
Do not assume you remember the contents of these files from prior sessions. You are required to perform actual file reads to fetch the source of truth whenever the conditions above are met. Your first tool call in any new conversation in this project should usually be to read the Tier 1 files.
