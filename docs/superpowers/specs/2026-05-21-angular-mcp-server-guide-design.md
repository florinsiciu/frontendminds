# Article Design: Angular MCP Server Complete Setup Guide

**Date:** 2026-05-21
**Type:** Blog post (MDX)
**File:** `content/blog/angular-mcp-server-guide.mdx`
**Estimated length:** ~4,000 words
**Target reading time:** 15-18 minutes

---

## SEO & Targeting

**Title:** "Angular MCP Server: Complete Setup Guide for Cursor, VS Code, and Claude Code"
**Meta description:** "Set up the Angular CLI MCP server in every major IDE. Step-by-step configuration for Cursor, VS Code Copilot, Claude Code, and JetBrains — with all 13 tools explained and common issues solved."
**Primary keyword:** `angular mcp server` (100-1K/mo, +900% YoY, Low competition — GKP verified)
**Secondary keywords:** `angular cli mcp`, `ng mcp tutorial`, `angular mcp cursor`, `angular mcp claude code`
**Parent keyword (drafts traffic from):** `mcp server` (10K-100K/mo)

**Schema markup:** HowTo (quick start steps) + FAQ (5 questions)
**Category:** `angular-ai`
**Tags:** `angular`, `mcp`, `ai-tools`, `cursor`, `claude-code`, `developer-tools`

---

## Voice & Framing

- **Hook:** Problem-solution — before/after code comparison showing AI output WITHOUT vs WITH MCP
- **Body:** Developer-deep tutorial with executive summary at top
- **Tone:** Practical, hands-on, no fluff. Matches existing AI articles (e.g., ai-pair-programming-angular.mdx)
- **Scope boundary:** Brief hook on "AI writes outdated code" (1-2 paragraphs), then 90% MCP setup. Full "why" coverage deferred to Article 2 with internal link.
- **Differentiator:** Only guide covering all 4 major IDEs including Claude Code (not in official Angular docs)

---

## Article Structure

### 1. TL;DR (2-3 sentences)

AEO extraction target. Concise answer to "What is the Angular MCP server and how do I set it up?"

> The Angular CLI includes an MCP server (`ng mcp`) that gives AI coding assistants real-time access to Angular best practices, documentation, and project structure — so they generate current patterns instead of outdated code. This guide covers setup for Cursor, VS Code, Claude Code, and JetBrains, with all 13 tools explained.

### 2. Before/After Hook

**Without MCP** — code block showing AI-generated component using:
- `@Component` with `standalone: true` explicitly set (redundant in v21+)
- `@Input()` decorator
- `*ngIf` structural directive
- Constructor-based dependency injection
- NgModule import

**With MCP** — same prompt produces:
- `@Component` without explicit `standalone: true` (implicit default)
- `input()` function
- `@if` control flow
- `inject()` function
- No NgModule

One connecting paragraph: "The difference is the Angular MCP Server — a single command that gives your AI tool live access to Angular's current conventions."

Callout box with jump links to Quick Start and each IDE section.

### 3. What Is the Angular MCP Server?

**Purpose:** AEO/GEO definition section.

Content:
- Definition: MCP (Model Context Protocol) is an open standard for AI tool ↔ data source communication. Angular's MCP server exposes best practices, docs, project structure, and migration tools to any compatible AI assistant.
- Simple flow: `Your IDE → AI Assistant → Angular MCP Server → Best Practices + Docs + Project Info`
- Version timeline in one sentence: "Introduced experimentally in Angular CLI v20.1, expanded in v20.2, and stabilized in v21."
- Why it matters: AI tools are trained on older Angular patterns. MCP gives them live access to current conventions at inference time.

### 4. Prerequisites

Minimal checklist:
- Angular CLI v20.2+ (`ng version` to check). v21+ recommended for all stable tools.
- Node.js 18+
- One of: Cursor, VS Code with Copilot, Claude Code, or a JetBrains IDE

### 5. Quick Start (Featured Snippet Target)

3 numbered steps:
1. Verify MCP server works: `npx -y @angular/cli mcp` (should print server info)
2. Add config to IDE (show Cursor as simplest default — `.cursor/mcp.json`)
3. Test: ask AI "What are the projects in this workspace?" — confirm it calls `list_projects`

