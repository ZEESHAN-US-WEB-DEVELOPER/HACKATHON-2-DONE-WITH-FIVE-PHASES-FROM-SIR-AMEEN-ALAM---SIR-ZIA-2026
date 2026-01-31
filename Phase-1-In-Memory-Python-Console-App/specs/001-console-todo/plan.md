# Implementation Plan: Phase I Console Todo Application

**Branch**: `001-console-todo` | **Date**: 2026-01-04 | **Spec**: specs/001-console-todo/spec.md
**Input**: Feature specification from `/specs/001-console-todo/spec.md`

## Summary

Build a deterministic Python CLI that manages todos entirely in memory with a strict separation between the entry (menu loop), application services (TodoManager), and domain model (Todo dataclass). The CLI orchestrates user prompts, delegates mutations to the manager, and surfaces consistent outputs. The manager enforces spec rules: sequential IDs, validation of titles, toggle semantics, and graceful handling of missing IDs. Debug output is routed to stderr via the standard logging module, while stdout remains user-facing. UV runs the app with `python -m app.main`, and pytest covers unit plus behavioral flows to satisfy the constitution’s quality guardrails.

## Technical Context

**Language/Version**: Python 3.13 (via UV)
**Primary Dependencies**: Python standard library only (`dataclasses`, `argparse`, `datetime`, `logging`, `textwrap`)
**Storage**: In-memory list/dict structures scoped to the current CLI session (no persistence)
**Testing**: pytest for unit/service layers; behavior tests invoke the CLI module via `subprocess` to verify deterministic menus
**Target Platform**: Cross-platform terminal environments (Windows/macOS/Linux)
**Project Type**: Single-project CLI application
**Performance Goals**: ≤100ms processing time per command for up to 1,000 todos on commodity hardware
**Constraints**: Deterministic stdout/stderr, no external dependencies, no persistence, spec-driven workflow, structured debug logging via flag
**Scale/Scope**: Single interactive user, ≤1,000 todos per run, one CLI entry point (`app.main:run()`)

_No technical unknowns remain; requirements are fully specified by the constitution + feature spec._

## Constitution Check

| Principle | Compliance Plan |
|-----------|-----------------|
| I. Spec-Driven Development | All code paths trace back to FR-001–FR-010; plan prohibits undocumented features and mandates linking commits to spec sections. |
| II. Deterministic CLI Experience | Menu loop renders from a single template; TodoManager returns structured results so CLI can print consistent tables and errors. |
| III. Pure In-Memory State | State lives inside `TodoManager` (list + counters); no file/database/network calls exist. |
| IV. Separation of Concerns | `domain.models.Todo` and `services.todo_manager` hold logic; `app.cli` only handles IO plus validation prompts. |
| V. Simplicity & Extensibility | Minimal modules (cli, services, domain); duplication preferred over premature abstractions; documented seams for future persistence. |
| VI. Quality Guardrails | pytest suite (unit + behavior) plus manual CLI script; invalid inputs exercised before implementation per Red-Green-Refactor. |

**Gate Result (Pre-Design)**: PASS — no violations or waivers required.

**Gate Result (Post-Design)**: PASS — architecture artifacts (research, data model, contracts, quickstart) preserve all principles; no deviations introduced.

## Project Structure

### Documentation (this feature)

```text
specs/001-console-todo/
├── plan.md              # This file (/sp.plan output)
├── research.md          # Phase 0 decisions
├── data-model.md        # Entities, invariants, state transitions
├── quickstart.md        # UV setup + usage guide
├── contracts/
│   └── cli-commands.md  # Deterministic command contracts
└── tasks.md             # Generated later by /sp.tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── __init__.py
│   ├── cli.py          # Menu rendering, prompt handlers, command dispatch
│   └── main.py         # Entrypoint, debug flag parsing, bootstrap wiring
├── domain/
│   ├── __init__.py
│   └── models.py       # Todo dataclass + value validation helpers
├── services/
│   ├── __init__.py
│   └── todo_manager.py # CRUD operations, ID management, toggle logic
└── support/
    ├── __init__.py
    └── validation.py   # Input sanitizers, formatting utilities

tests/
├── unit/
│   ├── test_todo_manager.py
│   └── test_validation.py
└── behavior/
    └── test_cli_flow.py
```

**Structure Decision**: Adopt a single `src/` project with layered directories (`app`, `services`, `domain`, `support`) to mirror the constitution’s separation-of-concerns mandate. Tests live beside code by layer to keep Red-Green-Refactor cycles focused.

## Complexity Tracking

No constitution violations; table intentionally left empty.
