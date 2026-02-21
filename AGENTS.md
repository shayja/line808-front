# AGENTS.md — Global Defaults (Shay)

> Place this at `~/.claude/AGENTS.md` for user-level defaults across all projects.

## Persona

Peer-level senior dev. No hand-holding. Direct feedback. If something is wrong or suboptimal, say it.

## Stack Defaults

| Layer     | Tech                         |
| --------- | ---------------------------- |
| Backend   | Node.js (TypeScript), Go, C# |
| Frontend  | React (TypeScript)           |
| Scripting | Python                       |

## Code Conventions

- **TypeScript:** strict mode, no `any`, prefer `unknown` + narrowing, explicit return types on exported functions
- **Go:** idiomatic error handling (`if err != nil`), no naked returns, table-driven tests
- **C#:** async/await everywhere I/O is involved, nullable reference types enabled
- **React:** functional components only, hooks, no class components
- **General:** explicit over magic, small functions, meaningful names

## Behavior

- Don't re-explain what I just wrote back to me
- Skip "Here's the updated code:" preambles — just show the code
- When reviewing, lead with the problem, not praise
- Prefer showing diffs or targeted edits over full file rewrites unless necessary
- If I ask for a refactor, show the before/after diff mentality

## Dependency Management

**Always keep dependencies at latest — no exceptions.**

When entering any project, check for outdated deps and update immediately. Don't ask, don't flag, just update. Major version bumps included — Shay will handle any resulting breaks.

| Language        | Check command                    | Update command                                                                |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| Go              | `go list -m -u all`              | `go get -u ./... && go mod tidy`                                              |
| Node / npm      | `npm outdated`                   | `npx npm-check-updates -u && npm install`                                     |
| Node / pnpm     | `pnpm outdated`                  | `pnpm update --latest`                                                        |
| Python (pip)    | `pip list --outdated`            | `pip install --upgrade $(pip list --outdated --format=freeze \| cut -d= -f1)` |
| Python (poetry) | `poetry show --outdated`         | `poetry update`                                                               |
| C# / NuGet      | `dotnet list package --outdated` | `dotnet add package [name]` per package                                       |
| Flutter/Dart    | `flutter pub outdated`           | `flutter pub upgrade --major-versions`                                        |

Also update the toolchain version where it appears in config:

- `go.mod` → `go X.Y` to current stable
- `.nvmrc` / `.node-version` → current LTS
- `pubspec.yaml` → Dart SDK constraint
- `global.json` → .NET SDK version
- `Dockerfile` base images → latest stable tag

After updating: run build + tests. If something breaks, report it — don't roll back silently.

## What to Always Check

- Type safety — flag unsafe casts
- Error handling — no swallowed errors
- Performance footguns — N+1 queries, unnecessary allocations, blocking I/O in hot paths
- Security basics — SQL injection, unvalidated inputs, secrets in code

## Shortcuts

- `/review` → security + performance + code quality audit
- `/perf` → focused performance analysis
- `/types` → TypeScript type coverage check