### 6. IDE Setup Guides

#### 6a. Cursor

- Config file: `.cursor/mcp.json`
- JSON:
```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
- Verify: Settings → MCP → "angular-cli" shows green with 6 tools
- Note: key is `"mcpServers"` (not `"servers"`)

#### 6b. VS Code (Copilot)

- Config file: `.vscode/mcp.json`
- JSON:
```json
{
  "servers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
- Verify: Command Palette → "MCP: List Servers"
- Note: key is `"servers"` (different from Cursor's `"mcpServers"`)
- Requires: VS Code Copilot extension with MCP support

#### 6c. Claude Code (EXCLUSIVE — not in official Angular docs)

Three options:

**Option 1 — CLI command (fastest):**
```bash
claude mcp add angular-cli -- npx -y @angular/cli mcp
```
Stores in `~/.claude.json` under the current project path. Private to you.

**Option 2 — Project-level `.mcp.json` (team sharing):**
```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```
Commit to repo. Claude Code prompts team members for approval on first use. Also works with Cursor.

**Option 3 — Global (all projects):**
```bash
claude mcp add --scope user angular-cli -- npx -y @angular/cli mcp
```

**Verify:** `claude mcp list` or `/mcp` inside a session.

**Scope table:**
| Scope | Flag | Shared? | Stored in |
|-------|------|---------|-----------|
| Local (default) | `--scope local` | No | `~/.claude.json` (per-project) |
| Project | `--scope project` | Yes (VCS) | `.mcp.json` in project root |
| User | `--scope user` | No | `~/.claude.json` (global) |

**Troubleshooting tip:** MCP config goes in `~/.claude.json` or `.mcp.json`, NOT `.claude/settings.json`. This is a common confusion point (GitHub issue #4976).

#### 6d. JetBrains (WebStorm/IntelliJ)

- Path: Settings → Tools → AI Assistant → Model Context Protocol (MCP)
- Click "Add", select JSON format, paste same config object
- Requires: AI Assistant plugin enabled

#### 6e. Team Setup (shared config)

- `.mcp.json` in project root works with both Cursor and Claude Code
- Explain `npx -y` flag: prevents npm confirmation prompts that hang the MCP server process
- Recommend committing to repo so all team members get MCP automatically

### 7. MCP Tools Reference

#### Standard Tools (6 — enabled by default)

| Tool | What It Does | When to Use It | Example Prompt |
|------|-------------|----------------|----------------|
| `get_best_practices` | Returns Angular Best Practices Guide (standalone, signals, inject, OnPush, control flow) | Every session — ensures AI follows current conventions | "Generate a component following Angular best practices" |
| `search_documentation` | Queries live angular.dev docs. Only tool requiring internet. | Looking up API details, configuration options | "How do I configure lazy loading in Angular?" |
| `list_projects` | Reads `angular.json`, returns all apps/libraries with types and prefixes | Start of any session — AI learns your workspace structure | "What projects are in this workspace?" |
| `find_examples` | Searches curated database of official code examples. Version-aware (resolves from your installed `@angular/core`). | Learning modern patterns, seeing official implementations | "Show me an example of signal-based state management" |
| `ai_tutor` | Interactive Angular tutor that guides through building a "Smart Recipe Box" app. Sees your actual code and gives targeted feedback. | Onboarding new Angular developers, learning signals/control flow | "Teach me Angular signals" |
| `onpush_zoneless_migration` | Analyzes components and produces step-by-step OnPush migration plan. Identifies patterns that won't work without Zone.js. | Planning migration to OnPush change detection or zoneless Angular | "Analyze this component for OnPush migration" |

#### Experimental Tools (7 — require `-E` flag)

| Tool | What It Does | Enable With | Modifies Code? |
|------|-------------|-------------|----------------|
| `modernize` | Runs code migrations: control-flow, standalone, signal-input, self-closing, inject transforms | `-E modernize` | Yes — writes to disk |
| `build` | Runs `ng build` (one-off, no watch) | `-E build` | No |
| `test` | Runs project unit tests | `-E test` | No |
| `e2e` | Runs end-to-end tests | `-E e2e` | No |
| `devserver.start` | Starts `ng serve` asynchronously | `-E devserver` (enables all 3) | No |
| `devserver.stop` | Stops a running dev server | `-E devserver` | No |
| `devserver.wait_for_build` | Returns output logs of the most recent dev server build | `-E devserver` | No |

`modernize` transformations detail:
- **control-flow**: `*ngIf`/`*ngFor`/`*ngSwitch` → `@if`/`@for`/`@switch`
- **standalone**: Convert components/directives/pipes to standalone
- **signal-input**: `@ViewChild`/`@ContentChild` → signal-based `viewChild`/`contentChild`
- **self-closing**: Empty element tags → self-closing tags
- **inject**: `InjectFlags` enum → options object

### 8. CLI Flags

| Flag | What It Does | Use Case |
|------|-------------|----------|
| `--read-only` | Only registers tools that don't modify code | Teams that want AI to read but never write through MCP |
| `--local-only` | Only registers tools that don't need internet | Air-gapped environments, offline development |
| `-E <tool>` | Enables specific experimental tools | `-E modernize` for migration work, `-E devserver` for AI-managed dev server |

Config examples with flags:
```json
// Read-only (5 tools — excludes search_documentation if combined with --local-only)
{ "args": ["-y", "@angular/cli", "mcp", "--read-only"] }

// With modernize
{ "args": ["-y", "@angular/cli", "mcp", "-E", "modernize"] }

// Kitchen sink — all experimental tools
{ "args": ["-y", "@angular/cli", "mcp", "-E", "modernize", "build", "test", "e2e", "devserver"] }
```

### 9. Combining MCP with Agent Skills & Rules Files

Brief section (200 words) explaining the full "AI config stack":

| Layer | What It Does | Format |
|-------|-------------|--------|
| **MCP Server** | Live tools + project awareness | `ng mcp` |
| **Agent Skills** | Domain-specific instructions for AI agents | `npx skills add https://github.com/angular/skills` |
| **Rules files** | Static conventions per IDE | `.cursorrules`, `CLAUDE.md`, `.github/copilot-instructions.md` |
| **AGENTS.md** | Platform-agnostic AI instructions | Committed to repo root |

Internal link: "For a complete guide to configuring all these layers and fixing outdated AI code patterns, see [Why AI Writes Outdated Angular Code (And How to Fix It)]."

### 10. Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| MCP server not connecting | Node.js version too old | Upgrade to Node.js 18+, use `npx -y` flag |
| Tools not appearing in IDE | Wrong config key name | Cursor uses `"mcpServers"`, VS Code uses `"servers"` |
| Server hangs on startup | npm prompts for package confirmation | Add `-y` flag: `npx -y @angular/cli mcp` |
| Only 5 tools showing | `--local-only` flag hides `search_documentation` | Remove `--local-only` or accept 5 tools |
| Claude Code: config not loading | Config in wrong file | Use `~/.claude.json` or `.mcp.json`, NOT `.claude/settings.json` |
| "angular-cli" not in mcp list | Wrong working directory | Run `claude mcp add` from your Angular project root |

### 11. FAQ (Schema markup)

1. **"What is the Angular MCP server?"**
   The Angular MCP server is a Model Context Protocol server built into the Angular CLI that gives AI coding assistants real-time access to Angular best practices, documentation, project structure, and migration tools. It ensures AI tools generate code using current Angular patterns instead of outdated conventions from their training data.

2. **"How do I set up Angular MCP in Cursor?"**
   Create a `.cursor/mcp.json` file in your project root with the Angular CLI MCP configuration. The server registers automatically when Cursor detects the config. You can verify it is connected in Cursor Settings under the MCP section.

3. **"What tools does the Angular MCP server provide?"**
   The Angular MCP server provides 6 stable tools (get_best_practices, search_documentation, list_projects, find_examples, ai_tutor, onpush_zoneless_migration) and 7 experimental tools (modernize, build, test, e2e, devserver.start, devserver.stop, devserver.wait_for_build). Experimental tools must be enabled individually with the `-E` flag.

4. **"What Angular CLI version do I need for MCP?"**
   The MCP server was introduced in Angular CLI v20.1 and stabilized in v21. For access to all 6 stable tools, use v20.2 or later. Version 21+ is recommended for the best experience.

5. **"Can I use Angular MCP with Claude Code?"**
   Yes. Run `claude mcp add angular-cli -- npx -y @angular/cli mcp` from your Angular project directory. For team-wide setup, create a `.mcp.json` file in your project root and commit it to version control. Claude Code is not listed in the official Angular MCP documentation, but the standard MCP protocol works identically.

---

## Internal Linking Plan

**Outbound links from this article:**
- Article 2: "Why AI Writes Outdated Angular Code" (from Section 9, as the "full guide" to the config stack)
- Existing: "AI Pair Programming for Angular" (from the hook — "for broader AI tool guidance")
- Existing: "Best AI Coding Assistants for Angular" (from IDE comparison context)

**Inbound links to this article (add after publishing):**
- Article 2 will link here for the MCP setup walkthrough
- Update "AI Pair Programming for Angular" to mention MCP
- Update "Best AI Coding Assistants for Angular" to reference MCP setup

---

## Fact-Check Verification Log

| Claim | Source | Status |
|-------|--------|--------|
| MCP introduced in CLI v20.1 | GitHub commit dc45c18 | Verified |
| MCP expanded in v20.2, stabilized in v21 | angular.dev/ai/mcp, InfoWorld, Angular blog | Verified |
| 6 stable tools (names and descriptions) | angular.dev/ai/mcp (canonical) | Verified |
| 7 experimental tools (names and descriptions) | angular.dev/ai/mcp (canonical) | Verified |
| `modernize` transformations: control-flow, standalone, signal-input, self-closing, inject | angular.dev/ai/mcp, GitHub commit 4e92eb6 | Verified |
| `find_examples` is version-aware | GitHub commit 1ee9ce3 (promoted to stable) | Verified |
| `ai_tutor` builds "Smart Recipe Box" app | WebSearch results, angular.dev/ai/ai-tutor | Verified |
| Cursor config key: `"mcpServers"` | angular.dev/ai/mcp | Verified |
| VS Code config key: `"servers"` | angular.dev/ai/mcp | Verified |
| Claude Code: `claude mcp add angular-cli -- npx -y @angular/cli mcp` | Anthropic docs, angular.love, local CLI `--help` | Verified |
| Claude Code scopes: local/project/user | Anthropic docs (code.claude.com/docs/en/mcp) | Verified |
| Claude Code config NOT in settings.json | GitHub issue #4976, Anthropic docs | Verified |
| `.mcp.json` works for both Cursor and Claude Code | Anthropic docs, Cursor docs | Verified |
| `-y` flag prevents npm prompt hang | Community reports, angular.love | Verified |
| JetBrains: Settings → Tools → AI Assistant → MCP | angular.dev/ai/mcp | Verified |
| Agent Skills install: `npx skills add https://github.com/angular/skills` | angular.dev/ai/agent-skills | Verified |
| `search_documentation` is the only tool requiring internet | angular.dev/ai/mcp (local-only column) | Verified |
| `-E devserver` enables all 3 devserver tools | angular.dev/ai/mcp | Verified |

---

## What This Article Beats Competitors On

| Gap in ALL competitors | How we fill it |
|------------------------|----------------|
| No single article covers 4+ IDEs | We cover Cursor, VS Code, Claude Code, JetBrains |
| No Claude Code setup anywhere | Exclusive section with 3 config options + scope table |
| No troubleshooting section | 6 verified issues with fixes |
| No article explains all 13 tools with use cases | Full reference table with example prompts |
| No CLI flags deep-dive | Dedicated section with config JSON examples |
| No "combining MCP with other AI config" | Section 9 bridges to the full AI config stack |
| Medium's guide is paywalled | Ours is freely accessible |
| Angular University's is behind a course login | Ours is freely accessible |
